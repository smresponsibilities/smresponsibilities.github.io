import re
import urllib.parse
from scrapling import StealthyFetcher

def check_day(day):
    hashtag = "2002 days of code" if day > 1001 else "1001 days of code"
    query = f"+#day{day} {hashtag} site:linkedin.com/"
    url = "https://html.duckduckgo.com/html/?q=" + urllib.parse.quote_plus(query)
    
    try:
        fetcher = StealthyFetcher()
        page = fetcher.fetch(url, headers={'User-Agent': 'Mozilla/5.0'})
        html = page.body if isinstance(page.body, str) else page.body.decode('utf-8', errors='replace')
    except Exception as e:
        print(f"Day {day} -> Fetch failed: {e}")
        return

    links = re.findall(r'href="(//duckduckgo\.com/l/\?uddg=[^"]+)"', html)
    for link in links:
        real_url = urllib.parse.unquote(link.split('uddg=')[1].split('&')[0])
        if 'linkedin.com' in real_url:
            print(f"Day {day} -> SUCCESS! Found URL: {real_url}")
            return
    print(f"Day {day} -> No results found. HTML length: {len(html)}")

check_day(1081)
