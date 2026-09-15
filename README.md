# web-grounding

Lokalny kurs HTML, CSS, Flexbox, JavaScript/Canvas oraz PHP/MySQL przed
egzaminem INF.03. Każda lekcja jest małym folderem z działającym przykładem,
pełnym słownikiem składni i zadaniem wymagającym modyfikacji.

Nie używamy Composera, npm, frameworka JavaScript ani ORM. Jedyną biblioteką
jest lokalny Bootstrap 5.3.8. Statyczne lekcje działają bez PHP i internetu.

```text
HTML → CSS raw → Flexbox/Grid → komponenty → Bootstrap lokalnie
  └→ JavaScript DOM → klasy/theme → zapis → timer → Canvas → HUD/gra
  └→ PHP składnia → SELECT → INSERT → filtry → UPDATE → DELETE → JSON
```

## Mapa kursu

### Seria 1xx — czysty HTML

| Folder | Temat |
| --- | --- |
| `101-html-podstawy` | dokument, `lang`, `title`, metadane i landmarki |
| `102-html-tekst-i-listy` | akapity, wyróżnienia, `div`, `span`, listy i definicje |
| `103-html-struktura-strony` | `nav`, `section`, `article`, `aside`, `footer`, `address` |
| `104-html-tabele` | `caption`, `thead`, `tbody`, `tfoot`, `scope` |
| `105-html-formularze` | pola, etykiety, `fieldset`, `legend`, walidacja natywna |
| `106-html-media-i-dostepnosc` | obrazy, podpisy, linki i `details/summary` |

`102-html-formularz` pozostaje starą ścieżką zgodności.

### Seria 2xx — CSS, Flexbox, Grid i komponenty

| Folder | Temat |
| --- | --- |
| `201-css-podstawy` | kolory, typografia, jednostki, margin, padding, border, rounded |
| `202-css-flexbox-sandbox` | main/cross axis, wrap, justify, align, gap, grow i eksport CSS |
| `203-css-flexbox-wlasny-layout` | nawigacja, sidebar, karty, zagnieżdżanie |
| `204-css-flexbox-wiecej-mozliwosci` | basis, grow, shrink, align-self, order |
| `205-css-grid` | kolumny, wiersze, `minmax`, `fr`, `grid-column` |
| `206-css-komponenty` | navbar, card, alert, formularz i footer w raw CSS |
| `207-css-bootstrap-lokalnie` | lokalny Bootstrap bez CDN |

`205-css-bootstrap-lokalnie` pozostaje starą ścieżką zgodności.

### Seria 3xx — JavaScript z progresją

| Folder | Temat |
| --- | --- |
| `301-javascript-podstawy` | składnia, typy, operatory i konsola |
| `302-javascript-dom-i-formularz` | edycja tekstu, wartości i formularz |
| `303-javascript-klasy-i-theme` | `classList`, motyw, klasy i ARIA |
| `304-javascript-kalkulator` | dane wejściowe i obliczenia |
| `305-javascript-warunki` | `if`, `switch`, checkbox i komunikaty |
| `306-javascript-walidacja` | walidacja i komunikaty błędów |
| `307-javascript-petle-tablice` | pętle, tablice, min/max i średnia |
| `308-javascript-galeria` | tablica obiektów i lokalne obrazy |
| `309-javascript-lista` | dynamiczne elementy, filtrowanie i usuwanie |
| `310-javascript-zapis` | `localStorage` i JSON |
| `311-javascript-projekt-inf03` | pełne zadanie integracyjne |
| `312-javascript-timer` | start, pauza, reset, `setInterval` |
| `313-canvas-podstawy` | rysowanie 2D, obrazy i skalowanie DPR |
| `314-canvas-hud-gra` | `position:absolute`, HUD, animacja i gra |

Dawne foldery o numerach `303–312` (np. `303-javascript-kalkulator` i
`311-canvas-podstawy`) pozostają ścieżkami zgodności; nowa progresja używa
`303-javascript-klasy-i-theme` oraz kolejnych nazw opisanych w tabeli.

### Seria 4xx — PHP/MySQL

| Folder | Temat |
| --- | --- |
| `401-php-podstawy` | zmienne, warunki, pętle i bezpieczny output |
| `402-php-czytanie-bazy` | `mysqli`, `SELECT`, tabela i obsługa pustej bazy |
| `403-php-formularz-i-select` | `POST`, filtry i prepared `SELECT` |
| `404-php-insert` | walidacja i prepared `INSERT` |
| `405-php-filtrowanie` | `GET`, `LIKE`, sortowanie i pusty wynik |
| `406-php-update` | prepared `UPDATE` i `affected_rows` |
| `407-php-delete` | prepared `DELETE`, ID i potwierdzenie |
| `408-php-json-dodatek` | JSON, `fetch` i błędy HTTP jako dodatek |

Stare foldery `402-php-lista-z-bazy` i `404–408` pozostają ścieżkami zgodności.
Schemat znajduje się w [database/web_grounding.sql](database/web_grounding.sql).

Ścieżka PHP działa lokalnie przez XAMPP:

```text
przeglądarka → PHP → MySQL/MariaDB → PHP → HTML albo JSON
```

## Zadania i dokumentacja

Każdy README opisuje dokładnie elementy HTML, właściwości i wartości CSS,
API JavaScript, składnię PHP/SQL oraz biblioteki. Zadania zawierają starter,
minimum trzy konkretne modyfikacje, kryteria zaliczenia i przypadki błędne.

Seria `9xx` generuje lokalne zadania INF.03/INF.04:

- [901-generator-zadan](901-generator-zadan/README.md) — wybór obszaru i poziomu;
- [902-przygotowanie-zadania](902-przygotowanie-zadania/README.md) — mini-arkusz z kryteriami i Mermaid.

Materiały egzaminacyjne i lista zagadnień:

- [indeks arkuszy INF.03/INF.04](docs/egzaminy-inf03-inf04.md);
- [plan nauki](docs/plan-nauki-inf03-inf04.md).

Duże archiwa pozostają lokalne zgodnie z [.gitignore](.gitignore); do repozytorium
trafiają tylko lekkie paczki.

## Lokalny Bootstrap

`207-css-bootstrap-lokalnie` dołącza `assets/bootstrap/bootstrap.min.css`.
Nie ma CDN, więc ćwiczenie działa po odłączeniu internetu. Licencja MIT znajduje
się w `assets/bootstrap/LICENSE`.

## Uruchomienie

Statyczne strony można otworzyć przez `index.html` albo lokalny serwer HTTP.
Lekcje PHP skopiuj do `C:\xampp\htdocs\web-grounding`, uruchom Apache i MySQL,
a następnie zaimportuj `database/web_grounding.sql`.

Testy autora:

```powershell
node tests/validate-course.mjs
node --check 303-javascript-klasy-i-theme/app.js
node --check 312-javascript-timer/app.js
node --check 313-canvas-podstawy/app.js
node --check 314-canvas-hud-gra/app.js
node tests/frontend-browser.cjs
```

`node` i Playwright są potrzebne tylko autorowi testów. Uczeń potrzebuje
przeglądarki, a dla serii 4xx lokalnego XAMPP.
