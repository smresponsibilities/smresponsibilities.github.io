import urllib.request
import re

url = 'https://productivity-caller-comparison.sm-responsibilities.chatgpt.site'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
html = urllib.request.urlopen(req).read().decode('utf-8')

anchors = re.findall(r'href="#([a-zA-Z0-9_-]+)"', html)
ids = set(re.findall(r'id="([a-zA-Z0-9_-]+)"', html))

print('Found anchors:', anchors)
for a in anchors:
    print(f'Anchor #{a}: {"EXISTS" if a in ids else "MISSING!"}')

# Check canonical
canon = re.findall(r'<link\s+rel=["\']canonical["\']\s+href=["\']([^"\']+)["\']', html)
print('Canonical tags:', canon)

# Check theme-color / dark mode
print('Dark mode mentions:', len(re.findall(r'dark', html, re.IGNORECASE)))
print('Cat image references:', re.findall(r'https?://[^\s\'"]*cat-states\.png', html))
