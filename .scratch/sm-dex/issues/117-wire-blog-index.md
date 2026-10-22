# Ticket 117: Wire blog index to JSON

Type: task
Status: resolved
Blocked by: none

## Goal
Update `src/pages/blog/index.astro` to dynamically read from `linkedin-posts.json` instead of hardcoding the recent posts list.

## Answer
- Imported `linkedin-posts.json` into `index.astro`.
- Sliced the last 5 posts for the "Recent daily posts" grid.
- Mapped the latest post to the "Selected update" embed section, converting its URL to an embed-friendly URN format.

## Handoff

**Built:** Dynamic wiring for `blog/index.astro`.
**Deviated:** Nothing.
**Watch out:** Post titles in the grid are now truncated/extracted from the raw content instead of hand-written, since the raw content doesn't have a distinct "Title" field.
