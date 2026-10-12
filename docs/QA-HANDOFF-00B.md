# Visual Academy · 00B learning lab — QA handoff

**Status:** PR-only candidate. **NO-GO until independent QA and explicit user approval.**

## Scope
Adds a bilingual FI/EN, opt-in image-comparison exercise based on the previously user-tested 00B-v3 prototype. Three variants share the same AI-generated pixel source; two variants were produced through reproducible pixel edits, not regenerated prompts. The page provides direct two-finger zoom, single-finger pan when zoomed, variant switching with fixed inspection position and optional technical explanation. This is not an automated aesthetic score.

## Explicit exclusions
- No 00A image-reading release yet: the real Commons photograph requires verified offline local asset and attribution QA.
- No change to the original three tone lessons, their internal IDs or local data schema.
- No new AI image generation at runtime, no external image network dependencies in 00B.
- No RAW simulation or claim of sensor-data recovery.
- This PR must not merge or publish automatically.

## Recommended independent QA
1. Verify 00B image variations are the original accepted material (visually compare shelf detail and cloud clipping), image dimensions and identical alignment.
2. At phone width, pinch directly on the image, pan and switch versions repeatedly. Confirm position retention. Confirm page scrolling when fully zoomed out.
3. Compare both language versions, including buttons, explanatory content and labels. Review for misleading absolute claims such as 'varjojen nosto on aina paras'.
4. Verify no edits or draft/backup data change when opening or leaving 00B; reload original lessons.
5. Test installation/update offline: newly installed version can reopen 00B without network, with English and Finnish URL queries.
6. Verify the Pages package includes lessons/00b.html and is published only after current main's Quality gate (not a PR).
7. If a test fails, separate test harness issues, minor UI findings and product bugs.

## GO decision
Record the exact PR head SHA, CI logs, independent QA PASS/FAIL/PARTIAL/NOT RUN, and explicit user GO in the PR thread. Until then the PR remains draft and main must remain untouched.
