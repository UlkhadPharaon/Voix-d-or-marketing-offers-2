# Interactive 3D Phone Mockup — Implementation Plan

* **Feature:** Replace the CSS phone mockup in the hero with an interactive Three.js device mockup.
* **Reference:** `https://github.com/repalash/threepipe-device-mockup-codrops`
* **Date:** 2026-11-02

## Blocker Found

The reference repo depends on **threepipe v0.0.33**, which bundles **three.js r0.153.1003**. The NEFERTEM site already uses **three.js r0.186.1**. Adding threepipe would create a duplicate-three runtime conflict and break the existing Spline integration.

**Decision:** Do not add threepipe. Instead, port the interactive behavior directly onto the project's existing three.js r186.

## Approach

1. **Copy the GLB asset** (`public/models/tabletop_macbook_iphone.glb`) into the site's `public/` folder. Note: the GLB contains Sketchfab-sourced models; verify commercial licensing before shipping.
2. **Create `src/components/hero/PhoneMockup3D.tsx`** — a React component that:
   - Initializes a `THREE.Scene` with a transparent background.
   - Loads the GLB via `GLTFLoader`.
   - Targets only the phone mesh for the hero (hides the MacBook to keep focus).
   - Applies the site's gold accent color to the phone frame.
   - Adds orbit-like interaction: drag to rotate, hover highlight, scroll-to-zoom damped.
   - Falls back to a static frame on `prefers-reduced-motion` or low-end devices.
3. **Wire the component** into `Home.tsx` in place of `<PhoneFeedMockup />`.
4. **Keep the notification cards** as HTML overlays positioned over the 3D canvas, so the marketing copy remains crisp and accessible.

## Acceptance Criteria

- [ ] Hero section renders an interactive 3D phone instead of the CSS mockup.
- [ ] Mouse/touch drag rotates the phone; scroll zooms; hover subtly highlights the screen.
- [ ] On `prefers-reduced-motion` or Save-Data, the component renders a static fallback.
- [ ] No new `three.js` version is installed; the existing `0.186.1` is reused.
- [ ] No threepipe dependency added.
- [ ] Build passes (`npm run build`) and bundle increase is < 150 KiB gzipped.
- [ ] GLB asset is referenced from `/models/tabletop_macbook_iphone.glb` and loads from `public/`.

## Files Changed

- `src/components/hero/PhoneMockup3D.tsx` (new)
- `src/pages/Home.tsx` (swap mockup)
- `public/models/tabletop_macbook_iphone.glb` (new asset)
