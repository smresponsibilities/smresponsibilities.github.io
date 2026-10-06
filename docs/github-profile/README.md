# GitHub profile preview

Captures are rendered at 3× density: 2880 × 2205 physical pixels for the 960 × 735 layout.
This keeps text and casing edges sharp on high-density displays. The SVG is about 4 MB.

The profile at https://github.com/smresponsibilities displays the actual device UI as a
27-second SVG loop, with one frame per generation. Clicking it opens the portfolio.
The generation links open the corresponding device directly.

The published files live in https://github.com/smresponsibilities/smresponsibilities:

- `profile-README.md` here becomes `README.md` there.
- `dex-preview.svg` is the animated image.
- `dex-preview.png` is the reduced-motion fallback.

The `<picture>` source is required. Chromium did not reliably update the reduced-motion
media query inside an SVG used as an image; selecting the PNG in the containing document
works on the live GitHub profile, including when the preference changes after load.

## Refresh

Start the portfolio dev server, then run `node scripts/export-github-preview.mjs` from
the portfolio root. It defaults to `http://localhost:4321`; `DEX_PREVIEW_URL` can override
that URL. Chromium must be installed for the existing `playwright-core` dependency.

Run `node scripts/check-github-preview.mjs` and inspect
`.scratch/sm-dex/github-preview/contact-sheet.png`. Copy the two image files to the
profile repository, then commit and push there.

`profile-README.md` is maintained separately and is never overwritten by the image exporter.
For text updates, edit it here and copy it to `README.md` in the profile repository after
checking for any newer profile edits. The resume content was supplied by Shivam in ticket 98.

The capture uses the main menu, which contains no personal avatar images. It only changes
styles in the capture browser. It does not change the website or run on a schedule.
