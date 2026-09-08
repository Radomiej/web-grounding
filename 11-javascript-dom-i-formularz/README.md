# Ćwiczenie 11 — DOM, zdarzenia i formularz

Otwórz `index.html`, wpisz nazwę zadania i je dodaj. Spróbuj też wysłać pustą wartość. JavaScript przejmuje formularz, sprawdza dane i tworzy nowe elementy HTML.

## Czego się nauczysz

- Wybierać elementy dokumentu przez `querySelector`.
- Reagować na wysłanie formularza przez `addEventListener`.
- Odczytywać i walidować wartości kontrolek.
- Bezpiecznie tworzyć elementy przez `createElement` oraz `textContent`.
- Aktualizować komunikat dostępny dla czytnika ekranu i oddawać fokus użytkownikowi.

## HTML

| Element lub atrybut | Znaczenie w ćwiczeniu |
| --- | --- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają podstawy dokumentu i responsywność. |
| `<link>` | Dołącza lokalny arkusz CSS. |
| `<script defer>` | Uruchamia JS po zbudowaniu dokumentu HTML. |
| `<form>` | Grupuje dane i emituje zdarzenie `submit`. |
| `<label for="id">` | Łączy nazwę pola z kontrolką o danym `id`. |
| `<input name="title" required>` | Przyjmuje tekst i włącza podstawową walidację przeglądarki. |
| `autocomplete="off"` | Wyłącza podpowiadanie wcześniejszych wartości w tym ćwiczeniu. |
| `<select>` i `<option>` | Pozwalają wybrać priorytet. |
| `<button type="submit">` | Wysyła formularz. |
| `role="status"` i `aria-live="polite"` | Ogłaszają komunikat po zmianie bez przerywania bieżącej wypowiedzi czytnika. |
| `<ul aria-label="...">` | Jest nazwaną listą wyników. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `font-family`, `line-height`, `color`, `background` | Ustawiają podstawową typografię i kolory. |
| `box-sizing: border-box` | Wlicza padding i ramkę do rozmiaru elementu. |
| `max-width: 48rem`, `margin: 0 auto`, `padding` | Ograniczają i centrują treść oraz dodają odstępy. |
| `display: grid` i `gap: 0.5rem` | Układają pola formularza pionowo z równymi odstępami. |
| `min-height: 2.75rem` | Zapewnia wygodny rozmiar pól i przycisku. |
| `padding-inline` | Dodaje poziomy odstęp w kontrolkach. |
| `font: inherit` | Przejmuje ustawienia czcionki dokumentu. |
| `border`, `border-left`, `border-radius` | Ustawiają ramki i zaokrąglenia panelu, przycisku i zadań. |
| `list-style: none` | Usuwa punktory z dynamicznej listy. |
| `display: flex`, `flex-wrap: wrap` | Układają nazwę i priorytet zadania oraz pozwalają im się zawinąć. |
| `justify-content: space-between` | Rozsuwa nazwę i priorytet na szerokim ekranie. |
| `margin-block` | Dodaje pionowy odstęp między zadaniami. |
| `.error`, `font-weight: 700` | Wyróżniają komunikat błędu. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazują fokus klawiatury. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `document.querySelector('#id')` | Zwraca pierwszy element pasujący do selektora CSS. |
| `function showStatus(message, isError = false)` | Deklaruje funkcję z parametrem domyślnym. |
| `.textContent = value` | Wstawia tekst bez interpretowania go jako HTML. |
| `.classList.toggle('error', isError)` | Dodaje albo usuwa klasę zależnie od wartości logicznej. |
| `.addEventListener('submit', handler)` | Uruchamia funkcję po wysłaniu formularza. |
| `(event) => { ... }` | Tworzy funkcję strzałkową przyjmującą obiekt zdarzenia. |
| `event.preventDefault()` | Zatrzymuje domyślne przeładowanie strony. |
| `.value` | Odczytuje aktualną wartość pola. |
| `.trim()` | Usuwa białe znaki z początku i końca tekstu. |
| `===` | Porównuje wartość i typ bez automatycznej konwersji. |
| `document.createElement('li')` | Tworzy bezpieczny, jeszcze niepodłączony element. |
| `.append(...)` | Dodaje elementy na końcu rodzica. |
| `.children.length` | Zwraca liczbę elementów potomnych listy. |
| `.reset()` | Przywraca początkowe wartości formularza. |
| `.focus()` | Przenosi fokus na pole tekstowe. |
| `return` | Kończy obsługę zdarzenia w ścieżce błędu. |

Kod celowo nie używa `innerHTML`, aby tekst wpisany przez użytkownika nie stawał się kodem HTML.

## Biblioteki

Brak bibliotek. Używane są natywne API DOM dostępne w przeglądarce.

## Zadanie

1. Dodaj trzeci priorytet.
2. Dodaj do każdego zadania przycisk „Usuń”.
3. Zaktualizuj komunikat po usunięciu elementu.
4. Sprawdź całość wyłącznie klawiaturą.
