import {createHash} from 'node:crypto';
import {IndependentClosure as BaselineClosure,PrivateQaBootstrap as BaselineBootstrap} from './closed-rollback.mjs';
import {inspection} from './inspection-context.mjs';
export {PrivateQaNamedConfirmation,PrivateQaPreregistration,default} from './closed-rollback.mjs';

const purpose='afw.qa-legacy-inspection.v1',slot='afw-own-successor-closure-v1';
const legacyKey='afw.canary-restoration-control.v1',headKey='afw.qa-generation-head.v2';
const infoPrefix='afw.qa-generation-info.v2:',controlPrefix='afw.qa-generation-control.v2:';
const journalKeys=[['restoration','afw.successor-canary-restoration.v1'],['retirement','afw.successor-retirement-handoff.v1'],['prepared_dispatch','afw.private-prepared-dispatch.v1'],['reduction_dispatch','afw.private-reduction-dispatch.v1']];
const flags=['AFW_QA_HTTP_ENABLED','AFW_QA_BOOTSTRAP_ENABLED','AFW_QA_CHALLENGE_ENABLED','AFW_MCP_CLOSURE_ENABLED','AFW_MCP_READER_PROBE_ENABLED','AFW_MCP_PUBLISHER_PROBE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_QA_ORIGINALS_ENABLED','AFW_QA_PROVIDER_OBSERVATION_ENABLED','AFW_QA_PRIMARY_RESERVATION_ENABLED','AFW_QA_INSTALLATION_ENABLED','AFW_QA_PRIMARY_CATALOG_ENABLED','AFW_QA_PRIMARY_ADMISSION_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
const policies=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const fail=()=>{throw Error('Closed technical inspection unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const bytes=v=>new TextEncoder().encode(v).length;
const hash=v=>createHash('sha256').update(v).digest('hex');
const blocked=()=>({purpose,status:'blocked',authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,k){const d=v&&Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();for(const k of keys)data(v,k);return v;}
function json(v,max){if(typeof v!=='string'||v.length>max||bytes(v)>max)fail();const x=JSON.parse(v);if(JSON.stringify(x)!==v)fail();return x;}
function packed(v){if(v===undefined)return {present:false,raw:null,hash:null,bytes:0};const raw=JSON.stringify(v);if(typeof raw!=='string'||bytes(raw)>1048576)fail();return {present:true,raw,hash:hash(raw),bytes:bytes(raw)};}
function namespace(env){const n=data(env,'AFW_INDEPENDENT_CLOSURE');if(typeof n?.idFromName!=='function'||typeof n?.get!=='function')fail();return n;}
function lease(env,id,parentEnd){
 const c=fields(inspection,['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt']);
 if(c.purpose!=='afw.qa-legacy-inspection-context.v1'||!hex(c.id)||id!==c.id||!hex(c.sourceRevision,40)||c.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||c.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||!time(c.startAt)||!time(c.expiresAt)||c.expiresAt<=c.startAt||c.expiresAt-c.startAt>600000)fail();
 const wall=Date.now(),mono=performance.now(),version=data(data(env,'AFW_QA_VERSION'),'id');
 if(!time(wall)||!Number.isFinite(mono)||mono<0||!uuid(version)||!time(parentEnd)||parentEnd<=wall||parentEnd-wall>5000)fail();
 const end=Math.min(parentEnd,c.expiresAt,wall+5000),monoEnd=mono+(end-wall);let lastWall=wall,lastMono=mono,done=false;
 const check=()=>{const w=Date.now(),m=performance.now();if(done||!time(w)||!Number.isFinite(m)||w<lastWall||m<lastMono||w<c.startAt||w>=end||m>=monoEnd||data(data(env,'AFW_QA_VERSION'),'id')!==version)fail();lastWall=w;lastMono=m;for(const k of flags)if(data(env,k)!=='false')fail();for(const k of policies)if(data(env,k)!=='')fail();return w;};
 check();return {check,end,version,remaining:()=>{check();return Math.min(end-Date.now(),monoEnd-performance.now());},finish:()=>{done=true;}};
}
async function bounded(l,work){let timer;try{const remaining=l.remaining();if(!(remaining>0))fail();const result=await Promise.race([work(),new Promise((_,reject)=>{timer=setTimeout(()=>{l.finish();reject(Error('Closed inspection deadline'));},remaining);})]);l.check();return result;}finally{clearTimeout(timer);l.finish();}}
function legacyPolicy(raw){
 const p=fields(json(raw,8192),['operation','startAt','expiresAt','candidate','live','closed','operator']);
 fields(p.candidate,['containerId','applicationId','programHash','sourceRevision']);fields(p.live,['versionId','deploymentId','configurationHash']);fields(p.closed,['versionId','moduleHash','moduleBytes','configurationHash']);fields(p.operator,['versionId','deploymentId','moduleHash','moduleBytes','configurationHash']);
 if(p.operation!=='restore_canary'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000||!hex(p.candidate.containerId)||p.candidate.applicationId!=='d6fc71552de7494a863aca20365a572d'||!hex(p.candidate.programHash)||!hex(p.candidate.sourceRevision,40)||!uuid(p.live.deploymentId)||!uuid(p.operator.deploymentId)||[p.live,p.closed,p.operator].some(x=>!uuid(x.versionId)||!hex(x.configurationHash))||p.live.versionId===p.closed.versionId||[p.closed,p.operator].some(x=>!hex(x.moduleHash)||!Number.isSafeInteger(x.moduleBytes)||x.moduleBytes<1||x.moduleBytes>2097152))fail();return p;
}
function legacyMetadata(value,at){
 const v=packed(value),out={present:v.present,shape:v.present?'unsupported':'absent',timeShapeReady:false,hash:v.hash,armedAt:null,withdrawnAt:null,startAt:null,expiresAt:null};
 if(!v.present)return out;
 try{const r=fields(value,['purpose','planHash','policy','armedAt','withdrawnAt']),p=legacyPolicy(r.policy);
  if(r.purpose!==legacyKey||!hex(r.planHash)||hash(r.policy)!==r.planHash||r.armedAt!==null&&!time(r.armedAt)||r.withdrawnAt!==null&&!time(r.withdrawnAt))fail();
  out.shape='recognized';out.armedAt=r.armedAt;out.withdrawnAt=r.withdrawnAt;out.startAt=p.startAt;out.expiresAt=p.expiresAt;
  out.timeShapeReady=time(r.armedAt)&&r.armedAt>=p.startAt-600000&&r.armedAt<p.expiresAt&&time(r.withdrawnAt)&&r.withdrawnAt>=r.armedAt&&r.withdrawnAt<=at&&p.expiresAt<=at;
 }catch{/* Unknown stored shape remains present; never repair or reflect it. */}
 return out;
}
// A recognized phase is only descriptive. Full journal validation remains a separate gate.
function journalMetadata(role,key,value){const p=packed(value);const recognizedPurpose=p.present&&value!==null&&typeof value==='object'&&Object.getOwnPropertyDescriptor(value,'purpose')?.value===key;const phase=p.present&&['issued','complete'].includes(Object.getOwnPropertyDescriptor(value??{},'phase')?.value)?value.phase:p.present?'unsupported':'absent';return {key:role,present:p.present,hash:p.hash,bytes:p.bytes,phase,recognizedPurpose,uncertain:p.present};}
async function snapshot(storage,l){
 return storage.transaction(async t=>{l.check();const values=[];for(const k of [legacyKey,...journalKeys.map(x=>x[1]),headKey]){values.push(await t.get(k));l.check();}
 const info=await t.list({prefix:infoPrefix,limit:33});l.check();const controls=await t.list({prefix:controlPrefix,limit:33});l.check();if(!(info instanceof Map)||!(controls instanceof Map))fail();
 const rows=[...info,...controls];for(const [k,v] of rows){if(typeof k!=='string')fail();packed(v);}
 const digest=hash(JSON.stringify({values:values.map(packed),info:[...info].map(([k,v])=>[k,packed(v)]),controls:[...controls].map(([k,v])=>[k,packed(v)])}));
 return {values,infoCount:info.size,controlCount:controls.size,digest};});
}
function observed(l,s,at){
 const journals=journalKeys.map(([role,key],i)=>journalMetadata(role,key,s.values[i+1])),head=packed(s.values[5]);
 return {purpose,status:'observed',inspectionId:inspection.id,sourceRevision:inspection.sourceRevision,runtimeVersionId:l.version,context:'durable_object',qaConfigurationClosed:true,selectedHistoryStable:true,storageWritesIssued:false,legacy:legacyMetadata(s.values[0],at),journals,hasUncertainJournal:journals.some(j=>j.uncertain),generation:{headPresent:head.present,infoCount:s.infoCount,controlCount:s.controlCount,inventoryComplete:s.infoCount<33&&s.controlCount<33,requiresReview:head.present||s.infoCount>0||s.controlCount>0,hash:s.digest},authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false};
}
function validateReceipt(raw,l){
 const r=fields(json(raw,4096),['purpose','status','inspectionId','sourceRevision','runtimeVersionId','context','qaConfigurationClosed','selectedHistoryStable','storageWritesIssued','legacy','journals','hasUncertainJournal','generation','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry']);
 if(r.purpose!==purpose||r.status!=='observed'||r.inspectionId!==inspection.id||r.sourceRevision!==inspection.sourceRevision||r.runtimeVersionId!==l.version||r.context!=='durable_object'||r.qaConfigurationClosed!==true||r.selectedHistoryStable!==true||r.storageWritesIssued!==false||[r.authorizesEffects,r.guardLivenessVerified,r.operationalReadiness,r.mayRetry].some(x=>x!==false))fail();
 const x=fields(r.legacy,['present','shape','timeShapeReady','hash','armedAt','withdrawnAt','startAt','expiresAt']);
 if(typeof x.present!=='boolean'||!['absent','unsupported','recognized'].includes(x.shape)||typeof x.timeShapeReady!=='boolean'||(x.present?!hex(x.hash):x.hash!==null)||x.present===(x.shape==='absent')||['armedAt','withdrawnAt','startAt','expiresAt'].some(k=>x[k]!==null&&!time(x[k]))||x.shape!=='recognized'&&[x.armedAt,x.withdrawnAt,x.startAt,x.expiresAt].some(v=>v!==null)||x.timeShapeReady&&(x.shape!=='recognized'||!time(x.armedAt)||!time(x.withdrawnAt)))fail();
 if(!Array.isArray(r.journals)||r.journals.length!==4)fail();
 r.journals.forEach((j,i)=>{fields(j,['key','present','hash','bytes','phase','recognizedPurpose','uncertain']);if(j.key!==journalKeys[i][0]||typeof j.present!=='boolean'||(j.present?!hex(j.hash):j.hash!==null)||!Number.isSafeInteger(j.bytes)||j.bytes<0||j.bytes>1048576||!['absent','unsupported','issued','complete'].includes(j.phase)||typeof j.recognizedPurpose!=='boolean'||typeof j.uncertain!=='boolean'||j.present===(j.phase==='absent')||j.uncertain!==j.present)fail();});
 if(r.hasUncertainJournal!==r.journals.some(j=>j.uncertain))fail();
 const g=fields(r.generation,['headPresent','infoCount','controlCount','inventoryComplete','requiresReview','hash']);
 if(typeof g.headPresent!=='boolean'||[g.infoCount,g.controlCount].some(n=>!Number.isSafeInteger(n)||n<0||n>33)||g.inventoryComplete!==(g.infoCount<33&&g.controlCount<33)||g.requiresReview!==(g.headPresent||g.infoCount>0||g.controlCount>0)||!hex(g.hash))fail();return r;
}
export class IndependentClosure extends BaselineClosure{
 async readLegacyInspection(...args){let l;try{
  if(args.length!==2)fail();l=lease(this.env,args[0],args[1]);const ns=namespace(this.env);
  if(this.ctx?.id?.toString()!==ns.idFromName(slot).toString())fail();
  return await bounded(l,async()=>{const one=await snapshot(this.ctx.storage,l);l.check();const two=await snapshot(this.ctx.storage,l);const at=l.check();if(one.digest!==two.digest)fail();const raw=JSON.stringify(observed(l,two,at));validateReceipt(raw,l);l.check();return raw;});
 }catch{return JSON.stringify(blocked());}finally{l?.finish();}}
}
export class PrivateQaBootstrap extends BaselineBootstrap{
 run(event,step){let p=event?.payload;try{if(typeof p==='string'&&bytes(p)<=256)p=JSON.parse(p);}catch{/* Original handler remains responsible for other payloads. */}if(p?.operation!=='inspect_legacy')return super.run(event,step);return this.inspectLegacy(event,step,p);}
 async inspectLegacy(event,step,p){let l;try{
  fields(p,['operation','inspectionId']);if(event.instanceId!=='afw-qa-legacy-inspect-'+inspection.id||typeof step?.do!=='function')fail();
  const entered=Date.now(),stamp=event.timestamp instanceof Date?event.timestamp.getTime():NaN;
  if(!time(stamp)||stamp>entered||entered-stamp>=5000)fail();l=lease(this.env,p.inspectionId,Math.min(entered+5000,stamp+5000));const ns=namespace(this.env);let executedHere=false;
  return await bounded(l,async()=>{const raw=await step.do('inspect-closed-legacy-metadata',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{if(executedHere)fail();executedHere=true;l.check();const actor=ns.get(ns.idFromName(slot));const value=await actor.readLegacyInspection(inspection.id,l.end);l.check();validateReceipt(value,l);return value;});
   l.check();if(!executedHere)fail();const r=validateReceipt(raw,l);const result={...r,context:'workflow',actorContext:'durable_object'};if(bytes(JSON.stringify(result))>4096)fail();l.check();return result;});
 }catch{return blocked();}finally{l?.finish();}}
}
