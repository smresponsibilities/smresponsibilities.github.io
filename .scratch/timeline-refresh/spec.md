# Image-free timeline refresh

Replace the homepage's cramped century carousel and the chapter view on `/blog/timeline/` with one shared image-free journey component. The user supplied https://codepen.io/jackiezen/pen/eYeEZrx as an interaction reference, then explicitly clarified that no Pokemon images should be added.

The reference's useful interaction is a horizontal date/chapter rail synchronized with a selected story below. This implementation uses dates, day ranges, region/era text, CSS route markers and chapter typography. It preserves the existing chapter metadata, archive targets, daily feed and search. Homepage uses a shorter panel; timeline includes three sample-day links.

No flower-card integration, third-party carousel dependency, creature artwork or deployment is part of this task.

## Final user clarification

Each chapter must itself be a floral card with centered text and whole-card effects, without a reverse. Use the approved diagonal bloom style. This supersedes the separate route/story presentation. Both homepage and timeline use the same floral chapter component; no creature images are used.

## Archive and ambient finish

Archive index uses the same cards in a grid. Shared cards follow site time-of-day colors with silver botanical engraving, visible low-opacity foil at rest and an 18-second ambient drift. Hover is slightly stronger. Offscreen/hidden animation pauses; reduced motion disables drift while retaining the finish. No auto-spin, reverse or creature artwork.
