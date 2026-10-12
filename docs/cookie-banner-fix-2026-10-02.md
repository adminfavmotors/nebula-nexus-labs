# Item 7: compact cookie consent banner

Implemented and verified: 2026-10-02 (Europe/Warsaw), against published baseline `7f8e34f86568ebc0b294472728e150f023880a3a`. After mobile screenshot review, the user accepted the correction and explicitly authorized commit/publication on 2026-10-12. The deployment's Actions run and immutable production tag are the release record.

## Problem and result

At 375×812 the existing Polish banner measured 363.84 px, covering 44.8% of the first screen. Long technical copy, vertically stacked accept/decline buttons and a separate policy-link row caused the height.

The banner now gives a short explanation of optional analytics cookies in PL and EN. The policy link sits beside the title, and the two explicit choice buttons share a row at normal text size. The existing CSS component owns the layout, with no new breakpoint, dependency, timer or consent state. A labelled region gives the banner an accessible name.

Natural flex wrapping accommodates enlarged text. The panel's height is bounded by the viewport and existing safe-area spacing; excess content can scroll, including when keyboard focus moves to a button. The redundant `neon-frame-soft` class was removed from this panel: its decorative pseudo-element extended below the card and would otherwise create an unnecessary scrollbar. The panel retains its own border, background, radius and shadow. Superseded desktop action/link overrides and the unused link-opacity transition were removed.

| Viewport | Before (PL) | After (PL/EN) | After share of viewport |
|---|---|---|---|
| 375×812 | 363.84 px | 185.59 px | 22.9% |
| 320×568 | Not remeasured | 208.39 px | 36.7% |
| 568×320 landscape | Not remeasured | 185.59 px | 58.0% |
| 768×1024 | Not remeasured | 185.59 px | 18.1% |
| 1366×768 | Not remeasured | 185.59 px | 24.2% |
| 1920×1080 | Not remeasured | 185.59 px | 17.2% |

These are actual banner-card heights, excluding the bottom safe-area gap and shadow. They do not promise a fixed percentage on every screen. At standard text size the choice buttons measure 46 px high and the policy link 44 px high. Normal-size cards require no internal scrolling.

## Consent and verification

The existing consent and analytics effects are unchanged. Missing, denied, invalid or unreadable stored values do not authorize GTM. An explicit acceptance authorizes analytics; both choices remove the banner, clear the floating-control offset and persist when storage is available. Opening the localized policy page does not imply acceptance.

- `npm run build`: passed application/configuration type checks, client build and all 18 route prerenders. Build-generated sitemap changes were restored to their pre-task bytes.
- `npm run lint`: passed, including the style architecture check.
- `npm run test`: all 167 tests passed across five files, including consent, unavailable/invalid storage, intro gating, offset updates and hydration. The existing analytics test now identifies the labelled consent region instead of matching implementation-specific prose.
- `npm run check:text` and `git diff --check`: passed.
- PL/EN home and company-service pages checked at 375×812, 768×1024, 1366×768 and 1920×1080: 16 cases, no horizontal page overflow or browser exceptions. Standard banner offset is 202 px.
- PL/EN checked at 320×568 and 568×320, plus 200% root text size at 375×812 and 320×568: eight cases. Text wraps; focus reaches the decline button, scrolling the bounded panel when necessary. Offsets update to the measured height. This simulates enlarged text, not a full OS/browser zoom audit.
- PL/EN keyboard navigation checked through the policy link and choice buttons. The policy link receives a visible 2 px underline on keyboard focus.
- PL/EN policy navigation, decline, acceptance and both reloads checked. GTM is absent before choice and after decline; its script appears only after acceptance. GTM requests were intercepted and aborted, so no live analytics code ran during verification.
- Prerendered PL/EN home/service pages checked with external script requests blocked: banner and analytics absent, with no horizontal overflow or page errors. This is a script-load failure simulation; inline bootstrap code still runs. Existing intro-dependent first-screen visibility remains outside this fix (item 12).

Browser evidence and mobile before/after screenshots are saved locally in the ignored `.codex/item7-verification/` directory. The accepted item 5 production release is recorded separately in the current-state checklist. The desktop checkout's unpublished intro variant was not changed.
