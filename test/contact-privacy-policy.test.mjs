import assert from 'node:assert/strict';
import test from 'node:test';

import * as contactPrivacyPolicy from '../lib/contact-privacy-policy.mjs';
import {
  CONTACT_PRIVACY_POLICY_VERSION,
  PRIVACY_REQUEST_EFFECTS,
  RETENTION_DAYS,
  calculateRetentionDeadline,
  deriveConsentStatus,
  planRetentionAction,
  privacyRequestEffect,
  validatePrivacyRequestMetadata,
} from '../lib/contact-privacy-policy.mjs';

const approvedConsentCopyVersions = {
  requested_plan: ['agent-friendly-web.contact-intake.v1'],
  commercial_contact: ['agent-friendly-web.contact-intake.v1'],
  product_updates: ['agent-friendly-web.contact-intake.v1'],
};

test('derives each consent independently from an immutable event sequence', () => {
  const events = [
    { id: 'evt-1', purpose: 'requested_plan', action: 'granted', createdAt: '2026-01-01T00:00:00.000Z' },
    { id: 'evt-2', purpose: 'product_updates', action: 'granted', createdAt: '2026-01-02T00:00:00.000Z' },
    { id: 'evt-3', purpose: 'product_updates', action: 'withdrawn', createdAt: '2026-01-03T00:00:00.000Z' },
  ];
  assert.equal(deriveConsentStatus(events, 'requested_plan'), 'granted');
  assert.equal(deriveConsentStatus(events, 'commercial_contact'), 'none');
  assert.equal(deriveConsentStatus(events, 'product_updates'), 'withdrawn');
});

test('validates consent copy against the purpose-specific approved catalog', () => {
  assert.deepEqual(
    contactPrivacyPolicy.APPROVED_CONSENT_COPY_VERSIONS,
    approvedConsentCopyVersions,
  );
  for (const [purpose, [copyVersion]] of Object.entries(approvedConsentCopyVersions)) {
    assert.deepEqual(contactPrivacyPolicy.validateConsentCopyVersion(purpose, copyVersion), {
      ok: true,
      value: { purpose, copyVersion },
    });
    assert.deepEqual(
      contactPrivacyPolicy.validateConsentCopyVersion(
        purpose,
        'agent-friendly-web.contact-intake.v0',
      ),
      { ok: false, code: 'privacy_consent_copy_version_invalid' },
    );
  }
  assert.deepEqual(
    contactPrivacyPolicy.validateConsentCopyVersion(
      'case_publication',
      'agent-friendly-web.contact-intake.v1',
    ),
    { ok: false, code: 'privacy_consent_purpose_invalid' },
  );
});

test('uses the approved deterministic retention defaults', () => {
  assert.deepEqual(RETENTION_DAYS, {
    requested_plan: 180,
    commercial_contact: 365,
    product_updates: 730,
    consent_evidence: 730,
    suppression: 730,
    synthetic: 7,
  });
  assert.equal(calculateRetentionDeadline({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
  }).dueAt, '2026-06-30T00:00:00.000Z');
  assert.equal(calculateRetentionDeadline({
    purpose: 'product_updates',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
  }).dueAt, '2028-01-01T00:00:00.000Z');
  assert.equal(calculateRetentionDeadline({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    synthetic: true,
  }).dueAt, '2026-01-08T00:00:00.000Z');
});

test('plans expiry and rejects an indefinite hold', () => {
  assert.equal(planRetentionAction({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: '2026-07-01T00:00:00.000Z',
  }).action, 'erase_identifiers');
  assert.deepEqual(planRetentionAction({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: '2026-07-01T00:00:00.000Z',
    hold: { reasonCode: 'legal_claim', expiresAt: '' },
  }), { ok: false, code: 'privacy_hold_expiry_required' });
});

test('validates privacy request metadata without accepting PII or free text', () => {
  const valid = validatePrivacyRequestMetadata({
    requestType: 'access_export',
    contactRefHash: 'a'.repeat(64),
    verificationHash: 'b'.repeat(64),
    verificationExpiresAt: '2026-09-03T22:15:00.000Z',
    expiresAt: '2026-09-10T22:00:00.000Z',
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
  });
  assert.equal(valid.ok, true);
  assert.equal('email' in valid.value, false);
  assert.equal(validatePrivacyRequestMetadata({ ...valid.value, email: 'person@example.com' }).ok, false);
});

test('maps every right to one bounded effect without executing it', () => {
  assert.deepEqual(PRIVACY_REQUEST_EFFECTS, {
    access_export: 'prepare_subject_export',
    rectification: 'update_allowlisted_fields',
    withdraw_consent: 'record_purpose_withdrawal',
    deletion: 'erase_identifiers',
    restriction: 'restrict_processing',
    consent_status: 'report_consent_state',
  });
  assert.equal(privacyRequestEffect('deletion'), 'erase_identifiers');
  assert.equal(privacyRequestEffect('unknown'), 'unsupported');
});

test('rejects effect names inherited from Object.prototype', () => {
  for (const requestType of ['constructor', 'toString', '__proto__']) {
    assert.equal(privacyRequestEffect(requestType), 'unsupported');
  }
});

