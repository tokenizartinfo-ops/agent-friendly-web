import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const canonical = 'https://agentfriendlyweb.dev';

async function readJson(path) {
  return JSON.parse(await readFile(path, 'utf8'));
}

function validateCatalog(catalog) {
  assert.equal(catalog.specVersion, '1.0');
  assert.equal(catalog.host.displayName, 'Agent Friendly Web');
  assert.equal(catalog.host.identifier, 'did:web:agentfriendlyweb.dev');
  assert.ok(Array.isArray(catalog.entries));
  assert.ok(catalog.entries.length >= 8);
  for (const entry of catalog.entries) {
    assert.match(entry.identifier, /^urn:air:agentfriendlyweb\.dev:[a-z0-9._-]+:[a-z0-9._-]+$/i);
    assert.ok(entry.displayName);
    assert.ok(entry.type);
    assert.equal(typeof entry.url, 'string');
    assert.match(entry.url, /^https:\/\//);
    assert.equal('data' in entry, false);
    assert.ok(entry.representativeQueries.length >= 2);
    assert.ok(entry.representativeQueries.length <= 5);
  }
}

test('AI Catalog and current ARD alias publish equivalent valid entries', async () => {
  const [legacyPath, currentPath] = await Promise.all([
    readJson('public/.well-known/ai-catalog.json'),
    readJson('public/.well-known/ard.json'),
  ]);

  validateCatalog(legacyPath);
  validateCatalog(currentPath);
  assert.deepEqual(currentPath, legacyPath);

  const urls = legacyPath.entries.map((entry) => entry.url);
  for (const url of [
    `${canonical}/openapi.json`,
    `${canonical}/.well-known/mcp/server-card.json`,
    `${canonical}/.well-known/agent-skills/index.json`,
    `${canonical}/.well-known/external-readiness.json`,
    `${canonical}/okf/v0.2/index.md`,
    `${canonical}/schemas/publication-capsule.v1.json`,
  ]) assert.ok(urls.includes(url), `ARD catalog is missing ${url}`);
});

