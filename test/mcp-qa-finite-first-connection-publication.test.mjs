import test from 'node:test';
import assert from 'node:assert/strict';
import {access,mkdir,writeFile} from 'node:fs/promises';
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
 assert.equal(result.settled,true);assert(result.failure,JSON.stringify(result));assert(result.trace.includes('writer-prepared'),JSON.stringify(result));
 assert(result.trace.filter(value=>value==='put:enrollment').length<=1);
 assert(result.trace.filter(value=>value==='put:ack').length<=1);
 if(['ack-first','holder-drift','deadline'].includes(scenario))assert.equal(result.trace.filter(value=>value.startsWith('put:')).length,0);
 if(scenario==='unknown-enrollment'){assert.equal(result.trace.filter(value=>value==='put:enrollment').length,1);assert.equal(result.trace.filter(value=>value==='put:ack').length,0);}
 if(scenario==='unknown-ack')assert.equal(result.trace.filter(value=>value==='put:ack').length,1);
}));
import {syntheticPreparation} from './fixtures/finite-connection-source.mjs';
test('T1 fixed descriptions preserve literal wire and secret baseline inheritance',async()=>{
 const {createFiniteFixedPolicyEngine}=await import('../lib/mcp-qa-finite-fixed-policy-engine.mjs'),engine=createFiniteFixedPolicyEngine({ctx:{},env:{}},()=>{});
 const configuration=syntheticPreparation('closed_ui',{clientId:'SYNTHETIC_CLIENT',project:{projectId:'SYNTHETIC_PROJECT'},access:{audience:'SYNTHETIC_AUD',teamDomain:'synthetic.cloudflareaccess.com'},window:{expiresAt:1000000}}),baselineVersionId='22222222-2222-4222-8222-222222222222',bytes=new Uint8Array([1,2,3]);
 const upload=engine.describeUpload({configuration,baselineVersionId,bytes});
 assert.equal(upload.method,'POST');assert.equal(upload.path,'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/workers/agent-friendly-web-delegated-canary/versions?deploy=false');
 assert.deepEqual(upload.body,{...configuration,containers:configuration.containers.map(({class_name})=>({class_name})),bindings:configuration.bindings.map(value=>value.type==='secret_text'?{name:value.name,type:'inherit',version_id:baselineVersionId}:value),modules:[{name:'index.mjs',content_type:'application/javascript+module',content_base64:'AQID'}]});
 assert.deepEqual(engine.describeActivation({versionId:baselineVersionId}),{method:'POST',path:'https://api.cloudflare.com/client/v4/accounts/85d0d5dadac3341a564f22ce885e9eec/workers/scripts/agent-friendly-web-delegated-canary/deployments',body:{strategy:'percentage',versions:[{version_id:baselineVersionId,percentage:100}]}});
 const activation=engine.describeActivation({versionId:baselineVersionId}),original=globalThis.fetch;
 try{
  const requests=[];globalThis.fetch=async(path,options)=>{requests.push({method:options.method,path,body:JSON.parse(options.body)});return Response.json({success:true,errors:[],messages:[],result:{id:'33333333-3333-4333-8333-333333333333'}});};
  const native=createFiniteFixedPolicyEngine({ctx:{},env:{AFW_MCP_CLOSURE_PUBLISH_TOKEN:'SYNTHETIC_PUBLISHER_000000000000'}},()=>{}),lease={signal:new AbortController().signal,assertCurrent(){}};
  await native.upload({configuration,baselineVersionId,bytes},lease);await native.activate({versionId:baselineVersionId},lease);
  assert.deepEqual(requests,[upload,activation],'description and effective native request are identical');
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

import {compileFiniteNativeStaging} from '../scripts/build-finite-native-package.mjs';
import {execFileSync} from 'node:child_process';
import {createHash as firstHash} from 'node:crypto';
import {gunzipSync as firstInflate} from 'node:zlib';
import {createFiniteOwnerRequestLease} from '../lib/mcp-qa-finite-owner-preparation.mjs';
import {forwardFiniteOwnerChoice} from '../lib/mcp-qa-finite-owner-native-bridge.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev',U=O+'/connections/finite-prepare',V='11111111-1111-4111-8111-111111111111',H='a'.repeat(64),P='b'.repeat(64);
const validForm='handle='+H+'&projectRef='+P+'&decision=approve';
function conduit(fetcher){
 const sent=[],retained=[],stub={fetch(request){sent.push(request);return fetcher(request);}},ns={idFromName(){return {toString:()=> 'c'.repeat(64)};},get(){return stub;}};
 return {sent,retained,env:{AFW_FINITE_TRIAL_CONTROL:ns,AFW_FINITE_TRIAL_VERSION:{id:V},DB:{prepare(){},withSession(){}},OAUTH_KV:{get(){},put(){}},DELEGATED_RATE_LIMITER:{limit(){}}},ctx:{waitUntil(p){retained.push(p);}}};
}
const html=()=>new Response('<!doctype html><p>Prepared</p>',{headers:{'Content-Type':'text/html; charset=utf-8','Content-Security-Policy':"default-src 'none'; form-action 'self'; frame-ancestors 'none'",'Referrer-Policy':'no-referrer','Cache-Control':'no-store'}});
async function choice(f,options={},url=U){
 const request=new Request(url,options),parent=createFiniteOwnerRequestLease(request);
 try{return await forwardFiniteOwnerChoice({request,...f},parent.lease);}finally{parent.finish();await Promise.all(f.retained);}
}
function post(body=validForm,headers={}){return {method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:'__Host-afw-finite-prepare='+H,...headers},body};}
test('T2 initial artifact already contains fixed finite dispatch',async()=>{
 const revision=execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),r=await compileFiniteNativeStaging({cwd:process.cwd(),sourceRevision:revision}),m=r.metafiles.canaryLive.inputs,q=r.metafiles.qaLive.inputs;
 const artifacts='output/t2-graphs';await mkdir(artifacts,{recursive:true});
 await Promise.all([
  writeFile(artifacts+'/compiler-metafiles.json',JSON.stringify(r.metafiles,null,2)),
  writeFile(artifacts+'/compiler.json',JSON.stringify({purpose:r.purpose,sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,modules:r.modules,candidateResidency:{...r.candidateResidency,content:undefined},completePackage:r.completePackage,operationalReadiness:r.operationalReadiness},null,2)),
  writeFile(artifacts+'/canary-index.mjs',r.files['canaryLive/index.mjs']),
  writeFile(artifacts+'/qa-index.mjs',r.files['qaLive/index.mjs'])
 ]);
 for(const path of ['lib/mcp-qa-finite-owner-native-bridge.mjs','lib/mcp-qa-finite-owner-oauth-forward.mjs','lib/mcp-qa-finite-owner-notice-get-forward.mjs'])assert(m[path],'initial M must contain '+path);
 for(const path of ['lib/mcp-qa-finite-owner-native-receiver.mjs','lib/mcp-qa-finite-owner-oauth-qa.mjs','lib/mcp-qa-finite-owner-notice-get-qa.mjs'])assert(q[path],'initial QA must contain '+path);
 assert.equal(m['lib/mcp-qa-finite-candidate-residency.mjs'],undefined);assert(q['lib/mcp-qa-finite-candidate-residency.mjs']);
 assert.deepEqual(firstInflate(Buffer.from(r.candidateResidency.content,'base64')),r.files['canaryLive/index.mjs']);
 for(const role of ['canaryLive','qaLive'])console.info('T2 compiler',JSON.stringify({role,sourceRevision:r.sourceRevision,sourceTree:r.sourceTree,bytes:r.files[role+'/index.mjs'].length,sha256:firstHash('sha256').update(r.files[role+'/index.mjs']).digest('hex'),inputs:Object.keys(r.metafiles[role].inputs).length}));
 assert.equal(r.completePackage,false);assert.equal(r.operationalReadiness,false);
});
test('T2 choice grammar bounds actual body and cookies',async t=>{
 const cases=[
  ['overflow',post('x'.repeat(1025)),413],['utf8',post(new Uint8Array([0xc3,0x28])),503],
  ['escape',post(validForm+'&bad=%GG'),400],['encoded utf8',post(validForm.replace(H,'%FF')),400],
  ['extra',post(validForm+'&extra=1'),400],['duplicate',post(validForm+'&handle='+H),400],
  ['decision',post(validForm.replace('approve','deny')),400],['short handle',post(validForm.replace(H,'a')),400],
  ['project',post(validForm.replace(P,'b')),400],['missing cookie',post(validForm,{Cookie:''}),400],
  ['absent cookie',{method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'},body:validForm},403],
  ['cookie separator',post(validForm,{Cookie:'other=x;__Host-afw-finite-prepare='+H}),400],
  ['cookie name',post(validForm,{Cookie:'bad name=x; __Host-afw-finite-prepare='+H}),400],
  ['cookie duplicate',post(validForm,{Cookie:'__Host-afw-finite-prepare='+H+'; __Host-afw-finite-prepare='+H}),400],
  ['foreign duplicate',post(validForm,{Cookie:'x=1; x=2; __Host-afw-finite-prepare='+H}),400],
  ['mismatch',post(validForm,{Cookie:'__Host-afw-finite-prepare='+P}),403],
  ['legacy cookie',post(validForm,{Cookie:'SYN-cookie'}),400],['legacy form',post('SYN=bounded'),400],
  ['content-type',post(validForm,{'Content-Type':'text/plain'}),400],['origin',post(validForm,{Origin:'https://other.invalid'}),403]
 ];
 for(const [name,options,status]of cases)await t.test(name,async()=>{const f=conduit(html),r=await choice(f,options);assert.equal(r.status,status,name);assert.equal(f.sent.length,0,'invalid choice must not enter QA');});
 for(const [name,options]of [['get',{}],['get valid foreign cookie',{headers:{Cookie:'synthetic="valid value"'}}],['post',post()],['post foreign cookie',post(validForm,{Cookie:'other=""; __Host-afw-finite-prepare='+H})]]){
  // Cookie values follow RFC6265 octets: a quoted space is still invalid.
  if(name==='get valid foreign cookie')options.headers.Cookie='synthetic="valid-value"';
  await t.test(name,async()=>{const f=conduit(html),r=await choice(f,options);assert.equal(r.status,200);assert.equal(f.sent.length,1);assert.match(await r.text(),/Prepared/);});
 }
 for(const suffix of ['?q=1','#fragment']){const f=conduit(html);assert.equal((await choice(f,{},U+suffix)).status,404);assert.equal(f.sent.length,0);}
});
test('T2 choice response only carries bounded QA HTML and allowed headers',async t=>{
 for(const [name,make,status]of [
  ['pending',()=>Response.json({status:'admin_pending'},{status:503}),503],
  ['json',()=>Response.json({success:true}),503],['header',()=>new Response('html',{headers:{'Content-Type':'text/html','X-Provider-Secret':'SYN'}}),503],
  ['oversize',()=>new Response('x'.repeat(16385),{headers:{'Content-Type':'text/html'}}),503],['status202',()=>new Response('partial',{status:202,headers:{'Content-Type':'text/html'}}),503],
  ['html',html,200]
 ])await t.test(name,async()=>{const f=conduit(make),r=await choice(f);assert.equal(r.status,status);assert.equal(r.headers.get('X-Provider-Secret'),null);assert.equal(r.headers.get('Cache-Control'),'no-store');if(status===200){assert(r.headers.has('Content-Security-Policy'));assert.equal(r.headers.get('Referrer-Policy'),'no-referrer');}});
});

test('T2 original headers and signal remain fixed until actual continuation',async()=>{
 let entered,release;const ready=new Promise(r=>{entered=r;}),f=conduit(()=>{entered();return new Promise(r=>{release=r;});});
 const request=new Request(U,{headers:{Cookie:'synthetic=one'}}),parent=createFiniteOwnerRequestLease(request);
 try{
  const pending=forwardFiniteOwnerChoice({request,...f},parent.lease);await ready;request.headers.set('Cookie','synthetic=two');release(html());assert.equal((await pending).status,503);assert.equal(f.sent.length,1);
 }finally{parent.finish();await Promise.all(f.retained);}
 const g=conduit(html),get=new Request(U),body=new ReadableStream({start(c){c.enqueue(new Uint8Array([1]));c.close();}});
 Object.defineProperty(get,'body',{value:body});
 const original=createFiniteOwnerRequestLease(get);
 try{assert.equal((await forwardFiniteOwnerChoice({request:get,...g},original.lease)).status,400);assert.equal(g.sent.length,0);}
 finally{original.finish();await Promise.all(g.retained);}
});
