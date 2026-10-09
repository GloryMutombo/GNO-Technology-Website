# GNOD Technologies website

Angular 22 marketing site for GNOD Technologies. The project uses standalone components, SCSS, SSR hydration, and static prerendering for cPanel hosting.

The owner-facing handoff is in `START-HERE.md`. Build and design rules are in `AGENTS.md` and `design/DESIGN_SPEC.md`.

## Requirements

- Node.js 24.15 or newer in the Node 24 line (`.nvmrc` currently pins 24.21.0)
- npm 8 or newer
- PHP 8.1 or newer for local contact-form testing

## Commands

```bash
npm install
npm start
```

The development site runs at `http://localhost:4200`. The start command proxies `/api` to the local PHP server configured in `proxy.conf.json`.

```bash
npm run build
npm run preview
```

The static deployment files are written to `dist/gnod-website/browser/`.

```bash
npm run api
```

This starts the contact-form endpoint at `http://localhost:8080`. Run it alongside `npm start`; Angular proxies `/api` to PHP during local development.

## Production output

`npm run build` prerenders `/`, `/about`, `/our-process`, `/contact`, `/privacy`, `/terms`, and `/404`. Upload the contents of `dist/gnod-website/browser/` to cPanel. See `DEPLOY.md` for the owner-facing checklist.
