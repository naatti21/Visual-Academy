# Visual Academy — 00A:n integrointisuunnitelma

**Päivä:** 12.10.2026  
**Tila:** hyväksytyn v4-prototyypin pohjalta laadittu toteutussuunnitelma; EI tuotantototeutus eikä julkaisulupa  
**Tuote:** `naatti21/Visual-Academy`  
**Perusta:** Äppejä Playbook v1.9.1; `APP-SPEC.md`; Jakso 00:n suunnitelma ja materiaalipäätös; pedagoginen auditointi 11.10.; 00A-v4:n käyttäjätesti 12.10.  
**Riippuvuus:** nykyinen 00B-PR #5 (kandidaatti `c6f8837853d657f615734295c8458164353c3163`) on edelleen draft / erillistä QA-GO:ta odottava. Tuotannon `main` oli tarkistushetkellä `ca5c6ff25d64ac8fd83ca593ec06b342ccf699d1`, v0.2.4.

## 1. Lukitut tuoteratkaisut

**00A on Jakso 00:n ensimmäinen oppimisharjoitus**, ennen 00B:tä ja nykyistä Jakso 01:n käyrä-/histogrammilaboratoriota. Harjoitus on ohjelmistoriippumaton, mobiili ensin, noin 3–5 minuutin havainnointi- ja päätöstehtävä, ei uusi editori.

00A-v4:n todellisella Lasipalatsin kuvalla käyttäjä hyväksyi **kolmannen rajauksen**: se näyttää ratikan kokonaisuudessaan suurempana. Aiempi samankeskinen "tiukempi zoom" hylättiin; kolmas ratkaisu on **samankokoinen mutta vaakasuunnassa kuvan oikeaan reunaan siirretty rajaus**. Käyttäjän todellinen havainto: ensimmäinen tiukempi rajaus korostaa ratikkaa ja jättää viereisen raiteen pysäkin pois. Tätä palautetta pidetään prototyypin hyväksyntänä, ei kaikkien tulevien käyttäjien oppimistutkimuksena.

Sisältö säilyy v4:n viidessä vaiheessa:
1. Ensihavainto aidosta kuvasta ilman säätimiä.
2. Tunnelmallisen kaupunkijulisteen tavoite.
3. Joukkoliikenteen tiedotuskuvan tavoite ja perustelu.
4. Oman valinnan yhteenveto ilman kauneuspisteytystä.
5. Koko kuva / ratikka esiin / oikeaan reunaan siirretty rajaus, hyötyjen ja menetetyn kontekstin vertailu.

**Rajausmalli lukitaan v4:n käyttäjätestattuun lähtökohtaan**: kaksi rajausvaihtoehtoa molemmat `scale(1.58)` samasta paikallisesta valokuvasta, keskimmäisessä `transform-origin:52% 55%`, viimeisessä `transform-origin:100% 55%` 4:3-kehyksessä. Näytä molempien alueiden rajausoppaat koko kuvassa. Tarkista todellisesta lopullisesta paikallisesta kuvatiedostosta, että rajaus ei leikkaa ratikan tärkeää osaa. Älä muuta rajauskokoa huomaamatta.

**Ei tehdä:** valmiita makuarvosanoja, aina-paras-rajausväitettä, uuden kuvan generointia, 00A:n edistymisen liittämistä vanhojen kolmen kurssin dataindekseihin, uusien backup-skeemojen luontia tai mainin automaattista julkaisua.

## 2. Etusivu ja oppimispolku

**Etusivun näkyvä oppimisjärjestys:**

- `MODULE 00 · LEARN TO SEE / JAKSO 00 · OPETTELE KATSOMAAN` — yksi tiivis erillinen oppimiskortti, jossa kaksi vapaaehtoista alakohtaa.
  - **00A · Observe & decide / Havainnoi ja päätä** — ensisijainen selkeä "Aloita tästä" -toiminto.
  - **00B · Compare edits / Vertaa muokkauksia** — toinen valinnainen toiminto, ei lukita 00A:n suorittamiseen.
- `MODULE 01 · LIGHT / JAKSO 01 · VALO` — kolme olemassa olevaa sävykäyrä-/histogrammitehtävää kuten nyt.

