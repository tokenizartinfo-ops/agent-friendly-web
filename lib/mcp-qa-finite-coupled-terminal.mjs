import {finiteData as data,finiteFields as fields,finiteHash as hash,finiteHex as hex,
 finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
import {decodeFiniteInitialCleanupRecord as decodeInitial,FINITE_INITIAL_CLEANUP_PREFIX as INITIAL} from './mcp-qa-finite-initial-cleanup-records.mjs';
import {decodeFiniteOwnerCleanupRecord as decodeOwner,FINITE_OWNER_CLEANUP_PREFIX as OWNER} from './mcp-qa-finite-owner-cleanup-records.mjs';
import {decodeFiniteOwnerIssuerProvenanceRecord as decodeSdk,FINITE_OWNER_ISSUER_PROVENANCE_PREFIX as SDK} from './mcp-qa-finite-owner-issuer-provenance-records.mjs';
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';

export const FINITE_COUPLED_OWNER_CLOSURE='afw.finite-original-alarm-handoff.v1:owner-closure';
export const FINITE_COUPLED_BUSINESS_PRIMARY='afw.finite-coupled-business-primary.v1';
const PRIOR='afw.finite-original-alarm-handoff.v1:prior-restoration';
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}(-[a-f0-9]{4}){3}-[a-f0-9]{12}$/.test(v);
const fail=()=>{throw Error('Finite coupled owner closure unavailable');};
const hashes=['handoffHash','planHash','processingStateHash','ownerIdentityHash','preconnectionId','sdkReferenceHash',
 'sdkSendHash','sdkObservedHash','monitoringObservedHash','closedFactsHash'];
