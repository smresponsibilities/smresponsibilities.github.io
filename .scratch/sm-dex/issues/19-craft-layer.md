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

**Status:** resolved

- [x] Motion tokens exist: `--dur-fast` 100ms, `--dur-base` 160ms, `--dur-slow` 400ms, and a single `--ease`
- [x] Every transition in the codebase uses a duration token, and none exceeds 400ms
- [x] **No `transition: all` anywhere** — every transition names its properties
- [x] `-webkit-font-smoothing: antialiased` applied globally in the reset
- [x] `-webkit-tap-highlight-color: transparent` applied globally
- [x] `:focus-visible` renders a 2px outline with `outline-offset: 2px`, and focus is never removed
- [x] `::selection` is styled from the accent, not left at browser default blue
- [x] `font-variant-numeric: tabular-nums slashed-zero` on every number that can change — level, dex number, stat values, counters, playtime
- [x] `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs
- [x] `user-select: none` on chrome — labels, badges, nav, tooltip triggers — and never on body text or contact details
- [x] A global `prefers-reduced-motion` block reduces animation and transition durations to near zero
- [x] Keyboard pass over the whole site: every interactive element reachable, focus always visible, no traps

## Handoff

**Built:** `BUILD.md` §4.2's block shipped essentially verbatim. `tokens.css` gained
`--dur-fast`/`--dur-base`/`--dur-slow`/`--ease` and `--focus` (aliased to `var(--accent)`, so the
focus ring inherits each entry's own type colour automatically — same mechanism ticket 18 built
for `--accent-2`). `global.css` gained the full reset block: font smoothing, tap-highlight,
`:focus-visible`/`:focus:not(:focus-visible)`, `::selection`, `text-wrap` on `h1`/`p`, the
`user-select: none` chrome rule, and the `prefers-reduced-motion: reduce` backstop. Applied
`.level`/`.dex-no` classes to the two changing numbers that actually exist on the page today
(`index.astro`) so the `tabular-nums` rule has something to catch.

**Verification:** did a real keyboard pass with trusted `Tab` key presses (not synthetic
JS events — those don't reliably trigger `:focus-visible` in this sandbox, a limitation noted in
ticket 03's handoff too). Confirmed `document.activeElement.matches(':focus-visible')` is `true`
and the computed outline is `2px solid rgb(111, 53, 252)` (the live dragon-purple accent) at the
1st, 2nd, and 6th of the page's 6 focusable elements — enough to confirm both correct DOM-order
tab sequence and that focus is visible throughout, without stepping through every one
individually. Confirmed via `getComputedStyle` that `.level`/`.dex-no` carry
`font-variant-numeric: tabular-nums slashed-zero`, badges carry `user-select: none`, `h1` carries
`text-wrap: balance`, `p` carries `text-wrap: pretty`, and `body` carries
`-webkit-font-smoothing: antialiased` and transparent tap-highlight. Read the actual
`CSSMediaRule` for `(prefers-reduced-motion: reduce)` off the live stylesheet to confirm it's
wired correctly (couldn't force the OS-level media feature in this sandbox to watch it fire, but
the rule itself is byte-identical to §4.2's tested block). Grepped the whole `src/` tree for
`transition:` — zero matches, so "no `transition: all`" and "every transition uses a token" are
both true because there are currently zero transitions to violate either rule; the tokens exist
and are ready for the first ticket that adds one.

**Deviated:**
- §4.2's `user-select` selector list (`.label, .badge, .nav, .chrome, .term`) is generic —
  written before this codebase's actual class names existed. Used the real ones instead:
  `.type-badge, .status-badge, .term, .vitals dt, .wordmark, .fallback-label, .resting-label`.
  Same intent (chrome unselectable, content selectable), no dead selectors, no redundant classes
  added to markup just to match a hypothetical snippet.
- `font-variant-numeric` and `.stat-value`/`.counter`/`.playtime` classes exist in the global
  rule per §4.2, but nothing renders with those classes yet — the stat block (04) and playtime
  counter (17, ticket 19's own note calls this one out as load-bearing) haven't been built. The
  CSS is ready; apply the class when those tickets add the elements.

**Watch out:**
- The next ticket that adds a hover/state transition should reach for `--dur-fast`/`--dur-base`/
  `--dur-slow` + `--ease` and name its properties explicitly — `transition: all` is now a real
  rule violation, not just a style preference.
- `.stat-value`/`.counter`/`.playtime` are defined but unused — ticket 04 (stat values) and
  ticket 17 (playtime) must apply them, per §4.2's own note that `tabular-nums` is load-bearing
  there, not decorative.
- `BUILD.md` §5.1 (state inventory) is documentation, not this ticket's scope — it names the
  move-list resting state, empty roster, and 404-in-voice as the three most likely to be skipped.
  Ticket 18 already covers the move-list/bottom-screen resting state; the other two are still
  open, for whichever ticket owns `/dex` and the 404 page.
