'use strict';
const form = document.querySelector('#quote');
const result = document.querySelector('#result');
form.addEventListener('submit', function (event) {
    event.preventDefault();
    const pages = Number(document.querySelector('#pages').value);
    const paper = Number(document.querySelector('#paper').value);
    const mode = Number(
        document.querySelector('input[name="mode"]:checked').value,
    );
    if (!Number.isInteger(pages) || pages < 1) {
        result.textContent = 'Podaj dodatnią całkowitą liczbę stron.';
        return;
    }
    let total = pages * paper * mode;
    if (document.querySelector('#discount').checked && pages >= 10) {
        total = total * 0.9;
        result.textContent = 'Z rabatem: ';
    } else {
        result.textContent = 'Bez rabatu (minimum 10 stron): ';
    }
    result.textContent += total.toFixed(2) + ' zł';
});
