import test from 'node:test';
import assert from 'node:assert/strict';
import worker from '../worker/mail/index.mjs';
test('mail worker is unavailable by default and does not expose an open sender',async()=>{
  for(const path of ['/review/reply-1','/approve','/consume/reply-1','/send']) {
    const response=await worker.fetch(new Request('https://mail-ops.agentfriendlyweb.dev'+path),{});
    assert.equal(response.status,404);
  }
  assert.equal(Object.hasOwn(worker,'scheduled'),false);
});
