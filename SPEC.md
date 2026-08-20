# SPEC — Shivam Mahajan, as a Pokémon

Draft built from your resume. **Correcting a draft is faster than writing one**, so everything
below is a proposal with a confidence marker. Fix what's wrong; what survives becomes
`me.json`, `moves.json`, `encounters.json`, `entries.json`.

`✅` = taken straight from your resume, safe.
`🟡` = my inference, check it.
`❓` = I need you to answer.

---

## 1. Identity

| Field | Value | |
|---|---|---|
| Name | **SHIVAM MAHAJAN** | ✅ |
| Species | **Humanoid Pokémon** | ✅ your pick |
| Title (recruiter-facing) | **Software Developer** | ✅ |
| Dex No. | `#001` | 🟡 you're the first entry |
| GitHub | `smresponsibilities` | ✅ |
| Email | `shivammahajan.mail@gmail.com` | ✅ |
| LinkedIn | `linkedin.com/in/mahajanshivam` | ✅ |
| Phone | **NOT on the site** | ✅ agreed |
| Egg Group | **Human-Like** | 🟡 canon group, matches your species |
| Habitat | Punjab, India | 🟡 |
| Height / Weight | **6'00" / 169.8 lbs** (183 cm / 77 kg) | ✅ |
| **Gender** | symbol shown next to name | ❓ see §1.1 |
| **OT (Original Trainer)** | **MORGAN STANLEY** · ID `2025` | ✅ added |
| **Evolution chain** | 4 stages, see §6.5 | ✅ added |

### 1.1 Gender field

Added as requested. Canon renders it as a small symbol beside the name. I'm not going to guess
yours — pick one:

| Option | Renders | Note |
|---|---|---|
| ♂ / ♀ | Symbol beside name | Whatever's accurate |
| **⚲ Genderless** | `GENDER: UNKNOWN` | Canon for Magnemite, Voltorb, etc. Deadpan, and reveals nothing. |
| Omit | Field hidden | |

❓ Your call. On the community form this is **optional and free-text-free** — a dropdown with
the same options, defaulting to genderless, so nobody is forced to disclose anything.

---

## 2. Level — your system, adopted

**1 month of professional experience = 1 level.** Computed at build time, so it increments
itself and you never touch it again.

```
Morgan Stanley, Aug 2025 → Aug 2026  =  12 months  =  Lv. 12
```

Why this is good: it's honest, it's automatic, and 100 levels ≈ 8.3 years, which is a sane
career-length cap. Nothing to maintain.

**Education is deliberately excluded** from level. It gets its own slot (§6) and the
2,002-day streak gets a ribbon (§5). Mixing them in would make the number mean nothing.

Professional months only. Locked.

---

## 3. Types — the system you asked for

You said "make a system of something" instead of picking. Here it is: **every technology maps
to a type**, and your two types fall out of what you actually weigh most.

### 3.1 The mapping table

This table also assigns **move types** to your projects, so it earns its keep twice.

| Type | Domain | Your tech in it |
|---|---|---|
| **Water** | Data flow, streaming, pipelines, ETL | Kafka, PySpark, Snowflake, Autosys, medallion architecture |
| **Steel** | Backend, infra, reliability, correctness | Spring Boot, Liquibase, RBAC, mTLS, Snowflake objects |
| **Electric** | Real-time, mobile, low latency | WebSockets, Android, Jetpack Compose, Room |
| **Psychic** | ML, AI, prediction | TensorFlow, scikit-learn, Pandas, Gemini API |
| **Fairy** | Frontend, UI, presentation | React, Jetpack Compose UI |
| **Dark** | Security, auth, secrets | OAuth 2.0, mTLS, secrets vault, key-pair, RBAC |
| **Fighting** | Raw discipline, algorithmic grind | 2,600+ DSA problems, 1,150-day streak |
| **Dragon** | Blockchain, distributed consensus | Solidity, smart contracts |
| **Normal** | Generalist glue, docs, open source | MediaWiki PR, Agile, REST |
| **Ground** | Ops, CI/CD, observability | Unix/Linux, Grafana, Splunk, CI/CD |

### 3.2 Your typing — and an honest note

**LOCKED: DRAGON / STEEL** ✅ (your pick)

