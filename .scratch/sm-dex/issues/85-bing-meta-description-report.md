# Ticket 85 — Bing meta-description report

Type: bug
Status: resolved
Blocked by: none

## Problem

Bing Webmaster Tools reports one URL without a meta description. The only HTML route already
serves a unique description in raw HTML; the sitemap also listed the resume PDF, which cannot
contain an HTML meta-description tag.

## Acceptance criteria

- Every HTML URL in the sitemap serves a meta description.
- Non-HTML downloads are not advertised as canonical pages in the sitemap.
- The resume remains available from the portfolio.
- Production build and focused SEO validation pass.

## Handoff

**Built:** Removed the resume PDF from the XML sitemap and added a regression assertion that the
sitemap contains only HTML canonical pages. The portfolio's resume link remains unchanged.
**Deviated:** Nothing.
**Watch out:** Bing's existing report is cached. Run a new Site Scan or wait for its next crawl;
the live homepage already serves the description in initial HTML.
