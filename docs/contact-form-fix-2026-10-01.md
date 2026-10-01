# Contact form: legitimate inquiries and delivery behavior

Date: 2026-10-01. Audit item 1 in the importance-ordered list: ordinary inquiries rejected as spam. Includes the requested follow-up to resolve TypeScript and React errors and finish the form's hydration behavior.

## Scope and root cause

The shared contact panel serves both the homepage section and the modal on internal pages. Its preflight mixed required-field validation with speculative bot detection: uppercase ratio, reference-link count, repeated characters, markup-like text, a minimum completion time, and focus/change-event history. These rules blocked legitimate briefs and autofill. Every rejection looked like a delivery failure and encouraged retrying unchanged content.

The site deliberately uses direct browser-to-FormSubmit AJAX delivery. It has no private form backend. This change preserves that architecture and the existing provider endpoint.

## Resulting behavior

- Accept uppercase, Polish diacritics, multiple reference links, technical text containing angle brackets, repeated punctuation, short inquiries, and autofill without a waiting period or an interaction-history requirement.
- Require non-whitespace name, email and message. Use browser email validation and explicit length checks: name 120, email 160, message 2,000 characters. A one-character name is valid. Invalid fields receive a field-specific browser prompt; correcting input clears its custom error.
- Trim surrounding whitespace when sending; preserve email case and the actual message contents. Do not silently truncate oversized values.
- Keep one provider-compatible `_honey` field, hidden visually and from assistive technology. A filled trap blocks the request with an honest verification error, preserves the inquiry and offers direct email. Remove the redundant `website` and `company` traps, unused start timestamp and obsolete CSS.
- Prevent simultaneous submit events in the same panel with a synchronous request guard. Make fields read-only while sending so a successful response cannot reset text edited during the request.
- Keep the 45-second pause only after provider-confirmed success. Explain it with a live countdown; remove the notice when it expires. Storage failures must not turn a confirmed success into a failure. This local pause is a convenience against repeated clicks, not a security boundary.
- Require both a successful HTTP response and `success: true` or `success: "true"`. HTTP 200 alone does not clear the form or close the modal.
- Preserve text on rejection, malformed responses, rate limiting and network failures. Use localized PL/EN messages and a direct `contact@node48.pl` mailto link. Treat a timeout as uncertain delivery rather than claiming the message was definitely rejected.
- Abort a stalled request after 20 seconds and restore the button. Never automatically retry, because an interrupted response may follow a request already accepted by the provider. Cancel outstanding work and delayed modal callbacks on unmount.
- Before the JavaScript handler is ready, keep the submit button disabled and offer direct email. Explicitly declare POST so the form does not default to placing inquiry data in a GET URL. Hydration activates submission without clearing prefilled fields. This protects the static/slow-loading form; AJAX delivery still needs JavaScript.

## Security and privacy reasoning

The browser is an untrusted environment. Attackers can call the public provider endpoint without this JavaScript, so neither field validation, a honeypot nor sessionStorage can provide server-enforced rate limiting. A future need for stronger abuse controls would require verified provider controls or a server boundary; it cannot be solved by restoring arbitrary restrictions on legitimate text.

[OWASP input-validation guidance](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) distinguishes structured-field validation from free-form text and explains why denylisting apparent HTML or punctuation is insufficient against injection and can reject legitimate input. Here, customer text is sent as form data and is not inserted into page HTML. Rendering and mail handling inside the provider remain its responsibility; this change does not claim to audit its implementation.

The payload is explicitly constructed from approved fields. It does not forward arbitrary DOM fields, `_cc`, `_webhook`, `_next`, or a CAPTCHA-disabling override. This avoids accidental routing changes in the application payload; it cannot constrain a malicious caller making a separate direct request.

The email reply address comes from the validated email field. Request subject and email template are application-controlled. Query strings and URL fragments are omitted from page metadata to avoid transmitting unrelated private parameters. No inquiry text is logged or stored by this application in browser storage. Provider response messages are not displayed verbatim; the UI uses reviewed translations rendered as text.

