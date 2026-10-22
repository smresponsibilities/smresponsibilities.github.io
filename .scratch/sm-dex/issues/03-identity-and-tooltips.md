# 03: Identity block and tooltip primitive

**What to build:** The top screen shows a recognisable dex header: pixelated sprite, both type badges in canon
colours, current level, availability status, height, weight, species and dex number.

This ticket also ships the tooltip primitive every later ticket depends on. Any Pokedex term
explains itself in portfolio language on hover, on tap, and on keyboard focus. Legibility is
built in from here rather than bolted on at the end, so every later ticket carries its own
tooltips in its acceptance criteria.

**Blocked by:** 02

**Status:** resolved

- [x] Sprite renders from the GitHub avatar, pixelated, with no image file in the repo
- [x] A missing or deleted avatar falls back to the UNIDENTIFIED SPECIES frame
- [x] Level is computed from a start date, not hard-coded, and advances on its own each month
- [x] Type badges use the canon colours from tokens
- [x] Tooltip opens on hover, on tap, and on keyboard focus; Escape and outside-click close it
- [x] Terms covered: level, species, status, both type badges
- [x] No information exists only inside a tooltip

## Handoff

**Built:** `Sprite.astro` (GitHub avatar, `image-rendering: pixelated`, error-triggered
`UNIDENTIFIED SPECIES` fallback frame — no image asset in the repo). `lib/level.ts` exactly per
BUILD.md §6.6 (hard-coded start date, computed level, capped 0–100). `Term.astro`: native
Popover API for tap-toggle/Escape/outside-click, plus hover and keyboard-focus listeners (Tab
alone reveals it, matching the standard ARIA tooltip pattern — not just Enter/Space activation)
bound through `astro:page-load` so it survives `ClientRouter` transitions. `index.astro`'s top
screen now renders sprite, both type badges, name, species, dex no., level, status and
height/weight, all from `me.json` (extended with `github`, `dexNo`, `status`, `height`,
`weight`, validated by the schema in `lib/me.ts`). Every term in the "Terms covered" list is the
visible value itself (e.g. the `DRAGON` badge text is both the display and the tooltip trigger),
so nothing is tooltip-only per the last checkbox.

**Verification:** hover/keyboard-focus were checked by dispatching synthetic `mouseenter`/
`focus`/`blur` events at the handler and confirming `:popover-open` state flips correctly — real
trusted hover/focus events don't reliably fire in this sandbox's non-visible browser tab
(`document.hasFocus()` is `false` there), so this confirms the wiring, not the browser's native
event delivery, which is standard and not this codebase's concern. Tap was verified with a real
`.click()`. Escape and outside-click were not independently re-proven (same trusted-event
limitation) — both are native Popover API guarantees BUILD.md §6.4 already relies on
("Do not rebuild it"). The avatar fallback was verified by forcing a real network error against
an invalid host and confirming the image hides and the fallback frame shows.

**Deviated:**
- Found and fixed a real bug during testing: `.sprite-fallback { display: flex }` beat the
  browser's built-in `[hidden] { display: none }` (author styles always win over UA styles at
  equal specificity), so the fallback rendered even while `hidden` was set. Fixed with an
  explicit `.sprite-fallback[hidden] { display: none; }` rule.
- BUILD.md §6.2's reference `Sprite.astro` uses an inline `onerror="..."` attribute. Swapped for
  `addEventListener('error', ...)` inside a `<script>` bound via `astro:page-load` (same pattern
  as `Term.astro`'s hover/focus binding) — the inline attribute silently no-ops in this sandbox's
  browser tool (consistent with CSP blocking inline event-handler attributes; confirmed by
  finding `typeof img.onerror === 'function'` but calling it did nothing). Zero npm dependencies
  either way; this is more consistent with `Term.astro`'s own script pattern besides.
- `Term.astro` gained a `hasCustomTrigger`/default-slot path beyond BUILD.md §6.4's exact
  snippet, so `TypeBadge` and the status badge can be the visible trigger (their own styling)
  while still getting full popover mechanics. A blanket `.term` class (dotted-underline text)
  would have clashed with badge styling; `.term--plain { all: unset }` lets slotted content fully
  own its appearance. Plain-text terms (`Lv.`, `SPECIES`) still render through the original
  `label`-only path unchanged.
- Added `github`, `dexNo`, `status`, `height`, `weight` to `me.json`/`lib/me.ts`'s schema.
  `title`, `gender`, and `OT`/ball fields from BUILD.md §10's locked list are still not rendered
  — out of this ticket's checklist, left for whichever ticket needs them (encounters: 06 needs
  OT/ball; nothing yet claims `title` or `gender`).

**Watch out:**
- `Term.astro`'s default slot convention: pass a `label` (used for `aria-label` and as the
  fallback trigger text) plus either nothing (renders `label` as underlined text) or a child
  element (renders the child as-is, unstyled by `.term`). Reuse this for any future badge-style
  term instead of inventing a second tooltip pattern.
- The two hidden style/script bugs above were both sandbox-testing catches, not something a
  human tester would immediately hit locally — but the `[hidden]` specificity trap is a general
  CSS gotcha worth remembering for any future component that toggles visibility via the `hidden`
  attribute rather than a class.