PR #5 tuo jo yhden erillisen 00B-kortin etusivulle. **Laajenna sama kortti 00A+00B-kokonaisuudeksi**, älä lisää toista päällekkäistä Jakso 00 -korttia. Kortti voidaan pitää aloitusnäkymässä ennen aktiivisia sävytehtäviä, mutta vanhoja kolmea välilehteä ei nimetä uudelleen eikä niiden tallennuksen järjestystä muuteta.

00A:n ja 00B:n väliset paluulinkit säilyttävät valitun UI-kielen (`?lang=fi` / `?lang=en`). Etusivun kieli luetaan sovelluksen omasta olemassa olevasta asetuksesta. Uudet harjoitukset eivät kirjoita vanhojen tehtävien `visual-academy-proto-02`-dataa. **00A on tässä vaiheessa tarkoituksella tilaton:** vastaukset elävät vain avoimessa sivussa; uudelleenavaaminen aloittaa alusta. Jos myöhemmin vaaditaan tarkkaa jatkamista, se määritellään erillisessä skeemapäätöksessä.

## 3. Tiedostokohtainen toteutuspaketti

Polut ovat GitHub-repon juuresta. Tämä on **toteutettava muutospaketti, ei väite jo tehdyistä koodimuutoksista**.

| Polku | Toiminto | Sisältö |
|---|---|---|
| `lessons/00a.html` | **LISÄÄ** | Itsenäinen FI/EN-versio hyväksytystä v4:stä, viisi vaihetta, puhelin-zoom/pan, kolmivaihtoehtoinen rajaus, paluu etusivulle. Poista prototyyppitekstit ja verkkokuvan riippuvuus vasta kun offline-kuva on valmis. |
| `assets/00a-lasipalatsi-jip-1280.jpg` | **LISÄÄ vasta kuvaportin jälkeen** | Valitusta Commonsin alkuperäisestä tehty paikallinen noin 1280×960 JPEG. Älä käytä kuvakaappausta tai toista valokuvaa korvikkeena. Pidä yksi yhteinen kuvatiedosto kaikille rajauksille. |
| `docs/00A-IMAGE-SOURCE.md` | **LISÄÄ** | Lähdesivu, tekijä, lisenssi, latauspäivä, alkuperä-/vientimitat, SHA-256, esikatselun tekninen käsittely ja CC BY-SA:n attribuutio sekä muutosmerkintä. |
| `index.html` | **MUUTA** | Muuta PR #5:n Module 00 -kortti kahden harjoituksen kortiksi. 00A ensin, 00B sen jälkeen. Ei vanhojen tehtävien uudelleennumerointia. |
| `app.js` | **MUUTA** | FI/EN-korttitekstit ja 00A-/00B-linkkien kieliparametrit. Säilytä vanhat oppimistilan avaimet, indeksit ja backup-logiikka. |
| `styles.css` | **MUUTA** | Kahden toiminnon mobiilikortti, 360–412 px saavutettavat painikkeet ilman vaakaylivuotoa. Vain vähimmäismuutokset. |
| `sw.js` | **MUUTA** | Uusi välimuistiversio; sisällytä `lessons/00a.html` ja paikallinen valokuva precacheen; 00A:n ja 00B:n navigoinnin offline-fallback **oikealle harjoitussivulle**. |
| `.github/workflows/pages.yml` | **MUUTA** | Kopioi 00A-sivu ja paikallinen kuva Pages-artifaktiin; säilytä nykyinen `main` + SHA + onnistuneen CI:n julkaisuportti. |
| `tests/lesson00a.test.mjs` | **LISÄÄ** | Kuvan paikallisuus, FI/EN-tekstit, 3 rajausvaihtoehtoa, kahden rajauksen yhtäläinen koko ja eri sijainti, lisenssikrediitit, SW/Pages-reitti. |
| `tests/e2e/lesson00a.spec.mjs` | **LISÄÄ** | 5 vaihetta, valinnat ja paluu, FI/EN, aidon kuvan lataus, rajausvaihtojen ero, 360/390/412 px, offline ensi-asennuksen jälkeen, paluu sävytehtäviin ja vanhan datan muuttumattomuus. |
| `APP-SPEC.md` | **MUUTA** | Kirjaa Jakso 00:n pedagoginen järjestys, 00A:n statukset ja tiedon tallentamisen rajaus ilman julkaisuväitettä. |
| `package.json` sekä `index.html`- ja `sw.js`-versiot | **MUUTA julkaisuhaaran synkronoinnin jälkeen** | Versiota ei lyödä lukkoon ennen PR #5:n kohtaloa; uuden PR:n lopullinen SHA, versio ja CI ratkaisevat julkaistavan koosteen. |

