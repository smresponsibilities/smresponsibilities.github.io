# Handoff — 2026-10-05, after ticket 116

## State

Resolved: 116.
Frontier: Update `src/pages/blog/index.astro` to dynamically list posts from `linkedin-posts.json` instead of hardcoding `recentPosts`.
In flight: none.

## Last session

Extracted 1243 posts from `Shares.csv` into `src/data/linkedin-posts.json`. Replaced static `day-1236...` blog page with a dynamic Astro route `[day].astro` to generate pages for all 1241 days. Added easter eggs for days with numbering drift (344/345, 691/692, 773/774). Pushed changes.

## Not yet written down

The `index.astro` blog page still has a hardcoded list of 5 recent posts. It needs to be updated to map over the imported JSON data.

## Next

Wire `src/pages/blog/index.astro` to `linkedin-posts.json` and optionally remove duplicate static files.
