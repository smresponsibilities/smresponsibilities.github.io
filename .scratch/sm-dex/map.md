# SM's Dex research pointers

## Decisions so far

- [Ticket 91](issues/91-agent-markdown-and-content-signals.md) publishes a static Markdown
  homepage mirror, advertises it through an alternate link and `llms.txt`, and declares
  reference-only AI use in `robots.txt` without adding a runtime service or dependency.

- [Ticket 89](issues/89-live-roster-refresh.md) publishes a standalone device-roster payload and
  refreshes it client-side on startup, focus, visibility, and a 60-second interval using unique
  cache-busting requests.

- [Ticket 88](issues/88-cloudflare-web-analytics.md) installs the supplied Cloudflare Web
  Analytics beacon globally and validates its URL and site token in rendered output.

- Ticket 83 reconciles merged roster history into the active checkout: persistent SM loader fact,
  four SM fallbacks, owner-tagged roster facts, Riya as device entry 002, and build-time DEX
  generation. See [ticket 83](issues/83-restore-loader-mix-and-merged-roster-flow.md).

- Ticket 82 removes SM-only loader fallbacks: each loader fact, username, and profile link now come
  from one roster record. It also locks down profile-link containment at 320px. See
  [ticket 82](issues/82-loader-fact-source-and-profile-link-containment.md).

- Ticket 81 makes loader fact ownership roster-driven and verifies responsive behavior across six
  viewport classes and all nine device generations. See [ticket 81](issues/81-loader-fact-ownership-and-responsive-audit.md).

- [Ticket 86](issues/86-yandex-metrika.md) installs Yandex Metrika counter 112521507 once through
  the shared layout, including the supplied Webvisor settings and no-JavaScript fallback.

- [Ticket 85](issues/85-bing-meta-description-report.md) removes the non-HTML resume download from
  the sitemap after Bing attributed its sole missing-meta-description finding to the crawl set.
  The SEO gate now prevents PDF URLs from returning to the canonical-page sitemap.

- [Ticket 84](issues/84-seo-geo-foundation.md) adds the SEO/GEO/AEO foundation: canonical and
  social metadata, `WebSite`/`ProfilePage`/`Person` JSON-LD, root sitemap and robots discovery,
  `llms.txt`, answer-first homepage copy, and a rendered-output regression gate.

- Ticket 32 retired rejected casing imagery and assembled ninety source references. The user's
  current build contract is image casing/lid layers with coded pressable caps and live screens.
  See [ticket 32](issues/32-reference-first-asset-restart.md) and the
  [reference study](research/restart/REFERENCES.md). This pointer records the restart only;
  existing implementation decisions remain in the project specs.

- Ticket 34 demonstrated proportionate screen fit in selected references 1/5/6 and clipped
  accepted-release ripples with static reduced-motion feedback. The board now has 110 references.
  See [ticket 34](issues/34-screen-fit-ripple-and-more-references.md) and the
  [study results](prototypes/ticket-34-screen-fit-ripple/README.md). Prototype capture: `5ba293b`,
  branch `codex/ticket34-screen-fit-ripple`. Final casing geometry and continuous closure remain
  ticket 33 work; the selected sources have an unresolved bezel/control-layout discrepancy.

- Ticket 35 built the requested self-authored flat and Three.js comparison, sharing 26's dark
  menu/list/detail direction, one coordinate manifest and 23 independent controls. See
  [ticket 35](issues/35-flat-and-threejs-kanto.md). Capture: `a0f7b35` on
  `codex/ticket35-flat-threejs`. Both versions pass the recorded input checks; final visual
  approval and source fidelity remain separate from functional acceptance.

- Ticket 36 adds the requested flat-shell/Three.js-control hybrid and repairs control depth and
  casing definition in full 3D. See [ticket 36](issues/36-hybrid-flat-casing-three-buttons.md).
  Capture: `b874a52` on `codex/ticket36-hybrid-depth`. Compare `?variant=hybrid` with
  `?variant=three` on the existing ticket-35 route before selecting a final direction.

- Ticket 37 adds `?variant=hybrid&view=angle`, reduces flat relief and changes Three.js screen
  filtering. See [ticket 37](issues/37-hybrid-angle-and-clarity.md). Capture: `7d0c77c` on
  `codex/ticket37-hybrid-angle-clarity`. The requested session handoff is in `HANDOFF.md`.

- [Ticket 38](issues/38-three-screen-sampling-regression.md) holds an uncommitted correction
  for the rejected nearest-filter rendering and stale display density. It remains open for
  review of the refreshed v38-final tab. The comparison README records tests and visual limits.

- [Ticket 39](issues/39-three-indicator-and-casing-edges.md) makes the blue lens a power-linked
  light and renders the full Three.js casing at a bounded 2x resolution. It preserves screen
  filtering, silhouette and button coordinates. The user's comparison tab loads v39.

- [Ticket 40](issues/40-left-angle-and-inverse-hybrid.md) adds the left-biased Three.js angle and
  the inverse hybrid: full Three.js casing with flat-style raised controls. User review replaced
  the rejected one-unit unlit caps with matte slabs, wells and explicit edges. Capture: `a20f3ee`
  on `codex/ticket37-hybrid-angle-clarity`. Compare v41 variants `three` and `shell-flat`.

