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

const requiredTableContracts = {
  contact_consent_events: {
    columns: [
      ['id', 'text', true, null, true],
      ['lead_id', 'text', true, null, false],
      ['purpose', 'text', true, null, false],
      ['copy_version', 'text', true, null, false],
      ['action', 'text', true, null, false],
      ['evidence_hash', 'text', true, null, false],
      ['actor_ref_hash', 'text', true, null, false],
      ['idempotency_key', 'text', true, null, false],
      ['request_hash', 'text', true, null, false],
      ['created_at', 'text', true, null, false],
    ],
    indexes: [
      ['contact_consent_events_idempotency_unique', true, ['idempotency_key']],
      ['contact_consent_events_lead_purpose_created_idx', false, ['lead_id', 'purpose', 'created_at']],
    ],
  },
  privacy_requests: {
    columns: [
      ['id', 'text', true, null, true],
      ['request_type', 'text', true, null, false],
      ['contact_ref_hash', 'text', true, null, false],
      ['status', 'text', true, "'pending_verification'", false],
      ['verification_hash', 'text', true, null, false],
      ['verification_expires_at', 'text', true, null, false],
      ['policy_version', 'text', true, null, false],
      ['decision_code', 'text', true, "''", false],
      ['idempotency_key', 'text', true, null, false],
      ['request_hash', 'text', true, null, false],
      ['created_at', 'text', true, null, false],
      ['verified_at', 'text', true, "''", false],
      ['resolved_at', 'text', true, "''", false],
      ['expires_at', 'text', true, null, false],
    ],
    indexes: [
      ['privacy_requests_idempotency_unique', true, ['idempotency_key']],
      ['privacy_requests_status_expires_idx', false, ['status', 'expires_at']],
      ['privacy_requests_verification_hash_unique', true, ['verification_hash']],
    ],
  },
  contact_suppressions: {
    columns: [
      ['id', 'text', true, null, true],
      ['email_hmac', 'text', true, null, false],
      ['purpose', 'text', true, null, false],
      ['reason_code', 'text', true, null, false],
      ['policy_version', 'text', true, null, false],
      ['idempotency_key', 'text', true, null, false],
      ['created_at', 'text', true, null, false],
      ['expires_at', 'text', true, null, false],
    ],
    indexes: [
      ['contact_suppressions_email_purpose_unique', true, ['email_hmac', 'purpose']],
      ['contact_suppressions_idempotency_unique', true, ['idempotency_key']],
    ],
  },
  data_lifecycle_events: {
    columns: [
      ['id', 'text', true, null, true],
      ['event_type', 'text', true, null, false],
      ['contact_ref_hash', 'text', true, null, false],
      ['result_code', 'text', true, null, false],
      ['policy_version', 'text', true, null, false],
      ['idempotency_key', 'text', true, null, false],
      ['request_hash', 'text', true, null, false],
      ['created_at', 'text', true, null, false],
    ],
    indexes: [
      ['data_lifecycle_events_contact_created_idx', false, ['contact_ref_hash', 'created_at']],
      ['data_lifecycle_events_idempotency_unique', true, ['idempotency_key']],
    ],
  },
};

function readColumnContract(database, table) {
  return database.prepare(`PRAGMA table_info(${table})`).all().map((row) => [
    row.name,
    row.type.toLowerCase(),
    row.notnull === 1,
    row.dflt_value,
    row.pk === 1,
  ]);
}

function readNamedIndexContract(database, table) {
  return database
    .prepare(`PRAGMA index_list(${table})`)
    .all()
    .filter((row) => row.origin === 'c')
    .map((row) => [
      row.name,
      row.unique === 1,
      database.prepare(`PRAGMA index_info(${row.name})`).all().map((column) => column.name),
    ])
    .sort(([left], [right]) => left.localeCompare(right));
}

