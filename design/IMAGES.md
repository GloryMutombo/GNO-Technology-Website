# Images — inventory and usage

All images are in `public/images/`, each as **.jpg/.png + .webp** — in Angular they are served at `/images/<file>` (everything in `public/` is copied to the site root). Use the `.webp` files with `NgOptimizedImage` (`ngSrc="/images/bg-code-js.webp"` + `width`/`height`, or `fill` for backgrounds); it lazy-loads by default — add `priority` only to the main above-the-fold image of each page (logo / hero visual).

The files were exported from the Figma file and resized for the web (sharp at 1–2× their displayed size). The **original full-resolution files** are inside the Figma exports saved to the owner's Downloads folder (`Gnod Website.zip`, which contains the SVG exports with the original images embedded) — only needed if you want even higher resolution.

`KEY` = the id used in `design/figma-layers/*.txt` (`fill:img:KEY`).

| File | Size (px) | KEY | Where it is used | Displayed at (design px) | Treatment |
|---|---|---|---|---|---|
| `gnod-logo.png` | 800 × 365, transparent | de2cc3027e | Header logo (all pages), footer logo | 130 × 60 (tablet 130 × 53, mobile 81 × 32), footer 168 × 69 | `object-fit: cover` (the PNG has transparent padding, same as Figma) |
| `gnod-logo-white.png` | 800 × 365, transparent | — (made for you) | Optional: footer logo on the dark background | 168 × 69 | Not in Figma — see OPEN_QUESTIONS #1 |
| `gnod-logo-trimmed.png` | 706 × 270, transparent | — | Optional: favicon / social image source | — | Logo without padding |
| `bg-code-eeprom.jpg` | 1140 × 760 | 0b5794ba2b, e332c1cd4d | Home: primary service card background · Contact: "Need immediate help?" card · Our process: CTA panel | 840 × 560 / 390 × 244 / 1024 × 368 | `opacity: .2` over `#100A2E`, cover |
| `visual-blue-code.jpg` | 1000 × 1500 (portrait) | 2a7e9a591d, 2e9dc0774a | Home: top of the "Connected system" visual | 590 × 230 (mobile 350 × 190) | cover, centred |
| `map-gnod-zwartkop.png` | 480 × 270 | 735497300c | Home: local presence card · About: map card · Contact: map card | 580 × 520 / 479 × 320 / 389 × 349 | cover; Contact uses `opacity: .5` over `#E2E8F0`. Low resolution & Google Maps screenshot — see OPEN_QUESTIONS #6 |
| `bg-fibre-optics.jpg` | 940 × 627 | eebe7aad17 | Contact: hero background | 1440 × 611 | ≈28% opacity over `#F6F7F9` + fade gradient |
| `photo-glass-building.jpg` | 940 × 627 | 31cd5056f8 | About: behind the map card — **completely hidden** by the map in Figma | — | Not needed (kept in case you want it) |
| `bg-code-closeup.jpg` | 1140 × 760 | 871e1e666a | About: Mission/Vision section background | 1440 × 778 | `opacity: .125` over `#100A2E` |
| `photo-purple-fibres.jpg` | 940 × 529 | 9f659017e9 | About: journey image card | 391 × 293 | cover, radius 15, gradient frame |
| `team-steven-ndaye.jpg` | 389 × 389 | bc3b23a625 | About: team | 120 × 120 circle | cover |
| `team-glory-mutombo.jpg` | 200 × 200 | 594d712740 | About: team | 120 × 120 circle | cover |
| `team-gedeon-bafinamene.jpg` | 100 × 100 | 14c1073075 | About: team | 120 × 120 circle | cover — **low resolution**, ask for a bigger photo (OPEN_QUESTIONS #7) |
| `photo-particles.jpg` | 1600 × 1067 | 0fbc9d2715 | About: culture card | 1022 × 438 | cover + dark purple gradient overlay |
| `bg-keyboard-red.jpg` | 1140 × 641 | 5026377b4e | About: CTA band background | 1440 × 312 | `opacity: .15` over the CTA gradient |
| `bg-code-js.jpg` | 1140 × 744 | 333fe66842 | About: hero background (12.5%) **and** hero glass-card image | 1440 × 766 / 365 × 273 | see spec §7.1 |
| `bg-code-dark-blue.jpg` | 1600 × 1067 | 4167ec89ba | Our process: hero background (100%) **and** hero image card | 1440 × 648 / 480 × 360 | cover |

Suggested `alt` texts (decorative backgrounds get `alt=""`):
- Logo: `alt="GNOD Technologies – Tailored for your IT needs"`
- Team: `alt="Steven Ndaye, Founder, CEO & Senior Developer"` (etc.)
- Map: `alt="Map showing GNOD Technologies at 59 Blinkblaar, Zwartkop, Centurion"`
- Culture / journey / hero cards: decorative → `alt=""`

## Favicon & social image (not in Figma — create them)
- Favicon: crop the light-bulb "O" from `gnod-logo-trimmed.png` onto a square (purple `#4B0FA8` bulb on white or white bulb on `#4B0FA8`), export `favicon.ico` (32), `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180).
- Open Graph image 1200 × 630: `#100A2E` background, white logo, the home H1 text in Plus Jakarta Sans.
