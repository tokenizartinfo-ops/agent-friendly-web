import test from 'node:test';
import assert from 'node:assert/strict';
import { diagnosePublicWafSnapshot } from '../lib/public-waf-snapshot.mjs';

const AT = '2026-10-22T02:00:45.347Z';
function fixture() {
  const rule = {
    action: 'execute',
    action_parameters: { id: 'efb7b8c949ac4650a09736fc376e9aee', overrides: { action: 'block' }, version: 'latest' },
    description: 'Own closed trial',
    enabled: false,
    expression: '(http.host eq "agentfriendlyweb.dev" and http.request.timestamp.sec lt 1792632943)',
    id: 'a7f8805cdc9241d2beed5bb998acaec2',
    last_updated: '2026-10-22T01:31:07.398593Z',
    ref: 'afw_public_read_managed_trial_v1',
    version: '1',
  };
  return {
    entrypoint: {
      description: '', id: 'e69f54927eea4c618415ddcba72d2b54', kind: 'zone',
      last_updated: rule.last_updated, name: 'AFW own closed trial',
      phase: 'http_request_firewall_managed', rules: [rule], source: 'firewall_managed', version: '1',
    },
    catalog: [
      { id: 'efb7b8c949ac4650a09736fc376e9aee', kind: 'managed', phase: 'http_request_firewall_managed', version: '412' },
      { id: '1864f999067c4c279a580ab6fc63158e', kind: 'zone', phase: 'http_request_late_transform', version: '3' },
      { id: 'e69f54927eea4c618415ddcba72d2b54', kind: 'zone', phase: 'http_request_firewall_managed', version: '1' },
    ],
    bots: {
      enable_js: false, sbfm_definitely_automated: 'allow', sbfm_likely_automated: null,
      sbfm_verified_bots: 'allow', sbfm_static_resource_protection: false, ai_bots_protection: 'disabled',
    },
  };
}
function compare(observed = fixture(), expected = fixture(), at = AT) {
  const result = diagnosePublicWafSnapshot(expected, observed, at);
  for (const key of ['mutationAllowed', 'wafEnforcementAccepted', 'operationalReadiness', 'pcOffAccepted']) {
    assert.equal(result[key], false, key);
  }
  return result;
}
function has(result, component, field) {
  return result.issues.some(issue => issue.component === component && issue.field === field);
}

