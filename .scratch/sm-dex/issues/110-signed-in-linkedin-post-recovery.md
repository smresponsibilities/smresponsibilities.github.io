# Ticket 110: Recover recent LinkedIn posts from signed-in activity

Type: task
Status: resolved
Blocked by: none

## Goal

Use the user's signed-in LinkedIn session to verify earlier 2002 Days of Code posts and update the local journal.

## Answer

Opened the user's own Activity page after sign-in. Matched each day marker and LeetCode title to the post's analytics activity URN, then verified direct permalinks. Also recovered share URNs from each post's Boost link and checked unauthenticated embed endpoints for days 1237, 1235, 1234, and 1233: all returned HTTP 200 with matching day markers. This supersedes ticket 109's unauthenticated-search limitation.

Added days 1237–1233 to `/blog/` as linked cards, dated October 1 to September 27, 2026. Build, local route, and SlopMonster checks pass. No automatic import or deployment.

## Handoff

**Built:** Five verified recent-post links in the journal; current top link points to day 1237.
**Deviated:** Nothing.
**Watch out:** Signed-in browser access is session-bound and not suitable as a production import mechanism. Future automatic updates still need approved LinkedIn read API access or a URL submission workflow. Journal snapshot goes stale after new posts.
