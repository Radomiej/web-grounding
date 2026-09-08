# Ćwiczenie 09 — więcej możliwości Flexbox

Otwórz `index.html` i zmieniaj szerokość okna. Zwróć uwagę na rozmiar kart, pozycję przycisków oraz różnicę między kolejnością w HTML i kolejnością wizualną.

## Czego się nauczysz

- Tworzyć wiele wierszy przez `flex-wrap`.
- Kontrolować początkowy rozmiar, rośnięcie i kurczenie elementu.
- Wyrównać pojedynczy element przez `align-self`.
- Przesunąć przycisk na dół karty za pomocą automatycznego marginesu.
- Rozumieć ograniczenia dostępności właściwości `order`.

## HTML

| Element lub atrybut                              | Znaczenie w ćwiczeniu                                               |
| ------------------------------------------------ | ------------------------------------------------------------------- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają dokument HTML5, język, kodowanie i responsywną szerokość. |
| `<link>`                                         | Dołącza lokalny `style.css`.                                        |
| `<header>`, `<main>`, `<section>`                | Budują semantyczne części strony.                                   |
| `<article>`                                      | Oznacza niezależną kartę kursu.                                     |
| `<span>`                                         | Obejmuje krótki znacznik kategorii bez tworzenia nowej sekcji.      |
| `<ol>` i `<li>`                                  | Pokazują kolejność treści zapisaną w HTML.                          |
| `<strong>`                                       | Oznacza ważne ostrzeżenie.                                          |
| `class`                                          | Pozwala przypisać wspólne lub wariantowe reguły CSS.                |
| `aria-labelledby`                                | Łączy sekcję z opisującym ją nagłówkiem.                            |

## CSS

| Zapis                                                    | Efekt                                                                                                          |
| -------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `display: flex`                                          | Włącza Flexbox dla listy kart, każdej karty i demonstracji kolejności.                                         |
| `flex-wrap: wrap`                                        | Pozwala kartom oraz elementom listy przechodzić do kolejnych wierszy.                                          |
| `align-content: flex-start`                              | Ustawia wszystkie wiersze przy początku osi poprzecznej; działa dopiero przy wielu wierszach i wolnym miejscu. |
| `flex-grow: 1`                                           | Zwykłe karty dzielą wolne miejsce.                                                                             |
| `flex-grow: 2`                                           | Polecana karta otrzymuje większy udział wolnego miejsca.                                                       |
| `flex-shrink: 1`                                         | Karta może się skurczyć, zanim przejdzie do następnego wiersza.                                                |
| `flex-basis: 14rem`                                      | Karta zaczyna obliczenia rozmiaru od `14rem`.                                                                  |
| `flex: 1 1 100%`                                         | Skrót kolejno dla `grow`, `shrink` i `basis`; podsumowanie zajmuje cały wiersz.                                |
| `flex-direction: column`                                 | Układa treść każdej karty pionowo.                                                                             |
| `align-self: flex-start`                                 | Etykieta i przycisk zachowują szerokość treści zamiast rozciągać się.                                          |
| `margin-top: auto`                                       | Zużywa wolne miejsce nad przyciskiem i przesuwa go na dół karty.                                               |
| `order: -1`                                              | Pokazuje drugi element przed elementami z domyślnym `order: 0`, ale tylko wizualnie.                           |
| `gap: 1rem` / `0.75rem`                                  | Ustawia odstępy między kartami albo pozycjami listy.                                                           |
| `min-height: 24rem`                                      | Zapewnia wolne miejsce potrzebne do zobaczenia `align-content`.                                                |
| `box-sizing`, `max-width`, `margin`, `padding`           | Kontrolują model pudełkowy, szerokość i odstępy.                                                               |
| `border`, `border-left`, `border-color`, `border-radius` | Rysują i modyfikują obramowania.                                                                               |
| `background` i `color`                                   | Ustawiają tła oraz kolory tekstu.                                                                              |
| `font-family`, `line-height`, `font-weight`              | Ustawiają rodzinę pisma, interlinię i pogrubienie.                                                             |
| `padding-left`                                           | Wartość 0 usuwa wcięcie; numery są wewnątrz kafelków.                                                               |
| `:nth-child(2)`                                          | Wybiera drugi element listy.                                                                                   |
| `:focus-visible`, `outline`, `outline-offset`            | Pokazują czytelny fokus klawiatury.                                                                            |

## JavaScript

Nie jest używany.

## Biblioteki

Brak bibliotek. To natywny HTML i CSS.

## Zadanie

1. Ustaw wszystkim kartom `flex-grow: 0` i porównaj wynik.
2. Zmień `flex-basis` na `20rem` oraz `10rem`.
3. Usuń `margin-top: auto` z przycisku i wyjaśnij zmianę.
4. Przywróć poprawną kolejność wizualną, usuwając `order`. To jest zalecany wynik końcowy dla treści, której kolejność ma znaczenie.

