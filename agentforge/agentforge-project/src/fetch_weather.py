#!/usr/bin/env python3
"""fetch_weather.py

Fetch current weather for a latitude/longitude using the Open-Meteo API,
and save the result as pretty-printed JSON.

Usage:
  python src/weather_check.py LAT LON [--output FILE]
"""

from __future__ import annotations

import argparse
import asyncio
import datetime
import json
import os
import sys
from pathlib import Path
from typing import Any, Optional

import httpx
from dotenv import load_dotenv

load_dotenv()

API_BASE_URL = os.getenv("API_BASE_URL", "https://api.open-meteo.com/v1")
API_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT_SECONDS", "10"))
MAX_RETRIES = 3
USER_AGENT = "fetch_weather/1.0 (+https://example.com)"


def parse_args() -> argparse.Namespace:
    p = argparse.ArgumentParser(description="Fetch weather by latitude and longitude")
    p.add_argument("lat", nargs="?", type=float, help="Latitude in decimal degrees")
    p.add_argument("lon", nargs="?", type=float, help="Longitude in decimal degrees")
    p.add_argument("--output", "-o", help="Output JSON file path (optional)")
    return p.parse_args()


def prompt_for_coordinate(name: str) -> float:
    while True:
        try:
            raw = input(f"{name}: ").strip()
            return float(raw)
        except ValueError:
            print(f"Invalid {name}. Please enter a decimal number.")


def validate_lat_lon(lat: float, lon: float) -> None:
    if not (-90.0 <= lat <= 90.0):
        raise ValueError("Latitude must be between -90 and 90")
    if not (-180.0 <= lon <= 180.0):
        raise ValueError("Longitude must be between -180 and 180")


def build_api_url(lat: float, lon: float) -> str:
    params = (
        "hourly=temperature_2m,relativehumidity_2m,precipitation"
        "&current_weather=true&timezone=UTC"
    )
    return f"{API_BASE_URL}/forecast?latitude={lat}&longitude={lon}&{params}"


async def fetch_json_with_retries(
    url: str, timeout: int = API_TIMEOUT, max_retries: int = MAX_RETRIES
) -> Any:
    last_exc: Optional[Exception] = None
    headers = {"User-Agent": USER_AGENT}

    async with httpx.AsyncClient(timeout=timeout) as client:
        for attempt in range(1, max_retries + 1):
            try:
                response = await client.get(url, headers=headers)
                response.raise_for_status()
                return response.json()
            except (
                httpx.TimeoutException,
                httpx.HTTPStatusError,
                httpx.RequestError,
            ) as exc:
                last_exc = exc
                if attempt == max_retries:
                    break
                backoff = 2 ** (attempt - 1)
                await asyncio.sleep(backoff)
    raise RuntimeError(f"Failed to fetch JSON after {max_retries} attempts: {last_exc}")


def default_output_path(lat: float, lon: float) -> Path:
    ts = datetime.datetime.now(datetime.timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    name = f"weather_{lat:.4f}_{lon:.4f}_{ts}.json"
    return Path(name)


def save_json(obj: Any, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    with path.open("w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)


async def main() -> int:
    args = parse_args()

    lat = args.lat if args.lat is not None else prompt_for_coordinate("Latitude")
    lon = args.lon if args.lon is not None else prompt_for_coordinate("Longitude")

    try:
        validate_lat_lon(lat, lon)
    except ValueError as exc:
        print(f"Invalid coordinates: {exc}", file=sys.stderr)
        return 1

    url = build_api_url(lat, lon)

    try:
        data = await fetch_json_with_retries(url)
    except Exception as exc:
        print(f"Error fetching weather data: {exc}", file=sys.stderr)
        return 1

    out_path = Path(args.output) if args.output else default_output_path(lat, lon)
    try:
        save_json(data, out_path)
    except Exception as exc:
        print(f"Error saving JSON to {out_path}: {exc}", file=sys.stderr)
        return 1

    print(str(out_path.resolve()))
    return 0


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
