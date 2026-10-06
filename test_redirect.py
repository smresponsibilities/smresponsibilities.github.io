import re
import urllib.request
html = open('bing.html', encoding='utf-8').read()
links = re.findall(r'href="(https://www\.bing\.com/ck/a\?![^"]+)"', html)

for link in links:
    link = link.replace('&amp;', '&')
    req = urllib.request.Request(link, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        urllib.request.urlopen(req, timeout=5)
    except urllib.error.HTTPError as e:
        print(f"Error {e.code} for {link}")
    except urllib.error.URLError as e:
        print(f"Error for {link}")
    except Exception as e:
        pass
