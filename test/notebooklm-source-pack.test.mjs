import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const PACK_ROOT = 'docs/notebooklm/agent-friendly-web-public-level5-2026-08-31';
const PACK_MANIFEST = `${PACK_ROOT}/source-manifest.json`;

test('NotebookLM pack is public, traceable and non-canonical', async () => {
  const manifest = JSON.parse(await readFile(PACK_MANIFEST, 'utf8'));

  assert.equal(manifest.schema, 'agent-friendly-web.notebooklm-public-source-pack.v1');
  assert.equal(manifest.sensitivity, 'Nivel 5');
  assert.equal(manifest.canonical_source, 'repository');
  assert.equal(manifest.derivative_policy, 'requires_human_qa');
  assert.equal(manifest.reviewed_by, 'human:gabriel-mucchiut');
  assert.match(manifest.repository_revision, /^[a-f0-9]{40}$/);
  assert.ok(manifest.sources.some((source) => source.path.includes('public/okf/v0.2/index.md')));
  assert.ok(manifest.sources.every((source) => source.reviewed_at === '2026-08-31T00:00:00Z'));
  assert.ok(manifest.sources.every((source) => /^[a-f0-9]{64}$/.test(source.sha256)));
  assert.ok(manifest.sources.every((source) => !source.canonical_url.includes('/blob/main/')));
  for (const source of manifest.sources) {
    const blob = execFileSync('git', ['show', `${manifest.repository_revision}:${source.path}`]);
    assert.equal(createHash('sha256').update(blob).digest('hex'), source.sha256, source.path);
  }
  assert.ok(manifest.exclusions.includes('credentials'));
  assert.ok(manifest.exclusions.includes('private_dossiers'));
});

test('NotebookLM pack explains provenance, QA and exclusions for operators', async () => {
  const readme = await readFile(`${PACK_ROOT}/README.md`, 'utf8');

  assert.match(readme, /fuente canonica.*repositorio/i);
  assert.match(readme, /NotebookLM.*auxiliar/i);
  assert.match(readme, /needs_review/i);
  assert.match(readme, /credenciales/i);
  assert.match(readme, /expedientes privados/i);
  assert.match(readme, /QA humana/i);
});
