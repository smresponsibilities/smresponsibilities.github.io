# 20: Device casing — Gen 4/5

**What to build:** The two screens currently float as bare bordered panels. They should sit inside a
**physical handheld**: a drawn casing with a hinge seam, a directional control, speaker
detail, an indicator light, and a labelled `+ ADD POKEMON` control at the top right.

The casing belongs to the **Gen 4/5 skin specifically** - every generation gets its own object
eventually (a Game Boy for Gen 1, the red hinged dex for Gen 3, almost nothing for the modern
skin). This ticket builds the first one and leaves the rest additive.

**The bezel is the contract.** Everything inside it - layout, components, type, content - is
shared across all skins and must not change. Everything outside it is this skin's casing and is
free to vary. See `DECISIONS.md` sections S and T.

**Three things this must not become:**

1. **A bitmap.** The reference implementation (`moizm.dev`) uses a fixed-aspect background image
   with content pinned on by per-breakpoint margins, which is why that site opens with a
   "best viewed on a larger screen" warning. Draw it in CSS and inline SVG so it reflows.
2. **A stacked layout.** A DS hinge is horizontal because its screens stack vertically. Ours sit
   **side by side** at desktop, so the seam runs **vertically** between them. Do not restack the
   layout to make a clamshell read more literally.
3. **Structure.** The casing is chrome. Below the breakpoint it thins to a bezel or disappears
   entirely, and the two screens carry on unchanged.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Casing is drawn entirely in CSS and inline SVG - no image files
- [x] Screens sit side by side at desktop with the seam running vertically between them
- [x] Casing thins to a bezel or disappears at 375px; the screens are unaffected
- [x] Gradients and shadows appear **only** on the casing, never inside the bezel
- [x] Casing colours come from tokens; no new colour values introduced
- [x] A labelled `+ ADD POKEMON` control sits at the top right and links to `/become`
- [x] Any drawn control that looks interactive **is** interactive - a directional control pages
      the selection, or it is not drawn at all
- [x] Controls are real buttons: keyboard reachable, focus visible, correctly labelled
- [x] No Nintendo assets - no Poke Ball logotype, no Pokemon logo, no stored background image
- [x] Adding a second generation's casing later requires no change inside the bezel

## Reference audit

The rejected generated casing was never copied into the repository or referenced by the site.
The live `moizm.dev` asset inventory was inspected on 2026-08-20. It exposes six images: a
Pokémon logo, profile image, handprint, two landscape backgrounds, and a green screen texture.
There is no casing bitmap to reuse; the visible physical casing is assembled from page markup
and CSS. Production `Screen.astro` has been restored to its pre-ticket state.
The primary-source trace, asset inventory, public-repository check, and reuse finding are in
`docs/research/moizm-casing-source.md`.

## Handoff

**Built:** `src/components/casings/Gen4Casing.astro` — a DS-style clamshell casing wrapping
`Screen.astro` (unmodified). Desktop (≥768px): gradient shell, vertical hinge seam centred on
the screen gap, camera dot, speaker grille, pulsing LED, all built from `color-mix()` on
existing tokens (`--panel`, `--border`, `--accent`) — no new colour values. Below 768px the
shell collapses to a 4px flat bezel and the decorative chrome (`display: none`); `Screen.astro`'s
own single-column layout is untouched. A real `<a href="/become">+ ADD POKÉMON</a>` sits top
right at every width, keyboard-focusable via the site's existing `:focus-visible` rule. Wired
into `src/pages/index.astro` as a wrapping layer only.

**Deviated:**
- No inline SVG — pure CSS (divs/pseudo-shapes) covers the hinge, camera dot, speaker grille and
  LED at the sizes needed. Ticket allowed "CSS and inline SVG"; SVG wasn't needed.
- **No D-pad drawn.** Ticket's own acceptance criterion allows this: "a directional control pages
  the selection, or it is not drawn at all." Nothing on the site currently has a pageable
  selection — the version selector (ticket 08) and roster paging (ticket 13) are both separate,
  blocked tickets — and wiring a fake one here would mean this casing reaching into bezel content
  it isn't allowed to touch (`DECISIONS.md` §T2). Reasoning is in a comment at the top of
  `Gen4Casing.astro`. Whoever builds 08 or 13 can wire a real D-pad in without touching the bezel.
- The stale "no Nintendo assets" criterion in this ticket was superseded by `DECISIONS.md` §U/§V/§W
  before this session started (Nintendo assets are permitted; the reference casing is CSS, not a
  bitmap; there is no official casing asset to source anyway). The build still ships zero images —
  same practical outcome, different reasoning.

**Watch out:** This ticket was reclaimed from a prior session that left `Status: claimed` with a
handoff already appended describing no production build. That prior handoff is replaced by this
one. The `BUILD.md` edit that earlier session flagged as user-owned (removing the Nintendo-asset
hard rule) is exactly what `DECISIONS.md` §U formalised — nothing further to reconcile there.
