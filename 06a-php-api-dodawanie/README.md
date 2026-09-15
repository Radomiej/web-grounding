# Ćwiczenie 06A — PHP API: dodawanie do bazy

To osobna kontynuacja lekcji [06 — PHP jako endpoint JSON](../06-php-json-do-javascriptu/README.md).
Lekcja 06 odczytuje rekordy przez `GET`; tutaj uczysz się drugiego kierunku:
formularz wysyła dane przez `POST`, PHP waliduje wartości i dodaje jeden rekord
do tabeli `offers`.

## Wymagania wstępne

- wykonane lekcje 03–06 albo znajomość zmiennych, `mysqli`, SQL i `fetch()`;
- uruchomione Apache i MySQL/MariaDB w XAMPP;
- zaimportowany [database/web_grounding.sql](../database/web_grounding.sql);
- folder projektu skopiowany do `C:\xampp\htdocs\web-grounding`.

## Czego się nauczysz

- odczytać wartości formularza przez `FormData`;
- wysłać obiekt JSON metodą `POST`;
- rozróżnić kody HTTP `201`, `400`, `405`, `422` i `500`;
- odebrać z PHP ID nowo dodanego rekordu;
- walidować tekst, cenę i wartość logiczną przed zapisem;
- użyć `mysqli_prepare`, `mysqli_stmt_bind_param` i `mysqli_stmt_execute`;
- zrozumieć, dlaczego parametry zapytania są bezpieczniejsze niż sklejanie SQL;
- odświeżyć listę przez istniejący endpoint `GET` po udanym zapisie.

## Przepływ danych

```text
formularz HTML
    ↓ FormData + JSON.stringify
JavaScript fetch('api.php', { method: 'POST' })
    ↓ JSON i nagłówek Content-Type
PHP: json_decode → walidacja → prepared statement
    ↓ INSERT INTO offers
MySQL/MariaDB
    ↓ mysqli_insert_id
PHP: HTTP 201 + JSON z nową ofertą
    ↓
JavaScript: reset formularza + ponowny GET listy
```

## HTML

| Element lub atrybut | Znaczenie w tej lekcji |
| --- | --- |
| `<!doctype html>` | Włącza standard HTML5. |
| `<html lang="pl">` | Informuje czytnik ekranu, że tekst jest po polsku. |
| `<meta charset="UTF-8">` | Pozwala poprawnie wyświetlać polskie znaki. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Dopasowuje szerokość strony do telefonu. |
| `<link rel="stylesheet" href="style.css">` | Dołącza lokalny arkusz CSS. |
| `<script src="app.js" defer>` | Ładuje JavaScript i uruchamia go po zbudowaniu HTML. |
| `<header>`, `<main>`, `<section>` | Nadają stronie semantyczną strukturę. |
| `<h1>`, `<h2>` | Tworzą hierarchię nagłówków dla ucznia i technologii asystujących. |
| `<a href="...">` | Prowadzi z powrotem do lekcji odczytu JSON. |
| `<form id="offer-form">` | Grupuje pola i emituje zdarzenie `submit`. |
| `<label for="...">` | Łączy opis z konkretnym polem; kliknięcie etykiety ustawia fokus. |
| `name="title"`, `name="price"`, `name="available"` | Nazwy, pod którymi `FormData` odczytuje wartości. |
| `type="text"`, `maxlength="100"`, `required` | Wymagany tekst o długości zgodnej z kolumną `VARCHAR(100)`. |
| `type="number"`, `min="0"`, `step="0.01"` | Pole ceny nie pozwala w formularzu na liczbę ujemną i pokazuje krok groszy. |
| `type="checkbox"`, `checked` | Wartość logiczna; na początku oferta jest dostępna. |
| `<button type="submit">` | Uruchamia zapis formularza. |
| `<button type="button">` | Uruchamia `GET`, ale nie wysyła formularza. |
| `role="status"`, `aria-live="polite"` | Przekazuje postęp, sukces i błąd bez kradzieży fokusu. |
| `<ul>`, `<li>` | JavaScript bezpiecznie buduje listę ofert. |
| `<code>` | Wyróżnia nazwy metod, pól i kodu w instrukcji. |

## CSS

