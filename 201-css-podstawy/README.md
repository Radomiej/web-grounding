# Ćwiczenie 201 — kolory, typografia i box model CSS

Seria `2xx` zaczyna się od wyglądu dokumentu z serii `1xx`. Ta lekcja nie używa
jeszcze Gridu ani Flexboxa: skupia się na kolorach, tekście i pudełku elementu.

## Czego się nauczysz

- zapisać regułę `selektor { właściwość: wartość; }`;
- rozróżniać selektor elementu, klasy, pseudoklasy i dziecka;
- rozumieć box model: zawartość, `padding`, `border` i `margin`;
- rozumieć różnicę między `color` i `background-color`;
- dobrać margines, padding, border, zaokrąglenie i cień;
- użyć jednostek `rem`, `%` i wartości `auto`;
- zachować widoczny fokus klawiatury.

## HTML

| Element lub atrybut | Znaczenie |
| --- | --- |
| `header`, `main`, `section`, `article`, `footer` | Zachowują semantyczny podział treści niezależnie od CSS. |
| `class="site-header"`, `class="card"` | Nadają grupom wspólny selektor klasowy. |
| `class="card-featured"` | Wyróżnia jedną kartę dodatkową klasą. |
| `id` i `aria-labelledby` | Łączą sekcję z jej nagłówkiem. |
| `a href` | Tworzy przejście do następnego przykładu CSS. |
| `code` | Wyróżnia zapis kodu w tekście. |

## CSS

| Deklaracja lub wartość | Znaczenie |
| --- | --- |
| `:root` | Wybiera główny element dokumentu. |
| `color`, `background`, `font-family`, `line-height` | Ustawiają kolor tekstu, tło, font i interlinię. |
| `* { box-sizing: border-box; }` | Wlicza padding i obramowanie do wymiaru elementu. |
| `max-width: 64rem` | Ogranicza szerokość czytelnego dokumentu. |
| `margin: 0 auto` | Centruje blok w poziomie. |
| `padding: 1rem 1.25rem` | Dodaje odstęp wewnętrzny: pion `1rem`, poziom `1.25rem`. |
| `border: 1px solid #9eabc2` | Rysuje cienką ciągłą ramkę. |
| `border-radius: 0.5rem` | Zaokrągla narożniki. |
| `a:hover` | Zmienia kolor linku pod wskaźnikiem. |
| `a:focus-visible`, `outline`, `outline-offset` | Pokazują fokus klawiatury. |
| `.accent-text` | Selektor klasy zmienia kolor i grubość tekstu. |
| `--ink`, `--surface` | Zmienne CSS przechowują powtarzające się kolory. |
| `background-color` | Ustawia kolor tła; nie zmienia koloru tekstu. |
| `font-size`, `font-family`, `line-height` | Sterują rozmiarem, krojem i wysokością wiersza. |
| `margin` / `margin-block` | Dodają odstęp na zewnątrz pudełka. |
| `padding` / `padding-inline` | Dodają odstęp między ramką a treścią. |
| `border` | Rysuje obramowanie pomiędzy paddingiem i marginesem. |
| `border-radius` | Zaokrągla narożniki. |
| `box-shadow` | Dodaje cień bez zmiany rozmiaru pudełka. |
| `.card > ...` | Operator `>` wybiera bezpośrednie dziecko elementu. |
| `padding`, `border`, `background` na `.card` | Pokazują trzy warstwy box modelu. |
| `.card-featured` | Nadpisuje tylko kartę wyróżnioną. |
| `@media` | W tej lekcji nie ma breakpointu; responsywność Gridu poznasz w 205. |

Kolory `#172033`, `#eef2f8`, `#ffffff`, `#0645ad`, `#0b3b8f`, `#c2410c`,
`#12618a`, `#b8c6d8`, `#f8fafc` i `#e6f4fa` możesz bezpiecznie zamienić na
własne wartości, obserwując kontrast i box model.

## JavaScript

Brak JavaScriptu. Zachowanie interaktywne pojawi się w serii `3xx`.

## Biblioteki

Brak bibliotek i zewnętrznych zależności.

## Zadanie do wykonania

1. Dodaj czwartą kartę z własnym tematem.
2. Zdefiniuj zmienne `--muted` i `--border` oraz użyj ich w dwóch regułach.
3. Zmień padding karty i margin sekcji, a następnie opisz różnicę w komentarzu.
4. Dodaj `box-shadow` oraz osobny stan `:hover` i `:focus-visible`.
5. Sprawdź kontrast i szerokość tekstu przy 390 px.

## Kryteria zaliczenia

- każdy kolor i odstęp jest opisany w tabeli CSS;
- nie używasz tabeli do layoutu ani Flexboxa/Gridu przed następnymi lekcjami;
- fokus klawiatury pozostaje widoczny;
- zmiana `padding` nie powoduje przypadkowego poziomego overflow.
