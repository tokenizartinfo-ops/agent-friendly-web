import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import test from 'node:test';

test('Tokenizart built-in profile is attributed, versioned and honest about maturity', async () => {
  const raw = await readFile('registry/builtin/tokenizart.v1.json', 'utf8');
  const profile = JSON.parse(raw);

  assert.equal(profile.contract, 'agentfriendly.public-profile.v1');
  assert.equal(profile.slug, 'tokenizart');
  assert.equal(profile.version, 1);
  assert.equal(profile.assertions.primarySite.value, 'https://tokenizart.com/');
  assert.equal(profile.assertions.operatingPlatform.value, 'https://atelier.tokenizart.com/');
  assert.equal(profile.assertions.operatingPlatform.state, 'owner_declared');
  assert.equal(profile.assertions.agenticArtifacts.value.status, 'release_candidate');
  assert.equal(JSON.stringify(profile).includes('production MCP'), false);
  assert.equal(JSON.stringify(profile).includes('100% agent friendly'), false);
});

test('built-in Registry adapter prevents D1 profiles from replacing curated slugs', async () => {
  const path = 'registry/builtin/index.ts';
  assert.equal(await stat(path).then(() => true).catch(() => false), true, `${path} must exist`);
  const source = await readFile(path, 'utf8');
  const store = await readFile('lib/registry-store.ts', 'utf8');

  assert.match(source, /tokenizart\.v1\.json/);
  assert.match(source, /getBuiltinProfile/);
  assert.match(store, /getBuiltinProfile/);
  assert.match(store, /builtinSlugs/);
});

test('Tokenizart case manifest and page link to canonical Registry formats', async () => {
  const manifest = JSON.parse(await readFile('public/cases/tokenizart/manifest.json', 'utf8'));
  const page = await readFile('app/casos/tokenizart/page.tsx', 'utf8');

  assert.equal(manifest.agentic_readiness.registry_profile, 'https://agentfriendlyweb.dev/registry/tokenizart');
  assert.equal(manifest.agentic_readiness.registry_json, 'https://agentfriendlyweb.dev/registry/tokenizart/profile.json');
  assert.equal(manifest.agentic_readiness.registry_markdown, 'https://agentfriendlyweb.dev/registry/tokenizart/profile.md');
  assert.match(page, /\/registry\/tokenizart/);
});
