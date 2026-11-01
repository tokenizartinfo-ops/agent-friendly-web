import {createHash} from 'node:crypto';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
const LEGACY='afw.canary-restoration-control.v1',HEAD='afw.qa-generation-head.v2',INFO='afw.qa-generation-info.v2',CONTROL='afw.qa-generation-control.v2',CAPSULE='afw.qa-generation-capsule.v2';
const fail=()=>{throw Error('Private QA generation metadata unavailable');};
const hash=x=>createHash('sha256').update(x).digest('hex');
const hex=(x,n=64)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const sequence=x=>Number.isSafeInteger(x)&&x>=1&&x<=32;
const opaque=x=>typeof x==='string'&&/^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/.test(x);
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return Object.freeze(out);
}
function json(raw,max){
 if(typeof raw!=='string'||raw.length>max||Buffer.byteLength(raw)>max)fail();
 const parsed=JSON.parse(raw);if(JSON.stringify(parsed)!==raw)fail();return parsed;
}
function legacyRecord(value,at){
 const r=fields(value,['purpose','planHash','policy','armedAt','withdrawnAt']),p=parseCanaryRestorationPolicy(r.policy);
 if(r.purpose!==LEGACY||!hex(r.planHash)||hash(r.policy)!==r.planHash||!time(r.armedAt)||r.armedAt<p.startAt-600000||r.armedAt>=p.expiresAt||!time(r.withdrawnAt)||r.withdrawnAt<r.armedAt||r.withdrawnAt>at||p.expiresAt>at)fail();
 return r;
}
function parseCapsule(raw){
 const p=fields(json(raw,16384),['purpose','predecessor','trialId','grantId','eventId','closurePolicyHash','bundleHash','cancellationHistoryHash','startAt','expiresAt']);
 if(p.purpose!==CAPSULE||!hex(p.trialId)||!opaque(p.grantId)||!hex(p.eventId)||![p.closurePolicyHash,p.bundleHash,p.cancellationHistoryHash].every(x=>hex(x))||!time(p.startAt)||!time(p.expiresAt)||p.expiresAt<=p.startAt||p.expiresAt-p.startAt>600000)fail();
 let predecessor;
 if(p.predecessor?.kind==='legacy'){
  predecessor=fields(p.predecessor,['kind','control','trialId','grantId','eventId']);
  const v=json(predecessor.control,12288);legacyRecord(v,p.startAt);
  if(!hex(predecessor.trialId)||!opaque(predecessor.grantId)||!hex(predecessor.eventId)||['trialId','grantId','eventId'].some(k=>p[k]===predecessor[k]))fail();
 }else{
  predecessor=fields(p.predecessor,['kind','planHash','infoHash','sequence']);
  if(predecessor.kind!=='generation'||!hex(predecessor.planHash)||!hex(predecessor.infoHash)||!sequence(predecessor.sequence)||predecessor.sequence>=32)fail();
 }
 const canonical=Object.freeze({...p,predecessor});if(JSON.stringify(canonical)!==raw||predecessor.kind==='legacy'&&JSON.stringify(legacyRecord(JSON.parse(predecessor.control),p.startAt))!==predecessor.control)fail();return canonical;
}
/** Pure private input grammar, no storage, lineage or effect authority. */
export function parsePrivateQaGenerationCapsule(raw){return parseCapsule(raw);}
function execution(value){
 const p=fields(value,['purpose','runtimeVersionId','sourceRevision','context','authorizesEffects','operationalReadiness']);
 if(p.purpose!=='afw.qa-execution-pin.v1'||!uuid(p.runtimeVersionId)||!hex(p.sourceRevision,40)||p.context!=='durable_object'||p.authorizesEffects!==false||p.operationalReadiness!==false)fail();return p;
}
const planHash=raw=>hash('afw.qa-generation-plan.v2\n'+raw);
const infoHash=info=>hash(INFO+'\n'+JSON.stringify(info));
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const output=(status,record)=>Object.freeze({purpose:'afw.qa-generation-observation.v2',status,...record?{planHash:record.info.planHash,infoHash:record.infoHash,sequence:record.info.sequence,pendingAt:record.control.pendingAt,armedAt:record.control.armedAt,withdrawnAt:record.control.withdrawnAt}:{},authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
function createMetadataReader(raw,current){
 const target=planHash(raw);
   const pair=(h,iv,cv)=>{
    const at=current(),i=fields(iv,['purpose','sequence','planHash','capsule','execution','preparedAt']),p=parseCapsule(i.capsule),e=execution(i.execution),digest=infoHash({...i,execution:e});
    if(i.purpose!==INFO||!sequence(i.sequence)||!hex(i.planHash)||planHash(i.capsule)!==i.planHash||i.planHash!==h.planHash||digest!==h.infoHash||i.sequence!==h.sequence||!time(i.preparedAt)||i.preparedAt<p.startAt-600000||i.preparedAt>=p.expiresAt||i.preparedAt>at||i.sequence!==(p.predecessor.kind==='legacy'?1:p.predecessor.sequence+1))fail();
    const c=fields(cv,['purpose','planHash','infoHash','phase','pendingAt','armedAt','withdrawnAt']);
    if(c.purpose!==CONTROL||c.planHash!==i.planHash||c.infoHash!==digest||!['pending','armed','withdrawn'].includes(c.phase)||c.pendingAt!==i.preparedAt||c.armedAt!==null&&(!time(c.armedAt)||c.armedAt<c.pendingAt||c.armedAt>=p.expiresAt||c.armedAt>at)||c.withdrawnAt!==null&&(!time(c.withdrawnAt)||c.withdrawnAt<(c.armedAt??c.pendingAt)||c.withdrawnAt>at)||c.phase==='pending'&&(c.armedAt!==null||c.withdrawnAt!==null)||c.phase==='armed'&&(c.armedAt===null||c.withdrawnAt!==null)||c.phase==='withdrawn'&&c.withdrawnAt===null)fail();
    return {info:i,infoHash:digest,control:c,capsule:p,validatedExecution:e};
   };
   const head=value=>{
    const h=fields(value,['purpose','sequence','planHash','infoHash']);if(h.purpose!==HEAD||!sequence(h.sequence)||!hex(h.planHash)||!hex(h.infoHash))fail();return h;
   };

 return async t=>{
  const get=t?.get,list=t?.list;if(typeof get!=='function'||typeof list!=='function')fail();
  const methods=()=>{current();if(t.get!==get||t.list!==list)fail();};
  const read=async key=>{methods();const value=await Reflect.apply(get,t,[key]);methods();return value;};
     const exactPrefix=async(prefix,expected)=>{methods();const v=await Reflect.apply(list,t,[{prefix,limit:33}]);methods();if(!(v instanceof Map)||v.size!==expected.length||expected.some(key=>!v.has(prefix+key)))fail();};
     const lineage=async()=>{
      const value=await read(HEAD),ownInfo=await read(INFO+':'+target),ownControl=await read(CONTROL+':'+target);
      if(value===undefined){
       if(ownInfo!==undefined||ownControl!==undefined)fail();
       // No HEAD plus any V2 orphan is corruption, never a fresh legacy start.
       await exactPrefix(INFO+':',[]);await exactPrefix(CONTROL+':',[]);
       return {head:null,chain:[],target:null};
      }
      const top=head(value),chain=[];let h=top,child=null,legacyControlHash;
      for(let n=0;n<32;n++){
       const record=pair(h,await read(INFO+':'+h.planHash),await read(CONTROL+':'+h.planHash));chain.push(record);
       if(child&&(record.control.phase!=='withdrawn'||record.control.withdrawnAt>child.info.preparedAt||record.capsule.expiresAt>child.info.preparedAt))fail();
       const predecessor=record.capsule.predecessor;
       if(predecessor.kind==='legacy'){
        const at=record.info.preparedAt,actual=legacyRecord(await read(LEGACY),at),expected=legacyRecord(json(predecessor.control,12288),at);
        legacyControlHash=hash(JSON.stringify(actual));
        if(!same(actual,expected)||legacyControlHash!==hash(predecessor.control)||record.info.sequence!==1)fail();break;
       }
       child=record;h={purpose:HEAD,sequence:predecessor.sequence,planHash:predecessor.planHash,infoHash:predecessor.infoHash};
       if(n===31)fail();
      }
      const known=chain.map(r=>r.info.planHash);await exactPrefix(INFO+':',known);await exactPrefix(CONTROL+':',known);
      const found=chain.find(r=>r.info.planHash===target)??null;
      if(found){if(found.info.capsule!==raw||!same(ownInfo,found.info)||!same(ownControl,found.control))fail();}
      else if(ownInfo!==undefined||ownControl!==undefined)fail();
      return {head:top,chain,target:found,legacyControlHash};
     };

  return lineage();
 };
}

/** Private, primary metadata facts only. Reuses the single bounded lineage
 * validator; this commitment excludes legacy effect journals/physical history. */
export async function readPrivateQaStoredGenerationSnapshot(options){
 const keys=['storage','generationPlanHash','current'],pinned=fields(options,keys);
 const {storage,generationPlanHash,current}=pinned,transaction=storage?.transaction;
 if(typeof transaction!=='function'||!hex(generationPlanHash)||typeof current!=='function')fail();
 const checked=()=>{
  current();const value=fields(options,keys);
  if(keys.some(k=>value[k]!==pinned[k])||storage.transaction!==transaction)fail();
 };
 checked();
 const result=await Reflect.apply(transaction,storage,[async t=>{
  const get=t?.get,list=t?.list;if(typeof get!=='function'||typeof list!=='function')fail();
  const methods=()=>{checked();if(t.get!==get||t.list!==list)fail();};
  methods();const bootstrap=await Reflect.apply(get,t,[INFO+':'+generationPlanHash]);methods();
  const info=fields(bootstrap,['purpose','sequence','planHash','capsule','execution','preparedAt']),raw=info.capsule;
  parseCapsule(raw);if(info.planHash!==generationPlanHash||planHash(raw)!==generationPlanHash)fail();
  methods();const state=await createMetadataReader(raw,methods)(t);methods();
  const r=state.target;if(!r||!state.head||!hex(state.legacyControlHash))fail();
  // Fixed canonical order: HEAD toward legacy, every INFO hash and CONTROL.
  const commitment={generationPlanHash,head:state.head,chain:state.chain.map(row=>({infoHash:row.infoHash,control:row.control})),legacyControlHash:state.legacyControlHash};
  const coherenceHash=hash('afw.qa-stored-generation-coherence.v1\n'+JSON.stringify(commitment));
  const target=Object.freeze({planHash:r.info.planHash,infoHash:r.infoHash,sequence:r.info.sequence,phase:r.control.phase,pendingAt:r.control.pendingAt,armedAt:r.control.armedAt,withdrawnAt:r.control.withdrawnAt});
  const snapshot=Object.freeze({purpose:'afw.qa-stored-generation-snapshot.v1',capsule:r.info.capsule,target,head:Object.freeze({...state.head}),storedExecution:Object.freeze({...r.validatedExecution}),coherenceHash});
  methods();return snapshot;
 }]);
 checked();return result;
}

/** Metadata only. Host must fix the actor, prove native execution/module/config,
 * implement primary D1 eligibility, fence legacy effects and own independent
 * cleanup. An armed row is neither authorization nor guard liveness. */
export function createPrivateQaGenerationLedger(options){
 const keys=['storage','capsule','executionPin','checkEligibility','now','timeoutMs'],pinned=fields(options,keys);
 const {storage,capsule:raw,executionPin:pin,checkEligibility,now,timeoutMs}=pinned;
 const capsule=parseCapsule(raw),target=planHash(raw),transaction=storage?.transaction;
 const pinMethods=fields(pin,['assertCurrent','snapshot']),assertPin=pinMethods.assertCurrent,snapshotPin=pinMethods.snapshot;
 if(typeof transaction!=='function'||typeof assertPin!=='function'||typeof snapshotPin!=='function'||typeof checkEligibility!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 Reflect.apply(assertPin,pin,[]);const selected=execution(Reflect.apply(snapshotPin,pin,[]));
 const currentPin=()=>{
  const current=fields(options,keys);if(keys.some(k=>current[k]!==pinned[k])||storage.transaction!==transaction)fail();
  const methods=fields(pin,['assertCurrent','snapshot']);if(methods.assertCurrent!==assertPin||methods.snapshot!==snapshotPin)fail();
  Reflect.apply(assertPin,pin,[]);if(!same(execution(Reflect.apply(snapshotPin,pin,[])),selected))fail();
 };
 async function invoke(kind,args){
  if(args.length)return output('blocked');
  let writeIssued=false,finished=false,timer,finalCurrent=()=>{fail();};const mono=performance.now();
  const work=async()=>{try{
   const entered=now();if(!time(entered)||!Number.isFinite(mono)||mono<0||entered+timeoutMs>8640000000000000)fail();
   let lastWall=entered,lastMono=mono;
   const current=()=>{
    const w=now(),m=performance.now();if(finished||!time(w)||w<lastWall||w>=entered+timeoutMs||!Number.isFinite(m)||m<lastMono||m>=mono+timeoutMs)fail();
    currentPin();lastWall=w;lastMono=m;return w;
   };
   const window=()=>{const w=current();if(w<capsule.startAt-600000||w>=capsule.expiresAt)fail();return w;};
   finalCurrent=kind==='arm'?window:kind==='readArmed'?()=>{const at=current();if(at<capsule.startAt||at>=capsule.expiresAt)fail();return at;}:current;
   const readMetadata=createMetadataReader(raw,current);
   const tx=async fn=>{
    current();const result=await Reflect.apply(transaction,storage,[async t=>{
     const get=t?.get,put=t?.put,list=t?.list;if([get,put,list].some(x=>typeof x!=='function'))fail();
     const methods=()=>{current();if(t.get!==get||t.put!==put||t.list!==list)fail();};
     const read=async key=>{methods();const v=await Reflect.apply(get,t,[key]);methods();return v;};
     const write=async(key,value)=>{methods();writeIssued=true;await Reflect.apply(put,t,[key,value]);methods();};
     const lineage=()=>readMetadata(t);
     const context={read,write,lineage};methods();const value=await fn(context);methods();return value;
    }]);current();return result;
   };
   const observe=async()=>tx(async({lineage})=>{
    const state=await lineage(),r=state.target;
    if(!r)return output('absent');
    if(kind==='readArmed'&&(state.head.planHash!==target||r.control.phase!=='armed'||current()<capsule.startAt||current()>=capsule.expiresAt||!same(r.info.execution,selected)))fail();
    return output(r.control.phase,r);
   });
   current();
   if(kind==='status'||kind==='readArmed')return await observe();
   if(kind==='withdraw')return await tx(async({lineage,write})=>{
    const r=(await lineage()).target;if(!r)return output('absent');
    if(r.control.phase==='withdrawn')return output('already_withdrawn',r);
    const control={...r.control,phase:'withdrawn',withdrawnAt:current()};await write(CONTROL+':'+target,control);return output('withdrawn',{...r,control});
   });
   window();if(await checkEligibility()!==true)fail();window();
   const prepared=await tx(async({lineage,read,write})=>{
    window();const state=await lineage();if(state.target)fail();let nextSequence;
    if(capsule.predecessor.kind==='legacy'){
     if(state.head!==null)fail();
     const actual=legacyRecord(await read(LEGACY),current()),expected=legacyRecord(json(capsule.predecessor.control,12288),current());if(!same(actual,expected))fail();nextSequence=1;
    }else{
     const prior=state.chain[0],e=capsule.predecessor;
     if(!prior||state.head.planHash!==e.planHash||state.head.infoHash!==e.infoHash||state.head.sequence!==e.sequence||prior.control.phase!=='withdrawn'||prior.capsule.expiresAt>current())fail();
     for(const row of state.chain){
      if(['trialId','grantId','eventId'].some(k=>capsule[k]===row.capsule[k]))fail();
      if(row.capsule.predecessor.kind==='legacy'&&['trialId','grantId','eventId'].some(k=>capsule[k]===row.capsule.predecessor[k]))fail();
     }
     nextSequence=e.sequence+1;
    }
    const preparedAt=window(),info={purpose:INFO,sequence:nextSequence,planHash:target,capsule:raw,execution:selected,preparedAt},digest=infoHash(info);
    const control={purpose:CONTROL,planHash:target,infoHash:digest,phase:'pending',pendingAt:preparedAt,armedAt:null,withdrawnAt:null},h={purpose:HEAD,sequence:nextSequence,planHash:target,infoHash:digest};
    await write(INFO+':'+target,info);await write(CONTROL+':'+target,control);await write(HEAD,h);return {info,infoHash:digest,control,capsule};
   });
   window();if(await checkEligibility()!==true)fail();window();
   return await tx(async({lineage,write})=>{
    window();const state=await lineage(),r=state.target;if(!r||state.head.planHash!==target||!same(r.info,prepared.info)||!same(r.control,prepared.control)||r.control.phase!=='pending'||!same(r.info.execution,selected))fail();
    const control={...r.control,phase:'armed',armedAt:window()};await write(CONTROL+':'+target,control);return output('armed',{...r,control});
   });
  }catch{return output(writeIssued?'uncertain':'blocked');}};
  const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(output(writeIssued?'uncertain':'blocked'));},Math.max(1,timeoutMs-(performance.now()-mono)));});
  try{const result=await Promise.race([work(),deadline]);finalCurrent();return result;}catch{return output(writeIssued?'uncertain':'blocked');}finally{finished=true;clearTimeout(timer);}
 }
 return Object.freeze({arm(...args){return invoke('arm',args);},readArmed(...args){return invoke('readArmed',args);},status(...args){return invoke('status',args);},withdraw(...args){return invoke('withdraw',args);}});
}

