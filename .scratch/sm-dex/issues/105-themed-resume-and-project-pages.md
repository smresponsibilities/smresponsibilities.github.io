# Ticket 105: Themed resume and project pages

Type: task
Status: resolved
Blocked by: none

## Goal

Publish readable, themed HTML pages for the resume, Productivity Caller, and SM'S DEX. Link them from the homepage and sitemap.

## Answer

Added three static Astro pages with shared editorial styling. Kept SM'S DEX as the site brand and Shivam Mahajan in page titles and headings. Linked resume and Productivity Caller from the homepage, added all routes to the sitemap, and limited the homepage Markdown alternate and profile Open Graph type to `/`. `npm run build` and the ticket 84 SEO gate pass.

## Handoff

**Built:** `/resume/`, `/projects/productivity-caller/`, `/projects/sm-dex/`, shared theme, homepage links, sitemap entries.
**Deviated:** Nothing. Project claims with unverified methodology are described without the numerical result.
**Watch out:** Pages remain local until deployment. Daily LinkedIn post feed needs user-provided public post URLs or approved API access; no scraping or auto-import built.
