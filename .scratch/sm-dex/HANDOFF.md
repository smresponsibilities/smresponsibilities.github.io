# Handoff — 2026-08-20, after ticket 03

## State

Resolved: 01, 02, 03
Frontier: 04
In flight: none

## Last session

Built the identity block and the `Term.astro` tooltip primitive every later ticket depends on.
`Sprite.astro` renders the GitHub avatar pixelated with a script-bound `UNIDENTIFIED SPECIES`
fallback on load error (no image asset in the repo). `lib/level.ts` computes level from a fixed
start date, capped 0–100 — currently Lv. 12. `Term.astro` wraps the native Popover API and adds
hover and keyboard-focus as additional openers (Tab alone reveals it, the standard accessible
tooltip pattern), plus a slot-based path so `TypeBadge`/a status badge can be the trigger without
inheriting the plain-text underline style. `index.astro`'s top screen now shows sprite, both
type badges, name, species, dex no., level, status, height, and weight, all sourced from
`me.json`. Two real bugs were caught by testing rather than assumed away — a CSS specificity
trap that made the sprite fallback always render, and BUILD.md's inline `onerror=""` attribute
silently no-op'ing in the test sandbox (swapped for `addEventListener`, consistent with how
`Term.astro` already binds its own listeners). Full detail in
[`.scratch/sm-dex/issues/03-identity-and-tooltips.md`](issues/03-identity-and-tooltips.md)'s
`## Handoff` section — read it before touching `Sprite.astro` or `Term.astro`.

**Note for whoever reads this next:** a commit landed on `main` (`12441f7`, authored as "Shivam
Mahajan" rather than this session's usual git identity) that bundled this ticket's code together
with unrelated updates to tickets 08 and 13 — new acceptance criteria from a competitor teardown
of moizm.dev (version selector naming the site "SHIVAM RED VERSION"; dex entries paging with
BACK/NEXT). That looks like a separate, concurrent session's deliberate work, not anything to
undo — flagging it here so it isn't mistaken for stray/unexplained state later.

## Not yet written down

Nothing new from this session. The ticket 08/13 additions mentioned above are already written
down in those ticket files directly — nothing to duplicate here.

## Content still owed by the user

Unchanged, still doesn't block 04:

- Nature — 25 options listed in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links — Productivity Caller demo, Chaincode live + demo, QuizDeck repo
- Three to five personal facts for the flavour text
- The domain, once purchased

## Next

Take ticket 04 (`.scratch/sm-dex/issues/04-stat-block.md`): the stat block, rendered into
`Screen`'s empty `bottom` slot. Remember §6.3's fix — each stat's bar fill is `value / benchmark`
from `me.json`, never a shared `log10` scale across incompatible units, and the tooltip must
always state the benchmark (BUILD.md §9 gotcha #10: never render a bar without it).
