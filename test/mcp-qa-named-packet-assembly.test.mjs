import test from 'node:test';
import assert from 'node:assert/strict';
import {namedDataPacketFixture,packetHash} from './fixtures/qa-named-data-packet.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {restorationConfigurationHash} from '../lib/mcp-successor-canary-restorer.mjs';
const api=await import('../lib/mcp-qa-named-packet-assembly.mjs').catch(()=>({}));
const assemble=f=>{assert.equal(typeof api.assemblePrivateQaNamedPacket,'function','private fixed packet assembly required');return api.assemblePrivateQaNamedPacket(f.options());};
test('packet coherently joins two hash domains and preserves runtime artifact property order',()=>{
 const f=namedDataPacketFixture(),r=assemble(f);assert.equal(r.namedBundleHash,packetHash(JSON.stringify({artifact:f.artifact,policy:f.policy})));assert.equal(r.generationPlanHash,packetHash('afw.qa-generation-plan.v2\n'+f.expectedCapsule));assert.notEqual(r.namedBundleHash,r.generationPlanHash);assert.equal(r.packetHash,packetHash(JSON.stringify(f.packet)));assert.equal(JSON.stringify(r.bundle),JSON.stringify({artifact:f.artifact,policy:f.policy}));assert.deepEqual(Object.keys(r.bundle.artifact),Object.keys(f.artifact));assert.ok(Object.isFrozen(r.bundle.policy));for(const k of ['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);
});
test('restore cutoff differs from nominal start and hash domains are recomputed separately',()=>{
 const f=namedDataPacketFixture();assert.ok(f.closure.startAt>f.policy.startAt);assert.notEqual(activationConfigurationHash(f.policy.observation.configuration),restorationConfigurationHash(f.policy.observation.configuration));assert.equal(assemble(f).namedBundleHash,f.f.capsule.bundleHash);
});
for(const wrong of ['generation','bundle','closure','history'])test('packet rejects mismatched '+wrong+' commitment',()=>{
 const f=namedDataPacketFixture();if(wrong==='generation')f.packet.generationCapsule=f.packet.generationCapsule.replace('packet-fixture-grant','different');else{const field={bundle:'bundleHash',closure:'closurePolicyHash',history:'cancellationHistoryHash'}[wrong];f.f.capsule[field]='0'.repeat(64);f.expectedCapsule=JSON.stringify(f.f.capsule);f.packet.generationCapsule=f.expectedCapsule;}assert.throws(()=>assemble(f),{message:'Private QA named assembly unavailable'});
});
for(const wrong of ['receipt-source','receipt-bytes','receipt-hash','artifact-code','artifact-order','publish','grant','trial','foreign-live','foreign-deployment','foreign-restoration-config','early-restore','late-restore','container'])test('packet rejects '+wrong,()=>{
 const f=namedDataPacketFixture();
 if(wrong==='receipt-source')f.receipt.sourceRevision='0'.repeat(40);
 if(wrong==='receipt-bytes')f.receipt.workerBytes++;
 if(wrong==='receipt-hash')f.receipt.workerHash='0'.repeat(64);
 if(wrong==='artifact-code')f.artifact.script+=' ';
 if(wrong==='artifact-order')f.artifact=Object.fromEntries(Object.entries(f.artifact).reverse());
 if(wrong==='publish')f.policy.operation='publish';
 if(wrong==='grant')f.cancellationHistory.currentGrant.grantId='foreign';
 if(wrong==='trial')f.f.capsule.trialId='0'.repeat(64);
 if(wrong==='foreign-live')f.closure.live.versionId='99999999-9999-4999-8999-999999999999';
 if(wrong==='foreign-deployment')f.closure.live.deploymentId='99999999-9999-4999-8999-999999999999';
 if(wrong==='foreign-restoration-config')f.closure.live.configurationHash=f.policy.plan.configurationHash;
 if(wrong==='early-restore')f.closure.startAt=f.policy.startAt-1;
 if(wrong==='late-restore')f.closure.expiresAt=f.policy.expiresAt+1;
 if(wrong==='container')f.closure.candidate.containerId='f'.repeat(64);
 // Recommit the changed packet to test independent semantic relations, not just
 // stale raw hashes. Artifact/receipt changes deliberately keep old bundle hash.
 if(!wrong.startsWith('artifact-')&&!wrong.startsWith('receipt-')){f.f.capsule.bundleHash=packetHash(JSON.stringify({artifact:f.artifact,policy:f.policy}));f.f.capsule.closurePolicyHash=packetHash(JSON.stringify(f.closure));f.f.capsule.cancellationHistoryHash=packetHash(JSON.stringify(f.cancellationHistory));}
 f.expectedCapsule=JSON.stringify(f.f.capsule);Object.assign(f.packet,{generationCapsule:f.expectedCapsule,namedPolicy:JSON.stringify(f.policy),closurePolicy:JSON.stringify(f.closure),cancellationHistory:JSON.stringify(f.cancellationHistory)});
 assert.throws(()=>assemble(f),{message:'Private QA named assembly unavailable'});
});
test('an unknown actor binding blocks without get or other side effects',()=>{
 const f=namedDataPacketFixture();f.namespace.idFromName=()=>({toString:()=> 'f'.repeat(64)});assert.throws(()=>assemble(f),{message:'Private QA named assembly unavailable'});
});
test('packet rejects actual secret values even after hashes are recomputed',()=>{
 const f=namedDataPacketFixture();f.policy.observation.configuration.bindings.push({name:'AFW_FIXTURE_API_TOKEN',type:'plain_text',text:'synthetic-sensitive-value'});f.policy.plan.configurationHash=activationConfigurationHash(f.policy.observation.configuration);f.closure.live.configurationHash=restorationConfigurationHash(f.policy.observation.configuration);f.f.capsule.bundleHash=packetHash(JSON.stringify({artifact:f.artifact,policy:f.policy}));f.f.capsule.closurePolicyHash=packetHash(JSON.stringify(f.closure));f.expectedCapsule=JSON.stringify(f.f.capsule);Object.assign(f.packet,{generationCapsule:f.expectedCapsule,namedPolicy:JSON.stringify(f.policy),closurePolicy:JSON.stringify(f.closure)});assert.throws(()=>assemble(f),{message:'Private QA named assembly unavailable'});
});
test('combined UTF8 envelope and exact data grammar reject extras, script and oversize',()=>{
 const f=namedDataPacketFixture(),o=f.options();assert.throws(()=>api.assemblePrivateQaNamedPacket({...o,extra:true}),{message:'Private QA named assembly unavailable'});assert.throws(()=>api.assemblePrivateQaNamedPacket({...o,packetJson:JSON.stringify({...f.packet,script:'never'})}),{message:'Private QA named assembly unavailable'});assert.throws(()=>api.assemblePrivateQaNamedPacket({...o,packetJson:JSON.stringify({...f.packet,cancellationHistory:'é'.repeat(33000)})}),{message:'Private QA named assembly unavailable'});assert.throws(()=>api.assemblePrivateQaNamedPacket({...o,packetJson:o.packetJson+'\n'}),{message:'Private QA named assembly unavailable'});
});
