# 2026-09-16 — kanoniczne serie kursu 1xx–4xx i progresja Canvas/PHP

## Purpose

Uporządkować kurs web-grounding według tematów: czysty HTML `1xx`, CSS/Flexbox/
Grid `2xx`, JavaScript/Canvas `3xx` oraz PHP/MySQL/JSON `4xx`. Dodać lekcje,
które prowadzą od małych modyfikacji do pełnych zadań INF.03, bez usuwania
wcześniejszych ścieżek zgodności. W rewizji z 2026-09-16 PHP zostało rozdzielone
na osadzane renderowanie `401–407` i późniejszy dodatek API `408–412`.

## Scope and constraints

- Kanoniczne serie obejmują 39 lekcji: 6 HTML, 7 CSS, 14 JavaScript/Canvas i 12 PHP
  (7 osadzanych oraz 5 API/JSON).
- Stare foldery pozostają lokalnymi aliasami. Pliki API, które wcześniej
  znajdowały się obok lekcji osadzanych, przeniesiono przez kopię do `408–412`,
  więc działanie zachowano bez mieszania dwóch sposobów renderowania.
- Seria `1xx` jest czystym HTML bez CSS i JavaScriptu.
- Bootstrap jest ładowany wyłącznie z `assets/bootstrap/bootstrap.min.css`.
- PHP wymaga lokalnego XAMPP/MySQL; nie wykonywano wdrożenia ani zmian w zewnętrznych systemach.
- Duże archiwa egzaminacyjne pozostają poza śledzeniem zgodnie z `.gitignore`.
- W odczytanych bazach AKS, Projects i Linear nie znaleziono jednoznacznego
  rekordu `web-grounding`; zgodnie z regułą nie tworzono ani nie aktualizowano
  zewnętrznego projektu/tasku. Ten lokalny wpis jest handoffem `sync-pending`.

## Acceptance criteria

| ID | Kryterium | Status | Dowód |
| --- | --- | --- | --- |
| AC-01 | Kanoniczne lekcje i README mają wymagany kontrakt. | PASS | `node tests/validate-course.mjs` — `39 canonical lessons + aliases`. |
| AC-02 | Sandbox wyjaśnia main/cross axis, wrap, gap, justify, grow, child oraz CSS rodzica/dziecka. | PASS | Chrome przez lokalny HTTP: stan `wrap + center + space-between`, szerokość 260 px, dodanie dziecka i aktualny eksport `.layout`/`.item-5`. |
| AC-03 | Lekcja 204 jasno rozdziela `align-items` (dzieci w linii) i `align-content` (całe linie). | PASS | AX tree pokazuje trzy porównywalne panele, kod obu stanów i opis ruchu krótszych dzieci vs drugiej linii. |
| AC-04 | JavaScript prowadzi przez klasy/theme, timer, Canvas i HUD/gra. | PASS | Chrome: theme zmienił stan na „Motyw ciemny”, timer `01:00 → 00:59`, Canvas ma scenę, HUD ma punkty/życia/pauzę/restart. |
| AC-05 | Bootstrap działa lokalnie bez CDN. | PASS | Browser evaluate potwierdził stylesheet `/assets/bootstrap/bootstrap.min.css`; strona 207 wyrenderowała formularz i karty. |
| AC-06 | Dokumentacja, plan INF.03/INF.04, generator 9xx i testy są spięte z nowymi ścieżkami. | PASS | `README.md`, `STUDENT_SETUP.md`, `docs/plan-nauki-inf03-inf04.md`, README lekcji oraz zaktualizowane testy. |
| AC-07 | Składnia JavaScriptu i białe znaki przechodzą kontrolę. | PASS | `node --check` dla 18 plików; `git diff --check` bez błędów treści. |

## Starting evidence

Repozytorium zawierało wcześniejsze lekcje `01–22`, rozproszone przykłady PHP,
Flexbox/Canvas i materiały egzaminacyjne. Numeracja nie tworzyła jednej ścieżki
tematycznej, a nowe zadania wymagały doprecyzowania kryteriów i linków.

## Investigation or execution method

Odczytano AKS `00–05` oraz Hub i sprawdzono Projects/Linear; nie było rekordu
`web-grounding`, więc synchronizację zewnętrzną pozostawiono bez zapisu.
Przejrzano znane pliki kursu, README, generator, dokumentację egzaminacyjną i
testy. Zmiany wprowadzono przez `apply_patch` oraz zachowawcze skopiowanie
istniejących lekcji API do nowych, kanonicznych folderów `408–412`; z folderów
osadzanych usunięto tylko powielone pliki API. Następnie uruchomiono
walidator kontraktu, kontrolę składni Node i lokalny serwer HTTP; interakcje
sprawdzono w Chrome przez drzewo dostępności, DOM oraz screenshot HUD.

## Root causes and decisions

- Obserwowana potrzeba: uczeń bez PHP ma móc przejść pełny frontend. Decyzja:
  osobna numeracja `1xx–3xx`, a PHP jako opcjonalna seria `4xx`.
- Obserwowany problem Flexboxa: `align-items` i `align-content` były trudne do
  odróżnienia. Decyzja: sandbox pokazuje oba CSS-y na żywo, a lekcja 204 ma trzy
  identyczne kontenery z jedną zmianą na panel.