test('equal closed snapshots produce a dated match without mutation authority', () => {
  const result = compare();
  assert.equal(result.snapshotMatches, true);
  assert.equal(result.checked_at, AT);
  assert.deepEqual(result.issues, []);
});
test('property order does not fabricate a difference', () => {
  const o = fixture();
  o.entrypoint.rules[0].action_parameters = { version: 'latest', overrides: { action: 'block' }, id: 'efb7b8c949ac4650a09736fc376e9aee' };
  assert.equal(compare(o).snapshotMatches, true);
});
test('catalog enumeration order is not rule execution order', () => {
  const o = fixture(); o.catalog.reverse();
  assert.equal(compare(o).snapshotMatches, true);
});
test('an enabled own rule is identified by component and field', () => {
  const o = fixture(); o.entrypoint.rules[0].enabled = true;
  const result = compare(o);
  assert.equal(result.snapshotMatches, false);
  assert.ok(has(result, 'entrypoint', 'rules.0.enabled'));
});
test('changed expression and action parameters have separate static field names', () => {
  const o = fixture();
  o.entrypoint.rules[0].expression = 'private value that must not be echoed';
  o.entrypoint.rules[0].action_parameters.overrides.action = 'skip';
  const result = compare(o);
  assert.ok(has(result, 'entrypoint', 'rules.0.expression'));
  assert.ok(has(result, 'entrypoint', 'rules.0.action_parameters'));
  assert.ok(!JSON.stringify(result).includes('private value'));
});
test('unchanged configuration with changed version is still a preflight difference', () => {
  const o = fixture(); o.entrypoint.rules[0].version = '2';
  assert.ok(has(compare(o), 'entrypoint', 'rules.0.version'));
});
test('a containing entrypoint change is retained independently', () => {
  const o = fixture(); o.entrypoint.version = '2';
  assert.ok(has(compare(o), 'entrypoint', 'version'));
});
test('unknown rule fields fail closed without emitting their names or values', () => {
  const o = fixture(); o.entrypoint.rules[0].secret_field = 'DO-NOT-OUTPUT';
  const result = compare(o);
  assert.equal(result.snapshotMatches, false);
  assert.ok(has(result, 'entrypoint', 'schema'));
  assert.ok(!JSON.stringify(result).includes('secret_field'));
  assert.ok(!JSON.stringify(result).includes('DO-NOT-OUTPUT'));
});
test('unknown and false bot values are distinct', () => {
  const expected = fixture(); expected.bots.enable_js = null;
  assert.ok(has(compare(fixture(), expected), 'bots', 'enable_js'));
});
test('a missing bot field is incomplete, never silently false or null', () => {
  const o = fixture(); delete o.bots.enable_js;
  assert.ok(has(compare(o), 'bots', 'schema'));
});
test('catalog version changes are identified without exposing rules from private phases', () => {
  const o = fixture(); o.catalog[1].version = '4';
  const result = compare(o);
  assert.ok(has(result, 'catalog', 'metadata'));
  assert.ok(!JSON.stringify(result).includes('1864f999'));
});
test('catalog membership changes and duplicate IDs are different failures', () => {
  const removed = fixture(); removed.catalog.pop();
  assert.ok(has(compare(removed), 'catalog', 'membership'));
  const duplicate = fixture(); duplicate.catalog.push({ ...duplicate.catalog[0] });
  assert.ok(has(compare(duplicate), 'catalog', 'schema'));
});
test('foreign rule insertion is reported without replacing or ignoring it', () => {
  const o = fixture(); o.entrypoint.rules.push({ ...o.entrypoint.rules[0], id: '11111111111111111111111111111111' });
  assert.ok(has(compare(o), 'entrypoint', 'rules'));
});
test('the expected baseline must be the fixed own closed rule', () => {
  const expected = fixture(); expected.entrypoint.rules[0].enabled = true;
  assert.ok(has(compare(expected, expected), 'expected', 'schema'));
});
test('missing snapshots, unsupported root fields and bad dates fail closed', () => {
  assert.equal(compare(undefined, undefined, 'not-a-date').snapshotMatches, false);
  const o = fixture(); o.privateHeaders = 'DO-NOT-OUTPUT';
  assert.ok(has(compare(o), 'snapshot', 'schema'));
  assert.equal(diagnosePublicWafSnapshot(null, null, AT).snapshotMatches, false);
});
test('accessors and oversized arrays are rejected without reading accessors', () => {
  const o = fixture(); let reads = 0;
  Object.defineProperty(o.bots, 'enable_js', { enumerable: true, get() { reads++; return false; } });
  assert.equal(compare(o).snapshotMatches, false);
  assert.equal(reads, 0);
  const big = fixture(); big.catalog = Array.from({ length: 51 }, () => ({ ...big.catalog[0] }));
  assert.equal(compare(big).snapshotMatches, false);
});
test('receipt owns only safe scalars and does not retain mutable input references', () => {
  const o = fixture(); const result = compare(o);
  o.entrypoint.rules[0].enabled = true;
  o.bots.enable_js = true;
  assert.equal(result.snapshotMatches, true);
  assert.ok(!JSON.stringify(result).includes('action_parameters'));
  assert.ok(!JSON.stringify(result).includes('agentfriendlyweb.dev'));
});

test('calendar-invalid UTC dates never become trusted receipt dates', () => {
  for (const at of ['2026-02-31T02:00:45.347Z', '2026-01-01T24:00:00Z', '2026-02-29T00:00:00Z']) {
    const result = compare(fixture(), fixture(), at);
    assert.equal(result.snapshotMatches, false, at);
    assert.equal(result.checked_at, null, at);
  }
  assert.equal(compare(fixture(), fixture(), '2028-02-29T00:00:00Z').snapshotMatches, true);
});
test('invalid provider timestamps invalidate a baseline even when both inputs agree', () => {
  const expected = fixture();
  expected.entrypoint.last_updated = '2026-02-31T01:31:07.398593Z';
  expected.entrypoint.rules[0].last_updated = expected.entrypoint.last_updated;
  assert.ok(has(compare(structuredClone(expected), expected), 'expected', 'schema'));
});
