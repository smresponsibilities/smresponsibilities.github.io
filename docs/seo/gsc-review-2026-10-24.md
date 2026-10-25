# Portfolio SEO review, 24 October 2026

## Scope and evidence

Reviewed the portfolio's current SEO diff, live public pages, Peetal's `docs/seo-top3-ranking-playbook.md` and `docs/gsc-mcp-and-claude-seo-guide.md`, relevant sections of its launch/backlink playbooks, and the portfolio's `docs/seo/buildinpublic-seo-playbooks-deduped.md`.

Used the actual local `mcp-gsc` server through an MCP stdio client, authenticated with the existing service account. The Antigravity-specific `call_mcp_tool` bridge is not exposed in this Codex session. `list_properties` confirmed full-user access to `sc-domain:shivammahajan.com`. No credentials were printed or changed. No publishing, sitemap submissions, indexing requests, or source edits were performed.

Raw MCP responses and live snapshots are in `.scratch/seo-review/`. This is a portfolio review using Peetal's guidance, not a fresh audit of the Peetal store.

## What Google currently reports

| Measurement | Result |
|---|---|
| Rolling 28-day MCP overview | 16 clicks, 318 impressions, 5.03% CTR, reported average position 6.8 |
| Newest returned daily row | 22 October 2026 |
| Homepage, page-level 28-day report | 16 clicks, 204 impressions, 7.84% CTR, position 6.7 |
| Desktop / mobile | 8 clicks each; 157 / 161 impressions |
| `shivam mahajan`, visible query rows over 14 days | 5 clicks, 64 impressions, position 7.6 |
| `flight sun tracker`, visible query rows over 14 days | 0 clicks, 9 impressions, position 6.1 |
| Submitted sitemap index | Processed; 1,319 submitted URLs, zero errors, zero warnings |
| Sitemap last downloaded | 21 October 2026, according to MCP |

All six inspected URLs passed indexing and fetching, allow crawling/indexing, and have the expected Google-selected canonical: `/`, `/resume/`, `/projects/`, `/blog/shivam-mahajan/`, `/blog/shivam-mahajan-software-developer/`, and `/projects/flight-sun-tracker/`.

This does not prove all 1,319 submitted URLs are indexed. The sitemap tool's `WEB: ... 0 indexed` output is not usable evidence: Google's `contents[].indexed` field is explicitly deprecated. URL Inspection directly confirms indexed examples. The basic `get_sitemaps` tool also threw a string/integer comparison error; `list_sitemaps_enhanced` and `get_sitemap_details` succeeded. That formatter error is not a website error.

Query reports omit anonymized traffic. For Flight Sun Tracker, page-level impressions are 26 while visible page-query rows total only 10; use the appropriate report, not the smaller query subtotal as a page total. Page impressions also should not be summed into site impressions.

The fixed-period comparison shows homepage clicks changing from 10 on September 24–October 7 to 7 on October 8–21. These windows differ from the rolling overview. Such small counts do not establish a ranking decline or attribute anything to today's loading changes.

## Review of the current SEO changes

`src/pages/blog/shivam-mahajan-software-developer.astro` adds a prominent homepage action and a contextual overview link. `src/pages/blog/shivam-mahajan.astro` adds a homepage action. Both direct visitors from profile pages toward the actual portfolio, consistent with the playbook's useful internal-link guidance.

Live HTML fetched during this review contains neither new action label. These edits remain local. Their effect cannot be measured in current GSC data. Adding links also does not change canonical selection or guarantee that Google will rank the homepage higher.

Both profile pages already self-canonicalize and are indexed. In the explicit branded query/page report for September 26–October 22, the homepage has 12 clicks and 119 impressions; the software-developer profile has zero clicks and 20 impressions; the other profile has zero clicks and three impressions. Several URLs can legitimately appear for one query, so this is overlap to review, not proof of harmful cannibalization.

The two generic profiles need distinct purposes or eventual consolidation. A second paragraph declaring a page an editorial reference does not itself add evidence or satisfy a different search intent. The existing repeated name/role summaries are weaker than the concrete resume and project evidence.

## Remaining work, ranked

