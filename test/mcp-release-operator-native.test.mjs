import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';

const hash=s=>createHash('sha256').update(s).digest('hex');
const accountId='85d0d5dadac3341a564f22ce885e9eec',workerName='agent-friendly-web-delegated-canary',namespaceId='d6fc71552de7494a863aca20365a572d',databaseId='6a728254-1494-4039-802e-b39288a55fcc',kvId='6b94ff702e504e14a7730cee73a0f6ff';
const baseVersionId='11111111-1111-4111-8111-111111111111',versionId='22222222-2222-4222-8222-222222222222',activeVersion='33333333-3333-4333-8333-333333333333',deploymentId='44444444-4444-4444-8444-444444444444',etag='f'.repeat(64);
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[...flags.map(name=>({name,type:'plain_text',text:'false'})),{name:'DB',type:'d1',id:databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:namespaceId,class_name:'AfwOwnEventNode'}],usage_model:'standard',containers:[]};
const script='export default {fetch(){return new Response(null,{status:404})}}',artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};

test('private operator uses native RPC and primary D1, publishes once, confirms once, denies HTTP and caller plans',async()=>{
 const {buildMcpReleaseOperator}=await import('../scripts/build-mcp-release-operator.mjs');
 const startAt=Date.now()-1000,expiresAt=startAt+120000,pins={accountId,workerName,baseVersionId,namespaceId,databaseId,kvId};
 const artifactKey=hash(JSON.stringify([accountId,workerName,artifact.workerHash]));
 const plan={activationKey:'d'.repeat(64),artifactKey,trialId:'e'.repeat(64),scopeHash:'1'.repeat(64),configurationHash:activationConfigurationHash(configuration),startAt,expiresAt};
 const publication={operation:'publish',startAt,expiresAt,pins};
 const confirmation={operation:'confirm',startAt,expiresAt,plan,observation:{versionId:activeVersion,deploymentId,namespaceId,applicationId:namespaceId,configuration}};
 for(const mode of ['missing','type','foreign']){
  const p=structuredClone(confirmation),bindings=p.observation.configuration.bindings,binding=bindings.find(b=>b.name==='OAUTH_KV');
  if(mode==='missing')bindings.splice(bindings.indexOf(binding),1);else if(mode==='type')binding.type='plain_text';else binding.namespace_id='0'.repeat(32);
  p.plan.configurationHash=activationConfigurationHash(p.observation.configuration);
  await assert.rejects(buildMcpReleaseOperator({artifact,policy:p}));
 }
 let posts=0,gets=0;
 const outboundService=async request=>{
  assert.ok(request.url.startsWith('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/'));
  assert.match(request.headers.get('Authorization'),/^Bearer synthetic_(publish|read)_credential$/);
  let result;
  if(request.method==='POST'){assert.ok(request.url.endsWith('?deploy=false'));posts++;const body=await request.json();assert.equal(Buffer.from(body.modules[0].content_base64,'base64').toString(),script);assert.ok(body.bindings.every(b=>b.version_id===baseVersionId));result={id:versionId};}
  else {assert.equal(request.method,'GET');gets++;
   if(request.url.endsWith('/deployments'))result={deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:activeVersion,percentage:100}]}]};
   else if(request.url.includes('/containers/'))result={id:namespaceId,account_id:accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:namespaceId}};
   else if(request.url.includes('/scripts/'))result={id:request.url.includes(activeVersion)?activeVersion:versionId,resources:{script:{etag},bindings:configuration.bindings}};
   else {const id=request.url.includes(activeVersion)?activeVersion:request.url.includes(versionId)?versionId:baseVersionId;result={id,...configuration,...(request.url.includes('include=modules')?{modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]}:{})};}
  }
  return Response.json({success:true,errors:[],result});
 };
 const pub=await buildMcpReleaseOperator({artifact,policy:publication}),confirm=await buildMcpReleaseOperator({artifact,policy:confirmation});
 const worker=(name,source,enabled)=>({name,modules:true,script:source.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:enabled,AFW_RELEASE_PUBLISH_TOKEN:'synthetic_publish_credential',AFW_RELEASE_READ_TOKEN:'synthetic_read_credential'},d1Databases:{RELEASE_DB:'own-release-native'},outboundService});
 const expired=await buildMcpReleaseOperator({artifact,policy:{...publication,startAt:0,expiresAt:1}}),wrong=await buildMcpReleaseOperator({artifact:{...artifact,sourceRevision:'9'.repeat(40)},policy:confirmation});
 const missing=worker('missing',pub,'true');delete missing.bindings.AFW_RELEASE_PUBLISH_TOKEN;
 const lost=worker('lost',await buildMcpReleaseOperator({artifact:{...artifact,script:script+'\n',workerHash:hash(script+'\n')},policy:publication}),'true');let lostPosts=0;
 lost.outboundService=async request=>{if(request.method==='POST'){lostPosts++;return new Response('lost acknowledgement',{status:500});}return outboundService(request);};
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[worker('publisher',pub,'true'),worker('observer',confirm,'true'),worker('closed',pub,'false'),worker('expired',expired,'true'),worker('wrong',wrong,'true'),worker('closedconfirm',confirm,'false'),missing,lost,{name:'caller',modules:true,compatibilityDate:'2026-09-07',bindings:{PUBLISH_HASH:pub.planHash,CONFIRM_HASH:confirm.planHash,CLOSED_HASH:pub.planHash,EXPIRED_HASH:expired.planHash,WRONG_HASH:wrong.planHash,WITHDRAWN_HASH:confirm.planHash,MISSING_HASH:pub.planHash,LOST_HASH:hash(JSON.stringify({artifact:{...artifact,script:script+'\n',workerHash:hash(script+'\n')},policy:publication}))},serviceBindings:Object.fromEntries([['PUBLISH','publisher'],['CONFIRM','observer'],['CLOSED','closed'],['EXPIRED','expired'],['WRONG','wrong'],['WITHDRAWN','closedconfirm'],['MISSING','missing'],['LOST','lost']].map(([key,name])=>[key,{name,entrypoint:'AfwReleaseOperator'}])),script:'export default {async fetch(r,e){try{const key=new URL(r.url).pathname.slice(1);return Response.json(await (key==="ARG"?e.PUBLISH.run({operation:"publish"}):key==="BADHASH"?e.PUBLISH.run("0".repeat(64)):e[key].run(e[key+"_HASH"])));}catch{return new Response("unavailable",{status:409})}}}'}]}));
 try{
  const db=await mf.getD1Database('RELEASE_DB','publisher');
  for(const name of ['publication','activation']){const sql=readFileSync('db/dossier-'+name+'-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');for(const m of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();}
  const caller=await mf.getWorker('caller'),publisher=await mf.getWorker('publisher');
  assert.equal((await publisher.fetch('https://private.invalid/')).status,404);
  for(const name of ['CLOSED','ARG','BADHASH','EXPIRED','MISSING'])assert.equal((await caller.fetch('https://private.invalid/'+name)).status,409);
  assert.equal(posts+gets,0);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_publication_attempts').first()).n,0);
  let response=await caller.fetch('https://private.invalid/PUBLISH');assert.equal(response.status,200);assert.equal((await response.json()).mayDeploy,false);assert.equal(posts,1);
  assert.equal((await caller.fetch('https://private.invalid/PUBLISH')).status,409);assert.equal(posts,1);
  for(const name of ['WRONG','WITHDRAWN'])assert.equal((await caller.fetch('https://private.invalid/'+name)).status,409);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_attempts').first()).n,0);
  response=await caller.fetch('https://private.invalid/CONFIRM');assert.equal(response.status,200);assert.equal((await response.json()).mayLaunch,false);
  const before=gets;assert.equal((await caller.fetch('https://private.invalid/CONFIRM')).status,409);assert.equal(gets,before);
  assert.equal((await db.prepare('SELECT version_id FROM dossier_publication_receipts').first()).version_id,versionId);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').first()).n,1);
  assert.equal((await caller.fetch('https://private.invalid/WITHDRAWN')).status,409);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').first()).n,1);
  for(let i=0;i<2;i++)assert.equal((await caller.fetch('https://private.invalid/LOST')).status,409);
  assert.equal(lostPosts,1);assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_publication_attempts').first()).n,2);
  assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_publication_receipts').first()).n,1);
 }finally{await mf.dispose();}
});

test('operator build rejects foreign targets, mutable plan accessors and additional credentials',async()=>{
 const {buildMcpReleaseOperator}=await import('../scripts/build-mcp-release-operator.mjs');
 const policy={operation:'publish',startAt:1,expiresAt:60001,pins:{accountId,workerName,namespaceId,databaseId,kvId,baseVersionId}};
 for(const change of [p=>{p.pins.databaseId=baseVersionId;},p=>{p.pins.workerName='tokenizart';},p=>{p.secret='never_include_a_credential';},p=>{p.expiresAt=600002;}]){const p=structuredClone(policy);change(p);await assert.rejects(buildMcpReleaseOperator({artifact,policy:p}));}
 let reads=0;const p={...policy};Object.defineProperty(p,'operation',{enumerable:true,get(){reads++;return 'publish';}});
 await assert.rejects(buildMcpReleaseOperator({artifact,policy:p}));assert.equal(reads,0);
});
