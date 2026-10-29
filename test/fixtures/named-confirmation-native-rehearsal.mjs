import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
import {inertNamedConfirmationPolicy} from './inert-named-confirmation-policy.mjs';
import {reservationFaultHarness} from './reservation-fault-harness.mjs';

// CI-only composition. Actual compiled operator, native Workflow/D1/namespace,
// exact historical module bytes; ALL provider replies and identities synthetic.
export async function rehearseExactNamedConfirmation({artifact,build,mode,payloadMode='object',invocation='workflow',reserve=null,retirement='stopped',replay=false,fault=null}){
 if(!['confirmed','tail-corrupt','regional-incident','metadata-reject','second-active'].includes(mode))throw Error('Unknown CI rehearsal');
 const identity={name:'identity',modules:true,compatibilityDate:'2026-09-07',script:`import {DurableObject} from 'cloudflare:workers';export class Own extends DurableObject{observeRetired(){if(!this.env.RETIRED)throw Error('No custody');const r=JSON.parse(this.env.RETIRED);return {...r,observedAt:this.env.RETIREMENT==='future-string'?String(Date.now()+1000):this.env.RETIREMENT==='future-unsafe'?8640000000000001:Date.now()+(this.env.RETIREMENT==='stale'?-31000:this.env.RETIREMENT==='future'?1000:0),...(this.env.RETIREMENT==='mismatch'?{programHash:'0'.repeat(64)}:{})};}fetch(){throw Error('No actor launch in package qualification');}}export default{fetch(r,e){return Response.json({original:e.NODE.idFromName('afw-own-event-one-occurrence-v1').toString()});}}`,durableObjects:{NODE:{className:'Own',useSQLite:true}}};
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[identity]}));
 try{
  const ids=await (await (await mf.getWorker('identity')).fetch('https://synthetic.invalid/ids')).json();
  const policy=inertNamedConfirmationPolicy(artifact),window={startAt:Date.now()-1000,expiresAt:Date.now()+120000};
  Object.assign(policy,window);Object.assign(policy.plan,window);
  const config=policy.observation.configuration,manifestBinding=config.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY'),manifest=JSON.parse(manifestBinding.text);
  manifest.original.containerId=ids.original;Object.assign(manifest.candidate,window);manifestBinding.text=JSON.stringify(manifest);
  const events=config.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');events.text=JSON.stringify({...JSON.parse(events.text),...window});
  // Mirror the real provider's Container-linked export and attachment shape.
  config.exports.AfwOwnEventNode.container='agent-friendly-web-delegated-canary-afwowneventnode';
  config.containers=[{class_name:'AfwOwnEventNode',name:'agent-friendly-web-delegated-canary-afwowneventnode'}];
  policy.plan.configurationHash=activationConfigurationHash(config);
  const compiled=await build({artifact,policy}),{versionId,deploymentId}=policy.observation,etag='f'.repeat(64);
  const counters={providerReads:0,apiReads:0,largestReplyBytes:0,...(reserve!==null?{retirementReads:0}:{})},root='https://api.cloudflare.com/client/v4/accounts/'+RELEASE_TARGET.accountId;
  const urls={module:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId+'?include=modules',metadata:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId,legacy:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/versions/'+versionId,deployments:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/deployments',application:root+'/containers/applications/'+RELEASE_TARGET.namespaceId,instance:root+'/containers/applications/'+RELEASE_TARGET.namespaceId+'/instances/'+ids.original};
  const outboundService=async request=>{
   assert.equal(request.method,'GET','qualification must never publish');
   if(request.url==='https://www.cloudflarestatus.com/api/v2/incidents.json'){
    counters.providerReads++;
    const incidents=[{id:'cbvocc87nsne',name:'Workers Cron Trigger Activation Issues',status:'resolved',updated_at:'2026-10-14T00:00:00.000Z',components:[],incident_updates:[]}];
    if(mode==='regional-incident')incidents.push({id:'ciworkersregion',name:'Regional elevated errors',status:'investigating',updated_at:'2026-10-14T00:00:00.000Z',components:[{name:'Workers'}],incident_updates:[]});
    return Response.json({page:{url:'https://www.cloudflarestatus.com'},incidents});
   }
   assert.equal(request.headers.get('Authorization'),'Bearer synthetic_read_credential');
   assert.ok(Object.values(urls).includes(request.url),'unexpected provider target');counters.apiReads++;
   let result;
   if(mode==='metadata-reject'&&request.url===urls.metadata)return Response.json({success:false,errors:[{message:'synthetic_sensitive_value'}]},{status:403});
   if(request.url===urls.instance){counters.retirementReads++;result={id:ids.original,application_id:RELEASE_TARGET.namespaceId,image:'cloudflare/debian-trixie',started_at:new Date(window.startAt-9000).toISOString(),status:{state:retirement==='running'?'running':'stopped',exit_code:0,updated_at:new Date(window.startAt-4000).toISOString()}};}
   else if(request.url===urls.deployments)result={deployments:[{id:mode==='second-active'&&counters.apiReads===7?'33333333-3333-4333-8333-333333333333':deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}]};
   else if(request.url===urls.application)result={id:RELEASE_TARGET.namespaceId,account_id:RELEASE_TARGET.accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:RELEASE_TARGET.namespaceId}};
   else if(request.url===urls.legacy)result={id:versionId,resources:{script:{etag},bindings:config.bindings}};
   else{
    result={id:versionId,...config,number:1,startup_time_ms:1,annotations:{'workers/message':'CI-only provider projection'},urls:[],source:'api',created_on:'2026-10-14T00:00:00.000Z',author_id:'ci-only',author_email:'ci-only@example.invalid',env:Object.fromEntries(config.bindings.map(b=>[b.name,null]))};
    if(request.url===urls.module){
     const bytes=Buffer.from(artifact.script);if(mode==='tail-corrupt')bytes[bytes.length-1]^=1;
     result.modules=[{name:'index.mjs',content_type:'application/javascript+module',content_base64:bytes.toString('base64')}];
    }
   }
   const encoded=JSON.stringify({success:true,errors:[],result});counters.largestReplyBytes=Math.max(counters.largestReplyBytes,Buffer.byteLength(encoded));
   return new Response(encoded,{headers:{'Content-Type':'application/json'}});
  };
  const operator={name:'operator',modules:true,script:compiled.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED:'true',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',scriptName:'identity'}},d1Databases:{RELEASE_DB:'exact-named-rehearsal'},workflows:{FLOW:{name:'afw-exact-confirmation-qualification',className:'AfwReleaseWorkflow'}},outboundService};
  if(reserve!==null)operator.bindings.AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED=reserve;
  if(fault!==null)operator.script+='\n'+reservationFaultHarness(fault);
  const retired={purpose:'afw.node-retirement-observation.v1',containerId:ids.original,programHash:manifest.original.programHash,sourceRevision:manifest.original.sourceRevision,processGeneration:'8'.repeat(64),image:'cloudflare/debian-trixie',createdAt:window.startAt-10000,expiresAt:window.startAt-5000,closedAt:window.startAt-3000,observedAt:window.startAt-2000,physicalStopVerified:false,mayStartSuccessor:false};
  identity.bindings={RETIREMENT:retirement,...(retirement==='absent'?{}:{RETIRED:JSON.stringify(retired)})};
  if(['expired','rewind'].includes(retirement))operator.script="const originalFetch=globalThis.fetch;globalThis.fetch=async(...args)=>{const r=await originalFetch(...args);if(String(args[0]).includes('/instances/'))Date.now=()=>"+(retirement==='expired'?window.expiresAt+1:window.startAt)+";return r;};\\n".replace('\\n','\n')+operator.script;
  const caller={name:'rpc-caller',modules:true,compatibilityDate:'2026-09-07',bindings:{PLAN_HASH:compiled.planHash},serviceBindings:{OPERATOR:{name:'operator',entrypoint:'AfwReleaseOperator'}},script:'export default{async fetch(r,e){try{return Response.json(await e.OPERATOR.run(e.PLAN_HASH));}catch(error){return Response.json({error:error.message});}}}'};
  await mf.setOptions(convertV4MiniflareOptions({workers:[identity,operator,caller]}));
  const db=await mf.getD1Database('RELEASE_DB','operator');
  for(const name of ['publication','activation']){
   const sql=readFileSync('db/dossier-'+name+'-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');
   for(const statement of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
  }
  if(reserve==='true'){
   await db.exec('CREATE TABLE dossier_node_process_admissions(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT);CREATE TABLE dossier_node_process_closures(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT,closed_at INTEGER);');
   const schema=readFileSync('db/dossier-successor-reservation.sql','utf8');
   for(const statement of schema.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE TRIGGER[^\n]+;/g))await db.prepare(statement[0]).run();
   await db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?)').bind('original',ids.original,retired.processGeneration,retired.programHash,retired.sourceRevision,retired.image).run();
   await db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').bind('original',ids.original,retired.processGeneration,retired.programHash,retired.sourceRevision,retired.image,retired.closedAt).run();
  }
  await db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').bind(policy.plan.artifactKey,RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,artifact.sourceRevision,artifact.sourceTree,artifact.programHash,artifact.workerHash,Date.now()).run();
  await db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').bind(policy.plan.artifactKey,'79593972-3200-464f-aff6-76f5864dd399',etag,Date.now()).run();
  const httpStatus=(await (await mf.getWorker('operator')).fetch('https://synthetic.invalid/')).status;
  let output;
  if(invocation==='rpc')output=await (await (await mf.getWorker('rpc-caller')).fetch('https://synthetic.invalid/')).json();
  else{
  const {FLOW}=await mf.getBindings('operator'),instance=await FLOW.create({id:'afw-release-'+compiled.planHash,params:payloadMode==='string'?JSON.stringify({planHash:compiled.planHash}):{planHash:compiled.planHash}});
  const end=Date.now()+12000;let state;
  do{state=await instance.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<end);
  assert.equal(state.status,'complete','native qualification Workflow must actually complete');
  output=state.output;
  if(replay){await instance.restart();let again;const replayEnd=Date.now()+12000;do{again=await instance.status();if(['complete','errored','terminated'].includes(again.status)&&again.output?.status==='uncertain')break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<replayEnd);assert.equal(again.status,'complete');assert.equal(again.output?.status,'uncertain');}
  }
  const counts={};for(const suffix of ['attempts','receipts','acceptances'])counts[suffix]=(await db.prepare('SELECT COUNT(*) n FROM dossier_activation_'+suffix).first()).n;
  const reservationCount=reserve==='true'?(await db.prepare('SELECT COUNT(*) n FROM dossier_successor_reservations').first()).n:0;
  return {httpStatus,output,counts,counters,reservationCount,activationKey:policy.plan.activationKey,versionId,deploymentId};
 }finally{await mf.dispose();}
}
