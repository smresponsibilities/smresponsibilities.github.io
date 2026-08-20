> **How this document was produced.** Five parallel research agents investigated the Next
> static-export target, the three.js/React-Three-Fiber stack, procedural shell modelling,
> accessibility of DOM inside a 3D scene, and a file-by-file audit of this repo. A sixth
> synthesised their findings into the spec below. Run on 2026-08-20 against commit `5bc796d`.
>
> It is **research output, not an authority**. `BUILD.md` still wins any conflict, and the
> casing proportions come from `docs/research/gen4-casing-geometry.md`. Version numbers were
> resolved against the npm registry on the day; re-verify before installing.
>
> **Unresolved when this was written:** whether the two screens stay side by side (what
> `DECISIONS.md` §S3 and ticket 20 require) or restack to match the reference device exactly.
> Section 4's geometry is orientation-independent; section 5's layout is not.

# BUILD SPEC — Astro → Next.js, and the Gen 4/5 casing in three.js

Ticket 21 (migration) + ticket 20 (casing). Written 2026-08-20 against repo HEAD `5bc796d`.
Source of proportions: `docs/research/gen4-casing-geometry.md`. Read that file before section 4.

Every version below was resolved with `npm view <pkg> version` on 2026-08-20. Confidence notes are in §1.

---

## 0. What this spec decides up front

Five calls that the research agents split on. Decided here so you do not re-litigate them:

| Question | Decision | Why |
|---|---|---|
| Where does screen UI live? | **Ordinary React DOM, layered over a `pointer-events:none` canvas.** Not `drei <Html>`, not a texture. | `<Html>` mounts children in a *separate* `ReactDOM.createRoot` with no context bridge — no `next/link`, no SSR, and its `occlude` path sets `display:none` (removes content from the a11y tree as a function of camera angle). A texture has no DOM at all. Both forfeit the bezel contract. |
| Fonts | **Keep the existing `@font-face` in `global.css`.** Do not migrate to `next/font/local`. | Deploy is at the domain root, `public/` is served at root, so `url("/fonts/…")` keeps working verbatim. `next/font` buys a preload hint and costs a silent-failure trap: its `variable:'--font-display'` rule and `tokens.css`'s `:root` rule are the same specificity, `:root` wins, and the font falls back to `ui-monospace` with no error. Skipped: preload. Add when font-swap flash is measured as a real problem. |
| `drei` or bare `three` | **Include drei**, for `Environment` (children form), `Lightformer`, `ContactShadows`, `Instances`. | Hand-rolling the procedural cube-map bake is ~100 lines of `PMREMGenerator` + `CubeCamera`. drei tree-shakes per-import; these four are ~5 KB gz over bare R3F. Do **not** import `Html`, `Stats`, `StatsGl`, or `Bounds` (reasons in §9/§8). |
| Reduced motion inside the canvas | **The casing does not animate at all in v1.** `frameloop="demand"`, one `invalidate()` on mount, no `useFrame` anywhere. | The gate (§6) already refuses to load 3D under `prefers-reduced-motion`. With no animation there is nothing left to suppress, no `useFrame` gating, no `advance()` bookkeeping. Skipped: pointer parallax. Add when someone asks for it — and parallax the *lights*, not the device. |
| Screen recess | **Through-hole in the body half + a separate dark back-plate mesh a few units behind.** | `ExtrudeGeometry` has no blind-pocket option. The beveled rim is what reads as a recess; the plate stops it being a window onto the page background. |

---

## 1. STACK

### Remove

```
astro              ^7.2.4      (dependency)
@astrojs/check     ^0.9.10     (devDependency)
```

Also delete on disk: `astro.config.mjs`, `dist/`, `.astro/`.

### Install

```jsonc
"dependencies": {
  "next": "16.3.1",
  "react": "19.2.8",          // EXACT — no caret. See risk R1.
  "react-dom": "19.2.8",      // EXACT
  "three": "0.185.1",
  "@react-three/fiber": "9.7.0",
  "@react-three/drei": "10.7.8",
  "zod": "4.4.3"
},
"devDependencies": {
  "typescript": "^6.0.3",     // KEEP THE INSTALLED VERSION. See risk R6.
  "@types/three": "0.185.4",
  "@types/react": "*",        // resolve at install time
  "@types/react-dom": "*"
}
```

`engines.node: ">=22.12.0"` stays (next requires `>=20.9.0`).

Scripts:

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "preview": "npx serve out"
}
```

`next start` does **not** work with `output: 'export'`. `next lint` was **removed in Next 16** — if you want ESLint, invoke `eslint` directly with `eslint-config-next@16.3.1`. This spec does not add ESLint; there is none today.

### Version confidence

- **Confident (verified via npm registry today):** next 16.3.1, react/react-dom 19.2.8, three 0.185.1, @react-three/fiber 9.7.0, @react-three/drei 10.7.8, zod 4.4.3, @types/three 0.185.4.
- **Deliberately not latest:** `typescript` — latest is **7.0.2**, installed is 6.0.3. TS 7 is the native-port rewrite and nobody verified it against next@16.3.1. Stay on 6.0.x; bump separately.
- **Not pinned, unverified:** `@types/react`, `@types/react-dom` — let npm resolve.
- **GitHub Actions tags** in §2's workflow (`checkout@v7`, `setup-node@v7`, `configure-pages@v6`, `upload-pages-artifact@v5`, `deploy-pages@v5`) were read from each repo's latest release today. If any 404s in CI, the current repo pins (`checkout@v5`, `deploy-pages@v4`) still work — drop back one major, do not block on it.

### Peer-dependency facts you need

- `@react-three/fiber@9.7.0` peers `react` and `react-dom` at `>=19 <19.3` — an **upper** bound. React 19.3 is already in canary. A `^19` range breaks installs the day it ships. Pin exactly.
- `@react-three/drei@10.7.8` peers `react ^19`, `three >=0.159`, `@react-three/fiber ^9.0.0`. Satisfied.
- Do **not** add `three-bvh-csg` (peers `three-mesh-bvh >=0.9.7`; drei depends on `^0.8.3` — you get two nested copies). You will not need CSG; see §4.

---

## 2. FILE TREE

```
app/
  layout.tsx                 Root layout: <html>/<body>, metadata, imports global.css. From Base.astro.
  layout.module.css          .site-header / .wordmark. From Base.astro's <style>.
  page.tsx                   The one route. Server Component. From index.astro.
  page.module.css            .identity/.types/.species/.vitals/.status-badge. From index.astro's <style>.
  icon.svg                   MOVED from public/favicon.svg. Next's file convention; auto-linked + hashed.
components/
  Screen.tsx                 Two-screen device shell, top/bottom props. Server Component. From Screen.astro.
  Screen.module.css          .device/.screen/.resting + the cased-layout rules (§5).
  Sprite.tsx                 'use client'. GitHub avatar + error fallback. From Sprite.astro.
  Sprite.module.css
  Term.tsx                   'use client'. Popover tooltip primitive. From Term.astro.
  Term.module.css
  TypeBadge.tsx              Server Component. From TypeBadge.astro.
  TypeBadge.module.css
