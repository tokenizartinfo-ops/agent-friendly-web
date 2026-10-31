import {createHash} from 'node:crypto';
const QA='agent-friendly-web-independent-closure-qa';
const fail=()=>{throw Error('Closed QA cloud rollback unavailable');};
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const hex=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return Object.freeze(out);
}
const snapshotKeys=['purpose','observedAt','qaVersionId','qaDeploymentId','expectedProfilesVerified','allOwnWorkflowsTerminal','ownContainerEmpty','qaExposureDisabled','ownNamespacesPreserved'];
/** Internal state machine for the TWO qualified closed artifacts only.
 * Server adapters must verify actual bytes/config/native state before this DTO.
 * Never accepts a public snapshot or substitutes for real-trial phase proof. */
export function createPrivateQaCloudClosedRollback(options){
 const keys=['plan','pins','readSnapshot','claim','deploy','now','timeoutMs','signal'],pinned=fields(options,keys),{readSnapshot,claim,deploy,now,timeoutMs,signal}=pinned;
 const planKeys=['purpose','sessionId','startAt','expiresAt'],pinKeys=['candidateVersionId','closedVersionId'],p=fields(pinned.plan,planKeys),pins=fields(pinned.pins,pinKeys);
 if(p.purpose!=='afw.qa-cloud-closed-rollback.v1'||!hex(p.sessionId)||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!uuid(pins.candidateVersionId)||!uuid(pins.closedVersionId)||pins.candidateVersionId===pins.closedVersionId||[readSnapshot,claim,deploy,now].some(x=>typeof x!=='function')||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>30000||!(signal instanceof AbortSignal))fail();
 let used=false;
 const stable=()=>{
  const current=fields(options,keys),plan=fields(pinned.plan,planKeys),scope=fields(pinned.pins,pinKeys);
  if(keys.some(k=>current[k]!==pinned[k])||planKeys.some(k=>plan[k]!==p[k])||pinKeys.some(k=>scope[k]!==pins[k]))fail();
 };
 async function run(args){
  let claimStarted=false,claimIssued=false,postStarted=false,key,last,finished=false;
  const out=(status,r)=>Object.freeze({purpose:'afw.qa-cloud-closed-rollback-result.v1',status,diagnosticOnly:true,operationalReadiness:false,mayRetry:false,...key?{claimKey:key}:{},...r?{qaVersionId:r.qaVersionId,qaDeploymentId:r.qaDeploymentId}:{}});
  if(used)return out('consumed');used=true;
  try{
   if(args.length!==1||!['inspect','restore_known_closed_candidate'].includes(args[0]))fail();
   const entered=now(),origin=performance.now();if(!time(entered)||entered<p.startAt||entered>=p.expiresAt||!Number.isFinite(origin)||origin<0)fail();
   const end=origin+(p.expiresAt-entered);let lastWall=entered,lastMono=origin;
   const current=()=>{const at=now(),m=performance.now();if(finished||signal.aborted||!time(at)||at<lastWall||at<p.startAt||at>=p.expiresAt||!Number.isFinite(m)||m<lastMono||m>=end)fail();stable();lastWall=at;lastMono=m;return at;};
   const margin=()=>{const at=current();if(Math.min(p.expiresAt-at,end-lastMono)<180000)fail();};
   const bounded=async fn=>{
    const wall=current(),mono=lastMono,remaining=Math.min(timeoutMs,p.expiresAt-wall,end-mono),child=new AbortController();let timer,onAbort,done=false;
    const check=()=>{const at=current();if(done||child.signal.aborted||at>=wall+remaining||lastMono>=mono+remaining)fail();};
    try{
     if(!(remaining>0))fail();
     const stopped=new Promise((_,reject)=>{onAbort=()=>{done=true;child.abort();reject(Error('Closed QA action stopped'));};signal.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,Math.max(1,Math.floor(remaining)));});
     const work=async()=>{check();const value=await fn(child.signal);check();return value;};
     const value=await Promise.race([stopped,work()]);check();return value;
    }finally{done=true;clearTimeout(timer);if(onAbort)signal.removeEventListener('abort',onAbort);child.abort();}
   };
   const read=async()=>{
    const began=current(),r=fields(await bounded(s=>readSnapshot(s)),snapshotKeys),at=current();
    if(r.purpose!=='afw.qa-cloud-closed-snapshot.v1'||!time(r.observedAt)||r.observedAt<began||r.observedAt>at||at-r.observedAt>5000||!uuid(r.qaVersionId)||!uuid(r.qaDeploymentId)||!['expectedProfilesVerified','allOwnWorkflowsTerminal','ownContainerEmpty','qaExposureDisabled','ownNamespacesPreserved'].every(k=>r[k]===true))fail();
    last=r;return r;
   };
   const first=await read();
   if(first.qaVersionId===pins.closedVersionId)return out('already_closed_observed',first);
   if(first.qaVersionId!==pins.candidateVersionId)fail();
   if(args[0]==='inspect')return out('closed_candidate_observed',first);
   margin();key=createHash('sha256').update('afw.qa-closed-rollback-claim.v1\n'+JSON.stringify([QA,pins.candidateVersionId,first.qaDeploymentId])).digest('hex');
   claimStarted=true;const claimed=await bounded(s=>claim(key,s));current();
   if(claimed==='consumed')return out('consumed',first);
   if(claimed==='blocked')return out('blocked',first);
   if(claimed!=='issued')return out('uncertain',first);claimIssued=true;
   const before=await read();if(before.qaVersionId!==first.qaVersionId||before.qaDeploymentId!==first.qaDeploymentId)fail();margin();
   postStarted=true;let ack,acknowledged=false;
   try{ack=fields(await bounded(s=>deploy(Object.freeze({sessionId:p.sessionId,closedVersionId:pins.closedVersionId}),s)),['deploymentId']);acknowledged=uuid(ack.deploymentId)&&ack.deploymentId!==first.qaDeploymentId;}catch{/* Unknown ACK never permits a second POST. */}
   current();const after=await read();
   if(after.qaVersionId!==pins.closedVersionId)return out('uncertain',after);
   if(acknowledged&&after.qaDeploymentId===ack.deploymentId)return out('restored_observed',after);
   return out('closed_observed_uncertain',after);
  }catch{return out(postStarted||claimIssued||claimStarted?'uncertain':'blocked',last);}
  finally{finished=true;}
 }
 return Object.freeze({run(...args){return run(args);}});
}
