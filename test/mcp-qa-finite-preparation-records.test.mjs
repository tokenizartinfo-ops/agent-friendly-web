import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {encodeFinitePreparationRecord as encode,decodeFinitePreparationRecord as decode,hashFinitePreparationRecord as hash} from '../lib/mcp-qa-finite-preparation-records.mjs';
const H='a'.repeat(64),M='b'.repeat(40);
const ticket=()=>({purpose:'afw.finite-owner-ticket.v1',ticketHash:H,subjectHash:H,sourceRevision:M,projectRef:H,connectionRef:null,preconnectionId:H,action:'connection',createdAt:1,expiresAt:900000});
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:1)):x);
test('rejects_noncanonical_private_record_and_future_ack',()=>{
 const value=ticket(),raw=encode('Ticket',value);
 assert.equal(raw,canonical(value));assert.deepEqual(decode('Ticket',raw),value);assert.ok(Object.isFrozen(decode('Ticket',raw)));
 assert.equal(hash('Ticket',value),createHash('sha256').update(value.purpose+'\n'+raw).digest('hex'));
 for(const text of [JSON.stringify(value),' '+raw,raw.replace('"action":','"action":"finite","action":'),raw.replace('"createdAt":1','"createdAt":1.0')])assert.throws(()=>decode('Ticket',text));
 for(const bad of [{...value,jwt:'private'},{...value,cookie:'private'},{...value,credential:'private'},{...value,ticketHash:'A'.repeat(64)},{...value,sourceRevision:H},{...value,createdAt:-1},{...value,expiresAt:900002},{...value,action:'notices'},{...value,projectRef:'raw-id'},{...value,purpose:'other'}])assert.throws(()=>encode('Ticket',bad));
 const accessor={...value};Object.defineProperty(accessor,'ticketHash',{enumerable:true,get(){throw Error('must not invoke');}});assert.throws(()=>encode('Ticket',accessor));
 assert.throws(()=>encode('Ticket',Object.assign(Object.create(null),value)));
 const cycle={...value};cycle.cycle=cycle;assert.throws(()=>encode('Ticket',cycle));
 assert.throws(()=>decode('Ticket',' '.repeat(65537)));
 const ack={purpose:'afw.finite-policy-ack.v1',sendHash:H,resourceId:'11111111-1111-4111-8111-111111111111',acknowledgedAt:999999};
 // Codecs are timeless; actual future-vs-now/SEND checks belong to native journal.
 assert.deepEqual(decode('PolicyAck',encode('PolicyAck',ack)),ack);
});
test('records_do_not_touch_runtime',async()=>{
 let calls=0;const fetch=globalThis.fetch;globalThis.fetch=()=>{calls++;throw Error('unexpected runtime');};
 try{encode('Ticket',ticket());decode('Ticket',encode('Ticket',ticket()));hash('Ticket',ticket());assert.equal(calls,0);}finally{globalThis.fetch=fetch;}
 for(const path of ['lib/mcp-qa-finite-preparation-records.mjs','lib/mcp-qa-finite-preparation-store.mjs','lib/mcp-qa-finite-policy-journal.mjs']){
  const source=await readFile(path,'utf8');assert.doesNotMatch(source,/\bfetch\s*\(|\.create\s*\(|afw\.qa-finite-trial\.v1:head/);
 }
});
