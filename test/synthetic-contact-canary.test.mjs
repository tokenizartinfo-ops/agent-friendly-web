import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';

import { hashAccessSubject } from '../lib/access-subject-hash.mjs';
import {
  createSyntheticContactCanaryHandler,
  SYNTHETIC_CONTACT_CANARY_CONTRACT,
  validateSyntheticContactCanaryRequest,
} from '../lib/synthetic-contact-canary.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const endpoint = 'https://canary.agentfriendlyweb.dev/api/canary/contact-intake';
const actorId = 'cf-access-subject-afw-canary';
const idempotencyKey = 'e82cd532-86a5-4ce0-a888-83e164085fc3';
const exactBody = {
  contract: 'agent-friendly-web.synthetic-contact-canary.v1',
  idempotencyKey,
  action: 'create_synthetic_contact_and_prepare_review',
  humanApproved: true,
  turnstileToken: 'XXXX.DUMMY.TOKEN.XXXX',
};

function request(overrides = {}) {
  return new Request(overrides.url || endpoint, {
    method: overrides.method || 'POST',
    headers: {
      origin: 'https://canary.agentfriendlyweb.dev',
      'content-type': 'application/json',
      'cf-access-jwt-assertion': 'signed-access-assertion',
      ...(overrides.headers || {}),
    },
    body: overrides.method === 'GET' ? undefined : JSON.stringify(overrides.body || exactBody),
  });
}

async function baseEnv(overrides = {}) {
  return {
    AFW_SYNTHETIC_CONTACT_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'tokenizart.cloudflareaccess.com',
    ACCESS_AUD: 'canary-audience',
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: await hashAccessSubject(actorId),
    AFW_SYNTHETIC_CONTACT_TURNSTILE_SECRET: 'turnstile-canary-test-secret',
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: {
      async limit() { return { success: true }; },
    },
    DB: {
      prepare() {},
      batch() {},
    },
    ...overrides,
  };
}

function successOverrides(observations = {}) {
  return {
    async verifyAccessJwt() {
      return { ok: true, identity: { userId: actorId, email: 'operator@example.invalid' } };
    },
    async verifyTurnstile(input) {
      observations.turnstile = input;
      return { success: true, hostname: 'canary.agentfriendlyweb.dev', action: 'afw_synthetic_contact' };
    },
    async saveContact(_database, intake) {
      observations.intake = intake;
      return { leadId: '38e17927-bc9d-4cab-ac56-12d2bf5d0349', duplicate: false, conflict: false };
    },
    async prepareReview(_database, trigger) {
      observations.trigger = trigger;
      return {
        ok: true,
        status: 'prepared_not_sent',
        capabilities: { sendsEmail: false, persistsData: false, retriesAutomatically: false },
      };
    },
  };
}

test('accepts only the exact synthetic request contract', () => {
  assert.equal(SYNTHETIC_CONTACT_CANARY_CONTRACT, exactBody.contract);
  assert.deepEqual(validateSyntheticContactCanaryRequest(exactBody), {
    ok: true,
    value: exactBody,
  });

  for (const extra of [
    { email: 'person@example.com' },
    { domain: 'example.com' },
    { organization: 'Real company' },
    { message: 'Free text' },
    { recipient: 'operator@example.com' },
    { subject: 'Custom subject' },
    { password: 'do-not-accept' },
    { arbitrary: true },
  ]) {
    assert.deepEqual(
      validateSyntheticContactCanaryRequest({ ...exactBody, ...extra }),
      { ok: false, code: 'invalid_synthetic_contact_request' },
    );
  }
});

test('fails closed before identity work when the synthetic gate is disabled', async () => {
  let verified = false;
  const handler = createSyntheticContactCanaryHandler({
    async verifyAccessJwt() {
      verified = true;
      return { ok: true, identity: { userId: actorId, email: 'operator@example.invalid' } };
    },
  });
  const response = await handler(request(), await baseEnv({ AFW_SYNTHETIC_CONTACT_ENABLED: 'false' }));

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { accepted: false, code: 'synthetic_contact_unavailable' });
  assert.equal(verified, false);
});

test('requires the exact canary HTTPS boundary and origin', async () => {
  const handler = createSyntheticContactCanaryHandler(successOverrides());
  const cases = [
    request({ url: 'https://agentfriendlyweb.dev/api/canary/contact-intake' }),
    request({ url: 'https://canary.agentfriendlyweb.dev/api/canary/contact-intake?retry=1' }),
    request({ url: 'http://canary.agentfriendlyweb.dev/api/canary/contact-intake' }),
    request({ url: 'https://canary.agentfriendlyweb.dev/api/contact-intake' }),
    request({ headers: { origin: 'https://agentfriendlyweb.dev' } }),
    request({ method: 'GET' }),
  ];

  for (const candidate of cases) {
    const response = await handler(candidate, await baseEnv());
    assert.equal(response.status, 403);
    assert.equal((await response.json()).code, 'synthetic_contact_boundary_rejected');
  }
});

