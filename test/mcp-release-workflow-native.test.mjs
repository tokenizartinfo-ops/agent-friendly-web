import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {buildMcpReleaseOperator} from '../scripts/build-mcp-release-operator.mjs';
import {activationConfigurationHash} from '../lib/mcp-activation-observer.mjs';

const hash=x=>createHash('sha256').update(x).digest('hex');
const accountId='85d0d5dadac3341a564f22ce885e9eec',workerName='agent-friendly-web-delegated-canary',namespaceId='d6fc71552de7494a863aca20365a572d',databaseId='6a728254-1494-4039-802e-b39288a55fcc',kvId='6b94ff702e504e14a7730cee73a0f6ff';
const baseVersionId='11111111-1111-4111-8111-111111111111',versionId='22222222-2222-4222-8222-222222222222';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[...flags.map(name=>({name,type:'plain_text',text:'false'})),{name:'DB',type:'d1',id:databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:namespaceId,class_name:'AfwOwnEventNode'}],usage_model:'standard',containers:[]};
const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
const wait=ms=>new Promise(r=>setTimeout(r,ms));
async function terminal(instance,want){
 const end=Date.now()+12000;let status;
 while(Date.now()<end){status=await instance.status();if(status.status==='complete'&&(!want||status.output?.status===want))return status;if(['errored','terminated'].includes(status.status))assert.fail('Workflow failed: '+JSON.stringify(status));await wait(25);}
 assert.fail('Workflow did not finish with expected output: '+JSON.stringify(status));
}
async function fixture({operator='true',workflow='true',provider='resolved',lost=false,expired=false,slow=false,rewind=false,rewindBase=false,confirm=false}={}){
 const startAt=expired?0:Date.now()-1000,expiresAt=expired?1:Date.now()+120000;
 let policy={operation:'publish',startAt,expiresAt,pins:{accountId,workerName,namespaceId,databaseId,kvId,baseVersionId}};
 if(confirm)policy={operation:'confirm',startAt,expiresAt,plan:{activationKey:'d'.repeat(64),artifactKey:hash(JSON.stringify([accountId,workerName,artifact.workerHash])),trialId:'e'.repeat(64),scopeHash:'f'.repeat(64),configurationHash:activationConfigurationHash(configuration),startAt,expiresAt},observation:{versionId,deploymentId:'33333333-3333-4333-8333-333333333333',namespaceId,applicationId:namespaceId,configuration}};
 const built=await buildMcpReleaseOperator({artifact,policy});let posts=0,providerReads=0;
 const outboundService=async request=>{
  if(request.url==='https://www.cloudflarestatus.com/api/v2/incidents.json'){
   providerReads++;
   if(provider==='redirect')return new Response(null,{status:302,headers:{Location:'https://outside.invalid/'}});
   return Response.json({page:{url:'https://www.cloudflarestatus.com'},incidents:[{id:'cbvocc87nsne',name:'Workers Cron Trigger Activation Issues',status:provider,updated_at:'2026-10-14T00:00:00Z',components:[],incident_updates:[]}]});
  }
  assert.ok(request.url.startsWith('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/'));
  assert.equal(request.headers.get('Authorization'),'Bearer synthetic_publish_credential');
  if(request.method==='POST'){
   assert.ok(request.url.endsWith('?deploy=false'));posts++;const body=await request.json();
   assert.equal(Buffer.from(body.modules[0].content_base64,'base64').toString(),script);
   if(lost)return new Response('provider acknowledgement lost',{status:500});
   return Response.json({success:true,errors:[],result:{id:versionId}});
  }
  assert.equal(request.method,'GET');let result;
  if(request.url.includes('/scripts/'))result={id:versionId,resources:{script:{etag:'f'.repeat(64)},bindings:configuration.bindings}};
  else {const id=request.url.includes(versionId)?versionId:baseVersionId;result={id,...configuration,...(request.url.includes('include=modules')?{modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]}:{})};}
  return Response.json({success:true,errors:[],result});
 };
 const bindings={AFW_RELEASE_OPERATOR_ENABLED:operator,AFW_RELEASE_PUBLISH_TOKEN:'synthetic_publish_credential'};if(workflow!==null)bindings.AFW_RELEASE_WORKFLOW_ENABLED=workflow;
 const clock=slow||rewind||rewindBase?"const originalFetch=globalThis.fetch;globalThis.fetch=async(...args)=>{const response=await originalFetch(...args);if("+(rewindBase?"String(args[0]).endsWith('/versions/"+baseVersionId+"')":"String(args[0])==='https://www.cloudflarestatus.com/api/v2/incidents.json'")+")Date.now=()=>"+(rewind||rewindBase?startAt+1:expiresAt+1)+";return response;};\n":'';
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'operator',modules:true,script:clock+built.script,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings,d1Databases:{RELEASE_DB:'release-workflow-native'},workflows:{FLOW:{name:'afw-release-test',className:'AfwReleaseWorkflow'}},outboundService}]}));
 try{
  const db=await mf.getD1Database('RELEASE_DB','operator');
  const sql=readFileSync('db/dossier-publication-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');
  for(const m of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();
  const {FLOW}=await mf.getBindings('operator');
  return {mf,db,flow:FLOW,planHash:built.planHash,id:'afw-release-'+built.planHash,posts:()=>posts,providerReads:()=>providerReads};
 }catch(e){await mf.dispose();throw e;}
}
async function rows(f,table){return (await f.db.prepare('SELECT COUNT(*) n FROM '+table).first()).n;}

