import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { DatabaseSync } from 'node:sqlite';
import test from 'node:test';

import {
  canonicalEmailReviewReadyRequestHash,
  markEmailReviewReadyFailed,
  markEmailReviewReadySent,
  reserveEmailReviewReadyDelivery,
} from '../lib/email-review-ready-d1.mjs';

const request = {
  contract: 'agent-friendly-web.email-review-ready.v1',
  eventId: 'afw-review-ready-20260902-0001',
  idempotencyKey: 'b9fab654-450d-4e8c-ab29-6c658c13064f',
  templateId: 'internal-review-ready-v1',
  locale: 'es',
  purpose: 'internal_review_ready',
  humanApproved: true,
};
const actorHash = 'a'.repeat(64);

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
    this.database.queries.push({ sql: this.sql, bindings: this.bindings });
    return this.database.firstResults.shift() ?? null;
  }

  async run() {
    this.database.runs.push({ sql: this.sql, bindings: this.bindings });
    if (this.database.runErrors.length > 0) throw this.database.runErrors.shift();
    return this.database.runResults.shift() ?? { success: true, meta: { changes: 1 } };
  }
}

class FakeD1 {
  constructor(firstResults = []) {
    this.firstResults = [...firstResults];
    this.queries = [];
    this.runs = [];
    this.runErrors = [];
    this.runResults = [];
  }

  prepare(sql) {
    return new FakeStatement(this, sql);
  }
}

const deterministic = {
  now: () => '2026-09-02T23:00:00.000Z',
  randomUUID: () => '00000000-0000-4000-8000-000000000601',
};

test('reserves one delivery before send and binds metadata only', async () => {
  const database = new FakeD1([null, null]);
  const result = await reserveEmailReviewReadyDelivery(database, request, actorHash, deterministic);

  assert.deepEqual(result, {
    reservationId: '00000000-0000-4000-8000-000000000601',
    state: 'reserved',
    duplicate: false,
    conflict: false,
  });
  assert.equal(database.queries.length, 2);
  assert.equal(database.runs.length, 1);
  assert.match(database.runs[0].sql, /INSERT INTO email_transactional_deliveries/);
  const bound = JSON.stringify(database.runs[0].bindings);
  assert.match(bound, /afw-review-ready-20260902-0001/);
  assert.doesNotMatch(bound, /@|solicitud lista|request ready|Authorization|Bearer/i);
});

test('classifies idempotent replay and conflicting reuse without another insert', async () => {
  const requestHash = await canonicalEmailReviewReadyRequestHash(request, actorHash);
  const duplicate = new FakeD1([{
    id: 'existing-id', eventId: request.eventId, requestHash, status: 'sent',
  }]);
  assert.deepEqual(await reserveEmailReviewReadyDelivery(duplicate, request, actorHash), {
    reservationId: 'existing-id', state: 'sent', duplicate: true, conflict: false,
  });
  assert.equal(duplicate.runs.length, 0);

  const conflict = new FakeD1([{
    id: 'existing-id', eventId: request.eventId, requestHash: 'b'.repeat(64), status: 'sent',
  }]);
  assert.deepEqual(await reserveEmailReviewReadyDelivery(conflict, request, actorHash), {
    reservationId: 'existing-id', state: 'sent', duplicate: false, conflict: true,
  });
  assert.equal(conflict.runs.length, 0);
});

test('prevents the same event from being reserved under another idempotency key', async () => {
  const changed = { ...request, idempotencyKey: '55ed9968-507a-4417-aed0-af8c3012e119' };
  const database = new FakeD1([
    null,
    { id: 'existing-event', eventId: request.eventId, requestHash: 'c'.repeat(64), status: 'reserved' },
  ]);

  assert.deepEqual(await reserveEmailReviewReadyDelivery(database, changed, actorHash), {
    reservationId: 'existing-event', state: 'reserved', duplicate: false, conflict: true,
  });
  assert.equal(database.runs.length, 0);
});

test('re-reads after a uniqueness race and never retries the insert', async () => {
  const requestHash = await canonicalEmailReviewReadyRequestHash(request, actorHash);
  const database = new FakeD1([
    null,
    null,
    { id: 'race-winner', eventId: request.eventId, requestHash, status: 'reserved' },
  ]);
  database.runErrors.push(new Error('UNIQUE constraint failed: email_transactional_deliveries.event_id'));

  assert.deepEqual(await reserveEmailReviewReadyDelivery(database, request, actorHash), {
    reservationId: 'race-winner', state: 'reserved', duplicate: true, conflict: false,
  });
  assert.equal(database.runs.length, 1);
});

test('marks sent or failed with hashes and stable codes only', async () => {
  const sentDb = new FakeD1();
  const sent = await markEmailReviewReadySent(
    sentDb,
    '00000000-0000-4000-8000-000000000601',
    'provider-private-message-id',
    { now: () => '2026-09-02T23:01:00.000Z' },
  );
  assert.deepEqual(sent, { updated: true });
  assert.equal(sentDb.runs.length, 1);
  assert.doesNotMatch(JSON.stringify(sentDb.runs[0].bindings), /provider-private-message-id/);
  assert.match(JSON.stringify(sentDb.runs[0].bindings), /[0-9a-f]{64}/);

  const failedDb = new FakeD1();
  const failed = await markEmailReviewReadyFailed(
    failedDb,
    '00000000-0000-4000-8000-000000000601',
    'provider_rejected',
    { now: () => '2026-09-02T23:02:00.000Z' },
  );
  assert.deepEqual(failed, { updated: true });
  assert.match(failedDb.runs[0].sql, /status = 'failed'/);
  assert.doesNotMatch(JSON.stringify(failedDb.runs[0].bindings), /stack|token|private/i);
});

test('all migrations create an empty additive email delivery table', async () => {
  const database = new DatabaseSync(':memory:');
  for (const file of [
    'drizzle/0000_tearful_ego.sql',
    'drizzle/0001_registry_block1.sql',
    'drizzle/0002_publication_capsules.sql',
    'drizzle/0003_origin_comparisons_and_draft_pr_plans.sql',
    'drizzle/0004_common_guardsmen.sql',
    'drizzle/0005_normal_ma_gnuci.sql',
    'drizzle/0006_email_transactional_deliveries.sql',
  ]) {
    const sql = (await readFile(file, 'utf8')).replaceAll('--> statement-breakpoint', '');
    database.exec(sql);
  }

  const columns = database
    .prepare('PRAGMA table_info(email_transactional_deliveries)')
    .all()
    .map((row) => row.name);
  assert.deepEqual(columns, [
    'id', 'event_id', 'template_id', 'locale', 'purpose', 'actor_subject_hash',
    'idempotency_key', 'request_hash', 'status', 'provider_delivery_hash',
    'failure_code', 'created_at', 'sent_at', 'updated_at',
  ]);
  assert.equal(database.prepare('SELECT count(*) AS count FROM email_transactional_deliveries').get().count, 0);
  database.close();
});

test('storage fails closed for missing D1 and malformed metadata', async () => {
  await assert.rejects(
    () => reserveEmailReviewReadyDelivery(null, request, actorHash),
    /email_review_ready_store_unavailable/,
  );
  await assert.rejects(
    () => reserveEmailReviewReadyDelivery(new FakeD1(), request, 'not-a-hash'),
    /email_review_ready_store_invalid_input/,
  );
  await assert.rejects(
    () => markEmailReviewReadyFailed(new FakeD1(), 'bad-id', 'raw provider stack'),
    /email_review_ready_store_invalid_input/,
  );
});
