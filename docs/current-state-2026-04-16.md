# Current State - 2026-04-16

## Product

`NODE48` is a bilingual (`pl` / `en`) marketing website for a web and digital product studio.

## Public Structure

- homepage with section-based navigation
- dedicated service pages under `/uslugi/*`
- privacy policy
- cookie policy

## Indexed Routes

Current indexed and prerendered routes:

- `/`
- `/en`
- `/uslugi/strona-wizytowka`
- `/en/uslugi/strona-wizytowka`
- `/uslugi/landing-page`
- `/en/uslugi/landing-page`
- `/uslugi/strona-firmowa`
- `/en/uslugi/strona-firmowa`
- `/uslugi/strona-premium-dla-wymagajacych-firm`
- `/en/uslugi/strona-premium-dla-wymagajacych-firm`
- `/uslugi/redesign-strony`
- `/en/uslugi/redesign-strony`
- `/uslugi/opieka-techniczna`
- `/en/uslugi/opieka-techniczna`
- `/privacy-policy`
- `/en/privacy-policy`
- `/cookie-policy`
- `/en/cookie-policy`

## Key System Layers

### Layout and UI

- global shell and tokens in `src/index.css`
- split visual layers in `src/styles/home.css`, `src/styles/shell.css`, `src/styles/service-page.css`, and `src/styles/responsive.css`
- shared section primitives in `src/components/primitives`
- isolated portfolio carousel module in `src/components/portfolio`
- shared contact overlay in `src/components/contact`
- `Projects` now mounts eagerly instead of late-mounting at the viewport edge
- scroll-to-top visibility now uses an observer sentinel instead of a dedicated raw scroll listener

### SEO and Rendering

- shared SEO contract in `src/lib/seo.ts` and `src/lib/seo-routes.ts`
- route-aware locale helpers in `src/lib/locale-routes.ts`
- build-time prerender in `scripts/prerender.ts`
- generated sitemap in `scripts/generate-sitemap.ts`
- real `404.html` delivery contract for unknown routes
- route resolution, redirects, CSP, HSTS, and cache rules in `public/.htaccess`

### Contact and Analytics

- homepage form section plus route-level modal contact overlay
- direct browser-to-`FormSubmit` delivery
- client-side anti-spam heuristics before the provider request
- Google Tag Manager bootstrap in `src/lib/analytics.ts`

### Performance and Delivery

- portfolio preview loading now prioritizes the first visible cards instead of treating the whole carousel equally
- hero and portfolio images no longer rely on runtime bitmap `filter` processing
- the decorative hero motif no longer pulls `node48-logo.png` into the first-screen render path
- navbar scroll state now stays on a single listener lifecycle instead of rebinding around `menuOpen`
- portfolio decorative glows were reduced from blur-heavy layers to cheaper gradient-only surfaces

### Deployment

- production deploy and rollback through GitHub Actions
- SSH + `rsync` transport to SEOHOST
- immutable `prod-*` tags created after successful production deploys

## Current Technical Notes

- the project remains statically deployed end-to-end, including the contact flow
- browser code still posts directly to `FormSubmit`
- CSP allows the specific external form endpoint required by that flow
- privacy and cookie texts now match the live external form-processor contract
- recent performance work focused on eliminating scroll-time work transfer, not on removing animation
- the current direction is to keep motion but move heavy work away from viewport-edge mounting, runtime image filters, and redundant scroll listeners

## Verification Snapshot

Latest local checks completed on `2026-04-16`:

- `npm run check:text`
- `npm run lint`
- `npm run test`
- `npm run build`

All four passed locally.

## Known Constraints

- contact delivery depends on a third-party form processor
- portfolio previews are static assets that should be refreshed when live case sites drift
- some shell-level blur surfaces are still intentionally present where they support readability or modal separation
