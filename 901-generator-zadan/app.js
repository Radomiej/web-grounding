'use strict';

const taskSets = {
    'INF.03': [
        {
            id: 'inf03-katalog-js',
            topic: 'html-css-js',
            title: 'Katalog rowerów miejskich',
            brief: 'Przygotuj responsywną stronę katalogu rowerów. Użytkownik ma zobaczyć karty produktów, odfiltrować je po typie i otrzymać komunikat, gdy nic nie pasuje.',
            details: {
                'Dane wejściowe': 'tablica co najmniej 6 obiektów: nazwa, typ, cena i obraz zastępczy',
                'Wynik': 'karty w sekcji main oraz licznik widocznych pozycji',
                'Tryb': 'statyczny HTML + CSS + JavaScript, bez serwera',
            },
            preparation: [
                'Przeczytaj polecenie i wypisz osobno strukturę HTML, wygląd CSS oraz zachowania JS.',
                'Zaprojektuj semantyczne sekcje: header, nav, main, filtr i footer.',
                'Najpierw wyrenderuj wszystkie dane, potem dodaj filtrowanie i stan pustej listy.',
                'Sprawdź szeroki i wąski widok oraz zaznacz kryteria w checklistcie.',
            ],
            criteria: [
                'Dokument ma poprawną strukturę i etykietę pola wyboru.',
                'Karty układają się responsywnie dzięki Flexboxowi i używają gap.',
                'JavaScript filtruje dane bez przeładowania strony.',
                'Licznik i komunikat pustej listy aktualizują się po każdej zmianie.',
                'Obrazy mają opis alternatywny, a fokus klawiatury jest widoczny.',
            ],
            materials: [
                { label: 'Tekst i listy HTML', href: '../102-html-tekst-i-listy/index.html' },
                { label: 'Sandbox Flexbox', href: '../202-css-flexbox-sandbox/index.html' },
                { label: 'Klasy i theme', href: '../303-javascript-klasy-i-theme/index.html' },
            ],
            flow: ['Analiza wymagań', 'HTML + dane', 'CSS/Flexbox', 'JS: filtr', 'Test i zrzuty'],
        },
        {
            id: 'inf03-formularz',
            topic: 'formularze',
            title: 'Zapisy na warsztaty fotograficzne',
            brief: 'Zbuduj formularz zapisów na warsztaty. Po wysłaniu sprawdź wymagane pola, pokaż podsumowanie i nie przeładowuj dokumentu.',
            details: {
                'Pola': 'imię, e-mail, liczba miejsc, termin i zgoda regulaminowa',
                'Wynik': 'czytelny komunikat sukcesu albo lista błędów przy polach',
                'Tryb': 'HTML + CSS + JavaScript; walidacja po stronie przeglądarki',
            },
            preparation: [
                'Narysuj na kartce relację label → input i zaplanuj miejsce na komunikat błędu.',
                'Nadaj polom type, name, required i krótkie opisy pomocnicze.',
                'Napisz funkcję walidującą jedno pole, a następnie wywołaj ją dla całego formularza.',
                'Przetestuj pusty formularz, błędny e-mail, skrajne liczby i poprawne wysłanie.',
            ],
            criteria: [
                'Każde pole ma powiązaną etykietę i zrozumiały komunikat.',
                'Formularz nie wysyła się, gdy dane są niepoprawne.',
                'Po sukcesie użytkownik widzi podsumowanie w tym samym dokumencie.',
                'Układ działa na telefonie i można przejść go klawiaturą.',
            ],
            materials: [
                { label: 'Formularze HTML', href: '../105-html-formularze/index.html' },
                { label: 'Walidacja JavaScript', href: '../306-javascript-walidacja/index.html' },
                { label: 'Pełny indeks arkuszy INF.03', href: '../docs/inf03/arkusze.md' },
            ],
            flow: ['Wymagania pól', 'Formularz HTML', 'Walidacja', 'Komunikat', 'Próby graniczne'],
        },
        {
            id: 'inf03-php-sql',
            topic: 'php-sql',
            title: 'Katalog kursów z filtrem PHP/SQL',
            brief: 'Przygotuj stronę, która pobiera kursy z tabeli bazy danych, filtruje je po kategorii i wyświetla wynik w tabeli HTML.',
            details: {
                'Tabela': 'courses(id, name, category, price)',
                'Wejście': 'parametr category z formularza GET albo wartość „all”',
                'Wynik': 'zapytanie SELECT i tabela z liczbą znalezionych rekordów',
            },
            preparation: [
                'Zapisz kolumny tabeli i przygotuj kilka rekordów testowych w lokalnej bazie.',
                'Sprawdź samo zapytanie SELECT, zanim połączysz je z HTML.',
                'Dodaj formularz filtra i wartość domyślną, gdy użytkownik nic nie wybrał.',
                'Przetestuj kategorię istniejącą, pusty wynik i znak specjalny w parametrze.',
            ],
            criteria: [
                'Skrypt łączy się z bazą i obsługuje błąd połączenia.',
                'Zapytanie ma jawnie wskazane kolumny i bezpiecznie obsługuje filtr.',
                'Wyniki są generowane w poprawnej tabeli HTML.',
                'Dla pustego wyniku pojawia się komunikat, a nie pusta strona.',
            ],
            materials: [
                { label: 'Podstawy PHP', href: '../401-php-podstawy/README.md' },
                { label: 'SELECT i tabela PHP', href: '../402-php-czytanie-bazy/README.md' },
                { label: 'Lokalny plan tematów INF.03', href: '../docs/plan-nauki-inf03-inf04.md' },
            ],
            flow: ['Model tabeli', 'Połączenie', 'SELECT + filtr', 'Tabela HTML', 'Test danych'],
        },
        {
            id: 'inf03-canvas',
            topic: 'canvas',
            title: 'Panel wyników na canvasie',
            brief: 'Narysuj na canvasie prosty wykres słupkowy wyników drużyny i dodaj tekstowy HUD z nazwą poziomu oraz liczbą punktów.',
            details: {
                'Dane': 'tablica 4 wyników i nazwa gracza',
                'Wynik': 'słupki, etykiety osi oraz HUD w prawym górnym rogu',
                'Tryb': 'HTML + JavaScript Canvas 2D, bez biblioteki graficznej',
            },
            preparation: [
                'Ustal rozmiar canvasu i przelicz wartości danych na piksele.',
                'Narysuj tło, osie i jeden słupek, a dopiero potem dodaj pętlę po tablicy.',
                'Zostaw bezpieczny margines na tekst i sprawdź skalowanie na małym ekranie.',
                'Oddziel funkcję renderującą wykres od funkcji renderującej HUD.',
            ],
            criteria: [
                'Canvas ma opis tekstowy dla użytkownika, który go nie widzi.',
                'Każdy słupek ma wysokość wynikającą z danych, nie z wartości wpisanej ręcznie.',
                'HUD jest czytelny i nie zasłania wykresu.',
                'Zmiana tablicy danych daje poprawny nowy render.',
            ],
            materials: [
                { label: 'Podstawy Canvas 2D', href: '../313-canvas-podstawy/index.html' },
                { label: 'Canvas i HUD', href: '../314-canvas-hud-gra/index.html' },
                { label: 'Przykładowe zadania INF.03', href: '../docs/inf03/arkusze.md' },
            ],
            flow: ['Dane wyników', 'Skala pikseli', 'Rysowanie', 'HUD', 'Zmiana danych'],
        },
    ],
    'INF.04': [
        {
            id: 'inf04-cezar',
            topic: 'algorytmy',
            title: 'Szyfr Cezara z testem jednostkowym',
            brief: 'Napisz funkcję szyfrującą tekst szyfrem Cezara. Program ma obsłużyć wielkie i małe litery, zachować spacje oraz zgłosić niepoprawny klucz.',
            details: {
                'Wejście': 'tekst i przesunięcie całkowite',
                'Wynik': 'zaszyfrowany tekst oraz komunikat walidacyjny',
                'Testy': 'przypadek zwykły, zawijanie alfabetu, spacje i błędny klucz',
            },
            preparation: [
                'Zapisz alfabet i regułę zawijania na końcu zakresu znaków.',
                'Oddziel funkcję szyfrującą od pobierania danych i wyświetlania wyniku.',
                'Przygotuj tabelę przypadków testowych przed napisaniem interfejsu.',
                'Uruchom testy po każdej zmianie reguły dla małych i wielkich liter.',
            ],
            criteria: [
                'Funkcja poprawnie szyfruje litery z zawijaniem alfabetu.',
                'Spacje i znaki spoza alfabetu nie są niszczone.',
                'Niepoprawne dane wejściowe dają kontrolowany komunikat.',
                'Testy obejmują przypadek typowy i co najmniej dwa przypadki graniczne.',
            ],
            materials: [
                { label: 'Indeks zadań INF.04', href: '../docs/inf04/arkusze.md' },
                { label: 'Plan algorytmów i testów', href: '../docs/plan-nauki-inf03-inf04.md' },
                { label: 'Paczki referencyjne TEB (po próbie)', href: '../docs/inf04/rozwiazania-teb/README.md' },
            ],
            flow: ['Specyfikacja', 'Funkcja', 'Walidacja', 'Testy graniczne', 'Raport'],
        },
        {
            id: 'inf04-oop',
            topic: 'oop',
            title: 'Urządzenia domowe — dziedziczenie',
            brief: 'Zaprojektuj klasę bazową Urzadzenie oraz dwie klasy dziedziczące. Każdy obiekt ma opisać stan i wykonać własną operację.',
            details: {
                'Klasy': 'Urzadzenie, Odkurzacz i Pralka',
                'Dane': 'nazwa, moc, stan oraz jedna cecha specjalistyczna',
                'Wynik': 'lista obiektów i wywołanie nadpisanych metod',
            },
            preparation: [
                'Wypisz wspólne pola i zachowania, zanim utworzysz klasy potomne.',
                'Zdecyduj, które pola są prywatne i jak odczytać je przez metody.',
                'Zaimplementuj klasę bazową, potem jedną klasę potomną i dopiero drugą.',
                'Przetestuj polimorfizm na tablicy typu bazowego.',
            ],
            criteria: [
                'Klasa bazowa przechowuje wspólny stan i ma konstruktor.',
                'Klasy potomne dziedziczą oraz rozszerzają zachowanie.',
                'Metoda opisu/uruchomienia jest poprawnie nadpisana.',
                'Program pokazuje co najmniej trzy różne obiekty.',
            ],
            materials: [
                { label: 'Przykładowe zadania INF.04', href: '../docs/inf04/arkusze.md' },
                { label: 'Archiwa materiałów startowych', href: '../docs/inf04/materialy/README.md' },
                { label: 'Plan OOP i aplikacji', href: '../docs/plan-nauki-inf03-inf04.md' },
            ],
            flow: ['Model domeny', 'Klasa bazowa', 'Dziedziczenie', 'Polimorfizm', 'Test obiektów'],
        },
        {
            id: 'inf04-tablice',
            topic: 'tablice',
            title: 'Sortowanie i wyszukiwanie tablicy',
            brief: 'Napisz program, który wczyta tablicę liczb, wyszuka wskazaną wartość z wartownikiem i posortuje kopię przez wybieranie.',
            details: {
                'Wejście': 'n, n liczb oraz szukana wartość',
                'Wynik': 'indeks znalezionego elementu i posortowana tablica',
                'Warunek': 'nie używaj gotowej funkcji sortującej',
            },
            preparation: [
                'Rozpisz ręcznie jedną iterację wyszukiwania z wartownikiem.',
                'Napisz pseudokod sortowania przez wybieranie i zaznacz miejsce zamiany.',
                'Zaimplementuj algorytm na kopii danych, aby zachować wejście do porównania.',
                'Sprawdź pustą tablicę, jeden element, duplikaty i brak szukanej wartości.',
            ],
            criteria: [
                'Wyszukiwanie zwraca poprawny indeks albo jasny brak wyniku.',
                'Sortowanie działa bez bibliotecznej funkcji sortującej.',
                'Program obsługuje rozmiar minimalny i dane powtarzające się.',
                'Wynik pokazuje dane przed i po operacji.',
            ],
            materials: [
                { label: 'Indeks zadań i zasady oceniania', href: '../docs/inf04/arkusze.md' },
                { label: 'Lokalny plan algorytmów', href: '../docs/plan-nauki-inf03-inf04.md' },
                { label: 'Materiały startowe INF.04', href: '../docs/inf04/materialy/README.md' },
            ],
            flow: ['Dane wejściowe', 'Wartownik', 'Wybór minimum', 'Zamiana', 'Porównanie'],
        },
        {
            id: 'inf04-notatki',
            topic: 'pliki',
            title: 'Notatki zapisane w pliku',
            brief: 'Zaprojektuj klasę Notatka i prosty program, który dodaje, wyświetla oraz zapisuje notatki w pliku tekstowym.',
            details: {
                'Klasa': 'Notatka: tytuł, treść, data i metoda formatowania',
                'Operacje': 'dodaj, lista, zapis, odczyt',
                'Błędy': 'brak pliku i pusta treść muszą być obsłużone',
            },
            preparation: [
                'Ustal format jednego rekordu w pliku i sposób rozdzielania pól.',
                'Napisz klasę oraz test formatowania bez używania pliku.',
                'Dodaj zapis i odczyt w osobnej warstwie, aby logika klasy była prosta.',
                'Przetestuj pusty plik, wiele rekordów i brak uprawnień/plików.',
            ],
            criteria: [
                'Klasa ma konstruktor, pola i metodę czytelnego formatowania.',
                'Program potrafi zapisać i odczytać co najmniej trzy rekordy.',
                'Pusty tekst i brak pliku nie kończą programu niekontrolowanym błędem.',
                'Kod jest podzielony na małe funkcje/metody.',
            ],
            materials: [
                { label: 'Warianty INF.04 z klasami notatek', href: '../docs/inf04/arkusze.md' },
                { label: 'Plan plików i OOP', href: '../docs/plan-nauki-inf03-inf04.md' },
                { label: 'Paczki TEB do porównania po pracy', href: '../docs/inf04/rozwiazania-teb/README.md' },
            ],
            flow: ['Model Notatka', 'Walidacja', 'Lista obiektów', 'Zapis/odczyt', 'Test pliku'],
        },
    ],
};

