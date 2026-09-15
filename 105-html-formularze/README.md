# Ćwiczenie 105 — czysty HTML: formularze

Formularz jest semantyczny i działa bez JavaScriptu. Najpierw poznaj natywne
kontrolki przeglądarki, potem dopiero dodaj walidację skryptem.

## Czego się nauczysz

- połączyć `label` z polem przez `for` i `id`;
- grupować kontrolki przez `fieldset` i `legend`;
- rozumieć `name`, `value`, `required`, `minlength` i `maxlength`;
- używać email, date, radio, checkbox i textarea.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `header`, `main`, `section`, `footer` | Dzielą dokument na logiczne obszary. |
| `form action="#" method="get"` | Grupuje pola i wysyła wartości metodą GET do bieżącego adresu. |
| `fieldset` / `legend` | Grupują kontrolki i nadają grupie nazwę. |
| `label for="student-name"` | Nazywa kontrolkę o identycznym `id`. |
| `input type="email"` | Włącza natywną kontrolę formatu adresu. |
| `input type="radio"` | Pozwala wybrać jedną wartość z grupy o tym samym `name`. |
| `input type="checkbox"` | Reprezentuje niezależną zgodę lub wybór. |
| `textarea` | Przyjmuje dłuższy tekst. |
| `required`, `minlength`, `maxlength` | Włączają natywną walidację. |
| `button type="submit"` | Wysyła formularz. |
| `aria-labelledby` | Łączy sekcję z nagłówkiem. |

## CSS

Brak CSS. Domyślny wygląd tabeli i formularza jest punktem wyjścia do porównań
w serii `2xx`.

## JavaScript

Brak JavaScriptu. Formularz wysyła zwykłe żądanie GET.

## Biblioteki

Brak bibliotek.

## Zadanie do wykonania

1. Dodaj pole numeru telefonu z `pattern` opisanym tekstem pomocniczym.
2. Dodaj drugą grupę checkboxów dotyczącą formy zajęć.
3. Dodaj `select` z trzema poziomami zaawansowania.
4. Uzupełnij `label`, `name`, `value` i `required` dla nowych kontrolek.
5. Sprawdź przejście klawiszem `Tab` i próbę wysłania pustego formularza.

## Kryteria zaliczenia

- każde pole ma widoczną etykietę lub legendę;
- radio używają wspólnego `name`, a checkboxy mogą być niezależne;
- błędny e-mail i brak wymaganych danych zatrzymują wysyłkę;
- formularz pozostaje użyteczny bez CSS i JavaScriptu.
