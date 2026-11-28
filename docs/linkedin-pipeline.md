# LinkedIn Automation & Daily Ingestion Pipeline

How the automated daily issues, Bing discovery, and manual post ingestion work.

---

## 1. Daily Issue Creation (`daily-issue.yml`)

- **Schedule**: Daily at `18:30 UTC` (`00:00 IST` midnight).
- **Behavior**:
  1. Calculates the day number using the current automation anchor (`Day 1238` on `2026-10-01`). Historical numbering contains corrections, so do not recompute dates for existing records.
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

- **`bing-cron.yml`**: Runs daily at `12:00 UTC`. Uses `scripts/auto_fetch_bing.py` with `urllib` and Beautiful Soup to search for missing day numbers within the most recent 60 days. It logs how many result links were decoded and why candidates were rejected. Decodes Bing `/ck/a?!...&u=a1<base64>` redirects. When a post is found, it automatically closes the corresponding open issue with an auto-closed note!
- **`linkedin-discovery.yml`**: Runs daily at `03:17 UTC`. Uses `scripts/discover-linkedin-posts.mjs` to search for missing posts in the preceding 60 days, including the current calculated day. It accepts only post permalinks from the expected author and content containing the matching day and challenge hashtag. The importer preserves all existing entries, even when multiple posts share a day number.

---

## 6. Data integrity and review checklist

- **No search hit does not imply no post.** Both background discovery jobs log candidates and leave missing days unresolved when they cannot verify a source.
- **No unauthorized rewrite of historical posts.** Duplicate day numbers are valid. The issue processor matches an existing source URL first, adds a distinct new URL without overwriting a different post, and rejects ambiguous manual edits.
- **Stable permalinks.** `/blog/day-N/` remains the canonical day URL. When multiple posts share a day, the page displays all original entries and LinkedIn source links instead of generating duplicate static paths.
- **URL-less updates are valid.** `MANUAL:` and `GLITCH:` records can render without inventing an original LinkedIn URL. The blog only offers an embed when the URL can be verified as an embeddable LinkedIn permalink.
- **Not a full LinkedIn backup.** The discovery workflows only ingest verifiable Days-of-Code posts found through Bing. They do not synchronize arbitrary posts, private posts, comments, edits, impressions or media attachments.
- **Before merging any ingestion changes:** run `python scripts/test_process_issue.py`, `python scripts/test_auto_fetch_bing.py`, `node scripts/test-discover-linkedin-posts.mjs`, `node scripts/test-linkedin-integrity.mjs`, and `npm run build`. The build runs `scripts/test-blog-output.mjs` to catch duplicate pages and broken links. Pull requests run these checks without deploying GitHub Pages.
