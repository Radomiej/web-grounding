# Ćwiczenie 207 — Bootstrap z lokalnego CSS

To ostatnia lekcja CSS. Najpierw zbuduj komponenty samodzielnie w 206, a tutaj
porównaj je z gotowymi klasami lokalnego Bootstrapa.

## Czego się nauczysz

- dołączyć lokalny `bootstrap.min.css`;
- używać `container`, `row`, `col-*`, `card`, `alert`, `btn` i utilities;
- zachować działanie strony po odłączeniu internetu;
- rozpoznać, które decyzje podejmuje framework, a które nadal należą do HTML.

## HTML

Semantyczne `header`, `main`, `section`, `article`, `form` i `footer` pozostają
takie same jak w wersji raw CSS. Bootstrap dodaje tylko klasy wyglądu i układu.

## CSS

| Klasa lub wartość | Znaczenie |
| --- | --- |
| `container` | Ogranicza szerokość i dodaje poziomy padding. |
| `row` | Tworzy wiersz systemu siatki. |
| `col-12`, `col-md-4` | Kolumna na całą szerokość lub od breakpointu `md`. |
| `g-4` | Odstęp między kolumnami i wierszami. |
| `card`, `card-body` | Gotowy komponent karty. |
| `alert alert-primary` | Komunikat z wariantem kolorystycznym. |
| `btn btn-primary` | Przycisk z gotowym stanem wizualnym. |
| `py-4`, `mb-3`, `fw-bold` | Utilities: padding pionowy, margin dół, grubszy tekst. |

## JavaScript

Brak własnego JavaScriptu. Komponenty wymagające JS są poza zakresem tej lekcji.

## Biblioteki

Jedyna biblioteka to lokalny Bootstrap 5.3.8 w
`assets/bootstrap/bootstrap.min.css`. Nie ma CDN.

## Zadanie do wykonania

1. Skopiuj układ z 206 i odtwórz go przez `container`, `row`, `col-*`, `card`.
2. Dodaj `alert` dla stanu błędu i drugi wariant przycisku.
3. Zmień breakpoint kolumn oraz odstęp `g-*`.
4. Odłącz internet i sprawdź, czy lokalny arkusz nadal działa.
5. W README wypisz, które klasy zastąpiły własne reguły z 206.

## Kryteria zaliczenia

- strona nie odwołuje się do `https://` ani CDN;
- układ działa przy 390 px i na desktopie;
- formularz i linki zachowują semantykę HTML;
- uczeń potrafi wskazać różnicę między raw CSS i Bootstrapem.
