<?php

declare(strict_types=1);

/** @var array{recipient: string, subject: string, from_email: string, allowed_origins: list<string>, minimum_fill_time_ms: int} $config */
$config = require __DIR__ . '/contact-config.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && !in_array($origin, $config['allowed_origins'], true)) {
    respond(403, ['ok' => false, 'errors' => ['form' => 'This request origin is not allowed.']]);
}

if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
}

if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    http_response_code(204);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, ['ok' => false, 'errors' => ['form' => 'Method not allowed.']]);
}

$rawBody = file_get_contents('php://input');
$payload = json_decode($rawBody === false ? '' : $rawBody, true);
if (!is_array($payload)) {
    respond(400, ['ok' => false, 'errors' => ['form' => 'Invalid JSON request.']]);
}

// Quietly accept honeypot submissions so automated senders receive no useful signal.
if (trim(string_value($payload, 'website')) !== '') {
    respond(200, ['ok' => true]);
}

$elapsedMs = $payload['elapsedMs'] ?? 0;
if (!is_int($elapsedMs) && !is_float($elapsedMs)) {
    $elapsedMs = 0;
}
if ($elapsedMs < $config['minimum_fill_time_ms']) {
    respond(422, ['ok' => false, 'errors' => ['form' => 'Please wait a moment before submitting the form.']]);
}

$firstName = clean_line(string_value($payload, 'firstName'));
$lastName = clean_line(string_value($payload, 'lastName'));
$email = clean_line(string_value($payload, 'email'));
$phone = clean_line(string_value($payload, 'phone'));
$service = clean_line(string_value($payload, 'service'));
$message = trim(string_value($payload, 'message'));
$errors = [];

if ($firstName === '' || text_length($firstName) > 80) {
    $errors['firstName'] = 'Please enter a valid first name.';
}
if ($lastName === '' || text_length($lastName) > 80) {
    $errors['lastName'] = 'Please enter a valid last name.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($email) > 254) {
    $errors['email'] = 'Please enter a valid email address.';
}
if ($phone !== '' && (text_length($phone) > 40 || !preg_match('/^[0-9+() .-]+$/', $phone))) {
    $errors['phone'] = 'Please enter a valid phone number.';
}

$allowedServices = [
    'custom-software',
    'web-apps',
    'mobile-apps',
    'systems-integration',
    'software-modernisation',
    'cloud',
    'security',
    'managed-it',
    'data-reporting',
    'consulting',
    'not-sure',
];
if (!in_array($service, $allowedServices, true)) {
    $errors['service'] = 'Please select a valid service.';
}
if (text_length($message) < 10 || text_length($message) > 5000) {
    $errors['message'] = 'Please enter a message between 10 and 5000 characters.';
}

if ($errors !== []) {
    respond(422, ['ok' => false, 'errors' => $errors]);
}

$safeMessage = str_replace(["\r\n", "\r"], "\n", $message);
$body = implode("\n", [
    'A new quote request was submitted on gnod-tech.co.za.',
    '',
    'Name: ' . $firstName . ' ' . $lastName,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : 'Not provided'),
    'Service: ' . $service,
    '',
    'Message:',
    $safeMessage,
]);

$headers = [
    'From: GNOD Website <' . $config['from_email'] . '>',
    'Reply-To: ' . $email,
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . PHP_VERSION,
];

if (!mail($config['recipient'], $config['subject'], $body, implode("\r\n", $headers))) {
    error_log('GNOD website contact form: mail() returned false.');
    respond(500, ['ok' => false, 'errors' => ['form' => 'Your message could not be sent. Please email us directly.']]);
}

respond(200, ['ok' => true]);

/** @param array<string, mixed> $payload */
function string_value(array $payload, string $key): string
{
    $value = $payload[$key] ?? '';
    return is_string($value) ? $value : '';
}

function clean_line(string $value): string
{
    return trim(str_replace(["\r", "\n"], '', $value));
}

function text_length(string $value): int
{
    return function_exists('mb_strlen') ? mb_strlen($value) : strlen($value);
}

/** @param array<string, mixed> $body */
function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}
