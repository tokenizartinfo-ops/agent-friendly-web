import assert from 'node:assert/strict';
import test from 'node:test';
import {createHash} from 'node:crypto';
import {seedPrimaryFixture,SEED_GH} from './fixtures/finite-seed-primary.mjs';
import {finitePublicProfileTemplate} from '../lib/mcp-qa-finite-profile.mjs';
import {qaClosedConfigurationHash} from '../lib/mcp-restoration-configuration.mjs';
import {finitePrivateQaSetupInstanceId} from '../lib/mcp-qa-finite-adoption.mjs';
import {AFW_FIXED_WORKFLOWS} from '../lib/mcp-fixed-terminal-workflows.mjs';

const sourceRevision='b'.repeat(40);
globalThis.__AFW_QA_SOURCE_REVISION__=sourceRevision;
const {readPrivateQaFinitePolicyEntry}=await import('../lib/mcp-qa-finite-policy-setup-source.mjs');
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
 const module={name:'index.mjs',sha256:createHash('sha256').update(bytes).digest('hex'),bytes:bytes.length,exports:[]};
 const configuration=structuredClone(finitePublicProfileTemplate('qaLive'));
 const seed=await seedPrimaryFixture({sourceRevision,qaLive:{versionId:qaVersionId,deploymentId,module,configurationHash:qaClosedConfigurationHash(configuration)}});
 const {T0}=seed,{intentId}=seed.seed,setupInstanceId=finitePrivateQaSetupInstanceId({intentId,sourceRevision});
 const payload={operation:'finite_private_policy_setup',intentId,sourceRevision};
 const event={payload,instanceId:setupInstanceId,workflowName:definition.name,timestamp:new Date(T0+2400)};
 const path='/workflows/'+definition.name,provider=[],map=new Map([
  [path,{id:definition.id,name:definition.name,script_name:definition.script,class_name:definition.className}],
  [path+'/instances/'+setupInstanceId,{status:'running',queued:iso(T0+2200),start:iso(T0+2500),params:{...payload},versionId:workflowVersion,steps:[],step_count:0}],
  [path+'/versions/'+workflowVersion,{id:workflowVersion,workflow_id:definition.id,class_name:definition.className,language:'javascript'}],
  ['/workers/scripts/'+definition.script+'/deployments?per_page=1',{deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:qaVersionId,percentage:100}]}]}],
  ['/workers/workers/'+definition.script+'/versions/'+qaVersionId+'?include=modules',{...configuration,id:qaVersionId,urls:[],modules:[{name:module.name,content_type:'application/javascript+module',content_base64:bytes.toString('base64')}]}],
 ]);
 const row=map.get(path+'/instances/'+setupInstanceId);
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
 const read=()=>readPrivateQaFinitePolicyEntry({env,event,step:{do(){assert.fail('source reader cannot invoke a step');}}},lease);
 return {T0,setupInstanceId,read,provider,seed};
}
test('fixed setup source verifies original native occurrence, seed and active QA bytes before step',async t=>{
 const f=await scenario(t);
 assert.deepEqual(await f.read(),{setupInstanceId:f.setupInstanceId,sourceRevision,qaVersionId,eventTimestamp:f.T0+2400,queuedAt:f.T0+2200,startedAt:f.T0+2500,T0:f.T0});
 assert.equal(f.provider.length,5);
 assert.equal(f.seed.calls.length,11);
});
for(const mode of ['queued-before-seed','event-before-seed','failed-step','foreign-definition','foreign-version','pointer-drift','code-drift','foreign-seed','missing-credential','denied'])test('fixed setup source rejects '+mode,async t=>{
 const f=await scenario(t,mode);
 await assert.rejects(f.read());
 if(mode==='missing-credential')assert.equal(f.provider.length,0);
});
