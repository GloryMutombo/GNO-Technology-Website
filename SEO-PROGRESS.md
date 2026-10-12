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

## Owner answers

(none yet)

## Waiting on the owner

- reCAPTCHA: production and development site keys, Google Cloud project ID, restricted API key
- Final Privacy Policy and Terms text
- The company's social profile links (for `sameAs` in the structured data)
- The `info@gnod-tech.co.za` mailbox or forwarder in cPanel
- OK before any test email is sent through the live form

## Upload log

(nothing uploaded yet)
