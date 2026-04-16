# NODE48

Marketing website for `NODE48`, built with `React`, `Vite`, `TypeScript`, and a split CSS architecture backed by `Tailwind CSS` tooling.

## Product Scope

The public site currently includes:

- homepage with section-based navigation
- dedicated service pages under `/uslugi/*`
- isolated portfolio carousel with live case links
- reusable contact overlay for internal-page CTAs
- privacy policy and cookie policy pages

Default locale is Polish (`pl`) with an English switcher (`en`) in the navbar.

## Current State

Implemented and active:

- responsive shell tuned for mobile, laptop, desktop, and ultrawide layouts
- build-time prerender for indexed routes:
  - homepage
  - English homepage under `/en`
  - canonical service pages
  - English service pages under `/en/uslugi/*`
  - privacy policy
  - English privacy policy under `/en/privacy-policy`
  - cookie policy
  - English cookie policy under `/en/cookie-policy`
- generated sitemap driven by the same indexed-route manifest as prerender
- dedicated SEO route contract with canonical URLs, `hreflang` alternates, structured data, `og:image`, and `Organization` / `WebSite` schema
- real `404.html` delivery contract for unknown routes instead of client-only soft 404 handling
- isolated portfolio carousel backed by structured project data and real preview images
- shared contact section on the homepage plus reusable modal contact overlay on internal pages
- production deploy and rollback flow via GitHub Actions with immutable `prod-*` tags
- intro/bootstrap flow hardened for first visits under the current CSP
- split visual layers in `src/index.css`, `src/styles/home.css`, `src/styles/shell.css`, `src/styles/service-page.css`, and `src/styles/responsive.css`
- shared `Reveal` primitive plus lightweight container-level reveal hooks for grouped card/list stagger where needed
- latest header polish applied to the brand logo, contrast tokens, and selected section reveals

Latest local verification recorded on `2026-04-16`:

- `npm run lint`
- `npm run test`
- `npm run build`

## Documentation

Current internal documentation:

- [Current State - 2026-04-16](./docs/current-state-2026-04-16.md)
- [Chat Report - 2026-04-16](./docs/chat-report-2026-04-16.md)
- [Current State - 2026-04-15](./docs/current-state-2026-04-15.md)
- [Chat Report - 2026-04-15](./docs/chat-report-2026-04-15.md)
- [Project Improvement Report](./docs/project-improvement-report.md)
- [Production Deployments](./docs/production-deployments.md)
- [CTA Section Retrospective - 2026-04-04](./docs/cta-section-retrospective-2026-04-04.md)
- [AI Website Improvement Playbook](./docs/ai-website-improvement-playbook.md)
- [Chat Report - 2026-04-02](./docs/chat-report-2026-04-02.md)

## Stack

- `React 18`
- `Vite 8`
- `TypeScript`
- `Tailwind CSS` tooling
- `Vitest` + `Testing Library`
- `ESLint 9`

## Getting Started

### Requirements

- `Node.js 20.19+`
- `npm`

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

The app runs on the Vite development server configured in [`vite.config.ts`](./vite.config.ts).

## Available Scripts

```bash
npm run dev
npm run build
npm run build:dev
npm run preview
npm run check:text
npm run check:styles
npm run lint
npm run test
npm run test:watch
```

`npm run build` currently performs three steps in order:

1. generate `public/sitemap.xml`
2. build the client bundle with Vite
3. prerender indexed routes into `dist/**/index.html`

## Project Structure