| Deklaracja lub wartość | Co pokazuje |
| --- | --- |
| `color`, `background`, `font-family` | Kolor tekstu, tło strony i stos fontów systemowych. |
| `box-sizing: border-box` | Wlicza padding i obramowanie do szerokości elementu. |
| `max-width: 52rem` | Ogranicza szerokość czytelnego dokumentu. |
| `margin: 0 auto` | Zeruje pionowy margines i centruje blok poziomo. |
| `padding: 1rem`, `padding-inline` | Dodaje odstęp wewnętrzny; druga forma działa tylko na osi poziomej. |
| `line-height: 1.5` | Zwiększa czytelność tekstu. |
| `margin-block: 1rem` | Dodaje margines na osi pionowej. |
| `display: grid` | Układa pola formularza i sekcje w prosty stos. |
| `gap: 1rem`, `gap: 0.35rem` | Odstęp między elementami siatki lub etykietą i polem. |
| `max-width: 30rem`, `width: 100%` | Ogranicza formularz, ale pozwala polu wypełnić jego szerokość. |
| `border: 1px solid #b8c6d8` | Rysuje cienką granicę sekcji. |
| `border-radius: 0.75rem` | Zaokrągla narożniki panelu. |
| `min-height: 2.75rem` | Zapewnia wygodną wysokość pola i przycisku. |
| `border-radius: 0.35rem` | Delikatnie zaokrągla kontrolki. |
| `font: inherit` | Dziedziczy krój i rozmiar tekstu w kontrolce. |
| `display: flex`, `align-items: center`, `gap: 0.5rem` | Ustawia checkbox i etykietę w jednym wierszu. |
| `cursor: pointer`, `cursor: not-allowed` | Sygnalizuje aktywny i zablokowany przycisk. |
| `opacity: 0.65` | Osłabia wygląd przycisku w trakcie zapisu. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazuje widoczny fokus klawiatury bez zmiany układu. |
| `min-height: 1.5em` | Rezerwuje miejsce na komunikat i ogranicza skakanie layoutu. |
| `border-left: 0.25rem solid` | Wyróżnia panel opisujący przepływ. |
| `li + li` | Selektor sąsiedniego rodzeństwa dodaje odstęp tylko między kolejnymi punktami. |

Kolory `#172033`, `#40536b`, `#12618a`, `#8a1c13` i `#c2410c` są zapisane
wprost, aby uczeń mógł łatwo zmienić kontrast, tekst, przycisk lub fokus.

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `'use strict'` | Włącza rygorystyczny tryb JavaScriptu. |
| `document.querySelector('#id')` | Pobiera formularz, przyciski i listę po identyfikatorze. |
| `addEventListener('submit', addOffer)` | Reaguje na wysłanie formularza także po klawiaturze. |
| `event.preventDefault()` | Zatrzymuje przeładowanie strony i pozwala użyć `fetch()`. |
| `new FormData(offerForm)` | Odczytuje wartości pól według ich atrybutów `name`. |
| `formData.get('title')` | Pobiera jedną wartość z formularza. |
| `String(...).trim()` | Zamienia wartość na tekst i usuwa spacje z początku/końca. |
| `Number(...)`, `Number.isFinite(...)` | Zamienia cenę na liczbę i odrzuca `NaN`/nieskończoność. |
| `JSON.stringify(input)` | Serializuje obiekt JavaScript do tekstu JSON. |
| `fetch('api.php', { method: 'POST', ... })` | Wysyła żądanie HTTP do PHP bez przeładowania strony. |
| `headers: { 'Content-Type': 'application/json' }` | Informuje PHP, że ciało żądania jest JSON-em. |
| `await response.json()` | Odczytuje JSON z odpowiedzi serwera. |
| `response.ok`, `response.status` | Rozróżnia sukces od kodów 4xx/5xx i pokazuje numer HTTP. |
| `try`, `catch`, `finally` | Obsługuje sukces, błąd sieci/serwera i odblokowanie przycisku. |
| `Array.isArray(payload.data)` | Sprawdza kształt danych przed renderowaniem listy. |
| `.replaceChildren()` | Czyści listę bez wstrzykiwania HTML. |
| `document.createElement('li')`, `.textContent`, `.append()` | Bezpiecznie tworzy elementy z tekstu bazy. |
| `offerForm.reset()` | Przywraca pola formularza do wartości początkowych po zapisie. |
| `void loadOffers()` | Jawnie ignoruje obietnicę zwracaną przez obsługę kliknięcia. |

## Biblioteki

