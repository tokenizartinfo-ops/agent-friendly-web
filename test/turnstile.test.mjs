import assert from 'node:assert/strict';
import test from 'node:test';

import { verifyTurnstileToken } from '../lib/turnstile.mjs';

test('Turnstile validation fails closed without server secret or client token', async () => {
  assert.equal((await verifyTurnstileToken({ token: 'x', secret: '', fetchImpl: async () => assert.fail() })).success, false);
  assert.equal((await verifyTurnstileToken({ token: '', secret: 'secret', fetchImpl: async () => assert.fail() })).success, false);
});

test('Turnstile validation sends idempotency and verifies action and hostname', async () => {
  let body;
  const result = await verifyTurnstileToken({
    token: 'token',
    secret: 'secret',
    idempotencyKey: '87ff81f1-e683-46ba-b0d1-99cb4354e1fa',
    action: 'request_plan',
    hostname: 'agentfriendlyweb.dev',
    fetchImpl: async (_url, init) => {
      body = init.body;
      return Response.json({ success: true, action: 'request_plan', hostname: 'agentfriendlyweb.dev' });
    },
  });
  assert.equal(result.success, true);
  assert.equal(body.get('response'), 'token');
  assert.equal(body.get('idempotency_key'), '87ff81f1-e683-46ba-b0d1-99cb4354e1fa');
});

test('Turnstile validation rejects mismatched action or hostname', async () => {
  const fetchImpl = async () => Response.json({ success: true, action: 'other', hostname: 'attacker.example' });
  const result = await verifyTurnstileToken({ token: 'token', secret: 'secret', action: 'request_plan', hostname: 'agentfriendlyweb.dev', fetchImpl });
  assert.equal(result.success, false);
  assert.equal(result.reason, 'action_mismatch');
});

