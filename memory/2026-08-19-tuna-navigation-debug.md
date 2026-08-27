# Debug report — Tuna navigation

- Symptom: Tuna appeared oversized, spawned in the same place and did not visibly navigate.
- Root cause: `chooseWaypoint()` used `Array.find()`, so every target was the first safe point. Initial `targetPoint` also matched `currentPoint`, leaving no first movement. Heading was then derived from a small partial yaw, although the fish moves on the screen plane.
- Fix: choose a random safe waypoint different from the previous one, initialize a distinct first target, trigger special states when a waypoint is reached, and orient the model from its actual movement vector with full screen-plane angle damping. Reduced the model scale from `.14` to `.08`.
- Evidence: mobile browser screenshots show the tuna at different positions before and after four seconds, with the head following travel direction. `tuna.glb` loads successfully.
- Regression check: `npm run lint`, `npm run build`, `git diff --check`, browser console/network QA. No runtime errors or failed requests; only existing Three.js deprecation warnings.
- Status: DONE
