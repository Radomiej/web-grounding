# Web Grounding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Utworzyć samodzielny kurs HTML i minimalnego PHP/MySQL dla XAMPP pod INF.03.

**Architecture:** Każdy numerowany folder jest niezależnym ćwiczeniem. Przykłady `04` i `05` renderują wynik po stronie PHP, a `06` celowo rozdziela endpoint JSON i JavaScript.

**Tech Stack:** HTML5, CSS, JavaScript ES2020, proceduralne PHP `mysqli`, MySQL/MariaDB, XAMPP.

**Spec:** `docs/superpowers/specs/2026-09-06-web-grounding-design.md`

## Global Constraints

- Bez Composer, npm, frameworków, ORM i zewnętrznych zależności.
- Domyślna lokalna baza to `web_grounding`, host `localhost`, użytkownik `root`, puste hasło.
- Dane HTML kodować przez `htmlspecialchars`; dane formularza przekazywać do przygotowanego zapytania.
- W kodzie ucznia preferować proceduralne `mysqli`; `->` tylko wyjaśnić w dokumentacji.
- Nie przedstawiać statycznej kontroli jako dowodu działania XAMPP.

---

### Task 1: Test kontraktu kursu

**Files:**
- Create: `tests/validate-course.mjs`

**Interfaces:**
- Consumes: strukturę folderów ze specyfikacji.
- Produces: proces z kodem `0` po spełnieniu kontraktu albo `1` z listą braków.

- [ ] Utworzyć test, który sprawdza wymagane pliki, semantykę HTML, funkcje `mysqli`, przygotowane zapytanie, `json_encode`, `fetch()` oraz brak `innerHTML`.
- [ ] Uruchomić `node tests/validate-course.mjs` przed implementacją i potwierdzić oczekiwane `FAIL` z brakującymi plikami.
- [ ] Nie łagodzić asercji po implementacji; poprawiać materiały.

### Task 2: Fundament HTML

**Files:**
- Create: `01-html-podstawy/index.html`
- Create: `01-html-podstawy/style.css`
- Create: `01-html-podstawy/README.md`
- Create: `02-html-formularz/index.html`
- Create: `02-html-formularz/style.css`
- Create: `02-html-formularz/README.md`

**Interfaces:**
- Consumes: wyłącznie standardy HTML/CSS przeglądarki.
- Produces: dwa statyczne adresy i wzorce struktury używane przez kolejne strony PHP.

- [ ] Zbudować poprawny szkielet `<!doctype html>`, `lang="pl"`, UTF-8, viewport, `header/main/section/footer`.
- [ ] Dodać listę i odnośnik w ćwiczeniu 01 oraz tabelę i formularz z powiązanymi `label` w ćwiczeniu 02.
- [ ] Dodać prosty responsywny CSS z widocznym fokusem i bez sztywnych wysokości.
- [ ] Uruchomić test kontraktu; oczekiwany pozostaje `FAIL`, ale bez braków dotyczących `01` i `02`.

### Task 3: PHP osadzone w HTML i lista z bazy

**Files:**
- Create: `03-php-podstawy/index.php`
- Create: `03-php-podstawy/README.md`
- Create: `04-php-lista-z-bazy/index.php`
- Create: `04-php-lista-z-bazy/README.md`

**Interfaces:**
- Consumes: tabelę `offers` z bazy `web_grounding`.
- Produces: stronę HTML z listą ofert albo czytelnym komunikatem błędu.

- [ ] Pokazać `$variable`, `if`, `foreach`, `echo` i skrócony zapis `<?= ... ?>` bez funkcji niestandardowych.
- [ ] Połączyć `04` przez `mysqli_connect('localhost', 'root', '', 'web_grounding')`, wykonać stały `SELECT`, iterować `mysqli_fetch_assoc` i zawsze zamknąć połączenie.
- [ ] Kodować każdą wartość z bazy funkcją `htmlspecialchars`.
- [ ] Uruchomić test kontraktu i zachować oczekiwane braki wyłącznie dla późniejszych zadań.

### Task 4: Formularz i most JSON

**Files:**
- Create: `05-php-formularz-i-select/index.php`
- Create: `05-php-formularz-i-select/README.md`
- Create: `06-php-json-do-javascriptu/index.html`
- Create: `06-php-json-do-javascriptu/api.php`
- Create: `06-php-json-do-javascriptu/app.js`
- Create: `06-php-json-do-javascriptu/README.md`

**Interfaces:**
- Consumes: `places.country` i rekordy `offers` z bazy `web_grounding`.
- Produces: wynik filtrowania w HTML oraz JSON `{ "data": [...] }` lub `{ "error": "..." }`.

- [ ] Obsłużyć początkowy GET, pusty/niepoprawny POST oraz poprawny POST przez `mysqli_prepare`, `mysqli_stmt_bind_param` i `mysqli_stmt_get_result`.
- [ ] W `api.php` ustawić `Content-Type: application/json; charset=utf-8`, kody 200/500 i `JSON_UNESCAPED_UNICODE`.
- [ ] W `app.js` obsłużyć loading, sukces, pustą tablicę i wyjątek, budując DOM przez `createElement` oraz `textContent`.
- [ ] Uruchomić test kontraktu; oczekiwany `FAIL` tylko dla dokumentacji/bazy, jeśli jeszcze ich nie ma.

### Task 5: Baza, instrukcja i pełna weryfikacja

**Files:**
- Create: `database/web_grounding.sql`
- Create: `README.md`
- Create: `STUDENT_SETUP.md`
- Create: `.gitignore`

**Interfaces:**
- Consumes: wszystkie adresy i nazwy baz ze wcześniejszych zadań.
- Produces: kompletną ścieżkę `import SQL → skopiuj do htdocs → otwórz localhost`.

- [ ] Utworzyć idempotentny dump bazy `web_grounding` z tabelami `offers` i `places` oraz danymi demonstracyjnymi z polskimi znakami.
- [ ] Opisać uruchomienie Apache/MySQL, phpMyAdmin, `htdocs`, adresy sześciu ćwiczeń i typowe błędy.
- [ ] Wyjaśnić `->`, `=>`, `.`, `[]`, `===` i różnicę między renderowaniem PHP a JSON/JS.
- [ ] Uruchomić `node tests/validate-course.mjs`; oczekiwany `PASS`.
- [ ] Jeżeli PHP istnieje, uruchomić `php -l` na czterech plikach PHP; w przeciwnym razie oznaczyć lint i XAMPP jako `BLOCKED`.
- [ ] Otworzyć statyczne strony na lokalnym serwerze i sprawdzić 390 px oraz desktop, klawiaturę, formularz i brak overflow; dynamiczne dane wymagają XAMPP.
- [ ] Sprawdzić `git status`, brak zagnieżdżonych `.git` oraz dokładny zakres plików.
