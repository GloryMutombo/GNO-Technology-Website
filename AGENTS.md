# AGENTS.md — instructions for coding agents (Codex, Claude Code)

You are working on the marketing website for **GNOD Technologies** (custom software development & IT services, Zwartkop, Centurion, South Africa), built in **Angular**. Domain: **https://gnod-tech.co.za**. The design comes from Figma and has been exported into this repository.

**Status (12 October 2026):** the site is built, and the owner has approved its design and content. The current job is the **SEO launch** in §15: behind-the-scenes fixes, then deployment to the live cPanel hosting. This file is the only instruction file for this project: don't add a `CLAUDE.md` (Claude Code reads `AGENTS.md` only when there is no `CLAUDE.md`).

## 0. The owner's rules (these come first)

1. **The design and the visible content are final.** Don't change layout, styles, images, headings, copy, navigation or page structure, and don't add pages. The only approved visible addition is Google's reCAPTCHA badge, on `/contact` only. If a fix would change what visitors see, don't make it: note it in `OPEN_QUESTIONS.md` and ask the owner.
2. **The owner is learning.** Report in plain English: what you changed, why, and what the owner has to do.
3. **No secrets in the repository.** Everything in `src/` and `public/` is committed to Git, and everything in `public/` is uploaded to the server. Secret keys live only in a private file on the server, outside public_html (§12).
4. **Never send test emails** through the live form without the owner's OK.
5. **No new npm packages** beyond §2 without asking.

## 1. Source of truth

1. `design/DESIGN_SPEC.md` — complete build spec: tokens, typography, components, every page & section with measurements and the **exact copy**.
2. `design/screens/` — rendered images of the Figma frames (scaled: desktop 75%, tablet 70%, mobile 90%). `design/screens/sections/<page>/` has one image per section. Use them to check that nothing visible changes.
3. `design/figma-layers/*.txt` — raw layer dump of each Figma frame (every text, colour, font, size, position). The legend is at the top of each file.
4. `design/tokens/tokens.css` (+ `tokens.json`) — CSS variables and typography classes. Use the variables; never hard-code colours.
5. `design/IMAGES.md` — which image goes where. Images are in `public/images/` (served at `/images/...`).
6. `OPEN_QUESTIONS.md` — known content/design issues and the defaults to follow.

`design/`, `START-HERE.md`, `CODEX_PROMPTS.md` and `OPEN_QUESTIONS.md` are handoff files: never delete or overwrite them (you may append notes to `OPEN_QUESTIONS.md`). Only the owner edits `AGENTS.md`.

## 2. Tech stack

- **Angular 22** (the workspace exists). Current Angular practices:
  - standalone components only (no NgModules), `ChangeDetectionStrategy.OnPush`
  - signals for state (`signal`, `computed`), `input()` / `output()` functions instead of decorators
  - built-in control flow `@if`, `@for` (with `track`), `@switch` — not `*ngIf` / `*ngFor`
  - `inject()` for dependency injection; strict TypeScript; no `any`
  - typed Reactive Forms for the contact form
- **Styling: SCSS.** Global styles in `src/styles.scss`; component styles scoped to each component. No UI kits (no Angular Material, Bootstrap, Tailwind).
- **Rendering: static site generation (prerendering).** `@angular/ssr`, every route `RenderMode.Prerender` in `app.routes.server.ts`, `"outputMode": "static"` in `angular.json`, hydration on (`provideClientHydration(withEventReplay())`).
  _Why:_ every page must be real HTML that Google and social-media previews can read, and the output must be plain static files because the site is hosted on **cPanel (Apache + PHP, no Node.js)**.
  The code must be SSR-safe: never touch `window`, `document`, `localStorage` etc. directly at load time; use `inject(DOCUMENT)`, `isPlatformBrowser`, or `afterNextRender()`.
