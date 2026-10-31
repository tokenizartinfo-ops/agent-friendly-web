import {createHash} from 'node:crypto';
import {IndependentClosure as BaselineClosure,PrivateQaBootstrap as BaselineBootstrap} from './closed-rollback.mjs';
import {inspection} from './inspection-context.mjs';
export {PrivateQaNamedConfirmation,PrivateQaPreregistration,default} from './closed-rollback.mjs';
const PURPOSE='afw.qa-legacy-inspection.v1',SLOT='afw-own-successor-closure-v1',LEGACY='afw.canary-restoration-control.v1',HEAD='afw.qa-generation-head.v2';
const MARKERS=[['restoration','afw.successor-canary-restoration.v1'],['retirement','afw.successor-retirement-handoff.v1'],['prepared_dispatch','afw.private-prepared-dispatch.v1'],['reduction','afw.private-reduction-dispatch.v1']];
const FLAGS=['AFW_QA_HTTP_ENABLED','AFW_QA_BOOTSTRAP_ENABLED','AFW_QA_CHALLENGE_ENABLED','AFW_MCP_CLOSURE_ENABLED','AFW_MCP_READER_PROBE_ENABLED','AFW_MCP_PUBLISHER_PROBE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_QA_ORIGINALS_ENABLED','AFW_QA_PROVIDER_OBSERVATION_ENABLED','AFW_QA_PRIMARY_RESERVATION_ENABLED','AFW_QA_INSTALLATION_ENABLED','AFW_QA_PRIMARY_CATALOG_ENABLED','AFW_QA_PRIMARY_ADMISSION_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
const POLICIES=['AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_CHALLENGE_IDENTITY','AFW_MCP_CLOSURE_POLICY','AFW_MCP_READER_PROBE_POLICY','AFW_MCP_PUBLISHER_PROBE_POLICY','AFW_MCP_CLOSURE_DISPATCH_POLICY'];
const fail=()=>{throw Error('Closed legacy inspection unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const uuid=v=>typeof v==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const sha=v=>createHash('sha256').update(v).digest('hex');
const denied=()=>({purpose:PURPOSE,status:'blocked',authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,key){const d=v&&Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));}
function admin(){const p=fields(inspection,['purpose','id','sourceRevision','baselineVersionId','baselineModuleHash','startAt','expiresAt']);if(p.purpose!=='afw.qa-legacy-inspection-context.v1'||!hex(p.id)||!hex(p.sourceRevision,40)||p.baselineVersionId!=='c570b60b-95dc-48e1-89f3-9c4651691dbc'||p.baselineModuleHash!=='4b557f04777be25f3df6dc271990d57095ace231bb7b24e2a7a10da23ada2c2f'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();return p;}
function lease(env,p,absoluteEnd){
 const entered=Date.now(),origin=performance.now(),metadata=data(env,'AFW_QA_VERSION'),version=data(metadata,'id');
 if(!uuid(version)||!time(entered)||!time(absoluteEnd)||absoluteEnd<=entered||absoluteEnd>entered+5000||!Number.isFinite(origin)||origin<0)fail();
 const end=Math.min(absoluteEnd,p.expiresAt),monoEnd=origin+end-entered;let lastWall=entered,lastMono=origin,finished=false;
 const current=()=>{const n=Date.now(),m=performance.now();if(finished||!time(n)||n<lastWall||n<p.startAt||n>=end||!Number.isFinite(m)||m<lastMono||m>=monoEnd||data(env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==version||JSON.stringify(admin())!==JSON.stringify(p))fail();
 for(const k of FLAGS)if(data(env,k)!=='false')fail();for(const k of POLICIES)if(data(env,k)!=='')fail();
 for(const k of Object.keys(env))if(/^AFW_(QA|MCP)_.*_ENABLED$/.test(k)&&!FLAGS.includes(k))fail();lastWall=n;lastMono=m;return n;};
 current();return{current,version,remaining(){current();return Math.max(1,Math.floor(Math.min(end-lastWall,monoEnd-lastMono)));},finish(){finished=true;}};
}
function detached(value,budget={bytes:0,nodes:0},depth=0){
 if(++budget.nodes>40000||depth>24)fail();if(value===undefined)return null;if(value===null||typeof value==='boolean'||typeof value==='number'&&Number.isFinite(value))return value;
 if(typeof value==='string'){budget.bytes+=Buffer.byteLength(value);if(budget.bytes>1048576)fail();return value;}
 if(!value||typeof value!=='object'||Object.getPrototypeOf(value)!==(Array.isArray(value)?Array.prototype:Object.prototype))fail();
 const result=Array.isArray(value)?[]:{};for(const k of Reflect.ownKeys(value)){if(Array.isArray(value)&&k==='length')continue;const d=Object.getOwnPropertyDescriptor(value,k);if(typeof k!=='string'||['__proto__','constructor','toJSON'].includes(k)||!d?.enumerable||!Object.hasOwn(d,'value'))fail();result[k]=detached(d.value,budget,depth+1);}return result;
}
function legacySummary(value,at){
 const base={present:value!==null,shape:value===null?'absent':'unsupported',timeShapeReady:false,hash:value===null?null:sha(JSON.stringify(value)),armedAt:null,withdrawnAt:null,startAt:null,expiresAt:null};
 if(value===null)return base;
 try{
 const r=fields(value,['purpose','planHash','policy','armedAt','withdrawnAt']);if(r.purpose!==LEGACY||!hex(r.planHash)||typeof r.policy!=='string'||Buffer.byteLength(r.policy)>8192||sha(r.policy)!==r.planHash)fail();
 const p=fields(JSON.parse(r.policy),['operation','startAt','expiresAt','candidate','live','closed','operator']);if(JSON.stringify(p)!==r.policy||p.operation!=='restore_canary'||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 const c=fields(p.candidate,['containerId','applicationId','programHash','sourceRevision']);if(!hex(c.containerId)||c.applicationId!=='d6fc71552de7494a863aca20365a572d'||!hex(c.programHash)||!hex(c.sourceRevision,40))fail();
 for(const v of [fields(p.live,['versionId','deploymentId','configurationHash']),fields(p.closed,['versionId','moduleHash','moduleBytes','configurationHash']),fields(p.operator,['versionId','deploymentId','moduleHash','moduleBytes','configurationHash'])]){
 if(!uuid(v.versionId)||!hex(v.configurationHash)||Object.hasOwn(v,'deploymentId')&&!uuid(v.deploymentId)||Object.hasOwn(v,'moduleHash')&&(!hex(v.moduleHash)||!Number.isSafeInteger(v.moduleBytes)||v.moduleBytes<1||v.moduleBytes>2097152))fail();}
 if(r.armedAt!==null&&(!time(r.armedAt)||r.armedAt<p.startAt-600000||r.armedAt>=p.expiresAt||r.armedAt>at)||r.withdrawnAt!==null&&(!time(r.withdrawnAt)||r.withdrawnAt>at||r.armedAt!==null&&r.withdrawnAt<r.armedAt)||r.armedAt===null&&r.withdrawnAt===null)fail();
 return{...base,shape:r.armedAt===null?'unarmed_withdrawn':r.withdrawnAt===null?'armed':'armed_withdrawn',timeShapeReady:r.armedAt!==null&&r.withdrawnAt!==null&&p.expiresAt<=at,armedAt:r.armedAt,withdrawnAt:r.withdrawnAt,startAt:p.startAt,expiresAt:p.expiresAt};
 }catch{return base;}
}
const receiptKeys=['purpose','status','inspectionId','sourceRevision','runtimeVersionId','context','qaConfigurationClosed','selectedHistoryStable','storageWritesIssued','legacy','journals','hasUncertainJournal','generation','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'];
function receipt(raw,p,version){
 if(typeof raw!=='string'||Buffer.byteLength(raw)>4096)fail();const r=fields(JSON.parse(raw),receiptKeys);
 if(r.purpose!==PURPOSE||r.status!=='observed'||r.inspectionId!==p.id||r.sourceRevision!==p.sourceRevision||r.runtimeVersionId!==version||r.context!=='durable_object'||r.qaConfigurationClosed!==true||r.selectedHistoryStable!==true||r.storageWritesIssued!==false||['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'].some(k=>r[k]!==false))fail();
 fields(r.legacy,['present','shape','timeShapeReady','hash','armedAt','withdrawnAt','startAt','expiresAt']);fields(r.generation,['headPresent','infoCount','controlCount','inventoryComplete','requiresReview','hash']);
 if(!Array.isArray(r.journals)||r.journals.length!==4)fail();for(let i=0;i<4;i++){const j=fields(r.journals[i],['key','present','hash','bytes','phase','recognizedPurpose','uncertain']);if(j.key!==MARKERS[i][0])fail();}
 return r;
}
export class IndependentClosure extends BaselineClosure{
 async readLegacyInspection(...args){
 let l,timer;
 try{
 const p=admin();if(args.length!==2||args[0]!==p.id)fail();l=lease(this.env,p,args[1]);
 const ctx=this.ctx,env=this.env,storage=ctx.storage,transaction=storage?.transaction,actor=ctx.id,idString=actor?.toString,ns=data(env,'AFW_INDEPENDENT_CLOSURE'),select=ns?.idFromName;
 if(typeof transaction!=='function'||typeof idString!=='function'||typeof select!=='function')fail();const actorId=Reflect.apply(idString,actor,[]);
 const current=()=>{l.current();if(ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==actor||actor.toString!==idString||data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||ns.idFromName!==select||Reflect.apply(idString,actor,[])!==actorId||Reflect.apply(select,ns,[SLOT]).toString()!==actorId)fail();return l.current();};
 const snapshot=async()=>{current();const result=await Reflect.apply(transaction,storage,[async t=>{
 const get=t?.get,list=t?.list;if(typeof get!=='function'||typeof list!=='function')fail();const check=()=>{current();if(t.get!==get||t.list!==list)fail();};
 const read=async k=>{check();const r=await Reflect.apply(get,t,[k]);check();return r;};
 const selected=[];for(const key of [LEGACY,...MARKERS.map(x=>x[1]),HEAD])selected.push(await read(key));
 const inventories=[];for(const prefix of ['afw.qa-generation-info.v2:','afw.qa-generation-control.v2:']){check();const rows=await Reflect.apply(list,t,[{prefix,limit:33}]);check();if(!(rows instanceof Map)||rows.size>33)fail();inventories.push([...rows]);}
 check();return detached({selected,inventories});}]);current();return result;};
 const work=async()=>{
 const a=await snapshot(),b=await snapshot();current();if(JSON.stringify(a)!==JSON.stringify(b))fail();
 const journals=MARKERS.map(([key,name],i)=>{const row=b.selected[i+1],present=row!==null,known=present&&row?.purpose===name,phase=!present?'absent':known&&['issued','complete'].includes(row.phase)?row.phase:known&&key==='retirement'?'retained':'unknown';return{key,present,hash:present?sha(JSON.stringify(row)):null,bytes:present?Buffer.byteLength(JSON.stringify(row)):0,phase,recognizedPurpose:known,uncertain:present&&['issued','unknown'].includes(phase)};});
 const infoCount=b.inventories[0].length,controlCount=b.inventories[1].length,headPresent=b.selected[5]!==null;
 const result={purpose:PURPOSE,status:'observed',inspectionId:p.id,sourceRevision:p.sourceRevision,runtimeVersionId:l.version,context:'durable_object',qaConfigurationClosed:true,selectedHistoryStable:true,storageWritesIssued:false,legacy:legacySummary(b.selected[0],current()),journals,hasUncertainJournal:journals.some(x=>x.uncertain),generation:{headPresent,infoCount,controlCount,inventoryComplete:infoCount<=32&&controlCount<=32,requiresReview:headPresent||infoCount>0||controlCount>0,hash:sha(JSON.stringify({head:b.selected[5],inventories:b.inventories}))},authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false};
 const raw=JSON.stringify(result);receipt(raw,p,l.version);current();return raw;};
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{l.finish();reject(Error('Closed inspection expired'));},l.remaining());});
 const raw=await Promise.race([work(),deadline]);current();return raw;
 }catch{return JSON.stringify(denied());}finally{clearTimeout(timer);l?.finish();}
 }
}
export class PrivateQaBootstrap extends BaselineBootstrap{
 async run(event,step){
 let payload=event?.payload;try{if(typeof payload==='string'&&Buffer.byteLength(payload)<=256)payload=JSON.parse(payload);}catch{}
 if(payload?.operation!=='inspect_legacy')return super.run(event,step);
 let l,timer;
 try{
 const p=admin(),input=fields(payload,['operation','inspectionId']),stamp=event?.timestamp,doStep=step?.do;
 if(input.inspectionId!==p.id||event.instanceId!=='afw-qa-legacy-inspect-'+p.id||event.schedule!==undefined||!(stamp instanceof Date)||typeof doStep!=='function')fail();
 const triggerAt=Reflect.apply(Date.prototype.getTime,stamp,[]);if(!time(triggerAt)||triggerAt<p.startAt||triggerAt>=p.expiresAt)fail();const absoluteEnd=Math.min(p.expiresAt,triggerAt+5000);l=lease(this.env,p,absoluteEnd);
 const env=this.env,ns=data(env,'AFW_INDEPENDENT_CLOSURE'),select=ns?.idFromName,get=ns?.get;if(typeof select!=='function'||typeof get!=='function')fail();let entered=false;
 const current=()=>{l.current();if(event.timestamp!==stamp||Reflect.apply(Date.prototype.getTime,stamp,[])!==triggerAt||data(env,'AFW_INDEPENDENT_CLOSURE')!==ns||ns.idFromName!==select||ns.get!==get)fail();};
 const work=async()=>{
 current();const raw=await Reflect.apply(doStep,step,['inspect-fixed-legacy-metadata',{retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'5 seconds'},async()=>{entered=true;current();const target=Reflect.apply(get,ns,[Reflect.apply(select,ns,[SLOT])]),r=await target.readLegacyInspection(p.id,absoluteEnd);current();return r;}]);current();if(!entered)fail();const r=receipt(raw,p,l.version);current();return{...r,context:'workflow',actorContext:r.context};};
 const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{l.finish();reject(Error('Closed inspection expired'));},l.remaining());});
 const result=await Promise.race([work(),deadline]);current();return result;
 }catch{return denied();}finally{clearTimeout(timer);l?.finish();}
 }
}
