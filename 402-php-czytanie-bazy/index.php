<?php
mysqli_report(MYSQLI_REPORT_OFF);

// XAMPP używa domyślnie localhost, a testowy Compose przekazuje DB_HOST=db.
$dbHost = getenv('DB_HOST') ?: 'localhost';
$dbUser = getenv('DB_USER') ?: 'root';
$dbPassword = getenv('DB_PASSWORD') ?: '';
$dbName = getenv('DB_NAME') ?: 'web_grounding';
$connection = mysqli_connect($dbHost, $dbUser, $dbPassword, $dbName);
$offers = [];
$error = null;

if ($connection === false) {
    $error = 'Nie udało się połączyć z bazą. Uruchom MySQL i zaimportuj database/web_grounding.sql.';
} else {
    mysqli_set_charset($connection, 'utf8mb4');
    $result = mysqli_query(
        $connection,
        'SELECT id, title, price, available FROM offers ORDER BY id'
    );

    if ($result === false) {
        $error = 'Nie udało się pobrać ofert.';
    } else {
        while ($row = mysqli_fetch_assoc($result)) {
            $offers[] = $row;
        }
        mysqli_free_result($result);
    }

    mysqli_close($connection);
}
?>
<!doctype html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Oferty z bazy danych</title>
    <style>
        body { max-width: 60rem; margin: 0 auto; padding: 1rem; font: 1rem/1.5 system-ui, sans-serif; color: #172033; }
        .table-wrapper { overflow-x: auto; }
        table { width: 100%; border-collapse: collapse; }
        th, td { padding: 0.65rem; border: 1px solid #667085; text-align: left; }
        .error { padding: 1rem; border-left: 0.4rem solid #b42318; background: #fef3f2; }
    </style>
</head>
<body>
    <header><h1>Oferty pobrane przez PHP</h1></header>
    <main>
        <?php if ($error !== null): ?>
            <p class="error" role="alert"><?= htmlspecialchars($error, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></p>
        <?php elseif ($offers === []): ?>
            <p>Baza nie zawiera ofert.</p>
        <?php else: ?>
            <div class="table-wrapper">
                <table>
                    <thead>
                        <tr><th scope="col">ID</th><th scope="col">Nazwa</th><th scope="col">Cena</th><th scope="col">Dostępna</th></tr>
                    </thead>
                    <tbody>
                        <?php foreach ($offers as $offer): ?>
                            <tr>
                                <td><?= htmlspecialchars((string) $offer['id'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></td>
                                <td><?= htmlspecialchars($offer['title'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></td>
                                <td><?= htmlspecialchars(number_format((float) $offer['price'], 2, ',', ' '), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?> zł</td>
                                <td><?= (int) $offer['available'] === 1 ? 'tak' : 'nie' ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>
