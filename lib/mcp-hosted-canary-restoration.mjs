import {createHash} from 'node:crypto';
import {parseCanaryRestorationPolicy} from './mcp-canary-restoration-policy.mjs';
import {createSuccessorRetirementHandoff} from './mcp-successor-retirement-handoff.mjs';
import {createSuccessorCanaryRestorer} from './mcp-successor-canary-restorer.mjs';
import {createCanaryRestorationTransport} from './mcp-canary-restoration-transport.mjs';
import {createRetirementProviderReader} from './mcp-retirement-provider-reader.mjs';
import {RELEASE_TARGET} from './mcp-release-operator-policy.mjs';
const SLOT='afw-own-successor-closure-v1',ORIGINAL='afw-own-event-first-successor-v1',KEY='afw.canary-restoration-control.v1';
const fail=()=>{throw Error('Private canary restoration unavailable');};
const hash=x=>createHash('sha256').update(x).digest('hex');
const sha=x=>typeof x==='string'&&/^[a-f0-9]{64}$/.test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const out=(status,extra={})=>Object.freeze({status,mayRetry:false,mayStartSuccessor:false,mayRestoreAdministration:false,nativeWithdrawalVerified:false,operationalReadiness:false,apiCancellationSupported:false,...extra});
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const r={};for(const k of keys){const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();r[k]=d.value;}return Object.freeze(r);
}
// RPC adds a native, non-enumerable disposer to otherwise plain data.
// Snapshot only data descriptors, reject other symbols/accessors, then release
// the borrowed RPC result. Downstream evidence keeps its exact field grammar.
function rpcData(value){
 let dispose;
 try{
  if(!value||Object.getPrototypeOf(value)!==Object.prototype)fail();
  const descriptors=Object.getOwnPropertyDescriptors(value),native=descriptors[Symbol.dispose];
  if(native){if(!Object.hasOwn(native,'value')||typeof native.value!=='function'||native.enumerable)fail();dispose=native.value;}
  const entries=[];
  for(const key of Reflect.ownKeys(descriptors)){
   if(key===Symbol.dispose)continue;
   const d=descriptors[key];if(typeof key!=='string'||!d.enumerable||!Object.hasOwn(d,'value'))fail();
   entries.push([key,d.value]);
  }
  if(entries.length>32)fail();
  return structuredClone(Object.fromEntries(entries));
 }finally{if(dispose)Reflect.apply(dispose,value,[]);}
}
export function isPrivateCanaryRestorationActor(env,ctx){
 try{const n=env?.AFW_INDEPENDENT_CLOSURE;if(typeof n?.idFromName!=='function')return false;return n.idFromName(SLOT).toString()===ctx.id.toString();}catch{return true;}
}
/** Private actor only. No public route, credentials, grant mutation, native
 * unsubscribe, original stop or alarm. Control withdrawal never rolls back HTTP. */
