import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import test from 'node:test';

import { createEmailReviewReadyHandler } from '../lib/email-review-ready-gate.mjs';

const input = {
  contract: 'agent-friendly-web.email-review-ready.v1',
  eventId: 'afw-review-ready-20260902-0001',
  idempotencyKey: 'b9fab654-450d-4e8c-ab29-6c658c13064f',
  templateId: 'internal-review-ready-v1',
  locale: 'es',
  purpose: 'internal_review_ready',
  humanApproved: true,
};
const actorId = 'access-subject-001';
const actorHash = createHash('sha256').update(actorId).digest('hex');

function request(overrides = {}) {
  return new Request('https://canary.agentfriendlyweb.dev/api/canary/email/review-ready', {
    method: 'POST',
    headers: {
      origin: 'https://canary.agentfriendlyweb.dev',
      'content-type': 'application/json',
      'cf-access-jwt-assertion': 'signed-access-token',
    },
    body: JSON.stringify(input),
    ...overrides,
  });
}

function environment(overrides = {}) {
  return {
    AFW_EMAIL_REVIEW_READY_ENABLED: 'true',
    ACCESS_TEAM_DOMAIN: 'tokenizart.cloudflareaccess.com',
    ACCESS_AUD: 'a'.repeat(64),
    AFW_EMAIL_REVIEW_READY_ALLOWED_SUBJECT_HASHES: actorHash,
    AFW_EMAIL_REVIEW_READY_DESTINATION: 'review-destination@example.com',
    DB: { prepare() {} },
    EMAIL_REVIEW_READY: { async send() { return { messageId: 'provider-message-001' }; } },
    AFW_EMAIL_REVIEW_READY_RATE_LIMITER: { async limit() { return { success: true }; } },
    ...overrides,
  };
}

function dependencies(overrides = {}) {
  const calls = [];
  return {
    calls,
    overrides: {
      verifyAccessJwt: async () => ({ ok: true, identity: { userId: actorId, email: 'operator@example.com' } }),
      readJson: async () => ({ ok: true, value: input }),
      reserve: async () => ({
        reservationId: '00000000-0000-4000-8000-000000000601',
        state: 'reserved',
        duplicate: false,
        conflict: false,
      }),
      markSent: async () => ({ updated: true }),
      markFailed: async () => ({ updated: true }),
      ...overrides,
    },
  };
}

test('kill switch fails closed before identity, body, storage or email', async () => {
  let called = false;
  const handler = createEmailReviewReadyHandler({
    verifyAccessJwt: async () => { called = true; },
    readJson: async () => { called = true; },
    reserve: async () => { called = true; },
  });
  const response = await handler(request(), environment({ AFW_EMAIL_REVIEW_READY_ENABLED: 'false' }));

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_unavailable' });
  assert.equal(called, false);
});

test('requires exact canary boundary and authenticated allowlisted Access subject', async () => {
  const wrongOrigin = dependencies();
  const wrongOriginResponse = await createEmailReviewReadyHandler(wrongOrigin.overrides)(
    request({ headers: { origin: 'https://agentfriendlyweb.dev' } }),
    environment(),
  );
  assert.equal(wrongOriginResponse.status, 403);

  const rejected = dependencies({ verifyAccessJwt: async () => ({ ok: false, code: 'invalid_token' }) });
  const rejectedResponse = await createEmailReviewReadyHandler(rejected.overrides)(request(), environment());
  assert.equal(rejectedResponse.status, 403);
  assert.deepEqual(await rejectedResponse.json(), { sent: false, code: 'email_review_ready_identity_rejected' });

  const foreign = dependencies({
    verifyAccessJwt: async () => ({ ok: true, identity: { userId: 'other-subject', email: 'other@example.com' } }),
  });
  const foreignResponse = await createEmailReviewReadyHandler(foreign.overrides)(request(), environment());
  assert.equal(foreignResponse.status, 403);
  assert.deepEqual(await foreignResponse.json(), { sent: false, code: 'email_review_ready_actor_not_allowed' });
});

