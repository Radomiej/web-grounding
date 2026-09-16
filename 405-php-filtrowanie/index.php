<?php
mysqli_report(MYSQLI_REPORT_OFF);
$query = trim((string) ($_GET['q'] ?? ''));
$available = $_GET['available'] ?? '';
$offers = [];
$message = null;
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPassword = getenv('DB_PASSWORD') ?: '';
$dbName = getenv('DB_NAME') ?: 'web_grounding';
$connection = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
if ($connection === false) {
    $message = 'Brak połączenia z bazą. Uruchom MySQL.';
} else {
    mysqli_set_charset($connection, 'utf8mb4');
    $sql = 'SELECT id, title, price, available FROM offers WHERE title LIKE ?';
    $like = '%' . $query . '%';
    if ($available === '1') $sql .= ' AND available = 1';
    if ($available === '0') $sql .= ' AND available = 0';
    $sql .= ' ORDER BY id';
    $statement = mysqli_prepare($connection, $sql);
    mysqli_stmt_bind_param($statement, 's', $like);
    if (mysqli_stmt_execute($statement)) {
        $result = mysqli_stmt_get_result($statement);
        while ($row = mysqli_fetch_assoc($result)) $offers[] = $row;
        mysqli_free_result($result);
    } else {
        $message = 'Nie udało się pobrać ofert.';
    }
    mysqli_stmt_close($statement);
    mysqli_close($connection);
}
function e(string $value): string { return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); }
?>
<!doctype html>
<html lang="pl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>PHP filtrowanie</title></head>
<body>
<header><h1>Filtrowanie ofert</h1><p><a href="../404-php-insert/">← Dodawanie</a></p></header>
<main>
<form method="get">
    <label>Szukaj <input name="q" value="<?= e($query) ?>"></label>
    <label>Dostępność <select name="available"><option value="">Wszystkie</option><option value="1" <?= $available === '1' ? 'selected' : '' ?>>Tak</option><option value="0" <?= $available === '0' ? 'selected' : '' ?>>Nie</option></select></label>
    <button type="submit">Filtruj</button>
</form>
<?php if ($message !== null): ?><p role="alert"><?= e($message) ?></p><?php elseif ($offers === []): ?><p>Brak ofert dla podanych filtrów.</p><?php else: ?>
<table><thead><tr><th>ID</th><th>Nazwa</th><th>Cena</th><th>Dostępna</th></tr></thead><tbody>
<?php foreach ($offers as $offer): ?><tr><td><?= (int) $offer['id'] ?></td><td><?= e($offer['title']) ?></td><td><?= e(number_format((float) $offer['price'], 2, ',', ' ')) ?> zł</td><td><?= (int) $offer['available'] === 1 ? 'tak' : 'nie' ?></td></tr><?php endforeach; ?>
</tbody></table>
<?php endif; ?>
</main>
</body>
</html>
