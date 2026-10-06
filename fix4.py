import os
import re
with open('scripts/auto_fetch_bing.py', 'r') as f:
    code = f.read()

old_query_line = 'query = f"+#day{next_day} 1001 days of code site:linkedin.com/posts/"'
new_query_line = '''hashtag = "2002 days of code" if next_day > 1001 else "1001 days of code"
query = f"+#day{next_day} {hashtag} site:linkedin.com/posts/"'''

code = code.replace(old_query_line, new_query_line)
with open('scripts/auto_fetch_bing.py', 'w') as f:
    f.write(code)