- Obserwowany problem nawigacji: kopiowane lekcje wskazywały stare numery. Decyzja:
  kanoniczne linki prowadzą przez HTML → CSS → JS → Canvas oraz PHP osadzane
  `401–407` → API/JSON `408–412`; stare ścieżki zachowano jako aliasy.
- Ograniczenie środowiska: brak PHP i Playwright. Decyzja: nie instalować zależności
  ani nie udawać dynamicznego dowodu; pozostawić jasną granicę XAMPP/Playwright.

## Implementation sequence

1. Dodano HTML `102–106` oraz zrewidowano tabelę, formularze, media i dostępność.
2. Uporządkowano CSS `201–207`: box model, sandbox Flexbox, Grid, komponenty raw CSS i Bootstrap lokalny.
3. Dodano progresję JavaScript `303–312`, projekt INF.03 oraz Canvas `313–314` z HUD-em absolutnym.
4. Przeniesiono PHP do kanonicznego CRUD `401–407` z renderowaniem HTML,
   prepared statements i iteracją rekordów; API/JSON przeniesiono do osobnej
   końcówki `408–412`.
5. Zaktualizowano README, instrukcję ucznia, plan nauki, generator 9xx oraz testy autora.

## Flow diagram

```mermaid
flowchart LR
    H[101–106 czysty HTML] --> C[201 CSS i box model]
    C --> F[202–204 Flexbox]
    F --> G[205 Grid]
    G --> K[206 komponenty raw CSS]
    K --> B[207 Bootstrap lokalny]
    H --> J[301–312 JavaScript DOM, klasy, zapis, timer]
    J --> V[313 Canvas 2D]
    V --> U[314 absolutny HUD i prosta gra]
    H --> P[401–407 PHP osadzane: składnia, SELECT i CRUD]
    P --> R[HTML z pętli while/foreach]
    R --> Q[408–412 API/JSON: fetch i CRUD]
```

## Files and boundaries changed

- Nowe kanoniczne katalogi lekcji `101–106`, `201–207`, `301–314`, `401–407`
  oraz `408–412`.
- `README.md`, `STUDENT_SETUP.md`, `docs/css-lekcji.md` i `docs/plan-nauki-inf03-inf04.md`.
- `tests/validate-course.mjs` i `tests/frontend-browser.cjs`.
- Zachowane katalogi zgodności, `docs/inf03`, `docs/inf04`, lekkie paczki oraz lokalny Bootstrap.

## Verification evidence

- `node tests/validate-course.mjs` — PASS: 39 lekcji kanonicznych + aliasy oraz lokalne odnośniki.
- Walidator wymusza także kolejność PHP osadzanego `401–407` przed API `408–412`
  w README, instrukcji ucznia i planie nauki oraz odrzuca pliki API w folderach
  osadzanych.
- `node --check` — PASS: 56 plików JavaScript, w tym test autora.
- Chrome/local HTTP — PASS: sandbox Flexbox, porównanie 204, theme, timer, Canvas,
  HUD/gra, Bootstrap oraz statyczne strony 408/409 z nową nawigacją API.
- Git delivery — PASS: `git push origin features/v2`, a następnie
  `git ls-remote --heads origin features/v2` zwrócił
  `e195398347b42d013db5830774c3732b5eed8483`.
- `git diff --check` — brak błędów treści; Git zgłosił tylko ostrzeżenia LF/CRLF i brak dostępu do globalnego ignore.

## Caveats and inconclusive checks

- `node tests/frontend-browser.cjs` jest BLOCKED: moduł `playwright` nie jest zainstalowany (`MODULE_NOT_FOUND`).
- `php -l` i żądania PHP są BLOCKED: brak `php.exe`, Apache i MySQL w środowisku wykonawczym.
- Sprawdzenie Chrome było lokalne; nie jest dowodem wdrożenia, hostingu ani produkcji.
- Wcześniejsza dostawa jest zapisana w commitach `a1f7d5e` i `b0eb6d8`.
  Rewizję numeracji PHP zapisano w `68cab8e`, a porządkowanie końców plików
  w `e195398`; oba commity są na `features/v2`, a zdalny ref został sprawdzony
  bezpośrednio.

## Remaining boundary and production closure

Przed uznaniem serii PHP za uruchomioną w środowisku ucznia trzeba w XAMPP
zaimportować `database/web_grounding.sql`, wykonać `php -l` dla `401–412` i
przejść scenariusze sukcesu, pustego wyniku, błędnych danych oraz nieistniejącego
ID. W `401–407` trzeba sprawdzić wyrenderowany HTML, a w `408–412` odpowiedzi
JSON i kody HTTP. Opcjonalnie należy doinstalować zależności autora i uruchomić
`node tests/frontend-browser.cjs`. Brak działań produkcyjnych pozostaje zamierzony.
Synchronizacja do Linear/Notion pozostaje `sync-pending`, ponieważ nie ma
zweryfikowanego mapowania repozytorium na projekt. Sam kod i dokumentacja są
zatwierdzone i wypchnięte na `origin/features/v2`.