function insertRow(database, table, row) {
  const columns = Object.keys(row);
  const placeholders = columns.map(() => '?').join(', ');
  database
    .prepare(`INSERT INTO ${table} (${columns.join(', ')}) VALUES (${placeholders})`)
    .run(...Object.values(row));
}

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

  for (const [table, contract] of Object.entries(requiredTableContracts)) {
    assert.deepEqual(readColumnContract(database, table), contract.columns);
    assert.deepEqual(readNamedIndexContract(database, table), contract.indexes);
  }

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

  const consentEvent = {
    id: 'consent-event-1',
    lead_id: 'lead-existing',
    purpose: 'contact_reply',
    copy_version: 'privacy-v1',
    action: 'granted',
    evidence_hash: 'consent-evidence-1',
    actor_ref_hash: 'consent-actor-1',
    idempotency_key: 'consent-idempotency-1',
    request_hash: 'consent-request-1',
    created_at: '2026-09-03T01:00:00.000Z',
  };
  insertRow(database, 'contact_consent_events', consentEvent);
  assert.throws(
    () => insertRow(database, 'contact_consent_events', {
      ...consentEvent,
      id: 'consent-event-2',
      idempotency_key: consentEvent.idempotency_key,
    }),
    /UNIQUE constraint failed: contact_consent_events\.idempotency_key/,
  );

  const privacyRequest = {
    id: 'privacy-request-1',
    request_type: 'access',
    contact_ref_hash: 'privacy-contact-1',
    verification_hash: 'privacy-verification-1',
    verification_expires_at: '2026-09-04T01:00:00.000Z',
    policy_version: 'privacy-v1',
    idempotency_key: 'privacy-idempotency-1',
    request_hash: 'privacy-request-hash-1',
    created_at: '2026-09-03T01:00:00.000Z',
    expires_at: '2026-10-03T01:00:00.000Z',
  };
  insertRow(database, 'privacy_requests', privacyRequest);
  assert.throws(
    () => insertRow(database, 'privacy_requests', {
      ...privacyRequest,
      id: 'privacy-request-2',
      verification_hash: 'privacy-verification-2',
    }),
    /UNIQUE constraint failed: privacy_requests\.idempotency_key/,
  );
  assert.throws(
    () => insertRow(database, 'privacy_requests', {
      ...privacyRequest,
      id: 'privacy-request-3',
      idempotency_key: 'privacy-idempotency-3',
    }),
    /UNIQUE constraint failed: privacy_requests\.verification_hash/,
  );

  const suppression = {
    id: 'suppression-1',
    email_hmac: 'email-hmac-1',
    purpose: 'contact_reply',
    reason_code: 'withdrawn',
    policy_version: 'privacy-v1',
    idempotency_key: 'suppression-idempotency-1',
    created_at: '2026-09-03T01:00:00.000Z',
    expires_at: '2027-09-03T01:00:00.000Z',
  };
  insertRow(database, 'contact_suppressions', suppression);
  assert.throws(
    () => insertRow(database, 'contact_suppressions', {
      ...suppression,
      id: 'suppression-2',
      idempotency_key: 'suppression-idempotency-2',
    }),
    /UNIQUE constraint failed: contact_suppressions\.email_hmac, contact_suppressions\.purpose/,
  );
  assert.throws(
    () => insertRow(database, 'contact_suppressions', {
      ...suppression,
      id: 'suppression-3',
      email_hmac: 'email-hmac-3',
      purpose: 'privacy_request',
    }),
    /UNIQUE constraint failed: contact_suppressions\.idempotency_key/,
  );

  const lifecycleEvent = {
    id: 'lifecycle-event-1',
    event_type: 'retention_reviewed',
    contact_ref_hash: 'privacy-contact-1',
    result_code: 'retained',
    policy_version: 'privacy-v1',
    idempotency_key: 'lifecycle-idempotency-1',
    request_hash: 'lifecycle-request-1',
    created_at: '2026-09-03T01:00:00.000Z',
  };
  insertRow(database, 'data_lifecycle_events', lifecycleEvent);
  assert.throws(
    () => insertRow(database, 'data_lifecycle_events', {
      ...lifecycleEvent,
      id: 'lifecycle-event-2',
    }),
    /UNIQUE constraint failed: data_lifecycle_events\.idempotency_key/,
  );

  for (const table of requiredTables) {
    assert.equal(database.prepare(`SELECT count(*) AS count FROM ${table}`).get().count, 1);
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
