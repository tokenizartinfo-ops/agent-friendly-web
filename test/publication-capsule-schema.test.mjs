import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

test('D1 schema stores immutable capsule versions and idempotent role decisions', async () => {
  const source = await readFile('db/schema.ts', 'utf8');

  for (const field of [
    'publication_capsules',
    'manifest_sha256',
    'capsule_json',
    'owner_approval_status',
    'maintainer_approval_status',
    'capsule_approvals',
    'actor_user_id',
    'idempotency_key',
  ]) {
    assert.match(source, new RegExp(field));
  }
  assert.match(source, /publication_capsules_site_version_unique/);
  assert.match(source, /capsule_approvals_capsule_role_unique/);
  assert.match(source, /capsule_approvals_idempotency_unique/);
});

test('capsule migration is additive and contains no destructive SQL', async () => {
  const sql = await readFile('drizzle/0002_publication_capsules.sql', 'utf8');

  assert.match(sql, /CREATE TABLE `publication_capsules`/);
  assert.match(sql, /CREATE TABLE `capsule_approvals`/);
  assert.match(sql, /CREATE UNIQUE INDEX `publication_capsules_site_version_unique`/);
  assert.match(sql, /CREATE UNIQUE INDEX `capsule_approvals_capsule_role_unique`/);
  assert.doesNotMatch(sql, /\b(?:DROP|DELETE|TRUNCATE|ALTER\s+TABLE\s+\S+\s+DROP)\b/i);
});

test('public JSON schemas describe the capsule and decision contracts without remote apply', async () => {
  const capsule = JSON.parse(await readFile('public/schemas/publication-capsule.v1.json', 'utf8'));
  const decision = JSON.parse(await readFile('public/schemas/capsule-decision.v1.json', 'utf8'));

  assert.equal(capsule.$id, 'https://agentfriendlyweb.dev/schemas/publication-capsule.v1.json');
  assert.deepEqual(capsule.properties.mode.enum, ['manual_handoff']);
  assert.equal(capsule.additionalProperties, false);
  assert.equal(decision.$id, 'https://agentfriendlyweb.dev/schemas/capsule-decision.v1.json');
  assert.deepEqual(decision.properties.decision.enum, ['approved', 'rejected']);
  assert.equal('role' in decision.properties, false);
});
