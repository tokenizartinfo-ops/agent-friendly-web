import {finiteFields as fields,finiteData as data,finiteHex as hex,finiteHash as hash,finiteTime as time,finiteSame as same} from './mcp-finite-evidence.mjs';
import {validateFiniteExternalPlan,validateFiniteObserverOutput,finiteSendRecord,finiteUuid} from './mcp-qa-finite-external-contract.mjs';
const fail=()=>{throw Error('Finite QA finalizer unavailable');};
/** Exact external consumer; readSnapshot is separately GET-only. claim is the
 * durable GitHub send fence, NOT a native journal claim or readiness flag. */
export function createPrivateQaFiniteTrialFinalizer({plan,readSnapshot,claim,deployClosed,now=Date.now,signal}={}){
 const p=validateFiniteExternalPlan(plan),raw=JSON.stringify(p),v=p.preview;
 if([readSnapshot,claim,deployClosed,now].some(f=>typeof f!=='function')||!(signal instanceof AbortSignal))fail();
 let used=false;
 return Object.freeze({async run(...args){
  let finished=false,started=false,post=false,lastSnapshot;
  const result=status=>Object.freeze({purpose:'afw.finite-qa-finalizer-result.v1',status,intentId:v.intentId,controlHash:v.controlHash,qaVersionId:lastSnapshot?.qaVersionId??null,qaDeploymentId:lastSnapshot?.qaDeploymentId??null,authorizesEffects:false,operationalReadiness:false,mayRetry:false});
  if(used)return result('consumed');used=true;
  const entered=now(),origin=performance.now();let last=entered,lastMono=origin;
  const check=()=>{const at=now(),mono=performance.now();if(finished||signal.aborted||args.length||JSON.stringify(plan)!==raw||!time(at)||at<last||at<v.T0||at>=v.R1||!Number.isFinite(mono)||mono<lastMono||mono-origin>=v.R1-entered)fail();last=at;lastMono=mono;return at;};
  async function bounded(fn){
   const begin=check(),mono=lastMono,child=new AbortController();let timer,ended=false;
   const assert=()=>{check();if(ended||child.signal.aborted||last-begin>=5000||lastMono-mono>=5000)fail();};
   const stop=()=>child.abort();signal.addEventListener('abort',stop,{once:true});
   try{
    const stopped=new Promise((_,reject)=>{timer=setTimeout(()=>{ended=true;child.abort();reject(Error('Finite finalizer stopped'));},Math.max(1,Math.min(5000,v.R1-begin)));});
    const work=async()=>{assert();const value=await fn(child.signal,assert);assert();return value;};
    return await Promise.race([work(),stopped]);
   }finally{ended=true;clearTimeout(timer);signal.removeEventListener('abort',stop);child.abort();}
  }
  async function read(){
   const begin=check(),r=fields(data(await bounded((s,a)=>readSnapshot(s,a))),['purpose','observedAt','qaVersionId','qaDeploymentId','output','restoreJobId','custodyExpiresAt','profilesVerified','namespacesPreserved','exposureDisabled','providerSettled','workflowsTerminal','primarySealedChainVerified','githubVerified','evidenceHash']);
   check();if(r.purpose!=='afw.finite-qa-snapshot.v1'||!time(r.observedAt)||r.observedAt<begin||r.observedAt>last||!finiteUuid(r.qaVersionId)||!finiteUuid(r.qaDeploymentId)||!hex(r.evidenceHash)||!time(r.custodyExpiresAt)||r.custodyExpiresAt< v.R1||last>=r.custodyExpiresAt||['profilesVerified','namespacesPreserved','exposureDisabled','providerSettled','workflowsTerminal','primarySealedChainVerified','githubVerified'].some(k=>r[k]!==true))fail();
   validateFiniteObserverOutput(r.output,p);
   if(r.qaVersionId!==p.deployments.qaLive.versionId&&r.qaVersionId!==p.deployments.qaClosed.versionId||r.qaVersionId===p.deployments.qaLive.versionId&&r.qaDeploymentId!==p.deployments.qaLive.deploymentId)fail();
   lastSnapshot=r;return r;
  }
  try{
   check();const first=await read();
   if(first.qaVersionId===p.deployments.qaClosed.versionId)return result('closed_observed');
   const record=finiteSendRecord({plan:p,output:first.output,restoreJobId:first.restoreJobId,issuedAt:check()});
   started=true;const issued=await bounded((s,a)=>claim(record,s,a));check();
   if(issued!=='issued'){
    // Unknown/existing authority is never retried, even when current job differs.
    await read();return result(lastSnapshot.qaVersionId===p.deployments.qaClosed.versionId?'closed_observed_uncertain':'admin_pending');
   }
   const before=await read();check();
   if(before.qaVersionId!==first.qaVersionId||before.qaDeploymentId!==first.qaDeploymentId||before.restoreJobId!==first.restoreJobId||!same(before.output,first.output))fail();
   post=true;let ack;
   try{ack=await bounded((s,a)=>deployClosed(Object.freeze({record,recordHash:hash(record)}),s,a));}catch{/* sole POST consumed; final read is independent */}
   check();const after=await read();check();
   if(after.qaVersionId!==p.deployments.qaClosed.versionId)return result('uncertain');
   return result(finiteUuid(ack?.deploymentId)&&after.qaDeploymentId===ack.deploymentId?'restored_observed':'closed_observed_uncertain');
  }catch{return result(post||started?'uncertain':'admin_pending');}
  finally{finished=true;}
 }});
}
