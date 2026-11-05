import test from 'node:test';
import assert from 'node:assert/strict';
import {access} from 'node:fs/promises';
test('T1 fixed engine exposes only finite operations',async()=>{
 await assert.doesNotReject(access('lib/mcp-qa-finite-fixed-policy-engine.mjs'),'fixed finite operation contract must exist before publication');
 const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs');
 const engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
 assert(Object.isFrozen(engine));
 assert.deepEqual(Object.keys(engine).sort(),['activate','describeActivation','describeUpload','readPointer','readVersion','upload'].sort());
});
test('T1 enrollment preserves literal chronology and one shot',async()=>{
 await assert.doesNotReject(access('lib/mcp-qa-finite-preparation-enrollment-writer.mjs'),'fixed factual enrollment writer contract must exist');
 await component('normal',async(result,f)=>{
  assert.equal(result.failure,null,JSON.stringify(result));assert.equal(result.settled,true);
  assert.deepEqual(result.trace.slice(result.trace.indexOf('put:enrollment')),["put:enrollment","transaction-settled","sync","get:enrollment","alarm","list:","alarm","get:enrollment","put:ack","transaction-settled","sync","get:ack","alarm","list:","alarm","get:ack","get:enrollment"]);
  assert(result.enrollment);assert(result.ack);assert.equal(result.ack.enrollmentHash,result.enrollment.recordHash);
  assert(result.ack.acknowledgedAt>=result.enrollment.issuedAt);assert(result.ack.acknowledgedAt<result.enrollment.deadline);
  assert(result.enrollment.deadline-result.enrollment.issuedAt<=5000);
  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([key])=>key.endsWith(':capsule'))[1]),plan=JSON.parse(rows.find(([key])=>key==='afw.finite-initial-cleanup.v1:plan')[1]);
  for(const key of ['sourceRevision','sourceTree','qaVersionId','initialInstanceId','preconnectionId','I0','C0','C1','capsuleHash','entryHash','materialHash'])assert.equal(result.enrollment[key],capsule[key]);
  for(const key of ['manifestHash','readerId','publisherId','readerExpiresAt','publisherExpiresAt','baselineVersionId','baselineDeploymentId'])assert.equal(result.enrollment[key],plan[key]);
  assert.equal(result.ack.alarmAt,capsule.C0);assert.equal(await f.stub.alarmInfo(),capsule.C0);
  assert.equal(result.enrollment.C0,result.enrollment.I0+900000);assert.equal(result.enrollment.C1,result.enrollment.C0+180000);
 });
});

import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {plain,exerciseEnrollmentWriter} from './fixtures/finite-first-connection-publication.mjs';
test('T1 baseline enrollment chronology remains native and pending',async()=>{
 const f=await initialEntryHarness('first-connection-enrollment-component');
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  const rows=await plain(f.stub.snapshot()),capsule=JSON.parse(rows.find(([k])=>k.endsWith(':capsule'))[1]);
  const source=(await plain(f.ownerRead())).source,token=await f.enrollmentToken(source);f.nowOffset=capsule.I0+400000-Date.now();
  const screen=await plain(f.stub.enrollmentScreen(token));assert.equal(screen.fixtureError,undefined,JSON.stringify(screen));
  const observed=await plain(f.stub.captureLegacyEnrollment(token,screen));
  assert.equal(observed.result.result.outcome.status,'admin_pending',JSON.stringify(observed));
  assert.equal(observed.result.prepared.status,202);assert.equal(f.uploads.length,1);assert.equal(f.activations.length,1);
  assert(observed.trace.includes('put:enrollment'));assert(observed.trace.includes('put:ack'));
  console.info('T1 legacy enrollment trace',JSON.stringify(observed.trace));
  const written=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-cleanup.v1:'));
  console.info('T1 legacy enrollment DATA',JSON.stringify(written.map(([key,raw])=>({key,record:JSON.parse(raw)}))));
 }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
});

async function component(scenario,inspect){
 const f=await initialEntryHarness('first-connection-enrollment-component');
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  await inspect(await exerciseEnrollmentWriter(f,scenario),f);
 }finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
}
for(const scenario of ['double-enrollment','ack-first','double-ack','unknown-enrollment','unknown-ack','holder-drift','deadline'])test('T1 factual enrollment refuses '+scenario+' without repeated IO',()=>component(scenario,async result=>{
 assert.equal(result.settled,true);assert(result.failure,JSON.stringify(result));
 assert(result.trace.filter(value=>value==='put:enrollment').length<=1);
 assert(result.trace.filter(value=>value==='put:ack').length<=1);
 if(['ack-first','holder-drift','deadline'].includes(scenario))assert.equal(result.trace.filter(value=>value.startsWith('put:')).length,0);
 if(scenario==='unknown-enrollment')assert.equal(result.trace.filter(value=>value==='put:ack').length,0);
}));
import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
test('T1 fixed descriptions preserve literal wire and secret baseline inheritance',async()=>{
 const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
 const configuration=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}}),baselineVersionId='22222222-2222-4222-8222-222222222222',bytes=new Uint8Array([1,2,3]);
 const upload=engine.describeUpload({configuration,baselineVersionId,bytes});
 assert.equal(upload.method,'POST');assert.equal(upload.path,'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false');
 assert.deepEqual(upload.body,{...configuration,containers:configuration.containers.map(({class_name})=>({class_name})),bindings:configuration.bindings.map(value=>value.type==='secret_text'?{name:value.name,type:'inherit',version_id:baselineVersionId}:value),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:'AQID'}]});
 assert.deepEqual(engine.describeActivation({versionId:baselineVersionId}),{method:'POST',path:'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments',body:{strategy:'percentage',versions:[{version_id:baselineVersionId,percentage:100}]}});
 const original=globalThis.fetch;
 try{
  const requests=[];globalThis.fetch=async(path,options)=>{requests.push({method:options.method,path,body:JSON.parse(options.body)});return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
  const native=createFiniteFixedPolicyEngine({ctx:{},env:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
  await native.upload({configuration,baselineVersionId,bytes},lease);await native.activate({versionId:baselineVersionId},lease);
  assert.deepEqual(requests,[upload,engine.describeActivation({versionId:baselineVersionId})],'description and effective native request are identical');
 }finally{globalThis.fetch=original;}

});
test('T1 engine holder drift is absorbing before another provider effect',async()=>{
 const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),original=globalThis.fetch;
 try{
  let calls=0;globalThis.fetch=async()=>{calls++;return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
  const env={AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'},engine=createFiniteFixedPolicyEngine({ctx:{},env},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_CHANGED_PUBLISHER_00000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
  env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='SYNTHETIC_PUBLISHER_000000000000';await assert.rejects(engine.activate({versionId:'22222222-2222-4222-8222-222222222222'},lease));
  assert.equal(calls,0);
 }finally{globalThis.fetch=original;}
});
