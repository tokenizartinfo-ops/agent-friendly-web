import assert from 'node:assert/strict';
import locator from '../../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS as pins} from '../../lib/mcp-qa-cloud-closed-pins.mjs';
import {finiteHash as hash} from '../../lib/mcp-finite-evidence.mjs';
import {observePrivateQaCoupledRestorePreparation,finiteCoupledQaPreparationInstanceId,FINITE_COUPLED_QA_OPERATION} from '../../lib/mcp-qa-finite-coupled-restore-observer.mjs';

const purpose='afw.finite-coupled-qa-finalization.v1';
export const live='11111111-1111-4111-8111-111111111111',active='22222222-2222-4222-8222-222222222222';
export const restored='33333333-3333-4333-8333-333333333333';
export function finiteCoupledRestoreFixture({at=Date.parse('2026-11-19T12:01:00Z'),controlHash='2'.repeat(64),noticeEvidence}={}){
 let pointer={versionId:live,deploymentId:active,annotation:null},record,phase=0;
 const intent={intentId:'1'.repeat(64),controlHash,sourceRevision:'3'.repeat(40),handoffHash:'4'.repeat(64),restoreFrom:at-30000,restoreBefore:at+150000};
 const {id,configurationHash,module}=pins.qaClosed;
 const basis={purpose,status:'prepared',intentId:intent.intentId,controlHash:intent.controlHash,sourceRevision:intent.sourceRevision,handoffHash:intent.handoffHash,
  ownerReceiptHash:'5'.repeat(64),ownerClosedAt:at-1000,restoreBefore:intent.restoreBefore,liveQa:{versionId:live,deploymentId:active},closedQa:{versionId:id,configurationHash,module},
  restoredCanary:{versionId:pins.canary.id,deploymentId:pins.canary.deploymentId},
  backup:{archiveSha256:locator.archiveSha256,archiveBytes:locator.archiveBytes,receiptSha256:locator.receiptSha256,qaClosed:locator.inputs.qaClosed},
  ...(noticeEvidence?{noticeEvidence}:{}),authorizesEffects:false,operationalReadiness:false};
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
 f.advance=ms=>{at+=ms;};
 return f;
}