- **Dragon** (primary) — Solidity smart contracts and on-chain governance from Chaincode, plus
  what Dragon connotes in canon: rare, high ceiling, slow to train, hits hard once it is.
- **Steel** (secondary) — 0% row-count tolerance, zero-compiler-warning build, 425 test suites,
  135 automated role grants, mTLS, RBAC. Correctness as a personality.

Dragon/Steel is a strong, uncommon typing. It leans aspirational rather than descriptive —
Water/Steel would have described your resume more literally — but it's your call and it's made.

**Visitors pick their own types** on the submission form, from the same 18. Already planned.

**⚠️ The honest note:** you told me 50/50 frontend/backend. **Your resume does not say that.**
It reads as data engineering and backend infrastructure, with Android as a serious second, and
frontend as React appearing in two student projects. There is no frontend work in your Morgan
Stanley bullets at all.

That's not a criticism — it's a strong, specific profile, and "data engineer who ships
production pipelines at a bank in their first year" is a much better story than "full-stack."
But the site should lead with what's real.

Recorded, not re-litigated. Dragon/Steel ships. If it ever feels wrong, it's two strings in
`me.json`.

---

## 4. Stats — not rated, **counted**

You objected: *"stats i dont think we need and how will we calculate them."* Both halves were
right, and my first draft deserved the objection — those numbers were invented. A recruiter
reading "Defense: 92" learns nothing, because you assigned it to yourself.

**Fix: stop rating, start counting.** Every stat is backed by one real number from your
resume. Nothing is self-assessed. Nothing is arguable.

| Stat | Real metric | Your value |
|---|---|---|
| **HP** — staying power | Consecutive-day code streak | **1,150 days** |
| **Attack** — output | Lines shipped in one codebase | **25,000+** |
| **Defense** — rigour | Test suites written | **425** |
| **Sp. Atk** — system scale | Events architected through one pipeline | **5,000,000** |
| **Sp. Def** — load withstood | Simulated users survived in load test | **1,000,000** |
| **Speed** — throughput | DSA problems solved | **2,600** |

This is strictly better than a rating:

- **Verifiable.** LeetCode profile, GitHub, the streak repo. Nothing to take on faith.
- **No cringe.** "I rate my Defense 92/100" is a thing only a portfolio says. "425 test suites"
  is a thing an engineer says.
- **Self-updating.** Streak and problem count come from live data at build time.
- **It answers your question.** Nothing is calculated. It's counted.

**Bar rendering:** the number is the content, the bar is decoration. Fill is `log10`-normalised
so 5,000,000 doesn't flatten 425 into an invisible sliver. The tooltip on each bar states the
exact metric and where it comes from — which is the §7.5 legibility requirement doing its job.

If you'd still rather drop the panel entirely, say so — but these six numbers are the most
persuasive thing on your resume, and a stat block is the single best place to put them.

---

## 5. Ribbons — your achievements

Ribbons are canon for accomplishments, so achievements get a real slot instead of a bullet list.

| Ribbon | For | |
|---|---|---|
| 🎀 **Core Contributor** | Wikimedia "Road to Wiki" Cohort 1, selected from 260+ applicants; PR merged into core MediaWiki | ✅ |
| 🎀 **Endurance** | 1001 Days of Code co-founder → scaled to 2,002 days, 1,150+ day active streak | ✅ |
| 🎀 **Problem Solver** | 2,600+ DSA problems — LeetCode 1,900+, Codeforces 700+ | ✅ |
| 🎀 **Tournament** | 3rd of 200+ teams, HackIndia Regionals | ✅ |
| 🎀 **Dean's List** | Chitkara University, 2022–2026, CGPA 9.35/10 | ✅ |

The Endurance ribbon is the one that will actually make people stop scrolling. 2,002 days is
absurd. Lead with it.

---

## 5.5 Field mapping — every Pokédex field, and what it becomes

You asked what the fields are and how they link. Here is the complete set.

### 5.5.1 Move fields → project fields

A real Pokémon move has twelve fields. Ten of them map to something genuinely useful about a
project, which is why "projects as moves" works better than it has any right to.

