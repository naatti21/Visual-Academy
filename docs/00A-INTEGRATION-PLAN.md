# Visual Academy — 00A integration handoff (v7 approved → FI/EN candidate)

**Updated:** 2026-10-13  
**Branch:** `feat/visual-academy-00a-image-reading` (draft PR #6, initially based on `main` v0.2.4)  
**Status:** user-approved Finnish v7 prototype; standalone bilingual candidate and tests under development. **Not published, not QA-GO.**

## Product and learning decisions

00A remains the first *optional* image-reading lesson in Module 00. 00B follows it as an independent optional comparison lesson; Module 01 retains all three existing tone-curve lessons and their unchanged progress/backup schema. First learn to observe and decide; only then explore what the edit does. No score for aesthetic preference.

The **current source image is our original AI-generated 1536×1024 tram/station street scene**, not the historical Lasipalatsi Commons photograph. Preserve visible disclosure in FI/EN that this is synthetic and cannot be treated as documentary evidence. Embedded 00A WebP SHA-256: `d4854b922b0c3c537bc9a06c928b9f91870c2afbeee351faa0435bc2e0bb3b87`. Image is stored once, never recomposed, cropped by real pixel coordinates. No external image dependency.

The user approved the revised Finnish v7 image/crop test on an actual phone. Its source coordinate rectangles (pixels, 1536×1024) are **locked**:

| View | x | y | width | height | Purpose |
|---|---:|---:|---:|---:|---|
| Whole image | 0 | 0 | 1536 | 1024 | Overall scene, lighting, surroundings and both crop outlines |
| Information crop | 0 | 18 | 480 | 1000 | At the **left edge**: timetable, stop, waiting people, arriving distant tram |
| Artistic crop | 1095 | 285 | 390 | 592 | At the **right**: tram front and graphic details |

**Aspect ratios deliberately differ.** Do not restore the outdated v4 rule of equal-sized crops or middle-centered zoom. The same `CROP_BOXES` geometry must drive both the source-image dashed rectangle and `drawImage` crop output. The user explicitly rejected the v6 middle crop and inaccurate guides.

The five-stage structure stays: (1) first observation; (2) atmospheric-poster purpose; (3) information/public-transit purpose and reasoning; (4) review without aesthetic grading; (5) compare the whole picture, information crop and artistic crop. Teach composition (subject, leading lines, space, aspect ratio, thirds as a guide) without making the rule of thirds a pass criterion. Repetition/transfer to *other images* is a future lesson family, not proof of this test's learning efficacy.

## Work package and exact repo paths

**This draft's implementation scope (independent of PR #5):**

| Path | Action | Role |
|---|---|---|
| `prototypes/00a-v7.html` | ADD | **Frozen Finnish v7** reference; user's accepted crop geometry, preserved unchanged. Not bundled in Pages. |
| `lessons/00a.html` | ADD | Bilingual FI/EN, original embedded local WebP, all 5 stages, 3 pixel-accurate crops, source-backed outlines, pan/pinch, source disclosure and link to app home. Pre-integration *candidate only*. |
| `tests/lesson00a.test.mjs` | ADD | Source SHA, exact crop boxes, FI/EN contents, locally embedded asset and isolation from Module 01 data. |
| `tests/e2e/lesson00a.spec.mjs` | ADD | Mobile Chromium language/5-stage/crop pixel checks, no horizontal overflow or remote image requests, no mutation of old progress. |
| `docs/00A-INTEGRATION-PLAN.md` | UPDATE | Current AI-source policy and steps, supersedes earlier v4/Commons planning. |

**Deferred, not yet written/authorized in this draft:** `index.html`, `app.js`, `styles.css`, `sw.js`, `.github/workflows/pages.yml`, `APP-SPEC.md`, package version. These are the **single future integration** after PR #5's independent QA and explicit user GO, so only one Module 00 homepage card exists. This avoids PR branches that conflict on homepage, SW or Pages packaging. The current `lessons/00a.html` lives only in the PR checkout; it is not an accessible production route and has **not** been tested as an installed PWA offline route.

Future integrated homepage: `00A Observe & decide / Havainnoi ja päätä` first, `00B Compare edits / Vertaa muokkauksia` second (both optional), then unchanged Module 01. Keep `?lang=fi/en` across lesson and home. The 00A standalone currently reads the app's stored language but **does not write** any Module 01 storage or backups. 00A answers are intentionally ephemeral; no resume promises or schema changes.

## QA and release boundary

Before integrating into `main`:

1. Confirm PR #5 status, independent re-QA and explicit user GO (currently still pending). Avoid including its unapproved changes via silent PR rebasing/merging.
2. Verify this lesson's **exact HEAD SHA** and run all developer unit/E2E tests in GitHub CI. Browser tests should exercise actual source pixels; a green workflow is developer-side evidence only, not independent release GO.
3. When the integration is genuinely ready, extend the existing PR #5 Module 00 card; add `lessons/00a.html` to Pages packaging and SW precache/00A navigation fallback. Verify installed/offline route with real Playwright+SW; verify all FI/EN strings and old draft/backup regression cases.
4. User checks the bilingual/integrated screen if meaningful differences from approved v7 appear. Risk-based independent acceptance and explicit user GO before **any** merge or deploy. No broad Work audit unless evidence justifies it.

**Known limits:** This is a generated 8-bit photo-like image, **not a sensor RAW**, not an authentic Helsinki photograph, and not legal proof of any specific city or tram service. A successful demo with one image does not demonstrate knowledge transfer to unseen scenes.