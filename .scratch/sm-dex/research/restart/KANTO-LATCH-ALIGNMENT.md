# Kanto exterior triangle alignment

## Decision

The yellow triangle belongs on the exterior of the moving cover. It sits close to the cover's free left edge and points right, toward the hinge. The reference material proves that the mark exists, but it does not prove that the mark is a button or a mechanical latch. Keep it non-interactive.

The current prototype position is too far toward the hinge and too low. Its closed-view centroid is `(108.67, 408.67)`. The reference-mapped centroid is `(88.74, 389.86)` in the prototype's 940 by 704 model coordinates.

## Sources

The strongest geometry source is the user's attached clean open-and-closed artwork at `C:/Users/sm/AppData/Local/Temp/codex-clipboard-01c15f01-7bf6-4f36-81a7-133b1963caf0.png`. It matches the [archived Generation I Pokédex artwork](https://archives.bulbagarden.net/wiki/File:Gen_I_Pok%C3%A9dex.png). The archive describes the file as game artwork showing the device open and closed and provides a 1,224 by 650 source image.

[`k1-01`](https://www.pokepedia.fr/Fichier:Episode_1_-_Pok%C3%A9dex.png) is the only inspected `k1-*` frame that shows the closed Kanto exterior and its yellow mark. The hand obscures part of the cover, so this frame confirms presence and general side placement, not pixel alignment. That limitation is already recorded in [KANTO-20-MORE.md](KANTO-20-MORE.md).

## Measurements

Measurements below use the attached 840 by 486 rendition.

| Item | Pixels |
|---|---:|
| Closed device red bbox | `x=21..318`, `y=42..393` |
| Yellow fill bbox | `x=80..92`, `y=234..255` |
| Yellow fill centroid | `(86.01, 243.07)` |
| Red cover span at `y=243` | `x=64..287` |
| Centroid inset on that scanline | `22.01 px`, or `9.87%` of the span |

The whole-device bbox is not the right coordinate system for placement. The lens header stays exposed when the right leaf closes, so the moving leaf begins at the curved seam below that header.

For a perspective-correct leaf-local estimate, I sampled these four moving-cover landmarks from the attached image:

```text
A = (43, 148)  free-edge end of the upper cover seam
B = (217, 65)  hinge-side end of the upper cover seam
C = (316, 328) hinge-side lower corner
D = (111, 382) free-edge lower corner
P = (86.01, 243.07) yellow centroid
```

Using bilinear coordinates,

```text
P = (1-u)(1-v)A + u(1-v)B + uvC + (1-u)vD
```

gives `u=0.0740` from the free edge toward the hinge and `v=0.4286` from the upper seam toward the bottom. The antialiased edge and curved seam make this an estimate, with about two to four source pixels of landmark uncertainty.

Mapping the same coordinates onto the prototype's closed moving-cover quadrilateral,

```text
A' = (50, 190)
B' = (466, 112)
C' = (466, 664)
D' = (70, 664)
```

places the centroid at `(88.74, 389.86)`.

## Sweep-aligned prototype coordinates

The follow-up review requires the mark to follow the cover's local sweep, not retain its old
screen-space rotation. At the mapped centroid, the cover's across-sweep vector is approximately
`(407.4, -44.6)` and its free-edge vector is approximately `(18.5, 479.8)`. The triangle axis now
follows the first vector and its base follows the second while retaining the measured centroid and
the prior mark size.

Flat closed exterior:

```text
points="80,372 105,388 82,409"
```

Three.js leaf-local yellow face, before the 180 degree closing rotation:

```js
[[852, 372], [827, 388], [850, 409]]
```

Three.js surrounding well:

```js
[[855, 368], [821, 387], [854, 415]]
```

The Three.js coordinates mirror around the prototype hinge at `x=466`, so `x_closed = 932 - x_open`. After closure, the Three.js yellow face lands on the same three points as the flat exterior.

## Crosscheck rule

At a true front-facing closed pose, all four variants should place the yellow centroid near
`(89, 390)`. Its tip should point right and slightly upward along the cover sweep. Its base should
run with the free edge. Its left edge should remain clear of the cover outline, and the mark should
not appear on the open interior face.
