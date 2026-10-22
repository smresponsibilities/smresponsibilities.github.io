# 02: Pokedex device shell

**What to build:** The page reads as a handheld device: two stacked screens, the top for the creature, the
bottom for lists and detail. On a phone the screens stack into a single column; on a desktop
they sit together. Nothing overflows sideways at any width. Moving between pages animates
rather than flashing white.

**Blocked by:** 01

**Status:** resolved

- [x] Two-screen layout; content from 01 renders inside the top screen
- [x] No horizontal scroll at 375, 768 and 1280 px
- [x] Touch targets at least 44 px
- [x] Page navigation animates instead of a hard reload flash
- [x] Layout uses tokens only - no hard-coded colours or sizes

## Handoff

**Built:** `src/components/Screen.astro` — the two-screen device shell, named `top`/`bottom`
slots, CSS grid: single column under 768px, side-by-side at 768px+ (`--device-max: 900px` caps
width). `src/pages/index.astro` now renders ticket 01's content (name, species, types) inside
the `top` slot; `bottom` is present but empty — later tickets (04+) fill it. Added
`<ClientRouter />` (from `astro:transitions`) to `Base.astro` so internal navigation soft-swaps
instead of hard-reloading. Added a `SM'S DEX` wordmark link in a new site-wide header in
`Base.astro`, sized to the new `--tap: 44px` token — this is the only interactive element the
shell introduces, and the concrete thing "touch targets ≥ 44px" and "page navigation animates"
were verified against.

**Verification:** resized the live preview to 375/768/1280 and read `document.documentElement.
scrollWidth` vs `clientWidth` at each — equal at all three, no horizontal scroll. Measured the
two `.screen` elements' bounding rects: stacked (same x, different y) at 375px, side-by-side
(same y, different x) at 1280px. Measured the wordmark link's rect: 78×44px. For the transition
claim: temporarily added a second page and an injected `<a>` to it, set a `window.__marker`
before clicking, confirmed the marker survived navigation (proof the DOM/JS realm wasn't torn
down — a hard reload would have wiped it) while `document.title` and `location.pathname`
updated correctly. Deleted the test page before committing; it was never part of the diff.

**Deviated:**
- Ticket's checklist doesn't ask for a header, but "page navigation animates" and "touch targets
  ≥ 44px" both need *something* clickable to mean anything, and the shell itself (`Screen.astro`)
  has no interactive elements. Added a minimal site-wide header (wordmark → `/`) in `Base.astro`
  rather than inventing unbuilt routes (`/become`, `/dex`, `/resume` are tickets 10–13) or a
  global `a, button { min-height: var(--tap) }` rule — the latter would force BUILD.md §6.4's
  small inline `Term.astro` tooltip triggers to 44px, which is wrong per spec. Any future nav
  links this header grows should size themselves the same way (min-height/width `var(--tap)`),
  not by adding a blanket selector.
- Added two tokens to `tokens.css`'s existing "structure" group: `--tap: 44px`, `--device-max:
  900px`. Consistent with what's already there (`--border-w`, `--radius`, `--gap`,
  `--screen-pad`); BUILD.md §4's lock is on the *colour* values, not on this section being
  closed to new structural constants.
- Breakpoints (375/768/1280) are hard-coded pixel values in `@media` queries, not tokens — CSS
  can't put a custom property inside a media condition without a PostCSS plugin, and this repo
  has zero build-time CSS tooling by design (BUILD.md §0). Ticket's "no hard-coded ... sizes"
  read as component dimensions (spacing, radii, tap targets), which are tokenized.

**Watch out:**
- `Screen.astro`'s `bottom` slot is empty on purpose. Whichever ticket fills it (stats: 04,
  moves: 05, encounters: 06) should render into `<Fragment slot="bottom">`, same pattern as
  `index.astro`'s `top` slot.
- Astro's router ignores any file under `src/pages/` whose name starts with `_` — don't reuse
  that prefix for a real route later expecting it to build.
- The header is currently just the wordmark. If a later ticket needs `VIEW AS PLAIN TEXT`
  (BUILD.md §5, ticket 10) or other header nav, add it here rather than creating a second header
  component — there's only meant to be one.
