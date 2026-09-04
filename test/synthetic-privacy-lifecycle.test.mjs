import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
  runSyntheticPrivacyLifecycle,
} from '../lib/synthetic-privacy-lifecycle.mjs';

const ACTOR_REF_HASH = 'a'.repeat(64);
const SUPPRESSION_HMAC_KEY = 'synthetic-test-hmac-key-32-bytes!';
const FIXTURE_ID = '38e17927-bc9d-4cab-ac56-12d2bf5d0349';
const FIXTURE_EMAIL = 'synthetic-canary@example.invalid';
const FIXTURE_NAME = 'Agent Friendly Web Synthetic Canary Rectified';
const NOW = '2026-09-04T12:00:00.000Z';

const COMPLETED_RESULT = {
  status: 'synthetic_privacy_lifecycle_completed',
  synthetic: true,
  contactStatus: 'erased',
  restricted: false,
  counts: {
    consentEvents: 2,
    privacyRequests: 4,
    suppressions: 2,
    lifecycleEvents: 3,
  },
  capabilities: {
    sendsEmail: false,
    createsProposal: false,
    chargesPayment: false,
    modifiesCustomerSite: false,
    acceptsRealContacts: false,
  },
};

class SqliteD1Statement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.bindings = [];
  }

  bind(...bindings) {
    this.bindings = bindings;
    return this;
  }

  async first() {
    this.database.queries.push({ method: 'first', sql: this.sql, bindings: this.bindings });
    if (this.database.malformedFirst?.test(this.sql)) {
      this.database.malformedFirst = null;
      return { eventType: 'deleted' };
    }
    return this.database.sqlite.prepare(this.sql).get(...this.bindings) ?? null;
  }

  async all() {
    this.database.queries.push({ method: 'all', sql: this.sql, bindings: this.bindings });
    return { results: this.database.sqlite.prepare(this.sql).all(...this.bindings) };
  }
}

class SqliteD1 {
  constructor(sqlite) {
    this.sqlite = sqlite;
    this.queries = [];
    this.batches = [];
    this.batchCalls = 0;
    this.failBatchAt = 0;
    this.malformedBatchAt = 0;
    this.malformedFirst = null;
  }

  prepare(sql) {
    return new SqliteD1Statement(this, sql);
  }

  async batch(statements) {
    this.batchCalls += 1;
    this.batches.push(statements.map((statement) => ({
      sql: statement.sql,
      bindings: [...statement.bindings],
    })));
    if (this.batchCalls === this.failBatchAt) {
      throw new Error('provider SQL failure: token=secret@example.invalid');
    }
    if (this.batchCalls === this.malformedBatchAt) return [{ success: true }];

    this.sqlite.exec('BEGIN IMMEDIATE');
    try {
      const results = statements.map((statement) => {
        const result = this.sqlite.prepare(statement.sql).run(...statement.bindings);
        return { success: true, meta: { changes: Number(result.changes) } };
      });
      this.sqlite.exec('COMMIT');
      return results;
    } catch (error) {
      this.sqlite.exec('ROLLBACK');
      throw error;
    }
  }
}

