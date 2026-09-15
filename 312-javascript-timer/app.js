'use strict';
const display = document.querySelector('#display');
const status = document.querySelector('#status');
const startButton = document.querySelector('#start');
const pauseButton = document.querySelector('#pause');
const resetButton = document.querySelector('#reset');
const initialSeconds = 60;
let remaining = initialSeconds;
let timerId = null;

function format(seconds) {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
    const rest = (seconds % 60).toString().padStart(2, '0');
    return minutes + ':' + rest;
}

function render() {
    display.textContent = format(remaining);
    pauseButton.disabled = timerId === null;
    startButton.disabled = timerId !== null || remaining === 0;
}

function stopTimer(message) {
    if (timerId !== null) {
        window.clearInterval(timerId);
        timerId = null;
    }
    if (message) status.textContent = message;
    render();
}

startButton.addEventListener('click', function () {
    if (timerId !== null || remaining === 0) return;
    timerId = window.setInterval(function () {
        remaining -= 1;
        if (remaining <= 0) {
            remaining = 0;
            stopTimer('Koniec czasu.');
        } else {
            render();
        }
    }, 1000);
    status.textContent = 'Timer działa.';
    render();
});

pauseButton.addEventListener('click', function () {
    stopTimer('Timer zatrzymany.');
});

resetButton.addEventListener('click', function () {
    stopTimer('Timer wyzerowany.');
    remaining = initialSeconds;
    render();
});

render();
