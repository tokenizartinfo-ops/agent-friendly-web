import {createCanaryRestorationTransport} from '../lib/mcp-canary-restoration-transport.mjs';
import {finiteCleanupPolicy} from '../lib/mcp-finite-cleanup-policy.mjs';
import test from 'node:test';
import assert from 'node:assert/strict';
import {finiteRestorationFixture} from './fixtures/finite-restoration.mjs';
import {readFiniteTrialAfwWorkflows} from '../lib/mcp-fixed-terminal-workflows.mjs';
const api=await import('../lib/mcp-qa-finite-canary-restorer.mjs').catch(()=>({}));
const inventory=await import('../lib/mcp-finite-primary-inventory.mjs').catch(()=>({}));
test('finite restore uses retained proof and exact closed bytes once; lost POST only reconciles',async()=>{
 for(const lost of [false,true]){
  const f=await finiteRestorationFixture();f.state.lostPost=lost;
  const restorer=api.createPrivateQaFiniteCanaryRestorer(f.options);
  if(lost)await assert.rejects(()=>restorer.execute(f.input));else assert.equal((await restorer.execute(f.input)).proofHash,f.input.proofHash);
  assert.equal(f.posts,1);await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer(f.options).execute(f.input));assert.equal(f.posts,1);
  const r=await api.createPrivateQaFiniteCanaryRestorer(f.options).reconcile(f.input);assert.equal(r.versionId,f.identity.plan.deployments.canaryClosed.versionId);assert.equal(f.posts,1);
 }
});
for(const mode of ['running','nominal','extra','pointer','module','closedflag','proof']){
 test('finite restore rejects '+mode+' before POST',async()=>{
  const f=await finiteRestorationFixture();
  if(mode==='running')f.state.providerRunning=true;
  if(mode==='nominal')f.state.nominal='running';
  if(mode==='extra')f.state.extra=true;
  if(mode==='pointer')f.old.state.canary.id='ffffffff-ffff-4fff-8fff-ffffffffffff';
  if(mode==='module')f.old.state.closed.modules[0].content_base64=Buffer.from('changed').toString('base64');
  if(mode==='closedflag')f.old.state.closed.bindings.find(x=>x.name==='AFW_DOSSIER_EVENTS_ENABLED').text='true';
  if(mode==='proof')f.options.proofStore={read:async()=>({status:'not_yet_observed'})};
  await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer(f.options).execute(f.input));assert.equal(f.posts,0);
 });
}
test('phase inventory allows exact observer during canary restore, requires its completion for QA',async()=>{
 const f=await finiteRestorationFixture(),options={read:async(path,query)=>{const r=await f.request({method:'GET',path:f.ROOT+path,query});return {value:r.result,info:r.result_info};},assertCurrent:()=>{},phase:'canary_restore',confirmationId:f.identity.plan.workflows.confirmation,observerId:f.identity.plan.workflows.bootstrap,qualifiedExecution:f.qualifiedExecution};
 assert.equal((await readFiniteTrialAfwWorkflows(options)).instanceCount,2);
 await assert.rejects(()=>readFiniteTrialAfwWorkflows({...options,phase:'qa_restore'}));f.state.observer='complete';assert.equal((await readFiniteTrialAfwWorkflows({...options,phase:'qa_restore'})).instanceCount,2);
 f.state.extra=true;await assert.rejects(()=>readFiniteTrialAfwWorkflows(options));
});
test('exact approved module digest alone does not grant static closed-profile compatibility',async()=>{
 const f=await finiteRestorationFixture(),v=structuredClone(f.old.state.closed),pin=f.identity.plan.deployments.canaryClosed;
 assert.equal(inventory.qualifyFiniteWorkerVersion({metadata:v,pin,role:'canary',closed:true}).moduleHash,pin.module.sha256);
 v.bindings.push({name:'NEW_ENABLED',type:'plain_text',text:'true'});assert.throws(()=>inventory.qualifyFiniteWorkerVersion({metadata:v,pin,role:'canary',closed:true}));
});

test('finite-only transport keeps fixed all-state inventory and restoration body allowlists',async()=>{
 const f=await finiteRestorationFixture(),raw=JSON.stringify(finiteCleanupPolicy(f.identity.plan));let sends=0;
 const request=createCanaryRestorationTransport({finiteTrial:f.identity,readControl:()=>({enabled:true,policy:raw}),readReadCredential:async()=>'synthetic-reader-token',readPublishCredential:async()=>'synthetic-publisher-token',now:f.f.now,fetchImpl:async(url,init)=>{sends++;const u=new URL(url),r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,['per_page','page'].includes(k)?Number(v):v])),...(init.body?{body:JSON.parse(init.body)}:{})});const {status,...body}=r;return Response.json(body,{status});}});
 const x={method:'GET',path:f.ROOT+'/containers/applications/'+f.identity.plan.resources.applicationId+'/instances-v2',query:{per_page:100},signal:new AbortController().signal};
 assert.equal((await request(x)).result.length,0);
 await assert.rejects(()=>request({...x,query:{state:'active',per_page:100}}));assert.equal(sends,1);
 assert.equal((await request({method:'GET',path:f.ROOT+'/workflows',query:{per_page:100,page:1},signal:x.signal})).result.length,3);
 const restorer=api.createPrivateQaFiniteCanaryRestorer({...f.options,request});assert.equal((await restorer.execute(f.input)).proofHash,f.input.proofHash);assert.equal(f.posts,1);
});

test('expired parent lease forbids a child restore POST even within the child C1 window',async()=>{
 const f=await finiteRestorationFixture();let expired=false;
 const request=async(...args)=>{const r=await f.request(...args);expired=true;return r;};
 await assert.rejects(()=>api.createPrivateQaFiniteCanaryRestorer({...f.options,request}).execute(f.input,()=>{if(expired)throw Error('original guard lease ended');}));
 assert.equal(f.posts,0);
});
