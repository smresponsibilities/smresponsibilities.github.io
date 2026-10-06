# Ticket 93: Planned LinkedIn walkthrough

Type: task
Status: resolved
Blocked by: none

## Goal

Revise ticket 92's recording with a visible cursor, tooltips, consistent real-time pacing,
and the user's requested sequence. The user approved extending the runtime beyond one minute.

## Storyboard

1. Capture the real loader and establish the homepage.
2. Close and reopen Generation I, then use physical device buttons to visit Profile,
   Moves, Encounters, Ribbons, and Dex. Show short samples rather than every detail.
3. Show Generations II through IX with equal pauses.
4. Power off the last device to conclude the device tour.
5. Open Readable view and restore power through its controls. Show the larger text.
6. Scroll slowly through About, Experience, and Projects.
7. Show Add Pokémon with its tooltip and form, then return to the homepage.

## Acceptance criteria

- A visible cursor follows the actual automated pointer, including clicks and the modal.
- Hover pauses reveal native site tooltips. Mouse and scrolling speeds stay consistent.
- Export a landscape 1080p H.264 MP4 without speeding up the capture.
- Inspect key frames and verify full decode. Do not submit forms or publish.

## Answer

Recorded the storyboard in production with native site tooltips and a recording-only cursor
overlay driven by actual pointer events. The cursor stays visible above the submission dialog,
and clicks receive a brief highlight. Pointer movement uses 850 pixels per second; page and
dialog scrolling use a shared 380-pixel-per-second baseline with easing. The capture is not
sped up. The complete flow takes about four minutes, longer than the initial estimate.

The original one-minute export remains available. The revision is
`.scratch/sm-dex/linkedin-video-v2/shivam-mahajan-linkedin-walkthrough.mp4`.
Its script is `.scratch/sm-dex/record-linkedin-v2.cjs`. Scene markers, raw capture, and inspected
screenshots are in the same output directory. The form was opened, scrolled, and cancelled.

## Handoff

Verification passed: 242.366667 seconds, 1920 by 1080, 30 fps, H.264, yuv420p,
40,309,574 bytes. Full FFmpeg decode completed without errors. Opening frames, all scene
captures, native tooltips, cursor visibility, and the scrolled form were visually inspected.

**Built:** The requested full walkthrough, with loader, Gen I close/open and section buttons,
all generations, power-off, readable view, slow content scrolling, and Add Pokémon.
**Deviated:** Nothing in the application. The user approved longer pacing, and the full take
runs about four minutes. The cursor overlay exists only in the recording browser.
**Watch out:** Neither video has been published. Use the v2 output for this revised flow.