export function createPrivateCanaryRestorationHost({env,ctx,fetchImpl=globalThis.fetch,now=Date.now}={}){
 if(!env||!ctx||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 const storage=ctx.storage,id=ctx.id,transaction=storage?.transaction;let withdrawn=false;const active=new Set();
 const stop=()=>{withdrawn=true;for(const c of active)c.abort();};
 async function invoke(kind,args){
  if(args.length!==1||!sha(args[0]))return out('blocked');
  const expectedHash=args[0],controller=new AbortController();let timer,finished=false,writeIssued=false,touched=false,tracked=false;
  try{
   const entryWall=now(),entryMono=performance.now();if(!time(entryWall)||!Number.isFinite(entryMono)||entryMono<0)fail();
   if(['arm','restore'].includes(kind)&&env.AFW_MCP_CLOSURE_ENABLED!=='true')fail();
   const self=env.AFW_INDEPENDENT_CLOSURE,selfMethod=self?.idFromName;
   if(typeof transaction!=='function'||typeof selfMethod!=='function'||!sha(id?.toString())||Reflect.apply(selfMethod,self,[SLOT]).toString()!==id.toString())fail();
   let raw,p,node,nodeName,nodeString,nodeGet,endWall=entryWall+(kind==='restore'?30000:5000),endMono=entryMono+(endWall-entryWall),lastW=entryWall,lastM=entryMono;
   const actor=()=>{
    if(ctx.storage!==storage||ctx.id!==id||storage.transaction!==transaction||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==selfMethod||Reflect.apply(selfMethod,self,[SLOT]).toString()!==id.toString())fail();
   };
   const scope=()=>{
    actor();if(withdrawn||env.AFW_MCP_CLOSURE_ENABLED!=='true'||env.AFW_MCP_CLOSURE_POLICY!==raw||env.AFW_MCP_CLOSURE_NODE!==node||
     node.idFromName!==nodeName||node.idFromString!==nodeString||node.get!==nodeGet||Reflect.apply(nodeName,node,[ORIGINAL]).toString()!==p.candidate.containerId||Reflect.apply(nodeString,node,[p.candidate.containerId]).toString()!==p.candidate.containerId)fail();
   };
   if(['arm','restore'].includes(kind)){
    raw=env.AFW_MCP_CLOSURE_POLICY;p=parseCanaryRestorationPolicy(raw);if(hash(raw)!==expectedHash||entryWall>=p.expiresAt||entryWall<p.startAt-(kind==='arm'?600000:0))fail();
    node=env.AFW_MCP_CLOSURE_NODE;nodeName=node?.idFromName;nodeString=node?.idFromString;nodeGet=node?.get;
    if([nodeName,nodeString,nodeGet].some(x=>typeof x!=='function'))fail();scope();
    endWall=Math.min(endWall,p.expiresAt);endMono=entryMono+(endWall-entryWall);
   }
   const current=()=>{
    const w=now(),m=performance.now();actor();
    if(finished||controller.signal.aborted||!time(w)||w<lastW||w>=endWall||!Number.isFinite(m)||m<lastM||m>=endMono)fail();
    if(['arm','restore'].includes(kind))scope();lastW=w;lastM=m;return w;
   };
   current();
   const record=value=>{
    const r=fields(value,['purpose','planHash','policy','armedAt','withdrawnAt']),q=parseCanaryRestorationPolicy(r.policy),at=current();
    if(r.purpose!==KEY||!sha(r.planHash)||hash(r.policy)!==r.planHash||
     r.armedAt===null&&r.withdrawnAt===null||r.armedAt!==null&&(!time(r.armedAt)||r.armedAt<q.startAt-600000||r.armedAt>=q.expiresAt||r.armedAt>at)||
     r.withdrawnAt!==null&&(!time(r.withdrawnAt)||r.withdrawnAt>at||r.armedAt!==null&&r.withdrawnAt<r.armedAt))fail();
    return r;
   };
   const tx=async fn=>{
    current();const value=await Reflect.apply(transaction,storage,[async t=>{
     current();if(typeof t?.get!=='function'||typeof t?.put!=='function')fail();
     const v=await t.get(KEY);current();return fn(t,v===undefined?null:record(v));
    }]);current();return value;
   };
   const read=()=>tx((_t,r)=>r);
   const receipt=(status,r)=>out(status,{planHash:r.planHash,armedAt:r.armedAt,withdrawnAt:r.withdrawnAt});
   const work=async()=>{
    if(kind==='arm')return tx(async(t,r)=>{
     if(r){if(r.planHash!==expectedHash||r.policy!==raw||r.withdrawnAt!==null)fail();return receipt('already_armed',r);}
     const at=current(),r2={purpose:KEY,planHash:expectedHash,policy:raw,armedAt:at,withdrawnAt:null};writeIssued=true;await t.put(KEY,r2);current();return receipt('armed',r2);
    });
    if(kind==='status'){
     const r=await read();if(!r||r.planHash!==expectedHash)fail();if(r.withdrawnAt!==null)stop();return receipt(r.withdrawnAt===null?'armed':'withdrawn',r);
    }
    if(kind==='withdraw')return tx(async(t,r)=>{
     if(r&&r.planHash!==expectedHash)fail();
     if(r?.withdrawnAt!==undefined&&r.withdrawnAt!==null){stop();return receipt('already_withdrawn',r);}
     let policy=r?.policy;
     if(!r){policy=env.AFW_MCP_CLOSURE_POLICY;parseCanaryRestorationPolicy(policy);if(hash(policy)!==expectedHash)fail();}
     const at=current(),r2={purpose:KEY,planHash:expectedHash,policy,armedAt:r?.armedAt??null,withdrawnAt:at};stop();writeIssued=true;await t.put(KEY,r2);current();return receipt('withdrawn',r2);
    });
    // Restoration composition follows below; only an armed primary row admits it.
    let cached;
    const fresh=async()=>{
     current();const r=await read();current();
     if(!r||r.planHash!==expectedHash||r.policy!==raw||r.armedAt===null||r.withdrawnAt!==null){if(r?.withdrawnAt!==null&&r?.withdrawnAt!==undefined)stop();fail();}
     cached=r;return r;
    };
    await fresh();current();tracked=true;active.add(controller);
    const readControl=()=>{try{current();return{enabled:!!cached&&cached.withdrawnAt===null&&cached.policy===raw,policy:raw};}catch{return{enabled:false,policy:raw};}};
    const credential=async name=>{await fresh();current();const value=env[name];current();return value;};
    const fetchGuarded=async(url,init={},assertComponent)=>{
     if(typeof assertComponent!=='function')fail();await fresh();current();const signal=init.signal?AbortSignal.any([init.signal,controller.signal]):controller.signal;
     assertComponent();current();if(signal.aborted)fail();
     const response=await fetchImpl(url,{...init,signal});try{await fresh();return response;}catch(error){try{if(response instanceof Response&&!response.body?.locked)Promise.resolve(response.body?.cancel()).catch(()=>{});}catch{}throw error;}
    };
    const privateStorage={transaction:async fn=>{
     await fresh();current();const value=await Reflect.apply(transaction,storage,[fn]);await fresh();return value;
    }};
    const remaining=()=>{current();return Math.max(1,Math.floor(endMono-lastM));};
    let assertCore=()=>{};
    const provider=createRetirementProviderReader({resources:{accountId:RELEASE_TARGET.accountId,applicationId:p.candidate.applicationId,containerId:p.candidate.containerId},readCredential:()=>credential('AFW_MCP_CLOSURE_READ_TOKEN'),fetchImpl:fetchGuarded,timeoutMs:Math.min(5000,remaining())});
    const handoff=createSuccessorRetirementHandoff({storage:privateStorage,original:p.candidate,now,timeoutMs:Math.min(5000,remaining()),
     readCustody:async(input,assertReader)=>{
      fields(input,['signal']);if(typeof assertReader!=='function')fail();await fresh();current();if(!(input.signal instanceof AbortSignal)||input.signal.aborted)fail();
      const original=Reflect.apply(nodeGet,node,[Reflect.apply(nodeString,node,[p.candidate.containerId])]);if(typeof original?.observeSuccessorRetired!=='function')fail();
      assertReader();current();if(input.signal.aborted||controller.signal.aborted)fail();
      const result=rpcData(await original.observeSuccessorRetired());await fresh();return result;
     },
     readInstance:async(input,assertReader)=>{if(typeof assertReader!=='function')fail();await fresh();current();const check=()=>{assertReader();assertCore();current();if(input.signal.aborted)fail();};check();const result=await provider({...input,signal:AbortSignal.any([input.signal,controller.signal])},check);await fresh();current();return result;}
    });
    touched=true;const capture=await handoff.capture();await fresh();
    if(!['recorded','already_recorded'].includes(capture.status))return out(capture.status==='uncertain'?'uncertain':'blocked',{planHash:expectedHash});
    const transport=createCanaryRestorationTransport({readControl,readReadCredential:()=>credential('AFW_MCP_CLOSURE_READ_TOKEN'),readPublishCredential:()=>credential('AFW_MCP_CLOSURE_PUBLISH_TOKEN'),fetchImpl:fetchGuarded,now,timeoutMs:Math.min(5000,remaining())});
    const result=await createSuccessorCanaryRestorer({storage:privateStorage,namespace:node,readControl,
     readHandoff:async(_input,assertReader)=>{if(typeof assertReader!=='function')fail();assertCore=assertReader;await fresh();current();assertCore();const value=await handoff.observe();await fresh();current();assertCore();return value;},
     request:transport,now,timeoutMs:Math.min(30000,remaining())}).advance();
    await fresh();current();return Object.freeze({...result,mayRestoreAdministration:false,privateHostOnly:true});
   };
   let rejectAbort;const cancelled=new Promise((_,reject)=>{rejectAbort=reject;});
   const onAbort=()=>rejectAbort(Error('Private canary restoration unavailable'));
   controller.signal.addEventListener('abort',onAbort,{once:true});
   try{
    const deadline=new Promise((_,reject)=>{timer=setTimeout(()=>{finished=true;controller.abort();reject(Error('Private canary restoration unavailable'));},Math.max(1,Math.floor(endMono-lastM)));});
    const value=await Promise.race([work(),deadline,cancelled]);current();return value;
   }finally{controller.signal.removeEventListener('abort',onAbort);}
  }catch{return out(writeIssued||touched?'uncertain':'blocked',{planHash:expectedHash});}
  finally{finished=true;clearTimeout(timer);if(tracked)active.delete(controller);controller.abort();}
 }
 return Object.freeze({arm:(...args)=>invoke('arm',args),restore:(...args)=>invoke('restore',args),withdraw:(...args)=>invoke('withdraw',args),status:(...args)=>invoke('status',args)});
}
/** Fixed native Workflow dispatch. No instance creation, arbitrary schedule,
 * new policy, consumer permission or cached-success freshness assumption. */
export async function runPrivateCanaryRestorationWorkflow({env,event,step,now=Date.now}={}){
 let touched=false;
 try{
  const entered=now();if(!time(entered)||typeof step?.do!=='function')fail();
  let payload=event?.payload;if(typeof payload==='string'){if(payload.length>256)fail();payload=JSON.parse(payload);}
  const x=fields(payload,['operation','policyHash']);if(!sha(x.policyHash)||!['mcp_canary_arm_restore','mcp_canary_withdraw_control','mcp_canary_status'].includes(x.operation))fail();
  const ns=env?.AFW_INDEPENDENT_CLOSURE,method=ns?.idFromName,get=ns?.get;
  if(typeof method!=='function'||typeof get!=='function')fail();
  const stub=()=>Reflect.apply(get,ns,[Reflect.apply(method,ns,[SLOT])]);
  const fixed=()=>{if(env.AFW_INDEPENDENT_CLOSURE!==ns||ns.idFromName!==method||ns.get!==get)fail();};
  if(x.operation!=='mcp_canary_arm_restore'){
   fixed();const name=x.operation==='mcp_canary_status'?'readOwnCanaryClosureControl':'withdrawOwnCanaryClosure';touched=name==='withdrawOwnCanaryClosure';
   return await step.do(name,{retries:{limit:0,delay:1000,backoff:'constant'},timeout:7000},async()=>rpcData(await stub()[name](x.policyHash)));
  }
  const raw=env.AFW_MCP_CLOSURE_POLICY,p=parseCanaryRestorationPolicy(raw);let last=entered;
  const current=()=>{
   fixed();const n=now();if(!time(n)||n<last||n>=p.expiresAt||env.AFW_MCP_CLOSURE_ENABLED!=='true'||env.AFW_MCP_CLOSURE_POLICY!==raw||hash(raw)!==x.policyHash)fail();last=n;return n;
  };
  current();if(p.startAt-entered>600000)fail();
  touched=true;const armed=await step.do('arm-own-canary-closure',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:7000},async()=>rpcData(await stub().armOwnCanaryClosure(x.policyHash)));current();
  if(!['armed','already_armed'].includes(armed?.status))return out(armed?.status==='uncertain'?'uncertain':'blocked',{planHash:x.policyHash});
  if(current()<p.startAt){if(typeof step.sleepUntil!=='function')fail();await step.sleepUntil('own-canary-original-start',new Date(p.startAt));current();}
  const control=rpcData(await stub().readOwnCanaryClosureControl(x.policyHash));current();
  if(control?.status!=='armed'||control.planHash!==x.policyHash)fail();
  const result=await step.do('restore-own-closed-canary',{retries:{limit:0,delay:1000,backoff:'constant'},timeout:35000},async()=>rpcData(await stub().restoreOwnCanary(x.policyHash)));const at=current();
  if(result?.operationalReadiness!==false||result.nativeWithdrawalVerified!==false)fail();
  const after=rpcData(await stub().readOwnCanaryClosureControl(x.policyHash));current();if(after?.status!=='armed'||after.planHash!==x.policyHash)fail();
  if(['restored_observed','closed_observed_uncertain'].includes(result.status)&&(!time(result.observedAt)||result.observedAt<entered||result.observedAt>at))return out('uncertain',{planHash:x.policyHash});
  return result;
 }catch{return out(touched?'uncertain':'blocked');}
}
