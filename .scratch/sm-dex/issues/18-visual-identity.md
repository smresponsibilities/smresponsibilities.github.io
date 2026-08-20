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

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Departure Mono is self-hosted and subset to latin, never fetched from a third party at runtime
- [ ] `font-display: swap` so text is never invisible while the face loads
- [ ] Applied to the wordmark, headings and dex chrome only - never to body copy
- [ ] `--font-display` is actually referenced; no dead token remains
- [ ] A type scale is defined in tokens and replaces the current ad-hoc sizes
- [ ] Nothing renders below 12px
- [ ] The accent and supporting colours derive from the entry's own types, not a generic yellow
- [ ] Changing the entry's types in data visibly changes the site's accent
- [ ] The bottom screen has a resting state instead of an empty bordered box
- [ ] Contrast still passes WCAG AA for body text after the palette change
