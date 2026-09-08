// Author-only integration tests. NODE_PATH may point to an existing Playwright installation.
const { chromium } = require('playwright');
const axeSource = require('axe-core').source;
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const { pathToFileURL } = require('node:url');
const root = path.resolve(__dirname, '..');
const folders = fs
    .readdirSync(root)
    .filter((name) => /^(07|08|09|10|11|1[3-9]|2[0-2])-/.test(name))
    .sort();
const output = process.env.COURSE_PROOF_DIR || path.join(root, '.test-results');
fs.mkdirSync(output, { recursive: true });
const server = http.createServer((request, response) => {
    const file = path.resolve(
        root,
        '.' +
            decodeURIComponent(
                new URL(request.url, 'http://localhost').pathname,
            ),
    );
    if (!file.startsWith(root + path.sep)) {
        response.writeHead(403).end();
        return;
    }
    try {
        const target = fs.statSync(file).isDirectory()
            ? path.join(file, 'index.html')
            : file;
        const mime =
            {
                '.html': 'text/html',
                '.css': 'text/css',
                '.js': 'text/javascript',
                '.svg': 'image/svg+xml',
                '.md': 'text/plain',
            }[path.extname(target)] || 'application/octet-stream';
        response.writeHead(200, { 'Content-Type': mime + '; charset=utf-8' });
        response.end(fs.readFileSync(target));
    } catch {
        response.writeHead(404).end();
    }
});
let browser;
let assertions = 0;
function check(value, message) {
    assert.ok(value, message);
    assertions++;
}
(async () => {
    await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
    const base = 'http://127.0.0.1:' + server.address().port;
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 2,
    });
    const errors = [];
    context.on('page', (tab) =>
        tab.on('pageerror', (error) => errors.push(error.message)),
    );
    const page = await context.newPage();
    const folder = (prefix) =>
        folders.find((name) => name.startsWith(prefix + '-'));
    const go = async (prefix) => {
        await page.goto(base + '/' + folder(prefix) + '/index.html');
    };
    const fill = async (selector, value) =>
        page.locator(selector).fill(String(value));
    const submit = async (id) =>
        page.locator(id).evaluate((form) => form.requestSubmit());
    const text = (selector) => page.locator(selector).textContent();

    for (const width of [390, 1440]) {
        await page.setViewportSize({
            width,
            height: width === 390 ? 844 : 900,
        });
        for (const name of folders) {
            await page.goto(base + '/' + name + '/index.html');
            await page.addScriptTag({ content: axeSource });
            const a11y = await page.evaluate(async () => {
                const result = await axe.run({
                    runOnly: {
                        type: 'tag',
                        values: ['wcag2a', 'wcag2aa', 'wcag21aa'],
                    },
                });
                return result.violations.map((item) => ({
                    id: item.id,
                    nodes: item.nodes.map((node) => node.target),
                }));
            });
            check(
                a11y.length === 0,
                name + ' accessibility: ' + JSON.stringify(a11y),
            );
            check((await page.locator('main').count()) === 1, name + ' main');
            check(
                await page.evaluate(
                    () =>
                        document.documentElement.scrollWidth <= innerWidth + 1,
                ),
                name + ' viewport overflow',
            );
            check(
                await page
                    .locator('img')
                    .evaluateAll((images) =>
                        images.every(
                            (img) => img.complete && img.naturalWidth > 0,
                        ),
                    ),
                name + ' images',
            );
            if (name.startsWith('09-')) {
                const positions = await page
                    .locator('.alignment-demo')
                    .evaluateAll((demos) =>
                        demos.map((demo) => {
                            const top = demo.getBoundingClientRect().top;
                            return Array.from(demo.children).map(
                                (child) =>
                                    child.getBoundingClientRect().top - top,
                            );
                        }),
                    );
                check(positions.length === 3, 'three alignment stages');
                check(
                    Math.abs(positions[1][0] - positions[0][0] - 20) < 1,
                    'align-items moves short A by 20px',
                );
                check(
                    Math.abs(positions[1][2] - positions[0][2] - 20) < 1,
                    'align-items moves short C by 20px',
                );
                check(
                    positions[1][1] === positions[0][1] &&
                        positions[1][3] === positions[0][3],
                    'align-items keeps tall children and lines in place',
                );
                check(
                    positions[2][0] === positions[1][0] &&
                        positions[2][1] === positions[1][1],
                    'align-content keeps first line',
                );
                check(
                    Math.abs(positions[2][2] - positions[1][2] - 44) < 1 &&
                        Math.abs(positions[2][3] - positions[1][3] - 44) < 1,
                    'align-content moves whole second line 44px',
                );
            }
            if (/^(07|09|20|21|22)-/.test(name))
                await page.screenshot({
                    path: path.join(output, name + '-' + width + '.png'),
                    fullPage: true,
                });
        }
    }
    await go('07');
    await page.selectOption('[name=justify]', 'center');
    check(
        (await text('#parent-css')).includes('justify-content: center;'),
        'parent CSS live',
    );
    await page.selectOption('#child', '3');
    await fill('[name=grow]', '2');
    check(
        (await text('#child-css')).includes('.item-3 {') &&
            (await text('#child-css')).includes('flex-grow: 2;'),
        'selected child CSS live',
    );
    await page.selectOption('#child', '1');
    check(
        (await text('#child-css')).includes('.item-1 {') &&
            (await text('#child-css')).includes('flex-grow: 0;'),
        'CSS switches with selected child',
    );
    check(
        (await text('#alignment-note')).includes('nowrap'),
        'nowrap explanation',
    );
    for (const direction of [
        'row',
        'row-reverse',
        'column',
        'column-reverse',
    ]) {
        await page.selectOption('[name=direction]', direction);
        for (const wrap of ['nowrap', 'wrap', 'wrap-reverse']) {
            await page.selectOption('[name=wrap]', wrap);
            const main = await text('#main-axis');
            const cross = await text('#cross-axis');
            const column = direction.startsWith('column'),
                reverse = direction.endsWith('reverse');
            check(
                main.includes(
                    column ? (reverse ? '↑' : '↓') : reverse ? '←' : '→',
                ),
                'main axis',
            );
            check(
                cross.includes(
                    column
                        ? wrap === 'wrap-reverse'
                            ? '←'
                            : '→'
                        : wrap === 'wrap-reverse'
                          ? '↑'
                          : '↓',
                ),
                'cross axis',
            );
        }
    }
    await page.click('#reset');
    for (let i = 0; i < 4; i++) await page.click('#remove');
    check((await page.locator('#sandbox > *').count()) === 0, 'empty sandbox');
    check(
        (await text('#child-css')).includes('Brak dzieci'),
        'empty child CSS',
    );
    check(await page.locator('#remove').isDisabled(), 'empty remove disabled');
    for (let i = 0; i < 20; i++) await page.click('#add');
    check(await page.locator('#add').isDisabled(), 'max children');
    await page.click('#reset');
    check((await page.locator('#sandbox > *').count()) === 4, 'reset count');
    const exported = await context.newPage();
    for (const preset of ['center', 'nav', 'cards', 'columns', 'panel']) {
        await page.selectOption('#preset', preset);
        const html = await page.inputValue('#code');
        await exported.setContent(html);
        const properties = [
            'display',
            'flexDirection',
            'flexWrap',
            'justifyContent',
            'alignItems',
            'alignContent',
            'rowGap',
            'columnGap',
            'width',
            'height',
        ];
        const styles = async (p, selector) =>
            p.locator(selector).evaluate((el, keys) => {
                const style = getComputedStyle(el);
                return keys.map((key) => style[key]);
            }, properties);
        assert.deepEqual(
            await styles(page, '#sandbox'),
            await styles(exported, '.layout'),
        );
        assertions++;
        const boxes = async (p, selector) =>
            p.locator(selector).evaluate((el) => {
                const parent = el.getBoundingClientRect();
                return Array.from(el.children).map((child) => {
                    const rect = child.getBoundingClientRect();
                    return [
                        rect.x - parent.x,
                        rect.y - parent.y,
                        rect.width,
                        rect.height,
                    ].map((n) => Math.round(n * 10) / 10);
                });
            });
        assert.deepEqual(
            await boxes(page, '#sandbox'),
            await boxes(exported, '.layout'),
        );
        assertions++;
    }
    await fill('[name=text]', '<script>window.bad=true</script>');
    await exported.setContent(await page.inputValue('#code'));
    check(
        (await exported.locator('script').count()) === 0,
        'export escapes scripts',
    );
    check(
        (await exported.locator('.item').first().textContent()).includes(
            '<script>',
        ),
        'export preserves literal text',
    );
    const downloadPromise = page.waitForEvent('download');
    await page.click('#download');
    const download = await downloadPromise;
    check(download.suggestedFilename() === 'layout.html', 'download');
    await download.saveAs(path.join(output, 'layout.html'));
    await page.click('#copy');
    check((await text('#status')).length > 0, 'copy or fallback feedback');
    await exported.close();

    await go('11');
    await fill('#name', 'Ola');
    await submit('#greeting-form');
    check((await text('#result')).includes('Cześć, Ola!'), 'greeting');
    await go('13');
    await fill('#people', '3');
    await fill('#cost', '120');
    await submit('#calculator');
    check((await text('#result')).includes('40.00'), 'calculation');
    for (const people of ['', '0', '-1', '1.5']) {
        await fill('#people', people);
        await submit('#calculator');
        check(
            (await text('#result')).includes('Podaj'),
            'invalid people ' + people,
        );
    }
    await go('14');
    await page.check('#discount');
    await submit('#quote');
    check((await text('#result')).includes('9.00'), 'discount');
    await fill('#pages', '9');
    await submit('#quote');
    check((await text('#result')).includes('Bez rabatu'), 'discount boundary');
    await go('15');
    await fill('#person', '   ');
    await submit('#signup');
    check(
        await page
            .locator('#person')
            .evaluate((el) => el === document.activeElement),
        'validation focus',
    );
    await fill('#person', 'Ola');
    await fill('#email', 'ola@example.test');
    await fill('#age', '16');
    await fill('#group', 'AB12');
    await submit('#signup');
    check((await text('#result')).includes('Poprawne dane'), 'valid signup');
    await go('16');
    await submit('#grades-form');
    check((await text('#result')).includes('4.00; maksimum: 5'), 'grades');
    for (const value of ['', '7', '4,,5']) {
        await fill('#grades', value);
        await submit('#grades-form');
        check(
            (await page.locator('#list li').count()) === 0,
            'invalid/empty grades',
        );
    }
    await go('17');
    await page.click('#previous');
    check(
        (await page.locator('#photo').getAttribute('alt')) ===
            'Księżyc na nocnym niebie',
        'gallery wraps',
    );
    await page.check('#frame');
    check(
        await page
            .locator('#photo')
            .evaluate((el) => el.classList.contains('framed')),
        'gallery class',
    );
    await go('18');
    for (let i = 0; i < 2; i++) {
        await fill('#title', '<b>Duplikat</b>');
        await submit('#tasks');
    }
    check((await page.locator('#list li').count()) === 2, 'duplicate tasks');
    check((await page.locator('#list b').count()) === 0, 'safe task text');
    await fill('#filter', 'BRAK');
    check((await page.locator('#list li').count()) === 0, 'filter');
    await fill('#filter', '');
    await page.locator('#list button').first().click();
    await page.locator('#list button').first().click();
    check(
        (await text('#result')).includes('Wszystkich: 0'),
        'delete last task',
    );
    await fill('#title', '   ');
    await submit('#tasks');
    check((await text('#result')).includes('Wpisz'), 'whitespace');

    await go('19');
    await fill('#nickname', 'Tester');
    await page.selectOption('#theme', 'dark');
    await submit('#settings');
    await page.reload();
    check((await page.inputValue('#nickname')) === 'Tester', 'storage reload');
    await page.evaluate(() =>
        localStorage.setItem('web-grounding-settings-v1', '{bad'),
    );
    await page.reload();
    check((await text('#result')).includes('domyślnych'), 'corrupt storage');
    await page.evaluate(() =>
        localStorage.setItem(
            'web-grounding-settings-v1',
            JSON.stringify({ nickname: 'ok', theme: 'unknown' }),
        ),
    );
    await page.reload();
    check(
        (await text('#result')).includes('domyślnych'),
        'invalid storage schema',
    );
    await page.addInitScript(() => {
        for (const method of ['getItem', 'setItem', 'removeItem'])
            Storage.prototype[method] = function () {
                throw new Error('blocked for test');
            };
    });
    await page.reload();
    await submit('#settings');
    check((await text('#result')).includes('niedostępny'), 'blocked storage');
    // Fresh page avoids the intentional Storage fault injection in later tests.
    const gamePage = await context.newPage();
    await gamePage.goto(base + '/' + folder('20') + '/index.html');
    await gamePage.locator('#order').evaluate((form) => form.requestSubmit());
    await gamePage.fill('#quantity', '50');
    await gamePage.selectOption('#kind', '4');
    await gamePage.check('#delivery');
    await gamePage.locator('#order').evaluate((form) => form.requestSubmit());
    check(
        (await gamePage.locator('#total').textContent()).includes('212.00'),
        'exam project total',
    );
    await gamePage.click('#clear');
    check((await gamePage.locator('#rows tr').count()) === 0, 'exam reset');

    await gamePage.goto(base + '/' + folder('21') + '/index.html');
    check(
        await gamePage
            .locator('#scene')
            .evaluate(
                (el) =>
                    el.width === Math.round(el.clientWidth * devicePixelRatio),
            ),
        'DPR buffer',
    );
    check(
        await gamePage
            .locator('#scene')
            .evaluate(
                (el) =>
                    el.getContext('2d').getImageData(0, 0, 1, 1).data[3] ===
                    255,
            ),
        'Canvas paints',
    );
    await gamePage.goto(base + '/' + folder('22') + '/index.html');
    await gamePage.locator('#scene').focus();
    await gamePage.keyboard.down('ArrowRight');
    await gamePage.waitForTimeout(1100);
    await gamePage.keyboard.up('ArrowRight');
    check(
        Number(await gamePage.locator('#score').textContent()) >= 10,
        'game collection',
    );
    await gamePage.click('#pause');
    check(
        (await gamePage.locator('#pause').getAttribute('aria-pressed')) ===
            'true',
        'pause',
    );
    await gamePage.click('#restart');
    check(
        (await gamePage.locator('#score').textContent()) === '0',
        'restart score',
    );
    check(
        (await gamePage.locator('#lives').textContent()) === '3',
        'restart lives',
    );
    await gamePage.evaluate(() => window.dispatchEvent(new Event('blur')));
    check(
        (await gamePage.locator('#pause').getAttribute('aria-pressed')) ===
            'true',
        'blur pause',
    );
    await gamePage.setViewportSize({ width: 390, height: 844 });
    check(
        await gamePage.locator('#pause').evaluate((el) => {
            const r = el.getBoundingClientRect();
            return (
                document.elementFromPoint(
                    r.x + r.width / 2,
                    r.y + r.height / 2,
                ) === el
            );
        }),
        'HUD hit target',
    );
    await gamePage.click('#restart');
    const control = gamePage.locator('[data-direction=right]');
    await control.scrollIntoViewIfNeeded();
    const controlBox = await control.boundingBox();
    await gamePage.mouse.move(controlBox.x + 15, controlBox.y + 15);
    await gamePage.mouse.down();
    await gamePage.waitForTimeout(1000);
    await gamePage.mouse.move(5, 5);
    await gamePage.mouse.up();
    check(
        Number(await gamePage.locator('#score').textContent()) >= 10,
        'pointer control collection',
    );
    await gamePage.click('#restart');
    for (let round = 0; round < 3; round++) {
        await gamePage.locator('#scene').focus();
        await gamePage.keyboard.down('ArrowRight');
        await gamePage.waitForTimeout(2100);
        await gamePage.keyboard.up('ArrowRight');
    }
    check(
        (await gamePage.locator('#lives').textContent()) === '0',
        'game over lives',
    );
    check(
        await gamePage.locator('#pause').isDisabled(),
        'game over pause disabled',
    );
    await gamePage.click('#restart');
    // Repeated restart must not add animation loops.
    await gamePage.click('#restart');
    await gamePage.click('#restart');
    await gamePage.locator('#scene').focus();
    await gamePage.keyboard.down('ArrowRight');
    await gamePage.waitForTimeout(1100);
    await gamePage.keyboard.up('ArrowRight');
    check(
        (await gamePage.locator('#lives').textContent()) === '3',
        'restart keeps speed',
    );
    await gamePage.click('#pause');
    await gamePage.locator('#scene').focus();
    await gamePage.keyboard.down('ArrowRight');
    await gamePage.waitForTimeout(2100);
    await gamePage.keyboard.up('ArrowRight');
    check(
        (await gamePage.locator('#lives').textContent()) === '3',
        'pause freezes simulation',
    );
    await gamePage.screenshot({
        path: path.join(output, 'hud-final-mobile.png'),
        fullPage: true,
    });
    await gamePage.close();

    const touchContext = await browser.newContext({
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
        deviceScaleFactor: 2,
    });
    const touchPage = await touchContext.newPage();
    touchPage.on('pageerror', (error) => errors.push(error.message));
    await touchPage.goto(base + '/' + folder('22') + '/index.html');
    const right = touchPage.locator('[data-direction=right]');
    await right.scrollIntoViewIfNeeded();
    const touchBox = await right.boundingBox();
    const touchSession = await touchContext.newCDPSession(touchPage);
    await touchSession.send('Input.dispatchTouchEvent', {
        type: 'touchStart',
        touchPoints: [{ x: touchBox.x + 20, y: touchBox.y + 20 }],
    });
    await touchPage.waitForTimeout(1100);
    await touchSession.send('Input.dispatchTouchEvent', {
        type: 'touchEnd',
        touchPoints: [],
    });
    check(
        Number(await touchPage.locator('#score').textContent()) >= 10,
        'real touch collection',
    );
    await touchPage.locator('#pause').tap();
    check(
        (await touchPage.locator('#pause').getAttribute('aria-pressed')) ===
            'true',
        'touch HUD pause',
    );
    await touchContext.close();

    const fallback = await context.newPage();
    await fallback.route('**/assets/lessons/hills.svg', (route) =>
        route.abort(),
    );
    await fallback.goto(base + '/' + folder('21') + '/index.html');
    check(
        (await fallback.locator('#result').textContent()).includes(
            'Brak obrazu',
        ),
        'missing image fallback',
    );
    await fallback.addInitScript(() => {
        HTMLCanvasElement.prototype.getContext = () => null;
    });
    await fallback.reload();
    check(
        (await fallback.locator('#result').textContent()).includes(
            'niedostępny',
        ),
        'missing Canvas fallback',
    );
    await fallback.close();

    const local = await context.newPage();
    for (const name of folders) {
        await local.goto(
            pathToFileURL(path.join(root, name, 'index.html')).href,
        );
        check(
            (await local.locator('main').count()) === 1,
            'file scheme ' + name,
        );
        check(
            await local
                .locator('img')
                .evaluateAll((images) =>
                    images.every((img) => img.complete && img.naturalWidth > 0),
                ),
            'file images ' + name,
        );
    }
    await local.goto(
        pathToFileURL(path.join(root, folder('13'), 'index.html')).href,
    );
    await local.fill('#people', '3');
    await local.fill('#cost', '120');
    await local.locator('#calculator').evaluate((form) => form.requestSubmit());
    check(
        (await local.locator('#result').textContent()).includes('40.00'),
        'file calculator interaction',
    );
    await local.goto(
        pathToFileURL(path.join(root, folder('07'), 'index.html')).href,
    );
    await local.click('#add');
    check(
        (await local.locator('#sandbox > *').count()) === 5,
        'file sandbox interaction',
    );
    await local.locator('#copy').focus();
    await local.keyboard.press('Enter');
    await local.waitForFunction(
        () => document.querySelector('#status').textContent.length > 0,
    );
    check(
        (await local.locator('#status').textContent()).length > 0,
        'keyboard copy fallback',
    );
    check(errors.length === 0, 'runtime errors: ' + errors.join('; '));
    console.log(
        'PASS browser: ' +
            assertions +
            ' assertions; 390x844 / 1440x900; HTTP + file; DPR 2; proof ' +
            output,
    );
})()
    .catch((error) => {
        console.error(error);
        process.exitCode = 1;
    })
    .finally(async () => {
        if (browser) await browser.close();
        await new Promise((resolve) => server.close(resolve));
    });
