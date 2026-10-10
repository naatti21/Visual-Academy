import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const workflow = readFileSync(new URL('../.github/workflows/pages.yml', import.meta.url), 'utf8');

test('Pages publishing only responds to a completed Quality gate', () => {
  assert.match(workflow, /^on:\s*\n\s+workflow_run:/m);
  assert.match(workflow, /workflows:\s*\["Quality gate"\]/);
  assert.match(workflow, /types:\s*\[completed\]/);
  assert.doesNotMatch(workflow, /^\s+push:/m);
  assert.doesNotMatch(workflow, /^\s+pull_request:/m);
  assert.doesNotMatch(workflow, /^\s+workflow_dispatch:/m);
});

test('Release requires a successful push test of the current main commit', () => {
  assert.match(workflow, /workflow_run\.conclusion == 'success'/);
  assert.match(workflow, /workflow_run\.head_branch == 'main'/);
  assert.match(workflow, /workflow_run\.event == 'push'/);
  assert.match(workflow, /workflow_run\.head_repository\.full_name == github\.repository/);
  assert.match(workflow, /TESTED_SHA: \$\{\{ github\.event\.workflow_run\.head_sha \}\}/);
  assert.match(workflow, /MAIN_SHA=.*gh api/);
  assert.match(workflow, /\[\[ "\$TESTED_SHA" != "\$MAIN_SHA" \]\]/);
  assert.match(workflow, /ref: \$\{\{ steps\.green\.outputs\.tested_sha \}\}/);
});

test('Pages artifact includes only PWA runtime and checks SHA again before deploy', () => {
  assert.match(workflow, /cp index\.html app\.js styles\.css sw\.js manifest\.webmanifest site\//);
  assert.match(workflow, /cp icons\/icon-192\.png icons\/icon-512\.png site\/icons\//);
  assert.match(workflow, /uses: actions\/upload-pages-artifact@v3/);
  assert.match(workflow, /path: site/);
  assert.match(workflow, /needs: package/);
  assert.match(workflow, /TESTED_SHA: \$\{\{ needs\.package\.outputs\.tested_sha \}\}/);
  assert.match(workflow, /uses: actions\/deploy-pages@v4/);
});
