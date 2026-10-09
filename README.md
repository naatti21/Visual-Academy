# Visual Academy — PWA 0.2 (working name)

**Language:** English by default, Finnish available with FI/EN button. Name is still temporary.

A mobile-first, offline-capable teaching prototype about tone curves, histogram reading and real tonal trade-offs. No AI, accounts, analytics, payment systems or external fonts/libraries.

## Update the existing GitHub Pages test app

If you already published version 0.1, **use the same `visual-learning-lab` repository**. Do not create a new repository and do not touch `osakevahti`.

1. Unzip `Visual_Academy_PWA_v0.2_GitHub.zip` **on your device**.
2. Open your existing `naatti21/visual-learning-lab` GitHub repository (or whichever repository you used for v0.1).
3. Upload these extracted files to the repository's **root** and confirm replacing files with the same names: `index.html`, `styles.css`, `app.js`, `sw.js`, `manifest.webmanifest`, `icons/*`, `README.md`, `PROJECT_STATE.md` and `TEST_NOTES.md`.
4. Commit the change. If you already use GitHub Pages, it will republish automatically; **do not reconfigure Pages**.
5. Open the existing PWA URL and refresh. If your old installed app remains cached, close the PWA completely and reopen it online; if needed reload the browser tab. Service worker cache name has changed to v0.2.

If you have *not* published it yet, create an **independent public** `visual-learning-lab` repository and enable Settings → Pages → Deploy from a branch → `main` / `(root)`. For `naatti21/visual-learning-lab`, the expected address after deployment is `https://naatti21.github.io/visual-learning-lab/`. Public Pages content is public. Brand naming is intentionally undecided.

## What changed since 0.1

- New very dark alley with a real black cat and bin in the source pixels, not a revealed substitute image.
- Much more detailed forest: clouds, ridge, bark, branches, forest floor, rock texture.
- A real, adjustable tone curve; first lessons use the shadow point; the forest uses midtone and highlight points.
- A histogram rebuilt from modified pixels after every change; before and after are overlaid.
- Coaching reacts to *measured pixel values*, flags newly near-white/clipped highlight tones and washed-out shadows.
- Extreme settings are useful experiments but **are not accepted as completed edits**.
- Removed the slider shortcut, kept the image on screen while changing the curve.
- English/Finnish switch, local lesson completion, restore last visited lesson and JSON export/import.
- Offline PWA with updated cache version.

## Limits and honest caveats

- Browser-based mobile rendering has not been verified on the user's phone yet; please test it.
- Real tone mapping is applied to image pixels in an illustrative 8-bit luminance model. It is **not** a physically complete RAW, gamma-linear, HDR or color-managed workflow.
- The numeric success limits are preliminary learning heuristics, not absolute artistic quality scores. They must be tuned from tester feedback.
- Example landscapes are generated on the canvas, not external photographs.
- Export/import JSON is **manual**. Google Drive sync, multi-device merging and restoration are **not implemented** yet.
- No private image uploads or personal data are requested.

## Short mobile test

1. Start lesson 01: can you recognize cat and bin *before* editing? They should be hard to see.
2. Pull the highlighted curve point gently: do they emerge? Does the histogram shift? Is the streetlight still intact?
3. Drag it all the way up: does the warning explain the side effects? Does completion correctly reject overdoing?
4. Hold the original button. It should display the same source drawing, not a different scene.
5. Open lesson 03: reveal bark and rock textures. Drag the smaller highlight point too high. Cloud details should disappear and a warning should appear.
6. Switch EN/FI, answer the reasoning question, reload; check that completion persists and progress can be exported/imported.

## Development approach

Local-first / optionally own-cloud-backed later. Use plain HTML, CSS, JavaScript; no bundler or hosting provider dependencies. Keep the project independent of Osakevahti.
