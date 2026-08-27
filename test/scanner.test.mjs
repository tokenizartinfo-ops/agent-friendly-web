import test from 'node:test';
import assert from 'node:assert/strict';

import {
  analyzeHome,
  analyzeRobots,
  evidenceFromProbe,
  hasOwnershipEvidence,
  isPrivateIp,
  matchesResource,
} from '../lib/scanner.mjs';

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

test('hasOwnershipEvidence recognizes a named creator linked from JSON-LD', () => {
  const html = `
    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "WebSite", "creator": { "@id": "#creator" } },
          { "@type": "Person", "@id": "#creator", "name": "Gabriel Mucchiut" }
        ]
      }
    </script>`;

  assert.equal(hasOwnershipEvidence(html), true);
  assert.equal(
    hasOwnershipEvidence('<script type="application/ld+json">{"@type":"Person","name":"Visitante"}</script>'),
    false,
  );
});

test('evidenceFromProbe only marks successful, non-empty resources as detected', () => {
  assert.equal(evidenceFromProbe({ status: 200, bytes: 12 }), true);
  assert.equal(evidenceFromProbe({ status: 204, bytes: 0 }), false);
  assert.equal(evidenceFromProbe({ status: 404, bytes: 90 }), false);
});

test('analyzeRobots separates crawl access from declared AI use signals', () => {
  const robots = `
    User-agent: *
    Allow: /
    Disallow: /private/
    Content-Signal: search=yes, ai-input=yes, ai-train=no

    User-agent: GPTBot
    Disallow: /private/
  `;

  assert.deepEqual(analyzeRobots(robots), {
    contentSignals: true,
    explicitAiCrawlerPolicy: true,
    allowsPublicCrawl: true,
  });
});

test('analyzeRobots does not treat a wildcard rule as an explicit AI crawler policy', () => {
  assert.deepEqual(analyzeRobots('User-agent: *\nAllow: /'), {
    contentSignals: false,
    explicitAiCrawlerPolicy: false,
    allowsPublicCrawl: true,
  });
});

test('analyzeRobots scopes a full block to its own crawler group', () => {
  const robots = `
    User-agent: GPTBot
    Disallow: /

    User-agent: *
    Allow: /
    Disallow: /private/
  `;

  assert.equal(analyzeRobots(robots).allowsPublicCrawl, true);
});

test('isPrivateIp blocks non-public IPv4 and IPv6 ranges', () => {
  for (const ip of [
    '127.0.0.1',
    '10.1.2.3',
    '100.64.1.2',
    '172.20.0.4',
    '192.0.2.10',
    '192.168.2.2',
    '198.18.0.1',
    '198.51.100.5',
    '203.0.113.8',
    '169.254.1.1',
    '::1',
    'fc00::1',
    'fe80::1',
    'ff02::1',
    '2001:db8::1',
  ]) {
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

test('matchesResource validates current discovery catalogs and MCP server cards', () => {
  assert.equal(
    matchesResource(
      {
        status: 200,
        bytes: 80,
        contentType: 'application/json',
        body: '{"schema_version":"1.0","skills":[{"name":"audit","location":"/skills/audit/SKILL.md"}]}',
      },
      'agentSkills',
    ),
    true,
  );
  assert.equal(
    matchesResource(
      {
        status: 200,
        bytes: 80,
        contentType: 'application/json',
        body: '{"schema_version":"1.0","resources":[{"name":"openapi","url":"/openapi.json"}]}',
      },
      'aiCatalog',
    ),
    true,
  );
  assert.equal(
    matchesResource(
      {
        status: 200,
        bytes: 100,
        contentType: 'application/octet-stream',
        body: '{"linkset":[{"anchor":"https://example.org","service-desc":[{"href":"https://example.org/openapi.json"}]}]}',
      },
      'apiCatalog',
    ),
    true,
  );
  assert.equal(
    matchesResource(
      {
        status: 200,
        bytes: 100,
        contentType: 'application/json',
        body: '{"name":"Example MCP","version":"1.0.0","transports":[{"type":"streamable-http","url":"https://example.org/mcp"}]}',
      },
      'mcp',
    ),
    true,
  );
});
