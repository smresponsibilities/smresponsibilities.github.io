# Radiant fallback correction

Status: resolved

Compare with cloned upstream and fix the custom-card Radiant fallback without changing original source recipe or reintroducing Pokemon masks.

## Handoff

**Built:** Custom Radiant adaptation no longer activates the upstream unmasked demonstration fallback, which tiled trainerbg.png at 25% with a difference blend. It retains the normal hard-light pass with cover-sized abstract glitter. Original recipe files and reference inputs remain unchanged. Radiant is selected at boot for review.
**Deviated:** Custom Radiant uses generic glitter instead of character-specific etched foil, preserving the no-silhouette requirement. The crosshatched diagonal lattice is intentional upstream design and remains.
**Watch out:** All 24 embedded CSS source files match the cloned upstream after whitespace normalization. `.scratch/tmp/verify-radiant-fix.cjs` verifies normal blend/size/texture, no custom masks and intact reference assets. All-23-recipe isolation and idle/reduced-motion tests pass. Idle test now waits for an actual shader update rather than assuming a 350ms frame budget. Corrected screenshot inspected. Site source unchanged.
