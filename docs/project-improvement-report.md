# Project Improvement Report

Last updated: 2026-04-10
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

### 8. Typography regression cleanup

Completed:

- Found and fixed a service-page hero regression caused by inheriting the homepage hero layout contract.
- Broke the coupling between homepage `hero-section` layout and service-page hero composition.
- Gave service pages their own hero grid and calmer text measure so long service titles no longer collapse into a broken narrow column.
- Added a dedicated legal header contact class so long contact strings wrap safely on narrow screens instead of relying on a generic body-copy style.
- Re-verified homepage, service pages, premium service page, privacy policy and cookie policy on desktop and narrow mobile widths.

Key files:

- [ServicePage.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/pages/ServicePage.tsx)
- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)
- [LegalDocumentPage.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/legal/LegalDocumentPage.tsx)
- [index.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/index.css)

### 9. SEO and indexing contract rebuild

Completed:

- Diagnosed the real indexing problem as a delivery-model issue, not a missing-tag issue:
  live service and legal URLs were returning the same client-only shell with homepage metadata and an empty `#root` before JavaScript.
- Replaced route-level ad hoc metadata with shared SEO data functions used by both runtime and build-time generation.
- Moved legal pages away from manual `document.title` mutations and onto the same SEO contract as homepage and service pages.
- Added build-time prerender for all indexed URLs:
  homepage,
  canonical service pages,
  privacy policy,
  cookie policy.
- Rebuilt `sitemap.xml` from the same indexed-route manifest instead of maintaining it manually.
- Updated the client bootstrap to hydrate prerendered HTML only when the prerendered state actually matches client state; otherwise it falls back to a clean client render.
- Extended Apache routing so clean URLs can resolve to prerendered `.../index.html` files without relying on trailing-slash redirects.

Key files:

- [seo.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/seo.ts)
- [seo-routes.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/seo-routes.ts)
- [render-app.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/prerender/render-app.tsx)
- [PrerenderedApp.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/prerender/PrerenderedApp.tsx)
- [generate-sitemap.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/scripts/generate-sitemap.ts)
- [prerender.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/scripts/prerender.ts)
- [main.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/main.tsx)
- [index.html](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/index.html)
- [.htaccess](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/public/.htaccess)

### 10. Service page hero typography rebalance

Completed:

- Diagnosed the visual issue as a service-page typography contract problem, not as a single broken headline.
- Reduced the hero display scale so long service titles stop collapsing into a narrow vertical stack.
- Expanded the hero headline measure and tightened supporting copy measure so the left column feels intentional instead of stretched and uneven.
- Gave the summary card its own smaller heading and price scale instead of reusing a near section-title size inside a compact sidebar.
- Rebalanced the desktop hero grid so the main copy column and summary panel feel visually related across short, medium and long service titles.
- Adjusted the mobile hero title scale so narrow screens keep better rhythm without oversized line breaks.
- Verified the result visually on representative service routes with short, medium and long hero titles:
  `strona-wizytowka`,
  `strona-firmowa`,
  `strona-premium-dla-wymagajacych-firm`.

Key files:

- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)

### 11. Service page whitespace and composition tightening

Completed:

- Revisited the service-page hero after the first typography pass and confirmed that the remaining issue was not broken CSS, but over-dramatic whitespace and an imbalanced left/right composition.
- Tightened the hero composition by reducing the effective display scale, widening the headline measure, and slightly reducing the supporting copy span so the left column stops behaving like a poster instead of a content block.
- Reduced the visual mismatch between the main hero and the right summary card by giving the summary title and price a calmer scale more appropriate for a compact sidebar.
- Rebalanced the desktop hero grid so the summary panel no longer feels detached from the main content column.
- Tuned the narrow-screen title scale so the service hero keeps better rhythm without oversized line breaks on mobile.
- Rechecked representative service pages after the change:
  `strona-wizytowka`,
  `strona-firmowa`,
  `strona-premium-dla-wymagajacych-firm`.

Key files:

- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)

### 12. Service hero layout decoupling

Completed:

- Rechecked the service-page hero after the earlier report note and confirmed that the remaining empty space problem was structural, not typographic alone.
- Identified the root cause: service pages were still inheriting the homepage `hero-section` contract, including the full-screen first-screen logic and poster-like spacing.
- Rebuilt the service hero as its own route-specific layout surface instead of continuing to piggyback on the homepage hero container.
- Moved breadcrumbs and hero content into one shared frame so the first screen reads as a single editorial block instead of two detached vertical regions.
- Tightened desktop spacing by reducing the theatrical first-screen height, calming the title scale, and bringing the summary card closer to the main content column.
- Revalidated the updated service hero visually on representative desktop routes after the structural change.