| Move field | Becomes | Example from your work |
|---|---|---|
| **Name** | Project name | `PRODUCTIVITY CALLER` |
| **Type** | Tech domain, from §3.1 | Electric (mobile, real-time) |
| **Category** | Physical = built hands-on · Special = designed/architected · Status = tooling, infra, docs | Productivity Caller = Physical |
| **Power** | Impact | 95 — replaced a whole notification paradigm, +35% completion |
| **Accuracy** | **Reliability.** Test coverage, did it actually ship and hold up | 100% — 425 test suites, zero-warning build |
| **PP** | Maintenance status. `30/30` active, `0/15` archived | Productivity Caller `30/30`, QuizDeck `0/10` |
| **Effect text** | One-line description of what it does | "Replaces push notifications with native phone calls." |
| **Priority** | Shipped unusually fast → `+1` | Chaincode `+1` (hackathon, one weekend) |
| **Contact** | Did real users touch it? | Yes for QuizDeck (500 concurrent), no for internal tooling |
| **TM / HM no.** | Work project, taught by an employer | `TM01` — CIAM Warehouse, Morgan Stanley |
| **Level learned** | Your level when you built it | Chaincode learned "before capture" (pre-professional) |
| **Target** | Who it served | "All adjacent" (500k+ users) vs "self" |

**Accuracy is the sleeper field.** It's the honest one — a hackathon project that demoed once
is `Accuracy 75%`, and a codebase with 425 test suites is `Accuracy 100%`. It says something
real that Power alone can't, and it rewards your actual strength.

**"Level learned" is the other good one.** Canon shows the level at which a move is learned.
Your pre-Morgan-Stanley projects were built at Lv. 0, so they render as **"Learned before
capture"** — which is both accurate and quietly charming.

### 5.5.2 Every other Pokédex field

Everything a real dex screen carries. `✅` in, `❓` your call, `⏭️` skipping.

| Field | Maps to | |
|---|---|---|
| No. | Entry number | ✅ `#001` |
| Name | Your name | ✅ |
| Species | Job classification | ✅ Humanoid Pokémon |
| Type(s) | Technical domains | ✅ Dragon/Steel |
| Height / Weight | Real values | ✅ 6'00" / 169.8 lbs |
| Flavour text | Facts about you, one per version | ✅ need real ones |
| Stats | See §4 — being reworked | 🟡 |
| **Ability** | Defining working trait | ✅ Zero Tolerance |
| **Hidden Ability** | The non-obvious one | ✅ Streak |
| **Held Item** | Tool you never put down | ✅ Vim |
| Ribbons | Achievements | ✅ §5 |
| Habitat | Where you are | ✅ Punjab, India |
| Egg Group | Human-Like | ✅ matches species |
| **Evolution chain** | Career progression | ❓ Student → Apprentice → Developer → ? |
| **Nature** | Working style, with a real +/− tradeoff | ❓ strong slot, see below |
| **OT (Original Trainer)** | Who caught you first | ❓ Morgan Stanley |
| **Catch Rate** | How hard you are to hire | ❓ |
| **Growth Rate** | How fast you level | ❓ |
| **EV Yield** | What working with you gives a team | ❓ |
| **Egg Moves** | Skills inherited from mentors | ❓ |
| **Shiny form** | Alternate palette of you | ❓ cheap, `hue-rotate` |
| Gender ratio | — | ⏭️ nothing to say |
| Base Friendship | — | ⏭️ noise |

**Nature is the best unclaimed slot.** Canon natures carry a real tradeoff — Adamant is
`+Attack / −Sp.Atk`. Yours states a working style *and admits a cost*, which is far more
credible than a list of strengths:

- **Adamant** `+Attack −Sp.Atk` — ships fast, less patient with design documents
- **Careful** `+Sp.Def −Sp.Atk` — tests everything, slower to commit to an architecture
- **Timid** `+Speed −Attack` — learns fast, cautious about shipping
- **Modest** `+Sp.Atk −Attack` — designs deeply, ships slower
- **Jolly** `+Speed −Sp.Atk` — picks anything up, avoids deep specialisation

❓ Which nature is you? The tradeoff must be one you'd actually admit in an interview.

---

## 6.5 Evolution chain

Four stages. The last one is the point.