const topicLabels = {
    'INF.03': {
        'html-css-js': 'HTML + CSS + JavaScript',
        formularze: 'Formularze i walidacja',
        'php-sql': 'PHP + SQL',
        canvas: 'Canvas i HUD',
    },
    'INF.04': {
        algorytmy: 'Algorytmy i testy',
        oop: 'OOP i dziedziczenie',
        tablice: 'Tablice i wyszukiwanie',
        pliki: 'Klasy i pliki',
    },
};

const form = document.querySelector('#generator-form');
const qualification = document.querySelector('#qualification');
const topic = document.querySelector('#topic');
const level = document.querySelector('#level');
const seedInput = document.querySelector('#seed');
const output = document.querySelector('#task-output');
const taskTitle = document.querySelector('#task-title');
const taskMeta = document.querySelector('#task-meta');
const taskStatus = document.querySelector('#task-status');
const brief = document.querySelector('#brief');
const details = document.querySelector('#details');
const preparation = document.querySelector('#preparation');
const criteria = document.querySelector('#criteria');
const materials = document.querySelector('#materials');
const flowPreview = document.querySelector('#flow-preview');
const mermaidCode = document.querySelector('#mermaid-code code');
const copyMermaid = document.querySelector('#copy-mermaid');

let currentMermaid = '';