- [Ticket 41](issues/41-latch-and-four-variant-review.md) restores the yellow exterior latch across
  all four variants and moves it to the reference-aligned 34-unit inset after user review. Shared
  hover/active feedback, comparison labels and the phone switcher were tightened. Full Three.js is
  the recommended base; flat remains the contour reference. Capture: `73867fe` on
  `codex/ticket37-hybrid-angle-clarity`. Review `variant=three&view=angle&v=44`.

- [Ticket 42](issues/42-reference-measured-latch-alignment.md) supersedes ticket 41's eyeballed
  triangle position. Perspective mapping places the exterior mark at `(89, 390)` and aligns its
  base and tip with the cover sweep. One shared outline feeds all four renderers; the mark remains
  non-interactive. See [measurement study](research/restart/KANTO-LATCH-ALIGNMENT.md). Capture:
  `8aba4e5` on `codex/ticket37-hybrid-angle-clarity`. Review `variant=three&view=angle&v=48`.

- [Ticket 43](issues/43-seat-exterior-mark-to-cover-rail.md) fixes the separate continuity fault
  visible in the user's close crop. Ticket 42's yellow face stays fixed; a shared dark mounting well
  now overlaps the x=75 cover rail in SVG and Three.js. Capture: `f8c3516` on
  `codex/ticket37-hybrid-angle-clarity`. Review `variant=three&view=angle&v=49`.

- [Ticket 44](issues/44-straighten-flat-exterior-mark.md) makes the flat casing's exterior arrow
  level while retaining the x=75 rail attachment. The flat / 3D hybrid shares that casing. Both
  full-Three treatments keep ticket 42's source-measured upward angle. Review
  `variant=flat&v=50`.

- [Ticket 45](issues/45-all-generation-flat-assets.md) extends the newly selected flat direction
  to generations I through IX plus HGSS. Ten devices export as 50 SVGs, with shared sliding
  interaction and 47 checked physical controls. Production remains unchanged. Review
  `prototypes/ticket-45-all-generations/?gen=red&v=45.2`; reconstruction notes and verification
  limits are in its README. Visual approval is pending.

- [Ticket 46](issues/46-closing-depth-and-reference-audit.md) corrects forward closing,
  sequences GSC leaves, finishes requested palette changes and adds rear-first VII–IX
  reveals. X/Y retains cyan glass and scanning; Rotom uses the selected SM-concept rear
  with iris/lid/arm reactions. RSE is rebuilt around a matching side-hinge crescent.
  Revision 46.5 exports 53 SVGs. See [implementation and limits](research/ticket-46-implementation.md).
  RSE visual approval and a fresh narrow-viewport check remain outstanding. No production
  migration or commit was made.

- [Ticket 47](issues/47-gen-ii-v-reference-pass-and-rotom-arms.md) adds fourteen Generation II-V
  visual references, replaces RSE's unsupported side door with a source-backed rear/top hinge,
  and applies another scale, palette, edge, and control-spacing pass to II-V. Rotom's animated
  rear arms now originate at the two visible zigzag recess endpoints. Revision 47.1 exports 53
  parseable SVGs and passes keyboard, reduced-motion, and 390 by 844 viewport checks. The RSE
  closed overlap remains reconstructed; production migration and final visual approval remain open.

- [Ticket 48](issues/48-visual-correction-rse-dp-bw-rotom-arms.md) supersedes four rejected 47.1
  treatments. RSE's crescent is narrower and right-offset, DP's closed face uses the documented
  anime landmarks, BW's diagonal band stops around the centre-control well, and Rotom's full
  zigzag rear panels leave visible empty slots instead of substitute side flaps appearing. Revision
  48.0 passes the dedicated visual-geometry regression, reduced-motion endpoints, browser-error
  check, and XML parsing for all 53 SVGs. Production migration and user visual approval remain open.

- [Ticket 49](issues/49-rse-dp-source-shapes-and-shared-button-finish.md) restores the exact
  revision 47 RSE treatment selected by the user: a landscape body whose right crescent closes
  sideways. This is a deliberate visual deviation from the later rear-hinge evidence. DP now uses
  one game-art shell instead of ticket 48's anime closed hybrid; its centre structures align within
  0.5 coordinate units. All 31 physical caps share the Generation I well, gradient, glint, shadow,
  outline, and press behavior, while directional rockers retain their source shapes with matching
  depth cues. Revision 49.0 passes its browser regression and XML parsing for all 53 SVGs.

- [Ticket 50](issues/50-closed-lid-seam-alignment.md) removes the remaining closed-state seam
  errors. RSE's lid and hinge match the body's top, bottom, and hinge-side bounds; DP's closed centre
  shell reuses the body's transformed outline; GSC's lower leaf covers the full body width instead
  of missing 22 units and overhanging by four. Revision 50.0 passes the new red/green browser
  regression, the prior button/action regression, and XML parsing for all 53 SVGs.

