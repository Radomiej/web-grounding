# Ćwiczenie 101 — czysty HTML od podstaw

Seria `1xx` celowo nie zawiera CSS ani JavaScriptu. Najpierw naucz się opisywać
strukturę i znaczenie treści, a dopiero potem przejdź do [CSS 201](../201-css-podstawy/).

## Czego się nauczysz

- zbudować poprawny dokument HTML5;
- rozróżniać nagłówki, akapity, listę, sekcję i stopkę;
- tworzyć odnośniki względne;
- używać `id` i `aria-labelledby` do nazwania sekcji;
- sprawdzić strukturę strony bez żadnych bibliotek.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `<!doctype html>` | Włącza standard HTML5. |
| `<html lang="pl">` | Jest korzeniem dokumentu i określa język polski. |
| `<head>` | Zawiera metadane strony. |
| `<meta charset="UTF-8">` | Ustawia kodowanie dla polskich znaków. |
| `<meta name="viewport" ...>` | Dopasowuje stronę do szerokości urządzenia. |
| `<title>` | Ustawia tytuł karty przeglądarki. |
| `<body>` | Obejmuje widoczną treść. |
| `<header>` | Zawiera wprowadzenie dokumentu. |
| `<main>` | Oznacza główną, unikalną treść. |
| `<section>` | Grupuje jeden temat. |
| `<h1>` i `<h2>` | Tworzą hierarchię nagłówków. |
| `<p>` | Tworzy akapit. |
| `<ul>` i `<li>` | Tworzą listę nieuporządkowaną. |
| `<a href="...">` | Tworzy odnośnik do innego dokumentu. |
| `<code>` | Oznacza fragment kodu. |
| `<footer>` | Oznacza stopkę dokumentu. |
| `id` | Nadaje elementowi unikalną nazwę. |
| `aria-labelledby` | Nadaje sekcji nazwę przez wskazany nagłówek. |

## CSS

Brak CSS. Przeglądarka pokazuje domyślne style, dzięki czemu widać, że HTML
opisuje strukturę, a nie wygląd.

## JavaScript

Brak JavaScriptu.

## Biblioteki

Brak bibliotek i zewnętrznych zależności.

## Zadanie do wykonania

Przerób starter na stronę swojej szkoły:

1. zmień `lang` na właściwy język i uzupełnij `title`;
2. dodaj skip-link prowadzący do `main`;
3. dodaj drugą sekcję z własnym `h2` i `aria-labelledby`;
4. dodaj link do `102-html-tekst-i-listy`;
5. pozostaw dokładnie jeden `main` i jeden `h1`.

## Kryteria zaliczenia

- dokument ma poprawne metadane `charset`, `viewport` i `title`;
- język dokumentu jest ustawiony przez `html lang`;
- skip-link wskazuje istniejące `id`;
- strona pozostaje czystym HTML bez CSS i JavaScriptu.
