# Production Deployments

Last updated: 2026-10-13

Production: [node48.pl](https://node48.pl/). Source: [adminfavmotors/nebula-nexus-labs](https://github.com/adminfavmotors/nebula-nexus-labs). Verified releases through October 13 are recorded in [Current State - 2026-10-02](./current-state-2026-10-02.md#published-work). Latest application release: `12a9f61`, restoring the requested NODE48 wordmark with letters appearing from above, successfully deployed by run `38464815125` and tagged `prod-20261013-204311-12a9f61`. A generated early controller starts before first page paint and completes independently of React. PL/EN production Chrome checks verified ordering, complete-word visibility, preserved hydration and repeat bypass without application/CSP errors; physical-phone/Safari behavior and user visual confirmation remain separate.

## What Changed

Production deploys now use three GitHub Actions workflows:

- `Deploy SEOHOST` for normal deploys from `main`
- `Deploy SEOHOST` with manual input when you want to deploy a specific branch, tag, or SHA
- `Rollback SEOHOST` for explicit rollback to an earlier production version

Every successful production deployment now creates an immutable Git tag in this format:

```text
prod-YYYYMMDD-HHMMSS-<short-sha>
```

The timestamp is UTC. The tag is created after the upload succeeds and identifies the Git source used to build the deployed artifact. It is the rollback anchor; it does not independently prove every browser flow or email delivery works.

## Fast Rollback

Recommended rollback flow:

1. Open `Actions` in GitHub.
2. Open `Rollback SEOHOST`.
3. Click `Run workflow`.
4. Paste a previously created `prod-*` tag into `rollback_ref`.
5. Run the workflow.

This redeploys the tagged version to production and creates a new immutable `prod-*` tag for the rollback deployment itself, so the audit trail stays intact.

## Safe Deployment Flow

Recommended deployment flow before shipping UI changes:

1. Commit verified work and push or merge it to `main` when ready for production.
2. Let `Deploy SEOHOST` run automatically, or manually deploy a specific ref if needed.
3. Verify the production site.
4. If a deployment introduces a regression that warrants rollback, run `Rollback SEOHOST` with the last known good `prod-*` tag.

The `verify` job runs `npm ci` and `npm run build` on Node 22. The reusable deploy workflow builds the same source again before upload. Lint, tests and text checks are not separate workflow gates; run them before publishing relevant application changes. Deployment concurrency cancels an older in-progress production run when a newer run starts. A push alone does not establish successful publication: check the run conclusion and the resulting production tag.

## Why This Matches Current Practice

For a static site deployed from GitHub Actions in 2026, the reliable rollback pattern is:

- keep production deployment history in GitHub Actions
- deploy from explicit refs, not from mutable local state
- create immutable production tags after every successful release
- make rollback a redeploy of a known good Git ref

That approach is especially important for shared hosting, where the platform itself usually does not provide instant version rollback.

## Build Artifact Contract

Production deploys ship the output of `npm run build`.

That build currently does all of the following from the deployed Git ref:

1. check application and Vite configuration types with `npm run check:types`
2. regenerate `public/sitemap.xml` from the 14 indexed routes
3. build the client bundle with Vite
4. prerender 18 PL/EN routes into `dist/**/index.html` and generate `dist/404.html`
5. generate one early intro controller from the shared presentation/motion source, inject it before the prerendered root, and allow its exact SHA-256 hash in generated `dist/.htaccess`

The four legal routes are prerendered with `noindex,follow` and excluded from the sitemap. React's static renderer waits for lazy components; render errors or a 30-second stall fail the build.

The deploy job publishes the generated `dist/` directory to static hosting. Repository Markdown documentation is published in GitHub, not copied into the public website. A documentation-only push to `main` still triggers the existing site build/deployment workflow.

## Contact Runtime Contract

The contact form currently posts directly to `FormSubmit`.

No deploy-time secrets or extra backend runtime steps are currently required for form delivery.

The shared form accepts legitimate free-form inquiries, waits at most 20 seconds, requires an explicit provider success result and preserves drafts on failure. Its submit button is disabled before hydration, and static markup declares POST. Email and phone are always available in the section, dialog and footer. Client validation, the honeypot and the success cooldown are not server-enforced abuse controls. Provider-account activation, filtering/CAPTCHA behavior and inbox delivery remain outside the documented simulated-response checks.

## Transport Contract

Production deploys now use `rsync` over `SSH`, not plain `FTP`.

Before the workflow can deploy successfully:

1. Enable `SSH` access for the SEOHOST hosting account.
2. Add the GitHub Actions public key to SEOHOST in `Funkcje zaawansowane -> Klucze SSH` and authorize it.
3. Store the matching private key in a GitHub Actions secret named `SEOHOST_GITHUB_ACTIONS_RSA`.
   The workflow accepts either the raw private key or a base64-encoded version of the same key.

The current workflow deploys with these project-specific SEOHOST values:

- host: `h79.seohost.pl`
- user: `srv110507`
- port: `57185`
- target path: `domains/node48.pl/public_html/`

This keeps deployment traffic encrypted in transit while matching the SSH contract that is actually active on the hosting account.

## Post-Deploy Verification

Scale verification to the change. For documentation-only releases, confirm the workflow/tag and basic site availability; no application flow changed. For UI, routing or contact changes and rollbacks, check the relevant flows below:

1. Open `/` in a clean browser session and inspect CSP/hydration errors and first-screen visibility. With scripts enabled, verify that the native intro already covers the first styled frame before the root/application hydrates, letters enter from above and the complete word is painted during the holding phase before fade. Confirm skip/completion releases root access and first-visit hydration preserves markup/form values. Verify old `"1"` and `editor-v2` session marks play the restored version once and the current `wordmark-v1` mark skips repeat playback. Delay/abort the main application script and confirm independent intro completion followed by visible static content; separately disable all JavaScript and confirm the styled header, heading, body and actions are immediately available without an overlay. Verify the served early script's hash matches the actual CSP header.
   If startup/storage policy changes, separately verify unreadable storage still permits playback and releases the page, while reduced motion bypasses it. Ordinary private browsing and controlled storage denial are different checks; record the actual browser and do not equate a Chrome viewport with a physical phone or Safari.
2. Open `/en` and confirm the English homepage resolves as a prerendered route with the correct locale metadata.
3. Open at least one Polish and one English service page such as `/uslugi/strona-firmowa` and `/en/uslugi/strona-firmowa` and confirm prerendered HTML resolves correctly before hydration.
4. Confirm `canonical` and `hreflang` tags are correct on both locale variants.
5. Open `/privacy-policy`, `/cookie-policy`, `/en/privacy-policy`, and `/en/cookie-policy` to confirm prerendered HTML, `noindex,follow` and sitemap exclusion.
6. Confirm the contact overlay opens and the mobile navigation behaves correctly on a narrow viewport.
7. Test contact success, error, timeout and duplicate-submit behavior with intercepted provider responses. Confirm drafts survive failures, native email/phone links remain available and no real inquiry is sent by these checks.
8. If actual provider delivery verification is explicitly requested, send a controlled test inquiry and independently confirm receipt. A simulated response or successful deployment does not establish inbox delivery.
9. Confirm unknown routes now return the dedicated `404.html` response path rather than a soft 404 shell.
10. Confirm the latest production tag is visible in GitHub after a successful deploy.

When a release regression requires rollback, redeploy the last known good `prod-*` tag and verify the affected behavior. Space production requests to avoid hosting rate limits; an HTTP 429 after repeated automated navigation is not proof of a deployment failure.

### Documentation-only release records

October 13 production outcomes are recorded in subsequent documentation-only commits with `[skip ci]`. GitHub's [skip-workflow instruction](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs) suppresses the push-triggered run for those commits. Their changes are limited to Markdown outside `dist/`; the latest record's application and workflow files match the successfully deployed `12a9f61` artifact. Immutable production tags continue to identify each application source. Ordinary documentation pushes without a skip instruction still trigger the existing workflow.

## Optional Hardening In GitHub Settings

The workflows already target the `production` environment. To make production safer, configure this in GitHub:

- Repository Settings -> Environments -> `production`
- add required reviewers before production deploys
- optionally restrict which branches can deploy

That gives you an approval gate before a production deployment starts.
