import {plain} from './fixtures/finite-first-connection-publication.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {ownerReferenceFixture,prepareOwnerReference,assertActualComplete,recordOwnerReference,downstreamOwnerReference,waitReferenceState} from './fixtures/finite-owner-cleanup.mjs';
test('R1 SDK reference is durable before redirect',{timeout:120000},async t=>{
 const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f),response=await prepared.issue();
 await recordOwnerReference(f,'principal-before-reference-assert',{status:response.status});
 const {observed,reference}=await assertActualComplete(f,{reference:true});
 assert.equal(response.status,302);assert.equal(observed.referenceCommits,1);assert.equal(observed.referenceSyncs,1);assert.equal(observed.referenceReadbacks,1);assert(observed.trace.indexOf('reference-transaction-native-settled')<observed.trace.indexOf('reference-sync-native-settled'));assert(observed.trace.indexOf('reference-sync-native-settled')<observed.trace.indexOf('reference-readback-native-settled'));assert(observed.trace.indexOf('reference-readback-native-settled')<observed.trace.indexOf('native-authorize-response:302'),'actual native QA302 follows exact reference readback');assert(observed.lookupChild.actualElapsedMs<5000);assert(observed.requests.every(r=>r.elapsedMs<30000&&r.budgetMs<=30000));
 const keys=await f.kv.list({prefix:'grant:'});assert.equal(keys.keys.length,1);const actual=await f.kv.get(keys.keys[0].name,'json');
 assert.deepEqual(actual.metadata,{afwFiniteCleanup:{purpose:'afw.finite-sdk-cleanup-correlation.v1',correlationHash:reference.correlationHash}});assert.equal(actual.id,reference.sdkGrantId);assert.equal(actual.createdAt,reference.createdAt);assert.equal(actual.expiresAt??null,reference.expiresAt);
 assert(observed.lists<=2&&observed.gets<=200&&observed.peak<=2);await downstreamOwnerReference(f,response,prepared);await recordOwnerReference(f,'principal-final',{tokenM:true,MCP:true,NoticeLink:true});
});

for(const [name,fault]of [
 ['R1 foreign SDK metadata cannot redirect','foreign-metadata'],
 ['R1 duplicate SDK correlation cannot redirect','duplicate'],
 ['R1 unknown reference commit cannot redirect or repeat SDK','unknown-reference']
])test(name,{timeout:120000},async t=>{
 const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,fault),response=await prepared.issue();assert.notEqual(response.status,302);await response.body?.cancel();const result=await assertActualComplete(f);
 if(fault==='unknown-reference')assert.equal(result.observed.referenceCommits,1,'native reference commit may exist after unknown sync ACK');
 else assert.equal(result.reference,null);
 const retried=await prepared.issue();assert.notEqual(retried.status,302);await retried.body?.cancel();assert.equal((await assertActualComplete(f)).observed.completeWrites,1,'no repeated SDK effect from ledger');
 await recordOwnerReference(f,fault,{status:response.status,retryRedirect:false});
});
test('R1 held SDK lookup retains original scope',{timeout:120000},async t=>{
 const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,'hold-lookup-ack'),pending=prepared.issue();await waitReferenceState(f,s=>s.held);
 assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'another genuine LIVE Root same ctx denied during actual outward SDK ACK hold');
 const response=await pending;assert.notEqual(response.status,302);await response.body?.cancel();
 assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'logical child expiry does not drain original ACK promise');
 await f.stub.ownerReferenceControl('released');await waitReferenceState(f,s=>s.actualSettled);await waitAvailability(f);
 const {observed,reference}=await assertActualComplete(f);assert.equal(reference,null);assert.equal(observed.lists,1);assert.equal(observed.gets,0,'expired facet cannot emit queued gets after late ACK');
 await recordOwnerReference(f,'held-lookup-ack',{postnativeAckHold:true,physicalKvPending:false,otherRootDenied:true,releasedByActualSettlement:true});
});
test('R1 aborted reference sync cannot return late redirect',{timeout:120000},async t=>{
 const f=await ownerReferenceFixture(t),prepared=await prepareOwnerReference(f,'abort-reference-sync-ack'),pending=prepared.issue();await waitReferenceState(f,s=>s.held);
 assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false);await f.stub.ownerReferenceControl('abort');
 const response=await pending;assert.notEqual(response.status,302);await response.body?.cancel();assert.equal((await plain(f.stub.firstConnectionAvailability())).available,false,'actual sync ACK still retained after genuine native request abort');
 await f.stub.ownerReferenceControl('released');await waitReferenceState(f,s=>s.actualSettled);await waitAvailability(f);
 const {observed}=await assertActualComplete(f);assert.equal(observed.referenceCommits,1);assert.equal(observed.referenceSyncs,1);const retry=await prepared.issue();assert.notEqual(retry.status,302);await retry.body?.cancel();assert.equal((await assertActualComplete(f)).observed.completeWrites,1);
 await recordOwnerReference(f,'aborted-reference-sync',{postnativeAckHold:true,physicalStoragePending:false,nativeRequestAborted:true,lateRedirect:false});
});
async function waitAvailability(f){const end=performance.now()+10000;while(!(await plain(f.stub.firstConnectionAvailability())).available){assert(performance.now()<end,'actual settlement must release original scope');await new Promise(resolve=>setTimeout(resolve,20));}}
