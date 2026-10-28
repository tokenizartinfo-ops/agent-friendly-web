import {createRetirementEvidenceReader} from './mcp-retirement-evidence.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const KEY='afw.successor-retirement-handoff.v1';
const fail=()=>{throw Error('Successor retirement handoff unavailable');};
const hex=(v,n)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
function fields(v,keys,strict=true){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||(strict&&Reflect.ownKeys(v).length!==keys.length))fail();
 const out={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[k]=d.value;}
 return Object.freeze(out);
}
const date=v=>{if(typeof v!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z$/.test(v))fail();const n=Date.parse(v);if(!time(n)||new Date(n).toISOString()!==v)fail();return n;};
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const originalKeys=['containerId','applicationId','programHash','sourceRevision'];
const evidenceKeys=['purpose',...originalKeys,'processGeneration','closedAt','stoppedAt','observedAt','physicalStopVerified','mayStartSuccessor'];
const instanceKeys=['containerId','applicationId','image','startedAt','stoppedAt','state','exitCode'];
const result=(status,extra={})=>Object.freeze({status,physicalStopVerified:false,mayStartSuccessor:false,mayRestoreAdministration:false,operationalReadiness:false,...extra});

/** Detached private-storage handoff only. Server-owned primary callbacks, never
 * caller JSON, must establish original custody/revocations. No host, reset,
 * provider mutation, authority renewal or administrative dispatch permit. */
