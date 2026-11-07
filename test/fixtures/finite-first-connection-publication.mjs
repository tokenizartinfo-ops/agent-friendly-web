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
export async function compileFirstConnectionCandidate(revision,tree,{negativeProfile=false}={}){
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
 let fault='none';globalThis.__firstConnectionOrdinary=0;let sql=0,forwarded=0,lateRelease;
 const late={armed:false,reached:false,released:false,nativeReturned:false,nativeRejected:false,startedAt:null,finishedAt:null};
 export default{async fetch(request,env,ctx){
  const path=new URL(request.url).pathname;
  if(path==='/_fixture/fault'){fault=await request.text();return new Response(null,{status:204});}
  if(path==='/_fixture/probe')return Response.json({ordinary:globalThis.__firstConnectionOrdinary,sql,forwarded});
  if(path==='/_fixture/r2-late-arm'){late.armed=true;return new Response(null,{status:204});}
  if(path==='/_fixture/r2-late-signal')return Response.json(late);
  if(path==='/_fixture/r2-late-release'){late.released=true;lateRelease?.();return new Response(null,{status:204});}
  const ns=env.AFW_FINITE_TRIAL_CONTROL,db=env.DB;
  const prepared={...env,DB:{prepare(...a){sql++;return db.prepare(...a);},withSession(...a){sql++;return db.withSession(...a);}}};
  if(late.armed){
   const kv=env.OAUTH_KV;
   prepared.OAUTH_KV={get:kv.get.bind(kv),list:kv.list.bind(kv),delete:kv.delete.bind(kv),async put(key,value,options){
    if(!late.reached&&(key.startsWith('token:')||key.startsWith('grant:'))){late.reached=true;late.startedAt=Date.now();await new Promise(resolve=>{lateRelease=resolve;});}
    try{const result=await kv.put(key,value,options);late.nativeReturned=true;return result;}catch(error){late.nativeRejected=true;throw error;}finally{late.finishedAt=Date.now();}
   }};
  }
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
 const spyOptions={...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]};
 const spy=await build(spyOptions),wrong=negativeProfile?await build({...spyOptions,define:{...define,'globalThis.__AFW_FINITE_ENTRYPOINT_PROFILE__':JSON.stringify('ordinary')}}):null;
 return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents),wrongProfileScript:wrong?.outputFiles[0].text??null,wrongProfileHash:wrong?digest(wrong.outputFiles[0].contents):null};
}
export function extendFirstConnectionPublication(entry){
 return "import {createHash as firstTraceHash} from 'node:crypto';\nimport {createFinitePolicyEffectJournal as firstJournal} from './lib/mcp-qa-finite-policy-journal.mjs';\nimport {hashFinitePreparationRecord as firstPrepHash,encodeFinitePreparationRecord as firstPrepEncode,decodeFinitePreparationRecord as firstPrepDecode,hashFinitePolicyEffectIdentity as firstIdentityHash} from './lib/mcp-qa-finite-preparation-records.mjs';\nimport {readPrivateQaFiniteOwnerContext as firstConnectionContext} from './lib/mcp-qa-finite-owner-phase-context.mjs';\n"+entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
 async fetch(request){
  try{this.firstBoundary=JSON.parse(request.headers.get('x-afw-finite-boundary'));}catch{this.firstBoundary=null;}this.firstOriginalMethod=request.headers.get('x-afw-finite-original-method');this.firstRequestId=request.headers.get('x-afw-finite-request-id');globalThis.__t3NativeTraceRequestId=this.firstRequestId;this.firstConnectionCalls??=[];this.firstConnectionCalls.push({boundary:this.firstBoundary,url:request.url,method:request.method,originalMethod:this.firstOriginalMethod,requestId:this.firstRequestId,version:request.headers.get('x-afw-finite-version')});
  const originalMethod=this.firstOriginalMethod,requestId=this.firstRequestId,target=request.url,trace=this.firstState?.trace,actual=super.fetch(request);
  const observed=response=>{if(originalMethod==='POST'&&target==='https://afw-private.invalid/_finite-owner/choice')trace?.push({kind:'native-response-return',requestId,originalMethod,target,status:response.status,at:Date.now()});};
  if(actual&&typeof actual.then==='function')actual.then(observed,()=>{}).catch(()=>{});else observed(actual);
  return actual;
 }




 async firstConnectionTicketFault(variant){
  const s=this.ctx.storage;
  if(variant==='restore'){for(const [key,raw]of this.firstTicketOriginal??[])await s.put(key,raw);this.firstTicketOriginal=null;await s.sync();return {restored:true};}
  if(this.firstTicketOriginal)throw Error('SYN ticket corruption not restored');
  const rows=[...await s.list()],ticketRow=rows.find(([key])=>key.startsWith('owner-ticket:')&&!key.endsWith(':use'));if(!ticketRow)throw Error('SYN actual choice ticket absent');
  let key=ticketRow[0],kind='Ticket',record=JSON.parse(ticketRow[1]);
  if(variant==='action'){record.action='notices';record.connectionRef='c'.repeat(64);}
  if(variant==='preconnection')record.preconnectionId='f'.repeat(64);
  if(variant==='source')record.sourceRevision='e'.repeat(40);
  if(variant==='subject-realm')record.subjectHash='d'.repeat(64);
  if(variant==='project-map'){kind='ProjectRef';key='owner-project-ref:'+record.projectRef;record=JSON.parse(await s.get(key));record.projectId='SYN-foreign-project';}
  if(variant==='snapshot'){kind='OwnerSourceSnapshot';key='connection-preparation:'+record.preconnectionId+':source';record=JSON.parse(await s.get(key));record.source.project.revision++;record.sourceHash=firstPrepHash(kind,record);}
  const original=await s.get(key),raw=firstPrepEncode(kind,record);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN negative ticket codec');
  this.firstTicketOriginal=[[key,original]];await s.put(key,raw);await s.sync();return {codecRoundtrip:true,kind};
 }
 async firstConnectionCorruptCompleted(variant){
  const s=this.ctx.storage;
  if(variant==='restore'){for(const [key,raw]of this.firstCorruptedOriginal??[])await s.put(key,raw);this.firstCorruptedOriginal=null;await s.sync();return;}
  if(this.firstCorruptedOriginal)throw Error('SYN corruption not restored');
  const rows=[...await s.list()],effect=rows.filter(([key])=>key.startsWith('afw.finite-policy-effect.v1:')),send=kind=>effect.find(([key,raw])=>key.endsWith(':send')&&JSON.parse(raw).effect===kind),u=send('upload'),a=send('activation'),r=effect.find(([key])=>key.endsWith(':receipt'));
  if(!u||!a||!r)throw Error('SYN actual completed publication absent');
  const up=JSON.parse(u[1]),act=JSON.parse(a[1]),uploadAck=JSON.parse(await s.get(u[0].slice(0,-4)+'ack')),activationAck=JSON.parse(await s.get(a[0].slice(0,-4)+'ack')),receipt=JSON.parse(r[1]),modified=[];
  const change=async(key,kind,value)=>{const original=await s.get(key);modified.push([key,original]);if(kind==='Preconnection')value.recordHash=firstPrepHash(kind,value);if(kind==='ConnectionReceipt')value.receiptHash=firstPrepHash(kind,value);const raw=firstPrepEncode(kind,value);if(firstPrepEncode(kind,firstPrepDecode(kind,raw))!==raw)throw Error('SYN codec did not roundtrip');await s.put(key,raw);};
  const foreign='dddddddd-dddd-4ddd-8ddd-dddddddddddd';
  if(variant==='owner'||variant==='source'){
   const key='connection-preparation:'+receipt.preconnectionId+':record',pre=JSON.parse(await s.get(key));if(variant==='owner')pre.owner.subject='SYN-foreign-owner';else pre.sourceRevision='e'.repeat(40);await change(key,'Preconnection',pre);
  }else{
   if(variant==='context')up.contextHash=act.contextHash='f'.repeat(64);
   if(variant==='baseline'){up.baselineVersionId=act.baselineVersionId=receipt.baselineVersionId=foreign;up.baselineDeploymentId=act.baselineDeploymentId=receipt.baselineDeploymentId=foreign;}
   if(variant==='preconnection')receipt.preconnectionId='f'.repeat(64);
   if(variant==='module')receipt.moduleHash='f'.repeat(64);
   if(variant==='configuration')receipt.configurationHash='f'.repeat(64);
   if(variant==='version')uploadAck.resourceId=receipt.versionId=foreign;
   if(variant==='deployment')activationAck.resourceId=receipt.deploymentId=foreign;
   if(variant==='receipt-links')receipt.baselineDeploymentId=foreign;
   if(variant==='receipt-time')receipt.completedAt=act.deadline;
   if(!['context','baseline','preconnection','module','configuration','version','deployment','receipt-links','receipt-time','writer-head'].includes(variant))throw Error('SYN unknown completed variant');
   uploadAck.sendHash=firstPrepHash('ConnectionSend',up);activationAck.sendHash=firstPrepHash('ConnectionSend',act);
   for(const [key,kind,value]of [[u[0],'ConnectionSend',up],[a[0],'ConnectionSend',act],[u[0].slice(0,-4)+'ack','ConnectionAck',uploadAck],[a[0].slice(0,-4)+'ack','ConnectionAck',activationAck],[r[0],'ConnectionReceipt',receipt]])await change(key,kind,value);
   const key='afw.finite-policy-effect.v1:writer-head';modified.push([key,await s.get(key)]);const h=variant==='writer-head'?up:act,identity={kind:'connection',preconnectionId:h.preconnectionId,sourceRevision:h.sourceRevision,stage:h.stage,effect:h.effect};await s.put(key,JSON.stringify({identityHash:firstIdentityHash(identity),sendHash:firstPrepHash('ConnectionSend',h)}));
  }
  this.firstCorruptedOriginal=modified;await s.sync();
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/journal-codec'));
  try{const identity=kind=>({kind:'connection',preconnectionId:up.preconnectionId,sourceRevision:up.sourceRevision,stage:'connection',effect:kind}),upload=await firstJournal({storage:s,identity:identity('upload'),now:Date.now}).read(root.lease),activation=await firstJournal({storage:s,identity:identity('activation'),now:Date.now}).read(root.lease);return {codecRoundtrip:true,journalValid:upload.state==='acknowledged'&&activation.state==='installed'};}finally{root.finish();}
 }


 async firstConnectionExpiredEntry(){
  const now=Date.now(),headers={'x-afw-finite-boundary':JSON.stringify({startedAt:now-30000,deadline:now-1,remainingMs:0}),'x-afw-finite-original-method':'GET','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID()};
  const response=await this.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers})),status=response.status;await response.body?.cancel();return {status};
 }
 async firstConnectionBodyControl(key){if(this.firstBodyControl)this.firstBodyControl[key]=true;}
 async firstConnectionBodyState(){return this.firstBodyState??{};}
 async firstConnectionBodyStart(kind='read'){
  const began=Date.now(),deadline=began+30000,owner=this,controller=new AbortController(),state=this.firstBodyState={readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false,kind},control=this.firstBodyControl={abort:false,read:false,cancel:false};
  const held=key=>{state[key+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(remaining<=0){state[key+'Settled']=true;reject(Error('SYN original body deadline'));return;}if(control[key]){state[key+'Settled']=true;resolve();return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
  let pulled=false;
  const body=new ReadableStream({start(c){if(kind==='overflow')c.enqueue(new Uint8Array(1025));},pull(c){if(kind!=='read'||pulled)return;pulled=true;return held('read').then(()=>{c.enqueue(new TextEncoder().encode('handle='+'a'.repeat(64)));});},cancel(){return held('cancel');}},{highWaterMark:0});
  const headers={'x-afw-finite-boundary':JSON.stringify({startedAt:began,deadline,remainingMs:30000}),'x-afw-finite-original-method':'POST','x-afw-finite-original-url':'https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare','x-afw-finite-version':'55555555-5555-4555-8555-555555555555','x-afw-finite-request-id':crypto.randomUUID(),Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded'};
  let timer,logicalFinished=false;
  const tick=()=>{if(logicalFinished)return;if(control.abort||Date.now()>=deadline){controller.abort();return;}timer=setTimeout(tick,Math.min(10,Math.max(1,deadline-Date.now())));};tick();
  try{const response=await owner.fetch(new Request('https://afw-private.invalid/_finite-owner/choice',{method:'POST',headers,body,signal:controller.signal}));state.status=response.status;await response.body?.cancel();return state;}
  finally{logicalFinished=true;clearTimeout(timer);state.logicalFinished=true;}
 }

 async firstConnectionRestart(){this.ctx.abort('SYN original actor restart');}
 async firstConnectionInstance(){return this.firstInstance??=crypto.randomUUID();}
 async firstConnectionBackupFault(mode){
  const s=this.ctx.storage;
  if(mode==='restore'){for(const [key,raw]of this.firstBackupOriginal??[])await s.put(key,raw);await s.sync();return;}
  const rows=[...await s.list()],entries=rows.filter(([key])=>key.startsWith('afw.finite-initial-upload.v1:'));this.firstBackupOriginal??=entries;
  const backup=entries.find(([key])=>key.endsWith(':backup')),chunk=entries.find(([key])=>key.includes(':chunk:')),receipt=entries.find(([key])=>key.endsWith(':receipt'));
  const target=mode==='missing-backup'?backup:mode==='missing-receipt'?receipt:chunk;if(!target)throw Error('SYN retained original target absent');
  if(mode.startsWith('missing-'))await s.delete(target[0]);else await s.put(target[0],target[1]+' ');
  await s.sync();
 }
 async firstConnectionAvailability(){
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/live-root')),entered=Date.now();
  try{return await observeFiniteOwnerRequestWork({ctx:this.ctx,env:this.env,originalLease:root.lease},async()=>({available:true,live:true,entered}));}
  catch{return {available:false,live:!root.lease.signal.aborted,entered};}finally{root.finish();}
 }
 async firstConnectionRestore(){this.firstRestore?.();this.firstRestore=null;}
 async firstConnectionState(){return {...(this.firstState??{trace:[]}),http:globalThis.__t3Http??[]};}
 async firstConnectionRelease(which='work'){if(this.firstRelease)this.firstRelease[which]=true;}
 async firstConnectionConfigure(mode='normal'){
  this.firstRestore?.();this.firstState={mode,trace:[],fetchHeld:false,fetchSettled:false,readHeld:false,readSettled:false,cancelHeld:false,cancelSettled:false};globalThis.__t3NativeTrace=this.firstState.trace;this.firstRelease={};
  const owner=this,state=this.firstState,s=this.ctx.storage,env=this.env,native={get:s.get,list:s.list,transaction:s.transaction,sync:s.sync,getAlarm:s.getAlarm},fetcher=globalThis.fetch,wall=Date.now;
  let writes=[],receiptRead=false,shift=0;const committedValues=new Map();const originalMetadata=env.AFW_QA_VERSION,originalQaId=originalMetadata.id,originalPrepare=env.RELEASE_DB.prepare,originalNode=env.AFW_RELEASE_EVENTS_NODE,nodeName=originalNode.idFromName,originalSelf=env.AFW_INDEPENDENT_CLOSURE,selfGet=originalSelf.get,originalKv=env.AFW_FINITE_OWNER_OAUTH_KV,kvGet=originalKv.get,originalReader=env.AFW_MCP_CLOSURE_READ_TOKEN;state.afterDriftIo={get:0,list:0,db:0,node:0,self:0,kv:0,fetch:0};const afterDrift=kind=>{if(state.holderChanged)state.afterDriftIo[kind]++;};state.counts={get:0,list:0,transaction:0,sync:0,firstPrimary:0,sql:0};const db=env.RELEASE_DB,withSession=db.withSession;
  db.withSession=(...args)=>{afterDrift('db');if(args[0]==='first-primary')state.counts.firstPrimary++;const session=Reflect.apply(withSession,db,args),prepare=session.prepare;session.prepare=(...a)=>{state.counts.sql++;const statement=Reflect.apply(prepare,session,a);if(mode==='source-sql-held'&&String(a[0]).includes('site_projects')){const bind=statement.bind;statement.bind=(...values)=>{const bound=Reflect.apply(bind,statement,values),first=bound.first;bound.first=async(...params)=>{const actual=Reflect.apply(first,bound,params),value=await actual;if(state.sqlHeld)return value;state.sqlHeld=true;return held('work',value);};return bound;};}return statement;};return session;};
  s.list=(...args)=>{afterDrift('list');state.counts.list++;return Reflect.apply(native.list,s,args);};
  const target=key=>typeof key==='string'&&(key.startsWith('afw.finite-preparation-cleanup.v1:')||key.startsWith('afw.finite-policy-effect.v1:'));
  const rawHash=value=>typeof value==='string'?firstTraceHash('sha256').update(value).digest('hex'):null;
  const note=(kind,key,value,scope,transactionId=null)=>{if(target(key))state.trace.push({kind,key,valueHash:rawHash(value),scope,transactionId,requestId:owner.firstRequestId,at:Date.now()});};
  const held=(name,value)=>{const deadline=owner.firstBoundary.deadline;state[name+'Boundary']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state[name+'Held']=true;return new Promise((resolve,reject)=>{const tick=()=>{const remaining=deadline-Date.now();if(!Number.isSafeInteger(remaining)||remaining<=0){state[name+'Settled']=true;reject(Error('SYN original request deadline'));return;}if(owner.firstRelease[name]===true){state[name+'Settled']=true;resolve(value);return;}setTimeout(tick,Math.min(10,remaining));};tick();});};
  const get=async(method,holder,args,scope='storage',transactionId=null,transactionReads=null)=>{
   afterDrift('get');state.counts.get++;const value=await Reflect.apply(method,holder,args),key=args[0];note('get-settled',key,value,scope,transactionId);if(transactionReads&&target(key))transactionReads.push([key,value]);
   if(mode==='clock-backward'&&owner.firstBoundary&&!state.backward){shift-=100;state.backward=true;}
   if(mode==='source-holder-drift'&&owner.firstBoundary&&!state.holderChanged){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
   if(mode==='access-expiry-held'&&state.jwkFetched&&!state.workHeld)return held('work',value);
   if(mode==='receipt-readback-lost'&&key.endsWith(':receipt')&&key.startsWith('afw.finite-policy-effect.v1:')&&value!==undefined)throw Error('SYN receipt readback unknown');
   if(mode==='final-pair-owner-drift'&&receiptRead&&key.endsWith(':capsule'))await env.RELEASE_DB.prepare("UPDATE site_projects SET user_id='SYN-negative-owner'").run();
   if(target(key)&&key.endsWith(':receipt')&&value!==undefined)receiptRead=true;
   return value;
  };
  s.get=(...a)=>get(native.get,s,a);
  s.transaction=fn=>{
   const transactionId=++state.counts.transaction,currentWrites=[],currentValues=new Map(),currentReads=[];
   const actual=Reflect.apply(native.transaction,s,[async tx=>{
    const result=await fn({get:(...a)=>get(tx.get,tx,a,'transaction',transactionId,currentReads),list:tx.list.bind(tx),put:async(k,v)=>{note('put-enter',k,v,'transaction',transactionId);const out=await tx.put(k,v);note('put-settled',k,v,'transaction',transactionId);currentValues.set(k,v);currentWrites.push(k);return out;}});
    return result;
   }]).then(value=>{writes=currentWrites;for(const key of writes){const raw=currentValues.get(key);if(target(key))committedValues.set(key,raw);note('transaction-settled',key,raw,'transaction',transactionId);}if(currentWrites.length===0)for(const [key,raw]of currentReads)note('readback-transaction-settled',key,raw,'transaction',transactionId);return value;});
   return actual.then(async value=>{
    if(mode==='enrollment-transaction-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-send-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':send'))||mode==='receipt-transaction-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native transaction result lost');
    if(mode==='enrollment-transaction-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='upload-ack-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':ack'))||mode==='receipt-transaction-held'&&writes.some(key=>key.startsWith('afw.finite-policy-effect.v1:')&&key.endsWith(':receipt')))return held('work',value);
    return value;
   });
  };
  s.sync=async(...args)=>{
   state.counts.sync++;const syncing=writes.map(key=>[key,committedValues.get(key)]),value=await Reflect.apply(native.sync,s,args);for(const [key,raw]of syncing)note('sync-settled',key,raw,'storage');
   if(mode==='enrollment-sync-lost'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment')||mode==='receipt-sync-lost'&&writes.some(k=>k.startsWith('afw.finite-policy-effect.v1:')&&k.endsWith(':receipt')))throw Error('SYN native sync result lost');
   if(mode==='enrollment-sync-held'&&writes.includes('afw.finite-preparation-cleanup.v1:enrollment'))return held('work',value);
   return value;
  };
  globalThis.fetch=async(...args)=>{
   const url=String(args[0]),method=args[1]?.method??'GET',effect=method==='POST'?(url.endsWith('/versions?deploy=false')?'upload':url.endsWith('/deployments')?'activation':null):null;
   afterDrift('fetch');if(effect){state[effect+'Admission']={...owner.firstBoundary,originalMethod:owner.firstOriginalMethod,enteredAt:Date.now()};state.trace.push({kind:'native-invocation',effect,requestId:owner.firstRequestId,method,url,bodyHash:rawHash(args[1]?.body),at:Date.now()});}const response=await Reflect.apply(fetcher,globalThis,args);if(url.endsWith('/cdn-cgi/access/certs'))state.jwkFetched=true;if(!effect)return response;
   state.trace.push({kind:'native-result-enter',effect,requestId:owner.firstRequestId,status:response.status,at:Date.now()});
   if(effect==='upload'){
    if(mode==='upload-metadata-id-drift'){originalMetadata.id='dddddddd-dddd-4ddd-8ddd-dddddddddddd';state.holderChanged=true;}
    if(mode==='upload-db-method-drift'){db.withSession=(...args)=>{afterDrift('db');return Reflect.apply(withSession,db,args);};state.holderChanged=true;}
    if(mode==='upload-db-prepare-drift'){db.prepare=(...args)=>{afterDrift('db');return Reflect.apply(originalPrepare,db,args);};state.holderChanged=true;}
    if(mode==='upload-node-method-drift'){originalNode.idFromName=(...args)=>{afterDrift('node');return Reflect.apply(nodeName,originalNode,args);};state.holderChanged=true;}
    if(mode==='upload-self-method-drift'){originalSelf.get=(...args)=>{afterDrift('self');return Reflect.apply(selfGet,originalSelf,args);};state.holderChanged=true;}
    if(mode==='upload-kv-method-drift'){originalKv.get=(...args)=>{afterDrift('kv');return Reflect.apply(kvGet,originalKv,args);};state.holderChanged=true;}
    if(mode==='upload-fetch-drift'){globalThis.fetch=(...args)=>{afterDrift('fetch');return Reflect.apply(fetcher,globalThis,args);};state.holderChanged=true;}
    if(mode==='upload-credential-drift'){env.AFW_MCP_CLOSURE_READ_TOKEN='SYN-negative-changed-reader';state.holderChanged=true;}
   }
   if(mode===effect+'-holder-drift'){env.AFW_QA_VERSION={id:originalMetadata.id};state.holderChanged=true;}
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
  this.firstRestore=()=>{for(const [key,value]of Object.entries(native))s[key]=value;globalThis.fetch=fetcher;Date.now=wall;db.withSession=withSession;originalMetadata.id=originalQaId;env.AFW_QA_VERSION=originalMetadata;db.prepare=originalPrepare;originalNode.idFromName=nodeName;originalSelf.get=selfGet;originalKv.get=kvGet;env.AFW_MCP_CLOSURE_READ_TOKEN=originalReader;};
 }
 async firstConnectionReseal(effect='upload',variant='ack'){
  const s=this.ctx.storage,rows=[...await s.list({prefix:'afw.finite-policy-effect.v1:'})],pair=rows.find(([k,v])=>k.endsWith(':send')&&JSON.parse(v).effect===effect);if(!pair)throw Error('SYN actual SEND absent');
  const send=JSON.parse(pair[1]),resourceId=effect==='upload'?'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa':'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
  if(variant==='ack-matched'){const frozen=Date.now();Date.now=()=>frozen;}
  if(variant==='context'){send.contextHash='f'.repeat(64);await s.put(pair[0],firstPrepEncode('ConnectionSend',send));}
  const ack={purpose:'afw.finite-connection-ack.v1',sendHash:firstPrepHash('ConnectionSend',send),resourceId,acknowledgedAt:Date.now()},raw=firstPrepEncode('ConnectionAck',ack);
  await s.put(pair[0].slice(0,-4)+'ack',raw);await s.sync();
  const root=createFiniteOwnerRequestLease(new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/foreign-journal'));
  try{const read=await firstJournal({storage:s,identity:{kind:'connection',preconnectionId:send.preconnectionId,sourceRevision:send.sourceRevision,stage:send.stage,effect},now:Date.now}).read(root.lease);return {codecRoundtrip:firstPrepEncode('ConnectionAck',firstPrepDecode('ConnectionAck',raw))===raw,journalValid:read.state==='acknowledged'};}finally{root.finish();}
 }

 async firstConnectionContext(){const request=new Request('https://delegated-canary.agentfriendlyweb.dev/fixture/current'),root=createFiniteOwnerRequestLease(request);try{return await firstConnectionContext({ctx:this.ctx,env:this.env,parent:root.lease});}catch(error){(globalThis.__t3Observation??=[]).push({kind:'public-reader-rejected',frames:String(error.stack).split('\n').filter(line=>/^\s+at\s/.test(line)).slice(0,8)});return {status:'unavailable'};}finally{root.finish();}}
 async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {observation:globalThis.__t3Observation??[],calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
 `);
}
export function firstConnectionWorkers(qa,candidate){
 const p=finiteWranglerProfileTemplate('canaryLive'),bindingValues={...p.vars};
 const options={modules:true,outboundService:async()=>new Response(null,{status:503}),compatibilityDate:p.compatibility_date,compatibilityFlags:p.compatibility_flags,durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'},AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true,uniqueKey:'first-connection-node'}},d1Databases:{DB:'initial-db'},kvNamespaces:{OAUTH_KV:'first-connection-oauth'},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{...bindingValues,AFW_FINITE_TRIAL_VERSION:{id:'55555555-5555-4555-8555-555555555555'}}};
 return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript},...(candidate.wrongProfileScript?[{...options,name:'wrong-profile-first-connection',script:candidate.wrongProfileScript}]:[])]};
}
export async function approveFirstConnection(f,{token=null}={}){
 assert.equal(f.mode,'first-connection-publication');f.choicePostStarted=null;f.failedChoiceState=null;
 const facts=await plain(f.stub.capsuleFacts()),source=facts.material.ownerSelection;
 const screenStart=performance.now(),screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':token??await f.enrollmentToken(source)}});
 console.info('T3 actual choice GET',JSON.stringify({status:screen.status,elapsedMs:performance.now()-screenStart}));if(screen.status!==200){f.failedChoiceState=await plain(f.stub.firstConnectionState());console.info('T3 actual choice failure',JSON.stringify(await plain(f.stub.firstConnectionProbe())));return screen;}
 const text=await screen.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(text)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(text)?.[1],cookie=screen.headers.get('set-cookie')?.split(';')[0];
 assert(handle&&projectRef&&cookie,'actual choice must supply bounded form/cookie');
 f.choice={handle,projectRef,cookie};const postToken=token??await f.enrollmentToken(source);f.choicePostStarted=performance.now();
 return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':postToken,Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
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
export function instrumentFirstConnection(source,{mutation=null}={}){
 const fail="const fail=()=>{throw Error('Finite owner phase context unavailable');};";
 assert.equal(source.split(fail).length,2);
 source=source.replace(fail,()=> "const fail=()=>{const error=Error('Finite owner phase context unavailable');(globalThis.__t3Observation??=[]).push({kind:'failure',frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});throw error;};");
 const start=source.indexOf('export async function handlePrivateQaFiniteOwnerConnection('),end=source.indexOf('/** Fixed unmounted QA implementation.',start);
 assert(start>=0&&end>start);let handler=source.slice(start,end);
 handler=handler.replace("}catch(error){failed=true;position='failed';",()=>"}catch(error){(globalThis.__t3Observation??=[]).push({kind:'connection-failure',position,frames:String(error.stack).split('\\n').filter(line=>/^\\s+at\\s/.test(line)).slice(0,6)});failed=true;position='failed';");


 const resultTarget="const result=await wait(()=>j[method](value,l));";
 assert.equal(handler.split(resultTarget).length,2,'passive original journal result target exactly once');
 handler=handler.replace(resultTarget,()=>resultTarget+"(globalThis.__t3Observation??=[]).push({kind:'journal-mutation',recordKind:kind,method,status:result.status});");
 if(mutation==='existing-ack'){
  const target="if(result.status!=='recorded'||result.recordHash!==prepHash(kind,value))fail();";
  assert.equal(handler.split(target).length,2,'negative-only own recorded ACK target exactly once');
  handler=handler.replace(target,()=>"if(result.status!=='recorded'&&!(kind==='ConnectionAck'&&result.status==='existing')||result.recordHash!==prepHash(kind,value))fail();");
 }
 source=source.slice(0,start)+handler+source.slice(end);
 const publicTarget="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
 assert.equal(source.split(publicTarget).length,2,'passive public partial boundary exactly once');
 source=source.replace(publicTarget,()=>"if(s.records.effects.length&&!s.installed.receipt)(globalThis.__t3Observation??=[]).push({kind:'public-partial-target'});"+publicTarget);
 if(mutation==='public-partial'){
  const target="if(s.records.effects.length&&!s.installed.receipt||s.preparation.ticketUse&&!s.preparation.stageApproval)fail();";
  assert.equal(source.split(target).length,2,'negative-only public partial target exactly once');
  source=source.replace(target,()=>"if(s.preparation.ticketUse&&!s.preparation.stageApproval)fail();");
 }
 const correlators=[
  ["pre.owner.subject!==p.subject","sa.ticketHash!==t.ticketHash",'preparation'],
  ["t.ticketHash!==data.sourceSnapshot.initialTicketHash","t.action!=='connection'",'ticket-map'],
  ["data.sourceSnapshot.preconnectionId!==id","canonical(data.sourceSnapshot.source)!==canonical(source)",'source-snapshot'],
  ["s.preconnectionId!==id","s.contextHash!==contextHash",'connection-history'],
  ["upload.ack.resourceId===capsule.activatedVersionId","actual.pointer.versionId!==upload.ack.resourceId",'publication-pointer'],
  ["receipt.moduleHash!==capsule.moduleHash","receipt.configurationHash!==finiteActivationConfigurationHash",'receipt-physical-hash'],
  ["f.effects.size!==expectedRows","writer-head",'writer-head']
 ];
 for(const [first,second,name]of correlators){
  const lines=source.split('\n'),matches=lines.map((line,i)=>line.includes(first)&&line.includes(second)?i:-1).filter(i=>i>=0);assert.equal(matches.length,1,'passive correlator label '+name);
  const i=matches[0];assert(lines[i].endsWith('fail();'));lines[i]=lines[i].slice(0,-7)+"{(globalThis.__t3Observation??=[]).push({kind:'correlator',name:'"+name+"'});fail();}";source=lines.join('\n');
 }

 source=source.replace("async function observeOwnerPhasePair(options){\n let clock,onAbort,parentSignal;",()=>"async function observeOwnerPhasePair(options){\ const observedAt=performance.now();\n let clock,onAbort,parentSignal;");
 source=source.replace("}finally{if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}",()=>"}finally{(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});if(parentSignal&&onAbort)parentSignal.removeEventListener('abort',onAbort);clock?.close();}");
 return instrumentFirstConnectionObserverIo(source);
}


function instrumentFirstConnectionObserverIo(source){
 const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive native HTTP source marker');source=source.replace(needle,()=>next);};
 const declaration="const request=(path,cap=65536,token=reader)=>child(async l=>{\n    let response,stream;";
 once(declaration,"const request=(path,cap=65536,token=reader)=>child(async l=>{\n    const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);let response,stream;");
 const loop="for(;;){const part=await retain(stream.read());current(l);";
 once(loop,"for(;;){const part=await retain(stream.read());io.reads++;io.bytes+=part.value?.byteLength??0;current(l);");
 const ending="}finally{if(stream)await retain(stream.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
 once(ending,"}finally{if(stream){io.cancelCalls++;await retain(stream.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
 return source;
}
export function instrumentFirstConnectionEngine(source){
 const once=(needle,next)=>{assert.equal(source.split(needle).length,2,'passive fixed engine HTTP marker');source=source.replace(needle,()=>next);};
 once("async function http(method,path,body,c){\n  check(c);","async function http(method,path,body,c){\n  const io={kind:'engine',method,bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};(globalThis.__t3Http??=[]).push(io);check(c);");
 once("for(;;){const part=await retain(reader.read());check(c);","for(;;){const part=await retain(reader.read());io.reads++;io.bytes+=part.value?.byteLength??0;check(c);");

 for(const [method,effect]of [['upload','upload'],['activate','activation']]){
  const describe=method==='upload'?'describeUpload':'describeActivation',needle=method+"(input,c){return invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});}";
  once(needle,method+"(input,c){const trace=globalThis.__t3NativeTrace,requestId=globalThis.__t3NativeTraceRequestId,actual=invoke(c,async()=>{const request="+describe+"(input);return result(await http(request.method,request.path,request.body,c));});actual.then(value=>{trace?.push({kind:'native-operation-settled',effect:'"+effect+"',resourceId:value.id,requestId,at:Date.now()});},()=>{}).catch(()=>{});return actual;}");
 }
 const ending="finally{if(reader)await retain(reader.cancel()).catch(()=>{});else if(response?.body&&!response.body.locked)await retain(response.body.cancel()).catch(()=>{});}";
 once(ending,"finally{if(reader){io.cancelCalls++;await retain(reader.cancel()).then(()=>{io.cancelSettled++;},()=>{});}else if(response?.body&&!response.body.locked){io.cancelCalls++;await retain(response.body.cancel()).then(()=>{io.cancelSettled++;},()=>{});}io.settled=true;}");
 return source;
}


/** Negative SDK-only writer. It deliberately omits AFW's callback; never an M admission. */
export async function compileCleanupSdkOnlyWorker(){
 const source=String.raw`
 import {OAuthAuthorizationServer} from '@cloudflare/workers-oauth-provider';
 import {createFiniteOwnerRequestLease,readFiniteOwnerRequestBoundary} from './lib/mcp-qa-finite-owner-preparation.mjs';
 const O='https://delegated-canary.agentfriendlyweb.dev',scopes=['afw:project:read'];
 const server=new OAuthAuthorizationServer({issuer:O,resources:[O+'/mcp'],scopesSupported:scopes,accessTokenTTL:300,refreshTokenTTL:0,clientIdMetadataDocumentEnabled:false});
 const hash=async v=>Buffer.from(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(v))).toString('hex');
 const check=(v,message)=>{if(!v)throw Error('SYN SDK-only '+message);};
 let retained=null,release=null,signal={reached:false,settled:false};
 export default{async fetch(request,env){
  const path=new URL(request.url).pathname;
  if(path==='/_fixture/sdk-only-signal')return Response.json(signal);
  if(path==='/_fixture/sdk-only-release'){release?.();return new Response(null,{status:204});}
  if(path!=='/_fixture/sdk-only-exchange'||request.method!=='POST')return new Response(null,{status:404});
  if(retained)return new Response(null,{status:409});
  const root=createFiniteOwnerRequestLease(request),boundary=readFiniteOwnerRequestBoundary(root.lease);
  const startedMono=performance.now(),childDeadline=Math.min(boundary.deadline,boundary.startedAt+5000);
  const current=()=>{root.lease.assertCurrent();check(Date.now()<childDeadline&&performance.now()-startedMono<5000,'original child expired');};
  let timer,bodyFinish;
  signal={label:'SYN adversarial SDK-only; AFW callback deliberately omitted',worker:'sdk-only-first-connection',callbackOmitted:true,MAdmission:false,rootStartedAt:boundary.startedAt,rootDeadline:boundary.deadline,childDeadline,reached:false,settled:false,retained:false,released:false,logicalDeniedAt:null,nativeReturned:false,nativeRejected:false};
  try{
   const input=await request.json();current();
   check(Number.isSafeInteger(input.C0)&&Date.now()<input.C0,'original C0');
   const original=server.getOAuthApi(env),summary=await original.unwrapToken(input.subjectToken);current();
   check(summary&&summary.grantId===input.sdkGrantId&&summary.grant.clientId===input.clientId&&summary.audience===O+'/mcp'&&JSON.stringify(summary.scope)===JSON.stringify(scopes),'same genuine token identity/scope/audience');
   check(summary.expiresAt*1000-Date.now()>=65000,'genuine token needs >=65s remaining');
   const grantKey='grant:'+summary.userId+':'+summary.grantId,grant=await env.OAUTH_KV.get(grantKey,{type:'json'});current();
   check(grant?.id===summary.grantId&&grant.metadata?.afwFiniteCleanup?.correlationHash===input.correlationHash,'same native grant/correlation');
   signal.tokenHash=await hash(input.subjectToken);signal.selectorHash=await hash(summary.grantId);signal.subjectHash=await hash(summary.userId);signal.correlationHash=input.correlationHash;signal.referenceHash=input.referenceHash;signal.tokenExpiresAt=summary.expiresAt;signal.grantExpiresAt=grant.expiresAt??null;signal.C0=input.C0;
   const kv=env.OAUTH_KV,prefix='token:'+summary.userId+':'+summary.grantId+':';
   const wrapped={get(...args){current();return kv.get(...args);},list(){throw Error('SYN no SDK list');},delete(){throw Error('SYN no SDK delete');},async put(key,value,options){
    current();check(!signal.reached&&key.startsWith(prefix),'single original token write only');
    const native=JSON.parse(value);check(native.grantId===summary.grantId&&native.userId===summary.userId&&native.audience===summary.audience&&JSON.stringify(native.scope)===JSON.stringify(scopes),'same SDK write tuple');
    signal.reached=true;signal.reachedAt=Date.now();signal.write={keyHash:await hash(key),valueHash:await hash(value),expiresAt:native.expiresAt,expirationTtl:options.expirationTtl};current();
    release=()=>{signal.released=true;signal.releasedAt=Date.now();};
    while(!signal.released){check(Date.now()<input.C0+180000,'original C1 retention observation exhausted');await new Promise(resolve=>setTimeout(resolve,250));}
    // The already-started SDK operation survives logical denial. No new business work is admitted.
    signal.nativeAttemptAt=Date.now();
    try{const result=await kv.put(key,value,options);signal.nativeReturned=true;return result;}
    catch(error){signal.nativeRejected=true;throw error;}
    finally{signal.nativeSettledAt=Date.now();}
   }};
   current();
   const actual=server.getOAuthApi({...env,OAUTH_KV:wrapped}).exchangeToken({subjectToken:input.subjectToken,scope:scopes,aud:O+'/mcp'});
   retained=actual;signal.retained=true;
   // Register settlement before the race; only this exact promise can clear retention.
   actual.then(async value=>{signal.sdkReturned=true;signal.resultTokenHash=await hash(value.access_token);},()=>{signal.sdkRejected=true;}).finally(()=>{signal.settled=true;signal.settledAt=Date.now();signal.retained=false;retained=null;release=null;bodyFinish?.();}).catch(()=>{});
   const denied=new Promise(resolve=>{timer=setTimeout(()=>resolve('deadline'),Math.max(0,childDeadline-Date.now()));});
   const outcome=await Promise.race([actual.then(()=> 'early-return',()=> 'early-rejection'),denied]);
   signal.logicalDeniedAt=Date.now();signal.logicalReason=outcome;root.finish();clearTimeout(timer);
   // Fixed denied headers/body are available at the original child deadline. Keeping the
   // transport body open retains execution context, not the expired logical Root.
   const body=new ReadableStream({start(controller){controller.enqueue(new TextEncoder().encode('SYN SDK-only denied'));bodyFinish=()=>{try{controller.close();}catch{}};if(signal.settled)bodyFinish();},cancel(){return actual.catch(()=>{});}});
   return new Response(body,{status:403,headers:{'Content-Type':'text/plain','Cache-Control':'no-store'}});
  }catch{
   root.finish();clearTimeout(timer);signal.logicalDeniedAt=Date.now();signal.logicalReason='premise-rejected';return new Response('SYN SDK-only premise rejected',{status:412});
  }
 }};
`;
 const result=await build({bundle:true,write:false,metafile:true,platform:'neutral',mainFields:['module','main'],format:'esm',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none',stdin:{contents:source,resolveDir:process.cwd()}});
 return {script:result.outputFiles[0].text,bytes:result.outputFiles[0].contents.length,sha256:digest(result.outputFiles[0].contents),metafile:result.metafile,sourceKind:'SYN adversarial SDK-only; AFW callback omitted'};
}
