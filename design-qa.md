# MyBrandFather responsive offer QA

## Evidence

- Source visual truth: `../upload/59369759-D072-4ECB-968E-D379D66D7E1D.jpeg` (approved desktop art direction).
- Mobile problem reference: `../upload/IMG_0845.jpeg` (live-site capture showing the oversized overlaid hero and crowded header).
- Browser-rendered mobile implementation: `tmp/implementation-mobile-390x844.png`.
- Browser-rendered desktop offer implementation: `tmp/implementation-desktop-offer.jpg`.
- Combined mobile comparison: `tmp/mobile-comparison.png`.
- Mobile implementation viewport: 390 × 844 CSS px, device scale factor 1.
- Mobile source pixels: 710 × 1536. The source includes iPhone/browser chrome, so it was proportionally normalized to 390 × 844 only for a composition-level comparison. Browser chrome was excluded from implementation findings.
- Desktop implementation viewport: 1363 × 936 CSS px, device scale factor 1.
- State: homepage hero with video paused for a stable frame; mobile menu closed; Blueprint offer scrolled into view for desktop review.

## Full-view comparison evidence

The original mobile capture placed desktop-scale typography over the mascot, cropped the subject heavily, showed the desktop header CTA beside the mobile menu, and put the hero controls close to the browser controls. The revised browser capture separates the 16:9 video from the copy, keeps the mascot fully visible, removes the desktop CTA below 1024 px, and gives both hero actions full-width phone targets. No horizontal overflow was detected at 390 px or 320 px.

The desktop Blueprint offer was also reviewed in the browser. It now uses a balanced two-column layout with the explanation on the left and a contained pricing/deliverables card on the right.

## Focused comparison evidence

The focused comparison is `tmp/mobile-comparison.png`. It was necessary because the header, hero crop, display typography, action buttons and video control were the reported problem area. The Blueprint card was separately inspected at 390 px and its detail page at 390 px and 320 px.

## Required fidelity surfaces

- Fonts and typography: Cormorant Garamond remains the display face and Inter remains the body/UI face. Mobile title size is capped at 3.55rem and 2.55rem on very small screens, with a readable 0.9 line height and controlled wrapping.
- Spacing and layout rhythm: the mobile header is 4.75rem high; the video occupies a separate 16:9 region; copy and actions sit in a padded dark content block; offer cards use reduced mobile padding.
- Colors and visual tokens: the black, warm paper and muted gold palette remains unchanged. Contrast is improved because body copy is no longer competing with moving imagery.
- Image quality and asset fidelity: the supplied craftsman video and poster are retained. Mobile uses the full video frame rather than a narrow crop; no placeholder or code-drawn replacement was introduced.
- Copy and content: the vague `$495–$750` range was replaced by a clear `$495` founding-client price, `$750` regular value, exact deliverables, scope boundary and implementation credit terms.

## Comparison history

1. P1 — Mobile header displayed both the desktop “Start a Project” button and the hamburger. Fixed by explicitly hiding the header CTA below 1024 px. Post-fix evidence: the 390 px and 320 px browser captures show only the logo and menu control.
2. P1 — Hero text overlaid the moving mascot and produced oversized wrapping/cropping. Fixed by using a 16:9 mobile video region followed by a dedicated content block and phone-sized type. Post-fix evidence: `tmp/implementation-mobile-390x844.png`.
3. P2 — Desktop Blueprint section stacked because the generated utility sheet did not contain `lg:grid-cols-2`. Fixed with an explicit responsive two-column grid. Post-fix evidence: `tmp/implementation-desktop-offer.jpg`.
4. P2 — Blueprint detail price wrapped awkwardly on narrow phones. Fixed by giving the price label a full row and keeping `$495` with the crossed-out `$750` below it. Verified at 390 px and 320 px.

## Interaction and runtime checks

- Mobile menu opened and closed; `aria-expanded` updated correctly.
- Hero video remains autoplay, muted, plays-inline and non-looping. Pause/replay control remains functional.
- Hero CTA targets resolve to `contact/index.html` and `work/index.html`.
- Homepage, Blueprint, Contact, Work and Services routes were opened successfully in the cloud browser.
- Sitemap and robots files are unchanged.
- Browser console showed no application-origin errors. Repeated metadata errors came from the cloud-browser extension and were excluded from app findings.

## Findings

No actionable P0, P1 or P2 visual or responsive findings remain for the changed hero and Blueprint surfaces.

## Follow-up polish

- P3: After real traffic arrives, test whether “Request Your Blueprint” or “Start My Blueprint” converts better. This does not block launch.

final result: passed
