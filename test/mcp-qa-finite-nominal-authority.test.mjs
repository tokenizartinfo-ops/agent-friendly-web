import test from 'node:test';
import assert from 'node:assert/strict';
import * as controls from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture,ROOT,hash,digest} from './fixtures/qa-finite-trial.mjs';
import {finiteArmedGuardState,finiteChildConfirmationBindingHash,hashFiniteLaunchRecord,validateFiniteLaunchPrepared,validateFiniteChildCreateSend} from '../lib/mcp-qa-finite-launch-records.mjs';

const api=await import('../lib/mcp-qa-finite-nominal-authority.mjs').catch(error=>{
 if(error.code!=='ERR_MODULE_NOT_FOUND'||!error.message.includes('mcp-qa-finite-nominal-authority.mjs'))throw error;return {};
});
async function setup(configure=()=>{}){
 const f=finiteFixture(),p=f.plan;configure(p);const opts=f.options(controls);
 const t=controls.createPrivateQaFiniteTrialControl(opts);
 assert.equal((await t.prepare()).status,'armed');
 const {controlHash,planHash,claim}=await t.claimEffect('nominal');
 const guard=finiteArmedGuardState(controlHash,p.C0),prefix='afw.qa-finite-child-create.v1:'+p.intentId+':';
 f.rows.set('afw.qa-finite-guard.v1:'+p.intentId+':state',guard);
 const scope={intentId:p.intentId,finitePlanHash:planHash,controlHash,sourceRevision:p.source.revision,
  qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,
  bundleHash:p.bundleHash,nominalClaimHash:digest(ROOT+':effect',claim)};
 const prepared=validateFiniteLaunchPrepared({purpose:'afw.qa-finite-launch-prepared.v1',...scope,guardStateHash:hash(JSON.stringify(guard)),preparedAt:f.now(),...p.launchPolicy});
 const send=validateFiniteChildCreateSend({purpose:'afw.qa-finite-child-create-send.v1',...scope,preparedHash:hashFiniteLaunchRecord(prepared),bindingHash:finiteChildConfirmationBindingHash(p),
  issuedAt:p.launchPolicy.launchAt,deadline:p.launchPolicy.lastCreateAt});
 const ack={purpose:'afw.qa-finite-child-create-ack.v1',intentId:p.intentId,controlHash,sendHash:hashFiniteLaunchRecord(send),nominalId:p.workflows.confirmation,acknowledgedAt:p.launchPolicy.launchAt+1};
 f.rows.set(prefix+'prepared',prepared);f.rows.set(prefix+'send',send);f.setNow(p.launchPolicy.launchAt+2);
 const refs={intentId:p.intentId,controlHash};
 const read=(operation,selected=refs)=>api.readPrivateQaFiniteCanaryNominalContext({ctx:f.ctx,env:f.env,compiledRevision:p.source.revision,
  refs:{...selected,operation},now:f.now});
 return {f,p,prefix,ack,refs,read,t};
}
test('candidate receives exactly the acknowledged child context and cannot create from a SEND alone',async()=>{
 assert.equal(typeof api.readPrivateQaFiniteCanaryNominalContext,'function');
 const {f,p,prefix,ack,refs,read}=await setup(),before=f.puts;
 await assert.rejects(read('reserve'));f.rows.set(prefix+'ack',ack);
 const context=await read('reserve');
 assert.equal(context.control.controlHash,refs.controlHash);assert.equal(context.control.plan.intentId,p.intentId);
 assert.equal(context.expiresAt,p.C0);
 assert.equal(context.ackHash,hashFiniteLaunchRecord(ack));
 await assert.rejects(read('reserve',{...refs,controlHash:'0'.repeat(64)}));
 assert.equal(f.puts,before);
});
test('native candidate cannot begin or read nominal work after withdrawal; only its exact existing settlement window remains',async()=>{
 assert.equal(typeof api.readPrivateQaFiniteCanaryNominalContext,'function');
 const {f,p,prefix,ack,read,t}=await setup();f.rows.set(prefix+'ack',ack);
 f.setNow(p.C0+1);assert.equal((await t.withdrawNominal()).status,'withdrawn');
 await assert.rejects(read('reserve'));await assert.rejects(read('journal'));
 assert.equal((await read('settle')).expiresAt,p.C1);
 f.setNow(p.C1);await assert.rejects(read('settle'));
});

