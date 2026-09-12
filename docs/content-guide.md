# Portfolio content guide

The portfolio page is authored in `src/pages/index.astro`. Device-screen copies live separately
in `public/generation-device/content.js`; update both places when the same project or role appears
in both views.

## Projects

Edit the `projects` array at the top of `src/pages/index.astro`. Copy an existing object and set
`number`, `name`, `stack`, `copy`, and `stats`. Keep results short and verifiable. Add the matching
device entry under `MOVES` in `public/generation-device/content.js`.

## Experience

Experience cards are inside `experience-section` in `src/pages/index.astro`. Copy the existing
`article.experience-card`, then change dates, organisation, role, and summary. Add its matching
device entry under `ENCOUNTERS` in `public/generation-device/content.js`.

Run `npm run build` after editing. Check every generation at desktop and mobile widths because each
device has a different screen aperture.
