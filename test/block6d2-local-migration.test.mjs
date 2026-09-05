import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

const migrationFiles = [
  'drizzle/0000_tearful_ego.sql',
  'drizzle/0001_registry_block1.sql',
  'drizzle/0002_publication_capsules.sql',
  'drizzle/0003_origin_comparisons_and_draft_pr_plans.sql',
  'drizzle/0004_common_guardsmen.sql',
  'drizzle/0005_normal_ma_gnuci.sql',
  'drizzle/0006_email_transactional_deliveries.sql',
  'drizzle/0007_synthetic_crm_lite.sql',
];

test('Gate 6D.2 migration is additive and creates empty metadata-only CRM tables', async () => {
  const database = new DatabaseSync(':memory:');
  for (const file of migrationFiles) {
    const sql = (await readFile(file, 'utf8')).replaceAll('--> statement-breakpoint', '');
    database.exec(sql);
  }

  const tables = database
    .prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name")
    .all()
    .map((row) => row.name);
  assert.ok(tables.includes('crm_opportunities'));
  assert.ok(tables.includes('crm_transition_events'));

  const opportunityColumns = database
    .prepare('PRAGMA table_info(crm_opportunities)')
    .all()
    .map((row) => row.name);
  assert.deepEqual(opportunityColumns, [
    'id', 'contact_ref', 'domain', 'segment', 'problem', 'source', 'locale', 'stage',
    'owner_context', 'maintainer_context', 'scope_codes_json', 'estimated_value_band',
    'next_action', 'next_action_at', 'evidence_refs_json', 'loss_reason',
    'actor_subject_hash', 'idempotency_key', 'request_hash', 'created_at', 'updated_at',
  ]);
  const forbiddenColumns = ['email', 'name', 'phone', 'message', 'notes', 'body', 'price'];
  for (const column of forbiddenColumns) assert.equal(opportunityColumns.includes(column), false);

  assert.equal(database.prepare('SELECT count(*) AS count FROM crm_opportunities').get().count, 0);
  assert.equal(database.prepare('SELECT count(*) AS count FROM crm_transition_events').get().count, 0);
  const migration = await readFile('drizzle/0007_synthetic_crm_lite.sql', 'utf8');
  assert.doesNotMatch(migration, /^\s*(DROP|DELETE|UPDATE|ALTER|RENAME)\b/im);
  database.close();
});
