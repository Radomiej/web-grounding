# Ćwiczenie 07 — sandbox Flexbox

Otwórz `index.html`. Zmieniaj opcje myszą albo klawiaturą (`Tab`, strzałki i spacja), a następnie obserwuj podgląd. Sandbox działa bez JavaScriptu.

## Czego się nauczysz

- Kontener otrzymuje `display: flex`, a jego dzieci stają się elementami Flexbox.
- `flex-direction` wyznacza oś główną. Oś poprzeczna zawsze jest do niej prostopadła.
- `justify-content` układa elementy na osi głównej, a `align-items` na osi poprzecznej.
- `gap` tworzy odstępy między elementami.
- `flex-grow` pozwala elementowi zająć wolne miejsce.

## HTML

| Element lub atrybut | Znaczenie w ćwiczeniu |
| --- | --- |
| `<!doctype html>` | Włącza współczesny tryb HTML5. |
| `<html lang="pl">` | Określa język dokumentu. |
| `<meta charset="UTF-8">` | Pozwala poprawnie wyświetlać polskie znaki. |
| `<meta name="viewport" ...>` | Dopasowuje stronę do szerokości urządzenia. |
| `<link rel="stylesheet" href="style.css">` | Dołącza lokalny arkusz CSS. |
| `<header>`, `<main>`, `<section>` | Dzielą stronę na semantyczne obszary. |
| `<form>` | Grupuje kontrolki sandboxa; niczego nie wysyła. |
| `<fieldset>` i `<legend>` | Łączą opcje dotyczące jednego ustawienia. |
| `<label>` | Daje kontrolce czytelną, klikalną nazwę. |
| `<input type="radio">` | Pozwala wybrać dokładnie jedną wartość w grupie o tej samej nazwie. |
| `<input type="checkbox">` | Włącza lub wyłącza pojedynczą opcję. |
| `checked` | Ustawia wartość początkową kontrolki. |
| `<button type="reset">` | Przywraca początkowe wartości formularza. |
| `<code>` | Oznacza zapis kodu. |
| `aria-label` i `aria-labelledby` | Nadają obszarom dostępne nazwy. |

## CSS

Każda nowa właściwość Flexbox:

| Zapis | Efekt |
| --- | --- |
| `display: flex` | Uruchamia Flexbox na kontenerze `.sandbox`. |
| `flex-direction: row` | Ustawia oś główną poziomo. |
| `flex-direction: column` | Ustawia oś główną pionowo. |
| `justify-content: flex-start` | Przesuwa elementy na początek osi głównej. |
| `justify-content: center` | Ustawia elementy na środku osi głównej. |
| `justify-content: space-between` | Rozdziela wolne miejsce pomiędzy elementy. |
| `align-items: stretch` | Rozciąga elementy na osi poprzecznej, jeśli nie mają ustalonego rozmiaru w tej osi. |
| `align-items: center` | Ustawia elementy na środku osi poprzecznej. |
| `align-items: flex-end` | Ustawia elementy na końcu osi poprzecznej. |
| `gap: 0.5rem` / `1.5rem` | Ustawia mały lub duży odstęp pomiędzy elementami. |
| `flex-basis: 6rem` | Podaje początkowy rozmiar elementu na osi głównej. |
| `flex-grow: 0` | Element nie zajmuje dodatkowego wolnego miejsca. |
| `flex-grow: 1` | Element może zająć dostępne wolne miejsce. |

Pozostałe zapisy CSS:

| Zapis | Efekt |
| --- | --- |
| `font-family: system-ui, sans-serif` | Używa systemowej czcionki z bezpiecznym zamiennikiem. |
| `line-height: 1.5` | Ustawia odstęp między liniami na półtorej wysokości pisma. |
| `color` / `background` | Ustawiają kolor tekstu i tła. |
| `box-sizing: border-box` | Wlicza padding i obramowanie do rozmiaru elementu. |
| `margin: 0`, `margin: 0 auto`, `margin-block`, `margin-top` | Usuwają, centrują albo dodają marginesy. |
| `padding`, `padding-block`, `padding-inline` | Ustawiają odstęp wewnątrz elementu. |
| `max-width`, `min-width`, `min-height` | Ograniczają lub gwarantują rozmiar. |
| `display: grid`, `grid-template-columns`, `place-items` | Budują siatkę kontrolek i centrują liczbę w kafelku. |
| `display: flex`, `align-items: center`, `gap: 0.5rem` na `label` | Powiększają klikalny wiersz i wyrównują kontrolkę z tekstem. |
| `min-height: 2.75rem` na `label` | Zapewnia etykiecie cel dotykowy o wysokości co najmniej `44px`. |
| `cursor: pointer` | Pokazuje, że cały wiersz etykiety można kliknąć. |
| `border`, `border-radius` | Dodają obramowanie i zaokrąglenie. |
| `font`, `font-size`, `font-weight` | Ustawiają zapis czcionki, rozmiar i grubość. |
| `accent-color` | Zmienia kolor natywnych kontrolek formularza. |
| `width: 1.75rem`, `height: 1.75rem` | Ustawiają samą kontrolkę na około `28×28px`; większa etykieta pozostaje klikalnym obszarem. |
| `:has(#id:checked)` | Wybiera `body`, gdy wskazana kontrolka jest zaznaczona. Dzięki temu CSS reaguje bez JS. |
| `:focus-visible` | Pokazuje obramowanie podczas obsługi klawiaturą. |
| `@media (max-width: 30rem)` | Zmniejsza minimalną wysokość podglądu na wąskim ekranie. |

## JavaScript

Nie jest używany. Klikalne ustawienia działają przez kontrolki HTML oraz selektor CSS `:has()`.

## Biblioteki

Brak bibliotek i zewnętrznych plików. Ćwiczenie używa tylko HTML i CSS przeglądarki.

## Zadanie

Ustaw `column`, wyśrodkuj elementy na obu osiach, zwiększ `gap` i pozwól drugiemu elementowi rosnąć. Następnie spróbuj przewidzieć wynik przed każdą zmianą.
