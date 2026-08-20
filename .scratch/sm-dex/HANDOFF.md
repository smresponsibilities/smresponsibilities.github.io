# Handoff — 2026-08-19, after a design-direction pass

## State

Resolved: 01, 02, 03
Frontier: 18, 04, 05, 06, 07, 09, 11, 17
In flight: none

New since the last handoff: tickets 16 (title screen), 17 (trainer card) and 18 (visual
identity). Ticket 15 now also blocks on 16 and 17.

## Last session

No code. Two pieces of analysis, both recorded in `DECISIONS.md`.

First, a teardown of moizm.dev, another Pokédex-style portfolio (§O). Two ideas adopted into
existing tickets — the wordmark naming the version, and BACK/NEXT paging between entries — and
two new tickets filed. Three of its choices deliberately not copied, including its desktop-only
warning gate, which exists because its layout is pinned to a background bitmap.

Second, an assessment of whether to pivot the framework (§P). Measured rather than argued: 477
source lines, 14 of them Astro-specific. The UI is CSS, so a pivot would reproduce the same
screen for a day of work. Astro stands.

That assessment turned up the real reason the site looks plain, which was not the framework:
**no `@font-face` is registered anywhere.** `--font-display` is referenced by nothing and every
heading falls back to the body sans. Filed as ticket 18, along with two related defects found
in the same pass.

## Not yet written down

Nothing. §O, §P and §Q of `DECISIONS.md` cover all of it, and `BUILD.md` has been updated for
the font change and the new hard rules.

## Content still owed by the user

Unchanged, still blocks nothing on the current frontier:

- Nature — 25 options listed in `SPEC.md` §7.5
- Weaknesses / resistances / immunity
- Three project links
- Three to five personal facts for the flavour text
- The domain, once purchased

## Next

**Ticket 18.** It is unblocked and it is the highest-value visual change available — the site
currently has none of the character the design depends on, because the display font never
loads. After that, follow the build order in `spec.md`: your entry, then the roster, then chrome.
