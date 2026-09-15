# 312 — JavaScript: timer

Timer jest pierwszym ćwiczeniem, w którym kod uruchamia się wielokrotnie w
czasie. Najważniejsza zasada: przechowuj identyfikator interwału i nie twórz
drugiego, gdy pierwszy już działa.

## Wymagania wstępne

Lekcje 303–311: DOM, klasy, walidacja, tablice, zapis i projekt INF.03.

## Czego się nauczysz

- używać `setInterval` i `clearInterval`;
- formatować minuty i sekundy;
- obsługiwać start, pauzę, koniec i reset;
- blokować przyciski, gdy akcja nie ma sensu.

## HTML

`role="timer"` oznacza licznik, `aria-live="polite"` ogranicza agresywne
odczytywanie zmian, a `button type="button"` nie wysyła formularza.

## CSS

`clamp()` skaluje rozmiar licznika, `display: flex` i `flex-wrap` układają
przyciski, a `:disabled` pokazuje stan niedostępny.

## JavaScript

| API | Znaczenie |
| --- | --- |
| `setInterval` | Uruchamia funkcję co określony czas. |
| `clearInterval` | Zatrzymuje interwał. |
| `padStart` | Dodaje zero przed jednocyfrową liczbą. |
| `setInterval` ID | Uchwycona wartość pozwala nie uruchamiać drugiego timera. |
| `disabled` | Blokuje przycisk w stanie, w którym akcja nie ma sensu. |

## Biblioteki

Brak bibliotek.

## Zadanie do wykonania

1. Dodaj pole wyboru długości: 30, 60 albo 120 sekund.
2. Dodaj komunikat ostrzegawczy przy ostatnich 10 sekundach.
3. Zablokuj reset tylko podczas krótkiego testu i przywróć go po zakończeniu.
4. Sprawdź wielokrotne kliknięcie Start — czas nie może przyspieszyć.
5. Dodaj test ręczny: przełącz kartę i wróć do strony.

## Kryteria zaliczenia

- istnieje najwyżej jeden aktywny interwał;
- pauza nie zeruje czasu;
- reset zatrzymuje interwał i ustawia wartość początkową;
- komunikat i licznik są czytelne z klawiatury.
