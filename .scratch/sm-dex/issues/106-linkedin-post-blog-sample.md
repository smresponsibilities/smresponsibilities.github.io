# Ticket 106: LinkedIn post blog sample

Type: task
Status: resolved
Blocked by: none

## Goal

Use one supplied LinkedIn post to create a themed blog page with direct link, compact embed, and full embed.

## Answer

Added `/blog/` with the supplied link and both official LinkedIn embed variants. Embeds load on click. Linked page from editorial navigation and homepage, and added it to sitemap. Build and SEO gate pass.

## Handoff

**Built:** One-post sample at `/blog/`, with link and two embed choices.
**Deviated:** Nothing.
**Watch out:** No post date, day number, or text inferred. Full daily import needs a supported source of post metadata; no scraping or automated feed exists yet. Page remains local until deployment.
