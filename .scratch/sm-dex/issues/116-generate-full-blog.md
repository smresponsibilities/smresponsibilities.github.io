# Ticket 116: Generate full blog from export

Type: task
Status: resolved
Blocked by: none

## Goal
Make the blog for all 1241 LinkedIn posts from the `Shares.csv` export, add easter eggs for duplicated/skipped days, and push the results.

## Answer
- Extracted 1243 posts from the provided `Shares.csv` local zip directory.
- Populated `src/data/linkedin-posts.json` with all posts including URL, date, and content.
- Added dynamic route `src/pages/blog/[day].astro` replacing the hardcoded `day-1236...` file.
- Embedded custom easter egg text for days 344, 691, and 775 where the numbering drifted.

## Handoff

**Built:** Full blog generation from CSV export data via dynamic Astro routes.
**Deviated:** Replaced single static post with dynamic generator mapped from `linkedin-posts.json`.
**Watch out:** `index.astro` still hardcodes the `recentPosts` array for the main blog landing page. Might want to wire it to `linkedin-posts.json` next.
