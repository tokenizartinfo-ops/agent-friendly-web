import assert from 'node:assert/strict';
import test from 'node:test';

import { processContactRequest } from '../lib/contact-gate.mjs';

const input = {
  email: 'owner@example.com',
  name: 'Owner',
  domain: 'example.com',
  role: 'owner',
  organization: 'Example',
  locale: 'en',
  objective: 'receive_plan',
  requestedPlanConsent: true,
  commercialContactConsent: false,
  productUpdatesConsent: false,
  idempotencyKey: 'a53a2bb2-804c-4267-8661-c59b600ee472',
  source: 'public_audit',
  turnstileToken: 'valid-token',
};

test('fails closed while capture is disabled and calls no dependency', async () => {
  let called = false;
  const result = await processContactRequest(input, {
    enabled: false,
    verifyTurnstile: async () => { called = true; },
    save: async () => { called = true; },
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, 'contact_capture_disabled');
  assert.equal(called, false);
});

test('rejects invalid Turnstile without persisting', async () => {
  let saved = false;
  const result = await processContactRequest(input, {
    enabled: true,
    verifyTurnstile: async () => ({ success: false, reason: 'invalid-input-response' }),
    save: async () => { saved = true; },
  });
  assert.equal(result.status, 400);
  assert.equal(result.body.code, 'turnstile_failed');
  assert.equal(saved, false);
});

test('persists only after validation and returns an idempotent receipt', async () => {
  let savedValue;
  const result = await processContactRequest(input, {
    enabled: true,
    verifyTurnstile: async ({ token, action }) => ({ success: token === 'valid-token' && action === 'request_plan' }),
    save: async (value) => {
      savedValue = value;
      return { leadId: 'lead_123', duplicate: false };
    },
  });
  assert.equal(result.status, 201);
  assert.deepEqual(result.body, { accepted: true, leadId: 'lead_123', duplicate: false, emailQueued: false });
  assert.equal(savedValue.email, 'owner@example.com');
  assert.equal(savedValue.turnstileToken, undefined);
  assert.deepEqual(savedValue.consentPurposes, ['requested_plan']);
});

test('returns conflict when an idempotency key is reused for different normalized content', async () => {
  const result = await processContactRequest(input, {
    enabled: true,
    verifyTurnstile: async () => ({ success: true }),
    save: async () => ({ leadId: 'lead-existing', duplicate: false, conflict: true }),
  });

  assert.equal(result.status, 409);
  assert.deepEqual(result.body, { accepted: false, code: 'idempotency_conflict' });
});
