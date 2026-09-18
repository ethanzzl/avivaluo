# Design QA — Editorial Illustrator × Typography Interaction

## Evidence

- Source visual truth: `/Users/zhuokai/.codex/generated_images/01a08e18-d464-7130-b5ff-f4d2b88d7073/exec-93483ccd-842a-43af-b819-9ecaa2808ae3.png`
- Typography refinement reference: `/var/folders/c_/qjpq5t6s185gz5v2h36ghk_h0000gn/T/codex-clipboard-4568ecc8-25af-48c0-b24e-a5109dec69a7.png` (2880 × 694 px).
- Source pixels: 1486 × 1059; designed as a 1440 × 1024 desktop homepage direction.
- Implementation: `http://localhost:4173/`
- Implementation screenshot: browser-rendered captures from the Codex in-app browser in the current task; the browser API did not return filesystem paths.
- CSS viewport and density: 1440 × 1024 CSS px at 1×. Additional checks: 1280 × 720 and a 464 × 674 narrow viewport for the typography refinement, plus the earlier 1024 × 900, 768 × 1024, and 360 × 844 checks.
- State: Chinese homepage, default interaction state. The typography refinement was checked at the `#services` anchor; English homepage and expanded mobile navigation were checked separately.

## Full-view comparison evidence

The source and browser-rendered implementation were opened consecutively at the same desktop state and compared visually. The implementation preserves the selected direction's main hierarchy: narrow editorial statement column, dominant straight-edged hero artwork, right-side numbered project caption, asymmetric second project row, small italic marginal notes, warm paper background, restrained vermilion rules, and generous negative space.

The source mock labels the café artwork as “Paris Stories”, which conflicts with the project's structured content. The implementation intentionally corrects it to “餐饮与空间插画精选 / Food & Hospitality Illustration Studies”. Project 02 uses the real Gegelato artwork and Project 03 uses the real illustrated-object photograph.

## Focused region comparison evidence

- Hero: title hierarchy, left/right balance, image scale, red rule, and project 01 caption were inspected at 1440 and 1024 px.
- Project sequence: Gegelato and illustrated-object image subjects, aspect ratios, project numbers, categories, and red rules were inspected at 1440 and 360 px.
- Navigation: desktop navigation, CTA, 44 px mobile menu target, expanded menu, and language switch were inspected in-browser.
- Services: section typography, four-column desktop rows, and two-column mobile reflow were inspected in the rendered page.

## Required fidelity surfaces

- Fonts and typography: two-family system retained—editorial serif for display/project titles and the existing sans-serif stack for navigation/body copy. Scale, wrapping, line height, and optical weight remain readable from 360 through 1440 px. The source's handwriting is represented by restrained serif italics to avoid adding an unlicensed third font.
- Spacing and layout rhythm: 12-column desktop composition, six-column tablet composition, and single-column mobile narrative preserve the source hierarchy without horizontal overflow. Measured document `scrollWidth` equals viewport width at 360, 768, 1024, and 1440 px.
- Colors and visual tokens: existing paper, ink, muted line, and vermilion accent tokens match the approved site direction. No gradients, heavy shadows, glass surfaces, or rounded project cards were introduced.
- Image quality and asset fidelity: all visible portfolio images use the existing published derivatives through `next/image`; no AI-generated replacement artwork, placeholder, CSS drawing, or custom SVG substitute is used. Crops preserve the subjects and image proportions.
- Copy and content: Chinese and English content comes from the existing structured project data. The three project/category mappings are truthful and their links resolve to the correct detail routes.
- Accessibility and behavior: semantic heading order, bilingual alt text, visible focus styles, reduced-motion support, keyboard-reachable links, expanded mobile navigation, and language switching were checked. Project 02 navigation resolved to `/work/gegelato-brand`.

## Comparison history

1. Initial browser pass found a P2 image-loading issue at the 1024 px viewport: the Gegelato artwork entered the first fold lazily and Next.js emitted an LCP warning.
2. Fix: changed the Gegelato image to eager loading while retaining the hero preload.
3. Post-fix evidence: a fresh in-app browser tab at 1440 × 1024 rendered all first-fold artwork with no console errors or warnings.
4. Typography refinement pass found a P2 title-wrap issue in the services heading: the phrase “完整的品牌应用” was split between lines in the supplied desktop reference.
5. Fix: stored an intentional Chinese line break in structured copy, rendered each line as a block, widened the desktop title track, moved the supporting paragraph down by 10 px on desktop, and slightly reduced the narrow-screen title scale.
6. Post-fix evidence: fresh in-app browser captures at 1280 × 720 and 464 × 674 show “从一幅画，” and “到完整的品牌应用。” as two intact lines. The supporting paragraph remains secondary, the service rows retain their alignment, and the browser console contains no errors or warnings.

## Findings

- No actionable P0, P1, or P2 mismatches remain.
- P3: the marginal annotations are typographic italics rather than a literal handwriting font. This is an intentional licensing/performance trade-off and can be revisited after a deployable handwritten typeface is approved.

## Implementation checklist

- [x] Correct project-to-image mapping.
- [x] Faithful desktop editorial composition.
- [x] Responsive layouts at 360, 768, 1024, and 1440 px.
- [x] Chinese and English homepage states.
- [x] Mobile navigation and project navigation.
- [x] Browser console free of warnings and errors on the final pass.
- [x] Type check, lint, content validation, and production build.

## Follow-up polish

- Evaluate a legally deployable handwritten accent face only if it improves the marginal notes without introducing a third competing type voice.

final result: passed
