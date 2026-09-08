# Weryfikacja autora

Uczeń otwiera HTML. Poniższe zależności są wyłącznie do testów autora.

## Kontrakt i odnośniki

```powershell
node tests/validate-course.mjs
```

Test sprawdza pliki, sekcje README, lokalne odnośniki, podstawy HTML i zachowane kontrakty PHP. Nie zastępuje testu przeglądarkowego.

## Przeglądarka

Wymagane: Node, Playwright z Chromium oraz axe-core. Można użyć istniejącej instalacji przez NODE_PATH albo odizolowanego katalogu ignorowanego przez Git:

```powershell
npm.cmd install --prefix .test-results/tooling --no-save --package-lock=false playwright axe-core
npm.cmd exec --prefix .test-results/tooling -- playwright install chromium
$env:NODE_PATH = (Resolve-Path .test-results/tooling/node_modules).Path
node tests/frontend-browser.cjs
```

Test sam uruchamia serwer na wolnym porcie 127.0.0.1 i zamyka serwer oraz przeglądarkę po zakończeniu. Zrzuty i wyeksportowany layout trafiają do .test-results (lub COURSE_PROOF_DIR).

Zakres: Chromium 390×844 i 1440×900, DPR 2, lokalny HTTP i file://, axe WCAG A/AA, osie Flexbox, 0–20 dzieci, presety i geometria eksportu, formularze, galerie, storage uszkodzony/niedostępny, projekt 20, Canvas i HUD, klawiatura i dotyk. Błędy runtime przechwytujemy ze wszystkich stron. Brak obrazu/Canvas jest celowo symulowany.

Kod testów używa bardziej zaawansowanego JavaScriptu niż lekcje i nie jest obowiązkowym materiałem ucznia. PHP/XAMPP, Firefox i Safari nie są objęte tą suite.
