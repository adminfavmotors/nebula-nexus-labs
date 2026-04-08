# Project Improvement Report

Last updated: 2026-04-08
Workspace: `C:\Users\Admin\Desktop\project\nebula-nexus-labs`
Status: in progress

## Purpose

This file is the running report for architecture, performance, motion, and UX stability work.
It is meant to be appended over time instead of replaced.

## Working Rules

- Before edits, read [ai-dev-prompt.md](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/docs/ai-dev-prompt.md).
- Fix the root cause, not the symptom.
- Extend existing patterns instead of introducing a parallel system.
- Treat build and lint as necessary but not sufficient; also verify tests and runtime impact.
- When implementation patterns are unclear, prefer official documentation first and forums second.

## Baseline Problems Identified

1. Mixed styling model: Tailwind utilities in TSX plus a large hand-crafted CSS layer.
2. Heavy motion system using `filter` and blur-driven transitions.
3. Hero composition overloaded with too many always-live decorative layers.
4. Excessive `backdrop-filter` usage across shell and overlays.
5. Pointer-move spotlight and other micro-interactions adding visual noise and possible jank.

## Completed Work

### 1. Intro, overlays, and UI layer cleanup

Completed:

- Fixed the intro control flow so the first paint can decide whether the intro is active.
- Finished intro accessibility work:
  underlying app becomes inert during intro;
  intro overlay uses proper modal semantics.
- Added font readiness handling for the wordmark intro with timeout fallback.
- Removed `clip-path` from intro exit animation.
- Removed inline performance hacks from hero.
- Unified route scroll responsibility.
- Centralized motion timing constants.
- Added targeted intro/layering/scroll-lock tests.
- Removed the React Router future flag warnings and outdated Browserslist warning.

Key files:

- [use-brand-intro.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/use-brand-intro.ts)
- [App.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/App.tsx)
- [BrandIntroOverlay.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/BrandIntroOverlay.tsx)
- [page-scroll-lock.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/page-scroll-lock.ts)
- [motion.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/motion.ts)
- [app.test.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/test/app.test.tsx)

### 2. Brand intro timeline polish

Completed:

- Rebuilt the intro timeline so the brand wordmark no longer re-triggers the wrong animation phase.
- Normalized entry and exit timing from a single motion model.
- Removed the visual jerk caused by conflicting entry/exit sequencing.

Key files:

- [motion.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/motion.ts)
- [BrandIntroOverlay.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/BrandIntroOverlay.tsx)
- [shell.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/shell.css)

### 3. CSS architecture contract

Completed:

- Reworked the original point 4 from a partial cleanup into a project-level contract.
- Added a real style architecture guard that parses TSX with the TypeScript AST.
- The guard now catches raw Tailwind utility tokens in `className` and `titleClassName`, including multiline cases.
- Migrated remaining utility-driven presentation/layout chains from key components into semantic classes in the existing CSS layer.
- Cleaned shared primitives so they no longer preserve the mixed-system problem by default.

Key files:

- [check-style-architecture.mjs](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/scripts/check-style-architecture.mjs)
- [Section.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/primitives/Section.tsx)
- [home.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/home.css)
- [shell.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/shell.css)
- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [index.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/index.css)

Affected areas include:

- navbar and service page structural cleanup
- CTA, footer, FAQ, about, projects fallback, contact form, legal page, not found page
- shared helpers such as `visually-hidden`, section header layout, and site layout shell

### 4. Motion/performance cleanup phase 1

Completed:

- Removed `filter` animation from hero entry motion.
- Removed `filter` animation from the shared `Reveal` system.
- Removed blur-based locale transition from `.app-shell`.
- Reduced movement amplitude to keep the UI calmer and less aggressive.
- Kept the solution on the CSS contract level instead of adding JS workarounds.

Key files:

- [Hero.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/Hero.tsx)
- [home.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/home.css)
- [Reveal.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/primitives/Reveal.tsx)
- [index.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/index.css)
- [i18n-provider.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/i18n-provider.tsx)

### 5. Hero composition simplification

Completed:

- Removed several always-live decorative hero layers instead of only reducing their opacity.
- Deleted `hero-section-mesh`, `hero-section-beam`, `section-orb-hero-c`, `hero-card-glow`, `hero-visual-grain`, `hero-visual-sheen`, and the continuous `hero-drift` animation.
- Kept the hero visual hierarchy intact with a smaller remaining stack:
  background,
  aurora,
  grid,
  brand motif,
  two subdued glow orbs,
  backplate,
  ring,
  rim,
  image,
  vignette.
- Lowered the intensity of the remaining aurora, ring, motif, rim, shadows, and image treatment so the first screen feels calmer and less effect-heavy.
- Updated responsive rules to remove references to deleted hero layers.

Key files:

- [Hero.tsx](/C:/Users\Admin/Desktop/project/nebula-nexus-labs/src/components/Hero.tsx)
- [home.css](/C:/Users\Admin/Desktop/project/nebula-nexus-labs/src/styles/home.css)
- [responsive.css](/C:/Users\Admin/Desktop/project/nebula-nexus-labs/src/styles/responsive.css)

