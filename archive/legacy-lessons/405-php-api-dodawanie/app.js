'use strict';

const offerForm = document.querySelector('#offer-form');
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

async function loadOffers() {
    loadButton.disabled = true;
    showStatus('Pobieranie danych…');
    offersList.replaceChildren();

    try {
        const response = await fetch('api.php');
        const payload = await readJson(response);
        const offers = Array.isArray(payload.data) ? payload.data : [];

        renderOffers(offers);
        showStatus(
            offers.length === 0
                ? 'Baza nie zawiera ofert.'
                : `Pobrano ofert: ${offers.length}.`,
        );
        return true;
    } catch (error) {
        showStatus(
            error instanceof Error
                ? error.message
                : 'Nie udało się pobrać danych.',
            true,
        );
        return false;
    } finally {
        loadButton.disabled = false;
    }
}

async function addOffer(event) {
    event.preventDefault();

    const submitButton = offerForm.querySelector('button[type="submit"]');
    const formData = new FormData(offerForm);
    const price = Number(formData.get('price'));
    const input = {
        title: String(formData.get('title') || '').trim(),
        price,
        available: formData.get('available') === 'on',
    };

    if (!Number.isFinite(price)) {
        showStatus('Cena musi być liczbą.', true);
        return;
    }

    submitButton.disabled = true;
    showStatus('Zapisywanie oferty…');

    try {
        const response = await fetch('api.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(input),
        });
        const payload = await readJson(response);
        const created = payload.data;

        offerForm.reset();
        const refreshed = await loadOffers();
        showStatus(
            refreshed
                ? `Dodano ofertę #${created.id}. Lista została odświeżona.`
                : `Dodano ofertę #${created.id}, ale nie udało się odświeżyć listy.`,
            !refreshed,
        );
    } catch (error) {
        showStatus(
            error instanceof Error
                ? error.message
                : 'Nie udało się zapisać oferty.',
            true,
        );
    } finally {
        submitButton.disabled = false;
    }
}

offerForm.addEventListener('submit', addOffer);
loadButton.addEventListener('click', () => {
    void loadOffers();
});