```
   ┌──────────────┐      ┌──────────────┐      ┌──────────────┐      ┌──────────────┐
   │   STUDENT    │  →   │  APPRENTICE  │  →   │  SOFTWARE    │  →   │      ???     │
   │              │      │              │      │  DEVELOPER   │      │   silhouette │
   │  Chitkara    │      │Morgan Stanley│      │              │      │              │
   │  2022        │      │  Lv. 1       │      │  Lv. 12      │      │   Lv. ??     │
   └──────────────┘      └──────────────┘      └──────────────┘      └──────────────┘
```

**Stage 4 renders as an unevolved silhouette** — black fill, question mark, "EVOLUTION
CONDITION UNKNOWN". It is the RELEASED status expressed as a picture: the next form exists and
hasn't happened yet. A recruiter reads it in under a second and nobody had to write
"seeking opportunities."

Cheap to build: `filter: brightness(0)` on the same sprite, plus a `?` overlay. Four lines.

❓ Confirm the three real stage names, and whether stage 4 should stay `???` or name a target
role.

---

## 6. Moves — your projects

Canon is four moves. You have exactly three personal projects plus work — which fits perfectly
if we treat work projects as **TMs** (moves taught by an organisation, which is canon).

### Signature move

**PRODUCTIVITY CALLER** 🟡 `Electric/Steel` · Physical · **Power 95** · **PP 30/30**
> Kotlin, Jetpack Compose, MVVM, Dagger Hilt
> Replaces push notifications with native Telecom phone calls. 25,000+ line codebase,
> 425+ test suites across 15 files, zero-compiler-warning build. Custom NLP pipeline of 80+
> regex patterns cuts manual entry 75%. **+35% task completion.**
> `PP 30/30` — active, May 2026 → present.

### CHAINCODE 🟡 `Dragon/Psychic` · Special · **Power 85** · **PP 0/15**
> MERN, Python, Gemini API, Solidity
> Decentralised code-to-NFT platform. Led 4 people, Agile. 15+ REST APIs off-chain, 3 Solidity
> contracts on-chain. Gemini 3.5 code-originality validation at 95%+ accuracy.
> **3rd of 200+ teams, HackIndia Regionals.**
> `PP 0/15` — hackathon build, Oct 2024, not maintained.

### QUIZDECK 🟡 `Electric` · Special · **Power 70** · **PP 0/10**
> React, WebSockets, Node.js
> Real-time multiplayer quiz, 500 concurrent users. **31 ms average response**, +30% message
> delivery speed.
> `PP 0/10` — archived, Dec 2024.

### TM01 · CIAM WAREHOUSE 🟡 `Water/Steel` · **Special** · **Power 100** · taught by Morgan Stanley
> PySpark, Kafka, Snowflake, Liquibase, Autosys, Spring Boot
> Sole engineer with a data architect. 5M+ Kafka events through 4 PySpark workflows and 20+
> jobs into Snowflake at **0% row-count tolerance**. Owned a 3-tier medallion architecture,
> 135 automated role grants, 7+ schemas. Daily Python ETL at **3.9× throughput**, load-tested
> to 1M simulated users. Secure connectivity for a Spring Boot API serving **500k+ users**.

> Category changed from Status to Special. Canon status moves carry no power at all, and this
> is the largest piece of work in the entry — Special is the category for something designed
> and architected rather than hand-built. See `CANON.md` §6.

❓ Power numbers are on an impact scale. Argue with them — they're my read, not yours.
❓ Links: Productivity Caller demo video, Chaincode live site + demo, QuizDeck GitHub. Send URLs.

---

## 7. Encounters — experience

### Caught by MORGAN STANLEY
> **Technology Apprentice** · Aug 2025 – Aug 2026 · Met at **Lv. 1**, now **Lv. 12**
> Ball: 🔒 **NEST BALL** — on-campus placement

### 7.1 Ball type = how you got the job

You asked for this to map to on-campus / off-campus / referral. It does — and every one of
these is canon-accurate to what the ball actually does in the games, which is what makes it a
joke rather than a label.

