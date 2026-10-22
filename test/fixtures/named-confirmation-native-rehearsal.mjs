import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {activationConfigurationHash} from '../../lib/mcp-activation-observer.mjs';
import {RELEASE_TARGET} from '../../lib/mcp-release-operator-policy.mjs';
import {inertNamedConfirmationPolicy} from './inert-named-confirmation-policy.mjs';

// CI-only composition. Actual compiled operator, native Workflow/D1/namespace,
// exact historical module bytes; ALL provider replies and identities synthetic.
export async function rehearseExactNamedConfirmation({artifact,build,mode}){
 if(!['confirmed','tail-corrupt','regional-incident'].includes(mode))throw Error('Unknown CI rehearsal');
 const identity={name:'identity',modules:true,compatibilityDate:'2026-09-07',script:`import {DurableObject} from 'cloudflare:workers';export class Own extends DurableObject{fetch(){throw Error('No actor launch in package qualification');}}export default{fetch(r,e){return Response.json({original:e.NODE.idFromName('afw-own-event-one-occurrence-v1').toString()});}}`,durableObjects:{NODE:{className:'Own',useSQLite:true}}};
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
  const counters={providerReads:0,apiReads:0,largestReplyBytes:0},root='https://api.cloudflare.com/client/v4/accounts/'+RELEASE_TARGET.accountId;
  const urls={module:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId+'?include=modules',metadata:root+'/workers/workers/'+RELEASE_TARGET.workerName+'/versions/'+versionId,legacy:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/versions/'+versionId,deployments:root+'/workers/scripts/'+RELEASE_TARGET.workerName+'/deployments',application:root+'/containers/applications/'+RELEASE_TARGET.namespaceId};
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
   if(request.url===urls.deployments)result={deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}]};
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
  await mf.setOptions(convertV4MiniflareOptions({workers:[identity,operator]}));
  const db=await mf.getD1Database('RELEASE_DB','operator');
  for(const name of ['publication','activation']){
   const sql=readFileSync('db/dossier-'+name+'-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');
   for(const statement of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(statement[0]).run();
  }
  await db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').bind(policy.plan.artifactKey,RELEASE_TARGET.accountId,RELEASE_TARGET.workerName,artifact.sourceRevision,artifact.sourceTree,artifact.programHash,artifact.workerHash,Date.now()).run();
  await db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').bind(policy.plan.artifactKey,'79593972-3200-464f-aff6-76f5864dd399',etag,Date.now()).run();
  const httpStatus=(await (await mf.getWorker('operator')).fetch('https://synthetic.invalid/')).status;
  const {FLOW}=await mf.getBindings('operator'),instance=await FLOW.create({id:'afw-release-'+compiled.planHash,params:{planHash:compiled.planHash}});
  const end=Date.now()+12000;let state;
  do{state=await instance.status();if(['complete','errored','terminated'].includes(state.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<end);
  assert.equal(state.status,'complete','native qualification Workflow must actually complete');
  const counts={};for(const suffix of ['attempts','receipts','acceptances'])counts[suffix]=(await db.prepare('SELECT COUNT(*) n FROM dossier_activation_'+suffix).first()).n;
  return {httpStatus,output:state.output,counts,counters,activationKey:policy.plan.activationKey,versionId,deploymentId};
 }finally{await mf.dispose();}
}
