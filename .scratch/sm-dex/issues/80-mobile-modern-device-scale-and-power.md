# Ticket 80 — Mobile modern-device scale and power

Status: resolved

## Request

- Make every Generation V–IX device substantially larger on phones.
- Restore power controls for Generations VI, VIII, and IX in both device and readable controls.
- Avoid the generic black power-off panel on those modern devices.
- Add a mobile loader note recommending a wider device.

## Acceptance

- Generations I–IV retain their existing phone framing; Generations V–IX use close mobile crops.
- Generation VI, VIII, and IX power controls remain visible and functional in both control sets.
- Powered-off modern screens retain device-specific dormant glass instead of the generic dark block.
- The loader shows “Best viewed on wider screens.” only on narrow viewports.
- Build and focused phone interaction checks pass without horizontal overflow or runtime errors.

## Answer

Generation V–IX now use device-specific mobile crops instead of fitting the full 940-unit artboard.
This enlarges the visible hardware by roughly 1.5–2.1× while retaining the existing desktop and
Generation I–IV framing.

Power is available again for every device in both the compact controls and readable controls.
Generations VI, VIII, and IX use their native cyan, slate, and warm dormant glass treatments when
off rather than the generic dark rectangle. The mobile loader now recommends wider screens.

`npm run build` passes. The focused 390×844 browser gate covers every Generation V–IX device,
both power controls, modern off-state colors, loader copy, horizontal overflow, and runtime errors.

## Handoff

**Built:** Larger mobile framing for Generations V–IX, universal power controls, modern dormant glass, and a narrow-screen loader note.
**Deviated:** Modern generations are no longer forced always-on; this explicit consistency request supersedes ticket 76.
**Watch out:** Mobile framing uses per-device crop coordinates in `public/generation-device/app.js`; update them if modern device silhouettes change.
