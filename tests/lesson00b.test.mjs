import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const read=path=>readFileSync(new URL('../'+path,import.meta.url),'utf8');
const html=read('lessons/00b.html');
const home=read('index.html');
const app=read('app.js');
const sw=read('sw.js');
const deploy=read('.github/workflows/pages.yml');
test('00B uses three self-contained variants of one image',()=>{
  const match=html.match(/const images=(\{.*?\});const STRINGS=/s);
  assert.ok(match,'Embedded source images exist');
  const images=JSON.parse(match[1]);
  assert.deepEqual(Object.keys(images).sort(),['general','original','shadows']);
  for(const [key,image] of Object.entries(images)){
    assert.match(image,/^data:image\/webp;base64,/);
    const bytes=Buffer.from(image.split(',')[1],'base64');
    assert.ok(bytes.length>100000,key+' should contain a real image');
    assert.equal(bytes.toString('ascii',0,4),'RIFF','valid WebP header');
  }
  assert.match(html,/AI-generated source image/);
  assert.match(html,/lähtökuva on AI-generoitu/);
});
test('00B translation, comparisons and detailed image inspection remain available',()=>{
  assert.match(html,/function applyLocale\(\)/);
  assert.match(html,/locale=new URLSearchParams/);
  assert.match(html,/const pointers=new Map\(\)/);
  assert.match(html,/startPinch/);
  assert.match(html,/function show\(k\)/);
  assert.match(html,/techni(?:cal|nen)/i);
  assert.match(html,/const STRINGS=/);
  assert.match(home,/id="labLink"/);
  assert.match(app,/labButton:'Avaa kuvavertailu/);
  assert.match(app,/labButton:'Open image comparison/);
});
test('new opt-in lesson has an offline Pages route and leaves original lessons untouched',()=>{
  assert.match(sw,/visual-academy-v025/);
  assert.match(sw,/\.\/lessons\/00b\.html/);
  assert.match(sw,/caches\.match\(dest\)/);
  assert.match(deploy,/cp lessons\/00b\.html site\/lessons\//);
  assert.match(home,/data-lesson="0"/);
  assert.match(home,/data-lesson="1"/);
  assert.match(home,/data-lesson="2"/);
  assert.match(app,/STORAGE_KEY='visual-academy-proto-02'/);
  assert.doesNotMatch(html,/localStorage\.setItem/);
});
