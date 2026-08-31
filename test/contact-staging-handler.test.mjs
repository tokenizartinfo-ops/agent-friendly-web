import assert from 'node:assert/strict';
import test from 'node:test';

import { processStagingContactRequest } from '../lib/contact-staging-handler.mjs';

const policy = {
  mode: 'staging_allowlist',
  writesEnabled: true,
  expectedHost: 'contact-staging.example.com',
  allowedEmails: ['gabriel@example.com'],
};
const identity = { userId: 'user-123', email: 'gabriel@example.com' };
const request = new Request('https://contact-staging.example.com/api/staging/contact-intake', {
  method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}',
});

test('staging handler rejects unauthorized requests before limiter or body access', async () => {
  let called = false;
  const result = await processStagingContactRequest(request, {
    policy,
    identity: { userId: 'other', email: 'other@example.com' },
    runtimeReady: true,
    consumeRateLimit: async () => { called = true; },
    readJson: async () => { called = true; },
    handleContact: async () => { called = true; },
  });
  assert.equal(result.status, 403);
  assert.equal(result.body.code, 'contact_staging_actor_not_allowed');
  assert.equal(called, false);
});

test('staging handler requires a working rate limiter before reading the body', async () => {
  let bodyRead = false;
  const missing = await processStagingContactRequest(request, {
    policy, identity, runtimeReady: true,
    readJson: async () => { bodyRead = true; },
    handleContact: async () => assert.fail(),
  });
  assert.equal(missing.status, 503);
  assert.equal(missing.body.code, 'contact_staging_misconfigured');
  assert.equal(bodyRead, false);

  const limited = await processStagingContactRequest(request, {
    policy, identity, runtimeReady: true,
    consumeRateLimit: async () => ({ allowed: false }),
    readJson: async () => { bodyRead = true; },
    handleContact: async () => assert.fail(),
  });
  assert.equal(limited.status, 429);
  assert.equal(bodyRead, false);
});

test('staging handler reads and delegates only after every outer gate passes', async () => {
  const calls = [];
  const result = await processStagingContactRequest(request, {
    policy, identity, runtimeReady: true,
    consumeRateLimit: async (key) => { calls.push(['rate', key]); return { allowed: true }; },
    readJson: async () => { calls.push(['body']); return { ok: true, value: { email: 'owner@example.com' } }; },
    handleContact: async (value) => { calls.push(['contact', value.email]); return { status: 201, body: { accepted: true } }; },
  });
  assert.deepEqual(calls, [
    ['rate', 'contact:user-123'],
    ['body'],
    ['contact', 'owner@example.com'],
  ]);
  assert.deepEqual(result, { status: 201, body: { accepted: true } });
});

test('staging handler converts limiter failures to a closed service response', async () => {
  const result = await processStagingContactRequest(request, {
    policy, identity, runtimeReady: true,
    consumeRateLimit: async () => { throw new Error('binding unavailable'); },
    readJson: async () => assert.fail(),
    handleContact: async () => assert.fail(),
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, 'contact_staging_misconfigured');
});

test('staging handler requires Turnstile, storage and limiter bindings before consuming quota or body', async () => {
  let called = false;
  const result = await processStagingContactRequest(request, {
    policy, identity, runtimeReady: false,
    consumeRateLimit: async () => { called = true; },
    readJson: async () => { called = true; },
    handleContact: async () => { called = true; },
  });
  assert.equal(result.status, 503);
  assert.equal(result.body.code, 'contact_staging_misconfigured');
  assert.equal(called, false);
});
