# Deploying the GNOD Technologies website

## Preview it locally

You need a current Node.js LTS release.

1. Run `npm install` once.
2. Run `npm start` and open `http://localhost:4200`.

To preview the built static site instead, run `npm run build`, then `npm run preview` and open `http://localhost:8081`.

## Build for cPanel

You need an internet connection while building: Angular downloads the Google Fonts styles and puts them straight into each page so text shows faster.

1. Run `npm run build`.
2. Open `dist/gnod-website/browser/`.
3. Zip the **contents of that folder**, not the `browser` folder itself. Include hidden files so `.htaccess` is in the zip.

The build has one folder and `index.html` for every public route. It also contains the images, sitemap, robots file, web manifest, Apache rules (`.htaccess`) and the old PHP form script, which the site no longer uses.

## Upload with cPanel File Manager

1. Back up the current live site before replacing anything. In File Manager, zip the existing contents of `public_html` and download that backup.
2. Open `public_html` and enable **Show Hidden Files (dotfiles)** in File Manager settings.
3. Upload the new zip into `public_html` and extract it there.
4. Confirm that `public_html/.htaccess`, `public_html/index.html` and `public_html/about/index.html` exist.
5. Visit the home, About, Our process and Contact pages. Submit a test enquiry and check that it reaches the mailbox.
6. Check the address bar: `http://`, `www.` and a trailing slash (`/about/`) should all end up at `https://gnod-tech.co.za/about`, and a made-up address should show the site's own "Page not found" page.
7. Run the home page through [PageSpeed Insights](https://pagespeed.web.dev/) (mobile). Run it two or three times: scores move a few points between runs.

Upload the files inside `dist/gnod-website/browser/` directly into `public_html`; do not leave them inside an extra `browser` or `gnod-website` directory.

## Change where quote requests are sent

The contact form sends requests through [FormSubmit](https://formsubmit.co), a free form-to-email service, so no server code is needed.

It currently sends to **info@gnod-tech.co.za**. Before the first real enquiry, activate it: submit one test request from the live site, then click **Activate Form** in the email FormSubmit sends to that inbox. Until it is activated, visitors who submit see a message asking them to email info@gnod-tech.co.za.

To use a different inbox:

1. Open `src/app/core/site.config.ts` and change the email at the end of `formEndpoint`, for example `https://formsubmit.co/ajax/info@gnod-tech.co.za`.
2. Build and upload the site again.
3. Submit one test request from the live site. FormSubmit emails that inbox an **Activate Form** link. Click it, and requests are delivered from then on.

Optional: after activating, FormSubmit sends a random alias string. Put that alias in place of the email address in `formEndpoint` so the address is not visible in the site's code.

The old PHP endpoint (`public/api/contact.php`) is still in the project but the form no longer uses it.

## Analytics

The GA4 placeholder is commented out in `src/index.html`. Replace both instances of `G-XXXXXXXXXX` with the ID from the GNOD work Google account, then uncomment the block and build again.
