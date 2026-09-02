import assert from 'node:assert/strict';
import test from 'node:test';

import { createContactWorker } from '../worker/contact/index.mjs';

const formOrigin = 'https://canary.agentfriendlyweb.dev';
const baseEnv = {
  CONTACT_STAGING_MODE: 'staging_allowlist',
  CONTACT_STAGING_WRITES_ENABLED: 'true',
  CONTACT_STAGING_API_HOST: 'contact-staging.agentfriendlyweb.dev',
  CONTACT_STAGING_FORM_ORIGIN: formOrigin,
  CONTACT_STAGING_WIDGET_HOST: 'canary.agentfriendlyweb.dev',
  CONTACT_STAGING_ALLOWED_EMAILS: 'owner@example.com',
  CONTACT_ACCESS_TEAM_DOMAIN: 'example.cloudflareaccess.com',
  CONTACT_ACCESS_AUD: 'contact-staging-audience',
  CONTACT_STAGING_TURNSTILE_SECRET: 'server-only-secret',
  DB: { prepare() {}, batch() {} },
  CONTACT_STAGING_RATE_LIMITER: { limit: async () => ({ success: true }) },
};

function request(options = {}) {
  return new Request(options.url || 'https://contact-staging.agentfriendlyweb.dev/api/contact-intake', {
    method: options.method || 'POST',
    headers: {
      origin: formOrigin,
      'content-type': 'application/json',
      'cf-access-jwt-assertion': 'signed-access-token',
      ...(options.headers || {}),
    },
    body: (options.method || 'POST') === 'POST' ? JSON.stringify(options.body || {}) : undefined,
  });
}

function dependencies(calls = []) {
  return {
    verifyAccessJwt: async () => {
      calls.push('jwt');
      return { ok: true, identity: { userId: 'owner-id', email: 'owner@example.com' } };
    },
    readJson: async () => {
      calls.push('body');
      return { ok: true, value: { email: 'owner@example.com' } };
    },
    processContact: async () => {
      calls.push('contact');
      return { status: 201, body: { accepted: true, leadId: 'lead-1', duplicate: false, emailQueued: false } };
    },
  };
}

test('contact Worker exposes a no-store health receipt without opening writes', async () => {
  const worker = createContactWorker();
  const response = await worker.fetch(
    new Request('https://contact-staging.agentfriendlyweb.dev/health'),
    { ...baseEnv, CONTACT_STAGING_WRITES_ENABLED: 'false' },
  );
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {
    service: 'agent-friendly-web-contact-staging-frontier',
    status: 'deployed',
    mode: 'staging_allowlist',
    writes: false,
  });
});

test('kill switch rejects before Access verification, limiter and body access', async () => {
  const calls = [];
  const env = {
    ...baseEnv,
    CONTACT_STAGING_WRITES_ENABLED: 'false',
    CONTACT_STAGING_RATE_LIMITER: { limit: async () => { calls.push('rate'); return { success: true }; } },
  };
  const worker = createContactWorker(dependencies(calls));
  const response = await worker.fetch(request(), env);
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'contact_staging_kill_switch_closed');
  assert.deepEqual(calls, []);
});

test('invalid or unallowlisted Access identity fails before limiter and body', async () => {
  for (const [verification, expectedStatus] of [
    [{ ok: false, code: 'contact_staging_identity_required' }, 401],
    [{ ok: true, identity: { userId: 'other', email: 'other@example.com' } }, 403],
  ]) {
    const calls = [];
    const worker = createContactWorker({
      ...dependencies(calls),
      verifyAccessJwt: async () => { calls.push('jwt'); return verification; },
    });
    const response = await worker.fetch(request(), {
      ...baseEnv,
      CONTACT_STAGING_RATE_LIMITER: { limit: async () => { calls.push('rate'); return { success: true }; } },
    });
    assert.equal(response.status, expectedStatus);
    assert.deepEqual(calls, ['jwt']);
  }
});

