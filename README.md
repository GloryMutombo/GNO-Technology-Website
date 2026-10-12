# GNOD Technologies website

Angular 22 marketing site for GNOD Technologies. The project uses standalone components, SCSS, SSR hydration, and static prerendering for cPanel hosting.

The owner-facing handoff is in `START-HERE.md`. Build and design rules are in `AGENTS.md` and `design/DESIGN_SPEC.md`.

## Requirements

- Node.js 24.15 or newer in the Node 24 line (`.nvmrc` currently pins 24.21.0)
- npm 8 or newer
- An internet connection for `npm run build` (the production build downloads the Google Fonts CSS and inlines it)
- PHP 8.2 for local contact-form testing (`npm run api`)

## Commands

```bash
npm install
npm start
```

The development site runs at `http://localhost:4200`.

```bash
npm run build
npm run preview
```

The static deployment files are written to `dist/gnod-website/browser/`.

```bash
npm run api
```

This starts the contact-form endpoint (`public/api/contact.php`) at `http://localhost:8080`; `npm start` proxies `/api` to it. The form posts to `/api/contact.php`, which validates, checks spam and reCAPTCHA (when the keys exist) and emails info@gnod-tech.co.za.

```bash
npm run seo:check
```

Run after `npm run build`: checks every prerendered page (titles, descriptions, canonical, JSON-LD, H1, alt text, links, noindex, sitemap).

## Production output

`npm run build` prerenders `/`, `/about`, `/our-process`, `/contact`, `/privacy`, `/terms`, and `/404`. Upload the contents of `dist/gnod-website/browser/` to cPanel. See `DEPLOY.md` for the owner-facing checklist.

## Developer notes

- **Home page structure:** `pages/home/home.html` only lists the sections. Each one is a component in `pages/home/sections/` rendered into its host `<section>` through an attribute selector (`<section appServicesSection …>`), so the prerendered HTML is the same as a single template. Decorative visuals are components in `pages/home/mockups/`.
- **Styles stay global** (`src/styles/_home.scss`, `_inner-pages.scss`, `_accents.scss`, `_motion.scss`): the home styles are ~40 kB, far above Angular's per-component style budget (4 kB warning / 8 kB error), so moving them into components would break the build budgets.
- **Icons:** `<lucide-icon>` is our own component (`shared/ui/icon`) that draws the lucide-angular icon data as one `<path>`. lucide-angular's component rebuilds every SVG during hydration; ours is reused as prerendered. Register new icons in `shared/ui/icon/icons.ts`.
- **Motion:** shared timings and all animations live in `src/styles/_motion.scss`. Scroll reveals are added by `core/scroll-reveal.service.ts`, counters by `shared/ui/count-up`. Everything respects `prefers-reduced-motion`.
- **Tests:** `npm test` finds no tests if the project folder name contains parentheses (e.g. `… (1)`), because the path is used as a glob. Rename the folder or run from a path without parentheses.

