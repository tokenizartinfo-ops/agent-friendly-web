import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CLOUD_NATIVE_SMOKE_ROUTES,
  runCloudflareNativeSmoke,
} from '../scripts/smoke-cloudflare-native-local.mjs';

test('production smoke covers both the exact projects API root and a descendant', () => {
  const privatePaths = CLOUD_NATIVE_SMOKE_ROUTES
    .filter((route) => route.boundary === 'private')
    .map((route) => route.path);

  assert.ok(privatePaths.includes('/api/projects'));
  assert.ok(privatePaths.includes('/api/projects/probe'));
});

const smokeSource = await import('node:fs/promises')
  .then(({ readFile }) => readFile(new URL('../scripts/smoke-cloudflare-native-local.mjs', import.meta.url), 'utf8'));

function responseFor(path) {
  if (path === '/') return new Response('<html><title>Agent Friendly Web</title></html>', {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
  if (path === '/robots.txt' || path === '/llms.txt') return new Response('Agent Friendly Web\nUser-agent: *', {
    status: 200,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
  if (path === '/index.md') return new Response('# Agent Friendly Web', {
    status: 200,
    headers: { 'content-type': 'text/markdown; charset=utf-8' },
  });
  if (['/expediente', '/api/projects', '/api/projects/probe'].includes(path)) return new Response(null, {
    status: 307,
    headers: { location: `/?access=required&return_to=${encodeURIComponent(path)}` },
  });
  if (path === '/okf/v0.2/manifest.json') return Response.json({ name: 'Agent Friendly Web OKF' });
  if (path === '/api-catalog') return new Response(JSON.stringify({ canonical_origin: 'https://agentfriendlyweb.dev' }), {
    status: 200,
    headers: { 'content-type': 'application/linkset+json; charset=utf-8' },
  });
  return Response.json({ project: 'agent-friendly-web', canonical_origin: 'https://agentfriendlyweb.dev' });
}

test('local parity smoke covers public HTML, agent resources, API catalog and private fail-closed behavior', async () => {
  const requested = [];
  const report = await runCloudflareNativeSmoke({
    baseUrl: 'http://127.0.0.1:8788',
    mode: 'local',
    fetchImpl: async (url) => {
      const path = new URL(url).pathname;
      requested.push(path);
      return responseFor(path);
    },
  });

  assert.equal(report.ok, true);
  assert.deepEqual(requested, CLOUD_NATIVE_SMOKE_ROUTES.map((route) => route.path));
  assert.ok(report.checks.every((check) => check.ok));
  assert.match(report.checks.find((check) => check.path === '/api-catalog').content_type, /^application\/linkset\+json/i);
});

test('Access edge smoke requires every canary route to be blocked before the application', async () => {
  const report = await runCloudflareNativeSmoke({
    baseUrl: 'https://canary.agentfriendlyweb.dev',
    mode: 'access-edge',
    fetchImpl: async () => new Response(null, {
      status: 302,
      headers: { location: 'https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/canary' },
    }),
  });

  assert.equal(report.ok, true);
  assert.ok(report.checks.every((check) => check.boundary === 'cloudflare_access'));
});

test('public edge smoke requires public contracts and Access on private routes', async () => {
  const report = await runCloudflareNativeSmoke({
    baseUrl: 'https://agentfriendlyweb.dev',
    mode: 'public-edge',
    fetchImpl: async (url) => CLOUD_NATIVE_SMOKE_ROUTES
      .some((route) => route.boundary === 'private' && route.path === new URL(url).pathname)
      ? new Response(null, {
        status: 302,
        headers: { location: 'https://tokenizart.cloudflareaccess.com/cdn-cgi/access/login/production' },
      })
      : responseFor(new URL(url).pathname),
  });

  assert.equal(report.ok, true);
  assert.equal(report.checks.find((check) => check.path === '/expediente').boundary, 'cloudflare_access');
  assert.equal(report.checks.find((check) => check.path === '/llms.txt').boundary, 'public');
});

test('edge modes reject origins outside the exact Agent Friendly Web boundary', async () => {
  await assert.rejects(() => runCloudflareNativeSmoke({
    baseUrl: 'https://companion.tokenizart.info',
    mode: 'public-edge',
  }), /origin|Agent Friendly Web/i);
  await assert.rejects(() => runCloudflareNativeSmoke({
    baseUrl: 'https://example.com',
    mode: 'access-edge',
  }), /origin|Agent Friendly Web/i);
});

test('smoke fails if a private local route or protected canary route becomes public', async () => {
  const local = await runCloudflareNativeSmoke({
    baseUrl: 'http://127.0.0.1:8788',
    mode: 'local',
    fetchImpl: async (url) => new URL(url).pathname === '/expediente'
      ? new Response('<html>private</html>', { status: 200, headers: { 'content-type': 'text/html' } })
      : responseFor(new URL(url).pathname),
  });
  assert.equal(local.ok, false);
  assert.match(local.checks.find((check) => check.path === '/expediente').error, /fail.closed/i);

  const canary = await runCloudflareNativeSmoke({
    baseUrl: 'https://canary.agentfriendlyweb.dev',
    mode: 'access-edge',
    fetchImpl: async () => new Response('<html>unexpected public app</html>', { status: 200 }),
  });
  assert.equal(canary.ok, false);
  assert.ok(canary.checks.every((check) => check.ok === false));
});

test('each smoke request has a bounded timeout', () => {
  assert.match(smokeSource, /LOCAL_REQUEST_TIMEOUT_MS\s*=\s*30_000/);
  assert.match(smokeSource, /EDGE_REQUEST_TIMEOUT_MS\s*=\s*10_000/);
  assert.match(smokeSource, /AbortSignal\.timeout\(requestTimeoutMs\)/);
});
