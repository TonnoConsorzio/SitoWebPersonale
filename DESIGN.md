# DESIGN.md: Lusion-inspired direction for Alessio Bellan

## Source

- URL: https://lusion.co/
- Capture date: 2026-08-15
- Evidence: public page content inspected through web fallback; Firecrawl collection pending `FIRECRAWL_API_KEY`.
- Scope: extract interaction and composition patterns only. Do not reuse Lusion copy, logos, project media, or proprietary code.

## Reference Screenshot

No local screenshot was created. The Firecrawl CLI and API key are not configured in this workspace. Use the source URL for visual comparison when the key is available.

## Design Summary

Lusion presents itself as a visual production studio. The page starts with a strong 3D/interactive premise, invites continued scrolling, introduces the approach, then uses featured work as proof before ending with a large collaborative CTA. The useful lesson is pacing: one visual idea per scene, short text, and work before service detail.

For Alessio, keep the same pacing discipline but use a different identity: warm cream, black, disciplined brand yellow, fluid editorial depth, direct Italian copy, real project assets, and a persistent lightweight procedural engine with a static SVG fallback.

## Design Tokens

### Colors

- `paper`: `#f2eee5`, primary page surface.
- `paper-strong`: `#e9e3d8`, secondary surface.
- `ink`: `#111113`, text and dark scenes.
- `brand-yellow`: `#fbcf15`, opening and closing scene, focus accent, and active states.
- `muted-ink`: `#5d5a53`, supporting text only where contrast remains sufficient.

### Typography

- Display: Bricolage Grotesque, 700–800, tight line-height.
- Body: Instrument Sans, 400–700, readable measure between 45 and 70ch.
- Outlier: IBM Plex Mono for short labels only.
- No italic headings. No gradient text.

### Spacing And Layout

- Max content width: `1440px`.
- Mobile gutters: `20px`; desktop gutters: `32px`.
- Major sections: `80px` mobile, `112px` desktop vertical padding.
- Borders: thin lines only; no poster frames or hard offset shadows.
- Radius: restrained 2–4px on interactive controls and imagery.
- Macrostructure: cinematic scene stack. The engine stays present while scenes change its geometry and visual order.

## Components

- Hero: warm cream scene, large direct headline, object intersecting the type, one booking CTA, procedural Impossible Engine.
- Navigation: fixed, restrained, no booking button. Mobile menu expands to a full-height sheet.
- Trust strip: short factual statements, no invented numbers or logos.
- Work showcase: real project images, offset editorial rhythm, short proof copy.
- Services: three chapters in one reading column, not repeated rounded cards.
- Process: four numbered stages with a persistent label column.
- Pricing: typographic package system with actual prices; no “popular” badge or scarcity language.
- FAQ: one-open-at-a-time button accordion, visible focus, JSON-LD preserved.
- Final CTA: yellow scene with the second and last `Prenota 15 minuti` action.

## Page Patterns

1. Hero and visual premise.
2. Trust strip.
3. Real work.
4. Service chapters.
5. Formation.
6. Process.
7. Prices.
8. About and ABBO APS.
9. Authentic testimonials.
10. FAQ.
11. Final contact scene.
12. Minimal footer.

The page uses section-level theme transitions, not scroll-jacking. On mobile, columns collapse, sticky behavior reduces, and the engine loses pointer tilt.

## Motion And Fallbacks

- Scroll and theme state update the procedural WebGL engine through `data-engine-stage`.
- Pointer tilt runs only for non-touch pointers.
- WebGL is progressively enhanced and degrades to the visible SVG composition.
- `prefers-reduced-motion` removes tilt, transitions, smooth scrolling, and parallax-like movement.
- No WebGL dependency is required. The SVG composition is the immediate fallback and remains visible if a heavier 3D stack is unavailable.

## Content Style

Keep the supplied Italian copy unchanged. Use short labels, concrete verbs, and real project evidence. Do not add agency jargon, fake metrics, fake testimonials, or descriptive filler around the visual system.

## Agent Build Instructions

1. Borrow Lusion’s scene pacing, not its assets or wording.
2. Keep Alessio’s yellow/black/paper identity dominant.
3. Let the project work carry credibility before explaining services.
4. Use 2.5D or static SVG before adding a WebGL runtime.
5. Preserve routes, forms, SEO, alt text, keyboard access, and reduced-motion behavior.
6. Any new reference site must get its own evidence section before changing the visual system.

## Rerun Inputs

```text
workflow: firecrawl-website-design-clone
source_url: https://lusion.co/
target_stack: React + Vite + Tailwind CSS
output: DESIGN.md
status: fallback evidence; Firecrawl API key required for branding, images, and screenshot artifacts
```
