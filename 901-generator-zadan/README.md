# Lekcja 901 — generator lokalnych zadań INF.03/INF.04

To pierwsza lekcja serii `9xx`. Generator działa jako zwykły plik HTML, bez
PHP, npm, CDN i bibliotek zewnętrznych. Po wybraniu kwalifikacji, obszaru,
poziomu i ziarna losowania pokazuje lokalny opis zadania, sposób przygotowania,
checklistę kryteriów, materiały z repozytorium oraz kod diagramu Mermaid.

## Czego się nauczysz

- rozdzielać treść zadania, kryteria i sposób przygotowania;
- budować wynik z danych w DOM bez przeładowania strony;
- zapisywać przebieg pracy jako diagram Mermaid;
- odróżniać lokalne ćwiczenie od oficjalnego arkusza CKE.

## Wersja lokalna a oficjalny arkusz

Wyniki generatora są autorskimi zadaniami treningowymi. Nie są kopią arkusza
CKE i nie zmieniają znaczenia PDF-ów w [`docs/inf03/arkusze.md`](../docs/inf03/arkusze.md)
i [`docs/inf04/arkusze.md`](../docs/inf04/arkusze.md). Przed prawdziwym
ćwiczeniem przeczytaj cały arkusz, a gotową paczkę rozwiązania otwieraj dopiero
po własnej próbie.

## Co pokazuje przykład

- `select#qualification`, `select#topic`, `select#level` i `input#seed` —
  kontrolki formularza;
- poziom `start` skraca checklistę do dwóch punktów, a `standard`/`exam`
  pokazują pełny mini-arkusz;
- `form` i zdarzenie `submit` — generowanie bez przeładowania strony;
- tablice obiektów `taskSets` — lokalna baza zadań, którą można rozszerzać;
- `createElement`, `textContent`, `replaceChildren` — bezpieczne budowanie
  wyniku w DOM;
- checkboxy kryteriów, linki do lokalnych lekcji i `navigator.clipboard`;
- kod Mermaid `flowchart LR` oraz prosty podgląd przepływu z Flexboxa.

## HTML

| Zapis | Znaczenie |
| --- | --- |
| `header`, `main`, `section`, `article`, `footer` | semantyczne części dokumentu |
| `form`, `label`, `select`, `option`, `input`, `button` | formularz generatora i dostępne etykiety |
| `ol`, `ul`, `li`, `dl`, `dt`, `dd` | instrukcja, checklista i pary „nazwa — wartość” |
| `aria-live`, `aria-labelledby`, `role="status"` | przekazywanie zmian także czytnikowi ekranu |

## CSS

| Właściwość/wartość | Znaczenie |
| --- | --- |
| `display: grid` | siatka pól i dwóch kolumn wyniku |
| `display: flex`, `flex-wrap`, `gap`, `align-items` | przyciski i podgląd węzłów diagramu |
| `clamp()`, `minmax()`, `auto-fit` | płynny rozmiar nagłówka i responsywne kolumny |
| `:focus-visible`, `:hover`, `@media` | obsługa klawiatury, wskazanie przycisku i mały ekran |
| `overflow-wrap: anywhere`, `overflow: auto` | długie ścieżki i kod Mermaid nie rozsadzają strony |

## JavaScript

Kod lekcji używa tablic obiektów, zdarzeń formularza, bezpiecznego tworzenia
DOM oraz `navigator.clipboard`. Szczegółowe omówienie znajduje się w sekcji
[Co pokazuje przykład](#co-pokazuje-przykład).

## Biblioteki

Brak. Przykład używa tylko standardowych API przeglądarki i działa offline.

## Jak rozszerzyć bazę

1. Dodaj obiekt do `taskSets['INF.03']` albo `taskSets['INF.04']`.
2. Uzupełnij `topic`, `brief`, `details`, `preparation`, `criteria`,
   `materials` i tablicę `flow`.
3. W `topicLabels` dodaj nazwę nowego obszaru, aby pojawił się w wyborze.
4. Otwórz `index.html`, wybierz ziarno i sprawdź wynik na szerokim oraz
   wąskim ekranie.

## Zadanie dla ucznia

Dodaj trzeci wariant INF.03 dotyczący galerii zdjęć. Ma mieć sześć kryteriów,
co najmniej cztery kroki przygotowania oraz diagram z etapami: wymagania →
HTML → CSS → JavaScript → test. Nie kopiuj istniejącego opisu — wymyśl własny
kontekst i wskaż, które lokalne lekcje są potrzebne.

## Kryteria zaliczenia

- Generator tworzy kompletne zadanie z opisem, kryteriami, materiałami i diagramem Mermaid.
- Wygenerowany tekst można skopiować albo pobrać bez serwera i bez zewnętrznych bibliotek.
- Nowy wariant jest dostępny na liście i zachowuje sensowną kolejność etapów.
