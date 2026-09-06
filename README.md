# web-grounding

Prosty kurs HTML i minimalnego PHP przed egzaminem INF.03. Każdy przykład jest osobnym, małym folderem, który można skopiować do `C:\xampp\htdocs\web-grounding`.

Nie używamy Composera, frameworka ani ORM. Celem jest zrozumienie przepływu:

```text
przeglądarka → PHP → MySQL/MariaDB → PHP → HTML lub JSON → przeglądarka
```

## Kolejność

| Folder | Temat | Baza danych |
| --- | --- | --- |
| `01-html-podstawy` | dokument HTML, sekcje, lista i odnośnik | nie |
| `02-html-formularz` | tabela, formularz, etykiety i CSS | nie |
| `03-php-podstawy` | PHP w HTML, zmienne, warunek i pętla | nie |
| `04-php-lista-z-bazy` | połączenie, `SELECT` i tabela generowana przez PHP | `offers` |
| `05-php-formularz-i-select` | `POST` i filtrowanie przygotowanym zapytaniem | `places` |
| `06-php-json-do-javascriptu` | PHP zwracający JSON i JavaScript z `fetch()` | `offers` |

Zacznij od [STUDENT_SETUP.md](STUDENT_SETUP.md). Dump bazy znajduje się w [database/web_grounding.sql](database/web_grounding.sql).

## Najważniejsze symbole PHP

| Zapis | Znaczenie |
| --- | --- |
| `<?php ... ?>` | fragment wykonywany przez PHP |
| `$name` | zmienna; każda zmienna PHP zaczyna się od `$` |
| `.` | łączenie tekstów, np. `'Cześć ' . $name` |
| `$row['title']` | wartość `title` w tablicy `$row` |
| `$object->method()` | wywołanie metody obiektu; `->` czytamy „na tym obiekcie” |
| `'key' => 'value'` | przypisanie wartości do klucza tablicy |
| `===` | porównanie wartości i typu |

W ćwiczeniach bazodanowych używamy proceduralnego `mysqli`, dlatego zamiast:

```php
$connection->query($sql);
```

zapisujemy:

```php
mysqli_query($connection, $sql);
```

## PHP, JSON i egzamin INF.03

Projekt `06` jest poprawnym technicznie mostem: PHP pobiera dane z bazy i zwraca JSON, a JavaScript buduje widok. Na egzaminie należy jednak dokładnie czytać arkusz. Jeżeli polecenie mówi, że **skrypt PHP wyświetla rekordy** w tabeli, liście albo panelu, bezpieczniej zastosować wariant z `04` lub `05`, gdzie HTML powstaje po stronie PHP. Działający JSON nie gwarantuje punktów za kryterium przypisane bezpośrednio skryptowi PHP.

## Granica bezpieczeństwa

Połączenie `root` bez hasła jest typowym uproszczeniem lokalnego XAMPP i stanowiska egzaminacyjnego. Nie jest wzorcem do publikowania aplikacji w internecie.

