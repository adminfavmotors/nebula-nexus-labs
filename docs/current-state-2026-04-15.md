# Current State - 2026-04-15

## Product

`NODE48` is a bilingual (`pl` / `en`) marketing website for a web and digital product studio.

## Public Structure

- homepage with section-based navigation
- dedicated service pages under `/uslugi/*`
- privacy policy
- cookie policy

## Homepage Sections

- brand intro overlay on first visit
- hero
- trust strip
- about
- services
- process
- projects carousel
- why us
- FAQ
- CTA
- contact

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

## Service Pages

Each canonical service page currently includes:

- unique title and meta description
- canonical URL
- shared SEO contract through `src/lib/seo-routes.ts`
- hero plus summary card
- audience block
- deliverables block
- process block
- pricing block
- closing CTA
- shared contact flow

## Portfolio Cases

Live portfolio cases currently displayed in the projects carousel:

- `Nexar Garage`
- `MotoFix Serwis`
- `Wodny Start`
- `Smile Art Digital`
- `Teal & Tale Aesthetics`
- `DentaCare Smile Studio`

## Key System Layers

### Layout and UI

- global shell and tokens in `src/index.css`
- split visual layers in:
  - `src/styles/home.css`
  - `src/styles/shell.css`
  - `src/styles/service-page.css`
  - `src/styles/responsive.css`
- shared section primitives in `src/components/primitives`
- isolated portfolio carousel module in `src/components/portfolio`
- shared contact overlay in `src/components/contact`

### Content

- localized marketing copy in `src/lib/i18n-data.ts`
- service catalog and canonical slugs in `src/lib/service-pages.ts`
- service page details in `src/lib/service-page-details/*`
- portfolio data in `src/lib/project-cases.ts`

### SEO and Rendering

- shared SEO contract in `src/lib/seo.ts` and `src/lib/seo-routes.ts`
- homepage `Organization` and `WebSite` schema
- route-aware locale helpers in `src/lib/locale-routes.ts`
- build-time prerender in `scripts/prerender.ts`
- generated sitemap in `scripts/generate-sitemap.ts`
- Polish and English indexed routes emitted from one manifest
- canonical + `hreflang` alternate tags generated from the same SEO snapshot layer
- unknown routes now resolve through a real `404.html` contract instead of client-only soft 404 rendering
- route resolution, redirects, CSP, HSTS, and cache rules in `public/.htaccess`
- web manifest in `public/site.webmanifest`

### Contact and Analytics

- homepage form section plus route-level modal contact overlay
- form delivery through `FormSubmit`
- Google Tag Manager bootstrap in `src/lib/analytics.ts`

### Deployment

- production deploy and rollback through GitHub Actions
- SSH + `rsync` transport to SEOHOST
- immutable `prod-*` tags created after successful production deploys

## Current UI Notes

- the header brand logo was recently rebuilt and simplified across several iterations
- grouped card/list reveal motion is now handled through a small container-level `useReveal` hook instead of a global DOM-wide reveal pass
- secondary contrast and theme tokens were corrected after the visual layer transfer from the test branch
- indexed routes now have stable `og:image` and manifest metadata in the production build
- stale `og:image` and `twitter:image` tags are now removed correctly during client-side route changes
- English pages are now real crawlable routes, not just a `localStorage`-driven alternate view on Polish URLs

## Verification Snapshot

Latest local checks completed on `2026-04-15`:

- `npm run lint`
- `npm run test`
- `npm run build`

All three passed locally.

## Known Constraints

- the site is statically deployed with build-time prerender, not full SSR
- contact delivery still depends on a third-party form endpoint
- portfolio previews are static assets that should be refreshed when live case sites drift
- the recent header/logo/reveal changes still deserve cross-browser visual QA, especially on Windows and Chromium
- multilingual SEO now depends on keeping Polish and English route maps in sync; route additions should go through the shared locale/SEO helpers rather than ad hoc links

## Recommended Next Focus

- keep documentation synchronized after each implementation cycle
- do a visual QA pass on the latest header brand treatment and grouped reveal motion
- continue reducing accidental architectural drift between shared `Reveal` usage and newer section-level reveal helpers
- keep monitoring indexed prerendered routes after deployment in Search Console
- verify production responses for `/en` and `/en/uslugi/*` with external crawlers or Search Console inspection after the next deploy
