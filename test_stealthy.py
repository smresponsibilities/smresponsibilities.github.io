import re
import urllib.parse
from scrapling import StealthyFetcher

def check_day(day):
    hashtag = "2002 days of code" if day > 1001 else "1001 days of code"
    query = f"+#day{day} {hashtag} site:linkedin.com/posts/"
    url = "https://www.bing.com/search?q=" + urllib.parse.quote_plus(query)
    
    try:
        fetcher = StealthyFetcher()
        page = fetcher.fetch(url)
        html = page.body if isinstance(page.body, str) else page.body.decode('utf-8', errors='replace')
    except Exception as e:
        print(f"Day {day} -> Fetch failed: {e}")
        return

    links = re.findall(r'href="(https://[w\.]*linkedin\.com/(?:posts|feed/update)[^"]+)"', html)
    if not links:
        print(f"Day {day} -> No results found. HTML length: {len(html)}")
    else:
        print(f"Day {day} -> SUCCESS! Found URL: {links[0]}")

check_day(1081)
check_day(1050)
