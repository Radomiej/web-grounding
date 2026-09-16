<?php
header('Content-Type: application/json; charset=utf-8');
mysqli_report(MYSQLI_REPORT_OFF);

function respondJson($payload, $status = 200)
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
if ($method !== 'PUT') {
    header('Allow: PUT');
    respondJson(['error' => 'To API obsługuje tylko PUT.'], 405);
}

$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPassword = getenv('DB_PASSWORD') ?: '';
$dbName = getenv('DB_NAME') ?: 'web_grounding';
$connection = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
if ($connection === false) {
    respondJson(['error' => 'Nie udało się połączyć z bazą danych.'], 500);
}
mysqli_set_charset($connection, 'utf8mb4');

$request = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($request)) {
    mysqli_close($connection);
    respondJson(['error' => 'Wyślij poprawny obiekt JSON.'], 400);
}

$id = filter_var($request['id'] ?? null, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1],
]);
$titleValue = $request['title'] ?? null;
$priceValue = $request['price'] ?? null;

if ($id === false || !is_string($titleValue) || !is_numeric($priceValue)) {
    mysqli_close($connection);
    respondJson(['error' => 'id, title i price mają niepoprawny typ.'], 422);
}

$title = trim($titleValue);
$price = (float) $priceValue;
$titleLength = function_exists('mb_strlen')
    ? mb_strlen($title, 'UTF-8')
    : strlen($title);
if ($title === '' || $titleLength > 100 || $price < 0 || !is_finite($price)) {
    mysqli_close($connection);
    respondJson(['error' => 'Niepoprawny tytuł albo cena.'], 422);
}

$availableValue = $request['available'] ?? true;
if (is_bool($availableValue)) {
    $available = (int) $availableValue;
} elseif (
    $availableValue === 0 ||
    $availableValue === 1 ||
    $availableValue === '0' ||
    $availableValue === '1'
) {
    $available = (int) $availableValue;
} else {
    mysqli_close($connection);
    respondJson(['error' => 'available musi być wartością true/false albo 0/1.'], 422);
}

$statement = mysqli_prepare(
    $connection,
    'UPDATE offers SET title = ?, price = ?, available = ? WHERE id = ?',
);
if ($statement === false) {
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się przygotować aktualizacji.'], 500);
}

mysqli_stmt_bind_param($statement, 'sdii', $title, $price, $available, $id);
if (!mysqli_stmt_execute($statement)) {
    mysqli_stmt_close($statement);
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się zaktualizować oferty.'], 500);
}
mysqli_stmt_close($statement);

$lookup = mysqli_prepare(
    $connection,
    'SELECT id, title, price, available FROM offers WHERE id = ?',
);
if ($lookup === false) {
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się potwierdzić aktualizacji.'], 500);
}
mysqli_stmt_bind_param($lookup, 'i', $id);
mysqli_stmt_execute($lookup);
$result = mysqli_stmt_get_result($lookup);
$row = $result === false ? null : mysqli_fetch_assoc($result);

if ($result !== false) mysqli_free_result($result);
mysqli_stmt_close($lookup);
mysqli_close($connection);

if ($row === null) {
    respondJson(['error' => 'Nie znaleziono oferty o podanym ID.'], 404);
}

respondJson([
    'data' => [
        'id' => (int) $row['id'],
        'title' => $row['title'],
        'price' => (float) $row['price'],
        'available' => (bool) $row['available'],
    ],
]);
