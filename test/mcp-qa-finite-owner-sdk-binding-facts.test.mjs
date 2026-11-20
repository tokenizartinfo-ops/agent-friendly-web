import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
let api;try{api=await import('../lib/mcp-qa-finite-owner-sdk-binding-facts.mjs');}catch{/* missing helper is causal RED */}
const alias='AFW_FINITE_OWNER_OAUTH_KV',id='6b94ff702e504e14a7730cee73a0f6ff';
const canonical=v=>Array.isArray(v)?'['+v.map(canonical).join(',')+']':v&&typeof v==='object'?'{'+Object.keys(v).sort().map(k=>JSON.stringify(k)+':'+canonical(v[k])).join(',')+'}':JSON.stringify(v);
function metadata(){
 const qaMetadata=structuredClone(finitePublicProfileTemplate('qaLive'));
 const mMetadata=structuredClone(finitePublicProfileTemplate('canaryLive'));
 mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text='false';
 return {qaMetadata,mMetadata};
}
test('D0.1 strict DATA maps exact QA alias to original M KV under closed/read M preparation',()=>{
 assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
 for(const flag of ['false','true']){
  const v=metadata();v.mMetadata.bindings.find(b=>b.name==='AFW_DELEGATED_OAUTH_ENABLED').text=flag;
  const f=api.qualifyFiniteOwnerSdkBindingFacts(v);
  assert.deepEqual(f,{alias,namespaceId:id,bindingHash:createHash('sha256').update('afw.finite-owner-sdk-binding.v1\n'+canonical({alias,namespaceId:id})).digest('hex')});
  assert(Object.isFrozen(f));assert.equal(Object.keys(f).length,3);
 }
});
test('D0.1 wrong roles, namespace drift, extra alias, fake profile and hostile DATA deny',()=>{
 assert.equal(typeof api?.qualifyFiniteOwnerSdkBindingFacts,'function');
 const good=metadata();
 const denied=[
  {...good,qaMetadata:good.mMetadata,mMetadata:good.qaMetadata},
  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.filter(b=>b.name!==alias)}},
  {...good,qaMetadata:{...good.qaMetadata,bindings:good.qaMetadata.bindings.map(b=>b.name===alias?{...b,namespace_id:'0'.repeat(32)}:b)}},
  {...good,mMetadata:{...good.mMetadata,bindings:good.mMetadata.bindings.map(b=>b.name==='OAUTH_KV'?{...b,namespace_id:'0'.repeat(32)}:b)}},
  {...good,qaMetadata:{...good.qaMetadata,bindings:[...good.qaMetadata.bindings,{name:'EXTRA_OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
  {...good,mMetadata:{...good.mMetadata,bindings:[...good.mMetadata.bindings,{name:'OAUTH_KV',type:'kv_namespace',namespace_id:id}]}},
  {...good,qaMetadata:{...good.qaMetadata,compatibility_date:'2026-09-08'}},
  {...good,qaMetadata:Object.assign(Object.create({}),good.qaMetadata)},
  {...good,qaMetadata:{...good.qaMetadata,[Symbol('extra')]:true}},
 ];
 for(const v of denied)assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(v));
 let reads=0;const hostile=metadata();Object.defineProperty(hostile.qaMetadata.bindings[0],'name',{enumerable:true,get(){reads++;return alias;}});
 assert.throws(()=>api.qualifyFiniteOwnerSdkBindingFacts(hostile));assert.equal(reads,0);
});
