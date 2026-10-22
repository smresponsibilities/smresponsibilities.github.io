# Employer search growth plan

Superseded by [the revised portfolio plan](portfolio-search-plan-v2.md), ticket 104. The revision corrects identity attribution, unsupported performance statements, AI search assumptions, and execution priorities.

Prepared 2026-09-15 for `shivammahajan.com`.

## Decision

The portfolio should not try to rank for every employer or for broad terms such as "software
engineer portfolio." Those searches are global, ambiguous, and dominated by large sites. The
practical goal is narrower: when an employer searches for Shivam by name, handle, role,
technology, or a problem he has demonstrably solved, the correct Shivam and strong evidence of
his work should be easy to find.

The growth model is:

1. Make the identity unambiguous.
2. Publish a small set of proof pages based on real work.
3. Connect those pages to trusted profiles and communities.
4. Measure actual queries and employer actions.
5. Expand only where impressions or conversations show demand.

This rejects the screenshot's promise of 20 automated articles and 10 backlink submissions per
month. Google's current guidance warns against producing many automated pages or separate pages
for every query variation. It favors original, first-hand, non-commodity content instead:
[people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)
and [AI search guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## What the screenshots become

| Product concept | Portfolio version |
|---|---|
| Find topics automatically | Find real queries in Search Console, recruiter questions, job descriptions, and repository issues. |
| Write and publish automatically | Publish one evidence-rich case study only when the author owns the experience and can show artifacts. |
| Attract search traffic | Distribute the same proof through GitHub, LinkedIn, alumni pages, talks, and relevant open-source work. |
| Refine automatically | Run a 28-day query, page, and conversion review. Improve the page that earned impressions; do not create ten more guesses. |
| SEO web pages | Stable identity, resume, experience, and project pages. |
| SEO articles | Occasional technical case studies answering a real problem from first-hand work. |
| Backlinks | Editorial links earned from projects, institutions, communities, and collaborators. No directory submission quota. |
| Videos | One useful walkthrough or technical demo with an HTML transcript and links to the related proof page. |

## Current baseline

The technical foundation is stronger than the screenshots imply. The homepage already has a
canonical URL, descriptive metadata, `WebSite`, `ProfilePage`, and `Person` structured data,
server-rendered copy, a sitemap, `robots.txt`, `llms.txt`, and a Markdown alternate. The site is
also fast, accessible, and visually distinctive.

The present growth constraints are content architecture and identity consistency:

- `sitemap.xml` contains only the homepage.
- The homepage is the only HTML page intended to explain the owner, experience, and three
  projects. Each topic therefore competes for one title, one description, and one search intent.
- A sample web search for `site:shivammahajan.com Shivam Mahajan software developer` surfaced an
  older resume PDF. The current homepage did not appear in the returned result set.
- "Shivam Mahajan" is a crowded name. Search results contain many unrelated developers,
  researchers, and executives. The site needs stronger entity disambiguation than a unique name
  would require.
- Public sources appear to disagree about identifiers, education, employers, and GitHub handles.
  Some results associate the domain with `mahajan-codes`, while the current portfolio uses
  `smresponsibilities`. The indexed resume mentions Beloit College, while current homepage
  structured data names Chitkara University. These may reflect old information, multiple people,
  or both. Shivam must verify the canonical facts before any search work ships.
- Current copy has trust-reducing errors, including "Intialized," missing spacing in a project
  sentence, and an unsupported "+significant%" claim. Search work should not amplify those pages
  before factual and editorial review.

Search Console must become the source of truth for Google impressions, clicks, queries, pages,
countries, and devices. Google explicitly recommends its Performance report for this purpose:
[Search Console guide](https://developers.google.com/search/docs/monitor-debug/search-console-start)
and [Search Console plus analytics](https://developers.google.com/search/docs/monitor-debug/google-analytics-search-console).

## Search intent map

### Tier 1: identity searches

These are highest intent and should win first.

- `Shivam Mahajan software developer`
- `Shivam Mahajan software engineer`
- `Shivam Mahajan Morgan Stanley`
- `Shivam Mahajan Python developer`
- `smresponsibilities`
- `smresponsibilities portfolio`

Success means the portfolio, correct LinkedIn profile, correct GitHub profile, and current resume
form a consistent result set. The site should not try to erase unrelated people. It should give
search engines enough stable identifiers to separate them.

### Tier 2: employer evaluation searches

These combine a name with evidence an employer may verify after seeing an application.

- `Shivam Mahajan projects`
- `Shivam Mahajan resume`
- `Shivam Mahajan GitHub`
- `Shivam Mahajan Kafka PySpark Snowflake`
- `Shivam Mahajan Kotlin`
- `Shivam Mahajan 2002 days of code`

Success means a dedicated page answers each intent directly, without requiring a recruiter to
learn the Pokédex interface.

### Tier 3: non-branded expertise searches

These can create discovery, but only where Shivam has first-hand evidence.

- `Kafka PySpark Snowflake data pipeline case study`
- `zero row count reconciliation data pipeline`
- `mTLS RBAC Kafka pipeline`
- `Kotlin phone call reminder app`
- `WebSocket quiz 500 concurrent users`
- `accessible interactive developer portfolio Astro`
- `SVG Pokédex device portfolio`

These are hypotheses, not approved keywords. Search Console impressions, recruiter language, and
SERP review must validate them before page creation. Confidential employer work requires written
sanitization: no client names, internal architecture, credentials, proprietary screenshots, or
non-public performance data.

### Tier 4: broad terms to observe, not chase

- `software engineer portfolio`
- `software developer portfolio`
- `web developer portfolio`
- `best developer portfolio`

These can appear naturally in the homepage and relevant links. They should not drive generic
articles or doorway pages. Ranking for them is not a useful launch acceptance criterion.

## Required page architecture

Launch no more than six indexable owner pages. Each page gets one primary intent, unique title,
description, H1, canonical URL, answer-first opening, and at least two useful internal links.

| Priority | URL | Primary intent | Required proof |
|---|---|---|---|
| P0 | `/` | Shivam Mahajan software developer | Current role statement, location or work eligibility if approved, core technologies, availability, and links to every proof page. |
| P0 | `/resume/` | Shivam Mahajan resume | Accessible HTML resume, dated experience, education, skills, achievements, contact links, and downloadable PDF. |
| P1 | `/experience/morgan-stanley/` | Shivam Mahajan Morgan Stanley | Sanitized scope, personal contribution, architecture summary, measurable result, constraints, verification note, and confidentiality boundary. |
| P1 | `/projects/productivity-caller/` | Kotlin phone call reminder app | Problem, demo, architecture, NLP pattern method, testing evidence, measured outcome, limitations, and source status. |
| P1 | `/projects/chaincode/` | Solidity code originality project | Repository, personal contribution, judging result, system diagram, measurement method for accuracy, and limitations. |
| P2 | `/projects/quizdeck/` | WebSocket quiz 500 concurrent users | Repository, load-test method, response-time distribution, environment, archived status, and lessons. |

Do not create separate pages for near-synonyms such as `/software-engineer-portfolio/`,
`/software-developer-portfolio/`, and `/web-developer-portfolio/`. One strong owner page can use
those phrases naturally. Several thin variants look like search manipulation and split authority.

The PDF remains a download, not the primary resume experience. Before changing its URL or index
status, inspect Search Console links and queries, then choose a migration that preserves useful
traffic. Do not block the current PDF in `robots.txt`; blocking crawling does not reliably remove
an already indexed URL.

## Identity disambiguation gate

Nothing else ships until Shivam signs off one canonical identity sheet containing:

- full public name;
- preferred role label;
- current availability;
- city, country, remote preference, and work authorization, if he wants these public;
- correct GitHub handle and any retired handles;
- correct LinkedIn URL;
- education history;
- employer names, titles, and exact month ranges;
- preferred email;
- authoritative profile image URL;
- project ownership and collaborators;
- which quantitative claims are public and reproducible.

Apply that sheet to the homepage, HTML resume, PDF, GitHub profile, LinkedIn profile, repository
bios, JSON-LD, Markdown mirror, `llms.txt`, and social descriptions. Use one `Person` `@id` across
all site pages. Add only verified `sameAs` URLs. Include `alternateName: smresponsibilities` and a
stable identifier. Google's `ProfilePage` documentation recommends a real name, alternate public
identifier, description, image, and external profile links:
[ProfilePage structured data](https://developers.google.com/search/docs/appearance/structured-data/profile-page).

## Page content standard

Every proof page must answer five employer questions above the fold or within the first two
sections:

1. What did Shivam build?
2. What part did he personally own?
3. What changed because of the work?
4. How was the result measured or verified?
5. Where can the employer inspect evidence?

Use a short answer-first opening, then a consistent case-study body:

- problem and constraints;
- Shivam's responsibility;
- design and tradeoffs;
- implementation details;
- measurable results with method and date;
- evidence such as repository, test command, demo, diagram, or public artifact;
- limitations, archived status, and what he would change;
- technologies used in visible text, not only icons or tooltips;
- contact or resume action.

Claims must survive scrutiny. "31 ms average" needs test conditions and preferably p50/p95.
"95%+ accuracy" needs a dataset, sample size, and method. "75% less manual entry" needs a before
and after definition. If evidence is unavailable, rewrite the claim as scope rather than impact.

Each page should include one self-contained paragraph that an AI answer engine can quote without
surrounding context. Use concrete numbers and named technologies. Add an honest limitation block.
Update `llms.txt` and the Markdown index whenever a page ships.

## Technical work

### P0 index and entity work

- Verify domain properties in Google Search Console and Bing Webmaster Tools.
- Submit the sitemap and inspect `/`, `/resume/`, and each proof URL after release.
- Generate the sitemap from routes instead of maintaining one hard-coded homepage entry.
- Keep canonical host, sitemap URLs, JSON-LD IDs, Open Graph URLs, and `llms.txt` on
  `https://shivammahajan.com`.
- Add HTML resume and project routes to primary navigation and contextual internal links.
- Validate rendered HTML, Rich Results, canonical selection, mobile layout, status codes, and
  Core Web Vitals.
- Keep meaningful content server-rendered. Google can index HTML and PDF, but canvas-only content
  is not sufficient: [developer search guide](https://developers.google.com/search/docs/fundamentals/get-started-developers).

### Structured data

- Keep homepage `ProfilePage` plus `Person` after factual audit.
- Give the `Person` one stable `@id`; reference it as author or creator from proof pages.
- Use `Article` only for genuine technical writeups. Use `SoftwareSourceCode` or
  `CreativeWork` only where visible page content supports every property.
- Do not add `FAQPage` solely for a rich result. Visible employer questions can use normal H2s.
- Add `datePublished` and update `dateModified` only after material human edits.
- Run Google's Rich Results Test and Schema Markup Validator before release.

### Snippet and page quality

- Keep title tags under 60 characters where possible. Put the name or specific project first.
- Write descriptions after page content. State role, proof, and action in 140 to 160 characters.
- Use one H1 and descriptive H2s.
- Give images explicit dimensions and descriptive alt text; use empty alt for decoration.
- Fix editorial errors and unsupported claims before requesting reindexing.
- Preserve current performance and accessibility budgets: LCP below 2.5 seconds, INP below
  200 milliseconds, CLS below 0.1, no horizontal overflow, and reduced motion honored.

## Distribution and backlinks

Backlinks are a byproduct of verifiable work and relationships, not a monthly submission count.
Prioritize these sources:

1. Correct GitHub profile website and bio links. Each flagship repository links to its matching
   case study, and each case study links back to the repository.
2. Correct LinkedIn contact info and Featured links. Publish a short native post for each case
   study, using the result and lesson rather than keyword-stuffed copy.
3. Education, hackathon, conference, or alumni pages that already document a real achievement.
   Request a correction or portfolio link only where Shivam has a legitimate relationship.
4. Upstream open-source contributions. A useful issue, documentation fix, or merged change can
   lead people to the profile without manufactured promotion.
5. Collaborator and project pages. Credit every contributor, then request reciprocal links only
   when they help readers understand the work.
6. One technical demo video per major project. Publish a transcript or summary on the matching
   page so search engines can understand it.

Reject paid links, bulk directories, automated guest posts, private blog networks, irrelevant
"portfolio lists," and exact-match anchor campaigns. Bing also supports IndexNow for timely URL
updates, but on a small static portfolio a submitted sitemap and manual inspection are enough at
launch: [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a).

## Twelve-week execution plan

### Week 0: measurement and facts

Owner: Shivam for factual approval; implementation agent for audit.

- Export 16 months of Search Console data by query, page, country, and device.
- Record Bing index coverage and queries.
- Capture current branded SERPs in a neutral browser for the Tier 1 and Tier 2 queries.
- Build and approve the canonical identity sheet.
- Inventory every current claim and label it verified, needs evidence, confidential, or remove.
- Define analytics events: resume view, PDF download, email click, LinkedIn click, GitHub click,
  project evidence click, and submission form open.

Exit gate: identity facts approved; baseline stored; no contradictory public facts remain
unexplained.

### Weeks 1 and 2: identity and resume

Owner: implementation agent; Shivam approves copy.

- Correct homepage copy, dates, spelling, unsupported metrics, and structured data.
- Build `/resume/` as the accessible canonical resume page.
- Update sitemap generation, navigation, Markdown mirror, and `llms.txt`.
- Align GitHub, LinkedIn, PDF, and website identifiers.
- Validate build, rendered metadata, rich results, accessibility, performance, and analytics.
- Submit new and changed URLs in Search Console and Bing.

Exit gate: homepage and HTML resume indexed or successfully requested; all identity surfaces agree.

### Weeks 3 through 5: first proof pages

Owner: Shivam supplies evidence; implementation agent edits and builds.

- Publish Productivity Caller first because it has a demo and large test claim.
- Publish Chaincode second if repository history supports ownership and metrics.
- Publish Morgan Stanley experience only after confidentiality review and metric approval.
- Add diagrams or screenshots only when they prove architecture or behavior.
- Link each page from the homepage, HTML resume, relevant repository, and LinkedIn Featured area.

Exit gate per page: one real query target, one verified primary source artifact, one measurement
method, one limitation, complete metadata, no orphan URL.

### Weeks 6 through 8: distribution

Owner: Shivam.

- Publish one LinkedIn post per proof page, spaced by at least one week.
- Improve one flagship repository's README and contributor path before promoting it, following
  ticket 101's findings.
- Ask only legitimate institutions or collaborators to correct or add relevant links.
- Reuse the existing portfolio walkthrough as a video asset with a concise HTML transcript.
- Continue useful participation in one upstream community. Do not cold-drop portfolio links.

Exit gate: every proof page has at least one contextual external discovery path and tagged referral
measurement.

### Weeks 9 through 12: refine

Owner: implementation agent reports; Shivam decides.

- Compare 28-day query and landing-page data with baseline.
- Improve titles and openings on pages earning impressions but weak click-through.
- Improve evidence and calls to action on pages earning visits but no employer actions.
- Create QuizDeck's page only if its load-test evidence is reproducible and archived status is
  explicit.
- Approve one new technical article only if a real query or repeated recruiter question supports
  it.

Exit gate: continue, revise, or stop each page based on data, not publishing cadence.

## Scorecard

Record baselines before setting numeric growth targets. Use this scorecard every 28 days:

| Measure | 30-day target | 90-day target |
|---|---:|---:|
| Approved core URLs indexed | 100% | 100% |
| Tier 1 branded queries with correct portfolio in top results | Baseline plus improvement | Portfolio consistently visible for approved identity variants |
| Pages earning non-branded impressions | Establish baseline | At least two proof pages earning relevant impressions |
| Search visits reaching resume or evidence | Establish baseline | Improve rate versus first full month |
| Employer-intent actions from organic search | Track correctly | At least one qualified action; optimize for quality, not volume |
| Factual or schema conflicts | 0 | 0 |
| Unsupported quantitative claims | 0 | 0 |
| Contextual referring domains | Establish baseline | Two relevant earned links, no paid or bulk submissions |
| Core Web Vitals and accessibility regressions | 0 | 0 |

Do not promise a ranking position. Google's own starter guide says there is no method that
automatically ranks a site first:
[SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide).
The controllable outcome is a consistent entity, indexable proof, accurate snippets, trusted
links, and a measured improvement loop.

## Stop rules

- Stop publishing when no first-hand evidence supports the page.
- Stop a keyword branch after two meaningful revisions and 90 days with no relevant impressions.
- Merge or remove pages whose intent overlaps.
- Never change an indexed slug without a redirect plan.
- Never expose confidential employer information for search visibility.
- Never trade page speed, accessibility, or honest project status for decorative content.
- Never count raw traffic as success. Employer actions and qualified conversations matter.

## Immediate next ticket

Create a factual identity and Search Console baseline ticket. It should be read-only until Shivam
approves the canonical identity sheet. Only then should implementation begin with homepage cleanup,
HTML resume, and generated sitemap support.
