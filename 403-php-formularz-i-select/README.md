# Ćwiczenie 403 — formularz i SELECT

Formularz wysyła `country` metodą POST do tego samego `index.php`. PHP sprawdza wartość, przekazuje ją jako parametr zapytania i generuje wynik.

## Czego się nauczysz

- Odczytywać metodę żądania i dane formularza.
- Walidować wartość względem listy dozwolonych opcji.
- Używać przygotowanego zapytania zamiast sklejać SQL.
- Obsługiwać stan początkowy, błąd, pusty wynik i poprawne dane.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| Standardowy szkielet HTML5 | Ustawia język, UTF-8, viewport i tytuł. |
| `<style>` | Zawiera lokalny CSS. |
| `<header>`, `<main>` | Dzielą stronę na nagłówek i główną treść. |
| `<form method="post" action="">` | Wysyła dane POST do tego samego adresu. |
| `<label for="country">` | Nazywa listę o identyfikatorze `country`. |
| `<select id="country" name="country" required>` | Pozwala wybrać kraj; `name` staje się kluczem w `$_POST`. |
| `<option value="..." selected>` | Definiuje wysyłaną wartość; `selected` zachowuje poprzedni wybór. |
| `<button type="submit">` | Wysyła formularz. |
| `<p role="alert">` | Pokazuje błąd walidacji, połączenia lub zapytania. |
| `<ul>` i `<li>` | Tworzą listę znalezionych miejscowości. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `max-width: 55rem`, `margin: 0 auto`, `padding: 1rem` | Ograniczają, centrują i odsuwają stronę. |
| `font: 1rem/1.5 system-ui, sans-serif`, `color: #172033` | Ustawiają typografię i kolor tekstu. |
| `display: flex` | Układa etykietę i przycisk w elastycznym wierszu. |
| `flex-wrap: wrap` | Pozwala kontrolkom przejść do nowego wiersza. |
| `align-items: end` | Wyrównuje przycisk z dołem pola wyboru. |
| `gap: 0.75rem` | Dodaje odstęp pomiędzy elementami formularza. |
| `background: #eef2f8` | Ustawia tło formularza. |
| `display: grid`, `gap: 0.35rem` | Układa tekst etykiety nad polem. |
| `font-weight: 700` | Pogrubia etykietę. |
| `min-height: 2.75rem`, `padding-inline: 0.75rem`, `font: inherit` | Ustawiają wygodny rozmiar i typografię kontrolek. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazują fokus klawiatury. |
| `border-left: 0.4rem solid #b42318`, `background: #fef3f2` | Wyróżniają błąd. |

## JavaScript

Nie jest używany. Formularz i wynik obsługuje PHP po przeładowaniu strony.

## Biblioteki

Brak zewnętrznych bibliotek. Wymagane jest rozszerzenie PHP `mysqli`.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `$_POST['country'] ?? ''` | Odczytuje wartość POST lub zwraca pusty tekst, gdy klucza nie ma. |
| `trim(...)` | Usuwa białe znaki z początku i końca tekstu. |
| `$_SERVER['REQUEST_METHOD']` | Informuje, czy przeglądarka wykonała GET czy POST. |
| `in_array($value, $allowed, true)` | Sprawdza wartość na dokładnej liście, używając ścisłego porównania. |
| `!` | Neguje wartość logiczną. |
| `mysqli_connect` / `mysqli_set_charset` | Otwierają połączenie i ustawiają `utf8mb4`. |
| `mysqli_prepare($connection, '... WHERE country = ?')` | Przygotowuje SQL z miejscem na parametr. Znak `?` nie jest tekstem użytkownika. |
| `mysqli_stmt_bind_param($statement, 's', $selectedCountry)` | Wiąże parametr typu string oznaczonego literą `s`. |
| `mysqli_stmt_execute($statement)` | Wykonuje przygotowane zapytanie. |
| `mysqli_stmt_get_result($statement)` | Pobiera wynik zapytania. |
| `mysqli_fetch_assoc`, `mysqli_free_result` | Pobierają rekordy i zwalniają wynik. |
| `mysqli_stmt_close`, `mysqli_close` | Zamykają zapytanie i połączenie. |
| `foreach` | Generuje opcje krajów i elementy wyniku. |
| `number_format(..., 0, ',', ' ')` | Formatuje liczbę mieszkańców bez części dziesiętnej. |
| `htmlspecialchars` | Koduje dane przed pokazaniem w HTML. |

Wartość użytkownika nie jest doklejana do SQL. To najważniejsza różnica względem niebezpiecznego zapytania budowanego jako tekst.

## Zadanie do wykonania

1. Dodaj trzecią dozwoloną wartość do `select` i do warunku prepared query.
2. Dodaj komunikat dla pustego wyboru i kraju bez wyników.
3. Przetestuj zatrzymany MySQL oraz wartość spoza listy.
4. Wypisz aktywny filtr bez doklejania danych do SQL.

## Kryteria zaliczenia

- Formularz zachowuje wybrany kraj po wysłaniu i pokazuje stan pusty albo wyniki.
- Zapytanie używa `mysqli_prepare` oraz `bind_param`, a wartość użytkownika nie jest konkatenowana z SQL.
- Błędny lub niedozwolony wybór jest obsłużony czytelnym komunikatem.