- [Ticket 51](issues/51-bottom-section-disc-fit-and-lid-semicircle.md) follows the user's correction:
  GSC's final strip is a distinct fixed section; RSE's cutout follows the circular housing; DP keeps
  its semicircular extension on both lid faces. This supersedes ticket 50's centre-only DP face.
  Revision 51.0 has inspected closed and moving captures and 53 parseable SVG exports.

- [Ticket 52](issues/52-real-flap-extension-and-complete-lid-alignment.md) replaces the GSC fixed
  foreground strip with a real 36-unit body/flap extension. DP's body matches the entire reflected
  lid, semicircle included, with zero measured bounds difference. Round button wells and shadows
  are unclipped, GSC/DP directional pads have bevels, and approved RSE geometry remains unchanged.

- [Ticket 53](issues/53-reference-part-ownership.md) corrects ticket 52 against supplied references.
  GSC's bottom band/lens stay fixed and both moving leaves stop at its seam; the top lid and screen
  are extended. DP's semicircle belongs only to the lid, with the dark base control pod restored.
  Six pose captures were inspected, fixed-lens bounds checked, and 53 SVG exports parsed.

- [Ticket 54](issues/54-gen1-button-restoration-approval.md) restores Gen I's original flat-source
  cap treatment, scoped to that device. Original positions and dimensions are verified. Revision
  54.0 is awaiting explicit approval of finish and placement before rollout to other generations.

- [Ticket 55](issues/55-flat-controls-screen-repair.md) follows the user's explicit correction
  request, superseding ticket 54's pending approval. Revision 55.1 restores ticket-35 flat
  controls, repairs screen fit and Gen II/IV alignment, and corrects Gen V colors. Browser
  checks cover 47 controls, 150 entry pages and four viewport widths. The additional reference
  board contains 20 distinct anime captures each for Gen II, IV and V, with source links,
  verified hashes and visual duplicate review.

- [Ticket 56](issues/56-gen1-button-language-and-closed-fit.md) applies the supplied image
  corrections to Gen II/IV/V/VI in revision 56.2. Gen I stays unchanged; Gen III is restored
  and explicitly protected after user feedback. Correct key inventory, side strips, blue
  beads, dark casing, closed rim fit, longer red lower shell and compact Poké Ball are
  verified with screenshot comparisons, browser checks and SVG parsing.

- [Ticket 57](issues/57-rotom-wake-and-motion.md) checkpoints all prior work at
  `5a7c400`, improves Rotom's staged opening, expressions and smile, and trims Gen V.
  Revision 57.1 preserves Gen I and III; new changes remain uncommitted for review.

- [Ticket 59](issues/59-portfolio-generation-showcase.md) moves the accepted generation device
  work onto the production homepage. It keeps Generations I through IX, removes the separate
  HGSS variant, adds the roster issue form, and follows the device with themed About Me and
  Projects sections. Browser verification covers desktop, phone, reduced motion, all selectors,
  issue URL generation, resource loading and horizontal overflow.

- [Ticket 61](issues/61-control-and-logo-rebuild.md) replaces ticket 60's improvised loader and
  technology marks with the official Python logo plus downloaded MIT pixel icons. It replaces
  bubble tooltips with keyboard- and pointer-driven diagram labels connected to their controls by
  SVG elbow lines. Its regression gate covers tooltip completeness, connector visibility, primary
  hitboxes, real image assets, and responsive viewport bounds.

- [Ticket 60](issues/60-native-device-background-and-guidance.md) removes ticket 59's iframe and
  mounts the complete device runtime in the homepage document. It adds action tooltips, responsive
  Gen I/IX defaults, themed controls and form, floating pixel technology marks, the Python-snake
  loader, Experience, and expanded credits. Desktop and phone reduced-motion checks pass.

- [Ticket 77](issues/77-mobile-scale-tooltip-toggle-render-audit.md) increases the existing mobile
  type scale and touch controls, adds a persisted accessible Tooltip switch to the header, and
  removes duplicate generation/resize paints. Its focused gate covers phone and desktop overflow,
  tooltip suppression, persistence, render count, and runtime errors.

- [Ticket 78](issues/78-readable-spacing-selection-ring-and-query-name.md) spaces readable rows
  and controls, moves the screen-row focus ring inside its scroll boundary, migrates generation
  URLs to `pokedexgen`, and removes the Tips control's outer chrome. Its browser gate covers both
  requested views at phone and desktop widths.

- [Ticket 79](issues/79-custom-domain.md) moves production to `shivammahajan.com`. GitHub Pages
  verifies the domain and its `www` alternate, reports both HTTPS-eligible, and enforces HTTPS.
  Pull request 1 merged the production branch into `main` and deployed through Actions.
### Ticket 87: reduced-motion loading and Lighthouse performance

Resolved in `.scratch/sm-dex/issues/87-reduced-motion-load-and-lighthouse.md`. Loader dismissal
now follows DOM readiness and skips delay under reduced motion; lossless WebP backgrounds,
pre-paint time selection, compositor-safe cloud motion, and removal of the unused Astro router
cut the production-build Lighthouse payload and main-thread cost.
