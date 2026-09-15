# Ćwiczenie 206 — komponenty w raw CSS

Budujesz mały zestaw komponentów bez frameworka: navbar, karta, alert,
formularz, przycisk i footer. To baza do porównania z Bootstrapem w 207.

## Czego się nauczysz

- używać Flexboxa do nawigacji i stopki;
- tworzyć wspólne klasy komponentów;
- projektować `hover`, `focus-visible`, disabled i stan błędu;
- układać komponenty responsywnie bez CDN.

## HTML

Wykorzystaj `header`, `nav`, `main`, `section`, `article`, `form`, `label`,
`input`, `button`, `aside` i `footer`. Klasy opisują wygląd, a elementy nadal
opisują znaczenie.

## CSS

| Właściwość lub wartość | Zastosowanie |
| --- | --- |
| `display: flex` | Układ navbaru i stopki w jednej osi. |
| `justify-content: space-between` | Rozsuwa logo i linki. |
| `flex-wrap: wrap` | Pozwala linkom przejść do kolejnego wiersza. |
| `gap` | Stały odstęp między elementami komponentu. |
| `padding`, `margin`, `border-radius` | Wspólna geometria karty i formularza. |
| `:hover`, `:focus-visible` | Informują o interakcji myszy i klawiatury. |
| `@media` | Upraszcza navbar na wąskim ekranie. |

## JavaScript

Brak JavaScriptu; stany są pokazane w CSS i natywnym formularzu.

## Biblioteki

Brak bibliotek. To celowo wersja raw CSS.

## Zadanie do wykonania

1. Zmień tekst navbaru i dodaj trzeci link.
2. Dodaj kartę z badge oraz stan „brak danych”.
3. Dodaj formularz z błędem, widocznym focusem i przyciskiem disabled.
4. Zbuduj footer z dwoma grupami linków i sprawdź zawijanie przy 390 px.
5. Nie używaj tabeli ani inline style.

## Kryteria zaliczenia

- wszystkie komponenty działają bez frameworka;
- każdy interaktywny element ma stan focus;
- navbar i footer nie wychodzą poza ekran;
- wersja z `207` może odtworzyć ten sam układ klasami Bootstrapa.
