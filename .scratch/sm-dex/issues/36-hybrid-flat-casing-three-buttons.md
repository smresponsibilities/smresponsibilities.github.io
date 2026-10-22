# 36: Hybrid flat casing and Three.js controls

Status: resolved
Type: prototype
Priority: highest

## Request

Add a third comparison using the defined flat casing with genuine Three.js controls. Improve the
existing Three.js version so round controls and the connected D-pad read as pressable objects,
and strengthen casing edge definition, lighting and depth separation.

## Scope

- Keep the flat casing silhouette, screen placement and shared portfolio state.
- Add a `?variant=hybrid` view: flat casing plus Three.js-rendered button caps.
- Give circular controls deeper, bevel-lit cap geometry and an explicit recessed well.
- Give the connected D-pad a recessed well, raised cross and directional face marks while keeping
  four independent hit regions and an inert centre.
- Improve Three.js casing outline contrast and studio lighting without changing the geometry map.
- Preserve fixed native targets, four-unit press travel, ripple feedback, closing, reduced motion,
  keyboard access and all current checks.
- Verify all three variants at desktop and mobile sizes. Do not change production or claimed tickets.

## Skill decisions

Extend the existing UI prototype with a requested third variant. Use one transparent on-demand
Three.js overlay for the hybrid rather than duplicating the flat shell geometry. Keep native HTML
buttons as the interaction layer; WebGL remains visual state only.

## Answer

The existing comparison route now has `?variant=hybrid`. It combines the flat casing and live
screens with the same Three.js caps used in the revised full-3D version. A depth-only lid mask
prevents hidden controls from showing through the flat exterior. The switcher has three entries
and preserves portfolio, power and lid state.

Circular caps have nine-unit lathed profiles with bevelled shoulders and dark collars. The D-pad
has an eleven-unit connected extrusion, a recessed well and raised directional marks. Presses
still travel four model units while the native targets stay fixed. Holding a cap darkens its own
material; release ripples and reduced-motion acknowledgement remain separate.

Two depth mistakes caused weak definition: lid strokes and D-pad marks sat under bevelled faces.
They now sit above those faces. Casing contours use dark geometry strokes, with key/rim lighting.
The full-3D hinge opens inner faces coplanar and closes them 36 units apart to accommodate taller
controls. This is reconstructed geometry, not a canonical measurement or collision simulation.

All three variants pass 56/56 scripted assertions at 375, 768 and 1280px. Native clicks on all
23 controls in hybrid and full 3D accept exactly once, with four-unit cap travel and zero target
drift. Thirteen keypad gaps plus the D-pad centre remain inert. Full 3D was retested after the
hinge change. The prototype README and `evidence/ticket36-*` record results and captures.

Primary prototype capture: `b874a52` on `codex/ticket36-hybrid-depth`. Only the existing prototype
folder and its new evidence were committed. Earlier research/cleanup and ticket/handoff changes
remain outside that capture. Authored JavaScript syntax and whitespace checks pass.

## Handoff

**Built:** Third hybrid variant, deeper round caps and connected D-pad, stronger full-3D casing
contours, and closing clearance for the taller controls. All work stays in the existing scratch
comparison; production and claimed tickets are untouched.

**Deviated:** The requested hybrid uses coded flat SVG casing plus real Three.js controls, not
raster casing assets. Hybrid follows flat projected closure, while full 3D uses its reconstructed
hinge. No new production decision is implied.

**Watch out:** Neither visual mode is approved final art. The remaining question is the user's
preference and source fidelity, not whether the controls activate. Static-server module URLs
are revisioned so old browser tabs load the new renderer after a reload.
