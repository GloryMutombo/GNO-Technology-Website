#!/usr/bin/env node
// SEO checks over every prerendered page (AGENTS.md §8.6). Plain Node, no packages.
// Usage: npm run seo:check  (after npm run build)   or   node scripts/seo-check.mjs <browser-dir>

import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const ORIGIN = 'https://gnod-tech.co.za';
const ROOT = process.argv[2] ?? 'dist/gnod-website/browser';
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 155;
const MIN_WORDS = 50;
/** Pages allowed to carry noindex (AGENTS.md §8.2). /privacy and /terms until their final text. */
const NOINDEX_ALLOWED = new Set(['/404', '/privacy', '/terms']);
/** Pages that must not have a canonical link. */
const NO_CANONICAL = new Set(['/404']);

if (!existsSync(join(ROOT, 'index.html'))) {
  console.error(`No build found in ${ROOT}. Run "npm run build" first.`);
  process.exit(1);
}

const decode = (text) =>
  text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&#x27;/g, "'")
    .replace(/&nbsp;/g, ' ');
const attr = (tag, name) => tag.match(new RegExp(`\\s${name}="([^"]*)"`, 'i'))?.[1];
const metaContent = (html, key, value) =>
  [...html.matchAll(/<meta\b[^>]*>/gi)].map((m) => m[0]).find((tag) => attr(tag, key) === value);

/** Every prerendered page: dist/…/about/index.html -> "/about". */
function findPages(dir) {
  const pages = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      pages.push(...findPages(full));
    } else if (name === 'index.html') {
      const folder = relative(ROOT, dir).split(sep).join('/');
      pages.push({ path: folder ? `/${folder}` : '/', file: full });
    }
  }
  return pages.sort((a, b) => a.path.localeCompare(b.path));
}

const pages = findPages(ROOT).map((page) => {
  const html = readFileSync(page.file, 'utf8');
  const main = html.match(/<main\b[\s\S]*<\/main>/i)?.[0] ?? '';
  const canonicalTag = [...html.matchAll(/<link\b[^>]*>/gi)]
    .map((m) => m[0])
    .find((tag) => attr(tag, 'rel') === 'canonical');
  return {
    ...page,
    html,
    title: decode(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? ''),
    description: decode(attr(metaContent(html, 'name', 'description') ?? '', 'content') ?? ''),
    canonical: canonicalTag ? attr(canonicalTag, 'href') : undefined,
    ogUrl: attr(metaContent(html, 'property', 'og:url') ?? '', 'content'),
    robots: attr(metaContent(html, 'name', 'robots') ?? '', 'content') ?? '',
    h1Count: (html.match(/<h1[\s>]/gi) ?? []).length,
    words: decode(main.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<[^>]+>/g, ' '))
      .split(/\s+/)
      .filter(Boolean).length,
    ids: new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1])),
  };
});
const byPath = new Map(pages.map((page) => [page.path, page]));

const failures = [];
const fail = (page, message) => failures.push(`${page}: ${message}`);

