import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {materializePrivateQaLegacyPredecessor} from '../lib/mcp-qa-legacy-predecessor.mjs';
import {namedDataPacketFixture} from './fixtures/qa-named-data-packet.mjs';
const hash=x=>createHash('sha256').update(x).digest('hex');
function fixture(){
 const f=namedDataPacketFixture(),policy=f.policy,closure=f.closure,closureJson=JSON.stringify(closure),closurePolicyHash=hash(closureJson),at=policy.expiresAt+600000;
 const withdrawalPolicyHash='8'.repeat(64),dispatchAt=Math.floor(closure.startAt/60000)*60000,dispatch={purpose:'afw.private-prepared-dispatch.v1',eventId:'9'.repeat(64),dispatchAt,expiresAt:Math.min(dispatchAt+15000,closure.startAt),closurePolicyHash,withdrawalPolicyHash};
 const control={purpose:'afw.canary-restoration-control.v1',planHash:closurePolicyHash,policy:closureJson,armedAt:policy.startAt-1000,withdrawnAt:policy.expiresAt+1000};
 const namedPolicyJson=JSON.stringify(policy),dispatchPolicyJson=JSON.stringify(dispatch),event=JSON.parse(policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY').text);
 const journals={restoration:undefined,retirement:undefined,preparedDispatch:{purpose:'afw.private-prepared-dispatch.v1',planHash:closurePolicyHash,withdrawalHash:withdrawalPolicyHash,phase:'issued',issuedAt:dispatchAt+1,completedAt:null,dispatchPolicyHash:hash(dispatchPolicyJson)},reductionDispatch:{purpose:'afw.private-reduction-dispatch.v1',planHash:closurePolicyHash,withdrawalHash:withdrawalPolicyHash,phase:'complete',issuedAt:closure.startAt+1,completedAt:closure.startAt+2}};
 const historicalContext={purpose:'afw.qa-legacy-historical-context.v1',controlHash:hash(JSON.stringify(control)),closurePolicyHash,namedPolicyHash:hash(namedPolicyJson),namedBundleHash:hash(JSON.stringify({artifact:f.artifact,policy})),dispatchPolicyHash:hash(dispatchPolicyJson),withdrawalPolicyHash,trialIdHash:hash(policy.plan.trialId),grantIdHash:hash(event.grantId),eventIdHash:hash(dispatch.eventId),journalHashes:{restoration:null,retirement:null,preparedDispatch:hash(JSON.stringify(journals.preparedDispatch)),reductionDispatch:hash(JSON.stringify(journals.reductionDispatch))},artifactSourceRevision:f.artifact.sourceRevision,artifactSourceTree:f.artifact.sourceTree,artifactProgramHash:f.artifact.programHash,artifactWorkerHash:f.artifact.workerHash,evidence:{qaVersionId:'11111111-1111-4111-8111-111111111111',operatorVersionId:'22222222-2222-4222-8222-222222222222',operatorModuleHash:'a'.repeat(64),operatorModuleBytes:1000}};
 return {f,policy,closure,control,journals,event,historicalContext,options:{artifact:f.artifact,historicalContext,control,journals,namedPolicyJson,dispatchPolicyJson,at}};
}
test('materializes actual literal legacy predecessor privately, with retained uncertainty and no D1 or authority claim',()=>{
 const f=fixture(),before=JSON.stringify(f.options),r=materializePrivateQaLegacyPredecessor(f.options);
 assert.equal(r.purpose,'afw.qa-legacy-predecessor-material.v1');assert.deepEqual(r.predecessor,{kind:'legacy',control:JSON.stringify(f.control),trialId:f.policy.plan.trialId,grantId:f.event.grantId,eventId:JSON.parse(f.options.dispatchPolicyJson).eventId});
 assert.equal(r.historicalScope.grantId,f.event.grantId);for(const k of ['subject','projectId','clientId','resource'])assert.equal(r.historicalScope[k],f.event[k]);
 assert.equal(r.historicalDeclarationsVerified,true);assert.equal(r.journalBodiesVerified,true);assert.equal(r.retainedUncertainty,true);
 for(const k of ['d1IdentityCorrelationVerified','authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'])assert.equal(r[k],false);
 assert.equal(JSON.stringify(f.options),before);assert.equal(Object.isFrozen(r.predecessor),true);assert.equal(Object.hasOwn(r,'artifact'),false);
});
for(const mode of ['null_control','unwithdrawn','unarmed','future_expiry','control_hash','named_policy','bundle_domain','trial_hash','grant_hash','event_hash','dispatch_hash','withdrawal_link','journal_drift','stored_null','extra_field','getter'])test('rejects private historical material '+mode,()=>{
 const f=fixture(),o=f.options,h=f.historicalContext;
 if(mode==='null_control')o.control=null;
 if(mode==='unwithdrawn')o.control.withdrawnAt=null;
 if(mode==='unarmed')o.control.armedAt=null;
 if(mode==='future_expiry')o.at=f.closure.expiresAt-1;
 if(mode==='control_hash')h.controlHash='f'.repeat(64);
 if(mode==='named_policy')o.namedPolicyJson=o.namedPolicyJson+' ';
 if(mode==='bundle_domain')h.namedBundleHash=h.namedPolicyHash;
 if(mode==='trial_hash')h.trialIdHash='f'.repeat(64);
 if(mode==='grant_hash')h.grantIdHash='f'.repeat(64);
 if(mode==='event_hash')h.eventIdHash='f'.repeat(64);
 if(mode==='dispatch_hash')h.dispatchPolicyHash='f'.repeat(64);
 if(mode==='withdrawal_link')h.withdrawalPolicyHash='f'.repeat(64);
 if(mode==='journal_drift')o.journals.preparedDispatch.phase='complete';
 if(mode==='stored_null')o.journals.restoration=null;
 if(mode==='extra_field')o.attacker=true;
 if(mode==='getter')Object.defineProperty(o.control,'armedAt',{enumerable:true,get(){throw Error('PRIVATE-NO-ERROR-OUTPUT');}});
 assert.throws(()=>materializePrivateQaLegacyPredecessor(o),/Private historical QA material unavailable/);
});
for(const mode of ['bad_issued_time','bad_complete_time','unknown_fields','issued_has_ack','wrong_hash_link','wrong_purpose','late_dispatch_issue','late_dispatch_ack'])test('fully parses retained journals despite a matching outer fingerprint '+mode,()=>{
 const f=fixture(),o=f.options,r=o.journals.preparedDispatch,z=o.journals.reductionDispatch;
 if(mode==='bad_issued_time')r.issuedAt=JSON.parse(o.dispatchPolicyJson).dispatchAt-1;
 if(mode==='bad_complete_time')z.completedAt=f.closure.expiresAt;
 if(mode==='unknown_fields')r.extra='PRIVATE-NO-OUTPUT';
 if(mode==='issued_has_ack')r.completedAt=r.issuedAt+1;
 if(mode==='wrong_hash_link')r.planHash='f'.repeat(64);
 if(mode==='wrong_purpose')z.purpose='unrelated';
 if(mode==='late_dispatch_issue')r.issuedAt=JSON.parse(o.dispatchPolicyJson).expiresAt;
 if(mode==='late_dispatch_ack'){r.phase='complete';r.completedAt=JSON.parse(o.dispatchPolicyJson).expiresAt;}
 f.historicalContext.journalHashes.preparedDispatch=hash(JSON.stringify(r));f.historicalContext.journalHashes.reductionDispatch=hash(JSON.stringify(z));
 assert.throws(()=>materializePrivateQaLegacyPredecessor(o),/Private historical QA material unavailable/);
});
test('preserves literal policy and record property order',()=>{
 const f=fixture(),o=f.options;const p=JSON.parse(o.control.policy);o.control.policy=JSON.stringify(Object.fromEntries(Object.entries(p).reverse()));o.control.planHash=hash(o.control.policy);const d=JSON.parse(o.dispatchPolicyJson);d.closurePolicyHash=o.control.planHash;o.dispatchPolicyJson=JSON.stringify(d);o.journals.preparedDispatch.planHash=o.control.planHash;o.journals.preparedDispatch.dispatchPolicyHash=hash(o.dispatchPolicyJson);o.journals.reductionDispatch.planHash=o.control.planHash;
 const h=o.historicalContext;h.closurePolicyHash=o.control.planHash;h.controlHash=hash(JSON.stringify(o.control));h.dispatchPolicyHash=hash(o.dispatchPolicyJson);h.journalHashes.preparedDispatch=hash(JSON.stringify(o.journals.preparedDispatch));h.journalHashes.reductionDispatch=hash(JSON.stringify(o.journals.reductionDispatch));
 assert.equal(materializePrivateQaLegacyPredecessor(o).predecessor.control,JSON.stringify(o.control));
});
