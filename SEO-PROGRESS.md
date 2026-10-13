# SEO launch progress

Plan: `AGENTS.md` §15. Rollback point: Git tag `before-seo-launch` (run `git checkout before-seo-launch` to see the site as it was before these changes).

## Checklist

- [x] 1. Rollback point: pending work committed, tagged `before-seo-launch`, this file created
- [x] 2. Static build confirmed (`outputMode: "static"`, every route prerendered)
- [x] 3. `public/.htaccess` replaced with AGENTS.md §12.2
- [x] 4. Hidden SEO fixes: titles/descriptions (§8.1), home canonical with slash, `noindex` (§8.2), structured data (§8.3), sitemap (§8.5), heading spacing
- [x] 5. Analytics: GA4 snippet with consent by region, lead events (§8.4)
- [x] 6. Form and email: `/api/contact.php` with reCAPTCHA (inactive until keys exist), no third-party form service
- [x] 7. Checks: build, `npm run seo:check`, visual comparison, Lighthouse (results below)
- [x] 8. Package: `deploy/gnod-site-2026-10-12.zip` (3.1 MB, 73 files), `DEPLOY.md` launch steps

## Check results (12 October 2026)

- `npm run build`: passes, no warnings; 7 routes prerendered. Initial bundle 115 kB transferred.
- `npm run seo:check`: all checks pass on all 7 pages.
- Visual comparison: every route at 1440, 768 and 390 px is pixel-identical to the `before-seo-launch` build (21 of 21 screenshots). No console errors, no horizontal scrolling. (No reCAPTCHA badge yet, because the site keys are still empty.)
- Lighthouse (mobile), on a local server that compresses and caches files like the live `.htaccess`:
  - `/contact`: Performance 97–98, Accessibility 100, Best Practices 100, SEO 100.
  - `/`: Accessibility 100, Best Practices 100, SEO 100. Performance swings between 71 and 95 from run to run on this computer, for both the old and the new build alike, so the SEO changes did not slow it down. Confirm on the live site with PageSpeed Insights (DEPLOY.md, step 6).
- **13 Oct 2026 rebuild** (deploy brief): build passes; `npm run seo:check` passes on all 7 pages (now: titles ≤ 60, descriptions ≤ 155, `og:locale`, and every image in meta tags/JSON-LD exists in the build). 24 of 24 screenshots (7 pages + a made-up address, 3 widths) pixel-identical to the 12 Oct build; no hydration or console errors. `.htaccess` tested in real Apache 2.4 over https: all pages 200, `/about/` → `/about`, old pages → new pages in one 301 (also from http:// and www.), unknown addresses → 404 status with the site's 404 page, gzip and cache headers correct.

## Owner answers

- **13 Oct 2026, deploy brief** (replaces parts of AGENTS.md §8.1, §8.4 and §12.2; see OPEN_QUESTIONS.md):
  - Home, About and Contact use the titles and descriptions that were live on the old site. Our process keeps its AGENTS.md title.
  - Social profile links for `sameAs`: Facebook, Instagram, LinkedIn (added to the structured data).
  - `og:locale` en_ZA on every page; GA4 as the standard gtag snippet in `<head>` (consent by region kept).
  - `.htaccess` rewritten from the owner's version: old pages redirect straight to https in one step, clean URLs served from the prerendered folders, real 404.
  - Privacy and Terms: **stay noindex and out of the sitemap** until the final text arrives (owner's choice).
  - Contact form: **stays on `/api/contact.php`** (owner's choice); `php-mail/` is not used.
  - Upload file: `deploy/gnod-angular-deploy.zip`. Another Claude session does the swap on the server.

## Waiting on the owner

- reCAPTCHA: production and development site keys, Google Cloud project ID, restricted API key
- Final Privacy Policy and Terms text
- The `info@gnod-tech.co.za` mailbox or forwarder in cPanel
- OK before any test email is sent through the live form

## Upload log

(nothing uploaded yet)
