# 37: Hybrid angle, lighter flat shadows and screen clarity

Status: resolved
Type: prototype
Priority: highest

## Request

Add an angled hybrid view, reduce the flat version's heavy shadows, improve the blurry pixels in
Three.js, and leave a complete handoff. Keep this bounded to the current scratch comparison.

## Scope

- Add Front/Angled controls to hybrid, tilting its casing, WebGL caps and native targets together.
- Reduce flat cap shadows and exposed dark wells without weakening casing contours.
- Remove linear minification from the pixel-screen textures and make full-3D front view less scaled.
- Verify input alignment in hybrid angle, closing, reduced motion and the three current variants.
- Record visual limits, capture the prototype and update the ticket and effort handoffs.

## Approach

The hybrid is a flat-shell comparison. Its new angle is a common CSS transform on the composite,
not an independently rotated 3D shell. This keeps all input targets aligned. Full Three.js remains
the actual mesh-camera comparison. Visual tuning uses before/after browser captures and the
existing input checks; it does not claim a numerical proof of subjective sharpness.

## Answer

Hybrid now has Front/Angled controls and a reload-stable `view=angle` URL. One wrapper transforms
casing, control canvas and native targets together. Flat wells expose five fewer design units of
dark relief, cap highlights/shadows are thinner, and the shell gradient is gentler. Shell contours
remain. Three.js screen textures use nearest sampling in both directions; Front view removes the
extra 0.97 model scale and aligns the model origin.

All five view combinations pass 56/56 existing assertions at 375 and 1280px. Native clicks on all
23 hybrid-angle controls accept once with four-unit travel and zero target drift. Gap/centre
points are inert. An isolated native drag-off cancels without a held cap or ripple. Closure and
zero-travel reduced-motion input were checked. See the prototype README and `evidence/ticket37-*`.

Primary prototype capture: `7d0c77c` on `codex/ticket37-hybrid-angle-clarity`. Only the prototype
folder and its evidence were committed. Authored JavaScript syntax and whitespace checks pass.

## Handoff

**Built:** Hybrid angle controls, lighter flat shadows and nearest-sampled Three.js screens.
The existing comparison remains local scratch code. Production and dependencies are untouched.

**Deviated:** Hybrid angle tilts the entire composite; it is not a new independently modelled
3D shell. No camera animation was added. This preserves exact ownership of the visual/input layers.

**Watch out:** Tiny text can still soften or alias under fractional scaling, browser compositing
and angled views. Nearest filtering is not a zero-blur or pixel-perfect guarantee. The local server
was restarted after interruption. Claimed tickets 20/21 and retired assets remain untouched.
