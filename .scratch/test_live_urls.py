import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

candidates = [
    # Flight sun tracker
    'https://flight-sun-tracker.vercel.app',
    'https://flight-sun-tracker-q9m101c8r-shivam-mahajans-projects.vercel.app',
    # Kalp task 3
    'https://kalp-task3.vercel.app',
    'https://kalp-task3-apsymkj0r-shivam-mahajans-projects.vercel.app',
    # Renukiran
    'https://renukiranfoundation.vercel.app/',
    'https://renukiranfoundation-osa4krjjk-shivam-mahajans-projects.vercel.app',
    # Nextfirst
    'https://firstnextappthatisdashboard.vercel.app',
    'https://nextjs-boilerplate-two-amber-96.vercel.app',
    # Web project
    'https://smresponsibilities.github.io/web_project/',
    'https://shivammahajan.com/web_project/',
    # Productivity caller simulator
    'https://shivammahajan.com/productivity-caller-simulator/',
    'https://smresponsibilities.github.io/productivity-caller-simulator/',
    # Chain-Code
    'https://chaincode-lfopffcfp-shivam-mahajans-projects.vercel.app',
    'https://chain-code.vercel.app',
    # Xeno
    'https://xeno3-m6mjeu9rf-shivam-mahajans-projects.vercel.app',
    'https://xeno3.vercel.app',
    'https://xeno2.vercel.app',
    'https://xeno1.vercel.app',
]

for url in candidates:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
        res = urllib.request.urlopen(req, context=ctx, timeout=5)
        print(f"200 OK: {url} -> {res.geturl()}", flush=True)
    except urllib.error.HTTPError as e:
        print(f"HTTP {e.code}: {url}", flush=True)
    except Exception as e:
        print(f"ERR: {url} ({e})", flush=True)
