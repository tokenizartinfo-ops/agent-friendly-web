import assert from 'node:assert/strict';
import test from 'node:test';

import {
  canonicalContactRequestHash,
  saveContactIntakeToD1,
} from '../lib/contact-d1-store.mjs';

const intake = {
  email: 'owner@example.com',
  name: 'Owner',
  domain: 'example.com',
  role: 'owner',
  organization: 'Example',
  locale: 'es',
  objective: 'receive_plan',
  source: 'public_guide',
  idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
  consentPurposes: ['requested_plan', 'commercial_contact'],
  copyVersion: 'agent-friendly-web.contact-intake.v1',
  turnstileToken: 'must-never-be-bound',
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
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }

  async nextFirst(sql, bindings) {
    this.queries.push({ sql, bindings });
    return this.firstResults.shift() ?? null;
  }

  async batch(statements) {
    this.batches.push(statements.map((statement) => ({
      sql: statement.sql,
      bindings: statement.bindings,
    })));
    if (this.batchError) throw this.batchError;
    return statements.map(() => ({ success: true }));
  }
}

const deterministic = {
  now: () => '2026-08-31T12:00:00.000Z',
  randomUUID: (() => {
    const ids = [
      '00000000-0000-4000-8000-000000000001',
      '00000000-0000-4000-8000-000000000002',
      '00000000-0000-4000-8000-000000000003',
    ];
    return () => ids.shift();
  })(),
};

test('D1 adapter writes one lead and its consent receipts atomically without binding Turnstile', async () => {
  const database = new FakeD1();
  const result = await saveContactIntakeToD1(database, intake, deterministic);
  assert.deepEqual(result, {
    leadId: '00000000-0000-4000-8000-000000000001',
    duplicate: false,
    conflict: false,
  });
  assert.equal(database.queries.length, 1);
  assert.equal(database.batches.length, 1);
  assert.equal(database.batches[0].length, 3);

  const serializedBindings = JSON.stringify(database.batches[0].flatMap((statement) => statement.bindings));
  assert.equal(serializedBindings.includes(intake.turnstileToken), false);
  assert.match(database.batches[0][0].sql, /INSERT INTO contact_leads/);
  assert.match(database.batches[0][1].sql, /INSERT INTO consent_receipts/);
  assert.match(database.batches[0][2].sql, /INSERT INTO consent_receipts/);
});

test('D1 adapter returns duplicate or conflict without writing for an existing idempotency key', async () => {
  const requestHash = await canonicalContactRequestHash(intake);
  const duplicateDb = new FakeD1([{ id: 'existing', requestHash }]);
  assert.deepEqual(await saveContactIntakeToD1(duplicateDb, intake), {
    leadId: 'existing', duplicate: true, conflict: false,
  });
  assert.equal(duplicateDb.batches.length, 0);

  const conflictDb = new FakeD1([{ id: 'existing', requestHash: 'different' }]);
  assert.deepEqual(await saveContactIntakeToD1(conflictDb, intake), {
    leadId: 'existing', duplicate: false, conflict: true,
  });
  assert.equal(conflictDb.batches.length, 0);
});

test('D1 adapter re-reads after a unique-key race and classifies the winner', async () => {
  const requestHash = await canonicalContactRequestHash(intake);
  const database = new FakeD1([null, { id: 'winner', requestHash }]);
  database.batchError = new Error('UNIQUE constraint failed: contact_leads.idempotency_key');
  assert.deepEqual(await saveContactIntakeToD1(database, intake), {
    leadId: 'winner', duplicate: true, conflict: false,
  });
  assert.equal(database.queries.length, 2);
});

test('D1 adapter fails closed for missing bindings and unrelated persistence failures', async () => {
  await assert.rejects(() => saveContactIntakeToD1(null, intake), /contact_store_unavailable/);
  const database = new FakeD1();
  database.batchError = new Error('storage offline');
  await assert.rejects(() => saveContactIntakeToD1(database, intake), /contact_store_failed/);
});
