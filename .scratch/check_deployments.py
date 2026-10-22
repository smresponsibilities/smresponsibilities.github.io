import urllib.request
import json
import subprocess

token = subprocess.check_output(['gh', 'auth', 'token'], text=True).strip()

repos = [
    'flight-sun-tracker', 'Xeno2', 'xeno1', 'Xeno', 'xenoAssignment', 'kalp-task3', 
    'Renukiran-Tree_Plantation_Project-2210990127-2210991323-2210991771-2210992314', 
    'nextfirst', 'web_project', 'productivity-caller-simulator', 'Gamehub', 'FEETODOWEBSITE', 
    'Chain-Code', 'QuizDeck', 'clickless', 'Ingestion-Tool', 'Wordle', 'fertilizertypeapi'
]

for r in repos:
    try:
        url = f'https://api.github.com/repos/smresponsibilities/{r}/deployments'
        req = urllib.request.Request(url, headers={'User-Agent': 'Python', 'Authorization': f'Bearer {token}'})
        deps = json.loads(urllib.request.urlopen(req, timeout=10).read().decode('utf-8'))
        print(f'=== {r} (Deployments: {len(deps)}) ===', flush=True)
        for d in deps[:2]:
            st_url = d['statuses_url']
            st_req = urllib.request.Request(st_url, headers={'User-Agent': 'Python', 'Authorization': f'Bearer {token}'})
            st = json.loads(urllib.request.urlopen(st_req, timeout=10).read().decode('utf-8'))
            for s in st[:2]:
                print(f"  state: {s.get('state')} | env: {s.get('environment')} | target: {s.get('target_url')} | env_url: {s.get('environment_url')}", flush=True)
    except Exception as e:
        print(f'{r}: {e}', flush=True)
