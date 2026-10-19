# Handoff - 2026-10-19, after Tooltip Group Implementation for / Hints

## State
Resolved: 119, 120, 121, 122, 124, 125, Entity-Footprint-Expansion, Resume-Dynamic-Metrics, Weekly-Sync-Pipeline, Parasite-SEO-Step1-And-Syndication-Drafts, Menu-And-Simulator-Integration, GitHub-DR96-Parasite-Deployment, GitHub-All-Repos-Optimization, Flight-Sun-Tracker-Geodesic-Refactor, Flight-Sun-Tracker-Nextjs-Security-Patch, Live-App-Demo-Link-Audit-And-Restoration, SEO-Technical-Hardening-And-Case-Studies, Live-Hosting-Feasibility-And-Interactive-Browser-Demos, Entity-Disambiguation-AEO-Comparison-Hardening, Anchor-Alignment-Clickability-GSC-Endorsements, Blog-Crosslinking-Engine-And-Pinned-Milestones, Interior-Dev-Reading-Progress-Component, Vertical-Reading-Progress-And-Scroll-Spy, ScrollSpy-Interior-Dev-Refactor, ScrollSpy-Vertical-No-Truncate, Header-Unification-And-RSS-Removal, Blog-Index-Tag-Input-Interior-Dev, Drawer-Close-And-Subpage-Nav-Buttons, Interior-Dev-Tag-Input-Fidelity, Search-Relevance-And-Streak-Day-Regex, Interior-Dev-FilterGrid-Fusion, Interior-Dev-Drawer-And-Menu, Interior-Dev-Segmented-Control-Gen-Selector, Portfolio-Aesthetic-Segmented-Control, Timed-Collapsible-Banners, Form-Dropdown-Interior-Dev, Site-Wide-Style-Harmonization, Tooltip-Group-Interior-Dev
Frontier: None
In flight: None

## Last session
1. **Interior.dev Tooltip Group for Homepage Hints (`public/generation-device/app.js`, `public/generation-device/style.css`):**
   - Implemented Interior.dev `tooltip-group.tsx` interaction mechanics for all hints across `/`:
     - **Cold delay (180ms)**: prevents flicker when sweeping across Gen 1–9 segmented buttons, hardware controls, and opening tools.
     - **Warm state & Glide (400ms skip delay)**: once open, hovering adjacent buttons skips the delay; tooltip card and SVG callout line glide smoothly to the new target (`180ms cubic-bezier(0.23, 1, 0.32, 1)` + rAF line interpolation).
     - **Directional text swap**: hint text slides along the direction of travel (`swap-right`, `swap-left`, `swap-up` for cold).
     - **Auto-dismiss**: `pointerdown` (click), `Escape`, `window.blur`, `visibilitychange`, and `scroll` dismiss immediately with target blocking until pointer leaves.
     - **SM'S DEX Styling**: gold `var(--time-accent, #ffd75e)` callout polyline with drop shadow, deep `var(--time-deep, #080b10)` panel, Departure Mono font, `4px 4px 0 #05070b` drop shadow.
     - **Tips toggle switch preserved**: `#tooltip-switch` continues to toggle tooltips on/off site-wide and stores state in `localStorage['sm-dex-tooltips']`.
2. **Verification**:
   - Full build: 1,373 pages built, 17/17 Ahrefs SEO audit tests pass.

## Not yet written down
None.

## Next
Verify live interaction on deployment.
