# Visual Academy / KuvaAkatemia — PROJECT_STATE

Updated: 2026-10-09
Version: 0.2 test candidate. Brand/name NOT decided.

## Purpose
Mobile-first, program-independent learning of photo editing by doing. 3–5-minute lessons, beginner to advanced, real cause and effect, effective feedback, adaptive pacing and thoughtful retrieval practice.

## Current implementation
- Three introductory lessons (alley/shadow discovery; histogram; forest/midtones and highlight preservation).
- EN default, FI optional.
- Actual canvas pixels + 8-bit luminance mapping + measured before/after histograms and feedback.
- Detailed procedurally drawn scenes with source information, not magic reveals.
- Optional reasoning questions, meaningful edit needed to finish; a wildly clipped or excessively bright edit is not accepted.
- Local progress, previous v0.1 progress migration, last lesson, manual JSON export/import, service worker and manifest.

## Evidence of testing
- Node JavaScript syntax checks passed.
- Canvas-backed Node integration tests passed for scene generation, reasonable edit completion, excessive highlight warning and Finnish language toggle.
- Browser end-to-end/mobile screenshot not possible in this environment because navigation was blocked by browser administrator policy. **Real mobile test remains outstanding.**

## Top issues to test
1. Is the cat/bin discovery genuinely surprising on a phone in normal room lighting? If too obvious, darken while preserving recoverable contrast.
2. Do the new forest shadows look like meaningful detail rather than arbitrary strokes?
3. Does the sticky preview leave enough room for the curve on small phones?
4. Does tone response remain responsive on old phones?
5. Is the live feedback specific enough, without imposing one 'correct' artistic look?
6. The two-point forest curve and scoring heuristics may need tuning.

## Next planned work (not in 0.2)
- Incorporate measured feedback from owner's phone and old phone.
- Improve adaptive review/knowledge modeling: verify understanding before skipping basic concepts, no mindless repetition.
- Test with a few volunteers, potentially family and a small Discord group when quality allows.
- Plan optional Google Drive appDataFolder sync + multi-device conflict resolution after learning UX is validated. Closed-PWA background sync cannot be promised.
- Commercial model and final international brand name intentionally postponed.
