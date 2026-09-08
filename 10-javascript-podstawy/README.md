# Ćwiczenie 10 — podstawy JavaScript

Otwórz `index.html`, włącz narzędzia deweloperskie klawiszem `F12` i obserwuj kartę Console. Zmieniaj dane w `app.js`, zapisuj plik i odświeżaj stronę.

## Czego się nauczysz

- Dołączać skrypt JavaScript do HTML.
- Zapisywać tekst, liczby, wartość logiczną, tablicę i obiekt.
- Rozróżniać `const` oraz `let`.
- Tworzyć funkcję, pętlę i warunek.
- Wyświetlać wynik w konsoli przeglądarki.

## HTML

| Element lub atrybut | Znaczenie w ćwiczeniu |
| --- | --- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają HTML5, język, kodowanie i responsywną szerokość. |
| `<link rel="stylesheet">` | Dołącza lokalny CSS. |
| `<script src="app.js" defer>` | Pobiera skrypt, ale wykonuje go dopiero po odczytaniu HTML. |
| `<header>`, `<main>`, `<section>` | Organizują główne części dokumentu. |
| `<ol>` i `<li>` | Tworzą uporządkowaną instrukcję. |
| `<kbd>` | Oznacza klawisz lub skrót klawiaturowy. |
| `<strong>` | Wskazuje ważny fragment tekstu. |
| `<dl>`, `<dt>`, `<dd>` | Tworzą listę nazw i odpowiadających im wartości. |
| `aria-labelledby` | Nadaje sekcji nazwę przez identyfikator nagłówka. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `font-family: system-ui, sans-serif` | Używa czytelnej czcionki systemowej. |
| `line-height: 1.6` | Zwiększa odstęp pomiędzy wierszami. |
| `color` i `background` | Ustawiają kolory tekstu oraz tła. |
| `max-width: 56rem` | Ogranicza długość wiersza. |
| `margin: 0 auto` | Centruje stronę w poziomie. |
| `margin-block: 1rem` / `margin-bottom: 0.5rem` | Dodają pionowe marginesy. |
| `padding` | Dodaje odstęp wewnątrz strony, sekcji i symbolu klawisza. |
| `border` i `border-radius` | Rysują ramki oraz zaokrąglają rogi. |
| `font-weight: 700` | Pogrubia nazwy danych. |

## JavaScript

| Zapis | Znaczenie |
| --- | --- |
| `'use strict'` | Włącza bardziej rygorystyczne sprawdzanie częstych błędów. |
| `const` | Tworzy nazwę, której nie przypiszemy później do innej wartości. Zawartość obiektu lub tablicy nadal może się zmieniać. |
| `let` | Tworzy zmienną, której wartość może zostać zmieniona, jak `total`. |
| `'Ola'` | Literał tekstowy typu `string`. |
| `3.5` | Literał liczbowy typu `number`. |
| `[4, 5, 3, 4]` | Tablica przechowująca wiele wartości w kolejności. |
| `{ name: ..., points: ... }` | Obiekt grupujący nazwane właściwości. |
| `student.points` | Odczytuje właściwość obiektu przez kropkę. |
| `function calculateAverage(values)` | Deklaruje funkcję z parametrem `values`. |
| `for (const value of values)` | Wykonuje blok raz dla każdego elementu tablicy. |
| `total += value` | Dodaje `value` do `total` i zapisuje wynik. |
| `values.length` | Zwraca liczbę elementów tablicy. |
| `condition ? a : b` | Operator warunkowy zwraca `a` albo `b`. |
| `return` | Kończy funkcję i oddaje wynik. |
| `>=` | Sprawdza, czy lewa wartość jest większa lub równa prawej. |
| `` `tekst ${value}` `` | Template literal wstawia wartość do tekstu. |
| `average.toFixed(2)` | Formatuje liczbę do dwóch miejsc po przecinku i zwraca tekst. |
| `if (...) { ... } else { ... }` | Wykonuje jeden z dwóch bloków zależnie od warunku. |
| `console.log(...)` | Wyświetla wartość w konsoli przeglądarki. |

## Biblioteki

Brak bibliotek. Kod korzysta wyłącznie ze standardowego JavaScriptu przeglądarki.

## Zadanie

1. Zmień imię i punkty ucznia.
2. Dodaj pustą tablicę punktów i sprawdź zabezpieczenie przed dzieleniem przez zero.
3. Zmień próg zaliczenia.
4. Dodaj funkcję zwracającą najwyższą ocenę bez używania dodatkowej biblioteki.
