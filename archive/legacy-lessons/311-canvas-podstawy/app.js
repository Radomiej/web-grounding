'use strict';
const canvas = document.querySelector('#scene');
const context = canvas.getContext('2d');
const result = document.querySelector('#result');
const picture = new Image();
let pictureReady = false;
let pictureFailed = false;

function draw() {
    if (!context) {
        result.textContent =
            'Canvas 2D jest niedostępny. Przeczytaj opis sceny.';
        return;
    }
    // CSS określa rozmiar na ekranie, width/height liczbę pikseli bufora.
    const width = canvas.clientWidth;
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(((width * 360) / 640) * ratio);
    context.setTransform(canvas.width / 640, 0, 0, canvas.height / 360, 0, 0);
    context.clearRect(0, 0, 640, 360);
    context.fillStyle = '#e4f2fc';
    context.fillRect(0, 0, 640, 360);
    if (pictureReady) context.drawImage(picture, 0, 0, 640, 360);
    context.fillStyle = '#125d88';
    context.fillRect(40, 220, 140, 80);
    context.beginPath();
    context.arc(
        Number(document.querySelector('#x').value),
        160,
        35,
        0,
        Math.PI * 2,
    );
    context.fillStyle = '#963900';
    context.fill();
    context.beginPath();
    context.moveTo(30, 320);
    context.lineTo(600, 320);
    context.strokeStyle = '#172b3a';
    context.lineWidth = 3;
    context.stroke();
    context.font = '22px system-ui';
    context.fillStyle = '#172b3a';
    context.fillText('Canvas 2D: x →, y ↓', 20, 35);
    result.textContent = pictureFailed
        ? 'Brak obrazu — figury nadal działają.'
        : 'Scena narysowana. Przesuń koło.';
}
picture.addEventListener('load', function () {
    pictureReady = true;
    draw();
});
picture.addEventListener('error', function () {
    pictureFailed = true;
    draw();
});
picture.src = '../assets/lessons/hills.svg';
document.querySelector('#x').addEventListener('input', draw);
document.querySelector('#redraw').addEventListener('click', draw);
window.addEventListener('resize', draw);
draw();
