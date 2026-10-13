# Visual Academy / KuvaAkatemia — PROJECT_STATE

## Operatiivinen tilanne — 2026-10-13

**Tila:** 00A Android-kielenvaihdon käyttäjätesti odottaa; 00B korjatun SHA:n riippumaton uusinta-QA odottaa; tuotantojulkaisu NO-GO.  
**Repo:** https://github.com/naatti21/Visual-Academy  
**Tuotanto / main:** `ca5c6ff25d64ac8fd83ca593ec06b342ccf699d1` (julkaistu v0.2.4, ei tämän työpaketin koodimuutoksia).  
**Statuslähteet:** Äppejä-kirjaston yhteinen `00_NOW.md` on sovellusten yleiskuva; tämä olemassa oleva `PROJECT_STATE.md` hoitaa **Visual Academyn repo-kohtaisen NOW-roolin**. Erillistä kilpailevaa `NOW.md`-tiedostoa ei luoda.

### Avoimet hyväksyntäportit

- **00A:** [Draft PR #6](https://github.com/naatti21/Visual-Academy/pull/6), HEAD `a88fe8f5347602bcb243f8c9ae93d4ac7fdb5b56`. Viisi vaihetta, oma AI-generoitu opetuskuva, hyväksytyt crop-koordinaatit ja FI/EN. Androidin `content://`-tilanteessa mahdollisesti epäonnistuneen kielenvaihdon `history.replaceState`-kutsu korjattu. [CI #23](https://github.com/naatti21/Visual-Academy/actions/runs/38381128140): **19/19 Node + 11/11 mobiili-E2E PASS**. **Fyysisen Androidin v2-esikatselun FI/EN-uusintatesti vielä odottaa.** Tämä PR ei ole tuotannon etusivulla eikä integroidun PWA:n offline-navigoinnissa; julkaisulupa puuttuu. [Tekninen handoff](https://github.com/naatti21/Visual-Academy/pull/6#issuecomment-6143206354).
- **00B:** [Draft PR #5](https://github.com/naatti21/Visual-Academy/pull/5), HEAD `c6f8837853d657f615734295c8458164353c3163`. Aiempi [riippumaton NO-GO](https://github.com/naatti21/Visual-Academy/pull/5#issuecomment-6124775239) koski vanhaa SHA:ta ja aktiivisen luonnoksen backup-palautusvikaa. [QA-01–03-korjaus ja CI #18](https://github.com/naatti21/Visual-Academy/pull/5#issuecomment-6125003666) PASS, mutta **uuden SHA:n riippumaton re-QA ei ole vielä tehty eikä julkaisua hyväksytty**.
- 00A ja 00B ovat erillisiä työpaketteja. Älä yhdistä niitä toisiinsa tai `main`-haaraan hiljaisesti; älä muuta käyttäjän jo hyväksymiä lähdekuvarajauksia.

### ONE NEXT ACTION

**SINULTA TARVITAAN:** testaa paikallinen `Visual_Academy_00A_bilingual_v2.html` Androidin latausnäkymässä: FI↔EN kaikissa viidessä vaiheessa, myös vaiheiden 4–5 rajaus- ja palauteosiot. Raportoi toimiko kielenvaihto; Workia ei tarvita.

Erillinen seuraava QA-työ: riippumaton **00B PR #5:n QA-01-backup-palautuksen uusintatarkastus** lukitulle `c6f88378…`-SHA:lle. Tuotanto/Pages ei muutu ilman erillistä GO:ta.

### Tämän tiedoston ylläpito

Jokaisen merkittävän QA-, käyttäjätesti- ja julkaisumuutoksen jälkeen päivitä **vain tämä operatiivinen osio**. Varmista ennen päivitystä PR:n todellinen HEAD, CI ja viimeiset kommentit GitHubista. Tuotteen pysyvä määrittely kuuluu `APP-SPEC.md`:hen ja historia PR-keskusteluihin.

---

## Historiallinen lähtökuva (9.10.2026, ei nykyinen QA-/julkaisutila)

Seuraava alkuperäinen `PROJECT_STATE` kuvaa varhaista v0.2-ehdokasta ja sen silloin tunnettuja testirajoja. Se säilytetään taustatietona; ajankohtaiset tilat ja seuraava askel ovat edellä.

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
