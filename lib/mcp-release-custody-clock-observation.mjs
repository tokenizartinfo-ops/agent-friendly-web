import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
import {snapshotRetiredRpcObservation} from './mcp-retired-rpc-observation.mjs';
const enabled='AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_ENABLED',policyKey='AFW_RELEASE_CUSTODY_CLOCK_OBSERVATION_POLICY';
const flags=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED','AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED'];
const originalName='afw-own-event-one-occurrence-v1';
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Private original clock observation unavailable');};
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;};
const base=status=>({status,mayRetry:false,mayBoot:false,mayReserve:false,mayWrite:false,operationalReadiness:false});
const outcome=(status,samples=[],extra={})=>Object.freeze({...base(status),...extra,samples:Object.freeze(samples.map(s=>Object.freeze({...s})))});

/** Clock-only private diagnostic. Future remote time is measured, never accepted
 * as retirement evidence. No credential/DB/fetch/Container/confirmation access. */
export async function runReleaseCustodyClockObservation({env,event,step,now=Date.now,monotonicNow=()=>performance.now()}={}){
 let timer,finished=false,admitted=false,entered=false,observationHash;
 const samples=[];
 try{
  if(env?.[enabled]!=='true'||flags.slice(0,3).some(k=>env[k]!=='false')||flags.slice(3).some(k=>![undefined,'false'].includes(env[k]))||
   typeof now!=='function'||typeof monotonicNow!=='function'||typeof step?.do!=='function')return outcome('blocked');
  const raw=env[policyKey];if(typeof raw!=='string'||raw.length>1024)return outcome('blocked');
  const p=exact(JSON.parse(raw),['startAt','expiresAt','namespaceId','original']),original=exact(p.original,['containerId','programHash','sourceRevision']);
  if(JSON.stringify(p)!==raw||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>120000||p.namespaceId!==RELEASE_TARGET.namespaceId||
   !hex(original.containerId,64)||!hex(original.programHash,64)||!hex(original.sourceRevision,40))return outcome('blocked');
  observationHash=createHash('sha256').update(raw).digest('hex');
  const rawPayload=event?.payload,instanceId='afw-original-clock-'+observationHash;
  const payload=typeof rawPayload==='string'&&rawPayload===JSON.stringify({observationHash})?{observationHash}:rawPayload;
  exact(payload,['observationHash']);if(event.schedule!==undefined||event.instanceId!=='afw-original-clock-'+observationHash||payload.observationHash!==observationHash)return outcome('blocked');
  const nativeStamp=event.timestamp;if(!(nativeStamp instanceof Date))return outcome('blocked');
  const triggerAt=Reflect.apply(Date.prototype.getTime,nativeStamp,[]),wall=now(),mono=monotonicNow(),end=Math.min(p.expiresAt,triggerAt+5000);
  if(!time(triggerAt)||triggerAt<p.startAt||triggerAt>=p.expiresAt||!time(wall)||wall<triggerAt||wall>=end||!Number.isFinite(mono)||mono<0)return outcome('blocked');
  const namespace=env.AFW_RELEASE_EVENTS_NODE,fromName=namespace?.idFromName,fromString=namespace?.idFromString,get=namespace?.get;
  if([fromName,fromString,get].some(f=>typeof f!=='function'))return outcome('blocked');
  const pins=Object.freeze(Object.fromEntries(flags.map(k=>[k,env[k]])));
  let lastWall=wall,lastMono=mono;const endMono=mono+(end-wall);
  const identity=()=>{const id=namespace.idFromName(originalName);if(id.toString()!==original.containerId||namespace.idFromString(original.containerId).toString()!==original.containerId)fail();return id;};
  const current=()=>{
   const w=now(),m=monotonicNow();exact(payload,['observationHash']);if(event.instanceId!==instanceId||event.schedule!==undefined||event.payload!==rawPayload||payload.observationHash!==observationHash||finished||!time(w)||w<lastWall||w>=end||!Number.isFinite(m)||m<lastMono||m>=endMono||
    env[enabled]!=='true'||env[policyKey]!==raw||flags.some(k=>env[k]!==pins[k])||env.AFW_RELEASE_EVENTS_NODE!==namespace||
    namespace.idFromName!==fromName||namespace.idFromString!==fromString||namespace.get!==get||event.timestamp!==nativeStamp||Reflect.apply(Date.prototype.getTime,nativeStamp,[])!==triggerAt)fail();
   identity();lastWall=w;lastMono=m;return w;
  };
  current();const doStep=step.do,limit=Math.max(1,Math.floor(Math.min(end-lastWall,endMono-lastMono)));
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;reject(Error('Private original clock observation unavailable'));},limit);});admitted=true;
  const work=Reflect.apply(doStep,step,['observe-original-custody-clock',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:limit},async()=>{
   if(entered)fail();entered=true;current();
   for(let i=0;i<2;i++){
    const callerBefore=current(),target=namespace.get(identity());current();
    const rawResult=await target.observeRetired();
    // Dispose native lifecycle metadata before clock/pin checks can reject it.
    const r=snapshotRetiredRpcObservation(rawResult),callerAfter=current();
    if(r.purpose!=='afw.node-retirement-observation.v1'||Object.keys(original).some(k=>r[k]!==original[k])||!hex(r.processGeneration,64)||r.image!=='cloudflare/debian-trixie'||
     r.physicalStopVerified!==false||r.mayStartSuccessor!==false||['createdAt','expiresAt','closedAt','observedAt'].some(k=>!time(r[k]))||
     r.expiresAt<=r.createdAt||r.expiresAt-r.createdAt>600000||r.closedAt<r.createdAt||r.closedAt>r.observedAt)fail();
    samples.push(Object.freeze({callerBefore,callerAfter,remoteObservedAt:r.observedAt,deltaMs:r.observedAt-callerAfter}));
   }
   return JSON.stringify({...base('observed'),observationHash,samples,observedAt:current()});
  }]);
  const result=await Promise.race([work,deadline]),at=current();if(typeof result!=='string'||Buffer.byteLength(result)>2048)fail();
  const r=exact(JSON.parse(result),['status','mayRetry','mayBoot','mayReserve','mayWrite','operationalReadiness','observationHash','samples','observedAt']);
  if(JSON.stringify(r)!==result||r.status!=='observed'||r.mayRetry!==false||r.mayBoot!==false||r.mayReserve!==false||r.mayWrite!==false||r.operationalReadiness!==false||r.observationHash!==observationHash||
   !time(r.observedAt)||r.observedAt<triggerAt||r.observedAt>at||!Array.isArray(r.samples)||r.samples.length!==2)fail();
  let previous=triggerAt;for(const s of r.samples){exact(s,['callerBefore','callerAfter','remoteObservedAt','deltaMs']);if(!time(s.callerBefore)||!time(s.callerAfter)||!time(s.remoteObservedAt)||s.callerBefore<previous||s.callerAfter<s.callerBefore||s.callerAfter>r.observedAt||!Number.isSafeInteger(s.deltaMs)||s.deltaMs!==s.remoteObservedAt-s.callerAfter)fail();previous=s.callerAfter;}
  current();return outcome('observed',r.samples,{observationHash,observedAt:r.observedAt});
 }catch{return outcome(admitted?'uncertain':'blocked',samples,observationHash?{observationHash}:{});}
 finally{finished=true;clearTimeout(timer);}
}
