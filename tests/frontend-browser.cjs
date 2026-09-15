// Author-only browser proof. Requires Playwright and axe-core in the author's environment.
const { chromium } = require('playwright');
const axeSource = require('axe-core').source;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');

const root = path.resolve(__dirname, '..');
const folders = [
    '101-html-podstawy', '102-html-tekst-i-listy', '103-html-struktura-strony',
    '104-html-tabele', '105-html-formularze', '106-html-media-i-dostepnosc',
    '201-css-podstawy', '202-css-flexbox-sandbox', '203-css-flexbox-wlasny-layout',
    '204-css-flexbox-wiecej-mozliwosci', '205-css-grid', '206-css-komponenty',
    '207-css-bootstrap-lokalnie', '301-javascript-podstawy', '302-javascript-dom-i-formularz',
    '303-javascript-klasy-i-theme', '304-javascript-kalkulator', '305-javascript-warunki',
    '306-javascript-walidacja', '307-javascript-petle-tablice', '308-javascript-galeria',
    '309-javascript-lista', '310-javascript-zapis', '311-javascript-projekt-inf03',
    '312-javascript-timer', '313-canvas-podstawy', '314-canvas-hud-gra',
    '901-generator-zadan', '902-przygotowanie-zadania',
];
const output = process.env.COURSE_PROOF_DIR || path.join(root, '.test-results');
fs.mkdirSync(output, { recursive: true });
const server = http.createServer((request, response) => {
    const file = path.resolve(root, '.' + decodeURIComponent(new URL(request.url, 'http://localhost').pathname));
    if (!file.startsWith(root + path.sep)) return response.writeHead(403).end();
    try {
        const target = fs.statSync(file).isDirectory() ? path.join(file, 'index.html') : file;
        const mime = { '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.md': 'text/plain' }[path.extname(target)] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': mime + '; charset=utf-8' });
        response.end(fs.readFileSync(target));
    } catch { response.writeHead(404).end(); }
});

let browser;
let assertions = 0;
function check(value, message) { assert.ok(value, message); assertions += 1; }

(async () => {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const base = 'http://127.0.0.1:' + server.address().port;
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    const errors = [];
    context.on('page', (tab) => tab.on('pageerror', (error) => errors.push(error.message)));
    const page = await context.newPage();

    for (const width of [390, 1440]) {
        await page.setViewportSize({ width, height: width === 390 ? 844 : 900 });
        for (const name of folders) {
            await page.goto(`${base}/${name}/index.html`);
            await page.addScriptTag({ content: axeSource });
            const violations = await page.evaluate(async () => (await axe.run({ runOnly: { type: 'tag', values: ['wcag2a', 'wcag2aa', 'wcag21aa'] } })).violations);
            check(violations.length === 0, `${name} accessibility: ${JSON.stringify(violations.map((item) => item.id))}`);
            check(await page.locator('main').count() === 1, `${name} main`);
            check(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1), `${name} overflow ${width}`);
        }
    }

    await page.goto(`${base}/202-css-flexbox-sandbox/index.html`);
    await page.selectOption('select[name="wrap"]', 'wrap');
    await page.selectOption('select[name="content"]', 'space-between');
    await page.click('#add');
    check((await page.locator('#sandbox > *').count()) >= 5, 'Flexbox add child');
    check((await page.locator('#parent-css').textContent()).includes('align-content: space-between'), 'Flexbox parent CSS');
    check((await page.locator('#child-css').textContent()).includes('flex-grow'), 'Flexbox child CSS');

    await page.goto(`${base}/303-javascript-klasy-i-theme/index.html`);
    await page.click('#theme-toggle');
    check(await page.locator('body').evaluate((element) => element.classList.contains('dark')), 'theme class');
    check((await page.locator('#theme-toggle').getAttribute('aria-pressed')) === 'true', 'theme aria');

    await page.goto(`${base}/312-javascript-timer/index.html`);
    await page.click('#start');
    await page.waitForTimeout(1100);
    check((await page.locator('#display').textContent()) !== '01:00', 'timer ticks');
    await page.click('#pause');
    await page.click('#reset');
    check((await page.locator('#display').textContent()) === '01:00', 'timer reset');

    await page.goto(`${base}/313-canvas-podstawy/index.html`);
    check(await page.locator('canvas').evaluate((canvas) => Boolean(canvas.getContext('2d'))), 'Canvas 2D');
    await page.goto(`${base}/314-canvas-hud-gra/index.html`);
    await page.click('#pause');
    check((await page.locator('#pause').getAttribute('aria-pressed')) === 'true', 'game pause');
    await page.click('#restart');
    check((await page.locator('#score').textContent()) === '0', 'game restart');

    await page.goto(`${base}/207-css-bootstrap-lokalnie/index.html`);
    check((await page.locator('link[href*="bootstrap.min.css"]').count()) === 1, 'local Bootstrap');
    check((await page.locator('link[href^="http"]').count()) === 0, 'no Bootstrap CDN');

    const local = await context.newPage();
    await local.goto(pathToFileURL(path.join(root, '303-javascript-klasy-i-theme', 'index.html')).href);
    await local.click('#theme-toggle');
    check(await local.locator('body').evaluate((element) => element.classList.contains('dark')), 'file theme');
    await local.close();
    check(errors.length === 0, 'runtime errors: ' + errors.join('; '));
    console.log(`PASS browser: ${assertions} assertions; 390x844 / 1440x900; HTTP + file; proof ${output}`);
})().catch((error) => { console.error(error); process.exitCode = 1; }).finally(async () => {
    if (browser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
});
