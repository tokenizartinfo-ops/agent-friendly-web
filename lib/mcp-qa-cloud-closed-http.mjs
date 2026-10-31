import {createHash} from 'node:crypto';
import {AFW_FIXED_WORKFLOWS,readTerminalAfwWorkflows} from './mcp-fixed-terminal-workflows.mjs';
const ACCOUNT='85d0d5dadac3341a564f22ce885e9eec',QA='agent-friendly-web-independent-closure-qa',CANARY='agent-friendly-web-delegated-canary',OP='agent-friendly-web-release-operator';
const ROOT='/accounts/'+ACCOUNT,CF='https://api.cloudflare.com/client/v4',GH='https://api.github.com/repos/tokenizartinfo-ops/agent-friendly-web';
const APP='d6fc71552de7494a863aca20365a572d',MAX=4194304;
const CONFIG=['compatibility_date','compatibility_flags','main_module','containers','exports','limits','placement','usage_model','cache_options','assets','package_dependencies'];
const fail=()=>{throw Error('Closed QA cloud HTTP unavailable');};
const hash=x=>createHash('sha256').update(x).digest('hex');
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const hex=(x,n)=>typeof x==='string'&&new RegExp('^[a-f0-9]{'+n+'}$').test(x);
const time=x=>Number.isSafeInteger(x)&&x>=0&&x<=8640000000000000;
function fields(v,keys){
 if(!v||Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).length!==keys.length)fail();
 const r={};for(const key of keys){const d=Object.getOwnPropertyDescriptor(v,key);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();r[key]=d.value;}return r;
}
function canonical(v,depth=0){
 if(depth>32)fail();
 if(v===null||typeof v==='string'||typeof v==='boolean'||typeof v==='number'&&Number.isFinite(v))return JSON.stringify(v);
 if(!v||typeof v!=='object')fail();
 if(Array.isArray(v)){
  if(v.length>2000||Reflect.ownKeys(v).length!==v.length+1)fail();
  return '['+Array.from({length:v.length},(_,i)=>{const d=Object.getOwnPropertyDescriptor(v,String(i));if(!d||!Object.hasOwn(d,'value'))fail();return canonical(d.value,depth+1);}).join(',')+']';
 }
 if(Object.getPrototypeOf(v)!==Object.prototype||Reflect.ownKeys(v).some(k=>typeof k!=='string'))fail();
 return '{'+Object.keys(v).sort().map(k=>{const d=Object.getOwnPropertyDescriptor(v,k);if(!d?.enumerable||!Object.hasOwn(d,'value'))fail();return JSON.stringify(k)+':'+canonical(d.value,depth+1);}).join(',')+'}';
}
function empty(rows,info,cursor=false){
 if(!Array.isArray(rows)||rows.length)fail();
 if(info===undefined){if(cursor)fail();return;}
 if(!info||Object.getPrototypeOf(info)!==Object.prototype)fail();
 const allowed=['per_page','page','total_pages','count','total_count','cursor','next_cursor','next_page_token','page_token','has_more'];
 if(Object.keys(info).some(k=>!allowed.includes(k))||cursor&&info.per_page!==100||info.page!==undefined&&info.page!==1||info.total_pages!==undefined&&![0,1].includes(info.total_pages)||['count','total_count'].some(k=>info[k]!==undefined&&info[k]!==0)||['cursor','next_cursor','next_page_token','page_token'].some(k=>info[k]!==undefined&&info[k]!=='')||info.has_more!==undefined&&info.has_more!==false)fail();
}
function version(v,p){
 if(v?.id!==p.id||v.main_module!==p.module.name||!Array.isArray(v.modules)||v.modules.length!==1||!Array.isArray(v.urls)||v.urls.length||!Array.isArray(v.bindings)||v.bindings.length!==p.bindingCount)fail();
 const m=fields(v.modules[0],['name','content_type','content_base64']);
 if(m.name!==p.module.name||m.content_type!=='application/javascript+module'||typeof m.content_base64!=='string'||m.content_base64.length>2796204)fail();
 const bytes=Buffer.from(m.content_base64,'base64');if(bytes.toString('base64')!==m.content_base64||bytes.length!==p.module.bytes||hash(bytes)!==p.module.sha256)fail();
 const seen=new Set();for(const b of v.bindings){
  if(!b||typeof b.name!=='string'||!/^[A-Za-z_][A-Za-z0-9_]{0,127}$/.test(b.name)||seen.has(b.name))fail();seen.add(b.name);
  if(b.type==='secret_text')fields(b,['name','type']);
 }
 const flags=v.bindings.filter(b=>b.name.startsWith('AFW_')&&b.name.endsWith('_ENABLED'));
 if(flags.length!==p.flagCount||flags.some(b=>b.type!=='plain_text'||b.text!=='false'))fail();
 if(v.env!==undefined&&(!v.env||Object.getPrototypeOf(v.env)!==Object.prototype||Object.keys(v.env).length!==seen.size||Object.keys(v.env).some(k=>!seen.has(k))))fail();
 const config=Object.fromEntries(CONFIG.filter(k=>Object.hasOwn(v,k)).map(k=>[k,v[k]]));config.bindings=[...v.bindings].sort((a,b)=>a.name<b.name?-1:a.name>b.name?1:0);
 if(hash('afw.qa-closed-rollback-configuration.v1\n'+canonical(config))!==p.configurationHash)fail();
}
function pinSet(value){
 const p=fields(value,['qaClosed','qaCandidate','canary','operator']);
 for(const [key,pin]of Object.entries(p)){
  fields(pin,['name','id','configurationHash','bindingCount','module','flagCount',...['canary','operator'].includes(key)?['deploymentId']:[]]);
  if(pin.name!==({qaClosed:QA,qaCandidate:QA,canary:CANARY,operator:OP})[key]||!uuid(pin.id)||!hex(pin.configurationHash,64)||!Number.isSafeInteger(pin.bindingCount)||pin.bindingCount<1||pin.bindingCount>100||!Number.isSafeInteger(pin.flagCount)||pin.flagCount<1||pin.flagCount>pin.bindingCount||pin.deploymentId!==undefined&&!uuid(pin.deploymentId))fail();
  const m=fields(pin.module,['name','bytes','sha256']);if(!['index.mjs','closed-rollback.mjs'].includes(m.name)||!Number.isSafeInteger(m.bytes)||m.bytes<1||m.bytes>2097152||!hex(m.sha256,64))fail();
 }
 if(new Set(Object.values(p).map(v=>v.id)).size!==4)fail();return p;
}
/** Private Node/GHA adapter for two CLOSED artifacts only. This factory has no
 * public plan-supplied resource/URL. CLI supplies immutable source pins. */
