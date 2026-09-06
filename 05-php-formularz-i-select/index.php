<?php
mysqli_report(MYSQLI_REPORT_OFF);

$allowedCountries = ['Polska', 'Czechy', 'Słowacja'];
$selectedCountry = trim($_POST['country'] ?? '');
$submitted = ($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST';
$places = [];
$error = null;

if ($submitted) {
    if (!in_array($selectedCountry, $allowedCountries, true)) {
        $error = 'Wybierz kraj dostępny na liście.';
    } else {
        $connection = mysqli_connect('localhost', 'root', '', 'web_grounding');

        if ($connection === false) {
            $error = 'Nie udało się połączyć z bazą danych.';
        } else {
            mysqli_set_charset($connection, 'utf8mb4');
            $statement = mysqli_prepare(
                $connection,
                'SELECT id, name, country, population FROM places WHERE country = ? ORDER BY name'
            );

            if ($statement === false) {
                $error = 'Nie udało się przygotować zapytania.';
            } else {
                mysqli_stmt_bind_param($statement, 's', $selectedCountry);
                mysqli_stmt_execute($statement);
                $result = mysqli_stmt_get_result($statement);

                if ($result === false) {
                    $error = 'Nie udało się pobrać miejscowości.';
                } else {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $places[] = $row;
                    }
                    mysqli_free_result($result);
                }

                mysqli_stmt_close($statement);
            }

            mysqli_close($connection);
        }
    }
}
?>
<!doctype html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filtrowanie danych formularzem</title>
    <style>
        body { max-width: 55rem; margin: 0 auto; padding: 1rem; font: 1rem/1.5 system-ui, sans-serif; color: #172033; }
        form { display: flex; flex-wrap: wrap; align-items: end; gap: 0.75rem; padding: 1rem; background: #eef2f8; }
        label { display: grid; gap: 0.35rem; font-weight: 700; }
        select, button { min-height: 2.75rem; padding-inline: 0.75rem; font: inherit; }
        :focus-visible { outline: 3px solid #c2410c; outline-offset: 2px; }
        .error { padding: 0.75rem; border-left: 0.4rem solid #b42318; background: #fef3f2; }
    </style>
</head>
<body>
    <header><h1>Wyszukaj miejscowości</h1></header>
    <main>
        <form method="post" action="">
            <label for="country">
                Kraj
                <select id="country" name="country" required>
                    <option value="">— wybierz —</option>
                    <?php foreach ($allowedCountries as $country): ?>
                        <option value="<?= htmlspecialchars($country, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?>" <?= $selectedCountry === $country ? 'selected' : '' ?>>
                            <?= htmlspecialchars($country, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?>
                        </option>
                    <?php endforeach; ?>
                </select>
            </label>
            <button type="submit">Pokaż</button>
        </form>

        <?php if (!$submitted): ?>
            <p>Wybierz kraj i wyślij formularz.</p>
        <?php elseif ($error !== null): ?>
            <p class="error" role="alert"><?= htmlspecialchars($error, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></p>
        <?php elseif ($places === []): ?>
            <p>Brak miejscowości dla wybranego kraju.</p>
        <?php else: ?>
            <h2>Wyniki dla: <?= htmlspecialchars($selectedCountry, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></h2>
            <ul>
                <?php foreach ($places as $place): ?>
                    <li>
                        <?= htmlspecialchars($place['name'], ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?> —
                        <?= htmlspecialchars(number_format((int) $place['population'], 0, ',', ' '), ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?> mieszkańców
                    </li>
                <?php endforeach; ?>
            </ul>
        <?php endif; ?>
    </main>
</body>
</html>

