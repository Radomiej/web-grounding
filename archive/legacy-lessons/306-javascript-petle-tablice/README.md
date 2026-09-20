# 306 — Pętle i tablice

Etap 6/12. Jedna pętla pozwala przetworzyć dowolną liczbę ocen, także pustą listę.

## Wymagania wstępne

Ukończ [Walidacja formularza](../305-javascript-walidacja/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- [] / tablica[index]: Tablica trzyma uporządkowane dane; pierwszy indeks to 0.
- split(',') / push: Dzieli tekst na tablicę / dodaje element na końcu tablicy.
- length: Liczba elementów; ostatni indeks to length - 1.
- for / for...of: Pętla z licznikiem / przejście po wartościach.
- index++: Zwiększa licznik o 1.
- replaceChildren(): Usuwa dotychczasowe dzieci; nie duplikujemy wyników.
- createElement / append: Tworzy węzeł HTML, następnie dołącza go do dokumentu.

## Krok po kroku

1. Sprawdź wynik dla 4,5,3,4: średnia 4, maksimum 5.
2. Sprawdź pustą listę, 7 i podwójny przecinek.
3. Dodaj ocenę i zobacz, że nie trzeba dopisywać kolejnej instrukcji obliczeniowej.

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

| Zapis                    | Wyjaśnienie                                                |
| ------------------------ | ---------------------------------------------------------- |
| `[] / tablica[index]`    | Tablica trzyma uporządkowane dane; pierwszy indeks to 0.   |
| `split(',') / push`      | Dzieli tekst na tablicę / dodaje element na końcu tablicy. |
| `length`                 | Liczba elementów; ostatni indeks to length - 1.            |
| `for / for...of`         | Pętla z licznikiem / przejście po wartościach.             |
| `index++`                | Zwiększa licznik o 1.                                      |
| `replaceChildren()`      | Usuwa dotychczasowe dzieci; nie duplikujemy wyników.       |
| `createElement / append` | Tworzy węzeł HTML, następnie dołącza go do dokumentu.      |

## Częste błędy

Warunek index <= grades.length wychodzi poza tablicę. Poprawny jest index < grades.length.

## Zadanie

Oblicz minimum i liczbę ocen powyżej średniej.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.
