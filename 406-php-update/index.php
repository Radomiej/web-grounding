<?php
mysqli_report(MYSQLI_REPORT_OFF);
$message = null;
$connection = mysqli_connect('localhost', 'root', '', 'web_grounding');
if ($connection === false) {
    $message = 'Brak połączenia z bazą. Uruchom MySQL.';
} else {
    mysqli_set_charset($connection, 'utf8mb4');
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT);
        $title = trim((string) ($_POST['title'] ?? ''));
        $price = filter_var($_POST['price'] ?? null, FILTER_VALIDATE_FLOAT);
        if ($id === false || $id < 1 || $title === '' || $price === false || $price < 0) {
            $message = 'Podaj poprawne ID, nazwę i cenę.';
        } else {
            $statement = mysqli_prepare($connection, 'UPDATE offers SET title = ?, price = ? WHERE id = ?');
            mysqli_stmt_bind_param($statement, 'sdi', $title, $price, $id);
            mysqli_stmt_execute($statement);
            $message = mysqli_stmt_affected_rows($statement) === 1 ? 'Rekord zaktualizowany.' : 'Nie zmieniono rekordu lub ID nie istnieje.';
            mysqli_stmt_close($statement);
        }
    }
    mysqli_close($connection);
}
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PHP UPDATE</title></head>
<body>
<header><h1>Edycja oferty</h1><p><a href="../405-php-filtrowanie/">← Filtrowanie</a></p></header>
<main>
<?php if ($message !== null): ?><p role="status"><?= e($message) ?></p><?php endif; ?>
<form method="post">
    <label>ID <input name="id" type="number" min="1" required></label>
    <label>Nazwa <input name="title" required minlength="3"></label>
    <label>Cena <input name="price" type="number" min="0" step="0.01" required></label>
    <button type="submit">Zapisz zmiany</button>
</form>
</main>
</body>
</html>
