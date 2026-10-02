import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { operationsDb } from './fixtures/operations-db.mjs';
import { prepareMail, approveMail } from '../lib/mail-outbox.mjs';
import { mailContentHash, consumeApprovedMail } from '../lib/mail-consumer.mjs';

const message = () => ({ to: 'owner@example.com', subject: 'AFW test', text: 'Synthetic test' });
async function setup() {
  const { db, sqlite } = operationsDb();
  sqlite.exec(readFileSync(new URL('../worker/mail/schema.sql', import.meta.url), 'utf8'));
  const content = message(), hash = await mailContentHash(content);
  await prepareMail(db, { key: 'reply-1', sourceRef: 'source-1', contentHash: hash }, 100);
  await approveMail(db, 'reply-1', hash, 'decision-1', 101);
  return { db, content };
}
function deps(db, content, overrides = {}) {
  return { db, key: 'reply-1', loadMessage: async () => content,
    authorize: async () => true, email: { send: async () => ({ messageId: '<synthetic@example.com>' }) },
    saveReceipt: async () => 'receipt-1', now: () => 102, ...overrides };
}
test('approved consumer pins sender and records one accepted attempt', async () => {
  const { db, content } = await setup(); const sent = [];
  const options = deps(db, content, { email: { send: async value => { sent.push(value); return { messageId: '<synthetic@example.com>' }; } } });
  const results = await Promise.all([consumeApprovedMail(options), consumeApprovedMail(options)]);
  assert.equal(sent.length, 1);
  assert.equal(sent[0].from, 'hello@agentfriendlyweb.dev');
  assert.equal(results.filter(r => r.state === 'accepted').length, 1);
});
test('altered content or revoked authorization produces no provider call', async () => {
  for (const change of ['content', 'auth']) {
    const { db, content } = await setup(); let sends = 0;
    const result = await consumeApprovedMail(deps(db, change === 'content' ? { ...content, text: 'changed' } : content, {
      authorize: async () => change !== 'auth', email: { send: async () => { sends++; } },
    }));
    assert.equal(sends, 0); assert.equal(result.state, 'blocked');
  }
});
test('provider timeout or receipt storage failure becomes uncertain and cannot resend', async () => {
  for (const fault of ['send', 'receipt']) {
    const { db, content } = await setup(); let sends = 0;
    const options = deps(db, content, {
      email: { send: async () => { sends++; if (fault === 'send') throw new Error('sensitive provider error'); return { messageId: '<synthetic@example.com>' }; } },
      saveReceipt: async () => { throw new Error('private storage error'); },
    });
    assert.deepEqual(await consumeApprovedMail(options), { state: 'uncertain' });
    await consumeApprovedMail(options); assert.equal(sends, 1);
  }
});
test('content contract rejects extra headers, attachments and invalid recipient before claim', async () => {
  for (const content of [{ ...message(), from: 'other@example.com' }, { ...message(), to: 'bad\n@example.com' }, { ...message(), attachments: [] }]) {
    await assert.rejects(mailContentHash(content), /invalid/);
  }
});
test('provider that never responds times out without releasing the send for retry', async () => {
  const { db, content } = await setup(); let sends = 0, resolveSend;
  const options = deps(db, content, { timeoutMs: 10, email: { send: () => {
    sends++; return new Promise(resolve => { resolveSend = resolve; });
  } } });
  assert.deepEqual(await consumeApprovedMail(options), { state: 'uncertain' });
  await consumeApprovedMail(options); assert.equal(sends, 1);
  resolveSend({ messageId: '<late@example.com>' });
});
