import assert from 'node:assert/strict';
import test from 'node:test';
import { runPublicReadingCheck } from '../scripts/check-public-reading-contracts.mjs';

const htmlHome = '<!doctype html><html><h1>Agent Friendly Web</h1></html>';
const htmlGuide = '<!doctype html><html><main class="public-guide-page"><h1>Pregunta como persona.</h1></main></html>';
const markdown = '---\ncanonical: https://agentfriendlyweb.dev/\n---\n# Agent Friendly Web\n';
function fixture(url, options) {
  const path = new URL(url).pathname;
  const md = path === '/' && options.headers.accept === 'text/markdown';
  const headers = { 'content-type': md ? 'text/markdown; charset=utf-8' : 'text/html; charset=utf-8' };
  if (path === '/') headers.vary = 'RSC, Accept-Encoding, aCcEpT';
  return new Response(options.method === 'HEAD' ? null : md ? markdown : path === '/' ? htmlHome : htmlGuide, { headers });
}
function altered(change) {
  return async (url, options) => change(new URL(url), options, fixture(url, options));
}

test('reads both public pages with GET and HEAD and the actual format contracts', async () => {
  const calls = [];
  const result = await runPublicReadingCheck({ fetchImpl: async (url, options) => {
    calls.push({ url: String(url), ...options });
    return fixture(url, options);
  } });
  assert.equal(result.ok, true);
  assert.equal(result.contract_version, 'agentfriendly.public-reading-check.v1');
  assert.ok(Number.isFinite(Date.parse(result.checked_at)));
  assert.equal(result.origin, 'https://agentfriendlyweb.dev');
  assert.equal(result.operationalReadiness, false);
  assert.equal(result.wafEnforcementAccepted, false);
  assert.equal(result.pcOffAccepted, false);
  assert.equal(result.checks.length, 10);
  assert.equal(calls.length, 10);
  assert.deepEqual([...new Set(calls.map(c => new URL(c.url).pathname))].sort(), ['/', '/guia']);
  for (const call of calls) {
    assert.equal(new URL(call.url).origin, result.origin);
    assert.equal(new URL(call.url).search, '');
    assert.equal(call.redirect, 'manual');
    assert.equal(call.credentials, 'omit');
    assert.deepEqual(Object.keys(call.headers).sort(), ['accept', 'user-agent']);
    assert.match(call.headers['user-agent'], /^AFW-Public-Reading-QA\//);
    assert.equal(call.body, undefined);
    assert.ok(call.signal instanceof AbortSignal);
    assert.ok(['GET', 'HEAD'].includes(call.method));
  }
  assert.equal(result.checks.filter(c => c.path === '/' && c.accept === 'text/markdown').length, 2);
  assert.equal(result.checks.filter(c => c.path === '/guia' && c.accept === 'text/markdown, text/html;q=0.9' && c.content_type === 'text/html').length, 2);
  assert.equal(result.checks.filter(c => c.accept.includes('q=0') && c.path === '/').length, 2);
});

test('rejects a guide replaced by a generic successful homepage', async () => {
  const result = await runPublicReadingCheck({ fetchImpl: altered((url, options, response) =>
    url.pathname === '/guia' && options.method === 'GET'
      ? new Response(htmlHome, { headers: response.headers }) : response) });
  assert.equal(result.ok, false);
  assert.equal(result.checks.filter(c => c.error === 'unexpected_document').length, 2);
});

test('requires a real Markdown document for the negotiated homepage', async () => {
  const result = await runPublicReadingCheck({ fetchImpl: altered((url, options, response) =>
    url.pathname === '/' && options.headers.accept === 'text/markdown' && options.method === 'GET'
      ? new Response(htmlHome, { headers: response.headers }) : response) });
  assert.equal(result.ok, false);
  assert.ok(result.checks.some(c => c.error === 'unexpected_document'));
});

test('rejects missing Accept variation on either homepage representation', async () => {
  const result = await runPublicReadingCheck({ fetchImpl: altered((url, options, response) => {
    response.headers.delete('vary');
    return response;
  }) });
  assert.equal(result.ok, false);
  assert.equal(result.checks.filter(c => c.error === 'missing_vary_accept').length, 6);
});

test('does not accept challenge or redirect pages as successful public reads', async () => {
  for (const response of [
    () => new Response(htmlHome, { headers: { 'content-type': 'text/html', 'cf-mitigated': 'challenge' } }),
    () => new Response(null, { status: 302, headers: { location: 'https://foreign.example/private?token=secret' } }),
  ]) {
    const result = await runPublicReadingCheck({ fetchImpl: response });
    assert.equal(result.ok, false);
    assert.equal(result.checks.length, 10);
    assert.ok(result.checks.every(c => ['unexpected_challenge', 'unexpected_status'].includes(c.error)));
    assert.doesNotMatch(JSON.stringify(result), /foreign|token=|secret/);
  }
});

test('fails changed MIME types and HEAD responses with body bytes', async () => {
  const wrongType = await runPublicReadingCheck({ fetchImpl: () =>
    new Response('{}', { headers: { 'content-type': 'application/json; credential=secret' } }) });
  assert.equal(wrongType.ok, false);
  assert.ok(wrongType.checks.every(c => c.error === 'unexpected_content_type' && c.content_type === null));
  assert.doesNotMatch(JSON.stringify(wrongType), /credential|secret/);
  const headBody = await runPublicReadingCheck({ fetchImpl: altered((url, options, response) =>
    options.method === 'HEAD' ? new Response('unexpected', { headers: response.headers }) : response) });
  assert.equal(headBody.ok, false);
  assert.equal(headBody.checks.filter(c => c.error === 'unexpected_head_body').length, 5);
});

test('bounds streamed bytes, cancels overflow, and never includes bodies in the receipt', async () => {
  let cancelled = 0;
  const result = await runPublicReadingCheck({ maxBodyBytes: 32, fetchImpl: altered((url, options, response) =>
    options.method === 'GET' ? new Response(new ReadableStream({
      pull(controller) { controller.enqueue(new TextEncoder().encode('PRIVATE-BODY-'.repeat(30))); },
      cancel() { cancelled++; },
    }), { headers: response.headers }) : response) });
  assert.equal(result.ok, false);
  assert.equal(result.checks.filter(c => c.error === 'body_limit').length, 5);
  assert.equal(cancelled, 5);
  assert.doesNotMatch(JSON.stringify(result), /PRIVATE-BODY/);
});

test('deadline includes stalled bodies and does not wait for cancellation acknowledgement', async () => {
  let cancelled = 0;
  const result = await runPublicReadingCheck({ requestTimeoutMs: 10, fetchImpl: altered((url, options, response) =>
    options.method === 'GET' ? new Response(new ReadableStream({
      pull() { return new Promise(() => {}); },
      cancel() { cancelled++; return new Promise(() => {}); },
    }), { headers: response.headers }) : response) });
  assert.equal(result.ok, false);
  assert.equal(result.checks.filter(c => c.error === 'request_timeout').length, 5);
  assert.equal(cancelled, 5);
});

test('total budget stops further requests even if fetch ignores abort', async () => {
  let requests = 0;
  const result = await runPublicReadingCheck({ requestTimeoutMs: 200, totalTimeoutMs: 10, fetchImpl: () => {
    requests++;
    return new Promise(() => {});
  } });
  assert.equal(result.ok, false);
  assert.equal(requests, 1);
  assert.equal(result.checks.length, 10);
  assert.ok(result.checks.slice(1).every(c => c.error === 'window_exhausted'));
});

test('sanitizes transport exceptions and refuses larger or invalid budgets before fetching', async () => {
  const result = await runPublicReadingCheck({ fetchImpl: () => { throw new Error('SECRET https://foreign.example/?api_key=hidden'); } });
  assert.equal(result.ok, false);
  assert.ok(result.checks.every(c => c.error === 'transport_error'));
  assert.doesNotMatch(JSON.stringify(result), /SECRET|foreign|api_key|hidden/);
  for (const limits of [
    { requestTimeoutMs: 10001 }, { requestTimeoutMs: 0 }, { totalTimeoutMs: 60001 },
    { maxBodyBytes: 524289 }, { maxBodyBytes: NaN },
  ]) {
    let called = false;
    await assert.rejects(runPublicReadingCheck({ ...limits, fetchImpl: () => { called = true; } }), /invalid_limits/);
    assert.equal(called, false);
  }
});
