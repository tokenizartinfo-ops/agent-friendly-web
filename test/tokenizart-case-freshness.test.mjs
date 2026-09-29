import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

test('case separates live resources from the historical package and scores', () => {
  const page = readFileSync(new URL('../app/casos/tokenizart/page.tsx', import.meta.url), 'utf8');
  assert.ok(page.includes('Publicacion verificada: 2026-09-09'));
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
