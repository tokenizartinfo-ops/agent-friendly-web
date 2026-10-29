import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {publisherFixture} from './fixtures/closure-publisher-probe.mjs';
// Production host/DO/SQLite/Workflow, synthetic provider only; no real custody,
 // native event withdrawal, Container execution or PC-off acceptance.
test('native publisher Workflow stays closed and durably reselects only once through primitive RPC',async()=>{
 const built=await build({stdin:{contents:"import original,{IndependentClosure,PrivateQaBootstrap} from './worker/independent-closure/index.mjs';\nexport{IndependentClosure,PrivateQaBootstrap};\nexport default{async fetch(request,env){const u=new URL(request.url);if(u.pathname==='/__fixture/create'){const x=await env.BOOTSTRAP.create(await request.json());return Response.json({id:x.id});}if(u.pathname==='/__fixture/status')return Response.json(await(await env.BOOTSTRAP.get(u.searchParams.get('id'))).status());return original.fetch(request,env);}};",resolveDir:process.cwd(),sourcefile:'closure-reader-native-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],target:'es2022',external:['node:*','cloudflare:*'],legalComments:'none'});
 const f=publisherFixture({at:Date.now()});let enabled='false',outbound=0;
 const options=()=>convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_MCP_PUBLISHER_PROBE_ENABLED:enabled,AFW_MCP_PUBLISHER_PROBE_POLICY:f.env.AFW_MCP_PUBLISHER_PROBE_POLICY,AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-publisher-token',AFW_MCP_CLOSURE_ENABLED:'false',AFW_QA_BOOTSTRAP_ENABLED:'false',AFW_QA_CHALLENGE_ENABLED:'false'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'IndependentClosure',useSQLite:true,uniqueKey:'private-closure-publisher-fixture'}},d1Databases:{AFW_QA_DB:'qa'},workflows:{BOOTSTRAP:{name:'own-publisher-fixture',className:'PrivateQaBootstrap'}},outboundService:async request=>{outbound++;return f.options.fetchImpl(request.url,{method:request.method,redirect:'manual',cache:'no-store',headers:{Authorization:request.headers.get('Authorization')},...(request.method==='POST'?{body:await request.text()}:{})});}});
 const mf=new Miniflare(options());
 try{
  const call=async(path,body)=>{const r=await mf.dispatchFetch('https://fixture.invalid'+path,body?{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)}:{});assert.equal(r.status,200);return r.json();};
  const run=async id=>{await call('/__fixture/create',{id,params:{operation:'mcp_closure_publisher_probe',planHash:f.hash}});let r;const end=Date.now()+15000;do{r=await call('/__fixture/status?id='+id);if(['complete','errored'].includes(r.status))break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);assert.equal(r.status,'complete',JSON.stringify(r));return r.output;};
  assert.equal((await run('closed')).status,'blocked');assert.equal(outbound,0);
  enabled='true';await mf.setOptions(options());const first=await run('own');assert.equal(first.status,'qualified',JSON.stringify({first,outbound}));assert.ok(first.observations.length>=16);assert.ok(outbound>=16);assert.equal(f.f.posts,1);const acceptedOutbound=outbound;assert.equal(first.operationalReadiness,false);
  await mf.setOptions(options());const again=await run('recreated');assert.equal(again.status,'historical');assert.equal(again.observedAt,first.observedAt);assert.equal(outbound,acceptedOutbound);assert.equal(f.f.posts,1);
  assert.equal((await mf.dispatchFetch('https://fixture.invalid/mcp/closure/publisher')).status,404);assert.equal(outbound,acceptedOutbound);assert.equal(f.f.posts,1);
 }finally{await mf.dispose();}
});
