import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  SYNTHETIC_PRIVACY_LIFECYCLE_CONTRACT,
  createSyntheticPrivacyLifecycleHandler,
  runSyntheticPrivacyLifecycle,
} from '../lib/synthetic-privacy-lifecycle.mjs';

const ACTOR_REF_HASH = 'a'.repeat(64);
const SUPPRESSION_HMAC_KEY = 'synthetic-test-hmac-key-32-bytes!';
const FIXTURE_ID = '38e17927-bc9d-4cab-ac56-12d2bf5d0349';
const FIXTURE_EMAIL = 'synthetic-canary@example.invalid';
const FIXTURE_NAME = 'Agent Friendly Web Synthetic Canary Rectified';
const NOW = '2026-09-04T12:00:00.000Z';
const LATER_NOW = '2026-09-05T12:00:00.000Z';
const ACCESS_SUBJECT = 'cf-access-subject';
const ACCESS_SUBJECT_HASH = 'cd8b394ba2c49b0c6af7f53ef31062f0633a9fbf03bdceb795121f2af6356f04';
const LIFECYCLE_REQUEST = {
  contract: 'agent-friendly-web.synthetic-privacy-lifecycle.v1',
  action: 'run_one_private_synthetic_privacy_lifecycle',
  confirmation: 'synthetic_only',
};

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

test('reuses committed privacy request expiries when a retry runs at a later time', async () => {
  const database = createDatabase();
  let currentNow = NOW;
  let id = 1;
  const overrides = {
    now: () => currentNow,
    randomUUID: () => `40000000-0000-4000-8000-${String(id++).padStart(12, '0')}`,
  };
  database.failBatchAt = 3;
  await expectCode(
    runSyntheticPrivacyLifecycle(database, input(), overrides),
    'synthetic_privacy_lifecycle_store_failed',
  );
  const committedAtT1 = database.sqlite.prepare(`SELECT
    verification_expires_at AS verificationExpiresAt, expires_at AS expiresAt
    FROM privacy_requests WHERE request_type = 'rectification'`).get();
  assert.deepEqual({ ...committedAtT1 }, {
    verificationExpiresAt: '2026-09-04T12:15:00.000Z',
    expiresAt: '2026-09-05T12:00:00.000Z',
  });

  currentNow = LATER_NOW;
  database.failBatchAt = 0;
  const result = await runSyntheticPrivacyLifecycle(database, input(), overrides);

  assert.deepEqual(result, COMPLETED_RESULT);
  const committedAfterRetry = database.sqlite.prepare(`SELECT
    verification_expires_at AS verificationExpiresAt, expires_at AS expiresAt
    FROM privacy_requests WHERE request_type = 'rectification'`).get();
  assert.deepEqual({ ...committedAfterRetry }, { ...committedAtT1 });
  assert.equal(count(database, 'contact_consent_events'), 2);
  assert.equal(count(database, 'privacy_requests'), 4);
  assert.equal(count(database, 'contact_suppressions'), 2);
  assert.equal(count(database, 'data_lifecycle_events'), 3);
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

function lifecycleHttpRequest({
  url = 'https://canary.agentfriendlyweb.dev/api/canary/synthetic-privacy-lifecycle',
  method = 'POST',
  origin = 'https://canary.agentfriendlyweb.dev',
  body = LIFECYCLE_REQUEST,
  headers = {},
} = {}) {
  return new Request(url, {
    method,
    headers: {
      'content-type': 'application/json',
      'cf-access-jwt-assertion': 'signed-access-assertion',
      origin,
      ...headers,
    },
    ...(method === 'GET' || method === 'HEAD' ? {} : { body: JSON.stringify(body) }),
  });
}

function lifecycleEnvironment(overrides = {}) {
  return {
    AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'team.cloudflareaccess.com',
    ACCESS_AUD: 'canary-access-audience',
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: ACCESS_SUBJECT_HASH,
    AFW_CONTACT_SUPPRESSION_HMAC_KEY: SUPPRESSION_HMAC_KEY,
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: {
      async limit() { return { success: true }; },
    },
    DB: { prepare() {}, batch() {} },
    ...overrides,
  };
}

function lifecycleHandler(overrides = {}) {
  return createSyntheticPrivacyLifecycleHandler({
    async verifyAccessJwt() {
      return { ok: true, identity: { userId: ACCESS_SUBJECT, email: 'operator@example.invalid' } };
    },
    async runLifecycle() {
      return COMPLETED_RESULT;
    },
    ...overrides,
  });
}

test('HTTP boundary returns 404 before identity or runtime bindings when its independent switch is off', async () => {
  let verified = false;
  const handler = createSyntheticPrivacyLifecycleHandler({
    async verifyAccessJwt() {
      verified = true;
      throw new Error('identity must not be reached');
    },
  });
  const env = {
    AFW_SYNTHETIC_PRIVACY_LIFECYCLE_ENABLED: 'false',
    get DB() { throw new Error('D1 must not be read'); },
    get AFW_CONTACT_SUPPRESSION_HMAC_KEY() { throw new Error('HMAC must not be read'); },
    get AFW_SYNTHETIC_CONTACT_RATE_LIMITER() { throw new Error('limiter must not be read'); },
  };

  const response = await handler(lifecycleHttpRequest(), env);

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('cache-control'), 'no-store, private');
  assert.deepEqual(await response.json(), {
    ok: false,
    code: 'synthetic_privacy_lifecycle_unavailable',
  });
  assert.equal(verified, false);
});

test('HTTP boundary accepts only the exact canary HTTPS host, path and origin', async () => {
  const handler = lifecycleHandler();
  const rejected = [
    lifecycleHttpRequest({ url: 'https://agentfriendlyweb.dev/api/canary/synthetic-privacy-lifecycle' }),
    lifecycleHttpRequest({ url: 'http://canary.agentfriendlyweb.dev/api/canary/synthetic-privacy-lifecycle' }),
    lifecycleHttpRequest({ url: 'https://canary.agentfriendlyweb.dev/api/canary/synthetic-privacy-lifecycle?again=1' }),
    lifecycleHttpRequest({ url: 'https://canary.agentfriendlyweb.dev/canary/synthetic-privacy-lifecycle' }),
    lifecycleHttpRequest({ origin: 'https://agentfriendlyweb.dev' }),
    lifecycleHttpRequest({ method: 'GET' }),
  ];

  for (const request of rejected) {
    const response = await handler(request, lifecycleEnvironment());
    assert.equal(response.status, 403);
    assert.deepEqual(await response.json(), {
      ok: false,
      code: 'synthetic_privacy_lifecycle_boundary_rejected',
    });
  }
});

test('HTTP boundary requires a valid Access JWT and an allowlisted hashed subject', async () => {
  let response = await createSyntheticPrivacyLifecycleHandler({
    async verifyAccessJwt() { return { ok: false, providerDetail: 'private' }; },
  })(lifecycleHttpRequest(), lifecycleEnvironment());
  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), {
    ok: false,
    code: 'synthetic_privacy_lifecycle_identity_rejected',
  });

  response = await lifecycleHandler()(lifecycleHttpRequest(), lifecycleEnvironment({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: 'f'.repeat(64),
  }));
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_privacy_lifecycle_actor_not_allowed');

  for (const invalidEnv of [
    { ACCESS_TEAM_DOMAIN: '' },
    { ACCESS_AUD: '' },
    { AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: '' },
  ]) {
    response = await lifecycleHandler()(lifecycleHttpRequest(), lifecycleEnvironment(invalidEnv));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'synthetic_privacy_lifecycle_misconfigured');
  }
});

