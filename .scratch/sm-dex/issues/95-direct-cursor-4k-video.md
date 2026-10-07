# Ticket 95: Direct cursor paths and 4K video

Type: task
Status: claimed
Blocked by: none

## Goal

Replace the repeated cursor parking with direct movement from each clicked control to the next,
and deliver a higher-resolution video while preserving the accepted framing and slow scrolls.

## Recording plan

1. Keep the selected Riya loader, Gen I close/open, section tour, generation tour, power-off,
   readable view, slow content scrolling, and Add Pokémon sequence from ticket 94.
2. Leave the cursor on each clicked button during the content pause. Move directly to the
   next button, using the same speed limit. Do not return to a fixed resting point.
3. Move across adjacent generation buttons from left to right. Keep the cursor still during
   page scrolling. Move into the dialog only to demonstrate its internal scroll.
4. Show native tooltips before activation, then dismiss the callout on click without moving
   the pointer, so the new content remains readable.
5. Render the 1920 by 1080 composition into a 3840 by 2160 browser capture surface. Verify
   the full frame and button targeting in rehearsal before recording the full take.
6. Export a 4K H.264 MP4 without speeding up footage. Inspect the first frame and scene
   coverage, and verify a complete decode.
