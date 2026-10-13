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