Key files:

- [ServicePage.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/pages/ServicePage.tsx)
- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)

Outcome note:

- This iteration reduced whitespace, but it also proved that fully decoupling the service hero from the homepage hero surface weakened brand consistency and overall composition quality. The next pass corrected that regression instead of extending it.

### 13. Service hero dependency correction

Completed:

- Re-ran the analysis after the previous service-hero pass and confirmed that the real regression came from introducing a parallel hero surface rather than from the spacing changes alone.
- Restored the shared homepage `hero-section` surface for service pages so the first screen keeps the same brand-level visual language as the rest of the site.
- Removed the local service-only hero clone and kept service-specific behavior only where it belongs: grid proportions, text measure, sidebar width, and vertical rhythm.
- Rebalanced the service hero against three content ranges:
  `strona-wizytowka`,
  `strona-firmowa`,
  `strona-premium-dla-wymagajacych-firm`.
- Verified that the current version keeps the service pages denser and more editorial without fragmenting the shared hero system.

Key files:

- [ServicePage.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/pages/ServicePage.tsx)
- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)

### 14. Service hero column relation refinement

Completed:

- Rechecked the corrected service hero and confirmed that the remaining issue was no longer the overall surface, but the desktop relationship between the left text block and the right summary card.
- Identified the main source of the visual gap: `justify-content: space-between` combined with an underweighted right track on large screens.
- Replaced the distributed desktop spacing with a controlled grid gap and widened the summary-card column so the card can support the hero composition without competing with the main heading.
- Strengthened the summary card through width and internal rhythm rather than by turning it into a second dominant heading block.
- Revalidated the result on representative medium and long-title service pages after the change.

Key files:

- [service-page.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page.css)
- [service-page-responsive.css](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/styles/service-page-responsive.css)

### 15. Contact form provider-side spam protection restore

Completed:

- Revisited the contact form security review and confirmed that the biggest gap was not input validation itself, but the fact that the provider-side anti-spam layer had been explicitly disabled.
- Removed the `_captcha=false` override from the FormSubmit AJAX payload so the external form provider can enforce its own reCAPTCHA and abuse filtering again.
- Kept the existing client-side heuristics only as a preflight UX filter, not as the sole anti-spam barrier.
- Extended the form submission test so the request contract now verifies that provider-side protection is no longer disabled.

Key files:

- [ContactFormPanel.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/contact/ContactFormPanel.tsx)
- [app.test.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/test/app.test.tsx)

### 16. CSP hardening and analytics sink cleanup

Completed:

- Rebuilt the previous minimal CSP into an actual fetch policy tied to the app's real runtime dependencies.
- Added explicit directives for `default-src`, `script-src`, `connect-src`, `frame-src`, `img-src`, `style-src`, `font-src`, and `manifest-src` instead of relying on a mostly empty policy shell.
- Constrained third-party runtime sources to the current analytics and form-delivery providers:
  `googletagmanager.com`,
  `google-analytics.com`,
  `formsubmit.co`.
- Added `upgrade-insecure-requests` so mixed-content downgrades are rejected at policy level.
- Removed the `innerHTML` GTM noscript injection path and replaced it with DOM-based iframe creation to reduce HTML injection surface and make the analytics bootstrap more CSP-friendly.

Key files:

- [public/.htaccess](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/public/.htaccess)
- [analytics.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/analytics.ts)

### 17. HTTPS enforcement and HSTS rollout

Completed:

- Added an explicit permanent redirect from insecure `http` requests to `https` before route rewrites and SPA fallbacks.
- Added `Strict-Transport-Security` with a 1-year `max-age`, scoped so it is emitted only for HTTPS responses.
- Kept the rollout conservative by not enabling `includeSubDomains` or `preload` yet, because those should only be used after a verified subdomain inventory and HTTPS-only confirmation across the domain surface.
- Made the redirect logic tolerant of proxy setups that already pass `X-Forwarded-Proto: https`.

Key files:

- [public/.htaccess](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/public/.htaccess)

### 18. Client-side email routing cleanup

Completed:

- Removed the hidden secondary recipient from the public client configuration.
- Deleted the `_cc` field from the FormSubmit payload so the browser no longer exposes or controls duplicate recipient routing.
- Reduced the contact form to a single explicit public contact route instead of shipping a second private mailbox in the frontend bundle.
- Extended the form submission test so the request contract now guarantees that no `_cc` routing field is sent.

Key files:

