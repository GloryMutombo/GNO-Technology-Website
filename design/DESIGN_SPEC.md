# GNOD Technologies website — Design Specification

Source: Figma file **"Gnod Website"** (page "Page 1"), exported 8 October 2026.
This document turns the Figma design into build instructions. It is written for an AI coding agent (Codex) and for humans.

**How to use this spec**

- Every page/section below has: a reference image, the layout (with px measurements taken from Figma), the styles, and the **exact copy** to use.
- Measurements are Figma pixels at the design widths: **desktop 1440**, **tablet 768**, **mobile 390**. `x/y` are measured from the top-left of the page frame.
- Exact per-layer data (every text, colour, size, position) is in `design/figma-layers/*.txt` — search those files whenever you need a value that is not written here.
- Full-page renders are in `design/screens/` and one image per section in `design/screens/sections/<page>/`. **They are scaled**: desktop images are 75% (1080 px wide = 1440 design px), tablet 70%, mobile 90%. Multiply by 1/scale to get design pixels.
- Tokens (colours, type, radius, shadows) are in `design/tokens/tokens.css` / `tokens.json`. Use the CSS variables instead of raw hex values.
- The site is built with **Angular** (see `AGENTS.md`). Links are written here as URLs: `/contact#quote` means `routerLink="/contact" fragment="quote"`, `/#services` means `routerLink="/" fragment="services"`, `/contact?service=web-apps#quote` adds `[queryParams]="{ service: 'web-apps' }"`.

---

## 0. What exists in Figma

| Figma frame | Size | What it is | Reference image |
|---|---|---|---|
| GNOD website — Desktop | 1440 × 9006 | Home page, desktop | `screens/home-desktop@75pct.png` |
| GNOD website — Tablet | 768 × 14065 | Home page, tablet | `screens/home-tablet@70pct.png` |
| GNOD website — Mobile | 390 × 16311 | Home page, mobile | `screens/home-mobile@90pct.png` |
| GNOD website — About GNOD | 1440 × 5703 | About page (desktop only) | `screens/about-desktop@75pct.png` |
| GNOD website — Our process | 1440 × 3854 | Our process page (desktop only) | `screens/our-process-desktop@75pct.png` |
| GNOD website — Contact & Get a free quote | 1440 × 2855 | Contact / quote page (desktop only) | `screens/contact-desktop@75pct.png` |

Only the home page has tablet and mobile designs. For About, Our process and Contact you must **derive** tablet/mobile layouts using the rules in §9 (they follow the same patterns the home page uses).

Not designed in Figma (you must build them using this design system, see §8): mobile/tablet menu panel, hover/focus/active states, form success & error states, the 5 collapsed FAQ answers, Privacy & Terms pages, 404 page.

---

## 1. Design tokens (summary)

Full list: `design/tokens/tokens.css`. The important ones:

| Role | Token | Value |
|---|---|---|
| Primary (buttons, active, icons) | `--c-primary` | `#5B3CFA` |
| Strong purple (eyebrows, links, outline buttons) | `--c-primary-strong` | `#4B0FA8` |
| Cyan accent (on dark, signal dots) | `--c-accent` | `#22D3EE` |
| Sky blue (gradient end, support icons) | `--c-sky` | `#339CE8` |
| Success green | `--c-success` | `#14A37F` |
| Midnight (top bar, footer, dark sections) | `--c-midnight` | `#100A2E` |
| Heading / ink | `--c-ink` | `#1F2333` |
| Body text (home) | `--c-text` | `#667085` |
| Body text (About/Process/Contact) | `--c-text-alt` | `#696D72` |
| Soft section bg (home) | `--c-bg-soft` | `#F4F5FA` |
| Page bg (About/Process/Contact) | `--c-bg-page` | `#F6F7F9` |
| Lavender (icon badges, presence bg) | `--c-lavender` | `#F1EDFF` |
| Card border (home) | `--c-border` | `#DFE3EE` |
| Card/input border (subpages) | `--c-border-alt` | `#DFE1E4` |

Gradients: hero `linear-gradient(90deg,#F8F5FF 0%,#EFF8FF 60%,#FFF 100%)`; CTA `linear-gradient(90deg,#4B0FA8 0%,#5B3CFA 60%,#339CE8 100%)`.

Radius: buttons/inputs/icon badges **12**, home cards **16**, big visual panels **24**, subpage cards **14**, pills **fully rounded** (28px tall pill → radius 14).

Shadows: home cards & primary buttons `0 12px 32px -8px rgba(36,18,86,.094)`; big visuals `0 24px 56px -12px rgba(22,11,59,.161)`; subpage cards `0 2px 4px rgba(16,10,46,.08)`.

---

## 2. Typography

Two Google fonts: **Plus Jakarta Sans** (display/headings) and **Inter** (body/UI).
Load: `https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;700;800&display=swap`

Important: most section headings are **Plus Jakarta Sans Regular (400)** with tight negative letter-spacing — they are *not* bold. Only the hero titles, the CTA title, "3+", quote marks and FAQ questions are bold.

| Role (class in tokens.css) | Font | Weight | Desktop size/line-height | Tablet | Mobile | Letter-spacing | Used for |
|---|---|---|---|---|---|---|---|
| `.t-hero` | Plus Jakarta Sans | 800 | 64/67 | 48/50 | 40/42 | -2.5px (mobile -1.5px) | Home H1 |
| `.t-hero-sub` | Plus Jakarta Sans | 800 | 64/84 | (48/56)* | (40/48)* | -1px | About / Process / Contact H1 |
| `.t-h2` | Plus Jakarta Sans | 400 | 44/49 | 38/43 | 32/36 | -1.5px | Home section titles |
| `.t-h2-sub` | Plus Jakarta Sans | 400 | 32/40 | (30/38)* | (28/36)* | -0.32px | Subpage section titles |
| `.t-cta` | Plus Jakarta Sans | 800 | 42/47 | 42/47 | 32/36 | -1.3px | Quote CTA title |
| `.t-h3-xl` | Plus Jakarta Sans | 400 | 34/43 | 34/43 | 28/33 | 0 | Primary service title, presence caption (34/40) |
| `.t-h3-lg` | Plus Jakarta Sans | 400 | 25/31 | 25/31 | 22/28 | 0 | Case-study titles |
| `.t-h3-sub` | Plus Jakarta Sans | 400 | 24/32 | | | -0.24px | Subpage card titles |
| `.t-quote` | Plus Jakarta Sans | 400 | 22/32 | 22/32 | 20/29 | 0 | Testimonial quotes |
| `.t-h3` | Plus Jakarta Sans | 400 | 21/27 | 21/27 | 21/27 | 0 | Service / support / process card titles |
| `.t-h4` | Plus Jakarta Sans | 400 | 20/25 | | | 0 | "Technology built for the long run" |
| `.t-prompt` | Plus Jakarta Sans | 700 | 20/28 | | | 0 | "Not sure what shape…" |
| `.t-h5` | Plus Jakarta Sans | 400 | 17/22 | | | 0 | Proof-point titles |
| `.t-faq-q` | Plus Jakarta Sans | 700 | 17/22 | | 17/23 | 0 | FAQ questions |
| `.t-lead-xl` | Inter | 400 | 19/31 | 19/31 | 17/28 | 0 | Home hero paragraph |
| `.t-lead` | Inter | 400 | 18/29 | 18/29 | 16/26 | 0 | Section descriptions |
| `.t-lead-sm` | Inter | 400 | 17/28 | 17/28 | 17/28 | 0 | Right-column section summaries |
| `.t-body-lg` | Inter | 400 | 16/26 | | | 0 | Primary service description |
| `.t-body-sub` | Inter | 400 | 16/24 | | | 0 | Subpage paragraphs (`#696D72`) |
| `.t-body` | Inter | 400 | 15/24 | | | 0 | FAQ answer, benefit list (15/22 when wrapping) |
| `.t-body-sm` | Inter | 400 | 14/22 | | | 0 | Card descriptions |
| `.t-caption` | Inter | 400 | 13/20 | | | 0 | Notes |
| `.t-link` | Inter | 400 | 13/16 | | | 0 | "Explore this service →" |
| `.t-label` | Inter | 400 | 12/15 | | | 0 | Pills / tags |
| `.t-eyebrow` | Inter | 800 | 12/15 | | | 1.2px, UPPERCASE | Section eyebrows |
| `.t-eyebrow-sm` | Inter | 800 | 11/14 | | | 0.7–1.2px, UPPERCASE | "THE NEED", "TYPICAL PERSPECTIVE", footer column titles |
| `.t-button` | Inter | 700 | 15/19 | | | 0 | Home buttons |
| `.t-nav` | Inter | 600 | 14/17 | | | 0 | Navigation links |

\* not designed — suggested values.

---

## 3. Layout, grid & breakpoints

| | Desktop (≥1200px) | Tablet (768–1199px) | Mobile (≤767px) |
|---|---|---|---|
| Design frame width | 1440 | 768 | 390 |
| Side padding (gutter) | 80 | 40 | 20 |
| Home content width | 1280 (max) | 688 | 350 |
| Subpage content width | 1024 (208 side padding at 1440) | 688 | 350 |
| Home section padding top/bottom | ≈95 | ≈71 | ≈55 |
| Top bar height | 40 | 40 | 36 |
| Navigation height | 84 + 2px bottom border | 84 + 2 | 72 + 2 |