| Biblioteka lub API | Czy wymagane? | Rola |
| --- | --- | --- |
| JavaScript `fetch`, `FormData`, DOM | Wbudowane w przeglądarkę | Żądanie HTTP, odczyt formularza i aktualizacja listy. |
| PHP `mysqli` | Tak, rozszerzenie PHP | Połączenie z MySQL/MariaDB i prepared statement. |
| Composer, framework JS, ORM, CDN | Nie | Lekcja działa na samym PHP, SQL i API przeglądarki. |

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `header('Content-Type: application/json; charset=utf-8')` | Ustawia typ JSON i kodowanie UTF-8. |
| `mysqli_report(MYSQLI_REPORT_OFF)` | Pozwala zwracać własne, zrozumiałe komunikaty zamiast HTML-owego wyjątku. |
| `$_SERVER['REQUEST_METHOD'] ?? 'GET'` | Odczytuje metodę HTTP; `??` daje wartość domyślną. |
| `header('Allow: GET, POST')` | Opisuje klientowi dozwolone metody przy błędzie `405`. |
| `http_response_code($status)` | Ustawia kod odpowiedzi, np. `201` po utworzeniu rekordu. |
| `file_get_contents('php://input')` | Czyta surowe ciało żądania JSON. |
| `json_decode($rawBody, true)` | Zamienia JSON na tablicę asocjacyjną PHP. |
| `json_last_error()` | Sprawdza, czy parser JSON zgłosił błąd. |
| `is_array`, `is_string`, `is_numeric`, `is_bool`, `is_finite` | Sprawdzają typy i poprawność danych z sieci. |
| `trim`, `strlen`, `mb_strlen` | Usuwają spacje i ograniczają długość tytułu także dla UTF-8. |
| `mysqli_connect(...)` | Otwiera połączenie z bazą `web_grounding`. |
| `mysqli_set_charset(..., 'utf8mb4')` | Ustawia poprawne kodowanie zapisu i odczytu. |
| `mysqli_prepare($connection, 'INSERT ... ?')` | Przygotowuje SQL z miejscami na parametry. |
| `mysqli_stmt_bind_param($statement, 'sdi', ...)` | Podstawia: `s` tekst, `d` liczbę dziesiętną, `i` liczbę całkowitą. |
| `mysqli_stmt_execute($statement)` | Wykonuje przygotowany `INSERT`. |
| `mysqli_insert_id($connection)` | Pobiera ID nadane przez `AUTO_INCREMENT`. |
| `mysqli_stmt_close`, `mysqli_close` | Zwalniają statement i połączenie. |
| `respondJson(...)` | Jedna funkcja ustawia status, koduje tablicę i kończy odpowiedź. |
| `JSON_UNESCAPED_UNICODE`, `JSON_UNESCAPED_SLASHES` | Zachowują polskie znaki i ukośniki w czytelnym JSON-ie. |
| `exit` | Kończy skrypt po odpowiedzi błędu lub sukcesu. |

Prepared statement jest ważny: tytuł wpisany przez użytkownika trafia jako
parametr, a nie jako fragment kodu SQL. Nie buduj zapytania przez konkatenację
`'... VALUES (\'' . $title . '\')'`.

## Kontrakt API

### `POST api.php`

Żądanie musi zawierać obiekt JSON. `available` może być wartością `true`/`false`
albo `0`/`1`; gdy pole nie wystąpi, API przyjmuje `true`.

```json
{
  "title": "Kurs PHP API",
  "price": 59.90,
  "available": true
}
```

Po zapisie serwer odpowiada statusem `201 Created`:

```json
{
  "data": {
    "id": 4,
    "title": "Kurs PHP API",
    "price": 59.9,
    "available": true
  }
}
```

| Kod | Kiedy występuje |
| --- | --- |
| `201` | Rekord został dodany. |
| `400` | Ciało nie jest poprawnym obiektem JSON. |
| `405` | Użyto metody innej niż `GET` lub `POST`. |
| `422` | Brak tytułu/ceny albo wartość nie spełnia reguł tabeli. |
| `500` | Nie działa połączenie, przygotowanie lub wykonanie SQL. |

### `GET api.php`

`GET` pozostaje taki jak w lekcji 06 i zwraca tablicę wszystkich ofert:

```json
{
  "data": [
    { "id": 1, "title": "Kurs HTML od podstaw", "price": 49, "available": true }
  ]
}
```

## Uruchomienie

1. Uruchom w XAMPP **Apache** i **MySQL**.
2. Zaimportuj `database/web_grounding.sql` w phpMyAdmin.
3. Otwórz `http://localhost/web-grounding/06a-php-api-dodawanie/`.
4. Dodaj ofertę, a następnie kliknij „Pobierz oferty”.
5. W DevTools → Network zobacz żądanie `POST`, jego JSON i odpowiedź `201`.

Nie otwieraj tego przykładu wyłącznie przez `file:///` ani przez statyczny
serwer — wtedy PHP się nie wykona. Połączenie `root` bez hasła jest uproszczeniem
lokalnego XAMPP, nie ustawieniem do publicznej aplikacji.

## Zadanie do samodzielnego wykonania

1. Dodaj pole `country` do tabeli i do formularza, a potem rozszerz `INSERT`.
2. Zablokuj zapis, gdy tytuł ma mniej niż 3 znaki.
3. Dodaj przycisk usuwania wybranej oferty i osobną metodę `DELETE`; najpierw
   zaprojektuj walidację ID i kod odpowiedzi.
4. Sprawdź ręcznie: pusty tytuł, cenę ujemną, niepoprawny JSON, wyłączony MySQL
   i szybkie wielokrotne kliknięcie. Zapisz dla każdego przypadku status HTTP.
