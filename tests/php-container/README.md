# Test kontenerowy PHP + MariaDB

Ten katalog uruchamia kanoniczne lekcje `401–412` w jednorazowym środowisku:

- `php:8.3-apache` z doinstalowanym rozszerzeniem `mysqli` wykonuje prawdziwe pliki PHP;
- `mariadb:11.4` importuje `database/web_grounding.sql` do nazwanym, lokalnym wolumenie;
- `test_lessons.py` jest bez-dependency klientem HTTP w Pythonie i sprawdza strony osadzanego PHP, formularze CRUD oraz API JSON;
- kod źródłowy repozytorium jest tylko montowany do Apache (`:ro`), więc test nie zapisuje plików kursu.

Połączenia PHP zachowują domyślne parametry XAMPP (`localhost`, `root`, puste hasło,
`web_grounding`). Compose przekazuje te same wartości przez `DB_HOST`, `DB_USER`,
`DB_PASSWORD` i `DB_NAME`, z wyjątkiem hosta `db`, bo MariaDB jest osobnym serwisem.

## Uruchomienie

Wymagane są Docker Desktop i Python 3.11+ (runner korzysta wyłącznie ze standardowej biblioteki):

```powershell
pwsh -File .\tests\php-container\run-tests.ps1
```

Skrypt buduje obraz, uruchamia Compose, czeka na Apache i usuwa wyłącznie projekt
`web-grounding-php-test` wraz z jego testowym wolumenem. Aby zostawić kontenery do
oględzin logów, dodaj `-Keep`.

Po pierwszym zbudowaniu można sprawdzić ścieżkę bez budowania:

```powershell
pwsh -File .\tests\php-container\run-tests.ps1 -NoBuild
```

Port można zmienić przez `$env:PHP_TEST_PORT`. Nie używaj tego Compose z produkcyjną
bazą: dane są seedowane i celowo usuwane po teście.
