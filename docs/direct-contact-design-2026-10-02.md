# Audit item 4: direct-contact visual refinement

Date: 2026-10-02. Implementation base: `7acc30e54014ce5ca23343b544181b65d96ae79c` (published application baseline `90fb5ee`). Local branch: `codex/contact-legitimate-inquiries`.

## Cause and change

The published contacts were inline underlined text inside the form's legal-copy paragraph. That gave the contact alternatives the same hierarchy as a legal note, while keyboard focus drew a conspicuous rectangular outline. The footer duplicated their markup.

`ContactLinks` now owns the existing native email/phone links and their localized labels. It serves three surfaces: the page form, contact dialog and footer. Values and destinations still come from `contact-config.ts`. The form introduction is separate from the legal notice. Each channel has a small label, a readable semibold value and an existing Lucide icon hidden from assistive technology. Accessible names include the localized label and full value.

One intrinsic grid places the channels alongside each other when there is room and stacks them on narrow containers. It adds no layout breakpoint, dependency, animation, decorative card or duplicated contact data. Light sections supply their existing muted text color through a shared CSS token; the dialog/footer use the existing dark palette. Hover underlines the value. Keyboard focus uses a stronger 2 px underline and a foreground-colored icon, replacing the rectangular outline while keeping focus visible. Native links work without React handlers.

The form's validation, payload, timeout, cooldown, request state and hydration activation are unchanged. Dialog focus containment/restoration remains audit item 5.

## Verification

- Build, application/configuration type checks and full prerender passed. Lint/style architecture, text integrity and whitespace checks passed.
- All 161 existing tests passed across five files after the component changes, including contact availability during sending/failure/success/cooldown and preservation of prerendered contact DOM during hydration. A lost space in the initial accessible-name markup was corrected without weakening these assertions.
- Production-build PL/EN company service pages were checked at 375×812, 768×1024, 1366×768 and 1920×1080. Section, footer, keyboard-focus and dialog screenshots were captured. Contact targets measure 57 px high; values fit and there is no horizontal page overflow or page error. Tab moves from email to phone and exposes the focus indicator.
- With external JavaScript blocked, both homepages and PL/EN company service pages retain visible native contacts in the section/footer. The static submit button stays disabled and no interactive dialog is created. First-screen screenshots are retained as well; the existing homepage intro/hero issue remains item 12.
- Dead-code/React review: old duplicated link markup and the form's unused contact-value imports are removed; all new semantic classes are used. No new effects, timers, state, browser-only rendering or unnecessary memoization were introduced.

Browser measurements and screenshots are retained in the ignored `.codex/item4-verification/` directory. Browser verification used trailing-slash directory URLs so Vite preview serves the correct prerendered route rather than its homepage fallback. No real messages or calls were sent. Generated sitemap dates were restored.

## Delivery state

Implementation and local verification are complete. On October 2, the user accepted the mobile section/dialog/footer screenshots and explicitly authorized the commit and publication. This change is released through the existing push-to-main workflow; its GitHub Actions conclusion and immutable production tag are the publication record. Publication is confirmed only after that run succeeds and the production contacts are checked. The separate desktop checkout and its unpublished intro variant were preserved.

See [current state](./current-state-2026-10-02.md) and the [original item 4 implementation](./direct-contact-fix-2026-10-01.md) for release history and remaining audit scope.
