'use strict';
const form = document.querySelector('#grades-form');
const list = document.querySelector('#list');
const result = document.querySelector('#result');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    list.replaceChildren();
    const text = document.querySelector('#grades').value.trim();
    if (text === '') {
        result.textContent = 'Brak ocen — nie dzielimy przez zero.';
        return;
    }
    const parts = text.split(',');
    const grades = [];
    for (const part of parts) {
        const grade = Number(part.trim());
        if (!Number.isInteger(grade) || grade < 1 || grade > 6) {
            result.textContent = 'Każda ocena musi być całkowita od 1 do 6.';
            return;
        }
        grades.push(grade);
    }
    let total = 0;
    let maximum = grades[0];
    for (let index = 0; index < grades.length; index++) {
        total += grades[index];
        if (grades[index] > maximum) maximum = grades[index];
        const item = document.createElement('li');
        item.textContent = 'Ocena ' + (index + 1) + ': ' + grades[index];
        list.append(item);
    }
    result.textContent =
        'Średnia: ' +
        (total / grades.length).toFixed(2) +
        '; maksimum: ' +
        maximum;
});