function createDatabase({ fixtures = 1 } = {}) {
  const sqlite = new DatabaseSync(':memory:');
  sqlite.exec(`
    CREATE TABLE contact_leads (
      id TEXT PRIMARY KEY NOT NULL,
      email TEXT NOT NULL,
      name TEXT NOT NULL DEFAULT '',
      domain TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT '',
      organization TEXT NOT NULL DEFAULT '',
      locale TEXT NOT NULL,
      objective TEXT NOT NULL,
      state TEXT NOT NULL DEFAULT 'new',
      source TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      request_hash TEXT NOT NULL,
      last_interaction_at TEXT NOT NULL DEFAULT '',
      retention_expires_at TEXT NOT NULL DEFAULT '',
      erased_at TEXT NOT NULL DEFAULT '',
      privacy_policy_version TEXT NOT NULL DEFAULT '',
      restriction_state TEXT NOT NULL DEFAULT 'none',
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE consent_receipts (
      id TEXT PRIMARY KEY NOT NULL,
      lead_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      copy_version TEXT NOT NULL,
      action TEXT NOT NULL DEFAULT 'granted',
      evidence_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      UNIQUE(lead_id, purpose, action)
    );
    CREATE TABLE crm_opportunities (
      id TEXT PRIMARY KEY NOT NULL,
      contact_ref TEXT NOT NULL,
      domain TEXT NOT NULL,
      contact_status TEXT NOT NULL DEFAULT 'active',
      owner_context TEXT NOT NULL,
      maintainer_context TEXT NOT NULL,
      evidence_refs_json TEXT NOT NULL DEFAULT '[]',
      updated_at TEXT NOT NULL
    );
    CREATE TABLE contact_consent_events (
      id TEXT PRIMARY KEY NOT NULL,
      lead_id TEXT NOT NULL,
      purpose TEXT NOT NULL,
      copy_version TEXT NOT NULL,
      action TEXT NOT NULL,
      evidence_hash TEXT NOT NULL,
      actor_ref_hash TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      request_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
    CREATE TABLE privacy_requests (
      id TEXT PRIMARY KEY NOT NULL,
      request_type TEXT NOT NULL,
      contact_ref_hash TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending_verification',
      verification_hash TEXT NOT NULL UNIQUE,
      verification_expires_at TEXT NOT NULL,
      policy_version TEXT NOT NULL,
      decision_code TEXT NOT NULL DEFAULT '',
      idempotency_key TEXT NOT NULL UNIQUE,
      request_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      verified_at TEXT NOT NULL DEFAULT '',
      resolved_at TEXT NOT NULL DEFAULT '',
      expires_at TEXT NOT NULL
    );
    CREATE TABLE contact_suppressions (
      id TEXT PRIMARY KEY NOT NULL,
      email_hmac TEXT NOT NULL,
      purpose TEXT NOT NULL,
      reason_code TEXT NOT NULL,
      policy_version TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      UNIQUE(email_hmac, purpose)
    );
    CREATE TABLE data_lifecycle_events (
      id TEXT PRIMARY KEY NOT NULL,
      event_type TEXT NOT NULL,
      contact_ref_hash TEXT NOT NULL,
      result_code TEXT NOT NULL,
      policy_version TEXT NOT NULL,
      idempotency_key TEXT NOT NULL UNIQUE,
      request_hash TEXT NOT NULL,
      created_at TEXT NOT NULL
    );
  `);

  for (let index = 0; index < fixtures; index += 1) {
    const suffix = String(index + 1).padStart(12, '0');
    const leadId = index === 0 ? FIXTURE_ID : `20000000-0000-4000-8000-${suffix}`;
    const intakeKey = `30000000-0000-4000-8000-${suffix}`;
    sqlite.prepare(`INSERT INTO contact_leads (
      id, email, name, domain, role, organization, locale, objective, state, source,
      idempotency_key, request_hash, created_at, updated_at
    ) VALUES (?, ?, '', 'example.invalid', 'owner',
      'Agent Friendly Web Synthetic Canary', 'es', 'receive_plan', 'new', 'direct',
      ?, ?, ?, ?)`)
      .run(leadId, FIXTURE_EMAIL, intakeKey, 'c'.repeat(64), NOW, NOW);
    sqlite.prepare(`INSERT INTO consent_receipts (
      id, lead_id, purpose, copy_version, action, evidence_hash, created_at
    ) VALUES (?, ?, 'requested_plan', 'agent-friendly-web.contact-intake.v1',
      'granted', ?, ?)`)
      .run(`legacy-consent-${index + 1}`, leadId, 'd'.repeat(64), NOW);
    sqlite.prepare(`INSERT INTO crm_opportunities (
      id, contact_ref, domain, contact_status, owner_context,
      maintainer_context, evidence_refs_json, updated_at
    ) VALUES (?, ?, 'example.invalid', 'active', 'owner_verified', 'known', '[]', ?)`)
      .run(`crm-synthetic-${index + 1}`, leadId, NOW);
  }

  return new SqliteD1(sqlite);
}

function deterministic() {
  let id = 1;
  return {
    now: () => NOW,
    randomUUID: () => `10000000-0000-4000-8000-${String(id++).padStart(12, '0')}`,
  };
}

function input(overrides = {}) {
  return {
    actorRefHash: ACTOR_REF_HASH,
    suppressionHmacKey: SUPPRESSION_HMAC_KEY,
    ...overrides,
  };
}

async function expectCode(operation, code) {
  await assert.rejects(operation, (error) => {
    assert.equal(error instanceof Error, true);
    assert.equal(error.message, code);
    assert.doesNotMatch(error.message, /@|select|insert|update|delete|token|secret|provider/i);
    return true;
  });
}

