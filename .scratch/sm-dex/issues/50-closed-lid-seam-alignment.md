# 50: Align closed lids without gaps or exposed shell strips

Status: resolved
Type: task
Priority: highest

## Request

Make the Generation III and IV closed lids meet their bodies exactly, without gaps or overhang.
Make the Generation II leaves cover the final exposed body strip when fully closed.

## Interpretation

Preserve the approved open lid and body silhouettes and motion. Change the closed endpoint artwork;
the fixed RSE hinge envelope may also change so it does not protrude beyond the aligned shell.
The RSE crescent must retain its disc cutout while its top, bottom, and hinge-side edges match the
body. The DP closed face must use the body's transformed centre-shell bounds. The GSC right leaf
must cover the full lower body width, including the strip missed by the mirrored open leaf.

## Acceptance

- RSE closed lid and body share exact top, bottom, and hinge-side edges.
- DP closed lid and centre body have identical screen-space bounds.
- GSC top and right leaves cover the complete body width and height at the closed endpoint.
- Approved open artwork, controls, actions, and motion remain unchanged.
- A deterministic browser regression fails before the fix and passes afterward.
- All exported SVGs parse as XML, with no browser errors.

## Answer

Revision 50.0 gives RSE one exact top, bottom, and hinge-side seam. Its fixed hinge now shares the
body's top and bottom bounds, so the white caps no longer protrude. DP's closed centre shell reuses
the transformed body-shell outline and therefore matches all four edges exactly. GSC's closed lower
leaf now spans the body's full width instead of starting 22 coordinate units late and extending four
units past the opposite edge.

The browser regression first failed on all three reported defects. It now measures equal
screen-space edges for RSE and DP and complete GSC body coverage. The prior button and action
regression still passes. All 53 exported SVGs parse as XML, and both browser runs report no errors.

## Handoff

**Built:** Revision 50.0 aligns the RSE and DP closed shells exactly and covers GSC's final exposed
body strip.
**Deviated:** Nothing beyond the existing authored closed-face reconstructions. RSE's fixed hinge
caps moved inside the shell envelope to satisfy the explicit zero-overhang request.
**Watch out:** The DP side control pods intentionally remain visible; "second" was interpreted as
Generation II because the third attachment is the GSC lower-right crop. Further visual changes need
a new ticket.
