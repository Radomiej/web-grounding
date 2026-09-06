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
  '06-php-json-do-javascriptu/app.js'
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

for (const page of ['01-html-podstawy/index.html', '02-html-formularz/index.html', '06-php-json-do-javascriptu/index.html']) {
  requirePattern(page, /<!doctype html>/i, 'brak deklaracji HTML5');
  requirePattern(page, /<html\s+lang="pl"/i, 'brak języka polskiego');
  requirePattern(page, /<meta\s+name="viewport"/i, 'brak viewportu');
  requirePattern(page, /<main[\s>]/i, 'brak elementu main');
}

requirePattern('02-html-formularz/index.html', /<label\s+for="[^"]+"/i, 'formularz potrzebuje etykiety powiązanej z polem');
requirePattern('03-php-podstawy/index.php', /<\?php[\s\S]*\$[a-z_]+/i, 'brak podstawowej składni PHP');

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
