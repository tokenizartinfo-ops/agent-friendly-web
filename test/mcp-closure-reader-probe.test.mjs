import test from 'node:test';
import assert from 'node:assert/strict';
import {readerFixture,ROOT,W,OP,APP} from './fixtures/closure-reader-probe.mjs';
const load=()=>import('../lib/mcp-closure-reader-probe.mjs');
test('dedicated reader observes only seven fixed GETs and returns no provider data or authority',async()=>{
 const{createPrivateClosureReaderProbe}=await load(),f=readerFixture(),h=createPrivateClosureReaderProbe(f.options);
 const r=await h.run(f.hash);assert.equal(r.status,'observed');assert.equal(r.observedAt,f.f.at);assert.equal(r.operationalReadiness,false);assert.equal(r.mayRetry,false);
 assert.deepEqual(r.observations.map(x=>x.resource),['canary_deployment','canary_version','operator_deployment','operator_version','operator_workflow','operator_instances','container_active_instances']);
 assert.ok(r.observations.every(x=>x.status==='matched'&&x.httpStatus===200));
 assert.deepEqual(f.calls.map(x=>new URL(x.url).pathname.replace('/client/v4','')),[ROOT+'/workers/scripts/'+W+'/deployments',ROOT+'/workers/workers/'+W+'/versions/'+f.f.ids.closed,ROOT+'/workers/scripts/'+OP+'/deployments',ROOT+'/workers/workers/'+OP+'/versions/'+f.f.ids.operator,ROOT+'/workflows/afw-release-administrative',ROOT+'/workflows/afw-release-administrative/instances',ROOT+'/containers/applications/'+APP+'/instances-v2']);
 assert.ok(f.calls.every(x=>x.init.method==='GET'&&!x.init.body));assert.equal(f.f.posts,0);
 for(const secret of ['synthetic-reader-token','Bearer','AFW_FIXTURE_VALUE_','content_base64','historical-instance'])assert.equal(JSON.stringify(r).includes(secret),false);
});
test('recreation and concurrent calls cannot replay a consumed read budget or renew observedAt',async()=>{
 const{createPrivateClosureReaderProbe}=await load(),f=readerFixture();let started,release;
 const seen=new Promise(r=>{started=r;}),gate=new Promise(r=>{release=r;}),fetch=f.options.fetchImpl;
 f.options.fetchImpl=async(...args)=>{started();await gate;return fetch(...args);};
 const h=createPrivateClosureReaderProbe(f.options),first=h.run(f.hash);await seen;
 assert.equal((await createPrivateClosureReaderProbe(f.options).run(f.hash)).status,'uncertain');release();assert.equal((await first).status,'observed');assert.equal(f.calls.length,7);
 f.advance(1000);const replay=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.equal(replay.status,'historical');assert.equal(replay.observedAt,f.f.at);assert.equal(f.calls.length,7);assert.equal(f.ctx.storage.puts,2);
});
test('committed SQLite ACK loss consumes intent or retained receipt without repeat HTTP',async()=>{
 const{createPrivateClosureReaderProbe}=await load();
 for(const losePut of[1,2]){
  const f=readerFixture(),transaction=f.ctx.storage.transaction;let lost=false;
  f.ctx.storage.transaction=async fn=>{const before=f.ctx.storage.puts,r=await Reflect.apply(transaction,f.ctx.storage,[fn]);if(!lost&&f.ctx.storage.puts>before&&f.ctx.storage.puts===losePut){lost=true;throw Error('credential MUST NOT escape');}return r;};
  const first=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.equal(first.status,'uncertain');assert.equal(lost,true);
  const calls=f.calls.length,again=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.equal(again.status,losePut===1?'uncertain':'historical');assert.equal(f.calls.length,calls);assert.equal(calls,losePut===1?0:7);assert.equal(JSON.stringify(again).includes('credential MUST NOT escape'),false);
 }
});
test('closed expired foreign extra-input and changed-policy scopes never issue HTTP',async()=>{
 const{createPrivateClosureReaderProbe}=await load();
 for(const change of[f=>f.env.AFW_MCP_READER_PROBE_ENABLED='false',f=>f.advance(120001),f=>f.ctx.id={toString:()=>'8'.repeat(64)},f=>f.env.AFW_MCP_READER_PROBE_POLICY+=' ',f=>f.env.AFW_MCP_CLOSURE_READ_TOKEN='bad\ncredential']){
  const f=readerFixture();change(f);assert.equal((await createPrivateClosureReaderProbe(f.options).run(f.hash)).status,'blocked');assert.equal(f.calls.length,0);
 }
 const f=readerFixture(),h=createPrivateClosureReaderProbe(f.options);assert.equal((await h.run(f.hash,{target:'foreign'})).status,'blocked');assert.equal((await h.run('0'.repeat(64))).status,'blocked');assert.equal(f.calls.length,0);
});
test('resumed journal continuation cannot dispatch after original deadline or control withdrawal',async()=>{
 const{createPrivateClosureReaderProbe}=await load();
 for(const mode of['expire','disable','change','backward']){
  const f=readerFixture(),transaction=f.ctx.storage.transaction;let changed=false;
  f.ctx.storage.transaction=async fn=>{const r=await Reflect.apply(transaction,f.ctx.storage,[fn]);if(!changed){changed=true;if(mode==='expire')f.advance(120001);if(mode==='disable')f.env.AFW_MCP_READER_PROBE_ENABLED='false';if(mode==='change')f.env.AFW_MCP_READER_PROBE_POLICY+=' ';if(mode==='backward')f.advance(-1);}return r;};
  const r=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.notEqual(r.status,'observed');assert.equal(f.calls.length,0,mode);
 }
});
test('403 is sanitized denied observation with no inferred cause and no automatic retry',async()=>{
 const{createPrivateClosureReaderProbe}=await load(),f=readerFixture();let calls=0;
 f.options.fetchImpl=async()=>{calls++;return Response.json({errors:[{message:'synthetic-reader-token private error'}]},{status:403});};
 const r=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.equal(r.status,'blocked');assert.equal(calls,7);assert.ok(r.observations.every(x=>x.status==='denied'&&x.httpStatus===403));assert.equal(JSON.stringify(r).includes('synthetic-reader-token'),false);
});
test('redirect cached malformed oversized and late responses never become successful observations',async()=>{
 const{createPrivateClosureReaderProbe}=await load();
 for(const mode of['redirect','cache','malformed','oversized','late']){
  const f=readerFixture();let cancelled=0,requests=0;
  f.options.fetchImpl=async()=>{
   requests++;if(mode==='late')f.advance(30000);
   const payload=mode==='malformed'?'not JSON':mode==='oversized'?'x'.repeat(4194305):JSON.stringify({success:true,errors:[],result:[]});
   return new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode(payload));if(mode==='malformed')c.close();},cancel(){cancelled++;}}),{status:mode==='redirect'?302:200,headers:{'Content-Type':'application/json',...(mode==='cache'?{'CF-Cache-Status':'HIT'}:{})}});
  };
  const r=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.notEqual(r.status,'observed',mode);if(mode!=='malformed')assert.ok(cancelled>0,mode);assert.ok(requests<=7);assert.equal(JSON.stringify(r).includes('xxxxx'),false);
 }
});
test('deadline on the final stream chunk prevents a later GET even before timer callbacks',async()=>{
 const{createPrivateClosureReaderProbe}=await load(),f=readerFixture();let calls=0;
 f.options.fetchImpl=async()=>{calls++;let pulled=false;return new Response(new ReadableStream({start(c){c.enqueue(new TextEncoder().encode(JSON.stringify({success:true,errors:[],result:{deployments:[f.f.state.canary]}})));},pull(c){if(!pulled){pulled=true;f.advance(30000);c.close();}}}),{headers:{'Content-Type':'application/json'}});};
 const r=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.notEqual(r.status,'observed');assert.equal(calls,1);
});
test('wrong module open flags secret shape association and partial inventories remain mismatches',async()=>{
 const{createPrivateClosureReaderProbe}=await load();
 for(const mode of['module','flags','secret','association','partial','active']){
  const f=readerFixture(),fetch=f.options.fetchImpl;
  if(mode==='module')f.f.state.closed.modules[0].content_base64=Buffer.from('wrong source').toString('base64');
  if(mode==='flags')f.f.state.closed.bindings[0].text='true';
  if(mode==='secret')f.f.state.operatorVersion.bindings.find(x=>x.type==='secret_text').text='sensitive-provider-value';
  if(mode==='active')f.f.state.active=true;
  if(mode==='association'||mode==='partial')f.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init),x=await r.json();if(mode==='association'&&new URL(url).pathname.endsWith('/afw-release-administrative'))x.result.script_name='foreign-worker';if(mode==='partial'&&new URL(url).pathname.endsWith('/instances'))x.result_info={per_page:100,page:1,total_pages:2,count:1,total_count:101};return Response.json(x);};
  const r=await createPrivateClosureReaderProbe(f.options).run(f.hash);assert.equal(r.status,'blocked',mode);assert.ok(r.observations.some(x=>x.status==='mismatch'));assert.equal(JSON.stringify(r).includes('sensitive-provider-value'),false);
 }
});
test('private Workflow uses one fixed actor and zero retries and preserves cached observation date',async()=>{
 const{createPrivateClosureReaderProbe,runPrivateClosureReaderProbeWorkflow}=await load(),f=readerFixture();let calls=0,cache;
 const host=createPrivateClosureReaderProbe(f.options);
 f.env.AFW_INDEPENDENT_CLOSURE.get=id=>{assert.equal(id.toString(),'9'.repeat(64));return{runOwnClosureReaderProbe:async hash=>{calls++;return JSON.stringify(await host.run(hash));}};};
 const step={do:async(name,options,fn)=>{assert.equal(name,'read-own-closure-provider');assert.equal(options.retries.limit,0);assert.equal(options.timeout,35000);return cache??=(await fn());}};
 const args={env:f.env,event:{payload:{operation:'mcp_closure_reader_probe',planHash:f.hash}},step,now:f.f.options.now};
 assert.equal((await runPrivateClosureReaderProbeWorkflow(args)).status,'observed');f.advance(1000);
 const old=await runPrivateClosureReaderProbeWorkflow(args);assert.equal(old.status,'historical');assert.equal(old.observedAt,f.f.at);assert.equal(calls,1);assert.equal(f.calls.length,7);
 args.event={payload:{operation:'mcp_closure_reader_probe',planHash:f.hash,target:'foreign'}};assert.equal((await runPrivateClosureReaderProbeWorkflow(args)).status,'blocked');assert.equal(calls,1);
});
