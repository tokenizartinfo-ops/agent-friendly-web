import { DurableObject, WorkflowEntrypoint } from 'cloudflare:workers';
import { controlConfig, sameControlPlan, verifyControlResponse } from './guard.mjs';
const MARKER='afw-container-control-20261022-v1';
const OPTIONS={retries:{limit:0,delay:'1 second',backoff:'constant'},timeout:'90 seconds'};
const receipt=(stage,extra={})=>({contract_version:'agentfriendly.independent-container-control.v1',
 checkedAt:new Date().toISOString(),marker:MARKER,stage,...extra,
 originalIncidentRepaired:false,physicalClosureAccepted:false,operationalReadiness:false,pcOffAccepted:false});
async function bounded(work,ms,onTimeout=()=>{}) {
 let timer;try{return await Promise.race([Promise.resolve().then(work),new Promise((_,reject)=>{
  timer=setTimeout(()=>{try{onTimeout();}catch{}reject(new Error('bounded_control_timeout'));},Math.max(1,ms));
 })]);}finally{clearTimeout(timer);}
}
async function readSmall(response) {
 const reader=response.body?.getReader();if(!reader)return '';
 const chunks=[];let size=0;
 try{for(;;){const r=await reader.read();if(r.done)break;size+=r.value.byteLength;
  if(size>512)throw new Error('control_response_too_large');chunks.push(r.value);}}
 finally{try{await reader.cancel();}catch{}}
 const bytes=new Uint8Array(size);let offset=0;for(const c of chunks){bytes.set(c,offset);offset+=c.byteLength;}
 return new TextDecoder('utf-8',{fatal:true}).decode(bytes);
}
function program(caseName) {
 const wire=JSON.stringify({marker:MARKER,caseName});
 return 'const {createServer}=require("node:http");const wire='+JSON.stringify(wire)+';'+
  'const server=createServer((req,res)=>{res.setHeader("content-type","application/json");'+
  'if(req.method==="GET"&&req.url==="/health"){res.end(wire);return;}'+
  'if(req.method!=="POST"||req.url!=="/ack"){res.statusCode=404;res.end("{}");return;}'+
  'let s="",n=0;req.on("data",c=>{n+=c.length;if(n>512){req.destroy();return;}s+=c;});'+
  'req.on("end",()=>{res.statusCode=s===wire?200:400;res.end(s===wire?wire:"{}");});});'+
  'server.listen(8080,"0.0.0.0");setTimeout(()=>process.exit(0),15000);'+
  'process.on("SIGTERM",()=>process.exit(0));';
}
export class AfwContainerControl extends DurableObject {
 constructor(ctx,env){super(ctx,env);
  if(ctx.container?.running)void ctx.blockConcurrencyWhile(()=>this.close());
 }
 schema() {
  this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS control_meta (id INTEGER PRIMARY KEY CHECK(id=1),planId TEXT NOT NULL,start INTEGER NOT NULL,end INTEGER NOT NULL)');
  this.ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS control_cases (caseName TEXT PRIMARY KEY CHECK(caseName IN (\'0907\',\'0929\')),stage TEXT NOT NULL,createdAt INTEGER NOT NULL,closedAt INTEGER)');
 }
 stage(caseName,value){this.ctx.storage.sql.exec('UPDATE control_cases SET stage=? WHERE caseName=?',value,caseName);}
 async run(instanceId) {
  const cfg=controlConfig(this.env,Date.now(),instanceId);if(!cfg)return receipt('window_or_instance_closed');
  this.schema();
  this.ctx.storage.sql.exec('INSERT OR IGNORE INTO control_meta (id,planId,start,end) VALUES (1,?,?,?)',cfg.planId,cfg.start,cfg.end);
  const stored=this.ctx.storage.sql.exec('SELECT planId,start,end FROM control_meta WHERE id=1').toArray()[0];
  if(!sameControlPlan(stored,cfg))return receipt('original_window_changed');
  if(cfg.caseName==='0929'){
   const first=this.ctx.storage.sql.exec('SELECT stage FROM control_cases WHERE caseName=?','0907').toArray()[0];
   if(first?.stage!=='native_container_absent')return receipt('second_condition_not_due');
  }
  const admitted=this.ctx.storage.sql.exec('INSERT OR IGNORE INTO control_cases(caseName,stage,createdAt) VALUES(?,?,?) RETURNING caseName',cfg.caseName,'admitted',Date.now()).toArray();
  if(admitted.length!==1)return receipt('case_already_admitted',{caseName:cfg.caseName});
  const container=this.ctx.container;
  if(!container){this.stage(cfg.caseName,'native_container_absent');return receipt('native_container_absent',{caseName:cfg.caseName,nativeContainerPresent:false,startAttempted:false});}
  const startedMono=performance.now(),deadline=Math.min(cfg.end-10000,Date.now()+60000);
  let outcome='native_error',startAttempted=false,ready=false,ack=false,closure;
  const live=()=>Date.now()<deadline&&performance.now()-startedMono<60000&&
   controlConfig(this.env,Date.now(),instanceId)?.start===cfg.start&&
   controlConfig(this.env,Date.now(),instanceId)?.end===cfg.end;
  const request=async(method,path)=>{
   if(!live())throw new Error('control_deadline');
   const controller=new AbortController();
   return bounded(async()=>{
    const r=await container.getTcpPort(8080).fetch('http://container'+path,{method,signal:controller.signal,
     ...(method==='POST'?{headers:{'content-type':'application/json'},body:JSON.stringify({marker:MARKER,caseName:cfg.caseName})}:{})});
    const text=await readSmall(r);return {status:r.status,text};
   },Math.min(1500,Math.max(1,deadline-Date.now())),()=>controller.abort());
  };
  try {
   if(typeof container.running!=='boolean'||typeof container.start!=='function'||typeof container.destroy!=='function'){
    outcome='native_api_unexpected';
   }else if(container.running){outcome='unexpected_running';}
   else {
    await bounded(()=>this.ctx.storage.setAlarm(deadline+5000),3000);
    if(!live())throw new Error('control_deadline');
    this.stage(cfg.caseName,'start_attempted');startAttempted=true;
    container.start({image:'cloudflare/debian-trixie',entrypoint:['node','--eval',program(cfg.caseName)],instance:'lite',enableInternet:false});
    await bounded(()=>container.setInactivityTimeout(1000),3000);
    for(let i=0;i<60&&live();i++){
     let r;try{r=await request('GET','/health');}catch{r=null;}
     if(r?.status===200){
      if(!verifyControlResponse(r.text,cfg.caseName)){outcome='response_mismatch';break;}
      ready=true;break;
     }
     await new Promise(resolve=>setTimeout(resolve,250));
    }
    if(ready&&live()){
     const r=await request('POST','/ack');ack=r.status===200&&verifyControlResponse(r.text,cfg.caseName);
     outcome=ack?'fixed_roundtrip_verified':'response_mismatch';
    }else if(!ready&&outcome!=='response_mismatch')outcome='readiness_unconfirmed';
   }
  }catch{outcome=startAttempted?'start_or_transport_unconfirmed':'admission_unconfirmed';}
  finally {
   closure=await this.close();
   try{this.stage(cfg.caseName,outcome);}catch{}
  }
  return receipt(outcome,{caseName:cfg.caseName,nativeContainerPresent:true,startAttempted,ready,syntheticAck:ack,closure});
 }
 async close() {
  const c=this.ctx.container;let requested=false,ack=false;
  if(c&&typeof c.destroy==='function'){
   requested=true;try{await bounded(()=>c.destroy(),10000);ack=true;}catch{}
  }
  const stopped=c?c.running===false:null;
  try{this.schema();if(stopped)this.ctx.storage.sql.exec('UPDATE control_cases SET closedAt=? WHERE closedAt IS NULL',Date.now());}catch{}
  return {checkedAt:new Date().toISOString(),nativeContainerPresent:!!c,closureRequested:requested,closureAck:ack,nativeRunningFalse:stopped,physicalClosureAccepted:false};
 }
 async inspect() {
  this.schema();
  return receipt('inspection',{nativeContainerPresent:!!this.ctx.container,nativeRunning:this.ctx.container?.running??null,
   cases:this.ctx.storage.sql.exec('SELECT caseName,stage,createdAt,closedAt FROM control_cases ORDER BY caseName').toArray()});
 }
 async alarm(){await this.close();}
}
export class AfwContainerControlRun extends WorkflowEntrypoint {
 async run(event,step) {
  const id=event.instanceId;
  if(/^afw-20261022-close-0[1-3]$/.test(id))return step.do('close',OPTIONS,()=>this.env.CONTROL.getByName('original-control').close());
  if(/^afw-20261022-inspect-0[1-4]$/.test(id))return step.do('inspect',OPTIONS,()=>this.env.CONTROL.getByName('original-control').inspect());
  const cfg=controlConfig(this.env,Date.now(),id);if(!cfg)return receipt('window_or_instance_closed');
  return step.do('control-'+cfg.caseName,OPTIONS,()=>this.env.CONTROL.getByName('original-control').run(id));
 }
}
export default {fetch(){return new Response('{"code":"unavailable"}',{status:404,headers:{'content-type':'application/json','cache-control':'no-store'}});}};
