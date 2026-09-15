<?php
mysqli_report(MYSQLI_REPORT_OFF);
$message = null;
$connection = mysqli_connect('localhost', 'root', '', 'web_grounding');
if ($connection === false) {
    $message = 'Brak połączenia z bazą. Uruchom MySQL.';
} else {
    mysqli_set_charset($connection, 'utf8mb4');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $title = trim((string) ($_POST['title'] ?? ''));
        $price = filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT);
        $available = isset($_POST['available']) ? 1 : 0;
        if ($title === '' || $price === false || $price < 0) {
            $message = 'Podaj nazwę i nieujemną cenę.';
        } else {
            $statement = mysqli_prepare($connection, 'INSERT INTO offers (title, price, available) VALUES (?, ?, ?)');
            mysqli_stmt_bind_param($statement, 'sdi', $title, $price, $available);
            $message = mysqli_stmt_execute($statement) ? 'Oferta została dodana.' : 'Nie udało się dodać oferty.';
            mysqli_stmt_close($statement);
        }
    }
    mysqli_close($connection);
}
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PHP INSERT</title></head>
<body>
<header><h1>Dodawanie oferty przez PHP</h1><p><a href="../403-php-formularz-i-select/">← Formularz i SELECT</a></p></header>
<main>
<?php if ($message !== null): ?><p role="status"><?= e($message) ?></p><?php endif; ?>
<form method="post">
    <label>Nazwa <input name="title" required minlength="3"></label>
    <label>Cena <input name="price" type="number" min="0" step="0.01" required></label>
    <label><input name="available" type="checkbox" checked> Dostępna</label>
    <button type="submit">Dodaj ofertę</button>
</form>
</main>
</body>
</html>