test('HTTP boundary requires D1 and HMAC bindings and consumes a subject-scoped rate limit', async () => {
  const handler = lifecycleHandler();
  for (const invalidEnv of [
    { DB: undefined },
    { DB: { prepare() {} } },
    { AFW_CONTACT_SUPPRESSION_HMAC_KEY: '' },
    { AFW_SYNTHETIC_CONTACT_RATE_LIMITER: undefined },
  ]) {
    const response = await handler(lifecycleHttpRequest(), lifecycleEnvironment(invalidEnv));
    assert.equal(response.status, 503);
    assert.equal((await response.json()).code, 'synthetic_privacy_lifecycle_misconfigured');
  }

  let observedKey = '';
  const response = await handler(lifecycleHttpRequest(), lifecycleEnvironment({
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: {
      async limit({ key }) {
        observedKey = key;
        return { success: false };
      },
    },
  }));
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'synthetic_privacy_lifecycle_rate_limited');
  assert.equal(observedKey, `synthetic-privacy-lifecycle:${ACCESS_SUBJECT_HASH}`);
  assert.doesNotMatch(observedKey, /cf-access-subject/u);
});

test('HTTP boundary accepts only bounded JSON with the exact fixed request keys', async () => {
  const handler = lifecycleHandler();
  const invalidRequests = [
    lifecycleHttpRequest({ body: { ...LIFECYCLE_REQUEST, email: 'person@example.com' } }),
    lifecycleHttpRequest({ body: { ...LIFECYCLE_REQUEST, confirmation: 'human_data' } }),
    lifecycleHttpRequest({ body: { action: LIFECYCLE_REQUEST.action } }),
    lifecycleHttpRequest({ headers: { 'content-type': 'text/plain' } }),
    lifecycleHttpRequest({ body: { ...LIFECYCLE_REQUEST, padding: 'x'.repeat(2048) } }),
  ];

  for (const request of invalidRequests) {
    const response = await handler(request, lifecycleEnvironment());
    assert.ok([400, 413, 415].includes(response.status));
    assert.equal((await response.json()).code, 'invalid_synthetic_privacy_lifecycle_request');
  }
});

test('HTTP boundary passes only the hashed actor and HMAC secret to the service and sanitizes completion', async () => {
  const observed = {};
  const handler = lifecycleHandler({
    async runLifecycle(database, value) {
      observed.database = database;
      observed.value = value;
      return COMPLETED_RESULT;
    },
  });
  const env = lifecycleEnvironment();

  const response = await handler(lifecycleHttpRequest(), env);

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), COMPLETED_RESULT);
  assert.equal(observed.database, env.DB);
  assert.deepEqual(observed.value, {
    actorRefHash: ACCESS_SUBJECT_HASH,
    suppressionHmacKey: SUPPRESSION_HMAC_KEY,
  });
});

test('HTTP boundary returns the sanitized write-free replay receipt', async () => {
  const replay = {
    ...COMPLETED_RESULT,
    status: 'synthetic_privacy_lifecycle_already_completed',
  };
  const response = await lifecycleHandler({
    async runLifecycle() { return replay; },
  })(lifecycleHttpRequest(), lifecycleEnvironment());

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), replay);
});

test('HTTP boundary replaces service failures and malformed results with one stable response', async () => {
  for (const runLifecycle of [
    async () => { throw new Error('SQL token secret@example.invalid'); },
    async () => ({ status: 'completed', email: 'synthetic-canary@example.invalid' }),
  ]) {
    const response = await lifecycleHandler({ runLifecycle })(
      lifecycleHttpRequest(),
      lifecycleEnvironment(),
    );
    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), {
      ok: false,
      code: 'synthetic_privacy_lifecycle_failed',
    });
  }
});
