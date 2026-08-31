import assert from 'node:assert/strict';
import test from 'node:test';

import {
  CONTACT_COPY_VERSION,
  consentPurposesFor,
  normalizeContactIntake,
  validateContactIntake,
} from '../lib/contact-intake.mjs';

const validInput = {
  email: ' Gabriel@Example.COM ',
  name: ' Gabriel ',
  domain: 'https://Example.COM/path',
  role: 'owner',
  organization: 'Ejemplo',
  locale: 'es',
  objective: 'receive_plan',
  requestedPlanConsent: true,
  commercialContactConsent: false,
  productUpdatesConsent: false,
  idempotencyKey: '2d6dd330-713f-45a6-abaf-2f466dfd8e25',
  source: 'public_audit',
  turnstileToken: 'test-token',
};

test('normalizes email, hostname and bounded optional fields', () => {
  const value = normalizeContactIntake(validInput);
  assert.equal(value.email, 'gabriel@example.com');
  assert.equal(value.domain, 'example.com');
  assert.equal(value.name, 'Gabriel');
  assert.equal(value.copyVersion, CONTACT_COPY_VERSION);
});

test('requires requested-plan consent without implying optional marketing consent', () => {
  assert.deepEqual(consentPurposesFor(validInput), ['requested_plan']);
  assert.deepEqual(consentPurposesFor({
    ...validInput,
    commercialContactConsent: true,
    productUpdatesConsent: true,
  }), ['requested_plan', 'commercial_contact', 'product_updates']);

  const invalid = validateContactIntake({ ...validInput, requestedPlanConsent: false });
  assert.equal(invalid.ok, false);
  assert.ok(invalid.errors.includes('requested_plan_consent_required'));
});

test('rejects invalid identity, enums and probable secrets', () => {
  for (const input of [
    { ...validInput, email: 'not-an-email' },
    { ...validInput, locale: 'fr' },
    { ...validInput, objective: 'buy_everything' },
    { ...validInput, role: 'password=super-secret-value' },
    { ...validInput, idempotencyKey: 'not-a-uuid' },
  ]) {
    assert.equal(validateContactIntake(input).ok, false);
  }
});

test('rejects common unlabelled credential formats in optional fields', () => {
  const secretSamples = [
    'sk-proj-abcdefghijklmnopqrstuvwxyz123456',
    'ghp_abcdefghijklmnopqrstuvwxyz1234567890',
    'AKIAIOSFODNN7EXAMPLE',
    'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.signature123456',
    '-----BEGIN PRIVATE KEY-----',
  ];

  for (const secret of secretSamples) {
    const result = validateContactIntake({ ...validInput, organization: secret });
    assert.equal(result.ok, false, secret);
    assert.ok(result.errors.includes('probable_secret_in_organization'), secret);
  }
});

test('rejects overlong values and keeps the Turnstile token out of normalized persistence data', () => {
  assert.equal(validateContactIntake({ ...validInput, name: 'a'.repeat(121) }).ok, false);
  const value = normalizeContactIntake(validInput);
  assert.equal('turnstileToken' in value, false);
});
