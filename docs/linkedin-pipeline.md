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
   - **Markers can be clubbed together freely**:
     - **URL**: `https://www.linkedin.com/posts/...` or `https://lnkd.in/...`
     - **GLITCH / SKIPPED / COMMENT**:
       ```text
       GLITCH: Numbering drifted in post title, corrected here.
       ```
     - **MILESTONE**:
       ```text
       MILESTONE: 1300 Days of Code continuous streak!
       ```
       *(Note: Every 100th day like 100, 200... 1300 is also auto-detected as a milestone).*
     - **MANUAL**:
       ```text
       MANUAL:
       #day1246 of #2002daysofcode
       Leetcode: 123. Problem Name
       ```
     - **All markers are composable**: You can combine a URL with a custom `MILESTONE:` and a `GLITCH:` comment in the same issue body.
   - Click **Update comment**.
3. **Close the issue**: Click **Close issue** at the bottom.

---

## 3. Automated Processing on Close (`process-issue.yml`)

Closing the issue triggers the ingestion pipeline:
1. Filters for `daily-post` label.
2. Runs `scripts/process_issue.py`:
   - Extracts all present markers (`url`, `glitch`/`easterEgg`, `milestone`, `content`).
   - Appends/updates the entry in `src/data/linkedin-posts.json`.
   - Renders milestone highlights on the timeline and `/blog/milestones/`.
   - Renders `easterEgg` with glitch badge 👾 on the timeline.
3. Commits and pushes changes as `github-actions[bot]`.
4. Triggers `deploy.yml` on `main` to redeploy the site.
5. Comments on the issue with tags summary: `Saved Day <N> (URL, Milestone: "...", Glitch: "..."). The site will redeploy.`

---

## 4. How the Day Anchor & Glitches Work

- **The formula**: `DAY = 1238 + (current_date - 2026-10-01)`.
- **Today's alignment**: `2026-10-09` = **Day 1246**.
- **Does a glitch change the anchor?**
  - **No**, as long as you continue posting 1 number per calendar day from now on.
  - Recording a past skipped day (e.g. Day 1241 or 1244) does **not** change the anchor because today is already synchronized to Day 1246.
  - The anchor only ever needs to change if you deliberately jump/skip numbers on future calendar days.

---

## 5. Background Discovery & Auto-Closing

- **`bing-cron.yml`**: Runs daily at `12:00 UTC`. Uses `scripts/auto_fetch_bing.py` with `scrapling` to scan Bing for unindexed posts between latest day and current day. Decodes Bing `/ck/a?!...&u=a1<base64>` redirects. When a post is found, it automatically closes the corresponding open issue with an auto-closed note!
- **`linkedin-discovery.yml`**: Runs daily at `03:17 UTC`. Uses `scripts/discover-linkedin-posts.mjs` to backfill missing posts in a 30–60 day discovery window.
