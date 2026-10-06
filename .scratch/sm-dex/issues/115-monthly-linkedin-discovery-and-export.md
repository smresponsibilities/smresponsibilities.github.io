# Ticket 115: Monthly Bing discovery and LinkedIn export research

Type: task
Status: resolved
Blocked by: none

## Goal

Try monthly Bing searches for posts about one week old or older; research LinkedIn's account export before promising an exact historical diff.

## Answer

Added `scripts/discover-linkedin-posts.mjs`, parser self-check, and monthly GitHub Actions workflow. Each run checks days 7–45 days old, verifies author/day/hashtag on direct public pages, deduplicates by activity ID, and uploads JSON for review. Search results are not published automatically. LinkedIn's signed-in settings show a larger archive rather than a Posts checkbox. Current help lists **Shares** records with date, URL, comments, visibility. Full findings and limitations in [research notes](../research/linkedin-autoblog-options.md). Live Node search returned no matching results for known days; the schedule remains best effort until a hosted run proves coverage. Astro build passed.

## Handoff

**Built:** Monthly discovery script, artifact workflow, parser check; export guidance corrected.
**Deviated:** No blog autopublish because Bing server results were empty for known days.
**Watch out:** Await actual LinkedIn ZIP before writing a CSV diff parser. Do not put full archive in repo; it contains private data. Monthly workflow unverified on GitHub runner.
