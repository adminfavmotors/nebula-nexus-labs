# NODE48

Bilingual marketing website for `NODE48`, built with `React`, `Vite`, `TypeScript`, and `Tailwind CSS`.

## Product Scope

The site currently covers:

- homepage with section-based navigation
- dedicated SEO-oriented service pages under `/uslugi/*`
- animated portfolio carousel with live case links
- reusable contact overlay for internal-page CTAs
- privacy policy and cookie policy pages

Default locale is Polish (`pl`) with an English switcher (`en`) in the navbar.

## Current State

Implemented and active:

- responsive desktop and ultrawide layout system
- upgraded homepage hero and trust strip
- reusable spotlight card layer for selected surfaces
- renamed service offer system with canonical URLs and redirects
- service-page SEO layer with canonical tags and JSON-LD
- global scroll-to-top button
- live portfolio carousel backed by structured project data

## Documentation

Recent internal documentation:

- [Chat Report — 2026-03-28](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\chat-report-2026-03-28.md)
- [Current State — 2026-03-28](C:\Users\Admin\Desktop\project\nebula-nexus-labs\docs\current-state-2026-03-28.md)

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
npm run lint
npm run test
```

## Project Structure

```text
src/
  components/              Homepage sections and shared UI blocks
  components/contact/      Contact overlay and related form logic
  components/legal/        Legal-page components
  components/primitives/   Shared low-level UI primitives
  hooks/                   Reveal and viewport helpers
  lib/                     i18n, SEO, service data, project data, site config
  lib/service-page-details Service-page content definitions
  pages/                   Route-level pages
  test/                    Vitest setup and app-level tests
public/
  .htaccess                Cache rules and redirects
  sitemap.xml              Public sitemap
docs/
  *.md                     Internal project reports
```

## Key Config Files

- shared business/config values: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts)
- service catalog and slugs: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-pages.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-pages.ts)
- service page details: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-page-details](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\service-page-details)
- project portfolio data: [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\project-cases.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\project-cases.ts)
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

## Contact Form

- the homepage includes a shared contact section
- internal pages use a reusable modal contact overlay
- form submission currently uses `FormSubmit`
- recipient configuration lives in [C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts](C:\Users\Admin\Desktop\project\nebula-nexus-labs\src\lib\site-config.ts)

## Quality Checks

Current main checks:

- `npm run lint`
- `npm run build`
- `npm run test`

## Known Constraints

- service pages still run in an SPA without SSR or prerendering
- form delivery still depends on a third-party endpoint
- content is now much more mature than the initial template, but the project can still benefit from a CMS or analytics layer later
