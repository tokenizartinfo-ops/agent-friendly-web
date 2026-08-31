import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

test('Gate 6B migration is additive and creates empty contact tables', async () => {
  const database = new DatabaseSync(':memory:');
  for (const file of [
    'drizzle/0000_tearful_ego.sql',
    'drizzle/0001_registry_block1.sql',
    'drizzle/0002_publication_capsules.sql',
    'drizzle/0003_origin_comparisons_and_draft_pr_plans.sql',
    'drizzle/0004_common_guardsmen.sql',
    'drizzle/0005_normal_ma_gnuci.sql',
  ]) {
    const sql = (await readFile(file, 'utf8')).replaceAll('--> statement-breakpoint', '');
    database.exec(sql);
  }
  const tables = database.prepare("SELECT name FROM sqlite_schema WHERE type = 'table'").all().map((row) => row.name);
  assert.ok(tables.includes('contact_leads'));
  assert.ok(tables.includes('consent_receipts'));
  const leadColumns = database.prepare('PRAGMA table_info(contact_leads)').all().map((row) => row.name);
  assert.ok(leadColumns.includes('request_hash'));
  assert.equal(database.prepare('SELECT count(*) AS count FROM contact_leads').get().count, 0);
  assert.equal(database.prepare('SELECT count(*) AS count FROM consent_receipts').get().count, 0);
  database.close();
});