- Use a centered container: `max-width: 1280px; margin: 0 auto; padding-inline: 80px` (40 / 20 on smaller screens). Between 1200 and 1440 px let the layout shrink fluidly (columns use `fr`/percentages, not fixed px).
- Subpage content (About/Process/Contact body) uses a narrower container: `max-width: 1024px`. The header and footer always use the 1280 container.
- Breakpoints: `@media (max-width: 1199.98px)` → tablet layout, `@media (max-width: 767.98px)` → mobile layout.

---

## 4. Icons

All icons are **Lucide** icons (https://lucide.dev), used through the **`lucide-angular`** package (tree-shakable; import only the icons you use) — no icon fonts. Home page icons use stroke width `1.5`; About/Process/Contact icons use the Lucide default `2`. Icons are decorative → `aria-hidden="true"`. Lucide names below are kebab-case; in `lucide-angular` they are imported in PascalCase (e.g. `arrow-up-right` → `ArrowUpRight`).

Icons used (Figma layer name → Lucide name):

| Where | Icons |
|---|---|
| Top bar, buttons, footer | `phone`, `arrow-up-right`, `arrow-right`, `arrow-down-right`, `message-circle`, `map-pin`, `menu`, `users`, `send` |
| Hero dashboard mock-up | `lightbulb`, `layout-dashboard`, `folder` (or `archive`), `users`, `chart-column` (Figma: bar-chart-3), `settings`, `code` / `code-xml` (Figma: code-2) |
| Trust proof points | `map-pin`, `users-round`, `earth` (Figma: globe-2) |
| Services | `braces`, `monitor-smartphone`, `smartphone`, `cloud-cog`, `shield-check`, `headphones`, `database-zap`, `compass` |
| Custom software section | `check`, `message-circle`, `arrow-down-right`, `circle-help`, `users`, `workflow`, `braces`, `chart-column`, `plug-zap`, `arrow-right` (connector) |
| Process | `search`, `pencil-ruler`, `code-xml`, `refresh-cw` |
| Case-study mock-ups | `layout-dashboard`, `inbox`, `users`, `settings`, `check` |
| Support services | `headphones`, `shield-check`, `cloud`, `database`, `compass`, `arrow-up-right` |
| Local presence | `map-pin`, `coffee`, `clock-3`, `languages`, `users` |
| Social proof | `info`, `user-round` |
| FAQ | `plus`, `minus`, `message-circle` |
| About | `circle-check`, `map-pin`, `target`, `zap`, `shield-check` |
| Our process | `lightbulb`, `settings-2`, `code-xml`, `shield-check`, `rocket`, `clipboard-check`, `circle-check`, `arrow-right`, `search`, `zap`, `users-round`, `arrow-up-right` |
| Contact | `circle-check`, `phone`, `mail`, `map-pin`, `clock`, `chevron-down`, `send`, `building-2`, `earth`, `chevron-right`, `message-square` |

---

## 5. Shared components

### 5.1 Top bar (all pages)
- Height 40 (mobile 36), background `--c-midnight`.
- Left: "Reliable software and IT solutions in Centurion" — Inter 12/15, `#DAD5EB` (mobile: Inter 10). Vertically centred.
- Right (hidden on mobile): `phone` icon 12px, stroke `#22D3EE`, 8px gap, "012 663 3699" Inter 12/700 white. Link → `tel:+27126633699`.

### 5.2 Navigation bar (all pages)
- Height 84, white, bottom border 2px `#E8E8F0`. Content in the 1280 container.
- **Logo** `public/images/gnod-logo.png` displayed at **130 × 60** (`object-fit: cover`), vertically centred. Links to the home page. Tablet 130 × 53, mobile 81 × 32.
- **Desktop links** (right-aligned, 30px apart): Services · Custom software · Our process · Work · About — Inter 14/600 `#1F2333`. Then the primary button **"Get a free quote" + `arrow-up-right`** (31px after the last link).
- **Tablet** (768): logo left; right group (12px gaps): "Services", "Work" (Inter 14/400), primary button "Free quote" (151 × 52), menu button 43 × 43 (white, 1px `#DFE3EE` border, radius 12, `menu` icon `#1F2333`).
- **Mobile** (390): nav height 72; logo 81 × 32 at left; menu button 44 × 44, background `#F1EDFF`, radius 12, `menu` icon `#4B0FA8`.
- Link targets: Services → `/#services`, Custom software → `/#custom-software`, Our process → `/our-process`, Work → `/#work`, About → `/about`, Get a free quote → `/contact#quote`.
- Mark the current page link with `routerLinkActive` + `ariaCurrentWhenActive="page"` (style: colour `#4B0FA8`).

### 5.3 Buttons
| Variant | Spec |
|---|---|
| Primary (home) | height 52, padding 0 22px, radius 12, bg `#5B3CFA`, text Inter 15/700 white, icon 16px after text with 10px gap, shadow `--sh-card` |
| Outline (home) | height 51–52, radius 12, 1px border `#4B0FA8`, transparent bg, text Inter 15/700 `#4B0FA8`, icon after text |
| White on dark | height 52, radius 12, bg white, text Inter 15/700 `#4B0FA8` |
| Outline on dark/gradient | 1px border `rgba(255,255,255,.31)` (CTA) or white, text white |
| Subpage primary | height 48–56, radius 14, bg `#5B3CFA`, Inter 14/500 `#F6F7F9`, shadow `0 8px 24px rgba(16,10,46,.15)` |
| Subpage secondary | height 55, radius 14, bg `#F6F7F9`, 1px border `#DFE1E4`, Inter 14/500 `#240059` |

Mobile: buttons inside content become **full width** (350px) and stack with 12–13px gaps.

### 5.4 Eyebrow (section label)
A 24 × 2 bar (radius 1, `#5B3CFA`; on dark sections `#22D3EE`) + 8px gap + text Inter 12/800, letter-spacing 1.2px, uppercase, `#4B0FA8` (`#22D3EE` on dark). The title starts 13px below the eyebrow (eyebrow box 15px tall, title at +28).

### 5.5 Pill / tag
Height 28, radius 14, white bg, 1px `#DFE3EE` border, text Inter 12/15 `#1F2333`, padding 0 11px, gap 8–9px between pills.
Hero badge variant: white bg, border `#DDD5F8`, 7px cyan dot (`#22D3EE`) 11px from the left, 8px gap, text Inter 12/700 `#4B0FA8`.
Subpage tag ("LOCAL PRESENCE"): height 25, radius 13, bg `rgba(75,15,168,.05)`, border `rgba(75,15,168,.2)`, Inter 10/700 uppercase `#4B0FA8`, padding 0 16px.

### 5.6 Icon badge
Square tile with centred icon: 42 / 48 / 56px, radius 12, bg `#F1EDFF`, icon `#5B3CFA` (≈18px). Support services use bg `#EAF7FF` + icon `#339CE8`. On dark cards: bg `#29204D`, icon `#22D3EE`.

### 5.7 Card (home)
White, radius 16, 1px `#DFE3EE` border, shadow `--sh-card`, padding 24. Title `.t-h3`, description `.t-body-sm`, link `.t-link` ("Explore this service" + `arrow-right` 9px, 8px gap).

### 5.8 Footer (all pages)
- Background `#100A2E`; padding-top 71, bottom bar at the end. Height ≈416 (desktop).
- **Left column** (335 wide): logo 168 × 69 (`gnod-logo.png`, see open question about contrast), then summary Inter 14/22 `#AFA8C8`: "Custom software development and dependable IT services from Zwartkop, Centurion — supporting organisations across South Africa and abroad." Then two contact lines (9px apart): `phone` (13px, `#22D3EE`) + "012 663 3699" Inter 14/700 white; `map-pin` (`#22D3EE`) + "Zwartkop, Centurion, South Africa" Inter 13 `#D7D2E6`.
- **Three link columns** at x = 512, 811, 1109 (desktop). Title Inter 11/800, letter-spacing 1px, `#22D3EE`; links Inter 13/16 `#D7D2E6`, 30px apart (first link 26px below the title).
  - SOFTWARE: Custom development · Web applications · Mobile applications · Systems integration · Software modernisation
  - IT SERVICES: Managed IT · Security · Cloud · Data & reporting · Consulting
  - COMPANY: Our process · Selected work · About GNOD · Contact · Get a free quote
- **Bottom bar**: 1px line `#2C2551` (full container width), 22px below: "© 2026 GNOD Technologies. All rights reserved." (Inter 11 `#8F88AC`) left; "Privacy" and "Terms" (same style, 21px apart) right. Use the current year dynamically.
- Tablet: intro block full width (summary 2 lines), the 3 columns side by side below it (x 40 / 285 / 531). Mobile: SOFTWARE and IT SERVICES side by side (x 20 / 197), COMPANY below; copyright and legal links on separate lines.
- Link targets: software items → `/#services`; IT services → `/#support`; Our process → `/our-process`; Selected work → `/#work`; About GNOD → `/about`; Contact → `/contact`; Get a free quote → `/contact#quote`; Privacy → `/privacy`; Terms → `/terms`.

---

## 6. Home page (route `/`)

Section order (desktop y-range in Figma → reference image in `screens/sections/home-desktop/`):

| # | Section | id | Desktop y | Background |
|---|---|---|---|---|
| 1 | Top bar + navigation + hero | `#top` | 0–822 | white / hero gradient |
| 2 | Client logos strip | `#clients` | 822–977 | hero gradient |
| 3 | Trust & experience | `#trust` | 977–1243 | white |
| 4 | Services ("What we build") | `#services` | 1243–2572 | `#F4F5FA` |
| 5 | Custom software value | `#custom-software` | 2572–3334 | `#100A2E` |
| 6 | Process | `#process` | 3334–3956 | white |
| 7 | Selected work | `#work` | 3956–5080 | `#F4F5FA` |
| 8 | Supporting technology services | `#support` | 5080–6089 | white |
| 9 | Local presence | `#presence` | 6089–6818 | `#F1EDFF` |
| 10 | Social proof | `#perspectives` | 6818–7468 | white |
| 11 | FAQ | `#faq` | 7468–8190 | `#F4F5FA` |
| 12 | Quote call to action | `#quote-cta` | 8190–8590 | white |
| 13 | Footer | — | 8590–9006 | `#100A2E` |

Same section images exist for tablet (`home-tablet/`) and mobile (`home-mobile/`) with the same numbering.

### 6.1 Hero — `01-topbar-nav-hero.png`

**Desktop** (section 124–822, 698 tall, background `--g-hero`). Two columns inside the 1280 container: copy (x 80, width 590) and visual (x 777, width 581). Copy starts 79px below the nav.

Copy column, top to bottom:
1. Hero badge (297 × 28): **"3+ years of building dependable technology"**
2. 16px gap → H1 `.t-hero` (box width 537, 4 lines): **"Custom software that fits your business — not the other way around."**
3. 19px gap → paragraph `.t-lead-xl` `#667085`, width 590: **"GNOD designs, builds and supports tailored software for growing teams and enterprises in South Africa and abroad."**
4. 26px gap → buttons (13px gap): Primary **"Get a free quote"** + `arrow-up-right` (190 × 52) → `/contact#quote`; Outline **"Call 012 663 3699"** + `phone` (206 × 51) → `tel:+27126633699`.
5. 23px gap → pills (9px gap): **"Web platforms"**, **"Mobile apps"**, **"Systems integration"**.

Visual column — a decorative "software dashboard" mock-up built in HTML/CSS (not an image; mark the whole visual `aria-hidden="true"`):
- Glow: 480 × 480 circle behind, `--glow-violet`, centred at (1060, 448).
- Dashboard card 566 × 452 at (777, 222): white, radius 24, shadow `--sh-float`, inner 1px ring `rgba(255,255,255,.5)`, overflow hidden.
  - Window bar 42 tall `#F8F9FC`: three 8px dots (`#FF7285`, `#FFC561`, `#55D7A2`, 15px apart, first at x+16); address field 489 × 24 white radius 8 with centred text "workspace.gnod.co.za" (Inter 10 `#98A0B2`).
  - Sidebar 104 wide `#100A2E`: 30 × 30 tile `#5B3CFA` radius 8 with white `lightbulb`; active item 76 × 30 `rgba(255,255,255,.09)` radius 8 with `layout-dashboard` in `#22D3EE`; four more icons (`folder`, `users`, `chart-column`, `settings`) in `#9188B5`, 44px apart.
  - Main area `#F7F8FC`, padding 22: title "Operations overview" (Plus Jakarta Sans 18 `#1F2333`) + "Live business intelligence" (Inter 9 `#667085`); status pill right "● All systems live" (97 × 21, radius 11, bg `#E9FBF6`, Inter 9/700 `#14A37F`).
  - 3 metric cards (133 × 80, radius 12, white, 1px `#E7E9F2`, 9px gap, padding 11): label Inter 9 `#667085`, value Plus Jakarta Sans 21 `#1F2333`, change Inter 8 `#14A37F` — "Active projects / 18 / +3", "Team capacity / 82% / steady", "Open actions / 24 / -6".
  - Chart card 271 × 215: "Delivery performance" (Inter 10/700) + 7 vertical rounded bars at the bottom (colours left→right: `#DCD6FF` ×4, `#5B3CFA`, `#22D3EE`, `#5B3CFA`; varying heights).
  - "Recent activity" card 135 × 215: title Inter 10/700 + 3 rows (7px dot + Inter 8 `#667085`): "Mobile release ready" (dot `#5B3CFA`), "API review complete" (`#22D3EE`), "Data sync running" (`#5B3CFA`).
- Floating note 194 × 56 at (1164, 638), overlapping the dashboard's bottom-right corner: bg `#100A2E`, radius 12, shadow `--sh-card`; 32 × 32 tile `rgba(34,211,238,.12)` radius 8 with `code` icon `#22D3EE`; "Purpose-built" (Inter 11 white) / "Secure • scalable • supported" (Inter 9 `#BDB6D8`).

**Tablet**: section 124–1202. Single column: copy (x 40, width 690) then the visual centred below (dashboard 620 × 430, glow 480). H1 48/50 (3 lines). Floating note bottom-right of the dashboard.
**Mobile**: section 108–1179. Copy width 350; H1 40/42 (4 lines); paragraph 17/28; both buttons full width (350 × 52, stacked, 13px gap); pills wrap to 2 rows. Visual: dashboard 350 × 330, radius 16, **no sidebar, no recent-activity card, no floating note**; metric cards 100 × 67 (value Plus Jakarta Sans 16); chart card full width.

### 6.2 Client logos strip — `02-client-logos.png`
- Height 155, same hero gradient. Company names as text wordmarks: Inter 48/800, letter-spacing 1.2px, colour `#696D72` at **10% opacity**, vertically centred.
- Desktop shows **MOMENTUM · REGO-TRANSACT · HSL · MOMENTUM**, cut off at both screen edges → build it as an **infinite horizontal marquee** (CSS animation, ~40s loop, pause on hover, no animation when `prefers-reduced-motion: reduce`). Gap between names ≈120px.
- Tablet shows MOMENTUM · HSL · MOMENTUM; mobile shows only MOMENTUM centred (the marquee handles this automatically).
- ⚠️ These are real company names — see OPEN_QUESTIONS.md (permission).

### 6.3 Trust & experience — `03-trust-experience.png`
**Desktop** (977–1243, white, padding 71 top):
- Left block (x 80): tile 104 × 104, radius 16, bg `#4B0FA8`, centred "3+" (Plus Jakarta Sans 42/800 white) over "YEARS" (Inter 11, letter-spacing 1px, `#22D3EE`). 20px right of it: title `.t-h4` **"Technology built for** ⏎ **the long run"** (hard line break after "for") and 9px below, description `.t-body-sm` (267 wide): **"Two decades of solving real operational challenges with practical, maintainable systems."** (⚠️ see OPEN_QUESTIONS — conflicts with "3+ years")
- Right: 3 proof points in a row (x 528, 815, 1101): icon badge 42 (`map-pin` / `users-round` / `earth`), title `.t-h5` 11px below, description Inter 14/21 `#667085`:
  - **Centurion roots** — "Close to clients in Pretoria and Johannesburg."
  - **Direct collaboration** — "Senior thinking, clear communication, human support."
  - **Built to deliver anywhere** — "Serving South Africa and international teams."

**Tablet**: story row (tile + copy, copy 527 wide, title on one line), then the 3 proof points in a row below (36px gap). **Mobile**: story row (tile + copy 230 wide); proof points stacked as rows (icon left, copy 14px to the right), 92px apart.

### 6.4 Services — `04-services.png`
**Desktop** (1243–2572, bg `#F4F5FA`, padding 95 top / 98 bottom).

Intro row: left heading block (651 wide) — eyebrow **"WHAT WE BUILD"**, H2 `.t-h2`: **"Software comes first. Everything else makes it stronger."** (2 lines). Right (x 860, width 474, bottom-aligned with the title) `.t-lead-sm`: **"From a first product idea to a modernised core system, we shape the right solution and surround it with the infrastructure, security and insight it needs to thrive."**

Bento grid (45px below the intro, 1280 wide):
- **Row 1** (560 tall): primary card (840 wide) + a 2 × 2 grid of small cards (2 × 200 wide, 20px gap; rows 260 tall, 30px gap).
  - **Primary card**: radius 16, bg `#100A2E` + photo `bg-code-eeprom.jpg` at **20% opacity** (cover), 1px border `#2C2551`, shadow `--sh-float`, overflow hidden. A 280 × 280 radial flare `--glow-flare` centred on the card's top-right corner (clipped by the card). Padding 34.
    - Icon badge 56 (bg `#29204D`, `braces` `#22D3EE`)
    - 21px gap → eyebrow (no bar) **"OUR CORE CAPABILITY"** Inter 11/800 letter-spacing 1.1px `#22D3EE`
    - Title `.t-h3-xl` white: **"Custom software development"**
    - `.t-body-lg` `#CBC5E2`, width 755: **"Purpose-built platforms, portals and internal tools designed around your workflows — not a generic template. We take responsibility from discovery through launch and support."**
    - Chips (8px gap; height 25, radius 13, bg `rgba(255,255,255,.07)`, 1px `rgba(255,255,255,.13)`, Inter 11 white): **Business systems · Workflow automation · Integrations · Modernisation**
    - Link **"Explore this service"** + `arrow-right`, Inter 13 `#22D3EE`
  - **Small cards** (component 5.7, description 3 lines in 147px): 
    - `monitor-smartphone` **Web apps** — "Fast, accessible platforms for customers and teams."
    - `smartphone` **Mobile apps** — "Useful native and cross-platform experiences."
    - `cloud-cog` **Cloud** — "Secure, scalable environments and migrations."
    - `shield-check` **Security** — "Practical protection across systems and people."
- **Row 2** (20px below, 3 cards 413 × 260, 20px gaps):
  - `headphones` **Managed IT** — "Responsive day-to-day support and proactive care."
  - `database-zap` **Data** — "Dashboards, integrations and trustworthy reporting."
  - `compass` **Consulting** — "Clear technology direction grounded in business goals."
- Every card ends with the link **"Explore this service"** → `/contact?service=<service>#quote` (pre-selects the service in the form).

Action row (65px below the grid): left `.t-prompt` (550 wide): **"Not sure what shape your solution should take? Start with the business problem."**; right: outline button **"Talk through your idea"** + `arrow-right` (235 × 51) → `/contact#quote`.

**Tablet**: intro stacked (title 38/43, summary below, full width). Primary card full width (688 × 436; chips: **Business systems · Automation · Integrations** — 3 chips). Then a 2-column grid of 7 cards (336 × 260, 16px gap) in this order: Web apps, Mobile apps, Managed IT, Security, Cloud, Data, Consulting. Consulting description on tablet/mobile: **"Technology direction grounded in business goals."** Action row stacked (prompt, then button left-aligned).
**Mobile**: everything stacked, cards 350 wide (primary 350 × 435, padding 24, title 28/33 on 2 lines), same card order as tablet, prompt 3 lines, button full width.

### 6.5 Custom software value (dark) — `05-custom-software.png`
**Desktop** (2572–3334, bg `#100A2E`, padding 95). Two columns: copy (x 80, 623 wide) and visual (x 770, 590 × 560).

Copy:
- Eyebrow (cyan bar + cyan text): **"CUSTOM SOFTWARE, PROPERLY TAILORED"**
- H2 `.t-h2` white: **"The system your business** ⏎ **has been trying to become."**
- 17px gap → `.t-lead` `#C7C1DF`: **"Off-the-shelf tools can force good teams into awkward workarounds. We study how your organisation really operates, then build software that removes friction, connects information and grows with you."**
- 32px gap → benefit list (4 rows, 36px apart): 22 × 22 circle `rgba(34,211,238,.13)` with `check` (`#22D3EE`, stroke 2) + 10px gap + Inter 15 `#E8E5F2`:
  - Shape the product around real users and business rules
  - Connect existing platforms, data and manual processes
  - Build security, maintainability and scale in from day one
  - Keep improving with a long-term South African partner
- 28px gap → buttons (12px gap): Primary **"Discuss your software"** + `message-circle` → `/contact?service=custom-software#quote`; White **"See how we work"** + `arrow-down-right` → `#process`.
- 28px gap → note box (618 × 72, radius 12, bg `rgba(255,255,255,.04)`, 1px `rgba(255,255,255,.09)`, padding 17/18): `circle-help` `#22D3EE` + `.t-caption` `#C7C1DF`: **"You don’t need a finished specification. Bring the bottleneck, opportunity or rough idea — we’ll help clarify the right first step."**

Visual "Connected system" panel (decorative, `aria-hidden`): radius 24, bg `#17103A`, 1px border `#2C2551`, shadow `--sh-float`, overflow hidden.
- Top: photo `visual-blue-code.jpg`, 590 × 230, cover.
- Bottom panel (330 tall, `--g-panel-dark`, padding 24): title "Your connected business system" (Plus Jakarta Sans 15 white) + "One tailored platform • secure by design" (Inter 10 `#AFA7CC`); pill "LIVE" right (36 × 21, radius 11, bg `rgba(34,211,238,.09)`, Inter 9/700 `#22D3EE`).
- Diagram (3 columns, vertically centred): **Inputs** (two stacked nodes 148 × 78, 9px gap) → connector `arrow-right` 12px `#22D3EE` → **Core** node (150 × 78, bg `#5B3CFA`) → connector → **Outputs** (two stacked nodes).
  - Node = white card radius 12, shadow `--sh-card`, padding 12: 34 × 34 icon tile (`#F1EDFF`, radius 8, icon `#5B3CFA`), title Inter 12/15 `#1F2333`, detail Inter 9/11 `#667085`, 7px status dot `#14A37F` at the right. Core node: white text, detail `#E3DEFF`, icon tile `rgba(255,255,255,.09)` + white icon, dot `#22D3EE`.
  - Nodes: `users` **Customer portal** / Self-service journeys · `workflow` **Team workflows** / Automated operations · `braces` **Custom core** / Built around your rules · `chart-column` **Live insight** / Decisions from data · `plug-zap` **Connect** / Systems working together.

**Tablet**: copy full width (688), visual below (688 × 560); nodes are wider (197 × 58, title + detail on one line each); last output node title is **"Integrations"** (instead of "Connect").
**Mobile**: copy 350 wide (description 16/26), buttons full width stacked, note 350 × 92; visual 350 × 520 (photo 190 tall) — diagram shows only Inputs → Core (Core node 112 × 124), **no Outputs column**.

### 6.6 Process — `06-process.png`
**Desktop** (3334–3956, white, padding 95). Intro: left eyebrow **"A PRACTICAL DELIVERY PROCESS"** + H2 (407 wide): **"Clear steps.** ⏎ **Close collaboration.** ⏎ **No black box."** (3 lines); right (x 820, width 530, bottom-aligned) `.t-lead-sm`: **"We keep the work visible from first workshop to live product, with decisions made early and progress you can understand."**

Steps (55px below), 4 equal columns (pitch ≈325):
- Marker row: 43 × 43 circle with number (Inter 12/800). Step 1: filled `#5B3CFA`, white text. Steps 2–4: white, 1px `#CFC8EE` border, text `#4B0FA8`. A 2px line `#DCD7EF` runs from 8px right of the circle to the end of the column (not after the last step).
- 21px below: icon badge 40 (radius 12) → title `.t-h3` (9px below) → description `.t-body-sm` (2 lines).
  - 01 `search` **Discover** — "We unpack the business challenge, users, constraints and success criteria."
  - 02 `pencil-ruler` **Shape** — "Together we define the smallest valuable release and a clear technical direction."
  - 03 `code-xml` **Build** — "Short, visible delivery cycles keep quality high and decisions close to the work."
  - 04 `refresh-cw` **Evolve** — "After launch, we support, measure and improve the product as your needs change."
- Note: in Figma the "04" marker is shifted 131px to the right of its column — align it with the column like 01–03.

**Tablet**: intro stacked; 4 narrow columns (≈158 wide, description wraps to 4 lines), connectors 107 long. **Mobile**: vertical timeline — circle at left, a 2px vertical connector below it (110 long), content to the right (x 80), steps 162px apart.

### 6.7 Selected work — `07-selected-work.png`
**Desktop** (3956–5080, bg `#F4F5FA`, padding 95).
Heading, **centred** (see note): eyebrow **"SELECTED WORK PATTERNS"**, H2 **"Real-world software,** ⏎ **shaped around the work."**, `.t-lead` (max 817 wide): **"Examples of the kinds of challenges we solve. Client details remain private, so these summaries focus on the problem, product and practical value created."** — Note: in Figma this centred block sits in an 817px box aligned left (centre at x≈492, not 720). Centre it on the page.

3 case-study cards (52px below; 413 × 613, 20px gaps): white, radius 16, 1px `#DFE3EE`, shadow `--sh-card`, overflow hidden.
- **Visual area** (300 tall, decorative, built in HTML/CSS):
  - Card 1: bg `#F1EDFF`; "app window" 361 × 248 (inset 26, radius 12, white, shadow `--sh-float`): bar 34 tall `#F5F6FA` with 6px dots (`#FF8CA0`, `#FFD071`, `#63DDAE`); dark rail 48 wide (`#100A2E`) with icons `layout-dashboard`, `inbox`, `users`, `settings` (`#9C94BA`); content `#FAFAFD`: title "Operations workspace" (Plus Jakarta Sans 12), 3 metric tiles 89 × 46 (radius 8, 1px `#DFE3EE`; label Inter 7 `#667085`; value Plus Jakarta Sans 14: "Overview 128", "In progress 34" (value `#5B3CFA`), "Complete 94"); chart tile with 8 bars (6 × `#C9BEFF`, last 2 `#22D3EE`; heights 24, 34, 29, 42, 38, 50, 45, 54).
  - Card 2: bg `--g-phone-visual`; phone 168 × 276 (bg `#100A2E`, radius 28, 8px bezel, screen white radius 22), bottom of the phone cut off by the visual area. Screen: "Today’s visits" (Plus Jakarta Sans 12) + 22px avatar circle `#F1EDFF`; progress card (`#4B0FA8`, radius 12): "Route progress" (Inter 8 `#DAD1FA`), "4 of 7" (Plus Jakarta Sans 18 white), track 104 × 4 `rgba(255,255,255,.2)` with 70px `#22D3EE` fill; tasks (124 × 36, radius 8): "Site inspection" (bg `#EAF7FF`, 20px circle `#339CE8` with white `check`), "Equipment check", "Client sign-off" (bg `#F4F5FA`, white circle, grey `check`).
  - Card 3: bg `#16103A` with the same app window as card 1, title "Executive reporting".
- **Copy** (padding 28): tags (pills) → 14px → title `.t-h3-lg` (2 lines) → 13px → "THE NEED" (Inter 11/800, letter-spacing .8px, `#4B0FA8`) + description `.t-body-sm` `#667085` → 16px → "THE OUTCOME" (same, `#14A37F`) + description `.t-body-sm` `#1F2333`.
  1. Tags **Operations**, **Web platform** — **"A shared operations hub for a growing service business"** — Need: "Critical jobs, approvals and documents lived across inboxes and spreadsheets." — Outcome: "One dependable workspace now gives teams a clear view of work, responsibility and next actions."
  2. Tags **Field teams**, **Mobile app** — **"A field app that keeps work moving off-site"** — Need: "Remote teams needed simpler job capture, evidence and sign-off while on the road." — Outcome: "A focused mobile workflow reduces repeat admin and keeps office and field information in sync."
  3. Tags **Data**, **Decision support** — **"A reporting layer that turns scattered data into direction"** — Need: "Leadership spent too much time reconciling different operational reports." — Outcome: "A trusted dashboard brings key signals together and makes recurring decisions easier to prepare for."
- 49px below the cards, centred Inter 13 `#667085`: **"Every engagement is different. We scope, validate and price work according to the real need — not a pre-packaged promise."**

**Tablet**: heading left-aligned (x 40); cards stacked, full width 688 (visual 300 tall, app window 636 wide; phone visual 320 tall). **Mobile**: cards 350 wide (visual 240 tall, app window 314 × 204, phone 146 × 271), titles 22/28.

### 6.8 Supporting technology services — `08-support-services.png`
**Desktop** (5080–6089, white, padding 95). Heading (860 wide): eyebrow **"ONE PARTNER BEYOND THE PRODUCT"**; H2 **"The support your software needs** ⏎ **to stay useful, secure and resilient."**; `.t-lead`: **"Custom development leads our work. These connected services help protect the investment, reduce hand-offs and keep your broader technology environment healthy."**

Grid (52px below): left a wide card 631 × 274; right a 2 × 2 grid of 307 × 274 cards (18px gaps). Card style 5.7 but icon badge bg `#EAF7FF`, icon `#339CE8`; link **"How we help"** + `arrow-up-right` (Inter 12 `#4B0FA8`) → `/contact?service=<service>#quote`. The area below the wide card is intentionally empty.
- `headphones` **Managed IT** (wide card) — "Proactive care, practical helpdesk support and dependable technology operations."
- `shield-check` **Security** — "Risk-aware protection, secure configuration and habits your team can sustain."
- `cloud` **Cloud** — "Right-sized cloud architecture, migration and ongoing optimisation."
- `database` **Data** — "Connected information, cleaner reporting and dashboards people can trust."
- `compass` **Consulting** — "Clear priorities, roadmaps and technology decisions without the jargon."

**Tablet**: 2-column grid, 5 cards 336 × 274 (16px gap), order as above. **Mobile**: stacked 350 × 250 cards.

### 6.9 Local presence — `09-local-presence.png`
**Desktop** (6089–6818, bg `#F1EDFF`, padding ≈95). Two columns: visual card (x 80, 580 × 520) and copy (x 732, 631 wide).

Visual card: radius 24, shadow `--sh-float`, overflow hidden. Background image `map-gnod-zwartkop.png` (cover, centred) + overlay `--g-map-overlay` (transparent top → `rgba(16,10,46,.95)` bottom). Padding 32:
- Top-left badge (160 × 31, radius 16, bg `rgba(255,255,255,.91)`): `map-pin` `#4B0FA8` + **"Zwartkop • Centurion"** (Inter 11 `#1F2333`).
- Bottom: caption `.t-h3-xl` 34/40 white (431 wide): **"Local enough to sit at your table. Equipped to deliver across borders."** then 10px below location chips (height 24, radius 12, bg `rgba(255,255,255,.09)`, 1px `rgba(255,255,255,.18)`, Inter 10 white, 8px gaps): **Centurion · Pretoria · Johannesburg · South Africa · International**.

Copy: eyebrow **"HERE IN GAUTENG. READY FOR ANYWHERE."**; H2 (one line) **"Technology That Goes Further."**; `.t-lead` (4 lines): **"Based in Zwartkop, Centurion, we work closely with small businesses and large enterprises across Pretoria, Johannesburg and beyond. Our way of working also supports distributed and international teams without losing the personal connection."**
Then 3 principle rows (628 × 67, radius 12, bg `rgba(255,255,255,.66)`, 12px gaps, padding 14): 36 × 36 white tile radius 8 with icon `#4B0FA8`, 12px gap, title Inter 14 `#1F2333` + description Inter 13 `#667085`:
- `coffee` **Human partnership** — "Straight conversations, shared context and people you can reach."
- `clock-3` **Responsive delivery** — "A practical rhythm that respects your team and keeps decisions moving."
- `languages` **Business-aware communication** — "We translate technology choices into outcomes and trade-offs."
Then 24px below: outline button **"Meet your technology partner"** + `users` → `/about`.

**Tablet**: visual full width (688 × 520) first, copy below. **Mobile**: visual 350 × 440 (caption 28/33, chips wrap to 2 rows), copy below, principle rows 350 × 86 (description wraps, 13/19), button full width.

> Map note: the map is a screenshot of Google Maps. See OPEN_QUESTIONS.md — consider an embedded map or a licensed static map.

### 6.10 Social proof — `10-social-proof.png`
**Desktop** (6818–7468, white, padding 95). Intro row: left eyebrow **"WHAT GOOD PARTNERSHIP FEELS LIKE"** + H2 (one line) **"Built on clarity, context and care."**; right a note box (580 × 66, radius 12, bg `#EAF7FF`, padding 15): `info` `#339CE8` + Inter 13/19 `#667085`: **"These are representative perspectives, not attributed client endorsements. They express the standard of partnership GNOD aims to deliver."**

3 cards (45px below; 415 × 330, ≈17px gaps): white, radius 16, 1px `#DFE3EE`, shadow `--sh-card`, padding 30.
- 46 × 46 circle `#F1EDFF` with a "“" glyph (Plus Jakarta Sans 28/800 `#5B3CFA`).
- Quote `.t-quote` (vertically centred in the remaining space).
- Bottom: 38 × 38 avatar circle `--g-avatar` with white `user-round`, 10px gap, "TYPICAL PERSPECTIVE" (Inter 11/800, letter-spacing .7px, `#4B0FA8`) over the role (Inter 11 `#667085`).
  1. "“The strongest partner is the one who asks about the operation before suggesting the technology.”" — Operations lead • established services business
  2. "“We value a team that can make a complex system understandable and keep us close to the decisions.”" — Product owner • enterprise team
  3. "“Good support feels personal: the context is remembered, and the next step is always clear.”" — Managing director • growing company

Use `<figure><blockquote>…</blockquote><figcaption>…</figcaption></figure>`. **Tablet**: intro stacked, note full width, cards stacked 688 × 330. **Mobile**: cards 350 × 300, quote 20/29.

### 6.11 FAQ — `11-faq.png`
**Desktop** (7468–8190, bg `#F4F5FA`, padding 95). Two columns: intro (x 80, 419 wide) and accordion (x 580, 780 wide).
Intro: eyebrow **"COMMON QUESTIONS"**; H2 **"A clearer start** ⏎ **to your next** ⏎ **technology decision."**; `.t-lead`: **"If your question is not here, a short conversation is usually the fastest route to an honest answer."**; outline button **"Ask us anything"** + `message-circle` (189 × 51) → `/contact#quote`.

Accordion: 6 items. Question row: `.t-faq-q` + 33 × 33 round toggle at the right (closed: white, 1px `#DFE3EE`, `plus` `#4B0FA8`; open: bg `#5B3CFA`, `minus` white). Answer `.t-body` `#667085`, 17px below the question. Each item ends with a 1px `#DFE3EE` divider; 19px between items. **First item open by default.** Use `<button aria-expanded aria-controls>` (or `<details>/<summary>`).
1. **What kinds of custom software do you build?** — "Business platforms, customer and partner portals, workflow tools, integrations, mobile apps, data products and modernised versions of ageing systems. The common thread is a solution tailored to a real operational need."
2. **Can you help if our idea is not fully defined?** — *(not written in Figma — DRAFT, owner to confirm)* "Yes. Many projects start with a bottleneck, an opportunity or a rough idea. We begin with a short discovery to clarify the goal, the users and the smallest valuable first release."
3. **Do you work with both small businesses and enterprises?** — *(DRAFT)* "Yes. We work with small and growing businesses as well as large enterprises. The approach scales: the same practical process, sized to your team, budget and risk."
4. **Can you improve or replace an existing system?** — *(DRAFT)* "Yes. We can extend, integrate or modernise what you already have, or plan a careful step-by-step replacement that keeps your operations running."
5. **Do you support software after launch?** — *(DRAFT)* "Yes. After launch we support, monitor and keep improving the product as your needs change, with ongoing maintenance and managed IT options."
6. **Do you only work in Centurion?** — *(DRAFT)* "No. We are based in Zwartkop, Centurion and work with clients in Pretoria, Johannesburg, across South Africa and internationally."

Add FAQPage JSON-LD with the final answers. **Tablet/Mobile**: intro stacked above the list; questions wrap (17/23), toggles stay right-aligned.

### 6.12 Quote call to action — `12-quote-cta.png`
**Desktop** (8190–8590, white). Panel 1280 × 272 (y 8254), radius 24, bg `--g-cta`, shadow `--sh-float`, overflow hidden; a 360 × 360 `--glow-cyan` circle centred near the top-right (x≈1230, y≈8344), clipped by the panel. Padding 55/56.
- Left (799 wide): eyebrow without bar **"YOUR IDEA DESERVES A USEFUL NEXT STEP"** (Inter 11/800, letter-spacing 1.2px, `#22D3EE`); 10px → title `.t-cta`: **"Let’s turn the challenge into software that works."** (2 lines); 14px → Inter 16 `#E6E2FF`: **"Tell us what is getting in the way. We’ll listen, ask the right questions and outline a practical route forward."**
- Right (290 wide, vertically centred): white button **"Get a free quote"** + `arrow-up-right` (290 × 52) → `/contact#quote`; 12px below an outline button (1px `rgba(255,255,255,.31)`) with `phone` + **"012 663 3699"** (Inter 14/700 white) → `tel:+27126633699`.

**Tablet**: panel 688 × 417, copy then buttons full width (600) stacked. **Mobile**: panel 350 × 456, title 32/36 (4 lines), buttons full width.

### 6.13 Footer — `13-footer.png`
See §5.8.

---

## 7. Inner pages (desktop designs; derive tablet/mobile with §9)

All three pages: page background `#F6F7F9`, same top bar, navigation and footer as the home page. Body content uses the **1024px container** (x 208–1232 at 1440). Section titles use `.t-h2-sub` (Plus Jakarta Sans 32/40, 400) and paragraphs `.t-body-sub` (Inter 16/24 `#696D72`).

### 7.1 About page (route `/about`) — `screens/sections/about-desktop/`

**1. Hero** (`01-topbar-nav-hero.png`, y 118–884, 766 tall). Background `#100A2E` + `bg-code-js.jpg` at **12.5% opacity** (cover). Two decorative blurred circles, clipped to the section: 384px `rgba(75,15,168,.2)` with `filter: blur(120px)` at the top-right (x 1152, y 22), and 256px `rgba(222,226,255,.2)` blur(100px) at the bottom-left (x -96, y 723). 1px line `#DFE1E4` at the bottom.
- Left column (x 208, 584 wide), starting 131px below the nav:
  - Hero badge: **"Established 2023"**
  - 21px → H1 `.t-hero-sub` colour `#F6F5FF`: **"Technology Built** ⏎ **for What’s Next."**
  - 45px → Inter 18/29 `#C5BDFF`: **"Since 2023, GNOD Technologies has been helping businesses turn complex technology challenges into practical, reliable digital solutions. Based in South Africa, we combine software development, IT consulting, cybersecurity, and cloud technologies to help businesses operate smarter, scale confidently, and grow in a digital-first world."**
  - 44px → two chips (height 38, radius 19, bg `rgba(255,255,255,.05)`, 1px `rgba(255,255,255,.1)`, padding 0 18px, 18px gap): `circle-check` (15px `#22D3EE`) + Inter 14 `rgba(255,255,255,.8)`: **"4 Core Services"**, **"End-to-End IT Solutions"**.
- Right: glass card 399 × 308 at (833, 346): radius 16, bg `rgba(255,255,255,.05)`, 1px `rgba(255,255,255,.1)`, `backdrop-filter: blur(2px)`, shadow `--sh-hero-card`; inside, inset 17px, image `bg-code-js.jpg` (365 × 273, cover) with overlay `--g-about-card-overlay`.

**2. Local presence** (`02-local-presence.png`, y 884–1663, bg `#F6F7F9`).
- Left: map card 479 × 320 at (209, 1114): radius 16, 1px `#DFE1E4`, shadow `--sh-sub-float`, overflow hidden, image `map-gnod-zwartkop.png` (cover). Pill at top-left (+24/+24): 220 × 38, radius 19, bg `#4B0FA8`, shadow `--sh-sub-pin`, `map-pin` white + **"HQ: Centurion, Gauteng"** (Inter 14/600 `#F6F7F9`).
- Right (x 752, 481 wide, starting y 1014): tag **"LOCAL PRESENCE"** (5.5 subpage tag) → 16px → H2: **"Local Expertise.** ⏎ **Global Vision."** → 18px → accent bar 80 × 2 `#4B0FA8` → 66px → paragraph: **"Our deep-rooted presence in South Africa allows us to understand the unique challenges and opportunities within the local market. We combine this localized insight with global best practices to deliver world-class IT services."**

**3. Our journey** (`03-journey-timeline.png`, y 1663–2836, bg `rgba(234,236,238,.3)`, 1px `#DFE1E4` lines at top and bottom).
- Centred header: tag **"OUR JOURNEY"** → H2 **"A Legacy of Innovation"** → 18px → accent bar 80 × 2 centred.
- Left (x 208): vertical timeline, 5 items. Each item: 48 × 48 circle (bg `#F6F7F9`, 2px border `#4B0FA8`, shadow `--sh-sub-card`, number Inter 16/700 `#4B0FA8`); a 1px `#DFE1E4` vertical line connects the circles (x 232); title Plus Jakarta Sans 18/28 (letter-spacing -0.18px, `#1F2333`) 32px right of the circle, description Inter 14/23 `#696D72` (max 452 wide) below it. Use a consistent ~40px gap between items (Figma spacing is uneven).
  1. **04 — The Genesis**: "GNOD Technologies was founded with a vision to provide enterprise-grade custom software to local businesses."
  2. **10 — Cloud Transformation**: "Pioneered cloud migration strategies for major retail chains, setting new standards for scalability in the South African tech landscape."
  3. **16 — Security First**: "Strengthened our service offering with cybersecurity solutions designed to help businesses identify risks, protect their digital assets, and build more secure technology environments."
  4. **20 — Embracing Smarter Technology**: "Continued expanding our technical capabilities across cloud, automation, and modern software solutions, with a focus on helping businesses operate more efficiently and securely."
  5. **24 — Looking Ahead**: "We continue to explore emerging technologies such as AI and intelligent automation, expanding our capabilities and looking for new ways to help businesses solve problems, improve efficiency, and embrace the future of technology."
  ⚠️ The numbers (04…24) look like years 2004–2024 but the company was established in 2023 — see OPEN_QUESTIONS.md.
- Right: image card 399 × 301 at (833, 1959): a 4px gradient frame (`--g-journey-frame`, radius 16) around `photo-purple-fibres.jpg` (radius 15, cover), shadow `--sh-sub-float`.

**4. Team & culture** (`04-team-culture.png`, y 2836–4183, bg `#F6F7F9`).
- Header left-aligned (x 208): tag **"THE CORE TEAM"** → H2 **"Meet the Team Behind GNOD"** → accent bar → paragraph (636 wide): **"We’re a focused team of developers and technology professionals passionate about building practical digital solutions. We combine technical expertise, creativity, and a problem-solving mindset to help businesses turn their ideas and challenges into technology that works."**
- Team row (y 3259): 3 people centred on the page, 264px apart (centres x ≈ 456, 720, 984). Each: 120 × 120 circular photo (bg `#CED0F8`, cover, shadow `--sh-sub-form`) → 25px → name (Plus Jakarta Sans 18/28, letter-spacing -0.18px, `#1F2333`, centred) → role (Inter 12/16, 600, letter-spacing .6px, uppercase, `#4B0FA8`, centred, 2 lines):
  - `team-steven-ndaye.jpg` **Steven Ndaye** — FOUNDER, CEO & ⏎ SENIOR DEVELOPER
  - `team-glory-mutombo.jpg` **Glory Mutombo** — SOFTWARE ⏎ DEVELOPER
  - `team-gedeon-bafinamene.jpg` **Gedeon Bafinamene** — SOFTWARE ⏎ DEVELOPER
- Culture card (y 3616): 1022 × 438, radius 24, 1px `#DFE1E4`, shadow `--sh-hero-card`, overflow hidden; image `photo-particles.jpg` (cover) + overlay `--g-culture-overlay` (dark purple at the bottom). Text bottom-left (padding 48 left, ~28 bottom):
  - Plus Jakarta Sans 32/40 **700** white: **"A Culture of Collaboration & Innovation"**
  - Inter 16/24 `rgba(255,255,255,.8)`, 533 wide: **"We believe great technology starts with great ideas and collaboration. Our team works closely together, combining technical expertise, creativity, and curiosity to solve real-world challenges and build practical digital solutions for the future."**

**5. Mission, vision & values** (`05-mission-vision-values.png`, y 4183–4961). Background `#100A2E` + `bg-code-closeup.jpg` at 12.5% opacity.
- Two columns (x 208 and x 760, ≈440 wide), starting 128px from the top: title `.t-h2-sub` white, 28px → Inter 18/29 `#C8CBCF`:
  - **Our Mission** — "To empower African enterprises with resilient, innovative, and ethically-engineered technology solutions that drive sustainable growth and digital sovereignty."
  - **Our Vision** — "To be the premier technology partner for the continent's leading organizations, recognized for our absolute reliability, technical depth, and local commitment."
- Value cards (y 4588): 3 cards 320 × 245, 32px gaps, bg `#F6F7F9`, radius 14, shadow `--sh-sub-card`, padding 32: icon badge 48 (radius 14) → 24px → title Plus Jakarta Sans 20/28 (letter-spacing -0.2px, colour `#370082`) → 17px → Inter 14/23 `#696D72`:
  - `target` **Integrity First** — "We believe in radical transparency and absolute honesty in every client partnership we build."
  - `zap` **Agile Excellence** — "Our methodology allows us to pivot rapidly without sacrificing the precision your systems require."
  - `shield-check` **Unwavering Security** — "Security is not a feature; it's the foundation of everything we build, run, and protect."

**6. CTA band** (`06-cta-band.png`, y 4961–5273, 312 tall). Background `--g-cta` + `bg-keyboard-red.jpg` at 15% opacity.
- Left (x 208): Plus Jakarta Sans 32/40 `#F6F7F9`: **"Ready to start your digital journey** ⏎ **with a trusted partner?"** → 20px → Inter 18/28 `#F6F7F9` at 90% opacity (481 wide): **"Let's discuss how GNOD Technologies can solve your IT challenges."**
- Right (vertically centred, right edge at 1232): white button **"Contact Our Team"** (188 × 44, radius 12, Inter 14/700 `#4B0FA8`) → `/contact#quote`; 17px gap; outline white button **"View Our Services"** (190 × 43, 1px white, Inter 14/500 white) → `/#services`.

**7. Footer** (y 5273–5703).

### 7.2 Our process page (route `/our-process`) — `screens/sections/our-process-desktop/`

**1. Hero** (`01-topbar-nav-hero.png`, y 118–766, 648 tall). Background image `bg-code-dark-blue.jpg` at full opacity (cover). Decorative blurred circles (clipped): 128px `rgba(75,15,168,.1)` blur(64px) at (1128, 213) and 192px `rgba(222,226,255,.2)` blur(64px) at (712, 445).
- Left (x 208): hero badge **"Our Methodology"** → H1 `.t-hero-sub` `#F6F5FF`: **"From Vision** ⏎ **to Reality"** → 15px → Inter 19/33 `#C5BDFF` (491 wide): **"Discover how GNOD Technologies combines technical excellence with a streamlined lifecycle to deliver high-impact software solutions."** → 51px → buttons (16px gap): subpage primary **"Start a Project"** + `arrow-right` (187 × 56) → `/contact#quote`; subpage secondary **"View Selected Work"** + `search` (218 × 55) → `/#work`.
- Right: image card 480 × 360 at (752, 237): radius 16, bg `#F6F7F9`, 1px `rgba(223,225,228,.5)`, shadow `--sh-hero-card`, image `bg-code-dark-blue.jpg` (cover, 1px inset).

**2. The GNOD Lifecycle** (`02-lifecycle-steps.png`, y 766–2179, bg `#F6F7F9`).
- Centred H2 **"The GNOD Lifecycle"** → 18px → centred paragraph (757 wide): **"Our standardized yet flexible approach ensures consistent quality across projects of all scales, from startups to enterprises."**
- 82px → grid of 6 step cards: 3 columns (315 wide, ≈40px gaps) × 2 rows (40px row gap). Card: bg `#F6F7F9`, radius 14, 1px `rgba(223,225,228,.5)`, shadow `--sh-sub-card`, padding 33.
  - Top row: icon badge 56 (radius 12, icon 26px) left; big step number right (Plus Jakarta Sans 36/800, letter-spacing -0.72px, colour `rgba(223,225,228,.5)`).
  - 25px → title `.t-h3-sub` → 13px → description `.t-body-sub` (4 lines) → 27px → 1px `#DFE1E4` divider → 24px → checklist of 4 (32px apart): `circle-check` 15px `#4B0FA8` + Inter 14/20 `#240059` at 80% opacity.
  - Between cards of the same row (and after card 03): a 32 × 32 round "arrow" connector (bg `#F6F7F9`, 1px `#DFE1E4`, shadow `--sh-sub-card`, `arrow-right` 11px `#696D72`) centred on the gap, at the vertical middle of the cards. Hide connectors on tablet/mobile.
  1. `lightbulb` **01 Discovery & Strategy** — "We deep-dive into your business objectives, user needs, and technical constraints to build a robust project foundation." ✓ Stakeholder Interviews ✓ Requirements Gathering ✓ Feasibility Analysis ✓ Technology Selection
  2. `settings-2` **02 Planning & Design** — "Our architects and designers translate requirements into high-fidelity prototypes and technical blueprints." ✓ UI/UX Prototyping ✓ Database Architecture ✓ API Documentation ✓ Sprint Roadmap
  3. `code-xml` **03 Agile Development** — "Clean, efficient code is written in iterative sprints, ensuring transparency and frequent feedback loops." ✓ Frontend & Backend Coding ✓ Unit Testing ✓ Continuous Integration ✓ Sprint Reviews
  4. `shield-check` **04 Quality Assurance** — "Rigorous testing protocols ensure your software is secure, performant, and bug-free before reaching production." ✓ Regression Testing ✓ Security Audits ✓ Performance Stress Tests ✓ User Acceptance Testing
  5. `rocket` **05 Deployment & Launch** — "We manage the transition to production environments, ensuring zero downtime and smooth user migration." ✓ Cloud Infrastructure Setup ✓ Data Migration ✓ Production Deployment ✓ Go-live Support
  6. `clipboard-check` **06 Ongoing Support** — "Post-launch, we provide proactive maintenance and scale your solution as your business grows." ✓ 24/7 Monitoring ✓ Regular Security Updates ✓ Feature Enhancements ✓ Performance Tuning

**3. Engineering excellence** (`03-engineering-excellence.png`, y 2179–2864, bg `rgba(246,247,249,.5)` with 1px `#DFE1E4` lines top and bottom). Two columns, vertically centred.
- Left (x 208, 385 wide): H2 **"Built on a Foundation of** ⏎ **Engineering Excellence"** → 26px → paragraph: **"Our process isn't just about checkboxes; it's about a commitment to quality that permeates every stage of the development cycle."** → 28px → link **"Learn more about our standards"** + `arrow-up-right` (Inter 14/500 `#4B0FA8`) → `/#process` (see OPEN_QUESTIONS).
- Right (x 686): 3 feature rows ≈147px apart: icon badge 48 (radius 14) + 24px gap + title Inter 18/28 (letter-spacing .18px, `#1F2333`) + description Inter 14/23 `#696D72` (≈450 wide):
  - `zap` **Agile Mindset** — "We embrace change and prioritize iterative delivery to get your product to market faster without sacrificing quality."
  - `users-round` **User-Centric Design** — "Every line of code serves the end-user. We build intuitive interfaces that drive engagement and solve real problems."
  - `shield-check` **Security First** — "Data integrity is non-negotiable. We implement enterprise-grade security protocols at every layer of the application."

**4. CTA panel** (`04-cta-panel.png`, y 2864–3424). Panel 1024 × 368 (x 208, y 2960): radius 24, bg `#100A2E` + `bg-code-eeprom.jpg` at 20% opacity, a 384px `rgba(255,255,255,.1)` blurred circle (blur 64px) at the top-right, clipped. Centred content:
- Plus Jakarta Sans 32/40 `#F6F7F9`: **"Ready to start your next digital** ⏎ **transformation project?"** → 34px → Inter 16/24 `rgba(246,247,249,.8)`: **"Partner with the IT experts in Centurion. We'll guide you through every step from discovery to long-term success."** → 34px → buttons (16px gap): **"Get a Free Quote"** (178 × 48, radius 14, bg `#F6F7F9`, Inter 14/600 `#4B0FA8`, shadow `--sh-sub-float`) → `/contact#quote`; **"Contact Us"** (139 × 47, radius 14, 1px `#F6F7F9`, Inter 14/500 `#F6F7F9`) → `/contact`.

**5. Footer** (y 3424–3854).

### 7.3 Contact & quote page (route `/contact`) — `screens/sections/contact-desktop/`

**1. Hero** (y 118–729, 611 tall). Background `#F6F7F9` + `bg-fibre-optics.jpg` at ≈28% opacity (Figma stacks two 15% layers) + overlay `--g-contact-hero-fade` (solid `#F6F7F9` at the top and bottom, transparent in the middle).
- Left (x 208): hero badge **"Expert IT Consultation"** → 18px → H1 `.t-hero-sub` `#1F2333`: **"Let's Build the Future** ⏎ **of Your Business"** → paragraph Inter 19/28 `#667085` (658 wide): **"Ready to transform your enterprise technology? Our specialists in Centurion are standing by to architect the scalable, reliable software and infrastructure your organization needs."** → 35px → 3 inline items (≈20px gaps): `circle-check` 18px `#4B0FA8` + Inter 14/20 500 `#240059`: **"24-Hour Response Time"**, **"Free Initial Consultation"**, **"Centurion-Based Support"**.

**2. Contact cards** (`01-topbar-nav-hero-contact-cards.png`). A band (y 729–965, bg `rgba(234,236,238,.3)`); 4 cards 238 × 236 (24px gaps, x 208 → 1232) that start 48px **above** the band (overlapping the hero). Card: bg `#F6F7F9`, radius 14, shadow `--sh-sub-card`, padding 32; icon badge 48 (radius 14, icon 22px); title `.t-h3-sub` (+97); value Inter 16/24 (+138); note Inter 12/16 `#696D72`; a large faded copy of the icon (44px, `#4B0FA8` at 10% opacity) in the top-right corner.
- `phone` **Call Us** — value **012 663 3699** (`#4B0FA8`, `tel:` link) — note "Mon-Fri, 08:00 - 17:00"
- `mail` **Email Us** — value **info@gnod-tech.co.za** (`#4B0FA8`, `mailto:` link) — note "Average response: 2 hours"
- `map-pin` **Visit Our Office** — value **Centurion, ZA** (`#240059`) — note "59 Blinkblaar, Zwartkop"
- `clock` **Support Hours** — value **24/7 Monitoring** (`#240059`) — note "For managed service clients"

**3. Quote form + headquarters** (`02-quote-form-headquarters.png`, y 965–2439). Two columns: form (x 208, 571 wide) and info (x 843, 389 wide); 128px top padding.

Left column (`id="quote"`):
- H2 **"Request a Proposal"** → 18px → paragraph (542 wide): **"Complete the form below and provide some context regarding your requirements. Our technical lead will review your request and prepare a preliminary strategy for our first call."**
- 42px → form card 571 × 662: bg `#F6F7F9`, radius 14, shadow `--sh-sub-form`, padding 32. Fields (labels Inter 14 `#4B0FA8`, 14px above the control; controls height 38–39, radius 12, bg `rgba(246,247,249,.5)`, 1px `#DFE1E4`, padding 0 12px, text/placeholder Inter 14 `#696D72`):
  - Row: **First Name** (placeholder "John") | **Last Name** ("Doe") — 2 columns 241 wide, 24px gap
  - Row: **Work Email** ("john@enterprise.co.za", type email) | **Phone Number** ("+27 12 345 6789", type tel)
  - **Service Interest** — select, full width, placeholder "Select a service category" (text `#4B0FA8`), `chevron-down` `#370082` at the right. Options: Custom software development, Web apps, Mobile apps, Systems integration, Software modernisation, Cloud, Security, Managed IT, Data & reporting, Consulting, Not sure yet. Pre-select from `?service=` in the URL.
  - **How can we help you?** — textarea 148 tall, placeholder "Tell us about your project or technology challenges...", vertical resize only.
  - Submit button full width (507 × 48, radius 12, bg `#5B3CFA`): **"Request Your Free Quote"** + `send` (Inter 14/500 `#F6F7F9`, centred).
  - 24px → centred Inter 12/16 `#696D72`: **"By submitting this form, you agree to our processing of your data according to our POPIA compliant Privacy Policy."** ("Privacy Policy" links to `/privacy`).
  - Vertical rhythm inside the card (from its top): labels at 38 / 134 / 228 / 326; controls at 69 / 165 / 256 / 357; button 526; note 598.

Right column:
- `building-2` (18px `#5B3CFA`) + 10px + H3 **"Our Headquarters"** (`.t-h3-sub`).
- 24px → two info cards (389 wide, 17px gap; bg `#F6F7F9`, radius 14, 1px `#DFE1E4`, padding 19/20; let them grow with the content — in Figma the address overflows the 129px card):
  - `map-pin` **Main Office** (Inter 16/24 700 `#4B0FA8`) — Inter 16/26 `#696D72`: "59 Blinkblaar, Zwartkop" ⏎ "Centurion, 0157" ⏎ "Gauteng, South Africa" (use `<address>`)
  - `earth` **Regional Reach** — "Serving clients across South Africa with specialized support centers in Gauteng and Western Cape."
- 33px → H3 **"Why partner with GNOD?"** → list (36px apart): `chevron-right` 9px `#4B0FA8` + Inter 16/24 `#696D72`: Enterprise-grade security protocols · Scalable architecture specialists · Direct access to senior developers · Local Centurion-based support team.
- 46px → map card 389 × 349: radius 12, 1px `#DFE1E4`, shadow `--sh-sub-card`, bg `#E2E8F0`, image `map-gnod-zwartkop.png` at 50% opacity (cover). In the centre a 48px circle `#4B0FA8` with white `map-pin` (shadow `--sh-sub-pin`) and, to its right, a label chip "GNOD Technologies" (155 × 26, radius 4, bg `rgba(246,247,249,.95)`, 1px `#DFE1E4`, `backdrop-filter: blur(4px)`, Inter 12/700 `#240059`). Make the whole card a link to Google Maps (opens in a new tab).
- 40px → dark help card 390 × 244: radius 14, bg `#100A2E` + `bg-code-eeprom.jpg` at 20% opacity, a 110px `--glow-flare` circle at the top-left corner, shadow `--sh-sub-card`, padding 32: 40 × 40 tile `rgba(255,255,255,.2)` radius 14 with `message-square` `#F6F7F9`; 16px right of it **"Need immediate help?"** (Inter 18/28 700 `#F6F7F9`); 17px below the tile Inter 14/20 `rgba(246,247,249,.8)`: **"For critical system outages or security breaches, our priority support line is active 24/7 for existing SLA partners."**; 27px → outline white button full width **"Call Support Now"** (324 × 39, radius 12, Inter 14/500 white) → `tel:+27126633699`.

**4. Footer** (y 2439–2855).

---

## 8. States & pieces that are not designed in Figma

Build these with the same tokens so they look native:

- **Hover / focus / active**
  - Primary button: hover bg `#4B0FA8`, translateY(-1px); active translateY(0). Outline buttons: hover bg `rgba(75,15,168,.06)`. White buttons: hover bg `#F1EDFF`.
  - Links: underline on hover; nav links hover colour `#4B0FA8`.
  - Cards with links: hover lifts 2px and shadow becomes `--sh-float` (200ms ease).
  - Visible keyboard focus everywhere: `outline: 2px solid #5B3CFA; outline-offset: 3px` (on dark backgrounds use `#22D3EE`).
- **Mobile/tablet menu** (menu button in the nav): full-width panel sliding down under the nav (white, 1px `#E8E8F0` top border, shadow `--sh-float`), links stacked (Inter 16/600 `#1F2333`, 52px rows, 1px `#DFE3EE` dividers): Services, Custom software, Our process, Work, About, then a full-width primary "Get a free quote" button and the phone link. Menu button toggles `aria-expanded`, icon switches `menu` ↔ `x`; Esc closes; focus is trapped while open; body scroll locked.
- **FAQ**: animate height open/close (200ms); only one item open at a time is fine.
- **Contact form** (Angular typed reactive form posting JSON to `/api/contact.php`): required fields First name, Last name, Work email, Service interest, How can we help; inline error text Inter 12 `#D92D20` under the field with a red border; on success replace the form with a success panel (same card): `circle-check` 40px `#14A37F`, title "Thank you — we’ve received your request." and "Our technical lead will be in touch within 24 hours." Disable the button and show "Sending…" while submitting.
- **Privacy & Terms pages**: simple text pages using the subpage layout (hero-less: page title `.t-h2-sub`, body `.t-body-sub`, max-width 760). Text to be provided by the owner — use clear placeholders.
- **404 page**: centred "Page not found" (`.t-h2`), short sentence, primary button "Back to home".
- **Sticky header** (optional): the navigation bar may stick to the top on scroll (top bar scrolls away) with a subtle shadow once scrolled.

## 9. Responsive rules for About, Our process and Contact

Use the home page patterns:
- Tablet (≤1199): gutter 40, content 688; two-column rows stack (text first, then image/visual); 3- or 4-column card rows become 2 columns; H1 48/56; H2 30/38.
- Mobile (≤767): gutter 20; everything single column; H1 40/48 (letter-spacing -1px); H2 28/36; buttons full width; hero image cards move below the hero text and become full width; contact cards 1 column; form fields 1 column; lifecycle arrows hidden; timeline keeps the circle + line on the left.
- Large decorative blur circles: keep but make them smaller (≈60%) and keep `overflow: hidden` on the section.

## 10. Implementation notes

- Background photos used at low opacity: an `NgOptimizedImage` with `fill` inside the (position: relative) section, `object-fit: cover; opacity: .2` over the solid colour, so the colour shows through exactly like Figma. Images are served from `/images/…` (the `public/images/` folder).
- Figma "layer blur N" → CSS `filter: blur(N/2 px)`; "background blur N" → `backdrop-filter: blur(N/2 px)`.
- Text with `|` in the layer files is soft-wrapped by Figma; don't insert `<br>` there. Only ⏎ (hard breaks) should become `<br>` (or separate lines) — and only on desktop if the line breaks look wrong on small screens.
- All decorative mock-ups (dashboard, app windows, phone, architecture diagram) are Angular components built with HTML/SCSS → host element `aria-hidden="true"` so their text stays out of the accessibility tree. They are reused across breakpoints (inputs for the variants: e.g. dashboard `compact` on mobile hides the sidebar and recent-activity card).
- Repeated content (service cards, case studies, process steps, FAQ, footer links, team, values, lifecycle steps) goes into typed arrays in `src/app/content/*.content.ts` and is rendered with `@for`. Copy it exactly from this spec.
- JSON-LD cannot be written as `<script>` in an Angular template (Angular removes it) — add it through a service using `DOCUMENT`.
- Use real `<a routerLink>`/`<button>` elements, one `<h1>` per page, sections with `aria-labelledby` pointing to their H2.
