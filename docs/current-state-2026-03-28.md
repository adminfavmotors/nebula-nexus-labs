# Current State — 2026-03-28

## Product

`NODE48` is a bilingual (`pl` / `en`) marketing site for a website and digital product studio.

## Public Structure

- homepage with section-based navigation
- dedicated service pages under `/uslugi/*`
- privacy policy
- cookie policy

## Homepage Sections

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

## Service Pages

Current canonical service URLs:

- `/uslugi/strona-wizytowka`
- `/uslugi/landing-page`
- `/uslugi/strona-firmowa`
- `/uslugi/strona-premium-dla-wymagajacych-firm`
- `/uslugi/redesign-strony`
- `/uslugi/opieka-techniczna`

Each service page currently includes:

- unique metadata
- structured data
- hero + summary card
- audience block
- deliverables block
- process block
- pricing block
- closing CTA
- shared contact section

## Portfolio Cases

Live portfolio cases currently displayed in the projects carousel:

- `Nexar Garage`
- `MotoFix Serwis`
- `Wodny Standart`
- `SmileArt Dental`
- `Teal & Tale Aesthetics`
- `DentaKraków Smile Studio`

## Key System Layers

### Layout and UI

- global responsive shell in `src/index.css`
- shared section primitives in `src/components/primitives`
- reusable `SurfaceCard` spotlight layer

### Content

- localized marketing copy in `src/lib/i18n-data.ts`
- service catalog in `src/lib/service-pages.ts`
- service page details in `src/lib/service-page-details/*`
- portfolio data in `src/lib/project-cases.ts`

### SEO

- document meta management in `src/lib/seo.ts`
- service structured data in `src/lib/service-page-seo.ts`
- sitemap in `public/sitemap.xml`
- redirects and cache rules in `public/.htaccess`

### Contact

- shared form section on the homepage
- reusable internal-page contact overlay
- third-party form delivery through `FormSubmit`

## Known Constraints

- no SSR / prerender layer yet
- no private backend for forms yet
- no dedicated CMS yet

## Recommended Next Focus

- visual QA pass on the new projects carousel across more breakpoints
- content QA on all service pages after recent renames and price updates
- optional server-side rendering or prerendering if SEO needs to be pushed further
