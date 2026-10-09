# AGENTS.md — instructions for coding agents (Codex)

You are building the marketing website for **GNOD Technologies** (custom software development & IT services, Zwartkop, Centurion, South Africa) in **Angular**. Domain: **https://gnod-tech.co.za**. The design comes from Figma and has been exported into this repository.

## 1. Source of truth (read before writing code)

1. `design/DESIGN_SPEC.md` — complete build spec: tokens, typography, components, every page & section with measurements and the **exact copy**.
2. `design/screens/` — rendered images of the Figma frames (scaled: desktop 75%, tablet 70%, mobile 90%). `design/screens/sections/<page>/` has one image per section. Look at them before and after building each section.
3. `design/figma-layers/*.txt` — raw layer dump of each Figma frame (every text, colour, font, size, position). Use it when the spec doesn't state a value. The legend is at the top of each file.
4. `design/tokens/tokens.css` (+ `tokens.json`) — CSS variables and typography classes. Use the variables; never hard-code colours.
5. `design/IMAGES.md` — which image goes where. Images are already in `public/images/` (served at `/images/...`).
6. `OPEN_QUESTIONS.md` — known content/design issues and the defaults to follow.

`design/`, `AGENTS.md`, `START-HERE.md`, `CODEX_PROMPTS.md` and `OPEN_QUESTIONS.md` are handoff files: never delete or overwrite them (you may append notes to `OPEN_QUESTIONS.md`).

## 2. Tech stack

- **Angular, latest stable version** (create it with `npx @angular/cli@latest`). Use current Angular practices:
  - standalone components only (no NgModules), `ChangeDetectionStrategy.OnPush`
  - signals for state (`signal`, `computed`), `input()` / `output()` functions instead of decorators
  - built-in control flow `@if`, `@for` (with `track`), `@switch` — not `*ngIf` / `*ngFor`
  - `inject()` for dependency injection; strict TypeScript; no `any`
  - typed Reactive Forms for the contact form
  - follow the file names / structure the CLI generates
- **Styling: SCSS.** Global styles in `src/styles.scss`; component styles scoped to each component. No UI kits (no Angular Material, Bootstrap, Tailwind).
- **Rendering: static site generation (prerendering).** Add `@angular/ssr` and prerender **every** route at build time (`RenderMode.Prerender` for all routes in `app.routes.server.ts`, and `"outputMode": "static"` in `angular.json`). Hydration on (`provideClientHydration(withEventReplay())`).
  _Why:_ the owner is working on SEO — every page must be real HTML that Google and social-media previews can read, and the output must be plain static files because the site is hosted on **cPanel (Apache, no Node.js)**.
  The code must be SSR-safe: never touch `window`, `document`, `localStorage` etc. directly at load time; use `inject(DOCUMENT)`, `isPlatformBrowser`, or `afterNextRender()`.
- **Icons: `lucide-angular`** (tree-shakable Lucide icons). Stroke width 1.5 on the home page, 2 on the inner pages, `aria-hidden="true"` on decorative icons.
- **Allowed extra packages:** `lucide-angular`, `@angular/cdk` (for `cdkTrapFocus` / a11y helpers). Ask before adding anything else.
- **Fonts:** Google Fonts `<link>` in `src/index.html` (Inter 400/500/600/700/800, Plus Jakarta Sans 400/700/800, `display=swap`, with preconnect). The production build inlines the Google Fonts CSS automatically.
- **Images:** `NgOptimizedImage` (`ngSrc`, explicit `width`/`height` or `fill`, `priority` on the above-the-fold image of each page). Use the `.webp` files from `public/images/`.
- **Contact form backend:** a PHP endpoint, because cPanel runs PHP: `public/api/contact.php` + `public/api/contact-config.php` (recipient **info@gnod-tech.co.za**, subject, allowed origin). Angular copies everything in `public/` to the build output. The Angular form posts JSON with `HttpClient` (`provideHttpClient(withFetch())`) to `/api/contact.php`. The PHP script validates server-side, rejects spam (honeypot field + minimum fill time), sends the email with `mail()` (switchable to SMTP/PHPMailer later), and returns JSON `{ ok: true }` or `{ ok: false, errors: {...} }` with proper HTTP status codes.

