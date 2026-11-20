import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {seedPrimaryFixture,SEED_GH} from './fixtures/finite-seed-primary.mjs';
import {hashFinitePackageManifest} from '../lib/mcp-qa-finite-seed.mjs';
import {finitePublicProfileTemplate,finitePublicStaticExpectation} from '../lib/mcp-qa-finite-profile.mjs';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {buildFinitePolicyOrigin} from '../lib/mcp-qa-finite-policy-origin.mjs';
import {finitePrivateQaSetupInstanceId} from '../lib/mcp-qa-finite-adoption.mjs';
import {AFW_FIXED_WORKFLOWS} from '../lib/mcp-fixed-terminal-workflows.mjs';

const sourceRevision='b'.repeat(40);
globalThis.__AFW_QA_SOURCE_REVISION__=sourceRevision;
const {readPrivateQaFinitePolicyEntry,readPrivateQaFinitePolicyOrigin}=await import('../lib/mcp-qa-finite-policy-setup-source.mjs');
delete globalThis.__AFW_QA_SOURCE_REVISION__;
const account='85d0d5dadac3341a564f22ce885e9eec';
const root='https://api.cloudflare.com/client/v4/accounts/'+account;
const definition=AFW_FIXED_WORKFLOWS.find(row=>row.className==='PrivateQaBootstrap');
const qaVersionId='11111111-1111-4111-8111-111111111111',deploymentId='22222222-2222-4222-8222-222222222222';
const workflowVersion='33333333-3333-4333-8333-333333333333';
const credential='synthetic_fixture_token_only';
const iso=x=>new Date(x).toISOString();

