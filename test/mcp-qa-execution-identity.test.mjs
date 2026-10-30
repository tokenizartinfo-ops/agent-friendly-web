import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaExecutionPin} from '../lib/mcp-qa-execution-identity.mjs';
const VERSION='aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',OTHER='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',REVISION='c'.repeat(40);
const input=()=>({env:{AFW_QA_VERSION:{id:VERSION,tag:'synthetic',timestamp:'2026-10-30T00:00:00.000Z'}},expectedVersionId:VERSION,sourceRevision:REVISION,context:'workflow'});
for(const context of ['workflow','durable_object'])test('pure execution pin snapshots '+context+' without granting authority',()=>{
 const options={...input(),context},pin=createPrivateQaExecutionPin(options),snapshot=pin.snapshot();
 assert.equal(pin.assertCurrent(),undefined,'must not be usable as authorize returning true');
 assert.deepEqual(snapshot,{purpose:'afw.qa-execution-pin.v1',runtimeVersionId:VERSION,sourceRevision:REVISION,context,authorizesEffects:false,operationalReadiness:false});
 assert.equal(Object.getPrototypeOf(snapshot),Object.prototype);assert.ok(Object.isFrozen(snapshot));assert.ok(Object.isFrozen(pin));assert.deepEqual(pin.snapshot(),snapshot);
});
for(const value of [undefined,null,0,'','not-a-version',VERSION.toUpperCase()])test('expected UUID rejects '+String(value),()=>assert.throws(()=>createPrivateQaExecutionPin({...input(),expectedVersionId:value}),/Private QA execution pin unavailable/));
test('foreign runtime UUID is denied before a pin is returned',()=>{const o=input();o.env.AFW_QA_VERSION.id=OTHER;assert.throws(()=>createPrivateQaExecutionPin(o));});
test('missing or non-data metadata cannot be mistaken for native origin',()=>{
 for(const env of [{},{AFW_QA_VERSION:null},{AFW_QA_VERSION:[]},{AFW_QA_VERSION:{id:0}},{AFW_QA_VERSION:Object.create({id:VERSION})},Object.create({AFW_QA_VERSION:{id:VERSION}})])assert.throws(()=>createPrivateQaExecutionPin({...input(),env}));
});
for(const field of ['env','expectedVersionId','sourceRevision','context'])test('observed '+field+' drift closes the pin permanently',()=>{
 const o=input(),old=o[field],pin=createPrivateQaExecutionPin(o);o[field]=field==='env'?{AFW_QA_VERSION:{id:VERSION}}:field==='expectedVersionId'?OTHER:field==='sourceRevision'?'d'.repeat(40):'durable_object';
 assert.throws(()=>pin.assertCurrent());o[field]=old;assert.throws(()=>pin.snapshot());
});
test('metadata UUID drift remains closed after restoring the original UUID',()=>{
 const o=input(),pin=createPrivateQaExecutionPin(o);o.env.AFW_QA_VERSION.id=OTHER;assert.throws(()=>pin.snapshot());o.env.AFW_QA_VERSION.id=VERSION;assert.throws(()=>pin.assertCurrent());
});
test('replacement metadata with the same UUID still invalidates the captured binding',()=>{
 const o=input(),pin=createPrivateQaExecutionPin(o);o.env.AFW_QA_VERSION={id:VERSION};assert.throws(()=>pin.assertCurrent());
});
test('metadata getters are not invoked at construction or after capture',()=>{
 let calls=0;const o=input();Object.defineProperty(o.env.AFW_QA_VERSION,'id',{enumerable:true,get(){calls++;throw Error('SYNTHETIC_SECRET');}});assert.throws(()=>createPrivateQaExecutionPin(o));assert.equal(calls,0);
 const p=input(),pin=createPrivateQaExecutionPin(p);Object.defineProperty(p.env,'AFW_QA_VERSION',{get(){calls++;throw Error('SYNTHETIC_SECRET');}});assert.throws(()=>pin.snapshot(),/Private QA execution pin unavailable/);assert.equal(calls,0);
});
test('strict options reject accessor selectors, extra keys and invalid QA revision/context',()=>{
 for(const o of [{...input(),unexpected:true},{...input(),sourceRevision:'2a'},{...input(),context:'container'},Object.assign(Object.create(null),input())])assert.throws(()=>createPrivateQaExecutionPin(o));
 let calls=0;const o=input();Object.defineProperty(o,'context',{get(){calls++;return'workflow';}});assert.throws(()=>createPrivateQaExecutionPin(o));assert.equal(calls,0);
 const p=input(),pin=createPrivateQaExecutionPin(p);Object.defineProperty(p,'sourceRevision',{get(){calls++;return REVISION;}});assert.throws(()=>pin.assertCurrent());assert.equal(calls,0);
});
test('pin never reads capability bindings, credentials or ambient canary bundle',()=>{
 const o=input();let reads=0;for(const key of ['DB','AFW_QA_DB','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN'])Object.defineProperty(o.env,key,{get(){reads++;throw Error('SYNTHETIC_SECRET');}});
 const previous=globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__={artifact:{sourceRevision:'2'.repeat(40)}};
 try{const pin=createPrivateQaExecutionPin(o),snapshot=pin.snapshot();pin.assertCurrent();assert.equal(reads,0);assert.equal(snapshot.sourceRevision,REVISION);assert.equal(JSON.stringify(snapshot).includes('SYNTHETIC_SECRET'),false);assert.deepEqual(Object.keys(snapshot),['purpose','runtimeVersionId','sourceRevision','context','authorizesEffects','operationalReadiness']);}finally{if(previous===undefined)delete globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__;else globalThis.__AFW_RELEASE_OPERATOR_BUNDLE__=previous;}
});
