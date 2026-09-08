# Ćwiczenie 01 — HTML od podstaw

Otwórz `index.html` i porównaj kod ze stroną w przeglądarce. To ćwiczenie pokazuje, że HTML opisuje znaczenie i kolejność treści, a CSS odpowiada za wygląd.

## Czego się nauczysz

- Rozpoznawać szkielet dokumentu HTML5.
- Budować nagłówki, akapity, sekcję, listę, odnośnik i stopkę.
- Dołączać zewnętrzny arkusz CSS.
- Odróżniać semantykę HTML od prezentacji CSS.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `<!doctype html>` | Informuje przeglądarkę, że dokument używa współczesnego HTML5. |
| `<html lang="pl">` | Jest korzeniem dokumentu i określa język polski. |
| `<head>` | Zawiera ustawienia i informacje niewyświetlane jako główna treść. |
| `<meta charset="UTF-8">` | Ustawia kodowanie obsługujące polskie znaki. |
| `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Dopasowuje szerokość strony do urządzenia i ustawia początkową skalę. |
| `<title>` | Ustawia tytuł karty przeglądarki. |
| `<link rel="stylesheet" href="style.css">` | Dołącza lokalny arkusz stylów. |
| `<body>` | Obejmuje widoczną treść dokumentu. |
| `<header>` | Zawiera wprowadzenie strony. |
| `<main>` | Oznacza główną, unikalną treść. |
| `<section>` | Grupuje treść jednego tematu. |
| `<h1>` i `<h2>` | Tworzą główny nagłówek i nagłówek sekcji. |
| `<p>` | Tworzy akapit. |
| `<ul>` i `<li>` | Tworzą listę nieuporządkowaną i jej elementy. |
| `<code>` | Oznacza fragment kodu. |
| `<a href="...">` | Tworzy odnośnik do kolejnej lekcji. |
| `<footer>` | Oznacza stopkę strony. |
| `id="najwazniejsze-elementy"` | Nadaje nagłówkowi unikalny identyfikator. |
| `aria-labelledby="najwazniejsze-elementy"` | Nadaje sekcji nazwę przez wskazany nagłówek. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `:root` | Wybiera główny element dokumentu i ustawia wartości dziedziczone. |
| `color-scheme: light` | Informuje przeglądarkę, że strona używa jasnego schematu. |
| `font-family: system-ui, sans-serif` | Używa czcionki systemowej, a w razie potrzeby dowolnej bezszeryfowej. |
| `line-height: 1.6` | Ustawia interlinię na `1.6` wysokości tekstu. |
| `max-width: 60rem` | Ogranicza szerokość treści. `rem` zależy od bazowego rozmiaru pisma. |
| `margin: 0 auto` | Usuwa pionowy margines i centruje blok w poziomie. |
| `padding: 1rem` / `1rem 1.25rem` | Dodaje odstęp wewnętrzny; zapis dwuwartościowy oznacza pion i poziom. |
| `color: #172033` | Ustawia ciemny kolor tekstu. |
| `background: #f5f7fb` / `#ffffff` | Ustawia tło strony i białe tło paneli. |
| `margin-block: 1rem` | Dodaje margines na początku i końcu osi tekstu, tutaj pionowo. |
| `border: 1px solid #aeb9ce` | Rysuje ciągłą ramkę o grubości jednego piksela. |
| `border-radius: 0.5rem` | Zaokrągla rogi. |
| `a { color: #0645ad }` | Ustawia kolor odnośnika. |
| `a:focus-visible` | Wybiera odnośnik fokusowany klawiaturą. |
| `outline: 3px solid #f59e0b` | Rysuje widoczną obwódkę fokusu. |
| `outline-offset: 3px` | Odsuwa obwódkę od elementu. |

## JavaScript

Nie jest używany.

## Biblioteki

Brak bibliotek i zewnętrznych zależności.

## Zadanie

Zmień nagłówek, dodaj element listy, utwórz drugi odnośnik i nową sekcję z własnym `h2` oraz poprawnym `aria-labelledby`.