async function scenario(t,mode){
 const bytes=Buffer.from('export default {};');
 const qaModule={name:'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,exports:[]};
 const configuration=structuredClone(finitePublicProfileTemplate('qaLive'));
 const seed=await seedPrimaryFixture({sourceRevision,qaLive:{versionId:qaVersionId,deploymentId,module:qaModule,configurationHash:qaClosedConfigurationHash(configuration)}});
 const publicStatic={...finitePublicStaticExpectation('qaLive')};
 if(mode==='profile-drift')publicStatic.profileHash='e'.repeat(64);
 seed.seed.manifest.modules.qaLive.publicStatic=publicStatic;
 seed.seed.qaPublication.qaLive.publicStatic=publicStatic;
 seed.seed.build.manifestHash=hashFinitePackageManifest(seed.seed.manifest);
 seed.refresh();
 const {T0}=seed,{intentId}=seed.seed,setupInstanceId=finitePrivateQaSetupInstanceId({intentId,sourceRevision});
 const payload={operation:'finite_private_policy_setup',intentId,sourceRevision};
 const event={payload,instanceId:setupInstanceId,workflowName:definition.name,timestamp:new Date(T0+2400)};
 const path='/workflows/'+definition.name,provider=[],map=new Map([
  [path,{id:definition.id,name:definition.name,script_name:definition.script,class_name:definition.className}],
  [path+'/instances/'+setupInstanceId,{status:'running',queued:iso(T0+2200),start:iso(T0+2500),params:{...payload},versionId:workflowVersion,steps:[],step_count:0}],
  [path+'/versions/'+workflowVersion,{id:workflowVersion,workflow_id:definition.id,class_name:definition.className,language:'javascript'}],
  ['/workers/scripts/'+definition.script+'/deployments?per_page=1',{deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:qaVersionId,percentage:100}]}]}],
  ['/workers/workers/'+definition.script+'/versions/'+qaVersionId+'?include=modules',{...configuration,id:qaVersionId,urls:[],modules:[{name:qaModule.name,content_type:'application/javascript+module',content_base64:bytes.toString('base64')}]}],
 ]);
 const row=map.get(path+'/instances/'+setupInstanceId);
 const native={setupInstanceId,sourceRevision,qaVersionId,eventTimestamp:T0+2400,queuedAt:T0+2200,startedAt:T0+2500,T0};
 if(['actor-origin','actor-wrong-origin','actor-late-origin','actor-replay'].includes(mode)){
  const origin=buildFinitePolicyOrigin(native,{intentId,sourceRevision},T0+2600);
  row.steps.push({name:'finite-private-policy-origin-1',type:'step',success:true,attempts:[{success:true}],
   start:iso(T0+2510),end:iso(T0+2700),output:JSON.stringify(mode==='actor-wrong-origin'?{...origin,qaVersionId:workflowVersion}:origin)});
  if(mode==='actor-late-origin')row.steps[0].end=iso(T0+3001);
  row.steps.push({name:'finite-private-policy-setup-1',type:'step',success:mode==='actor-replay'?true:null});
  row.step_count=row.steps.length;
 }
 if(mode==='queued-before-seed')row.queued=iso(T0+1900);
 if(mode==='failed-step')row.steps=[{name:'finite-private-policy-setup-1',success:false}],row.step_count=1;
 if(mode==='foreign-definition')map.get(path).script_name='foreign-script';
 if(mode==='foreign-version')map.get(path+'/versions/'+workflowVersion).workflow_id='foreign';
 if(mode==='pointer-drift')map.get('/workers/scripts/'+definition.script+'/deployments?per_page=1').deployments[0].id=workflowVersion;
 if(mode==='code-drift')map.get('/workers/workers/'+definition.script+'/versions/'+qaVersionId+'?include=modules').modules[0].content_base64=Buffer.from('foreign byte data!').toString('base64');
 if(mode==='foreign-seed')seed.seedStep.conclusion='failure';
 if(mode==='event-before-seed')event.timestamp=new Date(T0+1900);
 const originalFetch=globalThis.fetch,originalNow=Date.now;
 t.after(()=>{globalThis.fetch=originalFetch;Date.now=originalNow;});
 Date.now=seed.now;
 globalThis.fetch=async(url,init)=>{
  if(url.startsWith(SEED_GH))return seed.fetchImpl(url,init);
  assert(url.startsWith(root));
  assert.equal(init.method,'GET');
  assert.equal(init.redirect,'manual');
  assert.equal(init.headers.Authorization,'Bearer '+credential);
  const resource=url.slice(root.length);provider.push(resource);
  if(mode==='denied')return seed.response({success:false,errors:[],messages:[],result:null},403);
  const result=map.get(resource);
  assert(result);
  return seed.response({success:true,errors:[],messages:[],result});
 };
 const env={AFW_MCP_CLOSURE_READ_TOKEN:credential,AFW_QA_VERSION:{id:qaVersionId},AFW_QA_BOOTSTRAP:{get(){}},AFW_INDEPENDENT_CLOSURE:{}};
 const controller=new AbortController(),lease={signal:controller.signal,assertCurrent(){assert.equal(controller.signal.aborted,false);}};
 if(mode==='missing-credential')delete env.AFW_MCP_CLOSURE_READ_TOKEN;
 const id={toString:()=> 'a'.repeat(64)};
 env.AFW_INDEPENDENT_CLOSURE.idFromName=()=>id;
 const readActor=()=>readPrivateQaFinitePolicyOrigin({ctx:{storage:{},id},env,intentId,sourceRevision},lease);
 const read=()=>readPrivateQaFinitePolicyEntry({env,event,step:{do(){assert.fail('source reader cannot invoke a step');}}},lease);
 return {T0,setupInstanceId,native,read,readActor,provider,seed};
}
test('fixed setup source verifies original native occurrence, seed and active QA bytes before step',async t=>{
 const f=await scenario(t);
 assert.deepEqual(await f.read(),{setupInstanceId:f.setupInstanceId,sourceRevision,qaVersionId,eventTimestamp:f.T0+2400,queuedAt:f.T0+2200,startedAt:f.T0+2500,T0:f.T0});
 assert.equal(f.provider.length,5);
 assert.equal(f.seed.calls.length,11);
});
for(const mode of ['queued-before-seed','event-before-seed','failed-step','foreign-definition','foreign-version','pointer-drift','code-drift','profile-drift','foreign-seed','missing-credential','denied'])test('fixed setup source rejects '+mode,async t=>{
 const f=await scenario(t,mode);
 await assert.rejects(f.read());
 if(mode==='missing-credential')assert.equal(f.provider.length,0);
});

test('the actor obtains the original native timestamp from the completed Cloudflare step',async t=>{
 const f=await scenario(t,'actor-origin');
 assert.deepEqual(await f.readActor(),f.native);
 assert.equal(f.provider.length,5);
});
for(const mode of ['actor-missing','actor-wrong-origin','actor-late-origin','actor-replay'])test('the actor rejects '+mode,async t=>{
 const f=await scenario(t,mode);
 await assert.rejects(f.readActor());
});
