# Visual Academy — sovelluskohtainen suunnitelma

**Versio:** suunnitelma 0.2.3 · 10.10.2026  
**Repo:** `naatti21/Visual-Academy`  
**Yhteiset kehityssäännöt:** Äppejä-projektin `APP ENGINEERING PLAYBOOK` (1.4 tai uudempi). Tämä dokumentti kuvaa sovelluskohtaiset opetustavoitteet ja valinnat, ei korvaa playbookia.

## Lopputavoite

Kattava kuvankäsittelyn teoria- ja soveltamiskoulu, jonka käytyään aloittelija pystyy arvioimaan, käsittelemään, viimeistelemään ja julkaisemaan omia valokuviaan *ja ymmärtää mitä tekee ja miksi*. Ei sidota opetusta yhteen ohjelmaan: taidot siirtyvät Lightroomiin, Snapseediin, Darktableen, Photoshopiin jne. Visual Academy ei ole ensisijaisesti yleiskäyttöinen kuvaeditori.

Ydinsisältöön kuuluvat ajan mittaan: histogrammit, sävyt ja käyrät, kontrasti, värioppi ja värien havaitseminen, valkotasapaino, RGB/HSL, rajaus ja sommittelu jälkikäsittelyssä, suoristus ja geometria, maskit, paikalliset säädöt, tasot, retusointi ja kohteiden poisto, kohinanpoisto, terävöitys, RAW-työnkulku, LUT ja värimäärittely sekä julkaisuformaatit. Kuvaustekniikan opetus voi olla erillinen moduuli; hinnoittelua ei lukita.

## Pedagogiikka

- **Kuvan analyysi ennen työkalua.** Tehtävä voi kysyä, mitä käyttäjä havaitsee tai jättäisi tarkoituksella ennalleen.
- **Yksi ilmiö ensin, sitten yhdistäminen.** Harjoituksissa voi olla 1, 2 tai 3 säädettävää käyräpistettä; myöhemmin pisteitä lisätään ja poistetaan vapaasti. Kahden pisteen harjoitus ei pakota liikuttamaan kumpaakin.
- **Käyrän selitys:** vaakasuora osuus puristaa sävyjä yhteen, jyrkkä kasvattaa sävyeroja, laskeva kääntää järjestystä. Myös tarkoitukselliset ylilyönnit ovat sallittua tutkimista; teknisen tavoitteen saavuttamisesta arvioidaan erikseen.
- **Tehtävänanto määrää arviointiperusteet.** Mitataan esimerkiksi leikkautumista, yksityiskohtien erottumista tai rajauksen teknisiä ominaisuuksia. Taiteellista kauneutta ei määritetä yhdellä malliratkaisulla. Epävarmuus kerrotaan.
- **Ei vihreän laatikon metsästystä.** Kuvan ja histogrammin muutos näkyy heti. Käyttäjä pyytää varsinaisen arvioinnin erikseen. Välitön palaute voi olla kuvailevaa, ei ohjata tietyn pistearvon hakemiseen.
- **Opettele → sovella → hallitse.** Kertauksessa voidaan käyttää uutta kuvaa, olosuhdetta tai työkaluyhdistelmää. Taitojen vahvistuminen ja osaamisaukot vaikuttavat seuraaviin tehtäviin. Täsmälleen alkuperäinenkin harjoitus on aina löydettävissä.
- **Aika ei ole pakkoikkuna.** Tarjotaan 3–5 minuutin mikroharjoituksia ja pidempiä tehtäviä, joita voi jatkaa eri päivinä. Ei ajastimen määräämiä epäonnistumisia.

## Kuvamateriaalin eteneminen

1. Hallitut, aidosti pikseleistä lasketut havainnekuvat opettavat yksittäisen ilmiön.
2. Moniväriset, monimutkaisemmat kuvat pakottavat soveltamaan värioppia ja sävyjen vuorovaikutusta.
3. Aidot valokuvat todellisilla ongelmilla.
4. Aidot RAW/DNG-tehtävät, jotka opettavat todellista raakakuvankäsittelyä. Generoitu kuvatiedosto ei ole aidon sensorin RAW-datan vastine, eikä sitä sellaisena esitellä.

## Harjoittelutila / Kuvaklinikka

