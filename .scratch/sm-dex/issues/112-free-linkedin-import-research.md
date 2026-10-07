# Ticket 112: Check free open source LinkedIn import routes

Type: research
Status: resolved
Blocked by: none

## Goal

Find zero-fee open source routes for recovering older personal LinkedIn posts and importing future posts.

## Answer

See [research](../research/linkedin-autoblog-options.md). MIT Chrome extension exports visible profile posts to CSV from a signed-in session; Apache-2.0 Selenium script exports activity as JSON but needs credentials and has not been updated since 2023. Newsletter RSS covers newsletters, not ordinary personal posts. No verified free, open source unattended feed with complete personal-post coverage found. Browser exports can backfill; reliable zero-fee future workflow starts from shared source text or manual URL entry.

## Handoff

**Built:** Compared GitHub implementations and licenses; updated research report.
**Deviated:** Nothing.
**Watch out:** Repository claims were inspected, but no extension or scraper was executed against this profile. Scraping violates LinkedIn's stated terms.
