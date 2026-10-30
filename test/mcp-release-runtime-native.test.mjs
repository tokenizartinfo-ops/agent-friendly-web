import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readFileSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

const hash=x=>createHash('sha256').update(x).digest('hex');
const accountId='85d0d5dadac3341a564f22ce885e9eec',workerName='agent-friendly-web-delegated-canary',namespaceId='d6fc71552de7494a863aca20365a572d',databaseId='6a728254-1494-4039-802e-b39288a55fcc',kvId='6b94ff702e504e14a7730cee73a0f6ff';
const baseVersionId='11111111-1111-4111-8111-111111111111',versionId='22222222-2222-4222-8222-222222222222';
const flags=['AFW_DELEGATED_OAUTH_ENABLED','AFW_DOSSIER_EVENTS_ENABLED','AFW_DOSSIER_EVENTS_SCHEDULE_ENABLED','AFW_DOSSIER_MONITORING_OWNER_ENABLED','AFW_DOSSIER_OWN_SAVE_ENABLED','AFW_OAUTH_REFRESH_ENABLED'];
const configuration={compatibility_date:'2026-09-07',compatibility_flags:['nodejs_compat','global_fetch_strictly_public'],main_module:'index.mjs',exports:{AfwOwnEventNode:{type:'durable-object',storage:'sqlite'}},bindings:[...flags.map(name=>({name,type:'plain_text',text:'false'})),{name:'DB',type:'d1',id:databaseId},{name:'OAUTH_KV',type:'kv_namespace',namespace_id:kvId},{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:namespaceId,class_name:'AfwOwnEventNode'}],usage_model:'standard',containers:[]};
const script='export default {fetch(){return new Response(null,{status:404})}}';
const artifact={script,sourceRevision:'a'.repeat(40),sourceTree:'b'.repeat(40),programHash:'c'.repeat(64),workerHash:hash(script),sourceCheck:'git-inputs-before-after-v1'};
async function terminal(instance){
 const end=Date.now()+12000;
 while(Date.now()<end){const s=await instance.status();if(s.status==='complete')return s;if(['errored','terminated'].includes(s.status))assert.fail(JSON.stringify(s));await new Promise(r=>setTimeout(r,25));}
 assert.fail('shared Workflow did not finish');
}
async function fixture({closed=false,expired=false}={}){
 // RED must identify the missing interface, before any native build or I/O.
 const runtime=await import('../lib/mcp-release-runtime.mjs').catch(()=>null);
 assert.equal(typeof runtime?.runReleaseWorkflow,'function','explicit finite Workflow runtime is required');
 assert.equal(typeof runtime?.runReleaseOperator,'function','explicit finite operator runtime is required');
 const startAt=expired?0:Date.now()-1000,expiresAt=expired?1:Date.now()+120000;
 const bundle={artifact,policy:{operation:'publish',startAt,expiresAt,pins:{accountId,workerName,namespaceId,databaseId,kvId,baseVersionId}}},planHash=hash(JSON.stringify(bundle));
 const entry="import {WorkflowEntrypoint} from 'cloudflare:workers';\nimport {runReleaseWorkflow} from './lib/mcp-release-runtime.mjs';\nglobalThis.__AFW_RELEASE_OPERATOR_BUNDLE__={foreign:true};\nconst selected="+JSON.stringify(bundle)+";\nexport default {fetch(){return new Response(null,{status:404});}};\nexport class SharedReleaseWorkflow extends WorkflowEntrypoint {run(event,step){return runReleaseWorkflow({bundle:selected,env:this.env,event,step});}}";
 const built=await build({stdin:{contents:entry,resolveDir:fileURLToPath(new URL('..',import.meta.url)),sourcefile:'shared-runtime-native.mjs',loader:'js'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 let posts=0,providerReads=0;
 const outboundService=async request=>{
  if(request.url==='https://www.cloudflarestatus.com/api/v2/incidents.json'){
   providerReads++;return Response.json({page:{url:'https://www.cloudflarestatus.com'},incidents:[{id:'cbvocc87nsne',name:'Workers Cron Trigger Activation Issues',status:'resolved',updated_at:'2026-10-14T00:00:00Z',components:[],incident_updates:[]}]});
  }
  assert.ok(request.url.startsWith('https://api.cloudflare.com/client/v4/accounts/'+accountId+'/'));
  assert.equal(request.headers.get('Authorization'),'Bearer synthetic_shared_runtime_credential');
  if(request.method==='POST'){
   assert.ok(request.url.endsWith('?deploy=false'));posts++;const body=await request.json();
   assert.equal(Buffer.from(body.modules[0].content_base64,'base64').toString(),script);
   return Response.json({success:true,errors:[],result:{id:versionId}});
  }
  assert.equal(request.method,'GET');let result;
  if(request.url.includes('/scripts/'))result={id:versionId,resources:{script:{etag:'f'.repeat(64)},bindings:configuration.bindings}};
  else {const id=request.url.includes(versionId)?versionId:baseVersionId;result={id,...configuration,...(request.url.includes('include=modules')?{modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:Buffer.from(script).toString('base64')}]}:{})};}
  return Response.json({success:true,errors:[],result});
 };
 const mf=new Miniflare(convertV4MiniflareOptions({workers:[{name:'shared',modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_RELEASE_OPERATOR_ENABLED:closed?'false':'true',AFW_RELEASE_WORKFLOW_ENABLED:'true',AFW_RELEASE_PUBLISH_TOKEN:'synthetic_shared_runtime_credential'},d1Databases:{RELEASE_DB:'shared-release-runtime-native'},workflows:{FLOW:{name:'afw-shared-release-native',className:'SharedReleaseWorkflow'}},outboundService}]}));
 try{
  const db=await mf.getD1Database('RELEASE_DB','shared'),sql=readFileSync('db/dossier-publication-receipt.sql','utf8').replace(/^\s*--[^\r\n]*/gm,'');
  for(const m of sql.matchAll(/CREATE TABLE[\s\S]*?\);|CREATE (?:UNIQUE )?INDEX[^;\r\n]+;|CREATE TRIGGER[^\r\n]*? END;/g))await db.prepare(m[0]).run();
  const {FLOW}=await mf.getBindings('shared');
  return {mf,db,flow:FLOW,id:'afw-release-'+planHash,planHash,posts:()=>posts,providerReads:()=>providerReads};
 }catch(e){await mf.dispose();throw e;}
}
async function rows(f,table){return (await f.db.prepare('SELECT COUNT(*) n FROM '+table).first()).n;}