**Ennallaan:** nykyiset kolme käyräharjoitusta, niiden oppimistulokset, localStorage-avaimet, skeemat 2/3, backup-tiedostomuoto ja julkaisuportin turvallisuuslogiikka.

## 4. Aito kuvatiedosto, tekijänoikeus ja offline-portti

Lähde: <https://commons.wikimedia.org/wiki/File:Lasipalatsi_tram_stop_at_night.jpg>. Wikimedia Commonsin tiedot tarkistettu 12.10.2026:
- **Tekijä:** JIP.
- **Oma valokuva, 24.3.2016; alkuperäinen 4032×3024 JPEG.**
- **Lisenssi:** Creative Commons Attribution-ShareAlike 4.0 International (<https://creativecommons.org/licenses/by-sa/4.0/>). Lähdesivulla on lisäksi muita ilmoitettuja lisenssivaihtoehtoja; suunniteltuun käyttöön valitaan nimenomaan CC BY-SA 4.0.
- Kreditoi sekä suomeksi että englanniksi: `Photo / Kuva: JIP — Lasipalatsi tram stop at night, Wikimedia Commons, CC BY-SA 4.0. Resized for display; alternative views are crops of the same photo. / Pienennetty näyttöä varten; vertailunäkymät rajaavat samaa kuvaa.` Tekijä- ja lisenssilinkit toimivia.
- **ShareAlike:** jos sovellus jakaa valokuvan muokatun/johdetun version (kuten pienennetyn exportin), ylläpidä soveltuvaa CC BY-SA -lisenssiä sille kuvatiedostolle. Erottele kuvan lisenssi ohjelmakoodin lisenssistä; älä lupaa, että pelkkä linkki täyttäisi kaikki ehdot.

**Hankintaa ei ole vielä vahvistettu.** Tässä ympäristössä Commonsin sivun metatiedot näkyivät, mutta itse JPEG-tiedoston lataus ei onnistunut (verkkoeste). Prototyypin `https://upload.wikimedia.org/...` toimii käyttäjän puhelimella, mutta se ei ole offline-PWA-omaisuus. Ennen toteutus-PR:n viimeistelyä pitää saada oikeat kuvabitit, tarkistaa JPEG-tunniste, kuvasuhde/mitat, värit/taustan näkyvyys, kuvan SHA-256 ja kahden saman kokoisen rajauksen oikea osuminen. Älä vaihda aineistoa generoiduksi tai ota kuvakaappauksesta korviketta. Mikäli lähdettä ei voi hankkia, **00A:n tuotantointegraatio on BLOCKED** eikä sitä esitetä offline-valmiina.

## 5. Kokeet ja hyväksymisportti

**Tekniset:**
1. Todellinen tiedosto latautuu sovelluksen omalta originilta sekä online- että offline-tilassa (myös kieliparametrien kanssa).
2. FI/EN lokalisoivat kaikki tehtävävaiheet, painikkeet, kuvaustekstit, sivuotsikon, saavutettavuustekstit ja lähdekrediitit.
3. Sormizoomaus ja yhden sormen siirto toimivat; koko kuvan tilassa normaali sivuvieritys toimii; näppäimistöllä on vaihtoehtoinen käytettävä ohjaus.
4. Rajausvaihdossa 2 ja 3 kuvakoko ja suurennusaste ovat samat; ero syntyy **sijainnista**. Kolmas rajaus näyttää ratikan kokonaisuudessaan käyttäjätestatun v4:n tapaan. Rajausoppaat vastaavat oikeita näkyviä alueita.
5. 360/390/412 px mobiilinäkymät ja ainakin yksi leveämpi näyttö: ei tahatonta vaakavieritystä, pääkohde luettava.
6. Vanhojen sävytehtävien tabit, luonnokset, palautukset, osaamismerkit ja kielivalinta toimivat ennallaan, eikä 00A:ssa käyminen muuta niitä.
7. CI koko `npm test` vihreä viimeiselle SHA:lle, GitHub Pages paketoi kaikki 00A-tiedostot, **mutta PR:n CI ei yksin ole julkaisuhyväksyntä**.

**Pedagogiset:**
- Aloittelija voi valita perustellusti minkä tahansa kolmesta rajauksesta, myös alkuperäisen. Ei ennaltamäärättyä esteettisesti oikeaa vaihtoehtoa.
- Kysymykset ohjaavat nimeämään yhden hyödyn ja yhden kontekstin menetyksen, sekä vaihtamaan kuvavalintaa käyttötarkoituksen mukaan.
- Tekstit erottavat teknisen tosiasian (näkyvissä olevan kuvan osan ja rajauksen mitat), käyttäjän havainnon ja esteettisen arvostelman.
- Hyväksytty käyttäjän prototyyppikoe on perusteltu signaali, **ei mitattu yleistettävä oppimisvaikutus**. Myöhempään siirtotestiin tarvitaan toinen, entuudestaan tuntematon valokuva.

**Riippumaton julkaisuportti:** käytetään Playbook v1.9.1:n riskiperusteista QA:ta, kohdennettuja selaintestejä ja tarvittaessa yksi rajattu itsenäinen käyttöliittymän/sisällön katselmointi. Workia **ei käynnistetä automaattisesti**. Pysyvästä offline-tiedostosta ja koko harjoituksen julkaistavasta HEAD-SHA:sta on oltava näyttö; muuten NOT RUN / NO-GO. Merge ja mainin deploy vasta erillisellä käyttäjän GO:lla.

## 6. Toteutusjärjestys ja haarastrategia

1. **Nyt:** pidä hyväksytty v4-prototyyppi ja tämä toteutussuunnitelma erillään PR #5:stä. Dokumenttivaiheen PR ei ole 00A:n julkaisu.
2. **Seuraava riippuvuus:** hanki/varmenna oikea Commons-tiedosto ja CC BY-SA -attribuutio; tee paikallinen optimoitu asset. Jos estyy, merkitse BLOCKED ja lopeta eikä korvata kuvaa tekaistulla vastineella.
3. **PR #5 ensin:** kun #5 läpäisee rajatun riippumattoman QA:n ja saa käyttäjän erillisen GO:n, yhdistä se mainiin. Vasta sitten aloita varsinaiset 00A:n koodimuutokset mainista tai synkronoi 00A:n erillinen haara uudelle mainille. Älä tee 00A-feature-PR:stä vahingossa 00B:n committeja sisältävää kaksois-PR:ää.
4. **Sitten toteutus:** `lessons/00a.html` ja asset → etusivun jakso 00 → offline/Pages → regressiot/APP-SPEC → Quality gate viimeiselle commitille → rajattu riippumaton QA → käyttäjän GO → julkaisu.
5. Päivitä `00_NOW.md` vain oikean tilan muutoksista. Ei turhia koko Playbookin uusintaversioita.

## 7. Tunnetut rajat

- Prototyyppi v4 on **suomenkielinen** ja **verkkokuvasta riippuvainen**; FI/EN ja offline ovat tulevan toteutuksen vaatimuksia, eivät nykyisiä todennettuja ominaisuuksia.
- Käyttäjä hyväksyi v4:n ratikkaan osuvan rajauksen puhelimella. Lähdebitin hankinta ja lopullisen optimoidun assetin kuvallinen regressio ovat avoimia.
- PR #5:llä on 17/17 Node + 10/10 mobiili-E2E läpäisty, mutta riippumattoman korjaus-QA:n GO puuttui tämän suunnitelman laadintahetkellä. Ei oikeuta mainin mergeä.
- Aiemmat dokumentit ovat osittain luonnoksia; tässä tehdyt yksilöidyt suunnitteluratkaisut ovat nykyinen toteutuslinja käyttäjän hyväksymään 00A-v4:ään pohjautuen. Ne eivät takautuvasti muuta julkaistua sovellusta.