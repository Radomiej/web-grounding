# 11 — Pierwszy DOM i formularz

Etap 2/12. HTML tworzy pola, JavaScript odczytuje wpis i aktualizuje tekst na stronie.

## Wymagania wstępne

Ukończ [Podstawy JavaScript](../10-javascript-podstawy/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- document.querySelector('#id'): Wybiera pierwszy element pasujący do selektora; # oznacza id.
- function greet(event): Deklaruje funkcję wykonywaną później; event opisuje zdarzenie.
- addEventListener('submit', greet): Podłącza funkcję do wysłania formularza, także klawiszem Enter.
- preventDefault(): Zatrzymuje domyślne wysłanie formularza i przeładowanie strony.
- value / textContent: value odczytuje pole; textContent wstawia zwykły tekst bez wykonywania HTML.

## Krok po kroku

1. Znajdź id w HTML i odpowiadający mu selektor w JS.
2. Wpisz imię, naciśnij Enter i obserwuj wynik.
3. Zobacz, że podajemy greet bez nawiasów: rejestrujemy funkcję, nie wywołujemy jej od razu.

## Przepływ danych

Kontrolka lub zdarzenie → odczyt wartości → sprawdzenie i obliczenie → aktualizacja DOM. Znajdź każdy etap w app.js.

## HTML

Dokument zaczyna się od `<!doctype html>` (tryb HTML5). `html lang="pl"` ustawia język, `meta charset="UTF-8"` kodowanie, a `meta name="viewport" content="width=device-width, initial-scale=1"` szerokość urządzenia. `title` to tytuł karty. `link rel="stylesheet" href="style.css"` dołącza CSS. `script src="app.js" defer` wykonuje lokalny skrypt po parsowaniu HTML.

`header/main/footer` określają nagłówek, główną treść i stopkę; `nav aria-label` nazywa nawigację. `section` grupuje temat, `h1/h2` tworzą hierarchię nagłówków, `p` akapit, `ol/li` kroki, `ul/li` listę, `code` zapis kodu. `a href` prowadzi do pliku względną ścieżką, a `../` oznacza katalog wyżej.

W formularzach `form` zbiera kontrolki; otaczający `label` nadaje polu nazwę. `id` umożliwia wybranie elementu w JS. `input` przyjmuje dane; `type="number/email/search/range/checkbox/radio"` określa rodzaj kontrolki. `value` to wartość początkowa, `required` wymaga danych, `min/max/step` ograniczają liczby, `maxlength` długość tekstu, `pattern` format, `placeholder` pokazuje przykład. `name` grupuje radio, `checked` zaznacza początkowy wybór. `select/option` tworzą listę wyboru, `fieldset/legend` grupę z nazwą. `button` w formularzu domyślnie wysyła; `type="button"` temu zapobiega. `novalidate` pozwala obsłużyć komunikat błędu skryptem. `role="status"` ogłasza zmianę tekstu, `aria-describedby` wiąże pole z objaśnieniem. Nie każda lekcja używa wszystkich tych kontrolek.

## CSS

Pełny słownik wspólnego arkusza, łącznie z jednostkami i wartościami: [CSS krok po kroku](../docs/css-lekcji.md). Arkusz jest lokalną kopią, którą można swobodnie edytować bez zmiany innych lekcji.

## Biblioteki

Brak bibliotek JavaScript i połączeń z CDN. DOM, Canvas i Storage to API przeglądarki, a nie biblioteki do instalacji. Node jest potrzebny tylko autorowi do testów, nie uczniowi.

## JavaScript

| Zapis                               | Wyjaśnienie                                                                  |
| ----------------------------------- | ---------------------------------------------------------------------------- |
| `document.querySelector('#id')`     | Wybiera pierwszy element pasujący do selektora; # oznacza id.                |
| `function greet(event)`             | Deklaruje funkcję wykonywaną później; event opisuje zdarzenie.               |
| `addEventListener('submit', greet)` | Podłącza funkcję do wysłania formularza, także klawiszem Enter.              |
| `preventDefault()`                  | Zatrzymuje domyślne wysłanie formularza i przeładowanie strony.              |
| `value / textContent`               | value odczytuje pole; textContent wstawia zwykły tekst bez wykonywania HTML. |

## Częste błędy

Brak # w selektorze lub inny id zwraca null. Walidację samych spacji dodamy w lekcji 15.

## Zadanie

Dodaj pole miasta i umieść je w powitaniu.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.
