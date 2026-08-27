import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const EXPECTED_CONCEPTS = [
  'method/agent-friendly-web-method.md',
  'method/maturity-levels-af0-af5.md',
  'method/evidence-and-scoring.md',
  'discovery/public-audit.md',
  'discovery/aeo-and-crawler-policy.md',
  'discovery/public-discovery-resources.md',
  'registry/registry-and-provenance-states.md',
  'registry/domain-verification-boundary.md',
  'assistance/intake-assistant-boundary.md',
  'assistance/readiness-comparison-boundary.md',
  'cases/tokenizart-first-integral-case.md',
];

const PUBLIC_SOURCE_ALLOWLIST = new Set([
  'docs/METHODOLOGY.es.md',
  'docs/AEO-AND-CRAWLER-POLICY.es.md',
  'docs/SECURITY.md',
  'docs/SPECIFICATION.es.md',
  'docs/TOKENIZART-CASE-2026-08-26.md',
  'docs/AGENT-NATIVE-DISCOVERY-ROADMAP-2026-08-26.md',
  'docs/BLOCK-3-INTAKE-ASSISTANT-CONTRACT.es.md',
  'docs/BLOCK-2-SECTOR-MULTILINGUAL-MEASUREMENT.es.md',
  'public/.well-known/agent-readiness.json',
  'public/.well-known/readiness-comparison-contract.json',
]);

async function loadSourceManifest() {
  return JSON.parse(await readFile('config/okf-public-sources.v1.json', 'utf8'));
}

test('OKF source manifest fixes the approved public release contract', async () => {
  const manifest = await loadSourceManifest();

  assert.equal(manifest.schema, 'agent-friendly-web.okf-public-sources.v1');
  assert.equal(manifest.okf_version, '0.2');
  assert.equal(manifest.canonical_origin, 'https://agentfriendlyweb.dev');
  assert.equal(manifest.license, 'CC-BY-4.0');
  assert.equal(manifest.marks, 'reserved');
  assert.equal(manifest.release.verified_by, 'human:gabriel-mucchiut');
  assert.match(manifest.release.generated_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  assert.match(manifest.release.verified_at, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);
  assert.match(manifest.release.stale_after, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/);

  const outputs = manifest.concepts.map((concept) => concept.output).sort();
  assert.deepEqual(outputs, [...EXPECTED_CONCEPTS].sort());
  assert.equal(new Set(outputs).size, EXPECTED_CONCEPTS.length);

  for (const concept of manifest.concepts) {
    assert.ok(concept.title);
    assert.ok(concept.description);
    assert.ok(concept.type);
    assert.match(concept.resource, /^https:\/\/agentfriendlyweb\.dev\//);
    assert.ok(Array.isArray(concept.sources) && concept.sources.length > 0);
    for (const source of concept.sources) {
      assert.ok(PUBLIC_SOURCE_ALLOWLIST.has(source.path), `${source.path} is not an approved public source`);
      assert.ok(Array.isArray(source.sections) && source.sections.length > 0);
    }
  }
});
