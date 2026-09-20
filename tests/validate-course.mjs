import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const failures = [];

const htmlLessons = [
    '101-html-podstawy',
    '102-html-tekst-i-listy',
    '103-html-struktura-strony',
    '104-html-tabele',
    '105-html-formularze',
    '106-html-media-i-dostepnosc',
];
const cssLessons = [
    '201-css-podstawy',
    '202-css-flexbox-sandbox',
    '203-css-flexbox-wlasny-layout',
    '204-css-flexbox-wiecej-mozliwosci',
    '205-css-grid',
    '206-css-komponenty',
    '207-css-bootstrap-lokalnie',
];
const jsLessons = [
    '301-javascript-podstawy',
    '302-javascript-dom-i-formularz',
    '303-javascript-klasy-i-theme',
    '304-javascript-kalkulator',
    '305-javascript-warunki',
    '306-javascript-walidacja',
    '307-javascript-petle-tablice',
    '308-javascript-galeria',
    '309-javascript-lista',
    '310-javascript-zapis',
    '311-javascript-projekt-inf03',
    '312-javascript-timer',
    '313-canvas-podstawy',
    '314-canvas-hud-gra',
];
const phpEmbeddedLessons = [
    '401-php-podstawy',
    '402-php-czytanie-bazy',
    '403-php-formularz-i-select',
    '404-php-insert',
    '405-php-filtrowanie',
    '406-php-update',
    '407-php-delete',
];
const phpApiLessons = [
    '408-php-api-json',
    '409-php-api-insert',
    '410-php-api-filtrowanie',
    '411-php-api-update',
    '412-php-api-delete',
];
const phpLessons = [...phpEmbeddedLessons, ...phpApiLessons];
const supportLessons = ['901-generator-zadan', '902-przygotowanie-zadania'];
const courseLessons = [...htmlLessons, ...cssLessons, ...jsLessons, ...phpLessons, ...supportLessons];

const numberedFolders = readdirSync(root, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && /^\d+/.test(entry.name))
    .map((entry) => entry.name);
const foldersByNumber = new Map();
for (const folder of numberedFolders) {
    const number = Number.parseInt(folder.match(/^\d+/)[0], 10);
    const folders = foldersByNumber.get(number) ?? [];
    folders.push(folder);
    foldersByNumber.set(number, folders);
    if (number < 100) failures.push(`Folder poniżej 100: ${folder}`);
}
for (const [number, folders] of foldersByNumber) {
    if (folders.length > 1) failures.push(`Kolizja numeru ${number}: ${folders.join(', ')}`);
}

function path(relative) { return join(root, relative); }
function read(relative) {
    const file = path(relative);
    return existsSync(file) ? readFileSync(file, 'utf8') : '';
}
function requireFile(relative) {
    if (!existsSync(path(relative))) failures.push(`Brak pliku: ${relative}`);
}
function requirePattern(relative, pattern, message) {
    if (!pattern.test(read(relative))) failures.push(`${relative}: ${message}`);
}

requireFile('README.md');
requireFile('STUDENT_SETUP.md');
requireFile('database/web_grounding.sql');
requireFile('assets/bootstrap/bootstrap.min.css');
requireFile('assets/bootstrap/LICENSE');
for (const lesson of htmlLessons) {
    requireFile(`${lesson}/index.html`);
    requireFile(`${lesson}/README.md`);
}
for (const lesson of cssLessons) {
    requireFile(`${lesson}/index.html`);
    requireFile(`${lesson}/README.md`);
    if (lesson !== '207-css-bootstrap-lokalnie') requireFile(`${lesson}/style.css`);
}
for (const lesson of jsLessons) {
    requireFile(`${lesson}/index.html`);
    requireFile(`${lesson}/style.css`);
    requireFile(`${lesson}/app.js`);
    requireFile(`${lesson}/README.md`);
}
for (const file of [
    '311-javascript-projekt-inf03/start/index.html',
    '311-javascript-projekt-inf03/start/style.css',
    '311-javascript-projekt-inf03/start/app.js',
]) requireFile(file);
for (const lesson of phpLessons) requireFile(`${lesson}/README.md`);
for (const lesson of phpEmbeddedLessons) requireFile(`${lesson}/index.php`);
for (const lesson of phpEmbeddedLessons) {
    for (const file of ['api.php', 'app.js']) {
        if (existsSync(path(`${lesson}/${file}`))) failures.push(`${lesson}: ścieżka osadzana nie powinna zawierać ${file}`);
    }
}
for (const lesson of phpApiLessons) {
    for (const file of ['index.html', 'app.js', 'api.php']) requireFile(`${lesson}/${file}`);
    if (lesson !== '408-php-api-json') requireFile(`${lesson}/style.css`);
}
for (const lesson of supportLessons) requireFile(`${lesson}/README.md`);
for (const file of ['901-generator-zadan/index.html', '901-generator-zadan/style.css', '901-generator-zadan/app.js', '902-przygotowanie-zadania/index.html', '902-przygotowanie-zadania/style.css', '902-przygotowanie-zadania/app.js']) requireFile(file);

