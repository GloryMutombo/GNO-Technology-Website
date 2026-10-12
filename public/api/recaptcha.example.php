<?php
// Copy this file to /home/<cpanel-user>/gnod-private/recaptcha.php (OUTSIDE public_html)
// and fill in the real values. Never put the real values in this repository.
// Only create that file once the uploaded site contains the reCAPTCHA site keys
// (src/app/core/site.config.ts), otherwise every message is rejected.
return [
    'project_id' => 'YOUR_GOOGLE_CLOUD_PROJECT_ID',
    'api_key'    => 'YOUR_RESTRICTED_API_KEY',
    'site_key'   => 'YOUR_PRODUCTION_SITE_KEY',
    'threshold'  => 0.5,
];
