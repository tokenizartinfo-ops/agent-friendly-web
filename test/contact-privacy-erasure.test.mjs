import assert from 'node:assert/strict';
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
const erasedIdempotency = 'erased-11e594f481958c10e3015d0bf0447';

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
}

class FakeD1 {
  constructor(firstResults = []) {
    this.firstResults = [...firstResults];
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
    return statements.map(() => ({ success: true }));
  }
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

test('erases identifiers and tombstones only UUID-linked CRM rows in one exact D1 batch', async () => {
  const database = new FakeD1([{ id: leadId, erasedAt: '' }]);
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
  assert.doesNotMatch(crm.sql, /LIKE|contact-synthetic/iu);
  assert.deepEqual(crm.bindings, [tombstoneRef, now, leadId]);

  assert.match(suppression.sql, /INSERT OR IGNORE INTO contact_suppressions/);
  assert.match(suppression.sql, /'subject_deletion'/);
  assert.deepEqual(suppression.bindings, [
    '00000000-0000-4000-8000-000000000020',
    validInput.emailHmac,
    validInput.purpose,
    validInput.policyVersion,
    idempotencyKey,
    now,
    '2028-09-02T22:00:00.000Z',
  ]);

  assert.match(lifecycle.sql, /INSERT INTO data_lifecycle_events/);
  assert.match(lifecycle.sql, /'deleted'/);
  assert.match(lifecycle.sql, /'identifiers_erased'/);
  assert.deepEqual(lifecycle.bindings, [
    '00000000-0000-4000-8000-000000000021',
    refHash,
    validInput.policyVersion,
    idempotencyKey,
    requestHash,
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
  const database = new FakeD1([{ id: leadId.toUpperCase(), erasedAt: '' }]);
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
  assert.deepEqual(database.batches[0][1].bindings, [tombstoneRef, now, leadId]);
  assert.equal(database.batches[0][2].bindings[0], 'abcdefab-cdef-4abc-8def-abcdefabcde0');
  assert.equal(database.batches[0][2].bindings[4], idempotencyKey);
  assert.equal(database.batches[0][3].bindings[0], 'abcdefab-cdef-4abc-8def-abcdefabcde1');
  assert.equal(database.batches[0][3].bindings[1], refHash);
  assert.equal(database.batches[0][3].bindings[3], idempotencyKey);
  assert.equal(database.batches[0][3].bindings[4], requestHash);
});

test('returns an idempotent tombstone for an already erased contact without generating or batching', async () => {
  const database = new FakeD1([{ id: leadId, erasedAt: now }]);
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
