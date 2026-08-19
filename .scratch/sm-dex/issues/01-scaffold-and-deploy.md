# 01: Scaffold and deploy a live page

**What to build:** The site's public URL shows a page with Shivam's name, species and both types, read from a
data file rather than written into the markup. Editing that file and pushing changes what the
page says.

This is the tracer bullet: the thinnest complete path through data, validation, rendering, CI
and hosting. It proves the whole chain works before any design effort goes in. Deliberately
ugly at this stage.

**Blocked by:** None (can start immediately)

**Status:** claimed

- [x] Astro project builds with no type errors
- [x] Name, species and both types come from data, not markup
- [x] An invalid type value fails the build - verify by temporarily breaking one
- [x] Design tokens defined; no hard-coded colour outside the token files
- [ ] Pushing to main deploys automatically and a public URL serves the page
- [x] Lighthouse accessibility >= 95
