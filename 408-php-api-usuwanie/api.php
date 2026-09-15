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
if ($method !== 'DELETE') {
    header('Allow: DELETE');
    respondJson(['error' => 'To API obsługuje tylko DELETE.'], 405);
}

$connection = mysqli_connect('localhost', 'root', '', 'web_grounding');
if ($connection === false) {
    respondJson(['error' => 'Nie udało się połączyć z bazą danych.'], 500);
}
mysqli_set_charset($connection, 'utf8mb4');

$request = json_decode(file_get_contents('php://input'), true);
if (json_last_error() !== JSON_ERROR_NONE || !is_array($request)) {
    mysqli_close($connection);
    respondJson(['error' => 'Wyślij JSON z polem id.'], 400);
}

$id = filter_var($request['id'] ?? null, FILTER_VALIDATE_INT, [
    'options' => ['min_range' => 1],
]);
if ($id === false) {
    mysqli_close($connection);
    respondJson(['error' => 'id musi być dodatnią liczbą całkowitą.'], 422);
}

$statement = mysqli_prepare($connection, 'DELETE FROM offers WHERE id = ?');
if ($statement === false) {
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się przygotować usuwania.'], 500);
}

mysqli_stmt_bind_param($statement, 'i', $id);
if (!mysqli_stmt_execute($statement)) {
    mysqli_stmt_close($statement);
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się usunąć oferty.'], 500);
}

$deleted = mysqli_stmt_affected_rows($statement);
mysqli_stmt_close($statement);
mysqli_close($connection);

if ($deleted !== 1) {
    respondJson(['error' => 'Nie znaleziono oferty o podanym ID.'], 404);
}

respondJson([
    'data' => [
        'deletedId' => (int) $id,
    ],
]);