| How you got it | Ball | Canon mechanic — why it fits |
|---|---|---|
| **On-campus placement** | **Nest Ball** | Works better the **lower the target's level**, and you were caught in your own nest. Campus recruiting, exactly. |
| **Off-campus application** | **Ultra Ball** | The high-performance ball you reach for when the catch is genuinely harder. Off-campus is harder. |
| **Referral** | **Friend Ball** | The ball that arrives via a friend. No interpretation needed. |
| **Intern / apprentice → PPO** | **Repeat Ball** | More effective on a species you have **already caught**. They already had you. |
| **Hackathon or contest** | **Sport Ball** | The ball used exclusively in the Bug-Catching **Contest**. |
| **Cold outreach / you DM'd them** | **Quick Ball** | Strongest on the **first turn**. You went first. |
| **Brutal, months-long process** | **Timer Ball** | Gets stronger the **longer the battle runs**. |
| **Career switch** | **Dive Ball** | For catching somewhere entirely different. |
| **Dream company** | **Master Ball** | Never fails. Use once. |
| **Great comp or culture** | **Luxury Ball** | Raises friendship faster. |

✅ **Morgan Stanley = NEST BALL.** Confirmed — on-campus placement.

**Every ball renders with its label attached**, never as a bare icon: `NEST BALL · On-campus`.
Nobody looks at a green ball and infers campus recruiting. Hover or tap opens the full canon
reason. See PLAN §7.5.

Visitors pick theirs from the same list on the form, which quietly turns the encounter section
into a story about *how people get hired* rather than a list of logos.

### Education
> **Chitkara University** · BE Computer Science & Engineering · Aug 2022 – Aug 2026
> CGPA **9.35/10** · Dean's List 2022–2026
> 🟡 Rendered as the pre-evolution / origin, not an encounter.

### ⚠️ Status conflict — needs your answer

You said *"just completed an apprenticeship."* Your resume says *"Aug 2025 – Present."*
Your degree ends **Aug 2026**, which is now.

Your own three-state system is good and I'm adopting it:

| State | Means |
|---|---|
| **CAUGHT** | Currently at a company |
| **RELEASED** | Was at a company, now in the wild |
| **UNCAUGHT** | Never been caught |

✅ **RELEASED.** Locked. Renders in the header as a status badge — reads as *available now*
to a recruiter without you having to ask.

### ✅ Privacy — agreed

Your resume has **+91 70186 26032**. That does **not** go on a public site — a public repo
plus a public page means permanent scraping and spam. Email and LinkedIn only. Email gets
basic obfuscation. Say the word if you disagree, but I'd need a good reason.

---

## 8. Pokédex entries — the facts

Canon: one entry per game version, so the version selector (§9.1 of PLAN.md) shows a different
fact per version. Drafted from your resume, in dry Pokédex voice.

> **RED** — *Consumes coffee to regulate operating temperature. Has not skipped a day of code
> in over 1,150 days. Researchers have stopped asking why.*
>
> **BLUE** — *Capable of processing five million events in a single migration cycle. Refuses
> to drop a single row.*
>
> **GOLD** — *Solved over 2,600 algorithmic problems in the wild. Observers report no external
> reward was offered.*
>
> **CRYSTAL** — *Once merged a change into the MediaWiki core. The colony now cites it.*
>
> **EMERALD** — *Its habitat is Punjab. It is bipedal, nocturnal, and answers to `vim`.*

❓ These are placeholders built from your resume. Give me **3–5 real facts about yourself** —
non-work, the weirder the better — and I'll rewrite them in this voice. That's the funniest
part of the site and I can't invent it for you.

### Ability / Hidden Ability / Held Item 🟡

- **Ability: Zero Tolerance** — *This Pokémon's pipelines do not drop rows.*
- **Hidden Ability: Streak** — *Has not missed a day in 1,150 days. Power rises each
  consecutive day.*
- **Held Item: Vim** — *Cannot be removed.*

---

## 9. Still needed from you

| # | Question |
|---|---|
| ~~1~~ | ~~Target job~~ — **dropped.** Defaulting to leading with the Morgan Stanley work (most recent, largest scale, strongest numbers), Productivity Caller as signature personal move. Reorder a JSON array to change it later. |
| ~~2~~ | **RELEASED** ✅ locked |
| ~~3~~ | **Dragon/Steel** ✅ locked |
| ❓ 4 | **Project links** — you said coming soon |
| ❓ 5 | **3–5 personal facts** for the dex entries — you said coming soon |
| ~~6~~ | **6'00" / 169.8 lbs** ✅ locked |
| ❓ 7 | §4 reworked — stats are now **counted, not rated**. Confirm the six metrics, or say drop the panel. |
| ⏸ 8 | Weaknesses / resistances / immunity — you deferred these. Cheap and funny; ~10 minutes whenever you want them. |