- **Icons: `lucide-angular`**. Stroke width 1.5 on the home page, 2 on the inner pages, `aria-hidden="true"` on decorative icons.
- **Allowed extra packages:** `lucide-angular`, `@angular/cdk`. Ask before adding anything else.
- **Fonts:** Google Fonts `<link>` in `src/index.html` (Inter 400/500/600/700/800, Plus Jakarta Sans 400/700/800, `display=swap`, with preconnect). The production build inlines the Google Fonts CSS.
- **Images:** `NgOptimizedImage` (`ngSrc`, explicit `width`/`height` or `fill`, `priority` on the above-the-fold image of each page). Use the `.webp` files from `public/images/`.
- **Contact form and email (the one direction):** the Angular form posts JSON with `HttpClient` (`provideHttpClient(withFetch())`) to **`/api/contact.php`** on the same hosting. `public/api/contact.php` checks the origin, the honeypot, the minimum fill time and reCAPTCHA (§9), validates every field, and sends the email with PHP `mail()` from `website@gnod-tech.co.za` to **info@gnod-tech.co.za**, with the visitor's email as Reply-To. It answers JSON `{ ok: true }` or `{ ok: false, errors: {...} }` with proper HTTP status codes. Settings live in `public/api/contact-config.php` (no secrets in it). No third-party form services (no FormSubmit).

## 3. Scripts

The workspace already exists; don't scaffold it again.

- `npm start` — `ng serve` at http://localhost:4200 (with `proxy.conf.json` forwarding `/api` to `http://localhost:8080`)
- `npm run api` — `php -S localhost:8080 -t public`, to test the form locally
- `npm run build` — production build into `dist/gnod-website/browser/`
- `npm run preview` — serve the built static site (`npx http-server dist/gnod-website/browser -p 8081`)
- `npm run seo:check` — runs `scripts/seo-check.mjs` (§8.6)

## 4. Structure

```
src/
  index.html                 fonts, favicon links, GA4 snippet (§8.4)
  styles.scss                imports styles/*
  styles/                    tokens.css, _base.scss, _typography.scss, _layout.scss, _mixins.scss
  app/
    app.config.ts            provideRouter(routes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withComponentInputBinding()), provideHttpClient(withFetch()), provideClientHydration(withEventReplay())
    app.routes.ts            routes below
    app.routes.server.ts     every route RenderMode.Prerender
    core/                    seo.service.ts (title, description, canonical, Open Graph, Twitter), json-ld.service.ts, site.config.ts (phone, email, address, URLs, form endpoint, reCAPTCHA site keys), recaptcha.service.ts
    layout/                  top-bar/, site-header/ (navigation + mobile menu), site-footer/
    shared/ui/               button (attribute directive on <a>/<button>), eyebrow, pill, icon-badge, section-heading, service-card, accordion …
    content/                 site.content.ts (nav, footer, contact details), home.content.ts, about.content.ts, process.content.ts, contact.content.ts — typed arrays for all repeated content (cards, lists, FAQ, links), copied exactly from DESIGN_SPEC.md
    pages/
      home/                  home page + sections/ (hero, client-logos, trust, services, custom-software, process, selected-work, support-services, local-presence, social-proof, faq, quote-cta) + mockups/ (dashboard, app-window, phone, architecture-diagram)
      about/  our-process/  contact/  privacy/  terms/  not-found/
public/
  images/                    from the handoff (served at /images/…)
  api/contact.php  api/contact-config.php  api/recaptcha.example.php
  .htaccess  robots.txt  sitemap.xml  site.webmanifest  favicon.ico  og-image.png  icons…
scripts/
  seo-check.mjs
```

## 5. Routes

| Path                 | Page                       | Notes                                                                           |
| -------------------- | -------------------------- | ------------------------------------------------------------------------------- |
| `/`                  | Home                       | section ids: `services`, `custom-software`, `process`, `work`, `support`, `faq` |
| `/about`             | About GNOD                 |                                                                                 |
| `/our-process`       | Our process                |                                                                                 |
| `/contact`           | Contact & Get a free quote | form has `id="quote"`; reads `?service=` to pre-select the service              |
| `/privacy`, `/terms` | Legal pages                | placeholders until the owner supplies the final text                            |
| `/404` + `**`        | Not found                  | prerender `/404`; Apache serves it for unknown URLs                             |

- Links to home sections from other pages: `routerLink="/" fragment="services"`. Links in the DESIGN_SPEC are written as URLs (`/contact#quote` → `routerLink="/contact" fragment="quote"`).
- Every route sets its title + description through route `data` and `SeoService` (§8).
- Header and footer are the same on every page.
- Don't add routes. The old site's addresses are redirected in `public/.htaccess` (§12).

## 6. Breakpoints & layout

