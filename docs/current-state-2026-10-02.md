# NODE48: current state and audit progress

Updated: 2026-10-02 (Europe/Warsaw). This is the current documentation entry point; April snapshots retain their historical scope.

## Source and scope

- Repository: [adminfavmotors/nebula-nexus-labs](https://github.com/adminfavmotors/nebula-nexus-labs).
- Public brand and site: [NODE48 — node48.pl](https://node48.pl/).
- Application baseline for this documentation update: `90fb5ee4da2ac78ea8e8f5a0c2c5cc8b294bb2a1`, synchronized with `origin/main` before documentation edits.
- Active checkout: `C:\Users\Admin\.codex\worktrees\6acd\nebula-nexus-labs`, branch `codex/contact-legitimate-inquiries`. Publication targets remote `main` through the existing workflow.
- The separate desktop checkout contains an unpublished intro variant. It is not evidence of the production version and was not changed by this update.

This snapshot reconciles existing audit findings, implementation reports, source/workflow configuration and four successful deployment records. It is not a fresh exhaustive site audit on October 2. Measurements below that originate in the original audit are historical findings, not newly repeated measurements. This update changes documentation only. Its own release identity belongs to Git history and the deployment run created by the push; the baseline above identifies the application work being documented.

## Published work

All four runs below were independently confirmed `completed / success` during this documentation update. Tag timestamps are UTC. GitHub Actions and production tags are the release record; a successful upload does not prove mailbox receipt or design acceptance.

| Audit item | Published result | Commit | Successful deployment | Production tag |
|---|---|---|---|---|
| 1, including React/TypeScript follow-up | Legitimate inquiries accepted; request/result handling, hydration and type checks corrected | [a3ac0a2](https://github.com/adminfavmotors/nebula-nexus-labs/commit/a3ac0a2af7f7e5cf6bcd47f8caf0f49b0b0bd739) | [36844441191](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36844441191) | `prod-20261001-094252-a3ac0a2` |
| 2 | Malformed URL fragments no longer unmount React | [7a00b26](https://github.com/adminfavmotors/nebula-nexus-labs/commit/7a00b2625ea9b5fa1907cecc8553636c028cccc7) | [36863594901](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36863594901) | `prod-20261001-124311-7a00b26` |
| 3 | All six service pages have complete explicit English content | [d809332](https://github.com/adminfavmotors/nebula-nexus-labs/commit/d80933202312c4b4d8249f97c96ec80314972855) | [36872540645](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36872540645) | `prod-20261001-135744-d809332` |
| 4 | Persistent email/phone in section, dialog and footer; visual follow-up open | [90fb5ee](https://github.com/adminfavmotors/nebula-nexus-labs/commit/90fb5ee4da2ac78ea8e8f5a0c2c5cc8b294bb2a1) | [36883274320](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36883274320) | `prod-20261001-151923-90fb5ee` |

Detailed evidence and historical verification counts:

- [Item 1: contact form, React and TypeScript](./contact-form-fix-2026-10-01.md).
- [Item 2: hash navigation](./hash-navigation-fix-2026-10-01.md).
- [Item 3: service translations](./service-translations-fix-2026-10-01.md).
- [Item 4: direct contacts and user review](./direct-contact-fix-2026-10-01.md).

## Current implementation

React 18, Vite 8, TypeScript, React Router 6 and Tailwind-backed split CSS produce a static site. There is no persistent application server or private form backend. Polish is the default locale; English has its own routes under `/en`.

The build checks application/configuration types, generates the sitemap, builds the client and prerenders HTML. There are 14 indexed routes: two homepages and six services per locale. Four legal routes are also prerendered, marked `noindex,follow` and excluded from the sitemap. The build additionally emits `404.html`; Apache rules resolve canonical paths to their prerendered files. Static rendering waits for lazy components and fails on errors or a 30-second stall. Initial hydration matches the static tree and preserves existing DOM/form values. Some homepage intro animations can still hide first-screen content when JavaScript is unavailable (item 12).

Canonical service keys/slugs live in `src/lib/service-catalog.ts`; short localized catalog entries live in `src/lib/service-pages.ts`. Detailed PL/EN content lives in the existing `src/lib/service-page-details` modules, with completeness enforced by TypeScript. Full English translation does not validate the offer's commercial or SEO claims, and it does not consolidate all duplicate catalog data.

The shared form sends an allowlisted payload directly to FormSubmit. It validates required fields and lengths without rejecting capitalization, reference links, punctuation or autofill. It prevents simultaneous requests, aborts after 20 seconds, requires HTTP success plus an explicit successful provider result, preserves drafts on failure and applies a 45-second cooldown only after confirmed success. Timed-out requests are not automatically retried. Static markup declares POST and keeps submission disabled until hydration. Native email/phone links use `src/lib/contact-config.ts` and remain visible before and after hydration, during requests and after errors.

No inquiry content is logged or stored in application browser storage. Client-side validation, the honeypot and cooldown cannot enforce server-side abuse limits. Provider activation, actual filtering/CAPTCHA behavior, email rendering and inbox delivery were not independently verified. Browser checks used intercepted responses and sent no real inquiries or calls. GTM loads only after an explicit granted consent; denied, missing, invalid or unreadable choices do not authorize analytics.

## Verification and its limits

Latest application checks completed on October 1 after item 4:

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

Earlier fixes also verified malformed fragments/back-forward navigation, complete service-page content in 24 viewport checks, provider failure/success/timeout contracts, cookie consent, full-page hydration and preservation of drafts/SSR nodes. Their reports describe the exact coverage. Passing these checks does not establish complete accessibility, visual quality or real provider delivery. No new application test run is claimed for the documentation-only October 2 update.

## Audit checklist: original order of importance

Numbering is retained from the original 33-item audit. Related items 6, 11, 22 and 24 were resolved alongside item 1. “Open” means not resolved by the documented work; it does not claim a fresh reproduction today.

| No. | Problem | Current status |
|---|---|---|
| 1 | Form rejects legitimate uppercase inquiries, multiple links and autofill | Fixed and published in `a3ac0a2` |
| 2 | Malformed URL fragment throws and unmounts the application | Fixed and published in `7a00b26` |
| 3 | English service pages omit scope, descriptions, timelines and correct process steps | Fixed and published in `d809332` |
| 4 | Direct email/phone unavailable in the normal contact flow | Functionally fixed and published in `90fb5ee`; visual refinement remains open after user rejection |
| 5 | Contact dialog does not trap keyboard focus or restore it to the opener | Open; next numbered task |
| 6 | Four TypeScript errors and no required type check before deployment build | Fixed with item 1; builds now run `check:types` |
| 7 | Cookie banner covers roughly 44% of the mobile first screen in the original audit | Open |
| 8 | Unpublished local intro adds blocking delays and timer complexity | Open; compare the separate local variant before adopting it; not a production change |
| 9 | Premium service mobile layout has an excessively long heading and unused space | Open |
| 10 | Starting prices and net-price qualifications are inconsistent across the catalog | Open; full bilingual detail content alone does not resolve catalog consistency |
| 11 | A stalled contact request can leave submission pending indefinitely | Fixed with item 1; 20-second abort and recoverable UI |
| 12 | First-visit intro hides prerendered first-screen content and depends on JavaScript | Open |
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

## Pending work and user acceptance

The next numbered correction is **item 5**, covering contact-dialog focus entry, containment, Escape/close behavior and return to the opener across page layouts and routes. It has not been implemented in this documentation task.

The user explicitly rejected the visual result of item 4 after publication. The screenshot shows ordinary underlined contact text above the fields and a rectangular outline around focused email. Contact typography, hierarchy, spacing and integration with the form need refinement. A redesign must preserve readable links, usable targets and a visible keyboard focus indicator; removing focus visibility is not an acceptable response to that feedback. Functional completion of item 4 must not be reported as visual approval.

Other open findings retain their original scope and ordering. No code, styles, form behavior or intro variant is changed by this documentation update.

## Delivery workflow

Pushes to `main` trigger `Deploy SEOHOST`. CI uses Node 22, `npm ci` and `npm run build`; it does not separately run lint, tests or text checks. The reusable deploy builds the selected Git ref, uploads `dist/` using `rsync` over SSH and creates an immutable UTC `prod-*` tag after upload. Rollback rebuilds and redeploys a known Git ref through the same workflow.

See [Production Deployments](./production-deployments.md) for transport, verification and rollback details. Documentation lives in GitHub; Markdown files are not included in the site's uploaded `dist/` artifact. Existing Actions still builds and publishes the site on documentation-only pushes.
