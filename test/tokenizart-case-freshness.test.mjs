import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('case separates live resources from the historical package and scores', () => {
  const page = readFileSync(new URL('../app/casos/tokenizart/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('Auditoria publica: 2026-11-03'));
  assert.ok(page.includes('Paquete historico de referencia'));
  assert.ok(page.includes('Baseline historico del 2026-08-26'));
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
  assert.equal(audit.methodology, 'Gabriel Mucchiut Agent Friendly Web Method v1');
  assert.deepEqual(audit.observations.map(item => [item.origin, item.score]), [
    ['https://tokenizart.com', 87], ['https://atelier.tokenizart.com', 87], ['https://agentfriendlyweb.dev', 95],
  ]);
  for (const item of audit.observations) {
    assert.ok(page.includes(item.checkedAt));
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
