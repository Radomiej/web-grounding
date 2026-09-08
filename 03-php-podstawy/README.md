# Ćwiczenie 03 — PHP w HTML

Uruchom `index.php` przez Apache/XAMPP. Plik najpierw przygotowuje dane w PHP, a później przechodzi do HTML. To początek opcjonalnej ścieżki PHP.

## Czego się nauczysz

- Osadzać PHP w dokumencie HTML.
- Tworzyć zmienne, tablicę, warunek i pętlę.
- Wyświetlać tekst przez `echo` i skrót `<?= ... ?>`.
- Kodować dynamiczny tekst funkcją `htmlspecialchars`.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `doctype`, `html lang`, `head`, `charset`, `viewport`, `title`, `body` | Tworzą poprawny dokument HTML5; tytuł jest tym razem generowany przez PHP. |
| `<style>` | Umieszcza mały arkusz CSS bezpośrednio w dokumencie. |
| `<header>`, `<main>` | Oddzielają wprowadzenie od głównej treści. |
| `<h1>`, `<h2>`, `<p>` | Tworzą nagłówki i akapity. |
| `<ul>` i `<li>` | Tworzą listę tematów generowaną w pętli PHP. |
| `<code>` | Oznacza omawiane symbole języka. |

## CSS

| Zapis | Efekt |
| --- | --- |
| `max-width: 50rem`, `margin: 0 auto`, `padding: 1rem` | Ograniczają, centrują i odsuwają treść. |
| `font: 1rem/1.6 system-ui, sans-serif` | Skrót ustawia rozmiar, interlinię i rodzinę czcionki. |
| `color: #172033` | Ustawia kolor tekstu. |
| `border: 1px solid #9eabc2`, `border-radius: 0.5rem` | Dodają ramkę i zaokrąglenie głównej treści. |
| `padding: 0.1rem 0.3rem` | Dodaje mały pionowy i poziomy odstęp w `code`. |
| `background: #eef2f8` | Wyróżnia fragment kodu tłem. |

## JavaScript

Nie jest używany.

## Biblioteki

Brak bibliotek. Wymagany jest jedynie lokalny interpreter PHP, np. z XAMPP.

## PHP

| Zapis | Znaczenie |
| --- | --- |
| `<?php ... ?>` | Otwiera i zamyka blok wykonywany przez PHP. |
| `$pageTitle = '...'` | Tworzy zmienną i przypisuje tekst operatorem `=`. |
| `['zmienne', ...]` | Tworzy tablicę indeksowaną. |
| `(int) date('G')` | Pobiera godzinę i konwertuje wynik na liczbę całkowitą. |
| `$hour < 18 ? a : b` | Operator warunkowy wybiera jedną z dwóch wartości. |
| `.` | Łączy teksty. |
| `echo` | Wysyła tekst do odpowiedzi HTML. |
| `<?= value ?>` | Krótszy zapis `<?php echo value; ?>`. |
| `foreach ($topics as $topic)` | Wykonuje blok dla każdego elementu tablicy. |
| `foreach: ... endforeach;` | Alternatywna składnia wygodna wewnątrz HTML. |
| `htmlspecialchars(value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8')` | Koduje znaki HTML, cudzysłowy i nieprawidłowe sekwencje UTF-8. |

## Zadanie

Zmień imię, dodaj temat do tablicy, zmodyfikuj próg godziny i porównaj `echo` ze skrótem `<?= ... ?>`.
