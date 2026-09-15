# Ćwiczenie 102 — tekst, listy i grupowanie HTML

To nadal czysty HTML: nie ma tu CSS ani JavaScriptu. Uczysz się dobierać element
do znaczenia treści, zanim zaczniesz układać wygląd.

## Czego się nauczysz

- budować akapity i hierarchię `h2`/`h3`;
- rozróżniać `strong`, `em`, `small`, `code` i `blockquote`;
- tworzyć `ul`, `ol`, `dl`, `dt` i `dd`;
- rozumieć różnicę między neutralnym `div` i krótkim `span`;
- dodawać datę przez `time` i nie używać `br` jako odstępu.

## HTML

| Element lub atrybut | Co pokazuje przykład |
| --- | --- |
| `article` | Samodzielny blok treści, który można czytać niezależnie. |
| `p` | Akapit; przeglądarka nadaje mu domyślny odstęp. |
| `strong`, `em` | Ważność i nacisk, a nie tylko pogrubienie lub kursywa. |
| `small` | Drugorzędna informacja, np. datę aktualizacji. |
| `code` | Fragment składni programu. |
| `div` | Neutralna grupa blokowa, gdy nie ma lepszego elementu semantycznego. |
| `span` | Neutralna grupa wewnątrz tekstu. |
| `ul` / `ol` / `li` | Lista nieuporządkowana, uporządkowana i jej element. |
| `dl` / `dt` / `dd` | Lista pojęć i ich opisów. |
| `blockquote` | Cytowany fragment treści. |
| `time datetime` | Data czytelna dla człowieka i maszyny. |
| `id`, `aria-labelledby` | Nazwanie sekcji i powiązanie jej z nagłówkiem. |

## CSS

Brak CSS. Domyślny wygląd pozwala zobaczyć, które elementy są blokami, a które
pozostają w tekście.

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek i zewnętrznych zależności.

## Zadanie do wykonania

Przerób przykład na stronę „Moje hobby”:

1. zamień tytuł i treść artykułu na własny temat;
2. dodaj listę uporządkowaną z minimum czterema krokami;
3. dodaj listę definicji z trzema pojęciami;
4. użyj `strong`, `em`, `time` i jednego `blockquote` w sensownym miejscu;
5. użyj `div` tylko do grupowania dwóch akapitów, a nie do zastępowania nagłówków.

## Kryteria zaliczenia

- jest dokładnie jeden `h1`, a nagłówki niższych poziomów nie przeskakują;
- listy mają poprawne dzieci `li`, a `dl` ma pary `dt`/`dd`;
- data ma prawidłowe `datetime`;
- strona działa bez CSS i JavaScriptu.