- Desktop ≥1200px (design 1440), tablet 768–1199px (design 768), mobile ≤767px (design 390). Breakpoints live in SCSS mixins.
- Container: max-width 1280px, side padding 80 / 40 / 20px. Inner pages' body content: max-width 1024px.
- Only the home page has tablet/mobile designs. For other pages follow `DESIGN_SPEC.md` §9.
- Must look right from 320px to 1920px wide. No horizontal scrolling.

## 7. Fidelity rules

- The built site matches the Figma screens and has been approved: spacing, sizes, colours, font weights (most headings are Plus Jakarta Sans **400**), radii, shadows.
- The copy on the site is final. Don't edit it. New text is allowed only where §15 says (meta tags, schema, and the owner's final Privacy and Terms text).
- Decorative mock-ups are Angular components wrapped in `aria-hidden="true"`.
- Follow the defaults in `OPEN_QUESTIONS.md` for the known glitches.

## 8. SEO

### 8.1 Tags per page

`SeoService` sets `<title>`, meta description, `<link rel="canonical">`, Open Graph and Twitter tags per route; `<html lang="en-ZA">`. The canonical is `https://gnod-tech.co.za/` for the home page (with the slash, matching the sitemap) and `https://gnod-tech.co.za` + path elsewhere, never with a query string. `og:url` equals the canonical. Titles stay under 60 characters and descriptions under 160.

| Route | Title | Description |
| --- | --- | --- |
| `/` | Custom Software & IT Services in Centurion \| GNOD | GNOD designs, builds and supports custom software, web and mobile apps, cloud, security and managed IT for businesses in Centurion, Pretoria and Johannesburg. |
| `/about` | About GNOD Technologies \| Software & IT Team in Centurion | Meet the team behind GNOD Technologies, a Centurion-based custom software and IT services company helping South African businesses since 2023. |
| `/our-process` | Our Software Development Process \| GNOD Technologies | From discovery to ongoing support: how GNOD plans, designs, builds, tests and launches custom software with you. |
| `/contact` | Get a Free Quote \| Contact GNOD Technologies, Centurion | Request a proposal for custom software or IT services. Call 012 663 3699 or email info@gnod-tech.co.za. |
| `/privacy` | Privacy Policy \| GNOD Technologies | (keep the current one) |
| `/terms` | Terms \| GNOD Technologies | (keep the current one) |
| `/404` | Page Not Found \| GNOD Technologies | (keep the current one) |

Open Graph and Twitter titles and descriptions follow the same text.

### 8.2 Pages Google must not index

- `/404`: `<meta name="robots" content="noindex">` and no canonical. The page itself stays as designed.
- `/privacy` and `/terms`: `noindex`, and left out of the sitemap, until the owner supplies the final text. Then remove the `noindex` and add them to the sitemap.

### 8.3 Structured data

`JsonLdService` adds `<script type="application/ld+json">` to `<head>` via `DOCUMENT`/`Renderer2` (Angular strips `<script>` from templates):

- `ProfessionalService` + `LocalBusiness` on every page: GNOD Technologies, +27 12 663 3699, info@gnod-tech.co.za, 59 Blinkblaar, Zwartkop, Centurion, 0157, Gauteng, ZA; `areaServed` Centurion, Pretoria, Johannesburg, South Africa; `"logo": "https://gnod-tech.co.za/images/gnod-logo.png"`; and the services:

  ```json
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software and IT services",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Custom software development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web application development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Mobile app development" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Managed IT services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cyber security" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud services" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data and reporting" } },
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "IT consulting" } }
    ]
  }
  ```

  Add `sameAs` only after the owner confirms the company's social profile links (ask in your report).
- `FAQPage` on the home page (its questions are visible there), `BreadcrumbList` on inner pages.

### 8.4 Google Analytics 4

