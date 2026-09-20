# Ćwiczenie 408 — PHP JSON i `fetch()` jako dodatek

JSON poznajesz dopiero po server-rendered `SELECT`, `INSERT`, `UPDATE` i
`DELETE`. Otwórz `api.php`, a potem `index.html` przez XAMPP i kliknij „Pobierz
oferty”.

## Czego się nauczysz

- Rozdzielać endpoint danych od strony HTML.
- Zwracać JSON i odpowiedni kod błędu z PHP.
- Pobierać dane przez `fetch` oraz `async`/`await`.
- Obsługiwać ładowanie, sukces, pusty wynik i błąd.
- Tworzyć DOM bez używania `innerHTML` dla danych z bazy.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| Standardowy szkielet HTML5 | Ustawia język, UTF-8, viewport i tytuł. |
| `<style>` | Zawiera mały lokalny CSS. |
| `<script src="app.js" defer>` | Dołącza skrypt i uruchamia go po odczytaniu HTML. |
| `<header>`, `<main>` | Organizują wprowadzenie i część interaktywną. |
| `<button id="load-offers" type="button">` | Uruchamia pobranie, ale nie wysyła formularza. |
| `<p role="status" aria-live="polite">` | Przekazuje stan również technologiom asystującym. |
| `<ul aria-label="Oferty">` | Jest nazwaną listą, do której JS dodaje elementy. |
| `id` | Zapewnia jednoznaczny selektor dla JavaScriptu. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `max-width: 50rem`, `margin: 0 auto`, `padding: 1rem` | Ograniczają, centrują i odsuwają treść. |
| `font: 1rem/1.5 system-ui, sans-serif`, `color: #172033` | Ustawiają typografię i kolor tekstu. |
| `min-height: 2.75rem`, `padding-inline: 1rem`, `font: inherit` | Zapewniają wygodny przycisk. |
| `button:focus-visible`, `outline`, `outline-offset` | Pokazują fokus klawiatury. |
| `#status { min-height: 1.5em }` | Rezerwuje miejsce na komunikat i ogranicza przesuwanie układu. |
| `.error { color: #8a1c13; font-weight: 700 }` | Wyróżnia błąd kolorem i pogrubieniem. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `'use strict'` | Włącza rygorystyczny tryb języka. |
| `document.querySelector('#id')` | Pobiera element z dokumentu. |
| `function showStatus(message, isError = false)` | Tworzy funkcję z wartością domyślną. |
| `.textContent = message` | Bezpiecznie ustawia tekst. |
| `.classList.toggle('error', isError)` | Ustawia klasę zależnie od stanu błędu. |
| `function renderOffers(offers)` | Oddziela budowanie widoku od pobierania danych. |
| `.replaceChildren()` | Usuwa dotychczasowe dzieci elementu. |
| `for (const offer of offers)` | Iteruje po tablicy ofert. |
| `document.createElement('li')` | Tworzy element listy. |
| `offer.available ? a : b` | Wybiera tekst zależnie od wartości logicznej. |
| `.toFixed(2)` | Formatuje cenę do dwóch miejsc. |
| `` `${value}` `` | Wstawia wartości do template literal. |
| `.append(item)` | Dodaje element na końcu listy. |
| `async function` | Deklaruje funkcję mogącą używać `await`. |
| `.disabled = true/false` | Blokuje przycisk podczas pobierania i później go odblokowuje. |
| `try`, `catch`, `finally` | Obsługują sukces, wyjątek i kod wykonywany zawsze. |
| `await fetch('api.php')` | Wysyła żądanie i czeka na odpowiedź. |
| `await response.json()` | Odczytuje ciało odpowiedzi jako JSON. |
| `response.ok` | Informuje, czy kod HTTP oznacza sukces. |
| `throw new Error(...)` | Przerywa ścieżkę sukcesu i przechodzi do `catch`. |
| `payload.error || '...'` | Używa błędu serwera albo tekstu zastępczego. |
| `Array.isArray(payload.data)` | Sprawdza, czy `data` rzeczywiście jest tablicą. |
| `offers.length === 0` | Rozpoznaje pusty wynik. |
| `error instanceof Error` | Sprawdza, czy przechwycona wartość jest obiektem błędu. |
| `.addEventListener('click', loadOffers)` | Uruchamia pobranie po kliknięciu. |

## Biblioteki

Brak zewnętrznych bibliotek. Używane są natywne `fetch` i DOM oraz rozszerzenie PHP `mysqli`.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `header('Content-Type: application/json; charset=utf-8')` | Deklaruje typ odpowiedzi JSON i UTF-8. |
| `http_response_code(500)` | Ustawia kod błędu serwera. |
| `json_encode(..., JSON_UNESCAPED_UNICODE)` | Zamienia tablicę PHP na JSON bez uciekania polskich znaków. |
| `JSON_UNESCAPED_SLASHES` | Pozostawia ukośniki w czytelnej postaci. |
| `exit` | Kończy skrypt po wysłaniu błędu. |
| `(int)`, `(float)`, `(bool)` | Nadają polom JSON właściwe typy. |
| `'key' => value` | Tworzy parę klucz–wartość w tablicy asocjacyjnej. |
| Funkcje `mysqli_*` | Łączą z bazą, wykonują SELECT, pobierają rekordy i zwalniają zasoby jak w lekcji 402. |

Ten wzorzec jest przydatny w aplikacjach internetowych, ale na INF.03 nie zastępuje automatycznie PHP generującego HTML. Jeżeli arkusz mówi, że skrypt PHP ma wyświetlać rekordy, zastosuj lekcję 402 albo 403.

## Zadanie do wykonania

1. Dodaj do odpowiedzi JSON pole `available` i bezpiecznie wyświetl je w DOM.
2. Obsłuż status 500, pustą tablicę i błędny JSON.
3. Zablokuj przycisk podczas aktywnego `fetch`, aby szybkie kliknięcia nie dublowały renderowania.
4. Zapisz, dlaczego JSON jest dodatkiem, a nie zamiennikiem kryterium „PHP wyświetla tabelę”.

## Kryteria zaliczenia

- endpoint ustawia `Content-Type: application/json; charset=utf-8`;
- dane są renderowane przez `textContent`, nie przez surowe `innerHTML`;
- błąd HTTP i pusty wynik mają osobne komunikaty;
- uczeń potrafi wrócić do wersji server-rendered z 402–407.
