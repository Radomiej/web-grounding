# Plan nauki i spis zagadnień INF.03/INF.04

Ten dokument jest mapą nauki na podstawie lokalnego zestawu **71 arkuszy
INF.03** i **26 arkuszy INF.04**. Pełne polecenie i kryteria są zawsze w PDF-ie
konkretnego wariantu: [indeks INF.03](./inf03/arkusze.md) i
[indeks INF.04](./inf04/arkusze.md). Nazwy tematów poniżej pochodzą z
publicznych indeksów; tam, gdzie źródło nie podaje tytułu, nie zgaduję treści.

## INF.03 — strony i aplikacje internetowe

### Co trzeba umieć

| Obszar | Umiejętności do przećwiczenia | Gdzie ćwiczyć w kursie |
| --- | --- | --- |
| HTML | `lang`, `title`, landmarki, nagłówki, akapity, `div`, listy, tabele, linki, obrazy, `alt`, formularze i poprawne etykiety | `101–106` |
| CSS | selektory, kolory, typografia, box model, margin/padding/border/radius, pseudo-klasy, responsywność i media queries | `201`, `205–207` |
| Flexbox | main/cross axis, `flex-direction`, `flex-wrap`, `justify-content`, `align-items`, `align-content`, `gap`, `flex-basis`, `flex-grow`, `flex-shrink`, `align-self`, `order`; rozróżnienie rodzica i dziecka | `202–204` |
| JavaScript | zmienne, DOM, edycja tekstu, klasy/theme, warunki, pętle, tablice, formularze, walidacja, dynamiczny DOM, `localStorage`, timer i JSON | `301–312` |
| Grafika w przeglądarce | `canvas`, układ współrzędnych, prostokąty/tekst/obrazy, DPR, pętla animacji i HUD absolutny | `313-canvas-podstawy`, `314-canvas-hud-gra` |
| PHP/MySQL (jeżeli wymaga arkusz) | zmienne, `mysqli`, `SELECT`, `POST`, generowanie HTML, `INSERT`, `LIKE`, `UPDATE`, `DELETE`, prepared statements i JSON jako dodatek | `401–408` |
| Organizacja pracy | odczyt wymagań, nazwy plików, ścieżki względne, przygotowanie assetów, zrzuty ekranu i sprawdzenie każdego kryterium z kluczem | każdy arkusz |

### Spis zadań i rodzin tematów

Pełny wykaz wariantów z bezpośrednimi linkami do PDF-ów i paczek znajduje się
w [tabeli 71 arkuszy](./inf03/arkusze.md). Poniższe grupy pomagają wybrać
ćwiczenie; nie zastępują lektury polecenia.

| Rodzina zadań | Przykładowe warianty z nazwanym tematem | Co przećwiczyć |
| --- | --- | --- |
| Witryny firmowe i informacyjne | 2025.01-01 „Witryna firmy szkoleniowej”, 02 „Firma montażu paneli”, 05 „Firma szkoleniowa”, 12 „Witryna piekarni”; 2024.01-01 „Witryna firmy IT”, 02 „Pogotowie komputerowe”, 08 „Salon fryzjerski w XAMPP” | semantyczny HTML, layout, typografia, formularz kontaktowy, obrazy, wersja mobilna; w wariancie XAMPP także PHP/SQL |
| Listy, katalogi i portale | 2025.06-03 „Portal biblioteki szkolnej”, 04 „Portal firmy przewozowej”, 06 „Portal biblioteki internetowej”, 07 „Portal wycieczek”, 08 „Portal o smokach”, 11 „Portal sprzedaży opon”, 12 „Przychodnia Medica” | karty/listy, filtry, tabele, obrazy, nawigacja, Flexbox, walidacja i interakcje JS |
| Dane i baza | 2025.06-09 „Portal remontowy z bazą”, 10 „Portal szkoleniowy z bazą”; 2025.01-03 „Kalendarz imienin w PHP”, 04 „Hurtownia obuwia”; 2024.01-04 „Kalendarz z bazą”, 05 „Salon kosmetyczny z bazą” | model prostych tabel, `SELECT`, warunki, sortowanie, formularz `POST`, generowanie wyników, API JSON oraz testy `INSERT`/`UPDATE`/`DELETE` |
| Interaktywne formularze i logika | 2025.06-01 „Ranking gier”, 02 „Planer zadań z notatkami”, 05 „Salon fotograficzny online”; 2025.01-07 „Wyszukiwarka miast”, 08 „Mieszalnia farb”, 10 „Koło szachowe”, 11 „Losowanie nagród” | tablice/obiekty, zdarzenia, filtrowanie, losowanie, obliczenia, komunikaty i walidacja |
| Algorytmy i liczby | 2025.01-06 „Serwis o systemach liczbowych” | konwersje, operatory, pętle, funkcje pomocnicze, dane wejściowe i czytelny wynik |
| Nowe i nieopisane skrótowo warianty | 12 wariantów 2026.01, 12 wariantów 2024.06, 2023.01-01..05, 2022.06-01..03, 2022.01-01, 2021.06-01 oraz 2026 LATO | otworzyć PDF, wypisać czasowniki „utwórz/wyświetl/sprawdź/zapisz”, a następnie przypisać je do checklisty HTML/CSS/JS/PHP/SQL |

### Minimalna kolejność pracy INF.03

1. Zbuduj strony informacyjną, tekstową, tabelę, formularz i media.
2. Odtwórz layout w raw CSS, Flexboxie i Gridzie; sprawdź 390 px.
3. Dodaj JS: edycję DOM, klasy/theme, walidację, dynamiczną listę i timer.
4. Wybierz jeden arkusz bez PHP i wykonaj go na czas, dokumentując kryteria.
5. Dopiero potem wybierz arkusz z PHP/MySQL i przećwicz przepływ
   `SELECT → POST → INSERT → UPDATE → DELETE`.
