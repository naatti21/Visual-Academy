# Test notes — Visual Academy v0.2

Automated static + image computation tests performed in the development environment, 2026-10-09.

- JavaScript syntax: PASS (`node --check app.js`, `node --check sw.js`).
- Generated image source is actual pixel data: PASS. All cat/bin/cloud/rock detail is drawn into source pixels before editing.
- Shadow curve applied to the existing source image: PASS.
- Histogram recalculated from the edited image: implemented and checked in code; live mobile rendering remains to be manually verified.
- Moderate alley lift + correct knowledge answer: PASS.
- Overdriven alley curve: excessive change detected, next lesson disallowed: PASS.
- Histogram lesson can complete with correct answer: PASS.
- Moderate forest midtone edit can complete: PASS.
- High highlight edit in forest produces measurable clipping in cloud sky and gives warning: PASS.
- English/Finnish switch: PASS in integration test.
- Packaging: all relative local assets included, no network font or remote dependencies.

**Not tested:** automated full Chromium browser UI/screenshots. In this environment, browser navigation to local HTTP and file URLs is blocked by administrative policy. A live phone test is required. Do not call it 'fully mobile tested'.
