# Prompt for the implementing session

Paste this at the start of a fresh session. Change the ticket number each time.

---

You are implementing SM'S DEX, a Pokédex-themed portfolio. The planning is finished — do not
redo it. Your job is to build one ticket.

**Read first, in this order:**

1. `CLAUDE.md` — project overview, doc reading order, communication style, handoff rules
2. `.scratch/sm-dex/HANDOFF.md` — current state of the effort, written by the last session
3. `BUILD.md` — the implementation spec. It wins any conflict with anything else.
4. `CANON.md` — what the real games do, measured. Read §5 before "fixing" anything that looks
   non-canonical; several deviations are deliberate.
5. `.scratch/sm-dex/issues/<NN>-<name>.md` — your ticket

**Reference the games directly.** Before inventing any convention — a length, a format, a
label, a default — check what the real Pokédex does. `CANON.md` has the measured figures and
the `curl` commands to check anything it does not cover. The games are usually terser than you
expect, and matching them is free authenticity. This has already caught two defects.

Read `DECISIONS.md` only if you want to change something. Every alternative you are likely to
suggest is already in there with the reason it lost. `PLAN.md` is background and you probably
do not need it.

**Before you start:** set `Status: claimed` in the ticket file and save it.

**Build exactly the ticket.** Not the next one, not a helpful extra.

**Finish properly.** When every acceptance checkbox is genuinely true: tick them, append a
`## Handoff` block to the ticket file, overwrite `.scratch/sm-dex/HANDOFF.md` with the new
state, set `Status: resolved`, then commit. Both handoff writes are required — the format is in
`CLAUDE.md`. The next session starts with an empty context and inherits only what you wrote
down. Then stop and report.

**Hard rules from `BUILD.md` §0 — these are decisions, not defaults.** No Tailwind. No React,
Vue or Svelte. No tooltip library — the native Popover API covers it. No animation or charting
library. No WebGL. Zero runtime npm dependencies. No Pokémon sprites, artwork or logos in the
repo. No image files for people — sprites come from the GitHub avatar CDN. Everything respects
`prefers-reduced-motion`. Audio never autoplays.

If you think one of these is wrong, leave a comment saying why and build it as specified anyway.
Do not silently substitute.

**Two things that will bite you**, both in `BUILD.md` §9:

- Astro content collections use the current API — `src/content.config.ts`, the `file()` loader
  from `astro/loaders`. Pre-v5 syntax will not work.
- `site` must be set in `astro.config.mjs` or every share card and the sitemap break.

**Ticket 01 is a tracer bullet.** It is meant to be ugly. It proves data → schema → render → CI
→ live URL all work together before any design effort goes in. Resist making it look good; that
is ticket 02 and 03.

**Chat style:** caveman mode at `ultra` — see `CLAUDE.md`. Terse, fragments, abbreviations,
arrows for causality. Code, comments and commit messages stay in normal prose.

---

## Later tickets

Same prompt, swap the ticket path. Tickets 04–07 can run in parallel sessions once 03 is
resolved; check the frontier first:

```bash
grep -L "Status: resolved\|Status: claimed" .scratch/sm-dex/issues/*.md
```

A ticket is takeable when it is unclaimed, unresolved, and every ticket in its `Blocked by`
line is resolved.

**Deploy after ticket 03.** A live site with one good entry beats a half-finished community
feature.
