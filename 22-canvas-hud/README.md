# 22 — Animacja Canvas i HUD HTML

## Czego się nauczysz

Oddzielać stan, aktualizację, rysowanie i HUD; sterować czasem animacji; nakładać HTML przez position:absolute. Końcowy przykład jest małą sceną edukacyjną, nie pełnym silnikiem gry.

## Wymagania wstępne

Canvas z lekcji 21, obiekty i zdarzenia z wcześniejszych lekcji.

## Krok po kroku

1. Otwórz stronę. Skup scenę klawiszem Tab albo kliknięciem.
2. Strzałkami lub WASD zbierz kwadrat: +10 punktów.
3. Dotknij krawędzi: -1 życie i powrót na środek.
4. Włącz pauzę, spróbuj ruchu i wznów. Po 3 utratach życia użyj Restart.
5. Przytrzymaj przyciski ekranowe na telefonie; puść także poza przyciskiem.
6. Przełącz kartę lub okno: ruch jest czyszczony i włącza się pauza.
7. Zmień rozmiar okna i sprawdź kliknięcie HUD.

## Przepływ danych

Zdarzenia → zbiór pressed → update(seconds) zmienia state → draw rysuje Canvas i syncHud aktualizuje HTML. Wszystkie wyniki korzystają z tego samego obiektu state. requestAnimationFrame uruchamiamy raz; restart tylko zeruje dane.

## HTML

Dokument zaczyna się od `<!doctype html>` (tryb HTML5). `html lang="pl"` ustawia język, `meta charset="UTF-8"` kodowanie, a `meta name="viewport" content="width=device-width, initial-scale=1"` szerokość urządzenia. `title` to tytuł karty. `link rel="stylesheet" href="style.css"` dołącza CSS. `script src="app.js" defer` wykonuje lokalny skrypt po parsowaniu HTML.

`header/main/footer` określają nagłówek, główną treść i stopkę; `nav aria-label` nazywa nawigację. `section` grupuje temat, `h1/h2` tworzą hierarchię nagłówków, `p` akapit, `ol/li` kroki, `ul/li` listę, `code` zapis kodu. `a href` prowadzi do pliku względną ścieżką, a `../` oznacza katalog wyżej.

W formularzach `form` zbiera kontrolki; otaczający `label` nadaje polu nazwę. `id` umożliwia wybranie elementu w JS. `input` przyjmuje dane; `type="number/email/search/range/checkbox/radio"` określa rodzaj kontrolki. `value` to wartość początkowa, `required` wymaga danych, `min/max/step` ograniczają liczby, `maxlength` długość tekstu, `pattern` format, `placeholder` pokazuje przykład. `name` grupuje radio, `checked` zaznacza początkowy wybór. `select/option` tworzą listę wyboru, `fieldset/legend` grupę z nazwą. `button` w formularzu domyślnie wysyła; `type="button"` temu zapobiega. `novalidate` pozwala obsłużyć komunikat błędu skryptem. `role="status"` ogłasza zmianę tekstu, `aria-describedby` wiąże pole z objaśnieniem. Nie każda lekcja używa wszystkich tych kontrolek.

## CSS

Pełny słownik wspólnego arkusza, łącznie z jednostkami i wartościami: [CSS krok po kroku](../docs/css-lekcji.md). Arkusz jest lokalną kopią, którą można swobodnie edytować bez zmiany innych lekcji.

## Biblioteki

Brak bibliotek JavaScript i połączeń z CDN. DOM, Canvas i Storage to API przeglądarki, a nie biblioteki do instalacji. Node jest potrzebny tylko autorowi do testów, nie uczniowi.

## HTML — HUD

div.stage zawiera canvas i div.hud. strong ze score/lives wyświetlają liczby. button to natywne przyciski obsługiwane klawiaturą; aria-pressed opisuje pauzę. canvas tabindex=0 pozwala skupić sterowanie; aria-label opisuje klawisze. data-direction przechowuje kierunek przycisku. Komunikat role=status zmienia się przy punktach/życiu, a nie co klatkę.

## CSS — wszystkie nowe właściwości

