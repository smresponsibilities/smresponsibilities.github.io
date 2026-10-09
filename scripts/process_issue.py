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

content, url, easter_egg = None, None, None

# Check for GLITCH / SKIPPED
if re.search(r'\b(?:GLITCH|SKIPPED)\b', body, re.IGNORECASE):
    glitch_m = re.search(r'(?:GLITCH|SKIPPED):\s*([^\r\n]+)', body, re.IGNORECASE)
    easter_egg = glitch_m.group(1).strip() if glitch_m else f"Where did Day {day} go? Skipped to align challenge count!"
    content = f"Glitch: {easter_egg}"
else:
    man = re.search(r'MANUAL:\s*\n([\s\S]+)', body)
    if man and len(man.group(1).strip()) > 20:
        content = man.group(1).strip()
    else:
        u = re.search(r'(https?://(?:www\.)?linkedin\.com/(?:posts|feed/update)[^\s)]+|https?://lnkd\.in/[^\s)]+)', body)
        if not u:
            say('No LinkedIn URL, no MANUAL: text, and no GLITCH declaration in the issue body. Edit the body and close again.', True)
        url = u.group(1)
        try:
            r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}, timeout=15)
            og = BeautifulSoup(r.text, 'html.parser').find('meta', property='og:description')
            content = og['content'].strip() if og and og.get('content') else None
        except Exception as e:
            say(f'Fetch failed: {e}', True)
        if not content:
            say('LinkedIn gave no description. Add a MANUAL: block or mark GLITCH and close again.', True)

path = 'src/data/linkedin-posts.json'
posts = json.load(open(path, encoding='utf-8'))
rec = next((p for p in posts if p.get('day') == day), None)
if rec is None:
    rec = {'day': day}
    posts.append(rec)
rec.update({'date': rec.get('date') or d, 'content': content})
if url:
    rec['url'] = url
if easter_egg:
    rec['easterEgg'] = easter_egg
posts.sort(key=lambda p: p['day'])
json.dump(posts, open(path, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)

if easter_egg:
    say(f'Saved Day {day} as a Glitch/Skipped entry. The site will redeploy.')
else:
    say(f'Saved Day {day}. The site will redeploy.')
