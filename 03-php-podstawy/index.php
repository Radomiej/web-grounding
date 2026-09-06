<?php
$pageTitle = 'PHP osadzone w HTML';
$studentName = 'Ola';
$topics = ['zmienne', 'warunki', 'pętle', 'echo'];
$hour = (int) date('G');
$greeting = $hour < 18 ? 'Dzień dobry' : 'Dobry wieczór';
?>
<!doctype html>
<html lang="pl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($pageTitle, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></title>
    <style>
        body { max-width: 50rem; margin: 0 auto; padding: 1rem; font: 1rem/1.6 system-ui, sans-serif; color: #172033; }
        main { padding: 1rem; border: 1px solid #9eabc2; border-radius: 0.5rem; }
        code { padding: 0.1rem 0.3rem; background: #eef2f8; }
    </style>
</head>
<body>
    <header>
        <h1><?= htmlspecialchars($pageTitle, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></h1>
    </header>

    <main>
        <p>
            <?php echo htmlspecialchars($greeting . ', ' . $studentName . '!', ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8'); ?>
        </p>

        <h2>Tematy zapisane w tablicy</h2>
        <ul>
            <?php foreach ($topics as $topic): ?>
                <li><?= htmlspecialchars($topic, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8') ?></li>
            <?php endforeach; ?>
        </ul>

        <p>Znak <code>.</code> łączy teksty, a znak <code>$</code> rozpoczyna nazwę zmiennej.</p>
    </main>
</body>
</html>