export function createQaCloudClosedHttpAdapters(options){
 const keys=['plan','pins','credential','githubToken','sourceSha','fetchImpl','now'],o=fields(options,keys),plan=fields(o.plan,['purpose','sessionId','startAt','expiresAt']),originalPins=canonical(o.pins),pins=pinSet(JSON.parse(originalPins));
 const {credential,githubToken,sourceSha,fetchImpl,now}=o;
 if(plan.purpose!=='afw.qa-cloud-closed-rollback.v1'||!hex(plan.sessionId,64)||!time(plan.startAt)||!time(plan.expiresAt)||plan.expiresAt<=plan.startAt||plan.expiresAt-plan.startAt>600000||!hex(sourceSha,40)||[credential,githubToken].some(x=>typeof x!=='string'||!/^[A-Za-z0-9_-]{8,256}$/.test(x))||typeof fetchImpl!=='function'||typeof now!=='function')fail();
 let reads=0,snapshots=0,inSnapshot=false,claimStarted=false,issued=false,postStarted=false,last,claimDeployment,lastWall=now(),lastMono=performance.now();
 if(!time(lastWall)||!Number.isFinite(lastMono))fail();const end=lastMono+plan.expiresAt-lastWall;
 const current=()=>{
  const wall=now(),mono=performance.now(),c=fields(options,keys);
  if(keys.some(k=>c[k]!==o[k])||canonical(o.plan)!==canonical(plan)||canonical(o.pins)!==originalPins||!time(wall)||wall<lastWall||wall<plan.startAt||wall>=plan.expiresAt||!Number.isFinite(mono)||mono<lastMono||mono>=end)fail();
  lastWall=wall;lastMono=mono;return wall;
 };
 const margin=()=>{const wall=current();if(Math.min(plan.expiresAt-wall,end-lastMono)<180000)fail();};
 async function request(service,method,path,query,body,parent){
  let timer,onAbort,reader,ended=false;const child=new AbortController();
  try{
   const started=current(),mono=lastMono;if(!(parent instanceof AbortSignal)||parent.aborted)fail();
   if(method==='GET'&&++reads>128)fail();
   const duration=Math.min(5000,plan.expiresAt-started,end-mono);if(duration<1)fail();
   const check=()=>{current();if(ended||parent.aborted||child.signal.aborted||lastWall>=started+duration||lastMono>=mono+duration)fail();};
   const stop=new Promise((_,reject)=>{onAbort=()=>{child.abort();reject(Error('Closed QA cloud HTTP unavailable'));};parent.addEventListener('abort',onAbort,{once:true});timer=setTimeout(onAbort,Math.max(1,Math.floor(duration)));});
   const work=async()=>{
    check();const url=new URL((service==='cf'?CF+ROOT:GH)+path);if(query)for(const[k,v]of Object.entries(query))url.searchParams.set(k,String(v));
    const response=await fetchImpl(url.href,{method,redirect:'error',cache:'no-store',signal:child.signal,headers:{Authorization:'Bearer '+(service==='cf'?credential:githubToken),Accept:'application/json','User-Agent':'AFW-closed-rollback','Cache-Control':'no-cache','Content-Type':'application/json',...service==='gh'?{'X-GitHub-Api-Version':'2022-11-28'}:{}},...body?{body:JSON.stringify(body)}:{}});
    check();
    if(!(response instanceof Response)||!Number.isSafeInteger(response.status))fail();
    if(service==='gh'&&[409,422].includes(response.status))return{status:response.status};
    if(response.status!==(method==='POST'&&service==='gh'?201:200))fail();
    const date=Date.parse(response.headers.get('date')??'');if(!Number.isFinite(date)||Math.abs(now()-date)>5000||response.headers.has('age')&&response.headers.get('age')!=='0'||['HIT','REVALIDATED','STALE','UPDATING'].includes(response.headers.get('cf-cache-status')?.toUpperCase())||!(response.headers.get('content-type')??'').toLowerCase().startsWith('application/json'))fail();
    const length=response.headers.get('content-length');if(length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX))fail();
    if(!response.body)fail();reader=response.body.getReader();let size=0;const chunks=[];
    while(true){check();const r=await reader.read();check();if(r.done)break;if(!(r.value instanceof Uint8Array)||(size+=r.value.byteLength)>MAX)fail();chunks.push(r.value);}
    const bytes=Buffer.concat(chunks,size),text=new TextDecoder('utf-8',{fatal:true}).decode(bytes),data=JSON.parse(text);check();
    if(!data||Object.getPrototypeOf(data)!==Object.prototype)fail();
    if(service==='cf'&&(data.success!==true||!Array.isArray(data.errors)||data.errors.length||!Array.isArray(data.messages)||!Object.hasOwn(data,'result')))fail();
    return service==='cf'?{status:response.status,value:data.result,info:data.result_info}:{status:response.status,value:data};
   };
   const r=await Promise.race([stop,work()]);check();return r;
  }catch{fail();}
  finally{ended=true;clearTimeout(timer);if(onAbort&&parent instanceof AbortSignal)parent.removeEventListener('abort',onAbort);child.abort();if(reader)void reader.cancel().catch(()=>{});}
 }
 const get=(path,query,parent)=>request('cf','GET',path,query,undefined,parent);
 async function map2(values,fn){
  const out=[];for(let i=0;i<values.length;i+=2){const batch=await Promise.all(values.slice(i,i+2).map(fn));current();out.push(...batch);}return out;
 }
 async function registry(parent){
  const ids=new Set(),qaIds=new Set();let count=0;
  for(let page=1;page<=4;page++){
   const {value:rows,info}=await get('/workflows',{page,per_page:100},parent);current();
   if(!Array.isArray(rows)||rows.length>100||!info||info.page!==page||info.per_page!==100||info.count!==rows.length||!Number.isSafeInteger(info.total_count)||info.total_count<0||info.total_count>400||info.total_pages!==undefined&&(!Number.isSafeInteger(info.total_pages)||info.total_pages<page||info.total_pages>4)||info.cursor!==undefined&&info.cursor!=='')fail();
   for(const row of rows){
    if(!uuid(row?.id)||typeof row.name!=='string'||typeof row.script_name!=='string'||typeof row.class_name!=='string'||ids.has(row.id))fail();ids.add(row.id);
    if(row.script_name===QA){const s=AFW_FIXED_WORKFLOWS.find(s=>s.script===QA&&s.id===row.id);if(!s||row.name!==s.name||row.class_name!==s.className||row.script_deleted===true||row.schedules!==undefined&&(!Array.isArray(row.schedules)||row.schedules.length))fail();qaIds.add(row.id);}
   }
   count+=rows.length;
   if(count===info.total_count){if(info.total_pages!==undefined&&info.total_pages!==page||qaIds.size!==2)fail();return;}
   if(count>info.total_count||rows.length!==100)fail();
  }fail();
 }
 async function readSnapshot(parent){
  current();if(inSnapshot||snapshots>=3||!(parent instanceof AbortSignal)||parent.aborted)fail();inSnapshot=true;snapshots++;last=undefined;
  try{
   const active=await map2([QA,CANARY,OP],async name=>{
    const {value}=await get('/workers/scripts/'+name+'/deployments',{per_page:1},parent);current();
    if(!value||!Array.isArray(value.deployments)||value.deployments.length!==1)fail();const d=value.deployments[0];
    if(!uuid(d.id)||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100||!uuid(d.versions[0].version_id))fail();return{versionId:d.versions[0].version_id,deploymentId:d.id};
   });
   if(![pins.qaClosed.id,pins.qaCandidate.id].includes(active[0].versionId)||active[1].versionId!==pins.canary.id||active[1].deploymentId!==pins.canary.deploymentId||active[2].versionId!==pins.operator.id||active[2].deploymentId!==pins.operator.deploymentId)fail();
   await map2(Object.values(pins),async p=>{const r=await get('/workers/workers/'+p.name+'/versions/'+p.id,{include:'modules'},parent);current();version(r.value,p);});
   const tasks=[...([QA,CANARY,OP].flatMap(n=>['schedules','tails'].map(part=>async()=>{const r=await get('/workers/scripts/'+n+'/'+part,undefined,parent);empty(Array.isArray(r.value)?r.value:r.value?.schedules,r.info);}))),
    async()=>{const r=await get('/workers/scripts/'+QA+'/subdomain',undefined,parent);if(r.value?.enabled!==false||r.value?.previews_enabled!==false)fail();},
    async()=>{const r=await get('/containers/applications/'+APP+'/instances-v2',{state:'active',per_page:100},parent);empty(r.value,r.info,true);},
    async()=>{const r=await get('/workers/durable_objects/namespaces',{page:1,per_page:1000},parent),i=r.info;
     if(!Array.isArray(r.value)||r.value.length>1000||!i||i.page!==1||i.per_page!==1000||i.count!==r.value.length||i.total_count!==r.value.length||![0,1].includes(i.total_pages))fail();
     const own=r.value.filter(n=>n.script===QA),expected=new Map([['IndependentClosure','070c4a7708eb4592a3ded7c117a88225'],['PrivateQaPreregistration','6f30104244424152b800bc64d5f4cfac']]);
     if(own.length!==2||own.some(n=>n.id!==expected.get(n.class)||n.use_sqlite!==true)||new Set(own.map(n=>n.id)).size!==2)fail();},
    ()=>registry(parent),
    ()=>readTerminalAfwWorkflows({read:(path,query)=>get(path,query,parent),assertCurrent:()=>{current();if(parent.aborted)fail();},includeBootstrap:true})];
   for(const fn of tasks){await fn();current();}
   const endActive=await map2([QA,CANARY,OP],async name=>(await get('/workers/scripts/'+name+'/deployments',{per_page:1},parent)).value?.deployments?.[0]);
   if(endActive.some((d,i)=>!d||d.id!==active[i].deploymentId||d.strategy!=='percentage'||!Array.isArray(d.versions)||d.versions.length!==1||d.versions[0].percentage!==100||d.versions[0].version_id!==active[i].versionId))fail();
   current();if(parent.aborted)fail();
   last=Object.freeze({purpose:'afw.qa-cloud-closed-snapshot.v1',observedAt:now(),qaVersionId:active[0].versionId,qaDeploymentId:active[0].deploymentId,expectedProfilesVerified:true,allOwnWorkflowsTerminal:true,ownContainerEmpty:true,qaExposureDisabled:true,ownNamespacesPreserved:true});return last;
  }catch{last=undefined;fail();}finally{inSnapshot=false;}
 }
 async function claim(key,parent){
  margin();if(claimStarted||postStarted||snapshots!==1||!last||last.qaVersionId!==pins.qaCandidate.id||!hex(key,64)||key!==hash('afw.qa-closed-rollback-claim.v1\n'+JSON.stringify([QA,pins.qaCandidate.id,last.qaDeploymentId])))fail();
  claimStarted=true;claimDeployment=last.qaDeploymentId;
  try{
   const ref='refs/tags/afw-qa-closed-rollback/'+key,r=await request('gh','POST','/git/refs',undefined,{ref,sha:sourceSha},parent);current();
   if([409,422].includes(r.status))return'consumed';
   if(r.status!==201||r.value?.ref!==ref||r.value?.object?.sha!==sourceSha||r.value?.object?.type!=='commit')return'uncertain';
   issued=true;return'issued';
  }catch{return'uncertain';}
 }
 async function deploy(value,parent){
  margin();const v=fields(value,['sessionId','closedVersionId']);
  if(!issued||postStarted||inSnapshot||snapshots!==2||!last||last.qaVersionId!==pins.qaCandidate.id||last.qaDeploymentId!==claimDeployment||v.sessionId!==plan.sessionId||v.closedVersionId!==pins.qaClosed.id||now()-last.observedAt>5000)fail();
  postStarted=true;
  const r=await request('cf','POST','/workers/scripts/'+QA+'/deployments',undefined,{strategy:'percentage',versions:[{version_id:pins.qaClosed.id,percentage:100}],annotations:{'workers/message':'AFW closed QA cloud restoration '+plan.sessionId}},parent);current();
  if(!uuid(r.value?.id))fail();return Object.freeze({deploymentId:r.value.id});
 }
 return Object.freeze({readSnapshot,claim,deploy});
}
