# Portfolio search plan, revised

Prepared September 15, 2026. Supersedes ticket 102's recommendations. This is a research and implementation brief, not a deployment record.

## Hiring position

Use Software Developer as the website's established title. Describe the hiring focus as software engineering with Python and data systems. This preserves BUILD.md while matching the proposed LinkedIn positioning. Data Engineer and Backend Engineer are secondary targets supported by the apprenticeship. Kotlin and React projects provide additional evidence; they do not require separate role landing pages.

This is an editorial recommendation based on the supplied experience, not a claim about current job demand. Before expanding, collect ten real job descriptions Shivam would accept and count repeated skills and responsibilities. Location is Bengaluru in the supplied LinkedIn export. Remote India is a preference to retain if still accurate; do not invent overseas work authorization.

Success means a relevant employer can find the correct person, inspect his contribution, and contact him. Generic portfolio traffic alone is not success.

## Evidence and corrections

| Observation | Evidence class | Implication |
|---|---|---|
| Homepage returns HTTP 200 with name/title and apex canonical | Live HTTP check this session | Existing discovery foundation works at HTTP level |
| www request also reaches a 200 page with the apex canonical | Live HTTP check | Host identity agrees; redirect chain was not recorded |
| Sitemap returns 200 and lists only `/` | Live HTTP check and `public/sitemap.xml` | No dedicated owner proof pages in sitemap |
| `/resume/` returns 404 | Live HTTP check | HTML resume is proposed; existing download is `/resume.pdf` |
| Person, ProfilePage, WebSite, visible experience, and projects exist | `src/pages/index.astro`; title/canonical independently checked live | Extend existing work rather than repeat ticket 84 |
| Layout points every Markdown alternate to `/index.html.md` and uses OG type `profile` | `src/layouts/Base.astro` | Make these page-specific when adding article/project routes |
| Clarity, Metrika, and Cloudflare analytics scripts exist | Layout source | Inventory current tools before adding tracking; script presence does not prove events work |
| Placeholder `+significant%`, typo `Intialized`, and missing sentence space remain | Homepage source | Fix credibility problems in copy first |
| Homepage says “Building software across 2,002 days of code” | Homepage source and user's day 1221 statement | Clarify this is a challenge in progress |
| Search results for software engineer portfolio include guides, templates, galleries, and personal sites | Sample web search | Mixed intent; not an exclusively hiring query |
| Current LinkedIn direct fetch unavailable; earlier browser encountered sign-in | Access limitation | Use supplied export, not an invented live audit |
| Search Console, Bing account data, current field performance, and job demand absent | Unknown | No numerical ranking, traffic, speed, or hiring uplift claims |

The previous report incorrectly treated unrelated Shivam Mahajan profiles as evidence that this user's education and handles conflict. Chitkara University, Morgan Stanley, smresponsibilities, and mahajanshivam agree between the supplied export and portfolio source. The older search result under the same domain warrants a URL Inspection check, but does not establish that its author is this user or that the current site is compromised. Do not merge another person's identity or request removal without establishing ownership.

The previous report also called the current site fast and accessible without a fresh measurement. Prior ticket results are historical, not current proof. A failed web-tool fetch did not prove the website was unavailable: independent HTTP requests succeeded.

## Query-to-page map

Confidence describes intent fit, not likelihood of ranking. No search volume or difficulty data was available.

| Query family | Reader intent | URL | Priority / confidence | Evidence required |
|---|---|---|---|---|
| Shivam Mahajan software developer; smresponsibilities | Identify candidate | `/`, existing | P0 / high | Name, handle, exact profile links, role, current availability |
| Shivam Mahajan resume; Morgan Stanley Shivam Mahajan | Evaluate experience | `/resume/`, proposed | P0 / high | Exact apprenticeship title/dates, education, relevant skills, contact |
| Productivity Caller Kotlin reminder app | Inspect a product | `/projects/productivity-caller/`, proposed | P1 / medium | Demo, ownership, limitations, test evidence |
| SM'S DEX; interactive Astro portfolio; GitHub issue roster workflow | Inspect this implementation | `/projects/sm-dex/`, proposed | P1 / medium | Repository code, workflow, accessibility behavior, screenshots |
| Chaincode HackIndia Shivam Mahajan | Verify project and award | `/projects/chaincode/`, proposed | P2 / medium | Team role, repository, award evidence |
| QuizDeck WebSocket load testing | Inspect engineering approach | `/projects/quizdeck/`, conditional | P2 / medium | Load script, environment, sample definition, archived status |
| Kafka PySpark Snowflake pipeline reconciliation | Solve a technical problem | Future article, not yet approved | P2 / low | Original reproducible example, actual query demand |
| Python developer Bengaluru; backend engineer India | Source candidates | Resume + LinkedIn skill/location fields | P1 / medium | True location and relevant experience; no city doorway pages |
| Software engineer portfolio | Learn/build/browse portfolios, mixed intent | Natural wording on existing page | P3 / low hiring specificity | No dedicated generic article needed |

