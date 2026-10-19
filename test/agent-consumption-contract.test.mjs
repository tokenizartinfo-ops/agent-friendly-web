import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

async function loadIfPresent(path) {
  const url = new URL(path, import.meta.url);
  return existsSync(url) ? import(url.href) : {};
}
const C = await loadIfPresent('../lib/agent-consumption-catalog.mjs');
const Q = await loadIfPresent('../lib/agent-consumption-quote.mjs');
const P = await loadIfPresent('../lib/agent-consumption-continuity.mjs');
const NOW = Date.parse('2026-10-19T13:00:00.000Z');
const time = offset => new Date(NOW + offset).toISOString();
const closed = result => {
  assert.equal(result?.executionAllowed, false);
  assert.equal(result?.chargeAllowed, false);
  assert.equal(result?.publicationAllowed, false);
};
const catalog = () => ({
  revision: 'fixture-catalog-1',
  entries: [{
    operationId: 'afw.capsule.prepare', contractVersion: '1', purpose: 'Prepare a synthetic reviewable package.',
    effect: 'prepare', availability: 'verified_runtime', pricingState: 'quoted', unit: 'site_task',
    verification: { contractVersion: '1', deploymentRef: 'fixture-not-deployed', observedAt: time(-1000), expiresAt: time(60000) },
  }],
});
const request = () => ({
  operationId: 'afw.capsule.prepare', contractVersion: '1', serviceMode: 'agentic', scopeRef: 'fixture-scope',
  scopeRevision: 3, units: 3, catalogRevision: 'fixture-catalog-1', maxTotalMinor: 1000,
});
const policy = () => ({
  revision: 'fixture-price-not-commercial', status: 'approved', validFrom: time(-10000), validUntil: time(120000),
  currency: 'USD', minorUnitExponent: 2,
  lines: [{ operationId: 'afw.capsule.prepare', contractVersion: '1', serviceMode: 'agentic',
    catalogRevision: 'fixture-catalog-1', unit: 'site_task', maxUnits: 10, unitMinor: 25, fixedMinor: 10 }],
});
const view = () => ({
  projectRef: 'fixture-project', revision: 3, observedAt: time(-1000), expiresAt: time(60000),
  nextStep: { id: 'review-source', kind: 'review', label: 'Revisá la fuente', reason: 'Confirmar el alcance.' },
  missingInput: { key: 'audience', label: '¿A quiénes ayudas?' }, evidenceRefs: ['fixture-evidence'], capsuleRef: null,
});
const context = () => ({
  authorized: true, principalRef: 'fixture-principal', projectRef: 'fixture-project', expectedRevision: 3, grantExpiresAt: time(120000),
});
const describe = input => C.describeAgentCatalog?.(input, { now: NOW });
const quote = (r = request(), p = policy(), c = catalog()) => Q.previewAgentQuote?.(r, { catalog: c, policy: p, now: NOW });
const next = (v = view(), c = context()) => P.projectAgentNextStep?.(v, c, { now: NOW });

