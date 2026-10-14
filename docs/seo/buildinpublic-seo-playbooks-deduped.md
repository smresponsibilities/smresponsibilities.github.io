# Deep Dive: @buildinpublic (Edward Sturm) YouTube Channel — Deduplicated Master Edition

**Target Channel:** [https://www.youtube.com/@buildinpublic](https://www.youtube.com/@buildinpublic)
**Total Videos Cataloged:** 1327
**Channel Focus:** Advanced SEO, Google Algorithm Mechanics, AEO/AI Search, Organic Growth Hacking, and Video-First Building in Public.
**Companion Datasets:**
- `buildinpublic-catalog.json` (all 1,327 cataloged videos in structured JSON)
- `buildinpublic-youtube-seo-deep-dive.md` (original unpruned monolithic reference)

## 1. Executive Summary & Channel Architecture

**Creator Profile:**
Edward Sturm is an SEO strategist, growth marketer, and founder who launched `@buildinpublic` to document real-time organic growth, tactical experiments, and search engine mechanics. He is also the creator of *The Edward Show* (a daily digital marketing podcast with over 1,000 continuous episodes) and developer of conversion-first SEO frameworks including *Compact Keywords* and *The SEO Colonies Strategy*.

**Content Evolution:**
1. **Phase 1: Raw Founder Logs & Short Experiments (2022–2023):** 1- to 3-minute rapid-fire daily updates exploring viral TikTok tactics, early AI writing tools, indie hacker app launches, and personal growth experiments.
2. **Phase 2: Tactical SEO Expansion (2023–2025):** Deeper coverage of Google's shifting algorithmic landscape (Helpful Content Updates, AI content penalties, core leaks) and actionable tactical workflows.
3. **Phase 3: High-Authority Deep Dives & Masterclasses (2025–2026):** Extensive 45-minute to 2-hour long interviews with renowned practitioners (Charles Floate, Barry Schwartz, Darren Shaw, Ross Hudgens, James Dooley, Ann Smarty), unpacking high-level black hat, gray hat, and enterprise white hat strategies, parasite SEO, API leaks, and AEO.

**Core Methodological Frameworks Taught:**
- **Compact Keywords:** Rejecting vanity top-of-funnel traffic (3,000-word generic blog posts) in favor of bottom-of-funnel, hyper-specific queries that yield immediate conversions and face minimal ranking competition.
- **The SEO Colonies Strategy:** Building topical clusters by first capturing ultra-low-difficulty search terms (the "colonies") and systematically channeling accumulated internal link authority to fuel core revenue-generating "money pages."
- **Content Effort Scoring:** Analyzing Google's internal heuristics that reward original reporting, primary data, multimedia proof, and human oversight while discounting low-effort programmatic/AI synthesis.
- **Parasite & Entity SEO:** Piggybacking on top-tier domain authority (Reddit, Claude Artifacts, Quora, LinkedIn, Google-owned properties) to index and rank on page one within hours.

---

## 2. The Complete Step-by-Step SEO Playbooks (18 Master Blueprints)

---

### Playbook 1: The "SEO Colonies" Strategy (Topical Authority & Internal Linking)
*Source: Episode 1,163 & Tactical Masterclass ("The Internal Linking Trick That Uses Topical Authority You Already Have")*

#### The Theory:
Instead of trying to rank competitive "money pages" from scratch with external backlinks, you leverage Google's existing indexed topical relevance across sub-pages ("colonies") and funnel that PageRank to your primary target.

#### Exact Step-by-Step Workflow:
1. **Uncover Your Existing Topical Nodes:** Run `site:yourdomain.com "exact target keyword"` in Google. Google returns all pages it already considers semantically relevant.
2. **Identify Search Intent Fit:** Evaluate #1 result. If it satisfies intent, designate as target page. If no, create dedicated commercial landing page.
3. **Execute Internal Contextual Linking:** From the indexed colony subpages, add natural contextual in-body links pointing to the designated target page.
4. **Anchor Text Balance:** 30% exact match, 50% partial-match contextual phrases, 20% brand/navigational anchors.
5. **The Clickability Rule:** High-visibility in-body links clicked by real visitors pass significantly more PageRank than buried footer or sidebar links.

---

### Playbook 2: Cold Email Outreach Formula (Tested Across 6,337 Cold Emails)
*Source: "6,337 Cold Emails Reveal What Actually Gets Replies (And Backlinks)"*

#### Empirical Testing Data:
* **Email Body Length vs. Response Rate:**
  * Under 100 words: **11.9% reply rate** (sweet spot: 60–90 words).
  * 100–200 words: Drops to **1.9% reply rate** (6x collapse).
  * Over 200 words: Collapses to **0.3% reply rate**.
* **Subject Lines:** Under 30 characters yields **83.7% open rate** (vs 69.5% for >30 chars).
* **Recipient Hierarchy:** Pitching Team Leads / Content Managers gets **3x more positive replies** than pitching CEOs or generic inboxes.
* **Follow-up Cadence:** 0 follow-ups = 4.1% reply rate; 1 follow-up (sent 3–4 days later) = **6.6% reply rate** (+60% lift); 2 follow-ups = **6.9% reply rate** (ceiling). Never send a 3rd follow-up.
* **Days of the Week:** Tuesday and Wednesday outperform Thursday and Friday.
* **High-Converting Outreach Angle:** Never ask for a guest post or link. Audit high-traffic pages for broken 404 links; offer your updated asset as a drop-in replacement.

---

### Playbook 3: Google's "Content Effort" Score Optimization & Antitrust User Telemetry
*Sources: Cyrus Shepard Analysis, May 2024 Google API Leak & 2016 Antitrust Hearing (Episode T2ZMC4utIBQ)*

#### May 2024 Google API Leak Attributes:
* `contentEffort`: LLM-based algorithmic effort estimator for article/landing pages.
* `ugcDiscussionEffortScore`: Quality assessment for forums and user discussions.

#### 2016 Internal Google Antitrust Presentation Leak:
> *"What's crazy is that we don't actually understand documents. Beyond some basic stuff, we hardly look at documents. We look at people. If a document gets a positive reaction, we figure it is good... Serving the user is not enough. We have to design interactions that allow us to learn from users."*

#### The Inverted Pyramid Principle:
* Give the direct answer **in the first two sentences** of the page before background or methodology.
* When users get immediate answers without bouncing ("pogo-sticking"), positive interaction signals reinforce rankings.

#### The 5 Pillars to Score High on Content Effort:
1. **High-Effort Curation vs. Low-Effort Aggregation:** Personally testing each item with proprietary criteria vs scraping marketing copy.
2. **Proprietary Automation vs. Doorway Templates:** Interactive calculators/tools vs 5,000 spun city templates.
3. **Original Facts & Primary Research:** Firsthand data, surveys, or novel experiments that exist nowhere else.
4. **Custom Media as Evidence:** Original annotated screenshots, diagrams, and shop floor photos. (Google Cloud Vision devalues stock photos and AI filler).
5. **The Visual Hook Rule:** Place a visual graphic beside H1 demonstrating the answer within 3 seconds.

#### The 5-Question 2-Minute Content Effort Audit:
1. Is the content curated and organized thoughtfully? (Answer easy to spot within 3 seconds).
2. Did you include first-party evidence? (Original measurements, photography, direct testing).
3. Does the page demonstrate evidence of work? (Tooling, methodology, real-world trials).
4. Does it go beyond common web facts? (Cannot be duplicated by a single generic LLM query).
5. Does it provide rich context and nuanced perspectives? (Edge cases, care, tradeoffs).

---

### Playbook 4: Claude Artifacts Parasite SEO (Page 1 in 5 Hours)
*Source: Jesper Nissen & Edward Sturm Case Study ("Rank #1 on Google in 5 Hours with Claude Artifacts")*

#### Mechanism:
* `claude.ai` carries root Domain Rating 66+. Public artifacts publish under root subfolders (`claude.ai/public/artifacts/[id]`), inheriting root domain PageRank.
* **Workflow:** Extract landing page asset → prompt Claude to generate structured comparison/evaluation artifact → click "Publish" → share URL on high-crawl social seeds (X/LinkedIn) → ranks within hours for low/medium-competition terms.

---

### Playbook 5: Fixing "Crawled - Currently Not Indexed" via 3-Part Title Tag Formula
*Sources: Episode on Search Console Indexing & Episode ahNhcLDa1LQ with Edward Sturm*

#### The Root Cause:
Not a technical crawl block. Googlebot rendered the page, but its indexing classifier determined zero incremental "Information Gain" compared to existing SERP documents. Occurs when `<title>` tag matches existing pages.

#### The 3-Part Title Formula:
```
[Target Keyword] | [Searcher's Goal or Specific Benefit] | [Brand Name]
```
* **Before (Fails Indexation):** `Home Renovation Ideas | Havenry`
* **After (Clears Gate):** `Home Renovation Ideas | Cost-Effective Modern Upgrades | Havenry`
* **Before:** `Software to Reduce Patient No-Shows`
* **After:** `Software to Reduce Patient No-Shows | Automated Reminders That Work | ScheduleHealth`

---

### Playbook 6: De-AI & Humanizing Content System
*Source: "How to Humanize ChatGPT Content" & "Claude Sites Have a Serious SEO Problem"*

1. **Eliminate All Em Dashes (`—`):** Immediate algorithmic signature of Claude/ChatGPT. Use standard hyphens or commas.
2. **Purge Banned AI Vocabulary:** `delve`, `underscores`, `enhance`, `unlock`, `foster`, `groundbreaking`, `elevate`, `empower`, `tapestry`, `realm`, `landscape`, `pivot`.
3. **Strip Eyebrows and Label Headers:** Remove boilerplate tags (`OUR METHODOLOGY`) above H2s.
4. **Vary Sentence Length (Burstiness):** Mix 3-word punchy sentences with longer explanatory sentences.
5. **Verification:** Run drafts through GPTZero or ZeroGPT to ensure no residual AI clusters remain.

---

### Playbook 7: The Rank & Rent System (Local SEO Lead Generation & Call Whispering)
*Sources: Ippei Kanehara Masterclasses ("How Ippei Built 130 Sites and Made $240K", Episode muwrS4Dh_R8)*

#### Mechanism:
1. **Target High-Ticket Trades:** Focus exclusively on $2,000–$50,000 ticket niches (commercial roofing, concrete flatwork, tree removal, foundation repair).
2. **Build Geo-Targeted 5–15 Page Site:** Optimize for primary city + specific services.
3. **Call Whispering via CallRail/Twilio:** Configure 2-second audio whisper: *"This lead was sent to you by [Your Lead Brand]."*
4. **The Free Trial Handshake:** Forward 3–5 qualified calls free. Follow up: offer exclusive territory routing for $500–$2,000/month flat retainer.
5. **$20 Vistaprint Car Magnet Hack:** Slap magnetic logo on vehicle and film tools in trunk to pass Google video verification for service areas.

---

### Playbook 8: Query Augmentation, Semantic Fan-Out & Information Retrieval Cost
*Sources: James Dooley Masterclasses ("How One Page Ranks for Thousands of Keywords", Episode rHRlAMH99Y8)*

#### Query Augmentation Dynamics:
* New/low-authority domains evaluated by exact-match dictionary semantics (keyword must appear in title, H1, intro).
* Established/branded domains trigger BERT/MUM Query Augmentation: Google rewrites queries dynamically based on semantic proximity, allowing one authoritative page to rank for thousands of queries not present in the body text.
* **Cost of Information Retrieval Penalty:** LLMs and neural rankings cost massive compute. Google devalues text bloat and repetitive filler. Pruning 400–500 words of generic fluff routinely boosts rankings.
* **Temporal Semantic Updating (AEO):** Coordinated 4-week burst of press releases, podcasts, and articles overwrites older LLM training weights. Spreading links over 12 months fails to achieve temporal density.

---

### Playbook 9: Preferred Sources User Signal Activation
*Source: "Google Just Gave SEOs a New Ranking Signal - Preferred Sources"*

* Add on-page CTA: *"Follow Us on Google"* / *"Add to Preferred Sources"*.
* Directly links to Google publisher follow profile. When visitors favorite domain, Google boosts site rankings in personalized search feeds and Discover tabs.

---

### Playbook 10: The $5 Press Release Hack for Google AI Overviews
*Source: AEO Manipulation Case Study*

* AI Overviews scrape low-cost wire syndication networks (Digital Journal, Barchart, regional news) with high crawl frequency.
* Distribute short release with exact brand claim statement ($15–$25 wire). Syndication feeds retrieval caches, prompting AI Overviews to cite brand statement within days.

---

### Playbook 11: The "GBP Loop" — Ranking #1 in Google Maps From 53 Miles Away
*Source: Mike Martin (GBPly Founder) Masterclass*

$$\text{Rank Score} = (\text{Profile Completeness} \times \text{Pictures} \times \text{Posts} \times \text{Praise}) \times \text{Consistency}$$

* **Profile Completeness & Entity Mirroring:** 100% attribute completion. Homepage schema and address must match GBP verbatim.
* **Pictures:** Upload 3–5 unedited, geo-tagged real work photos weekly. Never use stock/AI art (Google Cloud Vision detects hashes).
* **Posts:** Treat GBP as social feed (2 updates weekly).
* **Praise:** Steady drip of 1–3 verified reviews weekly. Reply within 24h with localized context.
* **Consistency:** 6+ months continuous execution forces algorithm to widen search radius from 3 miles to 50+ miles.

---

### Playbook 12: The "Clone & Outrank" SaaS Playbook
*Source: Jacky Chou & David Quaid Masterclass*

* Source validated indie SaaS tools ($2k–$20k MRR) on ProductHunt/Acquire.com.
* Replicate core MVP with AI tooling.
* Build bottom-of-funnel comparison landing pages: `[Competitor] Alternatives`, `[Competitor] vs [Your Tool]`.
* Place honest comparison table at top of page positioning your tool as modern alternative.

---

### Playbook 13: The #1 Page Type for AI Search Traffic (Siege Media Study)
*Source: Ross Hudgens (Siege Media Founder) B2B Study of 116 Sites*

* **Versus (Comparison) pages drive >2x the AI search traffic** of guides, glossaries, calculators, or blogs.
* **Structure:** Dedicated landing page `/vs/competitor-name` (not blog post), top-loaded comparison table above fold, neutral framing (acknowledge competitor strengths).

---

### Playbook 14: The 9,249 SEO Case Studies Meta-Analysis
*Source: Episode 1,191 ("9,249 SEO Case Studies Reveal the Weirdest Tactics That Work")*

* **Biggest Losers:** Over-optimizing exact-match keywords in H2/H3 tags (-19.7% drop). Programmatic thin location pages.
* **Biggest Winners:** Pruning dead/zero-click content, converting informational queries into interactive tools/checklists, updating statistics on legacy pages (+81% lift).

---

### Playbook 15: The "Nike Fallacy" — Infinite Authority vs. Zero Search Intent
*Source: Episode Breakdown with David Quaid*

* Nike Stories has DR 90+, millions of links, yet generates only 1,400 monthly organic visits because content writes for brand ego instead of real search intent.
* A DR 10 site targeting validated Compact Keywords with exact intent match consistently beats enterprise DR 90 sites publishing corporate fluff.

---

### Playbook 16: The Local SEO Domination Framework (Darren Shaw & Whitespark Study)
*Source: Episode 1awWMG1e5kY with Darren Shaw (Founder of Whitespark)*

* **Top 3 Ranking Factors:** 1. Primary GBP Category, 2. Proximity of searcher, 3. Keywords in business title.
* **Review Recency Trumps Volume:** 500 reviews arriving steadily weekly beats 5,000 stagnant reviews from 2 years ago. Encourage media-rich reviews with photos.
* **Debunked Myths:** Geotagging photo EXIF metadata is useless (Google strips EXIF on upload). Setting service area radii does not expand ranking proximity.

---

### Playbook 17: Advanced Parasite SEO, Site Reputation Abuse (SRA) & Indexation
*Source: Episode clcy9RbjrXQ with Charles Floate*

* **SRA Enforcement:** Google applies manual penalties and algorithmic filters primarily at subfolder levels rather than root domains.
* **Q&A Gate:** UGC and parasite forum content must show immediate engagement/upvotes to clear indexing gate.
* **Canonical Trap:** Verify published parasite page source to ensure platform hasn't injected root canonical or noindex tags.
* **Newsletter Archives:** Substack/beehiiv public archives carry high domain trust and low spam flags, ranking for long-tail comparisons rapidly.

---

### Playbook 18: The "Anti-Slop" Bottom-of-Funnel Conversion Page Blueprint
*Source: Episode 2Al_GYBMVmg with Edward Sturm*

* **The 200–500 Word Rule:** Bottom-of-funnel SEO pages convert best with 200–500 dense words, not 2,000 words of filler.
* **3 Pre-Writing Questions:** Who is searching? What immediate problem do they want solved? What concrete action are they ready to take right now?
* **Page Anatomy:** H1 exact-match keyword → visual diagram beside H1 (understand in 3 seconds) → primary CTA button → dense specs, pricing, and dispatch times.
* **Singular vs Plural:** Target `[Competitor] alternative` (singular). Position as the definitive replacement.

---

## 3. Top 25 Flagship Videos by Views & Impact

| Rank | Views | Title | Duration | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 68K views | Rank #1 on Google in 5 Hours with Claude Artifacts (AI Parasite SEO) | 7 minutes, 50 seconds | 1 year ago | [Watch](https://www.youtube.com/watch?v=nYOYNPtjS5g) |
| 2 | 59K views | How to Humanize ChatGPT Content | 12 minutes, 55 seconds | 1 year ago | [Watch](https://www.youtube.com/watch?v=7_bmGoLFfRo) |
| 3 | 37k | Google Just Changed Its AI Content Guidelines (Unreviewed AI Is Now a Liability) | 13 minutes, 28 seconds | 8 days ago | [Watch](https://www.youtube.com/watch?v=wxqf9J2Huu0) |
| 4 | 36K views | Rank & Rent SEO: How Ippei Built 130 Sites - and Made $240K From One 15-Hour Website | 1 hour, 30 minutes | 2 months ago | [Watch](https://www.youtube.com/watch?v=muwrS4Dh_R8) |
| 5 | 35K views | The SEO Playbook That Actually Works: PageRank, Topical Authority & Real Results | 1 hour, 53 minutes | 11 months ago | [Watch](https://www.youtube.com/watch?v=9eK5-TpaiPw) |
| 6 | 29K views | Google Can Detect Your AI Content. Here's What Happens Next. | 12 minutes, 27 seconds | 1 month ago | [Watch](https://www.youtube.com/watch?v=G0qcfknUCcU) |
| 7 | 29K views | Google Algorithm Leak: 14,000 Google Search Ranking Factors in Google's Biggest Leak Ever | 34 minutes | 2 years ago | [Watch](https://www.youtube.com/watch?v=KmeqXJIGL_A) |
| 8 | 27K views | Google's AI Crackdown: What It Means & How to Stay Safe | 16 minutes | 1 year ago | [Watch](https://www.youtube.com/watch?v=Pqk0dD1PQgQ) |
| 9 | 23K views | Google Just Gave SEOs a New Ranking Signal (Do This Now) - Preferred Sources | 8 minutes, 55 seconds | 1 month ago | [Watch](https://www.youtube.com/watch?v=Tv7n03rkgaM) |
| 10 | 23K views | The 30-Page Local SEO Hack Google's AI Is Already Rewarding | 1 hour, 25 minutes | 3 months ago | [Watch](https://www.youtube.com/watch?v=JSyApiAqsMw) |
| 11 | 23K views | How to Hit $100K/Month in Under 90 Days with Local SEO | 10 minutes, 58 seconds | 11 months ago | [Watch](https://www.youtube.com/watch?v=UloKvJ-uQ5I) |
| 12 | 22K views | Local SEO Masterclass: Darren Shaw on Ranking Factors, Reviews, and Google Business Hacks | 1 hour, 20 minutes | 10 months ago | [Watch](https://www.youtube.com/watch?v=1awWMG1e5kY) |
| 13 | 21K views | Google's August Spam Update Just Crushed Scaled Content - SaaS Is Winning | 17 minutes | 1 month ago | [Watch](https://www.youtube.com/watch?v=-70To9bGXVQ) |
| 14 | 21K views | Why Google Crawls Your Page but Refuses to Index It (And How to Fix It) | 9 minutes, 38 seconds | 8 months ago | [Watch](https://www.youtube.com/watch?v=ahNhcLDa1LQ) |
| 15 | 21K views | The SEO Trick That Skyrocketed My Page from #50 to #1! | 13 minutes, 28 seconds | 1 year ago | [Watch](https://www.youtube.com/watch?v=aSAp9rFXNLw) |
| 16 | 20k | Claude Sites Have a Serious SEO Problem: Too Many Words | 18 minutes | 4 wk ago | [Watch](https://www.youtube.com/watch?v=2Al_GYBMVmg) |
| 17 | 19k | Google's September 2026 Spam Update Is Here (And It Came With a Secret AI Spam Detector) | 14 minutes, 27 seconds | 2 wk ago | [Watch](https://www.youtube.com/watch?v=EkgJQlWtyFI) |
| 18 | 19K views | What Actually Works in SEO in 2026 - James Dooley on AI Search, Links & "Money-Hat" SEO | 1 hour, 42 minutes | 2 months ago | [Watch](https://www.youtube.com/watch?v=EOkrLkKNDrY) |
| 19 | 18K views | How $5 Press Releases Hack Google AI Overviews | 8 minutes, 56 seconds | 1 year ago | [Watch](https://www.youtube.com/watch?v=7TR_hGteqGo) |
| 20 | 17K views | Google's May 2026 Core Update: AI Spam Gets Smoked, Local SEO Shifts, GSC Breaks | 13 minutes, 26 seconds | 4 months ago | [Watch](https://www.youtube.com/watch?v=SmQtYzuI4p4) |
| 21 | 17K views | Google De-Indexing Millions of Pages: What's Happening? | 16 minutes | 1 year ago | [Watch](https://www.youtube.com/watch?v=Sks6wt_CKZU) |
| 22 | 16K views | Claude Cowork Is a Literal Cheat Code for SEO (Here's How Agencies See It) | 45 minutes | 8 months ago | [Watch](https://www.youtube.com/watch?v=e13R_Z1pFwk) |
| 23 | 15K views | James Dooley & David Quaid: The SEO "Best Practices" We Ignore | 3 hours, 8 minutes | 2 months ago | [Watch](https://www.youtube.com/watch?v=jW8hYUn99Uk) |
| 24 | 15K views | 4 Backlink Opportunities Working in 2026 (Including a Forgotten SEO Trick) | 10 minutes, 17 seconds | 7 months ago | [Watch](https://www.youtube.com/watch?v=DIOQe3f2guY) |
| 25 | 15K views | How to Build Backlinks for a Brand New Website (From Zero Authority) | 9 minutes, 11 seconds | 8 months ago | [Watch](https://www.youtube.com/watch?v=vcNmYaMrM3o) |

---

## 4. Categorized Breakdown of the Catalog

The channel's 1,327 cataloged videos span 9 distinct operational categories. Below are the strategic overviews and top flagship videos for each category. For the full, queryable 1,327-row dataset with all video IDs, publication dates, and durations, see [`buildinpublic-catalog.json`](./buildinpublic-catalog.json).

| Category # | Category Name | Total Videos | Primary Strategic Theme |
| :---: | :--- | :---: | :--- |
| **1** | Long-Form Masterclasses & Expert Interviews | 36 | 1–3 hour deep dives with enterprise SEOs and agency founders |
| **2** | Google Algorithm Updates, Leaks & Search Penalties | 72 | Real-time forensic breakdowns of core updates, API leaks & HCU |
| **3** | AI SEO, AEO & LLM Search | 274 | Optimization for Perplexity, ChatGPT, Claude, and Google AI Overviews |
| **4** | Backlinks, Cold Outreach & Digital PR | 67 | Empirical outreach data, broken link replacement, and PR syndication |
| **5** | Parasite SEO, Reddit & Web Authority Hacking | 40 | Exploiting Claude Artifacts, LinkedIn, Reddit, and Substack archives |
| **6** | Local SEO & Google Business Profile Domination | 20 | GBP ranking factors, proximity expansion, and review velocity |
| **7** | Topical Authority, Architecture & Technical SEO | 23 | Internal PageRank distribution, SEO colonies, and crawl budget |
| **8** | Compact Keywords, Conversion & Agency Growth | 32 | High-converting bottom-of-funnel landing pages and client retention |
| **9** | Daily Build In Public, Viral Experiments & Founder Vlogs | 763 | 1–3 min founder logs, TikTok viral tests, and daily growth tests |

### 1. Long-Form Masterclasses & Expert Interviews (40m - 3h)
*Total Cataloged:* **36 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Google's AI Overviews Now Tell Customers Why to Avoid Your Brand (w/ Ann Smarty) | 1 hour, 16 minutes | 6.3k | 9 days ago | [Watch](https://www.youtube.com/watch?v=n33DlHUJUrI) |
| 2 | Black Hat SEO in 2026: Why PBNs Still Work (With the Guy Who Owns 200,000 Domains) | 1 hour, 26 minutes | 10k | 2 wk ago | [Watch](https://www.youtube.com/watch?v=BMVgbnaLiFE) |
| 3 | How He Ranks #1 in Google Maps From 53 Miles Away - Mike Martin | 1 hour, 11 minutes | 11k | 3 wk ago | [Watch](https://www.youtube.com/watch?v=twTXNzCuUhU) |
| 4 | Query Augmentation: How One Page Ranks for Thousands of Keywords - James Dooley | 1 hour, 3 minutes | 6.3k | 3 wk ago | [Watch](https://www.youtube.com/watch?v=rHRlAMH99Y8) |
| 5 | How to Get Recommended by Google Maps AI - Darren Shaw | 57 minutes | 4K views | 1 month ago | [Watch](https://www.youtube.com/watch?v=DR10XdJoS30) |

### 2. Google Algorithm Updates, Leaks & Search Penalties
*Total Cataloged:* **72 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Google's September 2026 Spam Update Is Here (And It Came With a Secret AI Spam Detector) | 14 minutes, 27 seconds | 19k | 2 wk ago | [Watch](https://www.youtube.com/watch?v=EkgJQlWtyFI) |
| 2 | Google's August Spam Update Just Crushed Scaled Content - SaaS Is Winning | 17 minutes | 21K views | 1 month ago | [Watch](https://www.youtube.com/watch?v=-70To9bGXVQ) |
| 3 | Google's May 2026 Core Update: AI Spam Gets Smoked, Local SEO Shifts, GSC Breaks | 13 minutes, 26 seconds | 17K views | 4 months ago | [Watch](https://www.youtube.com/watch?v=SmQtYzuI4p4) |
| 4 | Google Algorithm Leak: 14,000 Google Search Ranking Factors in Google's Biggest Leak Ever | 34 minutes | 29K views | 2 years ago | [Watch](https://www.youtube.com/watch?v=KmeqXJIGL_A) |
| 5 | Google De-Indexing Millions of Pages: What's Happening? | 16 minutes | 17K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=Sks6wt_CKZU) |

### 3. AI SEO, AEO & LLM Search (ChatGPT, Claude, Perplexity, AI Overviews)
*Total Cataloged:* **274 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | How to Humanize ChatGPT Content | 12 minutes, 55 seconds | 59K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=7_bmGoLFfRo) |
| 2 | Google Can Detect Your AI Content. Here's What Happens Next. | 12 minutes, 27 seconds | 29K views | 1 month ago | [Watch](https://www.youtube.com/watch?v=G0qcfknUCcU) |
| 3 | Google's AI Crackdown: What It Means & How to Stay Safe | 16 minutes | 27K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=Pqk0dD1PQgQ) |
| 4 | Claude Sites Have a Serious SEO Problem: Too Many Words | 18 minutes | 20k | 4 wk ago | [Watch](https://www.youtube.com/watch?v=2Al_GYBMVmg) |
| 5 | Claude Cowork Is a Literal Cheat Code for SEO (Here's How Agencies See It) | 45 minutes | 16K views | 8 months ago | [Watch](https://www.youtube.com/watch?v=e13R_Z1pFwk) |

### 4. Backlinks, Cold Outreach & Digital PR
*Total Cataloged:* **67 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 6,337 Cold Emails Reveal What Actually Gets Replies (And Backlinks) | 12 minutes | 14K views | 6 months ago | [Watch](https://www.youtube.com/watch?v=2Yf68-t7q6w) |
| 2 | 4 Backlink Opportunities Working in 2026 (Including a Forgotten SEO Trick) | 10 minutes, 17 seconds | 15K views | 7 months ago | [Watch](https://www.youtube.com/watch?v=DIOQe3f2guY) |
| 3 | How to Build Backlinks for a Brand New Website (From Zero Authority) | 9 minutes, 11 seconds | 15K views | 8 months ago | [Watch](https://www.youtube.com/watch?v=vcNmYaMrM3o) |
| 4 | How $5 Press Releases Hack Google AI Overviews | 8 minutes, 56 seconds | 18K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=7TR_hGteqGo) |
| 5 | How to Land Top-Tier Press on Autopilot Without an Agency | 14 minutes | 9.4K views | 10 months ago | [Watch](https://www.youtube.com/watch?v=jHkLq87eE74) |

### 5. Parasite SEO, Reddit & Web Authority Hacking
*Total Cataloged:* **40 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Rank #1 on Google in 5 Hours with Claude Artifacts (AI Parasite SEO) | 7 minutes, 50 seconds | 68K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=nYOYNPtjS5g) |
| 2 | Parasite SEO in 2026: Subfolders, Reddit & Authority Leaks (w/ Charles Floate) | 1 hour, 15 minutes | 12K views | 4 months ago | [Watch](https://www.youtube.com/watch?v=clcy9RbjrXQ) |
| 3 | How to Rank Reddit Posts on Page 1 Every Single Time | 11 minutes | 14K views | 8 months ago | [Watch](https://www.youtube.com/watch?v=fN9jUa71rYw) |
| 4 | The Substack Parasite Trick: Ranking Newsletters on Google Fast | 13 minutes | 8.1K views | 5 months ago | [Watch](https://www.youtube.com/watch?v=b4wY8n73eX8) |
| 5 | Google's Site Reputation Abuse Manual Actions: Who Got Hit & Why | 15 minutes | 11K views | 5 months ago | [Watch](https://www.youtube.com/watch?v=j48Xn2eK8wE) |

### 6. Local SEO & Google Business Profile Domination
*Total Cataloged:* **20 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Rank & Rent SEO: How Ippei Built 130 Sites - and Made $240K From One 15-Hour Website | 1 hour, 30 minutes | 36K views | 2 months ago | [Watch](https://www.youtube.com/watch?v=muwrS4Dh_R8) |
| 2 | The 30-Page Local SEO Hack Google's AI Is Already Rewarding | 1 hour, 25 minutes | 23K views | 3 months ago | [Watch](https://www.youtube.com/watch?v=JSyApiAqsMw) |
| 3 | How to Hit $100K/Month in Under 90 Days with Local SEO | 10 minutes, 58 seconds | 23K views | 11 months ago | [Watch](https://www.youtube.com/watch?v=UloKvJ-uQ5I) |
| 4 | Local SEO Masterclass: Darren Shaw on Ranking Factors, Reviews, and Google Business Hacks | 1 hour, 20 minutes | 22K views | 10 months ago | [Watch](https://www.youtube.com/watch?v=1awWMG1e5kY) |
| 5 | The Local SEO Playbook Behind a Law Firm Doing $100M in 6 Months - Matt Hammerton | 1 hour, 33 minutes | 4.4K views | 1 month ago | [Watch](https://www.youtube.com/watch?v=GmMabXfA-Mk) |

### 7. Topical Authority, Architecture & Technical SEO
*Total Cataloged:* **23 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | The SEO Playbook That Actually Works: PageRank, Topical Authority & Real Results | 1 hour, 53 minutes | 35K views | 11 months ago | [Watch](https://www.youtube.com/watch?v=9eK5-TpaiPw) |
| 2 | Why Google Crawls Your Page but Refuses to Index It (And How to Fix It) | 9 minutes, 38 seconds | 21K views | 8 months ago | [Watch](https://www.youtube.com/watch?v=ahNhcLDa1LQ) |
| 3 | The SEO Trick That Skyrocketed My Page from #50 to #1! | 13 minutes, 28 seconds | 21K views | 1 year ago | [Watch](https://www.youtube.com/watch?v=aSAp9rFXNLw) |
| 4 | The Internal Linking Trick That Uses Topical Authority You Already Have | 11 minutes | 14K views | 9 months ago | [Watch](https://www.youtube.com/watch?v=p49X07sKeQ8) |
| 5 | Internal PageRank Flow: How Google Calculates Link Equity in 2026 | 16 minutes | 8.9K views | 7 months ago | [Watch](https://www.youtube.com/watch?v=kY03l7wXeG4) |

### 8. Compact Keywords, Conversion & Agency Growth
*Total Cataloged:* **32 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | How to Rank for Compact Keywords (The Bottom-of-Funnel SEO Blueprint) | 14 minutes | 12K views | 8 months ago | [Watch](https://www.youtube.com/watch?v=hN7x94bVvEw) |
| 2 | How to Build SEO Pages That Actually Convert at 8%+ | 11 minutes | 9.8K views | 6 months ago | [Watch](https://www.youtube.com/watch?v=jW71p-9xLe4) |
| 3 | Pricing Agency SEO Packages for Retention in 2026 | 18 minutes | 7.2K views | 5 months ago | [Watch](https://www.youtube.com/watch?v=k8vLw01nNn8) |
| 4 | The Anti-Agency Model: Scaling Solo SEO Without Headcount | 22 minutes | 6.7K views | 4 months ago | [Watch](https://www.youtube.com/watch?v=d77Xw3nKp88) |
| 5 | Competitor Comparison Pages: Why They Convert 3x Higher Than Blog Posts | 15 minutes | 11K views | 7 months ago | [Watch](https://www.youtube.com/watch?v=m7L30eF2vR4) |

### 9. Daily Build In Public, Viral Experiments & Founder Vlogs
*Total Cataloged:* **763 videos** (Complete data in `buildinpublic-catalog.json`)

| # | Title | Duration | Views | Published | Link |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Getting 10M Views on TikTok with 0 Followers | 2 minutes, 14 seconds | 18K views | 2 years ago | [Watch](https://www.youtube.com/watch?v=k9X7wE91nK8) |
| 2 | What an AI developer from Google is most concerned about | 1 minute, 33 seconds | 17 views | 3 years ago | [Watch](https://www.youtube.com/watch?v=sBs2e6_pp2M) |
| 3 | 100 Million Dollars in Two Weeks | 1 minute, 40 seconds | 21 views | 3 years ago | [Watch](https://www.youtube.com/watch?v=-SLKB8ws8bE) |
| 4 | How I'm getting in at the ground floor with ChatGPT plugins | 2 minutes, 43 seconds | 17 views | 3 years ago | [Watch](https://www.youtube.com/watch?v=0Zv_ldAxMWA) |
| 5 | Build in Public: Join my journey. Learn what I learn. | 2 minutes, 9 seconds | 32 views | 3 years ago | [Watch](https://www.youtube.com/watch?v=66QP50nBlO8) |

---

## 5. Machine-Readable Catalog Schema (`buildinpublic-catalog.json`)

All 1,327 individual video entries are cataloged with title, duration, view count, publication date, watch URL, and video ID in [`buildinpublic-catalog.json`](./buildinpublic-catalog.json).
