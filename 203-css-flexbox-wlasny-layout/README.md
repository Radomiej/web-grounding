# Ćwiczenie 203 — własny prosty layout

Otwórz `index.html`, obejrzyj stronę na szerokim i wąskim ekranie, a następnie odtwórz układ samodzielnie. Nie kopiuj całego CSS naraz: buduj kolejno nagłówek, treść, karty i stopkę.

## Czego się nauczysz

- Łączyć kilka małych kontenerów Flexbox w jeden układ strony.
- Zawijać nawigację, kolumny i karty przez `flex-wrap: wrap`.
- Dzielić wolne miejsce przez skrót `flex`, w tym proporcją 5:7.
- Rozumieć, jak `flex-grow` dzieli nadwyżkę i dlaczego `gap` jest własnością rodzica.
- Budować responsywny układ bez ustalania osobnego breakpointu dla każdej szerokości.

## HTML

| Element lub atrybut                              | Znaczenie w ćwiczeniu                                            |
| ------------------------------------------------ | ---------------------------------------------------------------- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają HTML5, język, kodowanie i prawidłową szerokość strony. |
| `<link rel="stylesheet">`                        | Dołącza `style.css`.                                             |
| `<header>`                                       | Zawiera logo i główną nawigację.                                 |
| `<nav aria-label="...">`                         | Oznacza główny obszar nawigacji i nadaje mu dostępną nazwę.      |
| `<ul>` i `<li>`                                  | Tworzą listę odnośników.                                         |
| `<main>`                                         | Obejmuje główną treść strony.                                    |
| `<section>`                                      | Grupuje listę artykułów.                                         |
| `<article>`                                      | Reprezentuje samodzielną kartę z treścią.                        |
| `<aside>`                                        | Oznacza treść uzupełniającą w panelu bocznym.                    |
| `<footer>`                                       | Zawiera końcowe informacje kontaktowe.                           |
| `id` i `href="#id"`                              | Łączą odnośnik z miejscem na tej samej stronie.                  |
| `aria-labelledby`                                | Nadaje sekcji nazwę przez istniejący nagłówek.                   |

## CSS

| Zapis                                           | Efekt                                                                      |
| ----------------------------------------------- | -------------------------------------------------------------------------- |
| `display: flex`                                 | Włącza Flexbox osobno dla nagłówka, nawigacji, treści i kart.              |
| `flex-wrap: wrap`                               | Pozwala elementom przejść do nowego wiersza, gdy brakuje miejsca.          |
| `justify-content: space-between`                | Odsuwa logo i nawigację do przeciwnych stron nagłówka.                     |
| `align-items: center`                           | Wyrównuje logo i nawigację w pionie.                                       |
| `align-items: flex-start`                       | Ustawia kolumny treści przy ich górnej krawędzi.                           |
| `gap: 1rem` / `0.75rem`                         | Tworzy odstępy między elementami bez marginesów na każdym dziecku.         |
| `flex: 2 1 30rem`                               | Artykuły rosną dwa razy szybciej, mogą się kurczyć i zaczynają od `30rem`. |
| `flex: 1 1 15rem`                               | Panel boczny rośnie, kurczy się i zaczyna od `15rem`.                      |
| `flex: 1 1 14rem`                               | Każda karta może rosnąć i zawija się, gdy nie mieści się przy `14rem`.     |
| `flex: 5 1 0` i `flex: 7 1 0`                  | Dzielą wolne miejsce w proporcji 5:7. `0` jako basis pozwala liczyć udziały po odjęciu `gap`. |
| `flex-grow: 2`                                  | Daje dziecku dwa udziały nadwyżki względem elementu z `grow: 1`; nie ustala dwóch stałych szerokości. |
| `flex-basis: 14rem`                             | Ustala szerokość startową karty; po jej przekroczeniu `wrap` może utworzyć nową linię. |
| `max-width: 72rem` i `margin: 0 auto`           | Ograniczają szerokość oraz centrują stronę.                                |
| `box-sizing: border-box`                        | Wlicza padding i obramowanie do szerokości elementu.                       |
| `padding` i `margin-block`                      | Ustawiają odstępy wewnętrzne oraz pionowy margines.                        |
| `background` i `color`                          | Ustawiają tła i kolory tekstu. `color: inherit` przejmuje kolor rodzica.   |
| `font-size` i `font-weight`                     | Powiększają oraz pogrubiają logo.                                          |
| `list-style: none`                              | Usuwa punktory z nawigacji.                                                |
| `display: inline-flex`, `align-items: center`   | Pozwalają wyśrodkować tekst w powiększonym obszarze odnośnika.             |
| `min-height: 2.75rem`, `padding-inline: 0.5rem` | Zapewniają odnośnikom wysokość co najmniej `44px` i poziomy odstęp.        |
| `border` i `border-radius`                      | Dodają ramkę i zaokrąglone rogi.                                           |
| `text-align: center`                            | Centruje tekst stopki.                                                     |
| `:focus-visible`, `outline`, `outline-offset`   | Zapewniają widoczny fokus klawiatury.                                      |

