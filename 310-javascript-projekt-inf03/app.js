'use strict';
const form = document.querySelector('#order');
const rows = document.querySelector('#rows');
const result = document.querySelector('#result');
let total = 0;
function calculate(quantity, price, delivery) {
    let amount = quantity * price;
    if (quantity >= 50) amount *= 0.9;
    if (delivery) amount += 12;
    return amount;
}
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const quantity = Number(document.querySelector('#quantity').value);
    const price = Number(document.querySelector('#kind').value);
    const delivery = document.querySelector('#delivery').checked;
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 1000) {
        result.textContent = 'Liczba odbitek: 1–1000, całkowita.';
        return;
    }
    const amount = calculate(quantity, price, delivery);
    const row = document.createElement('tr');
    for (const value of [quantity, price, amount.toFixed(2)]) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.append(cell);
    }
    rows.append(row);
    total += amount;
    result.textContent = 'Dodano wycenę: ' + amount.toFixed(2) + ' zł';
    document.querySelector('#total').textContent =
        'Suma: ' + total.toFixed(2) + ' zł';
});
document.querySelector('#clear').addEventListener('click', function () {
    rows.replaceChildren();
    total = 0;
    document.querySelector('#total').textContent = 'Suma: 0.00 zł';
    result.textContent = 'Wyczyszczono zestawienie.';
});
const images = [
    { src: 'hills.svg', alt: 'Zielone wzgórza' },
    { src: 'sunset.svg', alt: 'Pomarańczowy zachód słońca' },
    { src: 'night.svg', alt: 'Księżyc na nocnym niebie' },
];
let imageIndex = 0;
document.querySelector('#next').addEventListener('click', function () {
    imageIndex = (imageIndex + 1) % images.length;
    const photo = document.querySelector('#photo');
    photo.src = '../assets/lessons/' + images[imageIndex].src;
    photo.alt = images[imageIndex].alt;
});