Start with homepage, HTML resume, Productivity Caller, and SM'S DEX. These are four useful pages, not a permanent page-count rule. Keep Morgan Stanley on the resume until a separate case study adds public evidence beyond the same bullets. A public repository or demo makes project documentation cheaper to substantiate than private employer architecture.

## Page briefs and draft metadata

All routes except `/` below are proposals. Metadata is written for readers. Character lengths are editorial budgets rather than Google rules. Search engines can rewrite snippets.

### Homepage

Title: `Shivam Mahajan | Software Developer`

Description: `Explore Shivam Mahajan's software work: Python data pipelines, Kotlin apps, and an interactive portfolio. View his projects, experience, resume, and contact details.`

H1: `Shivam Mahajan, Software Developer`

Opening: “Shivam builds software with Python and data tools including Kafka, PySpark, and Snowflake. He completed a technology apprenticeship at Morgan Stanley and is looking for software engineering opportunities.”

Add a short visible summary before the device with Resume, Projects, and Contact links. Retain SM'S DEX, its motion, audio defaults, accessible controls, and third-person flavor text. State “Working toward 2002 Days of Code” so the target cannot be mistaken for completed days.

H2s: Selected projects; Experience; 2002 Days of Code; Contact. Link project cards to internal case studies and keep direct repository/demo actions available. Reuse the existing stable Person identifier `/#shivam-mahajan`; don't create a second identity.

### HTML resume

Title: `Shivam Mahajan Resume | Python and Data Systems`

Description: `Read Shivam Mahajan's experience at Morgan Stanley, technical skills, education, and selected software projects. Download his resume or get in touch directly.`

H1: `Shivam Mahajan's resume`

Opening: “Shivam Mahajan is a software developer based in Bengaluru. His work includes Python data pipelines, Snowflake deployments, Java APIs, and Kotlin applications.”

H2s: Experience; Projects; Skills; Education; Contact. Use ordinary readable HTML, actual month ranges, and the original job title. Provide print styles and `/resume.pdf`. Link back to the portfolio and to the two strongest project pages. Use WebPage with about referencing the existing Person; no special resume schema is necessary.

### Productivity Caller

Title: `Productivity Caller | Kotlin Reminder App`

Description: `See how Shivam Mahajan built Productivity Caller with Kotlin and Jetpack Compose, using phone calls for reminders. Explore the demo, design, and testing approach.`

H1: `Productivity Caller`

Opening: “Productivity Caller is a Kotlin and Jetpack Compose app that uses phone calls for reminders. This page explains the input parser, reminder flow, and the tests behind it.”

H2s: What the app does; My contribution; Parsing reminders; Calls and platform constraints; Testing; Demo and limitations. Show the real interaction before discussing implementation. Clarify how calling actually works from the source; do not infer Android permissions or capabilities from marketing copy. Keep `425+ test suites` out of new copy until test cases versus suites is resolved. Link resume and SM'S DEX. Use WebPage/CreativeWork; add SoftwareApplication only if the published details justify its properties. No invented ratings or prices.

### SM'S DEX

Title: `SM'S DEX | Interactive Portfolio by Shivam Mahajan`

Description: `Explore SM'S DEX, Shivam Mahajan's interactive portfolio built with Astro. Read about device controls, accessible content, and the GitHub workflow for its public roster.`

H1: `Building SM'S DEX`

Opening: “SM'S DEX puts my portfolio inside interactive devices inspired by nine game generations. Visitors can join a reviewed roster through a GitHub submission.”

H2s: Why this interface; Device controls; Making content readable; Reviewing roster submissions; Tradeoffs. Cite actual paths/commits and demonstrate keyboard and reduced-motion behavior. Match the current issue-to-pull-request workflow, not stale BUILD examples. Link working homepage, repository, resume, and Productivity Caller. Article is appropriate if this is an authored engineering writeup; its author should reference the existing Person.

First-person article prose is acceptable; the third-person rule applies to game flavor text. Do not put Pokédex in the site title or H1, per BUILD.md.

### Later briefs

