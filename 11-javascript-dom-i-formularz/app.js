'use strict';

const form = document.querySelector('#task-form');
const titleInput = document.querySelector('#task-title');
const prioritySelect = document.querySelector('#task-priority');
const statusText = document.querySelector('#status');
const taskList = document.querySelector('#task-list');

function showStatus(message, isError = false) {
    statusText.textContent = message;
    statusText.classList.toggle('error', isError);
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const title = titleInput.value.trim();
    const priority = prioritySelect.value;

    if (title === '') {
        showStatus('Wpisz nazwę zadania.', true);
        titleInput.focus();
        return;
    }

    const item = document.createElement('li');
    const name = document.createElement('strong');
    const badge = document.createElement('span');

    name.textContent = title;
    badge.textContent = `Priorytet: ${priority}`;
    item.append(name, badge);
    taskList.append(item);

    showStatus(`Dodano zadanie. Liczba zadań: ${taskList.children.length}.`);
    form.reset();
    titleInput.focus();
});
