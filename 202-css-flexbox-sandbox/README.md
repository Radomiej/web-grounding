# 202 — Flexbox: laboratorium i generator

## Czego się nauczysz

Rozpoznawać osie, odróżniać rodzica od dzieci, rozumieć zawijanie i brak wolnej przestrzeni, generować własny HTML/CSS.

## Wymagania wstępne

HTML (101–102). Otwórz index.html. Sandbox jest narzędziem do nauki CSS; znajomość jego JS nie jest wymagana. Po lekcji 308 możesz wrócić i przeanalizować implementację.

## Osie: main axis i cross axis

**Main axis** to oś główna ustalana przez flex-direction. **Cross axis** to prostopadła oś poprzeczna, czasem nazywana secondary axis. Nie zapamiętuj „justify = poziom”: przy column justify działa pionowo.

| Kierunek       | Oś główna | Oś poprzeczna przy zwykłym wrap |
| -------------- | --------- | ------------------------------- |
| row            | →         | ↓                               |
| row-reverse    | ←         | ↓                               |
| column         | ↓         | →                               |
| column-reverse | ↑         | →                               |

Model dotyczy poziomego pisma LTR. wrap-reverse odwraca początek i koniec osi poprzecznej; nie odwraca DOM. Strzałki nad podglądem zawsze wskazują kierunek od start do end.

## CSS

| Właściwość / wartości                                            | Wyjaśnienie                                                                                                                                        |
| ---------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| display: flex                                                    | Bezpośrednie dzieci kontenera uczestniczą w układzie Flexbox. Wnuk nie staje się automatycznie jego flex-item.                                     |
| flex-direction: row / row-reverse / column / column-reverse      | Wiersz / odwrócony wiersz / kolumna / odwrócona kolumna.                                                                                           |
| flex-wrap: nowrap / wrap / wrap-reverse                          | Jedna linia / kolejne linie / linie w przeciwnym kierunku osi poprzecznej. Dla column potrzebna jest ograniczona wysokość.                         |
| justify-content: flex-start / flex-end / center                  | Dzieci przy początku / końcu / środku osi głównej.                                                                                                 |
| justify-content: space-between                                   | Wolne miejsce tylko między dziećmi, bez dodatkowej przestrzeni na krawędziach.                                                                     |
| justify-content: space-around                                    | Każde dziecko otrzymuje przestrzeń po obu stronach; krawędź ma połowę odstępu między dziećmi.                                                      |
| justify-content: space-evenly                                    | Równe odstępy między dziećmi oraz przy krawędziach.                                                                                                |
| align-items: stretch / flex-start / flex-end / center / baseline | Rozciągnięcie rozmiaru auto / początek / koniec / środek / wyrównanie bazowych linii tekstu wewnątrz linii Flexbox.                                |
| align-content                                                    | Te same nazwy pozycji dotyczą całych linii: stretch powiększa linie, pozostałe wartości rozdzielają przestrzeń między nimi. W nowrap nie działa.   |
| row-gap / column-gap: 0–80px                                     | Odstęp między wierszami / kolumnami. Przy row pierwszy rozdziela linie, drugi dzieci w linii; przy column role względem main/cross zamieniają się. |
| width: 160–1200px / height: 100–800px                            | Kontrolowane rozmiary kontenera; px oznacza piksel CSS.                                                                                            |
| flex-grow: 0–10                                                  | Proporcja udziału w dodatniej wolnej przestrzeni. 0 nie rośnie. 2 nie oznacza zawsze dwa razy szerszego dziecka: dzielona jest nadwyżka.           |
| flex-shrink: 0–10                                                | Współczynnik kurczenia przy niedoborze miejsca, ważony przez bazowy rozmiar. 0 zabrania kurczenia.                                                 |
| flex-basis: 0–600px                                              | Rozmiar bazowy w osi głównej przed podziałem nadwyżki lub niedoboru.                                                                               |
| align-self: auto                                                 | Dziedziczy wyrównanie rodzica; pozostałe opcje jak align-items nadpisują je dla jednego dziecka.                                                   |
| order: -10–10                                                    | Mniejsze wartości pokazują się wcześniej. Nie zmienia kolejności DOM ani czytania.                                                                 |
| min-width/min-height: 0                                          | Pozwala dzieciom zmniejszyć się poniżej domyślnego ograniczenia treścią.                                                                           |
| overflow-wrap: anywhere                                          | Pozwala złamać długi tekst; przy zbyt małym rozmiarze nadal może zabraknąć miejsca.                                                                |
| overflow: auto                                                   | Przewijanie tylko podglądu/eksportu przy zbyt dużym układzie.                                                                                      |

