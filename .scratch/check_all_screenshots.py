import subprocess
import json
import re

token = subprocess.check_output(['gh', 'auth', 'token'], text=True).strip()

repos = [
    'flight-sun-tracker', 'Xeno2', 'xeno1', 'kalp-task3', 
    'Renukiran-Tree_Plantation_Project-2210990127-2210991323-2210991771-2210992314', 
    'nextfirst', 'Postie', 'productivity-caller-simulator', 'Chain-Code', 'QuizDeck', 
    'Wordle', 'clickless', 'Ingestion-Tool', 'jobscraper_hourly', 'fertilizertypeapi',
    'FEETODOWEBSITE', 'Gamehub', 'Productivity-Caller'
]

for r in repos:
    try:
        # Get commit list
        cmd = ['gh', 'api', f'repos/smresponsibilities/{r}/commits?per_page=15', '--jq', '.[].sha']
        res = subprocess.run(cmd, capture_output=True, text=True)
        shas = res.stdout.strip().split()
        if not shas:
            continue
        
        found_images = {}
        for sha in shas[1:]: # check older commits
            cmd_c = ['gh', 'api', f'repos/smresponsibilities/{r}/contents/README.md?ref={sha}']
            res_c = subprocess.run(cmd_c, capture_output=True, text=True)
            if res_c.returncode == 0:
                try:
                    data = json.loads(res_c.stdout)
                    import base64
                    content = base64.b64decode(data['content']).decode('utf-8', errors='ignore')
                    # search for markdown images: ![...](...)
                    imgs = re.findall(r'!\[.*?\]\((.*?)\)', content)
                    # filter out badges (img.shields.io, badge)
                    real_imgs = [i for i in imgs if not ('shields.io' in i or 'badge' in i)]
                    if real_imgs:
                        found_images[sha] = real_imgs
                except Exception:
                    pass
        if found_images:
            print(f"=== {r} HAD SCREENSHOTS/DEMOS IN EARLIER COMMITS: ===")
            for sha, imgs in list(found_images.items())[:2]:
                print(f"  commit {sha[:7]}: {imgs}")
        else:
            print(f"{r}: no non-badge screenshots found in history")
    except Exception as e:
        print(f"Error checking {r}: {e}")
