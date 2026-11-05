// Fixed test-only I/O observation. No SDK/KV wrapper or strict-source probe.
export function instrumentFiniteOwnerIo(source){
 const once=(needle,replacement)=>{if(source.split(needle).length!==2)throw Error('SYN I/O marker changed: '+needle);source=source.replace(needle,replacement);};
 const runtime=String.raw`
const ioState=()=>globalThis.__finiteIo;
const ioBegin=(path,token,reader,snapshot)=>{
 const s=ioState();if(!s)return null;
 if(s.rows.length>=1024)throw Error('SYN bounded I/O trace');
 const category=path==='/tokens/verify'?(token===reader?'verify-reader':'verify-publisher'):path.includes('independent-closure-qa/deployments')?'qa-deployment':path.includes('independent-closure-qa/versions')?'qa-version':path.includes('/deployments')?'m-deployment':path.includes('/55555555-5555-4555-8555-555555555555?')?'m-initial-version':'m-current-version';
 const row={category,method:'GET',ordinal:s.rows.length+1,snapshot,branch:category.startsWith('verify-')?'credentials':category.startsWith('qa-')?'qa':'m',startedAt:Date.now(),startMono:performance.now(),bytes:0,outcome:'pending'};
 s.rows.push(row);s.active++;s.peak=Math.max(s.peak,s.active);return row;
};
const ioResponse=async(response,row)=>{
 const s=ioState();if(!s||!row)return response;
 if(s.fail===row.category){await response.body.cancel();return new Response(null,{status:503,headers:response.headers});}
 return response;
};
const ioEnd=row=>{if(!row)return;row.endedAt=Date.now();row.endMono=performance.now();ioState().active--;};
`;
 once("const CF='https://api.cloudflare.com",runtime+"\nconst CF='https://api.cloudflare.com");
 once("const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;","let ioSnapshot=0;\n   const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io=ioBegin(path,token,reader,ioSnapshot);let response,stream;");
 once("response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));current(l);","response=await retain(fetcher(CF+path,{method:'GET',redirect:'manual',cache:'no-store',credentials:'omit',referrerPolicy:'no-referrer',headers:{Authorization:'Bearer '+token,Accept:'application/json','Cache-Control':'no-cache'}}));response=await ioResponse(response,io);current(l);");
 once("if(length!==null&&Number(length)!==size)fail();","if(io)io.bytes=size;if(length!==null&&Number(length)!==size)fail();");
 once("return {value:JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size))),date};","const value=JSON.parse(new TextDecoder('utf-8',{fatal:true}).decode(Buffer.concat(chunks,size)));if(io)io.outcome='fulfilled';return {value,date};");
 once("}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}","}finally{try{if(io){io.cancelStartedAt=performance.now();if(io.outcome==='pending')io.outcome='rejected';}if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}finally{if(io)io.cancelSettledAt=performance.now();ioEnd(io);}}");
 once("const primary=async()=>{\n    await credentials();","const primary=async()=>{\n    ioSnapshot=ioState()?++ioState().snapshots:0;await credentials();");
 once("const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});","const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;const io=ioState(),startedAt=Date.now(),startMono=performance.now(),first=io?.rows.length,sqlFirst=globalThis.__finiteIoOwner?.sdkPrimary?.length??0;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{if(io?.consuming){io.child={startedAt,startMono,deadline:until,endedAt:Date.now(),endMono:performance.now(),first,last:io.rows.length,sqlFirst,sqlLast:globalThis.__finiteIoOwner?.sdkPrimary?.length??0};io.consuming=false;}activeChild=null;}});");
 once("consumptionChild=l;consumptionStore=store;","consumptionChild=l;consumptionStore=store;if(ioState())ioState().consuming=true;");
 return source;
}
export function extendFiniteOwnerIo(entry){
 const needle=' export class Initial extends FiniteClosure{';if(entry.split(needle).length!==2)throw Error('SYN I/O class marker');
 return entry.replace(needle,needle+String.raw`
 async ioConfigure(options={}){
  await this.sdkPrimaryObserve();globalThis.__finiteIoOwner=this;
  globalThis.__finiteIo={rows:[],active:0,peak:0,snapshots:0,child:null,fail:options.fail??null};
 }
 async ioObservation(){
  const s=globalThis.__finiteIo;if(!s)return null;
  const c=s.child,sessions=c?(this.sdkPrimary??[]).slice(c.sqlFirst,c.sqlLast):[];
  let factual=0,preflight=0,writes=0;
  for(const session of sessions){if(session.queries.length===8)preflight+=8;else for(const sql of session.queries){if(sql.startsWith('SELECT '))factual++;else writes++;}}
  return {...s,sql:{factual,preflight,writes}};
 }
`);
}
export async function delayFiniteOwnerIo(f,req){
 if(!f.ioDelay||req.method!=='GET'||new URL(req.url).origin!=='https://api.cloudflare.com')return;
 const start=performance.now();while(performance.now()-start<f.ioDelay)await new Promise(resolve=>setTimeout(resolve,f.ioDelay-(performance.now()-start)));
 (f.ioWaits??=[]).push(performance.now()-start);
}
