import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshotUnderCoordinator} from './mcp-qa-finite-trial-control.mjs';
import {readPrivateQaFiniteLaunchMaterial} from './mcp-qa-finite-launch-source.mjs';
import {readFiniteAfwWorkflowInventory,consumePrivateFiniteLaunchInventory,AFW_FIXED_WORKFLOWS} from './mcp-fixed-terminal-workflows.mjs';
import {finiteFields as fields,finiteData as data,finiteSame as same,finiteTime as time} from './mcp-finite-evidence.mjs';
const fail=()=>{throw Error('Finite launch inventory unavailable');};
const contexts=new WeakMap(),coordinators=new WeakMap(),observations=new WeakMap();
/** Fixed parser lookup only. No caller can mint this invocation token. */
export function readPrivateFiniteLaunchObservation(token){
 const record=observations.get(token);if(!record||record.consumed)fail();record.check();record.consumed=true;return record.value;
}
const unavailable=()=>Object.freeze({kind:'unavailable',authorizesEffects:false,operationalReadiness:false});
/** INTERNAL operation entry only: create BEFORE source hydration. All later
 * helpers retain this exact absolute parent and signal; no fresh five seconds. */
export function createPrivateQaFiniteLaunchParent({now=Date.now,deadline}={}){
 if(typeof now!=='function')fail();const entered=now(),mono=performance.now(),controller=new AbortController();
 if(!time(entered)||!time(deadline))fail();const end=Math.min(deadline,entered+5000);let last=entered,lastMono=mono;
 const check=()=>{
  const at=now(),m=performance.now();
  if(controller.signal.aborted||!time(at)||at<last||!Number.isFinite(m)||m<lastMono||at>=end||m-mono>=end-entered){controller.abort();fail();}
  last=at;lastMono=m;return at;
 };check();return Object.freeze({check,signal:controller.signal,deadline:end});
}
function budget(parent){
 const p=fields(parent,['check','signal','deadline']);
 if(typeof p.check!=='function'||!(p.signal instanceof AbortSignal)||!time(p.deadline))fail();
 const check=()=>{if(['check','signal','deadline'].some(k=>parent[k]!==p[k])||p.signal.aborted)fail();const at=p.check();if(!time(at)||at>=p.deadline)fail();return at;};
 if(p.deadline-check()>5000)fail();return check;
}
async function bounded(parent,operation){
 const checkParent=budget(parent);let active=true,timer,abort;
 const check=()=>{if(!active)fail();return checkParent();};
 try{
  const result=await Promise.race([
   Promise.resolve().then(()=>{check();return operation(check);}),
   new Promise((_,reject)=>{
    const stop=()=>{active=false;reject(Error('Finite launch inventory unavailable'));};
    abort=stop;parent.signal.addEventListener('abort',abort,{once:true});
    timer=setTimeout(stop,parent.deadline-check());
   })
  ]);check();return result;
 }finally{active=false;clearTimeout(timer);if(abort)parent.signal.removeEventListener('abort',abort);}
}
async function retain({ctx,env,context,parent}){
 const check=budget(parent);check();
 const value=await bounded(parent,()=>readPrivateQaFiniteLaunchMaterial({ctx,env,context,parent}));check();
 const m=fields(value,['ctx','env','plan','request','execution']);
 if(m.ctx!==ctx||m.env!==env||typeof m.plan!=='string'||typeof m.request!=='function')fail();
 const existing=contexts.get(context);
 if(existing){if(existing.ctx!==ctx||existing.env!==env||existing.parent!==parent||['plan','request','execution'].some(k=>existing.material[k]!==m[k]))fail();return existing;}
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:m.execution.sourceRevision});check();
 const kept={ctx,env,storage:ctx.storage,parent,material:m,execution:data(m.execution),nativePin,witnessedUnspent:false};contexts.set(context,kept);return kept;
}
/** INTERNAL shared actor coordinator. Task2 must route EVERY SEND transition
 * through this function and use check before/after every await. No RPC mount.
 * Queue timeout cannot release a predecessor's slot or grant a new budget.
 * Caller expiry fences authority but does not cancel issued work: the slot
 * remains occupied until the actual callback settles, even after caller failure. */
