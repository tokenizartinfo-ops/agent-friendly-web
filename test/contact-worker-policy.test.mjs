import assert from 'node:assert/strict';
import test from 'node:test';

import {
  authorizeContactWorkerIdentity,
  createOpaqueRateLimitKey,
  evaluateContactWorkerRequest,
  readContactWorkerPolicy,
} from '../lib/contact-worker-policy.mjs';

const rawConfig = {
  CONTACT_STAGING_MODE: 'staging_allowlist',
  CONTACT_STAGING_WRITES_ENABLED: 'true',
  CONTACT_STAGING_API_HOST: 'contact-staging.agentfriendlyweb.dev',
  CONTACT_STAGING_FORM_ORIGIN: 'https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site',
  CONTACT_STAGING_WIDGET_HOST: 'agent-friendly-web-contact-staging.tokenizart.chatgpt.site',
  CONTACT_STAGING_ALLOWED_EMAILS: ' Gabriel@Example.com, reviewer@example.com ',
  CONTACT_ACCESS_TEAM_DOMAIN: 'example.cloudflareaccess.com',
  CONTACT_ACCESS_AUD: 'contact-staging-audience',
};

function request(path = '/api/contact-intake', options = {}) {
  return new Request(`https://contact-staging.agentfriendlyweb.dev${path}`, {
    method: options.method || 'POST',
    headers: {
      origin: options.origin === undefined
        ? 'https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site'
        : options.origin,
      ...(options.headers || {}),
    },
  });
}

test('worker policy normalizes exact API, form, widget, Access and allowlist boundaries', () => {
  const policy = readContactWorkerPolicy(rawConfig);
  assert.deepEqual(policy, {
    mode: 'staging_allowlist',
    writesEnabled: true,
    apiHost: 'contact-staging.agentfriendlyweb.dev',
    formOrigin: 'https://agent-friendly-web-contact-staging.tokenizart.chatgpt.site',
    widgetHost: 'agent-friendly-web-contact-staging.tokenizart.chatgpt.site',
    allowedEmails: ['gabriel@example.com', 'reviewer@example.com'],
    accessTeamDomain: 'example.cloudflareaccess.com',
    accessAudience: 'contact-staging-audience',
  });
});

test('worker policy accepts only the exact HTTPS form origin and POST route', () => {
  const policy = readContactWorkerPolicy(rawConfig);
  const accepted = evaluateContactWorkerRequest(policy, request());
  assert.equal(accepted.proceed, true);
  assert.deepEqual(accepted.corsHeaders, {
    'access-control-allow-origin': rawConfig.CONTACT_STAGING_FORM_ORIGIN,
    'access-control-allow-credentials': 'true',
    'cache-control': 'no-store',
    vary: 'Origin',
  });

  for (const denied of [
    request('/api/contact-intake/'),
    request('/api/other'),
    request('/api/contact-intake', { origin: 'https://evil.example' }),
    request('/api/contact-intake', { origin: '' }),
    new Request('http://contact-staging.agentfriendlyweb.dev/api/contact-intake', {
      method: 'POST',
      headers: { origin: rawConfig.CONTACT_STAGING_FORM_ORIGIN },
    }),
    new Request('https://other.agentfriendlyweb.dev/api/contact-intake', {
      method: 'POST',
      headers: { origin: rawConfig.CONTACT_STAGING_FORM_ORIGIN },
    }),
  ]) {
    assert.equal(evaluateContactWorkerRequest(policy, denied).proceed, false);
  }

  const wrongMethod = evaluateContactWorkerRequest(policy, request('/api/contact-intake', { method: 'PUT' }));
  assert.equal(wrongMethod.status, 405);
  assert.equal(wrongMethod.code, 'contact_staging_method_not_allowed');
});

test('worker policy handles a bounded exact preflight and rejects requested headers outside the allowlist', () => {
  const policy = readContactWorkerPolicy(rawConfig);
  const accepted = evaluateContactWorkerRequest(policy, request('/api/contact-intake', {
    method: 'OPTIONS',
    headers: {
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'content-type',
    },
  }));
  assert.equal(accepted.preflight, true);
  assert.equal(accepted.status, 204);
  assert.equal(accepted.corsHeaders['access-control-allow-methods'], 'POST, OPTIONS');
  assert.equal(accepted.corsHeaders['access-control-allow-headers'], 'content-type');
  assert.equal(accepted.corsHeaders['access-control-max-age'], '600');

  const unsafeHeader = evaluateContactWorkerRequest(policy, request('/api/contact-intake', {
    method: 'OPTIONS',
    headers: {
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'content-type, authorization',
    },
  }));
  assert.equal(unsafeHeader.status, 403);
  assert.equal(unsafeHeader.code, 'contact_staging_cors_forbidden');
});

test('worker policy fails closed on unavailable mode, malformed config and kill switch before identity', () => {
  const policy = readContactWorkerPolicy(rawConfig);
  assert.equal(evaluateContactWorkerRequest({ ...policy, mode: '' }, request()).status, 404);
  assert.equal(evaluateContactWorkerRequest({ ...policy, accessAudience: '' }, request()).status, 503);

  const closed = evaluateContactWorkerRequest({ ...policy, writesEnabled: false }, request());
  assert.equal(closed.status, 503);
  assert.equal(closed.code, 'contact_staging_kill_switch_closed');

  const malformedOrigin = readContactWorkerPolicy({
    ...rawConfig,
    CONTACT_STAGING_FORM_ORIGIN: 'https://example.com/path',
  });
  assert.equal(malformedOrigin.formOrigin, '');
  assert.equal(evaluateContactWorkerRequest(malformedOrigin, request()).status, 503);
});

test('verified identity must be complete and exactly allowlisted', () => {
  const policy = readContactWorkerPolicy(rawConfig);
  assert.deepEqual(authorizeContactWorkerIdentity(policy, {}), {
    allowed: false, status: 401, code: 'contact_staging_identity_required',
  });
  assert.deepEqual(authorizeContactWorkerIdentity(policy, { userId: 'user-2', email: 'other@example.com' }), {
    allowed: false, status: 403, code: 'contact_staging_actor_not_allowed',
  });
  assert.deepEqual(authorizeContactWorkerIdentity(policy, { userId: ' user-1 ', email: 'Gabriel@Example.com' }), {
    allowed: true,
    actor: { userId: 'user-1', email: 'gabriel@example.com' },
  });
});

test('rate-limit keys are deterministic SHA-256 values that do not expose actor identity', async () => {
  const first = await createOpaqueRateLimitKey('user-1', '/api/contact-intake');
  const second = await createOpaqueRateLimitKey('user-1', '/api/contact-intake');
  const other = await createOpaqueRateLimitKey('user-2', '/api/contact-intake');
  assert.match(first, /^contact:[a-f0-9]{64}$/);
  assert.equal(first, second);
  assert.notEqual(first, other);
  assert.equal(first.includes('user-1'), false);
  await assert.rejects(() => createOpaqueRateLimitKey('', '/api/contact-intake'));
});
