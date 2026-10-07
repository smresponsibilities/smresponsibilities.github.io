# 01: Scaffold and deploy a live page

**What to build:** The site's public URL shows a page with Shivam's name, species and both types, read from a
data file rather than written into the markup. Editing that file and pushing changes what the
page says.

This is the tracer bullet: the thinnest complete path through data, validation, rendering, CI
and hosting. It proves the whole chain works before any design effort goes in. Deliberately
ugly at this stage.

**Blocked by:** None (can start immediately)

**Status:** resolved

- [x] Astro project builds with no type errors
- [x] Name, species and both types come from data, not markup
- [x] An invalid type value fails the build - verify by temporarily breaking one
- [x] Design tokens defined; no hard-coded colour outside the token files
- [x] Pushing to main deploys automatically and a public URL serves the page
- [x] Lighthouse accessibility >= 95

## Handoff

**Built:** Astro 7 + TS scaffold. `src/data/me.json` (name, species, types) validated at build
time by a Zod schema in `src/lib/me.ts` — a bad type value throws and fails the build (verified
by temporarily setting `"chaos"` as a type, confirming a non-zero exit, then reverting).
`src/styles/tokens.css` holds every colour; nothing hard-coded elsewhere. `/` renders name,
species and `TypeBadge` per type from that data. Repo `smresponsibilities.github.io` created,
`deploy.yml` (withastro/action → actions/deploy-pages) deploys on push to `main`, Pages source
set to GitHub Actions. Live at https://smresponsibilities.github.io/. Lighthouse accessibility:
100 (measured with `npx lighthouse --only-categories=accessibility` against `astro preview`).

**Deviated:**
- Astro scaffolded at **v7.2.4**, not the "Astro 6" BUILD.md §1 names — `npm create astro@latest`
  (the literal instruction) now installs 7. Content-collections API (`file()` loader) is
  unchanged since v5, so nothing in BUILD.md §3/§9 breaks.
- Did **not** write `src/content.config.ts` or the `roster`/`moves`/`encounters`/`entries`
  collections from BUILD.md §3 yet. `me.json` is explicitly not a collection ("import it
  directly" — BUILD.md §3), and this ticket's checklist only needs name/species/types validated.
  Building the other four collections now would be building ahead of scope ("not the next
  one" — PROMPT.md). `content.config.ts` should land with whichever ticket first consumes a
  real collection (moves: 05, encounters: 06, entries: 08, roster: 12/13) — write it exactly as
  BUILD.md §3 specifies at that point.
- `src/lib/types.ts` exports `TYPES` as a small standalone module (not inline in
  `content.config.ts` as BUILD.md §3's snippet shows), so `lib/me.ts` can reuse the same enum
  without a duplicate literal or a premature `content.config.ts`. When `content.config.ts` is
  written, import `TYPES` from here instead of re-declaring it.
- No `skins.css`, no `Screen.astro` device shell, no other components from the BUILD.md §2 file
  tree — out of this ticket's scope (device shell is 02, skins are 5c).
- No `README.md` at repo root — not in this ticket's acceptance checklist; ticket 15 (Ship) owns
  documenting the Astro-over-Next decision there.

**Watch out:**
- `content.config.ts` doesn't exist yet — the next ticket that adds a collection needs to create
  it (copy BUILD.md §3 verbatim) and add the matching placeholder JSON file(s) under `src/data/`.
- Repo is public, at `github.com/smresponsibilities/smresponsibilities.github.io`, `origin` is
  already set. GitHub Pages source is "GitHub Actions" — don't switch it to "Deploy from a
  branch" or `deploy.yml` stops taking effect.
- `astro.config.mjs` `site` is the `.github.io` fallback per BUILD.md §5. Update it (and nothing
  else should need to change) once the real domain is bought.
- `npx lighthouse` on Windows throws an `EPERM` cleanup error on its temp dir *after* writing
  results — harmless, the JSON output is already flushed by then. Don't mistake it for a failed
  run.
