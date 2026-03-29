# AI Website Improvement Playbook

## Purpose

This document captures practical decisions that helped improve `NODE48` without degrading quality. It is intended as a reusable playbook for other AI agents working on existing websites.

Focus:

- avoid cheap visual patches
- do not break the existing system
- improve quality through architecture, not random effects
- improve visuals, readability, responsiveness, SEO, and technical stability together

---

## 1. Core Principle

Every site improvement should follow this order:

1. Find the systemic cause of the problem.
2. Fix the architecture or shared pattern.
3. Only then polish the specific section.

If you start with local fixes, the site quickly loses cohesion:

- sections begin to follow different rules
- conflicting `max-width`, `gap`, and `line-height` values appear
- one issue disappears but two new ones are introduced

---

## 2. What Not To Do

### Do not use one visual pattern for different UI roles

Examples:

- benefit card
- portfolio card
- service summary card
- CTA block

These are not the same object. If they all sit on one shared card layer, conflicts appear quickly.

### Do not add effects just to make something look "more modern"

Bad signs:

- running neon borders on all cards
- constant blur or glow motion
- spotlight overlays on top of text and imagery
- different hover logic in every section

### Do not build critical geometry on fragile mask effects

Especially bad on Windows and Chromium:

- `mask-composite`
- `-webkit-mask`
- `conic-gradient` used as a physical border
- blur applied directly on the same rounded edge

These often create stepped corners and visible pixel artifacts.

### Do not hide the first screen before animation starts

If hero or reveal elements default to `opacity: 0`, a hard refresh can produce:

- an empty screen
- a flat blue background
- the impression that CSS failed to load

Reveal should be progressive enhancement, not content blocking.

---

## 3. Layout and Responsive System

### Do not use one width for all desktop screens

Use meaningful desktop modes:

- `laptop`
- `desktop`
- `large desktop` or `ultrawide`

Things that can change across modes:

- shell max width
- section composition widths
- grid proportions
- spacing inside sections

Things that should not stretch endlessly:

- line length
- contact forms
- FAQ answers
- summary blocks

### Control these layers separately

- `site shell`
- `section spacing`
- `text measure`
- `component spacing`

Do not mix them into one ad-hoc class.

### Good rule

Define this first:

- site width
- vertical rhythm
- text measures

Then build sections on top of it.

---

## 4. Typography and Readability

### Headings

Control:

- `max-width`
- `line-height`
- wrapping
- final short line balance

Good solutions:

- use `text-wrap: balance`
- avoid aggressive `line-height: 1` for long `H1`
- constrain heading width by meaning, not only by grid

### Secondary text

Secondary text should not:

- be too small
- be too pale
- sit on a busy background without enough contrast

Good solutions:

- raise muted-text contrast slightly
- keep `line-height` around `1.6-1.72`
- control line length
- do not place long descriptions over images

### Text columns

Maintain several measures:

- tight
- copy
- copy-wide
- card

Apply them deliberately. Do not scatter random `max-w-*` values across components.

---

## 5. Sections and Composition

### If a section is empty on the left and heavy on the right

Do not solve it by adding a decorative panel.

First ask:

- does this section really need a split layout?
- would a full-width title with content below be clearer?

This improved the FAQ:

- title across full width
- contact info below the title
- questions below that

Result:

- less dead space
- easier reading
- more stable section rhythm

### If cards look loose

Check:

- internal padding
- gaps between icon, title, and text
- decorative empty buffer above the content
- whether the grid row is stretching the card unnecessarily

---

## 6. Cards and Surfaces

### Separate card systems by role

At minimum:

- informational cards
- trust or benefit cards
- service cards
- portfolio cards
- modal or panel surfaces

If all of them share one base class, the visual system will drift.

### Good premium border and surface pattern

Use:

- a physical border
- an inset highlight
- a soft outer glow
- a calm shadow

Instead of:

- complicated animated masks
- XOR border tricks
- many pseudo-elements for fake neon

### Rule for rounded corners

Split shape, content, and glow into separate responsibilities:

- outer layer controls shape
- inner layer clips content
- glow sits separately and not directly on the same edge

---

## 7. Portfolio and Carousels

### A carousel should not inherit from normal content cards

Correct approach:

- separate module
- separate styles
- separate motion logic

Healthy structure:

- `PortfolioCarousel`
- `PortfolioCaseCard`
- dedicated CSS layer for the carousel only

### Use a mature engine

For example:

- `Embla`

Why:

