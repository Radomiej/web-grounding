<?php
header('Content-Type: application/json; charset=utf-8');
mysqli_report(MYSQLI_REPORT_OFF);

$connection = mysqli_connect('localhost', 'root', '', 'web_grounding');

if ($connection === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Nie udało się połączyć z bazą danych.'], JSON_UNESCAPED_UNICODE);
    exit;
}

mysqli_set_charset($connection, 'utf8mb4');
$result = mysqli_query(
    $connection,
    'SELECT id, title, price, available FROM offers ORDER BY id'
);

if ($result === false) {
    mysqli_close($connection);
    http_response_code(500);
    echo json_encode(['error' => 'Nie udało się pobrać ofert.'], JSON_UNESCAPED_UNICODE);
    exit;
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
mysqli_close($connection);

echo json_encode(['data' => $offers], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