export function createSuccessorRetirementHandoff({storage,original,readCustody,readInstance,now=Date.now,timeoutMs=5000}={}){
 const pins=fields(original,originalKeys);
 if(!hex(pins.containerId,64)||pins.applicationId!==RELEASE_TARGET.namespaceId||!hex(pins.programHash,64)||!hex(pins.sourceRevision,40)||
  typeof storage?.transaction!=='function'||typeof readCustody!=='function'||typeof readInstance!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const transaction=storage.transaction;
 function evidence(value,at){
  const e=fields(value,evidenceKeys);
  if(e.purpose!=='afw.retirement-evidence.v1'||originalKeys.some(k=>e[k]!==pins[k])||!hex(e.processGeneration,64)||!['closedAt','stoppedAt','observedAt'].every(k=>time(e[k]))||
   e.closedAt>e.observedAt||e.stoppedAt>e.observedAt||e.observedAt>at||e.physicalStopVerified!==true||e.mayStartSuccessor!==false)fail();
  return e;
 }
 function projection(value,at){
  const v=fields(value,['id','application_id','image','started_at','status'],false),s=fields(v.status,['state','exit_code','updated_at'],false);
  const startedAt=date(v.started_at),stoppedAt=date(s.updated_at);
  if(v.id!==pins.containerId||v.application_id!==pins.applicationId||v.image!=='cloudflare/debian-trixie'||s.state!=='stopped'||s.exit_code!==0||startedAt>stoppedAt||stoppedAt>at)fail();
  return Object.freeze({containerId:v.id,applicationId:v.application_id,image:v.image,startedAt,stoppedAt,state:s.state,exitCode:s.exit_code});
 }
 function stored(value,at){
  const r=fields(value,['purpose','original','retirement','instance','capturedAt']),o=fields(r.original,originalKeys),e=evidence(r.retirement,at),i=fields(r.instance,instanceKeys);
  if(r.purpose!==KEY||!same(o,pins)||!time(r.capturedAt)||r.capturedAt<e.observedAt||r.capturedAt-e.observedAt>30000||r.capturedAt>at||
   i.containerId!==pins.containerId||i.applicationId!==pins.applicationId||i.image!=='cloudflare/debian-trixie'||i.state!=='stopped'||i.exitCode!==0||!time(i.startedAt)||!time(i.stoppedAt)||i.startedAt>i.stoppedAt||i.stoppedAt!==e.stoppedAt)fail();
  return Object.freeze({purpose:KEY,original:o,retirement:e,instance:i,capturedAt:r.capturedAt});
 }
 const identity=r=>JSON.stringify({original:r.original,retirement:Object.fromEntries(evidenceKeys.filter(k=>k!=='observedAt').map(k=>[k,r.retirement[k]])),instance:r.instance});
 async function invoke(capture){
  let finished=false,writeIssued=false,timer,lastWall=-1,lastMono=-1;
  const abort=new AbortController(),startMono=performance.now(),endMono=startMono+timeoutMs;
  const clock=()=>{const w=now(),m=performance.now();if(finished||abort.signal.aborted||!time(w)||w<lastWall||!Number.isFinite(m)||m<startMono||m<lastMono||m>=endMono)fail();lastWall=w;lastMono=m;return w;};
  const remaining=()=>{clock();return Math.max(1,Math.floor(endMono-lastMono));};
  const transact=async fn=>{
   clock();
   const value=await Reflect.apply(transaction,storage,[async tx=>{
    clock();if(typeof tx?.get!=='function'||typeof tx?.put!=='function')fail();
    const raw=await tx.get(KEY);clock();const record=raw===undefined?null:stored(raw,clock());
    return fn(tx,record);
   }]);
   clock();return value;
  };
  const instance=async input=>{clock();const v=await readInstance({...input,signal:AbortSignal.any([input.signal,abort.signal])});const p=projection(v,clock());return {value:Object.freeze({id:p.containerId,application_id:p.applicationId,image:p.image,started_at:new Date(p.startedAt).toISOString(),status:Object.freeze({state:p.state,exit_code:p.exitCode,updated_at:new Date(p.stoppedAt).toISOString()})}),projection:p};};
  const work=async()=>{
   clock();const before=await transact((_tx,r)=>r);clock();
   if(capture&&before)return result('already_recorded',{capturedAt:before.capturedAt});
   if(!capture){
    if(!before)fail();
    const fixed={containerId:pins.containerId,applicationId:pins.applicationId,signal:abort.signal};
    const a=(await instance(fixed)).projection,b=(await instance(fixed)).projection,after=await transact((_tx,r)=>r);
    const at=clock();if(!after||!same(before,after)||!same(a,b)||!same(a,before.instance))fail();
    return result('retired_handoff_observed',{...pins,processGeneration:before.retirement.processGeneration,closedAt:before.retirement.closedAt,stoppedAt:before.retirement.stoppedAt,capturedAt:before.capturedAt,observedAt:at,physicalStopVerified:true});
   }
   const reads=[];
   const reader=createRetirementEvidenceReader({original:pins,now:clock,timeoutMs:remaining(),
    readCustody:async input=>{clock();const value=await readCustody({...input,signal:AbortSignal.any([input.signal,abort.signal])});clock();return value;},
    readInstance:async input=>{const v=await instance(input);reads.push(v.projection);return v.value;}});
   const e=evidence(await reader.observe(),clock()),capturedAt=clock();
   if(reads.length!==2||!same(reads[0],reads[1])||e.stoppedAt!==reads[0].stoppedAt||capturedAt-e.observedAt>30000)fail();
   const record=stored({purpose:KEY,original:pins,retirement:e,instance:reads[0],capturedAt},capturedAt);
   const saved=await transact(async(tx,previous)=>{
    clock();if(previous){if(identity(previous)!==identity(record))fail();return {created:false,capturedAt:previous.capturedAt};}
    // Mark before the only potential mutation. An unknown ACK is never retried.
    writeIssued=true;await tx.put(KEY,record);clock();return {created:true,capturedAt:record.capturedAt};
   });
   clock();return result(saved.created?'recorded':'already_recorded',{capturedAt:saved.capturedAt});
  };
  try{
   const limit=remaining();
   const value=await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;abort.abort();reject(Error('Successor retirement handoff unavailable'));},limit);})]);
   clock();return value;
  }catch{return result(writeIssued?'uncertain':'blocked');}
  finally{finished=true;clearTimeout(timer);abort.abort();}
 }
 return Object.freeze({capture:()=>invoke(true),observe:()=>invoke(false)});
}
