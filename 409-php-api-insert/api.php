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

if ($method !== 'GET' && $method !== 'POST') {
    header('Allow: GET, POST');
    respondJson(['error' => 'Dozwolone metody to GET i POST.'], 405);
}

$connection = mysqli_connect('localhost', 'root', '', 'web_grounding');

if ($connection === false) {
    respondJson(['error' => 'Nie udało się połączyć z bazą danych.'], 500);
}

mysqli_set_charset($connection, 'utf8mb4');

if ($method === 'POST') {
    $rawBody = file_get_contents('php://input');
    $request = json_decode($rawBody, true);

    if (json_last_error() !== JSON_ERROR_NONE || !is_array($request)) {
        mysqli_close($connection);
        respondJson(['error' => 'Wyślij poprawny obiekt JSON.'], 400);
    }

    $titleValue = $request['title'] ?? null;
    $priceValue = $request['price'] ?? null;

    if (!is_string($titleValue) || !is_numeric($priceValue)) {
        mysqli_close($connection);
        respondJson(
            ['error' => 'Pola title (tekst) i price (liczba) są wymagane.'],
            422,
        );
    }

    $title = trim($titleValue);
    $price = (float) $priceValue;
    $titleLength = function_exists('mb_strlen')
        ? mb_strlen($title, 'UTF-8')
        : strlen($title);

    if ($title === '' || $titleLength > 100 || $price < 0 || !is_finite($price)) {
        mysqli_close($connection);
        respondJson(
            ['error' => 'title nie może być pusty ani dłuższy niż 100 znaków, a price nie może być ujemne.'],
            422,
        );
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
        respondJson(
            ['error' => 'Pole available musi być wartością true/false albo 0/1.'],
            422,
        );
    }

    $statement = mysqli_prepare(
        $connection,
        'INSERT INTO offers (title, price, available) VALUES (?, ?, ?)',
    );

    if ($statement === false) {
        mysqli_close($connection);
        respondJson(['error' => 'Nie udało się przygotować zapisu.'], 500);
    }

    if (!mysqli_stmt_bind_param($statement, 'sdi', $title, $price, $available)) {
        mysqli_stmt_close($statement);
        mysqli_close($connection);
        respondJson(['error' => 'Nie udało się powiązać danych z zapytaniem.'], 500);
    }

    if (!mysqli_stmt_execute($statement)) {
        mysqli_stmt_close($statement);
        mysqli_close($connection);
        respondJson(['error' => 'Nie udało się zapisać oferty.'], 500);
    }

    $id = (int) mysqli_insert_id($connection);
    mysqli_stmt_close($statement);
    mysqli_close($connection);

    respondJson(
        [
            'data' => [
                'id' => $id,
                'title' => $title,
                'price' => $price,
                'available' => (bool) $available,
            ],
        ],
        201,
    );
}

$result = mysqli_query(
    $connection,
    'SELECT id, title, price, available FROM offers ORDER BY id',
);

if ($result === false) {
    mysqli_close($connection);
    respondJson(['error' => 'Nie udało się pobrać ofert.'], 500);
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

respondJson(['data' => $offers]);
