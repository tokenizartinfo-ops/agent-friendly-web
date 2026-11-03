import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('case separates live resources from the historical package and scores', () => {
  const page = readFileSync(new URL('../app/casos/tokenizart/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('Auditoría pública: 2026-11-03'));
  assert.ok(page.includes('Paquete historico de referencia'));
  assert.ok(page.includes('Baseline histórico del 2026-08-26'));
  assert.ok(page.includes('https://tokenizart.com/llms.txt'));
  assert.ok(page.includes('reportados por Gabriel'));
  assert.ok(!page.includes('<h2>Archivos listos para revision</h2>'));
});

test('registry explicitly labels its retained score as historical', () => {
  const profile = JSON.parse(readFileSync(new URL('../registry/builtin/tokenizart.v1.json', import.meta.url), 'utf8'));
  assert.equal(profile.readiness.score, 23);
  assert.ok(profile.limits.some(value => value.includes('2026-08-26') && value.includes('historico')));
  assert.ok(profile.observedResources.some(value => value.url === 'https://tokenizart.com/llms.txt'));
});

test('dated public audit separates origins, engine and operational limits', () => {
  const page = readFileSync(new URL('../app/casos/tokenizart/page.tsx', import.meta.url), 'utf8');
  const audit = JSON.parse(readFileSync(new URL('../public/cases/tokenizart/public-audit-2026-11-03.json', import.meta.url), 'utf8'));
  assert.equal(audit.runtimeSourceRevision, null);
  assert.ok(page.includes("import publicAudit from '../../../public/cases/tokenizart/public-audit-2026-11-03.json'"));
  assert.ok(page.includes('const currentAudits = publicAudit.observations;'));
  assert.equal(audit.methodology, 'Gabriel Mucchiut Agent Friendly Web Method v1');
  assert.deepEqual(audit.observations.map(item => [item.origin, item.score]), [
    ['https://tokenizart.com', 87], ['https://atelier.tokenizart.com', 87], ['https://agentfriendlyweb.dev', 95],
  ]);
  for (const item of audit.observations) {
    assert.match(item.checkedAt, /^2026-11-03T14:4[01]:/);
    assert.equal(item.llmsStatus, 200);
    assert.equal(item.sitemapStatus, 200);
  }
  assert.ok(page.includes('encodeURIComponent(audit.origin)'));
  assert.ok(page.includes('no acredita permisos, acciones, pagos'));
  assert.ok(page.includes('no realizamos una nueva medicion de Cloudflare'));
  assert.ok(page.includes('Ese 404 es historico'));
  assert.ok(!page.includes('Atelier: llms pendiente'));
  assert.ok(!page.includes('Publicacion verificada: 2026-09-09'));
});

test('visual chronology distinguishes observation dates from installation and reports', () => {
  const page = readFileSync(new URL('../app/casos/tokenizart/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('aria-labelledby="evolution-title"'));
  for (const date of ['2026-08-26', '2026-09-09', '2026-11-03']) assert.ok(page.includes('dateTime="' + date + '"'));
  assert.ok(page.includes('no cuándo se instaló'));
  assert.ok(page.includes('sin una medición independiente reproducible'));
  assert.ok(page.includes('No se probaron operaciones de esas herramientas'));
  const audit = JSON.parse(readFileSync(new URL('../public/cases/tokenizart/public-audit-2026-11-03.json', import.meta.url), 'utf8'));
  assert.equal(audit.observations[0].detectedPublicSignals.includes('mcp'), false);
  assert.equal(audit.observations[1].detectedPublicSignals.includes('mcp'), false);
  assert.equal(audit.observations[2].detectedPublicSignals.includes('mcp'), true);
});