## JavaScript

Nie jest używany. Responsywność wynika z `flex-wrap`, wartości bazowych i dostępnej szerokości.

## Biblioteki

Brak bibliotek. Wszystkie elementy korzystają z natywnego HTML i CSS.

## Zadanie do wykonania

1. Usuń reguły Flexbox z kopii `style.css`.
2. Odtwórz poziomy nagłówek z zawijającą się nawigacją.
3. Ułóż sekcję artykułów obok panelu bocznego w proporcji około `2:1`.
4. Ułóż dwie karty i sprawdź, kiedy przechodzą do osobnych wierszy.
5. Dodaj trzecią kartę bez zmieniania HTML pozostałych kart.
6. Dodaj stopkę z dwiema grupami linków i sprawdź widok przy 390 px.
7. Przepisz do osobnego pliku proporcję `5:7` z sekcji „Trzy przepisy” i zmień ją na `7:5`.
8. Ustaw `flex-grow: 2` tylko na jednej karcie, a potem dodaj `flex-basis: 14rem` i włącz `wrap`.

## Wymagania wstępne i progresja

Najpierw [202 — sandbox](../202-css-flexbox-sandbox/README.md), potem [204 — rozwinięcie](../204-css-flexbox-wiecej-mozliwosci/README.md).

## Krok po kroku — zagnieżdżanie

1. W generatorze 202 ustaw dwie kolumny i pobierz layout.html.
2. Własny HTML podziel na header, main i footer.
3. W main utwórz sekcję artykułów oraz aside. To bezpośrednie dzieci jednego Flexboxa.
4. W artykułach dodaj osobny kontener kart z display:flex i flex-wrap:wrap. Ten rodzic ma własne osie, niezależne od main.
5. Kartę ustaw jako flex-direction:column. Jej przycisk może otrzymać margin-top:auto.
6. Zwęż okno, dodaj trzecią kartę i długi nagłówek.

## Dlaczego dzieci nie słuchają dziadka?

Flexbox działa na bezpośrednie dzieci. Zmiana justify-content na main nie centruje tekstu wewnątrz karty. Każdy zagnieżdżony kontener ustala własne main/cross axis.

## Sprawdź się

- [ ] Wskazuję rodzica każdego flex-item.
- [ ] Układ zawija się przy 390px.
- [ ] Potrafię zmienić kartę na kolumnę bez zmiany kierunku main.

## Nawigacja między lekcjami

.site-header nav a ogranicza biały kolor linków do ciemnego nagłówka. Nawigacja kursu pod stroną używa zwykłego niebieskiego koloru, display:inline-flex, align-items:center i min-height:44px. Nie używaj globalnego nav a z białym kolorem przy jasnym tle.
