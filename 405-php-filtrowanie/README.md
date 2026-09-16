# Ćwiczenie 405 — PHP `SELECT`, `LIKE` i filtry

To rozszerzenie odczytu bazy: formularz `GET` zmienia prepared `SELECT`, a PHP
od razu generuje tabelę HTML. JSON zostawiamy na końcową ścieżkę API `408–412`.

## Czego się nauczysz

- czytać parametry `$_GET`;
- budować filtr `LIKE` bez konkatenacji danych do SQL;
- rozróżniać wynik pusty, błąd i listę rekordów;
- zachować wartości filtra w formularzu.

## HTML

`form method="get"` tworzy adres z parametrami, `select` ogranicza wartości, a
`table` prezentuje wynik po stronie PHP.

## CSS

Brak własnego CSS — skupienie jest na zapytaniu i trzech stanach wyniku.

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek; proceduralny `mysqli` i MySQL/MariaDB.

## PHP i SQL

| Zapis | Znaczenie |
| --- | --- |
| `$_GET['q'] ?? ''` | Odczyt tekstowego filtra. |
| `LIKE ?` | Szukanie fragmentu przez parametr prepared statement. |
| `mysqli_stmt_bind_param('s', $like)` | Przekazanie tekstu do zapytania. |
| `ORDER BY id` | Stabilna kolejność wyników. |
| `mysqli_stmt_get_result` | Odczyt wierszy z wykonanego statementu. |

## Zadanie do wykonania

1. Dodaj filtr minimalnej ceny z walidacją nieujemnej liczby.
2. Dodaj sortowanie rosnąco/malejąco przez białą listę dozwolonych wartości.
3. Sprawdź pusty filtr, brak wyników, `available=0` i bardzo długi tekst.
4. Wypisz aktywne parametry nad tabelą, bez używania `innerHTML`.

## Kryteria zaliczenia

- dane użytkownika nie trafiają bezpośrednio do SQL;
- wynik pusty ma własny komunikat;
- filtr po wysłaniu pozostaje widoczny;
- HTML jest generowany przez PHP, a JSON nie jest potrzebny do zaliczenia tej lekcji.
