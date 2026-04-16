# Chat Report - 2026-04-16

## Scope

This report now covers two linked tracks completed on `2026-04-16`:

- the contact-flow simplification back to a fully free external processor
- the first pass of scroll and image-delivery performance cleanup

## Main Changes

### Free third-party contact delivery

- removed the in-progress `PHP + Resend` server-side path before it became a new production dependency
- kept the contact flow on the direct browser-to-`FormSubmit` route
- aligned the implementation with the requirement for a fully free contact-delivery option

### Lightweight anti-spam and frontend contract

- kept the existing client-side heuristics as a UX preflight
- restored the provider-specific `FormSubmit` request contract in the frontend payload
- kept the contact pipeline free of deploy-time secrets and backend runtime requirements

### Deployment and policy sync

- removed the unfinished server-side contact runtime from the deploy workflow
- restored the CSP allowance needed for `formsubmit.co`
- updated privacy/form notice copy so the legal layer matches the external processor contract
- updated README and deployment notes to describe the restored free contact path

### Scroll and image-delivery performance cleanup

- removed late mounting from the `Projects` section so the portfolio showcase no longer comes alive only at the viewport edge
- removed runtime bitmap `filter` work from hero and portfolio images while preserving the surrounding visual overlays
- moved scroll-to-top visibility to an `IntersectionObserver` sentinel instead of a dedicated raw scroll listener
- prioritized the first visible portfolio preview cards for image loading and added explicit preview dimensions
- removed the decorative hero PNG from the first-screen render path and replaced it with a CSS motif
- simplified navbar scroll orchestration so the main listener no longer rebinds around `menuOpen`
- reduced the remaining blur-heavy decorative glows inside the portfolio section to cheaper gradient-only layers

## Verification

Local verification completed on `2026-04-16` with:

- `npm run check:text`
- `npm run lint`
- `npm run test`
- `npm run build`

All four checks passed locally.

## Risks To Watch

- the contact form remains dependent on a third-party processor
- anti-spam is still fundamentally limited by a browser-to-provider architecture
- if volume or abuse grows later, the project should revisit a private backend or paid managed form flow
- some blur-heavy shell surfaces still remain by design, so the next performance passes should distinguish between justified readability layers and purely decorative cost
