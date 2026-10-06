import re
html = open('bing.html', encoding='utf-8').read()
links = re.findall(r'(https://www\.linkedin\.com[^\'"]*)', html)
print('\n'.join(set(links)))