| Zapis                                                                        | Znaczenie                                                                                                      |
| ---------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| position: relative na .stage                                                 | Ustanawia punkt odniesienia dla absolutnie pozycjonowanego HUD, pozostając w normalnym układzie.               |
| position: absolute na .hud                                                   | Wyjmuje HUD ze zwykłego układu; nakłada go względem .stage.                                                    |
| inset: 8px                                                                   | top=right=bottom=left=8px. HUD obejmuje scenę z wewnętrznym odstępem.                                          |
| z-index: 1                                                                   | Rysuje HUD nad Canvasem.                                                                                       |
| isolation: isolate                                                           | Tworzy lokalny kontekst warstw; indeksy nie konkurują z całą stroną.                                           |
| pointer-events: none                                                         | Puste miejsce HUD przepuszcza kliknięcie do sceny.                                                             |
| pointer-events: auto na .hud-actions                                         | Przyciski HUD nadal odbierają kliknięcia.                                                                      |
| width:100%, height:auto, aspect-ratio:16/9                                   | Scena mieści się w rodzicu i zachowuje proporcje.                                                              |
| max-width:640px                                                              | Ogranicza szerokość wrappera na desktopie.                                                                     |
| flex-direction:column; justify-content:space-between; align-items:flex-start | Metryki są u góry po lewej, przyciski na dole.                                                                 |
| align-self:flex-end; gap:8px                                                 | Przesuwa przyciski na prawą stronę i oddziela je odstępem. Środek sceny pozostaje widoczny także na telefonie. |
| touch-action: none                                                           | Na przyciskach kierunkowych gest steruje ruchem, a nie przewijaniem strony. Nie blokuje całej strony.          |

Dla HUD w prawym dolnym rogu użyj top:auto; left:auto; right:8px; bottom:8px. Nie ustawiaj fixed: odnosi się do okna, a nie sceny.

## JavaScript

| Zapis                                     | Znaczenie                                                                                       |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------- |
| state                                     | Obiekt x/y, score, lives, paused i pozycji celu: jedno źródło prawdy.                           |
| Set, add/delete/clear/has                 | Zbiór przytrzymanych kierunków; brak duplikatów przy powtarzaniu keydown.                       |
| requestAnimationFrame(frame)              | Prosi przeglądarkę o kolejną klatkę, przekazując czas w ms.                                     |
| (time-previousTime)/1000                  | Czas klatki w sekundach, niezależny od częstotliwości ekranu.                                   |
| Math.min(...,0.05)                        | Ogranicza duży skok czasu do 50ms; nie udajemy dokładnej symulacji fizycznej.                   |
| speed * seconds                           | Prędkość 160 jednostek/s zamienia na przesunięcie danej klatki.                                 |
| Math.abs                                  | Wartość bezwzględna odległości do prostego prostokątnego obszaru zbierania.                     |
| Object.assign                             | Przywraca dane istniejącego obiektu po restarcie.                                               |
| keydown/keyup, event.key                  | Wciśnięcie/puszczenie klawisza i jego nazwa.                                                    |
| blur / visibilitychange / document.hidden | Czyszczenie sterowania po utracie fokusu lub ukryciu strony.                                    |
| pointerdown/up/cancel                     | Sterowanie myszą, dotykiem i piórem oraz przerwanie gestu.                                      |
| setPointerCapture / lostpointercapture    | Zachowuje obsługę puszczenia po wyjechaniu poza przycisk; czyści stan po utracie przechwycenia. |
| dataset.direction                         | Odczytuje data-direction z HTML.                                                                |
| event.detail === 0                        | Obsługuje klawiaturowe aktywowanie przycisku krótkim krokiem.                                   |
| setAttribute, String                      | Aktualizuje tekstową wartość aria-pressed.                                                      |

Rysowanie, DPR i setTransform: [lekcja 21](../21-canvas-podstawy/README.md#javascript). Warunki oraz operator ?: (wybierz jedną z dwóch wartości) sterują komunikatami i etykietą pauzy.

## Częste błędy

Druga pętla po restarcie przyspiesza grę. Brak keyup/blur powoduje „zacięty” ruch. Punkty rysowane w Canvas nie są elementami HTML — tu HUD celowo jest osobnym DOM. Nie ogłaszaj czytnikiem ekranu każdej klatki.

## Zadanie

Dodaj licznik zebranych celów do HTML HUD. Ustaw go w lewym dolnym rogu i wyzeruj po restarcie.

## Sprawdź się

- [ ] Punkty i życie zgadzają się ze sceną.
- [ ] Pauza zatrzymuje ruch; restart nie zwiększa prędkości.
- [ ] Po utracie fokusu ruch nie jest kontynuowany.
- [ ] HUD pozostaje nad sceną przy 390px.
- [ ] Przyciski działają dotykiem i klawiaturą.
