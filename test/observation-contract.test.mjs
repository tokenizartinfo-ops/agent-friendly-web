import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';
import { PRIVATE_UI_COPY } from '../lib/private-ui-copy.mjs';

test('owner observation route is explicit, scoped and metadata-only audited', async () => {
  const path = 'app/api/projects/[projectId]/observations/route.ts';
  assert.equal(await stat(path).then(() => true).catch(() => false), true, `${path} must exist`);
  const route = await readFile(path, 'utf8');

  assert.match(route, /getCloudflareAccessUser/);
  assert.match(route, /confirmSave/);
  assert.match(route, /eq\(siteProjects\.id, projectId\)/);
  assert.match(route, /eq\(siteProjects\.userId, (?:user\.userId|userId)\)/);
  assert.match(route, /runPublicAudit/);
  assert.match(route, /sanitizeObservation/);
  assert.match(route, /scanObservations/);
  assert.match(route, /scan_observation_saved/);
  assert.doesNotMatch(route, /body:\s*observation|headers:\s*observation|error:\s*observation/);
});

test('public scanner remains non-persistent and delegates to the shared audit', async () => {
  const route = await readFile('app/api/scan/route.ts', 'utf8');
  assert.match(route, /runPublicAudit/);
  assert.doesNotMatch(route, /getDb|scanObservations|\.insert\(/);
});

test('private workspace explains and explicitly requests saved observations', async () => {
  const source = await readFile('app/components/intake-workspace.tsx', 'utf8');
  assert.equal(PRIVATE_UI_COPY.es.intake.labels.auditSave, 'Auditar y guardar observación');
  assert.match(source, /\/observations/);
  assert.match(source, /confirmSave:\s*true/);
  assert.match(source, /normalmente no guarda/i);
  const autosaveStart = source.indexOf('const timer = window.setTimeout');
  const autosave = source.slice(autosaveStart, source.indexOf('}, 900)', autosaveStart));
  assert.doesNotMatch(autosave, /observations/);
});
