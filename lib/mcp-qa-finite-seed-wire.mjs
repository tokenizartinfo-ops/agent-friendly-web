// Fixed-operation transport shared by seed primary readers/issuer. This module
// is internal: callers choose only named relative paths in the enclosing modules.
const fail=()=>{throw Error('Finite seed transport unavailable');};
export function finiteSeedWire({fetchImpl,now,signal,credential,origin,check=()=>{},limit=262144,requests=12,duration=5000}){
 if(credential!==undefined&&(typeof credential!=='string'||credential.length<1||credential.length>8192||/[^\x21-\x7e]/.test(credential)))fail();
 const began=now(),mono=performance.now(),controller=new AbortController();let last=began,count=0,total=0,closed=false;
 if(typeof fetchImpl!=='function'||typeof now!=='function'||!(signal instanceof AbortSignal)||!Number.isSafeInteger(began)||!['https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web','https://api.cloudflare.com/client/v4'].includes(origin))fail();
 const assert=()=>{check();const at=now();if(closed||signal.aborted||controller.signal.aborted||!Number.isSafeInteger(at)||at<last||at-began>=duration||performance.now()-mono>=duration)fail();last=at;};
 const stop=()=>controller.abort();signal.addEventListener('abort',stop,{once:true});
 const timer=setTimeout(stop,duration);
 async function request(path,{method='GET',body,allow404=false}={}){
  let reader;const child=new AbortController();let rejectAbort,stepTimer;
  const rejected=new Promise((_,reject)=>{rejectAbort=reject;});
  const abort=()=>{child.abort();rejectAbort(Error('Finite seed transport unavailable'));};
  controller.signal.addEventListener('abort',abort,{once:true});signal.addEventListener('abort',abort,{once:true});stepTimer=setTimeout(abort,5000);
  try{
   const work=async()=>{
    assert();if(++count>requests||!path.startsWith('/')||path.includes('..')||method!=='GET'&&!credential)fail();
    const headers={Accept:'application/json','Cache-Control':'no-cache',...(credential?{Authorization:'Bearer '+credential}:{})};
    if(origin.includes('github'))headers['X-GitHub-Api-Version']='2022-11-28';
    if(body!==undefined)headers['Content-Type']='application/json';
    const r=await fetchImpl(origin+path,{method,headers,redirect:'error',credentials:'omit',referrerPolicy:'no-referrer',cache:'no-store',signal:child.signal,...(body===undefined?{}:{body:JSON.stringify(body)})});assert();
    if(child.signal.aborted||!(r instanceof Response)||r.headers.has('retry-after')||r.headers.get('x-ratelimit-remaining')==='0'||r.headers.has('link')||r.status!==(method==='POST'?201:200)&&!(allow404&&r.status===404))fail();
    const date=Date.parse(r.headers.get('date')??'');
    if(!Number.isSafeInteger(date)||Math.abs(now()-date)>5000||r.headers.has('age')&&r.headers.get('age')!=='0'||['HIT','STALE','REVALIDATED','UPDATING'].includes(r.headers.get('cf-cache-status')?.toUpperCase())||!(r.headers.get('content-type')??'').startsWith('application/json'))fail();
    const length=r.headers.get('content-length');if(length!==null&&(!/^(0|[1-9][0-9]*)$/.test(length)||!Number.isSafeInteger(Number(length))||Number(length)>limit-total)||!r.body)fail();
    reader=r.body.getReader();let size=0;const chunks=[];
    for(;;){assert();const x=await reader.read();assert();if(child.signal.aborted)fail();if(x.done)break;if(!(x.value instanceof Uint8Array)||(total+=x.value.length)>limit)fail();size+=x.value.length;chunks.push(x.value);}
    if(length!==null&&Number(length)!==size)fail();
    const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));assert();
    return {value,status:r.status,date};
   };
   return await Promise.race([work(),rejected]);
  }catch{controller.abort();fail();}
  finally{clearTimeout(stepTimer);controller.signal.removeEventListener('abort',abort);signal.removeEventListener('abort',abort);child.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 return {request,assert,close(){closed=true;clearTimeout(timer);signal.removeEventListener('abort',stop);controller.abort();}};
}
