'use strict';
const form = document.querySelector('#signup');
const person = document.querySelector('#person');
const result = document.querySelector('#result');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    person.value = person.value.trim();
    const invalid = form.querySelector(':invalid');
    if (invalid) {
        result.textContent = 'Popraw pole: ' + invalid.validationMessage;
        result.classList.add('error');
        invalid.focus();
        return;
    }
    result.classList.remove('error');
    result.textContent =
        'Poprawne dane. Witaj, ' +
        person.value +
        '! To demonstracja, nie wysłano zgłoszenia.';
});
