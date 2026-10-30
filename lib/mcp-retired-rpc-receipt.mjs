import {randomBytes} from 'node:crypto';
import {snapshotRetiredRpcObservation} from './mcp-retired-rpc-observation.mjs';

const fail=()=>{throw Error('Private retired RPC receipt unavailable');};
const sha=value=>typeof value==='string'&&/^[0-9a-f]{64}$/.test(value);
const time=value=>Number.isSafeInteger(value)&&value>=0&&value<=8640000000000000;
function observation(value){
 const r=snapshotRetiredRpcObservation(value);
 if(r.purpose!=='afw.node-retirement-observation.v1'||!sha(r.containerId)||!sha(r.processGeneration)||!sha(r.programHash)||!/^[0-9a-f]{40}$/.test(r.sourceRevision)||r.image!=='cloudflare/debian-trixie'||r.physicalStopVerified!==false||r.mayStartSuccessor!==false||['createdAt','expiresAt','closedAt','observedAt'].some(k=>!time(r[k]))||r.expiresAt<=r.createdAt||r.expiresAt-r.createdAt>600000||r.closedAt<r.createdAt||r.closedAt>r.observedAt)fail();
 return r;
}
function receipt(value,challenge){
 let dispose;
 try{
  if(!value||typeof value!=='object')fail();
  const lifecycle=Object.getOwnPropertyDescriptor(value,Symbol.dispose);
  if(lifecycle){
   if(!Object.hasOwn(lifecycle,'value')||typeof lifecycle.value!=='function'||lifecycle.enumerable)fail();
   dispose=lifecycle.value;
  }
  if(Object.getPrototypeOf(value)!==Object.prototype)fail();
  const d=Object.getOwnPropertyDescriptors(value),keys=['purpose','challenge','observation'],own=Reflect.ownKeys(d);
  if(own.length!==keys.length+(lifecycle?1:0)||own.some(k=>typeof k==='symbol'?k!==Symbol.dispose:!keys.includes(k))||keys.some(k=>!d[k]?.enumerable||!Object.hasOwn(d[k],'value')))fail();
  const result=observation(d.observation.value);
  if(d.purpose.value!=='afw.retired-rpc-receipt.v1'||d.challenge.value!==challenge)fail();
  return result;
 }finally{if(dispose)dispose.call(value);}
}
/** Direct domain values are inspected BEFORE PromiseResolve can read `then`.
 * Async adapters must resolve a plain local {value:domain} box. They own any
 * processing before this boundary; arbitrary thenables are never awaited here. */
function receive(call,consume){
 const returned=call();
 const unbox=box=>{
  const d=box&&typeof box==='object'?Object.getOwnPropertyDescriptors(box):{};
  if(box&&Object.getPrototypeOf(box)===Object.prototype&&Reflect.ownKeys(d).length===1&&d.value?.enumerable&&Object.hasOwn(d.value,'value'))return consume(d.value.value);
  // Reject an unsafe async transport, but still release any observed domain
  // result. Descriptor reads do not invoke an accessor on a malformed box.
  try{consume(Object.hasOwn(d.value??{},'value')?d.value.value:box);}finally{fail();}
 };
 try{
  // Brand-check with the intrinsic: do not inspect/call returned.then. A trusted
  // native Promise runs unbox before returning only an already-safe snapshot.
  return Promise.prototype.then.call(returned,unbox);
 }catch{
  // A non-Promise is a direct domain value, not a user-provided thenable.
  return consume(returned);
 }
}

/** One original lease. Late continuations clean observed results only while this
 * execution context lives; native context teardown owns cancellation after it ends.
 * No retries, authority extension or cross-clock timestamp comparison. */
async function bounded({now,signal,timeoutMs},work){
 if(typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000||signal?.aborted)fail();
 const start=now(),mono=performance.now();
 if(!time(start)||!Number.isFinite(mono))fail();
 let last=start,closed=false,timer,onAbort;
 const controller=new AbortController();
 const clock=()=>{
  const n=now(),elapsed=performance.now()-mono;
  if(closed||controller.signal.aborted||!time(n)||n<last||n-start>=timeoutMs||!Number.isFinite(elapsed)||elapsed<0||elapsed>=timeoutMs)fail();
  last=n;return n;
 };
 try{
  const cancelled=new Promise((_,reject)=>{
   onAbort=()=>{controller.abort();reject(Error('Private retired RPC receipt unavailable'));};
   signal?.addEventListener('abort',onAbort,{once:true});
   timer=setTimeout(onAbort,timeoutMs);
  });
  // Promise.race retains a rejection handler on the losing continuation. If a
  // borrowed result arrives late, work snapshots/releases it before clock denies it.
  const task=Promise.resolve().then(()=>{clock();return work({clock,signal:controller.signal});});
  return await Promise.race([task,cancelled]);
 }catch{fail();}
 finally{
  closed=true;clearTimeout(timer);signal?.removeEventListener('abort',onAbort);controller.abort();
 }
}
/** INTERNAL trusted fixed observer only. Not mounted as a Durable Object method.
 * Observe must read the original custody; no caller selectors or authority here. */
export async function createRetiredRpcReceipt({challenge,observe,now=Date.now,timeoutMs=5000}={}){
 if(!sha(challenge)||typeof observe!=='function')fail();
 return bounded({now,timeoutMs},async({clock,signal})=>{
  const admittedAt=clock();
  const result=await receive(()=>observe({signal}),observation),completedAt=clock();
  if(result.observedAt<admittedAt||result.observedAt>completedAt)fail();
  return Object.freeze({purpose:'afw.retired-rpc-receipt.v1',challenge,observation:result});
 });
}
/** INTERNAL trusted fixed-target transport only. A challenge proves correspondence,
 * not identity/physical stop. Integration must pin original identity separately. */
export async function readRetiredRpcReceipt({invoke,assertCurrent,now=Date.now,signal,timeoutMs=5000}={}){
 if(typeof invoke!=='function'||typeof assertCurrent!=='function')fail();
 return bounded({now,signal,timeoutMs},async({clock,signal:callSignal})=>{
  await assertCurrent();const sentAt=clock(),challenge=randomBytes(32).toString('hex');
  const result=await receive(()=>invoke(challenge,callSignal),value=>receipt(value,challenge)),receivedAt=clock();
  await assertCurrent();clock();
  return Object.freeze({observation:result,local:Object.freeze({sentAt,receivedAt})});
 });
}
