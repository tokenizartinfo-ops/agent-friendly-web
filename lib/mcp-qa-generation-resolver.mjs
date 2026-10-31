import {createHash} from 'node:crypto';
import {parsePrivateQaGenerationCapsule} from './mcp-qa-generation-ledger.mjs';
import {createPrivateQaGenerationObserver} from './mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
const compiledRevision=typeof globalThis.__AFW_QA_SOURCE_REVISION__==='string'?globalThis.__AFW_QA_SOURCE_REVISION__:'';
const HEAD='afw.qa-generation-head.v2',INFO='afw.qa-generation-info.v2:',SLOT='afw-own-successor-closure-v1',PURPOSE='afw.qa-generation-resolution.v2';
const RETAINED='afw.qa-retained-generation-resolution.v2';
const fail=()=>{throw Error('Private QA generation resolution unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const blocked=(purpose=PURPOSE)=>JSON.stringify({purpose,status:'blocked',isHead:false,withinWindow:false,authorizesEffects:false,guardLivenessVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,k){if(!v||typeof v!=='object')fail();const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;}
function fields(v,keys){if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));}
const receiptKeys=['purpose','status','isHead','withinWindow','planHash','infoHash','sequence','pendingAt','armedAt','withdrawnAt','runtimeVersionId','sourceRevision','storedContext','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'];
/** Mounted read-only prerequisite, never effect authority or ARM provenance.
 * The expected GENERATION capsule hash only narrows primary HEAD. It is NOT
 * the named Workflow payload's SHA(bundle). The host fixes that correlation.
 * readRetained selects current retained metadata with a DISTINCT purpose and
 * may report pending/withdrawn/outside nominal. It grants no cleanup effects,
 * policy window extension, storage write, D1, provider or credential surface. */
export function createPrivateQaGenerationResolver(options){
 const keys=['env','ctx','sourceRevision','now','timeoutMs'],pinned=fields(options,keys),{env,ctx,sourceRevision,now,timeoutMs}=pinned;
 if(!env||typeof env!=='object'||!ctx||typeof ctx!=='object'||!hex(sourceRevision,40)||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 async function read(args,retained){
  const purpose=retained?RETAINED:PURPOSE,bad=()=>blocked(purpose);
  if(args.length!==1||!hex(args[0]))return bad();
  const expectedGenerationPlanHash=args[0];let finished=false,timer,selectedWindow;
  try{
   const entered=now(),origin=performance.now();let lastWall=entered,lastMono=origin;
   if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();
   const storage=ctx.storage,transaction=storage?.transaction,id=ctx.id,idString=id?.toString,self=data(env,'AFW_INDEPENDENT_CLOSURE'),select=self?.idFromName,metadata=data(env,'AFW_QA_VERSION'),nativeVersion=data(metadata,'id');
   if(typeof transaction!=='function'||typeof idString!=='function'||typeof select!=='function')fail();
   const actorId=Reflect.apply(idString,id,[]);if(!hex(actorId))fail();
   let executionPin;
   const current=()=>{
    const at=now(),mono=performance.now();if(finished||!time(at)||at<lastWall||at>=entered+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs)fail();
    const value=fields(options,keys);if(keys.some(k=>value[k]!==pinned[k])||ctx.storage!==storage||storage.transaction!==transaction||ctx.id!==id||id.toString!==idString||data(env,'AFW_INDEPENDENT_CLOSURE')!==self||self.idFromName!==select||data(env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==nativeVersion||Reflect.apply(idString,id,[])!==actorId||Reflect.apply(select,self,[SLOT]).toString()!==actorId)fail();
    executionPin?.assertCurrent();lastWall=at;lastMono=mono;return at;
   };
   const work=async()=>{try{
    current();
    const bootstrap=await Reflect.apply(transaction,storage,[async t=>{
     const get=t?.get;if(typeof get!=='function')fail();
     const checked=()=>{current();if(t.get!==get)fail();};
     checked();const rawHead=await Reflect.apply(get,t,[HEAD]);checked();
     const head=fields(rawHead,['purpose','sequence','planHash','infoHash']);
     if(head.purpose!==HEAD||!Number.isSafeInteger(head.sequence)||head.sequence<1||head.sequence>32||head.planHash!==expectedGenerationPlanHash||!hex(head.infoHash))fail();
     const rawInfo=await Reflect.apply(get,t,[INFO+head.planHash]);checked();
     const info=fields(rawInfo,['purpose','sequence','planHash','capsule','execution','preparedAt']),capsule=info.capsule;
     if(info.purpose!=='afw.qa-generation-info.v2'||info.sequence!==head.sequence||info.planHash!==head.planHash||typeof capsule!=='string'||capsule.length>16384||Buffer.byteLength(capsule)>16384||createHash('sha256').update('afw.qa-generation-plan.v2\n'+capsule).digest('hex')!==head.planHash)fail();
     selectedWindow=parsePrivateQaGenerationCapsule(capsule);return {head,capsule};
    }]);current();
    const remaining=Math.floor(Math.min(entered+timeoutMs-lastWall,origin+timeoutMs-lastMono));if(remaining<1)fail();
    const observer=createPrivateQaGenerationObserver({storage,capsule:bootstrap.capsule,now:current,timeoutMs:remaining});
    const observed=await observer.read();current();
    const r=fields(observed,receiptKeys);
    if(r.purpose!==PURPOSE||!(retained?['pending','armed','withdrawn'].includes(r.status):r.status==='armed'&&r.withinWindow===true)||typeof r.withinWindow!=='boolean'||r.isHead!==true||r.planHash!==bootstrap.head.planHash||r.infoHash!==bootstrap.head.infoHash||r.sequence!==bootstrap.head.sequence||r.storedContext!=='durable_object'||r.sourceRevision!==sourceRevision||r.runtimeVersionId!==nativeVersion||['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'].some(k=>r[k]!==false))fail();
    executionPin=createPrivateQaExecutionPin({env,expectedVersionId:r.runtimeVersionId,sourceRevision,context:'durable_object'});current();
    const raw=JSON.stringify({...r,purpose});if(Buffer.byteLength(raw)>2048)fail();current();return raw;
   }catch{return bad();}};
   const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(bad());},Math.max(1,timeoutMs-(performance.now()-origin)));});
   const result=await Promise.race([deadline,work()]),at=current();
   const settled=JSON.parse(result);if(settled.status!=='blocked'&&(!selectedWindow||settled.withinWindow!==(at>=selectedWindow.startAt&&at<selectedWindow.expiresAt)))fail();return result;
  }catch{return bad();}finally{finished=true;clearTimeout(timer);}
 }
 return Object.freeze({read(...args){return read(args,false);},readRetained(...args){return read(args,true);}});
}
/** Production entrypoint fixes source at build time; no caller identity fields. */
export async function readPrivateQaCurrentGeneration({env,ctx,args}){
 try{return await createPrivateQaGenerationResolver({env,ctx,sourceRevision:compiledRevision,now:Date.now,timeoutMs:5000}).read(...args);}catch{return blocked();}
}

/** Private retained metadata only. Never a nominal/cleanup effect capability. */
export async function readPrivateQaRetainedGeneration({env,ctx,args}){
 try{return await createPrivateQaGenerationResolver({env,ctx,sourceRevision:compiledRevision,now:Date.now,timeoutMs:5000}).readRetained(...args);}catch{return blocked(RETAINED);}
}
