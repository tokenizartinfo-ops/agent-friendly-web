import {readRecord,instant,clock,closed} from './agent-consumption-input.mjs';
import {createCapsulePreparationRequestLease,readCapsulePreparationRequestLease} from './capsule-preparation-request-lease.mjs';

const ENABLE='AFW_PREPARATION_MAINTENANCE_CALLER_ENABLED',POLICY='AFW_PREPARATION_MAINTENANCE_CALLER_POLICY';
const SERVICE='agent-friendly-web-preparation-maintenance',WORKFLOW='afw-preparation-client-maintenance';
const CONTRACT='afw.preparation.client-caller.v1',MAINTENANCE='afw.preparation.client-maintenance.v1';
const KEYS=['method','operationId','issuer','resource','redirectUri','startedAt','expiresAt'];
const RESULT=['status','code','automaticRetry','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed',
 'contract','operationId','manifestHash','clientId','redirectUri','configuredResource','observedAt','clientRegistrationObserved'];
const outcome=(status,receipt)=>closed(status,{code:'preparation_client_caller_'+status,automaticRetry:false,authorizationGranted:false,
 operationalReadiness:false,...(receipt?{receipt}:{})});
const hash=async v=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(v)))),b=>b.toString(16).padStart(2,'0')).join('');

/** Internal composition only. Deployment must independently authorize and verify
 * the named caller/binding; account sharing and metadata do not confer consent.
 * Test clocks are never read from the administrative event or remote arguments.
 */