Chaincode: title `Chaincode | HackIndia Project by Shivam Mahajan`; opening explains code-originality checks and NFT submissions, followed by personal contribution and team credit. Use “checks originality” instead of an unverified accuracy rate. Link the actual repository and award record when available.

QuizDeck: title `QuizDeck | WebSocket Quiz Project`; opening explains live quizzes and archived status. Publish a performance section only with methodology: simulated connections or people, workload, test duration, machine/network setup, sample count, failures, and latency definition. Do not turn a 31 ms average into p95 or a 500-connection test into 500 real customers.

## Evidence ledger

| Claim | Current support | Treatment |
|---|---|---|
| Day 1221 | Explicit user statement | Use for this draft; no automatic progression without confirmation of continued streak |
| Apprenticeship August 2025 to August 2026 | Profile export and portfolio | Keep exact role and dates; former in headline |
| 5M+ events, four workflows, 20+ jobs, 135 grants, seven schemas, 3.9x throughput | User-supplied Experience | Attribute as reported work; retain meaning, seek measurement notes for detailed article |
| 1M users in load test | Profile export | Simulated/load-test scale, not production adoption |
| Thrashing at 140 workers | Profile export | Preserve “thrashing”; do not silently replace with a diagnosed cause such as contention |
| 1,950+ LeetCode vs 2,600+ algorithmic problems | Export vs portfolio | Different scopes; not automatically contradictory; omit combined count from new headline |
| 425+ suites | Portfolio | Clarify suite/case distinction before a new prominent claim |
| 95% originality, 75% entry reduction, 31 ms | Portfolio assertions | Require denominator, baseline, method; use descriptive copy meanwhile |
| 9.35 education grade | Export | Preserve 9.35; do not invent /10 or percent |

## Technical implementation checklist

- Reuse Astro and Base layout. Scope new prose styling so device CSS and scripts do not burden resume/article routes.
- Parameterize OG type and Markdown alternate. Omit an alternate when no equivalent exists; never point every case study's alternate to the homepage text.
- Generate sitemap from actual published indexable routes; exclude previews, drafts, duplicate device pages, and assets. Confirm links return useful content and the correct status.
- Add absolute self-canonicals, unique descriptions, relevant sharing images, image dimensions, descriptive links, and ordinary HTML headings. No hidden recruiter keyword blocks.
- Inspect public prototype pages for indexability before deciding their noindex/canonical treatment. robots.txt blocks alone do not remove an indexed URL.
- Retain stable URLs and existing PDF until search/link evidence justifies migration. No speculative takedown of an older PDF associated with another person.
- Test status codes, source HTML, internal links, structured data, mobile reading, keyboard interaction, and actual JS-disabled readability. Run existing checks where relevant; Lighthouse cannot measure field INP by itself.
- Set field goals at the 75th percentile: LCP at most 2.5 s, INP at most 200 ms, CLS at most 0.1. If traffic is insufficient, report field data as unavailable and use lab diagnostics without claiming a field pass.

