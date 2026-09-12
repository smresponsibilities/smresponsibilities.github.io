# 60: Replace iframe with a native device experience

Status: resolved
Type: task

## Request

Remove the iframe introduced by ticket 59. Render the generation selector, flat device, controls,
screens, and supporting UI natively in the portfolio document. Add explanatory tooltips to every
device button. Default to Generation I on desktop and Generation IX on phone-sized viewports.

Replace the plain backdrop with a moving pixel-art environment inspired by the dimensional
foreground/background structure of `moizm.dev`, without copying its artwork. Restyle the opening
slider so it belongs to the device theme.

Add a short loading screen with two rolling eight-bit snakes in Python blue and yellow. Its tip
reads "SM likes paneer and is unemployed right now." Add Experience to the themed content below
the device. Extend the final credit line to name Claude, ChatGPT, and Shivam's friend testers.

## Acceptance

- No iframe remains in the homepage or rendered output.
- Device controls and generation choices are native descendants of the page.
- Every device action button exposes a visible hover/focus tooltip describing its action.
- Desktop defaults to Generation I; viewports up to 700 px default to Generation IX.
- Opening control has a styled track, thumb, state label, hover, active, and visible focus.
- Moving pixel background uses authored CSS/canvas and stops under reduced motion.
- Loader is keyboard/screen-reader safe, short, and has a static reduced-motion state.
- About Me, Experience, and Projects share the same theme.
- Footer includes Nintendo attribution plus Claude, ChatGPT, and friend tester credits.

## Changes

The homepage now owns the generation markup, device host, controls, readable view, status region,
and asset runtime directly. The iframe is gone. The existing rendering modules now mount into the
native page, default to Generation I on desktop and Generation IX at 700 px or narrower, and open
the selected device by default.

Every visible device button has a concise action description. One shared `role="tooltip"` follows
hover and keyboard focus. The opening control now uses a pixel Poké Ball thumb, not the prior plain
slider. A CSS-authored pixel scene places floating Python, Kotlin, React, Kafka, Snowflake, and
Solidity marks behind the device. The loader uses interlocking Python-blue and Python-yellow snake
forms and includes the requested paneer/employment tip. Forms and body copy now use the same display
face, borders, spacing, focus treatment, and palette as the device. Experience and expanded credits
complete the page.

## Validation

`npm run build` passes and `git diff --check` reports no patch errors. Browser verification at
1440 × 1000 and 390 × 844 confirms zero iframes, nine generations, Generation I and Generation IX
defaults respectively, no visible device button missing a tooltip, hover and keyboard tooltip
visibility, working roster dialog, Experience content, no horizontal overflow, no browser errors,
and no failed resources. Reduced motion is enabled during both runs. See
`research/ticket-60-verify.mjs` and its two screenshots.

## Handoff

**Built:** Native generation device, responsive defaults, tooltips, themed slider and form,
technology background, Python-snake loader, Experience, and expanded credits.
**Deviated:** The moving background uses authored CSS instead of canvas. Its step-timed transforms
produce the requested pixel motion with less runtime work and a complete reduced-motion fallback.
**Watch out:** Production runtime modules remain under `public/generation-device/`; device geometry
sources remain in the ticket-45 prototype. Keep those synchronized when changing a device.
