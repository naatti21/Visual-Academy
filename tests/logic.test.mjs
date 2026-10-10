import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const src = readFileSync(new URL('../app.js', import.meta.url), 'utf8');
function extract(name) {
  const start = src.indexOf(`function ${name}(`);
  assert.notEqual(start, -1, `${name} found in production code`);
  const open = src.indexOf('{', start);
  let depth = 0;
  for (let i = open; i < src.length; i++) {
    if (src[i] === '{') depth++;
    if (src[i] === '}' && --depth === 0) return src.slice(start, i + 1);
  }
  throw Error(`Unclosed ${name}`);
}
const helpers = ['validDraft','createCurve','curveIntegrity','evaluate','remap'].map(extract).join('\n');
const ctx = vm.createContext({Uint8ClampedArray, Math, Number});
vm.runInContext(`const clamp = (v,min,max)=>Math.max(min,Math.min(max,v));
const luminance=(r,g,b)=>.2126*r+.7152*g+.0722*b;
${helpers}`, ctx);
const run = expression => vm.runInContext(expression, ctx);

test('identity curve preserves tonal order and end values', () => {
  assert.equal(run(`Math.round(createCurve([{x:0,y:0},{x:108,y:108},{x:194,y:194},{x:255,y:255}])(108))`),108);
  assert.equal(run(`curveIntegrity(createCurve([{x:0,y:0},{x:108,y:108},{x:194,y:194},{x:255,y:255}])).reversals`),0);
});
test('tone reversal is detected instead of passing as detail recovery', () => {
  assert.ok(run(`curveIntegrity(createCurve([{x:0,y:0},{x:108,y:170},{x:194,y:0},{x:255,y:255}])).reversals`) > 4);
});
test('nearly horizontal portions are detected', () => {
  assert.ok(run(`curveIntegrity(createCurve([{x:0,y:0},{x:108,y:180},{x:194,y:180},{x:255,y:255}])).longestFlat`) > 44);
});
test('pixel remapping uses actual source luminance', () => {
  const v = run(`Array.from(remap(new Uint8ClampedArray([40,50,60,255]),Uint8ClampedArray.from({length:256},(_,i)=>Math.min(255,i+20))))`);
  assert.deepEqual(Array.from(v),[60,70,80,255]);
});
test('forest lesson can pass with one midtone adjustment when pixel measures are preserved', () => {
  ctx.lesson=2; ctx.interactionCount=1;
  ctx.currentStats={lift:22,newClipped:0,newBlack:0,skyContrast:.85,reversals:0,longestFlat:0};
  assert.equal(run('evaluate().pass'),true);
  ctx.currentStats={...ctx.currentStats,reversals:20};
  assert.equal(run('evaluate().pass'),false);
  ctx.currentStats={...ctx.currentStats,reversals:0,newClipped:3};
  assert.equal(run('evaluate().pass'),false);
});
test('unfinished drafts reject corrupt or out-of-range inputs', () => {
  assert.equal(run('validDraft({y:[300],edits:1},0)'),null);
  assert.equal(run('validDraft({y:[100]},2)'),null);
  assert.equal(run('validDraft({y:[150,194],active:1,edits:3,answer:0},2).y[0]'),150);
  assert.equal(run('validDraft({y:[150,194],active:2,edits:3,answer:0},2).active'),2);
});
test('review is an explicit user action, not a color target during dragging', () => {
  assert.match(src,/\$\('reviewBtn'\)\.addEventListener\('click',assessEdit\)/);
  assert.match(src,/function onCurveChanged\(\)\{reviewed=false/);
  assert.match(src,/if\(!reviewed\)\{/);
});
test('both teaching languages have the review and resume copy', () => {
  assert.match(src,/review:'Assess my edit'/);
  assert.match(src,/review:'Arvioi muokkaukseni'/);
  assert.match(src,/resume:'Edellinen työtilanne palautettu/);
});
