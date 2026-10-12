import {test,expect} from '@playwright/test';

const key='visual-academy-proto-02';
const backup={
  app:'visual-academy',schema:3,lang:'fi',
  complete:[true,false,false],best:[130,0,0],hint:[false,false,false],
  lastLesson:0,
  drafts:[{y:[130],active:1,edits:9,answer:1,hint:false,reviewed:true},null,null]
};
const stored=page=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
async function restore(page,payload){
  await page.locator('#settingsBtn').click();
  const notice=page.waitForEvent('dialog');
  await page.locator('#importInput').setInputFiles({
    name:'valid-backup.json',mimeType:'application/json',
    buffer:Buffer.from(JSON.stringify(payload))
  });
  const dialog=await notice;
  expect(dialog.message()).toContain('restored');
  await dialog.accept();
  await page.locator('#closeSettings').click();
}

test('QA-01: valid import survives reload for the active untouched lesson',async({page})=>{
  await page.goto('/');
  const before=await stored(page);
  expect(before.drafts[0].edits).toBe(0);
  await restore(page,backup);
  const after=await stored(page);
  expect(after.complete[0]).toBe(true);
  expect(after.drafts[0]).toEqual(backup.drafts[0]);
  await expect(page.locator('#settingValue')).toContainText('130');
  await page.reload();
  await expect(page.locator('#settingValue')).toContainText('130');
  expect((await stored(page)).drafts[0]).toEqual(backup.drafts[0]);
  await page.locator('[data-lesson="1"]').click();
  await page.locator('[data-lesson="0"]').click();
  await expect(page.locator('#settingValue')).toContainText('130');
  expect((await stored(page)).drafts[0]).toEqual(backup.drafts[0]);
});

test('QA-01: started local draft is never overwritten; other imported drafts survive switches and reload',async({page})=>{
  await page.goto('/');
  await page.locator('#curve').focus();
  for(let i=0;i<4;i++)await page.keyboard.press('ArrowUp');
  const local=await stored(page);
  const original=local.drafts[0];
  expect(original.edits).toBeGreaterThan(0);
  const incoming={
    ...backup,
    drafts:[backup.drafts[0],{y:[116],active:1,edits:5,answer:0,hint:false,reviewed:true},null]
  };
  await restore(page,incoming);
  expect((await stored(page)).drafts[0]).toEqual(original);
  await page.locator('[data-lesson="1"]').click();
  await expect(page.locator('#settingValue')).toContainText('116');
  await page.reload();
  await expect(page.locator('#settingValue')).toContainText('116');
  await page.locator('[data-lesson="0"]').click();
  expect((await stored(page)).drafts[0]).toEqual(original);
  await page.reload();
  expect((await stored(page)).drafts[0]).toEqual(original);
});
