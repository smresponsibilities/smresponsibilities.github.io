import os
import re
import json
import base64
import urllib.parse
import urllib.request
from datetime import date, timedelta, datetime

def fetch_html(url):
    # Try scrapling first if available, otherwise urllib
    try:
        from scrapling import StealthyFetcher
        fetcher = StealthyFetcher()
        page = fetcher.fetch(url)
        return page.body if isinstance(page.body, str) else page.body.decode('utf-8', errors='replace')
    except Exception as e:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
        with urllib.request.urlopen(req, timeout=15) as res:
            return res.read().decode('utf-8', errors='replace')

def extract_linkedin_urls(html):
    urls = []
    # 1. Decode base64 Bing redirect links
    for match in re.finditer(r'\bu=a1([A-Za-z0-9_-]+)', html):
        raw_b64 = match.group(1).replace('-', '+').replace('_', '/')
        raw_b64 += '=' * (-len(raw_b64) % 4)
        try:
            target = base64.b64decode(raw_b64).decode('utf-8', errors='ignore')
            parsed = urllib.parse.urlparse(target)
            if 'linkedin.com' in parsed.netloc and ('/posts/' in parsed.path or '/feed/update/' in parsed.path):
                urls.append(f"{parsed.scheme}://{parsed.netloc}{parsed.path}")
        except Exception:
            pass

    # 2. Direct href links
    for match in re.finditer(r'href="((?:https?:)?//[a-zA-Z0-9\.]*linkedin\.com/(?:posts|feed/update)[^" ]+)"', html):
        raw = match.group(1).replace('&amp;', '&').replace('&quot;', '"')
        if raw.startswith('//'):
            raw = 'https:' + raw
        parsed = urllib.parse.urlparse(raw)
        urls.append(f"{parsed.scheme}://{parsed.netloc}{parsed.path}")

    return list(dict.fromkeys(urls))

def fetch_post_content(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'})
    try:
        with urllib.request.urlopen(req, timeout=15) as res:
            html = res.read().decode('utf-8', errors='replace')
        og = re.search(r'<meta property="og:description"\s+content="([^"]+)"', html)
        if og:
            content = og.group(1).replace('&quot;', '"').replace('&amp;', '&').replace('&#39;', "'")
            return content.strip()
    except Exception as e:
        print(f"Failed to fetch og:description from {url}: {e}")
    return None

def main():
    json_path = 'src/data/linkedin-posts.json'
    with open(json_path, 'r', encoding='utf-8') as f:
        posts = json.load(f)

    existing_days = {p['day'] for p in posts}
    latest_day = max(existing_days)

    anchor_day = 1238
    anchor_date = date(2026, 10, 1)
    current_day = anchor_day + (date.today() - anchor_date).days

    target_days = [d for d in range(latest_day + 1, current_day + 1)]
    if not target_days:
        target_days = [latest_day + 1]

    added = 0
    for day in target_days:
        if day in existing_days:
            continue
        hashtag = "2002 days of code" if day > 1001 else "1001 days of code"
        query = f"+#day{day} {hashtag} site:linkedin.com/posts/"
        search_url = "https://www.bing.com/search?q=" + urllib.parse.quote_plus(query)

        print(f"Searching Bing for Day {day}...")
        try:
            html = fetch_html(search_url)
        except Exception as e:
            print(f"Bing search request failed for Day {day}: {e}")
            continue

        links = extract_linkedin_urls(html)
        if not links:
            print(f"No Bing results found for Day {day}.")
            continue

        for post_url in links:
            content = fetch_post_content(post_url)
            if not content:
                continue

            day_tag = f"#day{day}"
            if day_tag.lower() not in content.lower():
                continue

            post_date = (anchor_date + timedelta(days=day - anchor_day)).isoformat()
            new_post = {
                "day": day,
                "date": post_date,
                "content": content,
                "url": post_url
            }
            posts.append(new_post)
            existing_days.add(day)
            added += 1
            print(f"Successfully scraped Day {day}: {post_url}")
            break

    if added > 0:
        posts.sort(key=lambda x: x['day'])
        with open(json_path, 'w', encoding='utf-8') as f:
            json.dump(posts, f, indent=2, ensure_ascii=False)
        print(f"Added {added} new posts to {json_path}")
    else:
        print("No new posts discovered.")

if __name__ == '__main__':
    main()
