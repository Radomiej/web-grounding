# Ćwiczenie 407 — PHP API: edycja rekordu

Po dodawaniu (`405`) i filtrowaniu (`406`) przyszedł czas na aktualizację.
Formularz wysyła JSON metodą `PUT`, PHP wykonuje przygotowany `UPDATE`, a na
końcu ponownie odczytuje rekord i zwraca jego aktualny stan.

## Czego się nauczysz

- rozróżniać `POST`, `GET` i `PUT` w API;
- walidować `id`, tytuł, cenę i dostępność;
- użyć `UPDATE ... WHERE id = ?`;
- potwierdzić zapis drugim zapytaniem `SELECT`;
- zwrócić `404`, gdy wskazany rekord nie istnieje.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `form id="edit-form"` | Grupuje dane aktualizowanego rekordu. |
| `input name="id" type="number"` | Przyjmuje dodatni identyfikator `AUTO_INCREMENT`. |
| `input name="title" maxlength="100" required` | Wymaga tytułu zgodnego z `VARCHAR(100)`. |
| `input name="price" min="0" step="0.01"` | Ogranicza cenę do nieujemnych groszy. |
| `input type="checkbox" name="available"` | Przekazuje stan logiczny. |
| `pre` | Pokazuje czytelny JSON odpowiedzi bez interpretowania go jako HTML. |
| `role="status" aria-live="polite"` | Ogłasza wynik operacji. |

## CSS

| Deklaracja | Znaczenie |
| --- | --- |
| `max-width`, `margin: 0 auto`, `padding` | Utrzymują czytelny, responsywny panel. |
| `display: grid`, `gap` | Układają formularz pionowo. |
| `box-sizing: border-box` | Zapobiega dodawaniu paddingu do szerokości. |
| `border`, `border-radius`, `background` | Budują wizualne grupy formularza i wyniku. |
| `min-height`, `font: inherit`, `padding-inline` | Ujednolicają kontrolki. |
| `opacity`, `cursor: not-allowed` | Pokazują chwilową blokadę podczas zapisu. |
| `:focus-visible`, `outline`, `outline-offset` | Zapewniają widoczny fokus klawiatury. |
| `overflow-x: auto` na `pre` | Pozwala obejrzeć długi JSON bez rozszerzania strony. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `FormData` | Odczytuje pola formularza. |
| `Number`, `JSON.stringify` | Konwertują dane i budują ciało JSON. |
| `fetch(..., { method: 'PUT' })` | Wysyła aktualizację do API. |
| `response.ok`, `response.status`, `response.json()` | Obsługują sukces i błędy HTTP. |
| `JSON.stringify(payload, null, 2)` | Formatuje odpowiedź w `pre`. |
| `textContent` | Wstawia JSON jako tekst, nie jako kod HTML. |
| `try`/`catch`/`finally` | Obsługują błąd i zawsze odblokowują przycisk. |

## Biblioteki

Brak zewnętrznych bibliotek. Używane są natywne API przeglądarki oraz PHP
`mysqli`.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `filter_var(..., FILTER_VALIDATE_INT)` | Sprawdza dodatni numer ID. |
| `json_decode(file_get_contents('php://input'), true)` | Odczytuje JSON z żądania `PUT`. |
| `UPDATE offers SET ... WHERE id = ?` | Zmienia tylko wskazany rekord. |
| `mysqli_stmt_bind_param('sdii', ...)` | Wiąże tekst, cenę i dwie liczby całkowite. |
| `mysqli_stmt_execute` | Wykonuje przygotowany UPDATE/SELECT. |
| `mysqli_stmt_get_result`, `mysqli_fetch_assoc` | Pobierają zaktualizowany rekord. |
| `respondJson(..., 404)` | Zwraca brak rekordu bez ujawniania SQL. |
| `mysqli_stmt_close`, `mysqli_close` | Zwalniają zasoby. |

## Kontrakt API

Żądanie `PUT api.php`:

```json
{ "id": 1, "title": "Nowy tytuł", "price": 55.5, "available": true }
```

Sukces to `200` i `data` z aktualną ofertą. `400` oznacza zły JSON, `404` brak
ID, `405` złą metodę, `422` błędne pola, a `500` problem po stronie bazy.

## Zadanie

Dodaj opcjonalne pole `description`, rozszerz `UPDATE` i odpowiedź, a następnie
sprawdź osobno ID `0`, ID nieistniejące, pusty tytuł i cenę ujemną.
