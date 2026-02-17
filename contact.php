<?php
// public/contact.php

// Nagłówki
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");

// Obsługa preflight (opcjonalne, ale dobre dla CORS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Sprawdzenie metody
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Niedozwolona metoda żądania."]);
    exit;
}

// Pobranie danych
$json = file_get_contents("php://input");
$data = json_decode($json);

// 1. Walidacja po stronie serwera (Backend Validation)
if (empty($data->fullname) || empty($data->email) || empty($data->message)) {
    http_response_code(400); // Bad Request
    echo json_encode(["status" => "error", "message" => "Wypełnij wszystkie wymagane pola."]);
    exit;
}

if (!filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Podany adres email jest nieprawidłowy."]);
    exit;
}

// 2. Konfiguracja e-maila
// UWAGA: Podmień te adresy na swoje!
$my_email = "twoj-email@domena.pl"; 
$server_mail = "no-reply@twoja-domena.pl"; // Musi być w domenie serwera!

$subject = "Formularz Kontaktowy: " . htmlspecialchars($data->subject);

$body = "Nowa wiadomość ze strony LiveSports:\n\n";
$body .= "Imię: " . htmlspecialchars($data->fullname) . "\n";
$body .= "Email: " . htmlspecialchars($data->email) . "\n";
$body .= "Miasto/Kraj: " . htmlspecialchars($data->city) . ", " . htmlspecialchars($data->country) . "\n";
$body .= "Źródło: " . htmlspecialchars($data->source) . "\n\n";
$body .= "Wiadomość:\n" . htmlspecialchars($data->message) . "\n";

$headers = "From: $server_mail" . "\r\n" .
           "Reply-To: " . $data->email . "\r\n" .
           "X-Mailer: PHP/" . phpversion();

// 3. Próba wysyłki i obsługa błędu serwera
if (mail($my_email, $subject, $body, $headers)) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Wiadomość została wysłana."]);
} else {
    // Jeśli funkcja mail() zwróci false
    http_response_code(500); // Internal Server Error
    echo json_encode(["status" => "error", "message" => "Błąd serwera pocztowego. Spróbuj ponownie później."]);
}
?>