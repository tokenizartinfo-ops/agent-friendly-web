import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  applyContactErasureToD1,
  resolveContactStatusFromD1,
} from '../lib/contact-privacy-erasure.mjs';
import { CONTACT_PRIVACY_POLICY_VERSION } from '../lib/contact-privacy-policy.mjs';

const leadId = '00000000-0000-4000-8000-000000000001';
const idempotencyKey = '6ba7b810-9dad-41d1-80b4-00c04fd430c8';
const validInput = {
  leadId,
  emailHmac: 'a'.repeat(64),
  purpose: 'product_updates',
  policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
  idempotencyKey,
};
const now = '2026-09-03T22:00:00.000Z';
const refHash = '11e594f481958c10e3015d0bf0447a22f068a8a647f475df15ce2c7ab4b8f3f1';
const requestHash = 'cf72ccfdf8c507dca70d390bee3593cb23f44bfa168e933c7924d771cfd70054';
const tombstoneRef = 'contact-erased-11e594f481958c10e301';
const erasedIdempotency = 'erased-cf72ccfdf8c507dca70d390bee359';

class FakeStatement {
  constructor(database, sql) {
    this.database = database;
    this.sql = sql;
    this.bindings = [];
  }

  bind(...bindings) {
    if (this.database.bindError) throw this.database.bindError;
    this.bindings = bindings;
    return this;
  }

  async first() {
    this.database.queries.push({ sql: this.sql, bindings: this.bindings });
    const result = this.database.firstResults.shift();
    if (result instanceof Error) throw result;
    return result === undefined ? null : result;
  }

  async all() {
    this.database.queries.push({ sql: this.sql, bindings: this.bindings });
    const result = this.database.allResults.shift();
    if (result instanceof Error) throw result;
    return result === undefined ? { results: [] } : result;
  }
}

class FakeD1 {
  constructor(firstResults = [], allResults = []) {
    this.firstResults = [...firstResults];
    this.allResults = [...allResults];
    this.queries = [];
    this.batches = [];
    this.prepareError = null;
    this.bindError = null;
    this.batchError = null;
    this.batchResults = null;
  }

  prepare(sql) {
    if (this.prepareError) throw this.prepareError;
    return new FakeStatement(this, sql);
  }

  async batch(statements) {
    this.batches.push(statements.map((statement) => ({
      sql: statement.sql,
      bindings: statement.bindings,
    })));
    if (this.batchError) throw this.batchError;
    if (this.batchResults !== null) return this.batchResults;
    return statements.map(() => ({ success: true, meta: { changes: 1 } }));
  }
}

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
    return this.database.sqlite.prepare(this.sql).get(...this.bindings) ?? null;
  }

  async all() {
    return { results: this.database.sqlite.prepare(this.sql).all(...this.bindings) };
  }
}

class SqliteD1 {
  constructor(sqlite) {
    this.sqlite = sqlite;
    this.batches = [];
    this.beforeBatch = null;
  }

  prepare(sql) {
    return new SqliteD1Statement(this, sql);
  }