Google says its AI search features use established search foundations and do not use llms.txt for ranking. Existing Markdown files may be useful to other readers, but have no demonstrated Google uplift. Schema must represent visible content; no special AI schema is required. [Google AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

Keep useful answers clear and evidence nearby. This is a readability choice, not a proven citation formula. No requirement for every H2 to repeat an exact keyword, rigid keyword density, FAQ rich results, or tiny AI-oriented chunks.

## Articles, links, and videos

Start with one project article every two weeks only if Shivam has evidence and time. Candidate briefs:

| Topic | Reader question | Required original evidence | Distribution |
|---|---|---|---|
| GitHub issue to reviewed roster entry | How does the public submission reach the site? | Actual workflow and validation failures | Repository README, portfolio post |
| Testing a reminder parser | What can go wrong with natural-language task entry? | Real test cases and ambiguity handling | Project demo, Kotlin community where relevant |
| Load testing QuizDeck | What does 500 concurrent mean here? | Reproducible test and limitations | Repository and one technical LinkedIn post |
| Reconciling pipeline row counts | How do you spot missing data? | Synthetic public demo, not private work artifacts | Data engineering post after reader demand appears |

For each article, create one short demo or diagram only where it explains behavior. Host the written explanation on the portfolio, add a captioned video if available, and use a short LinkedIn post to point to the full evidence. Avoid embedding an autoplay player in the initial page load.

Earn links from the GitHub profile and project READMEs, verified hackathon/team pages, and real alumni or collaborator relationships. Link to the relevant case study, not the homepage everywhere. Ticket 101 remains the reference for repository onboarding. Improve README setup before asking people to try a project. No external messages or submissions have been sent under this brief.

## 30/60/90-day backlog

Estimates assume existing Astro setup and evidence on hand. Waiting for documents or analytics access is separate. Items are implementation work packages, not newly claimed tickets.

| ID | Window / owner | Work | Dependencies | Effort | Acceptance |
|---|---|---|---|---|---|
| R1 | Days 1 to 3 / Shivam + agent | Confirm role focus; record claim sources and analytics dates | None | 2 to 3 h | Ten relevant job descriptions or explicitly provisional targeting; facts scoped correctly |
| R2 | Days 1 to 7 / Shivam + agent | Baseline Search Console/Bing and existing events | Account access for private data | 2 to 3 h | Query/page export and indexing report, or documented unavailable fields; no invented zero baseline |
| R3 | Days 4 to 10 / agent | Homepage copy and HTML resume | R1 | 4 to 6 h | Clear in-progress challenge, direct resume/contact, accurate history, working HTML route and PDF link |
| R4 | Days 7 to 14 / agent | Reusable content layout, sitemap, per-page metadata | R3 | 3 to 5 h | Correct routes, canonicals, alternates, metadata and internal links in rendered output |
| R5 | Days 15 to 30 / Shivam + agent | Productivity Caller and SM'S DEX pages | R1, R4, source artifacts | 8 to 12 h | Ownership, demo/code evidence, limitations, two useful links each; editorial and accessibility review |
| R6 | Days 15 to 30 / Shivam + agent | Index inspection and event verification | R2 to R5 | 2 to 3 h | Submission/inspection result recorded; events tested once; no guarantee of indexing |
| R7 | Days 31 to 60 / Shivam | Publish two related posts and link project READMEs | Published R5 pages, separate publication authorization | 2 to 4 h | Relevant referral path per page, campaign tags, accurate captions |
| R8 | Days 31 to 60 / Shivam + agent | One additional case study or technical article | Evidence and reader/query demand | 4 to 6 h | Adds new useful evidence; no duplicated intent |
| R9 | Days 61 to 90 / agent | Review two comparable 28-day periods | R2, sufficient elapsed data | 2 h | Prioritized edits tied to actual queries and actions; record small-sample uncertainty |

Prioritize R1, R3, R4, and the first R5 page if only ten to fifteen hours are available. Lack of Search Console access does not prevent drafting or route implementation.

## Measurement and decision rules

Store weekly rows with date range, source, query group, landing page, country/device, impressions, clicks, CTR, average position, resume/evidence/contact clicks, and qualified recruiter conversations. Keep unknown values blank. Clicks are intent signals, not proof that the visitor is a recruiter or an interview occurred.

Reuse existing analytics if they support the required events. Suggested names: resume_html_view, resume_pdf_click, project_evidence_click, email_click. Record LinkedIn links using non-personal campaign values such as utm_source=linkedin and utm_campaign=portfolio_case_study. Never include recruiter names or email addresses in URLs. Referrer loss means attribution will remain partial; ask how a recruiter found the profile when it comes up naturally.

Day 30 targets are controllable: four useful pages, accurate facts, no broken internal links, indexing checks recorded, events working. Day 60: relevant discovery paths and first query observations. Day 90: compare matched periods, report absolute counts, choose the next useful revision. Interview volume and ranking are outcomes to observe, not promised targets.

If impressions appear without clicks, inspect query intent and snippet. If visits appear without evidence/contact actions, inspect page clarity. If no impressions appear, inspect indexing and external discovery first. At day 90, decide whether to invest further; do not delete a useful page merely because a tiny site has little data. Preserve pages that help applications and referrals even when organic traffic is low.

## Sources and boundaries

- [Google Search Essentials](https://developers.google.com/search/docs/essentials): crawlable links, descriptive wording, useful content.
- [Google AI guidance](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide): no special files or formatting required for AI search.
- [ProfilePage documentation](https://developers.google.com/search/docs/appearance/structured-data/profile-page): valid entity markup, not a ranking promise.
- [Search Console guide](https://developers.google.com/search/docs/monitor-debug/search-console-start): indexing and performance inspection.
- [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/bing-webmaster-guidelines-30fba23a): discovery and content guidance.
- [Intuit's portfolio guide](https://www.intuit.com/blog/global-stories/software-engineer-portfolio/): observed example of informational intent in broad portfolio search results, not a ranking authority.

Unslop informed the copy edits: concrete descriptions, fewer stock claims, accurate numbers, and varied sentence lengths. No installed AI humaniser skill or tool was found in the available skill roots and plugin cache. No profile or website changes were published.
