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
  if(fault==='profile')prepared.AFW_DELEGATED_OAUTH_ENABLED='false';
  if(fault==='actor')prepared.AFW_FINITE_TRIAL_CONTROL={idFromName(){return {toString:()=> 'bad'};},get(){throw Error('SYN wrong actor');}};
  if(!['qa-absent','actor'].includes(fault))prepared.AFW_FINITE_TRIAL_CONTROL={idFromName:ns.idFromName.bind(ns),get(id){
   const stub=ns.get(id);return {fetch(req){forwarded++;if(fault==='version-drift'){prepared.AFW_FINITE_TRIAL_VERSION={id:env.AFW_FINITE_TRIAL_VERSION.id};}return stub.fetch(req);}};
  }};
  if(fault==='oauth-open')prepared.AFW_DELEGATED_OAUTH_ENABLED='true';
  if(fault==='wrong-profile')return finite.fetch(request,{...prepared},ctx);
  // Literal actor is asserted in the product forwards, never selected by input.
  if(!finiteNativeActor)throw Error('SYN missing actor');
  return finite.fetch(request,prepared,ctx);
 }};
 `;
 const spy=await build({...options,stdin:{contents:source,resolveDir:process.cwd()},plugins:[{name:'negative-only-ordinary-spy',setup(b){b.onLoad({filter:/worker\/mcp-own\/index\.mjs$/},async args=>{const text=await readFile(args.path,'utf8'),needle='const worker={fetch(request,env,ctx){';assert.equal(text.split(needle).length,2);return {contents:text.replace(needle,needle+'globalThis.__firstConnectionOrdinary++;'),loader:'js'};});}}]});
 return {script:m.outputFiles[0].text,bytes,program:node.program,resident,metafile:m.metafile,spyScript:spy.outputFiles[0].text,spyHash:digest(spy.outputFiles[0].contents)};
}
export function extendFirstConnectionPublication(entry){
 return entry.replace(' export class Initial extends FiniteClosure{',String.raw` export class Initial extends FiniteClosure{
 async fetch(request){
  this.firstConnectionCalls??=[];this.firstConnectionCalls.push({url:request.url,method:request.method,version:request.headers.get('x-afw-finite-version')});
  return super.fetch(request);
 }
 async firstConnectionProbe(){const rows=[...await this.ctx.storage.list()];return {calls:this.firstConnectionCalls??[],business:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')||k.startsWith('connection-preparation:')||k.startsWith('afw.finite-preparation-cleanup.v1:')||k.startsWith('owner-ticket:')).map(([key])=>key),alarm:await this.ctx.storage.getAlarm()};}
 `);
}
export function firstConnectionWorkers(qa,candidate){
 const p=finiteWranglerProfileTemplate('canaryLive'),bindingValues={...p.vars};
 const options={modules:true,outboundService:async()=>new Response(null,{status:503}),compatibilityDate:p.compatibility_date,compatibilityFlags:p.compatibility_flags,durableObjects:{AFW_FINITE_TRIAL_CONTROL:{className:'Initial',scriptName:'qa-first-connection',useSQLite:true,uniqueKey:'initial-c2a'},AFW_DOSSIER_EVENTS_NODE:{className:'AfwOwnEventNode',useSQLite:true,uniqueKey:'first-connection-node'}},d1Databases:{DB:'SYN-first-connection-M'},kvNamespaces:{OAUTH_KV:'first-connection-oauth'},ratelimits:{DELEGATED_RATE_LIMITER:{namespace_id:'99126',simple:{limit:1000,period:60}}},bindings:{...bindingValues,AFW_FINITE_TRIAL_VERSION:{id:'55555555-5555-4555-8555-555555555555'}}};
 return {workers:[{...options,name:'canary-first-connection',script:candidate.script},qa,{...options,name:'negative-first-connection',script:candidate.spyScript}]};
}
export async function approveFirstConnection(f){
 assert.equal(f.mode,'first-connection-publication');
 const facts=await plain(f.stub.capsuleFacts()),source=facts.material.ownerSelection;
 const screen=await f.call('/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':await f.enrollmentToken(source)}});
 if(screen.status!==200)return screen;
 const text=await screen.text(),handle=/name="handle" value="([a-f0-9]{64})"/.exec(text)?.[1],projectRef=/name="projectRef" value="([a-f0-9]{64})"/.exec(text)?.[1],cookie=screen.headers.get('set-cookie')?.split(';')[0];
 assert(handle&&projectRef&&cookie,'actual choice must supply bounded form/cookie');
 return f.call('/connections/finite-prepare',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':await f.enrollmentToken(source),Cookie:cookie},body:new URLSearchParams({handle,projectRef,decision:'approve'}).toString()});
}
export async function setFirstConnectionFault(f,fault){
 assert.equal(f.mode,'first-connection-publication');assert(['none','qa-absent','version','profile','actor','version-drift','oauth-open'].includes(fault));
 const response=await f.negative.fetch(origin+'/_fixture/fault',{method:'POST',body:fault});assert.equal(response.status,204);
}
export async function readFirstConnectionProbe(f){
 const rows=await plain(f.stub.snapshot()),native=await plain(f.stub.firstConnectionProbe()),negative=await (await f.negative.fetch(origin+'/_fixture/probe')).json();
 return {native,negative,providerRequests:f.providerRegistry.requests.slice(),uploads:f.uploads.length,activations:f.activations.length,effects:rows.filter(([k])=>k.startsWith('afw.finite-policy-effect.v1:')).length,rows};
}