## Wymagania wstępne i progresja

Wykonaj [08](../08-flexbox-wlasny-layout/README.md). Dalej: [10 — JavaScript](../10-javascript-podstawy/README.md).

## Krok po kroku — co się przesuwa?

1. W każdym z trzech paneli A+B jest pierwszą linią, C+D drugą. To cztery bezpośrednie dzieci jednego kontenera z row i wrap.
2. A i C mają 48px wysokości, B i D 88px. Wyższe dziecko wyznacza wysokość linii.
3. Panel 1: align-items:flex-start i align-content:flex-start. Dzieci i obie linie zaczynają się u góry.
4. Panel 2: zmieniono tylko align-items na center. A i C przesuwają się o (88−48)/2 = 20px w dół. B, D i pozycje linii nie zmieniają się.
5. Panel 3: zmieniono tylko align-content na space-between. Pierwsza linia zostaje u góry, cała druga linia trafia na dół. A i C nadal są wyśrodkowane w swoich liniach.
6. Rozwiń wspólny HTML/CSS i odtwórz przykład. Zmień nowrap: align-content straci efekt. Zmień wszystkie wysokości na 88px: efekt align-items będzie trudniej zauważyć.

Sekcja order wyżej dotyczy osobnego zagadnienia: wizualnej kolejności. Mniejsze order oznacza wcześniejsze miejsce; nie zmienia to DOM ani kolejności czytania.

## Dodatkowy HTML i CSS

article grupuje jeden stan porównania. pre/code zachowują zapis CSS. details/summary to rozwijane objaśnienie działające klawiaturą bez JS. aria-labelledby wiąże sekcję z nagłówkiem; link #alignment-title prowadzi bezpośrednio do tego wyjaśnienia.

| Zapis                                                                | Znaczenie                                                                                                                |
| -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| .alignment-comparison: flex, wrap, gap:1rem                          | Trzy panele obok siebie, a na telefonie jeden pod drugim.                                                                |
| .alignment-example: flex:1 1 18rem; min-width:0                      | Panele dzielą miejsce i mogą się zawijać; padding:1rem, białe tło i border:1px solid #94a3b8 oddzielają przykłady.       |
| height:260px; padding:12px; border:2px solid #64748b                 | Jednakowa widoczna ramka każdego kontenera. border-box daje 232px miejsca wewnątrz.                                      |
| flex-direction:row; flex-wrap:wrap; gap:12px                         | Układa dzieci w dwa wiersze z odstępem 12px.                                                                             |
| flex:0 0 calc(50% - 6px)                                             | Dwie połówki pomniejszone o połowę gap: dokładnie dwa dzieci mieszczą się w każdej linii. Nie rosną ani nie kurczą się.  |
| .short height:48px / .tall height:88px                               | Celowo różne wysokości, aby było widać align-items.                                                                      |
| align-items:flex-start → center                                      | Pozycja dziecka wewnątrz linii.                                                                                          |
| align-content:flex-start → space-between                             | Rozmieszczenie całych linii. W trzecim panelu odległość między nimi rośnie z 12px do 56px.                               |
| .demo-child display:flex; align-items:center; justify-content:center | Osobny, zagnieżdżony Flexbox centruje napis wewnątrz kafelka; nie ustawia pozycji kafelka w rodzicu.                     |
| .first-line background:#dbeafe; border:2px solid #1d4ed8             | Niebieskie A/B: pierwsza linia.                                                                                          |
| .second-line background:#ffedd5; border-color:#9a3412                | Pomarańczowe C/D: druga linia, rozpoznawalna także po literach.                                                          |
| font-size:0.875rem; font-weight:700                                  | Mniejszy, pogrubiony podpis w kafelku.                                                                                   |
| pre white-space:pre-wrap; overflow-wrap:anywhere                     | Kod zachowuje nowe linie i zawija się na telefonie; padding:0.75rem, tło #f1f5f9 i lewa ramka 3px #64748b wyróżniają go. |
| .alignment-example h3 min-height:4rem; line-height:1.4                                | Rezerwuje miejsce na tytuł porównania.                                                                                   |
| summary cursor:pointer; padding-block:0.75rem                        | Czytelna i wygodna kontrolka rozwijania kodu.                                                                            |
| .visual-order-demo list-style-position:inside; padding-left:0        | Numery pozostają wewnątrz swoich kafelków po zmianie order, nie nachodzą na sąsiadów.                                    |

.card ma min-width:0 i overflow-wrap:anywhere: domyślne min-width:auto potrafi zachować szerokość treści mimo shrink:1. Sam shrink nie usuwa paddingu ani ramki. .alignment-lesson margin-block:2rem oddziela nowy temat od poprzedniego.

## Sprawdź się

- [ ] Wyjaśniam różnicę align-items i align-content.
- [ ] Potrafię rozwinąć skrót flex.
- [ ] Nie używam order do poprawiania źle ułożonego HTML.