- reliable drag and snap
- predictable layout
- less custom logic
- easier mobile, tablet, and desktop adaptation

### What works better for portfolio

- real preview images, not fake UI mockups
- description below the preview, not over the preview
- 1 card on mobile
- 2 cards on tablet
- 3 cards on desktop

### Avoid

- oversized showcase cards without purpose
- fake browser chrome if it adds no value
- overlay text on screenshots when it hurts readability

### Carousel stage

If the carousel has a shared stage, it must be:

- invisible
- or clearly intentional, spanning the full section width as a showcase surface

Do not leave a random pale or gray slab under the cards.

---

## 8. Animation

### General rule

Animation should be:

- intent-based
- not constant
- not harmful to reading
- not critical for first paint

### Suitable patterns

- `hover lift`
- subtle `media zoom`
- `CTA nudge`
- quiet `border emphasis`
- `scroll reveal` only as enhancement

### Unsuitable patterns

- constant running neon
- aggressive `3D tilt`
- blur blobs inside cards
- spotlight directly over real content

### Required rule

Support `prefers-reduced-motion`.

---

## 9. Contact Forms and Modal Flow

### A modal must be its own system

Do not bury the form inside a random page section.

Better:

- provider or context
- portal into `document.body`
- separate panel component
- separate overlay layer

### Why it matters

Otherwise these break easily:

- stacking context
- parent overflow
- routing
- fixed header interactions

### Good modal pattern

- portal
- scroll lock on both `html` and `body`
- `max-height` with inner `overflow-y: auto`
- separate success banner after submit
- anti-spam layer:
  - honeypot
  - cooldown
  - minimum completion time
  - suspicious-text filters

---

## 10. SEO and Service Pages

### Services should not live only on the homepage

Better:

- separate service page
- clean slug
- strong `H1`
- unique `title`
- `meta description`
- `canonical`
- `BreadcrumbList`
- meaningful internal linking

### When renaming services, update the full system

Not just visible copy:

- slugs
- redirects
- sitemap
- canonical URLs
- metadata
- structured data

### Important note

If the site is an SPA, the SEO stack is not ideal. Still do the best possible inside that setup:

- correct metadata updates
- structured data
- sitemap
- redirects for legacy URLs

---

## 11. Performance and Stability

### What actually helps

- use real images deliberately and keep previews in a dedicated asset folder
- avoid constant animations
- avoid heavy blur on many elements at once
- keep CSS patterns reusable instead of cloning near-duplicate card systems

### Reveal animations

Correct reveal behavior:

- above-the-fold content is visible immediately
- only offscreen elements start hidden
- reduced motion disables reveal motion

### Caching

In production:

- `index.html` should not get stuck in stale cache
- hashed CSS and JS can be cached long-term

This reduces the risk of the "bare HTML" deployment state.

---

## 12. Quality Checks

After every meaningful change, check:

- `npm run build`
- `npm run lint`

And visually verify:

- mobile
- tablet
- laptop
- desktop
- ultrawide

Pay special attention to:

- first screen
- FAQ
- services
- portfolio carousel
- contact modal
- service pages

---

## 13. Practical Workflow For AI

If an AI is asked to improve an existing site, it should work like this:

1. Find the systemic cause of the issue.
2. Check whether the issue conflicts with existing layout, motion, or card systems.
3. If a conflict exists, refactor the base pattern first.
4. Only then change the individual section.
5. After each meaningful change:
   - run build
   - run lint
   - inspect the diff for dead code and stale links
6. Do not leave:
   - old classes
   - duplicated visual systems
   - legacy styles with no usage

---

## 14. Short Rules To Repeat To Other AI

- Do not treat symptoms if the broken system is underneath.
- Do not mix different UI roles into one card pattern.
- Do not animate over content if readability suffers.
- Do not build premium borders on fragile mask tricks.
- Do not hide the first screen before animations run.
- Use real previews for portfolio, not decorative fake UI.
- Prefer a clear vertical structure for FAQ and long-form content.
- Use desktop layout modes, not one fixed width for all large screens.
- Update slug, meta, canonical, redirects, and sitemap together for SEO changes.
- Always clean dead code after refactors.

---

## 15. Where These Principles Were Applied In NODE48

Main areas where these principles were already used:

- hero and trust strip
- service pages and SEO layer
- contact overlay architecture
- portfolio carousel refactor
- premium border system refactor
- FAQ single-column rebuild
- reveal system hard-refresh fix

Use this document as a base playbook for future projects, not as a list of one-off patches.
