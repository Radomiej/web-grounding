# web-grounding

Prosty kurs HTML, CSS, Flexbox, JavaScript, lokalnego Bootstrapa oraz opcjonalnego PHP przed egzaminem INF.03. Każdy przykład jest osobnym, małym folderem. Statyczne lekcje można otwierać bez PHP, a całość można skopiować do `C:\xampp\htdocs\web-grounding`.

Nie używamy Composera, npm, frameworka JavaScript ani ORM. Jedyną dołączoną biblioteką jest lokalny arkusz Bootstrap 5.3.8. Ścieżka PHP pokazuje przepływ:

```text
przeglądarka → PHP → MySQL/MariaDB → PHP → HTML lub JSON → przeglądarka
```

## Dwie ścieżki

Każdy zaczyna od `01` i `02`. Potem można wybrać ścieżkę bez PHP albo ścieżkę bazodanową:

```text
01 HTML → 02 formularz ─┬→ 07 Flexbox → 08 layout → 09 więcej Flexbox
                        │                → 10 podstawy JS → 11 DOM → 12 Bootstrap
                        └→ 03 PHP → 04 SELECT → 05 formularz/SELECT → 06 JSON/JS
```

### Ścieżka frontendowa — bez PHP

| Folder | Temat | Co powstaje |
| --- | --- | --- |
| `01-html-podstawy` | dokument HTML, sekcje, lista i odnośnik | pierwsza strona |
| `02-html-formularz` | tabela, formularz, etykiety i podstawowy CSS | formularz i tabela |
| `07-flexbox-sandbox` | main axis, cross axis, `gap`, `flex-grow` | klikalny sandbox bez JS |
| `08-flexbox-wlasny-layout` | nagłówek, nawigacja, kolumny i karty | własny prosty layout |
| `09-flexbox-wiecej-mozliwosci` | wrap, basis, grow, shrink, align-self i order | elastyczne karty |
| `10-javascript-podstawy` | zmienne, typy, tablice, obiekt, funkcja, pętla i warunek | wyniki w konsoli |
| `11-javascript-dom-i-formularz` | DOM, zdarzenie submit, walidacja i bezpieczne tworzenie elementów | dynamiczna lista zadań |
| `12-bootstrap-lokalnie` | siatka, utilities, karty, alert i formularz | strona z lokalnego CSS Bootstrap |

### Opcjonalna ścieżka PHP/MySQL

| Folder | Temat | Baza danych |
| --- | --- | --- |
| `03-php-podstawy` | PHP w HTML, zmienne, warunek i pętla | nie |
| `04-php-lista-z-bazy` | połączenie, `SELECT` i tabela generowana przez PHP | `offers` |
| `05-php-formularz-i-select` | `POST` i filtrowanie przygotowanym zapytaniem | `places` |
| `06-php-json-do-javascriptu` | PHP zwracający JSON i JavaScript z `fetch()` | `offers` |

Zacznij od [STUDENT_SETUP.md](STUDENT_SETUP.md). Dump bazy dla ścieżki PHP znajduje się w [database/web_grounding.sql](database/web_grounding.sql).

## Jak korzystać z README lekcji

Każdy folder ma własny `README.md` zawierający:

- cele lekcji;
- opis użytych elementów i atrybutów HTML;
- opis właściwości oraz wartości CSS;
- opis konstrukcji JavaScript i PHP, jeżeli występują;
- listę bibliotek albo jawną informację, że biblioteki nie są używane;
- zadanie do samodzielnego wykonania.

Wartości takie jak `1rem`, `#ffffff`, `flex-start` czy `space-between` są opisane przy lekcji, w której występują. Powtarzające się podstawy mogą odsyłać do wcześniejszego wyjaśnienia, ale nowe zapisy nie powinny pozostać bez opisu.

## Lokalny Bootstrap

Lekcja `12` korzysta z pliku `assets/bootstrap/bootstrap.min.css`. To oficjalny Bootstrap 5.3.8, a jego licencja MIT znajduje się w `assets/bootstrap/LICENSE`. Strona nie pobiera CSS z CDN i po skopiowaniu projektu działa bez internetu.

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

## Sprawdzenie materiałów

Uruchom z katalogu projektu:

```powershell
node tests/validate-course.mjs
node --check 06-php-json-do-javascriptu/app.js
node --check 10-javascript-podstawy/app.js
node --check 11-javascript-dom-i-formularz/app.js
```