- [site-config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/site-config.ts)
- [ContactFormPanel.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/contact/ContactFormPanel.tsx)
- [app.test.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/test/app.test.tsx)

### 19. Dependency audit cleanup and toolchain refresh

Completed:

- Ran a full dependency audit pass and first applied the non-breaking security updates available through the current major versions.
- Then completed the remaining security work by upgrading the dev toolchain to versions that close the lingering `vite/esbuild` and `jsdom/http-proxy-agent` advisories.
- Upgraded the stack to `Vite 8`, `Vitest 4`, and `jsdom 29`, then revalidated linting, tests, build, and text integrity.
- Followed the new Vite 8 recommendation and replaced `@vitejs/plugin-react-swc` with `@vitejs/plugin-react`, because the project does not use custom SWC plugins and the new toolchain explicitly warns against the previous setup.
- Brought the repository to a clean `npm audit` state with `0 vulnerabilities`.

Key files:

- [package.json](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/package.json)
- [package-lock.json](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/package-lock.json)
- [vite.config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/vite.config.ts)
- [vitest.config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/vitest.config.ts)

### 20. Permissions-Policy hardening

Completed:

- Audited the codebase for browser capability APIs before changing the header contract.
- Confirmed the app does not rely on privileged features such as camera, microphone, geolocation, payments, USB, HID, serial, or display capture.
- Added a deny-by-default `Permissions-Policy` so unsupported or unnecessary browser capabilities cannot be requested by this site or delegated to embedded content.
- Kept only self-scoped allowances where they are harmless and conventional for a marketing site:
  `autoplay=(self)`,
  `fullscreen=(self)`,
  `publickey-credentials-get=(self)`.

Key files:

- [public/.htaccess](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/public/.htaccess)

### 21. Live production verification pass

Completed:

- Checked the live production site directly at `https://node48.pl/` instead of only validating the repository state.
- Confirmed that the site is live, prerendered pages are being served, and route-level SEO output exists on production service pages.
- Confirmed that `http://node48.pl/` redirects to `https://node48.pl/` on the live host.
- Confirmed that the latest repo-level security header hardening is not yet visible on production:
  the live site still returns the older minimal CSP and does not yet emit `Strict-Transport-Security` or `Permissions-Policy`.
- Narrowed the remaining issue down to deployment state rather than implementation state:
  the repo contains the hardening, but production has not yet picked it up.

Key files:

- [public/.htaccess](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/public/.htaccess)
- [project-improvement-report.md](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/docs/project-improvement-report.md)

### 22. Homepage SEO/runtime import graph cleanup

Completed:

- Revisited the reported post-SEO slowdown and confirmed that the likely regression was not caused by security headers, but by the runtime dependency graph created during the SEO/indexing rebuild.
- Isolated the real issue: homepage-critical code still pulled route-only data into the initial client graph through an over-broad shared config and legal/SEO dependencies.
- Split the old aggregated site config into narrower runtime modules for:
  brand/site identity,
  contact delivery,
  analytics configuration.
- Moved homepage-critical consumers onto those narrower modules so the root route no longer depends on the route-level SEO/legal data contract.
- Removed the now-dead aggregated site config layer after all imports were migrated.
- Fixed text-integrity regressions in the new homepage SEO/catalog source files so the performance refactor did not leave encoding debt behind.
- Rebalanced manual chunking so homepage runtime data stays in the homepage-friendly chunk instead of creating a new bridge back into route-only data.
- Verified the result in the built output:
  `dist/index.html` no longer preloads `route-data-*.js` on the homepage.

Key files:

- [site-identity.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/site-identity.ts)
- [contact-config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/contact-config.ts)
- [analytics-config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/analytics-config.ts)
- [home-page-seo.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/home-page-seo.ts)
- [site-meta.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/site-meta.ts)
- [service-catalog.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/service-catalog.ts)
- [legal-ui.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/legal-ui.ts)
- [BrandIntroOverlay.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/BrandIntroOverlay.tsx)
- [BrandLogo.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/BrandLogo.tsx)
- [Footer.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/Footer.tsx)
- [ContactFormPanel.tsx](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/components/contact/ContactFormPanel.tsx)
- [analytics.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/analytics.ts)
- [seo.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/seo.ts)
- [service-page-seo.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/service-page-seo.ts)
- [use-brand-intro.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/use-brand-intro.ts)
- [motion.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/motion.ts)
- [vite.config.ts](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/vite.config.ts)
- [dist/index.html](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/dist/index.html)

### 23. CI Node runtime correction

Completed:

- Investigated the failing `Deploy SEOHOST` GitHub Actions run instead of treating it as a deploy transport problem.
- Confirmed the failure point was `npm ci`, not SFTP or SSH deployment.
- Reproduced the underlying issue locally by running install under `Node.js 20.18.1` with strict engine checks enabled.
- Identified the real root cause: after the Vite 8 toolchain upgrade, the dependency tree now requires `Node.js 20.19+` or `22.12+`, while the workflow still requested the generic `20` line.
- Fixed the reusable deployment workflow by moving it to `Node.js 22`.
- Added an explicit `engines.node` contract to `package.json` so the supported runtime now lives in the repository itself instead of only in CI configuration.

Key files:

- [_deploy-seohost-reusable.yml](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/.github/workflows/_deploy-seohost-reusable.yml)
- [package.json](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/package.json)

### 24. Deploy pipeline verification gate

Completed:

- Kept the site and client-hosting contract simple:
  the project still builds to a plain static `dist` folder and the client server does not need Docker, Node services, or any custom deployment runtime.
- Added a dedicated Ubuntu verification job to the production deployment workflow instead of pushing more complexity into the app or the client server.
- The deploy job now waits for a clean Linux `npm ci` and `npm run build` pass before any production upload begins.
- This moves the fragile dependency/install validation into GitHub Actions, where production-like Linux checks belong, without making the project itself harder to transfer or sell.

Key files:

- [deploy-seohost.yml](/C:/Users/Admin/Desktop/project/nebula-nexus-labs/.github/workflows/deploy-seohost.yml)

## Verification Snapshot

Verified on 2026-04-09:

- `npm ci` passed
- `npm run check:text` passed
- `npm run check:styles` passed
- `npm run lint` passed
- `npm run test` passed
- `npm run build` passed

Current build snapshot after the SEO/prerender rebuild:

- homepage entry preload no longer includes `route-data-*.js`
- homepage entry chunk: `31.38 kB` raw / `9.69 kB` gzip
- homepage data chunk: `3.66 kB` raw / `1.72 kB` gzip
- route-data chunk: `58.05 kB` raw / `20.34 kB` gzip
- main CSS: `71.50 kB` raw / `14.90 kB` gzip

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

5. Continue cross-route typography audits.
   Goal:
   keep page-specific text contracts independent from homepage layout assumptions.

6. Monitor indexation after deployment.
   Goal:
   confirm in Search Console that the prerendered service/legal URLs begin receiving real crawls and selected canonicals match the clean route URLs.

7. Continue reducing empty hero space where content does not justify a poster-style first screen.
   Goal:
   keep service pages editorial and readable rather than theatrical across all internal routes, not only the service hero.

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
- [Google Search Central: Meta tags and attributes that Google supports](https://developers.google.com/search/docs/crawling-indexing/special-tags)
- [Google Search Central: Control your snippets in search results](https://developers.google.com/search/docs/appearance/snippet)
- [React DOM Client: `hydrateRoot`](https://react.dev/reference/react-dom/client/hydrateRoot)
- [web.dev Typography](https://web.dev/learn/design/typography)
- [MDN: text-wrap](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap)

Forum/community references used as secondary confirmation:

- [Stack Overflow: modal focus and inert background](https://stackoverflow.com/questions/78926288/trap-focus-inside-the-modal-accessibility)
- [Stack Overflow: clip-path can cause shaky animations](https://stackoverflow.com/questions/43143966/applying-clip-path-to-parent-causes-shaky-animations-to-child-elements)
- [Stack Overflow: translateZ(0) performance hack discussion](https://stackoverflow.com/questions/10814178/css-performance-relative-to-translatez0)
- [Stack Overflow: blur filter animation can become choppy](https://stackoverflow.com/questions/65615602/blur-filter-in-css-keyframe-animation-makes-animation-choppynon-smooth-how-ca)
- [Stack Overflow: backdrop-filter slow on Android Chrome](https://stackoverflow.com/questions/74035280/css-backdrop-filter-slow-on-android-chrome)
- [Stack Overflow: getBoundingClientRect glitch discussion](https://stackoverflow.com/questions/73786110/what-causes-the-glitch-in-getboundingclientrect)
- [Tailwind discussion: repeated classes and extraction](https://github.com/tailwindlabs/tailwindcss/discussions/15524)
- [Webmasters Stack Exchange: Google will render but not index my SPA site](https://webmasters.stackexchange.com/questions/115435/google-will-render-but-not-index-my-spa-site)

## Update Template

Use this structure for the next additions:

### Update YYYY-MM-DD

- Goal:
- Root cause addressed:
- Files changed:
- Checks run:
- Result:
- Follow-up:
