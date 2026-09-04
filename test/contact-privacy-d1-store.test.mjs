import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canonicalConsentLifecycleHash,
  canonicalPrivacyRequestHash,
  createPrivacyRequestToD1,
  recordConsentLifecycleEventToD1,
} from '../lib/contact-privacy-d1-store.mjs';

const consentInput = {
  leadId: '00000000-0000-4000-8000-000000000001',
  purpose: 'product_updates',
  action: 'withdrawn',
  copyVersion: 'agent-friendly-web.contact-intake.v1',
  actorRefHash: 'a'.repeat(64),
  idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
};

const validRequest = {
  requestType: 'access_export',
  contactRefHash: 'b'.repeat(64),
  verificationHash: 'c'.repeat(64),
  verificationExpiresAt: '2026-09-03T22:15:00.000Z',
  expiresAt: '2026-09-10T22:00:00.000Z',
  policyVersion: 'agent-friendly-web.contact-privacy.v1',
  idempotencyKey: '6ba7b811-9dad-41d1-80b4-00c04fd430c8',
};

class FakeStatement {
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
    return this.database.nextFirst(this.sql, this.bindings);
  }
}

class FakeD1 {
  constructor(firstResults = []) {
    this.firstResults = [...firstResults];
    this.queries = [];
    this.batches = [];
    this.batchError = null;
    this.batchResults = null;
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }

  async nextFirst(sql, bindings) {
    this.queries.push({ sql, bindings });
    const result = this.firstResults.shift();
    if (result instanceof Error) throw result;
    return result ?? null;
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
  id = '00000000-0000-4000-8000-000000000010',
  now = '2026-09-03T22:00:00.000Z',
} = {}) {
  return {
    now: () => now,
    randomUUID: () => id,
  };
}

async function assertStoreError(operation, code) {
  await assert.rejects(operation, (error) => {
    assert.equal(error instanceof Error, true);
    assert.equal(error.message, code);
    return true;
  });
}

test('canonical consent lifecycle hash is deterministic and validates its input', async () => {
  assert.equal(
    await canonicalConsentLifecycleHash(consentInput),
    '092f467ca34295ce312a278fa48dfb465b29f58ee0771368f1f48bb55e5a8d6a',
  );

  let coercions = 0;
  const coercibleHash = {
    toString() {
      coercions += 1;
      return 'a'.repeat(64);
    },
  };
  await assertStoreError(
    () => canonicalConsentLifecycleHash({ ...consentInput, actorRefHash: coercibleHash }),
    'privacy_store_invalid_input',
  );
  await assertStoreError(
    () => canonicalConsentLifecycleHash({ ...consentInput, body: 'free text' }),
    'privacy_store_invalid_input',
  );
  assert.equal(coercions, 0);
});

test('canonical privacy request hash normalizes timestamps and validates its input', async () => {
  assert.equal(
    await canonicalPrivacyRequestHash(validRequest),
    'ddf7e735c7747ce172d36e23fe354d8665eb6bda3c234684db2281d7f7a4e803',
  );
  assert.equal(
    await canonicalPrivacyRequestHash({
      ...validRequest,
      verificationExpiresAt: '2026-09-03T19:15:00.000-03:00',
      expiresAt: '2026-09-10T19:00:00.000-03:00',
    }),
    'ddf7e735c7747ce172d36e23fe354d8665eb6bda3c234684db2281d7f7a4e803',
  );
  await assertStoreError(
    () => canonicalPrivacyRequestHash({ ...validRequest, token: 'token-value' }),
    'privacy_store_invalid_input',
  );
  await assertStoreError(
    () => canonicalPrivacyRequestHash({ ...validRequest, verificationHash: 1 }),
    'privacy_store_invalid_input',
  );
});

test('canonicalizes consent UUID case before hashing, lookup, binding and return', async () => {
  const lowercase = {
    ...consentInput,
    leadId: 'abcdefab-cdef-4abc-8def-abcdefabcdef',
  };
  const uppercase = {
    ...lowercase,
    leadId: lowercase.leadId.toUpperCase(),
    idempotencyKey: lowercase.idempotencyKey.toUpperCase(),
  };
  const requestHash = await canonicalConsentLifecycleHash(lowercase);
  assert.equal(await canonicalConsentLifecycleHash(uppercase), requestHash);

  const duplicate = new FakeD1([{ id: 'evt-existing', requestHash }]);
  assert.deepEqual(await recordConsentLifecycleEventToD1(duplicate, uppercase), {
    id: 'evt-existing', persisted: true, duplicate: true, conflict: false,
  });
  assert.deepEqual(duplicate.queries[0].bindings, [lowercase.idempotencyKey]);
  assert.equal(duplicate.batches.length, 0);

  const generatedId = 'ABCDEFAB-CDEF-4ABC-8DEF-ABCDEFABCDEF';
  const inserted = new FakeD1([null]);
  assert.deepEqual(
    await recordConsentLifecycleEventToD1(
      inserted,
      uppercase,
      deterministic({ id: generatedId }),
    ),
    {
      id: generatedId.toLowerCase(),
      persisted: true,
      duplicate: false,
      conflict: false,
    },
  );
  assert.equal(inserted.batches[0][0].bindings[0], generatedId.toLowerCase());
  assert.equal(inserted.batches[0][0].bindings[1], lowercase.leadId);
  assert.equal(inserted.batches[0][0].bindings[7], lowercase.idempotencyKey);
  assert.equal(inserted.batches[0][0].bindings[8], requestHash);
});

