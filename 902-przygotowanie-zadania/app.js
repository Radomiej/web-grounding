'use strict';

const criterionOptions = [
    { id: 'structure', label: 'Struktura projektu i nazwy plików są zgodne z poleceniem.' },
    { id: 'input', label: 'Dane wejściowe mają etykiety, walidację i komunikat błędu.' },
    { id: 'logic', label: 'Logika zadania działa dla przypadku zwykłego i granicznego.' },
    { id: 'layout', label: 'Interfejs jest czytelny, responsywny i obsługuje klawiaturę.' },
    { id: 'data', label: 'Dane są poprawnie wyświetlane, zapisywane albo sortowane.' },
    { id: 'tests', label: 'Przygotowano powtarzalne testy i opisano ich wynik.' },
    { id: 'evidence', label: 'Dokumentacja i zrzuty ekranu potwierdzają każde kryterium.' },
];

const defaultStages = [
    'Analiza wymagań i rozpisanie kryteriów',
    'Projekt danych oraz struktury interfejsu',
    'Implementacja małymi krokami',
    'Test przypadków poprawnych, granicznych i błędnych',
    'Dokumentacja i sprawdzenie kryteriów',
];

const form = document.querySelector('#task-builder');
const criteriaFields = document.querySelector('#criteria-fields');
const stageList = document.querySelector('#stage-list');
const output = document.querySelector('#builder-output');
const preview = document.querySelector('#task-preview');
const outputMeta = document.querySelector('#output-meta');
const previewTitle = document.querySelector('#preview-title');
const status = document.querySelector('#builder-status');
const markdownCode = document.querySelector('#markdown-code code');
const mermaidCode = document.querySelector('#mermaid-code code');

let currentMarkdown = '';
let currentMermaid = '';

function renderCriteriaFields() {
    criterionOptions.forEach((item, index) => {
        const label = document.createElement('label');
        label.className = 'criteria-option';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.name = 'criterion';
        input.value = item.id;
        input.checked = index < 5;
        label.append(input, document.createTextNode(item.label));
        criteriaFields.append(label);
    });
}

function addStage(value = '') {
    const li = document.createElement('li');
    li.className = 'stage-row';
    const label = document.createElement('label');
    label.textContent = 'Etap';
    const input = document.createElement('input');
    input.type = 'text';
    input.value = value;
    input.required = true;
    input.setAttribute('aria-label', 'Opis etapu');
    label.append(input);
    const remove = document.createElement('button');
    remove.type = 'button';
    remove.className = 'secondary';
    remove.textContent = 'Usuń';
    remove.addEventListener('click', () => {
        if (stageList.children.length > 1) li.remove();
    });
    li.append(label, remove);
    stageList.append(li);
}

function resetStages() {
    stageList.replaceChildren();
    defaultStages.forEach((stage) => addStage(stage));
}

function value(id) {
    return document.querySelector(`#${id}`).value.trim();
}

function selectedCriteria() {
    return [...criteriaFields.querySelectorAll('input:checked')].map((input) =>
        criterionOptions.find((item) => item.id === input.value).label,
    );
}

function selectedStages() {
    return [...stageList.querySelectorAll('input')]
        .map((input) => input.value.trim())
        .filter(Boolean);
}

function cleanMarkdownText(text) {
    return text.replaceAll('```', "''' ");
}

function cleanMermaidText(text) {
    return text.replaceAll('"', "'").replaceAll('\n', ' ');
}

function makeMermaid(title, stages) {
    const lines = ['flowchart TD'];
    lines.push(`    START(["Start: ${cleanMermaidText(title)}"])`);
    stages.forEach((stage, index) => {
        const id = `S${index + 1}`;
        lines.push(`    ${id}["${cleanMermaidText(stage)}"]`);
        lines.push(`    ${index === 0 ? 'START' : `S${index}`} --> ${id}`);
    });
    const last = stages.length ? `S${stages.length}` : 'START';
    lines.push(`    ${last} --> CHECK["Sprawdzenie kryteriów"]`);
    lines.push('    CHECK --> DONE(["Gotowe zadanie"]);');
    lines.push('    classDef stage fill:#e8f5fb,stroke:#2d769d,color:#123b5d;');
    lines.push(`    class ${stages.map((_, index) => `S${index + 1}`).join(',')},CHECK stage;`);
    return lines.join('\n');
}

