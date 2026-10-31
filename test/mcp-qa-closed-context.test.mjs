import test from 'node:test';
import assert from 'node:assert/strict';
const revision='a'.repeat(40),version='11111111-1111-4111-8111-111111111111',slot='afw-own-successor-closure-v1';
const flags=['AFW_QA_HTTP_ENABLED','AFW_QA_BOOTSTRAP_ENABLED','AFW_QA_CHALLENGE_ENABLED','AFW_MCP_CLOSURE_ENABLED','AFW_MCP_READER_PROBE_ENABLED','AFW_MCP_PUBLISHER_PROBE_ENABLED','AFW_MCP_CLOSURE_DISPATCH_ENABLED','AFW_QA_ORIGINALS_ENABLED','AFW_QA_PROVIDER_OBSERVATION_ENABLED','AFW_QA_PRIMARY_RESERVATION_ENABLED','AFW_QA_INSTALLATION_ENABLED','AFW_QA_PRIMARY_CATALOG_ENABLED','AFW_QA_PRIMARY_ADMISSION_ENABLED','AFW_MCP_CLOSURE_REDUCTION_ENABLED'];
async function api(){globalThis.__AFW_QA_SOURCE_REVISION__=revision;try{return await import('../lib/mcp-qa-closed-context.mjs');}finally{delete globalThis.__AFW_QA_SOURCE_REVISION__;}}
const payload=()=>({operation:'observe_closed_context',expectedVersionId:version,expectedSourceRevision:revision});
function fixture(){
 const id='b'.repeat(64),ctx={id:{toString:()=>id}},env={AFW_QA_VERSION:{id:version},...Object.fromEntries(flags.map(k=>[k,'false']))};
 const calls={rpc:0,step:0};let actorApi;
 const stub={observeOwnQaClosedContext:async p=>{calls.rpc++;return JSON.stringify(actorApi.observePrivateQaClosedActor({env,ctx,payload:p}));}};
 env.AFW_INDEPENDENT_CLOSURE={idFromName:name=>{assert.equal(name,slot);return {toString:()=>id};},get:()=>stub};
 for(const key of ['AFW_QA_DB','AFW_MCP_CLOSURE_READ_TOKEN','AFW_MCP_CLOSURE_PUBLISH_TOKEN','AFW_QA_ADMIN_READ_API_TOKEN'])Object.defineProperty(env,key,{enumerable:true,get(){assert.fail('closed context must not read '+key);}});
 return {env,ctx,calls,stub,setModule:m=>actorApi=m,event:{payload:payload(),instanceId:'afw-qa-context-'+version+'-'+revision.slice(0,16)},step:{async do(name,options,fn){calls.step++;assert.equal(options.retries.limit,0);assert.equal(options.timeout,'5 seconds');return fn();}}};
}
test('closed Workflow and fixed actor observe only matching compiled/native identities',async()=>{
 const m=await api();assert.equal(typeof m.runPrivateQaClosedContext,'function');const f=fixture();f.setModule(m);
 const out=await m.runPrivateQaClosedContext(f);assert.equal(out.status,'observed');assert.equal(out.context,'workflow');assert.equal(out.actor.context,'durable_object');assert.equal(out.runtimeVersionId,version);assert.equal(out.sourceRevision,revision);assert.equal(out.authorizesEffects,false);assert.equal(out.guardLivenessVerified,false);assert.equal(out.operationalReadiness,false);assert.equal(f.calls.rpc,1);assert.equal(f.calls.step,1);
});
test('every open, missing or accessor flag blocks before step and RPC',async t=>{
 const m=await api();
 for(const flag of flags)for(const mode of ['open','missing','accessor'])await t.test(flag+':'+mode,async()=>{
  const f=fixture();f.setModule(m);if(mode==='open')f.env[flag]='true';else if(mode==='missing')delete f.env[flag];else Object.defineProperty(f.env,flag,{enumerable:true,get(){assert.fail('flag accessor must not run');}});
  const out=await m.runPrivateQaClosedContext(f);assert.equal(out.status,'blocked');assert.equal(f.calls.step,0);assert.equal(f.calls.rpc,0);
 });
});
test('foreign identity, nominal payload, extra fields and wrong actor fail closed',async t=>{
 const m=await api();for(const mode of ['version','revision','extra','nominal','instance','actor'])await t.test(mode,async()=>{
  const f=fixture();f.setModule(m);
  if(mode==='version')f.event.payload.expectedVersionId='22222222-2222-4222-8222-222222222222';
  if(mode==='revision')f.event.payload.expectedSourceRevision='c'.repeat(40);
  if(mode==='extra')f.event.payload.grantId='no';
  if(mode==='nominal')f.event.payload={planHash:'d'.repeat(64)};
  if(mode==='instance')f.event.instanceId='foreign';
  if(mode==='actor')f.ctx.id={toString:()=>'c'.repeat(64)};
  const out=await m.runPrivateQaClosedContext(f);assert.equal(out.status,'blocked');assert.equal(out.mayRetry,false);assert.equal(out.operationalReadiness,false);
 });
});
test('cached step, changed flags and mismatched actor output are not fresh context evidence',async t=>{
 const m=await api();for(const mode of ['cache','late','foreign-output','oversized-output'])await t.test(mode,async()=>{
  const f=fixture();f.setModule(m);
  if(mode==='cache')f.step.do=async()=>({status:'observed'});
  if(mode==='late')f.step.do=async(_n,_o,fn)=>{const r=await fn();f.env.AFW_QA_HTTP_ENABLED='true';return r;};
  if(mode==='foreign-output')f.stub.observeOwnQaClosedContext=async()=>JSON.stringify({...m.observePrivateQaClosedActor({env:f.env,ctx:f.ctx,payload:payload()}),sourceRevision:'d'.repeat(40)});
  if(mode==='oversized-output')f.stub.observeOwnQaClosedContext=async()=>'x'.repeat(1025);
  assert.equal((await m.runPrivateQaClosedContext(f)).status,'blocked');
 });
});
test('unsealed source cannot use a request or metadata as compiled revision',async()=>{
 const m=await import('../lib/mcp-qa-closed-context.mjs?unsealed');const f=fixture();f.setModule(m);
 assert.equal((await m.runPrivateQaClosedContext(f)).status,'blocked');assert.equal(f.calls.step,0);
});