function updateTopics() {
    const selected = qualification.value;
    topic.replaceChildren();
    Object.entries(topicLabels[selected]).forEach(([value, label]) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = label;
        topic.append(option);
    });
}

function numericSeed(value) {
    const parsed = Number.parseInt(value, 10);
    if (Number.isFinite(parsed)) return Math.abs(parsed);
    return Math.floor(Date.now() / 1000);
}

function chooseTask(seed) {
    const candidates = taskSets[qualification.value].filter(
        (item) => item.topic === topic.value,
    );
    const index = seed % candidates.length;
    return candidates[index];
}

function addListItems(parent, values, createItem) {
    parent.replaceChildren();
    values.forEach((value) => parent.append(createItem(value)));
}

function makeMermaid(task) {
    const lines = ['flowchart LR'];
    task.flow.forEach((label, index) => {
        const id = `S${index + 1}`;
        const safeLabel = label.replaceAll('"', "'");
        lines.push(`    ${id}["${safeLabel}"]`);
        if (index > 0) lines.push(`    S${index} --> ${id}`);
    });
    lines.push('    classDef step fill:#e8f5fb,stroke:#2d769d,color:#123b5d;');
    lines.push(`    class ${task.flow.map((_, index) => `S${index + 1}`).join(',')} step;`);
    return lines.join('\n');
}

