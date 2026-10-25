import test from 'node:test';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { executePublicMcpTool } from '../lib/public-mcp.mjs';

const T = Date.parse('2026-10-25T19:00:00.000Z');
const envelope = await executePublicMcpTool('get_afw_methodology', { section: 'overview' }, { now: () => new Date(T).toISOString() });
async function observer() {
  const module = await import('../scripts/check-public-methodology-once.mjs').catch(error => {
    if (error.code === 'ERR_MODULE_NOT_FOUND') return {};
    throw error;
  });
  assert.equal(typeof module.observeMethodologyOnce, 'function', 'bounded public methodology observer is not implemented');
  return module.observeMethodologyOnce;
}
const clone = value => JSON.parse(JSON.stringify(value));
function fixture({ sse = false, change = (_index, value) => value, override } = {}) {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({ url: String(url), init, message: JSON.parse(init.body) });
    const index = calls.length;
    const messages = [
      { jsonrpc: '2.0', id: 1, result: { protocolVersion: '2024-11-05', capabilities: { tools: {} }, serverInfo: { name: 'agent-friendly-web-public', version: '0.1.0' } } },
      null,
      { jsonrpc: '2.0', id: 2, result: { tools: [{ name: 'get_afw_methodology', annotations: { readOnlyHint: true, destructiveHint: false, openWorldHint: false } }] } },
      { jsonrpc: '2.0', id: 3, result: { content: [{ type: 'text', text: 'Public methodology' }], structuredContent: clone(envelope) } },
    ];
    const message = change(index, clone(messages[index - 1]));
    if (override) {
      const result = await override(index, message, init);
      if (result) return result;
    }
    if (index === 2) return new Response(null, { status: 202 });
    return new Response(sse ? 'event: message\ndata: ' + JSON.stringify(message) + '\n\n' : JSON.stringify(message), {
      status: 200, headers: { 'content-type': sse ? 'text/event-stream' : 'application/json' },
    });
  };
  return { calls, fetchImpl };
}
const options = fetchImpl => ({ notBefore: T - 1000, notAfter: T + 60000, fetchImpl, now: () => T, monotonic: () => 10 });

for (const sse of [false, true]) test('one fixed public methodology sequence accepts ' + (sse ? 'finite SSE' : 'JSON'), async () => {
  const run = await observer();
  const f = fixture({ sse });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'accepted');
  assert.equal(r.requestsSent, 4);
  assert.deepEqual(f.calls.map(x => x.message.method), ['initialize', 'notifications/initialized', 'tools/list', 'tools/call']);
  assert.deepEqual(f.calls[3].message.params, { name: 'get_afw_methodology', arguments: { section: 'overview' } });
  for (const call of f.calls) {
    assert.equal(call.url, 'https://agentfriendlyweb.dev/mcp');
    assert.equal(call.init.method, 'POST');
    assert.equal(call.init.credentials, 'omit');
    assert.equal(call.init.redirect, 'error');
    const headers = new Headers(call.init.headers);
    assert.equal(headers.get('accept'), 'application/json, text/event-stream');
    assert.equal(headers.get('authorization'), null);
    assert.equal(headers.get('cookie'), null);
    assert.equal(headers.get('cloudflare-workers-version-overrides'), null);
  }
  assert.equal(new Headers(f.calls[3].init.headers).get('mcp-protocol-version'), '2024-11-05');
  assert.equal(r.methodology.levels, 6);
  assert.ok(r.methodology.categories > 0);
  assert.equal(r.methodology.sha256, crypto.createHash('sha256').update(JSON.stringify(envelope)).digest('hex'));
  assert.equal(r.methodology.bytes, Buffer.byteLength(JSON.stringify(envelope)));
  assert.equal(r.operationalReadiness, false);
  assert.equal(r.postRetries, 0);
});

test('missing, future, expired, noninteger and oversized original windows send nothing', async () => {
  const run = await observer();
  for (const window of [{}, { notBefore: T + 1, notAfter: T + 1000 }, { notBefore: 0, notAfter: 1 },
    { notBefore: T - 1000, notAfter: T }, { notBefore: T - 1, notAfter: T + 600000 },
    { notBefore: T - 0.5, notAfter: T + 1000 }]) {
    const f = fixture();
    const r = await run({ ...options(f.fetchImpl), ...window, notBefore: window.notBefore, notAfter: window.notAfter });
    assert.equal(r.status, 'unconfirmed');
    assert.equal(r.requestsSent, 0);
    assert.equal(f.calls.length, 0);
  }
});

test('transport error consumes the send and never retries or reflects its text', async () => {
  const run = await observer();
  const f = fixture({ override: index => { if (index === 3) throw Error('FAKE_PRIVATE_FIXTURE_DO_NOT_REFLECT'); } });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(r.requestsSent, 3);
  assert.equal(f.calls.length, 3);
  assert.doesNotMatch(JSON.stringify(r), /FAKE_PRIVATE_FIXTURE/);
});