test('canonicalizes privacy request UUID case before hashing, lookup, binding and return', async () => {
  const uppercase = {
    ...validRequest,
    idempotencyKey: validRequest.idempotencyKey.toUpperCase(),
  };
  const requestHash = await canonicalPrivacyRequestHash(validRequest);
  assert.equal(await canonicalPrivacyRequestHash(uppercase), requestHash);

  const duplicate = new FakeD1([{ id: 'req-existing', requestHash }]);
  assert.deepEqual(await createPrivacyRequestToD1(duplicate, uppercase), {
    id: 'req-existing', persisted: true, duplicate: true, conflict: false,
  });
  assert.deepEqual(duplicate.queries[0].bindings, [validRequest.idempotencyKey]);
  assert.equal(duplicate.batches.length, 0);

  const generatedId = 'ABCDEFAB-CDEF-4ABC-8DEF-ABCDEFABCDEF';
  const inserted = new FakeD1([null]);
  assert.deepEqual(
    await createPrivacyRequestToD1(
      inserted,
      uppercase,
      deterministic({ id: generatedId }),
    ),
    {
      id: generatedId.toLowerCase(),
      persisted: true,
      duplicate: false,
      conflict: false,
    },
  );
  assert.equal(inserted.batches[0][0].bindings[0], generatedId.toLowerCase());
  assert.equal(inserted.batches[0][0].bindings[6], validRequest.idempotencyKey);
  assert.equal(inserted.batches[0][0].bindings[7], requestHash);
});

test('records one consent event without binding PII or free text', async () => {
  const database = new FakeD1([null]);
  const result = await recordConsentLifecycleEventToD1(
    database,
    consentInput,
    deterministic(),
  );

  assert.deepEqual(result, {
    id: '00000000-0000-4000-8000-000000000010',
    persisted: true,
    duplicate: false,
    conflict: false,
  });
  assert.deepEqual(database.queries[0].bindings, [consentInput.idempotencyKey]);
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 1);
  assert.match(database.batches[0][0].sql, /INSERT INTO contact_consent_events/);
  assert.deepEqual(database.batches[0][0].bindings, [
    '00000000-0000-4000-8000-000000000010',
    consentInput.leadId,
    consentInput.purpose,
    consentInput.copyVersion,
    consentInput.action,
    '09af13fb8ffd101676494b95cf9b39a9d5e3a12d1ed984ed5965a1f7c03a8880',
    consentInput.actorRefHash,
    consentInput.idempotencyKey,
    '092f467ca34295ce312a278fa48dfb465b29f58ee0771368f1f48bb55e5a8d6a',
    '2026-09-03T22:00:00.000Z',
  ]);
  assert.doesNotMatch(
    JSON.stringify(database.batches[0][0].bindings),
    /@|person|message|body|token-value/i,
  );
});

test('stores a privacy request using only hashes and allowlisted metadata', async () => {
  const database = new FakeD1([null]);
  const result = await createPrivacyRequestToD1(
    database,
    validRequest,
    deterministic({ id: '00000000-0000-4000-8000-000000000011' }),
  );

  assert.deepEqual(result, {
    id: '00000000-0000-4000-8000-000000000011',
    persisted: true,
    duplicate: false,
    conflict: false,
  });
  assert.deepEqual(database.queries[0].bindings, [validRequest.idempotencyKey]);
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 1);
  assert.match(database.batches[0][0].sql, /INSERT INTO privacy_requests/);
  assert.deepEqual(database.batches[0][0].bindings, [
    '00000000-0000-4000-8000-000000000011',
    validRequest.requestType,
    validRequest.contactRefHash,
    validRequest.verificationHash,
    validRequest.verificationExpiresAt,
    validRequest.policyVersion,
    validRequest.idempotencyKey,
    'ddf7e735c7747ce172d36e23fe354d8665eb6bda3c234684db2281d7f7a4e803',
    '2026-09-03T22:00:00.000Z',
    validRequest.expiresAt,
  ]);
  assert.doesNotMatch(
    JSON.stringify(database.batches[0][0].bindings),
    /@|person|message|body|token-value/i,
  );
});

test('returns consent duplicates and conflicts without a second write', async () => {
  const requestHash = await canonicalConsentLifecycleHash(consentInput);
  const duplicate = new FakeD1([{ id: 'evt-existing', requestHash }]);
  assert.deepEqual(await recordConsentLifecycleEventToD1(duplicate, consentInput), {
    id: 'evt-existing', persisted: true, duplicate: true, conflict: false,
  });
  assert.equal(duplicate.batches.length, 0);

  const conflict = new FakeD1([{ id: 'evt-existing', requestHash: 'd'.repeat(64) }]);
  assert.deepEqual(await recordConsentLifecycleEventToD1(conflict, consentInput), {
    id: 'evt-existing', persisted: false, duplicate: false, conflict: true,
  });
  assert.equal(conflict.batches.length, 0);
});

test('returns privacy request duplicates and conflicts without a second write', async () => {
  const requestHash = await canonicalPrivacyRequestHash(validRequest);
  const duplicate = new FakeD1([{ id: 'req-existing', requestHash }]);
  assert.deepEqual(await createPrivacyRequestToD1(duplicate, validRequest), {
    id: 'req-existing', persisted: true, duplicate: true, conflict: false,
  });
  assert.equal(duplicate.batches.length, 0);

  const conflict = new FakeD1([{ id: 'req-existing', requestHash: 'd'.repeat(64) }]);
  assert.deepEqual(await createPrivacyRequestToD1(conflict, validRequest), {
    id: 'req-existing', persisted: false, duplicate: false, conflict: true,
  });
  assert.equal(conflict.batches.length, 0);
});

test('re-reads unique-key race winners and classifies duplicate or conflict', async () => {
  const consentHash = await canonicalConsentLifecycleHash(consentInput);
  const consentDatabase = new FakeD1([null, { id: 'evt-winner', requestHash: consentHash }]);
  consentDatabase.batchError = new Error(
    'UNIQUE constraint failed: contact_consent_events.idempotency_key provider detail',
  );
  assert.deepEqual(await recordConsentLifecycleEventToD1(consentDatabase, consentInput), {
    id: 'evt-winner', persisted: true, duplicate: true, conflict: false,
  });
  assert.equal(consentDatabase.queries.length, 2);

  const requestDatabase = new FakeD1([null, {
    id: 'req-winner',
    requestHash: 'd'.repeat(64),
  }]);
  requestDatabase.batchError = new Error(
    'UNIQUE constraint failed: privacy_requests.idempotency_key provider detail',
  );
  assert.deepEqual(await createPrivacyRequestToD1(requestDatabase, validRequest), {
    id: 'req-winner', persisted: false, duplicate: false, conflict: true,
  });
  assert.equal(requestDatabase.queries.length, 2);
});

test('rejects malformed consent records before hashing, lookup or persistence', async () => {
  await assertStoreError(
    () => recordConsentLifecycleEventToD1(null, consentInput),
    'privacy_store_unavailable',
  );

  const inherited = Object.create(consentInput);
  const symbolField = Symbol('private-metadata');
  let coercions = 0;
  const coercible = {
    toString() {
      coercions += 1;
      return consentInput.leadId;
    },
  };
  const accessor = { ...consentInput };
  Object.defineProperty(accessor, 'actorRefHash', {
    enumerable: true,
    get() {
      coercions += 1;
      return consentInput.actorRefHash;
    },
  });
  const invalidInputs = [
    null,
    [],
    new Date(),
    inherited,
    { ...consentInput, [symbolField]: 'person@example.invalid' },
    { ...consentInput, email: 'person@example.invalid' },
    { ...consentInput, name: 'Person' },
    { ...consentInput, message: 'free text' },
    { ...consentInput, body: 'free text' },
    { ...consentInput, token: 'token-value' },
    { ...consentInput, leadId: coercible },
    { ...consentInput, actorRefHash: Symbol('hash') },
    { ...consentInput, actorRefHash: 'A'.repeat(64) },
    { ...consentInput, purpose: 'case_publication' },
    { ...consentInput, action: 'deleted' },
    { ...consentInput, copyVersion: 'arbitrary free text' },
    { ...consentInput, idempotencyKey: 'not-a-uuid' },
    accessor,
  ];
  const missingAction = { ...consentInput };
  delete missingAction.action;
  invalidInputs.push(missingAction);

  for (const input of invalidInputs) {
    const database = new FakeD1();
    await assertStoreError(
      () => recordConsentLifecycleEventToD1(database, input),
      'privacy_store_invalid_input',
    );
    assert.equal(database.queries.length, 0);
    assert.equal(database.batches.length, 0);
  }
  assert.equal(coercions, 0);
});

