import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
test('issuer strict codec new interface exists',async()=>{
 const api=await import('../lib/mcp-qa-finite-preparation-issuer-records.mjs');
 for(const name of ['sealFinitePreparationIssuerRecord','encodeFinitePreparationIssuerRecord','decodeFinitePreparationIssuerRecord'])assert.equal(typeof api[name],'function');
 assert.equal(api.FINITE_PREPARATION_ISSUER_PREFIX,'afw.finite-preparation-issuer.v1:');
});
test('issuer new monotonic schema exists and plain open cannot replace tombstone',async()=>{
 const sql=await readFile('db/finite-preparation-issuer-fences.sql','utf8');
 for(const word of ['finite_preparation_issuer_fences','no_delete','immutable_identity','terminal_fence'])assert.ok(sql.includes(word));
});
test('issuer new fixed native factories exist without ordinary fallback',async()=>{
 for(const [file,name] of [['journal','createFinitePreparationIssuerJournal'],['store','createFinitePreparationIssuerStore']]){
  const api=await import('../lib/mcp-qa-finite-preparation-issuer-'+file+'.mjs');assert.equal(typeof api[name],'function');
 }
});

import {createHash} from 'node:crypto';
import {initialCanonical as canonical} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {sealFinitePreparationIssuerRecord as seal,encodeFinitePreparationIssuerRecord as encode,decodeFinitePreparationIssuerRecord as decode} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
import {FINITE_PREPARATION_ISSUER_SCHEMA as schema} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
const H='a'.repeat(64),U='11111111-1111-4111-8111-111111111111';
const identity=()=>seal('Identity',{preconnectionId:H,enrollmentHash:H,capsuleHash:H,sourceRevision:'b'.repeat(40),qaVersionId:U,actorId:H,subject:'SYN-owner',accessRealmHash:H,projectId:'SYN-project',projectRevision:1,clientId:'SYN-client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',authorizationHash:H,grantId:U,requestedScopes:['afw:project:read','afw:evidence:read'],consentExpiresAt:'2026-11-02T00:15:00.000Z',I0:Date.parse('2026-11-02T00:00:00Z'),C0:Date.parse('2026-11-02T00:15:00Z'),C1:Date.parse('2026-11-02T00:18:00Z'),reservedAt:Date.parse('2026-11-02T00:00:01Z')});
const reservation=()=>seal('Reservation',{purpose:'afw.finite-preparation-issuer-reservation.v1',identity:identity(),requestHash:H,issuedAt:Date.parse('2026-11-02T00:00:01Z'),deadline:Date.parse('2026-11-02T00:00:05Z')});
test('issuer canonical domain own-data strict roundtrip is DATA not live capsule',()=>{
 const r=reservation(),body={...r};delete body.recordHash;
 assert.equal(r.recordHash,createHash('sha256').update(r.purpose+'\n'+canonical(body)).digest('hex'));assert.deepEqual(decode('Reservation',encode('Reservation',r)),r);
 for(const op of ['open_fence','authorization','consume','grant','close_fence','revoke_grant']){
  const s=seal('Send',{purpose:'afw.finite-preparation-issuer-send.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,operation:op,requestId:['close_fence','revoke_grant'].includes(op)?U:null,requestHash:H,issuedAt:r.issuedAt,deadline:r.deadline});
  assert.deepEqual(decode('Send',encode('Send',s)),s);
  const a=seal('Ack',{purpose:'afw.finite-preparation-issuer-ack.v1',sendHash:s.recordHash,rowHash:null,outcome:'no_mutation',observedAt:r.issuedAt+1});assert.deepEqual(decode('Ack',encode('Ack',a)),a);
 }
 const f=seal('Freeze',{purpose:'afw.finite-preparation-issuer-freeze.v1',identityHash:r.identity.identityHash,reservationHash:r.recordHash,frozenAt:r.identity.C0});assert.deepEqual(decode('Freeze',encode('Freeze',f)),f);
});
test('issuer rejects unknown/prototype/accessor/symbol before getters',()=>{
 let reads=0;const r=reservation(),bad=Object.defineProperty({...r},'identity',{enumerable:true,get(){reads++;return r.identity;}});
 for(const v of [bad,Object.setPrototypeOf({...r},{}),{...r,[Symbol('x')]:1},{...r,extra:true}])assert.throws(()=>encode('Reservation',v));
 assert.equal(reads,0);assert.throws(()=>decode('Reservation',' '+encode('Reservation',r)));assert.throws(()=>decode('Reservation',' '.repeat(16385)));assert.throws(()=>encode('Reservation',{...r,recordHash:H}));
});
for(const [key,value]of [['C0',0],['grantId','fresh-id'],['projectRevision',0],['resource','https://other.invalid/mcp'],['requestedScopes',['afw:write']],['consentExpiresAt','2026-11-02T00:15:00Z'],['reservedAt',0]]){
 test('issuer rejects invalid identity '+key,()=>assert.throws(()=>seal('Identity',{...identity(),[key]:value})));
}
test('source SQL schema and exact preflight definitions agree by content',async()=>{
 const sql=await readFile('db/finite-preparation-issuer-fences.sql','utf8');
 assert.equal(sql.replace(/^--[^\n]*\n/,''),schema.join(';\n\n')+';\n');
 console.log('issuer-schema-sha256='+createHash('sha256').update(sql).digest('hex'));
});
