# 303 — JavaScript: klasy i theme

Po zmianie tekstu i wartości formularza uczysz się zmieniać wygląd przez klasy.
To bezpieczniejsze i łatwiejsze do utrzymania niż wpisywanie `style` z JS.

## Wymagania wstępne

[302 — DOM i formularz](../302-javascript-dom-i-formularz/README.md).

## Czego się nauczysz

- znaleźć element przez `querySelector`;
- dodawać, usuwać i przełączać klasy;
- synchronizować `aria-pressed` z widocznym stanem;
- rozdzielić stan DOM od reguł CSS.

## HTML

`button type="button"` nie wysyła formularza. `aria-pressed` informuje o stanie
przycisku, `role="status"` oznacza komunikat, a `class` jest punktem zaczepienia
dla CSS.

## CSS

| Zapis | Znaczenie |
| --- | --- |
| `.dark` | Klasa na `body`, która zmienia tło i kolor tekstu. |
| `.highlight` | Klasa wizualnie wyróżniająca opis. |
| `transition` | Łagodnie animuje zmianę koloru. |
| `:focus-visible` | Pokazuje fokus z klawiatury. |

## JavaScript

| API | Znaczenie |
| --- | --- |
| `querySelector` | Zwraca pierwszy element pasujący do selektora. |
| `classList.toggle` | Dodaje klasę albo ją usuwa. |
| `classList.contains` | Sprawdza, czy klasa istnieje. |
| `setAttribute` | Ustawia atrybut HTML, np. `aria-pressed`. |
| `addEventListener('click', ...)` | Reaguje na kliknięcie. |
| `String(boolean)` | Zamienia stan logiczny na tekst atrybutu. |

## Biblioteki

Brak bibliotek. Używane są natywne API DOM.

## Zadanie do wykonania

1. Dodaj trzeci przycisk przełączający klasę `compact` na `main`.
2. Zdefiniuj CSS dla `compact`, który zmniejsza padding panelu.
3. Dodaj zapamiętanie motywu w `localStorage` dopiero po wykonaniu lekcji 310.
4. Zadbaj, aby tekst przycisku i `aria-pressed` zawsze odpowiadały klasie.
5. Sprawdź kliknięcie myszą, klawiszem Enter i spacją.

## Kryteria zaliczenia

- JS nie wpisuje kolorów przez `element.style`;
- każda klasa ma jednego właściciela w CSS;
- stan wizualny i stan ARIA są zsynchronizowane;
- po odświeżeniu bez zapisu motyw wraca do jasnego.
