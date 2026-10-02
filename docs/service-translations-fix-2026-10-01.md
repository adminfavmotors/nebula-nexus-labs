# Audit item 3: complete English service pages

Date: 2026-10-01. Base commit: `7a00b26`.

## Root cause

Only Polish had the detailed offer. English used `buildFallbackDetail`, which assembled a page from short catalog descriptions. It dropped feature descriptions, specific timelines, pricing qualifications and closing actions. Its final process step reused the last scope item, so launch text described SEO rather than publication. Before the fix, all six translation-completeness cases and all six final-stage cases failed.

## Change

Each existing service-detail module now contains explicit `pl` and `en` content. The existing index selects the requested locale from a complete registry. `Record<ServiceKey, LocalizedServicePageDetail>` and `Record<Locale, ServicePageDetail>` require every service and both languages at compile time. The fallback builder and its Polish-only registry are removed.

English now includes every audience paragraph, feature and description, process step, timeline, pricing explanation and closing action from the Polish offer. Examples restored: up to eight pages for company websites; CMS, multilingual support, training and documentation for premium; content migration and redirects for redesign; included hosting/domain, backups and priority contact for support. Integrations described as possibilities in Polish remain possibilities in English.

| Service | English timeline | Detailed price |
|---|---|---|
| One-page | Usually 7–14 working days | From 1,490 PLN net |
| Landing page | 5–10 working days | From 1,790 PLN net |
| Company website | 2–4 working weeks, depending on scope | From 2,990 PLN net |
| Premium | 4–10 working weeks, depending on scope | Custom quote |
| Redesign | 2–3 working weeks | From 1,690 PLN net |
| Support | Individually agreed scope; fixed monthly subscription | From 149 PLN net per month |

SEO titles, descriptions and structured data continue to read the same selected detail as the page. Canonical paths, aliases, language switching, components and stylesheet sources are retained. A one-off comparison of evaluated objects against Git HEAD confirmed all six Polish detail objects are identical to the originals.

## Verification

- `npm run build`: passed, including TypeScript and complete prerender.
- `npm run lint`, `npm run check:text`, dead-code search and `git diff --check`: passed.
- All 161 tests passed. Nineteen content cases cover parity of scope, descriptions, commercial values, final-stage meaning, aliases, SEO and unknown services. The full-page hydration suite now checks all twelve PL/EN service pages, complete rendered descriptions and preserved SSR nodes, alongside existing consent and malformed-fragment scenarios.
- Production-build browser: all six English services at 375×812, 768×1024, 1366×768 and 1920×1080. All 24 checks showed the complete offer, no horizontal overflow or out-of-viewport titles/button labels, and no page errors. Representative screenshots were visually inspected on every screen size and for all six mobile pages.
- Company-page PL → EN switching verified the equivalent route, language, metadata, six features, four steps, timeline and detailed price.
- All six English pages checked with JavaScript requests blocked: first-screen content visible, complete features/steps/timeline already in HTML, form POST and submission disabled until hydration.
- Screenshots and browser results saved locally under ignored `.codex/service-content-verification`. Vite preview used directory URLs with trailing slashes to load each route's actual prerendered HTML. Tests use the canonical paths.

No form messages were sent. Build-generated sitemap dates were restored.

## Publication

Published on 2026-10-01 in [commit d809332](https://github.com/adminfavmotors/nebula-nexus-labs/commit/d80933202312c4b4d8249f97c96ec80314972855). [Deploy SEOHOST run 36872540645](https://github.com/adminfavmotors/nebula-nexus-labs/actions/runs/36872540645) completed successfully; production tag: `prod-20261001-135744-d809332` (UTC). See [current state](./current-state-2026-10-02.md) for the complete audit checklist.

## Remaining audit scope

This is a faithful translation of the existing Polish offer, not a change to the offer itself. Audit items 10 (price qualifications across the catalog), 17–18 (unsupported SEO/statistical claims and absolute support promises), 30 (voice), and 31 (redesign questionnaire logic) remain for their own corrections in both languages. Existing service-page layout issues in item 9 remain. The short catalog and legacy service descriptions were not consolidated here; that is item 13.
