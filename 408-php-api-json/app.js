'use strict';

const loadButton = document.querySelector('#load-offers');
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
        const availability = offer.available ? 'dostępna' : 'niedostępna';
        item.textContent = `${offer.title} — ${offer.price.toFixed(2)} zł (${availability})`;
        offersList.append(item);
    }
}

async function loadOffers() {
    loadButton.disabled = true;
    showStatus('Pobieranie danych…');
    offersList.replaceChildren();

    try {
        const response = await fetch('api.php');
        const payload = await response.json();

        if (!response.ok) {
            throw new Error(payload.error || 'Serwer zwrócił błąd.');
        }

        const offers = Array.isArray(payload.data) ? payload.data : [];
        renderOffers(offers);
        showStatus(offers.length === 0 ? 'Baza nie zawiera ofert.' : `Pobrano ofert: ${offers.length}.`);
    } catch (error) {
        showStatus(error instanceof Error ? error.message : 'Nie udało się pobrać danych.', true);
    } finally {
        loadButton.disabled = false;
    }
}

loadButton.addEventListener('click', loadOffers);
