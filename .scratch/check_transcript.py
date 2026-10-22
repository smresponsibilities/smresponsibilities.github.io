import json

with open(r'C:\Users\sm\.gemini\antigravity\brain\4ed7cd54-1c4b-4fc5-98fb-b3e43316904d\.system_generated\logs\transcript.jsonl', 'r', encoding='utf-8') as f:
    for line in f:
        obj = json.loads(line)
        idx = obj.get('step_index', 0)
        if 620 <= idx <= 660:
            print(f"Step {idx}: {obj.get('type')}")
            content = obj.get('content')
            if content:
                print("  Content:", str(content)[:200])
