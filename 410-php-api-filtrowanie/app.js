'use strict';

const filterForm = document.querySelector('#filter-form');
const statusText = document.querySelector('#status');
const offersList = document.querySelector('#offers');

function showStatus(message, isError = false) {
    statusText.textContent = message;
    statusText.classList.toggle('error', isError);
}

function renderOffers(offers) {
    offersList.replaceChildren();

    for (const offer of offers) {
        const item = document.createElement('li');
        item.textContent = `${offer.title} — ${offer.price.toFixed(2)} zł`;
        offersList.append(item);
    }
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

async function loadOffers(event) {
    event.preventDefault();
    const formData = new FormData(filterForm);
    const params = new URLSearchParams();
    const query = String(formData.get('q') || '').trim();
    const available = String(formData.get('available') || '');

    if (query) params.set('q', query);
    if (available) params.set('available', available);

    showStatus('Pobieranie przefiltrowanych ofert…');
    offersList.replaceChildren();

    try {
        const queryString = params.toString();
        const response = await fetch(`api.php${queryString ? `?${queryString}` : ''}`);
        const payload = await readJson(response);
        const offers = Array.isArray(payload.data) ? payload.data : [];

        renderOffers(offers);
        showStatus(`Znaleziono ofert: ${offers.length}.`);
    } catch (error) {
        showStatus(
            error instanceof Error ? error.message : 'Nie udało się pobrać ofert.',
            true,
        );
    }
}

filterForm.addEventListener('submit', loadOffers);
