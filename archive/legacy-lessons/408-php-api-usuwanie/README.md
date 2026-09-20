# Ćwiczenie 408 — PHP API: usuwanie rekordu

To ostatnia podstawowa operacja CRUD w tej ścieżce. Formularz wysyła JSON
metodą `DELETE`, PHP sprawdza ID i wykonuje `DELETE FROM offers` z parametrem.
Ćwiczenie jest wyłącznie lokalne — przed testem przywróć bazę z dumpa SQL.

## Czego się nauczysz

- zaprojektować żądanie `DELETE`;
- walidować dodatni identyfikator;
- używać `mysqli_stmt_affected_rows` do sprawdzenia, czy rekord istniał;
- rozróżnić sukces `200`, brak rekordu `404` i błąd walidacji `422`;
- rozumieć, dlaczego usuwanie wymaga dodatkowej ostrożności.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `p.warning` | Ostrzega o destrukcyjnej operacji lokalnej. |
| `form id="delete-form"` | Zbiera ID i emituje `submit`. |
| `input type="number" min="1" step="1"` | Ogranicza ID do dodatniej liczby całkowitej. |
| `button type="submit"` | Uruchamia żądanie DELETE. |
| `pre` | Pokazuje odpowiedź JSON jako tekst. |
| `role="status" aria-live="polite"` | Przekazuje wynik bez zmiany fokusu. |

## CSS

| Deklaracja | Znaczenie |
| --- | --- |
| `background`, `color`, `font-family`, `line-height` | Ustawiają bazowy wygląd dokumentu. |
| `max-width`, `margin`, `padding` | Ograniczają i centrują treść. |
| `border`, `border-radius`, `border-left` | Oddzielają panel i ostrzeżenie. |
| `display: grid`, `gap` | Układają formularz. |
| `min-height`, `padding-inline`, `font: inherit` | Ułatwiają obsługę pola i przycisku. |
| `opacity`, `cursor: not-allowed` | Pokazują blokadę podczas żądania. |
| `:focus-visible`, `outline`, `outline-offset` | Zapewniają widoczny fokus. |
| `overflow-x: auto` | Chroni layout przed długim JSON-em. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `new FormData(deleteForm)` | Odczytuje ID. |
| `Number(...)` | Zamienia wartość pola na liczbę. |
| `fetch(..., { method: 'DELETE' })` | Wysyła operację usunięcia. |
| `JSON.stringify({ id })` | Buduje ciało JSON. |
| `response.ok`, `response.status`, `response.json()` | Rozpoznają status i dane odpowiedzi. |
| `JSON.stringify(payload, null, 2)` | Formatuje JSON w `pre`. |
| `reset`, `textContent`, `try/catch/finally` | Czyszczą formularz, chronią HTML i obsługują błąd. |

## Biblioteki

Brak bibliotek zewnętrznych. Wystarczą natywne API przeglądarki i rozszerzenie
PHP `mysqli`.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `FILTER_VALIDATE_INT` z `min_range` | Odrzuca ID `0`, ujemne i tekstowe. |
| `json_decode(file_get_contents('php://input'), true)` | Czyta JSON żądania DELETE. |
| `DELETE FROM offers WHERE id = ?` | Usuwa tylko rekord wskazany parametrem. |
| `mysqli_stmt_bind_param('i', $id)` | Wiąże ID jako liczbę całkowitą. |
| `mysqli_stmt_execute` | Wykonuje prepared statement. |
| `mysqli_stmt_affected_rows` | Zwraca liczbę usuniętych rekordów. |
| `respondJson(..., 404)` | Zwraca brak rekordu jako czytelny status. |
| `mysqli_stmt_close`, `mysqli_close` | Zwalniają zasoby po operacji. |

## Kontrakt API

Żądanie `DELETE api.php`:

```json
{ "id": 4 }
```

Sukces (`200`):

```json
{ "data": { "deletedId": 4 } }
```

`400` oznacza zły JSON, `404` brak ID, `405` złą metodę, `422` błędne ID,
a `500` problem połączenia albo SQL.

## Zadanie

Dodaj ekran potwierdzenia przed wysłaniem, a następnie napisz test ręczny:
usuń istniejące ID, spróbuj usunąć je drugi raz i zapisz oba statusy HTTP.
