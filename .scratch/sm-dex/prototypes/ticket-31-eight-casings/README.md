# Ticket 31: Kanto OG-geometry control prototype, revision 5

Revision 5 uses the illustrated ticket-23/26 pixel treatment but restores the Red/Green reference
geometry. The 417 by 673 inner lid is no longer stretched to 420 by 816. It sits at its native
vertical offset beside the fixed full-height body and hinge. The outer cover remains full height.

Run `python -m http.server 4173 --bind 127.0.0.1`, then open:

`http://127.0.0.1:4173/.scratch/sm-dex/prototypes/ticket-31-eight-casings/?v=5`

## Controls

All 28 hit regions are native buttons. Hover names the result. Focus has a visible yellow ring.
A pressed face travels 4px over 100ms. Keypad cells use integer boundaries, so adjacent targets
do not overlap. The D-pad is one coherent raster rocker over four directional hit regions.

The original second black inner button and speaker holes are restored. The left black button goes
back. The right black button closes and retains the page. The outside triangle reopens. Keypad 1
through 6 opens Profile, Moves, Encounters, Ribbons, Evolution, and Dex.

## Verified

- Closed, open, close, and reopen produce expected states with no browser errors.
- Space on D-pad Down changes selection; Enter on Next Version changes Red to Blue once.
- Pointer on keypad 6 displays Dex; pointer on A changes menu to list.
- All 28 target rectangles exist. Current overlap check reports zero overlaps.

Full touch emulation and every-control pointer replay remain acceptance work after Kanto visual
approval. Tickets 20 and 21 and production files remain untouched.
