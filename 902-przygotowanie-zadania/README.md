# Lekcja 902 — przygotowanie własnego zadania

Ta lekcja pokazuje, jak z pomysłu zrobić lokalny mini-arkusz, który da się
wykonać i sprawdzić. Formularz wymusza rozdzielenie kontekstu, celu, danych,
kryteriów i etapów pracy. Wynik można skopiować jako Markdown, pobrać jako
plik `.md` i uzupełnić diagramem Mermaid.

## Czego się nauczysz

- formułować mierzalne kryteria zamiast ogólnego polecenia;
- planować dane wejściowe, wynik i przypadki brzegowe;
- budować listę etapów pracy oraz dokumentować ją diagramem;
- tworzyć lokalny plik Markdown bez serwera.

## Cele

- rozbić ogólne „zrób stronę/aplikację” na obserwowalne kryteria;
- zaplanować dane wejściowe, oczekiwany wynik i przypadki brzegowe;
- przygotować kolejność pracy, którą można przekazać uczniowi;
- opisać przepływ w Mermaid i zachować go razem z zadaniem.

## HTML

| Element/zapis | Zastosowanie |
| --- | --- |
| `form`, `label`, `input`, `textarea`, `select` | opis parametrów zadania |
| `fieldset`, `legend` | grupowanie kryteriów i etapów |
| `ol`, `li` | kolejność etapów i wynikowa instrukcja |
| `article`, `section`, `dl`, `dt`, `dd` | semantyczny podgląd zadania i pary dane/wartość |
| `aria-labelledby`, `role="status"` | powiązanie nagłówka oraz komunikatów dla technologii asystujących |
| `button` | dodawanie/usuwanie etapów, kopiowanie i pobieranie |

## CSS

| Właściwość/wartość | Znaczenie |
| --- | --- |
| `display: grid` + `repeat(auto-fit, minmax(...))` | responsywna siatka pól i kryteriów |
| `display: flex`, `flex-wrap`, `gap` | nawigacja, przyciski i wiersz etapu |
| `border-left`, `border-radius`, kolory tła | wyróżnienie informacji i podglądu |
| `min-height: 2.75rem`, `padding`, `font: inherit` | wygodne, spójne kontrolki formularza |
| `:focus-visible` | widoczny fokus klawiatury |
| `overflow: auto`, `overflow-wrap: anywhere` | bezpieczne wyświetlanie długiego kodu |
| `@media (max-width: 40rem)` | układ na wąskim ekranie |

## JavaScript

- tablica `criterionOptions` jest lokalnym słownikiem gotowych kryteriów;
- `createElement`, `append`, `replaceChildren` budują wynik bez wstrzykiwania
  HTML z formularza;
- `addStage` i `resetStages` pokazują dodawanie/usuwanie elementów potomnych;
- `selectedCriteria` i `selectedStages` zbierają stan formularza;
- `makeMarkdown` tworzy tekst zadania, a `makeMermaid` — diagram `flowchart TD`;
- `Blob`, `URL.createObjectURL` i `download` przygotowują plik `.md` lokalnie;
- `navigator.clipboard` jest wygodą; gdy schowek jest zablokowany, kod nadal
  można zaznaczyć i skopiować ręcznie.

## Biblioteki

Brak. Lekcja korzysta wyłącznie ze standardowego JavaScriptu i działa offline.

## Jak przygotować dobre zadanie

1. Zacznij od rezultatu, który da się obejrzeć albo uruchomić.
2. Podaj dane wejściowe i oczekiwany wynik, w tym jeden przypadek błędny.
3. Każde kryterium zapisz tak, aby dało się odpowiedzieć „spełnione/nie”.
4. Ułóż etapy od analizy do testów; nie ukrywaj testowania w słowie „gotowe”.
5. Dodaj diagram i sprawdź, czy każdy węzeł ma odpowiednik w instrukcji.

## Zadanie dla ucznia

Utwórz dwa mini-arkusze: jeden INF.03 o formularzu z walidacją i jeden INF.04
o klasie z dziedziczeniem. Każdy ma mieć co najmniej pięć kryteriów, pięć
etapów, przypadek graniczny i diagram Mermaid. Porównaj zakres z
[planem nauki INF.03/INF.04](../docs/plan-nauki-inf03-inf04.md).

Wynik z generatora jest materiałem lokalnym. Prawdziwe wymagania sprawdzaj w
[arkuszach praktycznych](../docs/egzaminy-inf03-inf04.md), a paczki startowe i
rozwiązania traktuj jako osobne materiały.

## Kryteria zaliczenia

- Każdy mini-arkusz ma mierzalny rezultat, dane wejściowe, przypadek graniczny i test.
- Kryteria da się sprawdzić odpowiedzią „spełnione/nie”, a diagram odpowiada etapom pracy.
- Uczeń potrafi wskazać, które lokalne lekcje przygotowują do danego zadania.
