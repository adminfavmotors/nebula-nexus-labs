# NODE48

Bilingual marketing website for `NODE48`, built with `React`, `Vite`, `TypeScript`, and `Tailwind CSS`.

## Product Scope

The site currently covers:

- homepage with section-based navigation
- dedicated SEO-oriented service pages under `/uslugi/*`
- isolated portfolio carousel with live case links
- reusable contact overlay for internal-page CTAs
- privacy policy and cookie policy pages

Default locale is Polish (`pl`) with an English switcher (`en`) in the navbar.

## Current State

Implemented and active:

- responsive desktop, mobile, and ultrawide layout system
- rebuilt homepage visual layer with stronger hero, trust strip, simplified CTA card section, and section backgrounds
- cleaned motion system based on shared `Reveal` primitives instead of DOM-wide reveal hooks
- route-level lazy loading for service and legal pages
- deferred portfolio showcase mount so carousel code loads near viewport
- dedicated SEO-oriented service pages with canonical URLs, redirects, and JSON-LD
- reusable internal-page contact overlay and smart mobile navigation
- global scroll-to-top button
- isolated portfolio carousel backed by structured project data and real preview images
- surface-card system for editorial, showcase, deep, and summary content blocks
- production rollback flow via GitHub Actions with immutable `prod-*` tags

## Documentation

Recent internal documentation:

- [CTA Section Retrospective - 2026-04-04](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\cta-section-retrospective-2026-04-04.md)
- [Chat Report - 2026-04-02](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\chat-report-2026-04-02.md)
- [Production Deployments](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\production-deployments.md)
- [Chat Report - 2026-03-29](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\chat-report-2026-03-29.md)
- [Current State - 2026-03-29](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\current-state-2026-03-29.md)
- [Chat Report - 2026-03-28](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\chat-report-2026-03-28.md)
- [Current State - 2026-03-28](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\current-state-2026-03-28.md)

## Stack

- `React 18`
- `Vite 5`
- `TypeScript`
- `Tailwind CSS`
- `Vitest` + `Testing Library`
- `ESLint 9`

## Getting Started

### Requirements

- `Node.js 18+`
- `npm`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs on the Vite development server configured in [C:\Users\Admin\Desktop\project\nebula-nexus-labs\vite.config.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\vite.config.ts).

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
npm run check:text
npm run lint
npm run test
```

## Project Structure

```text
src/
  components/              Homepage sections and shared UI blocks
  components/contact/      Contact overlay and related form logic
  components/legal/        Legal-page components
  components/portfolio/    Dedicated portfolio carousel module
  components/primitives/   Shared low-level UI, reveal, and viewport primitives
  lib/                     i18n, SEO, service data, project data, site config
  lib/service-page-details Service-page content definitions
  pages/                   Route-level pages
  styles/                  Split visual layers for home, shell, service pages, and responsive rules
  test/                    Vitest setup and app-level tests
public/
  .htaccess                Cache rules and redirects
  project-previews/        Static preview images for portfolio cases
  sitemap.xml              Public sitemap
docs/
  *.md                     Internal project reports
```

## Key Config Files

- shared business/config values: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts)
- service catalog and slugs: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-pages.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-pages.ts)
- service page details: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-page-details](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-page-details)
- project portfolio data: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\project-cases.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\project-cases.ts)
- portfolio carousel module: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\components\portfolio](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\components\portfolio)
- SEO/meta handling: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\seo.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\seo.ts)

## Localization

- translations are stored in [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\i18n-data.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\i18n-data.ts)
- Polish is the default locale
- selected locale is persisted in `localStorage`
- `html[lang]`, `document.title`, and page metadata update with locale changes

## SEO Notes

- service pages use route-level metadata updates
- canonical URLs are managed in the client SEO layer
- structured data is generated for service pages
- sitemap and legacy service redirects are maintained in `public/`

## Deploy and Rollback

- production deploys run from GitHub Actions
- rollback is handled by redeploying a known good `branch`, `tag`, or `SHA`
- successful production deploys create immutable `prod-*` tags
- the current deployment/rollback workflow is documented in [C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\production-deployments.md](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\production-deployments.md)

## Contact Form

- the homepage includes a shared contact section
- internal pages use a reusable modal contact overlay
- form submission currently uses `FormSubmit`
- recipient configuration lives in [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts)

## Quality Checks

Current main checks:

- `npm run check:text`
- `npm run lint`
- `npm run build`
- `npm run test`
- manual mobile/desktop UI verification after visual passes

## Known Constraints

- service pages still run in an SPA without SSR or prerendering
- form delivery still depends on a third-party endpoint
- portfolio previews are static assets and should be refreshed when the live case sites change significantly
- the visual system is now cleaner, but hero polish, typography tuning, and further performance work still have headroom
- content is now much more mature than the initial template, but the project can still benefit from a CMS or analytics layer later