for (const defect of ['id', 'isError', 'contract', 'generated_at', 'levels', 'sources', 'normative_status', 'blocked_actions', 'partial_blocked_actions', 'level_label', 'level_ranges', 'category_label', 'category_weight', 'category_checks', 'empty_limits']) {
  test('functional response rejects ' + defect + ' without exposing its body', async () => {
    const run = await observer();
    const f = fixture({ change: (index, message) => {
      if (index !== 4) return message;
      if (defect === 'id') message.id = 99;
      else if (defect === 'isError') message.result.isError = true;
      else {
        const e = message.result.structuredContent;
        if (defect === 'contract') e.contract = 'unknown';
        if (defect === 'generated_at') e.generated_at = new Date(T - 60000).toISOString();
        if (defect === 'levels') e.result.levels = [];
        if (defect === 'sources') e.sources = [{ url: 'https://example.invalid/FAKE_PRIVATE_FIXTURE' }];
        if (defect === 'normative_status') e.result.normative_status = 'Official certification';
        if (defect === 'blocked_actions') e.blocked_actions = [];
        if (defect === 'partial_blocked_actions') e.blocked_actions = ['private-expedients', 'publish', 'deploy', 'billing', 'payments', 'owner-data'];
        if (defect === 'level_label') e.result.levels[0].label = '';
        if (defect === 'level_ranges') e.result.levels.forEach(level => { level.score_min = 0; level.score_max = 0; });
        if (defect === 'category_label') e.result.categories[0].label = '';
        if (defect === 'category_weight') e.result.categories[0].weight = -1;
        if (defect === 'category_checks') e.result.categories[0].checks = [null];
        if (defect === 'empty_limits') e.limits = [''];
      }
      return message;
    } });
    const r = await run(options(f.fetchImpl));
    assert.equal(r.status, 'unconfirmed');
    assert.equal(r.requestsSent, 4);
    assert.equal(f.calls.length, 4);
    assert.doesNotMatch(JSON.stringify(r), /FAKE_PRIVATE_FIXTURE|Official certification|example.invalid/);
  });
}

test('unsupported protocol stops after initialize', async () => {
  const run = await observer();
  const f = fixture({ change: (index, value) => { if (index === 1) value.result.protocolVersion = 'unknown'; return value; } });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 1);
});

test('notification failure stops before catalog and call', async () => {
  const run = await observer();
  const f = fixture({ override: index => index === 2 ? new Response('not accepted', { status: 400 }) : null });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 2);
});

test('destructive catalog annotation prevents tools/call', async () => {
  const run = await observer();
  const f = fixture({ change: (index, value) => { if (index === 3) value.result.tools[0].annotations.destructiveHint = true; return value; } });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 3);
});

test('duplicate SSE results fail correlation without another request', async () => {
  const run = await observer();
  const f = fixture({ sse: true, override: (index, message) => index === 4 ? new Response(
    'data: ' + JSON.stringify(message) + '\n\ndata: ' + JSON.stringify(message) + '\n\n',
    { headers: { 'content-type': 'text/event-stream' } }) : null });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 4);
});

test('oversized response is cancelled and no next send occurs', async () => {
  const run = await observer();
  let cancelled = false;
  const f = fixture({ override: index => index === 1 ? new Response(new ReadableStream({
    start(controller) { controller.enqueue(new Uint8Array(65537)); },
    cancel() { cancelled = true; },
  }), { headers: { 'content-type': 'application/json' } }) : null });
  const r = await run(options(f.fetchImpl));
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 1);
  assert.equal(cancelled, true);
});

test('stalled body expires at original deadline and is cancelled', { timeout: 2000 }, async () => {
  const run = await observer();
  let cancelled = false;
  const f = fixture({ override: () => new Response(new ReadableStream({ cancel() { cancelled = true; } }),
    { headers: { 'content-type': 'application/json' } }) });
  const now = Date.now();
  const r = await run({ notBefore: now - 10, notAfter: now + 100, fetchImpl: f.fetchImpl });
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 1);
  assert.equal(cancelled, true);
});

test('expiry during response cannot authorize the next step', async () => {
  const run = await observer();
  let current = T;
  const f = fixture({ override: index => { if (index === 1) current = T + 60000; } });
  const r = await run({ ...options(f.fetchImpl), now: () => current });
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 1);
});

test('CLI refuses default windows, reruns and non-main context before HTTP', async () => {
  await observer();
  const valid = {
    ...process.env, GITHUB_ACTIONS: 'true', GITHUB_REPOSITORY: 'tokenizartinfo-ops/agent-friendly-web',
    GITHUB_EVENT_NAME: 'workflow_dispatch', GITHUB_REF: 'refs/heads/main',
    GITHUB_RUN_ATTEMPT: '1', GITHUB_RUN_ID: '12345',
    AFW_PUBLIC_TRIAL_START_MS: String(Date.now() - 1000), AFW_PUBLIC_TRIAL_END_MS: String(Date.now() + 30000),
  };
  for (const overrides of [
    { AFW_PUBLIC_TRIAL_START_MS: '0', AFW_PUBLIC_TRIAL_END_MS: '1' },
    { GITHUB_RUN_ATTEMPT: '2' }, { GITHUB_REF: 'refs/heads/foreign' }, { GITHUB_EVENT_NAME: 'pull_request' },
  ]) {
    const out = spawnSync(process.execPath, ['scripts/check-public-methodology-once.mjs'], { encoding: 'utf8', env: { ...valid, ...overrides }, timeout: 2000 });
    assert.equal(out.status, 1);
    const r = JSON.parse(out.stdout);
    assert.equal(r.requestsSent, 0);
    assert.equal(r.status, 'unconfirmed');
    assert.equal(out.stderr, '');
  }
});

for (const where of ['headers', 'body']) test('late timer cannot accept response after10s at ' + where, async () => {
  const run = await observer();
  let wall = T, mono = 0;
  const late = () => { wall += 11000; mono += 11000; };
  const f = fixture({ override: (index, message) => {
    if (index !== 1) return null;
    if (where === 'headers') { late(); return null; }
    return new Response(new ReadableStream({ pull(controller) {
      controller.enqueue(Buffer.from(JSON.stringify(message)));
      late(); controller.close();
    } }, { highWaterMark: 0 }), { headers: { 'content-type': 'application/json' } });
  } });
  const r = await run({ ...options(f.fetchImpl), now: () => wall, monotonic: () => mono });
  assert.equal(r.status, 'unconfirmed');
  assert.equal(f.calls.length, 1);
});
