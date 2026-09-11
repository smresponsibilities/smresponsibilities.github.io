# 45: Flat assets and slide-to-open across generations

Status: resolved
Type: prototype
Priority: highest

## Request

Extend the user's selected ticket-35 flat Gen I device to every generation. Create the
assets first, study the established geometry and button behavior, and let visitors open
the device with a sliding gesture. The screens contain Shivam's portfolio content.

## Scope

Build a separate local study at `prototypes/ticket-45-all-generations/`. Preserve the
existing Gen I drawing, including ticket 44's level exterior arrow. Use independently
editable flat assets for each device, stable native button targets, separate moving caps,
and continuous drag progress with a keyboard alternative. Keep references and reconstructed
surfaces explicit. Do not alter tickets 20 or 21 or the production routes.

Unless clarified otherwise, every generation means I through IX, with HGSS retained as
an additional Gen IV variant. The previous eight-skin catalog omitted VI and VIII.

## Acceptance

- Every generation has its own recognizable flat device and source reference.
- Gen I retains the chosen artwork. Each physical control has its own target and action.
- Sliding opens hinged devices, extends the Unova tray, separates the Kalos card, or
  unlocks the stationary Rotom display according to its actual construction.
- Closing hides and disables portfolio content; reopening retains navigation state.
- Pointer cancellation, incomplete drags, keyboard input and reduced motion work.
- The asset package can be inspected separately from the portfolio and exported as SVG.
- The final handoff records implementation, checks and remaining visual uncertainties.

## Answer

Built the ten-device local study and 50-file SVG export package at
`prototypes/ticket-45-all-generations/`. The shared interaction layer implements sliding,
native physical controls, portfolio navigation and reduced motion. See its `README.md`
for references and reconstruction boundaries, and `checks.json` for verification.
All 47 physical controls passed browser activation checks. All ten closed and reopened
without exposing closed-state screens. Visual approval is separate from implementation.

## Handoff

**Built:** Ten flat generation devices, editable layers, exported SVGs, slide-to-open
interaction and Shivam's portfolio content. Existing Gen I and production routes remain unchanged.

**Deviated:** This local study follows the user's new flat preference and includes VI and
VIII beyond the older production catalog. It does not change the production implementation
spec. Unseen faces and phone-front camera arrangements are explicitly reconstructed.

**Watch out:** Pixel-perfect source equivalence is not established. Review the gallery,
especially reconstructed phone fronts, before integration. The broad mobile batch timed out;
representative phone checks passed. Kanto imports the sibling ticket-35 shared model.