test('required D1, Turnstile and limiter bindings fail closed before quota or body', async () => {
  const calls = [];
  const worker = createContactWorker(dependencies(calls));
  const response = await worker.fetch(request(), { ...baseEnv, DB: undefined });
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'contact_staging_misconfigured');
  assert.deepEqual(calls, ['jwt']);
});

test('native rate limit is consumed with an opaque actor key before reading JSON', async () => {
  const calls = [];
  let observedKey = '';
  const worker = createContactWorker(dependencies(calls));
  const response = await worker.fetch(request(), {
    ...baseEnv,
    CONTACT_STAGING_RATE_LIMITER: {
      limit: async ({ key }) => {
        calls.push('rate');
        observedKey = key;
        return { success: false };
      },
    },
  });
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'contact_staging_rate_limited');
  assert.deepEqual(calls, ['jwt', 'rate']);
  assert.match(observedKey, /^contact:[a-f0-9]{64}$/);
  assert.equal(observedKey.includes('owner-id'), false);
});

test('successful request follows JWT, limiter, body and contact processing order', async () => {
  const calls = [];
  const worker = createContactWorker(dependencies(calls));
  const response = await worker.fetch(request(), {
    ...baseEnv,
    CONTACT_STAGING_RATE_LIMITER: {
      limit: async () => { calls.push('rate'); return { success: true }; },
    },
  });
  assert.equal(response.status, 201);
  assert.equal(response.headers.get('access-control-allow-origin'), formOrigin);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), {
    accepted: true, leadId: 'lead-1', duplicate: false, emailQueued: false,
  });
  assert.deepEqual(calls, ['jwt', 'rate', 'body', 'contact']);
});

test('default contact gate passes the exact widget hostname to Turnstile and never saves its token', async () => {
  const observed = {};
  const worker = createContactWorker({
    verifyAccessJwt: dependencies().verifyAccessJwt,
    readJson: async () => ({
      ok: true,
      value: {
        email: 'lead@example.com',
        name: 'Lead',
        domain: 'example.com',
        role: 'owner',
        organization: 'Example',
        locale: 'es',
        objective: 'receive_plan',
        source: 'direct',
        idempotencyKey: '6ba7b810-9dad-41d1-80b4-00c04fd430c8',
        requestedPlanConsent: true,
        commercialContactConsent: false,
        productUpdatesConsent: false,
        turnstileToken: 'single-use-browser-token',
      },
    }),
    verifyTurnstile: async (input) => {
      observed.turnstile = input;
      return { success: true };
    },
    saveContact: async (_database, normalized) => {
      observed.saved = normalized;
      return { leadId: 'lead-2', duplicate: false, conflict: false };
    },
  });
  const response = await worker.fetch(request(), baseEnv);
  assert.equal(response.status, 201);
  assert.equal(observed.turnstile.hostname, baseEnv.CONTACT_STAGING_WIDGET_HOST);
  assert.equal(observed.turnstile.action, 'request_plan');
  assert.equal(observed.turnstile.secret, baseEnv.CONTACT_STAGING_TURNSTILE_SECRET);
  assert.equal(JSON.stringify(observed.saved).includes('single-use-browser-token'), false);
});

test('preflight never verifies identity and unknown routes stay unavailable', async () => {
  const calls = [];
  const worker = createContactWorker(dependencies(calls));
  const preflight = await worker.fetch(request({
    method: 'OPTIONS',
    headers: {
      'access-control-request-method': 'POST',
      'access-control-request-headers': 'content-type',
    },
  }), baseEnv);
  assert.equal(preflight.status, 204);
  assert.deepEqual(calls, []);

  const missing = await worker.fetch(request({
    url: 'https://contact-staging.agentfriendlyweb.dev/private',
  }), baseEnv);
  assert.equal(missing.status, 404);
});

test('unexpected internal errors return only a stable sanitized response', async () => {
  const worker = createContactWorker({
    ...dependencies(),
    verifyAccessJwt: async () => { throw new Error('sensitive provider details'); },
  });
  const response = await worker.fetch(request(), baseEnv);
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), {
    accepted: false, code: 'contact_staging_misconfigured',
  });
});
