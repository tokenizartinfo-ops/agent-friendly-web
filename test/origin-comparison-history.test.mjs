import test from 'node:test';
import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync, readdirSync } from 'node:fs';

test('refresh migration preserves the first observation and permits a later snapshot with isolated idempotency', () => {
  const db = new DatabaseSync(':memory:');
  try {
    const files = readdirSync('drizzle').filter(x => /^\d{4}_.*\.sql$/.test(x)).sort();
    for (const file of files.filter(x => Number(x.slice(0, 4)) < 10)) db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
    const insert = () => db.prepare('INSERT INTO capsule_origin_comparisons (id,capsule_id,site_id,project_id,user_id,manifest_sha256,origin,contract_version,comparison_json,idempotency_key,expires_at,created_at,updated_at) VALUES (?,\'capsule\',\'site\',\'project\',\'owner\',\'manifest\',\'https://fixture.example\',\'comparison-v1\',?,?,\'2030-01-01\',?,?)');
    insert().run('before', '{"resource":"missing"}', 'before-key', '2026-09-30T12:00:00Z', '2026-09-30T12:00:00Z');
    for (const file of files.filter(x => Number(x.slice(0, 4)) >= 10)) db.exec(readFileSync(`drizzle/${file}`, 'utf8'));
    insert().run('after', '{"resource":"unchanged"}', 'after-key', '2026-09-30T12:01:00Z', '2026-09-30T12:01:00Z');
    assert.equal(db.prepare('SELECT comparison_json FROM capsule_origin_comparisons WHERE id=?').get('before').comparison_json, '{"resource":"missing"}');
    assert.equal(db.prepare('SELECT id FROM capsule_origin_comparisons ORDER BY created_at DESC LIMIT 1').get().id, 'after');
    assert.throws(() => insert().run('duplicate', '{}', 'after-key', 'later', 'later'), /UNIQUE/);
    assert.equal(db.prepare('SELECT count(*) AS n FROM capsule_origin_comparisons').get().n, 2);
  } finally { db.close(); }
});

test('new comparison requests do not reuse a snapshot merely because the manifest is unchanged', () => {
  const route = readFileSync('app/api/projects/[projectId]/deployment-capsules/[capsuleId]/comparison/route.ts', 'utf8');
  assert.doesNotMatch(route, /const \[existing\]/);
  assert.match(route, /replayed\.userId !== user\.userId/);
  assert.match(route, /orderBy\(desc\(capsuleOriginComparisons.createdAt\)\)/);
});
