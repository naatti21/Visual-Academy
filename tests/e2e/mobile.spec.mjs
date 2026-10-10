import { test, expect } from '@playwright/test';

test('412px mobile opens, reviews deliberately, changes language and restores drafts', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('#lessonTitle')).toContainText('alley');
  await expect(page.locator('#coachTitle')).toHaveText('Explore first');
  await page.locator('[data-lesson="2"]').click();
  await expect(page.locator('#lessonTitle')).toContainText('forest');
  await page.locator('#curve').focus();
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await expect(page.locator('#coachTitle')).toHaveText('Explore first');
  const originalValue = await page.locator('#settingValue').innerText();
  await page.reload();
  await expect(page.locator('#settingValue')).toHaveText(originalValue);
  await expect(page.locator('#resumeNote')).toContainText('restored');
  await page.locator('#reviewBtn').click();
  await expect(page.locator('#coachTitle')).not.toHaveText('Explore first');
  await page.locator('#langSelect').selectOption('fi');
  await expect(page.locator('#reviewBtn')).toContainText('uudelleen');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang','fi');
  await expect(page.locator('#settingValue')).toHaveText(originalValue);
  await expect(page.locator('#lessonTitle')).toContainText('metsää');
  await expect(page.locator('#reviewBtn')).toContainText('uudelleen');
  await expect(page.locator('#scene')).toBeVisible();
  await expect(page.locator('#hist')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 2);
  expect(overflow).toBe(false);
});

test('correct understanding is not erased by further experimentation', async ({page}) => {
  await page.goto('/');
  await page.locator('#langSelect').selectOption('fi');
  await page.locator('#curve').focus();
  for(let i=0;i<15;i++)await page.keyboard.press('ArrowUp');
  await page.locator('#answers .answer').nth(1).click();
  await expect(page.locator('#feedback')).toContainText('Pyydä');
  await page.locator('#reviewBtn').click();
  await page.locator('#curve').focus();
  await page.keyboard.press('ArrowDown');
  await expect(page.locator('#feedback')).toContainText('Pyydä');
  await page.locator('#reviewBtn').click();
  await expect(page.locator('#feedback')).not.toHaveText(/Ei aivan/);
});

test('old progress is preserved and corrupt imports do not wipe local drafts', async ({page}) => {
  await page.addInitScript(()=>localStorage.setItem('visual-academy-proto-02',JSON.stringify({lang:'fi',schema:2,lastLesson:2,complete:[true,false,false],best:[20,0,0],hint:[false,false,false]})));
  await page.goto('/');
  await expect(page.locator('#tick0')).toContainText('✓');
  await page.locator('#curve').focus();
  await page.keyboard.press('ArrowUp');
  const v = await page.locator('#settingValue').innerText();
  await page.locator('#settingsBtn').click();
  await expect(page.locator('#settingsDialog')).toBeVisible();
  page.once('dialog',dialog=>dialog.accept());
  await page.locator('#importInput').setInputFiles({name:'bad.json',mimeType:'application/json',buffer:Buffer.from('{wrong}')});
  await page.waitForTimeout(50);
  await page.reload();
  await expect(page.locator('#tick0')).toContainText('✓');
  await expect(page.locator('#settingValue')).toHaveText(v);
});

test('installed shell remains available offline after initial cache warmup', async ({page,context}) => {
  await page.goto('/');
  await page.evaluate(async()=>{ if('serviceWorker' in navigator) await navigator.serviceWorker.ready; });
  await page.reload();
  await context.setOffline(true);
  await page.reload();
  await expect(page.locator('#lessonTitle')).toBeVisible();
  await context.setOffline(false);
});
