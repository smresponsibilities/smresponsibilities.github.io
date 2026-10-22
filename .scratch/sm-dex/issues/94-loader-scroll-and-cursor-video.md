# Ticket 94: Loader, scrolling, and cursor revision

Type: task
Status: resolved
Blocked by: none

## Goal

Revise the walkthrough with a full-frame loader showing the existing @riyasainii448 fact,
slower smooth scrolling after the device tour through Add Pokémon, and no yellow cursor
click flash. Preserve the established walkthrough sequence and native tooltips.

## Acceptance criteria

- Stabilize the capture viewport before navigation and remove startup frames from the export.
- Hold the existing loader with the requested roster fact long enough to read it.
- Slow page and dialog scrolling after the device tour, including the return to Add Pokémon.
- Remove the recording cursor's yellow click animation and retain the visible pointer.
- Verify first-frame coverage, requested fact, scene framing, and full MP4 decode.

## Answer

The v3 capture holds a recording-only copy of the site's loader with the production roster
fact for @riyasainii448: "i love cheese, chocolates and the color pink." The recorder viewport
settles before navigation, and the export removes four seconds of startup footage. The exact
first encoded frame was extracted and inspected at 1920 by 1080; it fills the frame correctly.

After power-off, page and dialog scrolling use a 125-pixel-per-second baseline with easing,
down from 380. This includes the return from Projects to Add Pokémon. The cursor SVG no
longer contains a yellow circle or pointer-down animation. Native site tooltips remain.

Output: `.scratch/sm-dex/linkedin-video-v3/shivam-mahajan-linkedin-final.mp4`.
Capture script: `.scratch/sm-dex/record-linkedin-v3.cjs`.

Verification: 280.64 seconds, 1920 by 1080, native 25 fps, H.264, yuv420p, square pixels,
48,903,053 bytes. Full FFmpeg decode passed without errors. The opening and all scene
captures were inspected. No form was submitted and no website code was changed.

## Handoff

**Built:** The current video has a full-frame Riya loader, slower post-device scrolling, and a plain visible cursor without a click flash.
**Deviated:** Nothing in the application. Loader selection and its extended hold exist only in the recording browser.
**Watch out:** Use the v3 MP4. It preserves native 25 fps instead of adding duplicate frames to reach 30 fps. Earlier exports remain available.