test('candidate journal records one reservation under the acknowledged QA child only',async()=>{
 const {finiteCleanupPolicyHash}=await import('../lib/mcp-finite-cleanup-policy.mjs');
 const {runFiniteOwnNominalReservation}=await import('../lib/mcp-own-finite-nominal-reservation.mjs');
 const program='synthetic nominal candidate';
 const {f,p,prefix,ack,refs,read}=await setup(plan=>{
  plan.canaryContainment.sourceRevision=plan.selectors.sourceRevision;
  plan.selectors.programHash=hash(program);plan.closePolicyHash=finiteCleanupPolicyHash(plan);
 });
 const candidate=finiteFixture(),s=p.selectors,own={toString:()=>p.resources.containerId},qa={toString:()=>p.resources.actorId};
 const ctx={id:own,storage:candidate.storage};
 const db={prepare(){throw Error('writer claim must not mutate D1');},withSession(){throw Error('writer claim does not invent first-primary receipt');}};
 const env={DB:db,AFW_FINITE_TRIAL_VERSION:{id:p.canaryContainment.runtimeVersionId},
  AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',
  AFW_DOSSIER_EVENTS_NODE:{idFromName:()=>own,idFromString:()=>own,get:()=>null},
  AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:s.grantId,subject:s.subject,projectId:s.projectId,clientId:s.clientId,resource:s.resource,startAt:s.startAt,expiresAt:s.expiresAt}),
  AFW_DOSSIER_EVENTS_PROJECTION_SECRET:'z'.repeat(32),AFW_OAUTH_ISSUER:'https://fixed.invalid',
  AFW_OAUTH_PILOT_CLIENT_ID:s.clientId,AFW_OAUTH_PILOT_PROJECT_ID:s.projectId,AFW_OAUTH_RESOURCE:s.resource,
  AFW_FINITE_TRIAL_CONTROL:{idFromName:()=>qa,get:()=>({
   readFiniteCanaryNominalContext:({operation,...selected})=>read(operation,selected),
   readFiniteTrialNominalControl:async selected=>{
    const {control,nominalClaim}=await read('reserve',selected);
    const g=await run('journal'),existing=g.writers.reservation;
    const ownedWriters=existing?[{intentId:p.intentId,controlHash:control.controlHash,actorId:p.resources.containerId,
     kind:'reservation',claimHash:hash(JSON.stringify(existing.claim)),phase:'issued'}]:[];
    return {status:'observed',value:{purpose:'afw.qa-finite-nominal-control.v1',intentId:p.intentId,controlHash:control.controlHash,
     planHash:control.planHash,sourceRevision:p.source.revision,runtimeVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,
     observedAt:f.now(),phase:'armed',withdrawnAt:null,claim:nominalClaim,claimHash:digest(ROOT+':effect',nominalClaim),ownedWriters,
     consent:{valid:true,grantHash:p.grantHash,monitorHash:p.monitorHash,expiresAt:p.C0}}};
   },
  })}};
 const run=operation=>runFiniteOwnNominalReservation({ctx,env,program,sourceRevision:s.sourceRevision,refs,operation,now:f.now});
 await assert.rejects(run('reserve'));assert.equal(candidate.puts,0);
 f.rows.set(prefix+'ack',ack);
 assert.equal((await run('journal')).writers.reservation,null);
 assert.equal((await run('reserve')).status,'issued');
 assert.equal((await run('reserve')).status,'reconcile_only');
 assert.equal(candidate.puts,1);
 f.setNow(p.C0);await assert.rejects(run('reserve'));
 assert.equal(candidate.puts,1);
});
