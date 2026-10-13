# Item 8: short editor intro with immediate skip

Implemented and verified locally on 2026-10-12 (Europe/Warsaw), against published baseline `bcb7e218cc4934d3afcdf9e8bc70df8a3cbaa2eb`. Accepted and published on October 13 in `7c8bb22`, together with item 12. Deployment and production verification succeeded; the release record below supersedes the earlier pending states.

This report records the item 8 implementation and successive review stages. The subsequently authorized [item 12 follow-up](./first-screen-fix-2026-10-12.md) supersedes the early-boot/pending-marker behavior described below and corrects the recorded first-screen blocker. A post-release report that the word was missing exposed a separate paint/clock race, detailed in the final section. The corrective candidate has 185 passing tests and preserves the visible prerendered page.

## Story and scope

A first visit to a PL/EN homepage starts the editor intro, then releases the page automatically or immediately through the skip control. The flow is browser navigation → existing session flag and intro state → phase timer → page focus, scrolling and cookie controls. It makes no API or backend request.

The original desktop checkout's unpublished editor presentation was compared with the current published wordmark. Its code-editor idea was retained in a corrected candidate on the latest published worktree. The original desktop files and unrelated divider/documentation edits were preserved. The desktop variant's additional pre-React editor cover was not imported.

## Cause and correction

The desktop variant configured 3,520 ms before exit and 4,140 ms total duration. The hook scheduled both timers in an effect dependent on `phase`. Entering `exiting` cancelled the pending completion and started a new full-duration timer. That yielded 7,660 ms of scheduled overlay lifetime, plus up to 1,200 ms of font preparation: 8,860 ms excluding bundle download and browser scheduling. The page itself was blocked during preparation/running, not during the entire invisible exit interval.

The corrected lifecycle has one active timer per phase: 800 ms showing the scene, followed by a 240 ms opacity exit. Skip immediately enters `done`, cancelling the timer. There is no font readiness phase, font promise race or font timeout; the editor uses system monospace. Return visits, reduced motion and service routes continue to bypass the intro.

CSS receives its durations from the existing motion module. Row staggering is derived from the actual row count, so the background typing and central statement finish within the shared 600 ms entry period. The long independent row/caret/scanline/promotion timelines were not retained. Activity-bar decoration uses a pseudo-element, and responsive sizing uses `clamp()` without new component-specific breakpoints.

The central statement keeps its intrinsic rendered width. Its small text box is revealed with a stepped clip instead of assuming that `22ch` equals the actual glyph width. Browser checks caught that assumption clipping the closing quote/semicolon because of inherited font metrics. The final string is complete at every checked width.

The existing action primitive provides `Pomiń intro` / `Skip intro`. The button receives initial focus, Tab/Shift+Tab stay on the single intro control, and Escape skips. On release the app loses `inert`, the pending attribute is cleared before focus returns to the first navigation link, and scrolling is unlocked. The fading scene is hidden from assistive technology and its button disabled while the page becomes available.

## Verification

- `npm run build`: passed application/configuration type checks, client build and all 18 prerendered routes. Generated sitemap changes were restored to their pre-task bytes.
- `npm run lint`: passed, including the style architecture check.
- `npm run test`: 170 tests across five files passed. Coverage includes exact exit-phase completion, PL/EN skipping, Escape, late font completion, no font gate, focus restoration, scroll locking, cookie consent and hydration. The obsolete font-gate tests were replaced with the new non-blocking-font contract.
- `npm run check:text`, `git diff --check`: passed.
- Dead-code review: removed wordmark slot/rise styling, letter-based timing values, font readiness helpers/exports and unused editor indentation/chrome/promotion contracts.
- PL/EN homepages checked at 375×812, 768×1024, 1366×768 and 1920×1080: eight cases. The entire `const brand = "NODE48";` string fits; the skip target is 46 px high; no horizontal overflow or browser exceptions occurred. Four captured intro frames were visually reviewed.
- Instrumented browser runs measured 846–902 ms before page release and 1,109–1,167 ms until overlay removal, from the running phase. These include rendering/screenshot overhead and do not establish a wall-clock bound under a stalled/backgrounded browser or slow bundle download. Configured durations are 800 + 240 ms.
- PL click-skip and EN Escape immediately removed the overlay, restored navigation focus, released scroll/inert state and retained the session flag. Repeat navigation skipped the intro. Reduced-motion and direct service entry bypassed it.
- A fresh browser with both Manrope font files intercepted/aborted still completed the intro and released focus/scrolling; both font faces reported `error`, with no application exception.
- The existing cookie banner remains 185.59 px high after intro release in all eight normal-font cases.

## Remaining first-screen boundary

Application-bundle failure was checked with asset JavaScript blocked while the existing bootstrap still ran. The PL homepage kept `data-brand-intro-pending` and hid its prerendered shell; the EN service page remained visible. This is the existing separate item 12, not resolved by shortening the client intro. The bootstrap and `index.html` behavior were not changed, and no first-screen/no-JavaScript compliance claim is made for this fix.

Browser records and screenshots are saved locally in the ignored `.codex/item8-verification/` directory. The candidate awaits review; the published site remains at the accepted item 7 release until publication is authorized.

## Correctness review after user feedback

The user questioned whether the implementation was correct. Rechecking the 1366×768 capture found background code crossing the central statement. The terminal layout now reserves separate grid rows for the background code viewport and the statement, with equal flexible rows above/below the statement to keep it centered. The code viewport clips within its own row and retains a 1 rem gap before the statement, without new decorative layers or component breakpoints.

All 170 tests passed again during this review. The editor presentation was retained as an implementation assumption after an unanswered optional preference question; the user has not accepted that design. The timer correction is supported by tests and browser evidence, but it does not resolve the first-screen dependency on the application bundle. Calling the entire first-visit experience fully ready would exceed that evidence.

After the CSS correction, build, lint, text integrity and diff whitespace checks passed. All eight PL/EN viewport cases were repeated against the rebuilt preview; the background code viewport ended 16 px before the central statement in every case. Full statement fit, 46 px skip target, page release, consent height and absence of overflow/browser exceptions remained verified. Four refreshed screenshots were inspected visually. The previous bundle-failure finding remains applicable because the bootstrap and boot behavior were not changed.

## Second correctness review: storage and effect replay

The user's request to check again added six regression tests. Before correction, three focused tests failed: denied `sessionStorage` access threw during hook initialization; failed flag persistence threw before installing the phase timer; and StrictMode's repeated mount effects mistook the flag written by this mount for an earlier visit and cancelled the intro. A fourth failure appeared in the full application when both storage APIs were denied: language persistence threw from `I18nProvider`.

The existing intro predicate is now shared by the hook and `main.tsx`, catches unavailable storage, and skips the optional intro in that case. Boot evaluates it once and clears a stale pending marker when the intro is bypassed. The pathname effect handles actual route changes rather than rechecking the initialized mount. A ref remembers playback for the mounted hook; storage writes are best effort and cannot interrupt phase timers. Language persistence uses the existing cookie flow's exception-handling pattern, keeping the URL's locale even when saving it fails. When writes fail but reads work, full document reloads cannot retain the session flag and may play the intro again; client navigation within the mounted app does not replay it.

Latest verification: build/prerender, lint, text integrity and diff checks passed; all 176 tests across six files passed. Six real-browser storage cases (session access denied, both APIs denied, and session flag writes failing; PL/EN) kept the page and cookie choices available with no application exceptions. Four first-visit anchor cases (`#services`/`#contact`, PL/EN) reached the requested section and released scrolling. All eight standard viewport cases were repeated, preserving the complete statement, 16 px code/statement gap, 46 px skip target, focus restoration and no overflow. Measured overlay removal was 1.103–1.165 seconds from running, including browser instrumentation overhead.

The application-bundle failure was repeated against this latest build: the prerendered homepage heading existed, but its shell stayed hidden, with no hydrated app or intro overlay. Item 12 remains open. These storage/StrictMode corrections do not resolve that failure before the main JavaScript runs. The source scope expanded to `main.tsx` and the language provider because reproductions traced the same optional-storage failure into those startup paths. No commit or publication has been performed.

## Item 8 review after the first-screen correction

The user requested another item 8 review after item 12 was corrected. This review found a remaining presentation defect at enlarged text size: on a 375×812 viewport with a 32 px root font, the statement occupied about 428 px inside a 311 px clipping box. The previous `white-space: pre` prevented wrapping and hid the end of the statement. The existing statement now uses `pre-wrap` with `overflow-wrap: anywhere`, allowing the text to fit naturally without shrinking it, adding a breakpoint or changing the phase timers.

Two additional lifecycle tests cover a home intro deferred by Suspense while navigation leaves the homepage, and unmounting during playback. The stale deferred update does not start an overlay or write a session flag after route departure; unmounting restores scrolling and clears the pending phase timer.

- Build/type checks, all 18 prerendered routes, lint/style architecture, text integrity and diff whitespace checks passed. All 180 tests across six files passed.
- Eight PL/EN cases at 375×812, 768×1024, 1366×768 and 1920×1080 retained the complete statement layout, 16 px code gap, 46 px skip target, released focus/scrolling and no horizontal page overflow.
- Eight further PL/EN cases at 320×568 and 375×812 with root text at 150% and 200% passed. Each non-whitespace character's rectangle fits within the statement box, including the final quote and semicolon; the skip control stays within the viewport. Code gaps grow with the root font to 24/32 px, and skip target heights grow to 68/90 px. The 200% phone screenshot was visually reviewed.
- The latest completed matrices measured page release after 820–904 ms and overlay removal after 1.075–1.167 seconds from the running phase. Configured phase durations remain 800 + 240 ms. These measurements include browser overhead and are not a timing guarantee for a stalled or backgrounded tab.
- Initial focus, Tab/Shift+Tab containment, PL Escape, EN click-skip and session persistence passed. A document reload did not replay the intro. Direct service entry skipped it; client navigation to the homepage played it once, and returning through the service did not replay it. Reduced motion bypassed it.
- Two static PL/EN homepage smoke checks with application scripts aborted retained visible header, heading/words, body and actions without hydration or an overlay. These supplement item 12's earlier initial-frame and delayed-entry checks.
- The geometry/lifecycle matrices and a clean service-navigation/reduced-motion/static-page browser session reported no application exceptions. An earlier helper opened a nested URL without its trailing slash: Vite preview served homepage HTML there and triggered hydration recovery. Checking the response titles identified that preview limitation; the corrected helper requests the nested prerendered HTML. The existing Apache rewrite handles the production URL through its `index.html`. This review did not change routing or deployment configuration.

Latest evidence is in the ignored `.codex/item8-final-review/` directory. Browser geometry uses Chromium at the recorded viewport/root-font settings; it is not a real-device or Safari audit. Item 12's earlier blocker remains corrected locally. After this review and the phone screenshot, the user explicitly requested commit/publication on October 13, accepting the combined candidate. The existing deployment workflow and production checks will confirm the release outcome.

## Accepted production release on October 13

The accepted correction was committed as [7c8bb22](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7c8bb220a339eef733dea71de174b2077d33f2c7) and pushed to `main`. [Deploy SEOHOST run 38372086448](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/38372086448) completed successfully, including both build verification and deployment jobs. The immutable release tag is `prod-20261013-085217-7c8bb22`.

Production returned HTTP 200 with the verified application assets. The PL 375×812 homepage completed the intro automatically and preserved the original shell, heading, input and draft entered by the pre-script probe; page access and scrolling were released. Its captured statement fit completely, with a 46 px skip button, and the overlay was removed about 1.20 seconds after running began in this instrumented production check. EN 1920×1080 Escape removed it immediately. A repeat PL document visit bypassed playback. The PL mobile menu opened/closed, and service-menu handoff opened the native contact dialog with focus in its name field, then released scrolling on Escape. Both company-service locales retained their original markup and correct locale/canonical metadata without an intro. The cookie banner remained 185.59 px high, with no analytics script inserted.

PL mobile and EN desktop script-aborted homepage checks kept the styled first screen visible before hydration and without an overlay or entrance animation. The browser session recorded no application exceptions or CSP violations. Requests were spaced to avoid the hosting rate limit encountered during the preceding release. No real inquiry or consent grant was sent.

Production records and the mobile screenshot are in the ignored `.codex/item8-publication-2026-10-13/` directory. The separate desktop checkout and its unrelated edits were preserved. A documentation-only follow-up records this outcome without changing or redeploying the verified application artifact.

## Post-release correction: wait for the painted word

The user reported that the NODE48 animation was absent on first load. A new production probe opened the plain homepage in an empty session without a forced flag reset and sampled animation frames. React's running phase began around 574 ms, but the first CSS animation frame did not arrive until about 790 ms; the animation clock was still zero around 814 ms. The 800 ms mount-based exit timer fired around 1,415 ms before word typing completed. None of the running frames contained the unclipped full statement: it appeared only after the exit class removed the typing animation. An ordinary reload also bypassed playback because the old `"1"` flag had already been saved.

The earlier range/geometry checks established layout fit and lifecycle completion but did not establish that the full word was painted before fading. This review adds that missing boundary instead of extending the old mount-based timer.

The existing state machine now runs `running → holding → exiting → done`. The word's actual `animationend` moves it into a 200 ms hold; only then does the 240 ms fade begin. Background row animation events cannot finish the word phase. Each phase still owns one timer. Entry's 1,200 ms timeout is a bounded fallback: if the event never arrives, removing the running class reveals the complete statement, then the same hold/exit phases release the page. Page interaction and scrolling remain locked through the hold. Skip works in either blocking phase and late completion cannot restart playback. No hiding bootstrap or new CSS layer was added.

The existing session-storage slot now records `editor-v2` when the full statement is reached or the user explicitly skips. The legacy `"1"` value does not suppress the corrected playback; after that one playback, the current value suppresses repeats. Optional storage failure, reduced-motion bypass and deferred hydration retain their guards. The obsolete nominal `exitDelayMs`/`totalDurationMs` timing exports were removed.

Build/prerender, lint/style architecture, type checks and all 185 tests across six files passed. The new delayed-completion regression test failed on the preceding logic before implementation. The tests cover holding/access release, row-event filtering, missing-event fallback, legacy-version playback, late completion after skip, storage failures, StrictMode and preserved hydration. JSDOM's animation-event constructor is defined in the existing test setup so React uses the standard browser event name rather than a vendor fallback.

Eight normal PL/EN viewport cases and two phone cases with 200% text retained the full statement, usable skip control and original heading. Animation-frame samples contained 11–13 fully visible holding frames before fading, spanning roughly 179–199 ms. A ten-second simulated word animation exercised the bounded fallback and still displayed the full statement before release. Legacy `"1"` playback, current-version repeat bypass, EN Escape, reduced motion and PL/EN script-aborted first screens passed without application/CSP exceptions. Five captured frames were visually reviewed. Evidence is in `.codex/item8-missing-intro-2026-10-13/`; publication of this correction is pending.
