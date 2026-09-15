# Ćwiczenie 407 — PHP `DELETE`

Ostatnia operacja CRUD w wersji server-rendered. Usuwanie jest celowo proste,
żeby można było prześledzić ID, prepared statement i komunikat wyniku.

## Czego się nauczysz

- walidować identyfikator;
- wykonywać `DELETE ... WHERE id = ?`;
- sprawdzać `affected_rows`;
- rozważać potwierdzenie operacji i CSRF w prawdziwej aplikacji.

## HTML

Formularz `POST` przesyła ID, `min="1"` odrzuca oczywiste błędy w przeglądarce,
a `role="status"` oznacza wynik operacji.

## CSS

Brak własnego CSS.

## JavaScript

Brak JavaScriptu. Potwierdzenie opisujemy jako następne ulepszenie.

## Biblioteki

Brak bibliotek; używany jest `mysqli`.

## PHP i SQL

| Zapis | Znaczenie |
| --- | --- |
| `DELETE FROM offers WHERE id = ?` | Usuwa tylko wskazany rekord. |
| `bind_param('i', $id)` | Przekazuje ID jako integer. |
| `affected_rows` | Rozróżnia usunięcie od nieistniejącego ID. |

## Zadanie do wykonania

1. Dodaj stronę potwierdzenia z nazwą rekordu przed usunięciem.
2. Zablokuj usuwanie dla pustego, ujemnego i tekstowego ID.
3. Usuń istniejący rekord, powtórz tę samą operację i zapisz oba komunikaty.
4. Opisz, dlaczego w aplikacji publicznej potrzebny byłby token CSRF.

## Kryteria zaliczenia

- ID nie jest doklejane do SQL jako tekst;
- użytkownik widzi różnicę między sukcesem i brakiem rekordu;
- operacja działa bez JavaScriptu;
- uczeń zna ryzyko niepotwierdzonego usuwania.