The Measurement ID is **G-YHD04KBNQP** (property "Gnod-technologies website" on the owner's work Google account). There is no cookie banner, because that would change the design: Google's consent mode switches analytics cookies off by region for visitors in the European Economic Area, the UK and Switzerland, where the law usually expects consent first. Everyone else is counted normally.

Replace the commented-out GA4 snippet in `src/index.html` with this. It runs only on the live domain, so local testing never counts as visits:

```html
<script>
  if (location.hostname === 'gnod-tech.co.za') {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('consent', 'default', {
      analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
      region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL',
               'PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH']
    });
    gtag('consent', 'default', {
      analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied'
    });
    gtag('js', new Date());
    gtag('config', 'G-YHD04KBNQP');
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-YHD04KBNQP';
    document.head.appendChild(ga);
  }
</script>
```

- Page views: GA4's enhanced measurement counts moves between Angular pages from browser history events. Never send `page_view` yourself; it would double count.
- Lead events, browser only and only when `window.gtag` exists: `generate_lead` after `/api/contact.php` answers `ok: true`; `phone_click` on any `tel:` link; `email_click` on any `mailto:` link. Use one document-level click listener registered in `afterNextRender`.

### 8.5 Search Console, robots.txt, sitemap

- Search Console is a Domain property (`sc-domain:gnod-tech.co.za`), verified by DNS: nothing goes in the code.
- `public/robots.txt`: allow all, plus `Sitemap: https://gnod-tech.co.za/sitemap.xml`.
- `public/sitemap.xml`: `https://gnod-tech.co.za/`, `/about`, `/our-process`, `/contact` (Privacy and Terms only once their final text is in). Full https addresses, no trailing slash except the home page, never `/404`.

### 8.6 Checks after every build

`npm run seo:check` runs `scripts/seo-check.mjs` (plain Node, no extra packages) over every prerendered `index.html` in `dist/gnod-website/browser` and reports: title and description with their lengths and any duplicates; exactly one H1; canonical present, absolute and matching the page's address; `og:url` equal to the canonical; JSON-LD that parses; visible text present in the page; images without alt; internal links that don't resolve; `noindex` anywhere except where §8.2 allows; pages missing from the sitemap and sitemap entries with no page. It exits with an error when anything fails.

## 9. Interactions

- **Mobile/tablet menu**: signal-based open state, `aria-expanded`/`aria-controls`, `cdkTrapFocus` while open, Esc closes, closes on navigation, body scroll lock (browser only). Spec in `DESIGN_SPEC.md` §8.
- **FAQ**: accessible accordion, first item open, smooth height animation.
- **Client-logo marquee**: CSS animation only, paused on hover, disabled with `prefers-reduced-motion`.
- **Contact form**: typed `FormGroup` (firstName, lastName, email, phone, service, message, hidden honeypot `website`), validators, inline errors (`aria-describedby`), status signal `idle | sending | success | error`, success panel replaces the form, `aria-live` status, button disabled while sending. It posts to `SITE_CONFIG.formEndpoint` = `/api/contact.php`, with `elapsedMs` (time since the form appeared) and `recaptchaToken`. Keep its look and messages as they are.
- **reCAPTCHA** (score-based, Google Cloud reCAPTCHA):
  - The site keys live in `core/site.config.ts` (they're public): one production key for `gnod-tech.co.za` and one development key for `localhost`. Use the development key when the page runs on `localhost`. If the keys are still empty, skip reCAPTCHA entirely and send no token.
  - `RecaptchaService` loads `https://www.google.com/recaptcha/enterprise.js?render=<siteKey>` only when the contact page is shown (in `afterNextRender`), never on other pages, so the badge appears on `/contact` only. Don't hide the badge and don't add text.
  - On submit: `grecaptcha.enterprise.ready`, then `grecaptcha.enterprise.execute(siteKey, { action: 'contact' })`. Create the token at submit time: the server must assess it within two minutes.
- Hover/focus/active states: `DESIGN_SPEC.md` §8. Visible focus outlines everywhere.

## 10. Accessibility (WCAG 2.1 AA)

- Landmarks (`header`, `nav`, `main`, `footer`), one `h1` per page, logical heading order, skip link to `#main`.
- Keyboard-operable menu, accordion and form; form `<label for>`, `autocomplete`, `required`.
- Alt text per `design/IMAGES.md`; decorative images `alt=""`.
- Respect `prefers-reduced-motion`.

## 11. Performance

- Lazy-load routes (`loadComponent`). `@defer (on viewport)` for heavy below-the-fold mock-ups is fine as long as the text sections are still in the prerendered HTML.
- `NgOptimizedImage` everywhere, WebP files, `priority` only on the LCP image.
- The reCAPTCHA script loads on `/contact` only.
- Keep the initial bundle small; respect the default Angular build budgets.
- Target Lighthouse ≥ 90 for Performance, Accessibility, Best Practices and SEO on mobile.

## 12. Hosting and deployment (cPanel)

### 12.1 Facts about the live server (checked 12 October 2026)

- cPanel at `ibis.aserv.co.za`, Apache, PHP 8.2 (set by a cPanel-generated handler in `.htaccess`).
- public_html holds the old HTML site: `about.html`, `contact.html`, `index.html`, `services.html`, `service-details.html`, `robots.txt`, `sitemap.xml`, `composer.json`, the folders `css/`, `fonts/`, `images/`, `js/`, `plugins/`, `php-mail/`, and server files to keep: `.well-known/`, `.user.ini`, `php.ini`.
- Email for gnod-tech.co.za is hosted on this cPanel account. SPF is valid; DKIM isn't published yet.
- There is no `info@gnod-tech.co.za` mailbox or forwarder yet: mail to it lands in the account's default address. The owner must create the mailbox or a forwarder before launch.
- The old `php-mail/` sends through a former developer's Gmail account. It's replaced by `/api/contact.php` and must be removed after launch.

### 12.2 `public/.htaccess`

Use exactly this. It forces one address, leaves `/api/` and `/.well-known/` alone, serves `/about` from `about/index.html` without a slash redirect (`DirectorySlash Off`), redirects the old site's pages, returns a real 404, caches well, and keeps the cPanel-generated PHP lines from the live server unchanged at the bottom.

```apache
Options -Indexes
DirectorySlash Off
ErrorDocument 404 /404/index.html

RewriteEngine On

# 1. One address: https, no www. Certificate checks in /.well-known/ are left alone.
RewriteCond %{REQUEST_URI} !^/\.well-known/
RewriteCond %{HTTP_HOST} ^www\.gnod-tech\.co\.za$ [NC,OR]
RewriteCond %{HTTPS} !=on
RewriteRule ^ https://gnod-tech.co.za%{REQUEST_URI} [R=301,L,NE]

# 2. The PHP form endpoint is never routed through Angular.
RewriteRule ^api/ - [L]

# 3. Old pages from the previous HTML site. Keep for at least a year.
#    NE keeps the # in /#services from being encoded.
RewriteCond %{THE_REQUEST} \s/index\.html[\s?] [NC]
RewriteRule ^index\.html$ / [R=301,L]
RewriteRule ^about\.html$ /about [R=301,L,NC]
RewriteRule ^services\.html$ /#services [R=301,L,NC,NE]
RewriteRule ^service-details\.html$ /#services [R=301,L,NC,NE]
RewriteRule ^contact\.html$ /contact [R=301,L,NC]

# 4. One address per page: /about/ goes to /about.
RewriteCond %{REQUEST_URI} ^/(.+)/$
RewriteCond %{DOCUMENT_ROOT}/%1/index.html -f
RewriteRule ^ /%1 [R=301,L]

# 5. Serve real files as-is.
RewriteCond %{REQUEST_FILENAME} -f
RewriteRule ^ - [L]

# 6. Serve clean route URLs from their prerendered files, without a slash.
RewriteCond %{DOCUMENT_ROOT}/$1/index.html -f
RewriteRule ^(.+)$ $1/index.html [L]

# 7. Leave other real directories alone.
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

<IfModule mod_headers.c>
  # Hashed build files: one year.
  <FilesMatch "\.(?:css|js|mjs|woff2)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  # Images keep their names when replaced: one week.
  <FilesMatch "\.(?:webp|png|jpe?g|gif|svg|ico)$">
    Header set Cache-Control "public, max-age=604800"
  </FilesMatch>
  <FilesMatch "\.html$">
    Header set Cache-Control "no-cache, no-store, must-revalidate"
  </FilesMatch>
  <FilesMatch "\.php$">
    Header set Cache-Control "no-store"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/javascript application/javascript application/json application/xml image/svg+xml
</IfModule>

# BEGIN cPanel-generated php ini directives, do not edit
# Manual editing of this file may result in unexpected behavior.
# To make changes to this file, use the cPanel MultiPHP INI Editor (Home >> Software >> MultiPHP INI Editor)
# For more information, read our documentation (https://go.cpanel.net/EA4ModifyINI)
<IfModule php8_module>

</IfModule>
<IfModule lsapi_module>

</IfModule>
# END cPanel-generated php ini directives, do not edit

# php -- BEGIN cPanel-generated handler, do not edit
# Set the “ea-php82” package as the default “PHP” programming language.
<IfModule mime_module>
  AddHandler application/x-httpd-ea-php82 .php .php8 .phtml
</IfModule>
# php -- END cPanel-generated handler, do not edit
```

### 12.3 reCAPTCHA secrets on the server

`public/api/contact.php` loads the secrets from a private file outside public_html:

```php
$privateConfig = dirname($_SERVER['DOCUMENT_ROOT']) . '/gnod-private/recaptcha.php';
```

The owner creates `/home/<cpanel-user>/gnod-private/recaptcha.php` from `public/api/recaptcha.example.php` (committed, placeholders only):

```php
<?php
return [
    'project_id' => 'YOUR_GOOGLE_CLOUD_PROJECT_ID',
    'api_key'    => 'YOUR_RESTRICTED_API_KEY',
    'site_key'   => 'YOUR_PRODUCTION_SITE_KEY',
    'threshold'  => 0.5,
];
```

In `contact.php`, after the existing origin, honeypot and fill-time checks:

1. Private config missing: log it and continue without reCAPTCHA, so the form works until the keys exist.
2. No token: answer 400.
3. Assessment invalid, wrong action, or score below the threshold: answer 400 with the generic error, send nothing.
4. Google unreachable: send anyway, with "[reCAPTCHA unavailable]" at the start of the subject, so a real lead is never lost.
5. Otherwise send as normal.

Reference for the assessment (Google's CreateAssessment REST API):

```php
function gnod_verify_recaptcha(string $token, array $cfg): array {
    $url = 'https://recaptchaenterprise.googleapis.com/v1/projects/'
         . rawurlencode($cfg['project_id']) . '/assessments?key=' . rawurlencode($cfg['api_key']);
    $body = json_encode(['event' => [
        'token'          => $token,
        'siteKey'        => $cfg['site_key'],
        'expectedAction' => 'contact',
        'userAgent'      => $_SERVER['HTTP_USER_AGENT'] ?? '',
        'userIpAddress'  => $_SERVER['REMOTE_ADDR'] ?? '',
    ]]);
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $body,
        CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
    ]);
    $raw = curl_exec($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    if ($raw === false || $status !== 200) {
        return ['ok' => null, 'reason' => 'unavailable'];
    }
    $a = json_decode($raw, true);
    $valid  = $a['tokenProperties']['valid'] ?? false;
    $action = $a['tokenProperties']['action'] ?? '';
    $score  = (float) ($a['riskAnalysis']['score'] ?? 0);
    if (!$valid || $action !== 'contact') {
        return ['ok' => false, 'reason' => 'invalid', 'score' => $score];
    }
    return ['ok' => $score >= (float) $cfg['threshold'], 'reason' => 'scored', 'score' => $score];
}
```

Log the date, score and reason (no personal data) to a file in `gnod-private/`, so the owner can tune the threshold. Google suggests watching scores for 48 hours before acting on them.

### 12.4 Build and package

1. `npm run build`, then `npm run seo:check`; both must pass.
2. Zip the **contents** of `dist/gnod-website/browser/` (including `.htaccess` and `api/`) with `index.html` at the zip's root: `deploy/gnod-site-<date>.zip`. Keep `deploy/` out of Git. Report the zip's size: the owner's assistant uploads it through the browser, which takes files up to 10 MB.

### 12.5 Launch steps (write them into `DEPLOY.md`, in plain English)

1. Make sure `info@gnod-tech.co.za` exists as a mailbox or forwarder (cPanel → Email Accounts or Forwarders).
2. Back up public_html: compress it in cPanel File Manager, download the zip, then delete that zip from the server.
3. Move the old site's files out of public_html into a folder outside it, for example `/home/<cpanel-user>/old-site-2026-10/`: `about.html`, `contact.html`, `index.html`, `services.html`, `service-details.html`, `robots.txt`, `sitemap.xml`, `composer.json`, `css/`, `fonts/`, `images/`, `js/`, `plugins/`, `php-mail/`. Leave `.well-known/`, `.user.ini`, `php.ini` and `.htaccess` in place. Do steps 3 and 4 back to back: the site is offline for those few minutes.
4. Upload the site zip to public_html, extract it (it replaces `.htaccess`), then delete the zip.
5. Create `/home/<cpanel-user>/gnod-private/recaptcha.php` only when the uploaded build contains the reCAPTCHA site keys. If the file exists while the build has no keys, the form rejects every message.
6. Test: every page; every old address lands on its new page; `/about` loads without a redirect and `/about/` redirects to `/about`; a made-up address shows the 404 page with status 404; http:// and www. redirect to https://gnod-tech.co.za; one test message through the form, with the owner's OK.
7. If something breaks: move the old files back from the backup folder and restore the old `.htaccess`.
8. Search Console: submit `https://gnod-tech.co.za/sitemap.xml`, then URL Inspection → Request indexing for `/`, `/about`, `/our-process` and `/contact`.
9. Analytics → Realtime shows the visit. Mark `generate_lead`, `phone_click` and `email_click` as key events once they appear.
10. After a week without problems, delete the old-site folder outside public_html.

## 13. How to work

1. Before changing a page, look at its images in `design/screens/sections/` and keep it identical.
2. Run `npm start` while working and `npm run build` after each step; it must pass without errors.
3. If Playwright/Chromium is available, screenshot each route at 1440, 768 and 390 px before and after your changes; they must match, apart from the reCAPTCHA badge on `/contact`.
4. Small, descriptive commits (one feature per commit).
5. Questions or anything that would change what visitors see: note it in `OPEN_QUESTIONS.md` and put it in your report.

## 14. Definition of done

- [ ] Routes `/`, `/about`, `/our-process`, `/contact`, `/privacy`, `/terms`, `/404` exist; all internal links, `tel:` and `mailto:` links work; section anchors scroll correctly.
- [ ] Every page looks exactly as approved at 1440, 768 and 390 px; only `/contact` shows the reCAPTCHA badge.
- [ ] `npm run build` and `npm run seo:check` pass; every route is prerendered to its own `index.html` with full content, title, description, canonical and JSON-LD; no hydration or console errors.
- [ ] The form posts to `/api/contact.php`; it validates, blocks spam, checks reCAPTCHA when the keys exist, and sends to info@gnod-tech.co.za. No FormSubmit left anywhere.
- [ ] GA4 snippet with G-YHD04KBNQP and consent by region; lead events fire.
- [ ] `public/.htaccess` matches §12.2; sitemap.xml, robots.txt and favicons present.
- [ ] Lighthouse mobile ≥ 90 in all categories.
- [ ] `deploy/gnod-site-<date>.zip` built and `DEPLOY.md` updated with §12.5.

## 15. SEO launch: what to do now

When the owner asks you to run the SEO launch, work through these steps in order in one go. Stop early only if a check fails or a change would alter what visitors see. At the end, report in plain English: what you changed, the results of the checks, the zip's name and size, and what is waiting on the owner.

**Facts checked on 12 October 2026, so you know where to start:** `SITE_CONFIG.formEndpoint` still points to `https://formsubmit.co/ajax/info@gnod-tech.co.za`; `public/.htaccess` has no `DirectorySlash Off` and no old-page redirects; `src/index.html` has a commented-out GA4 placeholder; the 404 page has a canonical and no `noindex`; `/privacy` and `/terms` are placeholders but listed in the sitemap; the home title is 60 characters and its description 168.

1. **Rollback point.** Commit any pending work and tag it `before-seo-launch`. Create `SEO-PROGRESS.md` (checklist, owner answers, waiting on the owner, upload log).
2. **Static build.** Confirm `outputMode: "static"` and `RenderMode.Prerender` for every route; fix anything that breaks the static build without changing what visitors see.
3. **`.htaccess`.** Replace `public/.htaccess` with §12.2.
4. **Hidden SEO fixes.** Titles and descriptions per §8.1; the home canonical with its slash; `noindex` per §8.2; structured data per §8.3; sitemap per §8.5. If a heading's words run together in the HTML ("Builtfor"), add a space next to its `<br>`, only if the heading looks exactly the same afterwards.
5. **Analytics.** The GA4 snippet and lead events per §8.4.
6. **Form and email.** Point the form at `/api/contact.php` (§2, §9); remove every FormSubmit field and reference; add reCAPTCHA per §9 and §12.3, inactive while the keys are empty; add `public/api/recaptcha.example.php`. Test locally with `npm run api` and the proxy, without sending real email unless the owner agrees.
7. **Checks.** `npm run build`, `npm run seo:check`, the visual comparison (§13.3), Lighthouse on `/` and `/contact`.
8. **Package.** Build the zip (§12.4) and update `DEPLOY.md` with §12.5.

Waiting on the owner (don't block on these; list them in the report): the reCAPTCHA site keys, project ID and API key; the final Privacy and Terms text; the company's social profile links for `sameAs`; the `info@gnod-tech.co.za` mailbox or forwarder.
