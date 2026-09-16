'use strict';

const editForm = document.querySelector('#edit-form');
const statusText = document.querySelector('#status');
const result = document.querySelector('#result');

function showStatus(message, isError = false) {
    statusText.textContent = message;
    statusText.classList.toggle('error', isError);
}

async function readJson(response) {
    let payload;
    try {
        payload = await response.json();
    } catch {
        throw new Error('Serwer nie zwrócił poprawnego JSON-u.');
    }
    if (!response.ok) {
        throw new Error(payload.error || `Błąd HTTP ${response.status}.`);
    }
    return payload;
}

async function updateOffer(event) {
    event.preventDefault();
    const button = editForm.querySelector('button[type="submit"]');
    const formData = new FormData(editForm);
    const input = {
        id: Number(formData.get('id')),
        title: String(formData.get('title') || '').trim(),
        price: Number(formData.get('price')),
        available: formData.get('available') === 'on',
    };

    button.disabled = true;
    showStatus('Zapisywanie zmiany…');
    result.textContent = '';

    try {
        const response = await fetch('api.php', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(input),
        });
        const payload = await readJson(response);
        result.textContent = JSON.stringify(payload, null, 2);
        showStatus(`Zaktualizowano ofertę #${payload.data.id}.`);
    } catch (error) {
        showStatus(
            error instanceof Error ? error.message : 'Nie udało się zaktualizować oferty.',
            true,
        );
    } finally {
        button.disabled = false;
    }
}

editForm.addEventListener('submit', updateOffer);
