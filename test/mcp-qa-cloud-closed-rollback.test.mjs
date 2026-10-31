import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaCloudClosedRollback} from '../lib/mcp-qa-cloud-closed-rollback.mjs';
const candidate='11111111-1111-4111-8111-111111111111',closed='22222222-2222-4222-8222-222222222222',before='33333333-3333-4333-8333-333333333333',after='44444444-4444-4444-8444-444444444444';
function fixture(){
 const at=Date.now(),parent=new AbortController(),counts={reads:0,claims:0,deploys:0},claims=new Set();
 const f={wall:at,qaVersionId:candidate,qaDeploymentId:before,parent,counts,claims,mutate:()=>{},claimAnswer:'issued',ackLost:false};
 const snapshot=()=>({purpose:'afw.qa-cloud-closed-snapshot.v1',observedAt:f.wall,qaVersionId:f.qaVersionId,qaDeploymentId:f.qaDeploymentId,expectedProfilesVerified:true,allOwnWorkflowsTerminal:true,ownContainerEmpty:true,qaExposureDisabled:true,ownNamespacesPreserved:true});
 f.options=()=>({plan:{purpose:'afw.qa-cloud-closed-rollback.v1',sessionId:'a'.repeat(64),startAt:at-1000,expiresAt:at+600000-1000},pins:{candidateVersionId:candidate,closedVersionId:closed},readSnapshot:async signal=>{assert.ok(signal instanceof AbortSignal);counts.reads++;const value=snapshot();f.mutate(value,counts.reads);return value;},claim:async(key,signal)=>{assert.ok(signal instanceof AbortSignal);counts.claims++;if(claims.has(key))return'consumed';if(f.claimAnswer==='issued')claims.add(key);return f.claimAnswer;},deploy:async(value,signal)=>{assert.ok(signal instanceof AbortSignal);assert.deepEqual(Object.keys(value).sort(),['closedVersionId','sessionId']);assert.equal(value.closedVersionId,closed);counts.deploys++;f.qaVersionId=closed;f.qaDeploymentId=after;if(f.ackLost)throw Error('synthetic-private-ack-detail');return{deploymentId:after};},now:()=>f.wall,timeoutMs:30000,signal:parent.signal});
 return f;
}
const make=(f,extra={})=>createPrivateQaCloudClosedRollback({...f.options(),...extra});
const flags=value=>{assert.equal(value.diagnosticOnly,true);assert.equal(value.operationalReadiness,false);assert.equal(value.mayRetry,false);assert.equal(JSON.stringify(value).includes('synthetic-private'),false);};
test('external closed probe claims once, rereads before its sole effect and independently observes the fixed closed version',async()=>{
 const f=fixture(),r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'restored_observed');assert.equal(r.qaVersionId,closed);assert.equal(r.qaDeploymentId,after);assert.deepEqual(f.counts,{reads:3,claims:1,deploys:1});flags(r);
});
test('inspection cannot claim a budget or deploy and does not imply real-trial readiness',async()=>{
 const f=fixture(),r=await make(f).run('inspect');assert.equal(r.status,'closed_candidate_observed');assert.deepEqual(f.counts,{reads:1,claims:0,deploys:0});flags(r);
});
test('already closed baseline is independently observed without an effect or a claimed write permission',async()=>{
 const f=fixture();f.qaVersionId=closed;f.qaDeploymentId=after;const r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'already_closed_observed');assert.equal(f.counts.deploys,0);assert.equal(f.counts.claims,0);flags(r);
});
for(const field of ['expectedProfilesVerified','allOwnWorkflowsTerminal','ownContainerEmpty','qaExposureDisabled','ownNamespacesPreserved'])test('incomplete closed '+field+' proof never reaches the intent',async()=>{
 const f=fixture();f.mutate=r=>{r[field]=false;};const r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(f.counts.claims,0);assert.equal(f.counts.deploys,0);flags(r);
});
test('a foreign active version cannot be selected by a plan or silently overwritten',async()=>{
 const f=fixture();f.qaVersionId='55555555-5555-4555-8555-555555555555';const r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(f.counts.claims,0);assert.equal(f.counts.deploys,0);flags(r);
});
test('drift after durable intent consumes that intent and prevents the provider effect',async()=>{
 const f=fixture();f.mutate=(r,n)=>{if(n===2)r.qaDeploymentId='55555555-5555-4555-8555-555555555555';};const r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'uncertain');assert.equal(f.claims.size,1);assert.equal(f.counts.deploys,0);flags(r);
});
for(const answer of ['consumed','uncertain',undefined,true,{status:'issued'}])test('non-issued or unknown intent ACK never authorizes POST '+JSON.stringify(answer),async()=>{
 const f=fixture();f.claimAnswer=answer;const r=await make(f).run('restore_known_closed_candidate');assert.ok(['consumed','uncertain','blocked'].includes(r.status));assert.equal(f.counts.deploys,0);flags(r);
});
test('lost provider ACK can observe the closed result but can never repeat the effect',async()=>{
 const f=fixture();f.ackLost=true;const r=await make(f).run('restore_known_closed_candidate');assert.equal(r.status,'closed_observed_uncertain');assert.equal(f.counts.deploys,1);flags(r);
 const second=await make(f).run('restore_known_closed_candidate');assert.equal(second.status,'already_closed_observed');assert.equal(f.counts.deploys,1);
});
test('renaming the session cannot refund the same candidate deployment budget',async()=>{
 const f=fixture();const a=f.options();a.deploy=async()=>{f.counts.deploys++;throw Error('synthetic-private-no-ack');};const first=await createPrivateQaCloudClosedRollback(a).run('restore_known_closed_candidate');assert.equal(first.status,'uncertain');assert.equal(f.claims.size,1);
 const b=f.options();b.plan.sessionId='b'.repeat(64);const r=await createPrivateQaCloudClosedRollback(b).run('restore_known_closed_candidate');assert.equal(r.status,'consumed');assert.equal(f.counts.deploys,1);flags(r);
});
test('less than the original three-minute margin blocks before intent',async()=>{
 const f=fixture(),o=f.options();f.wall=o.plan.expiresAt-179999;const r=await createPrivateQaCloudClosedRollback(o).run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(f.counts.claims,0);assert.equal(f.counts.deploys,0);
});
test('time spent claiming cannot renew the original admission margin',async()=>{
 const f=fixture(),o=f.options();f.wall=o.plan.expiresAt-180010;o.claim=async()=>{f.wall+=11;return'issued';};const r=await createPrivateQaCloudClosedRollback(o).run('restore_known_closed_candidate');assert.equal(r.status,'uncertain');assert.equal(f.counts.deploys,0);
});
test('late snapshot or aborted parent cannot cause a late claim or POST',async()=>{
 for(const kind of ['timeout','abort']){
  const f=fixture(),o=f.options();let release;const gate=new Promise(r=>{release=r;});const read=o.readSnapshot;o.readSnapshot=async s=>{await gate;return read(s);};o.timeoutMs=25;const promise=createPrivateQaCloudClosedRollback(o).run('restore_known_closed_candidate');if(kind==='abort')f.parent.abort();const r=await Promise.race([promise,new Promise(resolve=>setTimeout(()=>resolve('hung'),180))]);assert.notEqual(r,'hung');assert.equal(r.status,'blocked');release();assert.equal((await promise).status,'blocked');assert.equal(f.counts.claims,0);assert.equal(f.counts.deploys,0);flags(r);
 }
});
test('mutated callbacks and snapshots with accessors fail closed without touching them',async()=>{
 const f=fixture(),o=f.options();let getters=0;o.readSnapshot=async()=>Object.defineProperty({},'qaVersionId',{enumerable:true,get(){getters++;throw Error('synthetic-private');}});const r=await createPrivateQaCloudClosedRollback(o).run('restore_known_closed_candidate');assert.equal(r.status,'blocked');assert.equal(getters,0);assert.equal(f.counts.claims,0);
 const g=fixture(),p=g.options(),read=p.readSnapshot;p.readSnapshot=async s=>{const r=await read(s);p.deploy=async()=>{g.counts.deploys++;return{};};return r;};assert.equal((await createPrivateQaCloudClosedRollback(p).run('restore_known_closed_candidate')).status,'blocked');assert.equal(g.counts.deploys,0);
});
test('unknown operations/selectors and repeated invocations cannot widen this closed diagnostic',async()=>{
 const f=fixture(),a=make(f);assert.equal((await a.run('publish')).status,'blocked');assert.equal(f.counts.reads,0);
 const g=fixture(),b=make(g);await b.run('inspect');assert.equal((await b.run('restore_known_closed_candidate')).status,'consumed');assert.equal(g.counts.deploys,0);
});
test('constructor rejects arbitrary resources, unlimited clocks and caller-added targets',()=>{
 const f=fixture(),o=f.options();for(const bad of [{...o,extra:true},{...o,timeoutMs:30001},{...o,plan:{...o.plan,workerName:'foreign'}},{...o,plan:{...o.plan,expiresAt:o.plan.startAt+600001}},{...o,pins:{...o.pins,closedVersionId:o.pins.candidateVersionId}}])assert.throws(()=>createPrivateQaCloudClosedRollback(bad));
});
