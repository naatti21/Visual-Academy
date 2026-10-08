# Visual Academy · PWA prototype 0.1

**Working title only. No permanent brand decision.** English is the default; use `FI` for Finnish. Independent from Osakevahti.

## What is included

- Three interactive mini-lessons: shadows (an alley with a cat and bin), a *measured* before/after histogram, and midtones (forest and sky).
- Original image comparison (hold button), movable tone curve (touch/drag or slider), explaining theory, multiple-choice reasoning checks and corrective feedback.
- Progress per lesson stored locally in your own browser. Lessons can be opened in any order.
- PWA manifest, icons and service worker for offline access after first successful installation/visit.
- No accounts, API keys, fonts or third-party libraries. Illustrations are generated in-browser.

## Publish on GitHub Pages (mobile-friendly)

1. Log in to GitHub as `naatti21`; create a **new public repository**, e.g. `visual-learning-lab`. Do not modify `osakevahti`.
2. Extract the ZIP. In the new repository select **Add file → Upload files**. Upload the **contents** of this folder to repository root: `index.html`, `app.js`, `styles.css`, `sw.js`, `manifest.webmanifest`, `icons/`, `README.md` and `PROJECT_STATE.md`.
3. Commit changes. Open **Settings → Pages → Build and deployment → Deploy from a branch**, choose branch `main`, folder `/(root)`, and Save.
4. After GitHub finishes deployment, open `https://naatti21.github.io/visual-learning-lab/` (only if you chose that repository name).
5. In mobile Chrome, open browser menu → **Add to Home screen** or **Install app** (depending on device). Reopen while online once so offline assets can cache.

Using another repository name is fine: replace `visual-learning-lab` in the web address with that name. All asset URLs are relative. GitHub Pages serves the repository publicly. Do not upload proprietary drawings, employer data or other sensitive material.

**Offline note:** the first online visit/install must fully load before offline use. Updates may not appear until the service worker refreshes its cached assets or page is reloaded. For any new release, change the `CACHE` version in `sw.js`.

## Local testing

From the folder, run `python -m http.server 8000`, then open `http://localhost:8000/`. Service workers generally require localhost or HTTPS. You can also open `index.html` locally to test basic UI, but offline installation won't work from `file://`.

## Limitations

- This is a simplified 8-bit screen-pixel luminance curve: edited pixels are calculated using a brightness-dependent delta applied equally to R/G/B, then clamped at channel boundaries. It is **not** a fully color-managed RAW pipeline or a correct simulation of all professional editing engines.
- Photo histogram bars are independently measured from the *actual transformed canvas image data*, not arbitrarily moved indicators. The original histogram stays visible in gray.
- A single correct multiple-choice answer plus a minimum tool adjustment completes a lesson. This is only a first test of feedback, **not a validated adaptive learning model**. Spaced repetition and diagnostic tracking come later.
- No cloud sync, payments, user-generated photo uploads or telemetry. Local data may disappear when browser storage is cleared.
