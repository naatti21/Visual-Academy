import {test,expect} from '@playwright/test';

async function finish(page){
 await page.locator('[data-answer="focus"]').first().click();
 await page.locator('[data-next="1"]').click();
 await page.locator('[data-answer="poster"]').first().click();
 await page.locator('[data-next="2"]').click();
 await page.locator('[data-answer="info"]').first().click();
 await page.locator('[data-answer="why"]').first().click();
 await page.locator('[data-next="3"]').click();
 await page.locator('[data-next="4"]').click();
}

test('00A FI/EN: five steps, switches language without losing selections, and keeps v7 crop geometry',async({page})=>{
 const errors=[];page.on('pageerror',error=>errors.push(String(error)));
 await page.goto('/lessons/00a.html?lang=fi');
 await expect(page.locator('html')).toHaveAttribute('lang','fi');
 await expect(page).toHaveTitle('Visual Academy · 00A · Havainnoi ja rajaa');
 await expect(page.locator('h2')).toHaveText('Katso kuvaa rauhassa');
 await finish(page);
 await expect(page.locator('h2')).toHaveText('Mitä kuva kertoo, kun rajaat sen?');
 await page.locator('[data-crop="transit"]').click();
 await expect(page.locator('#cropTag')).toHaveText('Tiedotuskuva');
 expect(await page.locator('#cropPhoto').evaluate(c=>[c.width,c.height])).toEqual([480,1000]);
 const sourceMatches=await page.evaluate(()=>{
  const a=document.getElementById('cropPhoto').getContext('2d').getImageData(73,160,1,1).data;
  const src=document.createElement('canvas');src.width=1536;src.height=1024;
  const ctx=src.getContext('2d');ctx.drawImage(document.getElementById('photo'),0,0);
  const b=ctx.getImageData(73,178,1,1).data;
  return [...a].every((value,index)=>value===b[index]);
 });
 expect(sourceMatches).toBe(true);
 await page.locator('#langSelect').selectOption('en');
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 await expect(page).toHaveTitle('Visual Academy · 00A · Observe and crop');
 await expect(page.locator('h2')).toHaveText('How does cropping change the story?');
 await expect(page.locator('#cropTag')).toHaveText('Information crop');
 await page.locator('[data-crop="art"]').click();
 expect(await page.locator('#cropPhoto').evaluate(c=>[c.width,c.height])).toEqual([390,592]);
 await page.locator('[data-crop="whole"]').click();
 expect(await page.locator('#cropPhoto').evaluate(c=>[c.width,c.height])).toEqual([1536,1024]);
 await expect(page.locator('#cropLegend')).toBeVisible();
 await expect(page.locator('#backLink')).toHaveAttribute('href','../index.html?lang=en');
 expect(errors).toEqual([]);
});

test('00A language selection persists in URL but does not overwrite existing user progress',async({page})=>{
 await page.addInitScript(()=>{
  if(!sessionStorage.getItem('00a-seeded')){
   localStorage.setItem('visual-academy-proto-02',JSON.stringify({schema:3,lang:'fi',complete:[true,false,false],best:[20,0,0],drafts:[null,null,null]}));
   sessionStorage.setItem('00a-seeded','yes');
  }
 });
 await page.goto('/lessons/00a.html');
 await expect(page.locator('html')).toHaveAttribute('lang','fi');
 const before=await page.evaluate(()=>localStorage.getItem('visual-academy-proto-02'));
 await page.locator('#langSelect').selectOption('en');
 await expect(page).toHaveURL(/lang=en/);
 await page.reload();
 await expect(page.locator('html')).toHaveAttribute('lang','en');
 const after=await page.evaluate(()=>localStorage.getItem('visual-academy-proto-02'));
 expect(after).toEqual(before);
});

test('00A mobile: no horizontal overflow, all source assets are local, and zoom works',async({page})=>{
 const remote=[];
 page.on('request',request=>{if(/^https?:/.test(request.url())&&!request.url().startsWith('http://127.0.0.1:4173/'))remote.push(request.url());});
 await page.goto('/lessons/00a.html?lang=en');
 await expect(page.locator('#photo')).toBeVisible();
 await expect(page.locator('#zoom')).toContainText('Zoom');
 await page.locator('#zoom').click();
 await expect(page.locator('#zoom')).toContainText('Reset');
 await page.locator('#reset').click();
 await finish(page);
 for(const variant of ['whole','transit','art']){
  await page.locator(`[data-crop="${variant}"]`).click();
  await expect(page.locator('#cropPhoto')).toBeVisible();
  expect(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2)).toBe(false);
 }
 expect(remote).toEqual([]);
});


