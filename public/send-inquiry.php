<?php
/**
 * Falahtrust Enterprise — website request form handler.
 *
 * Receives the request form's fields, emails them to the business, and
 * replies with JSON. Nothing is written to a database or file — the email
 * itself is the only record, consistent with the site's privacy policy.
 *
 * Runs on plain PHP (no dependencies), which Namecheap Stellar Plus /
 * cPanel provides by default alongside the static site files.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
// Same-origin only: the form on this site is the only intended caller.
header('X-Content-Type-Options: nosniff');

function respond(bool $ok, string $error = ''): never {
    http_response_code($ok ? 200 : 422);
    echo json_encode($ok ? ['ok' => true] : ['ok' => false, 'error' => $error]);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Method not allowed');
}

/** Strips characters that could be used for email header injection. */
function clean(string $value, int $maxLength = 500): string {
    $value = str_replace(["\r", "\n"], ' ', $value);
    $value = trim($value);
    return mb_substr($value, 0, $maxLength);
}

$name    = clean($_POST['name'] ?? '', 120);
$email   = clean($_POST['email'] ?? '', 200);
$phone   = clean($_POST['phone'] ?? '', 40);
$service = clean($_POST['service'] ?? '', 120);
$details = trim((string) ($_POST['details'] ?? ''));
$details = mb_substr(str_replace("\r\n", "\n", $details), 0, 4000);
$honeypot = trim((string) ($_POST['company'] ?? ''));

// A real visitor never fills the hidden honeypot field. Pretend success so a
// bot doesn't learn to look for a different signal.
if ($honeypot !== '') {
    respond(true);
}

if ($name === '' || $service === '') {
    respond(false, 'Please provide your name and the service you need.');
}

$emailValid = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
if ($email !== '' && !$emailValid) {
    respond(false, 'Please enter a valid email address, or leave it blank and add a phone number instead.');
}
if (!$emailValid && $phone === '') {
    respond(false, 'Please add an email address or a phone number.');
}

$to      = 'falahtrustgh@gmail.com';
$subject = 'Website request: ' . $service;

$bodyLines = [
    'New request from the Falahtrust Enterprise website.',
    '',
    'Name: ' . $name,
    'Service: ' . $service,
];
if ($phone !== '') {
    $bodyLines[] = 'Phone: ' . $phone;
}
if ($emailValid) {
    $bodyLines[] = 'Email: ' . $email;
}
if ($details !== '') {
    $bodyLines[] = '';
    $bodyLines[] = 'Details:';
    $bodyLines[] = $details;
}
$body = implode("\n", $bodyLines) . "\n";

$fromDomain = 'falahtrustgh.com';
$headers = [
    'From: Falahtrust Website <no-reply@' . $fromDomain . '>',
    'Content-Type: text/plain; charset=UTF-8',
];
if ($emailValid) {
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
}

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'The message could not be sent. Please try WhatsApp or email instead.');
}

respond(true);
