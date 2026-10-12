# Deploying the GNOD Technologies website

This guide is for the owner. It explains how to preview the site on your computer, build the upload file, and put the new site live on the cPanel hosting.

## Preview it on your computer

You need Node.js (the version in `.nvmrc`) and, only for testing the contact form, PHP 8.2.

1. Run `npm install` once.
2. Run `npm start` and open `http://localhost:4200`.
3. To try the contact form, also run `npm run api` in a second window. The form then talks to the PHP script on your computer. Your computer usually can't send email, so the form will say the message couldn't be sent; that is expected.

To look at the finished build instead, run `npm run build`, then `npm run preview`, and open `http://localhost:8081`.

## Build the upload file

You need an internet connection: the build downloads the Google Fonts styles and puts them straight into each page so text appears faster.

1. Run `npm run build`. It must finish without errors.
2. Run `npm run seo:check`. It checks every page's title, description, canonical address, structured data, headings, images, links and sitemap. It must say every check passed.
3. Zip the **contents** of `dist/gnod-website/browser/` (not the folder itself), including hidden files so `.htaccess` is in the zip, and with `index.html` at the top level of the zip. Name it `deploy/gnod-site-<date>.zip`. The `deploy/` folder is not saved in Git.

## Put the new site live

Do these steps in order. Steps 3 and 4 take the site offline for a few minutes, so do them back to back.

1. **Email address.** Make sure `info@gnod-tech.co.za` exists in cPanel, as a mailbox (Email Accounts) or a forwarder (Forwarders). The contact form sends every enquiry there.
2. **Back up the old site.** In cPanel File Manager, open `public_html`, select everything, choose **Compress**, download the zip to your computer, then delete that zip from the server.
3. **Move the old site out of the way.** Create a folder outside public_html, for example `/home/<cpanel-user>/old-site-2026-10/`, and move these into it: `about.html`, `contact.html`, `index.html`, `services.html`, `service-details.html`, `robots.txt`, `sitemap.xml`, `composer.json`, and the folders `css/`, `fonts/`, `images/`, `js/`, `plugins/`, `php-mail/`. **Leave** `.well-known/`, `.user.ini`, `php.ini` and `.htaccess` where they are. (In File Manager, turn on **Settings → Show Hidden Files** to see the files that start with a dot.)
4. **Upload the new site.** Upload `gnod-site-<date>.zip` into `public_html`, **Extract** it there (it replaces `.htaccess`), then delete the zip.
5. **reCAPTCHA keys (only when you have them).** Create the folder `/home/<cpanel-user>/gnod-private/` (next to public_html, not inside it) and in it a file `recaptcha.php`, copied from `public/api/recaptcha.example.php` and filled in with your Google Cloud project ID, API key and site key. Only do this when the uploaded build contains the reCAPTCHA site keys (in `src/app/core/site.config.ts`); if the file exists while the build has no keys, the form rejects every message. The form keeps working without reCAPTCHA until then.
6. **Test.**
   - Open every page: home, About, Our process, Contact, Privacy, Terms.
   - The old addresses land on the new pages: `/about.html` → `/about`, `/contact.html` → `/contact`, `/services.html` and `/service-details.html` → the home page's services section.
   - `https://gnod-tech.co.za/about` loads directly, and `/about/` (with a slash) redirects to `/about`.
   - A made-up address such as `/test-123` shows the site's own "Page not found" page.
   - `http://gnod-tech.co.za` and `https://www.gnod-tech.co.za` both end up at `https://gnod-tech.co.za`.
   - Send **one** test message through the contact form (agree on this first) and check that it arrives at info@gnod-tech.co.za.
7. **If something breaks:** move the old files back from the backup folder into public_html and restore the old `.htaccess` from your backup zip.
8. **Google Search Console:** submit `https://gnod-tech.co.za/sitemap.xml`, then use **URL Inspection → Request indexing** for `/`, `/about`, `/our-process` and `/contact`.
9. **Google Analytics:** open **Reports → Realtime** and check that your own visit shows up. Once the events `generate_lead` (form sent), `phone_click` and `email_click` appear, mark them as **key events**.
10. **After a week without problems,** delete the old-site folder outside public_html, including `php-mail/` (it sends through a former developer's Gmail account).

## Change where enquiries are sent

The address is in `public/api/contact-config.php` (`recipient`, currently `info@gnod-tech.co.za`; the sender is `website@gnod-tech.co.za`). Change it before building, or edit `public_html/api/contact-config.php` in File Manager after uploading. No passwords or keys belong in that file.

## reCAPTCHA scores

When reCAPTCHA is active, each check is logged (date, score and reason only, no personal details) to `/home/<cpanel-user>/gnod-private/recaptcha.log`. Messages scoring below the `threshold` in `recaptcha.php` (0.5 to start) are rejected. Watch the log for a couple of days before changing the threshold.
