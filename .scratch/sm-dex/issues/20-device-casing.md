# 20: Device casing — Gen 4/5

**What to build:** The two screens currently float as bare bordered panels. They should sit inside a
**physical handheld**: a drawn casing with a hinge seam, a directional control, speaker
detail, an indicator light, and a labelled `+ ADD POKEMON` control at the top right.

The casing belongs to the **Gen 4/5 skin specifically** - every generation gets its own object
eventually (a Game Boy for Gen 1, the red hinged dex for Gen 3, almost nothing for the modern
skin). This ticket builds the first one and leaves the rest additive.

**The bezel is the contract.** Everything inside it - layout, components, type, content - is
shared across all skins and must not change. Everything outside it is this skin's casing and is
free to vary. See `DECISIONS.md` sections S and T.

**Three things this must not become:**

1. **A bitmap.** The reference implementation (`moizm.dev`) uses a fixed-aspect background image
   with content pinned on by per-breakpoint margins, which is why that site opens with a
   "best viewed on a larger screen" warning. Draw it in CSS and inline SVG so it reflows.
2. **A stacked layout.** A DS hinge is horizontal because its screens stack vertically. Ours sit
   **side by side** at desktop, so the seam runs **vertically** between them. Do not restack the
   layout to make a clamshell read more literally.
3. **Structure.** The casing is chrome. Below the breakpoint it thins to a bezel or disappears
   entirely, and the two screens carry on unchanged.

**Blocked by:** None (can start immediately)

**Status:** ready-for-agent

- [ ] Casing is drawn entirely in CSS and inline SVG - no image files
- [ ] Screens sit side by side at desktop with the seam running vertically between them
- [ ] Casing thins to a bezel or disappears at 375px; the screens are unaffected
- [ ] Gradients and shadows appear **only** on the casing, never inside the bezel
- [ ] Casing colours come from tokens; no new colour values introduced
- [ ] A labelled `+ ADD POKEMON` control sits at the top right and links to `/become`
- [ ] Any drawn control that looks interactive **is** interactive - a directional control pages
      the selection, or it is not drawn at all
- [ ] Controls are real buttons: keyboard reachable, focus visible, correctly labelled
- [ ] No Nintendo assets - no Poke Ball logotype, no Pokemon logo, no stored background image
- [ ] Adding a second generation's casing later requires no change inside the bezel