test('does not reveal missing runtime bindings before Access identity is verified', async () => {
  const handler = createEmailReviewReadyHandler({
    verifyAccessJwt: async () => ({ ok: false, code: 'invalid_token' }),
  });
  const response = await handler(request(), environment({
    DB: undefined,
    EMAIL_REVIEW_READY: undefined,
    AFW_EMAIL_REVIEW_READY_RATE_LIMITER: undefined,
  }));

  assert.equal(response.status, 403);
  assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_identity_rejected' });
});

test('rate limits an authenticated operator before reading or reserving', async () => {
  let bodyRead = false;
  let reserved = false;
  const handler = createEmailReviewReadyHandler({
    verifyAccessJwt: async () => ({ ok: true, identity: { userId: actorId } }),
    readJson: async () => { bodyRead = true; },
    reserve: async () => { reserved = true; },
  });
  const response = await handler(request(), environment({
    AFW_EMAIL_REVIEW_READY_RATE_LIMITER: { async limit({ key }) {
      assert.equal(key, `email-review-ready:${actorHash}`);
      return { success: false };
    } },
  }));

  assert.equal(response.status, 429);
  assert.equal(bodyRead, false);
  assert.equal(reserved, false);
});

test('sends one fixed-template message after reservation and records its receipt', async () => {
  const sentMessages = [];
  const marks = [];
  const deps = dependencies({
    markSent: async (...args) => { marks.push(args); return { updated: true }; },
  });
  const env = environment({
    EMAIL_REVIEW_READY: { async send(message) {
      sentMessages.push(message);
      return { messageId: 'provider-message-001' };
    } },
  });
  const response = await createEmailReviewReadyHandler(deps.overrides)(request(), env);

  assert.equal(response.status, 201);
  assert.deepEqual(await response.json(), {
    sent: true,
    duplicate: false,
    eventId: input.eventId,
    templateId: input.templateId,
  });
  assert.equal(sentMessages.length, 1);
  assert.deepEqual(sentMessages[0], {
    to: 'review-destination@example.com',
    from: 'hello@agentfriendlyweb.dev',
    replyTo: 'hello@agentfriendlyweb.dev',
    subject: 'Agent Friendly Web: solicitud lista para revision',
    text: 'Hay una solicitud de Agent Friendly Web lista para revision humana. Referencia: afw-review-ready-20260902-0001.',
  });
  assert.equal('to' in sentMessages[0], true);
  assert.equal(sentMessages[0].to, 'review-destination@example.com');
  assert.equal(marks.length, 1);
  assert.equal(marks[0][1], '00000000-0000-4000-8000-000000000601');
  assert.equal(marks[0][2], 'provider-message-001');
});

test('returns an idempotent receipt without sending a second message', async () => {
  let sends = 0;
  const deps = dependencies({
    reserve: async () => ({ reservationId: 'existing', state: 'sent', duplicate: true, conflict: false }),
  });
  const response = await createEmailReviewReadyHandler(deps.overrides)(request(), environment({
    EMAIL_REVIEW_READY: { async send() { sends += 1; } },
  }));

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    sent: true,
    duplicate: true,
    eventId: input.eventId,
    templateId: input.templateId,
  });
  assert.equal(sends, 0);
});

test('blocks conflicting, reserved and failed replays without sending', async () => {
  const cases = [
    [{ reservationId: 'existing', state: 'sent', duplicate: false, conflict: true }, 409, 'email_review_ready_idempotency_conflict'],
    [{ reservationId: 'existing', state: 'reserved', duplicate: true, conflict: false }, 409, 'email_review_ready_delivery_pending'],
    [{ reservationId: 'existing', state: 'failed', duplicate: true, conflict: false }, 409, 'email_review_ready_delivery_failed_no_retry'],
  ];

  for (const [reservation, status, code] of cases) {
    let sends = 0;
    const deps = dependencies({ reserve: async () => reservation });
    const response = await createEmailReviewReadyHandler(deps.overrides)(request(), environment({
      EMAIL_REVIEW_READY: { async send() { sends += 1; } },
    }));
    assert.equal(response.status, status);
    assert.deepEqual(await response.json(), { sent: false, code });
    assert.equal(sends, 0);
  }
});

