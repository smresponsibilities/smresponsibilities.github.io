# Ticket 65: portfolio polish, content guide, and loader facts

Status: resolved

## Request

Expose more of the fixed pixel background through glass, theme scrollbars and Rotom effect controls,
roll the Poké Ball with the opening slider, refine the Python loader, simplify the public submission
schema, rotate additional loader facts, and document project and experience editing.

## Acceptance

- [x] Background remains clearly visible through readable glass surfaces on desktop and mobile.
- [x] Header spans viewport; content sections are rounded, separated, and use no backdrop blur.
- [x] Favicon renders `SM` in legible 8-bit lettering.
- [x] Device and generation scrollbars use coherent pixel Pokédex styling.
- [x] Slider Poké Ball visibly rolls as lid progress changes.
- [x] Rotom effect controls match the device theme and expose clear pressed/disabled states.
- [x] Python loader is centered in a larger orbit and visibly rotates when motion is allowed.
- [x] Loader uses `FACT`, then shows a second randomly selected fact sourced from portfolio content.
- [x] Add Pokémon removes generation and adds an optional fact/tip field to the GitHub issue body.
- [x] A concise guide explains how to add projects and experience entries.
- [x] Build and focused interaction gate pass.

## Handoff

**Built:** Replaced blurred surfaces with clear rounded panels, widened the header, added an SM
favicon, themed scrollbars and Rotom effects, rolled the slider ball, refined the loader, simplified
the submission form, added rotating dex facts, and documented portfolio content editing.
**Deviated:** Removed backdrop blur entirely after user feedback; retained low-alpha solid fills for
text contrast over changing time-of-day art.
**Watch out:** GitHub Pages from a private repository requires a paid plan; the deployed site itself
remains public unless enterprise Pages access control is configured.
