import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

test('AF-EV preserves baseline and verified post-release observations without redefining AF-5', async () => {
  const manifest = JSON.parse(
    await readFile('public/.well-known/external-readiness.json', 'utf8'),
  );

  assert.equal(manifest.contract, 'agent-friendly-web.external-readiness.v1');
  assert.equal(manifest.canonical_origin, canonical);
  assert.match(manifest.relationship_to_af, /orthogonal|separate/i);
  assert.equal(manifest.observations.length, 2);

  const [baseline, verified] = manifest.observations;
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
  assert.equal(verified.observed_at, '2026-08-30T21:58:56.237Z');
  assert.equal(verified.score, null);
  assert.equal(verified.score_status, 'not_returned_by_provider_api');
  assert.equal(verified.level, 4);
  assert.equal(verified.label, 'Agent-Integrated');
  assert.equal(verified.status, 'verified');
  assert.ok(verified.passed_checks.includes('markdownNegotiation'));
  assert.ok(verified.passed_checks.includes('webMcp'));
  assert.ok(verified.passed_checks.includes('ard'));
  assert.ok(verified.failed_checks.includes('dnsAid'));
  assert.ok(verified.failed_checks.includes('a2aAgentCard'));
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
  assert.match(page, /Level 4|Nivel 4/i);
  assert.match(page, /Agent-Integrated/i);
  assert.match(page, /puntaje numerico.*no fue devuelto/i);
  assert.match(page, /no.*certificaci/i);
  assert.match(sitemap, /'externalVerification'/);
  assert.match(footer, /\['externalVerification', 'externalVerification'\]/);
  assert.match(map, /Verificacion externa/i);
  assert.match(llms, /external-readiness\.json/);
  assert.match(llmsFull, /AF-EV/);
  assert.match(layout, /<link\s+rel="ard"/);
  assert.match(layout, /type="text\/markdown"/);

  const readinessJson = JSON.parse(readiness);
  assert.equal(readinessJson.external_verification.status, 'verified');
  assert.equal(readinessJson.capabilities.webmcp.status, 'deployed');
  assert.equal(readinessJson.capabilities.markdown_negotiation.status, 'deployed');
  assert.equal(readinessJson.capabilities.ard.status, 'deployed');
});
