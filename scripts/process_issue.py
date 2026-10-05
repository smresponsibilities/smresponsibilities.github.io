import os
import re
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime

body = os.environ.get('ISSUE_BODY', '')
url_match = re.search(r'(https?://(?:www\.)?linkedin\.com/(?:posts|feed/update)[^\s]+|https?://lnkd\.in/[^\s]+)', body)

if not url_match:
    print("No LinkedIn URL found in issue body.")
    exit(0)

url = url_match.group(1)
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
}

try:
    response = requests.get(url, headers=headers, allow_redirects=True, timeout=10)
    soup = BeautifulSoup(response.text, 'html.parser')
    og_desc = soup.find('meta', property='og:description')
    
    if not og_desc:
        print("Could not fetch OG description.")
        exit(0)
        
    content = og_desc['content']
except Exception as e:
    print(f"Error fetching URL: {e}")
    exit(0)

# Try to extract day number
day_match = re.search(r'#day(\d+)', content, re.IGNORECASE)
day = int(day_match.group(1)) if day_match else None

if not day:
    print("Could not find day number in content.")
    exit(0)

json_path = 'src/data/linkedin-posts.json'
with open(json_path, 'r', encoding='utf-8') as f:
    posts = json.load(f)

new_post = {
    "day": day,
    "date": datetime.now().strftime('%Y-%m-%d'), # fallback
    "content": content,
    "url": url
}

exists = False
for p in posts:
    if p['day'] == day:
        p['content'] = content
        p['url'] = url
        exists = True
        break

if not exists:
    posts.append(new_post)
    posts.sort(key=lambda x: x['day'])

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(posts, f, indent=2, ensure_ascii=False)

print(f"Successfully processed Day {day}")
