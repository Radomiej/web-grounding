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
                        │                → 10–11 JS → 13–20 JS i projekt → 21 Canvas → 22 HUD
                        │                (12 Bootstrap: osobny dodatek)
                        └→ 03 PHP → 04 SELECT → 05 formularz/SELECT → 06 JSON/JS
```

### Ścieżka frontendowa — bez PHP

| Folder                          | Temat                                         | Co powstaje                                    |
| ------------------------------- | --------------------------------------------- | ---------------------------------------------- |
| `01-html-podstawy`              | dokument HTML, sekcje, lista i odnośnik       | pierwsza strona                                |
| `02-html-formularz`             | tabela, formularz, etykiety i podstawowy CSS  | formularz i tabela                             |
| `07-flexbox-sandbox`            | main axis, cross axis, `gap`, `flex-grow`     | generator HTML/CSS, osie, wrap i edycja dzieci |
| `08-flexbox-wlasny-layout`      | nagłówek, nawigacja, kolumny i karty          | własny prosty layout                           |
| `09-flexbox-wiecej-mozliwosci`  | wrap, basis, grow, shrink, align-self i order | elastyczne karty                               |
| `10-javascript-podstawy`        | zmienne, typy proste i operatory              | wyniki w konsoli                               |
| `11-javascript-dom-i-formularz` | DOM, funkcja, zdarzenie submit i tekst        | formularz powitania                            |
| `12-bootstrap-lokalnie`         | siatka, utilities, karty, alert i formularz   | strona z lokalnego CSS Bootstrap               |

### JavaScript z progresją — 12 etapów

Kolejność: **10 → 11 → 13 → 14 → 15 → 16 → 17 → 18 → 19 → 20 → 21 → 22**. Lekcja 12 (Bootstrap) jest niezależnym dodatkiem.

| Etap  | Lekcja                                                                   | Efekt                      |
| ----- | ------------------------------------------------------------------------ | -------------------------- |
| 1/12  | [10-javascript-podstawy](10-javascript-podstawy/README.md)               | Podstawy JavaScript        |
| 2/12  | [11-javascript-dom-i-formularz](11-javascript-dom-i-formularz/README.md) | Pierwszy DOM i formularz   |
| 3/12  | [13-javascript-kalkulator](13-javascript-kalkulator/README.md)           | Kalkulator kosztu          |
| 4/12  | [14-javascript-warunki](14-javascript-warunki/README.md)                 | Warunki i kontrolki        |
| 5/12  | [15-javascript-walidacja](15-javascript-walidacja/README.md)             | Walidacja formularza       |
| 6/12  | [16-javascript-petle-tablice](16-javascript-petle-tablice/README.md)     | Pętle i tablice            |
| 7/12  | [17-javascript-galeria](17-javascript-galeria/README.md)                 | Wygląd i galeria           |
| 8/12  | [18-javascript-lista](18-javascript-lista/README.md)                     | Obiekty i dynamiczna lista |
| 9/12  | [19-javascript-zapis](19-javascript-zapis/README.md)                     | Tekst, czas i zapis        |
| 10/12 | [20-javascript-projekt-inf03](20-javascript-projekt-inf03/README.md)     | Projekt pod INF.03         |
| 11/12 | [21-canvas-podstawy](21-canvas-podstawy/README.md)                       | Canvas 2D                  |
| 12/12 | [22-canvas-hud](22-canvas-hud/README.md)                                 | Animacja i HUD HTML        |

Każda lekcja zawiera gotowy przykład, wymagania wstępne, instrukcję, słownik składni, częste błędy i ćwiczenie. W projekcie 20 zacznij od folderu start i dopiero po własnej próbie porównaj rozwiązanie. Canvas/HUD są rozszerzeniem po części egzaminacyjnej.

Zakres podstaw JS, DOM, formularzy i zdarzeń odnosi się do [informatora CKE](https://bip.cke.gov.pl/attachments/download/8534). Ćwiczenie 20 jest autorskim zadaniem treningowym, nie oficjalnym arkuszem. PHP i baza pozostają potrzebne, gdy wymaga ich konkretne polecenie egzaminacyjne.

Słownik powtarzających się deklaracji znajduje się w [docs/css-lekcji.md](docs/css-lekcji.md). README każdej lekcji objaśnia dodatkowy CSS i JavaScript.

### Opcjonalna ścieżka PHP/MySQL

| Folder                       | Temat                                              | Baza danych |
| ---------------------------- | -------------------------------------------------- | ----------- |
| `03-php-podstawy`            | PHP w HTML, zmienne, warunek i pętla               | nie         |
| `04-php-lista-z-bazy`        | połączenie, `SELECT` i tabela generowana przez PHP | `offers`    |
| `05-php-formularz-i-select`  | `POST` i filtrowanie przygotowanym zapytaniem      | `places`    |
| `06-php-json-do-javascriptu` | PHP zwracający JSON i JavaScript z `fetch()`       | `offers`    |

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

| Zapis               | Znaczenie                                                |
| ------------------- | -------------------------------------------------------- |
| `<?php ... ?>`      | fragment wykonywany przez PHP                            |
| `$name`             | zmienna; każda zmienna PHP zaczyna się od `$`            |
| `.`                 | łączenie tekstów, np. `'Cześć ' . $name`                 |
| `$row['title']`     | wartość `title` w tablicy `$row`                         |
| `$object->method()` | wywołanie metody obiektu; `->` czytamy „na tym obiekcie” |
| `'key' => 'value'`  | przypisanie wartości do klucza tablicy                   |
| `===`               | porównanie wartości i typu                               |

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

Instrukcja instalacji zależności **wyłącznie dla autora testów**: [tests/README.md](tests/README.md). Uczeń nie potrzebuje npm.

Uruchom z katalogu projektu:

```powershell
node tests/validate-course.mjs
node --check 06-php-json-do-javascriptu/app.js
node --check 10-javascript-podstawy/app.js
node --check 11-javascript-dom-i-formularz/app.js
# Testy przeglądarkowe autora (wymagają Playwright w środowisku):
node tests/frontend-browser.cjs
```
