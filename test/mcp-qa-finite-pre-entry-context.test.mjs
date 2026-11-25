import test from 'node:test';
import assert from 'node:assert/strict';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {createQaPreEntryCustodyContext,readQaPreEntryCustodyContext,renderQaPreEntryCustodyModule} from '../lib/mcp-qa-finite-pre-entry-context.mjs';

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
