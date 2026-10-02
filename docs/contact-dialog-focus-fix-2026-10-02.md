# Audit item 5: contact-dialog keyboard focus

Date: 2026-10-02. Published implementation base: `037ba8f804b90d41101496e66f93bc7ff60ad464`. Local branch: `codex/contact-legitimate-inquiries`.

## Cause and correction

The contact window used a normal div with ARIA dialog attributes. Those attributes did not make the background inert or restore focus. A separate document Escape listener and a 220 ms form-autofocus timer supplied only part of the required interaction. The decorative backdrop was itself a focusable button outside the dialog panel.

The window now uses native `dialog.showModal()` / `dialog.close()`, following the existing mobile-navigation pattern. Native modality blocks background interaction and remembers the previously focused control. The name field receives focus immediately after opening, without scrolling the panel or waiting for a timer. The form stays mounted so closing does not discard an unsent draft.

An explicit Tab boundary handler wraps the last control to the first and the first to the last. Controls are evaluated at each keypress, excluding disabled, non-tabbed and non-rendered elements. This also prevents Chromium's native boundary transition into browser chrome while retaining native background isolation. Interior navigation remains browser-managed.

Native cancel/close events synchronize React state and scroll locking. A queued close event is ignored if the dialog has already reopened. Escape, the close button, backdrop click and confirmed submission all close through the same state. Backdrop dismissal requires the pointer to start and finish outside the panel, so dragging from a field does not dismiss it. The obsolete backdrop button/class, root-open class, document Escape listener and delayed form-autofocus effect/ref/prop are removed.

The existing panel, contact presentation, responsive rules and scroll-lock hook remain in use. Native backdrop styling replaces the decorative button. No dependency, alternate modal system, breakpoint or shared-component variant was added. The native focus/modality contract is specified by the [HTML dialog standard](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element).

## Verification

- Build passed, including application/configuration TypeScript checks and full static prerender. Lint/style architecture, text integrity and whitespace checks passed; obsolete selectors/imports/effects were checked.
- All **167 tests** passed across five files. Six additional cases cover native open/initial focus/cancellation/drafts, pointer dismissal, Tab boundaries, external/queued close events, legal-route closure and provider-confirmed success. JSDOM tests cover state and boundary handling; real browser checks establish native focus isolation/restoration.
- Production-build Chromium checks covered PL/EN homepage FAQ buttons and company-service CTAs at **375×812, 768×1024, 1366×768 and 1920×1080**: 16 page/viewport combinations. Every case verified name-field entry, native modality, rejection of background focus, a full Tab and Shift+Tab cycle, Escape restoration, released scroll locking and no horizontal overflow. Initial mobile/desktop screenshots were reviewed.
- Four additional PL/EN mobile-menu checks at 375/768 px verified that the menu closes before the contact dialog opens. Escape restores the visible menu trigger, rather than a CTA inside the closed menu.
- During a mocked pending request, Tab stays inside and skips the disabled submit button. Escape/reopening preserves the draft. A failed provider result keeps the window open; a confirmed success closes it, restores the original CTA and shows the success banner. Close-button and outside-pointer dismissal restore the opener as well. No real inquiry or call was sent.
- Legal-link navigation closes the window, unlocks scrolling and leaves focus outside the closed dialog. When a route removes the originating CTA, restoring that removed element is not possible; general route-focus management is outside this correction. Reduced-motion Tab boundary behavior was checked. Browser page errors were empty.
- With application JavaScript requests blocked, PL/EN home/service pages retain native contact links and a disabled static submit button; no modal portal is created. Service headings are visible. The homepage's existing hidden animated title words remain item 12; this correction does not resolve that separate first-screen finding.

Browser measurements, response simulations and screenshots are retained in the ignored `.codex/item5-verification/` directory. Directory-style trailing-slash URLs were used for Vite preview so each route serves its corresponding prerendered HTML. Generated sitemap changes were restored.

## Delivery state

Implementation and local verification are complete. On October 2, the user accepted this correction and explicitly authorized its commit and publication through the existing push-to-main workflow. The successful Actions conclusion, immutable production tag and production browser checks establish release completion. The separate desktop checkout and its unpublished changes were preserved.

See [current audit progress](./current-state-2026-10-02.md). Item 6 was already resolved with item 1; item 7 is the next unresolved numbered finding.
