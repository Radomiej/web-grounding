# Ćwiczenie 406 — PHP `UPDATE`

Po `INSERT` i filtrowaniu uczysz się zmieniać istniejący rekord. Formularz
wysyła zwykły `POST`, więc można śledzić przepływ bez dodatkowego JavaScriptu.

## Czego się nauczysz

- walidować identyfikator przez `FILTER_VALIDATE_INT`;
- wykonać prepared `UPDATE`;
- odczytać liczbę zmienionych wierszy;
- odróżnić brak rekordu od poprawnej aktualizacji.

## HTML

`input type="number"` ogranicza ID i cenę, a `role="status"` oznacza komunikat
po wykonaniu operacji.

## CSS

Brak własnego CSS.

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek; używany jest `mysqli`.

## PHP i SQL

| Zapis | Znaczenie |
| --- | --- |
| `FILTER_VALIDATE_INT` | Sprawdza ID jako liczbę całkowitą. |
| `UPDATE offers SET ... WHERE id = ?` | Zmienia tylko wskazany rekord. |
| `mysqli_stmt_affected_rows` | Informuje, ile wierszy zmieniono. |
| `sdi` | Typy parametrów: string, double, integer. |

## Zadanie do wykonania

1. Dodaj pole dostępności i aktualizuj je jako checkbox.
2. Dodaj długość minimalną nazwy oraz osobny komunikat walidacji.
3. Sprawdź ID puste, ujemne, nieistniejące i istniejące.
4. Powtórz zapis tej samej wartości i wyjaśnij wynik `affected_rows`.

## Kryteria zaliczenia

- `WHERE id = ?` ogranicza zmianę do jednego rekordu;
- wszystkie dane przechodzą przez prepared statement;
- użytkownik dostaje jasny komunikat dla każdego wyniku;
- przykład nie wymaga JSON ani JavaScriptu.