export async function runPreparationMaintenanceCaller(env,event,step,clocks={}){
 let control,admitted=false;
 try{
  if(env?.[ENABLE]!=='true')return outcome('blocked');
  const raw=env[POLICY],service=env.PREPARATION_MAINTENANCE;
  if(typeof raw!=='string'||raw.length>2048||new TextEncoder().encode(raw).length>2048)return outcome('blocked');
  const p=readRecord(JSON.parse(raw),KEYS),c=readRecord(clocks,['now','monotonic']);
  if(!p||!c||KEYS.some(k=>!Object.hasOwn(p,k))||!['register','reconcile'].includes(p.method))return outcome('blocked');
  const issuer=new URL(p.issuer),redirect=new URL(p.redirectUri),start=instant(p.startedAt),end=instant(p.expiresAt);
  if(issuer.protocol!=='https:'||issuer.origin!==p.issuer||p.resource!==p.issuer+'/mcp'
   ||redirect.protocol!=='https:'||redirect.hostname!=='chatgpt.com'||redirect.port||redirect.username||redirect.password||redirect.search||redirect.hash||redirect.href!==p.redirectUri
   ||!(redirect.pathname==='/connector_platform_oauth_redirect'||/^\/connector\/oauth\/[A-Za-z0-9_-]{1,128}$/.test(redirect.pathname))
   ||typeof p.operationId!=='string'||!/^[A-Za-z0-9][A-Za-z0-9_-]{0,63}$/.test(p.operationId)
   ||!clock(start)||!clock(end)||end<=start||end-start>600000)return outcome('blocked');
  const now=c.now??(()=>Date.now()),monotonic=c.monotonic??(()=>performance.now()),method=service?.[p.method];
  if(typeof now!=='function'||typeof monotonic!=='function'||typeof method!=='function')return outcome('blocked');
  // Native RPC property access creates fresh handles. Pin one handle; never
  // compare successive remote property reads as if they were JS functions.
  const methodDescriptor=Object.getOwnPropertyDescriptor(service,p.method);
  if(methodDescriptor&&(!Object.hasOwn(methodDescriptor,'value')||methodDescriptor.value!==method))return outcome('blocked');
  const methodCurrent=()=>{const d=Object.getOwnPropertyDescriptor(service,p.method);return methodDescriptor
   ?d&&d.value===method&&d.writable===methodDescriptor.writable&&d.enumerable===methodDescriptor.enumerable&&d.configurable===methodDescriptor.configurable:d===undefined;};
  let lastWall=now(),lastTick=monotonic(),invalidated=false;
  const initialWall=lastWall,initialTick=lastTick;
  const current=()=>{
   if(invalidated)throw Error('Caller unavailable');
   try{
    const wall=now(),tick=monotonic();
    if(env[ENABLE]!=='true'||env[POLICY]!==raw||env.PREPARATION_MAINTENANCE!==service||!methodCurrent()
     ||!clock(wall)||!Number.isFinite(tick)||tick<0||wall<lastWall||tick<lastTick
     ||wall<start||wall>=end||tick-initialTick>=Math.min(5000,end-initialWall))throw Error('Caller unavailable');
    lastWall=wall;lastTick=tick;return {wall,tick};
   }catch{invalidated=true;throw Error('Caller unavailable');}
  };
  current();
  const lease=createCapsulePreparationRequestLease({now:()=>current().wall,monotonic:()=>current().tick});
  control=readCapsulePreparationRequestLease(lease);
  const planHash=await control.wait(()=>hash([CONTRACT,SERVICE,p.method,p.operationId,p.issuer,p.resource,p.redirectUri,p.startedAt,p.expiresAt]));current();
  const payload=readRecord(event?.payload,['planHash']);
  if(!payload||Reflect.ownKeys(payload).length!==1||payload.planHash!==planHash||event?.instanceId!=='afw-prep-'+planHash
   ||event?.workflowName!==WORKFLOW||event?.schedule!==undefined||typeof step?.do!=='function')return outcome('blocked');
  const manifestHash=await control.wait(()=>hash([MAINTENANCE,p.operationId,p.issuer,p.resource,p.redirectUri,'AFW preparation '+p.operationId,p.startedAt,p.expiresAt,'authorization_code','code','none']));current();
  const checked=()=>{const live=current(),lease=control.check();return Math.min(lease.remaining,end-live.wall);};
  admitted=true;
  const timeout=Math.max(1,Math.floor(checked()));
  const result=await step.do('preparation-client-'+p.method,{retries:{limit:0,delay:1000,backoff:'constant'},timeout},async()=>{
   checked();
   const value=await control.wait(()=>{checked();return method.call(service);});
   checked();return normalize(value);
  });
  checked();
  // A cached step also passes the original live/configuration fences. Rebuild
  // its small output rather than trusting a persisted arbitrary object.
  const persisted=readRecord(result,['status','code','automaticRetry','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed','receipt']);
  if(!persisted||Object.keys(persisted).some(k=>!['status','code','receipt'].includes(k)&&persisted[k]!==false))return outcome('unconfirmed');
  if(persisted.status!=='confirmed')return outcome(persisted.status==='blocked'?'blocked':'unconfirmed');
  const receipt=readRecord(persisted.receipt,['clientId','clientRegistrationObserved','configuredResource','manifestHash','observedAt','operationId','redirectUri']);
  if(!validReceipt(receipt))return outcome('unconfirmed');
  return outcome('confirmed',receipt);

  function validReceipt(r){
   const observed=instant(r?.observedAt);
   return r&&r.operationId===p.operationId&&r.manifestHash===manifestHash&&r.redirectUri===p.redirectUri&&r.configuredResource===p.resource
    &&typeof r.clientId==='string'&&/^[A-Za-z0-9_-]{16,128}$/.test(r.clientId)&&r.clientRegistrationObserved===true
    &&clock(observed)&&observed>=start&&observed<end;
  }
  function normalize(value){
   const r=readRecord(value,RESULT);
   if(!r||['automaticRetry','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed'].some(k=>r[k]!==false))return outcome('unconfirmed');
   if(r.status!=='confirmed')return outcome(r.status==='blocked'?'blocked':'unconfirmed');
   const receipt={clientId:r.clientId,clientRegistrationObserved:r.clientRegistrationObserved,configuredResource:r.configuredResource,
    manifestHash:r.manifestHash,observedAt:r.observedAt,operationId:r.operationId,redirectUri:r.redirectUri};
   if(r.contract!==MAINTENANCE||r.code!=='preparation_client_observed'||!validReceipt(receipt))return outcome('unconfirmed');
   return outcome('confirmed',receipt);
  }
 }catch{return outcome(admitted?'unconfirmed':'blocked');}
 finally{control?.close();}
}
