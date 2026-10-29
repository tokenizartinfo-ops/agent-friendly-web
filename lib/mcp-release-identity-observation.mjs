import {createHash} from 'node:crypto';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const enabled='AFW_RELEASE_IDENTITY_OBSERVATION_ENABLED',policyKey='AFW_RELEASE_IDENTITY_OBSERVATION_POLICY';
const closed=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED','AFW_RELEASE_RETIREMENT_OBSERVATION_ENABLED'];
const originalName='afw-own-event-one-occurrence-v1',successorName='afw-own-event-first-successor-v1';
const hex=v=>typeof v==='string'&&/^[a-f0-9]{64}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const fail=()=>{throw Error('Private native identity observation unavailable');};
const outcome=status=>({status,mayRetry:false,mayBoot:false,mayReserve:false,operationalReadiness:false});
const exact=(v,keys)=>{if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();}return v;};

/** Private preparation only: native identity derivation, never namespace.get,
 * actor RPC, credential/DB/network access, reservation or process activation.
 * The caller independently verifies the binding's actual namespace metadata. */
export async function runReleaseIdentityObservation({env,event,step,now=Date.now,monotonicNow=()=>performance.now()}={}){
 let timer,finished=false,admitted=false,entered=false;
 try{
  if(env?.[enabled]!=='true'||closed.slice(0,3).some(k=>env[k]!=='false')||
   closed.slice(3).some(k=>![undefined,'false'].includes(env[k]))||
   typeof now!=='function'||typeof monotonicNow!=='function'||typeof step?.do!=='function')return outcome('blocked');
  const raw=env[policyKey];if(typeof raw!=='string'||raw.length>1024)return outcome('blocked');
  const p=exact(JSON.parse(raw),['startAt','expiresAt','namespaceId','originalContainerId']);
  if(JSON.stringify(p)!==raw||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||
   p.namespaceId!==RELEASE_TARGET.namespaceId||!hex(p.originalContainerId))return outcome('blocked');
  const identityHash=createHash('sha256').update(raw).digest('hex');
  const payload=typeof event?.payload==='string'&&event.payload===JSON.stringify({identityHash})?{identityHash}:event?.payload;
  exact(payload,['identityHash']);
  if(event?.schedule!==undefined||event.instanceId!=='afw-release-identity-'+identityHash||payload.identityHash!==identityHash)return outcome('blocked');
  const nativeStamp=event.timestamp;if(!(nativeStamp instanceof Date))return outcome('blocked');
  const triggerAt=Reflect.apply(Date.prototype.getTime,nativeStamp,[]),wall=now(),mono=monotonicNow(),end=Math.min(p.expiresAt,triggerAt+5000);
  if(!time(triggerAt)||triggerAt<p.startAt||triggerAt>=p.expiresAt||!time(wall)||wall<triggerAt||wall>=end||!Number.isFinite(mono)||mono<0)return outcome('blocked');
  const namespace=env.AFW_RELEASE_EVENTS_NODE,fromName=namespace?.idFromName,fromString=namespace?.idFromString;
  if(typeof fromName!=='function'||typeof fromString!=='function')return outcome('blocked');
  const pins=Object.freeze(Object.fromEntries(closed.map(k=>[k,env[k]])));
  let lastWall=wall,lastMono=mono;const endMono=mono+(end-wall);
  const identities=()=>{
   const original=namespace.idFromName(originalName).toString(),successor=namespace.idFromName(successorName).toString();
   if(!hex(original)||!hex(successor)||original!==p.originalContainerId||successor===original||
    namespace.idFromString(original).toString()!==original||namespace.idFromString(successor).toString()!==successor)fail();
   return {original,successor};
  };
  const current=()=>{
   const w=now(),m=monotonicNow();
   if(finished||!time(w)||w<lastWall||w>=end||!Number.isFinite(m)||m<lastMono||m>=endMono||
    env[enabled]!=='true'||env[policyKey]!==raw||closed.some(k=>env[k]!==pins[k])||env.AFW_RELEASE_EVENTS_NODE!==namespace||
    namespace.idFromName!==fromName||namespace.idFromString!==fromString||event.timestamp!==nativeStamp||
    Reflect.apply(Date.prototype.getTime,nativeStamp,[])!==triggerAt)fail();
   lastWall=w;lastMono=m;return w;
  };
  current();const ids=identities(),doStep=step.do;
  const limit=Math.max(1,Math.floor(Math.min(end-lastWall,endMono-lastMono)));
  const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;reject(Error('Private native identity observation unavailable'));},limit);});
  admitted=true;
  const work=Reflect.apply(doStep,step,['observe-native-event-identities',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:limit},async()=>{
   if(entered)fail();entered=true;current();const actual=identities();
   if(actual.original!==ids.original||actual.successor!==ids.successor)fail();
   return JSON.stringify({...outcome('observed'),identityHash,namespaceId:p.namespaceId,originalContainerId:ids.original,successorContainerId:ids.successor,observedAt:current()});
  }]);
  const result=await Promise.race([work,deadline]),at=current(),actual=identities();
  if(typeof result!=='string'||Buffer.byteLength(result)>2048)fail();
  const r=exact(JSON.parse(result),['status','mayRetry','mayBoot','mayReserve','operationalReadiness','identityHash','namespaceId','originalContainerId','successorContainerId','observedAt']);
  if(JSON.stringify(r)!==result||r.status!=='observed'||r.mayRetry!==false||r.mayBoot!==false||r.mayReserve!==false||r.operationalReadiness!==false||
   r.identityHash!==identityHash||r.namespaceId!==p.namespaceId||r.originalContainerId!==actual.original||r.successorContainerId!==actual.successor||
   actual.original!==ids.original||actual.successor!==ids.successor||!time(r.observedAt)||r.observedAt<triggerAt||r.observedAt>=end||r.observedAt>at)fail();
  current();return Object.freeze(r);
 }catch{return outcome(admitted?'uncertain':'blocked');}
 finally{finished=true;clearTimeout(timer);}
}
