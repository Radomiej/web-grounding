# 310 — Projekt pod INF.03: Studio Foto

## Czego się nauczysz

Samodzielnie czytać polecenie, budować HTML/CSS i łączyć obsługę formularza, obliczenia, galerię oraz dynamiczną tabelę. To autorskie ćwiczenie, nie oficjalny arkusz CKE.

## Wymagania wstępne

Lekcje 301, 302 i 303–309. Zacznij w [start/index.html](start/index.html), rozwiązanie znajduje się w [index.html](index.html). Wariant startowy celowo zawiera tylko szkielet; nie jest niedokończonym rozwiązaniem.

## Polecenie

Zbuduj stronę „Studio Foto”. Użyj osobnych index.html, style.css i app.js. Na górze umieść nagłówek, potem cennik i formularz, niżej galerię, a na końcu zestawienie wycen. Na szerokim ekranie dwie karty cennika są obok siebie; na telefonie zawijają się. Treść ma maksymalnie 70rem szerokości, jasne tło, niebieskie przyciski i widoczny fokus. Tabela ma nagłówki i obramowania.

Standard kosztuje 2 zł, premium 4 zł. Użytkownik wybiera 1–1000 odbitek (liczba całkowita), rodzaj i dostawę za 12 zł. Od 50 sztuk obowiązuje rabat 10% na odbitki, przed dodaniem dostawy. Wynik wyświetl z dwoma miejscami po przecinku. Każde wysłanie dodaje wiersz tabeli: liczba, cena jednostkowa, kwota. Pod tabelą aktualizuj sumę wszystkich wycen. „Wyczyść” usuwa wiersze i zeruje sumę.

Galeria używa trzech lokalnych grafik z assets/lessons. „Następne zdjęcie” przechodzi cyklicznie i aktualizuje alt. W wersji startowej ścieżka do assetów to ../../assets/lessons, ponieważ folder start leży poziom głębiej.

## Krok po kroku

1. Rozpisz kryteria na papierze. Zbuduj semantyczny HTML i podpisane kontrolki.
2. Zrób układ CSS i sprawdź go przy wąskiej szerokości.
3. Napisz calculate(quantity, price, delivery) bez DOM.
4. Podłącz submit, odczytaj value/checked i sprawdź dane.
5. Zbuduj wiersz tabeli przez createElement i textContent.
6. Dodaj galerię i zerowanie. Dopiero potem porównaj rozwiązanie.

## Przepływ danych

Formularz → liczby i boolean → calculate → wynik wiersza i suma → DOM. Galeria ma własny indeks; zmiana zdjęcia nie zmienia wyceny.

## HTML

Dokument zaczyna się od `<!doctype html>` (tryb HTML5). `html lang="pl"` ustawia język, `meta charset="UTF-8"` kodowanie, a `meta name="viewport" content="width=device-width, initial-scale=1"` szerokość urządzenia. `title` to tytuł karty. `link rel="stylesheet" href="style.css"` dołącza CSS. `script src="app.js" defer` wykonuje lokalny skrypt po parsowaniu HTML.

`header/main/footer` określają nagłówek, główną treść i stopkę; `nav aria-label` nazywa nawigację. `section` grupuje temat, `h1/h2` tworzą hierarchię nagłówków, `p` akapit, `ol/li` kroki, `ul/li` listę, `code` zapis kodu. `a href` prowadzi do pliku względną ścieżką, a `../` oznacza katalog wyżej.

W formularzach `form` zbiera kontrolki; otaczający `label` nadaje polu nazwę. `id` umożliwia wybranie elementu w JS. `input` przyjmuje dane; `type="number/email/search/range/checkbox/radio"` określa rodzaj kontrolki. `value` to wartość początkowa, `required` wymaga danych, `min/max/step` ograniczają liczby, `maxlength` długość tekstu, `pattern` format, `placeholder` pokazuje przykład. `name` grupuje radio, `checked` zaznacza początkowy wybór. `select/option` tworzą listę wyboru, `fieldset/legend` grupę z nazwą. `button` w formularzu domyślnie wysyła; `type="button"` temu zapobiega. `novalidate` pozwala obsłużyć komunikat błędu skryptem. `role="status"` ogłasza zmianę tekstu, `aria-describedby` wiąże pole z objaśnieniem. Nie każda lekcja używa wszystkich tych kontrolek.

## CSS

Pełny słownik wspólnego arkusza, łącznie z jednostkami i wartościami: [CSS krok po kroku](../docs/css-lekcji.md). Arkusz jest lokalną kopią, którą można swobodnie edytować bez zmiany innych lekcji.

## Biblioteki

Brak bibliotek JavaScript i połączeń z CDN. DOM, Canvas i Storage to API przeglądarki, a nie biblioteki do instalacji. Node jest potrzebny tylko autorowi do testów, nie uczniowi.

## JavaScript

Powtórzenie funkcji/konwersji (303), if i checked (304), walidacji (305), pętli i tablic (306), src/alt (307), obiektów i createElement (308). `amount *= 0.9` mnoży kwotę przez 90%; `total += amount` sumuje wyceny. `replaceChildren()` usuwa wszystkie wiersze. Indeks galerii używa modulo %, aby wrócić do początku.

## Sprawdź się — kryteria

- [ ] Formularz ma etykiety i działa Enterem.
- [ ] 10 standard bez dostawy = 20.00 zł.
- [ ] 50 premium z dostawą = 192.00 zł (200 × 0.9 + 12).
- [ ] Dwie powyższe wyceny dają sumę 212.00 zł.
- [ ] 0, ujemna, ułamkowa i pusta liczba nie dodają wiersza.
- [ ] Reset daje zero wierszy i sumę 0.00.
- [ ] Trzy kliknięcia galerii wracają do pierwszego zdjęcia.
- [ ] Strona mieści się przy 390px i działa bez internetu.

## Częste błędy

Rabat nie obejmuje dostawy. Suma jest liczbą, nie tekstem toFixed. Odczytaj dokładnie polecenie arkusza: gdy wymaga PHP lub bazy, sam JavaScript nie zastępuje tego kryterium.

## Zadanie

Odtwórz całość w folderze start bez oglądania rozwiązania, potem zaznacz kryteria i zapisz znalezione różnice.

## HTML tabeli i galerii

article grupuje pojedynczą kartę cennika; h3 jest jej nagłówkiem. table to tabela, thead nagłówek, tbody zmieniana zawartość, tr wiersz, th komórka nagłówkowa, td komórka danych. img src wskazuje plik, alt opisuje grafikę, a width/height rezerwują miejsce. CSS #photo { height:auto } zachowuje proporcje przy max-width:100%.
