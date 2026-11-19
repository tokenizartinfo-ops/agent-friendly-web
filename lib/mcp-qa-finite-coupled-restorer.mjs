import {setTimeout as delay} from 'node:timers/promises';
import locator from '../scripts/mcp-finite-r2-historical-inputs.json' with {type:'json'};
import {QA_CLOUD_CLOSED_PINS} from './mcp-qa-cloud-closed-pins.mjs';
import {finiteCoupledQaPreparationInstanceId} from './mcp-qa-finite-coupled-restore-observer.mjs';
import {finiteUuid} from './mcp-qa-finite-external-contract.mjs';
import {finiteFields as fields,finiteData as data,finiteHash as hash,finiteHex as hex,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';

import {validateFiniteCoupledNoticeEvidence} from './mcp-finite-notice-closure.mjs';

const PREP='afw.finite-coupled-qa-finalization.v1',SEND='afw.finite-coupled-qa-send.v1';
const WINDOW=180000,STEP=5000,RESTORE_BUDGET=35000;
const fail=()=>{throw Error('Finite independent QA restore unavailable');};
/** Independent executor. The launch composition must supply an admitted
 * original scope, a fresh provider/R2 qualifier and a durable external fence. */
export function createPrivateQaFiniteCoupledRestorer({intent,readObservation,readProvider,claimSend,readSend,deployClosed,now=Date.now,sleep=(ms,signal)=>delay(ms,undefined,{signal}),signal}={}){
 const scope=fields(data(intent),['intentId','controlHash','sourceRevision','handoffHash','restoreFrom','restoreBefore']);
 const ids=['intentId','controlHash','handoffHash'];
 if(ids.some(k=>!hex(scope[k]))||!hex(scope.sourceRevision,40)||!time(scope.restoreFrom)||!time(scope.restoreBefore)||
    scope.restoreBefore-scope.restoreFrom!==WINDOW||!(signal instanceof AbortSignal)||
    [readObservation,readProvider,claimSend,readSend,deployClosed,now,sleep].some(fn=>typeof fn!=='function'))fail();
 const key=hash({purpose:'afw.finite-coupled-qa-restore-key.v1',...Object.fromEntries(ids.map(k=>[k,scope[k]]))});
 const annotation='afw-coupled-qa-restore-'+key, target=QA_CLOUD_CLOSED_PINS.qaClosed;
 const body=data({strategy:'percentage',versions:[{version_id:target.id,percentage:100}],annotations:{'workers/message':annotation}});
 const backup=data({archiveSha256:locator.archiveSha256,archiveBytes:locator.archiveBytes,receiptSha256:locator.receiptSha256,qaClosed:locator.inputs.qaClosed});
 let used=false;
 return Object.freeze({async run(...args){
  let prepared,latest,noticeEvidence,claimed=false,done=false;
  const output=status=>Object.freeze({purpose:'afw.finite-coupled-qa-restoration-result.v1',status,
   ownerReceiptHash:prepared?.ownerReceiptHash??null,qaVersionId:latest?.versionId??null,qaDeploymentId:latest?.deploymentId??null,
   ...(['restored_observed','closed_observed_uncertain'].includes(status)&&noticeEvidence?{noticeEvidence}:{}),
   authorizesEffects:false,operationalReadiness:false,mayRetry:false});
  if(used)return output('consumed');used=true;
  const start=now(),origin=performance.now();let last=start,lastMono=origin;
  const check=()=>{
   const at=now(),mono=performance.now();
   if(done||args.length||signal.aborted||!time(at)||at<scope.restoreFrom||at>=scope.restoreBefore||at<last||
      !Number.isFinite(mono)||mono<lastMono||mono-origin>=scope.restoreBefore-start)fail();
   last=at;lastMono=mono;return at;
  };
  async function bounded(fn){
   const wall=check(),mono=lastMono,child=new AbortController(),remaining=Math.min(STEP,scope.restoreBefore-wall);let stopped,timer,finished=false;
   const assert=()=>{const at=check();if(finished||child.signal.aborted||at-wall>=remaining||lastMono-mono>=remaining)fail();};
   const stop=()=>{finished=true;child.abort();stopped?.(Error('Finite independent QA step stopped'));};
   try{
    const timeout=new Promise((_,reject)=>{stopped=reject;timer=setTimeout(stop,remaining);});
    signal.addEventListener('abort',stop,{once:true});
    const work=async()=>{assert();const value=await fn(child.signal,assert);assert();return value;};
    const value=await Promise.race([work(),timeout]);assert();return value;
   }finally{finished=true;clearTimeout(timer);signal.removeEventListener('abort',stop);child.abort();}
  }
  async function preparation(allowPending=false){
   const value=data(await bounded(readObservation));
   if(value?.status==='not_yet_observed'){
    fields(value,['status']);if(!allowPending)fail();return null;
   }
   const observed=fields(value,['purpose','instanceId','runtimeVersionId','sourceRevision','preparation']);
   if(observed.purpose!=='afw.finite-coupled-qa-preparation-observed.v1'||observed.sourceRevision!==scope.sourceRevision||
      observed.instanceId!==finiteCoupledQaPreparationInstanceId(scope)||!finiteUuid(observed.runtimeVersionId))fail();
   const v=fields(observed.preparation,['purpose','status','intentId','controlHash','sourceRevision','handoffHash','ownerReceiptHash','ownerClosedAt','restoreBefore','liveQa','closedQa','restoredCanary','backup',...(Object.hasOwn(observed.preparation,'noticeEvidence')?['noticeEvidence']:[]),'authorizesEffects','operationalReadiness','preparationHash']);
   const {preparationHash,...record}=v,from=fields(v.liveQa,['versionId','deploymentId']);
   const restored=fields(v.restoredCanary,['versionId','deploymentId']);
   if(v.purpose!==PREP||v.status!=='prepared'||[...ids,'sourceRevision','restoreBefore'].some(k=>v[k]!==scope[k])||
      v.authorizesEffects!==false||v.operationalReadiness!==false||!hex(v.ownerReceiptHash)||!time(v.ownerClosedAt)||
      v.ownerClosedAt<scope.restoreFrom||v.ownerClosedAt>check()||hash(record)!==preparationHash||
      from.versionId!==observed.runtimeVersionId||!finiteUuid(from.deploymentId)||from.versionId===target.id||
      restored.versionId!==QA_CLOUD_CLOSED_PINS.canary.id||!finiteUuid(restored.deploymentId)||
      !same(v.closedQa,{versionId:target.id,configurationHash:target.configurationHash,module:target.module})||!same(v.backup,backup))fail();
   return v;
  }
  async function waitForPreparation(){
   const cutoff=scope.restoreBefore-RESTORE_BUDGET;
   for(let i=0;i<Math.ceil((WINDOW-RESTORE_BUDGET)/STEP);i++){
    if(check()>=cutoff)fail();
    const value=await preparation(true),at=check();
    if(at>=cutoff)fail();
    if(value)return value;
    const next=scope.restoreFrom+(Math.floor((at-scope.restoreFrom)/STEP)+1)*STEP;
    if(next>=cutoff)fail();
    await sleep(next-at,signal);
    if(check()<next)fail();
   }
   fail();
  }
  async function provider(){
   const began=check(),r=fields(data(await bounded(readProvider)),['purpose','observedAt','archiveSha256','custodyUntil','providerEvidenceHash','namespacePreserved','privateExposure','peerVersionsClosed','ownWorkflowsTerminal','ownContainerEmpty','targetQualified','versionId','deploymentId','annotation']);
   const at=check();
   if(r.purpose!=='afw.finite-coupled-qa-provider.v1'||!time(r.observedAt)||r.observedAt<began||r.observedAt>at||
      r.archiveSha256!==backup.archiveSha256||!time(r.custodyUntil)||r.custodyUntil<scope.restoreBefore||
      !hex(r.providerEvidenceHash)||!finiteUuid(r.versionId)||!finiteUuid(r.deploymentId)||
      (r.annotation!==null&&(typeof r.annotation!=='string'||r.annotation.length>160))||
      ['namespacePreserved','privateExposure','peerVersionsClosed','ownWorkflowsTerminal','ownContainerEmpty','targetQualified'].some(k=>r[k]!==true))fail();
   latest=r;return r;
  }
  function send(issuedAt){
   if(!time(issuedAt)||issuedAt<prepared.ownerClosedAt||issuedAt>check())fail();
   return data({purpose:SEND,key,intentId:scope.intentId,controlHash:scope.controlHash,handoffHash:scope.handoffHash,
    sourceRevision:scope.sourceRevision,ownerReceiptHash:prepared.ownerReceiptHash,preparationHash:prepared.preparationHash,
    liveQa:prepared.liveQa,closedQa:prepared.closedQa,archiveSha256:backup.archiveSha256,issuedAt,restoreBefore:scope.restoreBefore,
    annotation,requestHash:hash(body)});
  }
  const live=r=>r.versionId===prepared.liveQa.versionId&&r.deploymentId===prepared.liveQa.deploymentId;
  const closed=r=>r.versionId===target.id&&r.deploymentId!==prepared.liveQa.deploymentId&&r.annotation===annotation;
  const lookup=()=>bounded((s,a)=>readSend(key,s,a));
  try{
   check();prepared=await waitForPreparation();
   if(Object.hasOwn(prepared,'noticeEvidence')){
    try{
     noticeEvidence=validateFiniteCoupledNoticeEvidence(prepared.noticeEvidence,{controlHash:scope.controlHash,originalRestoreFrom:scope.restoreFrom});
    }catch{/* Correlation failure does not block the independent rollback. */}
   }
   const first=await provider();
   if(closed(first)){
    const record=await lookup();
    if(!record||!same(record,send(record.issuedAt)))fail();
    return output('closed_observed_uncertain');
   }
   if(!live(first))fail();
   const r=send(check());claimed=true;
   if(await bounded((s,a)=>claimSend(r,s,a))!=='issued')return output('uncertain');
   if(!same(await lookup(),r))fail();
   if(!same(await preparation(),prepared))fail();
   const before=await provider();if(!live(before)||before.annotation!==first.annotation)fail();
   let ack;
   try{ack=await bounded((s,a)=>deployClosed(Object.freeze({record:r,recordHash:hash(r),body}),s,a));}
   catch{/* The acknowledged durable claim survives any ambiguous provider response. */}
   const after=await provider();
   if(!closed(after))return output('uncertain');
   return output(finiteUuid(ack?.deploymentId)&&after.deploymentId===ack.deploymentId?'restored_observed':'closed_observed_uncertain');
  }catch{return output(claimed?'uncertain':'admin_pending');}
  finally{done=true;}
 }});
}
