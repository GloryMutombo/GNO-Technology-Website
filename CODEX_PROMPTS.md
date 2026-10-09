# Prompts to paste into Codex (Angular)

Codex reads `AGENTS.md` automatically, so these prompts can stay short — the detailed rules (Angular setup, prerendering for SEO, structure, quality checks) are already in that file.

Run the prompts **one at a time** and check the result in your browser (`npm start` → http://localhost:4200) before sending the next one.
_Why step by step?_ Smaller steps = fewer mistakes, and you catch a problem early instead of after 2,000 lines of code.

Tip: after each step ask Codex _"Explain what you just built and why, like I'm learning Angular"_.

---

## ▶ Starting prompt (paste this first)

```
You are building the GNOD Technologies website in Angular from a Figma export that is already in this folder.

1. Read AGENTS.md (your rules), then OPEN_QUESTIONS.md, design/DESIGN_SPEC.md and design/IMAGES.md. Look at the images in design/screens/ (start with home-desktop@75pct.png).
2. Set up the Angular project exactly as described in AGENTS.md section 3 "Project setup": latest stable Angular CLI, standalone components, SCSS, SSR with static prerendering of every route, created in a temporary folder and moved into this folder WITHOUT overwriting AGENTS.md, START-HERE.md, CODEX_PROMPTS.md, OPEN_QUESTIONS.md, design/ or public/images/. Add lucide-angular and @angular/cdk, the npm scripts and the /api proxy.
3. Build the foundation: global styles from design/tokens/tokens.css, the routes (/, /about, /our-process, /contact, /privacy, /terms, /404), SeoService with each page's title and description, and the shared layout — top bar, navigation (desktop, tablet and mobile versions; the menu panel can come later) and footer — exactly as in design/DESIGN_SPEC.md section 5. Give every page a simple placeholder that uses the layout.
4. Run `ng build`, confirm every route was prerendered to its own index.html, then start the dev server.

When you finish, stop and tell me: what you built, the commands to run it, how the header and footer compare with design/screens/sections/home-desktop/01-topbar-nav-hero.png and 13-footer.png, and anything that was unclear. Do not build the page sections yet.
```

---

## Step 2 — Home: hero, client logos, trust

```
Build home page sections 6.1 (hero, including the dashboard mock-up as an Angular component), 6.2 (client-logo marquee) and 6.3 (trust & experience) from design/DESIGN_SPEC.md for desktop. Put repeated content in src/app/content/home.content.ts. Compare with design/screens/sections/home-desktop/01–03 and fix differences. Run ng build at the end.
```

## Step 3 — Home: services + custom software

```
Build home sections 6.4 (services bento grid) and 6.5 (dark custom-software section with the connected-system diagram component) for desktop. Compare with sections 04 and 05 in design/screens/sections/home-desktop/. Run ng build.
```

## Step 4 — Home: process, selected work, support services

```
Build home sections 6.6 (process), 6.7 (selected work with the 3 case-study mock-up components) and 6.8 (supporting technology services) for desktop. Compare with sections 06–08. Run ng build.
```

## Step 5 — Home: presence, social proof, FAQ, CTA

```
Build home sections 6.9 (local presence), 6.10 (social proof), 6.11 (FAQ accordion with the draft answers, first item open, plus FAQPage JSON-LD) and 6.12 (quote call to action) for desktop. Compare with sections 09–12. Run ng build.
```

## Step 6 — Home: tablet and mobile

```
Make the home page match the tablet (768px) and mobile (390px) designs: design/screens/home-tablet@70pct.png, home-mobile@90pct.png and the per-section images in design/screens/sections/home-tablet/ and home-mobile/. Follow the tablet/mobile notes in each section of DESIGN_SPEC.md section 6, and build the mobile/tablet menu panel from section 8 (focus trap, Esc to close, closes on navigation). Check every width from 320px to 1440px for overflow.
```

## Step 7 — About page

```
Build the /about page from DESIGN_SPEC.md section 7.1 (desktop) and make it responsive using section 9. Compare with design/screens/sections/about-desktop/. Run ng build.
```

## Step 8 — Our process page

```
Build the /our-process page from DESIGN_SPEC.md section 7.2 and make it responsive using section 9. Compare with design/screens/sections/our-process-desktop/. Run ng build.
```

## Step 9 — Contact page + form backend

```
Build the /contact page from DESIGN_SPEC.md section 7.3 (responsive per section 9) with the typed reactive quote form: validation, inline errors, sending/success/error states (section 8) and pre-selection of the service from ?service=. Create public/api/contact.php and public/api/contact-config.php as described in AGENTS.md (honeypot, minimum fill time, server-side validation, email to info@gnod-tech.co.za, JSON responses). Show me how to test it locally with npm run api.
```

## Step 10 — Polish: SEO, accessibility, performance

```
Go through AGENTS.md sections 8 to 11 and implement everything still missing: canonical + Open Graph tags, JSON-LD (LocalBusiness on every page, BreadcrumbList on inner pages), sitemap.xml, robots.txt, favicon set and web manifest, GA4 placeholder, hover/focus states from DESIGN_SPEC.md section 8, reduced-motion support, NgOptimizedImage with priority on each page's main image, lazy-loaded routes. Create the /privacy and /terms pages with clear placeholders for my text, and the /404 page.
```

## Step 11 — Deployment files + final QA

```
Create public/.htaccess and DEPLOY.md as described in AGENTS.md section 12. Then do a final QA pass against the Definition of done (AGENTS.md section 14): build, check every prerendered index.html, screenshot every route at 1440, 768 and 390px and compare with design/screens, run Lighthouse if you can. List anything that still differs from the design, fix what you can, and tell me exactly what to upload to cPanel.
```

---

## One-shot alternative (if you prefer a single long run)

```
Build the complete GNOD Technologies website in Angular as described in AGENTS.md and design/DESIGN_SPEC.md: project setup with static prerendering, all pages and sections, responsive behaviour, interactions, the PHP contact endpoint, SEO, accessibility and the cPanel deployment files. Work section by section, compare each with the images in design/screens/ before moving on, run ng build after each page, and finish by checking the Definition of done in AGENTS.md.
```

## Useful follow-up prompts

- `Harmonise the inner pages with the home page tokens (OPEN_QUESTIONS.md #16).`
- `Use the white logo in the footer (OPEN_QUESTIONS.md #1).`
- `Replace the Contact page map image with a Google Maps embed for 59 Blinkblaar, Zwartkop, Centurion.`
- `Explain how prerendering works in this project and how I can check that Google sees the text.`
- `Explain the CSS grid of the services bento section like I'm learning.`
