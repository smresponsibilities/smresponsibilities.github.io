# Handoff — 2026-08-19, after ticket 02

## State

Resolved: 01, 02
Frontier: 03
In flight: none

## Last session

Built the two-screen device shell: `src/components/Screen.astro` (top/bottom named slots, CSS
grid — single column under 768px, side-by-side at 768px+), wired `<ClientRouter />` into
`Base.astro` for soft page transitions, and added a minimal site-wide header (`SM'S DEX`
wordmark, linked home) since the shell needed at least one real interactive element to make
"touch targets ≥ 44px" and "page navigation animates" checkable. `index.astro`'s ticket-01
content now renders inside `Screen`'s `top` slot; `bottom` is empty, waiting for tickets 04+.
Verified no horizontal scroll at 375/768/1280px and confirmed the transition is a real soft-swap
(not a hard reload) via a temporary test page, deleted before commit. Full detail and deviations
— especially why the header exists and why touch targets aren't a blanket CSS rule — are in
[`.scratch/sm-dex/issues/02-device-shell.md`](issues/02-device-shell.md)'s `## Handoff` section.

## Not yet written down

Nothing new. Two tokens were added to `tokens.css` (`--tap`, `--device-max`) as an additive
extension of the existing "structure" group, not a deviation from the locked colour palette —
noted in the ticket, not worth a `DECISIONS.md` entry.

## Content still owed by the user

Unchanged, still doesn't block 03:

- Nature — 25 options listed in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links — Productivity Caller demo, Chaincode live + demo, QuizDeck repo
- Three to five personal facts for the flavour text
- The domain, once purchased

## Next

Take ticket 03 (`.scratch/sm-dex/issues/03-identity-and-tooltips.md`): identity details and the
`Term.astro` tooltip primitive (BUILD.md §6.4, native Popover API) — the first ticket that
actually needs `--tap` sizing to *not* apply, since `Term` triggers are meant to be small inline
text.
