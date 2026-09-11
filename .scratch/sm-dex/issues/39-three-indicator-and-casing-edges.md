# 39: Three.js indicator and angled casing edges

Status: resolved
Type: task
Priority: highest

## Request

The large blue lens is a light, and the casing border remains pixelated in the angled Three.js
view. Limit the change to indicator rendering and casing-edge quality. Preserve ticket 38's
screen filtering, the silhouette, all control mappings, flat shadows and hybrid behavior.

## Approach

Use Three.js lighting, materials and rendering guidance. Make the lens self-illuminated with
local light spill tied to device power. It is not an interactive control. Keep emission steady,
including under reduced motion, and preserve power when closing the lid.

Compare the existing angled view against a bounded two-sample-per-CSS-pixel full-3D drawing
buffer. Geometry antialiasing is already enabled. Do not change the screen texture filters to
address mesh-edge aliasing. Use matched screenshots for visual judgment and existing runtime
checks for input, power and resolution regressions.

## Answer

The blue lens now emits light when powered and dims when switched off. It is not a control.
Full Three.js uses a bounded 2x backing resolution with geometry antialiasing. Matched angled
captures show smoother outlines without changing the mesh or screen filtering. The prototype
README records the rendering cost, power behavior, evidence and validation limits.

Full Three.js passes 63/63 assertions in front/angle at 375 and 1280px and angle at 774px.
Native power, closure and an inert lamp click were checked. Syntax and whitespace checks pass.

## Handoff

**Built:** A power-linked blue indicator and higher-resolution casing-edge rendering in full
Three.js. The user's actual view loads v39. Existing screen sampling and button layout remain.

**Deviated:** Full Three.js uses 2x backing resolution even on lower-density displays to reduce
edge aliasing. The maximum remains 2x. Hybrid keeps capped native density. The README states cost.

**Watch out:** No final visual/source-fidelity approval is implied. Existing v38 changes and this
ticket remain uncommitted. No production or retired assets changed. Temporary viewport overrides
were reset. Low-end GPU performance is unmeasured; no animation or postprocessing loop was added.
