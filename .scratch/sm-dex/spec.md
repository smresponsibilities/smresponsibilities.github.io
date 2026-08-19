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

## Order

```
01 - 02 - 03 -+- 04 -+
              +- 05 -+
              +- 06 -+- 10 -+
              +- 07 -+      |
                   +- 08 - 14 -+
        02 - 09                |
        02 - 11 - 12 - 13 -----+- 15
```

Tickets 04 to 07 run in parallel once 03 is done. Tickets 09 and 11 unblock directly off 02.
The widest frontier is five tickets.

**Deploy after 03.** A live site with one good entry beats a half-finished community feature.
