# Ćwiczenie 09 — więcej możliwości Flexbox

Otwórz `index.html` i zmieniaj szerokość okna. Zwróć uwagę na rozmiar kart, pozycję przycisków oraz różnicę między kolejnością w HTML i kolejnością wizualną.

## Czego się nauczysz

- Tworzyć wiele wierszy przez `flex-wrap`.
- Kontrolować początkowy rozmiar, rośnięcie i kurczenie elementu.
- Wyrównać pojedynczy element przez `align-self`.
- Przesunąć przycisk na dół karty za pomocą automatycznego marginesu.
- Rozumieć ograniczenia dostępności właściwości `order`.

## HTML

| Element lub atrybut | Znaczenie w ćwiczeniu |
| --- | --- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają dokument HTML5, język, kodowanie i responsywną szerokość. |
| `<link>` | Dołącza lokalny `style.css`. |
| `<header>`, `<main>`, `<section>` | Budują semantyczne części strony. |
| `<article>` | Oznacza niezależną kartę kursu. |
| `<span>` | Obejmuje krótki znacznik kategorii bez tworzenia nowej sekcji. |
| `<ol>` i `<li>` | Pokazują kolejność treści zapisaną w HTML. |
| `<strong>` | Oznacza ważne ostrzeżenie. |
| `class` | Pozwala przypisać wspólne lub wariantowe reguły CSS. |
| `aria-labelledby` | Łączy sekcję z opisującym ją nagłówkiem. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `display: flex` | Włącza Flexbox dla listy kart, każdej karty i demonstracji kolejności. |
| `flex-wrap: wrap` | Pozwala kartom oraz elementom listy przechodzić do kolejnych wierszy. |
| `align-content: flex-start` | Ustawia wszystkie wiersze przy początku osi poprzecznej; działa dopiero przy wielu wierszach i wolnym miejscu. |
| `flex-grow: 1` | Zwykłe karty dzielą wolne miejsce. |
| `flex-grow: 2` | Polecana karta otrzymuje większy udział wolnego miejsca. |
| `flex-shrink: 1` | Karta może się skurczyć, zanim przejdzie do następnego wiersza. |
| `flex-basis: 14rem` | Karta zaczyna obliczenia rozmiaru od `14rem`. |
| `flex: 1 1 100%` | Skrót kolejno dla `grow`, `shrink` i `basis`; podsumowanie zajmuje cały wiersz. |
| `flex-direction: column` | Układa treść każdej karty pionowo. |
| `align-self: flex-start` | Etykieta i przycisk zachowują szerokość treści zamiast rozciągać się. |
| `margin-top: auto` | Zużywa wolne miejsce nad przyciskiem i przesuwa go na dół karty. |
| `order: -1` | Pokazuje drugi element przed elementami z domyślnym `order: 0`, ale tylko wizualnie. |
| `gap: 1rem` / `0.75rem` | Ustawia odstępy między kartami albo pozycjami listy. |
| `min-height: 24rem` | Zapewnia wolne miejsce potrzebne do zobaczenia `align-content`. |
| `box-sizing`, `max-width`, `margin`, `padding` | Kontrolują model pudełkowy, szerokość i odstępy. |
| `border`, `border-left`, `border-color`, `border-radius` | Rysują i modyfikują obramowania. |
| `background` i `color` | Ustawiają tła oraz kolory tekstu. |
| `font-family`, `line-height`, `font-weight` | Ustawiają rodzinę pisma, interlinię i pogrubienie. |
| `padding-left` | Zostawia miejsce na numery listy uporządkowanej. |
| `:nth-child(2)` | Wybiera drugi element listy. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazują czytelny fokus klawiatury. |

## JavaScript

Nie jest używany.

## Biblioteki

Brak bibliotek. To natywny HTML i CSS.

## Zadanie

1. Ustaw wszystkim kartom `flex-grow: 0` i porównaj wynik.
2. Zmień `flex-basis` na `20rem` oraz `10rem`.
3. Usuń `margin-top: auto` z przycisku i wyjaśnij zmianę.
4. Przywróć poprawną kolejność wizualną, usuwając `order`. To jest zalecany wynik końcowy dla treści, której kolejność ma znaczenie.
