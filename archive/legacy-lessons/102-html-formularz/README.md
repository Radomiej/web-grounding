# Ćwiczenie 102 — czysty HTML: tabela i formularz

To drugie ćwiczenie serii `1xx`. Nie ma własnego arkusza CSS: najpierw skup się
na semantyce tabeli, etykietach pól i wartościach wysyłanych przez formularz.
Wygląd tych samych elementów poznasz w [CSS 201](../201-css-podstawy/).

## Czego się nauczysz

- zbudować tabelę z nagłówkami kolumn;
- połączyć `label` z właściwym polem przez `for` i `id`;
- odczytać rolę `name`, `required`, `action` i `method`;
- rozróżnić elementy semantyczne od neutralnego wyglądu przeglądarki.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `header`, `main`, `section`, `footer` | Dzielą dokument na logiczne obszary. |
| `table` | Tworzy tabelę danych, nie cały layout. |
| `thead`, `tbody` | Rozdzielają nagłówki i wiersze danych. |
| `tr` | Tworzy wiersz. |
| `th scope="col"` | Oznacza nagłówek kolumny. |
| `td` | Oznacza zwykłą komórkę. |
| `form action="#" method="get"` | Grupuje pola i wysyła wartości metodą GET do bieżącego adresu. |
| `label for="student-name"` | Nazywa kontrolkę o identycznym `id`. |
| `input name="name" required` | Przyjmuje wymagany tekst; `name` jest kluczem wysyłanej wartości. |
| `select` i `option value="..."` | Pozwalają wybrać jedną wartość i określają jej kod. |
| `button type="submit"` | Wysyła formularz. |
| `aria-labelledby` | Łączy sekcję z nagłówkiem. |

## CSS

Brak CSS. Domyślny wygląd tabeli i formularza jest punktem wyjścia do porównań
w serii `2xx`.

## JavaScript

Brak JavaScriptu. Formularz wysyła zwykłe żądanie GET.

## Biblioteki

Brak bibliotek.

## Zadanie

Dodaj trzeci wiersz tabeli, trzecią opcję wyboru i pole e-mail z `type="email"`.
Nie pomijaj etykiety i sprawdź przejście po kontrolkach klawiszem `Tab`.