function makeMarkdown(data) {
    const criteria = data.criteria.map((item) => `- [ ] ${cleanMarkdownText(item)}`).join('\n');
    const stages = data.stages.map((item, index) => `${index + 1}. ${cleanMarkdownText(item)}`).join('\n');
    return `# ${cleanMarkdownText(data.title)}\n\n> Lokalny mini-arkusz treningowy ${data.qualification}; nie jest kopią arkusza CKE.\n\n## Kontekst\n\n${cleanMarkdownText(data.context)}\n\n## Polecenie\n\n${cleanMarkdownText(data.objective)}\n\n## Dane wejściowe\n\n${cleanMarkdownText(data.input)}\n\n## Oczekiwany wynik\n\n${cleanMarkdownText(data.output)}\n\n## Czas\n\n${data.duration} minut\n\n## Kryteria zaliczenia\n\n${criteria}\n\n## Jak przygotować rozwiązanie\n\n${stages}\n\n## Diagram Mermaid\n\n\`\`\`mermaid\n${data.mermaid}\n\`\`\`\n`;
}

function renderPreview(data) {
    output.hidden = false;
    outputMeta.textContent = `${data.qualification} · lokalny mini-arkusz · ${data.duration} min`;
    previewTitle.textContent = data.title;
    status.textContent = 'Gotowe — możesz pobrać Markdown albo skopiować diagram.';
    preview.replaceChildren();

    const contextHeading = document.createElement('h3');
    contextHeading.textContent = 'Kontekst';
    const context = document.createElement('p');
    context.textContent = data.context;
    const taskHeading = document.createElement('h3');
    taskHeading.textContent = 'Polecenie';
    const objective = document.createElement('p');
    objective.textContent = data.objective;
    const dataList = document.createElement('dl');
    [['Dane wejściowe', data.input], ['Oczekiwany wynik', data.output], ['Czas', `${data.duration} minut`]].forEach(([label, text]) => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = label;
        dd.textContent = text;
        dataList.append(dt, dd);
    });

    const criteriaHeading = document.createElement('h3');
    criteriaHeading.textContent = 'Kryteria zaliczenia';
    const criteriaList = document.createElement('ul');
    data.criteria.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        criteriaList.append(li);
    });

    const stagesHeading = document.createElement('h3');
    stagesHeading.textContent = 'Jak przygotować rozwiązanie';
    const stagesList = document.createElement('ol');
    data.stages.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        stagesList.append(li);
    });
    preview.append(contextHeading, context, taskHeading, objective, dataList, criteriaHeading, criteriaList, stagesHeading, stagesList);
    markdownCode.textContent = data.markdown;
    mermaidCode.textContent = data.mermaid;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const stages = selectedStages();
    const data = {
        qualification: value('qualification'),
        title: value('title'),
        duration: value('duration'),
        context: value('context'),
        objective: value('objective'),
        input: value('input-data'),
        output: value('expected-output'),
        criteria: selectedCriteria(),
        stages: stages.length ? stages : defaultStages,
    };
    data.mermaid = makeMermaid(data.title, data.stages);
    data.markdown = makeMarkdown(data);
    currentMarkdown = data.markdown;
    currentMermaid = data.mermaid;
    renderPreview(data);
});

document.querySelector('#add-stage').addEventListener('click', () => addStage());
document.querySelector('#reset-builder').addEventListener('click', () => {
    form.reset();
    resetStages();
    output.hidden = true;
    status.textContent = '';
});

async function copyText(text, message) {
    try {
        await navigator.clipboard.writeText(text);
        status.textContent = message;
    } catch {
        status.textContent = 'Schowek jest niedostępny — zaznacz tekst w polu i skopiuj ręcznie.';
    }
}

document.querySelector('#copy-markdown').addEventListener('click', () => copyText(currentMarkdown, 'Markdown skopiowany.'));
document.querySelector('#copy-mermaid').addEventListener('click', () => copyText(currentMermaid, 'Kod Mermaid skopiowany.'));
document.querySelector('#download-markdown').addEventListener('click', () => {
    if (!currentMarkdown) return;
    const blob = new Blob([currentMarkdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lokalne-zadanie.md';
    link.click();
    URL.revokeObjectURL(url);
    status.textContent = 'Plik Markdown został przygotowany do pobrania.';
});

renderCriteriaFields();
resetStages();
