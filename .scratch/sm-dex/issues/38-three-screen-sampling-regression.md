# 38: Three.js screen sampling regression

Status: open
Type: task
Priority: highest

## Request

The user reports excessive pixelation after ticket 37 and asks to load the Three.js skills.
Correct the current comparison's rendering without changing the casing or button geometry.

## Verification approach

Use the Three.js textures, fundamentals and best-practices skills. Some optional best-practices
rule files are absent, so consult the official Texture documentation for filtering details.
Keep the diagnosis bounded to this reproducible visual regression. Fixed-viewport screenshots
provide the visual comparison. Runtime assertions guard sampling and drawing-buffer density;
they are not an automated measure of aesthetic quality or source fidelity. This deliberately
replaces the diagnosis skill's exact-symptom numerical test, since no accepted image baseline
exists for subjective sharpness.

## Baseline

The user's Three.js angled view shows fragmented glyph strokes. Its live canvas has 506 pixels
across a 505.5 CSS-pixel box at devicePixelRatio 1.25, indicating a stale drawing-buffer ratio.
A fresh view restores the ratio but retains nearest/nearest screen filtering and fragmented text.
Ranked causes: unfiltered texture minification, stale display density, intrinsically small type.
The source screens already render at twice their design size; increasing them alone does not
address discarded samples.

## Current result

An uncommitted correction uses mipmaps, linear/trilinear sampling and bounded anisotropy, plus
display-density refresh. Runtime rendering guards fail on the old settings and pass on the new
settings. The prototype README records evidence and limitations. Geometry and controls did not change.

The user reported the result was worse before final handoff. Inspection of their actual tab
found it still running v37, not the correction in the isolated test tab. Their front-view tab
has now been loaded with v38-final. This ticket stays open for visual review. Do not treat the
passing functional checks or the agent's screenshot comparison as user approval.

## Handoff

**Built:** A candidate correction for screen minification and stale drawing-buffer density.
The Three.js skills were loaded and applied. The user's actual tab now loads the candidate.

**Deviated:** No production changes. Visual comparison and runtime guards replace a numerical
aesthetic test. Ticket 37's nearest-minification approach is superseded in the candidate.

**Watch out:** Await feedback on the refreshed tab before more visual tuning. No new capture
commit was made. Temporary viewport overrides were reset. Earlier changes and claimed tickets
are untouched. Physical monitor-density transitions and a complete new native-button sweep
were not verified.
