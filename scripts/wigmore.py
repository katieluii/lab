"""
Wigmore Hall concert scraper.

Each event page embeds a full GraphQL JSON blob in a <script> tag.
We start from the listing page, extract slugs, then fetch each event
and parse the embedded JSON for clean structured data.

Usage:
    python3 scripts/wigmore.py > src/data/nota-concerts.json
"""

import json
import re
import sys
import time
from datetime import datetime, timedelta
from typing import Optional
import requests

BASE_URL = "https://wigmore-hall.org.uk"
LISTING_URL = f"{BASE_URL}/whats-on"

# Scrape concerts up to 3 months from today
MAX_DATE = (datetime.utcnow() + timedelta(days=90)).strftime("%Y%m%d")

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
        "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    ),
    "Accept": "text/html,application/xhtml+xml",
    "Accept-Language": "en-GB,en;q=0.9",
}

GENRE_TO_FORMAT: dict[str, list[str]] = {
    "chamber": ["chamber"],
    "string quartet": ["string-quartet"],
    "piano recital": ["solo-piano"],
    "solo recital": ["solo-piano"],
    "song recital": ["song-recital"],
    "lieder": ["song-recital"],
    "opera": ["opera"],
    "choral": ["choral"],
    "orchestral": ["symphony"],
    "early music": ["early-music"],
    "piano concerto": ["piano-concerto"],
    "violin": ["violin-concerto"],
    "cello": ["cello-concerto"],
    "song": ["song-recital"],
}

COMPOSER_PERIODS: dict[str, str] = {
    "bach": "baroque", "handel": "baroque", "vivaldi": "baroque",
    "purcell": "baroque", "monteverdi": "baroque", "telemann": "baroque",
    "rameau": "baroque", "corelli": "baroque", "couperin": "baroque",
    "buxtehude": "baroque", "scarlatti": "baroque",
    "mozart": "classical", "haydn": "classical", "clementi": "classical",
    "cimarosa": "classical", "gluck": "classical",
    "beethoven": "romantic", "schubert": "romantic", "schumann": "romantic",
    "chopin": "romantic", "brahms": "romantic", "tchaikovsky": "romantic",
    "liszt": "romantic", "mendelssohn": "romantic", "dvorak": "romantic",
    "dvořák": "romantic", "grieg": "romantic", "verdi": "romantic",
    "wagner": "romantic", "wolf": "romantic", "bruckner": "romantic",
    "mahler": "late-romantic", "strauss": "late-romantic",
    "sibelius": "late-romantic", "elgar": "late-romantic",
    "rachmaninoff": "late-romantic", "rachmaninov": "late-romantic",
    "puccini": "late-romantic", "fauré": "late-romantic",
    "saint-saëns": "late-romantic", "franck": "late-romantic",
    "debussy": "impressionist", "ravel": "impressionist",
    "satie": "impressionist",
    "bartók": "modern", "bartok": "modern",
    "shostakovich": "modern", "prokofiev": "modern",
    "stravinsky": "modern", "schoenberg": "modern",
    "hindemith": "modern", "britten": "modern",
    "janáček": "modern", "janacek": "modern",
    "berg": "modern", "webern": "modern",
    "glass": "contemporary", "pärt": "contemporary", "part": "contemporary",
    "adams": "contemporary", "rautavaara": "contemporary",
    "adès": "contemporary", "ades": "contemporary",
    "turnage": "contemporary", "birtwistle": "contemporary",
}

SKIP_TITLE_KEYWORDS = [
    "workshop", "masterclass", "family concert", "family workshop",
    "chamber tots", "schools concert", "open rehearsal",
    "members' open rehearsal", "lunchtime talk", "pre-concert talk",
    "in conversation", "education", "talk", "tour",
]


def fetch_html(url: str) -> str:
    resp = requests.get(url, headers=HEADERS, timeout=15)
    resp.raise_for_status()
    return resp.text


def get_slugs_from_listing() -> list[str]:
    html = fetch_html(LISTING_URL)
    slugs = re.findall(r'/whats-on/(\d{12})', html)
    return sorted(set(slugs))


def parse_event_json(html: str) -> Optional[dict]:
    scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
    for s in scripts:
        if '"Performance"' in s and '"repertoire"' in s:
            fixed = re.sub(r'\\!', '!', s)
            try:
                return json.loads(fixed)["data"]["page"]
            except (json.JSONDecodeError, KeyError):
                pass
    return None


def clean_html(text: str) -> str:
    return re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', '', text)).strip()


def infer_periods(page: dict) -> list[str]:
    periods = set()
    for item in page.get("repertoire", []):
        for comp in (item.get("composers") or []):
            name = comp.get("title", "").lower()
            for key, period in COMPOSER_PERIODS.items():
                if key in name:
                    periods.add(period)
                    break
    for edge in page.get("artists", {}).get("edges", []):
        name = edge["node"].get("title", "").lower()
        for key, period in COMPOSER_PERIODS.items():
            if key in name:
                periods.add(period)
                break
    return list(periods)


