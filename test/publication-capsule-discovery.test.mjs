import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const read = (path) => readFile(path, 'utf8');

test('public discovery documents the deployed manual capsule without remote apply', async () => {
  const [siteMap, readinessText, catalogText, llms, llmsFull] = await Promise.all([
    read('app/mapa-del-sitio/page.tsx'),
    read('public/.well-known/agent-readiness.json'),
    read('public/.well-known/ai-catalog.json'),
    read('public/llms.txt'),
    read('public/llms-full.txt'),
  ]);

  const readiness = JSON.parse(readinessText);
  const catalog = JSON.parse(catalogText);
  const catalogUrls = catalog.resources.map((resource) => resource.url);

  assert.equal(readiness.capabilities.publication_capsule.status, 'deployed');
  assert.equal(readiness.capabilities.publication_capsule.mode, 'manual_handoff');
  assert.equal(readiness.capabilities.publication_capsule.remote_apply, false);
  assert.equal(readiness.capabilities.a2a.status, 'planned');

  for (const path of [
    '/schemas/publication-capsule.v1.json',
    '/schemas/capsule-decision.v1.json',
  ]) {
    assert.match(siteMap, new RegExp(path.replaceAll('.', '\\.'), 'u'));
    assert.match(llms, new RegExp(path.replaceAll('.', '\\.'), 'u'));
    assert.match(llmsFull, new RegExp(path.replaceAll('.', '\\.'), 'u'));
    assert.ok(catalogUrls.includes(`https://agentfriendlyweb.dev${path}`));
  }

  assert.match(siteMap, /Capsula manual/u);
  assert.match(siteMap, /Desplegada/u);
  assert.match(llms, /does not modify the target website/u);
  assert.match(llmsFull, /no aplica cambios remotos/u);
});
