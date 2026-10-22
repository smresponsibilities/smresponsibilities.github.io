# Flat device asset contract

Each module exports an array of descriptors. The common stage is 940 by 760 design units.
Artwork follows the clean, shallow, dark-outlined SVG treatment of ticket-35 `flat.js`.
This is authored interface artwork guided by references, not an exact copy of source pixels.

```js
export const devices = [{
  id: 'gold', generation: 'II', region: 'Johto', games: 'Gold / Silver',
  accent: '#e57a79', width: 940, height: 760,
  reference: 'https://...', note: 'Unseen exterior reconstructed.',
  gesture: 'Slide right to open',
  layers: [
    { id: 'body', svg: '<path .../>', motion: null },
    { id: 'lid', svg: '<path .../>', outer: '<path .../>',
      motion: {type:'hinge-x', origin:[470,380]} },
    { id: 'hinge', svg: '<rect .../>', motion: null }
  ],
  screens: [{layer:'body', x:300,y:400,w:300,h:180, role:'main'}],
  controls: [{id:'confirm',label:'Open entry',action:'confirm',layer:'body',
    x:650,y:500,w:50,h:50,shape:'round',fill:'#62a352'}]
}];
```

Allowed motion types are `hinge-x`, `hinge-y`, and `slide`. Hinge angle is -180 degrees
at closed progress 0 and zero at open progress 1. Inner artwork uses open coordinates.
Outer artwork uses closed coordinates reflected across its hinge origin. A slide has
`closed: [dx,dy]` and translates to zero at open. Stationary Rotom devices have no moving
layers and use a software lock over the screen. Do not invent a physical hinged cover.

Optional `motion.range: [start,end]` maps global progress into a clamped local phase.
GSC uses this to move the leaves sequentially. Optional `motion.clearance` translates a
leaf toward the viewer in design units before rotating it, separating the closed faces.
These are authored motion choices, not verified hardware dimensions.

An optional descriptor `rear` contains full-stage rear SVG markup. The effects module
wraps front and rear faces in one turn; it starts at 180 degrees when locked and follows
the slide toward zero when unlocked. Newly selecting a rear-equipped device starts locked.
The exporter emits a separate rear SVG and a manifest `rear` filename. VII's rear is a
Rotom Dex, not a phone, even though the presentation module shares turn CSS classes.

Each layer contains full-stage SVG markup. Put framing and wells in the asset SVG; the
renderer adds each native control's moving cap. Controls never move with their caps.
For a connected D-pad, provide one common cross base plus four `shape:'direction'`
targets. Give all four the same `rocker` identifier and put the connected moving face
in the SVG inside `<g data-rocker="IDENTIFIER">`. The renderer moves that group as one.
Allowed actions: `up`, `down`, `left`, `right`, `confirm`, `back`, `menu`, `power`,
`section-0` through `section-4`. Lamps, decoration and empty gaps are inert.

Use a maximum of two screen apertures. `main` gets portfolio navigation and entry text;
`side` gets entry metadata. DOM screens are clipped to their apertures. Do not bake game
UI or text into the screen glass. SVGs may have restrained gradients, with IDs prefixed
by device id. No external dependencies, remote images or generated bitmap substitutions.
