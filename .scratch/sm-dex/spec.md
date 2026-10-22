# SM'S DEX - spec

The full specification lives at the repo root, not here, because it predates this tracker and
is referenced by name throughout the planning documents.

| File | What it is |
|---|---|
| `BUILD.md` | The implementation spec. Wins any conflict. |
| `DECISIONS.md` | Every decision with alternatives and why they lost. |
| `SPEC.md` | The content that becomes the data files. |
| `PLAN.md` | Research behind the decisions. |

Tickets in `issues/` are the execution slices of `BUILD.md`. They deliberately avoid file paths
and code, which go stale; the detail lives in `BUILD.md` and is referenced by section.

## Build order - substance before chrome

Blocking edges say what is *possible*. This says what is *worth doing next*, which is not the
same thing.

```
18            visual identity - unblocked, highest visual value available
04 05 06 07   your entry - the portfolio itself, table stakes
11 12 13      the roster - the differentiator
08 09 14      skins, canvas, polish - chrome
16 17         title screen, trainer card
15            ship
```

**Why the roster moves ahead of the chrome.** A portfolio that fifty people are inside is
unlike any other portfolio; skins and a canvas background make it prettier but not different.
Ticket 11 is blocked only by 02, so the roster has been takeable since the shell landed. Left
in its original position it is the work most likely to be abandoned when energy runs out - and
losing it means shipping a good-looking Pokedex portfolio with no roster, which is exactly the
generic outcome the whole design is trying to avoid.

## Dependency graph

```
01 - 02 - 03 -+- 04 -+
              +- 05 -+
              +- 06 -+- 10 -+
              +- 07 -+      |
                   +- 08 - 14 -+- 16
        02 - 09                |
        02 - 11 - 12 - 13 -----+- 15
        (18 and 17 unblocked)
```

Tickets 04 to 07 run in parallel once 03 is done. Tickets 09, 11, 17 and 18 unblock directly.

**Deploy after 03.** A live site with one good entry beats a half-finished community feature.
