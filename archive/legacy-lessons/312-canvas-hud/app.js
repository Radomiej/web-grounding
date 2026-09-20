'use strict';
const canvas = document.querySelector('#scene');
const context = canvas.getContext('2d');
const status = document.querySelector('#result');
const pauseButton = document.querySelector('#pause');
// Jedno źródło danych dla sceny i HUD.
const state = {
    x: 320,
    y: 200,
    score: 0,
    lives: 3,
    paused: false,
    targetX: 480,
    targetY: 200,
};
const pressed = new Set();
const keyDirections = {
    ArrowLeft: 'left',
    ArrowRight: 'right',
    ArrowUp: 'up',
    ArrowDown: 'down',
    a: 'left',
    d: 'right',
    w: 'up',
    s: 'down',
};
let previousTime = null;
function syncHud() {
    document.querySelector('#score').textContent = state.score;
    document.querySelector('#lives').textContent = state.lives;
    pauseButton.textContent = state.paused ? 'Wznów' : 'Pauza';
    pauseButton.setAttribute('aria-pressed', String(state.paused));
    pauseButton.disabled = state.lives === 0;
}
function resize() {
    const ratio = window.devicePixelRatio || 1;
    canvas.width = Math.round(canvas.clientWidth * ratio);
    canvas.height = Math.round(((canvas.clientWidth * 360) / 640) * ratio);
    if (context)
        context.setTransform(
            canvas.width / 640,
            0,
            0,
            canvas.height / 360,
            0,
            0,
        );
}
function update(seconds) {
    if (state.paused || state.lives === 0) return;
    const speed = 160;
    if (pressed.has('left')) state.x -= speed * seconds;
    if (pressed.has('right')) state.x += speed * seconds;
    if (pressed.has('up')) state.y -= speed * seconds;
    if (pressed.has('down')) state.y += speed * seconds;
    if (state.x < 12 || state.x > 628 || state.y < 12 || state.y > 348) {
        state.lives--;
        state.x = 320;
        state.y = 200;
        pressed.clear();
        if (state.lives === 0) state.paused = true;
        status.textContent = state.lives
            ? 'Krawędź! Pozostało żyć: ' + state.lives
            : 'Koniec. Naciśnij Restart.';
        syncHud();
    }
    if (
        Math.abs(state.x - state.targetX) < 22 &&
        Math.abs(state.y - state.targetY) < 22
    ) {
        state.score += 10;
        state.targetX = state.targetX === 480 ? 160 : 480;
        state.targetY = 200;
        status.textContent = 'Zebrano punkt: ' + state.score;
        syncHud();
    }
}
function draw() {
    context.clearRect(0, 0, 640, 360);
    context.fillStyle = '#dcedf7';
    context.fillRect(0, 0, 640, 360);
    context.strokeStyle = '#a7b7c4';
    context.lineWidth = 1;
    for (let x = 0; x <= 640; x += 40) {
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, 360);
        context.stroke();
    }
    context.fillStyle = '#963900';
    context.fillRect(state.targetX - 10, state.targetY - 10, 20, 20);
    context.fillStyle = '#125d88';
    context.beginPath();
    context.arc(state.x, state.y, 12, 0, Math.PI * 2);
    context.fill();
}
function frame(time) {
    const seconds =
        previousTime === null
            ? 0
            : Math.min((time - previousTime) / 1000, 0.05);
    previousTime = time;
    update(seconds);
    draw();
    requestAnimationFrame(frame);
}
canvas.addEventListener('keydown', function (event) {
    const direction = keyDirections[event.key];
    if (direction) {
        event.preventDefault();
        pressed.add(direction);
    }
});
canvas.addEventListener('keyup', function (event) {
    const direction = keyDirections[event.key];
    if (direction) {
        event.preventDefault();
        pressed.delete(direction);
    }
});
canvas.addEventListener('blur', function () {
    pressed.clear();
});
window.addEventListener('blur', function () {
    pressed.clear();
    state.paused = true;
    previousTime = null;
    syncHud();
});
document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
        pressed.clear();
        state.paused = true;
        previousTime = null;
        syncHud();
    }
});
pauseButton.addEventListener('click', function () {
    state.paused = !state.paused;
    pressed.clear();
    previousTime = null;
    syncHud();
    status.textContent = state.paused ? 'Pauza.' : 'Wznowiono.';
});
document.querySelector('#restart').addEventListener('click', function () {
    Object.assign(state, {
        x: 320,
        y: 200,
        score: 0,
        lives: 3,
        paused: false,
        targetX: 480,
        targetY: 200,
    });
    pressed.clear();
    previousTime = null;
    syncHud();
    status.textContent = 'Nowa próba.';
    // Restart zmienia stan, nie uruchamia drugiej pętli requestAnimationFrame.
});
for (const button of document.querySelectorAll('[data-direction]')) {
    const direction = button.dataset.direction;
    button.addEventListener('pointerdown', function (event) {
        button.setPointerCapture(event.pointerId);
        pressed.add(direction);
    });
    button.addEventListener('pointerup', function () {
        pressed.delete(direction);
    });
    button.addEventListener('pointercancel', function () {
        pressed.delete(direction);
    });
    button.addEventListener('lostpointercapture', function () {
        pressed.delete(direction);
    });
    // Klawiaturowe uruchomienie natywnego przycisku wykonuje krótki krok.
    button.addEventListener('click', function (event) {
        if (event.detail === 0) {
            pressed.add(direction);
            update(0.1);
            pressed.delete(direction);
        }
    });
}
window.addEventListener('resize', resize);
syncHud();
resize();
if (context) requestAnimationFrame(frame);
else
    status.textContent =
        'Canvas 2D niedostępny. Interfejs HTML pozostaje widoczny.';
