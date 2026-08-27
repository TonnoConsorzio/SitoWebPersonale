# Debug report — Contact form alignment

- Symptom: the Email field sat lower than Name in the two-column row.
- Root cause: `.contact-scene__form-field + .contact-scene__form-field` applied the vertical form gap to the second grid child.
- Fix: scope the top margin to direct full-width form children: `.contact-scene__form > .contact-scene__form-field`.
- Evidence: desktop browser geometry reports identical top coordinates for Name and Email; mobile form stacks cleanly. Console has no runtime errors.
- Regression check: `npm run lint`, `npm run build`, `git diff --check`, desktop/mobile screenshots.
- Status: DONE
