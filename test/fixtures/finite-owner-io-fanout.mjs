// Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
export function instrumentFiniteOwnerIo(source){
 const noticeStart=source.indexOf('/** UNMOUNTED fixed GET.'),noticeSuffix=noticeStart<0?'':source.slice(noticeStart);if(noticeStart>=0)source=source.slice(0,noticeStart);
 const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
 const runtime=String.raw`
const ioState=()=>globalThis.__finiteIo;
const ioBranch=(name,value)=>{const s=ioState();if(s)s.branches[name]=value;};
const ioBegin=(path,token,reader,snapshot)=>{
 const s=ioState();if(!s)return null;
 if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
 const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
 const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending',fetchStarted:false};
 s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
};
const ioResponse=async(response,row)=>{
 const s=ioState();if(!s||!row)return response;
 if(s.fail===row.category){await response.body.cancel();return new Response(null,{status:503,headers:response.headers});}
 if(s.hold!==row.category||s.holdUsed)return response;
 s.holdUsed=true;const bytes=new Uint8Array(await response.arrayBuffer());let pulled=false;
 return new Response(new ReadableStream({
  pull(controller){
   if(pulled){controller.close();return;}pulled=true;s.held={category:row.category,phase:'body'};
   return new Promise(resolve=>{s.releaseRead=()=>{s.releaseRead=null;s.held=null;controller.enqueue(bytes);resolve();};if(s.autoRelease)s.releaseRead();});
  },
  cancel(){
   s.held={category:row.category,phase:'cancel'};row.cancelHeldAt=performance.now();
   return new Promise(resolve=>{s.releaseCancel=()=>{s.releaseCancel=null;s.held=null;row.cancelReleasedAt=performance.now();resolve();};if(s.autoRelease)s.releaseCancel();});
  }
 },{highWaterMark:0}),{status:response.status,headers:response.headers});
};
const ioCheckpoint=async name=>{
 const s=ioState();if(!s||s.checkpoint!==name||s.snapshots!==1)return;
 s.checkpointHeld=name;await new Promise(resolve=>{s.releaseCheckpoint=()=>{s.releaseCheckpoint=null;s.checkpointHeld=null;resolve();};if(s.autoRelease)s.releaseCheckpoint();});
};
const ioEnd=row=>{if(!row)return;row.endedAt=Date.now();row.endMono=performance.now();ioState().active--;};
`;
 once("const CF='https://api.cloudflare.com",runtime+"\nconst CF='https://api.cloudflare.com");
 once("const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;","let ioSnapshot=0;\n   const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io=ioBegin(path,token,reader,ioSnapshot);let response,stream;");
 once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","if(io&&ioState().pendingCategory===io.category&&ioState().snapshots===1)await ioCheckpoint('before-join');if(io)io.fetchStarted=true;response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
 once("if(length!==null&&Number(length)!==size)fail();","if(io)io.bytes=size;if(length!==null&&Number(length)!==size)fail();");
 once("return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};","const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));if(io)io.outcome='fulfilled';return {value,date};");
 once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
 once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;if(ioState())ioState().branches={qa:'not-started',m:'not-started'};await credentials();");
 once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
 once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
 once("if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();","if(consumptionChild!==l||consumptionStore!==store||!consumption)fail();if(ioState())ioState().same={child:consumptionChild===l,store:consumptionStore===store};");
 once("onAbort=()=>clock.close();originalLease.signal.addEventListener('abort',onAbort,{once:true});","onAbort=()=>{if(ioState())ioState().parentAborted=true;clock.close();};originalLease.signal.addEventListener('abort',onAbort,{once:true});");
 once("const qaWork=retain(Promise.resolve().then(readQaPrimary)),mWork=retain(Promise.resolve().then(readMPrimary));","const qaWork=retain(Promise.resolve().then(()=>{ioBranch('qa','pending');return readQaPrimary();}).finally(()=>ioBranch('qa','settled'))),mWork=retain(Promise.resolve().then(()=>{ioBranch('m','pending');return readMPrimary();}).finally(()=>ioBranch('m','settled')));");
 once("const joined=await retain(Promise.allSettled([qaWork,mWork]));","const joined=await retain(Promise.allSettled([qaWork,mWork]));await ioCheckpoint('joined-before-consumption');");
 once("const observed=await primary();","const observed=await primary();await ioCheckpoint('after-first');");
 once("const qualified=await qualify(first,observed),again=await primary(),second=await facts(),secondQualified=await qualify(second,again);","const qualified=await qualify(first,observed);await ioCheckpoint('between');const again=await primary(),second=await facts(),secondQualified=await qualify(second,again);");
 return source+noticeSuffix;
}
export function extendFiniteOwnerIo(entry){
 const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
 return entry.replace(needle,needle+String.raw`
 async ioConfigure(options={}){
  await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null,hold:options.hold??null,checkpoint:options.checkpoint??null,pendingCategory:options.pendingCategory??null,branches:{}};
 }

 async ioRelease(kind='all'){
  const s=globalThis.__finiteIo;if(!s)return;
  if(kind==='all')s.autoRelease=true;
  if(kind==='all'||kind==='body')s.releaseRead?.();
  if(kind==='all'||kind==='cancel')s.releaseCancel?.();
  if(kind==='all'||kind==='checkpoint')s.releaseCheckpoint?.();
 }
 async ioProbe(){
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/retention'));
  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({allowed:true}));}
  catch{return {allowed:false};}finally{root.finish();}
 }
 async ioObservation(){
  const s=globalThis.__finiteIo;if(!s)return null;
  const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
  let factual=0,preflight=0,writes=0;
  for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
  return {rows:s.rows,branches:s.branches,active:s.active,peak:s.peak,snapshots:s.snapshots,child:s.child,same:s.same??null,held:s.held??null,checkpointHeld:s.checkpointHeld??null,parentAborted:s.parentAborted??false,sql:{factual,preflight,writes}};
 }
`);
}
export async function delayFiniteOwnerIo(f,req){
 if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
 const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
 (f.ioWaits??=[]).push(performance.now()-start);
}
