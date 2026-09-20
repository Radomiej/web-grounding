'use strict';
const sources = ['hills.svg', 'sunset.svg', 'night.svg'];
const descriptions = [
    'Zielone wzgórza',
    'Pomarańczowy zachód słońca',
    'Księżyc na nocnym niebie',
];
const photo = document.querySelector('#photo');
let index = 0;
function showPhoto() {
    photo.src = '../assets/lessons/' + sources[index];
    photo.alt = descriptions[index];
    document.querySelector('#caption').textContent =
        index + 1 + ' / ' + sources.length + ' — ' + descriptions[index];
}
document.querySelector('#previous').addEventListener('click', function () {
    index = (index - 1 + sources.length) % sources.length;
    showPhoto();
});
document.querySelector('#next').addEventListener('click', function () {
    index = (index + 1) % sources.length;
    showPhoto();
});
document.querySelector('#size').addEventListener('input', function (event) {
    photo.style.width = event.target.value + 'px';
});
document.querySelector('#frame').addEventListener('change', function (event) {
    photo.classList.toggle('framed', event.target.checked);
});
showPhoto();