test('rejects non-string and symbol metadata without invoking coercion', () => {
  const base = {
    requestType: 'access_export',
    contactRefHash: 'a'.repeat(64),
    verificationHash: 'b'.repeat(64),
    verificationExpiresAt: '2026-09-03T22:15:00.000Z',
    expiresAt: '2026-09-10T22:00:00.000Z',
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
  };
  let coercions = 0;
  const coercibleHash = {
    toString() {
      coercions += 1;
      return 'a'.repeat(64);
    },
  };
  const coercibleIdempotencyKey = {
    toString() {
      coercions += 1;
      return '6ba7b810-9dad-41d1-80b4-00c04fd430c8';
    },
  };

  assert.deepEqual(
    validatePrivacyRequestMetadata({ ...base, contactRefHash: coercibleHash }),
    { ok: false, code: 'privacy_request_hash_invalid' },
  );
  assert.deepEqual(
    validatePrivacyRequestMetadata({ ...base, verificationHash: Symbol('verification-hash') }),
    { ok: false, code: 'privacy_request_hash_invalid' },
  );
  assert.deepEqual(
    validatePrivacyRequestMetadata({ ...base, idempotencyKey: coercibleIdempotencyKey }),
    { ok: false, code: 'privacy_request_idempotency_invalid' },
  );
  assert.equal(coercions, 0);

  const privateMetadata = Symbol('private-metadata');
  assert.deepEqual(
    validatePrivacyRequestMetadata({ ...base, [privateMetadata]: 'person@example.com' }),
    { ok: false, code: 'privacy_request_field_not_allowed' },
  );
});

test('requires strict ISO timestamps with an explicit timezone', () => {
  const withoutTimezone = '2026-01-01T00:00:00.000';
  assert.equal(deriveConsentStatus([
    { id: 'evt-1', purpose: 'requested_plan', action: 'granted', createdAt: withoutTimezone },
  ], 'requested_plan'), 'none');
  assert.deepEqual(calculateRetentionDeadline({
    purpose: 'requested_plan',
    lastInteractionAt: withoutTimezone,
  }), { ok: false, code: 'privacy_last_interaction_invalid' });
  assert.deepEqual(planRetentionAction({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: withoutTimezone,
  }), { ok: false, code: 'privacy_now_invalid' });
  assert.deepEqual(validatePrivacyRequestMetadata({
    requestType: 'access_export',
    contactRefHash: 'a'.repeat(64),
    verificationHash: 'b'.repeat(64),
    verificationExpiresAt: withoutTimezone,
    expiresAt: '2026-09-10T22:00:00.000Z',
    policyVersion: CONTACT_PRIVACY_POLICY_VERSION,
    idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
  }), { ok: false, code: 'privacy_request_expiry_invalid' });
});

test('orders offset consent timestamps by instant', () => {
  assert.equal(deriveConsentStatus([
    {
      id: 'evt-earlier',
      purpose: 'product_updates',
      action: 'granted',
      createdAt: '2026-01-01T00:30:00.000+01:00',
    },
    {
      id: 'evt-later',
      purpose: 'product_updates',
      action: 'withdrawn',
      createdAt: '2025-12-31T23:45:00.000Z',
    },
  ], 'product_updates'), 'withdrawn');
});

test('same-timestamp withdrawal wins regardless of event UUID or input order', () => {
  const timestamp = '2026-01-01T00:00:00.000Z';
  const pairs = [
    [
      { id: 'evt-z', purpose: 'commercial_contact', action: 'granted', createdAt: timestamp },
      { id: 'evt-a', purpose: 'commercial_contact', action: 'withdrawn', createdAt: timestamp },
    ],
    [
      { id: 'evt-a', purpose: 'commercial_contact', action: 'granted', createdAt: timestamp },
      { id: 'evt-z', purpose: 'commercial_contact', action: 'withdrawn', createdAt: timestamp },
    ],
  ];
  for (const events of pairs) {
    assert.equal(deriveConsentStatus(events, 'commercial_contact'), 'withdrawn');
    assert.equal(deriveConsentStatus([...events].reverse(), 'commercial_contact'), 'withdrawn');
  }
});

test('same-timestamp supersession wins regardless of event UUID or input order', () => {
  const timestamp = '2026-01-01T00:00:00.000Z';
  const pairs = [
    [
      { id: 'evt-z', purpose: 'product_updates', action: 'granted', createdAt: timestamp },
      { id: 'evt-a', purpose: 'product_updates', action: 'superseded', createdAt: timestamp },
    ],
    [
      { id: 'evt-a', purpose: 'product_updates', action: 'granted', createdAt: timestamp },
      { id: 'evt-z', purpose: 'product_updates', action: 'superseded', createdAt: timestamp },
    ],
  ];
  for (const events of pairs) {
    assert.equal(deriveConsentStatus(events, 'product_updates'), 'withdrawn');
    assert.equal(deriveConsentStatus([...events].reverse(), 'product_updates'), 'withdrawn');
  }
});

test('rejects null and non-plain retention inputs without throwing', () => {
  const inherited = Object.create({
    purpose: 'requested_plan',
    lastInteractionAt: '2026-01-01T00:00:00.000Z',
    now: '2026-07-01T00:00:00.000Z',
  });
  for (const input of [null, [], new Date(), inherited]) {
    assert.deepEqual(
      calculateRetentionDeadline(input),
      { ok: false, code: 'privacy_retention_input_invalid' },
    );
    assert.deepEqual(
      planRetentionAction(input),
      { ok: false, code: 'privacy_retention_input_invalid' },
    );
  }
});
