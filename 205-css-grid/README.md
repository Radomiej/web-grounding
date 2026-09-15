# Ćwiczenie 205 — CSS Grid

Grid służy do układu w dwóch wymiarach: równocześnie kontrolujesz wiersze i
kolumny. Do jednej osi i nawigacji nadal często lepiej pasuje Flexbox.

## Czego się nauczysz

- włączyć `display: grid`;
- zdefiniować kolumny przez `grid-template-columns`;
- użyć `repeat`, `minmax`, `fr` i `gap`;
- rozciągnąć element przez `grid-column`;
- zmienić liczbę kolumn w media query.

## HTML

`main`, `section`, `article`, `h1`–`h3`, `p`, `a` i `code` zachowują znaczenie
treści. Klasy `.cards`, `.card` i `.card-featured` są hakami dla CSS.

## CSS

| Właściwość lub wartość | Znaczenie |
| --- | --- |
| `display: grid` | Włącza siatkę dla bezpośrednich dzieci. |
| `grid-template-columns` | Definiuje ścieżki kolumn. |
| `repeat(3, ...)` | Powtarza opis trzy razy. |
| `minmax(0, 1fr)` | Pozwala kolumnie się skurczyć i podzielić wolne miejsce. |
| `fr` | Ułamek wolnego miejsca siatki. |
| `gap` | Odstęp między wierszami i kolumnami. |
| `grid-column: 1 / -1` | Rozciąga element od pierwszej do ostatniej linii. |
| `@media (max-width: 48rem)` | Zmienia układ na wąskim ekranie. |

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek i CDN.

## Zadanie do wykonania

1. Dodaj czwartą kartę i sprawdź automatyczne utworzenie nowego wiersza.
2. Zmień siatkę na cztery kolumny od `64rem`, a poniżej `48rem` zostaw jedną.
3. Rozciągnij kartę wyróżnioną na dwie kolumny przez `grid-column`.
4. Zastąp `1fr` przez `minmax(12rem, 1fr)` i sprawdź szerokość 390 px.
5. Wyjaśnij w komentarzu, dlaczego Grid nie zmienia kolejności HTML.

## Kryteria zaliczenia

- karty układają się w wiersze bez ręcznych marginesów;
- siatka nie powoduje poziomego overflow na 390 px;
- `gap` zastępuje sztuczne odstępy między kartami;
- nagłówek sekcji nie jest przypadkową komórką danych.