**Yksi kokonaisuus**, ei erillistä päällekkäistä Kokeile-tilaa ja Kuvaklinikkaa:
- varhain kevyt havainnointitehtävä ilman editorin käyttöä,
- myöhemmin opittujen työkalujen vapaa kokeilu ja oma suunnittelu,
- edistyessä avoimemmat kuvaprojektit ja oma materiaalivalinta.

Vapaa kokeilu ei heikennä jo osoitettua osaamista eikä tee esteitä kurssin etenemiselle. Osaamiskartan avaaminen perustuu näyttöön, ei turhaan pakkotoistoon.

## Soveltavat projektit

Aluksi sama kuva muokataan usealla opitulla työkalulla Academyn sisällä (rajatuin toiminnallisuuksin). Myöhemmin käyttäjä voi analysoida omaa kuvaansa. Vapaaehtoinen kenttätehtävä tehdään oikeassa ulkoisessa kuvankäsittelyohjelmassa. Academy ei saa väittää tuntevansa ulkoisessa editorissa tehtyjä muutoksia ilman todistusaineistoa; itsearviointi ja perustelut ovat olennaisia.

## Tallennus

Työ keskeytyy helposti: harjoituksen versio/kuvavariantti, käyräpisteet, työkalutila, vastaukset, vinkit ja eteneminen tallennetaan paikallisesti. Keskeneräinen tehtävä avataan **samana** tehtävänä ja **samoilla** säädöillä. Jatkossa skeemattu IndexedDB sekä valinnainen käyttäjän oman Google Driven `appDataFolder`-varmuuskopiointi; selkeät konflikti- ja tuontisäännöt. Suljetun PWA:n jatkuvaa synkronointia ei luvata.

## Nykyinen toteutustila 0.2.3 — *testikandidaatti*

- Kolme olemassa olevaa tehtävää, neljä sävysäätöpistettä metsän käyrässä (kaksi lukittua päätepistettä ja kaksi liikkuvaa).
- Todelliseen kuvapikselien luminanssiin perustuva muunnos ja histogrammi; **ei** värinhallittu editori tai RAW-malli.
- Käyrän tutkiminen on jatkuvaa; tekninen arvio pyydetään painikkeella. Useampi tavoitteen mukainen säätö on hyväksyttävissä.
- Kahdesta säädettävästä pisteestä vain toista tarvitsee liikuttaa, kun se riittää tehtävään.
- Harjoituskohtainen paikallinen luonnos palautuu harjoitukseen, sivun uudelleenavaukseen ja välilehtien vaihtoon. Tiedot on sidottu kolmeen nykyiseen harjoitukseen.
- Vanha edistymisdata säilyy; varmuuskopioiden skeemat 2 ja 3 hyväksytään, uudet tiedostot ovat skeemaa 3.
- Kaikkia tulevan oppimispolun ominaisuuksia, Kuvaklinikkaa, 3 liikkuvan pisteen harjoitusta, omaa kuvaa, RAWia tai pilvisynkronointia **ei ole vielä toteutettu**.

## Seuraava kehitysvaihe

1. Käyttäjätestaa 0.2.3:n mobiilissa: arviointirytmi, palautteen laatu, laajemmat oikeat ratkaisut, ääritapausten selitys ja luonnoksen säilyminen.
2. Tee oppimisen mittaamisesta tehtäväperheeseen sidottua; lisää yhden, kahden ja kolmen säädettävän pisteen tehtävät, ei pakollisia ylimääräisiä liikkeitä.
3. Lisää ensimmäinen hallittu värillinen kuvavariantti ja 1–2 muuttuvaa kertauskuvaa.
4. Rakenna pienin mahdollinen havaintoklinikka ilman raskasta editoria ja testaa oppimisarvo.
5. Suunnittele pidempien keskeneräisten kuvaprojektien tallennus erikseen ennen toteutusta.
6. Lisää repo-tason regressiotestit, mobiili-E2E ja Quality gate ennen varsinaista julkaisuporttia playbookin mukaan.

**Vahvistettu tavoite:** käyttäjä ei opettele etsimään oikeaa pistettä tai vihreää merkkiä vaan tekemään omien kuvien muokkauspäätöksiä perustellusti.
