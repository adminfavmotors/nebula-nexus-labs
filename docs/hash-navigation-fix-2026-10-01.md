# Audit item 2: malformed URL fragments

Date: 2026-10-01. Based on published commit `a3ac0a2`.

## Root cause and scope

Opening `/en#%E0%A4%A` threw an uncaught `URIError` inside the shared `RouteHashScrollManager` effect. React unmounted the application. A regression test reproduced the original failure before the application code was changed.

Only the URL decoding boundary in `src/App.tsx` changes. Existing app-flow and full-page hydration tests are extended. No separate navigation system, dependency, CSS rule, translation, or server configuration is introduced.

## Behavior and reasoning

- Catch `URIError` specifically around `decodeURIComponent`. An invalid percent sequence or invalid UTF-8 skips the application's anchor scroll; the page remains usable. Other unexpected exceptions are not suppressed.
- Preserve the original address, query string, fragment, and browser history. Do not redirect, repair arbitrary input, reload the page, or discard a form draft.
- Valid fragments retain the existing single decode and exact `getElementById` lookup. Encoded section names, Unicode, literal percent signs, and selector punctuation remain identifiers. They are not interpreted as HTML or CSS selectors.
- Existing scroll-to-home behavior, finite retries for targets rendered later, and timer cleanup are retained. Malformed fragments return before creating a retry timer.
- Locale switching keeps its current route/query/fragment contract. No new error prompt is necessary for an optional anchor that cannot identify a section.

[MDN documents the `URIError` contract](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Malformed_URI). This patch deliberately ignores malformed fragments in the custom scroll manager; it does not implement a replacement for the browser's complete fragment-navigation algorithm.

## Verification

- Production build, including TypeScript checks and prerender: passed.
- Lint/style architecture, text integrity, dead-code search, and `git diff --check`: passed. The shared manager and existing retry constants remain in use.
- All 112 tests passed: 18 additional cases cover malformed encodings on PL/EN home/service routes, recovery through a valid navigation link, locale switching with query preservation, encoded exact IDs, a draft retained across fragment changes, and hydration of existing SSR nodes/forms with a malformed fragment.
- Production-build browser: PL/EN home/service pages each checked against six malformed fragments, a missing target, and an empty fragment. Content/navigation remained present and no page errors were reported.
- Browser back/forward between the malformed address and `#services`: page and draft preserved; valid section scrolling confirmed.
- Screenshots inspected at 375×812, 768×1024, 1366×768, and 1920×1080. Content visible; no horizontal overflow.
- Service-page reload with JavaScript requests blocked: styled first-screen content visible, form still POST and submit disabled until hydration. Existing homepage intro behavior is outside this audit item and unchanged.

Vite preview checks use directory URLs with trailing slashes to load each route's actual prerendered index. Integration tests use the exact canonical paths, including `/en#%E0%A4%A`. Browser checks sent no real inquiries. Build-generated sitemap date changes were restored. This patch has not been committed or published.