## 3. Project setup (first task)

- Scaffold in a temporary folder, then move the generated workspace into this repository root so that the handoff files stay untouched. Suggested: `npx @angular/cli@latest new gnod-website --directory _ng --style=scss --ssr --skip-git` (if the CLI asks about AI configuration files, choose none — this `AGENTS.md` is the agent guide), then move the contents of `_ng/` here **without overwriting** existing files, merge `public/` (keep `public/images/`), delete `_ng/`, run `npm install`.
- Keep the generated `README.md` for developer notes, but the owner's guide is `START-HERE.md`.
- Copy `design/tokens/tokens.css` to `src/styles/tokens.css` and import it first in `src/styles.scss`, followed by `_base.scss` (reset, body font, colours), `_typography.scss` (the `.t-*` classes already in tokens.css may live there), `_layout.scss` (container, section spacing, breakpoints mixins).
- Add npm scripts: `start` (ng serve), `build` (ng build), `preview` (serve the built static site, e.g. `npx http-server dist/gnod-website/browser -p 8081`), `api` (`php -S localhost:8080 -t public` for local form testing) and a `proxy.conf.json` that forwards `/api` to `http://localhost:8080` during `ng serve`.

## 4. Structure

```
src/
  index.html                 fonts, favicon links, GA4 placeholder (commented)
  styles.scss                imports styles/*
  styles/                    tokens.css, _base.scss, _typography.scss, _layout.scss, _mixins.scss
  app/
    app.config.ts            provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withComponentInputBinding()), provideHttpClient(withFetch()), provideClientHydration(withEventReplay())
    app.routes.ts            routes below
    app.routes.server.ts     every route RenderMode.Prerender
    core/                    seo.service.ts (title, description, canonical, Open Graph, Twitter), json-ld.service.ts, site.config.ts (phone, email, address, URLs)
    layout/                  top-bar/, site-header/ (navigation + mobile menu), site-footer/
    shared/ui/               button (attribute directive on <a>/<button>), eyebrow, pill, icon-badge, section-heading, service-card, accordion …
    content/                 site.content.ts (nav, footer, contact details), home.content.ts, about.content.ts, process.content.ts, contact.content.ts — typed arrays for all repeated content (cards, lists, FAQ, links), copied exactly from DESIGN_SPEC.md
    pages/
      home/                  home page + sections/ (hero, client-logos, trust, services, custom-software, process, selected-work, support-services, local-presence, social-proof, faq, quote-cta) + mockups/ (dashboard, app-window, phone, architecture-diagram)
      about/  our-process/  contact/  privacy/  terms/  not-found/
public/
  images/                    from the handoff (served at /images/…)
  api/contact.php  api/contact-config.php
  .htaccess  robots.txt  sitemap.xml  site.webmanifest  favicon.ico  icons…
```

## 5. Routes

| Path                 | Page                       | Notes                                                                           |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `/`                  | Home                       | section ids: `services`, `custom-software`, `process`, `work`, `support`, `faq` |
| `/about`             | About GNOD                 |                                                                                 |
| `/our-process`       | Our process                |                                                                                 |
| `/contact`           | Contact & Get a free quote | form has `id="quote"`; reads `?service=` to pre-select the service              |
| `/privacy`, `/terms` | Legal placeholder pages    |                                                                                 |
| `/404` + `**`        | Not found                  | prerender `/404`; Apache serves it for unknown URLs                             |

