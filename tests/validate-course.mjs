import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root = new URL('../', import.meta.url).pathname.replace(/^\/(.:)/, '$1');
const failures = [];

const requiredFiles = [
  'README.md',
  'STUDENT_SETUP.md',
  'database/web_grounding.sql',
  '01-html-podstawy/index.html',
  '01-html-podstawy/style.css',
  '02-html-formularz/index.html',
  '02-html-formularz/style.css',
  '03-php-podstawy/index.php',
  '04-php-lista-z-bazy/index.php',
  '05-php-formularz-i-select/index.php',
  '06-php-json-do-javascriptu/index.html',
  '06-php-json-do-javascriptu/api.php',
  '06-php-json-do-javascriptu/app.js',
  '07-flexbox-sandbox/index.html',
  '07-flexbox-sandbox/style.css',
  '07-flexbox-sandbox/README.md',
  '08-flexbox-wlasny-layout/index.html',
  '08-flexbox-wlasny-layout/style.css',
  '08-flexbox-wlasny-layout/README.md',
  '09-flexbox-wiecej-mozliwosci/index.html',
  '09-flexbox-wiecej-mozliwosci/style.css',
  '09-flexbox-wiecej-mozliwosci/README.md',
  '10-javascript-podstawy/index.html',
  '10-javascript-podstawy/style.css',
  '10-javascript-podstawy/app.js',
  '10-javascript-podstawy/README.md',
  '11-javascript-dom-i-formularz/index.html',
  '11-javascript-dom-i-formularz/style.css',
  '11-javascript-dom-i-formularz/app.js',
  '11-javascript-dom-i-formularz/README.md',
  '12-bootstrap-lokalnie/index.html',
  '12-bootstrap-lokalnie/README.md',
  'assets/bootstrap/bootstrap.min.css',
  'assets/bootstrap/LICENSE'
];

for (const relativePath of requiredFiles) {
  if (!existsSync(join(root, relativePath))) {
    failures.push(`Brak pliku: ${relativePath}`);
  }
}

function read(relativePath) {
  const path = join(root, relativePath);
  return existsSync(path) ? readFileSync(path, 'utf8') : '';
}

function requirePattern(relativePath, pattern, message) {
  if (!pattern.test(read(relativePath))) {
    failures.push(`${relativePath}: ${message}`);
  }
}

for (const page of [
  '01-html-podstawy/index.html',
  '02-html-formularz/index.html',
  '06-php-json-do-javascriptu/index.html',
  '07-flexbox-sandbox/index.html',
  '08-flexbox-wlasny-layout/index.html',
  '09-flexbox-wiecej-mozliwosci/index.html',
  '10-javascript-podstawy/index.html',
  '11-javascript-dom-i-formularz/index.html',
  '12-bootstrap-lokalnie/index.html'
]) {
  requirePattern(page, /<!doctype html>/i, 'brak deklaracji HTML5');
  requirePattern(page, /<html\s+lang="pl"/i, 'brak języka polskiego');
  requirePattern(page, /<meta\s+name="viewport"/i, 'brak viewportu');
  requirePattern(page, /<main[\s>]/i, 'brak elementu main');
}

for (const lesson of [
  '01-html-podstawy',
  '02-html-formularz',
  '03-php-podstawy',
  '04-php-lista-z-bazy',
  '05-php-formularz-i-select',
  '06-php-json-do-javascriptu',
  '07-flexbox-sandbox',
  '08-flexbox-wlasny-layout',
  '09-flexbox-wiecej-mozliwosci',
  '10-javascript-podstawy',
  '11-javascript-dom-i-formularz',
  '12-bootstrap-lokalnie'
]) {
  const lessonReadme = read(`${lesson}/README.md`);
  for (const heading of ['## Czego się nauczysz', '## HTML', '## CSS', '## JavaScript', '## Biblioteki']) {
    if (!lessonReadme.includes(heading)) {
      failures.push(`${lesson}/README.md: brak sekcji ${heading}`);
    }
  }
}

requirePattern('02-html-formularz/index.html', /<label\s+for="[^"]+"/i, 'formularz potrzebuje etykiety powiązanej z polem');
requirePattern('03-php-podstawy/index.php', /<\?php[\s\S]*\$[a-z_]+/i, 'brak podstawowej składni PHP');

