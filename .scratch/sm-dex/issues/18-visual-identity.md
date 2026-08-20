# 18: Visual identity - display font, palette, resting state

**What to build:** Three fixes that together stop the site reading as every other Pokedex portfolio. All
three are unblocked, all three are token-level, and together they are the difference between a
site that looks like itself and a site that looks like a genre.

**1. The display font.** No `@font-face` is registered anywhere right now, so every heading
falls back to the body sans stack and the site has none of the character the design depends on.

Use **Departure Mono**, *not* Press Start 2P. Press Start 2P is the most heavily used pixel
font on the web - both reference sites studied for this project use it, and choosing it
guarantees the result reads as generic retro. Departure Mono is MIT licensed, monospaced, and
reads as a technical instrument rather than an arcade cabinet, which is much closer to what
this content actually is. Source: `github.com/rektdeckard/departure-mono`, release v1.500.

**2. The palette.** `--accent` is currently electric yellow, which belongs to no part of this
entry. The palette is meant to follow the entry's own typing - Dragon and Steel. Purple and
steel is instantly not the red-and-white Pokedex everyone else builds, and it comes free from
data that already exists.

**3. The bottom screen** renders as a 35px empty bordered box, which reads as broken rather
than as minimal. Real dexes have a resting state.

**Reference measurements** (`PLAN.md` §11, `BUILD.md` §4.1): professional designer portfolios
run 1-2 font families, three text colours, two weights, zero shadows, and **three to five font
sizes with very large jumps between them** - one goes 14px straight to 85px. This site
currently uses six sizes including both 12px and 13px, which are indistinguishable. Scale
discipline accounts for more of the perceived quality gap than any amount of animation.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Departure Mono is self-hosted and subset to latin, never fetched from a third party at runtime
- [x] `font-display: swap` so text is never invisible while the face loads
- [x] Applied to the wordmark, headings and dex chrome only - never to body copy
- [x] `--font-display` is actually referenced; no dead token remains
- [x] A type scale is defined in tokens and replaces the current ad-hoc sizes
- [x] Nothing renders below 12px
- [x] The accent and supporting colours derive from the entry's own types, not a generic yellow
- [x] Changing the entry's types in data visibly changes the site's accent
- [x] The bottom screen has a resting state instead of an empty bordered box
- [x] Contrast still passes WCAG AA for body text after the palette change

## Handoff

**Built:** Downloaded Departure Mono v1.500 from the GitHub release, subset with `fonttools`
(`pyftsubset`) to the standard Google-Fonts-style latin unicode range, output straight to woff2
— `public/fonts/departure-mono-latin.woff2` (6.3 KB, 334 glyphs, down from the 22.5 KB/1186-glyph
full release build). License text copied alongside as `public/fonts/DepartureMono-LICENSE.txt`
(OFL requires the license accompany any redistribution, including a subset). `@font-face`
registered in `global.css` with `font-display: swap`, pointing only at that local file.

`tokens.css` gained the exact five-token scale BUILD.md §4.1 specifies —
`--fs-label`/`--fs-body`/`--fs-head`/`--fs-name`/`--fs-mega` (12/15/24/40/72px), plus
`--lh-body`(1.5)/`--lh-head`(1.25)/`--track-label`(0.08em) — and `--accent`/`--accent-2`, aliased
to `var(--t-dragon)`/`var(--t-steel)` as the site-wide fallback. **Note on sequencing:** the
first pass of this work used an invented five-step scale (`--text-xs` through `--text-xl`,
12/13/16/24/32) before §4.1 landed in `BUILD.md` mid-session with a concrete, "not negotiable"
scale — including the specific warning that 12px next to 13px is "noise, not a scale," which the
first draft had just reproduced. Everything below describes the final state, conforming to
§4.1; nothing of the first draft survived except the general shape (five tokens, one covering
every size).

Every hard-coded `font-size` in the codebase now references the scale, including the 9px
`Sprite.astro` fallback caption, which was below the accessibility floor — raised to
`--fs-label`. `font-family: var(--font-display)` is applied to `h1`, the wordmark, `.vitals dt`
field labels, `TypeBadge`, the status badge, and the sprite fallback; values, species text and
tooltip copy stay on `--font-body`. Per §4.1's "uppercase + tracking" rule, every label-tier
element (`TypeBadge`, status badge, `.vitals dt`, the sprite fallback caption, `STANDBY`) got
`text-transform: uppercase` and `letter-spacing: var(--track-label)`, replacing ad-hoc
`0.04em`/`0.05em` values. `body` and `h1` carry `--lh-body`/`--lh-head` respectively.

