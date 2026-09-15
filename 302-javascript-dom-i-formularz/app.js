'use strict';
const form = document.querySelector('#greeting-form');
const nameInput = document.querySelector('#name');
const result = document.querySelector('#result');

function greet(event) {
    event.preventDefault();
    result.textContent = 'Cześć, ' + nameInput.value + '!';
}
form.addEventListener('submit', greet);
