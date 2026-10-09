import os, re, json, subprocess, sys
from datetime import date, timedelta
import requests
from bs4 import BeautifulSoup

body = os.environ.get('ISSUE_BODY', '') or ''
title = os.environ.get('ISSUE_TITLE', '')
num = os.environ['ISSUE_NUMBER']

def say(msg, fail=False):
    subprocess.run(['gh', 'issue', 'comment', num, '--body', msg])
    if fail:
        subprocess.run(['gh', 'issue', 'edit', num, '--add-label', 'needs-manual'])
        sys.exit(1)

m = re.search(r'Day\s+(\d+)', title)
if not m:
    say('Issue title must look like "Day 1243".', True)
day = int(m.group(1))
d = (date(2026, 10, 1) + timedelta(days=day - 1238)).isoformat()

content, url = None, None
man = re.search(r'MANUAL:\s*\n([\s\S]+)', body)
if man and len(man.group(1).strip()) > 20:
    content = man.group(1).strip()
else:
    u = re.search(r'(https?://(?:www\.)?linkedin\.com/(?:posts|feed/update)[^\s)]+|https?://lnkd\.in/[^\s)]+)', body)
    if not u:
        say('No LinkedIn URL and no MANUAL: text in the issue body. Edit the body and close again.', True)
    url = u.group(1)
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=15)
        og = BeautifulSoup(r.text, 'html.parser').find('meta', property='og:description')
        content = og['content'].strip() if og and og.get('content') else None
    except Exception as e:
        say(f'Fetch failed: {e}', True)
    if not content:
        say('LinkedIn gave no description. Add a MANUAL: block with the text and close again.', True)

path = 'src/data/linkedin-posts.json'
posts = json.load(open(path, encoding='utf-8'))
rec = next((p for p in posts if p.get('day') == day), None)
if rec is None:
    rec = {'day': day}
    posts.append(rec)
rec.update({'date': rec.get('date') or d, 'content': content})
if url:
    rec['url'] = url
posts.sort(key=lambda p: p['day'])
json.dump(posts, open(path, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
say(f'Saved Day {day}. The site will redeploy.')
