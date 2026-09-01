import assert from 'node:assert/strict';
import test from 'node:test';

import {
  authorizeContactStaging,
  authorizeContactStagingView,
  readContactStagingPolicy,
} from '../lib/contact-staging-policy.mjs';

const rawConfig = {
  CONTACT_STAGING_MODE: 'staging_allowlist',
  CONTACT_STAGING_UI_ENABLED: 'true',
  CONTACT_STAGING_WRITES_ENABLED: 'true',
  CONTACT_STAGING_EXPECTED_HOST: 'contact-staging.example.com',
  CONTACT_STAGING_ALLOWED_EMAILS: ' Gabriel@Example.com, reviewer@example.com ',
};

const identity = { userId: 'user-123', email: 'gabriel@example.com' };

test('contact staging policy normalizes the private hostname and exact email allowlist', () => {
  const policy = readContactStagingPolicy(rawConfig);
  assert.equal(policy.mode, 'staging_allowlist');
  assert.equal(policy.uiEnabled, true);
  assert.equal(policy.writesEnabled, true);
  assert.equal(policy.expectedHost, 'contact-staging.example.com');
  assert.deepEqual(policy.allowedEmails, ['gabriel@example.com', 'reviewer@example.com']);
});

test('private Sites UI can be visible while every Sites write path remains closed', () => {
  const policy = readContactStagingPolicy({
    ...rawConfig,
    CONTACT_STAGING_WRITES_ENABLED: 'false',
  });
  assert.deepEqual(authorizeContactStagingView(policy, policy.expectedHost, identity), {
    allowed: true,
    actor: { userId: 'user-123', email: 'gabriel@example.com' },
  });
  assert.deepEqual(authorizeContactStaging(policy, policy.expectedHost, identity), {
    allowed: false,
    status: 503,
    code: 'contact_staging_kill_switch_closed',
  });
});

test('private Sites UI has its own fail-closed switch', () => {
  const policy = readContactStagingPolicy({
    ...rawConfig,
    CONTACT_STAGING_UI_ENABLED: 'false',
  });
  assert.deepEqual(authorizeContactStagingView(policy, policy.expectedHost, identity), {
    allowed: false,
    status: 404,
    code: 'contact_staging_unavailable',
  });
});

test('contact staging fails closed for mode, configuration and hostname mismatches', () => {
  const policy = readContactStagingPolicy(rawConfig);
  assert.deepEqual(authorizeContactStaging({ ...policy, mode: '' }, 'contact-staging.example.com', identity), {
    allowed: false, status: 404, code: 'contact_staging_unavailable',
  });
  assert.deepEqual(authorizeContactStaging({ ...policy, allowedEmails: [] }, 'contact-staging.example.com', identity), {
    allowed: false, status: 503, code: 'contact_staging_misconfigured',
  });
  assert.deepEqual(authorizeContactStaging(policy, 'other.example.com', identity), {
    allowed: false, status: 404, code: 'contact_staging_unavailable',
  });
  assert.deepEqual(authorizeContactStaging(policy, 'contact-staging.example.com:8443', identity), {
    allowed: false, status: 404, code: 'contact_staging_unavailable',
  });

  const publicOriginPolicy = readContactStagingPolicy({
    ...rawConfig,
    CONTACT_STAGING_EXPECTED_HOST: 'agentfriendlyweb.dev',
  });
  assert.equal(publicOriginPolicy.expectedHost, '');
  assert.deepEqual(authorizeContactStaging(publicOriginPolicy, 'agentfriendlyweb.dev', identity), {
    allowed: false, status: 503, code: 'contact_staging_misconfigured',
  });
});

test('contact staging requires authenticated allowlisted identity before opening writes', () => {
  const policy = readContactStagingPolicy(rawConfig);
  assert.deepEqual(authorizeContactStaging(policy, policy.expectedHost, { userId: '', email: '' }), {
    allowed: false, status: 401, code: 'contact_staging_identity_required',
  });
  assert.deepEqual(authorizeContactStaging(policy, policy.expectedHost, { userId: 'user-456', email: 'other@example.com' }), {
    allowed: false, status: 403, code: 'contact_staging_actor_not_allowed',
  });
  assert.deepEqual(authorizeContactStaging({ ...policy, writesEnabled: false }, policy.expectedHost, identity), {
    allowed: false, status: 503, code: 'contact_staging_kill_switch_closed',
  });
  assert.deepEqual(authorizeContactStaging(policy, policy.expectedHost, identity), {
    allowed: true,
    actor: { userId: 'user-123', email: 'gabriel@example.com' },
    rateLimitKey: 'contact:user-123',
  });
});