- Links to home sections from other pages: `routerLink="/" fragment="services"`. Links in the DESIGN_SPEC are written as URLs (`/contact#quote` → `routerLink="/contact" fragment="quote"`).
- Every route sets a title + description through route `data` and `SeoService` (see §8).
- Header and footer are the same on every page (one `layout` used by all routes).

## 6. Breakpoints & layout

- Desktop ≥1200px (design 1440), tablet 768–1199px (design 768), mobile ≤767px (design 390). Put the breakpoints in SCSS mixins.
- Container: max-width 1280px, side padding 80 / 40 / 20px. Inner pages' body content: max-width 1024px.
- Only the home page has tablet/mobile designs. For other pages follow `DESIGN_SPEC.md` §9.
- Must look right from 320px to 1920px wide. No horizontal scrolling.

## 7. Fidelity rules

- Match the Figma screens: spacing, sizes, colours, font weights (most headings are Plus Jakarta Sans **400**, not bold), radii, shadows.
- Use the copy **exactly** as written in `DESIGN_SPEC.md` (curly quotes/apostrophes and em dashes included). Don't invent sections or marketing text. Only new text allowed: the provided FAQ drafts, form messages, privacy/terms placeholders, 404, alt texts, meta descriptions.
- Decorative mock-ups (hero dashboard, case-study app windows, phone, architecture diagram) are Angular components built with HTML/SCSS — not screenshots — wrapped in `aria-hidden="true"`.
- Follow the defaults in `OPEN_QUESTIONS.md` for the known glitches.

## 8. SEO (the owner is actively working on SEO for gnod-tech.co.za)

- `SeoService`: sets `<title>`, meta description, `<link rel="canonical">` (`https://gnod-tech.co.za` + path), Open Graph and Twitter tags per route; `<html lang="en-ZA">`.
- `JsonLdService`: adds `<script type="application/ld+json">` to `<head>` via `DOCUMENT`/`Renderer2` (Angular strips `<script>` from templates). Data: `ProfessionalService`/`LocalBusiness` (GNOD Technologies, +27 12 663 3699, info@gnod-tech.co.za, 59 Blinkblaar, Zwartkop, Centurion, 0157, Gauteng, ZA; areaServed Centurion, Pretoria, Johannesburg, South Africa) on every page, `FAQPage` on the home page, `BreadcrumbList` on inner pages.
- `public/sitemap.xml` (all routes), `public/robots.txt` (allow all + sitemap URL).
- GA4: a commented-out gtag snippet with `G-XXXXXXXXXX` in `src/index.html`; the owner will paste the ID from their **work** Google account.
- Check after `ng build` that each prerendered `index.html` contains the page's text, title, description, canonical and JSON-LD.

Titles / descriptions (edit if needed):

- `/` — "Custom Software Development in Centurion | GNOD Technologies" / "GNOD designs, builds and supports tailored software, web and mobile apps, cloud, security and managed IT for businesses in Centurion, Pretoria, Johannesburg and beyond."
- `/about` — "About GNOD Technologies | Software & IT Team in Centurion" / "Meet the team behind GNOD Technologies, a Centurion-based custom software and IT services company helping South African businesses since 2023."
- `/our-process` — "Our Software Development Process | GNOD Technologies" / "From discovery to ongoing support: how GNOD plans, designs, builds, tests and launches custom software with you."
- `/contact` — "Get a Free Quote | Contact GNOD Technologies, Centurion" / "Request a proposal for custom software or IT services. Call 012 663 3699 or email info@gnod-tech.co.za."

## 9. Interactions

- **Mobile/tablet menu**: signal-based open state, `aria-expanded`/`aria-controls`, `cdkTrapFocus` while open, Esc closes, closes on navigation, body scroll lock (browser only). Spec in `DESIGN_SPEC.md` §8.
- **FAQ**: accessible accordion (buttons with `aria-expanded`/`aria-controls`), first item open, smooth height animation.
- **Client-logo marquee**: CSS animation only, paused on hover, disabled with `prefers-reduced-motion`.
- **Contact form**: typed `FormGroup` (firstName, lastName, email, phone, service, message, hidden honeypot `website`), validators, inline errors (`aria-describedby`), status signal `idle | sending | success | error`, success panel replaces the form, `aria-live` status, button disabled while sending.
- Hover/focus/active states: `DESIGN_SPEC.md` §8. Visible focus outlines everywhere.

