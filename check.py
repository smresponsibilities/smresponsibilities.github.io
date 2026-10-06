
import json
with open(r"d:\portfolio\src\data\linkedin-posts.json", "r", encoding="utf-8") as f:
    posts = json.load(f)
print("Last 5 posts:")
for p in posts[-5:]:
    print("Day " + str(p["day"]) + " - " + p["date"])