casing/
  contract.ts                THE SEAM. Casing bbox + the two screen rects, in device px. No JSX, no three import.
  CasingGate.tsx             'use client'. Capability gate; renders {ready && <Casing/>} and sets data-cased.
  Casing.tsx                 'use client'. <Canvas>, camera fit, lighting rig. Skin-agnostic.
  gen4/
    Gen4Shell.tsx            The Gen 4/5 skin: all meshes for this shell.
    gen4.geometry.ts         Pure functions returning BufferGeometry. No React.
    gen4.materials.ts        The three MeshPhysicalMaterial definitions.
  shapes.ts                  roundedRectShape() + extrudeBeveled(). Shared by every skin.
lib/
  level.ts                   MOVES UNCHANGED (7 lines).
  types.ts                   MOVES UNCHANGED (6 lines).
  me.ts                      ONE LINE CHANGES: 'astro/zod' → 'zod'.
data/
  me.json                    MOVES UNCHANGED.
styles/
  global.css                 MOVES with two deletions (§3.7).
  tokens.css                 MOVES UNCHANGED (56 lines).
public/
  favicon.ico                unchanged
  fonts/departure-mono-latin.woff2   unchanged
  fonts/DepartureMono-LICENSE.txt    unchanged
next.config.mjs              output/basePath/images. 6 lines.
tsconfig.json                Next's generated one, plus resolveJsonModule.
package.json                 §1
.github/workflows/deploy.yml §2.3
```

**Deleted:** `src/` entirely (contents relocated as above), `astro.config.mjs`, `dist/`, `.astro/`, `public/favicon.svg` (becomes `app/icon.svg`).

**Note there is no `src/` in the target.** `app/`, `components/`, `lib/` etc. sit at the repo root. Using `src/` is equally valid; pick one and do not mix.

### 2.1 `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.PAGES_BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};
export default nextConfig;
```

- `basePath` resolves to `""` for this repo (it is a `<user>.github.io` user site, served at root). The line is a no-op today and one line of insurance if the repo is ever renamed.
- `trailingSlash: true` emits `/dex/<user>/index.html`, matching Astro's current directory format, so future URLs are stable.
- `images.unoptimized` is **insurance, not a feature**. In Next 16.3.1, `next/image` under `output:'export'` with the default loader builds **green** and emits `/_next/image/?url=…` URLs that 404 — the route does not exist in a static export. Nobody should import `next/image` here anyway (§3.4).

### 2.2 `tsconfig.json`

Let `next dev` generate it, then verify these are present: `"strict": true`, `"resolveJsonModule": true` (`lib/me.ts` imports JSON), `"jsx": "preserve"`, `"moduleResolution": "bundler"`, `"plugins": [{ "name": "next" }]`, and `next-env.d.ts` in `include`. Drop `allowImportingTsExtensions` (Astro-only). Next 16 rewrites tsconfig on first build (forces `jsx: "react-jsx"`, appends `.next/dev/types/**/*.ts` to `include`) — commit the result, do not fight it.

### 2.3 `.github/workflows/deploy.yml`

`withastro/action@v4` did checkout→build→artifact-upload in one step. It has no Next equivalent; the chain is explicit now. Artifact path changes from `dist/` to `out/`.

```yaml
name: Deploy

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false   # was true; do not kill a production deploy mid-flight

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with:
          node-version: 22
          cache: npm
      - run: npm ci
      - name: Setup Pages
        id: pages
        uses: actions/configure-pages@v6
      - name: Build
        run: npm run build
        env:
          PAGES_BASE_PATH: ${{ steps.pages.outputs.base_path }}
      - uses: actions/upload-pages-artifact@v5
        with:
          path: ./out

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v5
```

- Do **not** pass `static_site_generator: next` to `configure-pages` — it rewrites your config. Pass `base_path` through as an env var, which is what the official Next template does.
- **No `.nojekyll` needed.** Artifact-based Pages deploys never run Jekyll, so `_next/` serves fine. (`upload-pages-artifact` would strip a dotfile anyway.)
- Skip the `.next/cache` cache step. A cold build of this project is ~14 s.

### 2.4 Also update

- `.gitignore`: add `.next/`, `out/`. `dist/` and `.astro/` become dead entries — harmless, but delete the directories.
- `.claude/launch.json`: port `4321` → `3000`.
- `.vscode/launch.json`: `./node_modules/.bin/astro dev` → `npx next dev`.

---

## 3. MIGRATION MAP

12 files under `src/`, 667 lines. Four carry over untouched, one changes by one line, six are rewrites.

### 3.0 Carries over byte-for-byte

`src/lib/level.ts` → `lib/level.ts`. `src/lib/types.ts` → `lib/types.ts`. `src/data/me.json` → `data/me.json`. `src/styles/tokens.css` → `styles/tokens.css`.

### 3.1 `src/lib/me.ts` → `lib/me.ts` — one line

Line 1: `import { z } from 'astro/zod'` → `import { z } from 'zod'`.

Nothing else changes. `astro/zod` already resolves to zod 4.3.x and the registry's zod is 4.4.3 — same major, identical semantics for `z.object`, `.max()`, `.min()`, `z.enum`, `.parse()`. There is no zod 3→4 migration to do.

Keep `export const me = meSchema.parse(meData)` at module scope and keep `me` out of every `'use client'` file. Today it evaluates at build time. Import it from a client component and you ship zod (~13 KB min) to the browser to re-run a validation that already passed.

### 3.2 `src/layouts/Base.astro` (53 lines) → `app/layout.tsx` + `app/layout.module.css`

| Astro | Next |
|---|---|
| `import { ClientRouter } from 'astro:transitions'` + `<ClientRouter />` | **Delete both.** App Router does client-side nav through `<Link>` with no opt-in component. Astro's `.astro-route-announcer` live region is also gone, but Next ships its own built-in route announcer — no a11y loss. |
| `Astro.props` | destructured `{ children }: { children: React.ReactNode }` |
| `<slot />` | `{children}` |
| `title` prop | `export const metadata: Metadata` |
| favicon `<link>` | `app/icon.svg` file convention (auto-linked, hashed, basePath-aware — `metadata.icons` with a `/public` path is **not** basePath-prefixed) |
| `astro.config.mjs`'s `site` | `metadataBase: new URL('https://smresponsibilities.github.io')` |
| `<style>` block (17 lines) | `app/layout.module.css` |

**Move the accent out of the layout.** `Base.astro` computed `--accent`/`--accent-2` from the page's `accentTypes` and set them on `<html>` as a *string* `style`. Two problems: React throws on a string `style` prop, and `app/layout.tsx` is shared by every route so it cannot take per-page props — which breaks the moment `/dex/[username]` lands, since each entry needs its own accent.

Put them on a wrapper element **inside `app/page.tsx`**:

```tsx
const accent = {
  '--accent': `var(--t-${me.types[0]})`,
  '--accent-2': `var(--t-${me.types[1] ?? me.types[0]})`,
} as React.CSSProperties;   // the cast is required: custom properties are not in CSSProperties
```

`tokens.css` already declares site-wide fallbacks (`--accent: var(--t-dragon)`), so nothing goes uncoloured if a page omits the wrapper.

### 3.3 `src/components/Screen.astro` (85 lines) → `components/Screen.tsx` + `.module.css`

**Named slots do not exist in React.** A wrong port here renders a device with two empty screens, no console output, and a passing build.

```tsx
export default function Screen({ top, bottom }: { top: ReactNode; bottom?: ReactNode })
```

- `<slot name="top" />` → `{top}`
- `<slot name="bottom" />` → `{bottom ?? <resting fallback/>}`
- `Astro.slots.has('bottom')` → `bottom != null`
- Call site: `<Fragment slot="top">…</Fragment>` → `<Screen top={<>…</>} />`

The `<style>` block moves verbatim, plus the new cased-layout rules from §5. Note it already contains `@media (min-width: 768px) { .device { grid-template-columns: 1fr 1fr } }` — that stays; it is a layout-mode switch, not a hardcoded dimension.

### 3.4 `src/components/Sprite.astro` (96 lines) → `components/Sprite.tsx` (`'use client'`)

Stays a plain `<img>` — remote runtime URL, and BUILD.md forbids stored images for people. Do not reach for `next/image`.

- `style={\`width:${size}px; height:${size}px\`}` → `style={{ width: size, height: size }}`
- `class:list={['sprite', { shiny }]}` → template literal
- The 14-line `astro:page-load` sweep **deletes entirely**. It becomes `useState` + `onError`.

**The fallback has a real bug in the naive port.** The `<img src>` is in the prerendered HTML, so the browser can fire `error` before React hydrates and attaches the listener — the "UNIDENTIFIED SPECIES" fallback then never appears and the user sees a broken-image icon, with nothing logged. Pair the handler with a mount check:

```tsx
const [failed, setFailed] = useState(false);
const check = useCallback((img: HTMLImageElement | null) => {
  if (img?.complete && img.naturalWidth === 0) setFailed(true);
}, []);
// <img ref={check} onError={() => setFailed(true)} ... />
```

Keep `.sprite-fallback[hidden] { display: none }` in the module — the base rule sets `display:flex`, which would otherwise defeat the `hidden` attribute.

### 3.5 `src/components/Term.astro` (105 lines) → `components/Term.tsx` (`'use client'`)

The highest-risk file. Three separate traps.

**Trap 1 — `Math.random()` for the id.** Stable under Astro (build-time only). Under React it produces a different string during prerender than during hydration: React logs a hydration mismatch *and* the button's `popoverTarget` points at an id that does not exist in the live DOM, so **every tooltip silently stops opening**. Use `useId()`. (Do not build a CSS selector from it — React 19's `useId` output contains delimiter characters. `getElementById` and `popoverTarget` are fine.)

