import test from 'node:test';
import assert from 'node:assert/strict';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {createQaPreEntryCustodyContext,readQaPreEntryCustodyContext,renderQaPreEntryCustodyModule,validateQaPreEntryCustodyReceipt} from '../lib/mcp-qa-finite-pre-entry-context.mjs';

const window={sourceRevision:'b'.repeat(40),releaseZipSha256:'a'.repeat(64),startAt:1000,expiresAt:61000};

test('the custody ID commits the fixed R2-backed QA module, exact release ZIP and observation window',async()=>{
 const context=createQaPreEntryCustodyContext(window);
 assert.equal(context.releaseZipSha256,window.releaseZipSha256);
 assert.equal(context.baselineVersionId,QA_CLOUD_CLOSED_PINS.qaClosed.id);
 assert.equal(context.baselineModuleHash,QA_CLOUD_CLOSED_PINS.qaClosed.module.sha256);
 assert.match(context.id,/^[a-f0-9]{64}$/);
 assert.equal(Object.isFrozen(context),true);
 assert.deepEqual(readQaPreEntryCustodyContext(context),context);
 const compiled=await import('data:text/javascript,'+encodeURIComponent(renderQaPreEntryCustodyModule(context)));
 assert.deepEqual(compiled.custodyContext,context);
 assert.equal(Object.isFrozen(compiled.custodyContext),true);
 for(const input of [{...window,sourceRevision:'c'.repeat(40)},{...window,releaseZipSha256:'c'.repeat(64)},{...window,startAt:2000},{...window,expiresAt:62000}]){
  assert.notEqual(createQaPreEntryCustodyContext(input).id,context.id);
 }
});

test('custody preparation and reading reject tampered windows, fallback pins and extra authority',()=>{
 const context=createQaPreEntryCustodyContext(window);
 for(const input of [{...window,startAt:-1},{...window,expiresAt:601001},{...window,expiresAt:1000},
  {...window,releaseZipSha256:'wrong'}, {...window,releaseZipSha256:'a'.repeat(63)},
  {sourceRevision:window.sourceRevision,startAt:window.startAt,expiresAt:window.expiresAt},
  {...window,token:'synthetic'}, {...window,sourceRevision:'current'}]){
  assert.throws(()=>createQaPreEntryCustodyContext(input));
 }
 for(const candidate of [{...context,expiresAt:61001},{...context,releaseZipSha256:'f'.repeat(64)},{...context,baselineModuleHash:'c'.repeat(64)},
  {...context,baselineVersionId:'22222222-2222-4222-8222-222222222222'},
  {...context,id:'0'.repeat(64)},{...context,operationalReadiness:true}]){
  assert.throws(()=>readQaPreEntryCustodyContext(candidate));
 }
 let touched=false;
 assert.throws(()=>readQaPreEntryCustodyContext({...context,get id(){touched=true;return context.id;}}));
 assert.equal(touched,false);
});

const candidateVersionId='12345678-1234-4123-8123-123456789012';

function custodyReceipt(){
 const context=createQaPreEntryCustodyContext(window);
 const binding={context,qaVersionId:candidateVersionId,observedFrom:2000,readAt:4000};
 const active={status:'active',expiresAt:new Date(60000).toISOString(),notBefore:null};
 const output={purpose:'afw.qa-pre-entry-custody.v3',status:'observed',observationId:context.id,
  sourceRevision:context.sourceRevision,releaseZipSha256:context.releaseZipSha256,qaVersionId:candidateVersionId,
  observedAt:3000,reader:{...active},publisher:{...active},guardVerified:true,scopeVerified:false,
  authorizesEffects:false,operationalReadiness:false,mayRetry:false};
 return{binding,output};
}

test('accepts a bounded runtime receipt only for the exact QA candidate and archive',()=>{
 const {binding,output}=custodyReceipt();
 const actual=validateQaPreEntryCustodyReceipt({...binding,output:JSON.stringify(output)});
 assert.deepEqual(actual,output);
 assert.equal(Object.isFrozen(actual),true);
 assert.equal(Object.isFrozen(actual.reader),true);
 assert.equal(Object.isFrozen(actual.publisher),true);
});

test('rejects a foreign archive, older run, different deployment and promoted evidence',()=>{
 const {binding,output}=custodyReceipt();
 const foreign=createQaPreEntryCustodyContext({...window,releaseZipSha256:'c'.repeat(64)});
 const stale=[{...binding,context:foreign,output},{...binding,observedFrom:3001,output},
  {...binding,readAt:2999,output},{...binding,readAt:window.expiresAt,output},
  {...binding,qaVersionId:'99999999-9999-4999-8999-999999999999',output}];
 for(const candidate of stale)assert.throws(()=>validateQaPreEntryCustodyReceipt(candidate));
 for(const patch of [{releaseZipSha256:foreign.releaseZipSha256},{sourceRevision:'9'.repeat(40)},
  {authorizesEffects:true},{scopeVerified:true},{operationalReadiness:true},{mayRetry:true},{status:'blocked'},
  {publisher:{...output.publisher,notBefore:new Date(3001).toISOString()}},
  {reader:{...output.reader,expiresAt:new Date(binding.readAt).toISOString()}},
  {publisher:{...output.publisher,expiresAt:'1970-01-01T00:01:00Z'}},{token:'invalid'}]){
  assert.throws(()=>validateQaPreEntryCustodyReceipt({...binding,output:{...output,...patch}}));
 }
 assert.throws(()=>validateQaPreEntryCustodyReceipt({...binding,output:JSON.stringify(output)+' '.repeat(2048)}));
 let getterCalled=false;
 const poisoned={...output,get reader(){getterCalled=true;return output.reader;}};
 assert.throws(()=>validateQaPreEntryCustodyReceipt({...binding,output:poisoned}));
 assert.equal(getterCalled,false);
});