test('requires a verified and explicitly allowlisted Access subject', async () => {
  const rejected = createSyntheticContactCanaryHandler({
    async verifyAccessJwt() { return { ok: false }; },
  });
  let response = await rejected(request(), await baseEnv());
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_contact_identity_rejected');

  const verified = createSyntheticContactCanaryHandler(successOverrides());
  response = await verified(request(), await baseEnv({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: 'f'.repeat(64),
  }));
  assert.equal(response.status, 403);
  assert.equal((await response.json()).code, 'synthetic_contact_actor_not_allowed');

  response = await verified(request(), await baseEnv({
    AFW_SYNTHETIC_CONTACT_ALLOWED_SUBJECT_HASHES: '',
  }));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'synthetic_contact_misconfigured');
});

test('requires isolated runtime bindings and consumes a subject-scoped rate limit', async () => {
  const handler = createSyntheticContactCanaryHandler(successOverrides());
  let response = await handler(request(), await baseEnv({ DB: undefined }));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).code, 'synthetic_contact_misconfigured');

  let observedKey = '';
  response = await handler(request(), await baseEnv({
    AFW_SYNTHETIC_CONTACT_RATE_LIMITER: {
      async limit({ key }) {
        observedKey = key;
        return { success: false };
      },
    },
  }));
  assert.equal(response.status, 429);
  assert.equal((await response.json()).code, 'synthetic_contact_rate_limited');
  assert.match(observedKey, /^synthetic-contact:[0-9a-f]{64}$/);
  assert.doesNotMatch(observedKey, /cf-access-subject/);
});

test('derives a fixed non-sensitive contact and prepares but never sends its review notice', async () => {
  const observations = {};
  const handler = createSyntheticContactCanaryHandler(successOverrides(observations));
  const response = await handler(request(), await baseEnv());

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    accepted: true,
    synthetic: true,
    duplicate: false,
    referenceId: '38e17927-bc9d-4cab-ac56-12d2bf5d0349',
    persistedState: 'new',
    consentPurposes: ['requested_plan'],
    reviewNotification: {
      prepared: true,
      status: 'prepared_not_sent',
      emailSent: false,
    },
  });
  assert.deepEqual(observations.intake, {
    email: 'synthetic-canary@example.invalid',
    name: '',
    domain: 'example.invalid',
    role: 'owner',
    organization: 'Agent Friendly Web Synthetic Canary',
    locale: 'es',
    objective: 'receive_plan',
    source: 'direct',
    idempotencyKey,
    requestedPlanConsent: true,
    commercialContactConsent: false,
    productUpdatesConsent: false,
    consentPurposes: ['requested_plan'],
    copyVersion: 'agent-friendly-web.contact-intake.v1',
  });
  assert.equal(observations.turnstile.token, exactBody.turnstileToken);
  assert.equal(observations.turnstile.secret, 'turnstile-canary-test-secret');
  assert.equal(observations.turnstile.idempotencyKey, idempotencyKey);
  assert.equal(observations.turnstile.action, 'afw_synthetic_contact');
  assert.equal(observations.turnstile.hostname, 'canary.agentfriendlyweb.dev');
  assert.deepEqual(observations.trigger, {
    contract: 'agent-friendly-web.internal-review-ready-trigger.v1',
    requestId: '38e17927-bc9d-4cab-ac56-12d2bf5d0349',
    action: 'notify_internal_operator',
    humanApproved: true,
  });
});

test('returns a duplicate receipt without creating a second logical request', async () => {
  const handler = createSyntheticContactCanaryHandler({
    ...successOverrides(),
    async saveContact() {
      return { leadId: '38e17927-bc9d-4cab-ac56-12d2bf5d0349', duplicate: true, conflict: false };
    },
  });
  const response = await handler(request(), await baseEnv());
  assert.equal(response.status, 200);
  assert.equal((await response.json()).duplicate, true);
});

test('sanitizes invalid input, Turnstile failures and review preparation failures', async () => {
  let handler = createSyntheticContactCanaryHandler(successOverrides());
  let response = await handler(request({ body: { ...exactBody, humanApproved: false } }), await baseEnv());
  assert.equal(response.status, 400);
  assert.equal((await response.json()).code, 'invalid_synthetic_contact_request');

  handler = createSyntheticContactCanaryHandler({
    ...successOverrides(),
    async verifyTurnstile() { return { success: false, reason: 'private provider detail' }; },
  });
  response = await handler(request(), await baseEnv());
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), { accepted: false, code: 'turnstile_failed' });

  handler = createSyntheticContactCanaryHandler({
    ...successOverrides(),
    async prepareReview() { return { ok: false, code: 'private_review_ready_store_unavailable' }; },
  });
  response = await handler(request(), await baseEnv());
  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { accepted: false, code: 'synthetic_contact_review_prepare_failed' });
});

test('the canary integration cannot import or invoke the email delivery handler', () => {
  const source = fs.readFileSync(path.join(root, 'lib', 'synthetic-contact-canary.mjs'), 'utf8');
  assert.doesNotMatch(source, /email-review-ready-gate|EMAIL_REVIEW_READY|\.send\s*\(/);
});
