# CSS lekcji — słownik wartości

Arkusze są kopiami lokalnymi, aby każdą lekcję można było edytować osobno. To słownik wspólnych deklaracji z lekcji 07 i 10–22. Dodatkowe reguły są opisane w README danej lekcji.

| Deklaracja / selektor                         | Znaczenie                                                                                                        |
| --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| :root                                         | Element główny HTML, tu wspólne ustawienia typografii.                                                           |
| *                                             | Wszystkie elementy.                                                                                              |
| font-family: system-ui, sans-serif            | Czcionka systemowa, a w razie braku dowolna bezszeryfowa.                                                        |
| line-height:1.6 / 1.2                         | Wysokość wiersza jako mnożnik rozmiaru pisma; nagłówki mają ciaśniejsze 1.2.                                     |
| color:#172b3a; background:#eef3f7             | Ciemny tekst i jasne tło. # to zapis szesnastkowy składowych RGB.                                                |
| box-sizing:border-box                         | width/height obejmują padding i border.                                                                          |
| max-width:70rem                               | Limit szerokości treści; rem zależy od rozmiaru pisma elementu html.                                             |
| margin:0 auto                                 | Zero pionowo i automatyczne, równe marginesy poziomo.                                                            |
| padding:1rem                                  | Wewnętrzny odstęp ze wszystkich stron.                                                                           |
| margin-block:1rem / .7rem                     | Odstępy na osi blokowej, w naszym piśmie powyżej i poniżej.                                                      |
| min-width:0                                   | Pozwala elementowi układu kurczyć się mimo szerokiej treści.                                                     |
| border:1px solid #a7b7c4                      | Cienka ciągła szaroniebieska ramka. px to piksel CSS.                                                            |
| border-radius:.5rem / .3rem / .2rem           | Promień zaokrąglenia panelu/przycisku/pola.                                                                      |
| background:#fff                               | Skrót białego #ffffff.                                                                                           |
| font-size:clamp(1.6rem,4vw,2.5rem)            | Rozmiar zależny od szerokości okna, ograniczony minimum i maksimum. 1vw to 1% szerokości okna.                   |
| display:flex; flex-wrap:wrap                  | Elastyczny układ z możliwością zawijania dzieci.                                                                 |
| gap:.75rem / 1rem                             | Odstęp między elementami.                                                                                        |
| color:#084d85                                 | Ciemnoniebieski link.                                                                                            |
| display:inline-flex                           | Elastyczny układ wewnętrzny, element na zewnątrz zachowuje się jak liniowy.                                      |
| align-items:center; justify-content:center    | Centrują zawartość przycisku na obu osiach.                                                                      |
| min-height:2.75rem                            | Co najmniej 44px przy domyślnym rem=16px.                                                                        |
| padding:.5rem .8rem / .4rem                   | Wariant dwuwartościowy: pion/poziom; jedna wartość: wszystkie strony.                                            |
| background:#125d88; color:white               | Niebieski przycisk z białym tekstem.                                                                             |
| border:2px solid #125d88                      | Obramowanie przycisku.                                                                                           |
| cursor:pointer / not-allowed                  | Kursor akcji / niedostępnej akcji. Nie zastępuje disabled w HTML.                                                |
| font:inherit                                  | Dziedziczy czcionkę dokumentu, także w kontrolkach.                                                              |
| button:disabled                               | Natywnie wyłączony przycisk. Tło #d5dfe5, tekst #384954 i border-color #a7b7c4 pozostają widoczne.               |
| display:block                                 | Element zajmuje własny wiersz.                                                                                   |
| max-width:100%; width:100%                    | Limit / wypełnienie szerokości rodzica.                                                                          |
| border:1px solid #657c8c                      | Ciemniejsza ramka kontrolki.                                                                                     |
| :not([type=checkbox]):not([type=radio])       | Wyklucza checkbox i radio z rozciągania na całą szerokość.                                                       |
| width:1.4rem; height:1.4rem                   | Rozmiar checkbox/radio.                                                                                          |
| vertical-align:middle                         | Wyrównanie kontrolki w linii z tekstem.                                                                          |
| :focus-visible                                | Fokus widoczny przy nawigacji klawiaturą.                                                                        |
| outline:3px solid #a84200; outline-offset:3px | Pomarańczowy obrys fokusu oddalony o 3px, bez zmiany układu.                                                     |
| min-height:2rem; font-weight:600              | Rezerwacja miejsca komunikatu i półgruby tekst.                                                                  |
| .error {color:#a21e18}                        | Czerwony tekst błędu; komunikat słowny przekazuje sens niezależnie od koloru.                                    |
| pre {overflow:auto}                           | Długi kod przewija się we własnym obszarze.                                                                      |
| overflow-wrap:anywhere                        | Długi ciąg może zostać złamany w dowolnym miejscu.                                                               |
| border-collapse:collapse                      | Łączy stykające się obramowania komórek tabeli.                                                                  |
| text-align:left                               | Wyrównuje tekst komórek do lewej.                                                                                |
| .grid > * {flex:1 1 16rem}                    | Bezpośrednie dzieci: grow=1, shrink=1, basis=16rem.                                                              |
| [hidden] {display:none !important}            | Ukrywa elementy z atrybutem hidden nawet przy innych regułach display. !important zwiększa priorytet deklaracji. |
| --ink: #172033; var(--ink)                    | Zmienna custom property i jej odczyt przez `var()`.                                                  |
| background-color                               | Ustawia kolor tła; `color` dotyczy tekstu.                                                           |
| box-shadow: 0 .25rem .75rem rgb(... / .2)     | Rysuje cień poza pudełkiem bez zmiany jego rozmiaru.                                                  |
| display:grid                                  | Włącza układ w dwóch wymiarach dla bezpośrednich dzieci.                                               |
| grid-template-columns: repeat(3, minmax(0,1fr)) | Trzy elastyczne kolumny; `fr` dzieli wolne miejsce, a `minmax` ustala minimum i maksimum.          |
| grid-column: 1 / -1                          | Rozciąga element od pierwszej do ostatniej linii siatki.                                               |
| flex-direction: row / column                 | Ustawia kierunek osi głównej Flexboxa.                                                               |
| justify-content                               | Rozdziela wolne miejsce na osi głównej.                                                              |
| align-items                                   | Wyrównuje dzieci wewnątrz każdej linii na osi poprzecznej.                                            |
| align-content                                 | Rozmieszcza całe linie, gdy istnieje `flex-wrap` i wolne miejsce.                                     |
| flex: 1 1 16rem                              | Skrót kolejno dla grow, shrink i basis.                                                              |
| position: absolute; inset: 8px                | Nakłada element względem najbliższego rodzica z `position: relative`.                                |
| z-index: 1; isolation:isolate                 | Warstwa HUD i lokalny kontekst stosu.                                                                |
| aspect-ratio: 16 / 9                         | Zachowuje proporcje elementu przy zmianie szerokości.                                                 |

## Jak czytać skróty

padding/margin: jedna wartość = wszystkie strony; dwie = pion/poziom; trzy = góra/poziom/dół; cztery = góra/prawo/dół/lewo. Kolory hex opisują czerwony, zielony, niebieski. Wartość 0 zwykle nie potrzebuje jednostki. auto każe przeglądarce obliczyć wymiar lub margines zgodnie z algorytmem układu.
