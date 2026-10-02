# NODE48

Marketing website for `NODE48`, built with `React`, `Vite`, `TypeScript`, and a split CSS architecture backed by `Tailwind CSS` tooling.

Repository: [adminfavmotors/nebula-nexus-labs](https://github.com/adminfavmotors/nebula-nexus-labs). Production: [node48.pl](https://node48.pl/). `nebula-nexus-labs` is the repository name; `NODE48` is the public brand.

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
- build-time prerender for 14 indexed routes: PL/EN homepages and six service pages in each language
- four additional prerendered legal routes: PL/EN privacy and cookie policies, with `noindex,follow` and excluded from the sitemap
- generated sitemap driven by the indexed-route manifest; the broader prerender manifest also includes legal pages
- dedicated SEO route contract with canonical URLs, `hreflang` alternates, structured data, `og:image`, and `Organization` / `WebSite` schema
- real `404.html` delivery contract for unknown routes instead of client-only soft 404 handling
- isolated portfolio carousel backed by structured project data and real preview images
- shared contact section on the homepage plus reusable modal contact overlay on internal pages
- contact validation that accepts legitimate inquiries and autofill, with a 20-second request timeout, provider-confirmed success and preserved drafts on failure
- persistent native email/phone links in the contact section, dialog and footer
- complete Polish and English service details, with both locales required by TypeScript
- malformed URL fragments handled without unmounting the application
- matching prerender/hydration boundaries and consent-safe analytics initialization
- production deploy and rollback flow via GitHub Actions with immutable `prod-*` tags
- split visual layers in `src/index.css`, `src/styles/home.css`, `src/styles/shell.css`, `src/styles/service-page.css`, and `src/styles/responsive.css`
- shared `Reveal` primitive plus lightweight container-level reveal hooks for grouped card/list stagger where needed
- latest header polish applied to the brand logo, contrast tokens, and selected section reveals

Documentation updated on `2026-10-02`. Four audit fixes were published on `2026-10-01`; their commits, successful deployments and remaining audit items are recorded in [Current State - 2026-10-02](./docs/current-state-2026-10-02.md).

Latest application verification recorded on `2026-10-01`:

- `npm run lint`
- `npm run test`: 161 tests across five files
- `npm run build`: TypeScript, client build and prerender
- `npm run check:text` and `git diff --check`
- production-build browser verification at 375, 768, 1366 and 1920 px; PL/EN contact surfaces and static HTML checked

Direct contacts are functionally published, but their visual presentation was rejected in user review and still needs refinement. The next numbered item is 5: contact-dialog focus trapping and restoration. The homepage intro can still hide first-screen content without JavaScript (item 12).

## Documentation

Current documentation and published fix reports:

- [Current State - 2026-10-02: releases and all 33 audit items](./docs/current-state-2026-10-02.md)
- [Contact Form and React/TypeScript Fix - 2026-10-01](./docs/contact-form-fix-2026-10-01.md)
- [Malformed URL Fragment Fix - 2026-10-01](./docs/hash-navigation-fix-2026-10-01.md)
- [English Service Content Fix - 2026-10-01](./docs/service-translations-fix-2026-10-01.md)
- [Persistent Direct Contact Fix - 2026-10-01](./docs/direct-contact-fix-2026-10-01.md)
- [Production Deployments](./docs/production-deployments.md)
- [Local Project Workflow](./docs/ai-dev-prompt.md)

Historical snapshots and supporting guidance (their dates define their scope):

- [Current State - 2026-04-16](./docs/current-state-2026-04-16.md)
- [Chat Report - 2026-04-16](./docs/chat-report-2026-04-16.md)
- [Current State - 2026-04-15](./docs/current-state-2026-04-15.md)
- [Chat Report - 2026-04-15](./docs/chat-report-2026-04-15.md)
- [Project Improvement Report](./docs/project-improvement-report.md)
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

- Node.js matching `package.json`: `^20.19.0 || ^22.12.0 || >=24.0.0` (production CI uses Node 22)
- `npm`

### Install

```bash
npm ci
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
npm run check:types
npm run check:text
npm run check:styles
npm run lint
npm run test
npm run test:watch
```

`npm run build` performs four steps in order:

1. check application and Vite configuration types with `npm run check:types`
2. generate `public/sitemap.xml` from indexed routes
3. build the client bundle with Vite
4. prerender 18 PL/EN routes into `dist/**/index.html` and generate `dist/404.html`

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
  prerender.ts             Static prerender entrypoint for public and legal routes
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
- canonical service keys and slugs: [`src/lib/service-catalog.ts`](./src/lib/service-catalog.ts)
- short localized service catalog: [`src/lib/service-pages.ts`](./src/lib/service-pages.ts)
- complete PL/EN service details: [`src/lib/service-page-details/index.ts`](./src/lib/service-page-details/index.ts)
- project portfolio data: [`src/lib/project-cases.ts`](./src/lib/project-cases.ts)
- analytics bootstrap: [`src/lib/analytics.ts`](./src/lib/analytics.ts)
- web manifest: [`public/site.webmanifest`](./public/site.webmanifest)
- deployment workflows:
  - [`deploy-seohost.yml`](./.github/workflows/deploy-seohost.yml)
  - [`rollback-seohost.yml`](./.github/workflows/rollback-seohost.yml)
  - [`_deploy-seohost-reusable.yml`](./.github/workflows/_deploy-seohost-reusable.yml)

## Localization

- translations are stored in [`src/lib/i18n-data.ts`](./src/lib/i18n-data.ts)
- full service-page content is stored in the existing [`src/lib/service-page-details`](./src/lib/service-page-details) modules; every service requires explicit PL/EN details
- Polish is the default locale
- English locale now has dedicated crawlable URLs under `/en`
- selected locale is still persisted in `localStorage`, but the rendered locale is now derived from the current route
- `html[lang]`, `document.title`, canonical, `hreflang`, and page metadata update with locale changes

## SEO and Rendering Notes

- public and legal routes are prerendered at build time rather than served by a full SSR runtime
- `sitemap.xml` includes the 14 indexed routes; the four legal routes are prerendered with `noindex,follow`
- Polish and English indexed routes are both emitted into the build output
- service pages use canonical URLs, `hreflang` alternates, and structured data
- homepage SEO includes `Organization` and `WebSite` schema
- `index.html` links `site.webmanifest` and uses a CSP-safe intro bootstrap script
- Apache route handling in `public/.htaccess` resolves prerendered `.../index.html` routes directly and returns a real `404` for unknown paths

## Deploy and Rollback

- production deploys run from GitHub Actions
- normal deploys verify the build before upload
- the workflow runs `npm ci` and `npm run build`; lint, text checks and tests are separate local checks, not additional CI gates
- deploy transport is `rsync` over `SSH`
- rollback is handled by redeploying a known good `branch`, `tag`, or `SHA`
- successful production deploys create immutable `prod-*` tags
- the live deployment contract is documented in [`docs/production-deployments.md`](./docs/production-deployments.md)

## Contact and Analytics

- the homepage includes a shared contact section
- internal pages use a reusable modal contact overlay
- form submission uses `FormSubmit`
- email and phone are always available through native links using shared contact configuration
- success requires both an OK HTTP response and an explicit successful provider result; failures preserve the inquiry, and timed-out requests are not automatically retried
- no backend runtime or provider secrets are required for the contact flow
- provider filtering, account activation and actual inbox delivery have not been independently verified by the documented automated/browser checks
- Google Tag Manager is loaded client-side through [`src/lib/analytics.ts`](./src/lib/analytics.ts) only after explicit consent

## Known Constraints

- the site is statically deployed; indexed pages are prerendered, but there is no persistent SSR or application server runtime
- contact delivery depends on a third-party form processor instead of a private backend
- portfolio previews are static assets and should be refreshed when the live case sites change significantly
- contact-dialog focus handling, cookie UX, homepage intro, mobile layouts, commercial copy and visual design still have open audit items; see the numbered current-state checklist
- passing functional and layout checks does not mean the contact design has been accepted in user review
- documentation drift is a real risk in this repo, so each meaningful implementation cycle should end with a new state/report update