Pełne pozostałe właściwości: [wspólny słownik CSS](../docs/css-lekcji.md). .workbench używa flex-wrap i flex: 1 1 22rem, więc panele ustawień zawijają się. .axes używa flex i gap; niebieski #125d88 wskazuje oś główną, brązowy #963900 poprzeczną. textarea ma width:100% i font-family:ui-monospace,monospace dla kodu. Podgląd ma padding:16px i border:2px, więc przy border-box zawartość jest o 36px mniejsza w każdej osi.

## Dlaczego ustawienie „nie działa”?

- justify-content potrzebuje wolnego miejsca po obliczeniu rozmiarów dzieci i gap. grow może je w całości zużyć.
- align-content dotyczy kontenera z zawijaniem i ułożenia linii. Zmiany pozycji wymagają wolnej przestrzeni poprzecznej. Nie myl go z align-items.
- stretch działa przy automatycznym rozmiarze poprzecznym. Własne stałe height dla row albo width dla column może go blokować.
- shrink:1 nie gwarantuje zmieszczenia dowolnej treści: padding, border i minimalne rozmiary też zajmują miejsce.

## Krok po kroku

1. Reset: cztery dzieci i row. Nazwij obie osie.
2. Ustaw justify center i align center; zmień column.
3. Włącz wrap, dodaj dzieci, zmniejsz wymiar osi głównej.
4. Porównaj space-between z gap:20px.
5. Ustaw grow:1 na jednym dziecku i zaobserwuj pozostałe wolne miejsce.
6. Zmniejsz kontener, ustaw shrink:0, następnie 1.
7. Wybierz preset, zmodyfikuj go i pobierz layout.html.

## HTML