6. Na końcu dodaj JSON/fetch, a następnie `canvas`/HUD jako rozszerzenie, nie zamiast
   podstaw egzaminacyjnych.

## INF.04 — projektowanie, programowanie i testowanie aplikacji

### Spis zadań

| Sesja | Zadania znajdujące się w lokalnym indeksie |
| --- | --- |
| 2026.01 | `01` logika pojedynczej kości — konsola/mobilna; `02` quiz z klasami `Pytanie` i `PytanieZamkniete` — konsola/mobilna |
| 2025.06 | `01` loteria liczbowa — konsola/desktop; `01 SD` urządzenia domowe — dziedziczenie; `02` szyfr Cezara i testy jednostkowe — konsola/desktop |
| 2025.01 | `01` operacje na tablicach — konsola/web; `01 SD` i `02` urządzenia domowe — dziedziczenie, konsola/mobilna |
| 2024.06 | `01` gra w kości — konsola/mobilna; `01 SD` klasa narzędziowa dla łańcucha; `02` odtwarzacz muzyki i pliki — konsola/desktop |
| 2024.01 | `01` sprawdzanie PESEL — konsola/desktop; `01 SD` i `02` klasa narzędziowa dla łańcucha |
| 2023.06 | `01` sito Eratostenesa; `01 SD` i `03` wirtualna wypożyczalnia filmów; `02` sortowanie bąbelkowe |
| 2023.01 | `01` algorytm Euklidesa; `01 SD` i `02` klasa do obsługi notatek |
| 2022.06 | `01` wyszukiwanie z wartownikiem; `02` system forum użytkowników |
| 2022.01 / 2021.06 | sortowanie przez wybieranie |
| 2026 LATO | dodatkowy publiczny arkusz z sesji 2026 LATO — pełne wymagania w PDF |

Pełne 26 wierszy, pliki PDF i zasady oceniania są w [indeksie INF.04](./inf04/arkusze.md).
Wybrane projekty referencyjne można porównać w [37 paczkach TEB](./inf04/rozwiazania-teb/README.md),
a materiały startowe w [11 archiwach](./inf04/materialy/README.md).

### Co trzeba umieć

| Obszar | Umiejętności do przećwiczenia |
| --- | --- |
| Język i wejście/wyjście | wybrać jeden język wymagany przez stanowisko, typy, zmienne, operatory, konwersje, `if`, `switch`, pętle, funkcje, wejście z klawiatury i czytelne komunikaty |
| Tablice i tekst | indeksowanie, wyszukiwanie, min/max, zliczanie, sortowanie, operacje na łańcuchach, walidacja PESEL i szyfr Cezara |
| Algorytmy | Euclid, sito Eratostenesa, wyszukiwanie z wartownikiem, sortowanie przez wybieranie i bąbelkowe, losowanie i symulacja kości/loterii |
| OOP | klasa, pola, konstruktor, metody, enkapsulacja, dziedziczenie, nadpisanie, kompozycja; model `Pytanie`/`PytanieZamkniete`, urządzeń i notatek |
| Pliki i dane | odczyt/zapis pliku, format prostych rekordów, obsługa braku pliku i błędnych danych; przykład odtwarzacza muzyki |
| Interfejs aplikacji | rozdzielenie logiki od widoku oraz implementacja wariantu konsolowego, desktopowego, mobilnego albo webowego zgodnie z arkuszem |
| Testowanie | przypadki poprawne, graniczne i błędne, test jednostkowy (szczególnie Cezar), powtarzalne dane testowe i opis wyniku |
| Dokumentacja egzaminacyjna | nazwa projektu, kompilacja/uruchomienie, zrzuty ekranu, opis użytych klas/metod oraz zgodność z każdym kryterium oceniania |

### Minimalna kolejność pracy INF.04

1. Przerób pięć krótkich algorytmów na tablicach i tekstach, każdy z testem
   przypadku pustego, minimalnego i błędnego.
2. Zbuduj model klas (najpierw notatka lub urządzenie), dodaj dziedziczenie
   i sprawdź zachowanie metod na kilku obiektach.
3. Dodaj pliki albo prosty interfejs właściwy dla wariantu arkusza.
4. Zaimplementuj jeden pełny arkusz w wybranym języku, a drugi w innej
   rodzinie aplikacji (np. konsola → desktop/web).
5. Zakończ testami, dokumentacją i porównaniem z zasadami oceniania; dopiero
   po tym zaglądaj do paczki referencyjnej.

## Wspólna checklista przed uznaniem zadania za zrobione

- [ ] przeczytany cały PDF i wypisane kryteria punkt po punkcie;
- [ ] własny katalog pracy jest oddzielony od `pliki.zip` i `rozwiazanie.zip`;
- [ ] projekt uruchamia się z instrukcją odtworzenia;
- [ ] sprawdzone dane poprawne, graniczne i błędne;
- [ ] zrzuty ekranu pokazują wymagane stany, nie tylko ekran startowy;
- [ ] rozwiązanie porównane z kluczem/zasadami oceniania, a nie skopiowane.

Źródła indeksów: [EE-Informatyk INF.03](https://ee-informatyk.pl/inf03-ee09/praktyka/),
[EE-Informatyk INF.04](https://ee-informatyk.pl/inf04/praktyka/),
[zawodowe.edu.pl](https://zawodowe.edu.pl/arkusze-praktyczne/inf-03/),
[repozytorium TEB](https://github.com/Technikum-TEB-Edukacja-we-Wroclawiu/INF.04-rozwiazania)
i [CKE](https://bip.cke.gov.pl/artykul/142/896/informatory).
