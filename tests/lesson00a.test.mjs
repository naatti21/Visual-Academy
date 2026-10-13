import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';

const html=readFileSync(new URL('../lessons/00a.html',import.meta.url),'utf8');
const prototype=readFileSync(new URL('../prototypes/00a-v7.html',import.meta.url),'utf8');
const expectedSourceHash='d4854b922b0c3c537bc9a06c928b9f91870c2afbeee351faa0435bc2e0bb3b87';

function sourceHash(text){
 const match=text.match(/<img id="photo"[^>]*src="data:image\/webp;base64,([^"]+)"/);
 assert.ok(match,'A single local WebP must be embedded in the lesson');
 return createHash('sha256').update(Buffer.from(match[1],'base64')).digest('hex');
}

test('00A is the same approved AI-generated source image as v7',()=>{
 assert.equal(sourceHash(html),expectedSourceHash);
 assert.equal(sourceHash(prototype),expectedSourceHash);
});

test('00A uses the exact v7 pixel crop coordinates from a single source of truth',()=>{
 for(const fragment of ['whole:Object.freeze({x:0,y:0,w:1536,h:1024})',
  'transit:Object.freeze({x:0,y:18,w:480,h:1000})',
  'art:Object.freeze({x:1095,y:285,w:390,h:592})'])assert.ok(html.includes(fragment),fragment);
 assert.match(html,/ctx\.drawImage\(photo,box\.x,box\.y,box\.w,box\.h,0,0,box\.w,box\.h\)/);
 assert.match(html,/drawGuides\(ctx,CROP_BOXES\.transit/);
 assert.match(html,/drawGuides\(ctx,CROP_BOXES\.art/);
});

test('00A includes complete Finnish and English structures and no remote image dependency',()=>{
 for(const word of ['Sama kuva – eri tarkoitus','Same image – different purpose',
  'Tiedotuskuva','Information crop','Taiteellinen rajaus','Artistic crop',
  'Kolmannekset ovat apuviiva','rule of thirds is a guide',
  'Tämä on kuvitteellinen','imagined city scene']) assert.ok(html.includes(word),word);
 assert.match(html,/<select id="langSelect"/);
 assert.match(html,/document\.documentElement\.lang=locale/);
 assert.match(html,/history\.replaceState/);
 assert.doesNotMatch(html,/<(?:script|img|link)[^>]*(?:src|href)="https?:\/\//i);
});

test('00A stays isolated from Module 01 progress and backup data',()=>{
 assert.ok(html.includes("const APP_STORAGE='visual-academy-proto-02'"));
 assert.ok(html.includes("localStorage.getItem(APP_STORAGE)"));
 assert.doesNotMatch(html,/localStorage\.setItem|indexedDB\.open|fetch\(/);
});


test('00A language switching cannot fail on a blocked or read-only URL',()=>{
 assert.match(html,/function updateLanguageQuery\(\)/);
 assert.match(html,/location\.protocol!==['"]https:['"]&&location\.protocol!==['"]http:['"]/);
 assert.match(html,/history\.replaceState\(null,''?,?\s*url\)/);
 assert.match(html,/catch\(_error\)/);
 const eventBlock=html.slice(html.indexOf("$('langSelect').addEventListener('change'"),html.indexOf("photo.addEventListener('error'"));
 assert.ok(eventBlock.indexOf('updateLanguageQuery();')<eventBlock.indexOf('chrome();renderStep();'));
 for(const required of ['Harjoituksen vaiheet','Learning stages','Valitse rajaus','Choose a crop'])assert.ok(html.includes(required));
});