`Base.astro` takes an optional `accentTypes` prop; when present it renders an inline `style` on
`<html>` overriding `--accent`/`--accent-2` from the given types' canon colours, so the
mechanism generalizes to every future roster entry (ticket 13), not just this one. `index.astro`
passes `accentTypes={me.types}`. `Screen.astro` now checks `Astro.slots.has('bottom')` and
renders a `STANDBY` resting state (a small dot in `--accent-2` that blinks under
`prefers-reduced-motion: no-preference`, static otherwise) instead of an empty box when nothing
has filled the bottom screen yet — this will silently stop rendering the moment a real ticket
(04+) fills that slot, no follow-up needed.

**Verification:** confirmed `document.fonts` reports `Departure Mono` `loaded` and `h1`'s
computed `font-family` resolves to it, at `40px`/`50px` line-height (1.25× — correct). Confirmed
`font-display: swap` on the actual `CSSFontFaceRule`. Proved the dynamic-accent claim by
temporarily changing `me.json`'s types to `fire`/`water`, rebuilding, and reading
`--accent`/`--accent-2` off `documentElement` — they changed to `#ee8130`/`#6390f0` exactly, then
reverted back to dragon/steel. After the §4.1 rework, scanned every leaf element on the rendered
page for its computed size: exactly four distinct values appeared (12, 15, 24, 40 — `--fs-mega`
isn't used by anything yet, which is fine, five tokens is a ceiling not a quota), zero below
12px. Computed WCAG contrast ratios by hand (relative luminance, not a browser extension) for
`--ink`/`--dim` against `--bg`/`--panel`/`--screen` — lowest was 6.15:1, comfortably above the
4.5:1 AA floor for normal text (none of the changed tokens are used for body text colour, so
this was a regression check, not an expected-to-fail one). Re-checked no horizontal scroll at
375/768/1280px after the rework too, since `h1` grew from 32px to 40px — still clean at all
three.

**Deviated:**
- Ticket text says Departure Mono is "MIT licensed." The actual release `LICENSE` file is SIL
  OFL 1.1 (no Reserved Font Name declared, so subsetting under the original name is fine). Same
  category of correction as `DECISIONS.md` §P6's Astro-version note — worth fixing in
  `DECISIONS.md`/ticket text at some point, not blocking anything.
- `BUILD.md` §4's own literal code snippet for `tokens.css` still shows `--accent: #F7D02C;` as a
  static value, unchanged by the §4.1 edit (which only touched typography). That reads as a
  copy-paste artifact — whoever wrote §4.1 pasted the pre-`DECISIONS.md`-§Q3 version of the
  tokens block as their base — not a reversal of the dynamic-accent decision, which
  `DECISIONS.md` §Q3 and this ticket's own checklist state unambiguously. Implemented the
  dynamic version; flagging the stale snippet so nobody "fixes" `Base.astro` back to match it.
- Drew the chrome/body line for the display font as: field labels, badges, wordmark and headings
  are chrome (short, fixed Pokédex jargon); rendered values, species text, and tooltip copy are
  content and stay on the body font. §4.1 doesn't spell this out explicitly; recorded here so
  it's not silently re-decided differently later.
- Assigned the wordmark to `--fs-head` (24px) rather than a smaller label size — it's the one
  piece of branding chrome on every page, and 12px read as insignificant for that role. Judgment
  call, not dictated by §4.1.
- Added `--screen-min-h` (96px) to `tokens.css`'s structure group so the resting state has room
  to sit in — same category as `--tap`/`--device-max` from ticket 02, an additive structural
  token, not a deviation from the locked colour palette.
- The resting state is built into `Screen.astro` itself (conditional on the `bottom` slot being
  empty) rather than as a separate component, since it has exactly one caller today and no
  configuration surface — YAGNI. If a second call site ever needs a different resting message,
  that's the trigger to extract it.

**Watch out:**
- `Screen.astro`'s resting state disappears automatically once any ticket passes a `bottom` slot
  — nothing to remove later, just build normally.
- `Base.astro`'s `accentTypes` prop is optional and unused by any page but `index.astro` right
  now. Ticket 13 (roster entries) should pass each entry's own `types` the same way rather than
  inventing a second mechanism.
- The font subset only covers the standard latin range (Basic Latin + Latin-1 Supplement +
  general punctuation, matching Google Fonts' own "latin" subset definition). If a future ticket
  needs a display-font character outside that range, resubset from
  `public/fonts/DepartureMono-LICENSE.txt`'s companion release, not a napkin unicode range.
