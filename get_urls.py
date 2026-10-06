import csv
with open(r"D:\Downloads\Complete_LinkedInDataExport_10-02-2026.zip\Shares_1012309238.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        date = row.get("Date", "")
        if "2026-05-17" in date or "2026-05-18" in date:
            text = row.get("ShareCommentary", "")
            print("Date: " + date)
            print("URL: " + row.get("ShareLink", "No URL"))
            print("Text: " + text[:80].replace("\n", " ").encode("ascii", "ignore").decode())
            print("-" * 50)
