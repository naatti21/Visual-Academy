'use strict';
// Visual Academy 0.2.4 — deliberate review, flexible tonal tasks, persistent drafts. No network calls.
const $ = id => document.getElementById(id);
const W=720,H=405, STORAGE_KEY='visual-academy-proto-02', OLD_KEY='visual-academy-proto-01', VISIBILITY_KEY='visual-academy-display-check-01';
const display=$('scene'),dc=display.getContext('2d',{willReadFrequently:true});
const source=document.createElement('canvas');source.width=W;source.height=H;
const sc=source.getContext('2d',{willReadFrequently:true});
const hist=$('hist'),hc=hist.getContext('2d');
const SVGNS='http://www.w3.org/2000/svg';
const I18N={
 en:{visibilityReminder:'Are the darkest details visible on your screen?',visibilityOpen:'Check display',visibilityDismiss:'Dismiss display check reminder',visibilityHeading:'Display shadow visibility',visibilityIntro:'Look at these patches under your normal viewing conditions. If the darkest steps blend together, try gently increasing your phone brightness. This is a visibility check, not screen calibration.',visibilityStrip:'Six dark gray patches, gradually lighter from left to right',visibilityDark:'Darkest',visibilityLight:'Lightest',visibilityQuestion:'Can you distinguish the patches?',visibilityAll:'All, including the darkest ones',visibilitySome:'Only the lighter ones',visibilityNone:'Only one or two',visibilityGood:'Good starting point. You can return to your picture. This does not guarantee accurate display calibration.',visibilityAdjust:'Try increasing screen brightness a little and check again. Extra dimming, night filters and bright surroundings can also hide shadow detail.',visibilityNote:'This check does not change the exercise image, curve settings, or learning score. Every screen and viewing environment differs.',prototype:'EXPERIMENTAL · V0.2.4',module:'MODULE 01 · LIGHT',lead:'Discover what your edits really do.',tab0:'Hidden details',tab1:'Histogram',tab2:'Forest tones',live:'LIVE PIXEL PREVIEW',hold:'Hold: original',original:'ORIGINAL',histogram:'LIVE HISTOGRAM',before:'Source',after:'Edited',dark:'Shadows',mid:'Midtones',bright:'Highlights',try:'YOUR EXPERIMENT',reset:'↺ Reset curve',hint:'✦ Hint',tapSwitch:'tap to switch',backup:'Export backup',restore:'Import backup',settings:'Settings',close:'Close',settingsDescription:'Your learning progress is saved on this device. Export a backup file or restore it here.',offlineNote:'Google Drive sync is not in this prototype yet. Backups are manual.',why:'Why does this happen?',check:'CHECK YOUR REASONING',continue:'Next lesson',footnote:'A simplified 8-bit luminance experiment. Source objects, clouds and textures are truly in the image pixels. Not a RAW or color-managed editor.',privacy:'Offline-first, no account. Progress is local; use export for a manual backup.',shadow:'Shadow point',middle:'Middle point',high:'Highlight point',axisY:'Output ↑',axisL:'Shadows',axisR:'Lights',metric:'Newly clipped highlights',duration:'YOUR PACE',review:'Assess my edit',reviewAgain:'Assess again',saved:'Saved on this device',resume:'Your previous workspace has been restored.',think:['Explore first','Look at the picture and the histogram. When you are ready, assess your edit. Several solutions can work.'],needReview:'Your explanation is correct. Assess your edit when you are ready to complete the lesson.',notYet:'Try moving the glowing point first.',needBalance:'Your explanation is correct. This edit does not yet meet the technical goal. Adjust the curve and request another assessment.',done:'✓ Completed. You can repeat it anytime.',finished:'All three lessons completed. Repeat them or try the next version when available.',hint0:'Look around the right side of the alley and the bin on the left. Raise shadows just enough to see their outlines. At maximum lift, detail and the night mood may disappear.',hint1:'Watch the gray and teal shapes. Dark pixel values sit at the left of the histogram. A histogram tells you how many pixels have a value, not which objects they form.',hint2:'Reveal tree trunks, bark and rock edges. Then test the smaller highlight dot: pushing it up too far merges distinct clouds into white.',wrong:'Not quite. Read the explanation and test the curve again.',
 scene0:{kicker:'01 · REVEAL',title:'What is hiding in the alley?',goal:'Find a black cat and a trash bin in the real shadow data. Keep the streetlight and nighttime mood under control.',instruction:'Drag the glowing SHADOW point up. Find both objects, then pull it back if the alley looks washed out.',theory:'A dark pixel is not necessarily black. Two nearly black pixels can hold different numerical values. A curve maps each old value to a new one. If a cat and its background have different values, their contrast can grow; if they are truly identical, no tone curve can separate them.',four:'Four questions: What is too dark? What details are stored? What must become clearer? What else becomes lighter?',question:'Why can the cat emerge from the darkness?',answers:['The curve recognizes a cat and adds new pixels.','Existing small tone differences become easier to distinguish.','The app secretly swaps in a brighter drawing.'],correct:1,good:'Exactly. The original pixels already contained those differences; the tone curve only remapped them.',bad:'A curve cannot recognize objects or invent detail missing from the source.'},
 scene1:{kicker:'02 · READ THE DATA',title:'What is the histogram telling you?',goal:'Notice how dark pixels move right when you brighten them. Pay attention to the bright streetlight too.',instruction:'Move the SHADOW point and compare the source bars (gray) with the edited bars (teal).',theory:'A histogram counts how many pixels fall into each tonal interval. It does not tell where those pixels are, and a dark scene is not automatically exposed incorrectly. Here the histogram is recomputed from the actually edited pixels.',four:'Four questions: Where are most pixel values? Which values are preserved? What shifts when shadows rise? Can a histogram judge artistic quality by itself?',question:'What does a big cluster on the left side mean?',answers:['There are many dark pixels.','The image must be incorrectly exposed.','The lightest parts of the picture contain many pixels.'],correct:0,good:'Correct. Left means dark; that alone does not say whether the picture is good or bad.',bad:'The histogram only counts brightness values: dark on the left, bright on the right.'},
 scene2:{kicker:'03 · PROTECT DETAILS',title:'Reveal the forest, keep the clouds',goal:'Show tree trunks and rock textures without washing out the clouds or mountain ridge.',instruction:'Lift the MIDDLE point and study the forest. You MAY adjust the HIGHLIGHT point to protect or explore the sky; moving both is not required.',theory:'The horizontal axis is original brightness and the vertical axis is the new value. A steeper rising curve increases local tone separation; a nearly horizontal segment merges differences; a downward segment reverses tone order. Lifting midtones can reveal the forest, but protect cloud differences from merging into white. Undo restores the source.',four:'Four questions: What is hidden in the forest? Which pixel differences exist? What should emerge? How might the clouds and contrast change?',question:'Why should the bright end of the curve sometimes stay close to the diagonal?',answers:['It protects many highlight differences from being pushed together.','It only changes the trees because they are at the bottom.','The curve can reconstruct clipped cloud details on its own.'],correct:0,good:'Yes. Protecting upper tones preserves separations between clouds and the sky.',bad:'The curve affects tonal values, not specific objects. You can preserve highlights by keeping their mapping under control.'}},
 fi:{visibilityReminder:'Erottuvatko kaikkein tummimmat sävyt näytölläsi?',visibilityOpen:'Tarkista näkyvyys',visibilityDismiss:'Ohita näkyvyysmuistutus',visibilityHeading:'Näytön varjosävyjen näkyvyys',visibilityIntro:'Katso näytteitä tavallisessa katseluympäristössäsi. Jos tummimmat sävyt sulautuvat yhteen, nosta puhelimen kirkkautta hieman. Tämä on näkyvyystesti, ei näytön kalibrointi.',visibilityStrip:'Kuusi harmaasävynäytettä, vasemmalta oikealle vaalenevat',visibilityDark:'Tummin',visibilityLight:'Vaalein',visibilityQuestion:'Erottuvatko sävyt toisistaan?',visibilityAll:'Kyllä, myös tummimmat',visibilitySome:'Vain vaaleammat',visibilityNone:'Vain yksi tai kaksi',visibilityGood:'Hyvä lähtötilanne. Voit jatkaa kuvaan. Tämä ei tarkoita, että näyttö olisi kalibroitu.',visibilityAdjust:'Nosta näytön kirkkautta hieman ja kokeile uudelleen. Myös ylimääräinen himmennys, yötila ja kirkas ympäristö voivat peittää varjojen yksityiskohtia.',visibilityNote:'Tämä tarkistus ei muuta harjoituskuvaa, käyrää tai osaamispisteitä. Näytöt ja katseluolosuhteet ovat erilaisia.',prototype:'KOKEILUVERSIO · V0.2.4',module:'MODUULI 01 · VALO',lead:'Selvitä, miksi kuva muuttuu.',tab0:'Piilotetut muodot',tab1:'Histogrammi',tab2:'Metsän sävyt',live:'PIKSELEISTÄ LASKETTU KUVA',hold:'Pidä: alkuperäinen',original:'ALKUPERÄINEN',histogram:'ELÄVÄ HISTOGRAMMI',before:'Ennen',after:'Jälkeen',dark:'Varjot',mid:'Keskisävyt',bright:'Valot',try:'OMA KOKEILU',reset:'↺ Nollaa käyrä',hint:'✦ Vihje',tapSwitch:'vaihda koskettamalla',backup:'Vie varmuuskopio',restore:'Palauta varmuuskopio',settings:'Asetukset',close:'Sulje',settingsDescription:'Oppimisen edistyminen tallentuu tälle laitteelle. Voit viedä tai palauttaa varmuuskopion täällä.',offlineNote:'Google Drive -synkronointia ei ole vielä tässä versiossa. Varmuuskopiointi on manuaalinen.',why:'Miksi näin tapahtuu?',check:'TARKISTA YMMÄRRYS',continue:'Seuraava harjoitus',footnote:'Yksinkertaistettu 8-bittinen luminanssimalli. Kissa, roskis, pilvet ja tekstuurit ovat aidosti lähtökuvan pikseleissä. Ei RAW- eikä värinhallittu editori.',privacy:'Toimii offline-tilassa ilman tiliä. Edistyminen tallentuu paikallisesti; voit viedä varmuuskopion.',shadow:'Varjopiste',middle:'Keskisävypiste',high:'Valopiste',axisY:'Ulostulo ↑',axisL:'Varjot',axisR:'Valot',metric:'Uutta valoleikkautumista',duration:'OMAAN TAHTIIN',review:'Arvioi muokkaukseni',reviewAgain:'Arvioi uudelleen',saved:'Tallennettu laitteelle',resume:'Edellinen työtilanne palautettu.',think:['Tutki ensin kuvaa','Katso kuvaa ja histogrammia. Pyydä arvio vasta, kun olet valmis. Useampi ratkaisu voi toimia.'],needReview:'Vastaus on oikein. Pyydä muokkauksesi arvio, kun olet valmis.',notYet:'Kokeile ensin siirtää hohtavaa pistettä.',needBalance:'Vastaus on oikein. Muokkaus ei vielä vastaa tehtävän teknistä tavoitetta. Säädä käyrää ja pyydä uusi arvio.',done:'✓ Valmis. Voit kerrata milloin vain.',finished:'Kolme harjoitusta tehty. Voit kerrata niitä tai odottaa seuraavaa versiota.',hint0:'Katso kujan oikealle puolelle ja vasemmalla olevaa roskista. Nosta varjoja sen verran, että reunat näkyvät. Ääripäässä yksityiskohdat ja yöfiilis kärsivät.',hint1:'Seuraa harmaata ja turkoosia jakaumaa. Tummat pikselit ovat vasemmalla. Histogrammi kertoo sävyarvojen määrän, ei esineiden sijaintia.',hint2:'Etsi puunrunkoja ja kallion yksityiskohtia. Kokeile sitten pientä valopistettä: liiallinen nosto yhdistää pilvien sävyt valkoiseksi.',wrong:'Ei aivan. Lue selitys ja tutki käyrää uudelleen.',
 scene0:{kicker:'01 · PALJASTA',title:'Mitä pimeässä kujassa on?',goal:'Löydä musta kissa ja roskis lähtökuvan varjoista. Yritä säilyttää katuvalo ja yöfiilis.',instruction:'Vedä hohtavaa VARJOpistettä ylöspäin. Etsi molemmat kohteet ja peruuta, jos kuja alkaa näyttää haalealta.',theory:'Tumma pikseli ei ole välttämättä täysin musta. Kahdessa lähes mustassa pikselissä voi olla eri lukuarvot. Käyrä muuntaa arvot toisiksi. Jos kissalla ja taustalla on eri arvot, niiden ero voi tulla näkyvämmäksi. Täsmälleen samaan arvoon kadonneita yksityiskohtia ei käyrä palauta.',four:'Neljä kysymystä: Mikä on liian tummaa? Mitä on tallessa? Mitä halutaan nähdä? Mitä muuta kirkastuu?',question:'Miksi kissa voi tulla näkyviin?',answers:['Käyrä tunnistaa kissan ja luo pikseleitä.','Kuvassa olleet pienet sävyerot tulevat helpommin nähtäviksi.','Sovellus vaihtaa salaa kuvan kirkkaampaan piirrokseen.'],correct:1,good:'Oikein. Erot olivat jo lähtökuvan pikseleissä; käyrä vain muutti niitä.',bad:'Käyrä ei tunnista kohteita eikä keksi kuvaan puuttuvaa yksityiskohtaa.'},
 scene1:{kicker:'02 · LUE TIETOA',title:'Mitä histogrammi kertoo?',goal:'Huomaa, miten tummat pikselit siirtyvät oikealle kirkastettaessa. Tarkkaile myös katuvaloa.',instruction:'Liikuta VARJOpistettä ja vertaa lähtökuvaa (harmaa) muokattuun (turkoosi).',theory:'Histogrammi kertoo, kuinka monta pikseliä on kullakin sävyalueella. Se ei kerro, missä pikselit sijaitsevat, eikä tumma kuva automaattisesti ole huono. Tässä jakauma lasketaan uudelleen oikeasti käsitellyistä pikseleistä.',four:'Neljä kysymystä: Missä sävyt ovat? Mitä on tallessa? Mitkä arvot siirtyvät? Voiko histogrammi yksin päättää, onko kuva hyvä?',question:'Mitä suuri kasa histogrammin vasemmassa laidassa tarkoittaa?',answers:['Kuvassa on paljon tummia pikseleitä.','Kuva on varmasti valotettu väärin.','Kuvassa on paljon kirkkaimpia pikseleitä.'],correct:0,good:'Kyllä. Vasemmalla on tummaa, mutta se ei yksin tarkoita huonoa kuvaa.',bad:'Histogrammi laskee vain kirkkausjakaumaa: vasemmalla tumma, oikealla vaalea.'},
 scene2:{kicker:'03 · SÄILYTÄ',title:'Avaa metsää, säästä pilvet',goal:'Tuo puunrungot ja kallion tekstuuri esiin niin, etteivät pilvet tai vuorenhuiput katoa.',instruction:'Nosta KESKIsävypistettä ja katso metsää. Halutessasi voit säätää myös VALOpistettä taivaan tutkimiseen tai suojaamiseen. Molempia ei tarvitse liikuttaa.',theory:'Vaaka-akseli kuvaa alkuperäistä kirkkautta ja pysty-akseli uutta arvoa. Jyrkkä nouseva käyrä erottaa läheisiä sävyjä toisistaan, lähes vaakasuora osuus puristaa niitä yhteen ja laskeva osuus kääntää sävyjärjestyksen. Keskisävyjen nosto voi avata metsää. Pilvien sävyt voivat kadota, jos valoalue pakkautuu valkoiseksi. Kumoa muutos, niin lähtötieto on taas käytettävissä.',four:'Neljä kysymystä: Mitä metsässä piilee? Mitkä sävyerot ovat tallessa? Mitä nostetaan? Mitä tapahtuu pilville ja kontrastille?',question:'Miksi käyrän valopään kannattaa joskus pysyä lähellä diagonaalia?',answers:['Se auttaa säilyttämään kirkkaiden kohtien sävyeroja.','Se muuttaa vain puita, koska ne ovat alhaalla.','Käyrä pystyy luomaan puhkipalaneet pilvet takaisin.'],correct:0,good:'Oikein. Valopään hallinta auttaa säilyttämään pilvien eri sävyt.',bad:'Käyrä muuttaa sävyjä eikä tunnista erillisiä esineitä. Valojen eroja voi suojella niiden säätöä hallitsemalla.'}}
};
let lang='en',lesson=0,lastLesson=0,selected=null,activePoint=0,showOriginal=false,sourceImg=null,editedImg=null,baseBins=null,interactionCount=0,dragPointer=null,dragStart=null,lastStatus='idle';
const progress={complete:[false,false,false],best:[0,0,0],hint:[false,false,false]};
const drafts=[null,null,null]; // One independent unfinished edit per lesson.
let reviewed=false, saveTimer=null, restoredDraft=false;
// Luminance and channel adjustments: modeled in 8-bit luma, preserving original chroma approximately.
const luminance=(r,g,b)=>.2126*r+.7152*g+.0722*b;
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));
// Drafts are small JSON records; the source drawings are deterministic and never stored as images.
function validDraft(input,i){
  if(!input || !Array.isArray(input.y) || input.y.length!== (i===2?2:1))return null;
  if(!input.y.every(v=>typeof v==='number'&&Number.isFinite(v)&&v>=0&&v<=255))return null;
  return {y:input.y,active:input.active===2&&i===2?2:1,
    edits:Number.isSafeInteger(input.edits)?clamp(input.edits,0,1000000):0,
    answer:Number.isInteger(input.answer)&&input.answer>=0&&input.answer<=2?input.answer:null,
    hint:input.hint===true, reviewed:input.reviewed===true};
}
function readStorage(){
  try{
    const now=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');
    const old=JSON.parse(localStorage.getItem(OLD_KEY)||'null');
    if(now){
      lang=now.lang==='fi'?'fi':'en';
      for(let i=0;i<3;i++){
        progress.complete[i]=now.complete?.[i]===true;
        progress.best[i]=clamp(Number(now.best?.[i])||0,0,255);
        progress.hint[i]=now.hint?.[i]===true;
        drafts[i]=validDraft(now.drafts?.[i],i);
      }
      lastLesson=clamp(Number(now.lastLesson)||0,0,2);
    }else if(old){
      lang=old.lang==='fi'?'fi':'en';
      for(let i=0;i<3;i++)progress.complete[i]=old.done?.[i]===true;
    }
  }catch(e){/* Corrupted or disabled storage must not stop learning. */}
}
function captureDraft(){
  drafts[lesson]={y:pts.filter(p=>!p.locked).map(p=>Math.round(p.y*100)/100),
    active:activePoint,edits:interactionCount,answer:selectedAnswer,
    hint:hintShown,reviewed};
}
function writeStorage(){
  try{localStorage.setItem(STORAGE_KEY,JSON.stringify({schema:3,lang,lastLesson:lesson,
    ...progress,drafts,lastSaved:new Date().toISOString()}));}catch(e){/* Quota or disabled storage. */}
}
function saveStorage(){clearTimeout(saveTimer);saveTimer=null;captureDraft();writeStorage();}
function queueSave(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(saveStorage,220);
}
function exportProgress(){
  saveStorage();
  const payload=JSON.stringify({app:'visual-academy',schema:3,lang,
    ...progress,drafts,lastLesson:lesson,exportedAt:new Date().toISOString()},null,2);
  const blob=new Blob([payload],{type:'application/json'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');a.href=url;a.download='visual-academy-progress.json';
  document.body.appendChild(a);a.click();a.remove();
  setTimeout(()=>URL.revokeObjectURL(url),2500);
}
// A voluntary viewability reminder, independent of learning progress and manual backups.
let visibilityDone=false,visibilityDismissed=false,visibilityAnswer=null;
function readVisibilityPrefs(){
  try{
    const p=JSON.parse(localStorage.getItem(VISIBILITY_KEY)||'null');
    visibilityDone=p?.done===true;visibilityDismissed=p?.dismissed===true;
  }catch(e){visibilityDone=false;visibilityDismissed=false;}
}
function writeVisibilityPrefs(){
  try{localStorage.setItem(VISIBILITY_KEY,JSON.stringify({done:visibilityDone,dismissed:visibilityDismissed}));}
  catch(e){/* Blocked storage must not block the lesson. */}
}
function updateVisibilityUI(){
  $('visibilityReminder').hidden=lesson!==0||visibilityDone||visibilityDismissed;
  document.querySelectorAll('[data-visibility]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.visibility===visibilityAnswer)));
  const result=$('visibilityResult');
  result.hidden=!visibilityAnswer;
  result.textContent=visibilityAnswer?(visibilityAnswer==='all'?T().visibilityGood:T().visibilityAdjust):'';
}
function openVisibilityCheck(){
  $('settingsDialog').showModal();
  $('visibilityTest').open=true;
  $('visibilityTest').scrollIntoView({block:'nearest'});
}
function recordVisibility(answer){
  if(!['all','some','none'].includes(answer))return;
  visibilityAnswer=answer;visibilityDone=true;
  writeVisibilityPrefs();updateVisibilityUI();
}
const T=()=>I18N[lang];
function rng(seed){return ()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};}
function poly(c,pts,color){c.fillStyle=color;c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))c.lineTo(p[0],p[1]);c.closePath();c.fill();}
function line(c,pts,color,width=1){c.beginPath();c.moveTo(pts[0][0],pts[0][1]);for(const p of pts.slice(1))c.lineTo(p[0],p[1]);c.strokeStyle=color;c.lineWidth=width;c.stroke();}
function ell(c,x,y,rx,ry,col){c.fillStyle=col;c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);c.fill();}
function drawAlley(){const c=sc,r=rng(168);c.clearRect(0,0,W,H);
  let sky=c.createLinearGradient(0,0,0,405);sky.addColorStop(0,'#435a72');sky.addColorStop(1,'#2a4259');c.fillStyle=sky;c.fillRect(0,0,W,H);
  poly(c,[[0,0],[254,0],[300,270],[0,405]],'#465669');poly(c,[[484,0],[720,0],[720,405],[388,263]],'#4e5b69');poly(c,[[301,255],[387,255],[720,405],[0,405]],'#3e5368');
  // Deliberately varied masonry, windows and pavement. These remain part of the source raster.
  for(let y=27;y<380;y+=23){let xmax=252+y*.14;line(c,[[0,y],[xmax,y]],'#697c8b',2);for(let x=-20+((y/23|0)%2)*26;x<xmax;x+=54)line(c,[[x,y],[x,y+23]],'#617586',1);}
  for(let y=15;y<400;y+=25){let xmin=482-y*.16;line(c,[[xmin,y],[720,y]],'#6c7984',1.3);for(let x=xmin+15;x<720;x+=49)line(c,[[x,y],[x,y+24]],'#586976',1);}
  c.fillStyle='#313f51';c.fillRect(32,72,125,245);c.fillStyle='#80919a';c.fillRect(44,88,101,220);c.fillStyle='#596d80';c.fillRect(50,91,89,215);line(c,[[126,94],[126,308]],'#adb8b1',2);
  for(let k=0;k<47;k++){const x=260+(r()-.5)*350,y=274+r()*120;line(c,[[x,y],[x+15+r()*45,y+2+r()*4]],`rgba(174,186,186,${.15+r()*.38})`,1+r());}
  for(let i=0;i<20;i++){let x=304+i*6;line(c,[[x,262],[x+(x-343)*1.8,405]],'#77828d',.7);}
  // Metal bin, with lid, corrugation, handles, label, scraped paint.
  poly(c,[[140,214],[228,214],[237,339],[151,339]],'#778897');poly(c,[[134,202],[231,202],[237,217],[137,219]],'#9eaeb5');
  poly(c,[[147,225],[226,225],[229,329],[156,329]],'#718799');
  for(let i=0;i<9;i++){let x=158+i*8;line(c,[[x,226],[x+6,329]],i%2?'#8396a4':'#9cabb4',2.2);}
  line(c,[[143,249],[133,249],[130,270]],'#aabac0',5);line(c,[[226,248],[243,248],[244,269]],'#b6bec3',4);
  c.fillStyle='#aab5b9';c.fillRect(163,276,56,26);c.fillStyle='#697d8a';c.fillRect(167,281,49,17);for(let i=0;i<26;i++){c.fillStyle=r()>.5?'#9faeb7':'#566c7e';c.fillRect(145+r()*90,222+r()*112,1+r()*2,1+r()*2);}
  // Black cat — subtle in the initial raster. No second/swap image is used.
  ell(c,495,340,51,18,'#1f2c3d');ell(c,520,327,19,22,'#273548');poly(c,[[507,313],[509,292],[521,307]],'#263343');poly(c,[[523,306],[535,291],[538,318]],'#263343');
  c.strokeStyle='#29384a';c.lineWidth=12;c.lineCap='round';c.beginPath();c.moveTo(454,340);c.bezierCurveTo(433,344,429,316,442,304);c.stroke();c.lineCap='butt';
  ell(c,511,327,2,1,'#607185');ell(c,525,327,2,1,'#607185');for(const x of [478,508])line(c,[[x,348],[x,356]],'#28384a',6);
  // Dampen every shadow-region object, leaving recoverable tiny tonal differences.
  c.fillStyle='rgba(1,7,15,.94)';c.fillRect(0,0,W,H);
  // Real glow and a detailed light fixture drawn AFTER darkening.
  let glow=c.createRadialGradient(347,107,1,347,107,175);glow.addColorStop(0,'rgba(245,198,112,.75)');glow.addColorStop(.12,'rgba(227,181,103,.38)');glow.addColorStop(.42,'rgba(188,140,84,.16)');glow.addColorStop(1,'rgba(187,139,81,0)');c.fillStyle=glow;c.fillRect(160,0,375,325);
  line(c,[[347,0],[347,99]],'#85949d',5);ell(c,347,100,17,8,'#a8a9a4');c.fillStyle='#f3dfa9';c.fillRect(339,104,16,7);c.fillStyle='#d7ad72';c.fillRect(340,110,14,2);
  // Lamp edges are deliberately NOT pure white, so clipping is measurable.
  ell(c,346,105,8,4,'#efe3c7');
  // Tiny window reflections make the brightness range testable.
  c.fillStyle='rgba(177,159,108,.20)';c.fillRect(606,71,26,39);c.fillStyle='rgba(234,200,128,.28)';c.fillRect(610,80,14,18);
}
function drawForest(){const c=sc,r=rng(759);c.clearRect(0,0,W,H);
  let sky=c.createLinearGradient(0,0,0,270);sky.addColorStop(0,'#a9c0d0');sky.addColorStop(.42,'#c9d5da');sky.addColorStop(.75,'#d1dce0');sky.addColorStop(1,'#93adbf');c.fillStyle=sky;c.fillRect(0,0,W,H);
  // Multi-layered actual clouds: shadows, bright rims, wisps.
  function cloud(x,y,s,a){for(let j=0;j<8;j++){let dx=(j-3.5)*s*13,dy=Math.sin(j*1.4)*s*4;ell(c,x+dx,y+dy,30*s,7*s,`rgba(113,139,157,${a*.4})`);}for(let j=0;j<7;j++){let dx=(j-3)*s*16;ell(c,x+dx,y-5*s+Math.cos(j)*s*5,21*s,5*s,`rgba(244,248,241,${a*.6})`);}}
  cloud(220,73,1.45,.7);cloud(505,120,1.7,.72);cloud(390,42,.96,.55);cloud(97,136,1.2,.6);
  for(let j=0;j<78;j++){const x=r()*720,y=28+r()*188,w=8+r()*80;line(c,[[x,y],[x+w,y+(r()-.5)*8]],r()>.47?'rgba(242,244,237,.16)':'rgba(100,135,159,.10)',1+r()*2);}
  let halo=c.createRadialGradient(606,61,2,606,61,142);halo.addColorStop(0,'rgba(255,249,226,.72)');halo.addColorStop(.25,'rgba(252,238,211,.27)');halo.addColorStop(1,'rgba(242,229,192,0)');c.fillStyle=halo;c.fillRect(453,0,267,228);
  // Multiple ridgelines with textured mountain faces; peaks must have non-clipped differences.
  poly(c,[[0,255],[70,210],[115,232],[237,129],[344,247],[412,178],[520,254],[640,164],[720,244],[720,405],[0,405]],'#7794a7');
  poly(c,[[173,201],[237,129],[286,184],[251,177],[234,154],[214,191]],'#c8d2d1');poly(c,[[597,213],[640,164],[683,210],[653,190],[637,176],[616,198]],'#cbd4d0');
  for(let j=0;j<180;j++){const x=r()*720,y=180+r()*95;line(c,[[x,y],[x+(r()-.5)*35,y+4+r()*14]],r()>.5?'rgba(211,219,210,.31)':'rgba(49,80,106,.24)',.5+r());}
  poly(c,[[0,306],[80,249],[160,292],[280,218],[384,310],[499,234],[620,311],[720,241],[720,405],[0,405]],'#507486');
  // Rock face: contours, seams, little individual surfaces.
  poly(c,[[0,340],[71,272],[135,304],[167,360],[116,405],[0,405]],'#62798a');
  for(let i=0;i<68;i++){let x=r()*162,y=288+r()*127;let col=r()>.5?'rgba(199,210,195,.48)':'rgba(35,55,68,.5)';line(c,[[x,y],[x+5+r()*24,y-7-r()*10]],col,.8+r()*1.5);}
  poly(c,[[0,325],[91,296],[210,333],[355,276],[486,334],[620,281],[720,301],[720,405],[0,405]],'#385d66');
  // Real forest: individual trees, branches, needles, trunks and rocks, not 5 flat shades.
  function tree(x,y,s,idx){const h=(92+(idx%5)*15)*s;const trunk='#6a7167';line(c,[[x,y],[x-3*s,y-h]],trunk,5*s);for(let j=0;j<5;j++){let by=y-h*.83+j*h*.14,w=(14+j*5)*s;poly(c,[[x-4*s,by-27*s],[x-w,by+15*s],[x+w,by+15*s]],j%2?'#2a4d56':'#31525a');line(c,[[x,by],[x-w*.7,by+7*s]],'#546b68',1.1*s);line(c,[[x,by],[x+w*.8,by+8*s]],'#668076',1.3*s);}for(let k=0;k<6;k++){const off=(r()-.5)*9;line(c,[[x+off,y-h*.2-k*12*s],[x+off+2,y-h*.2-k*12*s-5]],'rgba(197,197,164,.43)',1*s);}}
  const positions=[];for(let i=0;i<40;i++){const x=(i*71+19)%745-10,y=330+(i*37)%85,s=.49+(i%7)*.14;positions.push([x,y,s,i]);}positions.sort((a,b)=>a[1]-b[1]);for(const p of positions)tree(...p);
  // Soil, twigs, moss and rock marks in foreground.
  for(let i=0;i<450;i++){let x=r()*720,y=321+r()*84;let len=1+r()*13;line(c,[[x,y],[x+len,y+(r()-.5)*6]],r()>.55?'rgba(154,183,165,.32)':'rgba(17,48,48,.60)',.4+r()*.8);}
  for(let i=0;i<28;i++){let x=r()*720,y=353+r()*49,s=2+r()*7;poly(c,[[x-s,y+s],[x,y-s/2],[x+s*1.5,y+s*.8]],'#889789');line(c,[[x-2,y+s],[x+s,y+s*.8]],'#4c6a66',.7);}
  // Darken foreground ONLY. The sky retains detailed (and vulnerable) real pixels.
  let dark=c.createLinearGradient(0,190,0,405);dark.addColorStop(0,'rgba(2,12,17,0)');dark.addColorStop(.35,'rgba(3,12,16,.50)');dark.addColorStop(1,'rgba(0,8,13,.79)');c.fillStyle=dark;c.fillRect(0,190,W,215);
}
function buildSource(){sc.clearRect(0,0,W,H);if(lesson===2)drawForest();else drawAlley();sourceImg=sc.getImageData(0,0,W,H);baseBins=makeBins(sourceImg.data);}
function makeBins(bytes){const bins=new Uint32Array(64);for(let p=0;p<bytes.length;p+=4){let Y=luminance(bytes[p],bytes[p+1],bytes[p+2]);bins[clamp(Math.floor(Y/4),0,63)]++;}return bins;}
// Shape-preserving piecewise cubic interpolation where possible. The source image never changes.
// When pushed beyond another point, a non-monotone curve is allowed: the consequences are visible.
function pointSet(){return lesson===2?[{x:0,y:0,locked:true},{x:108,y:108,key:'middle'},{x:194,y:194,key:'high'},{x:255,y:255,locked:true}]:[{x:0,y:0,locked:true},{x:63,y:63,key:'shadow'},{x:158,y:158,locked:true},{x:255,y:255,locked:true}];}
let pts=pointSet();
function createCurve(points=pts){const xs=points.map(p=>p.x),ys=points.map(p=>p.y),s=[];for(let j=0;j<xs.length-1;j++)s.push((ys[j+1]-ys[j])/(xs[j+1]-xs[j]));const m=[s[0],...s.slice(1).map((_,j)=>{const a=s[j],b=s[j+1];if(a*b<=0)return 0;const h0=xs[j+1]-xs[j],h1=xs[j+2]-xs[j+1],w1=2*h1+h0,w2=h1+2*h0;return (w1+w2)/(w1/a+w2/b);}),s[s.length-1]];return inp=>{let x=clamp(inp,0,255),i=0;while(i<xs.length-2&&x>xs[i+1])i++;let h=xs[i+1]-xs[i],t=(x-xs[i])/h;const a=(2*t*t*t-3*t*t+1)*ys[i],b=(t*t*t-2*t*t+t)*h*m[i],c=(-2*t*t*t+3*t*t)*ys[i+1],d=(t*t*t-t*t)*h*m[i+1];return clamp(a+b+c+d,0,255);};}
function remap(sourceBytes,lut){const out=new Uint8ClampedArray(sourceBytes.length);for(let p=0;p<sourceBytes.length;p+=4){const Y=luminance(sourceBytes[p],sourceBytes[p+1],sourceBytes[p+2]);const difference=lut[clamp(Math.round(Y),0,255)]-Y;out[p]=sourceBytes[p]+difference;out[p+1]=sourceBytes[p+1]+difference;out[p+2]=sourceBytes[p+2]+difference;out[p+3]=sourceBytes[p+3];}return out;}
// A passing grade for lessons about revealing detail must preserve tonal order.
// Solarization / inverted curves remain freely explorable, but are not accepted as this lesson's solution.
function curveIntegrity(curve){
  let reversals=0, longestFlat=0, flat=0;
  let prev=curve(0);
  for(let i=1;i<=255;i++){
    const v=curve(i),diff=v-prev;
    if(diff < -0.12)reversals++;
    if(diff < 0.15){flat++;longestFlat=Math.max(longestFlat,flat);}else flat=0;
    prev=v;
  }
  return {reversals,longestFlat};
}
function statistics(before,after){
  let lift=0,darkCount=0,highClip=0,blackClip=0,skyCount=0,skyShiftSum=0;
  let skyBeforeSum=0,skyAfterSum=0,skyBeforeSq=0,skyAfterSq=0,samples=0;
  const isForest=lesson===2;
  for(let y=0;y<H;y+=3)for(let x=0;x<W;x+=3){
    const p=(y*W+x)*4;
    const a=luminance(before[p],before[p+1],before[p+2]);
    const b=luminance(after[p],after[p+1],after[p+2]);
    samples++;
    if(a<80){darkCount++;lift+=b-a;}
    // Previously distinct image information can disappear at EITHER endpoint.
    if(a<249 && b>=249)highClip++;
    if(a>12 && b<=6)blackClip++;
    if(isForest&&y<184&&a>110){
      skyCount++;skyShiftSum+=Math.abs(b-a);
      skyBeforeSum+=a;skyAfterSum+=b;skyBeforeSq+=a*a;skyAfterSq+=b*b;
    }
  }
  const sb=skyBeforeSum/Math.max(1,skyCount),sa=skyAfterSum/Math.max(1,skyCount);
  const stdBefore=Math.sqrt(Math.max(0,skyBeforeSq/Math.max(1,skyCount)-sb*sb));
  const stdAfter=Math.sqrt(Math.max(0,skyAfterSq/Math.max(1,skyCount)-sa*sa));
  return {
    lift:lift/Math.max(1,darkCount),newClipped:100*highClip/samples,
    newBlack:100*blackClip/samples,
    skyShift:skyShiftSum/Math.max(1,skyCount),
    skyContrast:stdAfter/Math.max(1,stdBefore),
    skyCount
  };
}
function drawHistogram(a,b){hc.clearRect(0,0,hist.width,hist.height);hc.fillStyle='#0f1b29';hc.fillRect(0,0,hist.width,hist.height);const maximum=Math.max(1,...a,...b),bw=hist.width/64;for(let i=0;i<64;i++){const h1=Math.sqrt(a[i]/maximum)*92,h2=Math.sqrt(b[i]/maximum)*92;hc.fillStyle='rgba(159,173,191,.46)';hc.fillRect(i*bw,100-h1,bw-.6,h1);hc.fillStyle='rgba(91,216,205,.72)';hc.fillRect(i*bw+1,100-h2,Math.max(1,bw-2),h2);}}
let currentStats={lift:0,newClipped:0,newBlack:0,skyShift:0,skyContrast:1,reversals:0};
function drawCurve(curve){const path=[];for(let x=0;x<=255;x+=2)path.push(`${path.length?'L':'M'}${(36+x/255*292).toFixed(2)} ${(183-curve(x)/255*173).toFixed(2)}`);path.push(`L328 ${(183-curve(255)/255*173).toFixed(2)}`);$('curveLine').setAttribute('d',path.join(' '));$('handles').replaceChildren();pts.forEach((p,i)=>{if(p.locked)return;const cx=36+p.x/255*292,cy=183-p.y/255*173;if(i===activePoint){const halo=document.createElementNS(SVGNS,'circle');halo.setAttribute('cx',cx);halo.setAttribute('cy',cy);halo.setAttribute('r','15');halo.setAttribute('class','point-halo');$('handles').appendChild(halo);}const dot=document.createElementNS(SVGNS,'circle');dot.setAttribute('cx',cx);dot.setAttribute('cy',cy);dot.setAttribute('r',i===activePoint?'8':'6');dot.setAttribute('class','curve-point'+(i===activePoint?' active':''));dot.dataset.point=i;$('handles').appendChild(dot);});const a=pts[activePoint];$('settingValue').textContent=`${a.x} → ${Math.round(a.y)}`;$('settingLabel').textContent=T()[a.key]+(lesson===2?' · '+T().tapSwitch:'');}
function render(){const curve=createCurve(),lut=Uint8ClampedArray.from({length:256},(_,i)=>Math.round(curve(i)));const arr=remap(sourceImg.data,lut);editedImg=new ImageData(arr,W,H);dc.putImageData(showOriginal?sourceImg:editedImg,0,0);drawHistogram(baseBins,makeBins(arr));drawCurve(curve);currentStats=statistics(sourceImg.data,arr);Object.assign(currentStats,curveIntegrity(curve));showCoaching();}
let pending=false;function requestRender(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;render();});}
// Coach decision uses the observed edited pixels, not simply the control value.
function evaluate(){
  const s=currentStats;
  const tooSubtle=s.lift<(lesson===2?5:7),washed=s.lift>(lesson===2?88:70);
  if(interactionCount===0)return {kind:'idle',pass:false,code:'idle'};
  if(s.reversals>4)return {kind:'warn',pass:false,code:'reversed'};
  if(s.longestFlat>44)return {kind:'warn',pass:false,code:'flat'};
  if(s.newBlack>0.45)return {kind:'warn',pass:false,code:'black'};
  if(s.newClipped>0.45)return {kind:'warn',pass:false,code:'clip'};
  if(lesson===2&&s.skyContrast<0.43)return {kind:'warn',pass:false,code:'sky'};
  if(washed)return {kind:'warn',pass:false,code:'washed'};
  if(tooSubtle)return {kind:'idle',pass:false,code:'subtle'};
  return {kind:'good',pass:true,code:'balanced'};
}
const COACH={en:{idle:['Try a small move','The source is deliberately dark. Explore the curve and watch both the picture and the measured histogram.'],subtle:['Details are still subtle','Raise the relevant tones a little more. The objects and textures are already in the source pixels.'],balanced:['A promising balance','More shadow information is visible while highlight clipping stays under control. Compare with the original and decide whether you like the mood.'],washed:['The picture is losing its mood','The dark tones have been lifted very strongly. Even if you can identify objects, the night / depth can feel flat. Bring the curve back a little.'],reversed:['The curve reverses tonal order','Part of the curve slopes downward: originally brighter pixels can become darker than their neighbors. Explore this creatively if you like, but it does not preserve detail for this lesson.'],flat:['Different tones are merging','A large stretch of the curve is almost horizontal. Details can merge even without becoming pure white or black. Give this tonal range more separation.'],black:['Dark details are being crushed','Some tones that were different in the source now collapse toward black. Raise the lowered part of the curve and compare the image again.'],sky:['Sky detail is changing too much','The clouds and mountain tones have lost much of their original separation or brightness. Try keeping the highlight part closer to the diagonal.'],clip:['Highlight information is merging','The edit has pushed previously distinct tones into nearly white. Check the streetlight or clouds; move the upper part of the curve down.'],metrics:(s)=>`Shadow lift: +${Math.round(s.lift)}/255 · To white: ${s.newClipped.toFixed(2)}% · To black: ${s.newBlack.toFixed(2)}%${s.reversals>0?' · Curve reverses':''}`},fi:{idle:['Kokeile pientä muutosta','Lähtökuva on tarkoituksella tumma. Tutki käyrää ja seuraa sekä kuvaa että oikeista pikseleistä laskettua histogrammia.'],subtle:['Yksityiskohdat erottuvat vielä heikosti','Nosta haluttuja sävyjä hieman lisää. Kohteet ja tekstuurit ovat jo lähtökuvan pikseleissä.'],balanced:['Lupaava tasapaino','Varjoista erottuu enemmän tietoa ilman merkittävää uutta valoleikkautumista. Vertaa alkuperäiseen ja arvioi tunnelmaa itse.'],washed:['Tunnelma alkaa latistua','Tummia sävyjä on nostettu voimakkaasti. Kohteet ehkä erottuvat, mutta yökuvan syvyys kärsii. Peruuta vähän.'],reversed:['Käyrä kääntää sävyjärjestyksen','Osa käyrästä laskee alaspäin: alun perin vaaleampi sävy voi muuttua viereistä sävyä tummemmaksi. Kokeilu on sallittu, mutta se ei säilytä yksityiskohtia tämän tehtävän tavoitteella.'],flat:['Sävyerot puristuvat yhteen','Käyrä kulkee pitkän matkan lähes vaakasuoraan. Yksityiskohdat voivat sulautua yhteen ilman mustaan tai valkoiseen leikkautumista. Anna tälle sävyalueelle enemmän eroa.'],black:['Tummat yksityiskohdat tukkeutuvat','Aiemmin eri sävyisiä kohtia sulautuu lähes mustaksi. Nosta käyrän alas painettua aluetta ja vertaa kuvaa uudelleen.'],sky:['Taivaan yksityiskohtia katoaa','Pilvien ja vuoren sävyerot tai kirkkaus muuttuvat liian voimakkaasti. Kokeile pitää käyrän valoalue lähempänä katkoviivaa.'],clip:['Vaaleiden kohtien sävyt sulautuvat','Muokkaus on vienyt aiemmin erillisiä sävyjä lähes valkoisiksi. Katso katuvaloa tai pilviä; laske käyrän valoaluetta.'],metrics:(s)=>`Varjojen nousu: +${Math.round(s.lift)}/255 · Valkoiseen: ${s.newClipped.toFixed(2)} % · Mustaan: ${s.newBlack.toFixed(2)} %${s.reversals>0?' · Käyrä kääntyy':''}`}};
function showCoaching(){
  const c=$('coach');
  if(!reviewed){
    c.className='coach';
    $('coachTitle').textContent=T().think[0];
    $('coachBody').textContent=T().think[1];
    $('metricLine').textContent='';
    $('reviewBtn').textContent=T().review;
  }else{
    const ev=evaluate(),co=COACH[lang];
    c.className='coach'+(ev.kind==='warn'?' warn':ev.kind==='good'?' good':'');
    $('coachTitle').textContent=co[ev.code][0];
    $('coachBody').textContent=co[ev.code][1];
    $('metricLine').textContent=co.metrics(currentStats);
    $('reviewBtn').textContent=T().reviewAgain;
  }
  updateCompletion();
}
let answeredCorrect=false,selectedAnswer=null,hintShown=false;
function updateCompletion(){
  const f=$('feedback');
  if(!answeredCorrect){
    $('nextBtn').disabled=!progress.complete[lesson];
    return;
  }
  if(!reviewed){
    f.hidden=false;f.className='feedback';f.textContent=T().needReview;
    $('nextBtn').disabled=!progress.complete[lesson];
    return;
  }
  const ev=evaluate();
  f.hidden=false;
  if(ev.pass){
    const newlyCompleted=!progress.complete[lesson];
    progress.complete[lesson]=true;
    progress.best[lesson]=Math.max(progress.best[lesson],Math.round(currentStats.lift));
    if(newlyCompleted)saveStorage();
    f.className='feedback good';
    f.textContent=T()['scene'+lesson].good+' '+T().done;
    refreshTabs();
  }else{
    f.className='feedback';
    f.textContent=(progress.complete[lesson]?T().done+' ':T()['scene'+lesson].good+' ')+T().needBalance;
  }
  $('nextBtn').disabled=!progress.complete[lesson];
}
function answer(i){
  selectedAnswer=i;answeredCorrect=i===T()['scene'+lesson].correct;
  const ans=Array.from($('answers').children);
  ans.forEach((b,j)=>b.classList.toggle('selected',i===j));
  $('feedback').hidden=false;
  if(!answeredCorrect){
    $('feedback').className='feedback bad';
    $('feedback').textContent=T()['scene'+lesson].bad;
  }else updateCompletion();
  saveStorage();
}
function assessEdit(){reviewed=true;render();saveStorage();}
function onCurveChanged(){reviewed=false;$('feedback').hidden=!answeredCorrect;queueSave();requestRender();}
function refreshTabs(){document.querySelectorAll('[data-lesson]').forEach((b,i)=>{b.classList.toggle('active',i===lesson);b.setAttribute('aria-current',i===lesson?'step':'false');$('tick'+i).textContent=progress.complete[i]?'✓':'';});}
function texts(){document.documentElement.lang=lang;document.querySelectorAll('[data-i18n]').forEach(el=>{const val=T()[el.dataset.i18n];if(val!==undefined)el.textContent=val;});$('langSelect').value=lang;document.querySelectorAll('[data-i18n-aria]').forEach(el=>{const value=T()[el.dataset.i18nAria];if(value)el.setAttribute('aria-label',value);});$('settingsBtn').title=T().settings;const l=T()['scene'+lesson];$('lessonKicker').textContent=l.kicker;$('lessonTitle').textContent=l.title;$('lessonGoal').textContent=l.goal;$('instructionText').textContent=l.instruction;$('theoryBody').textContent=(hintShown?T()['hint'+lesson]+' ': '')+l.theory;$('fourQuestions').textContent=l.four;$('questionHeading').textContent=l.question;$('answers').replaceChildren();l.answers.forEach((ans,i)=>{const b=document.createElement('button');b.className='answer'+(i===selectedAnswer?' selected':'');b.type='button';b.textContent=`${'ABC'[i]}. ${ans}`;b.addEventListener('click',()=>answer(i));$('answers').appendChild(b);});$('axisLeft').textContent=T().axisL;$('axisRight').textContent=T().axisR;$('axisY').textContent=T().axisY;$('nextLabel').textContent=lesson===2?T().finished:T().continue;$('resumeNote').textContent=restoredDraft?T().resume:'';updateVisibilityUI();requestRender();}
function changeLesson(i,{reset=false,initial=false}={}){
  if(!initial)saveStorage();
  lesson=i;
  if(reset)drafts[i]=null;
  pts=pointSet();activePoint=1;interactionCount=0;
  answeredCorrect=false;selectedAnswer=null;hintShown=false;reviewed=false;
  restoredDraft=false;showOriginal=false;
  const draft=validDraft(drafts[i],i);
  if(draft){
    pts.filter(p=>!p.locked).forEach((p,j)=>p.y=draft.y[j]);
    activePoint=draft.active;interactionCount=draft.edits;
    selectedAnswer=draft.answer;
    answeredCorrect=selectedAnswer===T()['scene'+i].correct;
    hintShown=draft.hint;reviewed=draft.reviewed;
    restoredDraft=draft.edits>0;
  }
  $('originalBadge').hidden=true;$('theory').open=false;
  $('feedback').hidden=true;$('nextBtn').disabled=!progress.complete[i];
  buildSource();refreshTabs();texts();
  $('resumeNote').textContent=restoredDraft?T().resume:'';
  updateVisibilityUI();saveStorage();
}
function selectPoint(e){const bbox=$('curve').getBoundingClientRect(),cx=(e.clientX-bbox.left)/bbox.width*360,cy=(e.clientY-bbox.top)/bbox.height*213;let dist=Infinity,target=activePoint;pts.forEach((p,i)=>{if(p.locked)return;let px=36+p.x/255*292,py=183-p.y/255*173;const d=Math.hypot(px-cx,py-cy);if(d<dist){dist=d;target=i;}});if(dist<33)activePoint=target;}
function dragCurve(e){const bbox=$('curve').getBoundingClientRect(),sy=(e.clientY-bbox.top)/bbox.height*213;let val=(183-sy)/173*255;pts[activePoint].y=clamp(val,0,255);interactionCount++;onCurveChanged();}
function setLang(l){lang=l;texts();saveStorage();}
$('curve').addEventListener('pointerdown',e=>{dragPointer=e.pointerId;dragStart={x:e.clientX,y:e.clientY};selectPoint(e);$('curve').setPointerCapture(e.pointerId);requestRender();e.preventDefault();});
$('curve').addEventListener('pointermove',e=>{if(e.pointerId===dragPointer&&dragStart&&Math.hypot(e.clientX-dragStart.x,e.clientY-dragStart.y)>4){dragCurve(e);e.preventDefault();}});
for(const typ of ['pointercancel','pointerup','lostpointercapture'])$('curve').addEventListener(typ,()=>{if(dragPointer!==null)saveStorage();dragPointer=null;dragStart=null;});
$('curve').addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();if(e.key==='ArrowLeft'||e.key==='ArrowRight') {if(lesson===2) activePoint=activePoint===1?2:1;}else{pts[activePoint].y=clamp(pts[activePoint].y+(e.key==='ArrowUp'?3:-3),0,255);interactionCount++;onCurveChanged();}if(e.key==='ArrowLeft'||e.key==='ArrowRight')requestRender();});
$('curve').setAttribute('tabindex','0');
$('lessonTabs').addEventListener('click',e=>{const b=e.target.closest('[data-lesson]');if(b)changeLesson(Number(b.dataset.lesson));});
$('resetBtn').addEventListener('click',()=>changeLesson(lesson,{reset:true}));
$('langSelect').addEventListener('change',e=>setLang(e.target.value==='fi'?'fi':'en'));
$('settingsBtn').addEventListener('click',()=>$('settingsDialog').showModal());
$('visibilityOpen').addEventListener('click',openVisibilityCheck);
$('visibilityDismiss').addEventListener('click',()=>{visibilityDismissed=true;writeVisibilityPrefs();updateVisibilityUI();});
$('visibilityChoices').addEventListener('click',e=>{const b=e.target.closest('[data-visibility]');if(b)recordVisibility(b.dataset.visibility);});
$('closeSettings').addEventListener('click',()=>$('settingsDialog').close());
$('settingsDialog').addEventListener('click',e=>{if(e.target===$('settingsDialog'))$('settingsDialog').close();});
$('hintBtn').addEventListener('click',()=>{hintShown=true;progress.hint[lesson]=true;saveStorage();$('theory').open=true;$('theoryBody').textContent=T()['hint'+lesson]+' '+T()['scene'+lesson].theory;});
$('reviewBtn').addEventListener('click',assessEdit);
$('exportBtn').addEventListener('click',exportProgress);
$('importBtn').addEventListener('click',()=>$('importInput').click());
$('importInput').addEventListener('change',async e=>{
  const file=e.target.files?.[0];e.target.value='';if(!file)return;
  try{
    if(file.size>100000)throw Error('size');
    const data=JSON.parse(await file.text());
    if(data.app!=='visual-academy'||![2,3].includes(data.schema)||
      !Array.isArray(data.complete)||data.complete.length!==3)throw Error('format');
    saveStorage(); // Keep unfinished local work before deciding which imported drafts are safe.
    for(let i=0;i<3;i++){
      progress.complete[i]=progress.complete[i]||data.complete[i]===true;
      progress.best[i]=Math.max(progress.best[i],clamp(Number(data.best?.[i]||0),0,255));
      progress.hint[i]=progress.hint[i]||data.hint?.[i]===true;
      // Never silently overwrite an already started local draft.
      if(!drafts[i]||drafts[i].edits===0)
        drafts[i]=validDraft(data.drafts?.[i],i)||drafts[i];
    }
    writeStorage();refreshTabs();
    alert(lang==='fi'?'Edistyminen palautettu. Omia keskeneräisiä muutoksia ei korvattu. Avaa harjoitus uudestaan nähdäksesi palautetun luonnoksen.':'Progress restored. Unfinished local edits were not overwritten. Reopen a lesson to see an imported draft.');
  }catch(err){alert(lang==='fi'?'Tiedosto ei ole kelvollinen edistymisen varmuuskopio.':'That file is not a valid progress backup.');}
});
$('nextBtn').addEventListener('click',()=>{if(!progress.complete[lesson])return;changeLesson(lesson===2?0:lesson+1);window.scrollTo({top:0,behavior:'smooth'});});
$('compareBtn').addEventListener('pointerdown',e=>{showOriginal=true;$('originalBadge').hidden=false;dc.putImageData(sourceImg,0,0);$('compareBtn').setPointerCapture(e.pointerId);e.preventDefault();});
for(const typ of ['pointerup','pointercancel','lostpointercapture'])$('compareBtn').addEventListener(typ,()=>{showOriginal=false;$('originalBadge').hidden=true;if(editedImg)dc.putImageData(editedImg,0,0);});
$('compareBtn').addEventListener('keydown',e=>{if(e.key===' '||e.key==='Enter'){showOriginal=true;$('originalBadge').hidden=false;dc.putImageData(sourceImg,0,0);e.preventDefault();}});
$('compareBtn').addEventListener('keyup',()=>{showOriginal=false;$('originalBadge').hidden=true;if(editedImg)dc.putImageData(editedImg,0,0);});
for(let j=1;j<4;j++){const x=36+j*292/4,y=10+j*173/4;for(const [x1,y1,x2,y2] of [[x,10,x,183],[36,y,328,y]]){const el=document.createElementNS(SVGNS,'line');for(const [k,v] of Object.entries({x1,y1,x2,y2}))el.setAttribute(k,v);el.setAttribute('class','curve-grid');$('curveGrid').appendChild(el);}}
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')saveStorage();});
window.addEventListener('pagehide',saveStorage);
readVisibilityPrefs();readStorage();changeLesson(lastLesson,{initial:true});
if('serviceWorker' in navigator && location.protocol!=='file:')window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(()=>{}));
