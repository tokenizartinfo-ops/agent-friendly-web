import test from 'node:test';
import assert from 'node:assert/strict';

import { analyzeHome, evidenceFromProbe, isPrivateIp, matchesResource } from '../lib/scanner.mjs';

test('analyzeHome detects structured data, direct answers and tool hints', () => {
  const html = `
    <html><head>
      <script type="application/ld+json">{"@type":"Organization"}</script>
      <link rel="alternate" type="text/markdown" href="/about.md">
    </head><body>
      <h1>How does the service work?</h1>
      <p>It works in three verifiable steps.</p>
      <a href="/.well-known/mcp.json">MCP</a>
    </body></html>`;

  assert.deepEqual(analyzeHome(html, { link: '</sitemap.xml>; rel="sitemap"' }), {
    structuredData: true,
    directAnswers: true,
    linkHeaders: true,
    markdown: true,
    mcp: true,
    openapi: false,
    skills: false,
    webmcp: false,
  });
});

test('evidenceFromProbe only marks successful, non-empty resources as detected', () => {
  assert.equal(evidenceFromProbe({ status: 200, bytes: 12 }), true);
  assert.equal(evidenceFromProbe({ status: 204, bytes: 0 }), false);
  assert.equal(evidenceFromProbe({ status: 404, bytes: 90 }), false);
});

test('isPrivateIp blocks non-public IPv4 and IPv6 ranges', () => {
  for (const ip of ['127.0.0.1', '10.1.2.3', '172.20.0.4', '192.168.2.2', '169.254.1.1', '::1', 'fc00::1', 'fe80::1']) {
    assert.equal(isPrivateIp(ip), true, ip);
  }
  assert.equal(isPrivateIp('104.16.132.229'), false);
  assert.equal(isPrivateIp('2606:4700::6810:84e5'), false);
});

test('matchesResource rejects friendly 200 HTML fallbacks', () => {
  const fallback = { status: 200, bytes: 500, contentType: 'text/html', body: '<html>Not found</html>' };
  assert.equal(matchesResource(fallback, 'llms'), false);
  assert.equal(matchesResource(fallback, 'mcp'), false);
  assert.equal(matchesResource({ status: 200, bytes: 30, contentType: 'text/plain', body: 'User-agent: *\nDisallow:' }, 'robots'), true);
  assert.equal(matchesResource({ status: 200, bytes: 40, contentType: 'application/json', body: '{"openapi":"3.1.0"}' }, 'openapi'), true);
});
