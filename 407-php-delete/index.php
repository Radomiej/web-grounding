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
        if ($id === false || $id < 1) {
            $message = 'Podaj poprawne ID.';
        } else {
            $statement = mysqli_prepare($connection, 'DELETE FROM offers WHERE id = ?');
            mysqli_stmt_bind_param($statement, 'i', $id);
            mysqli_stmt_execute($statement);
            $message = mysqli_stmt_affected_rows($statement) === 1 ? 'Rekord usunięty.' : 'Nie znaleziono rekordu o tym ID.';
            mysqli_stmt_close($statement);
        }
    }
    mysqli_close($connection);
}
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PHP DELETE</title></head>
<body>
<header><h1>Usuwanie oferty</h1><p><a href="../406-php-update/">← 406: edycja oferty</a> · <a href="../408-php-api-json/">API/JSON jako dodatek →</a></p></header>
<main>
<?php if ($message !== null): ?><p role="status"><?= e($message) ?></p><?php endif; ?>
<form method="post">
    <label>ID rekordu do usunięcia <input name="id" type="number" min="1" required></label>
    <button type="submit">Usuń rekord</button>
</form>
<p>W realnej aplikacji dodaj ekran potwierdzenia albo token CSRF.</p>
</main>
</body>
</html>
