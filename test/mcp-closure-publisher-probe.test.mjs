import test from 'node:test';
import assert from 'node:assert/strict';
import {publisherFixture,ROOT,W,OP} from './fixtures/closure-publisher-probe.mjs';
import {readerFixture} from './fixtures/closure-reader-probe.mjs';
const load=async()=>{const x=await import('../lib/mcp-closure-reader-probe.mjs');assert.equal(typeof x.createPrivateClosurePublisherProbe,'function','publisher probe factory missing');assert.equal(typeof x.runPrivateClosurePublisherProbeWorkflow,'function','publisher workflow missing');return x;};
test('publisher qualifies exactly the same closed version with one POST and fresh readback',async()=>{
 const{createPrivateClosurePublisherProbe}=await load(),f=publisherFixture(),r=await createPrivateClosurePublisherProbe(f.options).run(f.hash);
 assert.equal(r.status,'qualified',JSON.stringify(r));assert.equal(r.purpose,'afw.closure-publisher-probe.v1');assert.equal(r.selectedDeploymentId,f.nextDeployment);assert.equal(r.observedSnapshotOnly,false);assert.equal(r.operationalReadiness,false);assert.equal(r.mayRetry,false);assert.equal(f.f.posts,1);
 assert.equal(f.calls.filter(c=>c.init.method==='POST').length,1);assert.ok(f.calls.filter(c=>c.init.method==='GET').length>=15);
 assert.ok(r.observations.every(x=>x.status==='matched'));
 for(const sensitive of['synthetic-publisher-token','synthetic-reader-token','Bearer','AFW_FIXTURE_VALUE_','content_base64','historical-instance'])assert.equal(JSON.stringify(r).includes(sensitive),false);
});
test('reader operation never obtains publisher key or writes',async()=>{
 const{createPrivateClosureReaderProbe}=await import('../lib/mcp-closure-reader-probe.mjs');const f=readerFixture();Object.defineProperty(f.env,'AFW_MCP_CLOSURE_PUBLISH_TOKEN',{get(){throw Error('publisher read by reader');}});
 assert.equal((await createPrivateClosureReaderProbe(f.options).run(f.hash)).status,'observed');assert.equal(f.calls.length,7);assert.equal(f.f.posts,0);
});
test('publisher rejects disabled foreign expired extra and wrong-mode scope before HTTP',async()=>{
 const{createPrivateClosurePublisherProbe}=await load();
 for(const mutate of[f=>f.env.AFW_MCP_PUBLISHER_PROBE_ENABLED='false',f=>f.advance(120001),f=>f.ctx.id={toString:()=>'8'.repeat(64)},f=>f.env.AFW_MCP_PUBLISHER_PROBE_POLICY=f.env.AFW_MCP_READER_PROBE_POLICY,f=>f.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='bad\nkey']){
  const f=publisherFixture();mutate(f);assert.equal((await createPrivateClosurePublisherProbe(f.options).run(f.hash)).status,'blocked');assert.equal(f.calls.length,0);
 }
 const f=publisherFixture();assert.equal((await createPrivateClosurePublisherProbe(f.options).run(f.hash,{version:'foreign'})).status,'blocked');assert.equal(f.calls.length,0);
});
test('open source drift active workflow or schedules/tails suppress the write',async()=>{
 const{createPrivateClosurePublisherProbe}=await load();
 for(const mode of['open','drift','active','canary_cron','operator_cron','canary_tail','operator_tail']){
  const f=publisherFixture(),fetch=f.options.fetchImpl;let deps=0;
  if(mode==='open')f.f.state.closed.bindings[0].text='true';
  if(mode==='active')f.f.state.active=true;
  f.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init),u=new URL(url),x=await r.json();
   if(u.pathname.endsWith('/'+W+'/deployments')&&++deps===2&&mode==='drift')x.result.deployments[0].id='88888888-8888-4888-8888-888888888888';
   for(const role of['canary','operator'])if(u.pathname.endsWith('/'+(role==='canary'?W:OP)+'/schedules')&&mode===role+'_cron')x.result={schedules:[{cron:'* * * * *'}]};
   for(const role of['canary','operator'])if(u.pathname.endsWith('/'+(role==='canary'?W:OP)+'/tails')&&mode===role+'_tail')x.result=[{id:'active'}];
   return Response.json(x);
  };
  const r=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.notEqual(r.status,'qualified',mode);assert.equal(f.f.posts,0,mode);
 }
});
test('concurrent recreation and replay consume one durable write budget without renewed date',async()=>{
 const{createPrivateClosurePublisherProbe}=await load(),f=publisherFixture(),fetch=f.options.fetchImpl;let release,seen;
 const started=new Promise(r=>seen=r),gate=new Promise(r=>release=r);f.options.fetchImpl=async(...args)=>{seen();await gate;return fetch(...args);};
 const first=createPrivateClosurePublisherProbe(f.options).run(f.hash);await started;
 assert.equal((await createPrivateClosurePublisherProbe(f.options).run(f.hash)).status,'uncertain');release();
 const r=await first;assert.equal(r.status,'qualified');const count=f.calls.length;f.advance(1000);
 const replay=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.equal(replay.status,'historical');assert.equal(replay.observedAt,r.observedAt);assert.equal(replay.selectedDeploymentId,f.nextDeployment);assert.equal(f.calls.length,count);assert.equal(f.f.posts,1);
});
test('accepted write with lost ACK stays uncertain and cannot be resent',async()=>{
 const{createPrivateClosurePublisherProbe}=await load(),f=publisherFixture(),fetch=f.options.fetchImpl;
 f.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init);if(init.method==='POST')throw Error('synthetic-publisher-token provider detail');return r;};
 const r=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.equal(r.status,'uncertain');assert.equal(f.f.posts,1);const count=f.calls.length;
 const again=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.ok(['historical','uncertain'].includes(again.status));assert.equal(f.f.posts,1);assert.equal(f.calls.length,count);assert.equal(JSON.stringify(r).includes('synthetic-publisher-token'),false);
});
test('committed journal ACK loss never reissues a possibly consumed operation',async()=>{
 const{createPrivateClosurePublisherProbe}=await load();
 for(const losePut of[1,2]){
  const f=publisherFixture(),tx=f.ctx.storage.transaction;let lost=false;
  f.ctx.storage.transaction=async fn=>{const before=f.ctx.storage.puts,r=await Reflect.apply(tx,f.ctx.storage,[fn]);if(!lost&&f.ctx.storage.puts>before&&f.ctx.storage.puts===losePut){lost=true;throw Error('ACK lost');}return r;};
  assert.equal((await createPrivateClosurePublisherProbe(f.options).run(f.hash)).status,'uncertain');const count=f.calls.length,posts=f.f.posts;
  await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.equal(f.calls.length,count);assert.equal(f.f.posts,posts);
 }
});
test('withdrawal credentials change expiry or backwards clock after final prewrite read prevent POST',async()=>{
 const{createPrivateClosurePublisherProbe}=await load();
 for(const mode of['disabled','policy','key','expiry','backward']){
  const f=publisherFixture(),fetch=f.options.fetchImpl;let deps=0;
  f.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init);if(new URL(url).pathname.endsWith('/'+W+'/deployments')&&++deps===2){
   if(mode==='disabled')f.env.AFW_MCP_PUBLISHER_PROBE_ENABLED='false';
   if(mode==='policy')f.env.AFW_MCP_PUBLISHER_PROBE_POLICY+=' ';
   if(mode==='key')f.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-publisher-key';
   if(mode==='expiry')f.advance(30000);if(mode==='backward')f.advance(-1);
  }return r;};
  const r=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.notEqual(r.status,'qualified',mode);assert.equal(f.f.posts,0,mode);
 }
});
test('wrong ACK or final selection and changed metadata never qualify or trigger second write',async()=>{
 const{createPrivateClosurePublisherProbe}=await load();
 for(const mode of['ack_id','ack_annotation','final_id','final_version','final_module','final_active']){
  const f=publisherFixture(),fetch=f.options.fetchImpl;
  f.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init),x=await r.json(),u=new URL(url);
   if(init.method==='POST'){if(mode==='ack_id')x.result.id=f.policy.canary.deploymentId;if(mode==='ack_annotation')x.result.annotations['workers/message']='unrelated';}
   else if(f.f.posts){if(u.pathname.endsWith('/'+W+'/deployments')){if(mode==='final_id')x.result.deployments[0].id=f.policy.canary.deploymentId;if(mode==='final_version')x.result.deployments[0].versions[0].version_id=f.f.ids.live;}
    if(u.pathname.includes('/versions/')&&mode==='final_module')x.result.modules[0].content_base64=Buffer.from('wrong').toString('base64');
    if(u.pathname.endsWith('/instances-v2')&&mode==='final_active')x.result=[{id:'active'}];
   }return Response.json(x);
  };
  const r=await createPrivateClosurePublisherProbe(f.options).run(f.hash);assert.notEqual(r.status,'qualified',mode);assert.equal(f.f.posts,1,mode);
 }
});
test('publisher Workflow uses fixed actor primitive JSON and zero retry; cached outcome stays historical',async()=>{
 const{createPrivateClosurePublisherProbe,runPrivateClosurePublisherProbeWorkflow}=await load(),f=publisherFixture(),host=createPrivateClosurePublisherProbe(f.options);let calls=0,cache;
 f.env.AFW_INDEPENDENT_CLOSURE.get=()=>({runOwnClosurePublisherProbe:async hash=>{calls++;return JSON.stringify(await host.run(hash));}});
 const step={do:async(name,options,fn)=>{assert.equal(name,'qualify-own-closure-publisher');assert.equal(options.retries.limit,0);assert.equal(options.timeout,35000);return cache??=await fn();}};
 const args={env:f.env,event:{payload:{operation:'mcp_closure_publisher_probe',planHash:f.hash}},step,now:f.f.options.now};
 assert.equal((await runPrivateClosurePublisherProbeWorkflow(args)).status,'qualified');f.advance(1000);assert.equal((await runPrivateClosurePublisherProbeWorkflow(args)).status,'historical');assert.equal(calls,1);
 args.event.payload.target='foreign';assert.equal((await runPrivateClosurePublisherProbeWorkflow(args)).status,'blocked');assert.equal(calls,1);
});

