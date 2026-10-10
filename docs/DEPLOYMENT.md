# Visual Academy – Quality gate → GitHub Pages

The shared APP ENGINEERING PLAYBOOK requires a green release candidate before deployment.

## One-time repository setting

**GitHub repository → Settings → Pages → Build and deployment → Source: GitHub Actions.**

If the source is still **Deploy from a branch** (`main`), GitHub automatically publishes pushes *before* Quality gate completes; the new `pages.yml` alone does not stop that bypass. The GitHub connector cannot update this repository setting. An administrator must switch it once.

## Automated route

1. Commit reaches `main` → `.github/workflows/quality-gate.yml` executes `npm test` (unit + mobile E2E).
2. `.github/workflows/pages.yml` listens to **Quality gate → completed**.
3. It only packages a successful **push on main** from this repository, and checks that the tested commit SHA is **still the current main head**.
4. Only PWA runtime files are packaged, excluding tests, docs, and development tools.
5. Just before deployment it checks the SHA again; if the branch moved, no deployment occurs.
6. Deployment uses the `github-pages` environment and GitHub's `deploy-pages` action.

A failed, cancelled, PR-only or superseded Quality gate cannot trigger publication through this workflow. New deployments don't erase the last published working site when they fail or are skipped.

## Verification after enabling GitHub Actions source

- Look for a successful **Quality gate** run for the **latest `main` SHA**.
- Then verify a **Publish Visual Academy** run on the same tested SHA succeeded.
- Confirm the Pages URL `https://naatti21.github.io/Visual-Academy/` opens the intended version.
- Confirm no subsequent automatic **pages build and deployment** run publishes directly from an untested main push.
- If GitHub Pages rejects publishing, inspect the `Publish Visual Academy` workflow logs, the Pages source setting and the `github-pages` environment protection.

The pipeline gate is not fully active until the **Pages source switch** and a successful Pages publish have both been verified.
