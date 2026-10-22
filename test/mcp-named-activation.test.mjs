import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import * as policyModule from '../lib/mcp-release-operator-policy.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';
import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
const hash=s=>createHash('sha256').update(s).digest('hex');
export function fixture(){
 const t=policyModule.RELEASE_TARGET,script='export default {}',window={startAt:1000,expiresAt:601000};
 const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
 const plan={activationKey:'d'.repeat(64),artifactKey:hash(JSON.stringify([t.accountId,t.workerName,artifact.workerHash])),trialId:'e'.repeat(64),configurationHash:'',...window};
 const manifest={scope:{accountId:t.accountId,workerName:t.workerName,namespaceId:t.namespaceId,applicationId:t.namespaceId,ownerRef:'1'.repeat(64),projectRef:'2'.repeat(64),resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'},original:{containerId:'3'.repeat(64),applicationId:t.namespaceId,programHash:'4'.repeat(64),sourceRevision:'5'.repeat(40)},candidate:{trialId:plan.trialId,programHash:artifact.programHash,sourceRevision:artifact.sourceRevision,...window,budget:1},publication:{artifactKey:plan.artifactKey,workerHash:artifact.workerHash,activationKey:plan.activationKey}};
 const eventPolicy={grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:manifest.scope.resource,...window};
 const bindings=[{name:'DB',type:'d1',id:t.databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:t.kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:t.namespaceId,class_name:'AfwOwnEventNode'},...Object.entries({AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify(manifest),AFW_DOSSIER_EVENTS_POLICY:JSON.stringify(eventPolicy),AFW_OAUTH_ISSUER:manifest.scope.resource.slice(0,-4),AFW_OAUTH_RESOURCE:manifest.scope.resource,AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_OAUTH_PILOT_CLIENT_ID:'client'}).map(([name,text])=>({name,type:'plain_text',text}))];
 const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings,usage_model:'standard',containers:[]};
 plan.configurationHash=activationConfigurationHash(configuration);
 const bundle={artifact,policy:{operation:'confirm_named',...window,plan,observation:{versionId:'11111111-1111-4111-8111-111111111111',deploymentId:'22222222-2222-4222-8222-222222222222',namespaceId:t.namespaceId,applicationId:t.namespaceId,configuration}}};
 let gets=0;const namespace={idFromName:name=>({toString:()=>name==='afw-own-event-one-occurrence-v1'?'3'.repeat(64):'6'.repeat(64)}),idFromString:id=>({toString:()=>id}),get(){gets++;throw Error('No IO');}};
 const update=()=>{bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_POLICY').text=JSON.stringify(manifest);plan.configurationHash=activationConfigurationHash(configuration);};
 return{bundle,manifest,namespace,update,gets:()=>gets};
}
test('named activation materializes scope from the same binding without caller ID or storage',()=>{
 const f=fixture();assert.equal(policyModule.validateReleaseOperatorBundle(f.bundle),true);
 const r=policyModule.resolveNamedActivationPlan(f.bundle,f.namespace),expected=resolveSuccessorPreparation({...Object.fromEntries(['scope','original','candidate'].map(k=>[k,f.manifest[k]])),namespace:f.namespace});
 assert.equal(r.plan.scopeHash,expected.candidate.scopeHash);assert.equal(Object.hasOwn(f.bundle.policy.plan,'scopeHash'),false);assert.equal(f.gets(),0);r.current();
});
test('foreign manifest, mismatched artifact/window/publication and manual scope fail before resolution',()=>{
 for(const mode of ['account','namespace','source','program','window','trial','artifact','worker','activation','manual','disabled']){
  const f=fixture(),m=f.manifest;
  if(mode==='account')m.scope.accountId='0'.repeat(32);if(mode==='namespace')m.scope.namespaceId='0'.repeat(32);
  if(mode==='source')m.candidate.sourceRevision='0'.repeat(40);if(mode==='program')m.candidate.programHash='0'.repeat(64);
  if(mode==='window')m.candidate.expiresAt--;if(mode==='trial')m.candidate.trialId='0'.repeat(64);
  if(mode==='artifact')m.publication.artifactKey='0'.repeat(64);if(mode==='worker')m.publication.workerHash='0'.repeat(64);if(mode==='activation')m.publication.activationKey='0'.repeat(64);
  if(mode==='manual')f.bundle.policy.plan.scopeHash='0'.repeat(64);
  if(mode==='disabled')f.bundle.policy.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_SUCCESSOR_ENABLED').text='false';
  f.update();assert.throws(()=>policyModule.validateReleaseOperatorBundle(f.bundle),mode);assert.equal(f.gets(),0);
 }
});
test('binding mismatch and identity drift cannot produce current scope',()=>{
 const f=fixture(),r=policyModule.resolveNamedActivationPlan(f.bundle,f.namespace);f.namespace.idFromName=()=>({toString:()=> '7'.repeat(64)});assert.throws(()=>r.current());assert.throws(()=>policyModule.resolveNamedActivationPlan(f.bundle,f.namespace));assert.equal(f.gets(),0);
});

test('missing or inconsistent live event policy fails before consuming activation',()=>{
 for(const mode of ['missing','window','resource','mixed','project','client','issuer']){const f=fixture(),config=f.bundle.policy.observation.configuration,b=config.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY'),e=JSON.parse(b.text);
  if(mode==='missing')config.bindings.splice(config.bindings.indexOf(b),1);
  if(mode==='window')e.expiresAt--;if(mode==='resource')e.resource='https://other.invalid/mcp';if(mode==='mixed')e.containerId='6'.repeat(64);if(mode==='project')e.projectId='other';if(mode==='client')e.clientId='other';
  if(mode==='issuer')config.bindings.find(b=>b.name==='AFW_OAUTH_ISSUER').text='https://other.invalid';
  b.text=JSON.stringify(e);f.bundle.policy.plan.configurationHash=activationConfigurationHash(config);
  assert.throws(()=>policyModule.validateReleaseOperatorBundle(f.bundle),mode);
 }
});

for(const mode of ['rpc','workflow','workflow-closed','workflow-provider-denied'])test('native private operator confirms exactly once via '+mode,async()=>{
 const {Miniflare,convertV4MiniflareOptions}=await import('miniflare'),{readFileSync}=await import('node:fs'),{buildMcpReleaseOperator}=await import('../scripts/build-mcp-release-operator.mjs');
 const identity={name:'identity',modules:true,compatibilityDate:'2026-09-07',script:`import {DurableObject} from 'cloudflare:workers';export class Own extends DurableObject{fetch(){throw Error('Actor must not be invoked');}}export default{fetch(r,e){return Response.json({original:e.NODE.idFromName('afw-own-event-one-occurrence-v1').toString(),candidate:e.NODE.idFromName('afw-own-event-first-successor-v1').toString()});}}`,durableObjects:{NODE:{className:'Own',useSQLite:true}}};
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[identity]}));
 try{
  const ids=await (await (await mf.getWorker('identity')).fetch('https://synthetic.invalid/ids')).json(),f=fixture(),p=f.bundle.policy;
  f.manifest.original.containerId=ids.original;
  const window={startAt:Date.now()-1000,expiresAt:Date.now()+120000};Object.assign(p,window);Object.assign(p.plan,window);Object.assign(f.manifest.candidate,window);
  const events=p.observation.configuration.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_POLICY');events.text=JSON.stringify({...JSON.parse(events.text),...window});f.update();
  const compiled=await buildMcpReleaseOperator(f.bundle),config=p.observation.configuration,versionId=p.observation.versionId,deploymentId=p.observation.deploymentId,etag='f'.repeat(64),baseVersionId='33333333-3333-4333-8333-333333333333';let gets=0;
  const outboundService=async request=>{
   if(request.url==='https://www.cloudflarestatus.com/api/v2/incidents.json')return Response.json({page:{url:'https://www.cloudflarestatus.com'},incidents:[{id:'cbvocc87nsne',name:'Workers Cron Trigger Activation Issues',status:mode==='workflow-provider-denied'?'investigating':'resolved',updated_at:'2026-10-14T00:00:00Z',components:[],incident_updates:[]}]});
   gets++;assert.equal(request.method,'GET');assert.equal(request.headers.get('Authorization'),'Bearer synthetic_read_credential');let result;
   if(request.url.endsWith('/deployments'))result={deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}]};
   else if(request.url.includes('/containers/'))result={id:p.observation.applicationId,account_id:policyModule.RELEASE_TARGET.accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:p.observation.namespaceId}};
   else if(request.url.includes('/scripts/'))result={id:versionId,resources:{script:{etag},bindings:config.bindings}};
   else result={id:versionId,...config,modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(f.bundle.artifact.script).toString('base64')}]};
   return Response.json({success:true,errors:[],result});
  };
  const operator={name:'operator',modules:true,script:compiled.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:'true',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'},durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',scriptName:'identity'}},d1Databases:{RELEASE_DB:'named-activation'},outboundService};
  const otherIdentity={...identity,name:'other-identity'},wrong={...operator,name:'wrong',durableObjects:{AFW_RELEASE_EVENTS_NODE:{className:'Own',scriptName:'other-identity'}}},closed={...operator,name:'closed',bindings:{...operator.bindings,AFW_RELEASE_OPERATOR_ENABLED:'false'}};
  const caller={name:'caller',modules:true,compatibilityDate:'2026-09-07',bindings:{HASH:compiled.planHash},serviceBindings:Object.fromEntries([['OP','operator'],['BAD','wrong'],['CLOSED','closed']].map(([key,name])=>[key,{name,entrypoint:'AfwReleaseOperator'}])),script:`export default{async fetch(r,e){try{const key=new URL(r.url).pathname.slice(1);return Response.json(await e[key].run(e.HASH));}catch{return new Response('unavailable',{status:409});}}}`};
  if(mode!=='rpc'){
   operator.bindings.AFW_RELEASE_WORKFLOW_ENABLED='true';
   if(mode!=='workflow-closed')operator.bindings.AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED='true';
   operator.workflows={FLOW:{name:'afw-named-confirmation-test',className:'AfwReleaseWorkflow'}};
  }
  await mf.setOptions(convertV4MiniflareOptions({workers:[identity,otherIdentity,operator,wrong,closed,caller]}));
  const db=await mf.getD1Database('RELEASE_DB','operator');
  for(const name of ['publication','activation']){const sql=readFileSync('db/dossier-'+name+'-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');for(const m of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();}
  const a=f.bundle.artifact,t=policyModule.RELEASE_TARGET;
  await db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').bind(p.plan.artifactKey,t.accountId,t.workerName,a.sourceRevision,a.sourceTree,a.programHash,a.workerHash,Date.now()).run();
  await db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').bind(p.plan.artifactKey,baseVersionId,etag,Date.now()).run();
  const c=await mf.getWorker('caller');
  for(const key of ['BAD','CLOSED'])assert.equal((await c.fetch('https://synthetic.invalid/'+key)).status,409);
  assert.equal(gets,0);assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_attempts').first()).n,0);
  let instance,terminal;
  if(mode==='rpc'){const r=await c.fetch('https://synthetic.invalid/OP');assert.equal(r.status,200);assert.equal((await r.json()).mayLaunch,false);}
  else{
   const {FLOW}=await mf.getBindings('operator');instance=await FLOW.create({id:'afw-release-'+compiled.planHash,params:{planHash:compiled.planHash}});
   terminal=async()=>{const end=Date.now()+12000;let state;while(Date.now()<end){state=await instance.status();if(['complete','errored','terminated'].includes(state.status))return state;await new Promise(resolve=>setTimeout(resolve,25));}assert.fail('Confirmation Workflow did not finish');};
   const state=await terminal();assert.equal(state.status,'complete');assert.equal(state.output.mayRetry,false);assert.equal(state.output.operationalReadiness,false);
   if(mode!=='workflow'){assert.equal(state.output.status,'blocked');assert.equal(gets,0);assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_attempts').first()).n,0);return;}
   assert.equal(state.output.status,'confirmed');assert.equal(state.output.receipt.activationKey,p.plan.activationKey);assert.equal(state.output.receipt.versionId,versionId);assert.equal(state.output.receipt.deploymentId,deploymentId);
   assert.equal(JSON.stringify(state.output).includes('synthetic_read_credential'),false);
  }
  const expected=resolveSuccessorPreparation({scope:f.manifest.scope,original:f.manifest.original,candidate:f.manifest.candidate,namespace:{idFromName:()=>({toString:()=>ids.candidate}),idFromString:id=>({toString:()=>id})}}).candidate.scopeHash;
  assert.equal((await db.prepare('SELECT scope_hash FROM dossier_activation_attempts').first()).scope_hash,expected);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').first()).n,1);
  const before=gets;
  if(mode==='rpc')assert.equal((await c.fetch('https://synthetic.invalid/OP')).status,409);
  else{await instance.restart();const replay=await terminal();assert.equal(replay.status,'complete');assert.equal(replay.output.status,'uncertain');assert.equal(replay.output.mayRetry,false);assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_attempts').first()).n,1);assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').first()).n,1);}
  assert.equal(gets,before);
 }finally{await mf.dispose();}
});
