# 309 — Obiekty i dynamiczna lista

Etap 8/12. Obiekt opisuje jedno zadanie. Tablica jest źródłem danych, a renderowanie odtwarza listę.

## Wymagania wstępne

Ukończ [Wygląd i galeria](../307-javascript-galeria/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- { id, title, priority }: Obiekt grupuje nazwane właściwości jednego zadania.
- task.title: Odczytuje właściwość obiektu przez kropkę.
- continue: Pomija bieżący obieg pętli.
- toLowerCase / includes: Normalizuje wielkość liter i sprawdza fragment tekstu.
- findIndex / splice(index, 1): Znajduje indeks po stabilnym id, następnie usuwa jedno zadanie.
- render(): Nasza funkcja synchronizująca DOM z tablicą; nie jest wbudowanym API.

## Krok po kroku

1. Dodaj dwa zadania o tej samej nazwie i usuń jedno.
2. Filtruj fragmentem nazwy.
3. Usuń ostatni element i sprawdź licznik.

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

| Zapis                          | Wyjaśnienie                                                           |
| ------------------------------ | --------------------------------------------------------------------- |
| `{ id, title, priority }`      | Obiekt grupuje nazwane właściwości jednego zadania.                   |
| `task.title`                   | Odczytuje właściwość obiektu przez kropkę.                            |
| `continue`                     | Pomija bieżący obieg pętli.                                           |
| `toLowerCase / includes`       | Normalizuje wielkość liter i sprawdza fragment tekstu.                |
| `findIndex / splice(index, 1)` | Znajduje indeks po stabilnym id, następnie usuwa jedno zadanie.       |
| `render()`                     | Nasza funkcja synchronizująca DOM z tablicą; nie jest wbudowanym API. |

## Częste błędy

Indeks widocznej listy po filtrowaniu nie musi odpowiadać indeksowi w tablicy; dlatego identyfikujemy zadanie po id.

## Zadanie do wykonania

1. Dodaj pole `completed` do każdego obiektu.
2. Dodaj filtr tylko nieukończonych.
3. Dodaj przycisk oznaczania zadania jako ukończonego.
4. Sprawdź pusty wynik i próbę dodania samych spacji.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.
