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

**Blocked by:** 21 (the stack migration to Next + three.js)

**Status:** claimed

- [ ] The casing is a recognisable reproduction of the real device, built to the measured
      proportions in `docs/research/gen4-casing-geometry.md` - not an abstract shell
- [ ] Casing is drawn procedurally - no stored bitmap, no downloaded 3D model file
- [ ] Screens sit side by side at desktop with the seam running vertically between them
- [ ] Casing thins to a bezel or disappears at 375px; the screens are unaffected
- [ ] Gradients, shadows and 3D shading appear **only** on the casing, never inside the bezel
- [ ] Casing colours come from tokens; no new colour values introduced
- [ ] A labelled `+ ADD POKEMON` control sits at the top right and links to `/become`
- [ ] A directional control is drawn **and** works - it pages the selection
- [ ] Controls are real buttons: keyboard reachable, focus visible, correctly labelled
- [ ] Screen content stays real, accessible DOM - links, tooltips, selectable text
- [ ] Adding a second generation's casing later requires no change inside the bezel

## Reference audit

The rejected generated casing was never copied into the repository or referenced by the site.
The live `moizm.dev` asset inventory was inspected on 2026-08-20. It exposes six images: a
Pokémon logo, profile image, handprint, two landscape backgrounds, and a green screen texture.
There is no casing bitmap to reuse; the visible physical casing is assembled from page markup
and CSS. Production `Screen.astro` has been restored to its pre-ticket state.
The primary-source trace, asset inventory, public-repository check, and reuse finding are in
`docs/research/moizm-casing-source.md`.

## Rejected attempt — 2026-08-20

The first build of this ticket was **rejected by the user** and reverted. It shipped a CSS
casing that was a gradient rectangle with a hinge line, four speaker dots and an LED, and it
omitted the D-pad entirely. The user's verdict: *"why cant you either get the pokedex asset or
make 100% same pokedex without any mismatch, its just geometrical symbols."*

Two lessons, both binding on the next attempt:

1. **Build from measurement, not by eye.** The reference device's real proportions are now
   recorded in `docs/research/gen4-casing-geometry.md`. Use them.
2. **The "or it is not drawn at all" clause is not an escape hatch.** It exists to prevent dead
   decorative controls, not to license dropping the single most recognisable part of the
   device. Build the D-pad *and* give it real behaviour.

The user then directed a stack change — **remove Astro, move to Next.js, build the casing in
three.js** — which is filed as ticket 21 and now blocks this ticket. The rejected
`src/components/casings/Gen4Casing.astro` is deleted rather than ported.

## Superseded handoff — the rejected attempt

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
