import os, re, json, subprocess, sys
from datetime import date, timedelta
import requests
from bs4 import BeautifulSoup

body = os.environ.get('ISSUE_BODY', '') or ''
title = os.environ.get('ISSUE_TITLE', '')
num = os.environ.get('ISSUE_NUMBER', '')

def say(msg, fail=False):
    if num:
        subprocess.run(['gh', 'issue', 'comment', num, '--body', msg])
        if fail:
            subprocess.run(['gh', 'issue', 'edit', num, '--add-label', 'needs-manual'])
            sys.exit(1)
    else:
        print(msg)
        if fail:
            sys.exit(1)

m = re.search(r'Day\s+(\d+)', title)
if not m:
    say('Issue title must look like "Day 1243".', True)
day = int(m.group(1))
d = (date(2026, 10, 1) + timedelta(days=day - 1238)).isoformat()

# 1. Parse GLITCH / SKIPPED / EASTER_EGG / COMMENT
easter_egg = None
if re.search(r'\b(?:GLITCH|SKIPPED|EASTER_EGG)\b', body, re.IGNORECASE):
    glitch_m = re.search(r'(?:GLITCH|SKIPPED|EASTER_EGG|COMMENT):\s*([^\r\n]+(?:\n[^\r\n]+)*)', body, re.IGNORECASE)
    raw_glitch = glitch_m.group(1).strip() if glitch_m else ""
    # Strip any next keyword sections
    raw_glitch = re.split(r'\n\s*(?:MANUAL|MILESTONE|https?://)', raw_glitch, flags=re.IGNORECASE)[0].strip()
    easter_egg = raw_glitch if raw_glitch else f"Where did Day {day} go? Skipped to align challenge count!"

# 2. Parse MILESTONE
milestone = None
milestone_m = re.search(r'MILESTONE:\s*([^\r\n]+)', body, re.IGNORECASE)
if milestone_m:
    milestone = milestone_m.group(1).strip()
elif day % 100 == 0 or day == 1 or day == 1001 or day == 2002:
    milestone = f"Day {day} Milestone"

# 3. Parse LinkedIn URL
url = None
u = re.search(r'(https?://(?:www\.)?linkedin\.com/(?:posts|feed/update)[^\s)]+|https?://lnkd\.in/[^\s)]+)', body)
if u:
    url = u.group(1)

# 4. Parse CONTENT (Manual or fetched from LinkedIn)
content = None
man_m = re.search(r'MANUAL:\s*\n([\s\S]+)', body, re.IGNORECASE)
if man_m:
    raw_man = man_m.group(1).strip()
    # Strip MILESTONE or GLITCH if placed after MANUAL
    raw_man = re.split(r'\n\s*(?:GLITCH|SKIPPED|MILESTONE):', raw_man, flags=re.IGNORECASE)[0].strip()
    if len(raw_man) > 10:
        content = raw_man

if not content and url:
    try:
        r = requests.get(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}, timeout=15)
        og = BeautifulSoup(r.text, 'html.parser').find('meta', property='og:description')
        content = og['content'].strip() if og and og.get('content') else None
    except Exception as e:
        say(f'Fetch failed: {e}', True)
    if not content and not easter_egg:
        say('LinkedIn gave no description. Add a MANUAL: block or GLITCH and close again.', True)

# Fallback content if only GLITCH is specified
if not content and easter_egg:
    content = f"Glitch: {easter_egg}"

if not content and not easter_egg:
    say('No LinkedIn URL, no MANUAL: text, and no GLITCH declaration in the issue body. Edit the body and close again.', True)

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
if milestone:
    rec['milestone'] = milestone

posts.sort(key=lambda p: p['day'])
json.dump(posts, open(path, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)

# Build summary comment
tags = []
if url:
    tags.append('URL')
if easter_egg:
    tags.append(f'Glitch: "{easter_egg[:40]}..."' if len(easter_egg) > 40 else f'Glitch: "{easter_egg}"')
if milestone:
    tags.append(f'Milestone: "{milestone}"')

tag_info = f" ({', '.join(tags)})" if tags else ""
say(f'Saved Day {day}{tag_info}. The site will redeploy.')
