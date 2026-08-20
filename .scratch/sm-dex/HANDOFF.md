# Handoff — 2026-08-20, ticket 20 reopened, ticket 21 opened

## State

Resolved: 01, 02, 03, 18, 19
Frontier: 04, 05, 06, 07, 08, 09, 11, 13, 17
In flight: 21 (stack migration), then 20 (device casing, blocked by 21)

## Last session

Ticket 20 was built as a CSS casing, marked resolved, and then **rejected by the user**: it was
a gradient rectangle with a hinge line, four dots and an LED, and it left the D-pad out
entirely. Their verdict was that a handheld is just circles, rounded rectangles and a cross, so
there is no excuse for it not matching the real device. That build has been deleted and
`index.astro` reverted; ticket 20 is reopened with tightened criteria.

Two things came out of the rejection and are now written down. First,
`docs/research/gen4-casing-geometry.md` records the reference device's real proportions,
measured off the live DOM at a 1600px viewport and normalised to ratios so the casing can be
fluid — the previous attempt was built by eye, which is why it missed. Second, ticket 20's
"a directional control pages the selection, **or it is not drawn at all**" clause was misread
as permission to drop the D-pad; it exists to prevent dead decorative controls, and the correct
response is to build the control and give it real behaviour.

The user then directed a stack change: **remove Astro, move to Next.js, build the casing in
three.js.** That is filed as ticket 21 and blocks ticket 20. Neither half breaks a rule —
`DECISIONS.md` §U2 permits Next, and `BUILD.md` §0.0.1 makes "canvas 2D over WebGL" a strong
default that may be overridden with a stated reason. The stated reason is that a flat drawing
did not read as the device.

A five-way research pass (Next static export for Pages, three/R3F/drei versions and Next
integration, procedural shell modelling, accessibility of DOM inside a 3D scene, and a
file-by-file migration audit) was running when this handoff was written. Its synthesised build
spec is the starting point for ticket 21.

## Not yet written down

`BUILD.md` §1 still describes Astro as the stack, and `DECISIONS.md` has no section for the
three.js decision. Both need updating as part of ticket 21 — it is on that ticket's criteria.

## Next

Ticket 21. Read the research spec, then migrate: Next static export, CSS/data/lib carried over
unchanged, `.astro` components rewritten as `.tsx`, and the tooltip script rebound off
`astro:page-load`. The bezel contract is the thing most likely to be broken in the rewrite —
screen content must stay real accessible DOM, never a texture.
