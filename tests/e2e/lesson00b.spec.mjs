import {test,expect} from '@playwright/test';

test('00B is localized, compares the same scene and preserves inspected position',async({page})=>{
  await page.goto('/');
  await page.locator('#langSelect').selectOption('fi');
  await expect(page.locator('#labLink')).toHaveAttribute('href',/lang=fi$/);
  await page.locator('#labLink').click();
  await expect(page).toHaveURL(/\/lessons\/00b\.html\?lang=fi$/);
  await expect(page.locator('h1')).toContainText('Mitä muutos tuo esiin');
  const photo=page.locator('#photo');
  await expect(photo).toHaveAttribute('src',/^data:image\/webp;base64,/);
  await expect(photo).toHaveJSProperty('complete',true);
  await page.locator('[data-key="general"]').click();
  await expect(page.locator('[data-key="general"]')).toHaveAttribute('aria-pressed','true');
  await page.locator('#zoom').click();
  const transform=await photo.evaluate(el=>el.style.transform);
  expect(transform).toContain('scale(1.8)');
  await page.locator('[data-key="shadows"]').click();
  await expect(page.locator('[data-key="shadows"]')).toHaveAttribute('aria-pressed','true');
  await expect(photo).toHaveAttribute('style',/scale\(1\.8\)/);
  await page.locator('#showHint').click();
  await expect(page.locator('#hint')).toBeVisible();
  await page.locator('#lang00').selectOption('en');
  await expect(page.locator('h1')).toContainText('What does an edit reveal');
  await expect(page.locator('#hint')).toContainText('8-bit');
  await page.locator('#returnLink').click();
  await expect(page.locator('#scene')).toBeVisible();
});

test('00B can open offline after installation without breaking existing progress',async({page,context})=>{
  await page.goto('/');
  await page.evaluate(async()=>{
    if(!('serviceWorker' in navigator))throw Error('service worker required');
    await navigator.serviceWorker.ready;
    if(!navigator.serviceWorker.controller) await new Promise(resolve=>{
      navigator.serviceWorker.addEventListener('controllerchange',resolve,{once:true});
    });
  });
  const before=await page.evaluate(()=>JSON.parse(JSON.parse(localStorage.getItem('visual-academy-proto-02'))));
  await page.goto('/lessons/00b.html?lang=en');
  await expect(page.locator('#photo')).toHaveJSProperty('complete',true);
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('h1')).toContainText('What does an edit reveal');
  await expect(page.locator('#photo')).toHaveJSProperty('complete',true);
  await context.setOffline(false);
  await page.locator('#returnLink').click();
  await expect(page.locator('#scene')).toBeVisible();
  const after=await page.evaluate(()=>localStorage.getItem('visual-academy-proto-02'));
  for(const key of ['complete','best','hint','drafts','lastLesson','lang']) expect(after[key]).toEqual(before[key]);
});
