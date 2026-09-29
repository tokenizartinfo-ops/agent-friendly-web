import assert from 'node:assert/strict';
import test from 'node:test';
import { createIntakeRehearsal } from '../lib/intake-workspace-rehearsal.mjs';
import { exportScanScope } from '../lib/scan-scope-transfer.mjs';

const path = '/api/projects/demo/scope-reference';
const scopeText = exportScanScope(
  { target: 'https://restaurant.example/menu', checkedAt: '2026-09-29T12:00:00.000Z', evidence: { robots: false } },
  { selected: ['crawl'], reviewed: true, control: 'self' },
);
const request = (transport, body) => transport.request(path, { method: 'POST', body: JSON.stringify(body) });
const input = (extra = {}) => ({ contract: 'afw.scope-reference.v1', confirmSave: true,
  idempotencyKey: crypto.randomUUID(), expectedProjectRevision: 1, expectedReferenceId: null, scopeText, ...extra });

test('local dossier rehearsal saves a reviewed synthetic scope and restores it for fresh review', async () => {
  const transport = createIntakeRehearsal({ versioned: true });
  assert.deepEqual(await (await transport.request(path)).json(), { reference: null });
  assert.equal((await request(transport, input({ confirmSave: false }))).status, 400);
  assert.equal((await request(transport, input({ scopeText: scopeText.replace('restaurant.example', 'other.example') }))).status, 400);
  const first = input();
  const saved = await (await request(transport, first)).json();
  assert.match(saved.reference.id, /^scope-[a-f0-9]{64}$/);
  assert.equal(saved.reference.websiteMatches, true);
  assert.equal(saved.reference.requiresFreshReview, true);
  assert.equal(saved.reference.publicationAuthorized, false);
  assert.deepEqual((await (await request(transport, first)).json()).reference, saved.reference);
  assert.equal((await request(transport, input())).status, 409);
  assert.equal((await (await transport.request(path)).json()).reference.id, saved.reference.id);
  transport.simulateRemoteWebsite();
  assert.equal((await (await transport.request(path)).json()).reference.websiteMatches, false);
  transport.expireSession();
  assert.equal((await transport.request(path)).status, 401);
});
