# GNOD Website — start here (Figma → Codex → Angular)

This folder contains everything from the Figma file **"Gnod Website"** (6 frames: Home desktop/tablet/mobile, About, Our process, Contact), exported on 8 October 2026 and organised so **Codex** can build the real website in **Angular**.

## What's inside (and why)

| Path                                                 | What it is                                                                                            | Why it helps                                                                            |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `AGENTS.md`                                          | Instructions for Codex: Angular setup, structure, routes, SEO, form, deployment, "definition of done" | Codex reads this file automatically, so every prompt starts with the right rules        |
| `CODEX_PROMPTS.md`                                   | The **starting prompt** + the next prompts, step by step                                              | Small steps give better results than one giant request                                  |
| `design/DESIGN_SPEC.md`                              | The full specification: colours, fonts, spacing, every section of every page with the exact text      | AI agents work best from precise text — a picture alone makes them guess sizes and copy |
| `design/screens/`                                    | Pictures of every page (whole page + one image per section)                                           | So Codex (and you) can _see_ the target and compare                                     |
| `design/tokens/`                                     | Colours, fonts, shadows, radius as CSS variables + JSON                                               | One source of truth → no "almost the same purple" all over the code                     |
| `design/figma-layers/`                               | Every Figma layer as text (positions, sizes, colours, fonts)                                          | For any detail the spec doesn't mention                                                 |
| `design/IMAGES.md`                                   | Which picture goes where, at what size                                                                | Avoids mixed-up or blurry images                                                        |
| `public/images/`                                     | Logo + all photos, web-optimised (JPG/PNG + WebP)                                                     | Already in the folder Angular uses for static files, so they work as `/images/...`      |
| `OPEN_QUESTIONS.md`                                  | Inconsistencies found in the design/content + the default Codex will follow                           | Please read — a few texts contradict each other                                         |
| `GNOD-Website-Design-Overview.pdf` _(separate file)_ | A PDF overview with all pages and the key specs                                                       | Easy to view, share or print — Codex doesn't need it                                    |

Screens are scaled to keep them light: desktop images are 75% (1080 px wide = 1440 px in Figma), tablet 70%, mobile 90%.

## Why Angular is set up with "prerendering"

A normal Angular app builds each page in the visitor's browser with JavaScript. Google can index that, but more slowly and less reliably, and social-media link previews (WhatsApp, LinkedIn, Facebook) usually see an empty page. With **prerendering**, Angular creates a finished HTML file for every page when you run the build. You still develop in Angular, but visitors and Google get fast, ready-made pages — good for your SEO work. Bonus: those files are plain HTML/CSS/JS, so they run on your existing **cPanel** hosting without Node.js.

## How to use it with Codex

1. **Requirements:** Node.js (LTS) and npm installed — the same setup you use for any Angular project. Optional: PHP, only to test the contact form on your computer.
2. **Unzip** this package into a new folder, e.g. `gnod-website`.
3. **Recommended — make it a Git repository** so you can always undo what Codex changes:
   ```
   cd gnod-website
   git init
   git add .
   git commit -m "Design handoff from Figma"
   ```
   (Codex in ChatGPT / the cloud needs this folder pushed to a GitHub repository; Codex CLI and the VS Code extension work directly on the local folder.)
4. **Open the folder in Codex** (CLI: run `codex` inside the folder; or open the folder in VS Code with the Codex extension).
5. **Paste the starting prompt** from `CODEX_PROMPTS.md`. Codex will create the Angular project inside this folder (keeping these files), build the header/footer and the pages' skeleton, then stop and report.
6. **Preview**: `npm start` → open http://localhost:4200. Check the result, then paste the next prompt (Step 2, 3 …).
7. **Publish** (Codex writes the exact steps in `DEPLOY.md` at the end):
   - `npm run build` → the website is created in `dist/gnod-website/browser/`
   - in cPanel, back up the current site, then upload the **contents** of that folder (including the hidden `.htaccess` file and the `api` folder) to `public_html` with File Manager (upload a zip → Extract).

## Original full-resolution exports

While exporting, Figma also downloaded its own export files to your computer (normally your **Downloads** folder; the second zip may be named `Gnod Website (1).zip`):

- `Gnod Website.zip` — all 6 frames as SVG (with the original, full-size photos embedded inside).
- `Gnod Website (1).zip` (or a second `Gnod Website.zip`) — all 6 frames as PNG at 100% size.
- `GNOD website — Contact & Get a free quote.svg` — a single test export.

You don't need them for Codex (everything is already in this package).

## Before you go live

Read `OPEN_QUESTIONS.md`. The most important items: the "two decades" vs "3+ years / established 2023" contradiction, client-name permission for the logo strip, the Google-Maps screenshot, real Privacy/Terms text (needed for POPIA because the form collects personal data), and the low-resolution team photos.
