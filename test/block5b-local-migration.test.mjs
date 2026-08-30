import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

test('all D1 migrations apply in order to an isolated SQLite database and leave Block 5B tables empty', async () => {
  const database = new DatabaseSync(':memory:');
  for (const file of [
    'drizzle/0000_tearful_ego.sql',
    'drizzle/0001_registry_block1.sql',
    'drizzle/0002_publication_capsules.sql',
    'drizzle/0003_origin_comparisons_and_draft_pr_plans.sql',
  ]) {
    const sql = (await readFile(file, 'utf8')).replaceAll('--> statement-breakpoint', '');
    database.exec(sql);
  }

  const tables = database.prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name").all().map((row) => row.name);
  assert.ok(tables.includes('capsule_origin_comparisons'));
  assert.ok(tables.includes('draft_pr_plans'));
  assert.equal(database.prepare('SELECT count(*) AS count FROM capsule_origin_comparisons').get().count, 0);
  assert.equal(database.prepare('SELECT count(*) AS count FROM draft_pr_plans').get().count, 0);
  assert.equal(database.prepare('SELECT count(*) AS count FROM publication_capsules').get().count, 0);
  database.close();
});
