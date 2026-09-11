# Ticket 30 — eight source-locked casing packages

> Historical source archive only. Ticket 31 was rejected and ticket 32 retired its assets.
> The eight downloaded source copies remain unchanged, but that does not constitute visual
> approval. The derived `all-eight-source-preview` files were removed. Current source study and
> hybrid construction contract are in `../../research/restart/`. Do not execute the old prompts
> or extraction plan as the replacement build.

This directory replaces every ticket-23 and ticket-24 casing candidate. Nothing from those
directories is treated as approved.

## Exact source masters

| Skin | Master |
|---|---|
| Red/Blue | `rb-kanto-source-master.png` |
| Gold/Silver | `gs-johto-source-master.png` |
| Ruby/Sapphire | `rs-hoenn-source-master.png` |
| Diamond/Pearl | `dp-sinnoh-source-master.png` |
| HeartGold/SoulSilver | `hgss-johto-source-master.png` |
| Black/White | `bw-unova-source-master.png` |
| Sun/Moon | `sm-rotom-dex-source-master.png` |
| Scarlet/Violet | `sv-rotom-phone-source-master.png` |

Each master is a byte-for-byte copy of the frozen online reference. The 4 × 2 review layout is
`all-eight-source-preview.svg`; it is a derived preview, never an extraction source.

## Contracts

- `asset-manifest.json` freezes dimensions, hashes, state coverage, inert parts, neutral physical
  control IDs, and every future eight-slot component sheet.
- `BUTTON-UI-PORTFOLIO-MAP.md` defines held press behavior, per-casing application mappings,
  resulting UI state, and the identifying Shivam portfolio content each destination must show.
- `references/README.md` records provenance and explains the rejected ImageGen support attempts.
- `CHATGPT-MASTER-PROMPTS.md` at `.scratch/sm-dex/` contains the corrected eight-package prompt
  set. Generation is restricted to hidden support art.

No detached runtime component sheet is accepted yet. Ticket 31 owns extraction and the interactive
proof. This is deliberate: the attempted generated support sheet failed mask and alpha gates and
was kept outside the workspace.

## Validate

```powershell
python .scratch/sm-dex/assets/ticket-30/validate_source_lock.py
```

The command fails on source drift, missing packages, wrong dimensions or hashes, component plans
larger than eight slots, missing face/base pairs, missing UI captures, or an unexpected generated
support approval.
