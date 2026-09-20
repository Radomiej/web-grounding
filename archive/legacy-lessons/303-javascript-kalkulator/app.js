'use strict';
const form = document.querySelector('#calculator');
const peopleInput = document.querySelector('#people');
const costInput = document.querySelector('#cost');
const result = document.querySelector('#result');

function costPerPerson(cost, people) {
    return cost / people;
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const people = Number(peopleInput.value);
    const cost = Number(costInput.value);
    if (
        peopleInput.value === '' ||
        costInput.value === '' ||
        !Number.isInteger(people) ||
        people <= 0 ||
        !Number.isFinite(cost) ||
        cost < 0
    ) {
        result.textContent =
            'Podaj dodatnią całkowitą liczbę osób i koszt co najmniej 0.';
        return;
    }
    result.textContent =
        'Na osobę: ' + costPerPerson(cost, people).toFixed(2) + ' zł';
});