test('explicit bundle executes from another native Workflow class despite a foreign ambient bundle and preserves publication budget',async()=>{
 const f=await fixture();
 try{
  const instance=await f.flow.create({id:f.id,params:JSON.stringify({planHash:f.planHash})}),first=await terminal(instance);
  assert.equal(first.output.status,'confirmed');assert.equal(first.output.receipt.versionId,versionId);
  assert.equal(f.posts(),1);assert.equal(await rows(f,'dossier_publication_attempts'),1);assert.equal(await rows(f,'dossier_publication_receipts'),1);
  await instance.restart();const second=await terminal(instance);
  assert.equal(second.output.status,'uncertain');assert.equal(second.output.mayRetry,false);assert.equal(f.posts(),1);assert.equal(await rows(f,'dossier_publication_attempts'),1);
  assert.equal(JSON.stringify([first.output,second.output]).includes('synthetic_shared_runtime_credential'),false);
  assert.equal((await (await f.mf.getWorker('shared')).fetch('https://private.invalid/')).status,404);
 }finally{await f.mf.dispose();}
});

test('shared native runtime denies closed, expired and foreign payload before provider or primary journal access',async t=>{
 for(const mode of ['closed','expired','foreign'])await t.test(mode,async()=>{
  const f=await fixture({closed:mode==='closed',expired:mode==='expired'});
  try{
   const instance=await f.flow.create({id:f.id,params:{planHash:mode==='foreign'?'0'.repeat(64):f.planHash}}),result=await terminal(instance);
   assert.deepEqual(result.output,{status:'blocked',mayRetry:false,operationalReadiness:false});
   assert.equal(f.providerReads(),0);assert.equal(f.posts(),0);assert.equal(await rows(f,'dossier_publication_attempts'),0);
  }finally{await f.mf.dispose();}
 });
});