Poza [standardową budową strony](../301-javascript-podstawy/README.md#html), select/option wybiera wartości, input type=number z min/max ogranicza zakres, maxlength ogranicza tekst. fieldset disabled wyłącza edycję, gdy brak dzieci; legend nazywa tę grupę. textarea readonly pokazuje eksport bez edycji, rows=14 ustala wysokość, spellcheck=false wyłącza korektę. tabindex=0 pozwala przewijać podgląd klawiaturą; role=region i aria-label nadają mu nazwę. role=status ogłasza liczbę dzieci i wynik eksportu.

## JavaScript

| Zapis                                                 | Znaczenie                                                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| const, let, function, if, for...of                    | Dane, funkcje i sterowanie; progresja w lekcjach 301–308.                                                           |
| {...defaults}, Object.keys                            | Kopia płytka ustawień / tablica kluczy obiektu.                                                                     |
| find, filter, map, reduce, some, includes             | Wybór jednego dziecka, filtrowanie, transformacja, suma, sprawdzenie dowolnego dziecka i przynależności.            |
| checkValidity(), Number()                             | Sprawdzenie ograniczeń pola i konwersja na liczbę.                                                                  |
| style.cssText                                         | Ustawia CSS z kontrolowanych wartości; tekst użytkownika trafia wyłącznie do textContent lub zakodowanego eksportu. |
| replaceChildren, createElement, append                | Odtwarzają dzieci podglądu i opcje wyboru.                                                                          |
| replaceAll                                            | Koduje &, <, > i cudzysłowy przed wstawieniem tekstu do eksportowanego HTML.                                        |
| async/await, try/catch, navigator.clipboard.writeText | Kopiuje asynchronicznie; przy braku dostępu select() zaznacza kod do ręcznego kopiowania.                           |
| Blob, URL.createObjectURL, download, click()          | Tworzą lokalny plik do pobrania.                                                                                    |
| setTimeout, URL.revokeObjectURL                       | Zwalniają tymczasowy adres pliku po rozpoczęciu pobierania.                                                         |

Przepływ: kontrolka → sprawdzone ustawienie → render podglądu + objaśnienia + eksport. Wszystkie trzy wyniki czytają ten sam stan. Generator obsługuje jeden kontener, 0–20 dzieci; zagnieżdżenia zbudujesz ręcznie w lekcji 203.

## Biblioteki

Brak. Natywne HTML/CSS/JS. Pobieranie działa offline; schowek może wymagać localhost/HTTPS, dlatego jest ręczny fallback.

## Zadanie do wykonania

1. Zacznij od pustego kontenera i dodaj minimum sześć dzieci.
2. Włącz `wrap`, zmień wysokość rodzica i porównaj `align-items` z `align-content`.
3. Ustaw różne `flex-grow`, `flex-basis` i `align-self` dla trzech dzieci.
4. Wybierz rodzica i dziecko, skopiuj oba wygenerowane fragmenty CSS do nowego pliku.
5. Dodaj ręcznie zagnieżdżony kontener i wyjaśnij, która reguła należy do którego rodzica.

## Kryteria zaliczenia

- potrafisz wskazać oś główną i poprzeczną po zmianie `flex-direction`;
- widzisz, że `align-items` ustawia dzieci w linii, a `align-content` całe linie;
- wygenerowany CSS odtwarza układ bez narzędzia;
- kod można skopiować klawiaturą albo ręcznie, także bez dostępu do schowka.

## Sprawdź się

- [ ] Wyjaśniam osie bez słów „zawsze poziomo/pionowo”.
- [ ] Odróżniam gap od rozdzielania wolnego miejsca.
- [ ] Potrafię wywołać wrap dla row i column.
- [ ] Potrafię usunąć wszystkie dzieci i zacząć od zera.
- [ ] Wyeksportowany plik działa samodzielnie.

## CSS układu narzędzia

Przy @media(min-width:60rem) .workbench zmienia się w grid: kolumna 20rem i minmax(0,1fr). minmax pozwala podglądowi zmieścić się w pozostałej szerokości. grid-column:2 i grid-row:1 / span 2 lokują podgląd obok obu paneli. position:sticky; top:1rem utrzymuje go w polu widzenia podczas przewijania ustawień. Poniżej progu panele zawijają się pionowo. To układ narzędzia, nie część eksportowanego Flexboxa.

## CSS przy ustawieniach: jak użyć go samemu

Pod panelem rodzica widzisz na żywo regułę `.layout { ... }`. W HTML odpowiada jej `<div class="layout">`. Pod panelem dziecka jest reguła wybranego elementu, np. `.item-3 { ... }`, odpowiadająca `class="item item-3"`. Zmiana wyboru, edycja, dodanie, usunięcie lub reset aktualizują te fragmenty. Przy pustym kontenerze nie pokazujemy starego CSS dziecka. Pełny eksport na dole nadal zawiera także wspólny wygląd i wszystkie dzieci.

Oba fragmenty korzystają z containerCss/childCss tak samo jak eksport; textContent wyświetla kod jako tekst. .setting-code używa white-space:pre-wrap (zachowanie nowych linii i zawijanie), overflow-wrap:anywhere (długie zapisy), font-size:0.875rem i border-left:3px solid #125d88.

## align-items i align-content — prościej

Linia to grupa bezpośrednich dzieci, które zmieściły się wzdłuż osi głównej. `align-items` wyrównuje poszczególne dzieci **wewnątrz ich linii**. `align-content` rozmieszcza **całe linie** na osi poprzecznej kontenera. Dla row jest to pion, dla column poziom. Nie chodzi o wiersze tekstu wewnątrz jednego dziecka.

W nowrap align-content nie działa. Po włączeniu wrap musisz też doprowadzić do zawinięcia (np. dodać dzieci) i pozostawić wolne miejsce na osi poprzecznej, by zobaczyć rozdzielenie linii. Różne rozmiary dzieci pomagają zauważyć align-items. [Trzy porównywalne stany w lekcji 204](../204-css-flexbox-wiecej-mozliwosci/index.html#alignment-title) pokazują osobno każdą zmianę.
