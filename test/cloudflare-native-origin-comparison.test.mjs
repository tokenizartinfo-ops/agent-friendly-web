import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CUTOVER_COMPARISON_ROUTES,
  comparePublicOrigins,
} from '../scripts/compare-cloudflare-native-public-origin.mjs';

function responseFor(path, candidate = false) {
  if (path === '/.well-known/infrastructure-status.json') {
    return candidate
      ? Response.json({ project: 'agent-friendly-web', canonical_origin: 'https://agentfriendlyweb.dev' })
      : new Response('not found', { status: 404, headers: { 'content-type': 'text/plain' } });
  }
  if (path === '/') return new Response(`<html>Agent Friendly Web ${candidate ? 'Cloudflare' : 'Sites'}</html>`, { headers: { 'content-type': 'text/html; charset=utf-8' } });
  if (path === '/sitemap.xml') return new Response('<urlset>agentfriendlyweb.dev</urlset>', { headers: { 'content-type': 'application/xml' } });
  if (path === '/okf/v0.2/manifest.json') return Response.json({ protocol: 'OKF', project: 'agent-friendly-web' });
  if (path.endsWith('.json') || path === '/api-catalog') return new Response(JSON.stringify({ project: 'agent-friendly-web', canonical_origin: 'https://agentfriendlyweb.dev' }), { headers: { 'content-type': path === '/api-catalog' ? 'application/linkset+json' : 'application/json' } });
  return new Response('Agent Friendly Web\nUser-agent: *', { headers: { 'content-type': 'text/plain; charset=utf-8' } });
}

test('origin comparison accepts semantic parity and one explicit candidate addition', async () => {
  const requested = [];
  const report = await comparePublicOrigins({
    baselineUrl: 'https://agentfriendlyweb.dev',
    candidateUrl: 'http://127.0.0.1:8788',
    fetchImpl: async (url) => {
      const parsed = new URL(url);
      requested.push(`${parsed.origin}${parsed.pathname}`);
      return responseFor(parsed.pathname, parsed.origin === 'http://127.0.0.1:8788');
    },
  });

  assert.equal(report.ok, true);
  assert.equal(report.critical_failures, 0);
  assert.equal(report.routes.length, CUTOVER_COMPARISON_ROUTES.length);
  assert.equal(requested.length, CUTOVER_COMPARISON_ROUTES.length * 2);
  assert.equal(report.routes.find((entry) => entry.path === '/.well-known/infrastructure-status.json').classification, 'expected_addition');
  assert.equal(report.routes.find((entry) => entry.path === '/').classification, 'changed_semantic_parity');
  assert.doesNotMatch(JSON.stringify(report), /<html>|User-agent:/i);
});

test('origin comparison fails closed for an invalid candidate contract', async () => {
  const report = await comparePublicOrigins({
    baselineUrl: 'https://agentfriendlyweb.dev',
    candidateUrl: 'https://release.agentfriendlyweb.dev',
    fetchImpl: async (url) => {
      const parsed = new URL(url);
      if (parsed.origin === 'https://release.agentfriendlyweb.dev' && parsed.pathname === '/llms.txt') {
        return new Response('<html>login fallback</html>', { headers: { 'content-type': 'text/html' } });
      }
      return responseFor(parsed.pathname, parsed.origin === 'https://release.agentfriendlyweb.dev');
    },
  });

  assert.equal(report.ok, false);
  assert.ok(report.critical_failures >= 1);
  assert.match(report.routes.find((entry) => entry.path === '/llms.txt').error, /content|marker|contract/i);
});

test('origin comparison rejects unapproved origins and bounds every response', async () => {
  await assert.rejects(() => comparePublicOrigins({ baselineUrl: 'https://example.com', candidateUrl: 'http://127.0.0.1:8788' }), /baseline/i);
  await assert.rejects(() => comparePublicOrigins({ baselineUrl: 'https://agentfriendlyweb.dev', candidateUrl: 'https://companion.tokenizart.info' }), /candidate/i);

  const oversized = await comparePublicOrigins({
    baselineUrl: 'https://agentfriendlyweb.dev',
    candidateUrl: 'http://127.0.0.1:8788',
    fetchImpl: async (url) => {
      const parsed = new URL(url);
      if (parsed.origin === 'http://127.0.0.1:8788' && parsed.pathname === '/') {
        return new Response('Agent Friendly Web '.repeat(40000), { headers: { 'content-type': 'text/html' } });
      }
      return responseFor(parsed.pathname, parsed.origin === 'http://127.0.0.1:8788');
    },
  });
  assert.equal(oversized.ok, false);
  assert.match(oversized.routes.find((entry) => entry.path === '/').error, /bytes|size|large/i);
});
