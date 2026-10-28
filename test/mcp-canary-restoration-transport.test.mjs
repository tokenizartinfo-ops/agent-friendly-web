import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {restorationFixture,ROOT,W,OP} from './fixtures/canary-restoration.mjs';
const load=()=>import('../lib/mcp-canary-restoration-transport.mjs');
const origin='https://api.cloudflare.com/client/v4',message='Canary restoration transport unavailable';
function fixture(){
 const f=restorationFixture();let reads=0,publishes=0;const calls=[];
 const options={readControl:()=>({...f.control}),readReadCredential:async()=>{reads++;return 'synthetic-reader-token';},readPublishCredential:async()=>{publishes++;return 'synthetic-publisher-token';},now:()=>f.at,
  fetchImpl:async(url,init)=>{calls.push({url,init});const u=new URL(url);assert.equal(u.origin,'https://api.cloudflare.com');const r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v])),body:init.body?JSON.parse(init.body):undefined});const{status,...body}=r;return Response.json(body,{status});}};
 const signal=()=>new AbortController().signal;
 const request=(method='GET',path=ROOT+'/workers/scripts/'+W+'/deployments',rest={})=>({method,path,signal:signal(),...rest});
 const body=()=>({strategy:'percentage',versions:[{version_id:f.ids.closed,percentage:100}],annotations:{'workers/message':'AFW closed canary restoration '+createHash('sha256').update(f.control.policy).digest('hex')}});
 return {f,options,calls,request,body,get reads(){return reads;},get publishes(){return publishes;}};
}
test('fixed restoration transport authenticates approved reads and one exact closed deployment only',async()=>{
 const {createCanaryRestorationTransport}=await load(),f=fixture(),run=createCanaryRestorationTransport(f.options);
 const paths=[
  [ROOT+'/workers/scripts/'+W+'/deployments'],[ROOT+'/workers/scripts/'+OP+'/deployments'],
  [ROOT+'/workers/workers/'+W+'/versions/'+f.f.ids.live,{include:'modules'}],
  [ROOT+'/workers/workers/'+W+'/versions/'+f.f.ids.closed,{include:'modules'}],
  [ROOT+'/workers/workers/'+OP+'/versions/'+f.f.ids.operator,{include:'modules'}],
  ...[W,OP].flatMap(n=>['schedules','tails'].map(k=>[ROOT+'/workers/scripts/'+n+'/'+k])),
  [ROOT+'/workflows/afw-release-administrative'],[ROOT+'/workflows/afw-release-administrative/instances',{per_page:100,direction:'desc'}],
  [ROOT+'/containers/applications/'+f.f.policy.candidate.applicationId+'/instances-v2',{state:'active',per_page:100}]
 ];
 for(const [path,query] of paths){const r=await run(f.request('GET',path,query?{query}:{}));assert.equal(r.success,true);assert.equal(r.status,200);}
 const r=await run(f.request('POST',ROOT+'/workers/scripts/'+W+'/deployments',{body:f.body()}));assert.equal(r.result.id,f.f.ids.closedDep);assert.equal(f.reads,12);assert.equal(f.publishes,1);
 for(const c of f.calls){assert.ok(c.url.startsWith(origin+ROOT+'/'));assert.equal(c.init.redirect,'manual');assert.equal(c.init.cache,'no-store');assert.equal(c.init.headers.Authorization,c.init.method==='GET'?'Bearer synthetic-reader-token':'Bearer synthetic-publisher-token');assert.ok(c.init.signal instanceof AbortSignal);}
 await assert.rejects(run(f.request('POST',ROOT+'/workers/scripts/'+W+'/deployments',{body:f.body()})),e=>e.message===message);assert.equal(f.calls.length,13);
});
test('foreign paths methods headers query body and input accessors never touch credentials or network',async t=>{
 const {createCanaryRestorationTransport}=await load();
 const changes=[
  f=>f.request('GET','/accounts/foreign/workers/scripts/'+W+'/deployments'),
  f=>f.request('POST',ROOT+'/workers/scripts/'+OP+'/deployments',{body:f.body()}),
  f=>f.request('PUT',ROOT+'/workers/scripts/'+W+'/deployments',{body:f.body()}),
  f=>f.request('GET',ROOT+'/workers/workers/'+W+'/versions/77777777-7777-4777-8777-777777777777',{query:{include:'modules'}}),
  f=>f.request('GET',undefined,{headers:{Authorization:'caller'}}),
  f=>f.request('GET',undefined,{query:{page:2}}),
  f=>f.request('GET',ROOT+'/containers/applications/'+f.f.policy.candidate.applicationId+'/instances-v2',{query:{state:'active',per_page:100,page_token:'other'}}),
  f=>f.request('POST',ROOT+'/workers/scripts/'+W+'/deployments',{body:{...f.body(),force:true}}),
  f=>f.request('POST',ROOT+'/workers/scripts/'+W+'/deployments',{body:{...f.body(),versions:[{version_id:f.f.ids.live,percentage:100}]}})
 ];
 for(let n=0;n<changes.length;n++)await t.test(String(n),async()=>{const f=fixture();await assert.rejects(createCanaryRestorationTransport(f.options)(changes[n](f)),e=>e.message===message);assert.equal(f.reads+f.publishes+f.calls.length,0);});
 const f=fixture();let getter=false;const input=Object.defineProperty(f.request(),'path',{enumerable:true,get(){getter=true;return ROOT;}});
 await assert.rejects(createCanaryRestorationTransport(f.options)(input));assert.equal(getter,false);assert.equal(f.reads+f.publishes+f.calls.length,0);
});
test('closed expired changed and accessor controls cannot become network authority',async()=>{
 const {createCanaryRestorationTransport}=await load();
 for(const change of [f=>f.f.control.enabled=false,f=>f.options.now=()=>f.f.policy.expiresAt,f=>f.f.control.policy='{}']){
  const f=fixture();change(f);await assert.rejects(createCanaryRestorationTransport(f.options)(f.request()));assert.equal(f.reads+f.publishes+f.calls.length,0);
 }
 const f=fixture();let getter=false;f.options.readControl=()=>Object.defineProperty({enabled:true},'policy',{enumerable:true,get(){getter=true;return f.f.control.policy;}});await assert.rejects(createCanaryRestorationTransport(f.options)(f.request()));assert.equal(getter,false);
 const g=fixture(),run=createCanaryRestorationTransport(g.options);await run(g.request());g.f.control.policy=g.f.control.policy.replace('restore_canary','other');await assert.rejects(run(g.request()));assert.equal(g.calls.length,1);
});
test('lost write ACK reserves the transport attempt and never exposes provider or credential detail',async()=>{
 const {createCanaryRestorationTransport}=await load(),f=fixture();f.options.fetchImpl=async()=>{f.calls.push({});throw Error('synthetic-publisher-token provider-secret-detail');};
 const run=createCanaryRestorationTransport(f.options),input=f.request('POST',ROOT+'/workers/scripts/'+W+'/deployments',{body:f.body()});
 await assert.rejects(run(input),e=>e.message===message);await assert.rejects(run(input),e=>e.message===message);assert.equal(f.calls.length,1);assert.equal(f.publishes,1);
});
test('redirects cache metadata bad envelopes oversized and invalid bodies are rejected without retry',async t=>{
 const {createCanaryRestorationTransport}=await load();
 const responses=[
  ()=>Response.redirect('https://foreign.invalid',302),
  ()=>Response.json({success:true,errors:[],result:{}},{headers:{Age:'1'}}),
  ()=>Response.json({success:true,errors:[],result:{}},{headers:{'CF-Cache-Status':'HIT'}}),
  ()=>Response.json({success:true,errors:[],result:{}},{headers:{'Content-Length':String(4194305)}}),
  ()=>new Response('not-json',{headers:{'Content-Type':'application/json'}}),
  ()=>new Response(new Uint8Array([255]),{headers:{'Content-Type':'application/json'}}),
  ()=>Response.json({success:false,errors:[{message:'provider-private-detail'}],result:null}),
  ()=>new Response('{"success":true,"errors":[],"result":{}}',{headers:{'Content-Type':'text/plain'}}),
  ()=>new Response(new ReadableStream({start(c){c.enqueue(new Uint8Array(4194305));c.close();}}),{headers:{'Content-Type':'application/json'}})
 ];
 for(let n=0;n<responses.length;n++)await t.test(String(n),async()=>{const f=fixture();let count=0;f.options.fetchImpl=async()=>{count++;return responses[n]();};await assert.rejects(createCanaryRestorationTransport(f.options)(f.request()),e=>e.message===message);assert.equal(count,1);});
});
test('credential fetch stream and final continuations remain under original authority and deadline',async()=>{
 const {createCanaryRestorationTransport}=await load(),f=fixture();f.options.readReadCredential=async()=>{f.f.control.enabled=false;return 'synthetic-reader-token';};await assert.rejects(createCanaryRestorationTransport(f.options)(f.request()));assert.equal(f.calls.length,0);
 const g=fixture();let signal;g.options.fetchImpl=(_url,init)=>{signal=init.signal;return new Promise(()=>{});};await assert.rejects(createCanaryRestorationTransport({...g.options,timeoutMs:20})(g.request()));assert.equal(signal.aborted,true);
 const h=fixture();let late=false;h.options.readReadCredential=async()=>{await new Promise(r=>setTimeout(r,35));late=true;return 'synthetic-reader-token';};await assert.rejects(createCanaryRestorationTransport({...h.options,timeoutMs:15})(h.request()));await new Promise(r=>setTimeout(r,45));assert.equal(late,true);assert.equal(h.calls.length,0);
 const j=fixture();j.options.fetchImpl=async()=>new Response(new ReadableStream({start(){}}),{headers:{'Content-Type':'application/json'}});await assert.rejects(createCanaryRestorationTransport({...j.options,timeoutMs:20})(j.request()));
 const k=fixture(),abort=new AbortController();abort.abort();await assert.rejects(createCanaryRestorationTransport(k.options)({...k.request(),signal:abort.signal}));assert.equal(k.reads+k.calls.length,0);
});
test('version metadata projection preserves env names without returning secret values',async()=>{
 const {createCanaryRestorationTransport}=await load(),f=fixture();f.f.state.closed.env={PRIVATE:'do-not-return-this-value'};
 const r=await createCanaryRestorationTransport(f.options)(f.request('GET',ROOT+'/workers/workers/'+W+'/versions/'+f.f.ids.closed,{query:{include:'modules'}}));assert.deepEqual(r.result.env,{PRIVATE:null});assert.equal(JSON.stringify(r).includes('do-not-return-this-value'),false);
 const g=fixture();g.f.state.operatorVersion.bindings.find(b=>b.type==='secret_text').value='do-not-return-this-value';await assert.rejects(createCanaryRestorationTransport(g.options)(g.request('GET',ROOT+'/workers/workers/'+OP+'/versions/'+g.f.ids.operator,{query:{include:'modules'}})));
});