| Priority | Action | Evidence and completion condition |
|---|---|---|
| P1 | Correct the public streak claim and synchronize metrics | Live `llms.txt` calls 2,002 days a streak. Homepage describes a goal; `src/data/dsa-stats.json` reports day 1,261, 2,032 LeetCode solutions and 2,683 combined solutions on October 24. State current day versus 2,002-day target explicitly. The 1,500+ LeetCode figure is a stale lower bound, not the combined total. Check `llms-full.txt` and profile copy too; do not replace every historical milestone with today's number. |
| P1 | Give the identity pages distinct jobs | Keep the homepage as the main portfolio, resume as experience/credentials, project pages as evidence. Decide whether the two generic biography pages contain enough unique information to justify both. If merged later, use a deliberate redirect and update internal links/sitemap; do not automatically canonicalize different content to the homepage. |
| P1 | Publish the reviewed local changes and verify actual HTML | The new homepage actions are absent live. Coordinate with the other active session, publish the approved combined change, then verify links, canonicals and no-JavaScript content. GSC cannot assess unpublished edits. |
| P2 | Improve the Flight Sun Tracker page for its observed query | It already has a live-app action, repository link and technical explanation. Add a short, verified how-to, worked route/date example, output screenshot and limitations. Check broad claims such as one side always being sunny on eastbound morning flights; avoid unsupported guarantees. It has 26 page impressions but no clicks, too little data to diagnose a CTR problem conclusively. |
| P2 | Build from observed long-tail queries, not more generic biographies | Visible queries include Flight Sun Tracker and LeetCode 1569. Check whether the relevant daily note actually solves that task and can provide original explanation/examples. The playbook's four-word filter is a discovery tool, not evidence of low competition. There are only six visible queries in the 14-day sample, so a large keyword-cluster rollout is premature. |
| P2 | Add original evidence to existing case studies | Keep the existing answer-first sections, source links and structured data. Verify performance figures, add reproducible examples/screenshots, and distinguish measured behavior from broad promotional claims. This is a stronger application of the content-effort guidance than copying more schema or adding generic paragraphs. |
| P2 | Establish an indexing and outcome baseline | Inspect a small representative sample of daily notes, chapter/archive hubs and project pages, plus the GSC Page Indexing report if accessible. Current evidence covers six URLs, not the full site. Repeat stable 28-day comparisons after publication; track queries, landing pages and meaningful demo/resume/contact actions separately. No GA4/conversion or complete indexing-coverage report was obtained here. |
| P3 | Verify relevant external identity/project links | GSC lists Peerlist as a referring URL to the homepage. Verify that GitHub, LinkedIn and Peerlist consistently link to the intended primary pages. A full backlink profile was not retrieved. Do not infer toxic links or prescribe disavow from a single referring URL. No outreach is authorized by this review. |

The separate loading/card work and Cloudflare policy are already tracked under `.scratch/frontend-performance/`. They remain relevant to experience, but this review did not produce new CrUX or Lighthouse evidence and does not attribute search performance to them.

## How the Peetal guidance applies

| Guidance | Portfolio status |
|---|---|
| Contextual internal linking and clear primary destination | Partially implemented; latest profile-to-home actions still local. |
| Answer-first, useful content and original proof | Already present on project pages; improve examples and verify claims rather than add boilerplate. |
| Entity clarity and accurate structured data | Person/ProfilePage/WebSite and identity links already exist. Current metrics and overlapping biographies need cleanup. Schema alone does not force Knowledge Graph recognition. |
| Query fan-out and compact intent | Use GSC's actual project/problem queries for small targeted improvements. No evidence yet justifies mass new pages. |
| Authentic external corroboration | Verify existing professional/project profiles; backlink completeness is unknown. |
| Local Maps, rank-and-rent, cookware Product/Review markup and store offers | Not applicable to this portfolio. They are not unfinished portfolio requirements. |
| Fixed 45-word answers, exact-match anchor quotas, em-dash/AI-detector rules, guaranteed title formulas and cheap press releases | Treat as unverified tactics or editorial preferences, not Google requirements or guaranteed indexing/ranking fixes. Do not mechanically implement them. |

## Most useful next action

Prepare one small content correction: fix current-day versus challenge-goal wording in the AI-facing manifests, then decide the two profile pages' distinct purpose before publishing the existing homepage-link edits. Avoid expanding the content inventory until the current identity and project pages are accurate and clearly differentiated.

## References

- Local evidence: `.scratch/seo-review/overview28.json`, `pages28.json`, `queries14.json`, `brand_pages.json`, `flight_queries.json`, `inspect_*.json`, `sitemaps_enhanced.json`, `sitemap_details.json`.
- Google Sitemaps API, including deprecated `contents[].indexed`: https://developers.google.com/webmaster-tools/v1/sitemaps
- Google canonicalization guidance: https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls
- Google guidance on useful, reliable content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content

## Implementation follow-up, 24 October 2026

The publication task now corrects `llms.txt` and `llms-full.txt`, makes the biography explicitly describe an ongoing 2,002-day target, and turns the second profile into an engineering-work guide. Both indexed URLs remain self-canonical. Existing homepage actions remain part of the publication.

The Flight Sun Tracker case study now has usage instructions, a real interface screenshot, an explicit JFK–LHR API example checked on October 24, source links and limitations. Source inspection found SunCalc and five-minute sampling, so unverified custom-ephemeris, zero-dependency, offline and precision/performance claims were removed. A long raw repository-link label was also shortened to fix mobile overflow. The public GitHub profile README links to the portfolio; Peerlist's fetched response could not establish its outbound link.

Additional GSC baseline inspections:

| URL | Result |
|---|---|
| `/blog/day-1255/` | Submitted and indexed |
| `/blog/day-1052/` | Submitted and indexed |
| `/projects/productivity-caller/` | Submitted and indexed |
| `/blog/` | URL unknown to Google |
| `/blog/timeline/` | URL unknown to Google |
| `/projects/wordle/` | Discovered, currently not indexed |

These are sampled indexing states, not a full coverage audit. The build's crawl/canonical/link/sitemap checks pass, and the pages have existing internal links. Pending discovery/selection needs monitoring after publication; a push cannot guarantee Google indexing. No generic Indexing API submissions were made. Full backlink/GA4/CrUX coverage remains outside this implementation.
