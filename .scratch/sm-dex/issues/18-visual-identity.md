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
`tokens.css` gained a five-step type scale (`--text-xs` 12 through `--text-xl` 32, one step per
size actually in use) and `--accent`/`--accent-2`, aliased to `var(--t-dragon)`/`var(--t-steel)`
as the site-wide fallback. Every hard-coded `font-size` in the codebase now references the
scale, including the 9px `Sprite.astro` fallback caption, which was below the accessibility
floor — raised to `--text-xs`. `font-family: var(--font-display)` is now applied to `h1`, the
wordmark, `.vitals dt` field labels, `TypeBadge`, the status badge, and the sprite fallback —
values and tooltip/body text stay on `--font-body`. `Base.astro` takes an optional `accentTypes`
prop; when present it renders an inline `style` on `<html>` overriding `--accent`/`--accent-2`
from the given types' canon colours, so the mechanism generalizes to every future roster entry
(ticket 13), not just this one. `index.astro` passes `accentTypes={me.types}`. `Screen.astro`
now checks `Astro.slots.has('bottom')` and renders a `STANDBY` resting state (a small dot in
`--accent-2` that blinks under `prefers-reduced-motion: no-preference`, static otherwise) instead
of an empty box when nothing has filled the bottom screen yet — this will silently stop
rendering the moment a real ticket (04+) fills that slot, no follow-up needed.

**Verification:** confirmed `document.fonts` reports `Departure Mono` `loaded` and `h1`'s
computed `font-family` resolves to it. Confirmed `font-display: swap` on the actual
`CSSFontFaceRule`. Proved the dynamic-accent claim by temporarily changing `me.json`'s types to
`fire`/`water`, rebuilding, and reading `--accent`/`--accent-2` off `documentElement` — they
changed to `#ee8130`/`#6390f0` exactly, then reverted back to dragon/steel. Scanned every
leaf element on the page for `font-size < 12px` — zero violations. Computed WCAG contrast ratios
by hand (relative luminance, not a browser extension) for `--ink`/`--dim` against
`--bg`/`--panel`/`--screen` — lowest was 6.15:1, comfortably above the 4.5:1 AA floor for normal
text (none of the changed tokens are used for body text colour, so this was a regression check,
not an expected-to-fail one). Re-checked no horizontal scroll at 375/768/1280px, since a
monospace display face could plausibly widen badges enough to overflow — it didn't.

**Deviated:**
- Ticket text says Departure Mono is "MIT licensed." The actual release `LICENSE` file is SIL
  OFL 1.1 (no Reserved Font Name declared, so subsetting under the original name is fine). Same
  category of correction as `DECISIONS.md` §P6's Astro-version note — worth fixing in
  `DECISIONS.md`/ticket text at some point, not blocking anything.
- The ticket doesn't specify exact type-scale steps or which elements count as "dex chrome."
  Built the scale to exactly replace the six ad-hoc sizes `DECISIONS.md` §P2 measured (9→12, 12,
  13, 16, 24, 32), and drew the chrome/body line as: field labels, badges, wordmark and headings
  are chrome (short, fixed Pokédex jargon); rendered values, species text, and tooltip copy are
  content and stay on the body font. This is a design call this ticket left open, recorded here
  so it's not silently re-decided differently later.
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