**Trap 2 — bare `popover`.** In JSX, `<span popover>` means `popover={true}`, which React serialises as `popover="true"`. Per spec the attribute is enumerated (`auto` / `""` / `hint` / `manual`) with an **invalid-value default of `manual`** — so the tooltip becomes a manual popover and light-dismiss *and Escape* both stop working. It will look fine under mouse testing because Term's own handlers close it on `mouseleave`/`blur`, and it fails exactly the keyboard criterion ticket 21 lists. **Write `popover="auto"` explicitly.**

**Trap 3 — the `astro:page-load` sweep.** Ported verbatim it registers a listener for an event that never fires: no error, no warning, tooltips just never gain hover/focus behaviour. Delete the script, the `data-term-bound` guard and the `getElementById` lookup. It becomes four props.

```tsx
'use client';
import { useId, useRef } from 'react';
import s from './Term.module.css';

export default function Term({ label, tip, children }: {
  label: string; tip: string; children?: React.ReactNode;
}) {
  const id = useId();
  const tipRef = useRef<HTMLSpanElement>(null);
  const show = () => { const el = tipRef.current; if (el && !el.matches(':popover-open')) el.showPopover(); };
  const hide = () => { const el = tipRef.current; if (el?.matches(':popover-open')) el.hidePopover(); };
  return (
    <>
      <button
        type="button"
        className={children ? `${s.term} ${s.plain}` : s.term}
        popoverTarget={id}
        aria-label={label}
        onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}
      >
        {children ?? label}
      </button>
      <span ref={tipRef} popover="auto" id={id} role="tooltip" className={s.tip}>{tip}</span>
    </>
  );
}
```

The `:popover-open` guards matter: calling `showPopover()` on an already-open popover throws `InvalidStateError`.

The 55-line `<style>` block moves verbatim into `Term.module.css`. **Preserve the `transition: … display var(--dur-fast) allow-discrete, overlay var(--dur-fast) allow-discrete` line and the `@starting-style` block** — drop either and the exit transition stops running.

### 3.6 `src/components/TypeBadge.astro` (27 lines) → `components/TypeBadge.tsx`

`style={\`border-color: var(--t-${type})\`}` → `style={{ borderColor: \`var(--t-${type})\` }}`. That is the whole change. The `import type { PokemonType }` is already `verbatimModuleSyntax`-correct.

There is a latent oddity that survives: the inline style sets `border-color` while the class sets the `border` shorthand. Inline wins on the longhand, so it works — in Astro today and in React tomorrow. **Do not "fix" it** by moving the colour into the module.

### 3.7 `src/styles/global.css` → `styles/global.css` — delete two rules

The file works as a Next global stylesheet imported from `app/layout.tsx`. But **CSS Modules hash class names**, and two global selector lists reference classes that will be module-owned. When `className={s['dex-no']}` renders `page_dex-no__a1b2c`, these stop matching, with no error:

```css
/* DELETE both of these from global.css */
.stat-value, .dex-no, .playtime, .level, .counter { font-variant-numeric: tabular-nums slashed-zero; }
.type-badge, .status-badge, .term, .vitals dt, .wordmark,
.fallback-label, .resting-label { user-select: none; }
```

