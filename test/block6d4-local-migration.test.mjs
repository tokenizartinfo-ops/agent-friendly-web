import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

const priorMigrationFiles = [
  'drizzle/0000_tearful_ego.sql',
  'drizzle/0001_registry_block1.sql',
  'drizzle/0002_publication_capsules.sql',
  'drizzle/0003_origin_comparisons_and_draft_pr_plans.sql',
  'drizzle/0004_common_guardsmen.sql',
  'drizzle/0005_normal_ma_gnuci.sql',
  'drizzle/0006_email_transactional_deliveries.sql',
  'drizzle/0007_synthetic_crm_lite.sql',
];

test('Gate 6D.4 migration is additive and preserves existing contact and CRM rows', async () => {
  const database = new DatabaseSync(':memory:');
  for (const file of priorMigrationFiles) {
    const sql = (await readFile(file, 'utf8')).replaceAll('--> statement-breakpoint', '');
    database.exec(sql);
  }

  database.prepare(`
    INSERT INTO contact_leads (
      id, email, domain, locale, objective, source, idempotency_key, request_hash,
      created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'lead-existing',
    'privacy@example.invalid',
    'example.invalid',
    'en',
    'privacy-lifecycle-test',
    'local-test',
    'lead-existing-key',
    'lead-existing-request',
    '2026-09-03T00:00:00.000Z',
    '2026-09-03T00:00:00.000Z',
  );
  database.prepare(`
    INSERT INTO crm_opportunities (
      id, contact_ref, domain, segment, problem, source, locale, owner_context,
      maintainer_context, next_action, actor_subject_hash, idempotency_key,
      request_hash, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(
    'crm-existing',
    'lead-existing',
    'example.invalid',
    'synthetic',
    'privacy-lifecycle-test',
    'local-test',
    'en',
    'synthetic-owner',
    'synthetic-maintainer',
    'none',
    'synthetic-actor-hash',
    'crm-existing-key',
    'crm-existing-request',
    '2026-09-03T00:00:00.000Z',
    '2026-09-03T00:00:00.000Z',
  );

  const legacyConsentColumns = database.prepare('PRAGMA table_info(consent_receipts)').all();
  const migration = await readFile('drizzle/0008_contact_privacy_lifecycle.sql', 'utf8');
  database.exec(migration.replaceAll('--> statement-breakpoint', ''));

  const tables = database
    .prepare("SELECT name FROM sqlite_schema WHERE type = 'table' ORDER BY name")
    .all()
    .map((row) => row.name);
  const requiredTables = [
    'contact_consent_events',
    'privacy_requests',
    'contact_suppressions',
    'data_lifecycle_events',
  ];
  for (const table of requiredTables) assert.ok(tables.includes(table));

  const lifecycleColumnNames = [
    'last_interaction_at',
    'retention_expires_at',
    'erased_at',
    'privacy_policy_version',
    'restriction_state',
  ];
  const leadLifecycleColumns = database
    .prepare('PRAGMA table_info(contact_leads)')
    .all()
    .map((row) => row.name)
    .filter((name) => lifecycleColumnNames.includes(name));
  assert.deepEqual(leadLifecycleColumns, lifecycleColumnNames);

  const crmColumns = database
    .prepare('PRAGMA table_info(crm_opportunities)')
    .all()
    .map((row) => row.name);
  assert.ok(crmColumns.includes('contact_status'));

  for (const table of requiredTables) {
    assert.equal(database.prepare(`SELECT count(*) AS count FROM ${table}`).get().count, 0);
  }

  const lead = database.prepare(`
    SELECT email, last_interaction_at, retention_expires_at, erased_at,
      privacy_policy_version, restriction_state
    FROM contact_leads WHERE id = ?
  `).get('lead-existing');
  assert.equal(lead.email, 'privacy@example.invalid');
  assert.equal(lead.last_interaction_at, '');
  assert.equal(lead.retention_expires_at, '');
  assert.equal(lead.erased_at, '');
  assert.equal(lead.privacy_policy_version, '');
  assert.equal(lead.restriction_state, 'none');

  const opportunity = database
    .prepare('SELECT contact_ref, contact_status FROM crm_opportunities WHERE id = ?')
    .get('crm-existing');
  assert.equal(opportunity.contact_ref, 'lead-existing');
  assert.equal(opportunity.contact_status, 'active');

  assert.deepEqual(database.prepare('PRAGMA table_info(consent_receipts)').all(), legacyConsentColumns);
  assert.doesNotMatch(migration, /\b(DROP|DELETE|UPDATE|RENAME)\b/i);
  assert.doesNotMatch(migration, /CREATE TABLE `__new_/i);
  database.close();
});
