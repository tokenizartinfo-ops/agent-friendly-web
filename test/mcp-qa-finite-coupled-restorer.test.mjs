import test from 'node:test';
import assert from 'node:assert/strict';
import locator from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS as pins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';

import {observePrivateQaCoupledRestorePreparation,finiteCoupledQaPreparationInstanceId,FINITE_COUPLED_QA_OPERATION} from '../lib/mcp-qa-finite-coupled-restore-observer.mjs';

const api=await import('../lib/mcp-qa-finite-coupled-restorer.mjs').catch(()=>({}));
const purpose='afw.finite-coupled-qa-finalization.v1';
const live='11111111-1111-4111-8111-111111111111',active='22222222-2222-4222-8222-222222222222';
const restored='33333333-3333-4333-8333-333333333333';
function fixture(){
 let at=Date.parse('2026-11-19T12:01:00Z'),pointer={versionId:live,deploymentId:active,annotation:null},record,phase=0;
 const intent={intentId:'1'.repeat(64),controlHash:'2'.repeat(64),sourceRevision:'3'.repeat(40),handoffHash:'4'.repeat(64),restoreFrom:at-30000,restoreBefore:at+150000};
 const {id,configurationHash,module}=pins.qaClosed;
 const basis={purpose,status:'prepared',intentId:intent.intentId,controlHash:intent.controlHash,sourceRevision:intent.sourceRevision,handoffHash:intent.handoffHash,
  ownerReceiptHash:'5'.repeat(64),ownerClosedAt:at-1000,restoreBefore:intent.restoreBefore,liveQa:{versionId:live,deploymentId:active},closedQa:{versionId:id,configurationHash,module},
  backup:{archiveSha256:locator.archiveSha256,archiveBytes:locator.archiveBytes,receiptSha256:locator.receiptSha256,qaClosed:locator.inputs.qaClosed},authorizesEffects:false,operationalReadiness:false};
 const preparation={...basis,preparationHash:hash(basis)};
 const refs={intentId:intent.intentId,controlHash:intent.controlHash,sourceRevision:intent.sourceRevision};
 const event={instanceId:finiteCoupledQaPreparationInstanceId(refs),workflowName:'afw-own-qa-private-bootstrap',
   payload:{operation:FINITE_COUPLED_QA_OPERATION,...refs}};
 let observed;
 const observe=()=>observePrivateQaCoupledRestorePreparation({event,sourceRevision:refs.sourceRevision,
  step:{do:async(name,options,task)=>{assert.equal(name,'observe-original-qa-restore-preparation');return task();}},
  env:{AFW_QA_VERSION:{id:live},AFW_INDEPENDENT_CLOSURE:{
   idFromName(name){assert.equal(name,'afw-own-successor-closure-v1');return 'exact-original-slot';},
   get(slot){assert.equal(slot,'exact-original-slot');return {async readFiniteCoupledQaFinalization(x){
    assert.deepEqual(x,{intentId:intent.intentId,controlHash:intent.controlHash});return f.preparation;
   }};}
  }}
 });
 const f={intent,preparation,reads:0,claims:0,writes:0,readback:0,loseAck:false,scopeDrift:false,missingArchive:false,claimMode:'issued',tamperSend:false,driftAfterClaim:false};
 const marker='afw-coupled-qa-restore-'+hash({purpose:'afw.finite-coupled-qa-restore-key.v1',intentId:intent.intentId,controlHash:intent.controlHash,handoffHash:intent.handoffHash});
 f.deps={intent,signal:new AbortController().signal,now:()=>at,
  readObservation:async()=>{
   observed??=await observe();
   return f.foreignObservation?{...observed,instanceId:'foreign-workflow'}:observed;
  },
  readProvider:async()=>{
   f.reads++;if(phase===1)f.readback++;
   return {purpose:'afw.finite-coupled-qa-provider.v1',observedAt:at,archiveSha256:f.missingArchive?'a'.repeat(64):locator.archiveSha256,
    custodyUntil:f.scopeDrift?at:intent.restoreBefore,providerEvidenceHash:'6'.repeat(64),namespacePreserved:true,privateExposure:true,
    peerVersionsClosed:true,ownWorkflowsTerminal:true,ownContainerEmpty:true,targetQualified:true,...pointer};
  },
  claimSend:async r=>{f.claims++;if(record)return 'existing';if(f.claimMode!=='issued')return f.claimMode;record=r;if(f.driftAfterClaim)pointer={...pointer,deploymentId:restored};return 'issued';},
  readSend:async()=>f.tamperSend?{...record,ownerReceiptHash:'a'.repeat(64)}:record,
  deployClosed:async request=>{
   f.writes++;assert.equal(request.recordHash,hash(record));assert.equal(request.record.annotation,marker);
   assert.deepEqual(request.body,{strategy:'percentage',versions:[{version_id:id,percentage:100}],annotations:{'workers/message':marker}});
   assert.equal(request.record.requestHash,hash(request.body));
   pointer={versionId:id,deploymentId:restored,annotation:marker};phase=1;
   if(f.loseAck)throw Error('synthetic lost Cloudflare acknowledgment');
   return {deploymentId:restored};
  }
 };
 f.expire=()=>{at=intent.restoreBefore;};
 return f;
}
const requireController=()=>{assert.equal(typeof api.createPrivateQaFiniteCoupledRestorer,'function');return api.createPrivateQaFiniteCoupledRestorer;};
test('the independent writer restores the exact private R2 target once and reports matching provider readback',async()=>{
 const create=requireController(),f=fixture(),controller=create(f.deps);
 const result=await controller.run();
 assert.equal(result.status,'restored_observed');
 assert.equal(result.ownerReceiptHash,f.preparation.ownerReceiptHash);
 assert.equal(result.qaDeploymentId,restored);
 assert.equal(f.writes,1);assert.equal(f.claims,1);assert.equal(f.readback,1);
 assert.equal((await controller.run()).status,'consumed');
 assert.equal((await create(f.deps).run()).status,'closed_observed_uncertain');
 assert.equal(f.writes,1);
});
test('a lost provider acknowledgment is observed independently without replay or successful attribution',async()=>{
 const create=requireController(),f=fixture();f.loseAck=true;
 const first=await create(f.deps).run();
 assert.equal(first.status,'closed_observed_uncertain');assert.equal(f.readback,1);
 assert.equal((await create(f.deps).run()).status,'closed_observed_uncertain');assert.equal(f.writes,1);
});
for(const [name,change] of Object.entries({
 'wrong original owner receipt hash':f=>{f.preparation={...f.preparation,ownerReceiptHash:'b'.repeat(64)};},
 'foreign native Workflow':f=>{f.foreignObservation=true;},
 'foreign R2 archive':f=>{f.missingArchive=true;},
 'expired custody':f=>{f.scopeDrift=true;},
 'expired original window':f=>f.expire(),
 'unknown durable send':f=>{f.claimMode='unknown';},
 'foreign durable readback':f=>{f.tamperSend=true;},
 'provider drift after durable send':f=>{f.driftAfterClaim=true;}
})){
 test(name+' prevents the only QA write',async()=>{
  const create=requireController(),f=fixture();change(f);
  assert.ok(['admin_pending','uncertain'].includes((await create(f.deps).run()).status));
  assert.equal(f.writes,0);
 });
}

