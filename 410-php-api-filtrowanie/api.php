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
if ($method !== 'GET') {
    header('Allow: GET');
    respondJson(['error' => 'To API obsługuje tylko GET.'], 405);
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

$queryValue = $_GET['q'] ?? '';
$availableValue = $_GET['available'] ?? '';

if (!is_string($queryValue) || !is_string($availableValue)) {
    mysqli_close($connection);
    respondJson(['error' => 'Parametry q i available muszą być tekstem.'], 422);
}

$query = trim($queryValue);
$queryLength = function_exists('mb_strlen')
    ? mb_strlen($query, 'UTF-8')
    : strlen($query);

if ($queryLength > 100 || ($availableValue !== '' && $availableValue !== '0' && $availableValue !== '1')) {
    mysqli_close($connection);
    respondJson(['error' => 'q ma maksymalnie 100 znaków, a available może mieć wartość 0 albo 1.'], 422);
}

$like = '%' . $query . '%';
$available = $availableValue === '' ? null : (int) $availableValue;

if ($query !== '' && $available !== null) {
    $statement = mysqli_prepare(
        $connection,
        'SELECT id, title, price, available FROM offers WHERE title LIKE ? AND available = ? ORDER BY id',
    );
    if ($statement !== false) {
        mysqli_stmt_bind_param($statement, 'si', $like, $available);
    }
} elseif ($query !== '') {
    $statement = mysqli_prepare(
        $connection,
        'SELECT id, title, price, available FROM offers WHERE title LIKE ? ORDER BY id',
    );
    if ($statement !== false) {
        mysqli_stmt_bind_param($statement, 's', $like);
    }
} elseif ($available !== null) {
    $statement = mysqli_prepare(
        $connection,
        'SELECT id, title, price, available FROM offers WHERE available = ? ORDER BY id',
    );
    if ($statement !== false) {
        mysqli_stmt_bind_param($statement, 'i', $available);
    }
} else {
    $statement = mysqli_prepare(
        $connection,
        'SELECT id, title, price, available FROM offers ORDER BY id',
    );
}

if ($statement === false || !mysqli_stmt_execute($statement)) {
    if ($statement !== false) mysqli_stmt_close($statement);
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się wykonać filtrowania.'], 500);
}

$result = mysqli_stmt_get_result($statement);
if ($result === false) {
    mysqli_stmt_close($statement);
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się odczytać wyniku filtrowania.'], 500);
}

$offers = [];
while ($row = mysqli_fetch_assoc($result)) {
    $offers[] = [
        'id' => (int) $row['id'],
        'title' => $row['title'],
        'price' => (float) $row['price'],
        'available' => (bool) $row['available'],
    ];
}

mysqli_free_result($result);
mysqli_stmt_close($statement);
mysqli_close($connection);

respondJson([
    'data' => $offers,
    'meta' => [
        'count' => count($offers),
        'q' => $query,
        'available' => $available,
    ],
]);
