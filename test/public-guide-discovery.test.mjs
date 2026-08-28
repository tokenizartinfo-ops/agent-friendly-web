import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

test('human navigation exposes the public guide and keeps intake separate', async () => {
  const [header, footer, siteMap, sitemap] = await Promise.all([
    readFile('app/components/site-header.tsx', 'utf8'),
    readFile('app/components/site-footer.tsx', 'utf8'),
    readFile('app/mapa-del-sitio/page.tsx', 'utf8'),
    readFile('app/sitemap.ts', 'utf8'),
  ]);

  assert.match(header, /href="\/guia"/);
  assert.match(footer, /\['Guia publica', '\/guia'\]/);
  assert.match(siteMap, /Guia publica/);
  assert.match(siteMap, /Public guide contract/);
  assert.match(sitemap, /\/guia/);
  assert.match(siteMap, /Asistente de preparacion/);
});

test('machine discovery exposes the deployed guide with bounded capabilities', async () => {
  const [llms, llmsFull, aiCatalog, readiness] = await Promise.all([
    readFile('public/llms.txt', 'utf8'),
    readFile('public/llms-full.txt', 'utf8'),
    readFile('public/.well-known/ai-catalog.json', 'utf8').then(JSON.parse),
    readFile('public/.well-known/agent-readiness.json', 'utf8').then(JSON.parse),
  ]);

  for (const content of [llms, llmsFull]) {
    assert.match(content, /https:\/\/agentfriendlyweb\.dev\/guia/);
    assert.match(content, /https:\/\/agentfriendlyweb\.dev\/\.well-known\/public-guide-contract\.json/);
  }

  const urls = aiCatalog.resources.map((resource) => resource.url);
  assert.ok(urls.includes(`${canonical}/guia`));
  assert.ok(urls.includes(`${canonical}/.well-known/public-guide-contract.json`));
  assert.equal(readiness.capabilities.public_guide.status, 'deployed');
  assert.match(readiness.capabilities.public_guide.note, /sin persistencia|no persistence/i);
  assert.equal(readiness.capabilities.mcp.status, 'deployed');
  assert.match(readiness.capabilities.mcp.note, /public.*read-only/i);
  assert.equal(readiness.capabilities.a2a.status, 'planned');
});
