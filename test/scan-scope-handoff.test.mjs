import assert from 'node:assert/strict';
import test from 'node:test';
import { exportScanScope } from '../lib/scan-scope-transfer.mjs';
import { saveScopeHandoff, takeScopeHandoff, SCOPE_HANDOFF_KEY } from '../lib/scan-scope-handoff.mjs';

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
    removeItem: key => values.delete(key),
  };
}

const text = exportScanScope(
  { target: 'https://restaurant.example/menu', checkedAt: '2026-09-29T12:00:00.000Z', evidence: { robots: false } },
  { selected: ['crawl'], reviewed: true, control: 'self' },
);

test('tab handoff is temporary, consumed once and remains an unverified scope', () => {
  const storage = memoryStorage();
  saveScopeHandoff(storage, text, 1000);
  assert.equal(takeScopeHandoff(storage, 2000), text);
  assert.equal(takeScopeHandoff(storage, 2001), null);
});

test('expired, malformed and oversized handoffs fail closed and are removed', () => {
  const storage = memoryStorage();
  saveScopeHandoff(storage, text, 1000);
  assert.equal(takeScopeHandoff(storage, 1000 + 31 * 60 * 1000), null);
  storage.setItem(SCOPE_HANDOFF_KEY, '{');
  assert.equal(takeScopeHandoff(storage, 1000), null);
  assert.equal(storage.getItem(SCOPE_HANDOFF_KEY), null);
  assert.throws(() => saveScopeHandoff(storage, 'x'.repeat(17000), 1000));
});