function renderTask(task, seed) {
    output.hidden = false;
    taskTitle.textContent = task.title;
    taskMeta.textContent = `${qualification.value} · ${topicLabels[qualification.value][task.topic]} · ${level.options[level.selectedIndex].text} · ziarno ${seed}`;
    taskStatus.textContent = 'Gotowe — zapisz własną próbę przed porównaniem.';
    brief.textContent = task.brief;

    details.replaceChildren();
    Object.entries(task.details).forEach(([label, value]) => {
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = label;
        dd.textContent = value;
        details.append(dt, dd);
    });

    const preparationForLevel =
        level.value === 'start' ? task.preparation.slice(0, 2) : task.preparation;
    const criteriaForLevel =
        level.value === 'start' ? task.criteria.slice(0, 2) : task.criteria;

    addListItems(preparation, preparationForLevel, (value) => {
        const li = document.createElement('li');
        li.textContent = value;
        return li;
    });

    addListItems(criteria, criteriaForLevel, (value) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        label.append(checkbox, document.createTextNode(value));
        li.append(label);
        return li;
    });

    addListItems(materials, task.materials, (item) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = item.href;
        link.textContent = item.label;
        li.append(link);
        return li;
    });

    flowPreview.replaceChildren();
    task.flow.forEach((label, index) => {
        const node = document.createElement('span');
        node.className = 'flow-node';
        node.textContent = label;
        flowPreview.append(node);
        if (index < task.flow.length - 1) {
            const arrow = document.createElement('span');
            arrow.className = 'flow-arrow';
            arrow.setAttribute('aria-hidden', 'true');
            arrow.textContent = '→';
            flowPreview.append(arrow);
        }
    });

    currentMermaid = makeMermaid(task);
    mermaidCode.textContent = currentMermaid;
    output.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function generate(seed = numericSeed(seedInput.value)) {
    seedInput.value = seed;
    renderTask(chooseTask(seed), seed);
}

qualification.addEventListener('change', updateTopics);
form.addEventListener('submit', (event) => {
    event.preventDefault();
    generate();
});

document.querySelector('#random-task').addEventListener('click', () => {
    generate(numericSeed('') + 1);
});

copyMermaid.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(currentMermaid);
        taskStatus.textContent = 'Kod Mermaid skopiowany.';
    } catch {
        taskStatus.textContent = 'Zaznacz kod w polu poniżej i skopiuj ręcznie.';
    }
});

updateTopics();
generate(2026);
