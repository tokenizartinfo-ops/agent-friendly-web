import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {restorationFixture,ROOT,W} from './fixtures/canary-restoration.mjs';
const load=()=>import('../lib/mcp-hosted-canary-restoration.mjs');
const SLOT='afw-own-successor-closure-v1',KEY='afw.canary-restoration-control.v1';
function fixture(){
 const f=restorationFixture();let originalReads=0,instanceReads=0;const flags={original:true,running:false};
 const original={...f.options.namespace,get:id=>{if(id.toString()!==f.policy.candidate.containerId)throw Error('Wrong original');return{observeSuccessorRetired:async()=>{originalReads++;if(!flags.original)throw Error('Original context removed');return{purpose:'afw.node-retirement-observation.v1',containerId:f.policy.candidate.containerId,programHash:f.policy.candidate.programHash,sourceRevision:f.policy.candidate.sourceRevision,processGeneration:'d'.repeat(64),image:'cloudflare/debian-trixie',createdAt:f.at-60000,expiresAt:f.at-10000,closedAt:f.at-20000,observedAt:f.options.now(),physicalStopVerified:false,mayStartSuccessor:false};}};}};
 const ctx={storage:f.storage,id:{toString:()=>'9'.repeat(64)}};
 const env={AFW_INDEPENDENT_CLOSURE:{idFromName:name=>{if(name!==SLOT)throw Error('Wrong private slot');return{toString:()=>'9'.repeat(64)};}},AFW_MCP_CLOSURE_ENABLED:'true',AFW_MCP_CLOSURE_POLICY:f.control.policy,AFW_MCP_CLOSURE_NODE:original,AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',AFW_MCP_CLOSURE_PUBLISH_TOKEN:'synthetic-publisher-token'};
 const calls=[];
 const options={ctx,env,now:f.options.now,fetchImpl:async(url,init)=>{
  calls.push({url,init});const u=new URL(url);assert.equal(u.origin,'https://api.cloudflare.com');
  assert.equal(init.headers.Authorization,init.method==='POST'?'Bearer synthetic-publisher-token':'Bearer synthetic-reader-token');
  if(u.pathname.endsWith('/instances/'+f.policy.candidate.containerId)){instanceReads++;return Response.json({success:true,errors:[],result:{id:f.policy.candidate.containerId,application_id:f.policy.candidate.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(f.at-50000).toISOString(),status:{state:flags.running?'running':'stopped',exit_code:0,updated_at:new Date(f.at-21000).toISOString()}}});}
  const r=await f.request({method:init.method,path:u.pathname.replace('/client/v4',''),query:Object.fromEntries([...u.searchParams].map(([k,v])=>[k,k==='per_page'?Number(v):v])),body:init.body?JSON.parse(init.body):undefined});const{status,...body}=r;return Response.json(body,{status});
 }};
 return{f,ctx,env,options,calls,flags,hash:createHash('sha256').update(env.AFW_MCP_CLOSURE_POLICY).digest('hex'),get originalReads(){return originalReads;},get instanceReads(){return instanceReads;}};
}
test('private actor arms once restores after qualified handoff and reobserves without the retired RPC',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture(),host=createPrivateCanaryRestorationHost(f.options);
 const arm=await host.arm(f.hash);assert.equal(arm.status,'armed');assert.equal(arm.operationalReadiness,false);assert.equal(f.calls.length,0);assert.equal(f.originalReads,0);
 const again=await host.arm(f.hash);assert.equal(again.status,'already_armed');assert.equal(again.armedAt,arm.armedAt);
 const r=await host.restore(f.hash);assert.equal(r.status,'restored_observed');assert.equal(r.nativeWithdrawalVerified,false);assert.equal(r.operationalReadiness,false);assert.equal(f.f.posts,1);assert.equal(f.originalReads,2);assert.ok(f.instanceReads>=2);
 const captured=f.ctx.storage.rows.get('afw.successor-retirement-handoff.v1').capturedAt,reads=f.originalReads;
 f.flags.original=false;
 const latest=await createPrivateCanaryRestorationHost(f.options).restore(f.hash);assert.equal(latest.status,'restored_observed');assert.equal(f.f.posts,1);assert.equal(f.originalReads,reads);assert.equal(f.ctx.storage.rows.get('afw.successor-retirement-handoff.v1').capturedAt,captured);
});
test('closed foreign expired wrong actor and wrong candidate scopes do not touch provider original or storage',async()=>{
 const {createPrivateCanaryRestorationHost}=await load();
 for(const change of [
  f=>f.env.AFW_MCP_CLOSURE_ENABLED='false',
  f=>f.ctx.id={toString:()=>'8'.repeat(64)},
  f=>f.f.advance(120001),
  f=>f.env.AFW_MCP_CLOSURE_NODE={...f.env.AFW_MCP_CLOSURE_NODE,idFromName:()=>({toString:()=>'8'.repeat(64)})}
 ]){
  const f=fixture();change(f);const h=createPrivateCanaryRestorationHost(f.options);assert.equal((await h.arm(f.hash)).status,'blocked');assert.equal((await h.restore(f.hash)).status,'blocked');assert.equal(f.calls.length+f.originalReads+f.ctx.storage.puts,0);
 }
 const f=fixture(),h=createPrivateCanaryRestorationHost(f.options);assert.equal((await h.arm('0'.repeat(64))).status,'blocked');assert.equal((await h.arm(f.hash,{target:'foreign'})).status,'blocked');assert.equal(f.ctx.storage.puts,0);
});
test('withdrawal is terminal preserves dates works with disabled expired env and prevents queued arm',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture(),h=createPrivateCanaryRestorationHost(f.options);
 const a=await h.arm(f.hash);f.f.advance(120001);f.env.AFW_MCP_CLOSURE_ENABLED='false';const w=await h.withdraw(f.hash);assert.equal(w.status,'withdrawn');assert.equal(w.armedAt,a.armedAt);
 const saved=structuredClone(f.ctx.storage.rows.get(KEY));assert.equal((await h.withdraw(f.hash)).status,'already_withdrawn');assert.deepEqual(f.ctx.storage.rows.get(KEY),saved);
 f.env.AFW_MCP_CLOSURE_ENABLED='true';assert.equal((await createPrivateCanaryRestorationHost(f.options).arm(f.hash)).status,'blocked');assert.equal((await h.restore(f.hash)).status,'blocked');assert.equal(f.calls.length,0);
 const g=fixture(),k=createPrivateCanaryRestorationHost(g.options);assert.equal((await k.withdraw(g.hash)).status,'withdrawn');assert.equal(g.ctx.storage.rows.get(KEY).armedAt,null);assert.equal((await k.arm(g.hash)).status,'blocked');assert.equal(g.calls.length,0);
});
test('unknown committed arm ACK is uncertain and its original record is never renewed',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture(),base=f.ctx.storage.transaction;let lost=false;
 f.ctx.storage.transaction=async fn=>{const before=f.ctx.storage.puts,r=await Reflect.apply(base,f.ctx.storage,[fn]);if(!lost&&f.ctx.storage.puts>before){lost=true;throw Error('Committed arm ACK lost');}return r;};
 const h=createPrivateCanaryRestorationHost(f.options);assert.equal((await h.arm(f.hash)).status,'uncertain');assert.equal(f.calls.length+f.originalReads,0);
 const row=structuredClone(f.ctx.storage.rows.get(KEY));assert.equal((await h.status(f.hash)).status,'armed');assert.equal((await createPrivateCanaryRestorationHost(f.options).arm(f.hash)).status,'already_armed');assert.deepEqual(f.ctx.storage.rows.get(KEY),row);
});
test('unqualified physical retirement and unknown deployment ACK never become repeated effects',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture(),h=createPrivateCanaryRestorationHost(f.options);await h.arm(f.hash);f.flags.running=true;assert.equal((await h.restore(f.hash)).status,'blocked');assert.equal(f.f.posts,0);
 const g=fixture(),fetch=g.options.fetchImpl;g.options.fetchImpl=async(url,init)=>{const r=await fetch(url,init);if(init.method==='POST')throw Error('Accepted deployment ACK lost');return r;};
 const k=createPrivateCanaryRestorationHost(g.options);await k.arm(g.hash);assert.equal((await k.restore(g.hash)).status,'uncertain');assert.equal(g.f.posts,1);g.flags.original=false;
 assert.equal((await createPrivateCanaryRestorationHost(g.options).restore(g.hash)).status,'closed_observed_uncertain');assert.equal(g.f.posts,1);
});
test('interleaved terminal withdrawal fences an in-flight host and never claims API rollback',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture();let entered,release;const seen=new Promise(r=>{entered=r;}),gate=new Promise(r=>{release=r;}),fetch=f.options.fetchImpl;
 f.options.fetchImpl=async(url,init)=>{entered();await gate;return fetch(url,init);};
 const h=createPrivateCanaryRestorationHost(f.options);await h.arm(f.hash);const pending=h.restore(f.hash);await seen;assert.equal((await h.withdraw(f.hash)).status,'withdrawn');release();const r=await pending;assert.equal(r.status,'uncertain');assert.equal(r.operationalReadiness,false);assert.equal(f.f.posts,0);const count=f.calls.length;assert.equal((await h.restore(f.hash)).status,'blocked');assert.equal(f.calls.length,count);
});
test('workflow uses only fixed actor and original absolute time with no automatic retry',async()=>{
 const {runPrivateCanaryRestorationWorkflow}=await load(),f=fixture(),calls=[],steps=[];f.f.policy.startAt=f.f.at+1000;f.f.policy.expiresAt=f.f.at+61000;f.f.savePolicy();f.env.AFW_MCP_CLOSURE_POLICY=f.f.control.policy;
 const hash=createHash('sha256').update(f.env.AFW_MCP_CLOSURE_POLICY).digest('hex');
 f.env.AFW_INDEPENDENT_CLOSURE.get=id=>{assert.equal(id.toString(),'9'.repeat(64));return{armOwnCanaryClosure:async h=>{calls.push(['arm',h]);return{status:'armed',operationalReadiness:false};},restoreOwnCanary:async h=>{calls.push(['restore',h]);return{status:'restored_observed',operationalReadiness:false,nativeWithdrawalVerified:false,mayStartSuccessor:false,mayRetry:false,observedSnapshotOnly:true,apiCancellationSupported:false,observedAt:f.f.options.now(),versionId:f.f.ids.closed,deploymentId:f.f.ids.closedDep};}};};
 f.env.AFW_INDEPENDENT_CLOSURE.get=(base=>id=>({...base(id),readOwnCanaryClosureControl:async()=>({status:'armed',planHash:hash,armedAt:f.f.at,withdrawnAt:null,operationalReadiness:false})}))(f.env.AFW_INDEPENDENT_CLOSURE.get);
 const step={do:async(name,config,fn)=>{steps.push([name,config]);return fn();},sleepUntil:async(name,at)=>{calls.push(['sleep',name,at.getTime()]);f.f.advance(1000);}};
 const r=await runPrivateCanaryRestorationWorkflow({env:f.env,event:{payload:{operation:'mcp_canary_arm_restore',policyHash:hash}},step,now:f.f.options.now});
 assert.equal(r.status,'restored_observed');assert.equal(calls[1][0],'sleep');assert.equal(calls[1][2],f.f.policy.startAt);assert.deepEqual(calls.filter(x=>x[0]!=='sleep'),[['arm',hash],['restore',hash]]);assert.ok(steps.every(x=>x[1].retries.limit===0&&x[1].timeout<=35000));
 const count=calls.length;assert.equal((await runPrivateCanaryRestorationWorkflow({env:f.env,event:{payload:{operation:'mcp_canary_arm_restore',policyHash:hash,target:'foreign'}},step,now:f.f.options.now})).status,'blocked');assert.equal(calls.length,count);
});

