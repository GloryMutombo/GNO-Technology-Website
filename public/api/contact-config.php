<?php

declare(strict_types=1);

return [
    'recipient' => 'info@gnod-tech.co.za',
    'subject' => 'New website quote request',
    'from_email' => 'website@gnod-tech.co.za',
    'allowed_origins' => [
        'https://gnod-tech.co.za',
        'http://localhost:4200',
        'http://127.0.0.1:4200',
    ],
    'minimum_fill_time_ms' => 3000,
];
