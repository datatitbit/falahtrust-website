<?php
/**
 * Falahtrust Enterprise — website form handler.
 *
 * Handles two distinct forms from the site, told apart by `kind`:
 *  - "quote"     — the detailed request form (name, contact, SERVICE, message).
 *                  Used when someone wants a specific service quoted.
 *  - "community" — the lightweight "stay in the loop" signup (name, email,
 *                  phone — at least one of email/phone). Used to build a
 *                  list of interested people to reach out to later — no
 *                  service field, because none is needed for that purpose.
 *
 * Both simply email the submitted fields to the business and reply with
 * JSON. Nothing is written to a database or file — the email itself is the
 * only record, consistent with the site's privacy policy.
 *
 * Runs on plain PHP (no dependencies), which Namecheap Stellar Plus /
 * cPanel provides by default alongside the static site files.
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
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

$to = 'falahtrustgh@gmail.com';
$fromHeader = 'From: Falahtrust Website <no-reply@falahtrustgh.com>';

$honeypot = trim((string) ($_POST['company'] ?? ''));
// A real visitor never fills the hidden honeypot field. Pretend success so a
// bot doesn't learn to look for a different signal.
if ($honeypot !== '') {
    respond(true);
}

$kind = ($_POST['kind'] ?? 'quote') === 'community' ? 'community' : 'quote';

if ($kind === 'community') {
    $name  = clean($_POST['name'] ?? '', 120);
    $email = clean($_POST['email'] ?? '', 200);
    $phone = clean($_POST['phone'] ?? '', 40);

    $emailValid = $email !== '' && filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    if ($email !== '' && !$emailValid) {
        respond(false, 'Please enter a valid email address, or leave it blank and add a phone number instead.');
    }
    if (!$emailValid && $phone === '') {
        respond(false, 'Please add your email address or phone number.');
    }

    $subject = 'New "stay in the loop" sign-up — Falahtrust website';
    $bodyLines = [
        'Someone joined the Falahtrust community list from the website.',
        '',
        'Name: ' . ($name !== '' ? $name : '(not given)'),
    ];
    if ($emailValid) {
        $bodyLines[] = 'Email: ' . $email;
    }
    if ($phone !== '') {
        $bodyLines[] = 'Phone: ' . $phone;
    }

    $headers = [$fromHeader, 'Content-Type: text/plain; charset=UTF-8'];
    if ($emailValid) {
        $headers[] = 'Reply-To: ' . ($name !== '' ? $name . ' ' : '') . '<' . $email . '>';
    }

    $sent = @mail($to, $subject, implode("\n", $bodyLines) . "\n", implode("\r\n", $headers));
    if (!$sent) {
        respond(false, 'Could not sign you up right now — please try WhatsApp instead.');
    }
    respond(true);
}

// --- kind === 'quote' ---

$name    = clean($_POST['name'] ?? '', 120);
$email   = clean($_POST['email'] ?? '', 200);
$phone   = clean($_POST['phone'] ?? '', 40);
$service = clean($_POST['service'] ?? '', 120);
$details = trim((string) ($_POST['details'] ?? ''));
$details = mb_substr(str_replace("\r\n", "\n", $details), 0, 4000);

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

$headers = [$fromHeader, 'Content-Type: text/plain; charset=UTF-8'];
if ($emailValid) {
    $headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
}

$sent = @mail($to, $subject, implode("\n", $bodyLines) . "\n", implode("\r\n", $headers));

if (!$sent) {
    respond(false, 'The message could not be sent. Please try WhatsApp or email instead.');
}

respond(true);
