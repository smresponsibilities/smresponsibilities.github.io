# 56: Carry Gen I button finish across devices and correct closed fit

Status: resolved
Type: task
Priority: highest

## Request

Leave Gen I unchanged. Inspect its button construction in depth and apply the same
finish to the other generations, including centered directional controls. Give every
Gen II blue bead the sky-blue treatment of its exterior bead and make its casing
predominantly dark red. Correct the slightly oversized/misaligned Gen IV closed case,
using Gen III's clean fit as the quality benchmark without changing Gen III's casing.

## Acceptance

- Capture Gen I before and after and prove its artwork and rendered buttons unchanged.
- Inspect mounting wells, caps and directional pad centers, including pressed states.
- Use a consistent Gen I button finish across the other devices with physical buttons.
- Match Gen II bead colors and darken its shell.
- Align Gen IV lid, body and hinge at closure while preserving lid-only semicircle ownership.
- Verify controls and open/closed desktop and mobile views, then write the handoff.

## Follow-up correction, September 10

The user approves the direction for Gen II and IV and explicitly requests restoring
Gen III, which was already satisfactory. Its original disc, caps and closing geometry
take precedence over the earlier blanket button request. Gen I remains unchanged.

The supplied references additionally require two oval keys and two round keys on Gen II,
two centered dark strips beside its lower display, a tighter dark Gen IV outer control
rim, a longer/redder Gen V lower Poké Ball section, and a visible Poké Ball in the center
of Gen VI when closed. These corrections continue this ticket.

## Answer

Revision 56.2 completes the supplied-reference corrections. Gen I is unchanged and Gen III
is restored to the user's accepted version. Gen II has the correct four-key inventory,
paired display strips, matching blue beads and dark red casing. Gen IV closes over a
centered lobe with a narrow dark outer rim. Gen V has a taller, redder lower assembly;
Gen VI has the compact Poké Ball emblem. See `../research/ticket-56-findings.md`.

Gen I and Gen III stage captures match their pre-ticket images exactly. The browser
checks pass for all 47 targets, 150 entry pages, ten responsive layouts, actual animated
closure and rocker press/release. All 53 regenerated SVGs parse. No console errors remain.

## Handoff

**Built:** Revision 56.2 corrects Gen II/IV/V/VI against the user's images while preserving
Gen I and restoring Gen III. Evidence is in `../research/ticket-56-*.json` and captures.

**Deviated:** The user explicitly exempted Gen III from the earlier blanket button
restyling request. Its old disc seat and cap appearance are intentionally preserved.

**Watch out:** Gen I and Gen III are protected visual baselines. Do not carry future
shared button or casing changes into either without a new user request. Gen V's 30%
lower-section extension is an authored proportion correction; slider travel is unchanged.
