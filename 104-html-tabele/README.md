# Ćwiczenie 104 — czysty HTML: tabele danych

Nie ma własnego arkusza CSS. Tabela służy do danych tabelarycznych, a nie do
układania całej strony. Wygląd poznasz w [CSS 201](../201-css-podstawy/).

## Czego się nauczysz

- zbudować tabelę z nagłówkiem, ciałem i stopką;
- rozróżnić `th scope="col"` i `th scope="row"`;
- dodać wiersz podsumowania bez mieszania tabeli z layoutem;
- opisać przypadek pustej tabeli.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `header`, `main`, `section`, `footer` | Dzielą dokument na logiczne obszary. |
| `table` | Tworzy tabelę danych, nie cały layout. |
| `thead`, `tbody` | Rozdzielają nagłówki i wiersze danych. |
| `tr` | Tworzy wiersz. |
| `th scope="col"` | Oznacza nagłówek kolumny. |
| `td` | Oznacza zwykłą komórkę. |
| `caption` | Krótko opisuje przeznaczenie tabeli. |
| `tfoot` | Zawiera podsumowanie danych. |
| `th scope="row"` | Oznacza nagłówek wiersza. |
| `aria-labelledby` | Łączy sekcję z nagłówkiem. |

## CSS

Brak CSS. Domyślny wygląd tabeli i formularza jest punktem wyjścia do porównań
w serii `2xx`.

## JavaScript

Brak JavaScriptu. Dane są statyczne, więc można skupić się na semantyce.

## Biblioteki

Brak bibliotek.

## Zadanie do wykonania

1. Dodaj `caption` opisujący tabelę.
2. Dodaj czwarty wiersz z własnymi danymi.
3. Zmień stopkę tak, aby zawierała prawdziwe podsumowanie liczbowe.
4. Dodaj drugi nagłówek wiersza przez `scope="row"`.
5. Przygotuj osobny komunikat HTML, który można wyświetlić, gdy tabela jest pusta.

## Kryteria zaliczenia

- każda komórka ma właściwy `th` albo `td`;
- `thead`, `tbody` i `tfoot` są użyte zgodnie z rolą;
- tabela nie służy do rozmieszczania nagłówka ani stopki strony;
- dane pozostają zrozumiałe bez CSS.
