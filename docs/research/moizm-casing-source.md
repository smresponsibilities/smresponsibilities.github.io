# moizm.dev casing source

Checked on 2026-08-20 against the deployed site and the public GitHub account that the site identifies as its owner's account.

## Finding

The red Pokedex casing on `moizm.dev` is **not a standalone PNG, WebP, SVG, or other image asset**. It is assembled from React-rendered HTML elements styled with Tailwind utility classes: red and black gradients, rounded rectangles and circles, borders, and shadows. Reproducing the deployed casing exactly therefore means porting or independently recreating that DOM/CSS geometry; there is no original casing image file to drop into this project.

Primary evidence:

- The [live HTML](https://moizm.dev/) loads one application bundle, [`index-CaO3giX5.js`](https://moizm.dev/assets/index-CaO3giX5.js), and one stylesheet, [`index-BG0Jp5F0.css`](https://moizm.dev/assets/index-BG0Jp5F0.css).
- The deployed JavaScript contains separate element trees for the closed cover, open display half, hinge, and lower control half. The minified bindings are `dh`, `sh`, `gh`, and `Sh`; `Yh` composes them. These are minified deployment identifiers, not recoverable original filenames.
- Those shell trees use utility classes such as `bg-gradient-to-b`, `from-red-500`, `via-red-700`, `to-red-800`, rounded corners, borders, and fixed responsive dimensions. The D-pad is two perpendicular `<div>` elements. The shell trees do not load a casing image.
- The [deployed CSS](https://moizm.dev/assets/index-BG0Jp5F0.css) defines the corresponding Tailwind utilities. Its only file-backed CSS backgrounds are the page background and font, not a case shell.

## Image assets that may look relevant

| Asset | Actual use in the deployed code | Casing asset? |
|---|---|---|
| [`pokedexbackground-D2HxdUql.webp`](https://moizm.dev/assets/pokedexbackground-D2HxdUql.webp) | Background inside the open information display (`fh`) | No |
| [`startPageBackground-CFE-qwhT.webp`](https://moizm.dev/assets/startPageBackground-CFE-qwhT.webp) | Artwork inside the closed cover's inset panel (`dh`) | No |
| [`pokemonLogo-Co8gvWh9.webp`](https://moizm.dev/assets/pokemonLogo-Co8gvWh9.webp) | Logo placed over that closed-cover panel | No |
| [`mainBackground-D10hXM3g.webp`](https://moizm.dev/assets/mainBackground-D10hXM3g.webp) | Full-page landscape background | No |
| [`og-image.jpg`](https://moizm.dev/og-image.jpg) | 1200x630 social preview declared by the live HTML; a composite screenshot, not an isolated shell | No |
| [`Poke_Ball_icon-Bxp3KLMG.png`](https://moizm.dev/assets/Pok%C3%A9_Ball_icon-Bxp3KLMG.png) | Site favicon and Apple touch icon | No |

The bundle also contains two inline `data:image/svg+xml` arrow icons for Back and Next controls. They are control glyphs, not the casing.

## Public source and source maps

The live HTML names **Moiz Mohammed** as author and links [`github.com/moizm05`](https://github.com/moizm05) in its structured person data. The account's [official public-repository API listing](https://api.github.com/users/moizm05/repos?per_page=100&type=owner) currently contains six repositories and no portfolio or `moizm.dev` source repository. The live bundle also links project repositories only; it does not link its own source repository.

No usable source map is exposed. Requesting [`index-CaO3giX5.js.map`](https://moizm.dev/assets/index-CaO3giX5.js.map) returns the site's HTML application fallback rather than source-map JSON. Consequently, the original component filenames and unminified source are not publicly recoverable from the deployment.

## Ownership and reuse

The deployed application renders a footer stating that Moiz retains all rights, and no public license for the portfolio source or its visual assets was found in the live site or linked public repositories. The Tailwind CSS banner in the stylesheet says Tailwind itself is MIT-licensed; that does **not** license Moiz's application-specific component tree, styling choices, or media.

Therefore:

- There is no standalone original case asset available from `moizm.dev`.
- Copying the exact deployed DOM/classes would mean copying deployed application code, for which no reuse license is published.
- Obtain Moiz Mohammed's permission or an original source/asset package from him before exact reuse. Otherwise, use the live implementation only as visual reference and create an independently authored shell that complies with this repository's asset rules.

## Implementation consequence for SM'S DEX

Do not substitute `pokedexbackground-D2HxdUql.webp` or `og-image.jpg` as the case: neither is an isolated casing. If the user supplies an authorized original casing asset, integrate that file. Without one, an exact licensed asset-based implementation is not presently possible from the public sources.
