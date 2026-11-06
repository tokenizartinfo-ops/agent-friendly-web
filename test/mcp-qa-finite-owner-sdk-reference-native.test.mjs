import test from 'node:test';
import assert from 'node:assert/strict';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference,downstreamOwnerReference} from './fixtures/finite-owner-cleanup.mjs';
test('R1 SDK reference is durable before redirect',{timeout:120000},async t=>{
 const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f),response=await prepared.issue();
 await recordOwnerReference(f,'principal-before-reference-assert',{status:response.status});
 const {observed,reference}=await assertActualComplete(f,{reference:true});
 assert.equal(response.status,302);assert.equal(observed.referenceCommits,1);assert.equal(observed.referenceSyncs,1);
 const keys=await f.kv.list({prefix:'grant:'});assert.equal(keys.keys.length,1);const actual=await f.kv.get(keys.keys[0].name,'json');
 assert.deepEqual(actual.metadata,{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:reference.correlationHash}});assert.equal(actual.id,reference.sdkGrantId);assert.equal(actual.createdAt,reference.createdAt);assert.equal(actual.expiresAt??null,reference.expiresAt);
 assert(observed.lists<=2&&observed.gets<=200&&observed.peak<=2);await downstreamOwnerReference(f,response,prepared);await recordOwnerReference(f,'principal-final',{tokenM:true,MCP:true,NoticeLink:true});
});
