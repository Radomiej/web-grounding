# Ćwiczenie 106 — media i dostępność

Ostatnia lekcja HTML przygotowuje stronę do pracy z obrazami, podpisami i
treścią ujawnianą na żądanie. Nadal nie ma tu CSS ani JavaScriptu.

## Czego się nauczysz

- używać `img`, `figure` i `figcaption`;
- dobierać opis `alt` do celu obrazu;
- tworzyć linki względne i sprawdzać ich cel;
- używać `details` i `summary` bez własnego skryptu;
- zachowywać wymiary obrazu, aby uniknąć pustego miejsca podczas ładowania.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `img src alt` | Wstawia obraz i opisuje go tekstem alternatywnym. |
| `width`, `height` | Podają proporcje i pomagają przeglądarce zarezerwować miejsce. |
| `figure` / `figcaption` | Łączą grafikę z podpisem. |
| `details` / `summary` | Tworzą natywne rozwijane objaśnienie. |
| `a href` | Linkuje do dokumentu lub sekcji. |
| `loading="lazy"` | Może odroczyć ładowanie obrazu poza ekranem. |

## CSS

Brak CSS. Dopiero później ustawimy `max-width`, `height: auto` i ramkę obrazów.

## JavaScript

Brak JavaScriptu — `details` działa natywnie.

## Biblioteki

Brak bibliotek. Obraz pochodzi z lokalnego katalogu `assets/lessons`.

## Zadanie do wykonania

1. Dodaj drugi lokalny obraz z opisem `alt` i `figcaption`.
2. Zmień jeden obraz na dekoracyjny i uzasadnij `alt=""` w komentarzu HTML.
3. Dodaj link z opisem celu oraz drugi blok `details`.
4. Sprawdź, czy żaden link ani obraz nie ma błędnej ścieżki.

## Kryteria zaliczenia

- każdy obraz ma świadomie dobrany `alt`;
- podpis jest powiązany z obrazem przez `figure`;
- strona działa po otwarciu lokalnego pliku bez sieci;
- treść dodatkowa jest dostępna z klawiatury.