[FormSubmit documentation](https://formsubmit.co/documentation) specifies the AJAX endpoint, reply-address field and honeypot behavior. Its [help page](https://formsubmit.co/help) describes provider spam filtering. Actual filtering, CAPTCHA enforcement for this AJAX endpoint, email-account activation, email-template escaping and inbox delivery were not independently verified. Keeping `_captcha` absent does not prove that an interactive CAPTCHA challenge runs in this integration.

## Validation

| Check | Result |
|---|---|
| `npm run build` | Passed, including prerender |
| `npm run lint` | Passed |
| `npm run test` | 94/94 passed across four files |
| `npm run check:text` | Passed |
| `git diff --check` | Passed |
| Dead-code search | Removed heuristics and hidden-field class have no remaining references |
| `npm run check:types` | Passed for application and Vite configuration; also required by production/development builds |
| Complete-page hydration | 21 cases passed for home, service, legal and 404 pages; original HTML nodes and prefilled form values preserved |

Twenty-six contact regression cases cover legitimate briefs, autofill, whitespace and oversized fields, invalid-email correction, honeypot rejection, payload allowlisting, URL privacy, simultaneous submissions, failed provider contracts, retry, timeout, cooldown expiry, optional storage and modal lifecycle. The old regression test that required rejecting uppercase was changed to require acceptance. Fifteen runtime/compatibility cases cover cookie hydration, unavailable cookie storage, intro/banner measurements, React 18 image attributes and SEO escaping. Twenty-one full-page cases render SSR in a separate Node process using Vite's real SSR loader, then hydrate the actual App. They wait for lazy route hydration and assert no warnings/recoverable errors, DOM replacement or loss of prefilled text, plus safe static-form behavior and subsequent activation.

Browser verification used the production build on localhost. Provider responses were intercepted; no real emails were sent. The PL homepage and EN modal both submit uppercase text with three reference URLs. Simulated failures retain all fields and show the localized email fallback. A subsequent confirmed success resets the form. Two immediate inquiries produce only one request and an updating cooldown notice (45 seconds, then 42). The modal error state was inspected at 375×812, 768×1024, 1366×768 and 1920×1080: text and email remain reachable through normal panel scrolling, with no horizontal overflow. Verification screenshots are retained under the ignored local `.codex/contact-form-verification` directory.

## React and TypeScript completion

The original commit `e8aa38f` was separately reproduced with errors 418/423. Two causes are now resolved: cookie storage was read during the first browser render, and the prerender entry omitted the outer Suspense boundary used by App. Cookie state now starts unresolved in both environments and reads storage after hydration. Only an explicit granted choice loads GTM; denied, missing, invalid or unreadable choices do not. Banner measurement reacts when intro blocking ends and cleans up observers/listeners. Unavailable cookie storage is handled inside the cookie component without assuming consent.

The prerender tree now includes matching Suspense boundaries and the app shell uses the existing class-name helper to match its initial attributes. Static generation uses React's Node stream renderer and waits for all lazy components before writing HTML. Errors or a 30-second stall fail the build instead of publishing partial fallback markup. This follows React's [hydration contract](https://react.dev/reference/react-dom/client/hydrateRoot) and [static-generation guidance](https://react.dev/reference/react-dom/server/renderToPipeableStream). Hydration warnings are not suppressed and normal return visits still hydrate existing HTML.

React 18 expects the lowercase DOM image attribute while its TypeScript declarations expose the newer camelCase name. Typed attribute objects preserve lowercase forwarding and constrain priority values without casts that silence JSX errors or a React upgrade. A runtime regression checks both actual DOM priorities and absence of unknown-property warnings. SEO escaping now uses global regular-expression replacement supported by the declared ES2020 target, including safe JSON-LD script escaping. Tests verify repeated quotes/angle brackets and script-breakout payloads remain data. Repeated cookie-policy item text also now has unique React keys.

The no-JavaScript check exposed CSS that was tied to lazy JS chunks despite the page already being prerendered. Existing service-page and portfolio styles now enter through main.tsx; their old lazy imports were removed. No CSS rules or design layouts were added. The initial CSS bundle increases from 17.09 to 19.92 kB gzip; static pages gain complete styling before application JS runs, while the heavier page/carousel JavaScript stays lazy.

The production browser build was checked on four PL/EN home/service routes with denied, granted and unset cookie choices: all 12 combinations produced zero page errors, with GTM present only for granted consent. Both forms were verified with intercepted failure and success responses. The final static service page also remains styled with JS requests blocked, presents direct email, uses POST and disables submission until its handler is ready. Existing homepage and service content is present in static HTML; portfolio cards are fully rendered rather than left as loading placeholders.

Local preview detail: Vite preview returns the SPA homepage fallback for an internal path without a trailing slash. Browser checks therefore use the matching directory/index route with a trailing slash. The existing production Apache rule rewrites canonical internal paths to their own index.html; it was reviewed and retained. Unit integration checks use the exact canonical paths and matching SSR HTML, independently of this preview behavior.

## Remaining scope limits

The original build also rejected `PROSZĘ O WYCENĘ STRONY DLA FIRMY` with zero requests. The corrected production build accepts uppercase inquiries through the same submit boundary. Static HTML still contains the hero and form fields; the existing intro bootstrap can hide the first screen, as already noted in the earlier audit. This change introduces no new first-screen animation or hidden initial content.

Build-generated changes to the tracked sitemap were restored. The patch includes the contact correction, runtime/type fixes, prerender completion, existing CSS import relocation, regression tests and this report. No production deployment, real form submission, email receipt confirmation or provider-account configuration was performed.

The comparison copy remains in the ignored `.codex/contact-baseline` directory because automatic command review rejected its cleanup with `blocked by policy`. It is not part of the tracked patch; both preview servers and browser sessions were stopped.
