import json
import base64
import subprocess
import sys

def update_readme(repo, content, commit_message):
    print(f"Updating README for {repo}...")
    # 1. Get current SHA if exists
    get_sha_cmd = ["gh", "api", f"repos/smresponsibilities/{repo}/contents/README.md", "--jq", ".sha"]
    res = subprocess.run(get_sha_cmd, capture_output=True, text=True)
    sha = res.stdout.strip() if res.returncode == 0 else None
    
    # 2. Base64 encode content
    b64_content = base64.b64encode(content.encode("utf-8")).decode("utf-8")
    
    # 3. Build payload
    payload = {
        "message": commit_message,
        "content": b64_content
    }
    if sha:
        payload["sha"] = sha
        
    payload_json = json.dumps(payload)
    
    # 4. Execute PUT via gh api
    put_cmd = ["gh", "api", "-X", "PUT", f"repos/smresponsibilities/{repo}/contents/README.md", "--input", "-"]
    res = subprocess.run(put_cmd, input=payload_json, capture_output=True, text=True)
    if res.returncode == 0:
        print(f"Successfully updated README for {repo}!")
    else:
        print(f"Failed to update README for {repo}: {res.stderr}")
        sys.exit(1)

if __name__ == "__main__":
    repo_name = sys.argv[1]
    file_path = sys.argv[2]
    commit_msg = sys.argv[3] if len(sys.argv) > 3 else "docs: update README with comprehensive technical architecture and benchmarks"
    with open(file_path, "r", encoding="utf-8") as f:
        md_content = f.read()
    update_readme(repo_name, md_content, commit_msg)
