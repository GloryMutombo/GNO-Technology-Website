# Things to check or decide (found while exporting the design)

These are small issues spotted in the Figma file. None of them blocks the build — Codex will follow the default shown in **bold** unless you change it here first.

## Content to confirm (accuracy & trust)

1. **Footer logo contrast.** The footer uses the same purple logo on the dark navy background, so it is hard to read (see `design/screens/sections/home-desktop/13-footer.png`). A white version is included: `public/images/gnod-logo-white.png`.
   Default: **use the purple logo as designed**. Recommended: switch to the white one.
2. **"Two decades" vs "3+ years".** Home page: "Two decades of solving real operational challenges…" sits next to the "3+ YEARS" tile and the hero badge "3+ years of building dependable technology"; the About page says "Established 2023". Pick one story.
   Default: **keep the Figma text** — but please correct it before going live (search engines and visitors notice contradictions).
3. **About page timeline numbers** "04, 10, 16, 20, 24" read like the years 2004–2024, which conflicts with "Since 2023". Also "Pioneered cloud migration strategies for major retail chains" — make sure every claim is true.
   Default: **keep as designed**.
4. **Client names in the logo strip** (MOMENTUM, REGO-TRANSACT, HSL). Only show company names you have permission to use.
   Default: **keep as designed**.
5. **Service claims**: "24/7 Monitoring", "priority support line is active 24/7 for existing SLA partners", "specialized support centers in Gauteng and Western Cape", "Average response: 2 hours", "24-Hour Response Time". Confirm they are accurate.
6. **Map image** is a screenshot of Google Maps (`map-gnod-zwartkop.png`, also low resolution). Google's terms require their maps to be shown through their official embed/API with attribution.
   Default: **use the image as designed** and make it link to Google Maps. Recommended: replace the Contact page map with a Google Maps embed (`<iframe>`), keep the image elsewhere or use a licensed static map.
7. **Team photo resolution.** Gedeon Bafinamene's photo is only 100 × 100 px (shown at 120 × 120) and Glory Mutombo's is 200 × 200. Ask for 400 × 400 photos for sharp results on phones.
8. **FAQ answers 2–6 are not written in Figma.** Draft answers are in `design/DESIGN_SPEC.md` §6.11 — edit them to your liking.
9. **Privacy Policy and Terms pages** are linked from the footer and the contact form ("POPIA compliant Privacy Policy") but are not designed. Codex will create placeholder pages — you must supply the real text (POPIA requires a real privacy notice when you collect personal data in the form).
10. **"Learn more about our standards"** link on the Our process page has no destination page.
    Default: **link to the Process section of the home page** (`/#process`).
11. **"Explore this service" / "How we help"** links have no service pages.
    Default: **open the Contact page with that service pre-selected in the form**.

## Small design glitches Codex will fix (unless you say otherwise)

12. Home › Process: the "04" step marker is shifted 131 px to the right of its column → **aligned like 01–03**.
13. Home › Selected work: the centred heading sits off-centre (centre at x≈492 instead of 720) → **centred on the page**.
14. Contact › "Main Office" card: the address text overflows the card → **card grows to fit**.
15. About › Journey timeline: uneven spacing between items → **consistent spacing**.
16. Inner pages use slightly different styles than the home page (body grey `#696D72` vs `#667085`, background `#F6F7F9` vs white/`#F4F5FA`, button heights 48–56 vs 52, card radius 14 vs 16). Default: **keep each page as designed**. If you want one consistent look, tell Codex: "harmonise the inner pages with the home page tokens".
17. Only the home page has tablet and mobile designs → Codex will **derive responsive layouts** for About, Our process and Contact using the rules in `design/DESIGN_SPEC.md` §9.

## Technical decisions (details in AGENTS.md)

- **Angular** (latest stable), standalone components and signals.
- **Prerendered (static) output for SEO**: Angular builds a ready-made HTML file for every page at build time. Google and social-media previews see the full text immediately, and the result is plain files that run on your current **cPanel** hosting (no Node.js needed). You upload the contents of `dist/gnod-website/browser/` to `public_html`.
- **Contact form**: the Angular form sends the request to a small PHP script (`public/api/contact.php`) that emails it to **info@gnod-tech.co.za** (change it in `public/api/contact-config.php`). PHP is used because cPanel supports it out of the box.
- Fonts from Google Fonts (Inter + Plus Jakarta Sans); icons from `lucide-angular`.
- Google Analytics 4: Codex leaves a clearly marked placeholder — paste the GA4 measurement ID from your **work** Google account.
- Alternative hosting: if you later want Firebase Hosting instead of cPanel, ask Codex to replace the PHP script with a Firebase Cloud Function (your domain's DNS would then point to Firebase).

## Notes added 2026-10-09

- **Years of experience:** the home page now speaks of the team's *combined* experience: the badge says "10+ years of combined experience building systems" and the trust section says "More than 10 years of combined experience building practical, maintainable systems and solving complex, real-world problems." This sits alongside "Established 2023" on the About page (the company is new; the team's experience is longer), so the earlier contradiction is resolved.
- **Contact form:** now sends through FormSubmit (`formEndpoint` in `src/app/core/site.config.ts`), now sending to info@gnod-tech.co.za. It must be activated once from that inbox (see DEPLOY.md). The Privacy page should mention that form data is processed by FormSubmit (POPIA).
