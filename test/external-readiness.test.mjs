import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

test('AF-EV publishes the dated Cloudflare baseline without redefining AF-5', async () => {
  const manifest = JSON.parse(
    await readFile('public/.well-known/external-readiness.json', 'utf8'),
  );

  assert.equal(manifest.contract, 'agent-friendly-web.external-readiness.v1');
  assert.equal(manifest.canonical_origin, canonical);
  assert.match(manifest.relationship_to_af, /orthogonal|separate/i);
  assert.equal(manifest.observations.length, 1);

  const [baseline] = manifest.observations;
  assert.equal(baseline.provider, 'Cloudflare isitagentready.com');
  assert.equal(baseline.observed_at.slice(0, 10), '2026-08-30');
  assert.equal(baseline.score, 53);
  assert.equal(baseline.level, 2);
  assert.equal(baseline.label, 'Bot-Aware');
  assert.equal(baseline.status, 'baseline');
  assert.equal(baseline.report_url, 'https://isitagentready.com/agentfriendlyweb.dev');
  assert.ok(baseline.passed_checks.includes('mcpServerCard'));
  assert.ok(baseline.failed_checks.includes('markdownNegotiation'));
  assert.ok(baseline.failed_checks.includes('ard'));
  assert.match(JSON.stringify(manifest), /not.*certification|no.*certification/i);
});

test('external verification is discoverable from human and machine surfaces', async () => {
  const [page, sitemap, footer, map, llms, llmsFull, layout, readiness] = await Promise.all([
    readFile('app/verificacion-externa/page.tsx', 'utf8'),
    readFile('app/sitemap.ts', 'utf8'),
    readFile('app/components/site-footer.tsx', 'utf8'),
    readFile('app/mapa-del-sitio/page.tsx', 'utf8'),
    readFile('public/llms.txt', 'utf8'),
    readFile('public/llms-full.txt', 'utf8'),
    readFile('app/layout.tsx', 'utf8'),
    readFile('public/.well-known/agent-readiness.json', 'utf8'),
  ]);

  assert.match(page, /53\s*\/\s*100/);
  assert.match(page, /Level 2|Nivel 2/i);
  assert.match(page, /no.*certificaci/i);
  assert.match(sitemap, /\/verificacion-externa/);
  assert.match(footer, /\/verificacion-externa/);
  assert.match(map, /Verificacion externa/i);
  assert.match(llms, /external-readiness\.json/);
  assert.match(llmsFull, /AF-EV/);
  assert.match(layout, /<link\s+rel="ard"/);
  assert.match(layout, /type="text\/markdown"/);

  const readinessJson = JSON.parse(readiness);
  assert.equal(readinessJson.external_verification.status, 'baseline');
  assert.equal(readinessJson.capabilities.webmcp.status, 'candidate');
});