## 10. Accessibility (WCAG 2.1 AA)

- Landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order, skip link to `#main`.
- Keyboard-operable menu, accordion and form; form `<label for>`, `autocomplete`, `required`.
- Alt text per `design/IMAGES.md`; decorative images `alt=""`.
- Respect `prefers-reduced-motion`.

## 11. Performance

- Lazy-load routes (`loadComponent`). `@defer (on viewport)` for heavy below-the-fold mock-ups is fine as long as the content is still prerendered where it matters for SEO (text sections must be in the prerendered HTML).
- `NgOptimizedImage` everywhere, WebP files, `priority` only on the LCP image.
- Keep the initial bundle small; no extra libraries. Respect the default Angular build budgets.
- Target Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO on mobile.

## 12. Deployment (cPanel)

- `ng build` → upload the **contents** of `dist/gnod-website/browser/` (including `.htaccess` and `api/`) to `public_html`.
- `public/.htaccess`: force HTTPS (and one host — no `www` duplicate), serve existing files as-is, serve `/about` from `/about/index.html` **without** redirecting to `/about/` (so URLs match the canonical tags; `Options -Indexes`), `ErrorDocument 404 /404/index.html`, long cache headers for hashed JS/CSS and images, no cache for HTML, never rewrite `/api/`.
- Write the owner-facing steps in `DEPLOY.md` (build, zip, back up the old site, upload with cPanel File Manager, extract, show hidden files so `.htaccess` is included, where to change the form recipient).
- Alternative (only if the owner asks): Firebase Hosting, replacing the PHP endpoint with a Cloud Function.

## 13. How to work

1. Before each step, read the relevant part of `DESIGN_SPEC.md` and open the matching image(s) in `design/screens/sections/`.
2. Order: setup & foundation (layout, styles, routes) → home sections 1–13 → home tablet/mobile → About → Our process → Contact + PHP endpoint → interactions → SEO / a11y / performance → QA.
3. Run `npm start` (http://localhost:4200) while building; run `ng build` after each step — it must pass without errors.
4. If Playwright/Chromium is available, screenshot each route at 1440, 768 and 390 px wide and compare with `design/screens/` (remember the scale factors). Fix differences before moving on.
5. Small, descriptive commits (one section or feature per commit).
6. When something is unclear, use the default from `OPEN_QUESTIONS.md`; if there is none, choose the option closest to the Figma screens and note it in `OPEN_QUESTIONS.md`.

## 14. Definition of done

- [ ] Routes `/`, `/about`, `/our-process`, `/contact`, `/privacy`, `/terms`, `/404` exist; all internal links, `tel:` and `mailto:` links work; section anchors scroll correctly (also from other pages).
- [ ] Desktop matches the Figma screens; tablet and mobile match the home tablet/mobile designs; inner pages are fully responsive (320–1920px).
- [ ] All copy matches `DESIGN_SPEC.md`.
- [ ] `ng build` passes; every route is prerendered to its own `index.html` with full content, title, meta description, canonical and JSON-LD; no hydration or console errors.
- [ ] Mobile menu, FAQ, marquee and contact form work with keyboard and touch; the form shows success/error states; `contact.php` validates, blocks spam and sends the email.
- [ ] sitemap.xml, robots.txt, favicon set, `.htaccess` and GA4 placeholder present.
- [ ] Lighthouse mobile ≥ 90 in all categories.
- [ ] `DEPLOY.md` explains preview, build and cPanel upload in plain language.
