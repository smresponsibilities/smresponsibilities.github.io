# Handoff — 2026-08-20, after a design research pass

## State

Resolved: 01, 02, 03, 18
Frontier: 19, 04, 05, 06, 07, 09, 11, 17
In flight: none

Ticket 19 is new: the craft layer. It did not exist when 18 was claimed.

## Last session

No feature code. Three research passes, all measured against live sites rather than described.

`PLAN.md` §11 extracted Codédex's full design system and then ran the same measurement against
two professional designer portfolios. The finding: designers use far fewer font sizes with much
bigger jumps — rauno.me uses three sizes and goes 14px straight to 85px. It also corrected an
error in `BUILD.md`: Codédex never uses Press Start 2P above 12px, because it is unbearable at
display sizes. A five-step type scale went into `BUILD.md` §4.1 and ticket 18 shipped it.

`PLAN.md` §12 measured the micro layer on `linear.app` and `rauno.me` — transition durations,
easings, focus handling, text rendering, selection styling. Written up as hard rules in
`BUILD.md` §4.2 and filed as **ticket 19**, since none of it is in the codebase yet.

`BUILD.md` §5.1 is new: a per-screen state inventory. Developer portfolios design the happy path
and nothing else. The three most damaging omissions here are the move-list resting state, the
empty roster, and the 404.

## Not yet written down

Nothing. §11, §12, §4.1, §4.2 and §5.1 cover it.

## Process note

Acceptance criteria were added to ticket 18 while it was claimed, and were silently lost when
that session resolved the ticket. A rule against editing claimed tickets is now in `CLAUDE.md`.
The lost criteria became ticket 19.

## Content still owed by the user

Unchanged, blocks nothing on the frontier:

- Nature — 25 options in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links
- Three to five personal facts
- The domain, once purchased

## Next

**Ticket 19 first, then 04, 05, 06, 07 in any order** (they are parallel once 03 is done, and 03
is resolved). After those, the roster: 11, 12, 13. Chrome last.

19 goes first because it touches every page — anything built after it inherits the craft layer,
anything built before it has to be retrofitted. Its `:focus-visible` item is an accessibility
fix, not polish.

`CANON.md` is new. Read it before inventing any convention; §5 lists deviations that are
deliberate and must not be "corrected".
