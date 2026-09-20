# 311 — Canvas 2D

## Czego się nauczysz

Rysować figury, linie, tekst i lokalny obraz. Rozróżniać rozmiar CSS, bufor pikseli i logiczny układ współrzędnych. To rozszerzenie po części egzaminacyjnej.

## Wymagania wstępne

Lekcje 301–310 według mapy kursu. Otwórz index.html bez dodatkowego serwera.

## Krok po kroku

1. Znajdź canvas w HTML i getContext('2d') w JS.
2. Narysuj na papierze punkt (320,160). Początek jest u góry po lewej.
3. Przesuń suwak X; poprzednia klatka jest czyszczona.
4. Zmień fillStyle, promień i współrzędne prostokąta.
5. Zmień szerokość okna. Obraz zachowuje proporcje i rozdzielczość odpowiednią do DPR.
6. Tymczasowo podaj błędny adres grafiki: figury i komunikat nadal działają.

## Przepływ danych

Suwak lub resize → draw → ustawienie bufora i transformacji → tło → obraz → figury → tekst. Canvas przechowuje piksele, nie osobne elementy DOM dla koła lub prostokąta.

## HTML

Dokument zaczyna się od `<!doctype html>` (tryb HTML5). `html lang="pl"` ustawia język, `meta charset="UTF-8"` kodowanie, a `meta name="viewport" content="width=device-width, initial-scale=1"` szerokość urządzenia. `title` to tytuł karty. `link rel="stylesheet" href="style.css"` dołącza CSS. `script src="app.js" defer` wykonuje lokalny skrypt po parsowaniu HTML.

`header/main/footer` określają nagłówek, główną treść i stopkę; `nav aria-label` nazywa nawigację. `section` grupuje temat, `h1/h2` tworzą hierarchię nagłówków, `p` akapit, `ol/li` kroki, `ul/li` listę, `code` zapis kodu. `a href` prowadzi do pliku względną ścieżką, a `../` oznacza katalog wyżej.

W formularzach `form` zbiera kontrolki; otaczający `label` nadaje polu nazwę. `id` umożliwia wybranie elementu w JS. `input` przyjmuje dane; `type="number/email/search/range/checkbox/radio"` określa rodzaj kontrolki. `value` to wartość początkowa, `required` wymaga danych, `min/max/step` ograniczają liczby, `maxlength` długość tekstu, `pattern` format, `placeholder` pokazuje przykład. `name` grupuje radio, `checked` zaznacza początkowy wybór. `select/option` tworzą listę wyboru, `fieldset/legend` grupę z nazwą. `button` w formularzu domyślnie wysyła; `type="button"` temu zapobiega. `novalidate` pozwala obsłużyć komunikat błędu skryptem. `role="status"` ogłasza zmianę tekstu, `aria-describedby` wiąże pole z objaśnieniem. Nie każda lekcja używa wszystkich tych kontrolek.

## CSS

Pełny słownik wspólnego arkusza, łącznie z jednostkami i wartościami: [CSS krok po kroku](../docs/css-lekcji.md). Arkusz jest lokalną kopią, którą można swobodnie edytować bez zmiany innych lekcji.

## Biblioteki

Brak bibliotek JavaScript i połączeń z CDN. DOM, Canvas i Storage to API przeglądarki, a nie biblioteki do instalacji. Node jest potrzebny tylko autorowi do testów, nie uczniowi.

## HTML — Canvas

canvas width=640 height=360 ustala początkowy bufor. aria-label opisuje scenę, a tekst między znacznikami jest fallbackiem. img nie jest wymagany w DOM: new Image tworzy obraz do drawImage.

## CSS — płótno

width:640px i max-width:100% ograniczają szerokość do rodzica. height:auto oraz aspect-ratio:16/9 zachowują proporcje. Samo rozciągnięcie CSS nie zwiększa rozdzielczości rysunku.

## JavaScript

| API / zapis                | Znaczenie                                                                      |
| -------------------------- | ------------------------------------------------------------------------------ |
| getContext('2d')           | Pobiera kontekst rysowania; może zwrócić null.                                 |
| clientWidth                | Szerokość Canvas w pikselach CSS.                                              |
| devicePixelRatio           |                                                                                | 1   | Stosunek pikseli urządzenia do CSS; domyślnie 1. |
| canvas.width / height      | Rozmiar bufora. Zmiana zeruje rysunek i ustawienia kontekstu.                  |
| Math.round                 | Zaokrąglenie bufora do całkowitych pikseli.                                    |
| setTransform(a,0,0,d,0,0)  | Ustawia skalę x/y z jednostek logicznych 640×360 na bufor; nie kumuluje skali. |
| clearRect(x,y,w,h)         | Czyści prostokąt przed ponownym rysowaniem.                                    |
| fillStyle / fillRect       | Kolor i wypełniony prostokąt.                                                  |
| beginPath                  | Rozpoczyna nową ścieżkę.                                                       |
| arc(x,y,r,0,Math.PI*2)     | Pełne koło: środek, promień i kąt od 0 do 2π radianów.                         |
| fill / stroke              | Wypełnia ścieżkę / rysuje jej kontur.                                          |
| moveTo / lineTo            | Ustawia początek i koniec odcinka.                                             |
| strokeStyle / lineWidth    | Kolor i grubość linii w jednostkach logicznych.                                |
| font / fillText            | Czcionka i tekst w podanej pozycji; y odnosi się do linii bazowej tekstu.      |
| new Image, load/error, src | Ładuje lokalny obraz; rysujemy go po load, błąd ma osobny komunikat.           |
| drawImage(image,x,y,w,h)   | Rysuje załadowany obraz w prostokącie.                                         |
| window resize              | Ponownie dopasowuje bufor po zmianie rozmiaru okna.                            |

## Częste błędy

Brak beginPath może połączyć niepowiązane figury. Zmiana canvas.width kasuje obraz. drawImage przed load nie gwarantuje obrazu. Wielokrotne scale bez resetu kumuluje skalowanie.

## Zadanie

Dodaj trójkąt za pomocą moveTo/lineTo i podpis pod prostokątem.

## Sprawdź się

- [ ] Odróżniam 640 jednostek sceny od 640 pikseli CSS.
- [ ] Po przesunięciu suwaka nie zostaje ślad.
- [ ] Grafika działa lokalnie, a jej brak nie blokuje figur.
- [ ] Potrafię wyjaśnić kolejność warstw rysowania.
