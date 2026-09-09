# Closing depth audit

Historical diagnosis. The approved fix and later GSC sequencing/RSE reconstruction are
recorded in [the implementation follow-up](ticket-46-implementation.md). The probe now
loads revision 46.5; its legacy/stack variations retain the old X-sign counterexample.

Checked 7 September 2026 against ticket-45 revision 45.2. This is a diagnosis, not a runtime fix.

## Confirmed cause

Four upper lids rotate behind the body while closing: Gold / Silver, Ruby / Sapphire,
Diamond / Pearl and HeartGold / SoulSilver. The shared renderer applies
`rotateX(180 * (1 - progress))` at
[`renderer.js:62`](../prototypes/ticket-45-all-generations/renderer.js#L62).
Their open artwork lies above the hinge, so its local Y offset is negative. Positive X
rotation makes its intermediate Z negative. At more than 90 degrees of closure, the
projected lid overlaps the base while sitting behind it. This is the reported disappearing
panel, not an intentional opening convention.

The CSS preserves 3D depth in the rig, layers and faces. Increasing a moving layer's
`z-index` does not correct its physical depth. The CSS transform model explicitly gives
3D transforms control over visual layering. See [W3C, 3D rendering model](https://www.w3.org/TR/css-transforms-2/#3d-rendering).

## Reproduction and isolation

Open [`ticket-46-motion-probe.html`](ticket-46-motion-probe.html) through the existing local
server. The diagnostic imports the unchanged renderer, descriptors and stylesheet. It
freezes progress rather than depending on capturing a 320-millisecond animation frame.
Each check reads the actual computed transform with `DOMMatrix` and tests the artwork
bounding-box centre relative to the declared hinge. Positive Z is a front sweep; negative
Z is behind the body plane. This is a geometric regression signal, not a pixel-diff test.

Default state is Gold / Silver at progress 0.25. Reading `#result` returned:

```text
right-leaf: rotateY(-135deg), z=142.13, PASS: front sweep
top-leaf:   rotateX(135deg),  z=-105.71, FAIL: behind body plane
```

The frozen pose visibly shows the lower screen while the upper exterior is hidden behind
the base. Reversing only the X rotation in the diagnostic makes that exterior cover the
screen from the front. The portfolio implementation itself is unchanged.

The browser batch used the supported Playwright locator API:

```js
await audit.playwright.locator('#device').selectOption('gold');
await audit.playwright.locator('#progress').selectOption('0.25');
await audit.playwright.locator('#variation').selectOption('original');
JSON.parse(await audit.playwright.locator('#result').innerText());
```

The ranked hypotheses were wrong rotation sign, wrong hinge pivot, and incorrect layer
stacking. The controlled probes changed one variable at a time:

| Gold / Silver top leaf, progress 0.25 | Z | Outcome |
| --- | ---: | --- |
| Original renderer | -105.71 | Behind body |
| Only raise layer z-index to 999 | -105.71 | Still behind body |
| Only reverse X rotation sign | 105.71 | In front; exterior visible |

The sign-only probe retains the original hinge origin and artwork. A pivot change is not
needed to eliminate this fault. It also leaves open and closed 2D endpoint coordinates
unchanged because rotations of positive and negative 180 degrees have the same endpoint.
That explains why the previous endpoint checks did not catch it.

## Coverage

Six hinged leaves were checked at progress 0.25, 0.5 and 0.75. The original renderer failed
12 of 18 centre-depth checks, all four upper lids at all three intermediate positions.
The sign-only diagnostic passed all 18. This does not establish collision-free motion for
every edge or correct art registration.

| Device and leaf | Z at 0.25 | Z at 0.5 | Z at 0.75 | Original result |
| --- | ---: | ---: | ---: | --- |
| Kanto lid | 147.08 | positive | 147.08 | Front sweep |
| Gold / Silver right leaf | 142.13 | positive | 142.13 | Front sweep |
| Gold / Silver top leaf | -105.71 | -149.50 | -105.71 | Backward |
| Ruby / Sapphire lid | -124.80 | -176.50 | -124.80 | Backward |
| Diamond / Pearl lid | -120.92 | -171.00 | -120.92 | Backward |
| HGSS lid | -111.72 | -158.00 | -111.72 | Backward |

Unova and Kalos use translations, not X hinges. Alola, Galar and Paldea have no moving
casing. They do not take the faulty branch; this is not an assertion that their assets
match the references.

## Separate closed-state fidelity defect

The original Gold / Silver artwork includes both open and closed views. Its closed view
retains the small blue element at the bottom right. The current right leaf covers that
body element at the closed endpoint. The authored body is also much wider relative to
its height than the narrow closed source device. Enlarging screen apertures was documented
as a study adaptation, but it is not pixel-perfect reference matching.

Compare the actual source at
[`johto-gsc.png`](../assets/ticket-30/references/johto-gsc.png), hosted as
[official Gold / Silver artwork](https://archives.bulbagarden.net/wiki/File:Pok%C3%A9dex_GSC.png),
with the diagnostic at progress 0. Changing rotation sign cannot repair either the
closed silhouette or the covered blue element.

## Recommended implementation boundary

1. Correct the upper-lid rotation direction at the shared pose function. Keep Kanto's
   Y rotation and the Gold / Silver right leaf unchanged.
2. Keep an intermediate-pose check at 0.25, 0.5 and 0.75. Test closing as well as opening,
   then rerun drag cancellation, keyboard and reduced-motion checks in the actual page.
3. Handle artwork corrections separately, beginning with Gold / Silver closed geometry.
   Source-match open and closed silhouettes before fitting portfolio screens inside them.
4. Do not claim a simple z-index patch resolves intersecting multi-leaf geometry. Gold /
   Silver leaf clearance, near-closed overlap and face thickness need their own verification.

No runtime code or exported SVG was changed in this audit. Counterfactual transforms exist
only in the clearly labelled diagnostic. The per-generation art audit is recorded in
[`ticket-46-reference-audit.md`](ticket-46-reference-audit.md).
