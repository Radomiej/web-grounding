# Ćwiczenie 103 — semantyczna struktura strony

Lekcja pokazuje, jak rozdzielić nawigację, główną treść, artykuły, sekcje,
treść poboczną i stopkę. Elementy nie są ozdobnymi pudełkami — opisują role.

## Czego się nauczysz

- używać `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`;
- wiązać nagłówki z sekcjami przez `id` i `aria-labelledby`;
- rozumieć, kiedy informacja należy do artykułu, a kiedy do `aside`;
- tworzyć linki kotwiczące i kontakt przez `address`.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `header` | Wprowadzenie strony lub konkretnego artykułu. |
| `nav aria-label` | Zestaw głównych linków nawigacyjnych z nazwą dla technologii asystującej. |
| `main` | Jedyna główna treść dokumentu. |
| `section` | Tematyczna grupa z własnym nagłówkiem. |
| `article` | Samodzielna treść, np. wiadomość lub wpis. |
| `aside` | Treść poboczna, przydatna, ale niekonieczna do zrozumienia artykułu. |
| `footer` | Informacje końcowe strony lub artykułu. |
| `address` | Dane kontaktowe autora lub organizacji. |
| `href="#id"` | Link do elementu o wskazanym identyfikatorze. |
| `aria-labelledby` | Nadaje sekcji nazwę przez istniejący nagłówek. |

## CSS

Brak CSS. W serii `2xx` te same regiony zostaną ułożone Flexboxem i Gridem.

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek.

## Zadanie do wykonania

Przerób stronę na portal szkolny:

1. dodaj czwarty link do `nav` i odpowiadającą mu sekcję;
2. zamień jeden artykuł na własny temat, zachowując `h3`;
3. przenieś do `aside` informację, która nie jest potrzebna do głównego tekstu;
4. dodaj stopkę z adresem e-mail i linkiem kotwiczącym;
5. sprawdź, czy każdy `section` ma własny nagłówek i unikalny `id`.

## Kryteria zaliczenia

- dokument ma jeden `main`, jedną główną `nav` i logiczny układ regionów;
- `aside` nie zawiera kluczowego akapitu artykułu;
- linki kotwiczące prowadzą do istniejących identyfikatorów;
- hierarchia `h1` → `h2` → `h3` jest spójna.
