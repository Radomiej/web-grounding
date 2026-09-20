# Uruchomienie kursu — instrukcja ucznia

Lekcje `101–314` są statyczne i nie wymagają PHP ani bazy. Możesz otworzyć ich
`index.html` bezpośrednio w przeglądarce. XAMPP jest potrzebny dopiero do
lekcji PHP osadzanego `401–407` oraz końcowego dodatku API `408–412`.

Jeśli chcesz tylko sprawdzić gotowe przykłady bez instalowania PHP, autor kursu
może uruchomić [test kontenerowy](tests/php-container/README.md). Docker wykonuje
PHP i MariaDB, a Python wysyła żądania testowe; nie jest to środowisko do pracy
na produkcyjnej bazie.

## 1. Najprostszy start bez PHP

Otwórz `101-html-podstawy/index.html`, a następnie wybierz kolejność opisaną w
głównym README. Nie usuwaj katalogu `assets`, ponieważ zawiera lokalny
Bootstrap oraz grafiki galerii i Canvas.

## 2. Skopiuj projekt do XAMPP, jeżeli uczysz się PHP

Skopiuj cały folder `web-grounding` do:

```text
C:\xampp\htdocs\web-grounding
```

Nie otwieraj plików PHP dwuklikiem ani adresem zaczynającym się od `file://`. PHP musi zostać wykonane przez Apache.

## 3. Uruchom serwery

Otwórz **XAMPP Control Panel** i kliknij **Start** przy:

- Apache,
- MySQL.

Oba moduły powinny być oznaczone jako uruchomione.

## 4. Zaimportuj bazę

