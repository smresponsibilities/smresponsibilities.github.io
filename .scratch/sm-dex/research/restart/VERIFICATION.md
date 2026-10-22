# Verification, 2026-09-03

These checks cover the cleanup and reference study only, not an interactive replacement.

| Check | Observed result |
|---|---|
| Removed generated/derived files | 202 original paths absent; 202 recovery copies match SHA256 |
| Removed byte count | 28,851,528 bytes |
| Preserved reference files | 42 tracked files match Git HEAD object hashes |
| Preserved source masters | Eight files match the ticket-30 manifest SHA256 |
| Download count | 90 files, ten per generation I through IX |
| Download integrity | 90 unique SHA1 values; 85 archive hashes matched; no download failures |
| Source-board DOM | Nine generation sections, 90 cards, 90 decoded images |
| Native dimensions | All 90 image dimensions agree with the displayed catalogue metadata |
| Rejected assets loaded by source board | Zero |
| Browser console | No warning or error entries in the queried log |
| Retired entry points | Six return HTTP 200 with a removal notice; none loads an image or script |
| Whitespace check | `git diff --check` passed |

The reference thumbnails were visually checked for identity and displayed state. Four files
received separate image inspection: `g1-01`, `g6-03`, `g8-02`, and `g9-06`. This is not a measured
geometry comparison, and it does not establish exact dimensions or angles of the fictional devices.

The full-page browser screenshot operation was unreliable during inspection. Normal viewport
screenshots and scrolling were used to inspect both rows of the affected generation boards.
Image counts and native dimensions were checked directly from the rendered DOM.

No new casing render, source-aligned pixel comparison, button press, touch gesture, cancellation,
keyboard interaction, closing animation, or visible portfolio-control result was tested. Those
remain build acceptance work in `MECHANICAL-CHECKLIST.md`.
