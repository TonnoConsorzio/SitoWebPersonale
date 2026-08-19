# Debug report — Tuna navigation

- Symptom: Tuna appeared oversized, spawned in the same place and did not visibly navigate.
- Root cause: `chooseWaypoint()` used `Array.find()`, so every target was the first safe point. Initial `targetPoint` also matched `currentPoint`, leaving no first movement.
- Fix: choose a random safe waypoint different from the previous one, initialize a distinct first target, and trigger special states when a waypoint is reached. Reduced the model scale from `.14` to `.08`.
- Evidence: mobile browser screenshots show the tuna at different positions before and after four seconds. `tuna.glb` loads successfully.
- Regression check: `npm run lint`, `npm run build`, `git diff --check`, browser console/network QA. No runtime errors or failed requests; only existing Three.js deprecation warnings.
- Status: DONE