test('native release Workflow denies closed, absent opt-in, expired, foreign hash/id/payload and confirmation plans before side effects',async t=>{
 for(const c of [
  {name:'operator closed',options:{operator:'false'}},
  {name:'Workflow closed',options:{workflow:'false'}},
  {name:'Workflow absent',options:{workflow:null}},
  {name:'expired original',options:{expired:true}},
  {name:'confirmation forbidden',options:{confirm:true}},
  {name:'foreign instance',id:'foreign-instance'},
  {name:'foreign hash',payload:{planHash:'0'.repeat(64)}},
  {name:'extra caller instruction',extra:true}
 ])await t.test(c.name,async()=>{
  const f=await fixture(c.options);
  try{
   const instance=await f.flow.create({id:c.id||f.id,params:c.payload||{planHash:f.planHash,...(c.extra?{operation:'publish'}:{})}});
   const result=await terminal(instance);assert.deepEqual(result.output,{status:'blocked',mayRetry:false,operationalReadiness:false});
   assert.equal(f.posts(),0);assert.equal(f.providerReads(),0);assert.equal(await rows(f,'dossier_publication_attempts'),0);
  }finally{await f.mf.dispose();}
 });
});

test('native release Workflow honors provider denial and never follows a redirect before journal admission',async t=>{
 for(const provider of ['investigating','redirect'])await t.test(provider,async()=>{
  const f=await fixture({provider});
  try{const instance=await f.flow.create({id:f.id,params:{planHash:f.planHash}});const result=await terminal(instance);assert.equal(result.output.status,'blocked');assert.equal(f.providerReads(),1);assert.equal(f.posts(),0);assert.equal(await rows(f,'dossier_publication_attempts'),0);}finally{await f.mf.dispose();}
 });
});

test('native release Workflow publishes once and original D1 budget survives restart and lost acknowledgement',async t=>{
 for(const lost of [false,true])await t.test(lost?'lost ACK':'accepted receipt',async()=>{
  const f=await fixture({lost});
  try{
   const worker=await f.mf.getWorker('operator');assert.equal((await worker.fetch('https://private.invalid/')).status,404);
   const instance=await f.flow.create({id:f.id,params:{planHash:f.planHash}}),result=await terminal(instance);
   assert.equal(result.output.status,lost?'uncertain':'confirmed');assert.equal(result.output.mayRetry,false);assert.equal(result.output.operationalReadiness,false);
   assert.equal(f.posts(),1);assert.equal(await rows(f,'dossier_publication_attempts'),1);assert.equal(await rows(f,'dossier_publication_receipts'),lost?0:1);
   if(!lost){assert.equal(result.output.receipt.versionId,versionId);assert.equal((await f.db.prepare('SELECT version_id FROM dossier_publication_receipts').first()).version_id,versionId);}
   assert.equal(JSON.stringify(result.output).includes('synthetic_publish_credential'),false);
   await instance.restart();const replay=await terminal(instance,'uncertain');assert.equal(replay.output.mayRetry,false);
   assert.equal(f.posts(),1);assert.equal(await rows(f,'dossier_publication_attempts'),1);assert.equal(await rows(f,'dossier_publication_receipts'),lost?0:1);
  }finally{await f.mf.dispose();}
 });
});

test('native release Workflow does not admit publication when the original window expires during provider read',async()=>{
 const f=await fixture({slow:true});
 try{const instance=await f.flow.create({id:f.id,params:{planHash:f.planHash}}),result=await terminal(instance);assert.equal(result.output.status,'blocked');assert.equal(f.providerReads(),1);assert.equal(f.posts(),0);assert.equal(await rows(f,'dossier_publication_attempts'),0);}finally{await f.mf.dispose();}
});


test('native release Workflow rejects a backward clock that remains inside the original window',async()=>{
 const f=await fixture({rewind:true});
 try{const instance=await f.flow.create({id:f.id,params:{planHash:f.planHash}}),result=await terminal(instance);assert.equal(result.output.status,'blocked');assert.equal(f.providerReads(),1);assert.equal(f.posts(),0);assert.equal(await rows(f,'dossier_publication_attempts'),0);}finally{await f.mf.dispose();}
});

test('native release Workflow consumes its attempt but never uploads after a clock rewind during the base-version read',async()=>{
 const f=await fixture({rewindBase:true});
 try{const instance=await f.flow.create({id:f.id,params:{planHash:f.planHash}}),result=await terminal(instance);assert.deepEqual(result.output,{status:'uncertain',mayRetry:false,operationalReadiness:false});assert.equal(f.posts(),0);assert.equal(await rows(f,'dossier_publication_attempts'),1);assert.equal(await rows(f,'dossier_publication_receipts'),0);}finally{await f.mf.dispose();}
});

test('REST string admission rejects noncanonical payloads and preserves original guards without effects',async t=>{
 for(const mode of ['wrong','double','space','extra','invalid','id','closed','expired','confirmation'])await t.test(mode,async()=>{
  const f=await fixture(mode==='closed'?{operator:'false'}:mode==='expired'?{expired:true}:mode==='confirmation'?{confirm:true}:{});
  try{
   const canonical=JSON.stringify({planHash:f.planHash});
   const params=mode==='wrong'?JSON.stringify({planHash:'0'.repeat(64)}):mode==='double'?JSON.stringify(canonical):mode==='space'?' '+canonical:mode==='extra'?JSON.stringify({planHash:f.planHash,extra:true}):mode==='invalid'?'invalid':canonical;
   const instance=await f.flow.create({id:mode==='id'?'foreign-instance':f.id,params});
   const result=await terminal(instance);
   assert.deepEqual(result.output,{status:'blocked',mayRetry:false,operationalReadiness:false});
   assert.equal(f.providerReads(),0);assert.equal(f.posts(),0);
   assert.equal(await rows(f,'dossier_publication_attempts'),0);
   assert.equal(await rows(f,'dossier_publication_receipts'),0);
  }finally{await f.mf.dispose();}
 });
});
