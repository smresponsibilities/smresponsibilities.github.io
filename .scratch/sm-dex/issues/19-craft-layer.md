# 19: Craft layer

**What to build:** Roughly forty lines of CSS that account for most of the difference between a site that
looks designed and one that looks assembled. Individually none of it is visible. Collectively it
is the gap.

Every item below was measured on `linear.app` and `rauno.me` rather than assumed — the numbers
are in `PLAN.md` §12 and the rules are written out in `BUILD.md` §4.2. **None of it is in the
codebase**, because §4.2 was written after ticket 18 was already claimed.

Two of these are not polish:

- **`tabular-nums` is load-bearing.** Ticket 17's playtime counter ticks every second. With
  proportional digits the whole line shifts on every tick, and the bug gets blamed on the
  animation. The stat block has the same problem whenever a value changes.
- **`transition: all` must not appear anywhere.** It animates layout properties too, forcing
  reflow every frame, and is the usual cause of hover states that feel cheap. Linear names every
  transitioned property; this is the one place it is stricter than rauno.me and it is the one
  that matters.

Transitions are **100–200ms**. The most-used value across both reference sites is 160ms.
Developers reach for 300–500ms and it reads as lag rather than as polish.

**Measured on the running build**, so this is a defect list rather than a wishlist:

| Property | Ours now | Linear | rauno.me |
|---|---|---|---|
| `-webkit-font-smoothing` | **auto** | antialiased | global |
| `-webkit-tap-highlight-color` | **browser default** | transparent | kept deliberately |
| `font-variant-numeric` | **normal** | tabular-nums slashed-zero | — |
| `text-wrap` | **wrap** | balance + pretty | — |
| `::selection` rules | **0** | 1 | 2 |
| **`:focus-visible` rules** | **0** | 6 | 3 |
| transition durations | **none at all** | 0.1 / 0.16 / 0.4s | 0.15 / 0.2s |

**`:focus-visible` at zero is not polish, it is access.** On a dark custom theme the browser's
default focus ring can be effectively invisible, which makes the site unusable by keyboard. Do
this one first.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Motion tokens exist: `--dur-fast` 100ms, `--dur-base` 160ms, `--dur-slow` 400ms, and a single `--ease`
- [ ] Every transition in the codebase uses a duration token, and none exceeds 400ms
- [ ] **No `transition: all` anywhere** — every transition names its properties
- [ ] `-webkit-font-smoothing: antialiased` applied globally in the reset
- [ ] `-webkit-tap-highlight-color: transparent` applied globally
- [ ] `:focus-visible` renders a 2px outline with `outline-offset: 2px`, and focus is never removed
- [ ] `::selection` is styled from the accent, not left at browser default blue
- [ ] `font-variant-numeric: tabular-nums slashed-zero` on every number that can change — level, dex number, stat values, counters, playtime
- [ ] `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs
- [ ] `user-select: none` on chrome — labels, badges, nav, tooltip triggers — and never on body text or contact details
- [ ] A global `prefers-reduced-motion` block reduces animation and transition durations to near zero
- [ ] Keyboard pass over the whole site: every interactive element reachable, focus always visible, no traps