// Sitemap
const sitemapFile = join(ROOT, 'sitemap.xml');
const sitemap = existsSync(sitemapFile)
  ? [...readFileSync(sitemapFile, 'utf8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim())
  : [];
if (!sitemap.length) fail('sitemap.xml', 'missing or empty');
const expectedCanonical = (path) => `${ORIGIN}${path === '/' ? '/' : path}`;

console.log(`SEO check of ${pages.length} pages in ${ROOT}\n`);
for (const page of pages) {
  const noindex = /\bnoindex\b/i.test(page.robots);
  console.log(`${page.path}`);
  console.log(`  title (${page.title.length}): ${page.title}`);
  console.log(`  description (${page.description.length}): ${page.description}`);

  if (!page.title) fail(page.path, 'no <title>');
  else if (page.title.length > TITLE_MAX)
    fail(page.path, `title is ${page.title.length} characters (max ${TITLE_MAX})`);
  if (!page.description) fail(page.path, 'no meta description');
  else if (page.description.length > DESCRIPTION_MAX)
    fail(page.path, `description is ${page.description.length} characters (max ${DESCRIPTION_MAX})`);
  if (attr(metaContent(page.html, 'property', 'og:locale') ?? '', 'content') !== 'en_ZA')
    fail(page.path, 'og:locale is not en_ZA');

  // Images named in meta tags and JSON-LD must be files in this build (the old /images/ folder goes).
  const imageUrls = [
    ...['og:image', 'twitter:image'].map(
      (key) =>
        attr(
          metaContent(page.html, 'property', key) ?? metaContent(page.html, 'name', key) ?? '',
          'content',
        ) ?? '',
    ),
    ...[...page.html.matchAll(/"(?:logo|image)":"([^"]+)"/g)].map((m) => m[1]),
  ];
  for (const url of imageUrls) {
    if (!url) continue;
    if (!url.startsWith(`${ORIGIN}/`) || !existsSync(join(ROOT, url.slice(ORIGIN.length))))
      fail(page.path, `image ${url} is not a file in this build`);
  }
  if (page.h1Count !== 1) fail(page.path, `${page.h1Count} <h1> elements (need exactly 1)`);

  if (NO_CANONICAL.has(page.path)) {
    if (page.canonical) fail(page.path, 'must not have a canonical link');
  } else if (!page.canonical) {
    fail(page.path, 'no canonical link');
  } else {
    if (!/^https:\/\//.test(page.canonical))
      fail(page.path, `canonical is not absolute: ${page.canonical}`);
    if (page.canonical !== expectedCanonical(page.path))
      fail(page.path, `canonical ${page.canonical} should be ${expectedCanonical(page.path)}`);
    if (page.ogUrl !== page.canonical)
      fail(page.path, `og:url (${page.ogUrl ?? 'missing'}) differs from canonical`);
  }

  const jsonLd = [
    ...page.html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi),
  ];
  if (!jsonLd.length) fail(page.path, 'no JSON-LD');
  for (const [, json] of jsonLd) {
    try {
      JSON.parse(json);
    } catch (error) {
      fail(page.path, `JSON-LD does not parse: ${error.message}`);
    }
  }

  // Short noindex pages (404, placeholder legal pages) only need some visible text.
  const minWords = noindex ? 1 : MIN_WORDS;
  if (page.words < minWords)
    fail(page.path, `only ${page.words} words of visible text in <main> (min ${minWords})`);

  for (const [img] of page.html.matchAll(/<img\b[^>]*>/gi)) {
    if (attr(img, 'alt') === undefined) fail(page.path, `image without alt: ${img.slice(0, 90)}`);
  }

  for (const [tag] of page.html.matchAll(/<a\b[^>]*>/gi)) {
    const href = decode(attr(tag, 'href') ?? '');
    if (!href || /^(https?:|tel:|mailto:)/i.test(href)) continue;
    const [pathAndQuery, fragment] = href.split('#');
    const target = pathAndQuery.split('?')[0] || page.path;
    const targetPage = byPath.get(target.replace(/\/$/, '') || '/');
    if (!targetPage) fail(page.path, `link to ${href} does not resolve to a page`);
    else if (fragment && !targetPage.ids.has(fragment))
      fail(page.path, `link to ${href}: no element with id "${fragment}"`);
  }

  if (noindex && !NOINDEX_ALLOWED.has(page.path))
    fail(page.path, 'has noindex but should be indexed');
  const inSitemap = sitemap.includes(expectedCanonical(page.path));
  if (!noindex && !inSitemap) fail(page.path, 'indexable page missing from sitemap.xml');
  if (noindex && inSitemap) fail(page.path, 'noindex page listed in sitemap.xml');
}

for (const loc of sitemap) {
  const path = loc.startsWith(ORIGIN) ? loc.slice(ORIGIN.length).replace(/\/$/, '') || '/' : null;
  if (!path || !byPath.has(path)) fail('sitemap.xml', `entry with no page: ${loc}`);
}

const seen = new Map();
for (const page of pages) {
  for (const [kind, value] of [
    ['title', page.title],
    ['description', page.description],
  ]) {
    const key = `${kind}:${value}`;
    if (value && seen.has(key)) fail(page.path, `duplicate ${kind} (same as ${seen.get(key)})`);
    seen.set(key, page.path);
  }
}

console.log('');
if (failures.length) {
  console.error(`✗ ${failures.length} problem(s):`);
  for (const failure of failures) console.error(`  - ${failure}`);
  process.exit(1);
}
console.log('✓ All SEO checks passed.');
