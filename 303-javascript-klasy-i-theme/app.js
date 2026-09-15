'use strict';
const body = document.body;
const description = document.querySelector('#description');
const result = document.querySelector('#result');
const themeButton = document.querySelector('#theme-toggle');
const highlightButton = document.querySelector('#highlight-toggle');

function syncTheme() {
    const dark = body.classList.contains('dark');
    themeButton.textContent = dark ? 'Włącz jasny motyw' : 'Włącz ciemny motyw';
    themeButton.setAttribute('aria-pressed', String(dark));
    result.textContent = dark ? 'Motyw ciemny.' : 'Motyw jasny.';
}

themeButton.addEventListener('click', function () {
    body.classList.toggle('dark');
    syncTheme();
});

highlightButton.addEventListener('click', function () {
    const active = description.classList.toggle('highlight');
    highlightButton.setAttribute('aria-pressed', String(active));
    highlightButton.textContent = active ? 'Usuń wyróżnienie' : 'Wyróżnij opis';
});

syncTheme();