1. Otwórz [http://localhost/phpmyadmin](http://localhost/phpmyadmin).
2. Wybierz zakładkę **Import**.
3. Wskaż `database/web_grounding.sql`.
4. Pozostaw format **SQL** i wykonaj import.
5. Po lewej stronie powinna pojawić się baza `web_grounding` z tabelami `offers` i `places`.

Ponowny import usuwa i odtwarza tylko dwie szkoleniowe tabele w bazie `web_grounding`.

## 5. Otwieraj ćwiczenia

### Seria 1xx–3xx: HTML, CSS i JavaScript

- [http://localhost/web-grounding/101-html-podstawy/](http://localhost/web-grounding/101-html-podstawy/)
- [http://localhost/web-grounding/102-html-tekst-i-listy/](http://localhost/web-grounding/102-html-tekst-i-listy/)
- [http://localhost/web-grounding/103-html-struktura-strony/](http://localhost/web-grounding/103-html-struktura-strony/)
- [http://localhost/web-grounding/104-html-tabele/](http://localhost/web-grounding/104-html-tabele/)
- [http://localhost/web-grounding/105-html-formularze/](http://localhost/web-grounding/105-html-formularze/)
- [http://localhost/web-grounding/106-html-media-i-dostepnosc/](http://localhost/web-grounding/106-html-media-i-dostepnosc/)
- [http://localhost/web-grounding/201-css-podstawy/](http://localhost/web-grounding/201-css-podstawy/)
- [http://localhost/web-grounding/202-css-flexbox-sandbox/](http://localhost/web-grounding/202-css-flexbox-sandbox/)
- [http://localhost/web-grounding/203-css-flexbox-wlasny-layout/](http://localhost/web-grounding/203-css-flexbox-wlasny-layout/)
- [http://localhost/web-grounding/204-css-flexbox-wiecej-mozliwosci/](http://localhost/web-grounding/204-css-flexbox-wiecej-mozliwosci/)
- [http://localhost/web-grounding/205-css-grid/](http://localhost/web-grounding/205-css-grid/)
- [http://localhost/web-grounding/206-css-komponenty/](http://localhost/web-grounding/206-css-komponenty/)
- [http://localhost/web-grounding/207-css-bootstrap-lokalnie/](http://localhost/web-grounding/207-css-bootstrap-lokalnie/)
- [http://localhost/web-grounding/301-javascript-podstawy/](http://localhost/web-grounding/301-javascript-podstawy/)
- [http://localhost/web-grounding/302-javascript-dom-i-formularz/](http://localhost/web-grounding/302-javascript-dom-i-formularz/)
- [http://localhost/web-grounding/303-javascript-klasy-i-theme/](http://localhost/web-grounding/303-javascript-klasy-i-theme/)
- [http://localhost/web-grounding/311-javascript-projekt-inf03/](http://localhost/web-grounding/311-javascript-projekt-inf03/)
- [http://localhost/web-grounding/312-javascript-timer/](http://localhost/web-grounding/312-javascript-timer/)
- [http://localhost/web-grounding/313-canvas-podstawy/](http://localhost/web-grounding/313-canvas-podstawy/)
- [http://localhost/web-grounding/314-canvas-hud-gra/](http://localhost/web-grounding/314-canvas-hud-gra/)
- Pozostałe lekcje serii `3xx` są wymienione w [README](README.md).

### Seria 4xx: PHP osadzane w HTML

- [http://localhost/web-grounding/401-php-podstawy/](http://localhost/web-grounding/401-php-podstawy/)
- [http://localhost/web-grounding/402-php-czytanie-bazy/](http://localhost/web-grounding/402-php-czytanie-bazy/)
- [http://localhost/web-grounding/403-php-formularz-i-select/](http://localhost/web-grounding/403-php-formularz-i-select/)
- [http://localhost/web-grounding/404-php-insert/](http://localhost/web-grounding/404-php-insert/)
- [http://localhost/web-grounding/405-php-filtrowanie/](http://localhost/web-grounding/405-php-filtrowanie/)
- [http://localhost/web-grounding/406-php-update/](http://localhost/web-grounding/406-php-update/)
- [http://localhost/web-grounding/407-php-delete/](http://localhost/web-grounding/407-php-delete/)

Najpierw przejdź całą ścieżkę osadzaną: PHP przygotowuje dane i od razu
wyrenderowuje znaczniki HTML. To jest podstawowy sposób pracy na arkuszach,
które wymagają tabeli, listy albo formularza po stronie serwera.

### API/JSON jako dodatek po PHP osadzanym

- [http://localhost/web-grounding/408-php-api-json/](http://localhost/web-grounding/408-php-api-json/)
- [http://localhost/web-grounding/409-php-api-insert/](http://localhost/web-grounding/409-php-api-insert/)
- [http://localhost/web-grounding/410-php-api-filtrowanie/](http://localhost/web-grounding/410-php-api-filtrowanie/)
- [http://localhost/web-grounding/411-php-api-update/](http://localhost/web-grounding/411-php-api-update/)
- [http://localhost/web-grounding/412-php-api-delete/](http://localhost/web-grounding/412-php-api-delete/)

Numer `408` ma jedną lekcję startową API, a `409–412` pokazują kolejne operacje
PHP ↔ JavaScript. Stare aliasy i foldery poniżej `100` zostały usunięte, więc
każdy numer w mapie prowadzi do dokładnie jednej lekcji.

## 6. Co uczeń powinien umieć wskazać

W przykładach PHP znajdź:

1. dane połączenia z bazą,
2. tekst zapytania `SELECT`,
3. wynik zwrócony przez `mysqli_query`,
4. pętlę pobierającą kolejne rekordy,
5. miejsce, w którym dane z PHP trafiają do HTML (najpierw `401–407`),
6. pętlę `foreach`/`while`, która tworzy wiele wierszy, kart albo opcji,
7. zamknięcie połączenia i obsługę błędu po stronie serwera,
8. `mysqli_prepare`, `mysqli_stmt_bind_param` i `mysqli_stmt_execute` w lekcjach `403–407`,
9. walidację danych przed `INSERT`, `UPDATE` albo `DELETE` i kod `404` dla nieistniejącego rekordu,
10. dopiero w `408–412`: różnicę między `GET`, `POST`, `PUT` i `DELETE`, nagłówek JSON,
    `fetch()` oraz odpowiedź z kodem HTTP.

## Typowe błędy

- **Not Found / 404** — folder nie znajduje się pod `C:\xampp\htdocs\web-grounding` albo adres ma złą nazwę.
- **PHP wyświetla się jako tekst** — plik został otwarty bez Apache albo ma rozszerzenie `.html` zamiast `.php`.
- **Connection refused** — MySQL nie jest uruchomiony.
- **Unknown database `web_grounding`** — dump SQL nie został zaimportowany.
- **Access denied for user `root`** — lokalny MySQL ma inne hasło; zmień piąty argument `mysqli_connect` w przykładzie.
- **Apache nie startuje** — port 80 jest zajęty. Sprawdź komunikat XAMPP i użyj skonfigurowanego portu, np. `http://localhost:8080/...`.
- **Projekt 408–412 pokazuje błąd** — otwórz `api.php` w przeglądarce i sprawdź
  zwrócony JSON; w `401–407` sprawdzaj bezpośrednio wyrenderowany HTML.

## Reguła egzaminacyjna

Najpierw realizuj dosłownie wymaganie arkusza. Jeśli skrypt PHP ma „wyświetlać” dane, generuj wskazane elementy HTML w PHP. Wariant JSON i JavaScript stosuj tylko wtedy, gdy nie omija on wymaganego kryterium.

## Nowa progresja JavaScript

Po 301 i 302 przejdź kolejno przez 303–312 według [mapy kursu](README.md). Bootstrap 207 pozostaje dodatkiem. Otwieraj index.html wybranej lekcji; nie potrzebujesz npm ani XAMPP.

W 202 generator pozwala pobrać layout.html. Gdy kopiowanie jest zablokowane, zaznaczony kod skopiuj Ctrl+C. W 309 zapis localStorage przy file:// zależy od przeglądarki; lekcja obsługuje brak dostępu. Aby mieć stabilne pochodzenie zapisu, możesz użyć lokalnego serwera, np. Live Server w edytorze albo Apache XAMPP.

W 310 zacznij od start/index.html. W 312 steruj strzałkami lub WASD po skupieniu sceny; na telefonie użyj przycisków. HUD jest HTML-em nałożonym na Canvas przez position:absolute.
