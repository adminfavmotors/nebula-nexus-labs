# Production Deployments

Last updated: 2026-04-15

## What Changed

Production deploys now use three GitHub Actions workflows:

- `Deploy SEOHOST` for normal deploys from `main`
- `Deploy SEOHOST` with manual input when you want to deploy a specific branch, tag, or SHA
- `Rollback SEOHOST` for explicit rollback to an earlier production version

Every successful production deployment now creates an immutable Git tag in this format:

```text
prod-YYYYMMDD-HHMMSS-<short-sha>
```

That tag is the rollback anchor. It marks exactly what was deployed to `https://node48.pl`.

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

1. Merge approved work to `main` only when ready for production.
2. Let `Deploy SEOHOST` run automatically, or manually deploy a specific ref if needed.
3. Verify the production site.
4. If something is wrong, run `Rollback SEOHOST` with the last known good `prod-*` tag.

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

1. regenerate `public/sitemap.xml`
2. build the client bundle with Vite
3. prerender indexed routes into `dist/**/index.html`

The deploy job should therefore be treated as a static publish of the generated `dist/` directory, not as a runtime server release.

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

Recommended verification checklist after every production deploy or rollback:

1. Open `/` in a clean browser session and confirm the first-visit intro no longer triggers CSP or hydration errors.
2. Open `/en` and confirm the English homepage resolves as a prerendered route with the correct locale metadata.
3. Open at least one Polish and one English service page such as `/uslugi/strona-firmowa` and `/en/uslugi/strona-firmowa` and confirm prerendered HTML resolves correctly before hydration.
4. Confirm `canonical` and `hreflang` tags are correct on both locale variants.
5. Open `/privacy-policy`, `/cookie-policy`, `/en/privacy-policy`, and `/en/cookie-policy` to confirm legal routes resolve through the prerendered route contract.
6. Confirm the contact overlay opens and the mobile navigation behaves correctly on a narrow viewport.
7. Confirm unknown routes now return the dedicated `404.html` response path rather than a soft 404 shell.
8. Confirm the latest production tag is visible in GitHub after a successful deploy.

If any of these fail, rollback should be treated as a redeploy of the last known good `prod-*` tag rather than an ad hoc hotfix on production.

## Optional Hardening In GitHub Settings

The workflows already target the `production` environment. To make production safer, configure this in GitHub:

- Repository Settings -> Environments -> `production`
- add required reviewers before production deploys
- optionally restrict which branches can deploy

That gives you an approval gate before a production deployment starts.
