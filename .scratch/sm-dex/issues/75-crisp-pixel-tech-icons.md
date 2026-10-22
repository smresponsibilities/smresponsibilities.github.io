# Ticket 75 — Crisp pixel technology icons

Status: resolved

## Request

- Remove blur from the four newly rasterized technology logos.
- Explain how to start the local portfolio app.

## Acceptance

- Generated pixel icons contain no partially transparent edge pixels.
- Browser renders them with nearest-neighbor scaling.
- Production build passes.

## Handoff

**Built:** Rebuilt Kotlin, Kafka, Snowflake, and Solidity icons from 16px grids with hard alpha, a reduced palette, and nearest-neighbor enlargement. All four now contain zero partially transparent pixels.
**Deviated:** Nothing.
**Watch out:** Local dev server is not running after verification; start it with `npm run dev`.
