const fail=()=>{throw Error('Private QA named generation unavailable');};
const stages=new Set(['workflow_admission','operator_credential','operator_primary_read','operator_primary_result','activation_before_read','activation_after_read','activation_before_attempt','activation_after_attempt','activation_before_receipt','activation_after_receipt','activation_before_acceptance','activation_complete','successor_rpc','successor_rpc_complete','successor_before_retirement','successor_after_retirement','successor_before_write','successor_after_write']);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
const hex=(x,n=64)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
function fields(value,keys){
 if(!value||Object.getPrototypeOf(value)!==Object.prototype||Reflect.ownKeys(value).length!==keys.length)fail();
 const out={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(value,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();out[key]=d.value;}return Object.freeze(out);
}
const pinKeys=['purpose','runtimeVersionId','sourceRevision','context','authorizesEffects','operationalReadiness'];
function execution(value){
 const p=fields(value,pinKeys);if(p.purpose!=='afw.qa-execution-pin.v1'||!uuid(p.runtimeVersionId)||!hex(p.sourceRevision,40)||!['workflow','durable_object'].includes(p.context)||p.authorizesEffects!==false||p.operationalReadiness!==false)fail();return p;
}
const receiptKeys=['purpose','status','isHead','withinWindow','planHash','infoHash','sequence','pendingAt','armedAt','withdrawnAt','runtimeVersionId','sourceRevision','storedContext','authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'];
function receipt(raw,pins,pin,at){
 // The host RPC returns primitive JSON. A borrowed object is never authority.
 if(typeof raw!=='string'){
  if(raw&&typeof raw==='object'){const d=Object.getOwnPropertyDescriptor(raw,Symbol.dispose);if(typeof d?.value==='function')try{Reflect.apply(d.value,raw,[]);}catch{/* Already unusable. */}}
  fail();
 }
 if(raw.length>2048||new TextEncoder().encode(raw).length>2048)fail();
 const r=fields(JSON.parse(raw),receiptKeys);
 if(r.purpose!=='afw.qa-generation-resolution.v2'||r.status!=='armed'||r.isHead!==true||r.withinWindow!==true||r.planHash!==pins.planHash||r.sequence!==pins.sequence||!hex(r.infoHash)||r.runtimeVersionId!==pin.runtimeVersionId||r.sourceRevision!==pin.sourceRevision||r.storedContext!=='durable_object'||!time(r.pendingAt)||r.pendingAt<pins.startAt-600000||!time(r.armedAt)||r.armedAt<r.pendingAt||r.armedAt>=pins.expiresAt||r.armedAt>at||r.withdrawnAt!==null||['authorizesEffects','guardLivenessVerified','operationalReadiness','mayRetry'].some(k=>r[k]!==false))fail();
}
/** One named-control fence, not complete effect authority or guard liveness.
 * Host fixes the observer/actor and correlates source/module/config before ARM.
 * Primary grant/history/reservation fences and independent cleanup remain required.
 * Never reuse this named-only fence for ARM, publication or cleanup. */
export function createPrivateQaNamedAuthorization(options){
 const keys=['executionPin','readGeneration','pins','now','timeoutMs'],pinned=fields(options,keys),{executionPin:pin,readGeneration,now,timeoutMs}=pinned;
 const scopeKeys=['planHash','sequence','startAt','expiresAt'],scope=fields(pinned.pins,scopeKeys),methods=fields(pin,['assertCurrent','snapshot']),assert=methods.assertCurrent,snapshot=methods.snapshot;
 if(!hex(scope.planHash)||!Number.isSafeInteger(scope.sequence)||scope.sequence<1||scope.sequence>32||!time(scope.startAt)||!time(scope.expiresAt)||scope.expiresAt<=scope.startAt||scope.expiresAt-scope.startAt>600000||typeof assert!=='function'||typeof snapshot!=='function'||typeof readGeneration!=='function'||typeof now!=='function'||!Number.isSafeInteger(timeoutMs)||timeoutMs<1||timeoutMs>5000)fail();
 Reflect.apply(assert,pin,[]);const selected=execution(Reflect.apply(snapshot,pin,[]));
 const entered=now(),origin=performance.now();if(!time(entered)||entered<scope.startAt||entered>=scope.expiresAt||!Number.isFinite(origin)||origin<0)fail();
 const end=origin+(scope.expiresAt-entered);let lastWall=entered,lastMono=origin,invalidated=false,busy=false,active;
 const deny=()=>{invalidated=true;active?.abort();return false;};
 const current=()=>{
  if(invalidated)fail();const at=now(),mono=performance.now();
  if(!time(at)||at<lastWall||at<scope.startAt||at>=scope.expiresAt||!Number.isFinite(mono)||mono<lastMono||mono>=end)fail();
  const value=fields(options,keys),scopeNow=fields(pinned.pins,scopeKeys),m=fields(pin,['assertCurrent','snapshot']);
  if(keys.some(k=>value[k]!==pinned[k])||scopeKeys.some(k=>scopeNow[k]!==scope[k])||m.assertCurrent!==assert||m.snapshot!==snapshot)fail();
  Reflect.apply(assert,pin,[]);const p=execution(Reflect.apply(snapshot,pin,[]));if(pinKeys.some(k=>p[k]!==selected[k]))fail();
  lastWall=at;lastMono=mono;return at;
 };
 async function authorize(args){
  if(args.length!==2||!stages.has(args[0])||!(args[1] instanceof AbortSignal)||args[1].aborted||invalidated||busy)return deny();
  const parent=args[1];let timer,onAbort,onChildAbort;busy=true;const controller=new AbortController();active=controller;
  try{
   const wall=current(),mono=lastMono,remaining=Math.min(timeoutMs,5000,scope.expiresAt-wall,end-mono);
   if(!(remaining>0))fail();const deadline=mono+remaining,wallEnd=wall+remaining;
   const check=()=>{const at=current();if(parent.aborted||controller.signal.aborted||at>=wallEnd||lastMono>=deadline)fail();return at;};
   const failure=new Promise(resolve=>{
    onAbort=()=>resolve(deny());onChildAbort=()=>resolve(false);controller.signal.addEventListener('abort',onChildAbort,{once:true});parent.addEventListener('abort',onAbort,{once:true});
    timer=setTimeout(()=>resolve(deny()),Math.max(1,Math.floor(remaining)));
   });
   const work=async()=>{try{check();const raw=await readGeneration(controller.signal);const at=check();receipt(raw,scope,selected,at);check();return true;}catch{return deny();}};
   const allowed=await Promise.race([failure,work()]);if(allowed!==true)return deny();check();return true;
  }catch{return deny();}finally{
   clearTimeout(timer);if(onAbort)parent.removeEventListener('abort',onAbort);
   if(onChildAbort)controller.signal.removeEventListener('abort',onChildAbort);if(active===controller)active=undefined;controller.abort();busy=false;
  }
 }
 return Object.freeze({authorize(...args){return authorize(args);}});
}