export async function withPrivateQaFiniteLaunchCoordinator(options,operation){
 const o=fields(options,['ctx','env','context','parent']),{ctx,env,context,parent}=o;
 if(typeof operation!=='function')fail();
 const kept=await retain({ctx,env,context,parent});budget(parent)();
 const previous=coordinators.get(ctx)??Promise.resolve();let release,work;
 const gate=new Promise(resolve=>{release=resolve;});
 const tail=previous.catch(()=>{}).then(()=>gate);coordinators.set(ctx,tail);
 const releaseSlot=()=>{release();if(coordinators.get(ctx)===tail)void tail.then(()=>{if(coordinators.get(ctx)===tail)coordinators.delete(ctx);});};
 try{
  await bounded(parent,()=>previous);
  return await bounded(parent,check=>{
   work=(async()=>{
    if(kept.storage!==ctx.storage||!same(kept.execution,kept.material.execution))fail();check();
    return operation(check);
   })();
   return work;
  });
 }finally{
  // Observe both outcomes without delaying the bounded caller or releasing on
  // its timeout. A callback that never settles deliberately keeps the actor held.
  if(work)void work.then(releaseSlot,releaseSlot);else releaseSlot();
 }
}
/** Source-only construction; caller shapes never resolve the private C2 token.
 * Full enumeration and the synchronous consumer are fixed imports, not callbacks.
 * The returned result is facts only; it cannot be replayed into a public validator. */
export async function createPrivateQaFiniteLaunchInventory(options){
 let kept;
 try{
  const o=fields(options,['ctx','env','context','parent']);kept=await retain(o);
 }catch{return Object.freeze({observeBeforeCreation:async()=>unavailable()});}
 const {ctx,env,parent,material:m,nativePin}=kept,context=options.context,storage=ctx.storage;
 return Object.freeze({async observeBeforeCreation(...args){
  if(args.length)return unavailable();
  try{return await withPrivateQaFiniteLaunchCoordinator({ctx,env,context,parent},async check=>{
   const snapshot=async()=>{check();if(ctx.storage!==storage)fail();const s=await readPrivateQaFiniteControlSnapshotUnderCoordinator({storage,nativePin,plan:m.plan,parent});check();return s;};
   const before=await snapshot();
   // Pending/armed without a prepared receipt is accepted only after this SAME
   // invocation actually observed the unspent head. Reconstruction cannot adopt it.
   if(before.state&&!before.prepared&&!before.send&&!kept.witnessedUnspent)fail();
   const read=async(path,query)=>{
    check();const allowed=path==='/workflows'||AFW_FIXED_WORKFLOWS.some(s=>path==='/workflows/'+s.name||path==='/workflows/'+s.name+'/instances');
    if(!allowed)fail();
    const response=await m.request({method:'GET',path,query,signal:parent.signal},check);check();
    if(response?.status!==200||response.success!==true||!Array.isArray(response.errors)||response.errors.length||!Object.hasOwn(response,'result'))fail();
    return {value:response.result,info:response.result_info};
   };
   const inventory=await readFiniteAfwWorkflowInventory({read,assertCurrent:check});check();
   const after=await snapshot();
   if(!same(before,after))fail();
   // Deliberately no await between this consumption and releasing the coordinator.
   if(!same(kept.execution,m.execution))fail();
   const token=Object.freeze({});
   observations.set(token,{value:{inventory,snapshot:after,execution:kept.execution,observedAt:check()},check,consumed:false});
   try{
    const observation=consumePrivateFiniteLaunchInventory(token);
    if(!after.state)kept.witnessedUnspent=true;
    return data({...observation,authorizesEffects:false,operationalReadiness:false});
   }finally{observations.delete(token);}
  });}catch{return unavailable();}
 }});
}
