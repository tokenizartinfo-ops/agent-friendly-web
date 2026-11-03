import test from 'node:test';import assert from 'node:assert/strict';
import {sealFiniteInitialCleanupRecord as seal,encodeFiniteInitialCleanupRecord as encode,decodeFiniteInitialCleanupRecord as decode} from '../lib/mcp-qa-finite-initial-cleanup-records.mjs';
const h='a'.repeat(64);
test('B2b recovery codecs are bounded exact own DATA with domain-separated hashes',()=>{
 const s=seal('State',{planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null}),raw=encode('State',s);
 assert.deepEqual(decode('State',raw),s);
 for(const v of [raw+' ',raw.replace(h,'b'.repeat(64)),JSON.stringify({...s,extra:true}),' '.repeat(65537)])assert.throws(()=>decode('State',v));
 assert.throws(()=>decode('ArmAck',raw));assert.throws(()=>seal('State',{planHash:h,deliveries:4,status:'pending',nextAt:100,previousHash:null}));
});
test('B2b recovery codec does not invoke accessors or accept prototypes/unknown fields',()=>{
 let reads=0;const v={planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null};Object.defineProperty(v,'extra',{enumerable:true,get(){reads++;return true;}});
 assert.throws(()=>seal('State',v));assert.equal(reads,0);assert.throws(()=>seal('State',Object.assign(Object.create({}),{planHash:h})));
 assert.throws(()=>seal('State',{planHash:h,deliveries:0,status:'pending',nextAt:100,previousHash:null,extra:true}));
});
