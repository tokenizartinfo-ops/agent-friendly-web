import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const helperPath = new URL('../lib/email-review-ready-probe.mjs', import.meta.url);
const routePath = new URL('../app/canary/email-review-ready/route.ts', import.meta.url);

test('probe builds one fixed, same-origin request without destination or message content', async () => {
  const { buildEmailReviewReadyProbeRequest } = await import(helperPath.href);
  const incoming = new Request('https://canary.agentfriendlyweb.dev/canary/email-review-ready', {
    method: 'POST',
    headers: {
      cookie: 'private-session=cannot-forward',
      'cf-access-jwt-assertion': 'signed-access-token',
    },
  });
  const request = buildEmailReviewReadyProbeRequest(incoming, {
    now: () => new Date('2026-09-02T15:04:05.000Z'),
    randomUUID: () => 'b9fab654-450d-4e8c-ab29-6c658c13064f',
  });

  assert.equal(request.method, 'POST');
  assert.equal(request.url, 'https://canary.agentfriendlyweb.dev/api/canary/email/review-ready');
  assert.equal(request.headers.get('origin'), 'https://canary.agentfriendlyweb.dev');
  assert.equal(request.headers.get('content-type'), 'application/json');
  assert.equal(request.headers.get('cf-access-jwt-assertion'), 'signed-access-token');
  assert.equal(request.headers.has('cookie'), false);

  const body = await request.json();
  assert.deepEqual(body, {
    contract: 'agent-friendly-web.email-review-ready.v1',
    eventId: 'afw-review-ready-20260902-b9fab654450d',
    idempotencyKey: 'b9fab654-450d-4e8c-ab29-6c658c13064f',
    templateId: 'internal-review-ready-v1',
    locale: 'es',
    purpose: 'internal_review_ready',
    humanApproved: true,
  });
  for (const forbidden of ['to', 'email', 'recipient', 'subject', 'body', 'text', 'html', 'attachments']) {
    assert.equal(forbidden in body, false);
  }
});

test('probe rejects invalid runtime-generated identifiers before calling the gate', async () => {
  const { buildEmailReviewReadyProbeRequest } = await import(helperPath.href);
  const incoming = new Request('https://canary.agentfriendlyweb.dev/canary/email-review-ready', {
    method: 'POST',
  });

  assert.throws(() => buildEmailReviewReadyProbeRequest(incoming, {
    randomUUID: () => 'not-a-uuid',
  }), /probe_generation_failed/);
});

test('negative diagnostic is permitted only while delivery is disabled', async () => {
  const { canRunNegativeEmailProbe } = await import(helperPath.href);

  assert.equal(canRunNegativeEmailProbe('false', 'negative'), true);
  assert.equal(canRunNegativeEmailProbe('true', 'negative'), false);
  assert.equal(canRunNegativeEmailProbe('false', 'send'), false);
  assert.equal(canRunNegativeEmailProbe(undefined, 'negative'), true);
});

test('protected probe page delegates to the fixed gate and exposes no arbitrary mail fields', () => {
  assert.equal(existsSync(routePath), true);
  const source = readFileSync(routePath, 'utf8');

  assert.match(source, /AFW_CANARY_DIAGNOSTICS_ENABLED/);
  assert.match(source, /verifyCloudflareAccessJwt/);
  assert.match(source, /buildEmailReviewReadyProbeRequest/);
  assert.match(source, /canRunNegativeEmailProbe/);
  assert.match(source, /emailReviewReadyHandler/);
  assert.match(source, /method="post"/i);
  assert.match(source, /probe=negative/);
  assert.match(source, /Cache-Control/);
  assert.doesNotMatch(source, /<input|<textarea|contenteditable/i);
  assert.doesNotMatch(source, /EMAIL_REVIEW_READY\.send|identity\.email|actor_subject_hash/i);
});
