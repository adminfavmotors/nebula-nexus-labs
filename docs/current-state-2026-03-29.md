# Current State - 2026-03-29

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
- `Teal and Tale Aesthetics`
- `DentaCare Smile Studio`

## Key System Layers

### Layout and UI

- global responsive shell in `src/index.css`
- shared section primitives in `src/components/primitives`
- isolated portfolio carousel module in `src/components/portfolio`
- shared contact overlay in `src/components/contact`

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

## Current UI Notes

- the portfolio carousel now uses real project preview images instead of fake placeholder mockups
- premium borders were simplified to reduce visible artifacts on rounded corners
- reveal animations are progressive and do not hide the first screen on initial load
- the FAQ section now uses a single-column reading pattern

## Known Constraints

- no SSR or prerender layer yet
- no private backend for forms yet
- no dedicated CMS yet

## Recommended Next Focus

- visual QA pass on the portfolio carousel across more breakpoints and Windows displays
- tighter motion polish for selected homepage cards without reintroducing noisy edge animations
- optional server-side rendering or prerendering if SEO needs to be pushed further
