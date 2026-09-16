#!/usr/bin/env python3
"""Bez-dependency smoke/integration tests for the canonical PHP lessons.

The PHP code runs in the Compose Apache container. This script is only the
HTTP client: it drives the embedded forms and JSON API, so no PHP installation
is required on the host running the tests.
"""

from __future__ import annotations

import argparse
import json
import sys
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen


class TestFailure(RuntimeError):
    """A useful assertion failure with enough response context to debug."""


def http_request(
    base_url: str,
    path: str,
    *,
    method: str = "GET",
    body: bytes | None = None,
    content_type: str | None = None,
    expected_status: int = 200,
    timeout: float = 5.0,
) -> tuple[int, bytes, str]:
    url = f"{base_url.rstrip('/')}/{path.lstrip('/')}"
    headers = {"Accept": "text/html,application/json"}
    if content_type:
        headers["Content-Type"] = content_type

    request = Request(url, data=body, headers=headers, method=method)
    try:
        with urlopen(request, timeout=timeout) as response:
            status = response.status
            payload = response.read()
            response_type = response.headers.get("Content-Type", "")
    except HTTPError as error:
        status = error.code
        payload = error.read()
        response_type = error.headers.get("Content-Type", "")
    except URLError as error:
        raise TestFailure(f"{method} {path}: serwer niedostępny: {error.reason}") from error

    if status != expected_status:
        excerpt = payload.decode("utf-8", errors="replace")[:240].replace("\n", " ")
        raise TestFailure(
            f"{method} {path}: HTTP {status}, oczekiwano {expected_status}; odpowiedź: {excerpt!r}"
        )
    return status, payload, response_type


def wait_for_http(base_url: str, timeout: float) -> None:
    deadline = time.monotonic() + timeout
    last_error = "brak odpowiedzi"
    while time.monotonic() < deadline:
        try:
            http_request(
                base_url,
                "401-php-podstawy/index.php",
                expected_status=200,
                timeout=2,
            )
            return
        except TestFailure as error:
            last_error = str(error)
            time.sleep(1)
    raise TestFailure(f"Apache nie wystartował w {timeout:.0f} s: {last_error}")


def html_request(base_url: str, path: str, required_text: str) -> str:
    _, payload, _ = http_request(base_url, path)
    document = payload.decode("utf-8", errors="replace")
    if required_text not in document:
        raise TestFailure(f"GET {path}: brak oczekiwanego tekstu {required_text!r}")
    return document


def form_request(base_url: str, path: str, values: dict[str, str], *, expected_status: int = 200) -> str:
    body = urlencode(values).encode("utf-8")
    _, payload, _ = http_request(
        base_url,
        path,
        method="POST",
        body=body,
        content_type="application/x-www-form-urlencoded",
        expected_status=expected_status,
    )
    return payload.decode("utf-8", errors="replace")


def json_request(
    base_url: str,
    path: str,
    *,
    method: str = "GET",
    payload: object | None = None,
    expected_status: int = 200,
) -> dict:
    body = None if payload is None else json.dumps(payload, ensure_ascii=False).encode("utf-8")
    _, response_body, response_type = http_request(
        base_url,
        path,
        method=method,
        body=body,
        content_type="application/json" if body is not None else None,
        expected_status=expected_status,
    )
    if "json" not in response_type.lower():
        raise TestFailure(f"{method} {path}: Content-Type nie jest JSON-em: {response_type!r}")
    try:
        decoded = json.loads(response_body.decode("utf-8"))
    except json.JSONDecodeError as error:
        raise TestFailure(f"{method} {path}: niepoprawny JSON: {response_body[:240]!r}") from error
    if not isinstance(decoded, dict):
        raise TestFailure(f"{method} {path}: JSON nie jest obiektem")
    return decoded


def require(condition: bool, message: str) -> None:
    if not condition:
        raise TestFailure(message)