test('provider failure records one stable code and performs no retry', async () => {
  let sends = 0;
  const failures = [];
  const deps = dependencies({
    markFailed: async (...args) => { failures.push(args); return { updated: true }; },
  });
  const response = await createEmailReviewReadyHandler(deps.overrides)(request(), environment({
    EMAIL_REVIEW_READY: { async send() {
      sends += 1;
      throw new Error('private upstream details');
    } },
  }));

  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_delivery_failed' });
  assert.equal(sends, 1);
  assert.equal(failures.length, 1);
  assert.equal(failures[0][2], 'provider_delivery_failed');
});

test('provider failure classifies allowlisted Cloudflare codes without storing raw details', async () => {
  const cases = [
    ['E_FIELD_MISSING', 'provider_field_missing'],
    ['E_SENDER_NOT_VERIFIED', 'provider_sender_not_verified'],
    ['E_RECIPIENT_NOT_ALLOWED', 'provider_recipient_not_allowed'],
    ['E_RATE_LIMIT_EXCEEDED', 'provider_rate_limited'],
    ['E_INTERNAL_SERVER_ERROR', 'provider_internal_error'],
    ['PRIVATE_UNEXPECTED_CODE', 'provider_delivery_failed'],
  ];

  for (const [providerCode, expectedCode] of cases) {
    const failures = [];
    const deps = dependencies({
      markFailed: async (...args) => { failures.push(args); return { updated: true }; },
    });
    const error = new Error('private upstream details must not be persisted');
    error.code = providerCode;
    const response = await createEmailReviewReadyHandler(deps.overrides)(request(), environment({
      EMAIL_REVIEW_READY: { async send() { throw error; } },
    }));

    assert.equal(response.status, 502);
    assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_delivery_failed' });
    assert.equal(failures.length, 1);
    assert.equal(failures[0][2], expectedCode);
    assert.ok(!failures[0].includes(error.message));
  }
});

test('missing runtime binding fails closed without reading the body', async () => {
  let bodyRead = false;
  const handler = createEmailReviewReadyHandler({
    verifyAccessJwt: async () => ({ ok: true, identity: { userId: actorId } }),
    readJson: async () => { bodyRead = true; },
  });
  const response = await handler(request(), environment({ EMAIL_REVIEW_READY: undefined }));

  assert.equal(response.status, 503);
  assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_misconfigured' });
  assert.equal(bodyRead, false);
});

test('missing or malformed private destination fails closed before rate limit, body read or reservation', async () => {
  for (const destination of [
    undefined,
    'not-an-email',
    'review@example.com,',
    'review@example..com',
  ]) {
    let rateLimited = false;
    let bodyRead = false;
    let reserved = false;
    const handler = createEmailReviewReadyHandler({
      verifyAccessJwt: async () => ({ ok: true, identity: { userId: actorId } }),
      readJson: async () => { bodyRead = true; },
      reserve: async () => { reserved = true; },
    });
    const response = await handler(request(), environment({
      AFW_EMAIL_REVIEW_READY_DESTINATION: destination,
      AFW_EMAIL_REVIEW_READY_RATE_LIMITER: {
        async limit() {
          rateLimited = true;
          return { success: true };
        },
      },
    }));

    assert.equal(response.status, 503);
    assert.deepEqual(await response.json(), { sent: false, code: 'email_review_ready_misconfigured' });
    assert.equal(rateLimited, false);
    assert.equal(bodyRead, false);
    assert.equal(reserved, false);
  }
});
