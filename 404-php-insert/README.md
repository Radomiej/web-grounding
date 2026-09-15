# Ćwiczenie 404 — PHP `INSERT`

Po odczycie i filtrowaniu zapisujesz pierwszy rekord do tabeli `offers`.
Przykład jest server-rendered: formularz wysyła `POST`, a PHP wykonuje
przygotowane zapytanie.

## Czego się nauczysz

- odczytywać `$_POST`;
- walidować tekst, cenę i checkbox;
- używać `mysqli_prepare` i `mysqli_stmt_bind_param`;
- odróżniać komunikat sukcesu od błędu bazy.

## HTML

`form method="post"` wysyła dane, `label` opisuje kontrolkę, `required`,
`min` i `step` dają pierwszą walidację w przeglądarce, a `role="status"`
oznacza komunikat dla technologii asystujących.

## CSS

Brak własnego arkusza; przykład skupia się na przepływie PHP i SQL.

## JavaScript

Brak JavaScriptu. To celowe porównanie z późniejszym API JSON.

## Biblioteki

Brak bibliotek i ORM. Używany jest proceduralny `mysqli` dostępny w PHP.

## PHP i SQL

| Zapis | Znaczenie |
| --- | --- |
| `$_SERVER['REQUEST_METHOD']` | Rozpoznaje wysłanie formularza. |
| `$_POST['title'] ?? ''` | Pobiera wartość z bezpiecznym fallbackiem. |
| `filter_var(..., FILTER_VALIDATE_FLOAT)` | Sprawdza cenę jako liczbę. |
| `mysqli_prepare` | Tworzy zapytanie z miejscami na parametry. |
| `mysqli_stmt_bind_param('sdi', ...)` | Wiąże tekst, liczbę zmiennoprzecinkową i liczbę całkowitą. |
| `INSERT INTO offers ...` | Dodaje jeden rekord. |
| `htmlspecialchars` | Bezpiecznie wyświetla komunikat jako HTML. |

## Zadanie do wykonania

1. Dodaj pole `description` tylko wtedy, gdy istnieje w twojej lokalnej kopii tabeli.
2. Ustaw minimalną długość nazwy na 5 znaków i pokaż osobny komunikat.
3. Przetestuj cenę pustą, ujemną, tekstową i poprawną.
4. Sprawdź sukces, błąd połączenia i ponowne wysłanie formularza.
5. Zapisz w notatce, dlaczego nie wolno składać SQL przez konkatenację tekstu.

## Kryteria zaliczenia

- dane są walidowane przed zapytaniem;
- `INSERT` używa prepared statement;
- komunikaty nie wypisują surowych danych użytkownika;
- przykład działa przez XAMPP bez JavaScriptu.