import * as http from '../lib/mcp-qa-finite-http.mjs';

const bootstrapName='afw-own-qa-private-bootstrap';
const bootstrapId='06b6c3eb-ce59-4594-8b9e-2636977d56da';
const workflowVersion='44444444-4444-4444-8444-444444444444';
const cfAccountPath='/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const observedStep='observe-original-qa-restore-preparation';

async function httpFixture({foreignInstance=false,wrongStep=false,unstableResult=false}={}){
 const f=fixture(),{intent}=f;
 const observed=await f.deps.readObservation(),instanceId=observed.instanceId;
 const base='/workflows/'+bootstrapName;
 const at=f.deps.now(),stamp=new Date(at).toISOString();
 const payload={operation:FINITE_COUPLED_QA_OPERATION,intentId:intent.intentId,controlHash:intent.controlHash,sourceRevision:intent.sourceRevision};
 const calls=[];
 const json=result=>Response.json({success:true,errors:[],messages:[],result},{headers:{date:stamp}});
 const reads=new Map([
  [base,{id:bootstrapId,name:bootstrapName,script_name:pins.qaClosed.name,class_name:'PrivateQaBootstrap'}],
  [base+'/instances/'+instanceId,{status:'complete',success:true,versionId:workflowVersion,params:payload,queued:stamp,end:stamp,
   step_count:1,steps:[{name:wrongStep?'foreign-closure':observedStep,type:'step',start:stamp,end:stamp,success:true,
    attempts:[{success:true}],output:JSON.stringify(observed.preparation)}],
   output:JSON.stringify({...observed,...foreignInstance?{instanceId:'foreign'}:{},...unstableResult?{preparation:{...observed.preparation,ownerReceiptHash:'a'.repeat(64)}}:{}})}],
  [base+'/versions/'+workflowVersion,{id:workflowVersion,workflow_id:bootstrapId,class_name:'PrivateQaBootstrap',language:'javascript'}],
 ]);
 const fetchImpl=async(url,init)=>{
  const u=new URL(url);calls.push({host:u.hostname,path:u.pathname,method:init.method});
  assert.equal(u.hostname,'api.cloudflare.com');assert.equal(init.headers.Authorization,'Bearer SYNTHETIC');
  assert.equal(init.method,'GET');
  const v=reads.get(u.pathname.slice(cfAccountPath.length));assert.ok(v,u.pathname);
  return json(v);
 };
 const params={intent,liveVersionId:live,credential:'SYNTHETIC',fetchImpl,now:f.deps.now,signal:f.deps.signal};
 return {f,observed,calls,params};
}
test('the independent executor reads the real fixed Cloudflare Workflow wire before accepting original closure',async()=>{
 assert.equal(typeof http.createPrivateQaFiniteCoupledObservationHttp,'function');
 const {params,calls,observed}=await httpFixture();
 const read=http.createPrivateQaFiniteCoupledObservationHttp(params);
 assert.deepEqual(await read(),observed);
 assert.equal(calls.length,3);assert.ok(calls.every(x=>x.method==='GET'));
 assert.ok(calls.every(x=>x.path.startsWith(cfAccountPath+'/workflows/'+bootstrapName)));
});
for(const fault of ['foreignInstance','wrongStep','unstableResult'])test(fault+' cannot become a trusted Cloudflare owner-closure observation',async()=>{
 assert.equal(typeof http.createPrivateQaFiniteCoupledObservationHttp,'function');
 const {params,calls}=await httpFixture({[fault]:true});
 await assert.rejects(()=>http.createPrivateQaFiniteCoupledObservationHttp(params)());
 assert.ok(calls.every(x=>x.method==='GET'));
});
