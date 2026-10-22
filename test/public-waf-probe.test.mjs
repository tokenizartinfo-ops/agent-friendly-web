import assert from 'node:assert/strict';
import test from 'node:test';
import { runPublicWafProbe } from '../scripts/check-public-waf-probe.mjs';

const now = Math.floor(Date.now() / 1000);
const window = () => ({ startUnix: now - 1, endUnix: now + 300 });

test('makes one fixed unauthenticated GET and records only an observed block awaiting correlation', async () => {
  const calls = [];
  const r = await runPublicWafProbe({ ...window(), fetchImpl: async (url, options) => {
    calls.push({ url, options });
    return new Response('PRIVATE-RESPONSE', { status: 403, headers: {
      'cf-ray': 'abcdef0123456789-EZE', 'content-type': 'text/html',
      'set-cookie': 'sensitive=private', location: 'https://foreign.example/?secret=hidden',
    } });
  } });
  assert.equal(calls.length, 1);
  const { url, options } = calls[0];
  assert.equal(url.origin, 'https://agentfriendlyweb.dev');
  assert.equal(url.pathname, '/guia');
  assert.deepEqual([...url.searchParams.keys()], ['afw_waf_probe']);
  assert.equal(url.searchParams.get('afw_waf_probe'), '<script>alert("afw-own-synthetic-v1")</script>');
  assert.equal(options.method, 'GET');
  assert.equal(options.redirect, 'manual');
  assert.equal(options.credentials, 'omit');
  assert.deepEqual(Object.keys(options.headers).sort(), ['accept', 'user-agent']);
  assert.ok(options.signal instanceof AbortSignal);
  assert.equal(options.body, undefined);
  assert.equal(r.contract_version, 'agentfriendly.public-waf-probe.v1');
  assert.equal(r.outcome, 'blocked_pending_correlation');
  assert.equal(r.ray_id, 'abcdef0123456789');
  assert.equal(r.status, 403);
  assert.equal(r.wafEnforcementAccepted, false);
  assert.equal(r.operationalReadiness, false);
  assert.equal(r.pcOffAccepted, false);
  assert.doesNotMatch(JSON.stringify(r), /PRIVATE-RESPONSE|sensitive|foreign|secret=|hidden|<script>/);
});

test('rejects missing, expired, future, oversized and noninteger windows before fetching', async () => {
  const cases = [
    {}, { startUnix: 0, endUnix: 1 },
    { startUnix: now + 60, endUnix: now + 120 },
    { startUnix: now - 1, endUnix: now + 900 },
    { startUnix: now - 1.5, endUnix: now + 100 },
    { startUnix: '1; command', endUnix: now + 100 },
    { startUnix: now - 1, endUnix: Infinity },
  ];
  for (const limits of cases) {
    let called = false;
    const r = await runPublicWafProbe({ ...limits, fetchImpl: () => { called = true; } });
    assert.equal(called, false);
    assert.equal(r.outcome, 'window_closed');
    assert.equal(r.wafEnforcementAccepted, false);
  }
});

test('distinguishes ordinary responses, redirects, challenges and a block without usable Ray ID', async () => {
  for (const [response, outcome] of [
    [() => new Response(null, { status: 200 }), 'not_blocked'],
    [() => new Response(null, { status: 302, headers: { location: 'https://foreign.example' } }), 'unexpected_response'],
    [() => new Response(null, { status: 403, headers: { 'cf-ray': 'abcdef0123456789-EZE', 'cf-mitigated': 'challenge' } }), 'unexpected_challenge'],
    [() => new Response(null, { status: 403, headers: { 'cf-ray': 'unsafe?sensitive=yes' } }), 'block_without_ray'],
  ]) {
    let calls = 0;
    const r = await runPublicWafProbe({ ...window(), fetchImpl: () => { calls++; return response(); } });
    assert.equal(calls, 1);
    assert.equal(r.outcome, outcome);
    assert.equal(r.wafEnforcementAccepted, false);
    assert.doesNotMatch(JSON.stringify(r), /foreign|sensitive/);
  }
});

test('cancels response without reading body or waiting for cancellation acknowledgement', async () => {
  let cancelled = 0;
  const r = await runPublicWafProbe({ ...window(), fetchImpl: () => new Response(new ReadableStream({
    pull() { return new Promise(() => {}); },
    cancel() { cancelled++; return new Promise(() => {}); },
  }), { status: 403, headers: { 'cf-ray': 'abcdef0123456789-EZE' } }) });
  assert.equal(r.outcome, 'blocked_pending_correlation');
  assert.equal(cancelled, 1);
});

test('bounds transport wait without retry and ignores a late response', async () => {
  let finish;
  let cancelled = 0;
  let calls = 0;
  const r = await runPublicWafProbe({ ...window(), requestTimeoutMs: 5, fetchImpl: () => {
    calls++;
    return new Promise(resolve => { finish = resolve; });
  } });
  assert.equal(r.outcome, 'request_timeout');
  const original = JSON.stringify(r);
  finish(new Response(new ReadableStream({
    cancel() { cancelled++; },
  }), { status: 403, headers: { 'cf-ray': 'abcdef0123456789-EZE' } }));
  await new Promise(resolve => setImmediate(resolve));
  assert.equal(cancelled, 1);
  assert.equal(calls, 1);
  assert.equal(JSON.stringify(r), original);
});

test('sanitizes transport errors and refuses invalid request deadlines without a request', async () => {
  const r = await runPublicWafProbe({ ...window(), fetchImpl: () => { throw new Error('SECRET https://foreign.example/?key=value'); } });
  assert.equal(r.outcome, 'transport_error');
  assert.doesNotMatch(JSON.stringify(r), /SECRET|foreign|key=value/);
  for (const requestTimeoutMs of [0, -1, 10001, NaN, 1.2]) {
    let called = false;
    const result = await runPublicWafProbe({ ...window(), requestTimeoutMs, fetchImpl: () => { called = true; } });
    assert.equal(called, false);
    assert.equal(result.outcome, 'invalid_limits');
  }
});
