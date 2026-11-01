import {readPrivateQaStoredGenerationSnapshot,parsePrivateQaGenerationCapsule} from './mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from './mcp-qa-execution-identity.mjs';
const PURPOSE='afw.qa-stored-generation-selection.v1',SLOT='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Private QA stored generation unavailable');};
const hex=(v,n=64)=>typeof v==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(v);
const time=v=>Number.isSafeInteger(v)&&v>=0&&v<=8640000000000000;
const blocked=()=>Object.freeze({purpose:PURPOSE,status:'blocked',isHead:false,withinWindow:false,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
function data(v,k){
 if(!v||typeof v!=='object')fail();
 const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return d.value;
}
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 return Object.freeze(Object.fromEntries(keys.map(k=>[k,data(v,k)])));
}
// Native methods can reside on prototypes; never invoke an accessor to obtain one.
function method(v,k){
 for(let p=v,n=0;p&&n<32;p=Object.getPrototypeOf(p),n++){
  const d=Object.getOwnPropertyDescriptor(p,k);if(d){if(!Object.hasOwn(d,'value')||typeof d.value!=='function')fail();return d.value;}
 }
 fail();
}
const abortedGetter=Object.getOwnPropertyDescriptor(AbortSignal.prototype,'aborted').get;
const addListener=EventTarget.prototype.addEventListener,removeListener=EventTarget.prototype.removeEventListener;
const aborted=signal=>signal!==undefined&&Reflect.apply(abortedGetter,signal,[]);
const segment=(p,at)=>at<p.startAt?'BEFORE':at<p.expiresAt?'WITHIN':'AFTER';
/** Unmounted private facts. Native identity checks prove local coherence only;
 * callers must supply remaining ORIGINAL budget and parent-fenced now. */
export function createPrivateQaStoredGenerationReader(options){
 const keys=['env','ctx','sourceRevision','now','timeoutMs'],pinned=fields(options,keys);
 const {env,ctx,sourceRevision,now,timeoutMs}=pinned;
 if(!env||typeof env!=='object'||!ctx||typeof ctx!=='object'||!hex(sourceRevision,40)||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 async function read(args){
  let finished=false,timer,onAbort,parentSignal;
  try{
   if(args.length!==2||!hex(args[0]))fail();
   const generationPlanHash=args[0];parentSignal=args[1];
   // The native getter performs a brand check, rejecting duck-typed signals.
   if(aborted(parentSignal))fail();
   const entered=now(),origin=performance.now();let lastWall=entered,lastMono=origin;
   if(!time(entered)||entered+timeoutMs>8640000000000000||!Number.isFinite(origin)||origin<0)fail();
   const storage=data(ctx,'storage'),transaction=method(storage,'transaction'),id=data(ctx,'id'),idString=method(id,'toString');
   const self=data(env,'AFW_INDEPENDENT_CLOSURE'),select=method(self,'idFromName'),metadata=data(env,'AFW_QA_VERSION'),nativeVersion=data(metadata,'id');
   const actorId=Reflect.apply(idString,id,[]);if(!hex(actorId))fail();
   const executionPin=createPrivateQaExecutionPin({env,expectedVersionId:nativeVersion,sourceRevision,context:'durable_object'});
   const readerExecution=executionPin.snapshot();
   const current=()=>{
    const at=now(),mono=performance.now();
    if(finished||aborted(parentSignal)||!time(at)||at<lastWall||at>=entered+timeoutMs||!Number.isFinite(mono)||mono<lastMono||mono>=origin+timeoutMs)fail();
    const value=fields(options,keys);
    if(keys.some(k=>value[k]!==pinned[k])||data(ctx,'storage')!==storage||method(storage,'transaction')!==transaction||data(ctx,'id')!==id||method(id,'toString')!==idString||data(env,'AFW_INDEPENDENT_CLOSURE')!==self||method(self,'idFromName')!==select||data(env,'AFW_QA_VERSION')!==metadata||data(metadata,'id')!==nativeVersion||Reflect.apply(idString,id,[])!==actorId)fail();
    const selectedId=Reflect.apply(select,self,[SLOT]);
    if(Reflect.apply(method(selectedId,'toString'),selectedId,[])!==actorId)fail();
    executionPin.assertCurrent();lastWall=at;lastMono=mono;return at;
   };
   let selectedWindow,selectedSegment;
   const stable=()=>{
    const at=current();
    if(selectedWindow&&segment(selectedWindow,at)!==selectedSegment)fail();
    return at;
   };
   current(); // All native/current pins established before any primary await.
   const work=async()=>{try{
    const first=await readPrivateQaStoredGenerationSnapshot({storage,generationPlanHash,current:stable});
    const at=lastWall;selectedWindow=parsePrivateQaGenerationCapsule(first.capsule);selectedSegment=segment(selectedWindow,at);stable();
    const second=await readPrivateQaStoredGenerationSnapshot({storage,generationPlanHash,current:stable});
    const observedAt=stable();
    if(JSON.stringify(first)!==JSON.stringify(second))fail();
    const result=Object.freeze({purpose:PURPOSE,status:'selected',capsule:second.capsule,target:second.target,head:second.head,coherenceHash:second.coherenceHash,isHead:second.target.planHash===second.head.planHash,withinWindow:selectedSegment==='WITHIN',observedAt,storedExecution:second.storedExecution,readerExecution,authorizesEffects:false,guardLivenessVerified:false,nativeWithdrawalVerified:false,operationalReadiness:false,mayRetry:false});
    if(Buffer.byteLength(JSON.stringify(result),'utf8')>24576)fail();
    stable();return result;
   }catch{return blocked();}};
   const deadline=new Promise(resolve=>{timer=setTimeout(()=>{finished=true;resolve(blocked());},Math.max(1,timeoutMs-(performance.now()-origin)));});
   const cancelled=new Promise(resolve=>{
    if(parentSignal!==undefined){
     onAbort=()=>{finished=true;resolve(blocked());};
     Reflect.apply(addListener,parentSignal,['abort',onAbort,{once:true}]);
     if(aborted(parentSignal))onAbort();
    }
   });
   const result=await Promise.race([deadline,cancelled,work()]);
   stable();return result;
  }catch{return blocked();}
  finally{
   finished=true;clearTimeout(timer);
   if(onAbort)Reflect.apply(removeListener,parentSignal,['abort',onAbort]);
  }
 }
 return Object.freeze({read(...args){return read(args);}});
}
