<?php
// Simple contact form handler for OVH shared hosting
// Expects POST fields: name, email, phone, service, message, website (honeypot)

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['ok' => false, 'error' => 'Méthode non autorisée']);
  exit;
}

// Basic anti-spam: honeypot
$honeypot = isset($_POST['website']) ? trim((string)$_POST['website']) : '';
if ($honeypot !== '') {
  http_response_code(200);
  echo json_encode(['ok' => true]);
  exit;
}

function s($key, $max = 500) {
  $v = isset($_POST[$key]) ? trim((string)$_POST[$key]) : '';
  if (mb_strlen($v) > $max) {
    $v = mb_substr($v, 0, $max);
  }
  return $v;
}

$name = s('name', 120);
$email = s('email', 200);
$phone = s('phone', 40);
$service = s('service', 80);
$message = s('message', 5000);

if ($name === '' || $email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['ok' => false, 'error' => 'Champs requis invalides']);
  exit;
}

$to = 'contact@carrosserie-d-argenteuil.fr';
$subject = 'Nouveau message via le site - Carrosserie d\'Argenteuil';

$bodyLines = [
  "Nom: {$name}",
  "Email: {$email}",
  "Téléphone: {$phone}",
  "Service: {$service}",
  "---",
  $message,
];
$body = implode("\n", $bodyLines);

// Build headers
$from = 'site@carrosserie-d-argenteuil.fr';
$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'Content-Transfer-Encoding: 8bit';
$headers[] = 'From: Carrosserie d\'Argenteuil <' . $from . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$ok = @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers));

if ($ok) {
  echo json_encode(['ok' => true]);
} else {
  http_response_code(500);
  echo json_encode(['ok' => false, 'error' => 'Envoi impossible pour le moment']);
}