/** Read-only resolution of STORED metadata, not the execution's identity.
 * ARM still requires root's correlated UUID. Consumers must separately compare
 * compiled revision, live native UUID/context, HEAD/window and effect authority. */
export function createPrivateQaGenerationObserver(options){
 const keys=['storage','capsule','now','timeoutMs'],pinned=fields(options,keys),{storage,capsule:raw,now,timeoutMs}=pinned;
 const capsule=parseCapsule(raw),target=planHash(raw),transaction=storage?.transaction;
 if(typeof transaction!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 const out=(status,state,at)=>{const r=state?.target;return Object.freeze({purpose:'afw.qa-generation-resolution.v2',status,isHead:!!r&&state.head.planHash===target,withinWindow:!!r&&at>=capsule.startAt&&at<capsule.expiresAt,...r?{planHash:r.info.planHash,infoHash:r.infoHash,sequence:r.info.sequence,pendingAt:r.control.pendingAt,armedAt:r.control.armedAt,withdrawnAt:r.control.withdrawnAt,runtimeVersionId:r.info.execution.runtimeVersionId,sourceRevision:r.info.execution.sourceRevision,storedContext:r.info.execution.context}:{},authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});};
 async function read(args){
  if(args.length)return out('blocked');
  let finished=false,timer,enteredWall,lastWall=-1,lastMono=-1;const mono=performance.now();
  const current=()=>{
   const at=now(),m=performance.now();if(finished||!time(enteredWall)||!time(at)||at<lastWall||at>=enteredWall+timeoutMs||!Number.isFinite(m)||m<mono||m<lastMono||m>=mono+timeoutMs)fail();
   const current=fields(options,keys);if(keys.some(k=>current[k]!==pinned[k])||storage.transaction!==transaction)fail();lastWall=at;lastMono=m;return at;
  };
  const work=async()=>{try{
   enteredWall=now();if(!time(enteredWall)||enteredWall+timeoutMs>8640000000000000||!Number.isFinite(mono)||mono<0)fail();lastWall=enteredWall;lastMono=mono;current();
   const readMetadata=createMetadataReader(raw,current);
   const state=await Reflect.apply(transaction,storage,[t=>readMetadata(t)]),at=current();
   return out(state.target?.control.phase??'absent',state,at);
  }catch{return out('blocked');}};
  const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(out('blocked'));},Math.max(1,timeoutMs-(performance.now()-mono)));});
  try{const result=await Promise.race([work(),deadline]),at=current();if(result.planHash&&result.withinWindow!==(at>=capsule.startAt&&at<capsule.expiresAt))return out('blocked');return result;}catch{return out('blocked');}finally{finished=true;clearTimeout(timer);}
 }
 return Object.freeze({read(...args){return read(args);}});
}
