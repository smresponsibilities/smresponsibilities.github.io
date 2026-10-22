import urllib.request, json, subprocess

token = subprocess.check_output(['gh', 'auth', 'token'], text=True).strip()
url = 'https://api.github.com/repos/smresponsibilities/Xeno2/deployments'
req = urllib.request.Request(url, headers={'Authorization': f'Bearer {token}', 'User-Agent': 'Python'})
deps = json.loads(urllib.request.urlopen(req).read().decode('utf-8'))

for d in deps:
    st_url = d['statuses_url']
    st_req = urllib.request.Request(st_url, headers={'Authorization': f'Bearer {token}', 'User-Agent': 'Python'})
    st = json.loads(urllib.request.urlopen(st_req).read().decode('utf-8'))
    for s in st:
        print(f"{d['created_at']} | state: {s.get('state')} | env: {d.get('original_environment')} | target: {s.get('target_url')}", flush=True)
