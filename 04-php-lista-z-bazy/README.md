# Ćwiczenie 04 — lista z bazy

Uruchom MySQL, zaimportuj `database/web_grounding.sql` i otwórz `index.php` przez XAMPP. Prześledź przepływ od połączenia do tabeli HTML.

## Czego się nauczysz

- Łączyć PHP z MySQL/MariaDB przez proceduralne `mysqli`.
- Wykonać stałe zapytanie `SELECT` i pobierać rekordy w pętli.
- Obsłużyć błąd, pusty wynik i poprawną listę.
- Wyświetlać dane bazy bezpiecznie w HTML.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| Standardowy szkielet HTML5 | Zapewnia język polski, UTF-8 i responsywny viewport. |
| `<style>` | Przechowuje lokalne style ćwiczenia. |
| `<header>`, `<main>` | Organizują nagłówek i wynik. |
| `<p role="alert">` | Pokazuje komunikat błędu i oznacza go jako pilny dla technologii asystujących. |
| `<div class="table-wrapper">` | Pozwala przewijać szeroką tabelę. |
| `<table>`, `<thead>`, `<tbody>`, `<tr>` | Budują strukturę tabeli wyników. |
| `<th scope="col">` | Nazywa kolumnę. |
| `<td>` | Zawiera pojedynczą wartość rekordu. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `max-width: 60rem`, `margin: 0 auto`, `padding: 1rem` | Ograniczają, centrują i odsuwają stronę. |
| `font: 1rem/1.5 system-ui, sans-serif` | Ustawia rozmiar, interlinię i czcionkę. |
| `color: #172033` | Ustawia kolor tekstu. |
| `overflow-x: auto` | Dodaje przewijanie tabeli tylko przy braku miejsca. |
| `width: 100%` | Rozciąga tabelę na szerokość opakowania. |
| `border-collapse: collapse` | Łączy ramki sąsiednich komórek. |
| `padding: 0.65rem` | Dodaje odstęp w komórkach. |
| `border: 1px solid #667085` | Rysuje ramki komórek. |
| `text-align: left` | Wyrównuje treść komórek do lewej. |
| `padding: 1rem`, `border-left: 0.4rem solid #b42318`, `background: #fef3f2` | Budują widoczny panel błędu. |

## JavaScript

Nie jest używany. HTML tabeli generuje skrypt PHP.

## Biblioteki

Brak zewnętrznych bibliotek. Używane jest rozszerzenie `mysqli` dostarczane z PHP/XAMPP.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `mysqli_report(MYSQLI_REPORT_OFF)` | Wyłącza automatyczne wyjątki, aby przykład jawnie obsługiwał błędy. |
| `mysqli_connect('localhost', 'root', '', 'web_grounding')` | Łączy z lokalną bazą przy użyciu parametrów typowych dla szkolnego XAMPP. |
| `$offers = []`, `$error = null` | Przygotowują pustą tablicę i brak błędu. |
| `=== false`, `!== null`, `=== []` | Wykonują ścisłe porównania wartości i typu. |
| `mysqli_set_charset(..., 'utf8mb4')` | Ustawia kodowanie połączenia obsługujące pełny Unicode. |
| `mysqli_query($connection, 'SELECT ...')` | Wykonuje stałe zapytanie SQL. |
| `SELECT ... FROM offers ORDER BY id` | Pobiera wskazane kolumny i sortuje po `id`. |
| `while ($row = mysqli_fetch_assoc($result))` | Pobiera kolejne rekordy jako tablice z nazwami kolumn. |
| `$offers[] = $row` | Dodaje rekord na końcu tablicy. |
| `mysqli_free_result($result)` | Zwalnia pamięć wyniku. |
| `mysqli_close($connection)` | Zamyka połączenie. |
| `if:`, `elseif:`, `else:`, `endif;` | Wybierają komunikat błędu, pusty stan albo tabelę. |
| `$offer['title']` | Odczytuje wartość kolumny z tablicy rekordu. |
| `(string)`, `(float)`, `(int)` | Jawnie konwertują typ wartości. |
| `number_format(..., 2, ',', ' ')` | Formatuje cenę do dwóch miejsc z polskim separatorem. |
| `condition ? 'tak' : 'nie'` | Zamienia wartość logiczną na czytelny tekst. |
| `htmlspecialchars(...)` | Koduje dane przed wstawieniem do HTML. |

Ten wariant jest bezpieczny egzaminacyjnie, gdy arkusz wymaga, aby skrypt PHP wyświetlał rekordy.

## Zadanie

Dodaj kolumnę, zmień sortowanie, przetestuj pustą tabelę oraz zatrzymany MySQL i sprawdź każdy komunikat.