const flexboxSandboxCss = read('07-flexbox-sandbox/style.css');
for (const declaration of ['display: flex', 'flex-direction:', 'justify-content:', 'align-items:', 'gap:', 'flex-grow:']) {
  if (!flexboxSandboxCss.includes(declaration)) {
    failures.push(`07-flexbox-sandbox/style.css: brak przykładu ${declaration}`);
  }
}
requirePattern('07-flexbox-sandbox/style.css', /:has\s*\(/, 'sandbox powinien reagować na kontrolki bez JavaScriptu');
requirePattern('07-flexbox-sandbox/index.html', /type="radio"/i, 'sandbox potrzebuje kontrolek wyboru');

requirePattern('08-flexbox-wlasny-layout/style.css', /display:\s*flex/i, 'własny layout powinien używać Flexboxa');
requirePattern('08-flexbox-wlasny-layout/index.html', /<nav[\s>]/i, 'własny layout powinien zawierać nawigację');

const advancedFlexCss = read('09-flexbox-wiecej-mozliwosci/style.css');
for (const declaration of ['flex-wrap:', 'flex-basis:', 'align-self:', 'order:']) {
  if (!advancedFlexCss.includes(declaration)) {
    failures.push(`09-flexbox-wiecej-mozliwosci/style.css: brak przykładu ${declaration}`);
  }
}

const basicsJs = read('10-javascript-podstawy/app.js');
for (const syntax of ['const ', 'let ', 'if (', 'for (const ', 'function ']) {
  if (!basicsJs.includes(syntax)) {
    failures.push(`10-javascript-podstawy/app.js: brak przykładu ${syntax.trim()}`);
  }
}

const domJs = read('11-javascript-dom-i-formularz/app.js');
for (const browserApi of ['querySelector(', 'addEventListener(', 'preventDefault(', 'createElement(', '.textContent', '.append(']) {
  if (!domJs.includes(browserApi)) {
    failures.push(`11-javascript-dom-i-formularz/app.js: brak przykładu ${browserApi}`);
  }
}

requirePattern('12-bootstrap-lokalnie/index.html', /href="\.\.\/assets\/bootstrap\/bootstrap\.min\.css"/i, 'Bootstrap powinien być dołączony z lokalnego pliku');
if (/https?:\/\//i.test(read('12-bootstrap-lokalnie/index.html'))) {
  failures.push('12-bootstrap-lokalnie/index.html: przykład nie powinien zależeć od CDN');
}

for (const page of ['04-php-lista-z-bazy/index.php', '06-php-json-do-javascriptu/api.php']) {
  requirePattern(page, /mysqli_connect\s*\(/, 'brak połączenia mysqli');
  requirePattern(page, /mysqli_query\s*\(/, 'brak zapytania mysqli');
  requirePattern(page, /mysqli_fetch_assoc\s*\(/, 'brak pobierania rekordów');
  requirePattern(page, /mysqli_close\s*\(/, 'brak zamknięcia połączenia');
}

const formPhp = read('05-php-formularz-i-select/index.php');
for (const functionName of ['mysqli_prepare', 'mysqli_stmt_bind_param', 'mysqli_stmt_execute', 'mysqli_stmt_get_result']) {
  if (!formPhp.includes(`${functionName}(`)) {
    failures.push(`05-php-formularz-i-select/index.php: brak ${functionName}`);
  }
}
if (!formPhp.includes('htmlspecialchars(')) {
  failures.push('05-php-formularz-i-select/index.php: brak kodowania HTML');
}

requirePattern('06-php-json-do-javascriptu/api.php', /Content-Type:\s*application\/json;\s*charset=utf-8/i, 'brak nagłówka JSON UTF-8');
requirePattern('06-php-json-do-javascriptu/api.php', /json_encode\s*\(/, 'brak json_encode');
requirePattern('06-php-json-do-javascriptu/app.js', /fetch\s*\(\s*['"]api\.php['"]\s*\)/, 'brak pobierania api.php');
requirePattern('06-php-json-do-javascriptu/app.js', /\.textContent\s*=/, 'dane powinny trafiać do textContent');
if (/\.innerHTML\s*=/.test(read('06-php-json-do-javascriptu/app.js'))) {
  failures.push('06-php-json-do-javascriptu/app.js: nie używaj innerHTML dla danych z API');
}

requirePattern('database/web_grounding.sql', /CREATE\s+DATABASE\s+IF\s+NOT\s+EXISTS\s+web_grounding/i, 'brak tworzenia bazy web_grounding');
requirePattern('README.md', /INF\.03/i, 'brak kontekstu INF.03');
requirePattern('README.md', /JSON[\s\S]*(arkusz|egzamin)/i, 'brak ostrzeżenia egzaminacyjnego dla JSON');

if (failures.length > 0) {
  console.error('FAIL: kontrakt kursu nie jest spełniony');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`PASS: kontrakt kursu (${requiredFiles.length} wymaganych plików)`);