test('rejects malformed privacy requests before lookup or persistence', async () => {
  const inherited = Object.create(validRequest);
  const symbolField = Symbol('private-metadata');
  let coercions = 0;
  const coercibleHash = {
    toString() {
      coercions += 1;
      return 'b'.repeat(64);
    },
  };
  const accessor = { ...validRequest };
  Object.defineProperty(accessor, 'contactRefHash', {
    enumerable: true,
    get() {
      coercions += 1;
      return validRequest.contactRefHash;
    },
  });
  const invalidInputs = [
    null,
    [],
    new Date(),
    inherited,
    { ...validRequest, [symbolField]: 'person@example.invalid' },
    { ...validRequest, email: 'person@example.invalid' },
    { ...validRequest, name: 'Person' },
    { ...validRequest, message: 'free text' },
    { ...validRequest, body: 'free text' },
    { ...validRequest, token: 'token-value' },
    { ...validRequest, contactRefHash: coercibleHash },
    { ...validRequest, verificationHash: Symbol('hash') },
    { ...validRequest, verificationExpiresAt: '2026-09-03T22:15:00.000' },
    accessor,
  ];
  const missingRequestType = { ...validRequest };
  delete missingRequestType.requestType;
  invalidInputs.push(missingRequestType);

  for (const input of invalidInputs) {
    const database = new FakeD1();
    await assertStoreError(
      () => createPrivacyRequestToD1(database, input),
      'privacy_store_invalid_input',
    );
    assert.equal(database.queries.length, 0);
    assert.equal(database.batches.length, 0);
  }
  assert.equal(coercions, 0);
});

test('validates generated UUIDs and explicit-zone timestamps before binding', async () => {
  const invalidOverrides = [
    deterministic({ id: 'not-a-uuid' }),
    deterministic({ now: '2026-09-03T22:00:00.000' }),
    deterministic({ now: '2026-09-31T22:00:00.000Z' }),
    deterministic({ now: 1 }),
    { randomUUID: () => consentInput.leadId, now: () => { throw new Error('clock secret'); } },
  ];

  for (const overrides of invalidOverrides) {
    const database = new FakeD1([null]);
    await assertStoreError(
      () => recordConsentLifecycleEventToD1(database, consentInput, overrides),
      'privacy_store_invalid_input',
    );
    assert.equal(database.batches.length, 0);
  }

  const database = new FakeD1([null]);
  await createPrivacyRequestToD1(database, validRequest, deterministic({
    id: '00000000-0000-4000-8000-000000000011',
    now: '2026-09-03T19:00:00.000-03:00',
  }));
  assert.equal(database.batches[0][0].bindings.at(-2), '2026-09-03T22:00:00.000Z');
});

test('translates lookup, batch and race-path D1 failures without provider details', async () => {
  const lookupFailure = new FakeD1([new Error('provider lookup detail')]);
  await assertStoreError(
    () => recordConsentLifecycleEventToD1(lookupFailure, consentInput),
    'privacy_store_failed',
  );

  const batchFailure = new FakeD1([null]);
  batchFailure.batchError = new Error('provider batch detail');
  await assertStoreError(
    () => createPrivacyRequestToD1(batchFailure, validRequest, deterministic()),
    'privacy_store_failed',
  );

  const malformedBatch = new FakeD1([null]);
  malformedBatch.batchResults = [{ success: false, error: 'provider result detail' }];
  await assertStoreError(
    () => recordConsentLifecycleEventToD1(malformedBatch, consentInput, deterministic()),
    'privacy_store_failed',
  );

  const raceLookupFailure = new FakeD1([null, new Error('provider race lookup detail')]);
  raceLookupFailure.batchError = new Error(
    'UNIQUE constraint failed: contact_consent_events.idempotency_key',
  );
  await assertStoreError(
    () => recordConsentLifecycleEventToD1(raceLookupFailure, consentInput, deterministic()),
    'privacy_store_failed',
  );

  const missingRaceWinner = new FakeD1([null, null]);
  missingRaceWinner.batchError = new Error(
    'UNIQUE constraint failed: privacy_requests.idempotency_key',
  );
  await assertStoreError(
    () => createPrivacyRequestToD1(missingRaceWinner, validRequest, deterministic()),
    'privacy_store_failed',
  );
});
