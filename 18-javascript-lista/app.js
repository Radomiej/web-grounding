'use strict';
const tasks = [];
let nextId = 1;
const form = document.querySelector('#tasks');
const title = document.querySelector('#title');
const list = document.querySelector('#list');
const filter = document.querySelector('#filter');
const result = document.querySelector('#result');
function render() {
    list.replaceChildren();
    let visible = 0;
    for (const task of tasks) {
        if (!task.title.toLowerCase().includes(filter.value.toLowerCase()))
            continue;
        const item = document.createElement('li');
        const name = document.createElement('span');
        name.textContent = task.title + ' (' + task.priority + ') ';
        const remove = document.createElement('button');
        remove.textContent = 'Usuń: ' + task.title;
        remove.addEventListener('click', function () {
            const index = tasks.findIndex(function (entry) {
                return entry.id === task.id;
            });
            tasks.splice(index, 1);
            render();
            title.focus();
        });
        item.append(name, remove);
        list.append(item);
        visible++;
    }
    result.textContent =
        'Wszystkich: ' + tasks.length + '; widocznych: ' + visible;
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const text = title.value.trim();
    if (text === '') {
        result.textContent = 'Wpisz nazwę zadania.';
        title.focus();
        return;
    }
    tasks.push({
        id: nextId++,
        title: text,
        priority: document.querySelector('#priority').value,
    });
    form.reset();
    render();
    title.focus();
});
filter.addEventListener('input', render);
render();