  async batch(statements) {
    if (this.beforeBatch) {
      const beforeBatch = this.beforeBatch;
      this.beforeBatch = null;
      beforeBatch();
    }
    this.batches.push(statements.map((statement) => ({
      sql: statement.sql,
      bindings: statement.bindings,
    })));
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

function createSqliteErasureDatabase() {
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
    CREATE TABLE contact_suppressions (
      id TEXT PRIMARY KEY NOT NULL,
      email_hmac TEXT NOT NULL,
      purpose TEXT NOT NULL,
      reason_code TEXT NOT NULL,
      policy_version TEXT NOT NULL,
      idempotency_key TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL,
      UNIQUE(email_hmac, purpose),
      UNIQUE(idempotency_key)
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
  sqlite.prepare(`INSERT INTO contact_leads (
    id, email, name, domain, role, organization, locale, objective,
    state, source, idempotency_key, request_hash, created_at, updated_at
  ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(
      leadId,
      'person@example.invalid',
      'Person',
      'example.invalid',
      'owner',
      'Example Org',
      'en',
      'message body',
      'new',
      'contact_form',
      '00000000-0000-4000-8000-000000000099',
      'c'.repeat(64),
      now,
      now,
    );
  sqlite.prepare(`INSERT INTO crm_opportunities (
    id, contact_ref, domain, contact_status, owner_context,
    maintainer_context, evidence_refs_json, updated_at
  ) VALUES (?, ?, ?, 'active', 'owner_verified', 'known', '["evidence"]', ?)`)
    .run('crm-real-1', leadId, 'example.invalid', now);
  return new SqliteD1(sqlite);
}

function deterministic({
  ids = [
    '00000000-0000-4000-8000-000000000020',
    '00000000-0000-4000-8000-000000000021',
  ],
  timestamp = now,
} = {}) {
  const values = [...ids];
  return {
    now: () => timestamp,
    randomUUID: () => values.shift(),
  };
}

async function assertErasureError(operation, code) {
  await assert.rejects(operation, (error) => {
    assert.equal(error instanceof Error, true);
    assert.equal(error.message, code);
    return true;
  });
}

function committedLead(idempotency = erasedIdempotency) {
  return {
    id: leadId,
    email: '',
    name: '',
    domain: '',
    role: '',
    organization: '',
    objective: '',
    source: '',
    idempotencyKey: idempotency,
    requestHash: '',
    state: 'erased',
    erasedAt: now,
    updatedAt: now,
    retentionExpiresAt: '',
    restrictionState: 'none',
  };
}

function validSuppression(overrides = {}) {
  return {
    emailHmac: validInput.emailHmac,
    purpose: validInput.purpose,
    reasonCode: 'subject_deletion',
    policyVersion: validInput.policyVersion,
    idempotencyKey,
    expiresAt: '2028-09-02T22:00:00.000Z',
    ...overrides,
  };
}

function validLifecycle(overrides = {}) {
  return {
    eventType: 'deleted',
    contactRefHash: refHash,
    resultCode: 'identifiers_erased',
    policyVersion: validInput.policyVersion,
    idempotencyKey,
    requestHash,
    createdAt: now,
    ...overrides,
  };
}

function erasureDatabase({
  initialLead = { id: leadId, erasedAt: '' },
  finalLead = committedLead(),
  initialSuppressions = [],
  finalSuppressions = [validSuppression()],
  lifecycle = validLifecycle(),
} = {}) {
  return new FakeD1(
    [initialLead, finalLead, lifecycle],
    [{ results: initialSuppressions }, { results: finalSuppressions }],
  );
}

test('erases identifiers and tombstones only UUID-linked CRM rows in one exact D1 batch', async () => {
  const database = erasureDatabase({ initialSuppressions: [validSuppression()] });
  database.batchResults = [1, 1, 0, 1].map((changes) => ({
    success: true,
    meta: { changes },
  }));
  const result = await applyContactErasureToD1(database, validInput, deterministic());

  assert.deepEqual(result, {
    erased: true,
    duplicate: false,
    contactStatus: 'erased',
    tombstoneRef,
  });
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 4);

  const [lead, crm, suppression, lifecycle] = database.batches[0];
  assert.match(lead.sql, /UPDATE contact_leads/);
  assert.match(lead.sql, /email = '', name = '', domain = '', role = '', organization = ''/);
  assert.match(lead.sql, /objective = '', source = '', idempotency_key = \?, request_hash = ''/);
  assert.match(lead.sql, /state = 'erased', erased_at = \?, updated_at = \?/);
  assert.match(lead.sql, /retention_expires_at = '', restriction_state = 'none'/);
  assert.match(lead.sql, /WHERE id = \? AND erased_at = ''/);
  assert.deepEqual(lead.bindings, [erasedIdempotency, now, now, leadId]);

  assert.match(crm.sql, /UPDATE crm_opportunities/);
  assert.match(crm.sql, /contact_ref = \?, domain = 'erased\.invalid', contact_status = 'erased'/);
  assert.match(crm.sql, /owner_context = 'unknown', maintainer_context = 'unknown'/);
  assert.match(crm.sql, /evidence_refs_json = '\[\]', updated_at = \?/);
  assert.match(crm.sql, /WHERE contact_ref = \?/);
  assert.match(crm.sql, /EXISTS/);
  assert.doesNotMatch(crm.sql, /LIKE|contact-synthetic/iu);
  assert.deepEqual(crm.bindings, [
    tombstoneRef,
    now,
    leadId,
    leadId,
    erasedIdempotency,
    now,
  ]);

  assert.match(suppression.sql, /INSERT INTO contact_suppressions/);
  assert.doesNotMatch(suppression.sql, /INSERT OR IGNORE/);
  assert.match(suppression.sql, /ON CONFLICT\s*\(email_hmac, purpose\)/iu);
  assert.match(suppression.sql, /reason_code\s*=\s*NULL/iu);
  assert.match(suppression.sql, /'subject_deletion'/);
  assert.match(suppression.sql, /EXISTS/);
  assert.deepEqual(suppression.bindings, [
    '00000000-0000-4000-8000-000000000020',
    validInput.emailHmac,
    validInput.purpose,
    validInput.policyVersion,
    idempotencyKey,
    now,
    '2028-09-02T22:00:00.000Z',
    leadId,
    erasedIdempotency,
    now,
  ]);

  assert.match(lifecycle.sql, /INSERT INTO data_lifecycle_events/);
  assert.match(lifecycle.sql, /'deleted'/);
  assert.match(lifecycle.sql, /'identifiers_erased'/);
  assert.match(lifecycle.sql, /EXISTS/);
  assert.deepEqual(lifecycle.bindings, [
    '00000000-0000-4000-8000-000000000021',
    refHash,
    validInput.policyVersion,
    idempotencyKey,
    requestHash,
    now,
    leadId,
    erasedIdempotency,
    now,
  ]);
  assert.doesNotMatch(
    JSON.stringify(database.batches[0]),
    /person@example|Gabriel|message body|contact-synthetic/iu,
  );
});

test('canonicalizes accepted UUIDs before lookup, hashing, binding and generated ID use', async () => {
  const uppercaseInput = {
    ...validInput,
    leadId: leadId.toUpperCase(),
    idempotencyKey: idempotencyKey.toUpperCase(),
  };
  const database = erasureDatabase({
    initialLead: { id: leadId.toUpperCase(), erasedAt: '' },
  });
  const result = await applyContactErasureToD1(database, uppercaseInput, deterministic({
    ids: [
      'ABCDEFAB-CDEF-4ABC-8DEF-ABCDEFABCDE0',
      'ABCDEFAB-CDEF-4ABC-8DEF-ABCDEFABCDE1',
    ],
    timestamp: '2026-09-03T19:00:00.000-03:00',
  }));

  assert.equal(result.tombstoneRef, tombstoneRef);
  assert.deepEqual(database.queries[0].bindings, [leadId]);
  assert.deepEqual(database.batches[0][0].bindings, [erasedIdempotency, now, now, leadId]);
  assert.deepEqual(database.batches[0][1].bindings, [
    tombstoneRef,
    now,
    leadId,
    leadId,
    erasedIdempotency,
    now,
  ]);
  assert.equal(database.batches[0][2].bindings[0], 'abcdefab-cdef-4abc-8def-abcdefabcde0');
  assert.equal(database.batches[0][2].bindings[4], idempotencyKey);
  assert.equal(database.batches[0][3].bindings[0], 'abcdefab-cdef-4abc-8def-abcdefabcde1');
  assert.equal(database.batches[0][3].bindings[1], refHash);
  assert.equal(database.batches[0][3].bindings[3], idempotencyKey);
  assert.equal(database.batches[0][3].bindings[4], requestHash);
});

test('returns an idempotent tombstone for an already erased contact without generating or batching', async () => {
  const database = new FakeD1(
    [{ id: leadId, erasedAt: now }, committedLead(), validLifecycle()],
    [{ results: [validSuppression()] }],
  );
  const result = await applyContactErasureToD1(database, validInput, {
    now: () => { throw new Error('must not run'); },
    randomUUID: () => { throw new Error('must not run'); },
  });

  assert.deepEqual(result, {
    erased: true,
    duplicate: true,
    contactStatus: 'erased',
  });
  assert.equal(database.batches.length, 0);
});

test('already-erased fast path rejects incomplete committed suppression or lifecycle state', async () => {
  const database = new FakeD1(
    [{ id: leadId, erasedAt: now }, committedLead(), null],
    [{ results: [] }],
  );

  await assertErasureError(
    () => applyContactErasureToD1(database, validInput),
    'privacy_erasure_failed',
  );
  assert.equal(database.batches.length, 0);
});

test('recovers a same-key race loser from committed erased state without another batch', async () => {
  const database = erasureDatabase();
  database.batchError = new Error(
    'UNIQUE constraint failed: data_lifecycle_events.idempotency_key provider detail',
  );

  assert.deepEqual(
    await applyContactErasureToD1(database, validInput, deterministic()),
    { erased: true, duplicate: true, contactStatus: 'erased' },
  );
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 4);
  assert.equal(database.queries.length, 5);
});

test('recovers a different-key zero-change race without creating another lifecycle event', async () => {
  const winnerKey = '6ba7b811-9dad-41d1-80b4-00c04fd430c8';
  const winnerErasedIdempotency = `erased-${'b'.repeat(29)}`;
  const database = erasureDatabase({
    finalLead: committedLead(winnerErasedIdempotency),
    finalSuppressions: [validSuppression({ idempotencyKey: winnerKey })],
    lifecycle: validLifecycle({
      idempotencyKey: winnerKey,
      requestHash: 'b'.repeat(64),
    }),
  });
  database.batchResults = [0, 0, 0, 0].map((changes) => ({
    success: true,
    meta: { changes },
  }));

  assert.deepEqual(
    await applyContactErasureToD1(database, validInput, deterministic({
      timestamp: '2026-09-03T22:00:01.000Z',
    })),
    { erased: true, duplicate: true, contactStatus: 'erased' },
  );
  assert.equal(database.batches.length, 1);
  assert.match(database.batches[0][3].sql, /EXISTS/);
  assert.equal(database.queries.length, 5);
});

test('resolver returns status only, canonicalizes lookup UUIDs and never returns contact PII', async () => {
  const database = new FakeD1([{
    state: 'erased',
    erasedAt: now,
    restrictionState: 'none',
    email: 'person@example.invalid',
    name: 'Gabriel',
  }]);
  assert.deepEqual(await resolveContactStatusFromD1(database, leadId.toUpperCase()), {
    found: true,
    contactStatus: 'erased',
    restricted: false,
  });
  assert.deepEqual(database.queries[0].bindings, [leadId]);

  const active = new FakeD1([{ state: 'new', erasedAt: '', restrictionState: 'restricted' }]);
  assert.deepEqual(await resolveContactStatusFromD1(active, leadId), {
    found: true,
    contactStatus: 'active',
    restricted: true,
  });
  assert.deepEqual(await resolveContactStatusFromD1(new FakeD1(), leadId), {
    found: false,
    contactStatus: 'not_found',
    restricted: false,
  });
});

test('rejects non-plain, incomplete, accessor, symbol, unknown and coercible erasure inputs', async () => {
  const inherited = Object.create(validInput);
  const symbolField = Symbol('private');
  let coercions = 0;
  const coercible = {
    toString() {
      coercions += 1;
      return leadId;
    },
  };
  const accessor = { ...validInput };
  Object.defineProperty(accessor, 'emailHmac', {
    enumerable: true,
    get() {
      coercions += 1;
      return 'a'.repeat(64);
    },
  });
  const missingPurpose = { ...validInput };
  delete missingPurpose.purpose;
  const invalidInputs = [
    null,
    [],
    new Date(),
    inherited,
    { ...validInput, [symbolField]: 'person@example.invalid' },
    { ...validInput, email: 'person@example.invalid' },
    { ...validInput, name: 'Gabriel' },
    { ...validInput, message: 'message body' },
    { ...validInput, leadId: coercible },
    { ...validInput, emailHmac: coercible },
    { ...validInput, purpose: Symbol('product_updates') },
    { ...validInput, policyVersion: coercible },
    { ...validInput, idempotencyKey: coercible },
    { ...validInput, emailHmac: 'A'.repeat(64) },
    { ...validInput, purpose: 'case_publication' },
    { ...validInput, policyVersion: 'legacy' },
    missingPurpose,
    accessor,
  ];

  for (const input of invalidInputs) {
    const database = new FakeD1();
    await assertErasureError(
      () => applyContactErasureToD1(database, input),
      'privacy_erasure_invalid_input',
    );
    assert.equal(database.queries.length, 0);
    assert.equal(database.batches.length, 0);
  }
  assert.equal(coercions, 0);
});

test('validates exact overrides, generated UUIDs and explicit-zone timestamps before batching', async () => {
  let coercions = 0;
  const coercible = {
    toString() {
      coercions += 1;
      return now;
    },
  };
  const inheritedOverrides = Object.create(deterministic());
  const accessorOverrides = {};
  Object.defineProperty(accessorOverrides, 'now', {
    enumerable: true,
    get() {
      coercions += 1;
      return () => now;
    },
  });
  const invalidOverrides = [
    null,
    [],
    inheritedOverrides,
    { ...deterministic(), [Symbol('private')]: true },
    { ...deterministic(), extra: true },
    { now },
    { randomUUID: leadId },
    deterministic({ ids: ['not-a-uuid', leadId] }),
    deterministic({ ids: [leadId, Symbol('uuid')] }),
    deterministic({ timestamp: '2026-09-03T22:00:00.000' }),
    deterministic({ timestamp: '2026-09-31T22:00:00.000Z' }),
    deterministic({ timestamp: coercible }),
    { now: () => { throw new Error('clock provider detail'); }, randomUUID: () => leadId },
    accessorOverrides,
  ];

  for (const overrides of invalidOverrides) {
    const database = new FakeD1([{ id: leadId, erasedAt: '' }]);
    await assertErasureError(
      () => applyContactErasureToD1(database, validInput, overrides),
      'privacy_erasure_invalid_input',
    );
    assert.equal(database.batches.length, 0);
  }
  assert.equal(coercions, 0);
});

test('rejects invalid resolver refs without coercion and sanitizes resolver or lookup failures', async () => {
  let coercions = 0;
  const coercible = {
    toString() {
      coercions += 1;
      return leadId;
    },
  };
  for (const contactRef of [null, Symbol('contact'), coercible, 'not-a-uuid']) {
    const database = new FakeD1();
    await assertErasureError(
      () => resolveContactStatusFromD1(database, contactRef),
      'privacy_contact_ref_invalid',
    );
    assert.equal(database.queries.length, 0);
  }
  assert.equal(coercions, 0);

  const resolverFailure = new FakeD1([new Error('resolver provider detail')]);
  await assertErasureError(
    () => resolveContactStatusFromD1(resolverFailure, leadId),
    'privacy_erasure_failed',
  );
  const malformedResolver = new FakeD1([{ state: 'new', erasedAt: {}, restrictionState: 'none' }]);
  await assertErasureError(
    () => resolveContactStatusFromD1(malformedResolver, leadId),
    'privacy_erasure_failed',
  );

  const lookupFailure = new FakeD1([new Error('lookup provider detail')]);
  await assertErasureError(
    () => applyContactErasureToD1(lookupFailure, validInput),
    'privacy_erasure_failed',
  );
  const malformedLead = new FakeD1([{ id: coercible, erasedAt: '' }]);
  await assertErasureError(
    () => applyContactErasureToD1(malformedLead, validInput),
    'privacy_erasure_failed',
  );
  assert.equal(coercions, 0);
});

test('fails closed unless all four batch results report exact success', async () => {
  const malformedResults = [
    [{ success: true }, { success: false }, { success: true }, { success: true }],
    [{ success: true }, { success: true }, { success: true }],
    [{ success: true }, { success: true }, { success: true }, { success: true }, { success: true }],
    [{ success: true }, { success: true }, {}, { success: true }],
    [{ success: true }, { success: true }, { success: 1 }, { success: true }],
    'not-an-array',
  ];
  for (const batchResults of malformedResults) {
    const database = new FakeD1([{ id: leadId, erasedAt: '' }]);
    database.batchResults = batchResults;
    await assertErasureError(
      () => applyContactErasureToD1(database, validInput, deterministic()),
      'privacy_erasure_failed',
    );
  }

  const batchFailure = new FakeD1([{ id: leadId, erasedAt: '' }]);
  batchFailure.batchError = new Error('batch provider detail');
  await assertErasureError(
    () => applyContactErasureToD1(batchFailure, validInput, deterministic()),
    'privacy_erasure_failed',
  );
});

test('does not report a fresh erasure when the guarded lead update changes zero rows', async () => {
  const database = new FakeD1(
    [{ id: leadId, erasedAt: '' }, null],
    [{ results: [] }],
  );
  database.batchResults = [0, 0, 0, 0].map((changes) => ({
    success: true,
    meta: { changes },
  }));

  await assertErasureError(
    () => applyContactErasureToD1(database, validInput, deterministic()),
    'privacy_erasure_failed',
  );
  assert.equal(database.batches.length, 1);
});

test('blocks incompatible or inadequate existing suppressions before erasing', async () => {
  const incompatibleSuppressions = [
    validSuppression({ emailHmac: 'b'.repeat(64) }),
    validSuppression({ reasonCode: 'consent_withdrawal' }),
    validSuppression({ policyVersion: 'legacy' }),
    validSuppression({ expiresAt: '2028-09-01T22:00:00.000Z' }),
  ];

  for (const suppression of incompatibleSuppressions) {
    const database = erasureDatabase({ initialSuppressions: [suppression] });
    await assertErasureError(
      () => applyContactErasureToD1(database, validInput, deterministic()),
      'privacy_erasure_failed',
    );
    assert.equal(database.batches.length, 0);
  }
});

test('validates the committed suppression after the atomic batch', async () => {
  const database = erasureDatabase({
    finalSuppressions: [validSuppression({ expiresAt: '2028-09-01T22:00:00.000Z' })],
  });

  await assertErasureError(
    () => applyContactErasureToD1(database, validInput, deterministic()),
    'privacy_erasure_failed',
  );
  assert.equal(database.batches.length, 1);
});

test('rolls back erasure when an incompatible suppression wins after preflight', async () => {
  const database = createSqliteErasureDatabase();
  database.beforeBatch = () => {
    database.sqlite.prepare(`INSERT INTO contact_suppressions (
      id, email_hmac, purpose, reason_code, policy_version,
      idempotency_key, created_at, expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        '00000000-0000-4000-8000-000000000030',
        validInput.emailHmac,
        validInput.purpose,
        'consent_withdrawal',
        validInput.policyVersion,
        '6ba7b812-9dad-41d1-80b4-00c04fd430c8',
        now,
        '2028-09-02T22:00:00.000Z',
      );
  };

  try {
    await assertErasureError(
      () => applyContactErasureToD1(database, validInput, deterministic()),
      'privacy_erasure_failed',
    );
    assert.equal(database.batches.length, 1);
    assert.equal(database.batches[0].length, 4);
    assert.match(database.batches[0][2].sql, /ON CONFLICT\s*\(email_hmac, purpose\)/iu);
    assert.match(database.batches[0][2].sql, /reason_code\s*=\s*NULL/iu);

    const lead = database.sqlite
      .prepare('SELECT email, state, erased_at AS erasedAt FROM contact_leads WHERE id = ?')
      .get(leadId);
    assert.deepEqual({ ...lead }, {
      email: 'person@example.invalid',
      state: 'new',
      erasedAt: '',
    });
    assert.deepEqual(
      {
        ...database.sqlite
          .prepare('SELECT contact_ref AS contactRef, contact_status AS contactStatus FROM crm_opportunities')
          .get(),
      },
      { contactRef: leadId, contactStatus: 'active' },
    );
    assert.equal(
      database.sqlite.prepare('SELECT count(*) AS count FROM data_lifecycle_events').get().count,
      0,
    );
    assert.equal(
      database.sqlite.prepare('SELECT count(*) AS count FROM contact_suppressions').get().count,
      1,
    );
  } finally {
    database.sqlite.close();
  }
});

test('sanitizes statement errors and reports unavailable stores without touching D1', async () => {
  await assertErasureError(
    () => applyContactErasureToD1(null, validInput),
    'privacy_erasure_store_unavailable',
  );
  await assertErasureError(
    () => resolveContactStatusFromD1({}, leadId),
    'privacy_erasure_store_unavailable',
  );

  const prepareFailure = new FakeD1([{ id: leadId, erasedAt: '' }]);
  prepareFailure.prepareError = new Error('prepare provider detail');
  await assertErasureError(
    () => applyContactErasureToD1(prepareFailure, validInput),
    'privacy_erasure_failed',
  );

  const bindFailure = new FakeD1([{ id: leadId, erasedAt: '' }]);
  bindFailure.bindError = new Error('bind provider detail');
  await assertErasureError(
    () => resolveContactStatusFromD1(bindFailure, leadId),
    'privacy_erasure_failed',
  );
});
