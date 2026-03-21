# Nebula Nexus Labs

Marketing website for `Nebula Nexus Labs`, built with `React`, `Vite`, `TypeScript`, `Tailwind CSS`, and `shadcn/ui`.

## Current State

- Default locale is Polish (`pl`) with an English switcher (`en`) in the navbar.
- The contact form submits requests through `FormSubmit` and shows client-side success/error feedback.
- Main quality checks are wired and currently pass:
  - `npm ci --dry-run`
  - `npm run lint`
  - `npm run test`
  - `npm run build`

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

The app starts on the Vite development server configured in [vite.config.ts](C:/Users/Admin/Desktop/project/nebula-nexus-labs/vite.config.ts).

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
  components/     Landing sections and UI building blocks
  hooks/          Small animation and viewport helpers
  lib/            Utilities, site config, and i18n provider
  pages/          Route-level pages
  test/           Vitest setup and app-level tests
```

## Project Config

- Shared business/config values live in [src/lib/site-config.ts](C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/site-config.ts).
- This file is the right place for brand-level constants such as brand name, phone, year, and technical form endpoint config.

## Localization

- Translations are stored in [src/lib/i18n.tsx](C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/i18n.tsx).
- Polish is the default locale.
- The selected locale is persisted in `localStorage`.
- `html[lang]`, `document.title`, and selected meta descriptions are updated when the locale changes.

## Contact Form

- The website uses a client-side form submission flow via `FormSubmit`.
- The technical form endpoint is configured in [src/lib/site-config.ts](C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/lib/site-config.ts).
- If submissions stop arriving, verify the form provider activation/confirmation step first.

## Testing Notes

Current tests cover:

- default Polish locale
- switching from Polish to English
- locale persistence and document metadata updates
- contact form submission request
- success and error feedback after submission

Tests live in [src/test/app.test.tsx](C:/Users/Admin/Desktop/project/nebula-nexus-labs/src/test/app.test.tsx).

## Known Limitations

- Some `shadcn/ui` files still trigger non-blocking `react-refresh/only-export-components` warnings during linting.
- The contact form currently depends on a third-party form endpoint instead of a private backend route.
- The project is still a marketing site template and can benefit from richer content, analytics, and deployment docs.
