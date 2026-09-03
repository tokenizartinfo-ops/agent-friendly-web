import assert from 'node:assert/strict';
import test from 'node:test';

import {
  preparePrivateReviewReadyNotification,
  validateInternalReviewReadyTrigger,
} from '../lib/private-review-ready-integration.mjs';

const requestId = '79e13d0c-c75b-4f39-b1f4-9fd19e0bc458';
const trigger = {
  contract: 'agent-friendly-web.internal-review-ready-trigger.v1',
  requestId,
  action: 'notify_internal_operator',
  humanApproved: true,
};

function databaseReturning(row) {
  const observations = { sql: '', bindings: [] };
  return {
    observations,
    prepare(sql) {
      observations.sql = sql;
      return {
        bind(...bindings) {
          observations.bindings = bindings;
          return {
            async first() {
              return row;
            },
          };
        },
      };
    },
  };
}

test('rejects unknown, private and message fields before reading D1', async () => {
  for (const extra of [
    { email: 'owner@example.com' },
    { recipient: 'operator@example.com' },
    { subject: 'Custom subject' },
    { body: 'Custom body' },
    { domain: 'example.com' },
    { token: 'not-accepted' },
    { arbitrary: true },
  ]) {
    let prepared = false;
    const database = {
      prepare() {
        prepared = true;
        throw new Error('must_not_read');
      },
    };
    const result = await preparePrivateReviewReadyNotification(database, { ...trigger, ...extra });

    assert.deepEqual(result, { ok: false, code: 'invalid_internal_review_ready_trigger' });
    assert.equal(prepared, false);
  }
});

test('requires exact contract, UUID, action and action-time human approval', () => {
  assert.deepEqual(validateInternalReviewReadyTrigger(trigger), { ok: true, value: trigger });

  for (const invalid of [
    { ...trigger, contract: 'agent-friendly-web.email-review-ready.v1' },
    { ...trigger, requestId: 'lead-123' },
    { ...trigger, action: 'send_customer_email' },
    { ...trigger, humanApproved: false },
  ]) {
    assert.deepEqual(
      validateInternalReviewReadyTrigger(invalid),
      { ok: false, code: 'invalid_internal_review_ready_trigger' },
    );
  }
});

test('loads only opaque review metadata and derives an idempotent unsent notification', async () => {
  const database = databaseReturning({ id: requestId, locale: 'pt', state: 'new' });

  const result = await preparePrivateReviewReadyNotification(database, trigger);

  assert.match(database.observations.sql, /SELECT id, locale, state FROM contact_leads/i);
  assert.doesNotMatch(database.observations.sql, /email|name|organization|role|domain|objective/i);
  assert.deepEqual(database.observations.bindings, [requestId]);
  assert.deepEqual(result, {
    ok: true,
    status: 'prepared_not_sent',
    source: {
      type: 'contact_lead',
      requestId,
      persistedState: 'new',
      derivedState: 'review_ready',
    },
    emailRequest: {
      contract: 'agent-friendly-web.email-review-ready.v1',
      eventId: `afw-review-ready-${requestId}`,
      idempotencyKey: requestId,
      templateId: 'internal-review-ready-v1',
      locale: 'pt',
      purpose: 'internal_review_ready',
      humanApproved: true,
    },
    capabilities: {
      sendsEmail: false,
      persistsData: false,
      retriesAutomatically: false,
    },
  });
});

test('fails closed for missing, ineligible or malformed private sources', async () => {
  const cases = [
    [null, 'private_review_ready_request_not_found'],
    [{ id: requestId, locale: 'es', state: 'qualified' }, 'private_review_ready_request_not_eligible'],
    [{ id: requestId, locale: 'fr', state: 'new' }, 'private_review_ready_source_invalid'],
    [{ id: '18b8700c-206b-48e9-b7ae-86bc9b309217', locale: 'es', state: 'new' }, 'private_review_ready_source_invalid'],
  ];

  for (const [row, code] of cases) {
    const result = await preparePrivateReviewReadyNotification(databaseReturning(row), trigger);
    assert.deepEqual(result, { ok: false, code });
  }
});

test('sanitizes D1 failures and rejects unavailable stores', async () => {
  assert.deepEqual(
    await preparePrivateReviewReadyNotification(null, trigger),
    { ok: false, code: 'private_review_ready_store_unavailable' },
  );

  const result = await preparePrivateReviewReadyNotification({
    prepare() {
      throw new Error('database error with private context');
    },
  }, trigger);
  assert.deepEqual(result, { ok: false, code: 'private_review_ready_store_unavailable' });
});
