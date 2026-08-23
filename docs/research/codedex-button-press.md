# Codédex button press — live implementation

Checked on 2026-08-20 against Codédex's deployed DOM, generated CSS, and production JavaScript.
These are observations of the live interaction, not a recommendation to copy the full component.

## Canonical URL

`https://codedex.com/` returns a `308 Permanent Redirect` to
[`https://www.codedex.io/`](https://www.codedex.io/). The selectors and values below were
measured on that destination.

## What actually moves

The Codédex pixel button is three layers inside a transparent native `<button>`:

```html
<button class="sc-e0418d4-0 … nes-pointer">
  <span class="before"></span>
  <span class="btn-content">…</span>
  <span class="after"></span>
</button>
```

- `.before` is the visible front face: absolute, `top: 0`, `height: calc(100% - 4px)`.
- `.after` is the darker depth layer: absolute, `top: 6px`,
  `height: calc(100% - 6px)`.
- `.btn-content` is the label/icon above both layers.
- The native button itself does **not** move. On `:active`, only `.before` and
  `.btn-content` move down exactly `4px`. `.after` stays fixed. That collapsing gap is what
  makes this read as a physical press rather than a whole-control translation.

The deployed rules are:

```css
button:active .before,
button:active .btn-content {
  transform: translateY(4px);
}
```

The front face uses `transition: transform 0.1s, background 0.1s`; computed timing is
`100ms ease` with no delay. The content uses `transition: transform 0.1s`, also computed as
`100ms ease`. The depth layer does not transition.

## State changes

| State | Face | Content | Depth / border / shadow |
|---|---|---|---|
| Rest | Base colour; no transform | No transform; `0 2px 0` text shadow | Dark `.after` layer visible; pixel `border-image`; no `box-shadow` |
| Hover | Face becomes lighter over `100ms ease` | No movement | Unchanged |
| Active / pointer held | Face becomes darker and moves `translateY(4px)` | Moves `translateY(4px)`; text shadow becomes `none` | `.after`, border image, border geometry, and box shadow remain unchanged |
| Focus | No visual focus ring | — | Component sets `outline: none`, including on `:focus`; no component `:focus-visible` rule exists |

The press lasts only while the native button matches `:active`; release returns both moving
layers to rest over the same `100ms ease` transition. The component's JavaScript also ignores
repeat clicks for `500ms` by default, but that debounce does not create a different visual state.

## Deployed colour variants visible on the homepage

| Generated selector | Visible examples | Rest face | Hover face | Active face | Fixed depth | Pixel border | Content / rest shadow |
|---|---|---:|---:|---:|---:|---:|---|
| `.djVvkq` | `Sign up` (small, `42px`) | `#FACC15` | `#FDE047` | `#EAB308` | `#CA8A04` | `#A16207` | `#000` / `0 2px #EAB308` |
| `.fPejlz` | `Get started`, `Join Club now` (`50px`) | `#FACC15` | `#FDE047` | `#EAB308` | `#CA8A04` | `#A16207` | `#000` / `0 2px #EAB308` |
| `.mOyDh` | `Explore All Courses`, `Start Learning for Free` (`50px`) | `#14ADFF` | `#2CBAFF` | `#0080D4` | `#0065AB` | `#00568D` | `#FFF` / `0 2px #0080D4` |
| `.HvvcB` | `Read …'s story` (`50px`) | `#020617` | `#1E293B` | `#334155` | `#475569` | `#64748B` | `#F8FAFC` / `0 2px #334155` |

All four generated selectors share the same `4px` press and `100ms ease` transitions. Their
hash-like class names are build-generated and should not be used as stable implementation APIs.

Not every homepage `<button>` depresses. Header controls (`Learn`, `Practice`, `Build`,
`Community`, `Pricing`) are plain navigation/dropdown buttons without an `:active` movement
rule. The search `Clear` button has a hover colour only. `nes-pointer` supplies the pixel cursor;
it is not the press behavior. The old `.nes-btn` rules in the global stylesheet implement a
different inset-shadow press and are not used by the homepage buttons listed above.

## Reduced motion

Codédex does not remove the `4px` state change under reduced motion. Its global stylesheet
applies this rule instead:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::after, ::before {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Result: the face and label still move `4px`, but effectively instantly.

## Implementation takeaway for SM'S DEX

Use one independent control component for every casing button. Keep a stationary depth layer,
move the face and its glyph together by `4px` while pressed, lighten only the face on hover,
darken only the face on active, and remove the glyph's two-pixel shadow while active. Do not
translate the whole button or swap an image. Keep the physical state separate from the button's
application action: pressing supplies momentary feedback; click release toggles the requested
open/closed state.

Codédex's missing keyboard focus indicator should not be copied. Preserve this project's focus
ring while matching the pointer press, and retain the repository's stronger reduced-motion rule.

## Primary evidence

- [Live Codédex homepage](https://www.codedex.io/) — inspected native button markup, visible
  labels, generated classes, and computed styles.
- [Codédex production `_app` bundle](https://www.codedex.io/_next/static/chunks/pages/_app-61d13db2b8ac7056.js) — webpack module `73857`, styled-components ID
  `sc-e0418d4-0`; contains the three-layer Button component, `translateY(4px)`, `0.1s`
  transitions, variant hover/active rules, focus reset, disabled behavior, and `500ms` click
  debounce.
- [Codédex global stylesheet](https://www.codedex.io/_next/static/css/b020897797f84685.css) —
  contains the global reduced-motion override and the unrelated legacy `.nes-btn` state rules.

The hashed asset URLs describe the production build inspected on the date above and may change
after a Codédex deployment. The stable identifiers inside that build are webpack module `73857`
and styled-components component ID `sc-e0418d4-0`.
