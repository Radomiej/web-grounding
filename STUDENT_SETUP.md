# Uruchomienie kursu — instrukcja ucznia

Lekcje `01`, `02` oraz `07–12` są statyczne i nie wymagają PHP ani bazy. Możesz otworzyć ich `index.html` bezpośrednio w przeglądarce. XAMPP jest potrzebny dopiero do opcjonalnych lekcji `03–06`.

## 1. Najprostszy start bez PHP

Otwórz `01-html-podstawy/index.html`, a następnie wybierz frontendową kolejność opisaną w głównym README. Nie usuwaj katalogu `assets`, ponieważ lekcja 12 pobiera z niego lokalny Bootstrap.

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

### Ścieżka frontendowa

- [http://localhost/web-grounding/01-html-podstawy/](http://localhost/web-grounding/01-html-podstawy/)
- [http://localhost/web-grounding/02-html-formularz/](http://localhost/web-grounding/02-html-formularz/)
- [http://localhost/web-grounding/07-flexbox-sandbox/](http://localhost/web-grounding/07-flexbox-sandbox/)
- [http://localhost/web-grounding/08-flexbox-wlasny-layout/](http://localhost/web-grounding/08-flexbox-wlasny-layout/)
- [http://localhost/web-grounding/09-flexbox-wiecej-mozliwosci/](http://localhost/web-grounding/09-flexbox-wiecej-mozliwosci/)
- [http://localhost/web-grounding/10-javascript-podstawy/](http://localhost/web-grounding/10-javascript-podstawy/)
- [http://localhost/web-grounding/11-javascript-dom-i-formularz/](http://localhost/web-grounding/11-javascript-dom-i-formularz/)
- [http://localhost/web-grounding/12-bootstrap-lokalnie/](http://localhost/web-grounding/12-bootstrap-lokalnie/)

### Opcjonalna ścieżka PHP

- [http://localhost/web-grounding/01-html-podstawy/](http://localhost/web-grounding/01-html-podstawy/)
- [http://localhost/web-grounding/02-html-formularz/](http://localhost/web-grounding/02-html-formularz/)
- [http://localhost/web-grounding/03-php-podstawy/](http://localhost/web-grounding/03-php-podstawy/)
- [http://localhost/web-grounding/04-php-lista-z-bazy/](http://localhost/web-grounding/04-php-lista-z-bazy/)
- [http://localhost/web-grounding/05-php-formularz-i-select/](http://localhost/web-grounding/05-php-formularz-i-select/)
- [http://localhost/web-grounding/06-php-json-do-javascriptu/](http://localhost/web-grounding/06-php-json-do-javascriptu/)

## 6. Co uczeń powinien umieć wskazać

W przykładach PHP znajdź:

1. dane połączenia z bazą,
2. tekst zapytania `SELECT`,
3. wynik zwrócony przez `mysqli_query`,
4. pętlę pobierającą kolejne rekordy,
5. miejsce, w którym dane trafiają do HTML albo JSON,
6. zamknięcie połączenia.

## Typowe błędy

- **Not Found / 404** — folder nie znajduje się pod `C:\xampp\htdocs\web-grounding` albo adres ma złą nazwę.
- **PHP wyświetla się jako tekst** — plik został otwarty bez Apache albo ma rozszerzenie `.html` zamiast `.php`.
- **Connection refused** — MySQL nie jest uruchomiony.
- **Unknown database `web_grounding`** — dump SQL nie został zaimportowany.
- **Access denied for user `root`** — lokalny MySQL ma inne hasło; zmień piąty argument `mysqli_connect` w przykładzie.
- **Apache nie startuje** — port 80 jest zajęty. Sprawdź komunikat XAMPP i użyj skonfigurowanego portu, np. `http://localhost:8080/...`.
- **Projekt 06 pokazuje błąd** — otwórz najpierw `api.php` w przeglądarce i sprawdź zwrócony JSON.

## Reguła egzaminacyjna

Najpierw realizuj dosłownie wymaganie arkusza. Jeśli skrypt PHP ma „wyświetlać” dane, generuj wskazane elementy HTML w PHP. Wariant JSON i JavaScript stosuj tylko wtedy, gdy nie omija on wymaganego kryterium.