function count(database, table) {
  return Number(database.sqlite.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count);
}

async function sha256(value) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(value));
  return Buffer.from(digest).toString('hex');
}

async function emailHmac(value, key) {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(key),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign'],
  );
  const digest = await crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(value));
  return Buffer.from(digest).toString('hex');
}

test('exports the fixed contract and completes the synthetic lifecycle with exact safe counts', async () => {
  assert.equal(
    SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
    'agent-friendly-web.synthetic-privacy-lifecycle.v1',
  );
  const database = createDatabase();

  const result = await runSyntheticPrivacyLifecycle(database, input(), deterministic());

  assert.deepEqual(result, COMPLETED_RESULT);
  assert.equal(count(database, 'contact_consent_events'), 2);
  assert.equal(count(database, 'privacy_requests'), 4);
  assert.equal(count(database, 'contact_suppressions'), 2);
  assert.equal(count(database, 'data_lifecycle_events'), 3);
});

test('requires exactly one eligible fixed .invalid fixture', async (t) => {
  await t.test('missing fixture', async () => {
    await expectCode(
      runSyntheticPrivacyLifecycle(createDatabase({ fixtures: 0 }), input(), deterministic()),
      'synthetic_privacy_lifecycle_fixture_not_found',
    );
  });

  await t.test('non-invalid fixture', async () => {
    const database = createDatabase();
    database.sqlite.prepare(`UPDATE contact_leads
      SET email = 'synthetic-canary@example.com', domain = 'example.com'`).run();
    await expectCode(
      runSyntheticPrivacyLifecycle(database, input(), deterministic()),
      'synthetic_privacy_lifecycle_fixture_not_found',
    );
  });

  await t.test('ambiguous fixture', async () => {
    await expectCode(
      runSyntheticPrivacyLifecycle(createDatabase({ fixtures: 2 }), input(), deterministic()),
      'synthetic_privacy_lifecycle_fixture_invalid',
    );
  });
});

test('uses a completed deletion marker as a write-free replay receipt', async () => {
  const database = createDatabase();
  const overrides = deterministic();
  await runSyntheticPrivacyLifecycle(database, input(), overrides);
  const writeBatches = database.batches.length;

  const replay = await runSyntheticPrivacyLifecycle(database, input(), overrides);

  assert.deepEqual(replay, {
    ...COMPLETED_RESULT,
    status: 'synthetic_privacy_lifecycle_already_completed',
  });
  assert.equal(database.batches.length, writeBatches);
});

test('grants and withdraws only commercial_contact and rectifies only the fixed name field', async () => {
  const database = createDatabase();
  const before = database.sqlite.prepare(`SELECT
    email, name, domain, role, organization, locale, objective, state, source
    FROM contact_leads`).get();
  database.failBatchAt = 9;

  await expectCode(
    runSyntheticPrivacyLifecycle(database, input(), deterministic()),
    'synthetic_privacy_lifecycle_store_failed',
  );

  const consent = database.sqlite.prepare(`SELECT purpose, action
    FROM contact_consent_events ORDER BY created_at, action`).all().map((row) => ({ ...row }));
  assert.deepEqual(consent, [
    { purpose: 'commercial_contact', action: 'granted' },
    { purpose: 'commercial_contact', action: 'withdrawn' },
  ]);
  const after = database.sqlite.prepare(`SELECT
    email, name, domain, role, organization, locale, objective, state, source
    FROM contact_leads`).get();
  assert.deepEqual({ ...after }, { ...before, name: FIXTURE_NAME });
});

test('exports only allowlisted subject fields and stores only their in-memory digest', async () => {
  const database = createDatabase();
  database.failBatchAt = 9;
  await expectCode(
    runSyntheticPrivacyLifecycle(database, input(), deterministic()),
    'synthetic_privacy_lifecycle_store_failed',
  );

  const exportQuery = database.queries.find(({ sql }) => (
    /SELECT email, name, domain, role, organization, locale, objective, state, source\s+FROM contact_leads/u.test(sql)
  ));
  assert.ok(exportQuery);
  assert.doesNotMatch(
    exportQuery.sql,
    /SELECT \*|idempotency|request_hash|actor|verification|evidence|email_hmac/iu,
  );
  const expectedDigest = await sha256(JSON.stringify({
    email: FIXTURE_EMAIL,
    name: FIXTURE_NAME,
    domain: 'example.invalid',
    role: 'owner',
    organization: 'Agent Friendly Web Synthetic Canary',
    locale: 'es',
    objective: 'receive_plan',
    state: 'new',
    source: 'direct',
  }));
  const lifecycle = database.sqlite.prepare(`SELECT request_hash AS requestHash
    FROM data_lifecycle_events WHERE event_type = 'exported'`).get();
  assert.deepEqual({ ...lifecycle }, { requestHash: expectedDigest });
});