def infer_formats(page: dict) -> list[str]:
    formats = set()
    for edge in page.get("genres", {}).get("edges", []):
        genre = edge["node"].get("title", "").lower()
        for key, fmt_list in GENRE_TO_FORMAT.items():
            if key in genre:
                formats.update(fmt_list)
    return list(formats)


def build_programme(page: dict) -> list[dict]:
    seen_works = set()
    programme = []
    for item in page.get("repertoire", []):
        title = item.get("title") or item.get("cycle") or ""
        if not title or title in seen_works:
            continue
        seen_works.add(title)
        composers = item.get("composers", [])
        composer_name = composers[0]["title"] if composers else ""
        programme.append({"composer": composer_name, "work": title})
    deduped = []
    seen = set()
    for item in programme:
        key = (item["composer"], item["work"])
        if key not in seen:
            seen.add(key)
            deduped.append(item)
    return deduped[:8]


def build_performers(page: dict) -> list[str]:
    lines = []
    for credit in (page.get("credits") or []):
        group = credit.get("group", {}).get("title", "")
        status = credit.get("status", "").strip()
        if group:
            label = group
            if status:
                label += f" — {status}"
            lines.append(label)
        else:
            for a in credit.get("artists", []):
                name = a.get("artist", {}).get("title", "")
                role = a.get("role", "").strip()
                if name:
                    label = name
                    if role:
                        label += f" — {role}"
                    lines.append(label)
    return lines[:5]


def should_skip(title: str) -> bool:
    t = title.lower()
    return any(kw in t for kw in SKIP_TITLE_KEYWORDS)


def scrape_event(slug: str) -> Optional[dict]:
    url = f"{BASE_URL}/whats-on/{slug}"
    m = re.match(r"(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})[a-z]?$", slug)
    if not m:
        return None
    y, mo, d, h, mi = m.groups()
    date_str = f"{y}-{mo}-{d}"
    time_str = f"{h}:{mi}"

    try:
        html = fetch_html(url)
    except Exception as e:
        print(f"  FETCH ERROR {slug}: {e}", file=sys.stderr)
        return None

    page = parse_event_json(html)
    if not page:
        return None

    title = clean_html(page.get("title", ""))
    next_perf = page.get("nextPerformance")
    next_slug = None
    if next_perf and next_perf.get("url"):
        m2 = re.search(r"(\d{12}[a-z]?)$", next_perf["url"])
        if m2:
            next_slug = m2.group(1)

    if not title or should_skip(title):
        return {"_next_slug": next_slug, "_skip": True}

    subtitle = clean_html(page.get("subtitleText", ""))
    prices_raw = clean_html(page.get("pricesText", ""))
    price_nums = re.findall(r'£[\d,]+', prices_raw)
    if price_nums:
        price = f"{price_nums[-1]} – {price_nums[0]}" if len(price_nums) > 1 else price_nums[0]
    else:
        price = ""

    return {
        "id": f"wh-{slug}",
        "title": title,
        "subtitle": subtitle,
        "venue": "Wigmore Hall",
        "date": date_str,
        "time": time_str,
        "performers": build_performers(page),
        "programme": build_programme(page),
        "periods": infer_periods(page),
        "formats": infer_formats(page),
        "moods": [],
        "ticketUrl": url,
        "price": price,
        "highlight": "",
        "_next_slug": next_slug,
    }


def main():
    print(f"Scraping concerts up to {MAX_DATE}...", file=sys.stderr)
    seed_slugs = get_slugs_from_listing()
    print(f"Found {len(seed_slugs)} seed slugs on listing page", file=sys.stderr)

    queue = [s for s in seed_slugs if s[:8] <= MAX_DATE]
    visited: set[str] = set(queue)
    concerts = []

    while queue:
        slug = queue.pop(0)
        print(f"  {slug}...", end=" ", file=sys.stderr)

        result = scrape_event(slug)
        next_slug = result.pop("_next_slug", None) if result else None
        is_skip = result.pop("_skip", False) if result else True

        if result and not is_skip:
            concerts.append(result)
            print(f"✓ {result['title'][:60]}", file=sys.stderr)
        else:
            print("skip", file=sys.stderr)

        if next_slug and next_slug not in visited and next_slug[:8] <= MAX_DATE:
            visited.add(next_slug)
            queue.append(next_slug)

        time.sleep(0.25)

    concerts.sort(key=lambda c: c["date"] + c["time"])
    print(f"\nTotal concerts scraped: {len(concerts)}", file=sys.stderr)
    print(json.dumps(concerts, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
