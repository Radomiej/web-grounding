# 310 — localStorage i JSON

Etap 9/12. JSON zapisuje obiekt jako tekst. Odczyt może się nie udać, więc strona ma działać także bez zapisu.

## Wymagania wstępne

Ukończ [Obiekty i dynamiczna lista](../309-javascript-lista/README.md). Otwórz index.html; nie potrzebujesz XAMPP. Kod zmieniaj w app.js, zapisuj i odświeżaj stronę.

## Czego się nauczysz

- localStorage.getItem/setItem/removeItem: Odczyt, zapis i usuwanie tekstu dla danego pochodzenia strony.
- JSON.stringify / JSON.parse: Zamienia obiekt na tekst / odtwarza dane z tekstu; parse może rzucić błąd.
- try / catch / throw new Error: Obsługa błędów odczytu, formatu i blokady pamięci.
- typeof: Sprawdza typ danych po odczycie; zapis nie jest automatycznie zaufany.
- Date, getHours/getMinutes/getSeconds: Bieżący czas oraz jego składowe.
- Math.floor: Zaokrągla w dół do liczby całkowitej.
- setInterval(fn, 1000): Wywołuje funkcję mniej więcej co 1000 ms; nie jest zegarem o gwarantowanej dokładności.
- toUpperCase / toLocaleTimeString: Wielkie litery / lokalne formatowanie czasu.

## Krok po kroku

1. Zapisz podpis i odśwież stronę.
2. W DevTools → Application zmień zapis na niepoprawny JSON i odśwież.
3. Usuń zapis. Porównaj działanie przez file:// i serwer HTTP.

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

| Zapis                                     | Wyjaśnienie                                                                             |
| ----------------------------------------- | --------------------------------------------------------------------------------------- |
| `localStorage.getItem/setItem/removeItem` | Odczyt, zapis i usuwanie tekstu dla danego pochodzenia strony.                          |
| `JSON.stringify / JSON.parse`             | Zamienia obiekt na tekst / odtwarza dane z tekstu; parse może rzucić błąd.              |
| `try / catch / throw new Error`           | Obsługa błędów odczytu, formatu i blokady pamięci.                                      |
| `typeof`                                  | Sprawdza typ danych po odczycie; zapis nie jest automatycznie zaufany.                  |
| `Date, getHours/getMinutes/getSeconds`    | Bieżący czas oraz jego składowe.                                                        |
| `Math.floor`                              | Zaokrągla w dół do liczby całkowitej.                                                   |
| `setInterval(fn, 1000)`                   | Wywołuje funkcję mniej więcej co 1000 ms; nie jest zegarem o gwarantowanej dokładności. |
| `toUpperCase / toLocaleTimeString`        | Wielkie litery / lokalne formatowanie czasu.                                            |

## Częste błędy

localStorage nie jest bazą serwera ani miejscem na dane poufne. Dla file:// zachowanie zapisu zależy od przeglądarki.

## Zadanie do wykonania

1. Dodaj ustawienie rozmiaru tekstu jako dozwolone wartości `small` i `large`.
2. Zapisz ustawienie razem z motywem w jednym obiekcie JSON.
3. Obsłuż uszkodzony JSON i nieznaną wartość przez bezpieczny fallback.
4. Sprawdź zapis, odświeżenie strony i wyczyszczenie ustawień.

## Sprawdź się

- [ ] Potrafię wskazać dane wejściowe, przetwarzanie i wynik.
- [ ] Wykonałem wszystkie kroki, w tym przypadek brzegowy.
- [ ] Po ponownym wykonaniu akcji wynik jest poprawny, a konsola nie pokazuje błędów.
- [ ] Umiałbym odtworzyć główną funkcję bez kopiowania.

## Dodatkowy CSS

`.dark` jest klasą motywu. Tło `#172b3a` i `#233e52` jest ciemne, tekst `#f5f7fa` jasny, odnośniki `#aadeff` jasnoniebieskie. `.dark section` i `.dark a` wybierają potomków w ciemnym motywie.
