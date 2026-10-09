# Deploying the GNOD Technologies website

## Preview it locally

You need a current Node.js LTS release and PHP 8.1 or newer.

1. Run `npm install` once.
2. In one terminal, run `npm run api` to start the local PHP form endpoint on port 8080.
3. In a second terminal, run `npm start` and open `http://localhost:4200`.

To preview the built static site instead, run `npm run build`, then `npm run preview` and open `http://localhost:8081`.

## Build for cPanel

1. Run `npm run build`.
2. Open `dist/gnod-website/browser/`.
3. Zip the **contents of that folder**, not the `browser` folder itself. Include hidden files so `.htaccess` is in the zip.

The build has one folder and `index.html` for every public route. It also contains the PHP API, images, sitemap, robots file, web manifest and Apache rules.

## Upload with cPanel File Manager

1. Back up the current live site before replacing anything. In File Manager, zip the existing contents of `public_html` and download that backup.
2. Open `public_html` and enable **Show Hidden Files (dotfiles)** in File Manager settings.
3. Upload the new zip into `public_html` and extract it there.
4. Confirm that `public_html/.htaccess`, `public_html/index.html`, `public_html/about/index.html`, and `public_html/api/contact.php` exist.
5. Visit the home, About, Our process and Contact pages. Submit a test enquiry and check that it reaches the mailbox.

Upload the files inside `dist/gnod-website/browser/` directly into `public_html`; do not leave them inside an extra `browser` or `gnod-website` directory.

## Change where quote requests are sent

Edit `public/api/contact-config.php` before building, or edit `public_html/api/contact-config.php` in cPanel after upload. Change the `recipient` value. The default is `info@gnod-tech.co.za`.

The endpoint uses PHP's `mail()` function. The hosting account must have outgoing PHP mail enabled and the `website@gnod-tech.co.za` sender should exist or be accepted by the host. If the host requires authenticated SMTP, this endpoint can later be switched to PHPMailer without changing the Angular form.

## Analytics

The GA4 placeholder is commented out in `src/index.html`. Replace both instances of `G-XXXXXXXXXX` with the ID from the GNOD work Google account, then uncomment the block and build again.