const keys=['purpose',...hashes,'restoration','observedAt','operationalReadiness'];
const receiptKeys=value=>[...keys,...Object.hasOwn(value,'businessPrimary')?['businessPrimary']:[]];
function validate(input){
 const v=fields(data(input),[...receiptKeys(input),'receiptHash']),{receiptHash,...body}=v;
 const r=fields(v.restoration,['kind','versionId','deploymentId','proofHash']);
 if(v.purpose!==FINITE_COUPLED_OWNER_CLOSURE||hashes.some(k=>!hex(v[k]))||hash(body)!==receiptHash||
    !['original','prior'].includes(r.kind)||r.versionId!==QA_CLOUD_CLOSED_PINS.canary.id||
    !uuid(r.deploymentId)||!hex(r.proofHash)||!time(v.observedAt)||v.operationalReadiness!==false)fail();
 if(Object.hasOwn(v,'businessPrimary')){
  const q=fields(v.businessPrimary,['purpose','controlHash','completionHash','proofHash','primaryHash','observedAt']);
  if(r.kind!=='prior'||q.purpose!==FINITE_COUPLED_BUSINESS_PRIMARY||
     ![q.controlHash,q.completionHash,q.proofHash,q.primaryHash].every(value=>hex(value))||
     !time(q.observedAt)||q.observedAt>v.observedAt)fail();
 }
 return v;
}
export function sealFiniteCoupledTerminalReceipt(input){
 const body=fields(data({purpose:FINITE_COUPLED_OWNER_CLOSURE,...input}),receiptKeys(input));
 return Object.freeze(validate({...body,receiptHash:hash(body)}));
}
async function qualify({tx,record,state,receipt,check}){
 const v=validate(receipt),at=check();
 if(v.handoffHash!==record.handoffHash||v.planHash!==record.initialPlanHash||
    v.processingStateHash!==state.recordHash||v.preconnectionId!==record.prepId||
    !['processing','admin_pending'].includes(state.status)||v.observedAt<record.initialC0||
    v.observedAt>=record.initialC1||v.observedAt>at||state.nextAt!==null&&v.observedAt>=state.nextAt)fail();
 const scoped=OWNER+record.prepId+':';
 const get=async key=>{check();const result=await tx.get(key);check();return result;};
 const identity=decodeOwner('Identity',await get(scoped+'identity'));
 if(identity.recordHash!==v.ownerIdentityHash||identity.planHash!==v.planHash||identity.preconnectionId!==record.prepId||
    identity.capsuleHash!==record.capsuleHash||identity.enrollmentHash!==record.enrollmentHash||
    identity.actorId!==record.actorId||identity.qaVersionId!==record.qaVersionId||identity.sourceRevision!==record.sourceRevision||
    identity.C0!==record.initialC0||identity.C1!==record.initialC1)fail();
 const reference=decodeSdk('SdkGrantReference',await get(SDK+record.prepId+':reference'));
 if(reference.recordHash!==v.sdkReferenceHash||reference.observedAt>=identity.C0)fail();
 let sdkIssuedAt,monitorObservedAt;
 for(const [operation,fingerprint] of [['sdk_revoke',v.sdkObservedHash],['monitoring_revoke',v.monitoringObservedHash]]){
  const send=decodeOwner('Send',await get(scoped+operation+':send'));
  const observed=decodeOwner('Observed',await get(scoped+operation+':observed'));
  if(send.operation!==operation||send.identityHash!==identity.recordHash||send.issuedAt<identity.C0||
     send.deadline>identity.C1||observed.sendHash!==send.recordHash||observed.recordHash!==fingerprint||
     observed.observedAt<send.issuedAt||observed.observedAt>=send.deadline||observed.observedAt>v.observedAt||
     (operation==='sdk_revoke'?(send.recordHash!==v.sdkSendHash||observed.outcome!=='returned'):
      !['applied','already_withdrawn'].includes(observed.outcome)))fail();
  if(operation==='sdk_revoke')sdkIssuedAt=send.issuedAt;else monitorObservedAt=observed.observedAt;
 }
 if(monitorObservedAt>sdkIssuedAt)fail();
 const {restoration:r}=v,sendRaw=await get(INITIAL+'restore-send'),ackRaw=await get(INITIAL+'restore-ack'),priorRaw=await get(PRIOR);
 if(r.kind==='prior'){
  const p=fields(data(priorRaw),['purpose','handoffHash','versionId','deploymentId','completionHash','sendHash','operationalReadiness','observedAt']);
  const completion=await get('afw.qa-finite-cleanup.v1:'+record.intentId+':completion');
  if(sendRaw!==undefined||ackRaw!==undefined||p.purpose!==PRIOR||p.operationalReadiness!==false||
     p.handoffHash!==record.handoffHash||p.versionId!==r.versionId||p.deploymentId!==r.deploymentId||
     !hex(p.completionHash)||!hex(p.sendHash)||completion?.receiptHash!==p.completionHash||
     completion?.canaryVersionId!==r.versionId||completion?.canaryDeploymentId!==r.deploymentId||
     !time(p.observedAt)||p.observedAt<identity.C0||p.observedAt>sdkIssuedAt||hash(p)!==r.proofHash)fail();
  const q=v.businessPrimary;
  if(q&&(q.controlHash!==record.controlHash||q.completionHash!==p.completionHash||
     q.proofHash!==completion.proofHash||q.observedAt<p.observedAt))fail();
 }else{
  const send=decodeInitial('RestoreSend',sendRaw),ack=decodeInitial('RestoreAck',ackRaw);
  if(priorRaw!==undefined||send.planHash!==v.planHash||ack.planHash!==v.planHash||ack.sendHash!==send.recordHash||
     send.annotation!=='afw-finite-initial-restore-'+v.planHash||send.issuedAt<identity.C0||send.deadline>identity.C1||
     ack.acknowledgedAt<send.issuedAt||ack.acknowledgedAt>=send.deadline||ack.acknowledgedAt>sdkIssuedAt||
     ack.deploymentId!==r.deploymentId||hash({send,ack})!==r.proofHash)fail();
 }
 return Object.freeze(v);
}
export async function readFiniteCoupledTerminalReceipt({tx,record,state,check}){
 const receipt=await tx.get(FINITE_COUPLED_OWNER_CLOSURE);check();
 return receipt===undefined?null:qualify({tx,record,state,receipt,check});
}
export async function retainFiniteCoupledTerminalReceipt({storage,authority,receipt}){
 const {record,state,check}=authority,sync=storage?.sync;
 if(typeof sync!=='function'||typeof authority.transact!=='function')fail();
 check();
 await authority.transact(async tx=>{
  const current=await qualify({tx,record,state,receipt,check});
  if(await tx.get(FINITE_COUPLED_OWNER_CLOSURE)!==undefined)fail();
  check();await tx.put(FINITE_COUPLED_OWNER_CLOSURE,current);check();
 });
 await sync.call(storage);check();
 const readback=await authority.transact(tx=>readFiniteCoupledTerminalReceipt({tx,record,state,check}));check();
 if(!same(readback,receipt))fail();
 return readback;
}

