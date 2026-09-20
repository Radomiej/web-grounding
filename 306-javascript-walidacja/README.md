# 306 — Walidacja formularza

Etap 5/12. Przeglądarka sprawdza format, a skrypt dodatkowe zasady. Błąd musi mówić, co poprawić.

## Wymagania wstępne

Ukończ [Warunki i kontrolki](../305-javascript-warunki/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- trim(): Usuwa białe znaki z obu końców tekstu.
- :invalid i validationMessage: Wybierają błędną kontrolkę i odczytują komunikat przeglądarki.
- classList.add/remove: Dodają i usuwają klasę CSS bez nadpisania pozostałych klas.
- focus(): Kieruje klawiaturę do pola wymagającego poprawki.

## Krok po kroku

1. Wyślij pusty formularz.
2. Wpisz same spacje w imieniu oraz błędny email.
3. Wpisz AB12, poprawny wiek i email; sprawdź sukces.

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

| Zapis                          | Wyjaśnienie                                                    |
| ------------------------------ | -------------------------------------------------------------- |
| `trim()`                       | Usuwa białe znaki z obu końców tekstu.                         |
| `:invalid i validationMessage` | Wybierają błędną kontrolkę i odczytują komunikat przeglądarki. |
| `classList.add/remove`         | Dodają i usuwają klasę CSS bez nadpisania pozostałych klas.    |
| `focus()`                      | Kieruje klawiaturę do pola wymagającego poprawki.              |

## Częste błędy

novalidate wyłącza automatyczny popup przy submit, ale pozostawia reguły :invalid. Walidacja klienta nie zabezpiecza serwera.

## Zadanie do wykonania

1. Dodaj obowiązkowe pole telefonu z `pattern`.
2. Dodaj opis formatu przez `aria-describedby`.
3. Pokaż własny komunikat dla pustej i błędnej wartości.
4. Sprawdź przejście z błędu do poprawnego zgłoszenia bez odświeżenia strony.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.