### 6. Backdrop-filter normalization

Completed:

- Replaced the previous "glass everywhere" treatment with a narrower surface contract.
- Kept `backdrop-filter` only on the main header shell and the contact overlay backdrop, where it still improves readability or modal separation.
- Removed `backdrop-filter` from the cookie consent panel, locale switcher, mobile navigation panel, mobile panel backdrop, hero badge, hero secondary CTA, and scroll-to-top control.
- Rebuilt those secondary surfaces with stronger layered backgrounds and shadows instead of blur-heavy glass styling.
- Added shared blur tokens so the remaining justified usage is controlled from one place.

Key files:

- [index.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/index.css)
- [home.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/home.css)
- [shell.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/shell.css)
- [responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/responsive.css)

### 7. Spotlight and pointer-driven card cleanup

Completed:

- Removed the runtime spotlight mechanic from shared cards instead of tuning it locally.
- Deleted per-pointer `getBoundingClientRect()` and CSS custom property updates from the shared `SurfaceCard` primitive.
- Rebuilt spotlight cards as passive surface accents driven only by CSS hover and focus states.
- Kept the stronger card emphasis where it still helps hierarchy, but removed the cursor-tracking flashlight effect that made the UI feel busy and synthetic.

Key files:

- [SurfaceCard.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/primitives/SurfaceCard.tsx)
- [index.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/index.css)
- [home.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/home.css)

## Verification Snapshot

Verified on 2026-04-08:

- `npm run check:text` passed
- `npm run check:styles` passed
- `npm run lint` passed
- `npm run test` passed
- `npm run build` passed

Current build snapshot after the latest motion cleanup:

- main JS: `258.22 kB` raw / `84.43 kB` gzip
- main CSS: `76.01 kB` raw / `15.07 kB` gzip

## Remaining Backlog

Priority order for the next steps:

1. Reduce decorative complexity on the hero.
   Status:
   completed for the hero first-screen stack.

2. Normalize `backdrop-filter` usage.
   Goal:
   completed.

3. Revisit spotlight and other pointer-driven micro-interactions.
   Goal:
   completed for shared spotlight cards.

4. Continue a broader visual stability pass.
   Goal:
   check that the site feels deliberate rather than effect-heavy.

## Sources Used So Far

Official references used across the completed work:

- [React Docs: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect)
- [MDN: inert](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inert)
- [WAI-ARIA APG: Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [MDN: FontFaceSet.check](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check)
- [MDN: FontFaceSet.load](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/load)
- [MDN: FontFaceSet.ready](https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/ready)
- [web.dev: Optimize webfont loading](https://web.dev/articles/optimize-webfont-loading)
- [web.dev: High-performance CSS animations](https://web.dev/animations-guide/)
- [web.dev: Animations and performance](https://web.dev/animations-and-performance/)
- [MDN: will-change](https://developer.mozilla.org/en-US/docs/Web/CSS/will-change)
- [MDN: backdrop-filter](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter)
- [web.dev: Dialog component pattern](https://web.dev/patterns/components/dialog/pattern)
- [MDN: pointermove event](https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event)
- [MDN: getBoundingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)
- [MDN: requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame)
- [MDN: mix-blend-mode](https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode)
- [Tailwind: Styling with utility classes](https://tailwindcss.com/docs/styling-with-utility-classes)
- [Tailwind: Functions and directives](https://tailwindcss.com/docs/functions-and-directives)
- [React Router future flags](https://reactrouter.com/v6/upgrading/future)
- [update-browserslist-db README](https://github.com/browserslist/update-db#readme)

Forum/community references used as secondary confirmation:

- [Stack Overflow: modal focus and inert background](https://stackoverflow.com/questions/78926288/trap-focus-inside-the-modal-accessibility)
- [Stack Overflow: clip-path can cause shaky animations](https://stackoverflow.com/questions/43143966/applying-clip-path-to-parent-causes-shaky-animations-to-child-elements)
- [Stack Overflow: translateZ(0) performance hack discussion](https://stackoverflow.com/questions/10814178/css-performance-relative-to-translatez0)
- [Stack Overflow: blur filter animation can become choppy](https://stackoverflow.com/questions/65615602/blur-filter-in-css-keyframe-animation-makes-animation-choppynon-smooth-how-ca)
- [Stack Overflow: backdrop-filter slow on Android Chrome](https://stackoverflow.com/questions/74035280/css-backdrop-filter-slow-on-android-chrome)
- [Stack Overflow: getBoundingClientRect glitch discussion](https://stackoverflow.com/questions/73786110/what-causes-the-glitch-in-getboundingclientrect)
- [Tailwind discussion: repeated classes and extraction](https://github.com/tailwindlabs/tailwindcss/discussions/15524)

## Update Template

Use this structure for the next additions:

### Update YYYY-MM-DD

- Goal:
- Root cause addressed:
- Files changed:
- Checks run:
- Result:
- Follow-up:
