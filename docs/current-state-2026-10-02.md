# NODE48: current state and audit progress

Updated: 2026-10-13 (Europe/Warsaw). This is the current documentation entry point; April snapshots retain their historical scope.

Follow-up on October 2: item 4's contact presentation was accepted after mobile screenshot review and published in `037ba8f`; its deployment and production smoke checks succeeded. Item 5's accepted keyboard-focus correction was published in `7f8e34f`, with a successful deployment and production verification. Item 7 was accepted and published on October 12 in `bcb7e21`, with successful deployment and PL/EN production checks. After the final review and phone screenshot, the user accepted the combined item 8/item 12 correction on October 13. Commit `7c8bb22`, successful deployment and PL/EN production verification completed that release. Details are recorded in [direct-contact design refinement](./direct-contact-design-2026-10-02.md), [contact-dialog keyboard focus](./contact-dialog-focus-fix-2026-10-02.md), [compact cookie banner](./cookie-banner-fix-2026-10-02.md) and [short editor intro](./intro-motion-fix-2026-10-12.md).

## Source and scope

- Repository: [adminfavmotors/nebula-nexus-labs](https://github.com/adminfavmotors/nebula-nexus-labs).
- Public brand and site: [NODE48 — node48.pl](https://node48.pl/).
- Published application baseline for the item 8 implementation: `bcb7e218cc4934d3afcdf9e8bc70df8a3cbaa2eb`.
- Latest published application commit: `7c8bb220a339eef733dea71de174b2077d33f2c7`, covering items 8 and 12. The documentation-only release record does not change its application artifact.
- Active checkout: `C:\Users\Admin\.codex\worktrees\6acd\nebula-nexus-labs`, branch `codex/contact-legitimate-inquiries`. Publication targets remote `main` through the existing workflow.
- The separate desktop checkout contains the original unpublished intro variant and unrelated edits. It was preserved; the corrected editor presentation is prepared in the active checkout on the latest published baseline.

The original documentation snapshot reconciled existing audit findings, implementation reports, source/workflow configuration and four successful deployment records. It was not a fresh exhaustive site audit on October 2. Measurements below that originate in the original audit are historical findings, not newly repeated measurements. The subsequent local item 4 follow-up is identified above and in its own report. The baseline above identifies the published application work being documented.

## Published work

Each run below was confirmed `completed / success` during its respective delivery or documentation verification. Tag timestamps are UTC. GitHub Actions and production tags are the release record; a successful upload does not prove mailbox receipt or design acceptance.

| Audit item | Published result | Commit | Successful deployment | Production tag |
|---|---|---|---|---|
| 1, including React/TypeScript follow-up | Legitimate inquiries accepted; request/result handling, hydration and type checks corrected | [a3ac0a2](https://github.com/adminfavmotors/nebula-nexus-labs/commit/a3ac0a2af7f7e5cf6bcd47f8caf0f49b0b0bd739) | [36844441191](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36844441191) | `prod-20261001-094252-a3ac0a2` |
| 2 | Malformed URL fragments no longer unmount React | [7a00b26](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7a00b2625ea9b5fa1907cecc8553636c028cccc7) | [36863594901](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36863594901) | `prod-20261001-124311-7a00b26` |
| 3 | All six service pages have complete explicit English content | [d809332](https://github.com/adminfavmotors/nebula-nexus-labs/commit/d80933202312c4b4d8249f97c96ec80314972855) | [36872540645](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36872540645) | `prod-20261001-135744-d809332` |
| 4: original functional release | Persistent email/phone in section, dialog and footer; subsequent accepted design recorded separately | [90fb5ee](https://github.com/adminfavmotors/nebula-nexus-labs/commit/90fb5ee4da2ac78ea8e8f5a0c2c5cc8b294bb2a1) | [36883274320](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36883274320) | `prod-20261001-151923-90fb5ee` |
| 4: accepted visual refinement | Shared channel labels/icons, prominent values and visible underlined keyboard focus | [037ba8f](https://github.com/adminfavmotors/nebula-nexus-labs/commit/037ba8f804b90d41101496e66f93bc7ff60ad464) | [36986280693](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36986280693) | `prod-20261002-085018-037ba8f` |
| 5 | Native contact dialog contains keyboard focus and restores it to the opener | [7f8e34f](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7f8e34f86568ebc0b294472728e150f023880a3a) | [36991683019](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36991683019) | `prod-20261002-094642-7f8e34f` |
| 7 | Compact PL/EN cookie banner with explicit accept/decline choices | [bcb7e21](https://github.com/adminfavmotors/nebula-nexus-labs/commit/bcb7e218cc4934d3afcdf9e8bc70df8a3cbaa2eb) | [38259078677](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/38259078677) | `prod-20261012-135630-bcb7e21` |
| 8 and 12 | Short skippable editor intro; visible static first screen and preserved first-visit hydration | [7c8bb22](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7c8bb220a339eef733dea71de174b2077d33f2c7) | [38372086448](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/38372086448) | `prod-20261013-085217-7c8bb22` |

Detailed evidence and historical verification counts:

- [Item 1: contact form, React and TypeScript](./contact-form-fix-2026-10-01.md).
- [Item 2: hash navigation](./hash-navigation-fix-2026-10-01.md).
- [Item 3: service translations](./service-translations-fix-2026-10-01.md).
- [Item 4: direct contacts and user review](./direct-contact-fix-2026-10-01.md).

## Current implementation

React 18, Vite 8, TypeScript, React Router 6 and Tailwind-backed split CSS produce a static site. There is no persistent application server or private form backend. Polish is the default locale; English has its own routes under `/en`. The October 13 release also resolves item 12's hidden first screen; see [first-screen correction](./first-screen-fix-2026-10-12.md). That correction and item 8 are published in `7c8bb22`.

The build checks application/configuration types, generates the sitemap, builds the client and prerenders HTML. There are 14 indexed routes: two homepages and six services per locale. Four legal routes are also prerendered, marked `noindex,follow` and excluded from the sitemap. The build additionally emits `404.html`; Apache rules resolve canonical paths to their prerendered files. Static rendering waits for lazy components and fails on errors or a 30-second stall. First/repeat visits both hydrate existing markup and preserve DOM/form values. The prerendered header and hero are visible before application JavaScript; optional intro playback starts after hydration.

Canonical service keys/slugs live in `src/lib/service-catalog.ts`; short localized catalog entries live in `src/lib/service-pages.ts`. Detailed PL/EN content lives in the existing `src/lib/service-page-details` modules, with completeness enforced by TypeScript. Full English translation does not validate the offer's commercial or SEO claims, and it does not consolidate all duplicate catalog data.

The shared form sends an allowlisted payload directly to FormSubmit. It validates required fields and lengths without rejecting capitalization, reference links, punctuation or autofill. It prevents simultaneous requests, aborts after 20 seconds, requires HTTP success plus an explicit successful provider result, preserves drafts on failure and applies a 45-second cooldown only after confirmed success. Timed-out requests are not automatically retried. Static markup declares POST and keeps submission disabled until hydration. Native email/phone links use `src/lib/contact-config.ts` and remain visible before and after hydration, during requests and after errors.

No inquiry content is logged or stored in application browser storage. Client-side validation, the honeypot and cooldown cannot enforce server-side abuse limits. Provider activation, actual filtering/CAPTCHA behavior, email rendering and inbox delivery were not independently verified. Browser checks used intercepted responses and sent no real inquiries or calls. GTM loads only after an explicit granted consent; denied, missing, invalid or unreadable choices do not authorize analytics.

## Verification and its limits

Published-baseline application checks completed on October 1 after item 4 (fresh local follow-up checks are in the linked October 2 design report):

| Check | Recorded result |
|---|---|
| `npm run build` | Passed, including TypeScript and full prerender |
| `npm run lint` | Passed, including style architecture checks |
| `npm run test` | 161 tests passed across five files |
| `npm run check:text`, `git diff --check` | Passed |
| Dead-code review | Obsolete conditional-contact translation/CSS removed |
| PL/EN contact section, dialog and footer | Checked at 375, 768, 1366 and 1920 px; no overflow, clipped contacts, compressed logo or page errors |
| Contact targets and keyboard navigation | 44 px minimum targets; email-to-phone Tab navigation and visible focus checked |
| Static/no-JavaScript HTML | Home/service PL/EN contacts remain visible; form submission disabled before hydration |
| Production smoke checks after item 4 | PL mobile and EN desktop contacts verified after successful deployment |

Earlier fixes also verified malformed fragments/back-forward navigation, complete service-page content in 24 viewport checks, provider failure/success/timeout contracts, cookie consent, full-page hydration and preservation of drafts/SSR nodes. Their reports describe the exact coverage. Passing these checks does not establish complete accessibility, visual quality or real provider delivery. The original documentation-only October 2 update made no fresh application test claim; the later item 4 design report records its own verification.

## Audit checklist: original order of importance

Numbering is retained from the original 33-item audit. Related items 6, 11, 22 and 24 were resolved alongside item 1. “Open” means not resolved by the documented work; it does not claim a fresh reproduction today.

| No. | Problem | Current status |
|---|---|---|
| 1 | Form rejects legitimate uppercase inquiries, multiple links and autofill | Fixed and published in `a3ac0a2` |
| 2 | Malformed URL fragment throws and unmounts the application | Fixed and published in `7a00b26` |
| 3 | English service pages omit scope, descriptions, timelines and correct process steps | Fixed and published in `d809332` |
| 4 | Direct email/phone unavailable in the normal contact flow | Functional fix published in `90fb5ee`; visual refinement verified and accepted on October 2, release tracked by its Actions run/production tag |
| 5 | Contact dialog does not trap keyboard focus or restore it to the opener | Fixed, accepted and published in `7f8e34f`; deployment and production checks succeeded |
| 6 | Four TypeScript errors and no required type check before deployment build | Fixed with item 1; builds now run `check:types` |
| 7 | Cookie banner covers roughly 44% of the mobile first screen in the original audit | Fixed, accepted and published in `bcb7e21`; 364 → 186 px at 375×812 |
| 8 | Unpublished local intro adds blocking delays and timer complexity | Initial release `7c8bb22` published; subsequent missing-word report exposed a paint/clock race. Event-driven hold and versioned playback correction verified locally; corrective publication pending |
| 9 | Premium service mobile layout has an excessively long heading and unused space | Open |
| 10 | Starting prices and net-price qualifications are inconsistent across the catalog | Open; full bilingual detail content alone does not resolve catalog consistency |
| 11 | A stalled contact request can leave submission pending indefinitely | Fixed with item 1; 20-second abort and recoverable UI |
| 12 | First-visit intro hides prerendered first-screen content and depends on JavaScript | Fixed, accepted and published with item 8 in `7c8bb22`; static first screen and preserved hydration verified in production |
| 13 | Service, trust and SEO data have duplicate sources | Open; detailed locale registry changed, broader consolidation not done |
| 14 | “See steps” action leads to contact rather than the process | Open |
| 15 | Portfolio case names and destination sites do not consistently match | Open |
| 16 | Portfolio cases lack evidence of client value and results | Open |
| 17 | Unsubstantiated percentage, speed, PageSpeed and SEO claims | Open; translations preserve the existing offer rather than substantiate it |
| 18 | Absolute support promises about availability and never losing data | Open |
| 19 | Form labels rely on placeholders; placeholder contrast measured about 2.54 in the original audit | Open |
| 20 | Closed FAQ answers remain exposed to screen readers | Open |
| 21 | Homepage lacks a main landmark and skip link | Open |
| 22 | Honeypot fields interfere with accessibility | Fixed with item 1; one hidden provider-compatible trap remains |
| 23 | Portfolio pagination targets measured about 9.9 × 8.3 px in the original audit | Open |
| 24 | Cookie-banner height becomes stale after the intro | Fixed with item 1; measurement reacts when intro blocking ends |
| 25 | No permanent way to reopen cookie preferences | Open |
| 26 | Generic hero copy does not clearly explain the offer | Open |
| 27 | Repeated promises replace concrete evidence | Open |
| 28 | Generic blue/neon studio styling lacks a distinct identity | Open |
| 29 | Excessive frames, glows and card containers | Open |
| 30 | Copy mixes first-person singular and plural voices | Open |
| 31 | Sales pressure and flawed redesign questionnaire logic | Open |
| 32 | Uneven PL/EN editorial quality across the site | Open; six complete English service details resolve item 3 only |
| 33 | CSS/motion patches, obsolete intro variables and overlapping timelines | Open |

## Audit history and user acceptance

The user accepted **item 4** after reviewing mobile screenshots and authorized its commit/publication. Commit `037ba8f`, successful deployment and production verification completed that release.

The user then requested **item 5**, accepted the verified correction and explicitly authorized its commit/publication on October 2. Its native contact dialog now focuses the name field immediately, blocks background interaction, wraps Tab/Shift+Tab at the boundaries and restores focus on closing. Browser checks covered PL/EN home/service pages at four widths, mobile-menu handoff, pending/error/success states and legal-route navigation. All 167 tests pass. Commit `7f8e34f`, successful deployment `36991683019` and production verification completed that release.

The user requested **item 7** next (item 6 was resolved with item 1). Its long technical cookie copy and vertically stacked controls were replaced with a short PL/EN explanation, a policy link beside the title and two buttons sharing a row at normal text size. Natural wrapping and a viewport-bounded scroll area keep the controls reachable with enlarged text. On a 375×812 viewport the banner is 185.59 px high, down from 363.84 px. Build, lint, all 167 tests, 16 standard viewport/route checks, eight narrow/enlarged-text checks and PL/EN consent persistence checks passed. After reviewing the mobile screenshot, the user accepted the correction and authorized commit/publication on October 12. Commit `bcb7e21`, successful deployment `38259078677` and isolated PL/EN production checks completed that release. The rapid production batch encountered hosting rate limits; the later checks succeeded after a pause.

The user then requested **item 8**. The original desktop editor variant was compared with the published intro and preserved. Its presentation was adapted in the active checkout, with a shared 800 ms show / 240 ms exit timeline, one active phase timer and a localized skip button plus Escape support. The obsolete downloaded-font readiness phase was removed because the editor uses system monospace. Focus and scrolling return to the page when the blocking phase ends. All 170 tests, build and lint pass. Eight PL/EN browser cases confirm complete text, 46 px skip targets, no overflow and measured overlay lifetimes of 1.11–1.17 seconds after running starts. Mobile screenshots are ready for review; this change is not yet committed or published. The next unresolved numbered finding after this local correction is **item 9**. The application-bundle failure / prerender visibility problem remains **item 12**.

The user explicitly rejected the first visual result of item 4 after publication. The accepted refinement separates channel labels from prominent values, introduces meaningful email/phone icons, shares the block across all three surfaces and replaces the rectangular focus outline with stronger underlining plus icon emphasis. Readable links, usable targets and visible keyboard focus are preserved. Acceptance came from the user's explicit response to the screenshots, independently of the passing checks.

The user's subsequent correctness review identified an overlap between background code and the central statement at 1366×768. The editor now uses separate grid rows for the code viewport and the statement, preserving a centered statement and a gap without viewport-specific rules. The choice to retain the editor presentation was an implementation assumption after an unanswered optional preference question, not explicit user design acceptance. The lifecycle checks support the timer fix; they do not establish that the complete first-visit experience is ready while item 12 remains open.

The second requested review reproduced and corrected denied session-storage access, failed intro-flag writes, premature cancellation under StrictMode effect replay, and a subsequent language-persistence crash when both storage APIs were denied. Boot and the hook now share one guarded intro predicate; actual pathname changes are distinguished from repeated mount effects, and optional writes cannot stop the page or phase timer. All 176 tests across six files, build/prerender and lint passed. Six PL/EN storage-failure cases, four first-visit anchor cases and eight standard viewport cases passed in the browser. Item 12's hidden prerendered shell on application-bundle failure was reproduced again and remains open. The candidate is still uncommitted and unpublished.

The user then explicitly authorized correcting the remaining first-screen failure. Item 12 now removes the early hiding bootstrap, preserves prerendered markup on first visits, defers intro playback until hydration and makes the hero/header visible by default. All 178 tests, build and lint passed. Sixteen script-blocked viewport cases, two entry-script-delay cases, eight normal intro cases and five native-anchor/skip/reduced-motion cases passed. First-visit PL/EN hydration preserved the original heading, shell, input and draft without warnings. This resolves the local item 12 blocker recorded by the earlier reviews; commit and publication remain pending.

The subsequent item 8 review found and corrected clipped central text at 200% text size. Natural wrapping in the existing statement now preserves every visible character at 320/375 px widths with 150/200% root text. Eight normal and eight enlarged-text PL/EN geometry/lifecycle cases passed, along with keyboard/skip, repeated visits, service/home navigation, reduced motion and two static-page smoke checks. Two regression tests also cover deferred playback after route departure and timer/scroll cleanup on unmount. All 180 tests, build, lint and text/diff checks passed. A clean browser session reported no application exceptions; an earlier Vite-preview path mismatch was isolated in the verification helper. The latest details and limitations are in the item 8 report. This candidate remains uncommitted and unpublished.

Other open findings retain their original scope and ordering. Items 8/12 change intro presentation, lifecycle and first-screen startup; the separate desktop edits, form delivery, consent authorization and deployment workflows retain their existing implementation.

On October 13, after the final correctness review and enlarged-text screenshot, the user explicitly requested commit and publication, accepting the reviewed combined item 8/item 12 candidate. Commit `7c8bb22` was pushed to `main`; `Deploy SEOHOST` run `38372086448` completed successfully, including both Ubuntu build verification and upload/tag jobs. Tag `prod-20261013-085217-7c8bb22` identifies the deployed source. Production served the expected new JS/CSS files. PL mobile and EN desktop homepages kept their first screen visible with scripts aborted; normal PL first-visit hydration preserved the shell, heading, input and pre-script draft. Automatic completion, EN Escape, repeat-visit bypass, PL mobile navigation/contact-dialog handoff, PL/EN company-service pages, locale/canonical metadata and the 185.59 px cookie banner passed without application or CSP exceptions. No real inquiry or analytics-consent request was sent. The release record is a documentation-only follow-up; the deployed application artifact remains at `7c8bb22`.

The user's subsequent missing-animation report added a paint-frame probe to the plain production homepage. It reproduced CSS starting later than the mount-based phase timer, with no fully unclipped word in the running phase. The earlier layout/lifecycle checks had missed that visibility boundary. The correction uses the word's `animationend`, a 200 ms full-word hold and a bounded 1,200 ms entry fallback; it records `editor-v2` after holding or explicit skip so an old `"1"` mark cannot suppress the corrected version. Build, lint, types and all 185 tests passed. Eight standard and two enlarged-text PL/EN cases recorded 11–13 fully visible holding frames before fading; fallback, legacy/repeat playback, skip, reduced motion and static first screens also passed. The [item 8 report](./intro-motion-fix-2026-10-12.md#post-release-correction-wait-for-the-painted-word) documents this corrective candidate; its publication is pending.

## Delivery workflow

Pushes to `main` trigger `Deploy SEOHOST`. CI uses Node 22, `npm ci` and `npm run build`; it does not separately run lint, tests or text checks. The reusable deploy builds the selected Git ref, uploads `dist/` using `rsync` over SSH and creates an immutable UTC `prod-*` tag after upload. Rollback rebuilds and redeploys a known Git ref through the same workflow.

See [Production Deployments](./production-deployments.md) for transport, verification and rollback details. Documentation lives in GitHub; Markdown files are not included in the site's uploaded `dist/` artifact. Existing Actions still builds and publishes the site on documentation-only pushes.
