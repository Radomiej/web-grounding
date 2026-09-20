# 305 — Warunki i kontrolki

Etap 4/12. Wybór użytkownika zmienia cenę. Naucz się odróżniać value od checked.

## Wymagania wstępne

Ukończ [Kalkulator kosztu](../304-javascript-kalkulator/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- checked: Boolean informujący, czy checkbox lub radio jest zaznaczone.
- :checked: Pseudoklasa CSS wybierająca zaznaczoną kontrolkę.
- if / else: Wykonuje dokładnie jedną z dwóch gałęzi.
- && oraz ||: Logiczne ORAZ wymaga obu warunków; LUB wymaga przynajmniej jednego.
- *= / +=: Skróty przypisania; += dla tekstu dokleja dalszy tekst.

## Krok po kroku

1. Porównaj cenę 10 stron zwykłych i premium.
2. Zaznacz rabat przy 9 i 10 stronach.
3. Prześledź po kolei odczyt, obliczenie i wyświetlenie.

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

| Zapis          | Wyjaśnienie                                                         |
| -------------- | ------------------------------------------------------------------- |
| `checked`      | Boolean informujący, czy checkbox lub radio jest zaznaczone.        |
| `:checked`     | Pseudoklasa CSS wybierająca zaznaczoną kontrolkę.                   |
| `if / else`    | Wykonuje dokładnie jedną z dwóch gałęzi.                            |
| `&& oraz \|\|` | Logiczne ORAZ wymaga obu warunków; LUB wymaga przynajmniej jednego. |
| `*= / +=`      | Skróty przypisania; += dla tekstu dokleja dalszy tekst.             |

## Częste błędy

value checkboxa nie mówi, czy jest zaznaczony. Do tego służy checked.

## Zadanie do wykonania

1. Dodaj trzeci rodzaj papieru jako opcję formularza.
2. Dodaj warunek darmowej dostawy od ustalonego progu.
3. Pokaż osobny komunikat dla ceny ujemnej, zera i poprawnej wartości.
4. Sprawdź checkbox przez `checked`, a nie przez jego tekst `value`.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.
