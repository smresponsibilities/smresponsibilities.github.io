# Ticket 55 UI corrections

## Source of the restoration

The baseline is the existing code in `../prototypes/ticket-35-flat-threejs/flat.js`,
`style.css`, `screens.js` and `model.js`. The original comparison remains available.
The browser test compares cap colors, shadows, radii, widths, heights and positions against
that running implementation. The earlier ticket 54 check omitted the four-unit cap height
clearance; revision 55 restores it.

The original screen palette and regular Departure Mono sizes inform the DOM screen UI.
The DOM retains the current real portfolio entries and clickable rows. It does not copy
the original comparison's placeholder content. Short apertures get compact menu rows;
entry content can scroll without moving the navigation outside the glass.

## Diagnosed causes

- Shared menu spacing required more height than the screen apertures offered. The initial
  browser run measured outer overflow of 37, 31, 65 and 27 units for Gen I, II, III and IV.
- Gen II's directional pad reached the lower screen bezel. The pad and adjacent buttons
  now sit below it, with one shallow SVG well per button.
- Gen IV compressed its SVG panel vertically, but the DOM aperture and control targets
  still used the untransformed coordinates. The bezel, aperture, pad and mounting wells
  now use the same stage coordinates. The side pod illustration keeps its established shape.
- Gen II–V had extra DOM mounting wells, glossy gradients and glints on top of their SVG
  wells. The restored cap treatment removes those duplicate layers.
- The viewport-height scale shrank pixel text even on wide desktops. The drawing now uses
  its full authored width when space permits. Clipping the stage's overflow also prevents
  an invisible reflected rear face from widening the page at tablet widths.

## Gen V color correction

The existing `restart/references/g5-01.png` is the source artwork. Its original attribution
is supported by the [official Japanese Black/White page](https://www.pokemon.co.jp/series/bw/story/story02.html).
The page identifies separate red and pink variants. The study keeps the selected red-orange
variant across its inferred slider poses.

The earlier rails were blue-white and the lower shell was yellow-orange. Revision 55 uses
warm gray rails, darker neutral display frames, charcoal diagonal bands and a red-orange
shell. These are visual matches, not colorimetric measurements. No new physical motion is
claimed. Before and after images are `ticket-55-black-before.png` and `ticket-55-black-after.png`.

## Verification

`node .scratch/sm-dex/research/ticket-55-review.mjs before` reproduced the clipping and cap
regressions. The `after` run has no outer screen overflow, cap gradients or screen/control
collisions for Gen I–IV.

`ticket-55-interactions.mjs` checks exact Gen I cap parity, all 47 hardware targets,
press cancellation, closed control isolation, state resume and ten generation layouts at
1440, 768, 390 and 320px. Mobile exposes full-size readable controls. `ticket-55-layout.mjs`
checks 150 entry pages across Gen I–V, Gen II/IV frame alignment and real animated endpoints.
No browser page errors occurred. JavaScript syntax checks and all 53 SVG parses pass.

Open, detail, mobile and closed captures were inspected for the corrected Gen II/IV cases.
Real touch devices, other browser engines and screen-reader behavior were not checked in
this pass. Visual acceptance remains the user's judgment.