test('composed Workflow preserves consumed uncertainty across final journal ACK loss or withdrawal',async()=>{
 const{createPrivateClosurePublisherProbe,runPrivateClosurePublisherProbeWorkflow}=await load();
 for(const failure of['ack','disabled','policy','key']){
  const f=publisherFixture(),tx=f.ctx.storage.transaction;let changed=false;
  f.ctx.storage.transaction=async fn=>{const before=f.ctx.storage.puts,r=await Reflect.apply(tx,f.ctx.storage,[fn]);
   if(!changed&&f.ctx.storage.puts>before&&f.ctx.storage.puts===2){changed=true;
    if(failure==='ack')throw Error('Final committed ACK lost');
    if(failure==='disabled')f.env.AFW_MCP_PUBLISHER_PROBE_ENABLED='false';
    if(failure==='policy')f.env.AFW_MCP_PUBLISHER_PROBE_POLICY+=' ';
    if(failure==='key')f.env.AFW_MCP_CLOSURE_PUBLISH_TOKEN='changed-publisher-token';
   }return r;
  };
  f.env.AFW_INDEPENDENT_CLOSURE.get=()=>({runOwnClosurePublisherProbe:async hash=>JSON.stringify(await createPrivateClosurePublisherProbe(f.options).run(hash))});
  const args={env:f.env,event:{payload:{operation:'mcp_closure_publisher_probe',planHash:f.hash}},step:{do:async(_name,_options,fn)=>fn()},now:f.f.options.now};
  const r=await runPrivateClosurePublisherProbeWorkflow(args);
  assert.equal(r.status,'uncertain',failure);assert.equal(r.planHash,f.hash,failure);assert.equal(r.observedAt,null,failure);assert.equal(r.mayRetry,false);assert.equal(r.operationalReadiness,false);assert.equal(f.f.posts,1,failure);
  const count=f.calls.length;await runPrivateClosurePublisherProbeWorkflow(args);assert.equal(f.f.posts,1,failure);assert.equal(f.calls.length,count,failure);
 }
});
test('Workflow never exports malformed undated uncertainty',async()=>{
 const{runPrivateClosurePublisherProbeWorkflow}=await load(),f=publisherFixture();
 const r={purpose:'afw.closure-publisher-probe.v1',status:'uncertain',planHash:f.hash,observedAt:null,observations:[],observedSnapshotOnly:false,mayRetry:false,operationalReadiness:false,selectedDeploymentId:null};
 f.env.AFW_INDEPENDENT_CLOSURE.get=()=>({runOwnClosurePublisherProbe:async()=>JSON.stringify({...r,mayRetry:true,privateDetail:'MUST NOT ESCAPE'})});
 const args={env:f.env,event:{payload:{operation:'mcp_closure_publisher_probe',planHash:f.hash}},step:{do:async(_n,_o,fn)=>fn()},now:f.f.options.now};
 const value=await runPrivateClosurePublisherProbeWorkflow(args);
 assert.equal(value.mayRetry,false);assert.equal(JSON.stringify(value).includes('privateDetail'),false);assert.equal(value.operationalReadiness,false);
});
