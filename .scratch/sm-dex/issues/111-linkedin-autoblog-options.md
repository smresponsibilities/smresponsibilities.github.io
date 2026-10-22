# Ticket 111: Research LinkedIn-first autoblog options

Type: research
Status: resolved
Blocked by: none

## Goal

Check how other sites import personal LinkedIn posts automatically and identify a testable route for this portfolio.

## Answer

See [research](../research/linkedin-autoblog-options.md). Official personal-post reads require restricted `r_member_social` permission. LinkedIn Cards demonstrates a scheduled GitHub Action using an Apify public-profile-post actor. RSS.app advertises LinkedIn feeds, but exact personal-profile coverage remains unverified. Zapier and n8n native LinkedIn integrations publish posts; neither provided a verified new-personal-post trigger. Best next experiment: one paid or free-tier Apify run against known days 1233–1237, comparing IDs and full text before building an importer. LinkedIn's terms prohibit scraping; provider cost and feed reliability remain unknown.

## Handoff

**Built:** Evidence-backed option comparison and concrete trial criteria.
**Deviated:** Nothing.
**Watch out:** No Apify token, paid run, automation, or deployed blog importer exists.
