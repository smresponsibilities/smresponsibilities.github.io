import subprocess, base64, json, re

res = subprocess.run(['gh', 'api', 'repos/smresponsibilities/Wordle/contents/include/hash.h', '--jq', '.content'], capture_output=True, text=True)
content = base64.b64decode(res.stdout).decode('utf-8')
words = re.findall(r'"([a-zA-Z]{5})"', content)
print(f"Total words extracted: {len(words)}")
print("First 10 words:", words[:10])
print("Last 5 words:", words[-5:])
with open('public/wordle-words.json', 'w') as f:
    json.dump([w.lower() for w in words], f)
