# Ticket 55 reference collection

The requested expansion is 20 additional references each for Generations II, IV and V.
The final board uses original anime episode captures hosted by WikiDex, following the
episode-image method used in `../restart/KANTO-20-MORE.md`.

Open `index.html` through the repository's local HTTP server. Each card links to its
archive file page and unchanged full-resolution image. The three generation JSON files
are the board's source of truth; the matching Markdown files explain their scope.

## What these references establish

Repeated scan views help compare screen borders, image placement, colored fields,
control clearance and casing edges under different camera angles. They are independent
frames and screen states, not 20 independent construction diagrams per generation.
An episode number and filename provide traceable archive attribution; the animation
itself is the visual evidence. WikiDex is a secondary host, not the original publisher.

Most Unova scan captures show gray screen rails and crop out the lower shell. They do
not establish an all-gray device. The original Black/White artwork remains the source
for the study's red-orange lower shell. Its source and the UI repair are documented in
`../ticket-55-ui-review.md`. These frames do not settle hidden faces, exact hinge order,
or slider travel.

## Selection and checks

Earlier mixed drafts included toys, manga and software captures. Those drafts are not
counted in the final board. Where retained, they are candidate material only.

`verify.mjs` checks 20 items per generation, required provenance, file hashes, duplicate
images, and overlap with the original 90-image catalogue. `inspect.mjs` loads all 60
images, checks browser errors and horizontal overflow at desktop, tablet and phone
widths, and creates compact overview captures for visual review. Hash checks cannot
detect alternate crops of one frame; the overview review covers that limitation.

Run both scripts from the repository root with the local server on port 4173:

```sh
node .scratch/sm-dex/research/ticket-55-refs/verify.mjs
node .scratch/sm-dex/research/ticket-55-refs/inspect.mjs
```
