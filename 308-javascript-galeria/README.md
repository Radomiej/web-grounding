# 308 — Wygląd i galeria

Etap 7/12. Indeks wybiera obraz, a klasy CSS zmieniają wygląd bez mieszania prezentacji z danymi.

## Wymagania wstępne

Ukończ [Pętle i tablice](../307-javascript-petle-tablice/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- src / alt: Adres grafiki i tekst alternatywny; aktualizujemy oba.
- %: Reszta z dzielenia umożliwia przejście z ostatniego slajdu na pierwszy.
- input / change: input reaguje podczas przesuwania suwaka; change na zatwierdzoną zmianę.
- event.target: Kontrolka, która wywołała zdarzenie.
- style.width: Ustawia pojedynczą właściwość CSS; tekst wartości zawiera jednostkę px.
- classList.toggle(nazwa, warunek): Włącza klasę dokładnie wtedy, gdy warunek jest true.

## Krok po kroku

1. Przejdź do poprzedniego zdjęcia z pierwszego.
2. Przesuń suwak, zaznacz ramkę.
3. Sprawdź alt w narzędziach przeglądarki.

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

| Zapis                              | Wyjaśnienie                                                              |
| ---------------------------------- | ------------------------------------------------------------------------ |
| `src / alt`                        | Adres grafiki i tekst alternatywny; aktualizujemy oba.                   |
| `%`                                | Reszta z dzielenia umożliwia przejście z ostatniego slajdu na pierwszy.  |
| `input / change`                   | input reaguje podczas przesuwania suwaka; change na zatwierdzoną zmianę. |
| `event.target`                     | Kontrolka, która wywołała zdarzenie.                                     |
| `style.width`                      | Ustawia pojedynczą właściwość CSS; tekst wartości zawiera jednostkę px.  |
| `classList.toggle(nazwa, warunek)` | Włącza klasę dokładnie wtedy, gdy warunek jest true.                     |

## Częste błędy

Nie dopisuj tylko źródła bez odpowiadającego opisu; obie tablice muszą mieć tę samą długość.

## Zadanie do wykonania

1. Dodaj czwarty lokalny obraz i jego opis.
2. Dodaj podpis i tekst alternatywny dla każdego zdjęcia.
3. Dodaj przycisk następne/poprzednie i stan pierwszego/ostatniego zdjęcia.
4. Sprawdź brakujący plik oraz widok przy 390 px.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.

## Dodatkowy CSS

`.framed` wybiera klasę ramki; `border: .5rem solid #a84200` daje ciągłą, pomarańczową ramkę. `height: auto` zachowuje proporcje zdjęcia przy zmianie szerokości.
