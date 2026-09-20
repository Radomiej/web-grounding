'use strict';

const deleteForm = document.querySelector('#delete-form');
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

async function deleteOffer(event) {
    event.preventDefault();
    const button = deleteForm.querySelector('button[type="submit"]');
    const id = Number(new FormData(deleteForm).get('id'));

    button.disabled = true;
    showStatus('Usuwanie oferty…');
    result.textContent = '';

    try {
        const response = await fetch('api.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        const payload = await readJson(response);
        result.textContent = JSON.stringify(payload, null, 2);
        showStatus(`Usunięto ofertę #${payload.data.deletedId}.`);
        deleteForm.reset();
    } catch (error) {
        showStatus(
            error instanceof Error ? error.message : 'Nie udało się usunąć oferty.',
            true,
        );
    } finally {
        button.disabled = false;
    }
}

deleteForm.addEventListener('submit', deleteOffer);
