# Ćwiczenie 410 — PHP API: filtrowanie danych

W lekcji 409 zapisaliśmy ofertę. Teraz endpoint działa jako czytelny
`GET`: parametry `q` i `available` wybierają rekordy, a PHP przekazuje je do
przygotowanego zapytania `SELECT`.

## Czego się nauczysz

- czytać parametry `$_GET`;
- budować adres z `URLSearchParams`;
- filtrować po fragmencie tytułu przez `LIKE`;
- łączyć dwa warunki `WHERE`;
- używać prepared statement także przy odczycie;
- zwracać metadane `count`, `q` i `available` razem z danymi.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `form id="filter-form"` | Grupuje filtry i emituje `submit`. |
| `input type="search" name="q" maxlength="100"` | Przyjmuje tekst wyszukiwany w tytule. |
| `select name="available"` | Pozwala wybrać wszystkie, dostępne albo niedostępne rekordy. |
| `option value="0/1"` | Przekazuje kod zgodny z `TINYINT(1)`. |
| `button type="submit"` | Uruchamia nowe żądanie GET. |
| `role="status" aria-live="polite"` | Ogłasza liczbę wyników i błędy. |
| `ul` i `li` | Otrzymują bezpiecznie wyrenderowane tytuły. |

## CSS

| Deklaracja | Znaczenie |
| --- | --- |
| `box-sizing: border-box` | Wlicza ramkę i padding do wymiaru. |
| `max-width`, `margin: 0 auto`, `padding` | Ograniczają i centrują czytelny panel. |
| `display: grid`, `gap` | Układają pola formularza w kolumnie. |
| `border`, `border-radius`, `background` | Budują kontrastowe panele i kontrolki. |
| `min-height`, `padding-inline`, `font: inherit` | Zapewniają wygodne, spójne pola. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazują fokus klawiatury. |
| `min-height: 1.5em` | Rezerwuje miejsce na status. |
| `.note` i `border-left` | Wyróżniają objaśnienie przepływu. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `new FormData(filterForm)` | Odczytuje wartości pól po `name`. |
| `new URLSearchParams()` | Koduje filtry do bezpiecznego query stringa. |
| `params.set()` i `.toString()` | Dodają parametry tylko wtedy, gdy uczeń ich użył. |
| `fetch('api.php?...')` | Wysyła żądanie GET bez przeładowania. |
| `response.ok`, `response.json()` | Rozpoznają błąd HTTP i odczytują JSON. |
| `Array.isArray`, `replaceChildren`, `textContent` | Sprawdzają wynik i chronią przed wstrzyknięciem HTML. |
| `try`/`catch` | Pokazują błąd sieci albo API. |

## Biblioteki

Brak zewnętrznych bibliotek. Używane są natywne `fetch`, `FormData`,
`URLSearchParams` i rozszerzenie PHP `mysqli`.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `$_GET['q'] ?? ''` | Czyta parametr albo przyjmuje pusty filtr. |
| `trim`, `mb_strlen`, `strlen` | Usuwają spacje i ograniczają długość tekstu. |
| `LIKE ?` | Szuka fragmentu tekstu przekazanego parametrem. |
| `WHERE ... AND ...` | Łączy filtrowanie tytułu i dostępności. |
| `mysqli_prepare` | Przygotowuje każde zapytanie z miejscami `?`. |
| `mysqli_stmt_bind_param('si' / 's' / 'i')` | Przekazuje tekst i liczbę bez sklejania SQL. |
| `mysqli_stmt_execute` | Wykonuje zapytanie. |
| `mysqli_stmt_get_result`, `mysqli_fetch_assoc` | Odczytują wynik SELECT. |
| `count($offers)` | Dodaje do odpowiedzi liczbę rekordów. |
| `respondJson` | Ustawia status, koduje JSON i kończy skrypt. |

## Kontrakt API

Przykład: `GET api.php?q=PHP&available=1`. Sukces zwraca `200` i:

```json
{
  "data": [],
  "meta": { "count": 0, "q": "PHP", "available": 1 }
}
```

`400` nie jest używany w tym prostym GET; `405` oznacza inną metodę, `422`
niepoprawny filtr, a `500` błąd bazy lub prepared statement.

## Zadanie do wykonania

Dodaj filtr ceny `minPrice`, zastosuj go tylko przy liczbie nieujemnej i opisz
nowy parametr w README. Sprawdź osobno pusty wynik, `available=0` i zbyt długi `q`.

## Kryteria zaliczenia

- `URLSearchParams` tworzy zapytanie, a PHP bezpiecznie używa `LIKE ?`.
- Pusty wynik, błędny filtr i sukces mają rozróżnialne komunikaty/statusy.
- Odpowiedź zawiera dane oraz metadane liczby wyników.
