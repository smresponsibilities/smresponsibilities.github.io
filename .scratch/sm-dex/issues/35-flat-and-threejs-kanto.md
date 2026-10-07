# 35: Flat and Three.js Kanto comparison

Status: resolved
Type: prototype
Priority: highest

## Request

The user prefers the flat UI of ticket 26 and asks to build it ourselves from the references,
with one flat version and a second version using Three.js. This is a local scratch comparison.
The two requested variants override the prototype skill's default of three unrelated layouts.
The earlier request for tested independent controls and ripples remains in force.

## Scope

- Recreate the dark menu/list/detail screen treatment of `prototypes/ticket-26-og-controls/`.
- Draw new functional casing geometry and caps in code. Do not restore rejected imagery.
- Use the selected Kanto references for one consistent interpreted front elevation. Reference 1
  supplies the full control inventory; 5/6 guide the anime bezel treatment. This is a deliberate
  interpretation for comparison, not a claim that the references are pixel-identical.
- Share one coordinate/control manifest and portfolio state between flat and 3D renderers.
- Keep separately operable buttons, fixed targets, clipped feedback, keyboard access, explicit
  open/close, power separate from closure, and reduced motion. A connected D-pad has inert centre.
- Three.js adds extruded casing, real leaf ownership and depth. Unseen depth and hinge clearance
  are reconstructed, not canonical measurements. No triangular marking or invented triangle control.
- Verify both modes in the browser, including control results, cancellation, closure and sizing.
- Do not change production, claimed tickets 20/21, root dependencies, or publish a website.

## Skill decisions

Use the UI-prototype variant switcher on a new scratch route because the previous fit bench is a
different, retained experiment. Requested self-authored device UI uses SVG/DOM and Three.js mesh
geometry rather than image generation. Use a locally pinned Three.js runtime without changing the
root package. The Sites existing-project guidance applies; local scratch scope excludes hosting.

## Answer

Two runnable versions now live in `prototypes/ticket-35-flat-threejs/`, selected with
`?variant=flat` or `?variant=three`. Flat is the default. Both share the front-elevation coordinate
manifest, 23 native controls and the dark menu/list/detail state flow inspected in ticket 26.
The new SVG/DOM geometry loads none of the retired imagery. Three.js renders actual extruded
parts, screen textures and a right-hand physical leaf with a mirrored exterior, not a tilted
screenshot. Switching versions preserves selection, power and lid state.

Native browser clicks checked all 23 controls in each version with zero target/neighbour drift.
All 13 keypad gaps plus the D-pad centre stayed inert in the 3D view. A drag-off cancelled without
an action or ripple. Focused arrow/A/Escape/Enter navigation, reduced-motion clicks, closed control
isolation and exact entry resume were checked. The 56 scripted assertions pass for both versions
at 375, 768 and 1280px. No horizontal overflow. The phone readable view provides larger controls.
The final 3D scene reports 87 draw calls. A screen-depth overlap found during visual review was
fixed before the final evidence captures. See the prototype README and evidence folder.

This is a design comparison, not pixel-identical final art. It deliberately interprets reference
1's control inventory with the anime bezel from 5/6. Depth and the closing clearance are reconstructed.
The triangle remains omitted. No physical touchscreen or canonical full closing sequence is claimed.

Primary prototype capture is commit `a0f7b35` on `codex/ticket35-flat-threejs`. Only the new
prototype folder was included. Earlier research, cleanup and handoff changes remain uncommitted.
Authored files pass syntax and whitespace checks. The unmodified upstream Three.js core file has
one whitespace-check warning at line 48781; it was retained byte-for-byte rather than reformatted.

## Handoff

**Built:** Flat and genuine Three.js versions of the self-authored Kanto portfolio device, with
shared live content, independent controls, ripples, power, coherent lid ownership, and a larger
readable/control view. Both versions have recorded browser checks and source limitations.

**Deviated:** The latest request authorizes self-authored geometry for this comparison rather than
the older source-derived raster-only production contract. No production rule was silently edited.
The prototype has two requested variants instead of three. Three.js is locally pinned inside the
scratch folder; root dependencies remain unchanged. Four flat design units scale with the device;
3D caps depress four model units. These are reported separately from actual CSS displacement.

**Watch out:** Neither variant is approved final art. User preference between the two, source
fidelity, physical touch and canonical closing motion remain next review items. Tickets 20 and 21,
production files and the user's `.agents/` are untouched. Do not restore rejected image assets.
