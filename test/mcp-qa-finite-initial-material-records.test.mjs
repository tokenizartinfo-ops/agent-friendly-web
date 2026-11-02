import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {finiteData} from '../lib/mcp-finite-evidence.mjs';
let api;try{api=await import('../lib/mcp-qa-finite-initial-material-records.mjs');}catch{/* absent product RED */}
const canonical=v=>JSON.stringify(v,(_,x)=>x&&typeof x==='object'&&!Array.isArray(x)?Object.fromEntries(Object.entries(x).sort(([a],[b])=>a<b?-1:a>b?1:0)):x);
const task4=v=>createHash('sha256').update('afw.finite-original-context.v1\n'+canonical(finiteData(v))).digest('hex');
test('C2-A record codec required before private storage',()=>{assert.equal(typeof api?.encodeFiniteInitialMaterialRecord,'function');assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');});
test('actual Task4 sorted digest survives canonical projection roundtrip; finiteData32KiB remains narrower than material64KiB',()=>{
 assert.equal(typeof api?.validateFiniteInitialOriginalContext,'function');
 // Bounds exercise exactly the same prehash finiteData used by Task4. It is
 // not a made-up claim that Task4 uses insertion-order serialization.
 const raw={z:{b:2,a:1},a:'unchanged raw JSON {"z":1,"a":2}'},round=JSON.parse(canonical(raw));
 assert.equal(task4(raw),task4(round));
 const oversized={...raw,a:'x'.repeat(33000)};assert.ok(Buffer.byteLength(canonical(oversized))<65536);assert.throws(()=>finiteData(oversized));
 assert.throws(()=>api.validateFiniteInitialOriginalContext(oversized));
});
test('C2-A strict codec rejects scripts/getters/extra fields rather than admitting caller facts',()=>{
 assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');
 for(const bad of ['{}','{"purpose":"afw.finite-initial-material.v1","script":"private"}','null'])assert.throws(()=>api.decodeFiniteInitialMaterialRecord('InitialMaterial',bad));
 let invoked=false;assert.throws(()=>api.encodeFiniteInitialMaterialRecord('InitialClaim',{get purpose(){invoked=true;return 'no';}}));assert.equal(invoked,false);
});
