# 40: Leftward angle and inverse hybrid

Status: resolved
Type: prototype
Priority: highest

## Question

Does a slightly stronger leftward Three.js angle read better, and how does the device feel with
the Three.js casing paired with the flat version's button treatment?

## Scope

- Adjust only the shared Three.js angled pose and its fit.
- Add a fourth shareable comparison variant: Three.js casing plus flat-style buttons.
- Keep every control independently pressable and projected from the same 3D coordinates.
- Preserve the current screen filtering, blue indicator, lid, power and input semantics.
- Verify front/angle, closure, power, gaps, target drift and phone/desktop fit.

## Approach

The fourth version uses the existing Three.js scene and projection. User review rejected the first
one-unit unlit caps because they looked printed onto the casing. The final comparison keeps the
flat version's simpler colours and forms but gives each control a matte seven-unit slab, dark well,
dark geometry edge and restrained highlight. They remain actual scene objects, so angled visuals
and native hit targets cannot separate. This is a visual inverse of the existing hybrid, not a DOM
overlay pretending to share the 3D camera.

## Answer

The stronger leftward pose reads clearly without changing the front or hinge views. The inverse
hybrid works only when “flat-style” describes its face treatment, not its physical depth. Raised
slabs preserve the requested visual family while making every control visibly pressable.

## Handoff

**Built:** Added the left-biased angled pose and shareable `shell-flat` fourth variant. Deepened and
outlined both full-Three button treatments after visual review; both pass 63/63 checks on desktop
and at 375 × 774.
**Deviated:** The ticket's initial unlit one-unit caps were rejected during review. Final caps use
low-shine lit materials, seven-unit depth and dark wells so they read as controls.
**Watch out:** Passing checks do not mean visual approval. Keep the fourth version inside the shared
Three.js scene; replacing it with DOM caps would break angled projection and lid coherence.