test('host releases a late wrapped body when withdrawal wins before response ownership',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture();let release,started,cancelled=0;
 const entered=new Promise(r=>{started=r;}),gate=new Promise(r=>{release=r;});
 f.options.fetchImpl=async()=>{started();await gate;return new Response(new ReadableStream({cancel(){cancelled++;}}),{headers:{'Content-Type':'application/json'}});};
 const h=createPrivateCanaryRestorationHost(f.options);assert.equal((await h.arm(f.hash)).status,'armed');
 const pending=h.restore(f.hash);await entered;assert.equal((await h.withdraw(f.hash)).status,'withdrawn');
 release();assert.equal((await pending).status,'uncertain');await new Promise(r=>setTimeout(r,0));
 assert.equal(cancelled,1);assert.equal(f.f.posts,0);
});

test('a rejected provider response releases its body before handoff can be accepted',async()=>{
 const {createPrivateCanaryRestorationHost}=await load(),f=fixture();let cancelled=0;
 f.options.fetchImpl=async()=>new Response(new ReadableStream({cancel(){cancelled++;}}),{status:302,headers:{'Content-Type':'application/json'}});
 const h=createPrivateCanaryRestorationHost(f.options);assert.equal((await h.arm(f.hash)).status,'armed');assert.equal((await h.restore(f.hash)).status,'blocked');
 await new Promise(r=>setTimeout(r,0));assert.equal(cancelled,1);assert.equal(f.f.posts,0);
});
