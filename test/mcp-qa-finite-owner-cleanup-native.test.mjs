import {monitoringCleanupScenario} from './fixtures/finite-owner-cleanup.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {recoverCheckpoint,observeOriginalAlarm,writeCleanupEvidence,principalName} from './fixtures/finite-owner-cleanup-persistence.mjs';
const P='afw.finite-initial-cleanup.v1:';
test(principalName,async t=>{
 const f=await recoverCheckpoint(process.env.AFW_R2_CHECKPOINT??'output/owner-cleanup/checkpoint-g0');
 t.after(()=>f.mf.dispose());
 const before=f.checkpoint,issuer=before.facts.rows.find(([key])=>key.startsWith('afw.finite-preparation-issuer.v1:')&&key.endsWith(':reservation'));
 assert(issuer,'genuine producer issuer reservation prerequisite');
 assert(before.facts.rows.some(([key])=>key.endsWith(':reference')),'historical SDK Reference prerequisite');
 assert(before.facts.rows.some(([key])=>key.startsWith('connection-preparation:')&&key.endsWith(':notice')),'actual NoticeLink prerequisite');
 const connected=before.state.providerRegistry.pointer;assert.equal(connected.versions.length,1);assert.equal(connected.versions[0].percentage,100);
 assert(before.state.providerRegistry.versions[connected.versions[0].version_id],'actual SYN registry original current version');
 const facts=await observeOriginalAlarm(f),state=JSON.parse(facts.rows.find(([k])=>k===P+'state')[1]);
 const result={purpose:'afw.owner-cleanup-original-alarm.syn.v1',source:process.env.GITHUB_SHA,I0:f.plan.I0,C0:f.plan.C0,C1:f.plan.C1,recovery:f.recovery,signal:facts.signal,nativeDbNow:facts.dbNow,wall:facts.wall,state,alarm:facts.alarm,originalPlanHash:f.plan.recordHash,originalIssuerReservationHash:JSON.parse(issuer[1]).recordHash,sdkReferencePresent:true,noticeLinkPresent:true,restores:f.restores.length,pointer:f.providerRegistry.pointer,ownCleanupSuffixes:facts.rows.filter(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')).map(([k])=>k.split(':').slice(2).join(':')),operationalReadiness:false,completePackage:false,PCoff:false,custodyReal:false,modeledProviderInput:before.modeledProviderInput};
 await writeCleanupEvidence('principal',result);console.info('R2 original native C0 evidence',JSON.stringify(result));
 assert(facts.dbNow>=f.plan.C0,'actual D1 native clock reached original C0');
 assert.equal(state.status,'complete','R2 original C0 issuer/later-state owner cleanup must complete');
 assert.equal(facts.alarm,null);assert.equal(f.restores.length,1);
 assert.equal(f.providerRegistry.pointer.versions[0].version_id,f.plan.baselineVersionId);
 const row=facts.rows.find(([k])=>k.startsWith('afw.finite-owner-cleanup.v1:')&&k.endsWith(':receipt'));assert(row,'original cleanup receipt');
 const receipt=JSON.parse(row[1]);assert.equal(receipt.businessAccessClosed,true);assert.equal(receipt.sdkReductionReturned,true);assert.equal(receipt.globalNativeDrainVerified,false);assert.equal(receipt.sdkNamespaceEmptyVerified,false);
});

test('R2 native monitoring revoke binds original consent and preserves unrelated rows',async t=>{
 const r=await monitoringCleanupScenario(t,'normal');assert.equal(r.rejected,false);assert.equal(r.result.status,'applied');assert.equal(r.after.length,3);assert.deepEqual(r.after.slice(0,2),r.before);assert.equal(r.result.row.grant_id,r.before[1].grant_id);assert.equal(r.result.row.action,'revoke');assert.equal(r.result.row.issued_at,r.result.row.expires_at);assert(r.result.row.issued_at>=r.at);assert.equal(r.noUpdate,true);assert.equal(r.noDelete,true);
 const reads=r.events.filter(e=>e.sql?.includes('SELECT v.*'));assert(reads.length>=2);for(const e of reads)assert.equal(r.events.find(x=>x.sid===e.sid),e,'fresh first-primary SELECT');
});
test('R2 native monitoring revoke preserves prior withdrawal',async t=>{
 const r=await monitoringCleanupScenario(t,'prior');assert.equal(r.rejected,false);assert.equal(r.result.status,'already_withdrawn');assert.deepEqual(r.after,r.before);assert.deepEqual(r.result.row,r.before.at(-1));assert.equal(r.writes,0);
});
test('R2 native monitoring revoke rejects foreign revision and sequence',async t=>{
 for(const mode of ['revision','sequence']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
});
test('R2 native monitoring revoke enforces native C1 and child window',async t=>{
 for(const mode of ['C1','window']){const r=await monitoringCleanupScenario(t,mode);assert(r.rejected||r.result?.status==='no_mutation');assert.deepEqual(r.after,r.before);assert.equal(r.observed,null);}
});
test('R2 native monitoring revoke unknown acknowledgement cannot become observed',async t=>{
 const r=await monitoringCleanupScenario(t,'unknown');assert.equal(r.rejected,true);assert.equal(r.result,null);assert.equal(r.after.length,r.before.length+1,'actual native append survived lost response');assert(r.send);assert.equal(r.observed,null);assert.equal(r.retryDenied,true);assert.equal(r.writes,1);
});