// Regression: Android content:// viewers can disallow history.replaceState.
// The language menu must still translate the entire current lesson even when
// the browser denies the URL change with SecurityError.
test('00A language switching survives blocked History.replaceState',async({page})=>{
 const errors=[];
 page.on('pageerror',e=>errors.push(String(e)));
 await page.goto('/lessons/00a.html?lang=en');
 await page.evaluate(()=>{
   History.prototype.replaceState=()=>{throw new DOMException('URL mutation denied','SecurityError');};
 });
 await page.locator('#langSelect').selectOption('fi');
 await expect(page.locator('#langSelect')).toHaveValue('fi');
 await expect(page.locator('html')).toHaveAttribute('lang','fi');
 await expect(page.locator('#heading')).toContainText('Sama kuva');
 await expect(page.locator('h2')).toHaveText('Katso kuvaa rauhassa');
 await expect(page.locator('.progress')).toHaveAttribute('aria-label','Harjoituksen vaiheet');
 await page.locator('[data-answer="focus"]').first().click();
 await page.locator('[data-next="1"]').click();
 await page.locator('#langSelect').selectOption('en');
 await expect(page.locator('h2')).toHaveText('An atmospheric city poster');
 await page.locator('#langSelect').selectOption('fi');
 await expect(page.locator('h2')).toHaveText('Tunnelmallinen kaupunkijuliste');
 await expect(page.locator('[data-answer="poster"]').first()).toHaveAttribute('aria-pressed','false');
 await page.locator('[data-answer="poster"]').first().click();
 await page.locator('[data-next="2"]').click();
 await page.locator('[data-answer="info"]').first().click();
 await page.locator('[data-answer="why"]').first().click();
 await page.locator('[data-next="3"]').click();
 await page.locator('#langSelect').selectOption('en');
 await expect(page.locator('h2')).toHaveText('What changed?');
 await expect(page.locator('#steps')).toContainText('The tram');
 await page.locator('[data-next="4"]').click();
 await page.locator('[data-crop="transit"]').click();
 await page.locator('#langSelect').selectOption('fi');
 await expect(page.locator('h2')).toHaveText('Mitä kuva kertoo, kun rajaat sen?');
 await expect(page.locator('#cropTag')).toHaveText('Tiedotuskuva');
 await expect(page.locator('.crop-switch')).toHaveAttribute('aria-label','Valitse rajaus');
 await expect(page.locator('#cropLegend')).toBeHidden();
 expect(errors).toEqual([]);
});

test('00A all five stages and semantic controls localize in both languages',async({page})=>{
 await page.goto('/lessons/00a.html?lang=en');
 const expected={
  fi:['Katso kuvaa rauhassa','Tunnelmallinen kaupunkijuliste','Sama kuva, eri tehtävä','Mitä muuttui?','Mitä kuva kertoo, kun rajaat sen?'],
  en:['Take a moment to look','An atmospheric city poster','Same image, new purpose','What changed?','How does cropping change the story?']
 };
 for(let step=0;step<5;step++){
  for(const lang of ['fi','en']){
   await page.locator('#langSelect').selectOption(lang);
   await expect(page.locator('html')).toHaveAttribute('lang',lang);
   await expect(page.locator('#langSelect')).toHaveAttribute('aria-label',lang==='fi'?'Kieli':'Language');
   await expect(page.locator('.progress')).toHaveAttribute('aria-label',lang==='fi'?'Harjoituksen vaiheet':'Learning stages');
   await expect(page.locator('#steps h2')).toHaveText(expected[lang][step]);
   if(step===4){
    await expect(page.locator('.crop-switch')).toHaveAttribute('aria-label',lang==='fi'?'Valitse rajaus':'Choose a crop');
    await page.locator('[data-crop="art"]').click();
    await expect(page.locator('#cropTag')).toHaveText(lang==='fi'?'Taiteellinen rajaus':'Artistic crop');
   }
  }
  if(step===0)await page.locator('[data-answer="focus"]').first().click();
  if(step===1)await page.locator('[data-answer="poster"]').first().click();
  if(step===2){await page.locator('[data-answer="info"]').first().click();await page.locator('[data-answer="why"]').first().click();}
  if(step<4)await page.locator(`[data-next="${step+1}"]`).click();
 }
});