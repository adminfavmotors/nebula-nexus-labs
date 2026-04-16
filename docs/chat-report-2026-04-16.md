# Chat Report - 2026-04-16

## Scope

This report covers the contact-flow simplification completed on `2026-04-16`.

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
