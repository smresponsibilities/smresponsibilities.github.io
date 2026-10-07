# Ticket 74 — Slider clearance and technology cloud variety

Status: resolved

## Request

- Move the Gen I slider farther below the casing.
- Add more 8-bit technology logos to moving clouds.
- Vary cloud silhouettes, sizes, positions, speed, and phase.

## Acceptance

- Gen I opening control has at least 80px top clearance.
- Background has at least ten distinct technology logos.
- Cloud geometry and motion values visibly vary.
- Reduced motion remains respected.

## Handoff

**Built:** Gen I slider clearance increased to 88px. Background now carries ten technology clouds, adding pixel Kotlin, Kafka, Snowflake, and Solidity marks with varied silhouettes, dimensions, lanes, speed, phase, mirror, and opacity.
**Deviated:** Reused and pixel-rasterized existing project SVG logos instead of generating brand approximations.
**Watch out:** Four new runtime files under `public/logos/pixel-*.png` must be included in the release commit.