test('delegates final erasure with requested_plan and an email HMAC, never the email', async () => {
  const database = createDatabase();

  await runSyntheticPrivacyLifecycle(database, input(), deterministic());

  const erasureBatch = database.batches.find((batch) => (
    batch.some(({ sql }) => /state = 'erased'/u.test(sql))
  ));
  assert.ok(erasureBatch);
  assert.equal(erasureBatch.length, 6);
  const suppression = erasureBatch.find(({ sql }) => /INSERT INTO contact_suppressions/u.test(sql));
  assert.ok(suppression);
  assert.equal(suppression.bindings[1], await emailHmac(FIXTURE_EMAIL, SUPPRESSION_HMAC_KEY));
  assert.equal(suppression.bindings[2], 'requested_plan');
  assert.doesNotMatch(JSON.stringify(erasureBatch), /@/u);
});

test('rejects invalid inputs and malformed D1 responses with stable sanitized errors', async (t) => {
  await t.test('invalid actor hash', async () => {
    await expectCode(
      runSyntheticPrivacyLifecycle(createDatabase(), input({ actorRefHash: 'not-a-hash' })),
      'synthetic_privacy_lifecycle_invalid_input',
    );
  });

  await t.test('short HMAC key', async () => {
    await expectCode(
      runSyntheticPrivacyLifecycle(createDatabase(), input({ suppressionHmacKey: 'k'.repeat(31) })),
      'synthetic_privacy_lifecycle_invalid_input',
    );
  });

  await t.test('extra input field', async () => {
    await expectCode(
      runSyntheticPrivacyLifecycle(createDatabase(), { ...input(), email: FIXTURE_EMAIL }),
      'synthetic_privacy_lifecycle_invalid_input',
    );
  });

  await t.test('malformed marker lookup', async () => {
    const database = createDatabase();
    database.malformedFirst = /FROM data_lifecycle_events/u;
    await expectCode(
      runSyntheticPrivacyLifecycle(database, input(), deterministic()),
      'synthetic_privacy_lifecycle_store_failed',
    );
  });

  await t.test('malformed phase batch', async () => {
    const database = createDatabase();
    database.malformedBatchAt = 3;
    await expectCode(
      runSyntheticPrivacyLifecycle(database, input(), deterministic()),
      'synthetic_privacy_lifecycle_store_failed',
    );
  });
});

test('resumes after every interrupted write phase without duplicate events', async (t) => {
  for (let failedBatch = 1; failedBatch <= 10; failedBatch += 1) {
    await t.test(`batch ${failedBatch}`, async () => {
      const database = createDatabase();
      const overrides = deterministic();
      database.failBatchAt = failedBatch;
      await expectCode(
        runSyntheticPrivacyLifecycle(database, input(), overrides),
        'synthetic_privacy_lifecycle_store_failed',
      );

      database.failBatchAt = 0;
      const result = await runSyntheticPrivacyLifecycle(database, input(), overrides);

      assert.deepEqual(result, COMPLETED_RESULT);
      assert.equal(count(database, 'contact_consent_events'), 2);
      assert.equal(count(database, 'privacy_requests'), 4);
      assert.equal(count(database, 'contact_suppressions'), 2);
      assert.equal(count(database, 'data_lifecycle_events'), 3);
      assert.equal(count(database, 'contact_leads'), 1);
    });
  }
});

test('serializes no identifiers, hashes, SQL, secrets or fixture values', async () => {
  const result = await runSyntheticPrivacyLifecycle(createDatabase(), input(), deterministic());
  const serialized = JSON.stringify(result);

  assert.doesNotMatch(serialized, /@/u);
  assert.doesNotMatch(serialized, /[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/iu);
  assert.doesNotMatch(serialized, /[0-9a-f]{64}/iu);
  assert.doesNotMatch(serialized, /\b(?:sql|SELECT|INSERT|UPDATE|DELETE|token|secret)\b/iu);
  assert.doesNotMatch(serialized, /synthetic-canary|example\.invalid|Agent Friendly Web Synthetic Canary/iu);
});
