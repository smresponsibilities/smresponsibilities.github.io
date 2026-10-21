# Card treatment contract

Status: resolved

Match the approved four treatments: static engraving on resume, experience and archives; neutral glare/tilt on listings and related content; floral holo and click inspection on highlights/main project cards; utility UI and timeline rows remain plain. Verify then push the complete card rollout.

## Handoff

**Built:** Four approved treatments now have separate behavior. Static cards have no foil/glare; interactive engraving has white glare/tilt only; holo cards offer native dialog inspection with keyboard close/focus restoration. Utility controls and timeline rows remain untouched.
**Deviated:** Inspection uses an enlarged front without spinning or hiding navigation links.
**Watch out:** `node scripts/check-card-treatments.cjs` requires Chrome and a built preview on port 8767, overridable with PREVIEW_URL. Build generated 1,321 pages; browser coverage and all 17 SEO tests pass. Existing duplicate day route warnings remain.
