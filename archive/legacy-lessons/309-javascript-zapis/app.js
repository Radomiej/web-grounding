'use strict';
const key = 'web-grounding-settings-v1';
const form = document.querySelector('#settings');
const nickname = document.querySelector('#nickname');
const theme = document.querySelector('#theme');
const result = document.querySelector('#result');
function applySettings() {
    document.body.classList.toggle('dark', theme.value === 'dark');
    document.querySelector('#greeting').textContent =
        'Witaj, ' + nickname.value.trim().toUpperCase();
}
try {
    const saved = localStorage.getItem(key);
    if (saved !== null) {
        const data = JSON.parse(saved);
        if (
            !data ||
            typeof data.nickname !== 'string' ||
            data.nickname.length > 40 ||
            (data.theme !== 'light' && data.theme !== 'dark')
        )
            throw new Error('Niepoprawny zapis');
        nickname.value = data.nickname;
        theme.value = data.theme;
    }
} catch (error) {
    result.textContent = 'Nie udało się odczytać ustawień. Używamy domyślnych.';
}
applySettings();
form.addEventListener('submit', function (event) {
    event.preventDefault();
    applySettings();
    try {
        localStorage.setItem(
            key,
            JSON.stringify({
                nickname: nickname.value.trim(),
                theme: theme.value,
            }),
        );
        result.textContent = 'Zapisano ustawienia.';
    } catch (error) {
        result.textContent =
            'Zmiany działają teraz, ale zapis jest niedostępny.';
    }
});
document.querySelector('#clear').addEventListener('click', function () {
    form.reset();
    applySettings();
    try {
        localStorage.removeItem(key);
        result.textContent = 'Usunięto zapis.';
    } catch (error) {
        result.textContent =
            'Przywrócono wygląd, ale nie udało się usunąć zapisu.';
    }
});
function showClock() {
    const now = new Date();
    document.querySelector('#clock').textContent =
        now.toLocaleTimeString('pl-PL') +
        ' • minuta dnia: ' +
        Math.floor(
            (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()) /
                60,
        );
}
showClock();
setInterval(showClock, 1000);
