import test from 'node:test';
import assert from 'node:assert/strict';
import {createHmac} from 'node:crypto';
const load = () => import('../lib/mcp-signed-envelope.mjs');
// Synthetic all-zero test keys only; never a runtime credential.
const secret = 'whsec_' + Buffer.alloc(32).toString('base64');
const challenge = 'A'.repeat(43);
const signedAt = 1791720000123;
const signal = () => ({version:'afw-dossier-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:2,kind:'project_updated',observedAt:'2026-10-10T12:00:00.000Z'});

test('verification HMAC matches independent Python vector and uses exact bytes', async () => {
  const {signMcpVerification} = await load();
  const message = signMcpVerification(challenge, 'msg_1', 'sub_1', secret, signedAt);
  assert.equal(message.body, '{"type":"verification","challenge":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"}');
  assert.deepEqual(message.headers, {'Content-Type':'application/json','webhook-id':'msg_1','webhook-timestamp':'1791720000','webhook-signature':'v1,8eA7vYOvZuc4MF9vGHemnR/An1hgiGJ0prvQNx2EBVo=','X-MCP-Subscription-Id':'sub_1'});
  assert.equal(JSON.stringify(message).includes(secret), false);
});

test('signed dossier preserves original event and detects altered body bytes', async () => {
  const {signDossierMcpEvent} = await load(), s = signal();
  const message = signDossierMcpEvent(s, s.projectRef, 'sub_1', secret, signedAt);
  assert.deepEqual(JSON.parse(message.body), {eventId:'a'.repeat(64),name:'afw.dossier.changed',timestamp:'2026-10-10T12:00:00.000Z',data:{projectRef:'b'.repeat(64),revision:2,kind:'project_updated'},cursor:null});
  const expected = createHmac('sha256', Buffer.alloc(32)).update(`${'a'.repeat(64)}.1791720000.${message.body}`).digest('base64');
  assert.equal(message.headers['webhook-signature'], `v1,${expected}`);
  const changed = createHmac('sha256', Buffer.alloc(32)).update(`${'a'.repeat(64)}.1791720000.${message.body} `).digest('base64');
  assert.notEqual(message.headers['webhook-signature'], `v1,${changed}`);
  s.revision = 3;
  assert.equal(JSON.parse(message.body).data.revision, 2);
  assert.throws(() => { message.body = 'changed'; }, TypeError);
  assert.throws(() => { message.headers['webhook-id'] = 'changed'; }, TypeError);
  assert.throws(() => signDossierMcpEvent(s, 'c'.repeat(64), 'sub_1', secret, signedAt));
  assert.throws(() => signDossierMcpEvent({...s, text:'private'}, s.projectRef, 'sub_1', secret, signedAt));
});

test('secrets require canonical standard base64 and decoded 24–64 byte bounds', async () => {
  const {signMcpVerification} = await load();
  for (const size of [24, 32, 64]) assert.doesNotThrow(() => signMcpVerification(challenge, 'msg_1', 'sub_1', 'whsec_'+Buffer.alloc(size).toString('base64'), signedAt));
  for (const key of ['', secret.slice(6), secret+'\n', secret.replace(/=$/, ''), 'whsec_!!!!', 'whsec_'+Buffer.alloc(23).toString('base64'), 'whsec_'+Buffer.alloc(65).toString('base64'), secret.replace(/A=$/, 'B=')]) {
    assert.throws(() => signMcpVerification(challenge, 'msg_1', 'sub_1', key, signedAt), /^Error: Invalid MCP signed message$/);
  }
});

test('header ids challenge and signing time reject unsafe values without coercion', async () => {
  const {signMcpVerification} = await load();
  for (const id of ['', 'x\r\ny', 'x.y', 'x'.repeat(129), null]) assert.throws(() => signMcpVerification(challenge, id, 'sub_1', secret, signedAt));
  for (const id of ['', '\n', 42]) assert.throws(() => signMcpVerification(challenge, 'msg_1', id, secret, signedAt));
  for (const time of [NaN, Infinity, -1, 1.5, Number.MAX_SAFE_INTEGER+1, '1791720000123']) assert.throws(() => signMcpVerification(challenge, 'msg_1', 'sub_1', secret, time));
  for (const c of ['A'.repeat(42), 'A'.repeat(44), 'A'.repeat(42)+'B', challenge+'=', 'x\n']) assert.throws(() => signMcpVerification(c, 'msg_1', 'sub_1', secret, signedAt));
  let calls = 0;
  const object = {[Symbol.toPrimitive]() {calls++; return 'sub_1';}};
  for (const index of [0,1,2,3,4]) {
    const args = [challenge, 'msg_1', 'sub_1', secret, signedAt]; args[index] = object;
    assert.throws(() => signMcpVerification(...args));
  }
  assert.equal(calls, 0);
});

test('challenge reply requires exact bounded body and HTTP success', async () => {
  const {matchesMcpVerificationReply} = await load();
  const reply = `{"challenge":"${challenge}"}`;
  assert.equal(matchesMcpVerificationReply(challenge, 200, reply), true);
  assert.equal(matchesMcpVerificationReply(challenge, 299, ` \n{ "challenge" : "${challenge}" }\t`), true);
  for (const status of [199,300,302,410,200.5,'200']) assert.equal(matchesMcpVerificationReply(challenge,status,reply),false);
  for (const body of ['', '{}', `{"challenge":"${'B'.repeat(43)}"}`, `{"challenge":"${challenge}","extra":1}`, `{"challenge":"wrong","challenge":"${challenge}"}`, `[{"challenge":"${challenge}"}]`, ' '.repeat(1024)+reply, null]) assert.equal(matchesMcpVerificationReply(challenge,200,body),false);
  assert.equal(matchesMcpVerificationReply(challenge+'=',200,reply),false);
});
