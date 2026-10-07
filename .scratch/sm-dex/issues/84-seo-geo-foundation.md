# Ticket 84 — SEO, GEO, and AEO foundation

Type: task
Status: resolved
Blocked by: none

## Goal

Make the portfolio discoverable and citable through standard crawl files, complete page metadata,
accurate structured data, and answer-first visible copy.

## Acceptance criteria

- Root sitemap lists canonical indexable URLs with absolute production URLs.
- `robots.txt` permits crawling and points to the sitemap.
- `llms.txt` gives AI crawlers a concise, factual map of the portfolio.
- Homepage includes canonical, description, author, Open Graph, and Twitter metadata.
- Homepage includes accurate `WebSite`, `ProfilePage`, and `Person` JSON-LD.
- Title, H1, and opening copy clearly identify Shivam Mahajan as a software developer.
- Metadata and structured data remain server-rendered without client JavaScript.
- Production build and focused SEO validation pass.

## Sources

- Google Search Central, “Build and submit a sitemap.”
- Google Search Central, “Profile page structured data.”

## Handoff

**Built:** Added crawl discovery files, complete homepage metadata, accurate structured data,
answer-first portfolio copy, and a focused rendered-output gate. The build also synchronized the
generated device content with the latest approved roster entry already present in source data.
**Deviated:** Nothing.
**Watch out:** Keep `https://shivammahajan.com` aligned between Astro site configuration, sitemap,
robots, structured data, and `llms.txt` if the production domain changes.
