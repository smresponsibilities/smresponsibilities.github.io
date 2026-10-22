# Ticket 107: LinkedIn autoblog feasibility

Type: research
Status: resolved
Blocked by: none

## Question

Can the latest post from Shivam's LinkedIn profile be discovered reliably and added automatically to `/blog/`?

## Answer

Public profile and activity URLs returned HTTP 999 to unauthenticated requests from this environment. Public web search did not return a reliable latest post. LinkedIn's official Posts API supports finding posts by author, but reading member posts requires `r_member_social`, a restricted permission available to approved users. See [Posts API](https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api?view=li-lms-2026-02). No reliable no-approval auto-pull was established.

Practical fallback: keep blog entries as local data, accept the post URL and optional date/day through a small submission workflow, then build and deploy. Full automatic pulling depends on approved API access. Avoid treating search results or profile scraping as a reliable source.

## Handoff

**Built:** No code changes. Local Astro server started and `/blog/` returned HTTP 200.
**Deviated:** Nothing.
**Watch out:** Last shared post is a sample, not verified latest. Need user choice between semi-automatic URL submission and pursuing LinkedIn API approval.