---

## 7.5 Natures — all 25

You asked for more. This is the complete canon list. Stat abbreviations use the §4 meanings:
**Atk** = output · **Def** = rigour · **SpA** = system design · **SpD** = resilience · **Spe** = throughput.

Pick the one whose *cost* you'd actually admit in an interview. The tradeoff is what makes it
credible — a nature with no downside is just a compliment.

| Nature | Stat effect | What it says about you |
|---|---|---|
| **Adamant** | +Atk −SpA | Ships fast. Impatient with design documents. |
| **Lonely** | +Atk −Def | Ships fast. Tests later, if at all. |
| **Brave** | +Atk −Spe | Ships fast. Takes time to pick up new stacks. |
| **Naughty** | +Atk −SpD | Ships fast. Rattled when things break in production. |
| **Bold** | +Def −Atk | Tests everything. Slower to put things out. |
| **Impish** | +Def −SpA | Rigorous. Prefers proven patterns to novel architecture. |
| **Lax** | +Def −SpD | Great test coverage. Less composed during incidents. |
| **Relaxed** | +Def −Spe | Careful and thorough. Deliberately unhurried. |
| **Modest** | +SpA −Atk | Designs deeply. Ships slower. |
| **Mild** | +SpA −Def | Strong architect. Lighter on testing. |
| **Quiet** | +SpA −Spe | Thinks in systems. Takes time to get there. |
| **Rash** | +SpA −SpD | Ambitious designs. Shakier when they fail. |
| **Calm** | +SpD −Atk | Unshakeable in an incident. Not the fastest shipper. |
| **Gentle** | +SpD −Def | Handles pressure well. Lighter process. |
| **Sassy** | +SpD −Spe | Very resilient. Deliberate pace. |
| **Careful** | +SpD −SpA | Tests everything, stays calm. Slow to commit to an architecture. |
| **Timid** | +Spe −Atk | Learns anything fast. Cautious about shipping. |
| **Hasty** | +Spe −Def | Very fast. Cuts corners on rigour. |
| **Jolly** | +Spe −SpA | Picks up anything. Avoids deep specialisation. |
| **Naive** | +Spe −SpD | Fast learner. Less battle-tested. |
| **Hardy** | neutral | No spikes, no holes. Genuinely balanced. |
| **Docile** | neutral | Adapts to whatever the team needs. |
| **Serious** | neutral | No drama, no surprises. |
| **Bashful** | neutral | Quietly competent. Doesn't self-promote. |
| **Quirky** | neutral | Balanced, but strange about it. |

**Read on your resume:** your numbers spike on rigour (425 test suites, zero-warning build, 0%
row tolerance) and on picking things up fast (2,600 DSA problems, Kotlin to 25k lines). The
honest cost is that nothing in your resume shows you shipping something scrappy and fast.

That points at **Careful** `+SpD −SpA` or **Timid** `+Spe −Atk`. But this is a self-assessment
and only you know which cost is true.

---

## 7.6 Sprites — GitHub avatar only

Two candidate systems were researched and both are now dropped:

- ~~**DiceBear pixel-art**~~ — CC0, generative, zero storage. You didn't like it.
- ~~**Kenney Roguelike Characters**~~ — 450 CC0 sprites, a real trainer-picker gallery. You
  called the sprites bad.

**Final: the GitHub avatar, and nothing else.** This is the right end state:

- **Literally zero bytes stored.** The original requirement, fully intact.
- **No picker to build**, no spritesheet to curate, no third control on the form. The sprite
  is derived from the username they already typed.
- **It's actually them.** A chosen preset is a costume; an avatar is a person.
- GitHub stays load-bearing — no account, no sprite, no entry.

Treatment: dither if the avatar is a photo, plain `image-rendering: pixelated` if it's
illustration or a logo. People with no custom avatar get GitHub's identicon, framed as
**`UNIDENTIFIED SPECIES`** with a distinct border — the fallback becomes a feature rather than
a gap.
