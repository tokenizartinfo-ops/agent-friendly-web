import test from 'node:test';
import assert from 'node:assert/strict';
import {readPrivateQaFiniteInitialOwnerSource as read} from '../lib/mcp-qa-finite-initial-owner-source.mjs';
import {createFiniteOwnerRequestLease} from '../lib/mcp-qa-finite-owner-preparation.mjs';
import * as unavailable from '../lib/mcp-qa-finite-owner-source.mjs';
test('factual entry rejects caller metadata before touching native holders',async()=>{
 let calls=0;const ctx=new Proxy({},{get(){calls++;return null;}});
 const entry=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/finite/prepare'));
 try{
  for(const extra of [{url:'https://example.com'},{capsule:{}},{now:Date.now()},{leaseFactory:()=>{}},{sourceRevision:'a'.repeat(40)},{genericRPC:()=>{}}]){
   await assert.rejects(()=>read({ctx,env:{},parent:entry.lease,preconnectionId:null,...extra}));
  }
  assert.equal(calls,0);
 }finally{entry.finish();}
});
test('a clone of a genuine parent is not incoming request provenance',async()=>{
 let calls=0;const ctx=new Proxy({},{get(){calls++;return null;}}),entry=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/finite/prepare'));
 try{await assert.rejects(()=>read({ctx,env:{},parent:{...entry.lease},preconnectionId:null}));assert.equal(calls,0);}finally{entry.finish();}
});
test('original owner source and all three effect forwarding seams remain unavailable',()=>{
 assert.deepEqual(Object.keys(unavailable).sort(),['forwardPrivateQaFiniteOwnerAuthorization','forwardPrivateQaFiniteOwnerGrant','forwardPrivateQaFiniteOwnerNotice','readPrivateQaFiniteOwnerSource'].sort());
 for(const seam of Object.values(unavailable))assert.throws(()=>seam({}));
});
