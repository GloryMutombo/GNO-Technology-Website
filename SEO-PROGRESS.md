# SEO launch progress

Plan: `AGENTS.md` §15. Rollback point: Git tag `before-seo-launch` (run `git checkout before-seo-launch` to see the site as it was before these changes).

## Checklist

- [x] 1. Rollback point: pending work committed, tagged `before-seo-launch`, this file created
- [x] 2. Static build confirmed (`outputMode: "static"`, every route prerendered)
- [x] 3. `public/.htaccess` replaced with AGENTS.md §12.2
- [x] 4. Hidden SEO fixes: titles/descriptions (§8.1), home canonical with slash, `noindex` (§8.2), structured data (§8.3), sitemap (§8.5), heading spacing
- [x] 5. Analytics: GA4 snippet with consent by region, lead events (§8.4)
- [x] 6. Form and email: `/api/contact.php` with reCAPTCHA (inactive until keys exist), no third-party form service
- [ ] 7. Checks: build, `npm run seo:check`, visual comparison, Lighthouse
- [ ] 8. Package: `deploy/gnod-site-<date>.zip`, `DEPLOY.md` launch steps

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
