# Audit item 4: persistent direct contact

Date: 2026-10-01. Base commit: `d809332`.

## Root cause

The form's direct email link was conditional: visible in prerendered HTML before hydration or after a delivery error, but removed once the normal interactive form became ready. The existing business phone was only exposed in legal copy and structured data. The footer offered navigation but no direct contact. A visitor had to attempt a submission before seeing an alternative channel.

## Change

- The shared form now always shows email and phone above its fields, in both the page section and contact dialog, with Polish/English labels. The same contacts are available in the footer, grouped separately from navigation.
- Display values continue to come from `src/lib/contact-config.ts`. Native `mailto:` and international `tel:` destinations are derived there; the phone destination removes display spaces. No inquiry text, URL parameters or other visitor information is embedded in these links.
- Conditional email copies, their translation key and the unused status-link CSS rule were removed. Existing validation, provider payload, timeout, cooldown, form activation after hydration and status announcements are retained.
- Contact links have underlines, a visible keyboard focus outline and a 44 px minimum target height. The existing wrapping layout handles every screen size without new breakpoints, dependencies or decorative elements.
- Footer contact/navigation rows share one grid beside the brand. This avoids compressing the logo at tablet width.

## Verification

- `npm run build` passed, including TypeScript and prerender. `npm run lint`, `npm run check:text`, dead-code search and `git diff --check` passed.
- All 161 tests passed. Existing delivery tests now verify direct contacts during an in-flight request, after success, on provider errors, during cooldown and in the English dialog. Full-page hydration tests verify that home/service contacts already exist in HTML and retain their original DOM nodes after hydration.
- Production-build browser checked PL/EN company service pages at 375×812, 768×1024, 1366×768 and 1920×1080: section, dialog and footer screenshots. No horizontal overflow, clipped contact text, compressed footer logo or page errors. All contact targets measured 44 px (allowing browser floating-point rounding).
- Keyboard Tab reaches the phone link from the email link and shows a 2 px focus outline.
- With all external JavaScript requests blocked, both homepages and PL/EN company pages retained visible email/phone links in their contact sections and footers. The static form remained disabled; native links need no React handler. First-screen and contact screenshots were inspected.
- React review: no new hooks, conditional state-dependent contacts, client-only contact markup, unnecessary memoization or added bundles. The form's request/data boundary is unchanged.

Browser results and screenshot references are saved in the ignored `.codex/direct-contact-verification/results.json`. Build-generated sitemap dates were restored. No messages or calls were sent, and mailbox/phone delivery was not tested.

## Publication and user review

Published on 2026-10-01 in [commit 90fb5ee](https://github.com/adminfavmotors/nebula-nexus-labs/commit/90fb5ee4da2ac78ea8e8f5a0c2c5cc8b294bb2a1). [Deploy SEOHOST run 36883274320](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36883274320) completed successfully; production tag: `prod-20261001-151923-90fb5ee` (UTC).

After publication, the user rejected the visual presentation of the contact links. The supplied screenshot shows plain underlined email/phone text above the fields and a rectangular focus outline around email. Functional availability and passing layout checks do not establish visual acceptance. Contact typography, hierarchy, spacing and integration with the form still need design refinement while preserving a visible keyboard focus indicator. No redesign is included in this documentation update. Item 4 is functionally fixed and published; its visual follow-up remains open.

See [current state](./current-state-2026-10-02.md) for all 33 audit items and the next numbered task.

Follow-up on 2026-10-02: the [revised contact design](./direct-contact-design-2026-10-02.md) was implemented, verified and explicitly accepted by the user after mobile screenshot review. The user authorized its commit and publication. The rejection and open-design state above describe the original October 1 release.

## Remaining audit scope

The homepage's hero/header animations can still hide first-screen content when JavaScript is blocked; the direct contact section/footer are visible and usable by scrolling. That existing broader rendering issue remains item 12. Dialog focus trapping/restoration remains item 5. Form labels/placeholder contrast and legal-copy redaction retain their separate audit scope.
