import test from 'node:test';
import assert from 'node:assert/strict';
import locator from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS as pins} from '../lib/mcp-qa-cloud-closed-pins.mjs';
import {finiteHash as hash} from '../lib/mcp-finite-evidence.mjs';

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
 const f={intent,preparation,reads:0,claims:0,writes:0,readback:0,loseAck:false,scopeDrift:false,missingArchive:false,claimMode:'issued',tamperSend:false,driftAfterClaim:false};
 const marker='afw-coupled-qa-restore-'+hash({purpose:'afw.finite-coupled-qa-restore-key.v1',intentId:intent.intentId,controlHash:intent.controlHash,handoffHash:intent.handoffHash});
 f.deps={intent,signal:new AbortController().signal,now:()=>at,
  readPreparation:async()=>f.preparation,
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
