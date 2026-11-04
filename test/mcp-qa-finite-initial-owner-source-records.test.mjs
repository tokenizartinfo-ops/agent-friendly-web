import test from 'node:test';
import assert from 'node:assert/strict';
import {readPrivateQaFiniteInitialOwnerSource as read} from '../lib/mcp-qa-finite-initial-owner-source.mjs';
import * as unavailable from '../lib/mcp-qa-finite-owner-source.mjs';
test('factual entry rejects untrusted metadata and parent before actual reads',async()=>{
 let calls=0;const ctx={id:null,storage:{get(){calls++;throw Error('unexpected read');}}};
 for(const extra of [{url:'https://example.com'},{capsule:{}},{now:Date.now()},{leaseFactory:()=>{}},{sourceRevision:'a'.repeat(40)},{genericRPC:()=>{}}]){
  await assert.rejects(()=>read({ctx,env:{},parent:{signal:new AbortController().signal,assertCurrent(){}},preconnectionId:null,...extra}));
 }
 assert.equal(calls,0);
});
test('original owner source and all three effect forwarding seams remain unavailable',()=>{
 assert.deepEqual(Object.keys(unavailable).sort(),['forwardPrivateQaFiniteOwnerAuthorization','forwardPrivateQaFiniteOwnerGrant','forwardPrivateQaFiniteOwnerNotice','readPrivateQaFiniteOwnerSource'].sort());
 for(const seam of Object.values(unavailable))assert.throws(()=>seam({}));
});
