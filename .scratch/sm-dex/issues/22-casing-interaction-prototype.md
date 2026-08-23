# 22: Component casing interaction prototype

**What to build:** Replace the rejected whole-image crossfade mock with a component-level
prototype of the supplied Pokédex design. Each physical control must be independently clickable,
must depress using the live Codédex interaction rule, and the right leaf must open and close around
the hinge rather than swapping between open and closed screenshots.

**Status:** resolved

- [x] The open casing is assembled from independently positioned Figma component exports.
- [x] The ten keypad cells, paired controls, D-pad, power control, screen control, and confirm
      control are independent native buttons.
- [x] Each button keeps a fixed depth layer and moves only its face down 4px over 100ms.
- [x] The right leaf rotates 180 degrees around the left hinge; it does not crossfade whole-device
      images.
- [x] The supplied closed reference is the back face and its existing yellow latch opens the device.
- [x] Power toggles the display; D-pad and other controls publish state in the minimal test dock.
- [x] Focus indicators, accessible names, inactive-face tab suppression, and reduced motion exist.
- [x] The browser console is clean after press, power, close, and reopen tests.

The live Codédex implementation research is in `docs/research/codedex-button-press.md`. The
single-file prototype is an OS-temporary artifact at
`C:/Users/sm/AppData/Local/Temp/sm-dex-casing-prototype.html`, currently served locally at
`http://127.0.0.1:4173/sm-dex-casing-prototype.html`. Its editable placeholder source is
`.scratch/sm-dex/casing-v2-template.html`. It is a design-validation prototype, not production
site code and not a resolution of ticket 20 or 21.

## Handoff

**Built:** A component-level Figma casing prototype with independently pressable controls, the
measured Codédex 4px press mechanism, and a real 3D hinge rotation between open and closed faces.
**Deviated:** The closed face uses the user-supplied raster reference because no closed Figma frame
was available; the open face and all interactive controls are separated SVG/DOM components.
**Watch out:** Tickets 20 and 21 remain claimed and were not edited. Do not copy the temporary
embedded assets into production until the stack/casing sessions reconcile the repository's asset
and implementation rules.
