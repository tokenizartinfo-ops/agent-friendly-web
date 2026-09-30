import test from 'node:test';
import assert from 'node:assert/strict';

test('updates report dated observations for this origin without inventing scheduled monitoring', async () => {
  const implementation = await import('../lib/dossier-updates.mjs').catch(() => ({}));
  assert.equal(typeof implementation.dossierUpdates, 'function');
  const history = [{ id: 'new', target: 'https://example.com', checkedAt: '2026-09-30T12:00:00Z', methodology: 'v1', score: 60 }, { id: 'old', target: 'https://example.com', checkedAt: '2026-09-29T12:00:00Z', methodology: 'v1', score: 40 }];
  const result = implementation.dossierUpdates({ website: 'https://example.com/about', history, monitoringPreference: 'monthly' });
  assert.equal(result.items[0].delta, 20);
  assert.equal(result.items[0].kind, 'observed_change');
  assert.equal(result.scheduledMonitoring, false);
  assert.equal(implementation.dossierUpdates({ website: 'https://other.example', history }).items.length, 0);
  const mismatch = implementation.dossierUpdates({ website: 'https://example.com', history: [{ ...history[0], methodology: 'v2' }, history[1]] });
  assert.equal(mismatch.items[0].kind, 'observed_snapshot');
  assert.equal(mismatch.items[0].delta, undefined);
});
