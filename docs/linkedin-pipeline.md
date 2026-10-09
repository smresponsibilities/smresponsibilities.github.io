# LinkedIn Automation & Daily Ingestion Pipeline

How the automated daily issues, Bing discovery, and manual post ingestion work.

---

## 1. Daily Issue Creation (`daily-issue.yml`)

- **Schedule**: Daily at `18:30 UTC` (`00:00 IST` midnight).
- **Behavior**:
  1. Calculates day number based on anchor date (`Day 1237` on `2026-10-01`).
  2. Checks if an issue for that day already exists.
  3. If not, auto-creates an issue with:
     - Title: `Day <N>` (e.g., `Day 1245`)
     - Label: `daily-post`

---

## 2. Where & How to Add the Post Link

When you have published your daily LinkedIn post:

1. **Open the issue**: Go to repo Issues and click the open issue for today (e.g., `Day 1245` — issue #54).
2. **Edit the issue body**:
   - Click the three dots `...` on the top-right of the issue description → **Edit**.
   - Paste the LinkedIn post URL directly anywhere in the text:
     ```text
     https://www.linkedin.com/posts/mahajanshivam_...
     ```
     *(or short link `https://lnkd.in/...`)*
   - **Alternative (no URL / private post)**:
     ```text
     MANUAL:
     #day1245 of #2002daysofcode
     Leetcode: 123. Problem Name
     ...
     ```
   - Click **Update comment**.
3. **Close the issue**: Click **Close issue** at the bottom.

---

## 3. Automated Processing on Close (`process-issue.yml`)

Closing the issue triggers the ingestion pipeline:
1. Filters for `daily-post` label.
2. Runs `scripts/process_issue.py`:
   - Extracts URL or `MANUAL:` block.
   - Fetches OpenGraph description (`og:description`).
   - Appends/updates the entry in `src/data/linkedin-posts.json`.
3. Commits and pushes changes as `github-actions[bot]`.
4. Triggers `deploy.yml` on `main` to redeploy the site.
5. Comments on the issue: `Saved Day <N>. The site will redeploy.`

---

## 4. Background Discovery Crons

- **`bing-cron.yml`**: Runs daily at `12:00 UTC`. Uses `scripts/auto_fetch_bing.py` with `scrapling` to scan Bing for unindexed posts between latest day and current day. Decodes Bing `/ck/a?!...&u=a1<base64>` redirects.
- **`linkedin-discovery.yml`**: Runs daily at `03:17 UTC`. Uses `scripts/discover-linkedin-posts.mjs` to backfill missing posts in a 30–60 day discovery window.
