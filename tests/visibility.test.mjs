import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url),'utf8');
const js = readFileSync(new URL('../app.js', import.meta.url),'utf8');
const css = readFileSync(new URL('../styles.css', import.meta.url),'utf8');

test('six fixed grayscale patches are independent of canvas curve adjustments', () => {
  const m = [...html.matchAll(/class="visibility-patch" style="background-color:rgb\((\d+),(\d+),(\d+)\)"/g)];
  assert.equal(m.length,6);
  assert.deepEqual(m.map(x => Number(x[1])),[10,15,21,29,42,64]);
  assert.ok(m.every(x=>x[1]===x[2]&&x[2]===x[3]));
  assert.match(css,/visibility-strip/);
});

test('display checks neither gate exercises nor save brightness or change learning progress', () => {
  assert.match(js,/VISIBILITY_KEY='visual-academy-display-check-01'/);
  assert.match(js,/JSON.stringify\(\{done:visibilityDone,dismissed:visibilityDismissed\}\)/);
  assert.match(js,/visibilityAnswer=answer;visibilityDone=true;/);
  assert.doesNotMatch(js,/brightnessPercentage|screenBrightness/);
  assert.match(js,/readVisibilityPrefs\(\);readStorage\(\);changeLesson/);
});

test('both English and Finnish have visibility check choices and feedback', () => {
  assert.match(js,/visibilityGood:'Good starting point/);
  assert.match(js,/visibilityGood:'Hyvä lähtötilanne/);
  assert.match(js,/visibilityAdjust:'Try increasing screen brightness/);
  assert.match(js,/visibilityAdjust:'Nosta näytön kirkkautta/);
  assert.match(html,/id="visibilityReminder"/);
  assert.match(html,/data-i18n="visibilityQuestion"/);
  assert.match(html,/data-i18n="visibilityNote"/);
});
