# Ćwiczenie 02 — formularz i tabela

Otwórz `index.html`. Sprawdź, dlaczego `label for="student-name"` wskazuje pole o `id="student-name"`, a potem przejdź po całym formularzu klawiszem `Tab`.

## Czego się nauczysz

- Budować tabelę z poprawnie oznaczonym nagłówkiem kolumny.
- Łączyć etykiety z polami formularza.
- Używać pola tekstowego, listy wyboru i przycisku.
- Tworzyć prosty responsywny układ sekcji oraz bezpieczne przewijanie tabeli.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `doctype`, `html`, `head`, `meta`, `title`, `link`, `body` | Tworzą szkielet strony opisany szczegółowo w lekcji 01. |
| `<header>`, `<main>`, `<section>`, `<footer>` | Dzielą dokument na semantyczne obszary. |
| `<table>` | Tworzy tabelę danych. Nie służy do układania całej strony. |
| `<thead>` i `<tbody>` | Oddzielają wiersze nagłówkowe od danych. |
| `<tr>` | Tworzy wiersz tabeli. |
| `<th scope="col">` | Tworzy nagłówek kolumny i określa jego zakres. |
| `<td>` | Tworzy zwykłą komórkę danych. |
| `<div class="table-wrapper">` | Jest neutralnym opakowaniem umożliwiającym przewijanie tabeli. |
| `<form action="#" method="get">` | Grupuje pola; wysyła wartości metodą GET do bieżącej strony. |
| `<label for="student-name">` | Nazywa kontrolkę o pasującym `id`. Kliknięcie etykiety aktywuje pole. |
| `<input id="student-name" name="name" required>` | Przyjmuje tekst; `name` określa nazwę wysyłanej wartości, a `required` wymaga uzupełnienia. |
| `<select id="topic" name="topic">` | Tworzy listę wyboru. |
| `<option value="html">` | Definiuje widoczną opcję i wysyłaną wartość. |
| `<button type="submit">` | Uruchamia wysłanie formularza. |
| `aria-labelledby` | Nadaje sekcji nazwę przez istniejący nagłówek. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `font-family: system-ui, sans-serif`, `line-height: 1.5` | Ustawiają czcionkę i interlinię. |
| `max-width: 64rem`, `margin: 0 auto`, `padding: 1rem` | Ograniczają, centrują i odsuwają stronę od krawędzi. |
| `color: #172033`, `background: #eef2f8` / `#ffffff` | Ustawiają kolory tekstu, strony i paneli. |
| `display: grid` | Włącza CSS Grid dla sekcji oraz pionowego formularza. |
| `grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr))` | Tworzy tyle kolumn, ile się mieści; każda ma co najmniej mniejszą z wartości `100%` i `18rem`, a potem dzieli wolne miejsce. |
| `gap: 1rem` / `0.5rem` | Ustawia odstępy między sekcjami albo polami formularza. |
| `border: 1px solid ...`, `border-radius: 0.5rem` | Dodają ramki i zaokrąglenie. |
| `overflow-x: auto` | Dodaje poziome przewijanie tylko wtedy, gdy tabela się nie mieści. |
| `width: 100%` | Rozciąga tabelę do szerokości opakowania. |
| `border-collapse: collapse` | Łączy sąsiadujące ramki komórek. |
| `padding: 0.6rem` | Dodaje odstęp wewnątrz komórek. |
| `text-align: left` | Wyrównuje tekst nagłówków i komórek do lewej. |
| `min-height: 2.75rem` | Zapewnia wygodną wysokość kontrolek. |
| `padding-inline: 0.75rem` | Dodaje odstęp po lewej i prawej stronie kontrolki. |
| `font: inherit` | Przejmuje ustawienia czcionki z dokumentu. |
| `:focus-visible`, `outline`, `outline-offset` | Pokazują pomarańczową obwódkę podczas pracy klawiaturą. |

## JavaScript

Nie jest używany. Formularz nie zapisuje jeszcze danych; obsługę zachowania poznasz później.

## Biblioteki

Brak bibliotek.

## Zadanie

Dodaj trzeci wiersz tabeli, nową opcję `select`, drugie pole formularza z poprawnym `label` oraz sprawdź stronę przy szerokości około `390px`.