test('original deadline timer is installed before entering the step callback',async()=>{
 const m=await api(),f=fixture();f.setModule(m);const actual=setTimeout;let installed=false;
 globalThis.setTimeout=(fn,ms,...args)=>{assert.ok(ms>0&&ms<=5000);installed=true;return actual(fn,ms,...args);};
 const step=f.step.do;f.step.do=(...args)=>{assert.equal(installed,true,'deadline must predate any work');return step(...args);};
 try{assert.equal((await m.runPrivateQaClosedContext(f)).status,'observed');}finally{globalThis.setTimeout=actual;}
});

test('Workflow accepts the one bounded JSON text layer sent by the native REST API',async t=>{
 const m=await api();
 for(const mode of ['api-json','exact256'])await t.test(mode,async()=>{
  const f=fixture();f.setModule(m);let raw=JSON.stringify(payload());if(mode==='exact256')raw+=' '.repeat(256-Buffer.byteLength(raw));f.event.payload=raw;
  const out=await m.runPrivateQaClosedContext(f);assert.equal(out.status,'observed');assert.equal(out.actor.context,'durable_object');assert.equal(out.authorizesEffects,false);assert.equal(f.calls.rpc,1);assert.equal(f.calls.step,1);
 });
});
test('API JSON normalization rejects nested malformed extra and oversized input before work',async t=>{
 const m=await api();
 const inputs=[JSON.stringify(JSON.stringify(payload())),'{bad','null','[]',JSON.stringify({...payload(),extra:true}),JSON.stringify(payload())+' '.repeat(257),JSON.stringify({operation:'observe_closed_context',expectedVersionId:version,expectedSourceRevision:'é'.repeat(100)})];
 for(const [i,raw] of inputs.entries())await t.test(String(i),async()=>{
  const f=fixture();f.setModule(m);f.event.payload=raw;assert.equal((await m.runPrivateQaClosedContext(f)).status,'blocked');assert.equal(f.calls.step,0);assert.equal(f.calls.rpc,0);
 });
});
test('oversized API text is rejected before JSON parsing; actor RPC still accepts only objects',async()=>{
 const m=await api(),f=fixture();f.setModule(m);f.event.payload=JSON.stringify(payload())+' '.repeat(257);const parse=JSON.parse;let calls=0;JSON.parse=(...args)=>{calls++;return parse(...args);};
 try{assert.equal((await m.runPrivateQaClosedContext(f)).status,'blocked');assert.equal(calls,0);}finally{JSON.parse=parse;}
 assert.equal(m.observePrivateQaClosedActor({env:f.env,ctx:f.ctx,payload:JSON.stringify(payload())}).status,'blocked');
});