Symptoms if you miss it: the level and dex numbers lose tabular figures and jitter as the level ticks (the file's own comment says "numbers that change must not jitter"), and every piece of chrome becomes text-selectable, breaking BUILD.md §4.2.

**Fix:** move each declaration into the module rule that owns the class. `font-variant-numeric` into `page.module.css`'s `.dex-no` and `.level`; `user-select: none` into `TypeBadge.module.css`'s `.type-badge`, `page.module.css`'s `.status-badge` and `.vitals dt`, `Term.module.css`'s `.term`, `layout.module.css`'s `.wordmark`, `Sprite.module.css`'s `.fallback-label`, `Screen.module.css`'s `.resting-label`. Do all twelve in one pass.

Everything else in `global.css` — the `@import`, `@font-face`, reset, `:focus-visible`, `::selection`, the `prefers-reduced-motion` backstop — carries over unchanged.

**`@keyframes` scope flips.** Astro did *not* scope keyframe names; CSS Modules do, per file. Today `blink` is defined and used in Screen, `oscillate` in Sprite — so a mechanical port is safe. Never move a `@keyframes` into `global.css` while leaving its `animation:` in a module, or it silently stops animating.

### 3.8 `src/pages/index.astro` (127 lines) → `app/page.tsx` + `app/page.module.css`

Stays a **Server Component** — all its data is build-time. No `'use client'`.

The frontmatter (`level()`, `dexNo` padding, the `TYPE_NOTES` and `STATUS_NOTES` lookup tables) moves in unchanged. The markup maps mechanically: `<Base title=…>` disappears into `layout.tsx` + `metadata`; the accent wrapper from §3.2 goes here; `<Fragment slot="top">` becomes `top={<>…</>}`; the `.map()` over `me.types` needs a React `key`.

### 3.9 Complete Astro-API census — 18 call sites

Every framework-specific line in the repo, so you can grep for stragglers:

`lib/me.ts:1` astro/zod · `Base.astro:2,27` ClientRouter import + element · `Base.astro:14` Astro.props · `Base.astro:33` `<slot/>` · `Screen.astro:4` Astro.slots.has · `Screen.astro:9,13` named slots · `Term.astro:13` Astro.props · `Term.astro:15` Astro.slots.has · `Term.astro:19` class:list · `Term.astro:24` `<slot>{label}</slot>` (slot-with-fallback → `{children ?? label}`) · `Term.astro:104` astro:page-load · `Sprite.astro:8` Astro.props · `Sprite.astro:18` class:list · `Sprite.astro:95` astro:page-load · `TypeBadge.astro:8` Astro.props · `index.astro:29` `<Fragment slot>`.

Plus 24 `class=`/`style=` attribute sites → `className=`/`style={{}}`.

**Not in use, nothing to migrate:** Astro content collections (there is no `src/content.config.ts` — `me.json` is validated ad hoc in `lib/me.ts`), `client:*` directives, `Astro.glob`, `getStaticPaths`, middleware, integrations.

### 3.10 Order of work

1. Land the Next scaffold, config, tsconfig and workflow with the four carry-over files and the one-line zod swap. **Get a static export deploying before touching a component.**
2. Port components bottom-up: TypeBadge → Sprite → Term → Screen.
3. Port `index.astro` and `Base.astro` last.
4. Delete `astro.config.mjs`, `dist/`, `.astro/`, the three astro deps.
5. Update `BUILD.md` §1/§2/§3/§5.2/§6/§7 and `DECISIONS.md` (77 Astro mentions across the two; ticket 21 criterion 9 requires it).
6. **Only then** start §4.

Verify the migration with keyboard-only navigation (Tab to each Term, Escape to close), a deliberately broken avatar username, and a computed-style check of `font-variant-numeric` on the level number. Loading the page catches none of the four silent breaks.

---

## 4. THE 3D CASING

### 4.1 Coordinate system and the orientation flip

**One world unit = one CSS pixel, exactly, at every viewport width.** This is the load-bearing decision and everything else falls out of it.

R3F's `updateCamera` sets, for any orthographic camera without `camera.manual`, exactly `left = -width/2, right = width/2, top = height/2, bottom = -height/2`, and re-runs on every resize. So with `<Canvas orthographic camera={{ zoom: 1, position: [0,0,500] }}>`, world units are canvas CSS pixels with the origin at the canvas centre, forever. Model in the measured pixel values, then fit with one number:

```ts
camera.zoom = containerWidth / CASING_W;
```

That satisfies "fluid, never hardcoded per-breakpoint" with a single line, and it is the only arrangement where the DOM screens are *guaranteed* to land in the bezel openings at every width, because both layers compute from the same constants in the same units.

**Do not use a perspective camera and do not tilt the device.** A tilt makes the bezel openings non-axis-aligned in screen space, and the DOM screen layer could then only follow by replicating the projection as a CSS 3D matrix — which wrecks text rendering, focus rings, and native Popover positioning. Depth comes from the bevel, the lighting and the protruding housings.

**Do not use `drei <Bounds fit observe>`** to do the fit. It *animates* the camera (`maxDuration`, `interpolateFunc`), which is motion the reduced-motion rule must suppress and which makes the camera state async — the DOM screens would chase a moving target.

**The orientation flip.** The reference is a portrait DS: two halves stacked, horizontal hinge. This project is landscape: halves left and right, **vertical** hinge, per `DECISIONS.md` §S3. Ratios are preserved against the same `W = 425`.

So each half is `340 × 425` (was `425 × 340`). Origin at the device centre, x right, y up:

```
DEVICE_W = 700   (340 + 20 hinge + 340)
DEVICE_H = 425
left half   x ∈ [-350, -10]   right half  x ∈ [10, 350]
hinge strip x ∈ [-10, 10], full height, sits behind the halves
bezel/screen hole: 297 square centred at (±180, 0); active screen 290 square
lens housing:  144 × 297, x ∈ [-494, -350], centred in y   (protrudes left)
d-pad housing: 170 × 340, x ∈ [ 350,  520], centred in y   (protrudes right)
CASING_W = 1014   (-494 → 520)
CASING_H = 425
```

The measured bezel insets are 63 on the short axis and 22/21 on the long axis — i.e. **centred within a pixel or two in both directions**. Treat the bezel as centred in its half; do not carry the asymmetry.

Depths are **not** in the measurement set (the reference is flat DOM) and are yours to tune. Starting values, all as ratios of W:

```
body half depth      0.055 W ≈ 23
bevel radius         0.014 W ≈ 6
hinge barrel radius  0.024 W ≈ 10
housing proud of face  +6 in z
well recessed          −4 in z
cross proud of well    +5 in z
back-plate at z        −8
```

### 4.2 `casing/contract.ts` — the seam

The only module both the casing and the DOM layer read. No React, no three import.

```ts
export const CASING = {
  w: 1014, h: 425,          // bounding box in device px, protrusions included
  // screen rects, in device px, origin at the bbox top-left
  screens: [
    { x: 169, y: 67.5, size: 290 },   // left  (device x −325 → −35)
    { x: 529, y: 67.5, size: 290 },   // right (device x   35 →  325)
  ],
} as const;
```

Derivation: bbox left edge is device `x = −494`; left active screen spans `[−325, −35]`, so `−325 + 494 = 169`. `y = (425 − 290) / 2 = 67.5`.

The DOM layer converts to percentages (`169/1014 = 16.67%`, `290/1014 = 28.60%`, `67.5/425 = 15.88%`, `290/425 = 68.24%`). Nothing else in the app reads this file.

**A second generation ships its own `CASING` object** — a Game Boy is a different bbox with a different screen rect — and the DOM layer reads whichever the active skin exports. The rule is: **a casing may define the box, but nothing inside the box may read the casing.** The screen components have no knowledge that a casing exists.

### 4.3 `casing/shapes.ts` — the shared primitive

**RoundedBox and ExtrudeGeometry are not alternatives.** drei's `RoundedBox` *is* `extrudeGeometry` with `bevelEnabled: true` plus `toCreasedNormals` — read its source. Its only limitation is a single `radius` for all four corners, coupled to the bevel depth, which cannot express the reference's `6px 25px 6px 6px`. So write the Shape yourself and get RoundedBox's exact bevel quality plus per-corner control.

```ts
import * as THREE from 'three';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

/** w×h rectangle centred on the origin, per-corner radii [tl, tr, br, bl]. */
export function roundedRectShape(w: number, h: number, r: [number,number,number,number]) { /* … */ }

export function extrudeBeveled(shape: THREE.Shape, depth: number, bevel = 6) {
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: depth - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 12,
    steps: 1,
  });
  geo.center();
  return toCreasedNormals(geo, THREE.MathUtils.degToRad(30));   // 30°, NOT drei's 22.9°
}
```

**The `toCreasedNormals` call is mandatory and the angle is not arbitrary.** `ExtrudeGeometry` never calls `setIndex`; it writes a non-indexed position attribute and runs `computeVertexNormals()`, giving per-face normals — measured, a beveled disc comes out 100% faceted (480 split-normal vertex groups, 0 shared). The facet angle across a bevel is `90 / bevelSegments` degrees: at `bevelSegments: 4` that is **23.5°**. drei's `RoundedBox` uses `creaseAngle: 0.4 rad` (22.9°) and gets away with it *only because it internally doubles bevelSegments to 8* (13.4° facets). Copy drei's 22.9° onto your own `bevelSegments: 4` and the bevel stays visibly faceted. Use **30° with bevelSegments 4**, or 45° with 3.

Vertex budget is a non-issue: one body half with a screen hole measures ~6.3 k verts at these settings; the whole device lands at 30–40 k, rendered once. Spend vertices on `bevelSegments` and `curveSegments` — that is what makes it read as moulded plastic instead of geometrical symbols, which is exactly what the first attempt was rejected for.

### 4.4 Part-by-part

**Body halves** (2 meshes, shell material). One `roundedRectShape(340, 425, …)` per half with per-corner radii matching the reference's `6 / 25 / 6 / 6` mapped through the orientation flip — the 25px corner is the device's outer-top corner on each half. Push **exactly one** `THREE.Path` hole into the Shape: the 297 screen window, rounded corners ~8. Extrude at depth 23.

> **Why exactly one hole.** Overlapping `Shape.holes` silently corrupt triangulation — no throw, no console warning, and *fewer* vertices than the correct version (measured 13146 vs 13410, with stray front-face triangles inside what should be an empty screen hole). The reference layout puts the D-pad and lens assemblies close to and partly overlapping the body face. Keeping every protruding housing as its **own mesh laid on top of the body face**, rather than as extra holes in the body Shape, removes the entire failure class. Do that.

**Screen back-plate** (1 mesh, dark housing material). A flat `PlaneGeometry(297, 297)` per half at `z = −8`, behind the through-hole. The beveled rim of the hole is what sells the recess; the plate stops it being a window onto the page background.

**Hinge** (1 mesh). `CylinderGeometry(10, 10, 425, 24)` rotated to run vertically, at `x = 0`, sunk slightly in z so it reads as a barrel between the halves. Shell material, or slightly darker.

**Lens housing** (1 mesh + 4 dot meshes or one instanced set). `roundedRectShape(144, 297, [72, 20, 20, 72])` — the left corner radii at half the width give the half-round end. Extrude at depth 23, positioned at `x = −422`, proud of the body face by 6. Dark housing material.
The **2×2 dot grid**: 13 diameter (`0.031 W`), spacing **70 in x, 85 in y**, centred in the housing. These *can* be holes in the housing Shape — they are far from any other cut and cannot overlap. Cheaper and more correct than four separate meshes, and each gets a beveled rim for free. Put a near-black plate behind them.

**D-pad assembly** (4 meshes, layered in z — **not** cut into the body). Straddles `x = 350`, so it overlaps the body face; that is why it is its own group.
- outer housing: `roundedRectShape(170, 340, [20, 85, 85, 20])` (right end half-round), dark housing material, `z +6`
- inner housing: `roundedRectShape(212, 276, …)` at the measured ratio, `z +8`, marginally lighter
- circular well: `CylinderGeometry(68, 68, 6, 48)` laid flat, `z +4` — recessed relative to the inner housing. Diameter 136 = `0.320 W`.
- the cross: two rounded-rect extrusions, `61 × 13` (`0.144 × 0.031 W`), radius 4, perpendicular, light-grey control material, `z +13`. In the reference they are *not* concentric — the horizontal bar sits at `(600, 659)` and the vertical at `(623, 635)` relative to a well at `(562, 598)`, i.e. offset within the well. Preserve that offset; it is part of why the reference reads as a real object.

**Buttons.** The reference's measurement set contains **no face buttons** — only two 17px (`0.040 W`) light-grey **edge dots** on the outer edge of one half, which read as shoulder-button ends. Model those two as short cylinders on the right half's outer edge. Add one emissive indicator LED (`0.040 W`, `MeshBasicMaterial` in the accent colour, or `emissive` on the physical material) near the hinge, per ticket 20's "indicator light". **Do not invent A/B buttons.** They are not measured, and a button that looks interactive and is not is a WCAG failure by this project's own rule.

**Speaker grille.** Also not in the measurement set; ticket 20 asks for "speaker detail". Ship a `4 × 6` grid of `0.031 W` (13px) dots on the right half's face near the hinge, via `drei <Instances>`. This is the **only** part in the device that crosses the ~50-copies threshold where instancing beats merging — measured, 24 dots merged is 2400 verts in one draw call and instanced is 100 verts in one draw call; both are one draw call, so use instancing here for tidiness and merge everything else.

**Merging.** Everything static and non-repeated — body halves, hinge, rails, housings, cross bars — merges by material via `mergeGeometries` from `three/examples/jsm/utils/BufferGeometryUtils.js` into three meshes (shell / dark housing / light control) plus one `InstancedMesh`. Build all of it inside a `useMemo` keyed on the ratio constants so a skin change rebuilds once, not per frame.

**No CSG.** Every cut this casing needs is a hole through a face, which `Shape.holes` does natively with a correct bevel at build time. `LatheGeometry` is also unnecessary — the one surface of revolution (the lens end) is a stock rounded-rect corner.

### 4.5 Materials — `gen4.materials.ts`

`MeshStandardMaterial`'s defaults are `roughness 1.0 / metalness 0.0`: chalky, and most of why the first attempt read as a flat gradient box. Injection-moulded ABS is a pigmented diffuse body under a thin specular skin — which is literally what `clearcoat` models. Use `MeshPhysicalMaterial`. **`metalness: 0` everywhere**; any metalness on plastic reads as toy metal instantly.

```
shell            metalness 0, roughness 0.45, clearcoat 0.6,  clearcoatRoughness 0.25, envMapIntensity 0.8
dark housing     metalness 0, roughness 0.75, clearcoat 0.15
light control    metalness 0, roughness 0.55, clearcoat 0.3
```

Colours come from **this project's tokens**, not the reference palette (`DECISIONS.md` §S3). What is worth keeping from the reference is the *relationship*: a three-stop light→dark gradient on the shell, near-black for control wells, light grey for pressed plastic. In 3D you get that gradient from the lighting, not from a texture — that is the whole point of the medium change.

**These numbers are informed judgement, not measurement.** Expect to tune `roughness` and `clearcoat` against a screenshot. They are the right neighbourhood; those two knobs are the ones to turn.

### 4.6 Lighting rig — procedural, zero files

**Do not use `<Environment preset="studio">`.** It hardcodes `CUBEMAP_ROOT = 'https://raw.githack.com/pmndrs/drei-assets/…'` and downloads a 1k `.hdr` at runtime — a third-party runtime dependency for a static GitHub Pages site, and an asset download this project does not do.

The `children` form is fully procedural: it creates a `WebGLCubeRenderTarget`, portals the children into a virtual scene, and bakes with a `cubeCamera`. `frames` defaults to **1** and the bake runs once in `useLayoutEffect`, so a static shell costs one cube render at mount and nothing per frame. Lightformers live only in the virtual scene — they never appear as visible geometry.

```tsx
<Environment resolution={256} frames={1}>
  <Lightformer form="rect"   scale={[10, 10, 1]} intensity={2}   position={[-5,  5, 5]} />  {/* key softbox, front-left */}
  <Lightformer form="rect"   scale={[8,  8,  1]} intensity={0.6} position={[ 6,  1, 4]} />  {/* fill, right */}
  <Lightformer form="rect"   scale={[0.5, 8, 1]} intensity={3}   position={[ 0,  6, 3]} />  {/* grazing streak → the gloss highlight */}
  <Lightformer form="circle" scale={[6,  6,  1]} intensity={0.4} position={[ 0, -5, 3]} color="#ffddcc" />
</Environment>
<ambientLight intensity={0.15} />
<directionalLight position={[-3, 4, 6]} intensity={0.8} />
<ContactShadows position={[0, -CASING.h / 2, 0]} opacity={0.4} blur={2.5} />
```

The narrow grazing rect is the one that produces the long specular streak along a moulded edge — it is what makes glossy plastic look glossy. Set `<Canvas shadows={false}>`; `ContactShadows` (a single blurred plane, baked once under `frameloop="demand"`) is cheaper than a shadow map and is all this needs.

### 4.7 `casing/Casing.tsx`

```tsx
'use client';
import { Canvas, useThree } from '@react-three/fiber';
import { useLayoutEffect } from 'react';
import { CASING } from './contract';

function Fit() {
  const { camera, size, invalidate } = useThree();
  useLayoutEffect(() => {
    camera.zoom = size.width / CASING.w;
    camera.updateProjectionMatrix();
    invalidate();                       // paint exactly one frame
  }, [camera, size.width, invalidate]);
  return null;
}

export default function Casing() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 1, position: [0, 0, 500] }}
      frameloop="demand"
      dpr={[1, 2]}
      shadows={false}
      gl={{ alpha: true, antialias: true }}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    >
      <Fit />
      <Gen4Shell />
      {/* lighting rig */}
    </Canvas>
  );
}
```

`Fit` re-runs on every resize because `size.width` is a dependency, and re-`invalidate()`s — a resize is not motion, and it must repaint or the canvas shows a stale frame at the wrong scale. **Never set `camera.manual = true`**: R3F only manages the frustum while `manual` is falsy, and setting it silently disables the resize handling the whole scheme rests on.

### 4.8 Swapping in a second generation

The seam is `contract.ts`, and it is a data object, not a component API.

1. Add `casing/gameboy/GameBoyShell.tsx` + its own geometry/materials modules, and its own `CASING` constant if the bbox differs.
2. `Casing.tsx` takes a `skin` prop and renders the matching shell; `CasingGate` imports the matching contract.
3. Nothing else changes. The screen DOM is a **sibling** of the canvas, never a child of the scene graph, so swapping shells cannot remount, restyle, or reposition anything inside the bezel — it can only change where the box is on screen.

This is also why `<Html>` was rejected: with it the screens would be children of the 3D scene, and a shell swap would remount the entire UI.

---

## 5. THE BEZEL CONTRACT

### 5.1 The technique that won

**Three flat layers, never nested.**

```
z-index  0   the DOM screen layer   — ordinary, untransformed React DOM
z-index -1   the <canvas>           — aria-hidden, pointer-events:none, decorative
             the CSS bezel          — always present; the universal floor (§6)
```

```tsx
// components/Screen.tsx (shape only)
<div className={s.device} data-cased={cased || undefined}>
  <CasingGate />                                  {/* absolutely positioned, z-index -1 */}
  <section className={s.screen} aria-label="Top screen"    style={rect(0)}>{top}</section>
  <section className={s.screen} aria-label="Bottom screen" style={rect(1)}>{bottom ?? resting}</section>
</div>
```

```css
.device[data-cased] { position: relative; display: block; aspect-ratio: 1014 / 425; max-width: var(--device-max); margin-inline: auto; }
.device[data-cased] .screen { position: absolute; overflow: auto; }   /* left/top/width/height from contract.ts */
```

Each screen's `style` comes from `contract.ts` as percentages: `left: 16.67%, top: 15.88%, width: 28.60%, height: 68.24%` and `left: 52.17%` for the second. Both layers derive from the same numbers in the same units, so they cannot drift.

Note `overflow: auto` on the cased screen: it is a fixed square, and content taller than 290 device-px must scroll rather than escape the bezel. A real handheld screen does the same.

### 5.2 Why not the alternatives

**`drei <Html transform>` — rejected on four counts, all verified in its source, not from reputation.**

1. It mounts children via `ReactDOM.createRoot(el)` and `root.render(…)` with **zero Provider wrapping**. React context does not cross a root boundary, so `next/link`, the router, and every app provider are unavailable inside it; the content is also client-only and never server-rendered, so it is absent from the initial HTML and uncrawlable.
2. `<Html occlude>` sets `el.style.display = 'none'`, which **removes the subtree from the accessibility tree** — not merely hides it visually. Camera angle would silently control screen-reader availability.
3. `transform` mode rasterises text then applies a hand-built `matrix3d` per frame. The spec's crisp 2px borders would not stay 2px, and the outline in `:focus-visible { outline: 2px solid }` is painted in local space *then* transformed — at 0.6 scale that is a 1.2px ring, and it foreshortens at an angle.
4. Native Popover renders in the **top layer**, which is not a descendant of a transformed subtree in paint order — the tooltip paints flat and unrotated while its trigger is rotated, and per `w3c/csswg-drafts#9705` Chrome does not account for ancestor scale when positioning anchored popovers. BUILD.md §6.4 puts a popover on **every Pokédex term on the site**. Every one would detach.

Its entire value proposition is perspective-warping DOM onto non-axis-aligned surfaces. Our screens are flat rectangles facing the viewer. There is no warp to buy, so all four costs are paid for nothing.

**Rendering UI to a texture — rejected outright.** A texture is pixel data on the GPU. No DOM node, so no a11y entry, no focus target, no text selection, no working `href`, no Popover. A screen reader encounters an empty `<canvas>`. Ticket 21 names this as not acceptable.

The research agents were unanimous here; this is not a close call.

### 5.3 What is `aria-hidden`

`aria-hidden="true"` goes on the **`<Canvas>` element itself** (R3F spreads unrecognised props onto its outer wrapper div, so this correctly hides the whole subtree), alongside `pointerEvents: 'none'`.

`aria-hidden` is the right tool here — and only here — precisely because the canvas subtree contains **nothing focusable**. A `<canvas>` contributes essentially nothing to the a11y tree on its own; the legacy Hit Regions API is dead and no engine ships it. R3F's `<Canvas>` renders no `tabIndex`, no `role` and no `aria-*` of its own.

**The moment anything focusable goes inside that subtree, `aria-hidden` becomes a focusable-but-hidden violation** and you would have to switch to `inert`. That is the strongest single argument for §7's approach.

Nothing in the screen layer is `aria-hidden`. The existing decorative bits keep their existing markers: `.resting-dot` and `.fallback-mark` stay `aria-hidden="true"` as they already are.

**WCAG 2.2 SC 2.4.11 (Focus Not Obscured, AA):** a focused component must not be entirely hidden by author content. A canvas layered *above* the DOM screens would fail it outright. Another reason the canvas sits behind at `z-index: -1`.

---

## 6. DEGRADATION

### 6.1 What the server renders — one code path, four jobs

`app/page.tsx` server-renders the **complete two-screen DOM plus the CSS bezel**, with no knowledge that 3D exists. That single output simultaneously *is*:

- the sub-768px state (existing `.device` grid, `grid-template-columns: 1fr`, screens stacked),
- the no-JS state,
- the no-WebGL state,
- the reduced-motion state.

The 3D layer is **purely additive**. Build the CSS bezel first. Build the 3D first and you ship a site that is broken for every one of those cases with no way to tell.

> **Correction to a stale note in the repo:** `.scratch/sm-dex/HANDOFF.md` claims ticket 20 is resolved and `src/components/casings/Gen4Casing.astro` exists. Commit `5bc796d` reverted that ("drop the rejected CSS casing, reopen ticket 20"). **No casing exists in the tree.** The CSS-bezel floor that everything above rests on has to be built as part of this work. Fix `HANDOFF.md` before anyone plans off it.

### 6.2 The gate

```tsx
// casing/CasingGate.tsx
'use client';
import dynamic from 'next/dynamic';
import { useLayoutEffect, useState } from 'react';

const Casing = dynamic(() => import('./Casing'), { ssr: false, loading: () => null });

export default function CasingGate() {
  const [ready, setReady] = useState(false);
  useLayoutEffect(() => {
    if (!matchMedia('(min-width: 768px)').matches) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (navigator.connection?.saveData) return;
    const probe = document.createElement('canvas');
    const gl = probe.getContext('webgl2', { failIfMajorPerformanceCaveat: true });
    if (!gl) return;
    gl.getExtension('WEBGL_lose_context')?.loseContext();   // Chrome caps ~16 contexts/tab
    setReady(true);
  }, []);
  return ready ? <Casing /> : null;
}
```

**The load-bearing detail: gate the JSX, not the import.** `dynamic()` returns a lazy component and the `import()` only fires when that **element first renders**. Writing `{ready && <Casing/>}` is what keeps the chunk off the wire; putting the condition on the import instead ships ~240 KB gzipped to every visitor. `display: none` does not prevent module evaluation either — only never mounting works.

**`ssr: false` is illegal in a Server Component.** Literal error: `` `ssr: false` is not allowed with `next/dynamic` in Server Components. Please move it into a Client Component. `` That is why `CasingGate` carries `'use client'` and `app/page.tsx` does not.

`loading: () => null`, never a spinner — decorative chrome must not announce its own loading.

**WebGL detection specifics that matter:** do not just check for the `WebGLRenderingContext` global. `getContext` returns `null` when WebGL is disabled. Firefox will hand back a context on a blocklisted GPU while flagging a "major performance caveat", so pass `failIfMajorPerformanceCaveat: true` — refusing a software rasteriser is exactly right for decorative chrome. Release the probe immediately.

768px is deliberately the **same** breakpoint at which `Screen.module.css` already flips `grid-template-columns` from `1fr` to `1fr 1fr`, so the gate and the layout agree by construction.

### 6.3 CLS

The gate must also flip the container into cased layout, and it must do so **before paint** or the accessibility feature introduces a layout shift on every desktop visit. Set `data-cased` from the same `useLayoutEffect` (lift the `ready` state to `Screen` or use a tiny context), so the box is reserved by `aspect-ratio` before the browser paints. The 3D chunk then arrives later and paints into an already-reserved box, causing no shift at all.

### 6.4 The honest bundle number

Measured with esbuild + gzip -9 against these exact versions, React external:

| | minified | gzipped |
|---|---|---|
| named `three` imports only | 522 KB | 132 KB |
| + R3F `<Canvas>` + a mesh | 899 KB | **241 KB** |
| + drei `Html` | 908 KB | 244 KB |
| + drei Html/RoundedBox/Environment/OrbitControls/useGLTF | 1051 KB | 289 KB |

R3F **defeats three's tree-shaking by design**: it does `import * as THREE from 'three'` and populates its JSX catalogue via `Object.assign(catalogue, objects)`. A dynamic namespace spread is opaque to bundlers, so the whole namespace is retained no matter how little you render. There is no supported "slim" three build.

Separately, the framework swap alone costs ~138 KB gz of React runtime on pages with zero interactivity, against the **57 KB the entire current Astro site weighs**. `DECISIONS.md` §P rejected the Next pivot on exactly those grounds. What changed is three.js: R3F is the reason to move, and the gate is what makes the override defensible — the 240 KB reaches only desktop, motion-tolerant, WebGL-capable visitors. `BUILD.md` §0.0.1 lists "Canvas 2D over WebGL" and "few runtime dependencies" as strong defaults overridable with a **stated reason**, so this needs an explicit `DECISIONS.md` row, not a silent `package.json` edit.

---

## 7. INTERACTIVITY

### 7.1 The technique: real transparent DOM buttons, not raycasting

R3F's pointer events are raycast-based and mouse-only: no tab stop, no Enter/Space, no role, no accessible name. `@react-three/a11y` patches that by synthesising hidden DOM per `<A11y>` wrapper — but it *emulates* focus (the ring is whatever you render in 3D), adds a dependency, and requires a shadow overlay kept registered against 3D positions.

Use **real `<button>` elements in the casing's DOM layer**, positioned by percentage from `contract.ts`, for three reasons specific to this project:

1. The casing must be a swappable layer — controls living in the casing's DOM make a Game Boy shell a JSX/CSS change, not a re-implementation of the a11y wiring.
2. The casing must **also** work in the non-3D fallback. A real `<button>` renders identically in the CSS bezel with zero extra code; raycast needs a whole second implementation of the same control.
3. It keeps `aria-hidden="true"` honest on the canvas, because nothing focusable lives inside the hidden subtree (§5.3).

Because the camera is fixed and orthographic and the casing never tilts, control positions are **static percentages** — no projection maths, ever. If the camera moved you would need `vector.project(camera)` per frame per control, which is the per-frame DOM cost that makes CSS2D/CSS3D renderers degrade.

### 7.2 The button recipe

**Do not use `opacity: 0`.** The focus ring inherits that opacity and becomes invisible, defeating the entire point. Keep the button fully opaque and make its *paint* transparent:

```css
.control {
  position: absolute;                 /* left/top/width/height from contract.ts, in % */
  background: transparent;
  border: 0;
  color: transparent;
  cursor: pointer;
}
/* global.css already supplies: :focus-visible { outline: 2px solid var(--focus); outline-offset: 2px } */
```

with the accessible name in a visually-hidden `<span>`. The focus ring then paints as a real, unscaled 2px ring on top of the 3D art.

Drive the 3D mesh's hover/press/focus visuals from the **DOM button's** React state (`onPointerEnter`, `:active`, `onFocus`) → `invalidate()`. Never from a parallel raycast. One source of truth.

### 7.3 `+ ADD POKEMON`

Ticket 20: "A labelled `+ ADD POKEMON` control sits at the top right and links to `/become`."

It is a real `<a href="/become">` (via `next/link` — a raw `<a>` does not get `basePath`), absolutely positioned at the casing's top right, visible text, no transparency trick needed. It is a link, not a button.

**`/become` does not exist yet — ticket 11 owns it.** A control that links to a 404 fails ticket 20's own standard. So: either land this control together with a `/become` route, or leave it out of this ticket. Do not ship a dead link. Flagged in §9.

### 7.4 The D-pad

**Ship it as decorative geometry in v1, with no interactive affordance.**

There is currently no selection anywhere on the site for a D-pad to page through. A D-pad drawn to look pressable that does nothing is a WCAG failure *by this project's own rule* — "any control that looks interactive must be interactive". Wiring it before it has a target would mean inventing a target.

Defer the wiring to ticket 08 (version selector) or 13 (dex roster), whichever first gives it a real selection. When that lands, it becomes four `.control` buttons per §7.2 positioned over the four arms of the cross, labelled "Previous entry" / "Next entry" etc. — and because they are ordinary DOM in the casing layer, they work identically in the CSS-bezel fallback with no second implementation.

Skipped: D-pad wiring. Add when there is something to page.

---

## 8. RISKS, RANKED

**R1 — React 19.3 breaks the install.** `@react-three/fiber@9.7.0` peers `react` at `>=19 <19.3`, an upper bound, and 19.3 is already in canary (`19.3.0-canary-eb8feb71-20260814`). *Mitigation:* pin `"react": "19.2.8"` and `"react-dom": "19.2.8"` exactly, no caret. Watch for an R3F 10 stable release (10.0.0-alpha.3 exists today — **do not adopt it**, nor drei 11).

**R2 — the four silent migration breaks.** Bare `popover` becoming `manual`; `Math.random()` ids killing every tooltip; the two CSS-Module-orphaned global selector lists; `onError` missing pre-hydration image failures. None throws, none logs, and a build passes with all four present. *Mitigation:* §3.5, §3.7, §3.4 give the exact fixes; verify with keyboard-only navigation, a broken avatar username, and a computed-style check — not by loading the page.

**R3 — overlapping `Shape.holes` corrupt geometry silently.** No throw, no warning, *fewer* vertices than correct, stray triangles inside the screen opening. *Mitigation:* body halves get exactly one hole each; every protruding housing is its own mesh laid on the face (§4.4). Add a dev-only assertion that hole bounding boxes do not intersect before extruding.

**R4 — faceted bevels.** `ExtrudeGeometry` is 100% faceted by construction, and copying drei's 22.9° crease angle onto your own `bevelSegments: 4` leaves it faceted. *Mitigation:* `toCreasedNormals(geo, degToRad(30))` with `bevelSegments: 4`. This is the difference between moulded plastic and geometrical symbols, which is what got the first attempt rejected.

**R5 — the 3D chunk ships to mobile anyway.** `dynamic(…, {ssr:false})` downloads on *mount*, and `display:none` does not stop module evaluation. *Mitigation:* gate the JSX, not the import (§6.2). Verify by loading at 375px with the network tab open and confirming no `three` chunk is requested.

**R6 — TypeScript 6 vs Next 16 is unverified.** Next's docs state a 5.1+ minimum and say nothing about 6 or 7. *Mitigation:* keep the installed 6.0.3 through the migration. If the `next` TS plugin misbehaves, this is the first thing to bisect — and it is a separate change from the stack move, not part of it.

**R7 — `next/image` builds green and 404s.** In 16.3.1 the historical hard error is gone; you get `/_next/image/?url=…` URLs against a route that does not exist in a static export. An SVG smoke test hides it, because `next/image` passes SVG through untouched. *Mitigation:* `images: { unoptimized: true }` in the config, and do not import `next/image` at all — sprites are remote `github.com/<user>.png`, so a plain `<img>` is strictly better.

**R8 — a duplicate copy of three.** drei depends on `stats-gl@2.4.2`, which pins `three@0.170.0`. Importing `Stats`/`StatsGl` ships a **second full copy of three**. `three-bvh-csg` does the same for `three-mesh-bvh`. *Mitigation:* never import those; no CSG.

**R9 — CLS from the gate.** Mounting the cased layout after paint shifts the page on every desktop visit. *Mitigation:* set `data-cased` in `useLayoutEffect` (before paint) and reserve the box with `aspect-ratio` (§6.3).

**R10 — class-name collisions, newly possible.** Astro scoping made `.screen`, `.device`, `.term`, `.tip`, `.shell`, `.hinge`, `.led`, `.speaker` collision-proof by construction. Flattened to globals they become reserved words — and the casing is explicitly swappable, so a Game Boy shell and a Gen 4/5 shell will both want `.shell` and `.hinge`. A second casing silently overriding the first is a bug with no error message. *Mitigation:* CSS Modules per component, which ticket 21 requires as an acceptance criterion anyway.

**R11 — concurrency.** Ticket 21 is `Status: claimed`; `CLAUDE.md` forbids editing a claimed ticket from another session (this already lost work on ticket 18 once). The repo also changed mid-research: `5bc796d` deleted `Gen4Casing.astro` while an audit was reading it. *Mitigation:* `git log --oneline -3` and `git ls-files src` before acting on any file list, including this one. New requirements for in-flight work go in a **new** ticket.

**R12 — the shell looks wrong on first render.** The material numbers in §4.5 and the Lightformer placement in §4.6 are informed judgement, and no agent rendered a single pixel to a real GL context — every geometry claim here is headless vertex/normal analysis. *Mitigation:* expect a tuning pass. Turn `roughness` and `clearcoat` first, then the grazing Lightformer's position; those three account for almost all of "does it look like plastic".

---

## 9. OPEN QUESTIONS

1. **Does the Next pivot survive its own cost?** The framework swap alone is ~138 KB gz of React runtime against the 57 KB the whole current site weighs, and `DECISIONS.md` §P rejected it on those grounds. Only R3F justifies it. If someone can get the Gen 4/5 shell convincingly in CSS gradients, `border-radius` and transforms for ~0 KB — which would also keep the casing *on* mobile instead of dropping it — the measured case for leaving Astro is weak. The user has directed the pivot, so build it; but this is the question to put in front of them once, not to assume away. `BUILD.md` §1.1, §0.0.1 line 47 and `DECISIONS.md` §P all need rewriting either way.

2. **`/become` does not exist.** §7.3. Either land a `/become` route with the `+ ADD POKEMON` control, or omit the control from this ticket. Engineer decides; do not ship a link to a 404.

3. **`--device-max: 900px`.** At 900px the cased layout gives each screen `900 × 290/1014 = 257px` — smaller than the current uncased screens. Either raise the token when cased, or accept it. Needs an eye on a real screen, not a calculation.

4. **Does screen content fit a 290-px square?** The cased screens are fixed-aspect. Current content (sprite 120 + types + h1 at `--fs-name: 40px` + species + a five-row `<dl>`) may well overflow. §5.1 specs `overflow: auto`, which is honest handheld behaviour — but if it scrolls on first load, the fix is content or scale, not a taller bezel, because the bezel is the contract.

5. **Depth values, bevel radius, housing z-offsets.** §4.1 gives starting ratios; none is measured (the reference is flat DOM). These get dialled in at the first render.

6. **Does the casing keep the `.device` grid at all?** This spec has two layouts (cased absolute, bare grid) switched by `data-cased`. An alternative is one absolute layout at all widths with the casing simply absent below 768px — fewer code paths, but it would fight the existing stacked mobile layout. Decide at the first render; the spec's version is the conservative one.

7. **`app/` at the repo root vs `src/app/`.** §2 uses the root. Either works; pick one before the first file lands.

---

**Do not start §4 until §3.10 steps 1–5 are done and deployed.** The migration is verifiable on its own; the casing is not verifiable at all until the migration is.