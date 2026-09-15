# Ćwiczenie 205 — Bootstrap z lokalnego CSS

Otwórz `index.html`. Strona dołącza prawdziwy Bootstrap 5.3.8 z `../assets/bootstrap/bootstrap.min.css`, więc po pobraniu projektu nie wymaga CDN ani połączenia z internetem.

## Czego się nauczysz

- Dołączać framework CSS jako zwykły lokalny plik.
- Korzystać z kontenera, responsywnej siatki, odstępów, kart, alertu, przycisków i formularza.
- Czytać klasy narzędziowe jako małe gotowe reguły CSS.
- Rozpoznawać granicę: Bootstrap dostarcza CSS, a HTML nadal opisuje treść i semantykę.

## HTML

| Element lub atrybut | Znaczenie w ćwiczeniu |
| --- | --- |
| `<!doctype html>`, `lang`, `charset`, `viewport` | Ustawiają HTML5, język, kodowanie i responsywne skalowanie. |
| `<link rel="stylesheet" href="../assets/bootstrap/bootstrap.min.css">` | Dołącza lokalny, zminifikowany arkusz Bootstrap. |
| `<header>`, `<main>`, `<section>`, `<article>` | Zachowują semantyczną strukturę niezależnie od klas frameworka. |
| `<div>` | Tworzy pomocnicze kontenery dla siatki i komponentów. |
| `<form action="#" method="get">` | Pokazuje formularz bez serwera; po wysłaniu dane trafiają do adresu strony. |
| `<label for="email">` i `id="email"` | Łączą nazwę z polem. |
| `<input type="email" required>` | Włącza kontrolę formatu e-mail i wymaganej wartości. |
| `<button type="submit">` | Wysyła formularz. |
| `role="status"` | Oznacza komunikat informacyjny. |
| `aria-labelledby` | Łączy sekcję z jej nagłówkiem. |

## CSS

Nie ma własnego `style.css`. Wszystkie poniższe klasy pochodzą z lokalnego Bootstrapa:

| Klasa | Co daje |
| --- | --- |
| `container` | Centruje treść, dodaje poziomy padding i zmienia maksymalną szerokość na breakpointach. |
| `bg-dark`, `text-white`, `text-warning` | Ustawiają ciemne tło, biały tekst i ostrzegawczy kolor tekstu. |
| `py-4` | Dodaje padding w pionie według skali odstępów Bootstrap. |
| `fw-bold` | Ustawia pogrubienie `font-weight: 700`. |
| `mb-0`, `mb-2`, `mb-3` | Ustawiają dolny margines: brak albo kolejne wartości skali. |
| `display-5`, `lead`, `h5` | Stosują gotowe rozmiary i rytm typografii. `h5` zmienia wygląd, nie poziom semantyczny nagłówka. |
| `alert alert-primary` | Budują informacyjny panel w kolorze podstawowym. |
| `row` | Tworzy wiersz siatki Bootstrap. |
| `g-3`, `g-4` | Ustawiają odstępy pomiędzy kolumnami siatki. |
| `col-12` | Element zajmuje 12 z 12 kolumn na najmniejszych ekranach. |
| `col-md-6` | Od breakpointu `md` element zajmuje 6 z 12 kolumn. |
| `col-md-8`, `col-md-4` | Od `md` dzielą wiersz formularza w proporcji 8/12 i 4/12. |
| `col-lg-4` | Od breakpointu `lg` karta zajmuje 4 z 12 kolumn, więc mieszczą się trzy. |
| `card`, `card-body`, `card-title`, `card-text` | Budują strukturę i odstępy komponentu karty. |
| `h-100` | Ustawia wysokość na `100%` dostępnej wysokości kolumny. |
| `shadow-sm` | Dodaje mały cień. |
| `btn btn-primary`, `btn-success` | Nadają odnośnikowi lub przyciskowi wygląd przycisku i wariant koloru. |
| `btn-lg` | Powiększa padding i tekst przycisku, dając wygodniejszy cel dotykowy. |
| `mt-5` | Dodaje duży górny margines. |
| `form-label`, `form-control` | Stylują etykietę i pole formularza. |
| `form-control-lg` | Zwiększa wysokość oraz tekst pola formularza. |
| `d-flex` | Ustawia `display: flex`. |
| `align-items-end` | Wyrównuje przycisk do końca osi poprzecznej. |
| `w-100` | Ustawia szerokość przycisku na `100%`. |

## JavaScript

Nie jest używany. Wybrane komponenty nie wymagają `bootstrap.js`. Rozwijane menu, modal czy karuzela wymagałyby osobnego lokalnego pliku JavaScript i są poza tą lekcją.

## Biblioteki

| Biblioteka | Wersja | Plik | Rola |
| --- | --- | --- | --- |
| Bootstrap | 5.3.8 | `assets/bootstrap/bootstrap.min.css` | Gotowa siatka, komponenty, formularze i klasy narzędziowe. |

Bootstrap jest udostępniany na licencji MIT. Kopia licencji znajduje się w `assets/bootstrap/LICENSE`.

## Zadanie

1. Zbuduj własną stronę z `container`, `row` i co najmniej trzema kolumnami.
2. Dodaj kartę, alert i formularz.
3. Zmień wariant przycisku, korzystając z dokumentacji klas już opisanych powyżej.
4. Odłącz internet i sprawdź, że wygląd nadal działa.
