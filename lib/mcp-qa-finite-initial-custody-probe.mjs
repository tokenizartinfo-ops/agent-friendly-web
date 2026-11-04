import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
import {readFiniteInitialOldGuard} from './mcp-qa-finite-initial-old-guard.mjs';
import {continueFiniteOwnerStageWork,observeFiniteReadOnlyWork,retainFiniteOwnerStagePromise as retain} from './mcp-qa-finite-stage-work.mjs';

const ROOT='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec';
const SLOT='afw-own-successor-closure-v1';
const fail=()=>{throw Error('Finite native custody observation unavailable');};
const unavailable=()=>Object.freeze({status:'unavailable',authorizesEffects:false,operationalReadiness:false});
const timestamp=value=>{
 if(typeof value!=='string'||!/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.\d{3})?Z$/.test(value))fail();
 const n=Date.parse(value);if(!Number.isSafeInteger(n)||new Date(n).toISOString().replace('.000Z','Z')!==value.replace('.000Z','Z'))fail();return n;
};
/** Unmounted read-only observation of two loaded credential identities and
 * one fixed historical Workflow. Never an admission, permission, or effect. */
async function observeNativeCustody(options,originalLease){
 let timer,onAbort,controller;
 try{
  fields(options,['ctx','env']);fields(originalLease,['signal','assertCurrent']);
  const {ctx,env}=options,{signal,assertCurrent}=originalLease,actor=ctx?.id,toString=actor?.toString,self=env?.AFW_INDEPENDENT_CLOSURE,idFromName=self?.idFromName,reader=env?.AFW_MCP_CLOSURE_READ_TOKEN,publisher=env?.AFW_MCP_CLOSURE_PUBLISH_TOKEN,fetcher=globalThis.fetch;
  if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function'||typeof toString!=='function'||typeof idFromName!=='function'||typeof fetcher!=='function'||[reader,publisher].some(x=>typeof x!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(x)))fail();
  const id=Reflect.apply(toString,actor,[]),wall=Date.now(),mono=performance.now();let last=wall,lastMono=mono;
  if(typeof id!=='string'||!/^[0-9a-f]{64}$/.test(id)||Reflect.apply(idFromName,self,[SLOT]).toString()!==id)fail();
  controller=new AbortController();
  const stop=new Promise((_,reject)=>{onAbort=()=>{controller.abort();reject(Error('Finite native custody observation unavailable'));};signal.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,15000);});
  const check=()=>{
   const at=Date.now(),m=performance.now();
   if(signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at-wall>=15000||!Number.isFinite(m)||m<lastMono||m-mono>=15000||ctx.id!==actor||actor.toString!==toString||Reflect.apply(toString,actor,[])!==id||env.AFW_INDEPENDENT_CLOSURE!==self||self.idFromName!==idFromName||Reflect.apply(idFromName,self,[SLOT]).toString()!==id||env.AFW_MCP_CLOSURE_READ_TOKEN!==reader||env.AFW_MCP_CLOSURE_PUBLISH_TOKEN!==publisher||globalThis.fetch!==fetcher||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent)fail();
   last=at;lastMono=m;assertCurrent();return at;
  };
  const verify=async(token,expected)=>{
   check();const started=Date.now(),startMono=performance.now();let childTimer;
   const childStop=new Promise((_,reject)=>{childTimer=setTimeout(()=>reject(Error('Finite native custody observation unavailable')),5000);});
   const childCheck=()=>{const at=check();if(at-started>=5000||performance.now()-startMono>=5000)fail();return at;};
   const actual=retain((async()=>{
    let response,stream;
    try{
     response=await retain(fetcher(ROOT+'/tokens/verify',{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));childCheck();
     const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
     if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>8192))fail();
     stream=response.body.getReader();const chunks=[];let size=0;
     for(;;){const part=await retain(stream.read());childCheck();if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>8192)fail();chunks.push(part.value);}
     if(length!==null&&size!==Number(length))fail();
     const value=finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))));
     fields(value,['id','status','expires_on',...Object.hasOwn(value,'not_before')?['not_before']:[]]);
     const expiry=timestamp(value.expires_on),notBefore=value.not_before==null?null:timestamp(value.not_before),at=childCheck();
     if(value.id!==expected||value.status!=='active'||expiry<=at||notBefore!==null&&notBefore>at)fail();
     return Object.freeze({status:'active',expiresAt:new Date(expiry).toISOString(),notBefore:notBefore===null?null:new Date(notBefore).toISOString()});
    }finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}
   })());
   try{return await Promise.race([actual,childStop,stop]);}finally{clearTimeout(childTimer);}
  };
  check();
  const readerResult=await verify(reader,'9aa97ad1fc9afe3021cf69ea497d5190');check();
  const publisherResult=await verify(publisher,'05718105dcdfc92e55cc3624172c2740');check();
  const lease=Object.freeze({signal:controller.signal,assertCurrent:check});
  const guard=await Promise.race([readFiniteInitialOldGuard({env},lease),stop]);check();
  if(guard.guardVerified!==true||guard.historicalDispatch!=='uncertain'||guard.authorizesEffects!==false||guard.operationalReadiness!==false)fail();
  return Object.freeze({status:'observed',reader:readerResult,publisher:publisherResult,guardVerified:true,scopeVerified:false,authorizesEffects:false,operationalReadiness:false});
 }catch{return unavailable();}finally{clearTimeout(timer);if(onAbort)originalLease?.signal?.removeEventListener('abort',onAbort);controller?.abort();}
}

/** Requires the existing internal scope; this creates no admission or lease. */
export async function readFiniteNativeCustodyProbe(options,originalLease){
 try{
  fields(options,['ctx','env']);fields(originalLease,['signal','assertCurrent']);
  return await continueFiniteOwnerStageWork({ctx:options.ctx,env:options.env,originalLease},()=>observeNativeCustody(options,originalLease));
 }catch{return unavailable();}
}

/** Fixed native actor pre-entry read. Internal retention is not an admission. */
export async function readFinitePreEntryCustody(options){
 let controller,timer;
 try{
  fields(options,['ctx','env']);
  const {ctx,env}=options,storage=ctx.storage,db=env.RELEASE_DB;
  const start=Date.now(),mono=performance.now();let last=start,lastMono=mono;
  controller=new AbortController();
  const lease=Object.freeze({signal:controller.signal,assertCurrent:()=>{
   const now=Date.now(),m=performance.now();
   if(controller.signal.aborted||!Number.isSafeInteger(now)||now<last||now-start>=15000||!Number.isFinite(m)||m<lastMono||m-mono>=15000||ctx.storage!==storage||env.RELEASE_DB!==db)fail();
   last=now;lastMono=m;
  }});
  timer=setTimeout(()=>controller.abort(),15000);
  return await observeFiniteReadOnlyWork({ctx,env,originalLease:lease},()=>observeNativeCustody(options,lease));
 }catch{return unavailable();}finally{clearTimeout(timer);controller?.abort();}
}