for (const page of [
    ...htmlLessons.map((lesson) => `${lesson}/index.html`),
    ...cssLessons.map((lesson) => `${lesson}/index.html`),
    ...jsLessons.map((lesson) => `${lesson}/index.html`),
    ...phpApiLessons.map((lesson) => `${lesson}/index.html`),
    '901-generator-zadan/index.html',
    '902-przygotowanie-zadania/index.html',
]) {
    requirePattern(page, /<!doctype html>/i, 'brak deklaracji HTML5');
    requirePattern(page, /<html\s+lang="pl"/i, 'brak języka polskiego');
    requirePattern(page, /<meta\s+name="viewport"/i, 'brak viewportu');
    requirePattern(page, /<main[\s>]/i, 'brak elementu main');
}

for (const page of htmlLessons.map((lesson) => `${lesson}/index.html`)) {
    if (/rel=["']stylesheet|<style\b|<script\b/i.test(read(page))) {
        failures.push(`${page}: seria 1xx ma pozostać czystym HTML bez CSS i JavaScriptu`);
    }
}

for (const lesson of courseLessons) {
    const content = read(`${lesson}/README.md`);
    for (const heading of ['## Czego się nauczysz', '## HTML', '## CSS', '## JavaScript', '## Biblioteki']) {
        if (!content.includes(heading)) failures.push(`${lesson}/README.md: brak sekcji ${heading}`);
    }
    if (!/## Zadanie(?: do wykonania)?/.test(content)) failures.push(`${lesson}/README.md: brak zadania modyfikacyjnego`);
    if (!/## Kryteria zaliczenia|## Sprawdź się/.test(content)) failures.push(`${lesson}/README.md: brak kryteriów zaliczenia`);
}

requirePattern('201-css-podstawy/style.css', /background-color|background:/, 'brak kolorów/tła');
requirePattern('201-css-podstawy/style.css', /padding:/, 'brak paddingu');
requirePattern('201-css-podstawy/style.css', /border-radius:/, 'brak zaokrąglenia');
const flexSandbox = read('202-css-flexbox-sandbox/app.js');
for (const term of ['align-items', 'align-content', 'flex-grow', 'flex-basis', 'parent-css', 'child-css']) {
    if (!flexSandbox.includes(term)) failures.push(`202-css-flexbox-sandbox: brak ${term}`);
}
requirePattern('205-css-grid/style.css', /display:\s*grid/, 'brak display:grid');
requirePattern('205-css-grid/style.css', /grid-template-columns/, 'brak kolumn Grid');
requirePattern('207-css-bootstrap-lokalnie/index.html', /\.\.\/assets\/bootstrap\/bootstrap\.min\.css/, 'brak lokalnego Bootstrapa');
if (/https?:\/\//i.test(read('207-css-bootstrap-lokalnie/index.html'))) failures.push('207-css-bootstrap-lokalnie: nie używaj CDN');

requirePattern('303-javascript-klasy-i-theme/app.js', /classList\.toggle/, 'brak przełączania klas');
requirePattern('312-javascript-timer/app.js', /setInterval|clearInterval/, 'brak timera');
requirePattern('313-canvas-podstawy/app.js', /getContext\(['"]2d['"]\)/, 'brak Canvas 2D');
requirePattern('314-canvas-hud-gra/app.js', /requestAnimationFrame/, 'brak pętli animacji');
requirePattern('314-canvas-hud-gra/style.css', /position:\s*absolute/, 'brak absolutnego HUD');

requirePattern('401-php-podstawy/index.php', /<\?php[\s\S]*\$[a-z_]+/i, 'brak podstawowej składni PHP');
requirePattern('402-php-czytanie-bazy/index.php', /SELECT\s+id/i, 'brak SELECT');
requirePattern('404-php-insert/index.php', /INSERT\s+INTO/i, 'brak INSERT');
requirePattern('405-php-filtrowanie/index.php', /LIKE\s+\?/i, 'brak bezpiecznego LIKE');
requirePattern('406-php-update/index.php', /UPDATE\s+offers/i, 'brak UPDATE');
requirePattern('407-php-delete/index.php', /DELETE\s+FROM/i, 'brak DELETE');
requirePattern('408-php-api-json/api.php', /Content-Type:\s*application\/json/i, 'brak nagłówka JSON');
requirePattern('408-php-api-json/app.js', /fetch\s*\(/, 'brak fetch JSON');
requirePattern('409-php-api-insert/api.php', /INSERT\s+INTO/i, 'brak API INSERT');
requirePattern('410-php-api-filtrowanie/api.php', /LIKE\s+\?/i, 'brak API LIKE');
requirePattern('411-php-api-update/api.php', /UPDATE\s+offers/i, 'brak API UPDATE');
requirePattern('412-php-api-delete/api.php', /DELETE\s+FROM/i, 'brak API DELETE');

requirePattern('README.md', /INF\.03/i, 'brak kontekstu INF.03');
requirePattern('README.md', /JSON/i, 'brak opisu JSON');
requirePattern('docs/plan-nauki-inf03-inf04.md', /101[–-]106/, 'plan nauki nie wskazuje rozszerzonego HTML');
requirePattern('README.md', /401[\s\S]*407[\s\S]*408[\s\S]*412/i, 'README nie rozdziela PHP osadzanego od API');
requirePattern('STUDENT_SETUP.md', /401[\s\S]*407[\s\S]*408[\s\S]*412/i, 'instrukcja ucznia nie rozdziela PHP osadzanego od API');
requirePattern('docs/plan-nauki-inf03-inf04.md', /401[\s\S]*407[\s\S]*408[\s\S]*412/i, 'plan nauki nie rozdziela PHP osadzanego od API');
requirePattern('901-generator-zadan/app.js', /313-canvas-podstawy|314-canvas-hud-gra/, 'generator nie wskazuje nowych lekcji Canvas');

function checkLocalLinks(relativeFiles) {
    const linkPattern = /(?:href|src)=["']([^"']+)["']|\]\(([^)]+)\)/g;
    for (const source of relativeFiles) {
        const content = read(source);
        for (const match of content.matchAll(linkPattern)) {
            const target = (match[1] || match[2] || '').split('#')[0].split('?')[0].trim();
            if (!target || target === '...' || target.startsWith('#') || /^(?:https?:|mailto:|javascript:|data:)/i.test(target)) continue;
            const candidate = path(target.startsWith('/') ? target.slice(1) : join(source, '..', target));
            const candidates = [
                candidate,
                join(candidate, 'index.html'),
                join(candidate, 'index.php'),
                join(candidate, 'README.md'),
            ];
            if (!candidates.some((item) => existsSync(item))) {
                failures.push(`${source}: niedziałający lokalny odnośnik ${target}`);
            }
        }
    }
}

checkLocalLinks([
    'README.md',
    'STUDENT_SETUP.md',
    'docs/plan-nauki-inf03-inf04.md',
    'docs/egzaminy-inf03-inf04.md',
    'docs/inf03/README.md',
    'docs/inf03/arkusze.md',
    'docs/inf04/README.md',
    'docs/inf04/arkusze.md',
    ...[...htmlLessons, ...cssLessons, ...jsLessons, ...phpLessons].flatMap((lesson) => [
        `${lesson}/index.html`,
        `${lesson}/index.php`,
        `${lesson}/README.md`,
    ]),
    '901-generator-zadan/index.html',
    '901-generator-zadan/README.md',
    '902-przygotowanie-zadania/index.html',
    '902-przygotowanie-zadania/README.md',
]);

if (failures.length > 0) {
    console.error(failures.map((failure) => `FAIL: ${failure}`).join('\n'));
    process.exitCode = 1;
} else {
    console.log(`PASS: kontrakt kursu (${htmlLessons.length + cssLessons.length + jsLessons.length + phpLessons.length} canonical lessons + ${supportLessons.length} support lessons; unique numeric prefixes)`);
}
