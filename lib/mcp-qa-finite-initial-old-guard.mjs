import {initialFields as fields} from './mcp-qa-finite-initial-material-records.mjs';
import {retainFiniteOwnerStagePromise} from './mcp-qa-finite-stage-work.mjs';
import {finiteCfEnvelope} from './mcp-qa-finite-custody.mjs';
const URL='https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workflows/afw-own-qa-private-bootstrap/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04';
const fail=()=>{throw Error('Finite initial old guard unavailable');};
/** Read one fixed historical guard using the loaded native reader. This is
 * factual evidence for that guard only and does not authorize any effect. */
export async function readFiniteInitialOldGuard(options,originalLease){
 fields(options,['env']);fields(originalLease,['signal','assertCurrent']);
 const {env}=options,{signal,assertCurrent}=originalLease,token=env?.AFW_MCP_CLOSURE_READ_TOKEN,fetcher=globalThis.fetch;
 if(!(signal instanceof AbortSignal)||typeof assertCurrent!=='function'||typeof fetcher!=='function'||typeof token!=='string'||!/^[-A-Za-z0-9_]{16,4096}$/.test(token))fail();
 const entered=Date.now(),mono=performance.now(),controller=new AbortController();let active=true,timer,onAbort;
 const check=()=>{
  if(!active||signal.aborted||controller.signal.aborted||Date.now()<entered||Date.now()-entered>=5000||performance.now()<mono||performance.now()-mono>=5000||options.env!==env||env.AFW_MCP_CLOSURE_READ_TOKEN!==token||globalThis.fetch!==fetcher||originalLease.signal!==signal||originalLease.assertCurrent!==assertCurrent)fail();
  assertCurrent();
 };
 const stopped=new Promise((_,reject)=>{onAbort=()=>{active=false;controller.abort();reject(Error('Finite initial old guard unavailable'));};signal.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,5000);});
 try{
  check();
  const actual=retainFiniteOwnerStagePromise(Promise.resolve().then(async()=>{
   check();let reader,response;
   try{
    response=await fetcher(URL,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',signal:controller.signal,headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}});check();
    const date=Date.parse(response?.headers?.get('date')??''),length=response?.headers?.get('content-length');
    if(!(response instanceof Response)||response.status!==200||response.redirected||!response.body||!Number.isSafeInteger(date)||Math.abs(Date.now()-date)>5000||!/^application\/json(?:\s*;|$)/i.test(response.headers.get('content-type')??'')||response.headers.has('age')&&response.headers.get('age')!=='0'||response.headers.has('retry-after')||response.headers.has('link')||['HIT','STALE','REVALIDATED','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||length!==null&&(!/^\d+$/.test(length)||Number(length)>262144))fail();
    reader=response.body.getReader();const chunks=[];let size=0;
    for(;;){const part=await reader.read();check();if(part.done)break;if(!(part.value instanceof Uint8Array)||(size+=part.value.length)>262144)fail();chunks.push(part.value);}
    if(length!==null&&size!==Number(length))fail();
    const result=finiteCfEnvelope(JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))));check();
    if(!result||typeof result!=='object'||Array.isArray(result)||result.status!=='complete'||result.step_count!==6||!Array.isArray(result.steps)||result.steps.length!==6||!result.output||typeof result.output!=='object'||Array.isArray(result.output))fail();
    const o=result.output;
    if(o.status!=='blocked'||o.dispatchStatus!=='uncertain'||o.nativeWithdrawalVerified!==false||o.operationalReadiness!==false||o.mayRetry!==false)fail();
    const names=new Set();let restore=0;
    for(const step of result.steps){
     if(!step||typeof step!=='object'||Array.isArray(step)||typeof step.name!=='string'||!step.name.length||names.has(step.name))fail();names.add(step.name);
     if(step.name==='restore-own-closed-canary-1'){
      if(step.success!==true||step.start!=='2026-10-30T16:41:01.564Z'||step.end!=='2026-10-30T16:41:01.675Z')fail();restore++;
     }
    }
    if(restore!==1)fail();check();
    return Object.freeze({purpose:'afw.finite-initial-old-guard.v1',guardVerified:true,historicalDispatch:'uncertain',authorizesEffects:false,operationalReadiness:false});
   }finally{if(reader)retainFiniteOwnerStagePromise(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)retainFiniteOwnerStagePromise(response.body.cancel()).catch(()=>{});}
  }));
  const result=await Promise.race([actual,stopped]);check();return result;
 }finally{active=false;clearTimeout(timer);signal.removeEventListener('abort',onAbort);controller.abort();}
}