test('agent catalog returns bounded metadata without granting execution', () => {
  const result = describe(catalog());
  assert.equal(result?.status, 'ok'); closed(result);
  assert.equal(result.operations[0].availability, 'verified_runtime');
  assert.equal(result.operations[0].verification.deploymentRef, 'fixture-not-deployed');
});
test('agent catalog does not promote source-only capability from a fresh fixture', () => {
  const c = catalog(); c.entries[0].availability = 'source_only';
  const result = describe(c);
  assert.equal(result?.operations?.[0]?.availability, 'source_only'); closed(result);
});
for (const scenario of ['absent', 'expired', 'future', 'wrong-version']) {
  test('agent catalog downgrades unverified runtime: ' + scenario, () => {
    const c = catalog(), entry = c.entries[0];
    if (scenario === 'absent') entry.verification = null;
    if (scenario === 'expired') entry.verification.expiresAt = time(0);
    if (scenario === 'future') entry.verification.observedAt = time(1);
    if (scenario === 'wrong-version') entry.verification.contractVersion = '2';
    const result = describe(c);
    assert.equal(result?.operations?.[0]?.availability, 'temporarily_unavailable'); closed(result);
  });
}
test('agent catalog rejects duplicate operations and excessive entries', () => {
  const c = catalog(); c.entries.push({ ...c.entries[0] });
  assert.equal(describe(c)?.code, 'invalid_catalog');
  c.entries = Array.from({ length: 33 }, () => catalog().entries[0]);
  assert.equal(describe(c)?.code, 'invalid_catalog');
});
test('agent catalog rejects unknown fields and accessors without invoking them', () => {
  const c = catalog(); c.entries[0].ownerSecret = 'DO_NOT_ECHO';
  const invalid = describe(c);
  assert.equal(invalid?.code, 'invalid_catalog'); assert.equal(JSON.stringify(invalid).includes('DO_NOT_ECHO'), false);
  let reads = 0;
  Object.defineProperty(catalog().entries[0], 'purpose', { get() { reads++; return 'bad'; } });
  const withGetter = catalog();
  Object.defineProperty(withGetter.entries[0], 'purpose', { get() { reads++; return 'bad'; } });
  assert.equal(describe(withGetter)?.code, 'invalid_catalog'); assert.equal(reads, 0);
});
test('agent quote calculates exact synthetic minor units and stays indicative', () => {
  const result = quote();
  assert.equal(result?.status, 'quoted_preview'); closed(result);
  assert.equal(result.totalMinor, 85); assert.equal(result.currency, 'USD'); assert.equal(result.minorUnitExponent, 2);
  assert.deepEqual(result.lines.map(x => x.totalMinor), [10, 75]);
  assert.equal(result.validUntil, time(60000)); assert.equal(result.policyRevision, 'fixture-price-not-commercial');
});
test('agent quote scope is deterministic across key order and changes with scope revision', () => {
  const r = request();
  const first = quote(r), reordered = quote(Object.fromEntries(Object.entries(r).reverse()));
  assert.match(first?.scopeHash ?? '', /^[a-f0-9]{64}$/);
  assert.equal(first.scopeHash, reordered?.scopeHash);
  assert.notEqual(first.scopeHash, quote({ ...r, scopeRevision: 4 })?.scopeHash);
});
test('agent quote has no implicit price when policy or price approval is absent', () => {
  for (const p of [null, { ...policy(), status: 'draft' }, { ...policy(), validUntil: time(0) }]) {
    const result = quote(request(), p);
    assert.equal(result?.code, 'pricing_unavailable'); assert.equal(result.totalMinor, null); closed(result);
  }
});
test('agent quote honors unpriced catalog regardless of a policy fixture', () => {
  const c = catalog(); c.entries[0].pricingState = 'unpriced';
  assert.equal(quote(request(), policy(), c)?.code, 'pricing_unavailable');
});
test('agent quote zero requires explicitly free declared scope', () => {
  const p = policy(); p.lines[0].unitMinor = 0; p.lines[0].fixedMinor = 0;
  assert.equal(quote(request(), p)?.code, 'policy_invalid');
  const c = catalog(); c.entries[0].pricingState = 'explicitly_free';
  const result = quote(request(), p, c);
  assert.equal(result?.status, 'quoted_preview'); assert.equal(result.totalMinor, 0); closed(result);
});
test('agent quote explains a different accompanied scope through separate trusted pricing', () => {
  const p = policy(); p.lines[0].serviceMode = 'accompanied'; p.lines[0].fixedMinor = 110;
  const result = quote({ ...request(), serviceMode: 'accompanied' }, p);
  assert.equal(result?.totalMinor, 185); closed(result);
  assert.equal(quote(request(), p)?.code, 'pricing_unavailable');
});
test('agent quote rejects changed catalog, unavailable runtime and mismatched unit', () => {
  assert.equal(quote({ ...request(), catalogRevision: 'old' })?.code, 'catalog_conflict');
  const c = catalog(); c.entries[0].verification.expiresAt = time(0);
  assert.equal(quote(request(), policy(), c)?.code, 'operation_unavailable');
  const p = policy(); p.lines[0].unit = 'other_unit';
  assert.equal(quote(request(), p)?.code, 'policy_invalid');
});
test('agent quote rejects fractional, negative or excessive quantities', () => {
  for (const units of [0, -1, 1.5, 1000001]) assert.equal(quote({ ...request(), units })?.code, 'invalid_request');
  assert.equal(quote({ ...request(), units: 11 })?.code, 'scope_limit');
});
test('agent quote rejects unsafe money, unsupported shape and overflow', () => {
  for (const amount of [-1, 0.5, Number.MAX_SAFE_INTEGER + 1]) {
    const p = policy(); p.lines[0].unitMinor = amount;
    assert.equal(quote(request(), p)?.code, 'policy_invalid');
  }
  const p = policy(); p.lines[0].unitMinor = Number.MAX_SAFE_INTEGER;
  assert.equal(quote(request(), p)?.code, 'policy_invalid');
  assert.equal(quote({ ...request(), unitMinor: 0 })?.code, 'invalid_request');
  assert.equal(quote({ ...request(), action: 'publish' })?.code, 'invalid_request');
});
test('agent quote does not exceed declarative budget or renew expired evidence', () => {
  const result = quote({ ...request(), maxTotalMinor: 84 });
  assert.equal(result?.code, 'budget_exceeded'); assert.equal(result.totalMinor, null); closed(result);
  const c = catalog(); c.entries[0].verification.observedAt = time(1);
  assert.equal(quote(request(), policy(), c)?.code, 'operation_unavailable');
});
test('agent quote preserves configured non-two-decimal currency exponent', () => {
  const p = policy(); p.currency = 'JPY'; p.minorUnitExponent = 0;
  const result = quote(request(), p);
  assert.equal(result?.minorUnitExponent, 0); assert.equal(result.currency, 'JPY');
});
test('agent quote rejects sparse or duplicate price rows and extra policy fields', () => {
  const p = policy(); p.lines.push({ ...p.lines[0] });
  assert.equal(quote(request(), p)?.code, 'policy_invalid');
  const sparse = policy(); sparse.lines = Array(1);
  assert.equal(quote(request(), sparse)?.code, 'policy_invalid');
  assert.equal(quote(request(), { ...policy(), approvePublication: true })?.code, 'policy_invalid');
});
test('agent continuity projects one useful step and evidence without principal or grant', () => {
  const result = next();
  assert.equal(result?.status, 'ok'); closed(result);
  assert.equal(result.projectRef, 'fixture-project'); assert.equal(result.nextStep.kind, 'review');
  assert.equal(result.missingInput.key, 'audience'); assert.deepEqual(result.evidenceRefs, ['fixture-evidence']);
  assert.equal(result.principalRef, undefined); assert.equal(result.grantExpiresAt, undefined);
});
test('agent continuity denies foreign, missing, revoked and expired contexts', () => {
  for (const c of [null, { ...context(), authorized: false }, { ...context(), grantExpiresAt: time(0) }]) {
    const result = next(view(), c);
    assert.equal(result?.code, 'access_denied'); assert.equal(result.nextStep, undefined); closed(result);
  }
  assert.equal(next({ ...view(), projectRef: 'foreign-project' })?.code, 'access_denied');
});
test('agent continuity denies mismatched revision and stale or future snapshots', () => {
  assert.equal(next(view(), { ...context(), expectedRevision: 4 })?.code, 'revision_conflict');
  assert.equal(next({ ...view(), expiresAt: time(0) })?.code, 'source_expired');
  assert.equal(next({ ...view(), observedAt: time(1) })?.code, 'state_unconfirmed');
});
test('agent continuity never copies whole answers or unsupported execution hints', () => {
  const invalid = next({ ...view(), answers: 'PRIVATE_ANSWER' });
  assert.equal(invalid?.code, 'invalid_state'); assert.equal(JSON.stringify(invalid).includes('PRIVATE_ANSWER'), false);
  const v = view(); v.nextStep.kind = 'publish';
  assert.equal(next(v)?.code, 'invalid_state');
});
test('agent continuity rejects oversized evidence, sparse refs and getter payloads', () => {
  assert.equal(next({ ...view(), evidenceRefs: Array(6).fill('fixture-evidence') })?.code, 'invalid_state');
  assert.equal(next({ ...view(), evidenceRefs: Array(1) })?.code, 'invalid_state');
  const v = view(); let calls = 0;
  Object.defineProperty(v, 'nextStep', { get() { calls++; return {}; } });
  assert.equal(next(v)?.code, 'invalid_state'); assert.equal(calls, 0);
});
test('agent contracts reject unknown clocks and do not read a clock or call fetch', t => {
  assert.equal(C.describeAgentCatalog?.(catalog(), { now: NaN })?.code, 'invalid_catalog');
  const clock = t.mock.method(Date, 'now', () => { throw new Error('clock IO forbidden'); });
  const fetch = t.mock.method(globalThis, 'fetch', () => { throw new Error('network forbidden'); });
  try {
    assert.equal(describe(catalog())?.status, 'ok');
    assert.equal(quote()?.status, 'quoted_preview'); assert.equal(next()?.status, 'ok');
    assert.equal(clock.mock.callCount(), 0); assert.equal(fetch.mock.callCount(), 0);
  } finally { t.mock.restoreAll(); }
});
