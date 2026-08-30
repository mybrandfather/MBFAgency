# MyBrandFather Cinematic Redesign — Design QA

Source visual: `59369759-D072-4ECB-968E-D379D66D7E1D.jpeg`  
Implementation: homepage served from `index.html`  
Checked: 2026-08-30

## Visual comparison

- Hero composition matches the selected reference: black studio environment, left-aligned editorial headline, cream-shirt craftsman on the right, gold accent type, and two compact CTAs.
- The supplied 20-second craftsman film replaces the static hero while preserving the reference image’s framing and dark negative space.
- The page retains the reference’s alternating warm-cream editorial sections, dark publishing panel, fine rules, gold accents, serif display typography, and compact content density.
- The integrated-services section reproduces the reference’s copy/list on the left and large craftsman studio image on the right.
- Existing portfolio, publishing, products, process, offer, journal, FAQ, contact path, footer, and honest business copy remain intact.

## Responsive and interaction checks

- Desktop cloud-browser check: 1363 × 936.
- Mobile rendered check: 390 × 844.
- Mobile headline remains legible over the film and the mascot stays visible without covering the CTAs.
- Mobile menu opens and reports `aria-expanded="true"`; the Contact link is visible.
- Hero film autoplays muted and inline; MP4 and WebM fallbacks are valid 20-second files.
- Pause/play control updates the video state, icon, label, and `aria-pressed` value.
- Start a Project navigates to the existing contact page and its form is visible.
- Reduced-motion CSS falls back to the poster image and hides the video control.

## Technical checks

- One H1 on the homepage.
- All local homepage image, video, stylesheet, script, and internal link references resolve.
- All homepage images have alt text.
- JavaScript syntax checks pass.
- `git diff --check` passes.
- No app-generated browser console errors were observed.
- Optimized hero media: MP4 1.09 MB; WebM 1.13 MB; no audio track.

## Remaining polish

- P3: The moving film naturally changes the precise screen content behind the mascot compared with the static source frame; this is intentional and requested.

final result: passed
