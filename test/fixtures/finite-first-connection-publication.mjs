// Fixed Node SYN component probes. DATA approvals exercise only the factual writer;
// they never consume an admission, publish a version, or produce ConnectionReceipt.
import assert from 'node:assert/strict';
export async function plain(p){const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v[Symbol.dispose]?.();}}
export function extendEnrollmentComponent(entry,writerAvailable){
 const imports=`import {readPrivateQaFiniteInitialAnchors} from './lib/mcp-qa-finite-initial-anchors.mjs';
 import {validateFiniteOwnerSource,encodeFinitePreparationRecord as encodePrep,hashFinitePreparationRecord as hashPrep,hashFiniteOwnerEvidence as componentEvidence,hashFiniteOwnerPreparationProject as projectHash} from './lib/mcp-qa-finite-preparation-records.mjs';
 import {finiteActivationConfigurationHash} from './lib/mcp-activation-observer.mjs';
 import {finitePublicProfileTemplate} from './lib/mcp-qa-finite-profile.mjs';
 import {initialHash as initialDigest} from './lib/mcp-qa-finite-initial-material-records.mjs';
 ${writerAvailable?"import {prepareFinitePreparationEnrollmentWrite} from './lib/mcp-qa-finite-preparation-enrollment-writer.mjs';":''}
 `;
 const methods=` async captureLegacyEnrollment(token,screen){
  const s=this.ctx.storage,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},trace=[],P='afw.finite-preparation-cleanup.v1:';
  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
  s.get=async(...a)=>{observe('get',a[0]);return Reflect.apply(native.get,s,a);};
  s.list=async(...a)=>{observe('list',a[0]?.prefix);return Reflect.apply(native.list,s,a);};
  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
  s.transaction=async fn=>{const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...a)=>tx.get(...a),list:(...a)=>tx.list(...a),put:(key,value)=>{observe('put',key);return tx.put(key,value);}})]);trace.push('transaction-settled');return result;};
  try{const result=await this.enrollmentPost(token,screen);return {result,trace:trace.slice(trace.indexOf('put:enrollment'))};}
  finally{for(const [key,value]of Object.entries(native))s[key]=value;}
 }
  async exerciseEnrollmentComponent(scenario='normal'){
   try{return await this.exerciseEnrollmentComponentBody(scenario);}
   catch(error){console.info('T1 component setup failure',String(error?.stack??error));return {trace:[],enrollment:null,ack:null,failure:'SYN component setup: '+String(error),settled:true};}
  }
  async exerciseEnrollmentComponentBody(scenario='normal'){
  const allowed=['normal','double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'];
  if(!allowed.includes(scenario))throw Error('SYN scenario absent');
  const ctx=this.ctx,env=this.env,s=ctx.storage,controller=new AbortController(),start=Date.now(),end=start+5000;
  const lease=Object.freeze({signal:controller.signal,assertCurrent(){if(controller.signal.aborted||Date.now()>=end)throw Error('SYN original child expired');}});
  const facts=await readPrivateQaFiniteInitialAnchors({ctx,env},lease),{capsule:c,material,actorId,plan}=facts,p=material.ownerSelection;
  const source=validateFiniteOwnerSource({sourceRevision:c.sourceRevision,actorId,qaNamespaceId:finitePublicProfileTemplate('qaLive').bindings.find(b=>b.name==='AFW_INDEPENDENT_CLOSURE').namespace_id,qaVersionId:c.qaVersionId,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:p.access,clientId:p.clientId,resource:p.resource,project:p.project,goal:p.goal,programContext:{programHash:material.originalContext.original.programHash,sourceRevision:material.originalContext.original.sourceRevision,originalContextHash:initialDigest('afw.finite-original-context.v1',material.originalContext)},initialBaseline:{versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,moduleHash:c.moduleHash,configurationHash:finiteActivationConfigurationHash(plan.configuration),bindingsHash:c.bindingsHash},currentPublication:{stage:null,versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,receiptHash:null},window:{startedAt:c.I0,expiresAt:c.C0}});
  const at=Date.now(),preconnectionId=c.preconnectionId,realm=componentEvidence('realm',{...source.access,origin:source.origin}),subjectHash=componentEvidence('subject',{accessRealmHash:realm,subject:p.subject}),ticketHash='8'.repeat(64),projectRef='7'.repeat(64);
  const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash,sourceRevision:c.sourceRevision,projectRef,connectionRef:null,preconnectionId,action:'connection',createdAt:at,expiresAt:c.C0};
  const decision={purpose:'afw.finite-connection-approval.v1',subjectHash,sourceRevision:c.sourceRevision,projectHash:projectHash(p.project),clientId:p.clientId,approvedAt:at,expiresAt:c.C0,csrfReceiptHash:componentEvidence('decision',{ticket,decision:'approve',projectHash:projectHash(p.project),goal:p.goal,clientId:p.clientId,approvedAt:at,expiresAt:c.C0})};
  const approvalHash=hashPrep('ConfigurationApproval',decision),approval={purpose:'afw.finite-connection-stage-approval.v1',preconnectionId,sourceRevision:c.sourceRevision,stage:'connection',ticketHash,approvalHash};
  const pre={purpose:'afw.finite-connection-preparation.v1',preconnectionId,sourceRevision:c.sourceRevision,actorId,owner:{subject:p.subject,accessRealmHash:realm,accessVerifiedAt:at,accessExpiresAt:c.C0},project:p.project,clientId:p.clientId,resource:p.resource,startedAt:at,expiresAt:c.C0,approvalHash,baselineHash:componentEvidence('baseline',source.initialBaseline)};pre.recordHash=hashPrep('Preconnection',pre);
  const snapshot={preconnectionId,initialTicketHash:ticketHash,source};snapshot.sourceHash=hashPrep('OwnerSourceSnapshot',snapshot);
  const prefix='connection-preparation:'+preconnectionId,rows=[[prefix+':record','Preconnection',pre],[prefix+':source','OwnerSourceSnapshot',snapshot],[prefix+':connection:approval','StageApproval',approval],['connection-approval:'+approvalHash,'ConfigurationApproval',decision],['owner-ticket:'+ticketHash,'Ticket',ticket],['owner-ticket:'+ticketHash+':use','TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',ticketHash,recordHash:decision.csrfReceiptHash,consumedAt:at}],['owner-project-ref:'+projectRef,'ProjectRef',{projectRef,preconnectionId,subjectHash,sourceRevision:c.sourceRevision,projectId:p.project.projectId,revision:p.project.revision,issuedAt:at,expiresAt:c.C0}]];
  for(const [key,kind,value]of rows)await s.put(key,encodePrep(kind,value));await s.sync();
  const trace=[],native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},metadata=env.AFW_QA_VERSION;
  let committed=null,failure=null,enrollment=null,ack=null,settled=false,writer;
  const P='afw.finite-preparation-cleanup.v1:';
  const observe=(kind,key)=>{if(key?.startsWith(P))trace.push(kind+':'+key.slice(P.length));};
  s.get=async(...args)=>{observe('get',args[0]);return Reflect.apply(native.get,s,args);};
  s.list=async(...args)=>{observe('list',args[0]?.prefix);return Reflect.apply(native.list,s,args);};
  s.getAlarm=async()=>{trace.push('alarm');return Reflect.apply(native.getAlarm,s,[]);};
  s.sync=async()=>{trace.push('sync');return Reflect.apply(native.sync,s,[]);};
  s.transaction=async fn=>{
   const result=await Reflect.apply(native.transaction,s,[tx=>fn({get:(...args)=>tx.get(...args),list:(...args)=>tx.list(...args),put:(key,value)=>{observe('put',key);committed=key;return tx.put(key,value);}})]);
   trace.push('transaction-settled');
   if(scenario==='unknown-enrollment'&&committed===P+'enrollment'||scenario==='unknown-ack'&&committed===P+'ack')throw Error('SYN native commit return unknown');
   return result;
  };
  try{
   if(!${writerAvailable})throw Error('fixed factual enrollment writer contract absent');
   const baseline={versionId:c.activatedVersionId,deploymentId:c.activatedDeploymentId,module:readPrivateQaFiniteCandidate().module,configuration:plan.configuration};
   writer=await prepareFinitePreparationEnrollmentWrite({ctx,env,preconnectionId,stageApprovalHash:hashPrep('StageApproval',approval),ownerSource:source,baseline,baselineBytes:readPrivateQaFiniteCandidate().bytes},lease,end);
   if(!Object.isFrozen(writer)||Object.keys(writer).sort().join(',')!=='recordAck,recordEnrollment')throw Error('SYN writer interface mismatch');
   trace.push('writer-prepared');
   if(scenario==='holder-drift')env.AFW_QA_VERSION={id:metadata.id};
   if(scenario==='deadline')controller.abort();
   if(scenario==='ack-first')await writer.recordAck();
   else {
    const first=writer.recordEnrollment();
    if(scenario==='double-enrollment')await writer.recordEnrollment().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-enrollment-denied');});
    const recorded=await first;enrollment=recorded.enrollment;const enrollmentReturnedAt=Date.now();
    if(recorded.ack!==null)throw Error('SYN premature ACK');
    const second=writer.recordAck();
    if(scenario==='double-ack')await writer.recordAck().then(()=>{throw Error('SYN duplicate accepted');},()=>{trace.push('duplicate-ack-denied');});
    ack=(await second).ack;if(ack.acknowledgedAt>enrollmentReturnedAt)throw Error('SYN ACK was prepared after enrollment returned');
   }
  }catch(error){failure=String(error);}
  finally{settled=true;for(const [key,value]of Object.entries(native))s[key]=value;env.AFW_QA_VERSION=metadata;controller.abort();}
  return {trace,enrollment,ack,failure,settled};
 }
 `;
 return imports+entry.replace(' export class Initial extends FiniteClosure{',' export class Initial extends FiniteClosure{'+methods);
}
export async function exerciseEnrollmentWriter(f,scenario){
 assert.equal(f.mode,'first-connection-enrollment-component');
 const before={uploads:f.uploads.length,activations:f.activations.length};
 const result=await plain(f.stub.exerciseEnrollmentComponent(scenario));
 assert.equal(f.uploads.length,before.uploads,'component has zero provider upload');
 assert.equal(f.activations.length,before.activations,'component has zero provider activation');
 const rows=await plain(f.stub.snapshot());
 assert.equal(rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')).length,0,'no ConnectionReceipt or SEND');
 return result;
}

// First-connection SOURCE lab: no seeded connection facts or source alias.
import {build} from 'esbuild';
import {createHash} from 'node:crypto';
import {gzipSync} from 'node:zlib';
import {readFile} from 'node:fs/promises';
import {buildMcpNodeProgram} from '../../scripts/build-mcp-node-program.mjs';
import {finiteWranglerProfileTemplate} from '../../lib/mcp-qa-finite-profile.mjs';
const digest=x=>createHash('sha256').update(x).digest('hex');
const origin='https://delegated-canary.agentfriendlyweb.dev';
export async function compileFirstConnectionCandidate(revision,tree){
 const node=await buildMcpNodeProgram(),define={'globalThis.__AFW_QA_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_SOURCE_REVISION__':JSON.stringify(revision),'globalThis.__AFW_NODE_PROGRAM__':JSON.stringify(node.program),'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('finite_trial_event')};
 const options={bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',define};
 const m=await build({...options,entryPoints:['worker/mcp-own/finite.mjs']});
 const bytes=m.outputFiles[0].contents,compressed=gzipSync(bytes,{level:9,mtime:0});
 const resident={purpose:'afw.finite-candidate-residency.v1',encoding:'gzip-base64.v1',sourceRevision:revision,sourceTree:tree,sourceCheck:'git-inputs-before-after-v1',programHash:node.programHash,module:{name:'index.mjs',sha256:digest(bytes),bytes:bytes.length},compressedSha256:digest(compressed),compressedBytes:compressed.length,content:Buffer.from(compressed).toString('base64')};
 // Negative-only, separately hashed ordinary-entry/SQL spy. The positive M
 // uses m.outputFiles unchanged, not this instrumented wrapper.
 const source=String.raw`
 import finite from './worker/mcp-own/finite.mjs';
 export {AfwOwnEventNode,AfwNodeControl} from './worker/mcp-own/finite.mjs';
 import {finiteNativeActor} from './lib/mcp-qa-finite-owner-native-wire.mjs';
 let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0;
 export default{async fetch(request,env,ctx){
  const path=new URL(request.url).pathname;
  if(path==='/_fixture/fault'){fault=await request.text();return new Response(null,{status:204});}
  if(path==='/_fixture/probe')return Response.json({ordinary:globalThis.__firstConnectionOrdinary,sql,forwarded});
  const ns=env.AFW_FINITE_TRIAL_CONTROL,db=env.DB;
  const prepared={...env,DB:{prepare(...a){sql++;return db.prepare(...a);},withSession(...a){sql++;return db.withSession(...a);}}};
  if(fault==='qa-absent')prepared.AFW_FINITE_TRIAL_CONTROL=undefined;
  if(fault==='version')prepared.AFW_FINITE_TRIAL_VERSION={id:'invalid'};
  if(fault==='actor')prepared.AFW_FINITE_TRIAL_CONTROL={idFromName(){return {toString:()=> 'bad'};},get(){throw Error('SYN wrong actor');}};
  if(!['qa-absent','actor'].includes(fault))prepared.AFW_FINITE_TRIAL_CONTROL={idFromName:ns.idFromName.bind(ns),get(id){
   const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
  }};
  if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
  // Literal actor is asserted in the product forwards, never selected by input.
  if(!finiteNativeActor)throw Error('SYN missing actor');
  return finite.fetch(request,prepared,ctx);
 }};
 `;
 const spy=await build({...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]});
 return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents)};
}
export function extendFirstConnectionPublication(entry){
 return "import {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
 async fetch(request){
  this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));this.firstConnectionCalls??=[];this.firstConnectionCalls.push({url:request.url,method:request.method,version:request.headers.get('x-afw-finite-version')});
  return super.fetch(request);
 }


 async firstConnectionAvailability(){
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/live-root')),entered=Date.now();
  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({available:true,live:true,entered}));}
  catch{return {available:false,live:!root.lease.signal.aborted,entered};}finally{root.finish();}
 }
 async firstConnectionRestore(){this.firstRestore?.();this.firstRestore=null;}
 async firstConnectionState(){return this.firstState??{trace:[]};}
 async firstConnectionRelease(which='work'){if(this.firstRelease)this.firstRelease[which]=true;}
 async firstConnectionConfigure(mode='normal'){
  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};this.firstRelease={};
  const owner=this,state=this.firstState,s=this.ctx.storage,env=this.env,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},fetcher=globalThis.fetch,wall=Date.now;
  let writes=[],receiptRead=false,shift=0;state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
  db.withSession=(...args)=>{if(args[0]==='first-primary')state.counts.firstPrimary++;const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=(...a)=>{state.counts.sql++;return Reflect.apply(prepare,session,a);};return session;};
  s.list=(...args)=>{state.counts.list++;return Reflect.apply(native.list,s,args);};
  const target=key=>typeof key==='string'&&(key.startsWith('afw.finite-preparation-cleanup.v1:')||key.startsWith('afw.finite-policy-effect.v1:'));
  const note=(kind,key)=>{if(target(key))state.trace.push({kind,key,at:Date.now()});};
  const held=(name,value)=>{const deadline=owner.firstBoundary.deadline;state[name+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){state[name+'Settled']=true;reject(Error('SYN original request deadline'));return;}if(owner.firstRelease[name]===true){state[name+'Settled']=true;resolve(value);return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
  const get=async(method,holder,args)=>{
   state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key);
   if(mode==='receipt-readback-lost'&&key.endsWith(':receipt')&&key.startsWith('afw.finite-policy-effect.v1:')&&value!==undefined)throw Error('SYN receipt readback unknown');
   if(mode==='final-pair-owner-drift'&&receiptRead&&key.endsWith(':capsule'))await env.RELEASE_DB.prepare("UPDATE site_projects SET user_id='SYN-negative-owner'").run();
   if(target(key)&&key.endsWith(':receipt')&&value!==undefined)receiptRead=true;
   return value;
  };
  s.get=(...a)=>get(native.get,s,a);
  s.transaction=fn=>{
   state.counts.transaction++;const currentWrites=[];
   const actual=Reflect.apply(native.transaction,s,[async tx=>{
    const result=await fn({get:(...a)=>get(tx.get,tx,a),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k);const out=await tx.put(k,v);note('put-settled',k);currentWrites.push(k);return out;}});
    return result;
   }]).then(value=>{writes=currentWrites;for(const key of writes)note('transaction-settled',key);return value;});
   return actual.then(async value=>{
    if(mode==='enrollment-transaction-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-send-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))||mode==='receipt-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native transaction result lost');
    if(mode==='enrollment-transaction-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
    return value;
   });
  };
  s.sync=async(...args)=>{
   state.counts.sync++;const value=await Reflect.apply(native.sync,s,args);for(const key of writes)note('sync-settled',key);
   if(mode==='enrollment-sync-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='receipt-sync-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native sync result lost');
   if(mode==='enrollment-sync-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
   return value;
  };
  globalThis.fetch=async(...args)=>{
   const url=String(args[0]),method=args[1]?.method??'GET',effect=method==='POST'?(url.endsWith('/versions?deploy=false')?'upload':url.endsWith('/deployments')?'activation':null):null;
   const response=await Reflect.apply(fetcher,globalThis,args);if(!effect)return response;
   state.trace.push({kind:'native-result-enter',effect,at:Date.now()});
   if(mode===effect+'-lost')throw Error('SYN applied provider result lost');
   if(mode===effect+'-held')return held('fetch',response);
   if(mode===effect+'-malformed'){await response.body.cancel();return Response.json({success:true,errors:[],messages:[],result:{id:'invalid'}},{headers:response.headers});}
   if(mode===effect+'-cached'){await response.body.cancel();return new Response('SYN rejected cache',{status:200,headers:{...Object.fromEntries(response.headers),Age:'1'}});}
   if(mode==='upload-oversize'){await response.body.cancel();return new Response('SYN header only',{status:200,headers:{...Object.fromEntries(response.headers),'Content-Length':'4718593'}});}
   if(mode==='upload-cancel-held'){await response.body.cancel();return new Response(new ReadableStream({cancel(){return held('cancel');}}),{status:401,headers:response.headers});}
   if(mode==='upload-read-held'){
    await response.body.cancel();let pulled=false;return new Response(new ReadableStream({pull(controller){if(pulled)return;pulled=true;return held('read').then(()=>{controller.enqueue(new Uint8Array([123]));});},cancel(){return held('cancel');}}),{headers:response.headers});
   }
   return response;
  };
  Date.now=()=>wall()+shift;
  if(mode==='clock-backward')shift=-1;
  this.firstRestore=()=>{for(const [key,value]of Object.entries(native))s[key]=value;globalThis.fetch=fetcher;Date.now=wall;db.withSession=withSession;};
 }
 async firstConnectionReseal(effect='upload',variant='ack'){
  const s=this.ctx.storage,rows=[...await s.list({prefix:'afw.finite-policy-effect.v1:'})],pair=rows.find(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect===effect);if(!pair)throw Error('SYN actual SEND absent');
  const send=JSON.parse(pair[1]),resourceId=effect==='upload'?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  if(variant==='context'){send.contextHash='f'.repeat(64);await s.put(pair[0],firstPrepEncode('ConnectionSend',send));}
  const ack={purpose:'afw.finite-connection-ack.v1',sendHash:firstPrepHash('ConnectionSend',send),resourceId,acknowledgedAt:Date.now()},raw=firstPrepEncode('ConnectionAck',ack);
  await s.put(pair[0].slice(0,-4)+'ack',raw);await s.sync();
  return {codecRoundtrip:firstPrepEncode('ConnectionAck',firstPrepDecode('ConnectionAck',raw))===raw};
 }

 async firstConnectionContext(){const request=new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/current'),root=createFiniteOwnerRequestLease(request);try{return await firstConnectionContext({ctx:this.ctx,env:this.env,parent:root.lease});}catch{return {status:'unavailable'};}finally{root.finish();}}
 async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {observation:globalThis.__t3Observation??[],calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
 `);
}
export function firstConnectionWorkers(qa,candidate){
 const p=finiteWranglerProfileTemplate('canaryLive'),bindingValues={...p.vars};
 const options={modules:true,outboundService:async()=>new Response(null,{status:503}),compatibilityDate:p.compatibility_date,compatibilityFlags:p.compatibility_flags,durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'},AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true,uniqueKey:'first-connection-node'}},d1Databases:{DB:'initial-db'},kvNamespaces:{OAUTH_KV:'first-connection-oauth'},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{...bindingValues,AFW_FINITE_TRIAL_VERSION:{id:'55555555-5555-4555-8555-555555555555'}}};
 return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript}]};
}
export async function approveFirstConnection(f,{token=null}={}){
 assert.equal(f.mode,'first-connection-publication');
 const facts=await plain(f.stub.capsuleFacts()),source=facts.material.ownerSelection;
 const screenStart=performance.now(),screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token??await f.enrollmentToken(source)}});
 console.info('T3 actual choice GET',JSON.stringify({status:screen.status,elapsedMs:performance.now()-screenStart}));if(screen.status!==200){console.info('T3 actual choice failure',JSON.stringify(await plain(f.stub.firstConnectionProbe())));return screen;}
 const text=await screen.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(text)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(text)?.[1],cookie=screen.headers.get('set-cookie')?.split(';')[0];
 assert(handle&&projectRef&&cookie,'actual choice must supply bounded form/cookie');
 f.choice={handle,projectRef,cookie};
 return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':token??await f.enrollmentToken(source),Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
}
export async function setFirstConnectionFault(f,fault){
 assert.equal(f.mode,'first-connection-publication');assert(['none','qa-absent','version','actor','version-drift','oauth-open'].includes(fault));
 const response=await f.negative.fetch(origin+'/_fixture/fault',{method:'POST',body:fault});assert.equal(response.status,204);
}
export async function readFirstConnectionProbe(f){
 const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.firstConnectionProbe()),negative=await (await f.negative.fetch(origin+'/_fixture/probe')).json();
 return {native,negative,providerRequests:f.providerRegistry.requests.slice(),uploads:f.uploads.length,activations:f.activations.length,effects:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,rows};
}

/** Passive SYN scalar/frame observation; no guard, return, body or source changed. */
export function instrumentFirstConnection(source){
 const fail="const fail=()=>{throw Error('Finite owner phase context unavailable');};";
 assert.equal(source.split(fail).length,2);
 source=source.replace(fail,()=> "const fail=()=>{const error=Error('Finite owner phase context unavailable');(globalThis.__t3Observation??=[]).push({kind:'failure',frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});throw error;};");
 const start=source.indexOf('export async function handlePrivateQaFiniteOwnerConnection('),end=source.indexOf('/** Fixed unmounted QA implementation.',start);
 assert(start>=0&&end>start);let handler=source.slice(start,end);
 handler=handler.replace("}catch(error){failed=true;position='failed';",()=>"}catch(error){(globalThis.__t3Observation??=[]).push({kind:'connection-failure',position,frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});failed=true;position='failed';");
 source=source.slice(0,start)+handler+source.slice(end);
 source=source.replace("async function observeOwnerPhasePair(options){\n let clock,onAbort,parentSignal;",()=>"async function observeOwnerPhasePair(options){\ const observedAt=performance.now();\n let clock,onAbort,parentSignal;");
 source=source.replace("}finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}",()=>"}finally{(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}");
 return source;
}
