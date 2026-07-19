# Aviva大双网站设计 QA

## Evidence

- Source visual truth: `design-references/homepage-direction-v3.png`
- Production-rendered homepage screenshot: `implementation-home.png`
- Local desktop viewport screenshot: `qa-home-desktop-viewport.png`
- Local mobile homepage screenshot: `qa-home-mobile.png`
- Local mobile menu screenshot: `qa-home-mobile-menu.png`
- Local mobile contact screenshots: `qa-contact-mobile.png`, `qa-contact-mobile-lower.png`
- Combined source/implementation comparison: `design-qa-comparison.png`
- Desktop viewport: 1200 × 750
- Mobile viewport: 360 × 800
- State: Chinese homepage, mobile navigation open, Chinese contact page

## Full-view comparison evidence

The source and implementation were placed together in `design-qa-comparison.png`.
The implementation preserves the selected direction’s warm paper background,
small navigation, left-copy/right-art hero, restrained coral accent, square
artwork treatment, and artwork-first hierarchy.

## Focused comparison evidence

- `qa-home-mobile.png` confirms the hero reflows to copy-first and full-bleed
  artwork at 360 px without horizontal overflow.
- `qa-home-mobile-menu.png` confirms the menu opens above the page, keeps
  readable 48 px rows, and retains a visible keyboard focus outline.
- `qa-contact-mobile.png` and `qa-contact-mobile-lower.png` confirm the real
  email address, removal of WeChat, and the Xiaohongshu and Instagram icon
  placeholders at 360 px.

## Findings

No actionable P0, P1, or P2 differences remain.

- Fonts and typography: the implementation uses Geist with system Chinese
  fallbacks, restrained weights, readable mobile body copy, and hierarchy close
  to the selected reference.
- Spacing and layout rhythm: the desktop hero proportions and mobile stacking
  match the approved editorial direction; section spacing remains generous.
- Colors and visual tokens: warm ivory, ink, muted gray, and coral-red map to the
  approved tokens and retain adequate control contrast.
- Image quality and asset fidelity: all visible portfolio imagery uses the
  supplied artwork files with declared dimensions; no CSS drawings, fake
  artwork, or temporary placeholders replace them.
- Copy and content: bilingual navigation and project relationships are
  consistent. Unknown client, date, role, phone, and social links remain
  explicitly unconfirmed.
- Interaction and runtime: the mobile menu was opened and inspected; core
  Chinese, English, work detail, contact, robots, sitemap, and 404 routes were
  requested successfully. Browser error and warning logs were empty after the
  final fixes.

## Comparison history

1. Initial comparison found a P2 hero mismatch: the headline wrapped to three
   lines and the collaboration link lacked the selected coral emphasis.
   - Fix: reduced the desktop display size, adjusted the hero column ratio, and
     applied the accent token to the collaboration link.
   - Post-fix evidence: `design-qa-comparison.png` and
     `qa-home-desktop-viewport.png`.
2. Local browser inspection found a P1 development overlay caused by the
   prototype runtime’s image-optimization fetch path.
   - Fix: restored prepared static artwork derivatives with explicit dimensions
     and native loading behavior.
   - Post-fix evidence: the final DOM snapshot contained no overlay, all artwork
     was present, and browser error/warning logs were empty.

## Open Questions

- Phone, Xiaohongshu URL, and Instagram URL are intentionally pending user
  content and do not block this version.

## Implementation Checklist

- [x] Match approved desktop hero direction
- [x] Validate 360 px homepage and contact layout
- [x] Validate mobile navigation and focus visibility
- [x] Keep Chinese/English routes and project relationships aligned
- [x] Use supplied artwork and truthful placeholder content
- [x] Confirm build and lint

## Follow-up Polish

No blocking polish items remain. Future content updates can add confirmed
project facts and social links without changing the visual system.

final result: passed
