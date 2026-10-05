import os
import re
import json
import urllib.parse
import urllib.request
from scrapling import StealthyFetcher
from datetime import datetime

# Find the latest day in the JSON
json_path = 'src/data/linkedin-posts.json'
with open(json_path, 'r', encoding='utf-8') as f:
    posts = json.load(f)

latest_day = max([p['day'] for p in posts])
next_day = latest_day + 1

# 1. Search Bing
query = f"+#day{next_day} 1001 days of code site:linkedin.com/posts/"
url = "https://www.bing.com/search?q=" + urllib.parse.quote_plus(query)

try:
    fetcher = StealthyFetcher()
    page = fetcher.fetch(url)
    html = page.body if isinstance(page.body, str) else page.body.decode('utf-8', errors='replace')
except Exception as e:
    print(f"Bing search failed: {e}")
    exit(0)

# Extract LinkedIn URL from Bing results
links = re.findall(r'href="(https://[w\.]*linkedin\.com/(?:posts|feed/update)[^"]+)"', html)
if not links:
    print(f"No Bing results found for Day {next_day}. Post might not be indexed yet.")
    exit(0)

linkedin_url = links[0]
print(f"Found LinkedIn URL: {linkedin_url}")

# 2. Fetch LinkedIn OG Tags
req_li = urllib.request.Request(linkedin_url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    with urllib.request.urlopen(req_li, timeout=15) as res:
        li_html = res.read().decode('utf-8')
except Exception as e:
    print(f"LinkedIn fetch failed: {e}")
    exit(0)

og_match = re.search(r'<meta property="og:description"\s+content="([^"]+)"', li_html)
if not og_match:
    print("No OG description found.")
    exit(0)

content = og_match.group(1).replace('&quot;', '"').replace('&amp;', '&')

new_post = {
    "day": next_day,
    "date": datetime.now().strftime('%Y-%m-%d'),
    "content": content,
    "url": linkedin_url
}

posts.append(new_post)
posts.sort(key=lambda x: x['day'])

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Successfully scraped and added Day {next_day}")
