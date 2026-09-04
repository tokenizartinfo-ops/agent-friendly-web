import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT,
  runPrivateHumanPrivacyPilotAction,
} from '../lib/private-human-privacy-pilot.mjs';

const ACTOR_REF_HASH = 'a'.repeat(64);
const OTHER_ACTOR_REF_HASH = 'b'.repeat(64);
const EMAIL = 'owner@example.com';
const HMAC_KEY = 'private-human-pilot-hmac-key-32-bytes';
const NOW = '2026-09-04T18:00:00.000Z';

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
    return this.database.sqlite.prepare(this.sql).get(...this.bindings) ?? null;
  }

  async all() {
    this.database.queries.push({ method: 'all', sql: this.sql, bindings: this.bindings });
    return { results: this.database.sqlite.prepare(this.sql).all(...this.bindings) };
  }
}

class SqliteD1 {
  constructor() {
    this.sqlite = new DatabaseSync(':memory:');
    this.queries = [];
    this.batches = [];
    this.batchCalls = 0;
    this.failBatchAt = 0;
    this.sqlite.exec(`
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
      throw new Error('provider failed for owner@example.com token=unsafe');
    }

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

function deterministic() {
  let id = 1;
  return {
    now: () => NOW,
    randomUUID: () => `10000000-0000-4000-8000-${String(id++).padStart(12, '0')}`,
  };
}

function input(action, overrides = {}) {
  return {
    action,
    actorRefHash: ACTOR_REF_HASH,
    email: EMAIL,
    locale: 'es',
    suppressionHmacKey: HMAC_KEY,
    ...overrides,
  };
}

function count(database, table) {
  return Number(database.sqlite.prepare(`SELECT COUNT(*) AS count FROM ${table}`).get().count);
}

async function expectCode(operation, code) {
  await assert.rejects(operation, (error) => {
    assert.equal(error instanceof Error, true);
    assert.equal(error.message, code);
    assert.doesNotMatch(error.message, /@|select|insert|update|delete|token|provider/i);
    return true;
  });
}

test('exports the private pilot contract and completes the five own-data steps', async () => {
  assert.equal(
    PRIVATE_HUMAN_PRIVACY_PILOT_CONTRACT,
    'agent-friendly-web.private-human-privacy-pilot.v1',
  );
  const database = new SqliteD1();
  const overrides = deterministic();

  const enrolled = await runPrivateHumanPrivacyPilotAction(
    database,
    input('enroll'),
    overrides,
  );
  assert.deepEqual(enrolled, {
    status: 'private_human_privacy_pilot_step_completed',
    step: 'enroll',
    contactStatus: 'active',
    restricted: false,
    requestedPlanConsent: true,
    capabilities: {
      sendsEmail: false,
      createsProposal: false,
      chargesPayment: false,
      modifiesCustomerSite: false,
      acceptsPublicContacts: false,
    },
  });

  const exported = await runPrivateHumanPrivacyPilotAction(
    database,
    input('inspect_export'),
    overrides,
  );
  assert.deepEqual(exported.export, {
    email: EMAIL,
    domain: 'agentfriendlyweb.dev',
    locale: 'es',
    objective: 'request_pilot',
    source: 'direct',
  });

  const rectified = await runPrivateHumanPrivacyPilotAction(
    database,
    input('rectify_locale', { locale: 'en' }),
    overrides,
  );
  assert.equal(rectified.export.locale, 'en');

  const withdrawn = await runPrivateHumanPrivacyPilotAction(
    database,
    input('withdraw_requested_plan', { locale: 'en' }),
    overrides,
  );
  assert.equal(withdrawn.requestedPlanConsent, false);
  assert.equal(withdrawn.restricted, true);

  const erased = await runPrivateHumanPrivacyPilotAction(
    database,
    input('erase', { locale: 'en' }),
    overrides,
  );
  assert.deepEqual(erased, {
    status: 'private_human_privacy_pilot_completed',
    step: 'erase',
    contactStatus: 'erased',
    restricted: false,
    requestedPlanConsent: false,
    capabilities: enrolled.capabilities,
  });

  const lead = database.sqlite.prepare(`SELECT
    email, name, domain, role, organization, objective, source, state,
    restriction_state AS restrictionState
    FROM contact_leads`).get();
  assert.deepEqual({ ...lead }, {
    email: '',
    name: '',
    domain: '',
    role: '',
    organization: '',
    objective: '',
    source: '',
    state: 'erased',
    restrictionState: 'none',
  });
  assert.equal(count(database, 'consent_receipts'), 1);
  assert.equal(count(database, 'contact_consent_events'), 1);
  assert.equal(count(database, 'privacy_requests'), 4);
  assert.equal(count(database, 'contact_suppressions'), 1);
});

test('makes completed steps idempotent and does not recreate an erased contact', async () => {
  const database = new SqliteD1();
  const overrides = deterministic();
  await runPrivateHumanPrivacyPilotAction(database, input('enroll'), overrides);
  const batchesAfterEnroll = database.batches.length;

  const duplicateEnroll = await runPrivateHumanPrivacyPilotAction(
    database,
    input('enroll'),
    overrides,
  );
  assert.equal(duplicateEnroll.status, 'private_human_privacy_pilot_step_already_completed');
  assert.equal(database.batches.length, batchesAfterEnroll);

  await runPrivateHumanPrivacyPilotAction(database, input('inspect_export'), overrides);
  await runPrivateHumanPrivacyPilotAction(
    database,
    input('rectify_locale', { locale: 'en' }),
    overrides,
  );
  await runPrivateHumanPrivacyPilotAction(
    database,
    input('withdraw_requested_plan', { locale: 'en' }),
    overrides,
  );
  await runPrivateHumanPrivacyPilotAction(
    database,
    input('erase', { locale: 'en' }),
    overrides,
  );
  const batchesAfterErase = database.batches.length;

  const duplicateErase = await runPrivateHumanPrivacyPilotAction(
    database,
    input('erase', { locale: 'en' }),
    overrides,
  );
  assert.equal(duplicateErase.status, 'private_human_privacy_pilot_already_completed');
  assert.equal(database.batches.length, batchesAfterErase);

  await expectCode(
    runPrivateHumanPrivacyPilotAction(database, input('enroll'), overrides),
    'private_human_privacy_pilot_closed',
  );
});

test('fails closed on out-of-order, cross-actor and malformed input', async () => {
  const database = new SqliteD1();
  const overrides = deterministic();
  await expectCode(
    runPrivateHumanPrivacyPilotAction(database, input('inspect_export'), overrides),
    'private_human_privacy_pilot_step_invalid',
  );

  await runPrivateHumanPrivacyPilotAction(database, input('enroll'), overrides);
  await expectCode(
    runPrivateHumanPrivacyPilotAction(
      database,
      input('inspect_export', { actorRefHash: OTHER_ACTOR_REF_HASH }),
      overrides,
    ),
    'private_human_privacy_pilot_step_invalid',
  );
  await expectCode(
    runPrivateHumanPrivacyPilotAction(
      database,
      { ...input('inspect_export'), unknown: true },
      overrides,
    ),
    'private_human_privacy_pilot_invalid_input',
  );
  await expectCode(
    runPrivateHumanPrivacyPilotAction(
      database,
      input('inspect_export', { email: 'not-an-email' }),
      overrides,
    ),
    'private_human_privacy_pilot_invalid_input',
  );
});

test('sanitizes storage failures without leaking the private email', async () => {
  const database = new SqliteD1();
  database.failBatchAt = 1;
  await expectCode(
    runPrivateHumanPrivacyPilotAction(database, input('enroll'), deterministic()),
    'private_human_privacy_pilot_store_failed',
  );
});