```text
src/
  components/              Homepage sections and shared UI blocks
  components/contact/      Contact overlay and form logic
  components/legal/        Legal-page components
  components/portfolio/    Dedicated portfolio carousel module
  components/primitives/   Shared low-level UI, reveal, and layout primitives
  lib/                     i18n, SEO, service data, analytics, identity, contact config
  lib/service-page-details Service-page content definitions
  pages/                   Route-level pages
  prerender/               Prerender-specific render helpers
  styles/                  Split visual layers for home, shell, service pages, and responsive rules
  test/                    Vitest setup and app-level tests
scripts/
  generate-sitemap.ts      Sitemap generation from indexed-route manifest
  prerender.ts             Static prerender entrypoint for indexed routes
public/
  .htaccess                Security headers, redirects, and route resolution
  brand-intro-bootstrap.js First-visit intro bootstrap kept CSP-safe
  project-previews/        Static preview images for portfolio cases
  site.webmanifest         Site metadata for installable/browser surfaces
docs/
  *.md                     Internal reports and workflow documentation
```

## Key Files

- business contact and form endpoint: [`src/lib/contact-config.ts`](./src/lib/contact-config.ts)
- brand identity, canonical site URL, and `og:image`: [`src/lib/site-identity.ts`](./src/lib/site-identity.ts)
- indexed-route manifest and route SEO contract: [`src/lib/seo-routes.ts`](./src/lib/seo-routes.ts)
- shared SEO helpers: [`src/lib/seo.ts`](./src/lib/seo.ts)
- service catalog and canonical slugs: [`src/lib/service-pages.ts`](./src/lib/service-pages.ts)
- project portfolio data: [`src/lib/project-cases.ts`](./src/lib/project-cases.ts)
- analytics bootstrap: [`src/lib/analytics.ts`](./src/lib/analytics.ts)
- web manifest: [`public/site.webmanifest`](./public/site.webmanifest)
- deployment workflows:
  - [`deploy-seohost.yml`](./.github/workflows/deploy-seohost.yml)
  - [`rollback-seohost.yml`](./.github/workflows/rollback-seohost.yml)
  - [`_deploy-seohost-reusable.yml`](./.github/workflows/_deploy-seohost-reusable.yml)

## Localization

- translations are stored in [`src/lib/i18n-data.ts`](./src/lib/i18n-data.ts)
- Polish is the default locale
- English locale now has dedicated crawlable URLs under `/en`
- selected locale is still persisted in `localStorage`, but the rendered locale is now derived from the current route
- `html[lang]`, `document.title`, canonical, `hreflang`, and page metadata update with locale changes

## SEO and Rendering Notes

- indexed routes are prerendered at build time rather than served by a full SSR runtime
- `sitemap.xml` is generated from the same indexed-route manifest as prerender
- Polish and English indexed routes are both emitted into the build output
- service pages use canonical URLs, `hreflang` alternates, and structured data
- homepage SEO includes `Organization` and `WebSite` schema
- `index.html` links `site.webmanifest` and uses a CSP-safe intro bootstrap script
- Apache route handling in `public/.htaccess` resolves prerendered `.../index.html` routes directly and returns a real `404` for unknown paths

## Deploy and Rollback

- production deploys run from GitHub Actions
- normal deploys verify the build before upload
- deploy transport is `rsync` over `SSH`
- rollback is handled by redeploying a known good `branch`, `tag`, or `SHA`
- successful production deploys create immutable `prod-*` tags
- the live deployment contract is documented in [`docs/production-deployments.md`](./docs/production-deployments.md)

## Contact and Analytics

- the homepage includes a shared contact section
- internal pages use a reusable modal contact overlay
- form submission uses `FormSubmit`
- no backend runtime or provider secrets are required for the contact flow
- Google Tag Manager is loaded client-side through [`src/lib/analytics.ts`](./src/lib/analytics.ts)

## Known Constraints

- the site is statically deployed; indexed pages are prerendered, but there is no persistent SSR or application server runtime
- contact delivery depends on a third-party form processor instead of a private backend
- portfolio previews are static assets and should be refreshed when the live case sites change significantly
- the current visual system is cleaner than earlier iterations, but it still benefits from deliberate cross-browser visual QA after strong header/motion changes
- documentation drift is a real risk in this repo, so each meaningful implementation cycle should end with a new state/report update
