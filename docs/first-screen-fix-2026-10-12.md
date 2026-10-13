# Item 12: visible first screen before JavaScript

Implemented and verified locally on 2026-10-12 (Europe/Warsaw), on the item 8 candidate based on published commit `bcb7e21`. The user accepted the reviewed combined correction on October 13. Published in `7c8bb22`, with successful deployment and production verification recorded below.

## Problem and resulting behavior

The original early bootstrap marked a first homepage visit as intro-pending before the application loaded. Inline CSS hid the prerendered page. If the application bundle failed, there was no React code to clear that marker, so an existing heading and page stayed invisible. The first-visit boot path also deleted prerendered markup rather than hydrating it. Hero CSS started at zero opacity, and the navigation started hidden until a React effect ran.

The prerendered first screen now remains visible by default: header, heading, body and primary actions. If scripts fail to load, those elements still appear. When the application loads, it hydrates the existing page and preserves its DOM and form values. Optional intro playback starts after that attachment; it is not a prerequisite for showing the HTML.

## Source changes

- `index.html` no longer loads the early intro bootstrap or contains the CSS that hid prerendered markup. The replaced `public/brand-intro-bootstrap.js` was deleted.
- `main.tsx` hydrates any existing markup on both first and repeat visits; `createRoot` remains the fallback for an empty development container. It does not clear visible page content.
- `use-brand-intro.ts` starts with the same visible/done state as the server and requests playback from an effect. A React transition allows lazy Suspense boundaries to finish hydration before optional playback changes their parent props. Repeated effect execution and route changes retain their tested guards.
- `App.tsx` no longer writes an intro-pending document attribute or applies a class that makes the page transparent. A running, mounted intro still owns its temporary keyboard/scroll lock, and release restores focus.
- `Hero.tsx` emits static content without entrance classes/delays before intro playback. Optional entrance motion changes position without fading first-screen content to zero opacity. Unused default hero delays and pending transforms were removed from the existing motion/CSS modules.
- `Navbar.tsx` renders a visible header by default. Its obsolete mount-only visibility state/effect and associated hidden/visible CSS classes were removed. Scroll pinning and mobile-dialog behavior retain their existing state.

The initial attempt to start the intro with an urgent post-mount update replaced a still-hydrating Suspense boundary. The new first-visit tests caught that replacement and lost draft before delivery. Transition scheduling and avoiding unnecessary done-state updates fixed it at the hydration boundary.

## Verification

- Build, type checks and all 18 prerendered routes passed; generated sitemap changes were restored to the pre-task bytes. Lint/style architecture, text integrity and diff whitespace checks passed.
- All 178 tests across six files passed. Two new first-visit hydration cases cover PL/EN, preserving the original shell, heading, input element and value entered before JavaScript, with no recoverable hydration errors or console warnings. Existing intro, StrictMode, storage-failure, consent, contact-dialog and navigation checks remain green.
- With every network-loaded JavaScript file aborted: PL/EN home and company-service pages passed at 375×812, 768×1024, 1366×768 and 1920×1080, 16 cases. An initial-frame probe verified visible header, heading/words, body, actions and shell before hydration, without entrance animation or overlay; no horizontal overflow occurred. Four homepage screenshots were visually reviewed.
- A local proxy delayed only the application entry script by five seconds, leaving CSS/HTML/image requests independent. Both PL/EN homepages showed the first screen before that script arrived. After hydration, the shell/heading/input were the same objects, the pre-script draft was retained, the form activated, and the intro released access without application exceptions. The initial-frame probe ran at roughly 93/200 ms in these local runs; this is evidence about ordering, not a production latency guarantee.
- Eight normal intro viewport cases preserved the complete central statement, 16 px code gap, 46 px skip target, focus restoration, scrolling and cookie-banner measurement. PL Escape, EN click-skip and reduced-motion bypass passed in the browser.
- PL/EN native contact anchors brought the contact section into view while scripts were blocked; direct email links remained visible. No real inquiry, email, call or analytics-consent request was sent.
- Product-source searches found no remaining early-bootstrap, intro-pending, app-shell hiding, obsolete header-visibility or default-hero-delay contracts.

Local browser records and screenshots are in the ignored `.codex/item12-verification/` directory. The five-second proxy is a verification helper and is not application or deployment code.

## Scope and limits

Item 12's application-bundle failure and hidden first screen are corrected in the published release. This verifies critical static content and initial attachment, not every interactive feature without JavaScript or recovery from arbitrary later application exceptions. The user accepted the reviewed correction and short editor presentation on October 13 and requested their commit/publication. The separate desktop checkout and its unrelated edits were preserved.

## Production verification on October 13

Commit [7c8bb22](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7c8bb220a339eef733dea71de174b2077d33f2c7) was published through successful [Deploy SEOHOST run 38372086448](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/38372086448), producing tag `prod-20261013-085217-7c8bb22`. The site served the expected new client/CSS assets without the removed early bootstrap or pending marker.

With application script requests aborted, the styled PL mobile and EN desktop homepages showed their header, heading/words, body and actions before hydration, with no entrance animation or intro overlay. The first-screen probes ran at approximately 235/88 ms in this session; they establish visibility/order, not a production latency bound. Forms remained disabled before hydration. Normal PL first-visit startup preserved the same shell, heading, input and pre-script draft, then enabled the form. EN skip and both company-service pages also preserved their original nodes, released page access and retained correct locale/canonical metadata. No application exception or CSP violation was recorded.

Browser records and the mobile screenshot are saved locally in `.codex/item8-publication-2026-10-13/`. No real form submission or analytics-consent grant was sent. The documentation-only release record does not alter the deployed application artifact.
