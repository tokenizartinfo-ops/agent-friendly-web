import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

test('robots publishes explicit crawler guidance while reserving training', async () => {
  const robots = await readFile('public/robots.txt', 'utf8');
  for (const crawler of ['GPTBot', 'OAI-SearchBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended']) {
    assert.match(robots, new RegExp(`User-agent: ${crawler}`, 'i'));
  }
  assert.match(robots, /Content-Signal:\s*search=yes,\s*ai-input=yes,\s*ai-train=no/i);
  assert.match(robots, /Disallow:\s*\/api\/projects/i);
});

test('readiness manifest separates deployed capabilities from roadmap work', async () => {
  const manifest = JSON.parse(await readFile('public/.well-known/agent-readiness.json', 'utf8'));
  assert.equal(manifest.canonical_origin, canonical);
  assert.equal(manifest.capabilities.discovery.status, 'deployed');
  assert.equal(manifest.capabilities.openapi.status, 'deployed');
  assert.equal(manifest.capabilities.mcp.status, 'deployed');
  assert.match(manifest.capabilities.mcp.note, /public.*read-only/i);
  assert.equal(manifest.capabilities.a2a.status, 'planned');
  assert.equal(manifest.capabilities.x402.status, 'research');
  assert.match(manifest.convention, /not an official standard/i);
});

test('public catalogs discover the readiness manifest and maturity demonstrator', async () => {
  const catalog = JSON.parse(await readFile('public/.well-known/ai-catalog.json', 'utf8'));
  const urls = catalog.entries.map((resource) => resource.url);
  assert.ok(urls.includes(`${canonical}/.well-known/agent-readiness.json`));
  assert.ok(urls.includes(`${canonical}/evolucion-agentica`));
});

test('all approved discovery surfaces expose the public OKF release without inventing a universal endpoint', async () => {
  const llms = await readFile('public/llms.txt', 'utf8');
  const llmsFull = await readFile('public/llms-full.txt', 'utf8');
  for (const document of [llms, llmsFull]) {
    assert.match(document, /https:\/\/agentfriendlyweb\.dev\/conocimiento-abierto/);
    assert.match(document, /https:\/\/agentfriendlyweb\.dev\/okf\/v0\.2\/index\.md/);
    assert.match(document, /https:\/\/agentfriendlyweb\.dev\/okf\/v0\.2\/manifest\.json/);
  }

  const catalog = JSON.parse(await readFile('public/.well-known/ai-catalog.json', 'utf8'));
  const urls = catalog.entries.map((resource) => resource.url);
  for (const url of [
    `${canonical}/conocimiento-abierto`,
    `${canonical}/okf/v0.2/index.md`,
    `${canonical}/okf/v0.2/manifest.json`,
    `${canonical}/okf/v0.2/CHECKSUMS.sha256`,
  ]) assert.ok(urls.includes(url), `AI Catalog is missing ${url}`);
  assert.equal(catalog.specVersion, '1.0');
  assert.ok(catalog.entries.some((entry) => /OKF/i.test(entry.displayName)));

  const readiness = JSON.parse(await readFile('public/.well-known/agent-readiness.json', 'utf8'));
  assert.equal(readiness.capabilities.open_knowledge_okf.status, 'deployed');
  assert.ok(readiness.capabilities.open_knowledge_okf.resources.includes('/okf/v0.2/index.md'));
  assert.match(readiness.capabilities.open_knowledge_okf.note, /read-only/i);

  await assert.rejects(readFile('public/.well-known/okf.json', 'utf8'), /ENOENT/);
});

test('Tokenizart and Atelier packages attribute their agentic roadmap', async () => {
  const paths = [
    'public/cases/tokenizart/tokenizart.com/llms.txt',
    'public/cases/tokenizart/tokenizart.com/llms-full.txt',
    'public/cases/tokenizart/atelier.tokenizart.com/llms.txt',
    'public/cases/tokenizart/atelier.tokenizart.com/llms-full.txt',
  ];
  const docs = await Promise.all(paths.map((path) => readFile(path, 'utf8')));
  for (const [index, document] of docs.entries()) {
    assert.match(document, /Agent Friendly Web/i, `${paths[index]} lacks attribution`);
    assert.match(document, /https:\/\/agentfriendlyweb\.dev\/casos\/tokenizart/);
  }
});

test('the maturity page labels comparisons as illustrative rather than guaranteed', async () => {
  const page = await readFile('app/evolucion-agentica/page.tsx', 'utf8');
  assert.match(page, /Restaurante/);
  assert.match(page, /Municipalidad/);
  assert.match(page, /Tokenizart/);
  assert.match(page, /ilustrativ/i);
  assert.match(page, /no garantiza/i);
});
