'use strict';
const panel = document.querySelector('#settings');
const preview = document.querySelector('#sandbox');
const picker = document.querySelector('#child');
const childFields = document.querySelector('#child-fields');
const code = document.querySelector('#code');
const status = document.querySelector('#status');
const defaults = {
    direction: 'row',
    wrap: 'nowrap',
    justify: 'flex-start',
    align: 'stretch',
    content: 'stretch',
    rowGap: 12,
    columnGap: 12,
    width: 640,
    height: 360,
};
const allowed = {
    direction: ['row', 'row-reverse', 'column', 'column-reverse'],
    wrap: ['nowrap', 'wrap', 'wrap-reverse'],
    justify: [
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
    ],
    align: ['stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
    content: [
        'stretch',
        'flex-start',
        'flex-end',
        'center',
        'space-between',
        'space-around',
        'space-evenly',
    ],
    self: ['auto', 'stretch', 'flex-start', 'flex-end', 'center', 'baseline'],
};
let container = { ...defaults };
let children = [];
let selected = 0;
let serial = 0;
function makeChild() {
    serial++;
    return {
        id: serial,
        text: 'Element ' + serial,
        grow: 0,
        shrink: 1,
        basis: 100,
        self: 'auto',
        order: 0,
    };
}
function reset() {
    container = { ...defaults };
    serial = 0;
    children = [makeChild(), makeChild(), makeChild(), makeChild()];
    selected = children[0].id;
    syncControls();
    render();
}
function syncControls() {
    for (const key of Object.keys(container))
        panel.elements[key].value = container[key];
    picker.replaceChildren();
    for (const child of children) {
        const option = document.createElement('option');
        option.value = child.id;
        option.textContent = child.text || 'Puste dziecko ' + child.id;
        picker.append(option);
    }
    picker.value = selected;
    picker.disabled = children.length === 0;
    childFields.disabled = children.length === 0;
    document.querySelector('#remove').disabled = children.length === 0;
    document.querySelector('#add').disabled = children.length >= 20;
    const child = children.find(function (item) {
        return item.id === selected;
    });
    if (child)
        for (const key of ['text', 'grow', 'shrink', 'basis', 'self', 'order'])
            childFields.elements[key].value = child[key];
}
function containerCss() {
    return (
        'display: flex;\n  flex-direction: ' +
        container.direction +
        ';\n  flex-wrap: ' +
        container.wrap +
        ';\n  justify-content: ' +
        container.justify +
        ';\n  align-items: ' +
        container.align +
        ';\n  align-content: ' +
        container.content +
        ';\n  row-gap: ' +
        container.rowGap +
        'px;\n  column-gap: ' +
        container.columnGap +
        'px;\n  width: ' +
        container.width +
        'px;\n  height: ' +
        container.height +
        'px;'
    );
}
function childCss(child) {
    return (
        'flex-grow: ' +
        child.grow +
        '; flex-shrink: ' +
        child.shrink +
        '; flex-basis: ' +
        child.basis +
        'px; align-self: ' +
        child.self +
        '; order: ' +
        child.order +
        ';'
    );
}
function escapeHtml(text) {
    return text
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;');
}
function exportLayout() {
    const rules = children
        .map(function (child) {
            return '.item-' + child.id + ' { ' + childCss(child) + ' }';
        })
        .join('\n');
    const html = children
        .map(function (child) {
            return (
                '    <div class="item item-' +
                child.id +
                '">' +
                escapeHtml(child.text) +
                '</div>'
            );
        })
        .join('\n');
    return (
        '<!doctype html>\n<html lang="pl">\n<head>\n<meta charset="UTF-8">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<title>Mój layout</title>\n<style>\n' +
        '* { box-sizing: border-box; }\nbody { margin: 0; padding: 16px; font: 16px/1.6 system-ui, sans-serif; color: #172b3a; }\n' +
        '.viewport { overflow: auto; }\n.layout { ' +
        containerCss() +
        ' padding: 16px; border: 2px solid #657c8c; background: #fff; }\n' +
        '.item { min-width: 0; min-height: 0; overflow-wrap: anywhere; padding: 12px; border: 2px solid #125d88; background: #dcedf7; }\n' +
        rules +
        '\n</style>\n</head>\n<body><main class="viewport"><div class="layout">\n' +
        html +
        '\n</div></main></body>\n</html>'
    );
}
function explain() {
    const column = container.direction.startsWith('column');
    const reverse = container.direction.endsWith('reverse');
    const wrapReverse = container.wrap === 'wrap-reverse';
    document.querySelector('#alignment-note').textContent =
        container.wrap === 'nowrap'
            ? 'Teraz masz nowrap: jedną linię. align-content nic tu nie zmieni. Najpierw włącz wrap i dodaj dzieci lub zmniejsz wymiar osi głównej.'
            : 'Masz włączone zawijanie. Każda linia to grupa dzieci mieszczących się obok siebie. align-content rozdziela wolną przestrzeń między liniami; align-items wyrównuje dzieci wewnątrz każdej z nich. Różne wysokości dzieci ułatwiają zobaczenie tej drugiej zmiany.';
    document.querySelector('#main-axis').textContent =
        'Main axis — oś główna ' +
        (column ? (reverse ? '↑' : '↓') : reverse ? '←' : '→');
    document.querySelector('#cross-axis').textContent =
        'Cross axis — oś poprzeczna ' +
        (column ? (wrapReverse ? '←' : '→') : wrapReverse ? '↑' : '↓');
    const hints = [
        'justify-content rozdziela pozostałe miejsce na osi głównej, osobno w każdej linii.',
        'align-items wyrównuje dzieci wewnątrz ich linii. align-content układa linie na osi poprzecznej.',
        'gap jest odstępem między elementami lub liniami, nie marginesem wokół kontenera.',
        'Model osi: tekst poziomy, kierunek pisma od lewej do prawej (LTR).',
    ];
    if (container.wrap === 'nowrap')
        hints.push(
            'nowrap: tylko jedna linia; align-content nie ma tu efektu.',
        );
    else
        hints.push(
            'Zawijanie włączone: dodaj dzieci lub zmniejsz wymiar osi głównej. align-content potrzebuje wolnego miejsca w osi poprzecznej, by przesuwać linie.',
        );
    if (
        children.some(function (child) {
            return child.grow > 0;
        })
    )
        hints.push(
            'grow może pochłonąć całe wolne miejsce — justify-content nie będzie miał czego rozdzielać.',
        );
    const mainSize = (column ? container.height : container.width) - 36;
    const gap = column ? container.rowGap : container.columnGap;
    const requested =
        children.reduce(function (sum, child) {
            return sum + Math.max(28, child.basis);
        }, 0) +
        Math.max(0, children.length - 1) * gap;
    if (container.wrap === 'nowrap' && requested >= mainSize)
        hints.push(
            'Brak wolnego miejsca: dzieci muszą się skurczyć (shrink) albo wyjdą poza kontener. Zwiększ wymiar lub zmniejsz basis.',
        );
    if (container.align === 'stretch')
        hints.push(
            'stretch rozciąga rozmiar auto na osi poprzecznej. Gdy w swoim CSS ustawisz stałe width/height tej osi, rozciąganie przestanie działać.',
        );
    if (
        reverse ||
        children.some(function (child) {
            return child.order !== 0;
        })
    )
        hints.push(
            'Uwaga: kolejność wizualna różni się od DOM. Czytnik ekranu nadal czyta źródłową kolejność.',
        );
    document.querySelector('#explanation').replaceChildren(
        ...hints.map(function (hint) {
            const item = document.createElement('li');
            item.textContent = hint;
            return item;
        }),
    );
}
function render() {
    preview.style.cssText = containerCss();
    preview.replaceChildren();
    for (const child of children) {
        const item = document.createElement('div');
        item.className = 'item';
        item.style.cssText = childCss(child);
        item.textContent = child.text;
        preview.append(item);
    }
    explain();
    code.value = exportLayout();
    document.querySelector('#parent-css').textContent =
        '.layout {\n  ' + containerCss() + '\n}';
    const activeChild = children.find(function (child) {
        return child.id === selected;
    });
    document.querySelector('#child-css').textContent = activeChild
        ? '.item-' +
          activeChild.id +
          ' {\n  ' +
          childCss(activeChild).replaceAll('; ', ';\n  ') +
          '\n}'
        : '/* Brak dzieci. Kliknij „Dodaj dziecko”. */';
    document.querySelector('#child-css-help').textContent = activeChild
        ? 'Ustaw na wybranym dziecku class="item item-' +
          activeChild.id +
          '". align-self nadpisuje align-items tylko dla tego dziecka; auto pozostawia ustawienie rodzica.'
        : 'Nie wybrano dziecka, ponieważ kontener jest pusty.';
    document.querySelector('#count').textContent =
        'Dzieci: ' + children.length + ' / 20';
}
panel.addEventListener('submit', function (event) {
    event.preventDefault();
});
panel.addEventListener('input', function (event) {
    const field = event.target;
    const key = field.name;
    if (!(key in defaults)) return;
    if (allowed[key]) {
        if (!allowed[key].includes(field.value)) return;
        container[key] = field.value;
    } else {
        if (!field.checkValidity() || field.value === '') return;
        container[key] = Number(field.value);
    }
    render();
});
childFields.addEventListener('input', function (event) {
    const field = event.target;
    const child = children.find(function (item) {
        return item.id === selected;
    });
    if (!child) return;
    if (field.name === 'text') child.text = field.value.slice(0, 80);
    else if (field.name === 'self' && allowed.self.includes(field.value))
        child.self = field.value;
    else if (
        ['grow', 'shrink', 'basis', 'order'].includes(field.name) &&
        field.value !== '' &&
        field.checkValidity()
    )
        child[field.name] = Number(field.value);
    if (field.name === 'text')
        picker.selectedOptions[0].textContent =
            child.text || 'Puste dziecko ' + child.id;
    render();
});
picker.addEventListener('change', function () {
    selected = Number(picker.value);
    syncControls();
    render();
});
document.querySelector('#add').addEventListener('click', function () {
    if (children.length >= 20) return;
    const child = makeChild();
    children.push(child);
    selected = child.id;
    syncControls();
    render();
});
document.querySelector('#remove').addEventListener('click', function () {
    children = children.filter(function (child) {
        return child.id !== selected;
    });
    selected = children.length ? children[0].id : 0;
    syncControls();
    render();
});
document.querySelector('#reset').addEventListener('click', function () {
    document.querySelector('#preset').value = 'default';
    reset();
});
document.querySelector('#preset').addEventListener('change', function (event) {
    reset();
    const preset = event.target.value;
    if (preset === 'center') {
        children = [children[0]];
        container.justify = 'center';
        container.align = 'center';
    }
    if (preset === 'nav') {
        container.justify = 'space-between';
        container.align = 'center';
        container.height = 120;
    }
    if (preset === 'cards') {
        container.wrap = 'wrap';
        children.push(makeChild(), makeChild());
        children.forEach(function (child) {
            child.basis = 180;
            child.grow = 1;
        });
    }
    if (preset === 'columns') {
        children = children.slice(0, 2);
        children[0].grow = 2;
        children[1].grow = 1;
    }
    if (preset === 'panel') {
        container.direction = 'column';
        children = children.slice(0, 3);
        children[1].grow = 1;
    }
    syncControls();
    render();
});
document.querySelector('#copy').addEventListener('click', async function () {
    try {
        await navigator.clipboard.writeText(code.value);
        status.textContent = 'Skopiowano HTML i CSS.';
    } catch {
        code.focus();
        code.select();
        status.textContent =
            'Zaznaczono kod. Użyj Ctrl+C lub kopiowania z menu.';
    }
});
document.querySelector('#download').addEventListener('click', function () {
    const blob = new Blob([exportLayout()], {
        type: 'text/html;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'layout.html';
    link.click();
    setTimeout(function () {
        URL.revokeObjectURL(url);
    }, 1000);
    status.textContent = 'Przygotowano layout.html.';
});
reset();