def run(base_url: str, wait_seconds: float) -> list[str]:
    wait_for_http(base_url, wait_seconds)
    passed: list[str] = []

    html_request(base_url, "401-php-podstawy/index.php", "PHP osadzone w HTML")
    passed.append("401 PHP osadzone w HTML")

    html_request(base_url, "402-php-czytanie-bazy/index.php", "Kurs HTML od podstaw")
    passed.append("402 SELECT i iteracja po wynikach")

    html_request(base_url, "403-php-formularz-i-select/index.php", "Wybierz kraj")
    country_page = form_request(
        base_url,
        "403-php-formularz-i-select/index.php",
        {"country": "Polska"},
    )
    require("Rzeszów" in country_page and "Wyniki dla" in country_page, "403: SELECT po kraju nie zwrócił Rzeszowa")
    passed.append("403 formularz + SELECT po kraju")

    stamp = str(int(time.time()))
    embedded_title = f"Test kontenerowy osadzany {stamp}"
    insert_page = form_request(
        base_url,
        "404-php-insert/index.php",
        {"title": embedded_title, "price": "12.34", "available": "on"},
    )
    require("Oferta została dodana" in insert_page, "404: INSERT osadzany nie potwierdził zapisu")
    passed.append("404 INSERT przez formularz")

    offers = json_request(base_url, "408-php-api-json/api.php")["data"]
    embedded_offer = next((offer for offer in offers if offer.get("title") == embedded_title), None)
    require(isinstance(embedded_offer, dict), "404: nowej oferty nie ma w bazie odczytanej przez API")
    embedded_id = int(embedded_offer["id"])

    html_request(base_url, "405-php-filtrowanie/index.php?q=Kurs", "Filtrowanie ofert")
    filtered_page = html_request(
        base_url,
        "405-php-filtrowanie/index.php?q=Test+kontenerowy",
        embedded_title,
    )
    require(embedded_title in filtered_page, "405: filtrowanie nie znalazło oferty dodanej przez 404")
    passed.append("405 filtrowanie SELECT LIKE")

    updated_embedded_title = f"Test kontenerowy edycja {stamp}"
    update_page = form_request(
        base_url,
        "406-php-update/index.php",
        {"id": str(embedded_id), "title": updated_embedded_title, "price": "23.45"},
    )
    require("Rekord zaktualizowany" in update_page, "406: UPDATE osadzany nie potwierdził zmiany")
    passed.append("406 UPDATE przez formularz")

    delete_page = form_request(
        base_url,
        "407-php-delete/index.php",
        {"id": str(embedded_id)},
    )
    require("Rekord usunięty" in delete_page, "407: DELETE osadzany nie potwierdził usunięcia")
    passed.append("407 DELETE przez formularz")

    for path, needle in (
        ("408-php-api-json/index.html", "PHP → JSON → JavaScript"),
        ("409-php-api-insert/index.html", "dodawanie oferty do bazy"),
        ("410-php-api-filtrowanie/index.html", "filtrowanie ofert"),
        ("411-php-api-update/index.html", "edycja oferty"),
        ("412-php-api-delete/index.html", "usuwanie oferty"),
    ):
        html_request(base_url, path, needle)
    passed.append("408–412 strony API i Apache")

    api_offers = json_request(base_url, "408-php-api-json/api.php")["data"]
    require(len(api_offers) >= 3, "408: oczekiwano co najmniej trzech rekordów z seedera SQL")
    passed.append("408 GET JSON")

    api_title = f"Test kontenerowy API {stamp}"
    created = json_request(
        base_url,
        "409-php-api-insert/api.php",
        method="POST",
        payload={"title": api_title, "price": 34.56, "available": True},
        expected_status=201,
    )
    created_data = created.get("data")
    require(isinstance(created_data, dict) and int(created_data.get("id", 0)) > 0, "409: brak ID nowego rekordu")
    api_id = int(created_data["id"])
    passed.append("409 POST JSON INSERT")

    filtered = json_request(base_url, "410-php-api-filtrowanie/api.php?q=Test+kontenerowy")
    filtered_data = filtered.get("data")
    require(
        isinstance(filtered_data, list) and any(item.get("id") == api_id for item in filtered_data),
        "410: filtrowanie API nie znalazło nowej oferty",
    )
    invalid_filter = json_request(
        base_url,
        "410-php-api-filtrowanie/api.php?available=2",
        expected_status=422,
    )
    require("error" in invalid_filter, "410: walidacja available nie zwróciła błędu")
    passed.append("410 GET filtrowanie + walidacja")

    updated_api_title = f"Test kontenerowy API edycja {stamp}"
    updated = json_request(
        base_url,
        "411-php-api-update/api.php",
        method="PUT",
        payload={"id": api_id, "title": updated_api_title, "price": 45.67, "available": False},
    )
    require(updated.get("data", {}).get("title") == updated_api_title, "411: UPDATE API nie zwrócił zmienionego tytułu")
    wrong_method = json_request(
        base_url,
        "411-php-api-update/api.php",
        expected_status=405,
    )
    require("error" in wrong_method, "411: GET nie został odrzucony statusem 405")
    passed.append("411 PUT UPDATE + metoda 405")

    deleted = json_request(
        base_url,
        "412-php-api-delete/api.php",
        method="DELETE",
        payload={"id": api_id},
    )
    require(deleted.get("data", {}).get("deletedId") == api_id, "412: DELETE API nie zwrócił usuniętego ID")
    missing = json_request(
        base_url,
        "412-php-api-delete/api.php",
        method="DELETE",
        payload={"id": api_id},
        expected_status=404,
    )
    require("error" in missing, "412: ponowne DELETE nie zwróciło 404")
    passed.append("412 DELETE + 404 dla brakującego rekordu")

    return passed


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "--base-url",
        default="http://127.0.0.1:8787",
        help="adres opublikowanego serwisu PHP (domyślnie %(default)s)",
    )
    parser.add_argument(
        "--wait-seconds",
        type=float,
        default=60,
        help="ile sekund czekać na Apache (domyślnie %(default)s)",
    )
    args = parser.parse_args()

    try:
        passed = run(args.base_url, args.wait_seconds)
    except TestFailure as error:
        print(f"[FAIL] {error}", file=sys.stderr)
        return 1

    for item in passed:
        print(f"[PASS] {item}")
    print(f"PHP container smoke/integration tests: {len(passed)} PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
