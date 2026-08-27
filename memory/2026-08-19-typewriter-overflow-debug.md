# Debug report — Hero typewriter overflow

- Symptom: long phrases such as “Gestionali e web app” broke the “Posso fare” display on mobile.
- Root cause: mobile flex wrapping plus an oversized dynamic font; the dynamic span also kept a desktop-oriented minimum width.
- Fix: keep the display on one row, remove the minimum width, let the dynamic span flex inside the available space, and reduce its mobile font size with a fluid clamp.
- Evidence: mobile browser check reports `scrollWidth === clientWidth` for the typewriter and the rendered layout stays intact.
- Regression check: `npm run lint`, `npm run build`, `git diff --check`, mobile screenshot and console QA.
- Status: DONE
