import test from 'node:test';
import assert from 'node:assert/strict';
import {privateDispatchRestorationFixture} from './fixtures/private-dispatch-restoration.mjs';
import {fixtureConfigHash,digest} from './fixtures/canary-restoration.mjs';
import {createPrivateCanaryRestorationHost,runPrivateCanaryRestorationWorkflow} from '../lib/mcp-hosted-canary-restoration.mjs';
const SLOT='afw-own-successor-closure-v1',JOURNAL='afw.private-prepared-dispatch.v1';
function fixture(){
 const f=privateDispatchRestorationFixture(),calls=[],rpc=[],ctx={storage:f.storage,id:{toString:()=>'9'.repeat(64)}};
 const env={AFW_INDEPENDENT_CLOSURE:{idFromName:n=>{assert.equal(n,SLOT);return ctx.id;}},
 AFW_MCP_CLOSURE_ENABLED:'true',AFW_MCP_CLOSURE_POLICY:f.control.policy,
 AFW_MCP_CLOSURE_REDUCTION_ENABLED:'true',AFW_MCP_CLOSURE_REDUCTION_POLICY_HASH:f.withdrawalHash,
 AFW_MCP_CLOSURE_DISPATCH_ENABLED:'true',AFW_MCP_CLOSURE_DISPATCH_POLICY:f.dispatchRaw,
 AFW_MCP_CLOSURE_READ_TOKEN:'synthetic-reader-token',
 AFW_MCP_CLOSURE_NODE:{...f.options.namespace,get:id=>{assert.equal(id.toString(),f.policy.candidate.containerId);return{deliverOwnSaved:async eventId=>{rpc.push(eventId);assert.equal(eventId,f.dispatch.eventId);return{eventId,status:202,httpReceivedAt:f.options.now(),cloudReviewConfirmed:false};}};}}};
 const options={env,ctx,now:f.options.now,fetchImpl:async(url,init)=>{calls.push({url,init});assert.equal(init.method,'GET');assert.equal(init.headers.Authorization,'Bearer synthetic-reader-token');const u=new URL(url),r=await f.request({method:'GET',path:u.pathname.replace('/client/v4',''),query:Object.fromEntries(u.searchParams)});const{status,...body}=r;return Response.json(body,{status});}};
 const rehash=()=>{f.policy.live.configurationHash=fixtureConfigHash(f.state.live);f.savePolicy();f.planHash=digest(f.control.policy);f.dispatch.closurePolicyHash=f.planHash;f.dispatchRaw=JSON.stringify(f.dispatch);f.dispatchHash=digest(f.dispatchRaw);env.AFW_MCP_CLOSURE_POLICY=f.control.policy;env.AFW_MCP_CLOSURE_DISPATCH_POLICY=f.dispatchRaw;};
 return{f,env,ctx,options,calls,rpc,rehash};
}
async function armed(x){const h=createPrivateCanaryRestorationHost(x.options);assert.equal((await h.arm(x.f.planHash)).status,'armed');x.f.advance(x.f.dispatch.dispatchAt-x.f.options.now());return h;}
const dispatch=(h,x)=>h.dispatch(x.f.planHash,x.f.withdrawalHash,x.f.dispatchHash);
test('prepared dispatch uses current pinned snapshot and durable one-effect claim across recreation',async()=>{
 const x=fixture(),h=await armed(x),r=await dispatch(h,x);
 assert.equal(r.status,'dispatch_requested');assert.equal(r.operationalReadiness,false);assert.equal(r.cloudReviewConfirmed,false);assert.equal(x.rpc.length,1);assert.equal(x.f.posts,0);
 assert.equal((await dispatch(createPrivateCanaryRestorationHost(x.options),x)).status,'dispatch_requested');assert.equal(x.rpc.length,1);
});
for(const mode of ['off','hash','unarmed','too-early','expired','event','schedule','key','key-version','key-variant','code','pointer','operator','unknown-policy']){
 test('prepared dispatch rejects '+mode+' before native call',async()=>{
  const x=fixture();
  if(['event','schedule','key','key-version','key-variant'].includes(mode)){
   const n=mode.startsWith('key')?'AFW_DOSSIER_OWN_SAVE_KEY':'AFW_DOSSIER_EVENTS_SCHEDULE',b=x.f.state.live.bindings.find(b=>b.name===n);
   if(mode.startsWith('key'))b.text=mode==='key'?'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb':mode==='key-version'?'aaaaaaaa-aaaa-3aaa-8aaa-aaaaaaaaaaaa':'aaaaaaaa-aaaa-4aaa-7aaa-aaaaaaaaaaaa';
   else{const p=JSON.parse(b.text);if(mode==='event')p.eventId='0'.repeat(64);else p.dispatchAt+=60000;b.text=JSON.stringify(p);}
   if(['key-version','key-variant'].includes(mode)){
    const eventId=digest(JSON.stringify(['afw.own-synthetic-save.v1','owner','own',b.text]));
    const scheduled=x.f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_SCHEDULE'),plan=JSON.parse(scheduled.text);
    plan.eventId=eventId;scheduled.text=JSON.stringify(plan);x.f.dispatch.eventId=eventId;
   }
   x.rehash();
  }
  const h=createPrivateCanaryRestorationHost(x.options);if(mode!=='unarmed')await h.arm(x.f.planHash);
  if(mode!=='too-early')x.f.advance(x.f.dispatch.dispatchAt-x.f.options.now());
  if(mode==='expired')x.f.advance(30000);
  if(mode==='off')x.env.AFW_MCP_CLOSURE_DISPATCH_ENABLED='false';
  if(mode==='hash')x.f.dispatchHash='0'.repeat(64);
  if(mode==='code')x.f.state.live.modules[0].content_base64=Buffer.from('other code').toString('base64');
  if(mode==='pointer')x.f.state.canary.id='77777777-7777-4777-8777-777777777777';
  if(mode==='operator')x.f.state.operatorVersion.bindings[0].text='true';
  if(mode==='unknown-policy')x.env.AFW_MCP_CLOSURE_DISPATCH_POLICY=JSON.stringify({...x.f.dispatch,callback:'https://evil.invalid'});
  assert.notEqual((await dispatch(h,x)).status,'dispatch_requested');assert.equal(x.rpc.length,0);assert.equal(x.f.posts,0);
 });
}
test('lost dispatch ACK is not replayed after actor recreation',async()=>{
 const x=fixture(),get=x.env.AFW_MCP_CLOSURE_NODE.get;x.env.AFW_MCP_CLOSURE_NODE.get=id=>({deliverOwnSaved:async e=>{await get(id).deliverOwnSaved(e);throw Error('lost');}});
 const h=await armed(x);assert.equal((await dispatch(h,x)).status,'uncertain');assert.equal((await dispatch(createPrivateCanaryRestorationHost(x.options),x)).status,'uncertain');assert.equal(x.rpc.length,1);
});
test('pointer drift after durable claim denies native effect and consumes dispatch',async()=>{
 const x=fixture(),tx=x.ctx.storage.transaction;x.ctx.storage.transaction=async fn=>{const r=await Reflect.apply(tx,x.ctx.storage,[fn]);if(x.ctx.storage.rows.get(JOURNAL)?.phase==='issued')x.f.state.canary.id='77777777-7777-4777-8777-777777777777';return r;};
 const h=await armed(x);assert.equal((await dispatch(h,x)).status,'uncertain');assert.equal(x.rpc.length,0);
});
test('withdrawal during preflight fences dispatch',async()=>{
 const x=fixture(),fetch=x.options.fetchImpl;let enter,release;const seen=new Promise(r=>enter=r),gate=new Promise(r=>release=r);
 x.options.fetchImpl=async(...args)=>{enter();await gate;return fetch(...args);};const h=await armed(x),p=dispatch(h,x);await seen;await h.withdraw(x.f.planHash);release();assert.notEqual((await p).status,'dispatch_requested');assert.equal(x.rpc.length,0);
});
for(const failure of ['none','throw','uncertain','disabled-at-dispatch']){
 test('Workflow retains original closure after dispatch '+failure,async()=>{
  const x=fixture(),order=[],steps=[];const native=v=>{Object.defineProperty(v,Symbol.dispose,{value:()=>order.push('dispose')});return v;};
  x.env.AFW_INDEPENDENT_CLOSURE.get=()=>({
   armOwnCanaryClosure:async()=>native({status:'armed'}),
   readOwnCanaryClosureControl:async()=>native({status:'armed',planHash:x.f.planHash}),
   dispatchOwnPreparedEvent:async(...args)=>{order.push('dispatch');assert.deepEqual(args,[x.f.planHash,x.f.withdrawalHash,x.f.dispatchHash]);if(failure==='throw')throw Error('uncertain native call');return native({status:failure==='uncertain'?'uncertain':'dispatch_requested',operationalReadiness:false,cloudReviewConfirmed:false});},
   reduceOwnCanaryPermissions:async()=>{order.push('reduce');return native({status:'permissions_reduced',nativeWithdrawalVerified:false,operationalReadiness:false});},
   restoreOwnCanary:async()=>{order.push('restore');return native({status:'restored_observed',observedAt:x.f.options.now(),nativeWithdrawalVerified:false,operationalReadiness:false});}
  });
  const step={do:async(name,options,fn)=>{steps.push(options);return fn();},sleepUntil:async(name,date)=>{order.push(name);x.f.advance(date.getTime()-x.f.options.now());if(failure==='disabled-at-dispatch')x.env.AFW_MCP_CLOSURE_DISPATCH_ENABLED='false';}};
  const event={payload:JSON.stringify({operation:'mcp_canary_dispatch_reduce_restore',policyHash:x.f.planHash,withdrawalPolicyHash:x.f.withdrawalHash,dispatchPolicyHash:x.f.dispatchHash})};
  const r=await runPrivateCanaryRestorationWorkflow({env:x.env,event,step,now:x.f.options.now});assert.equal(r.status,'restored_observed');assert.equal(r.operationalReadiness,false);assert.ok(order.indexOf('reduce')<order.indexOf('restore'));assert.equal(order.filter(x=>x==='restore').length,1);assert.ok(steps.every(x=>x.retries.limit===0));
  assert.equal(r.dispatchStatus,failure==='none'?'dispatch_requested':failure==='disabled-at-dispatch'?'blocked':'uncertain');
 });
}

test('prepared transport cannot publish or read unrelated inventory before closure',async()=>{
 const {createCanaryRestorationTransport}=await import('../lib/mcp-canary-restoration-transport.mjs');
 const {ROOT,W,OP}=await import('./fixtures/canary-restoration.mjs');
 const x=fixture();x.f.advance(x.f.dispatch.dispatchAt-x.f.options.now());let credentials=0,requests=0;
 const transport=createCanaryRestorationTransport({readControl:()=>({enabled:true,policy:x.f.control.policy}),readReadCredential:()=>{credentials++;return 'synthetic-reader-token';},readPublishCredential:()=>{credentials++;throw Error('No publishing');},fetchImpl:()=>{requests++;throw Error('No outbound');},now:x.f.options.now,
 preparedDispatch:{policy:x.f.dispatchRaw,policyHash:x.f.dispatchHash,withdrawalPolicyHash:x.f.withdrawalHash}});
 for(const input of [{method:'POST',path:ROOT+'/workers/scripts/'+W+'/deployments',body:{strategy:'percentage',versions:[{version_id:x.f.policy.closed.versionId,percentage:100}],annotations:{'workers/message':'AFW closed canary restoration '+x.f.planHash}}},
 {method:'GET',path:ROOT+'/workers/scripts/'+OP+'/schedules'},
 {method:'GET',path:ROOT+'/workers/workers/'+W+'/versions/'+x.f.policy.closed.versionId,query:{include:'modules'}}]){
  await assert.rejects(transport({...input,signal:new AbortController().signal}));
 }
 assert.equal(credentials,0);assert.equal(requests,0);
});
test('expired dispatch and malformed dispatch inputs never grant a new issue window',async()=>{
 const x=fixture();x.f.advance(x.f.dispatch.expiresAt-x.f.options.now());const calls=[];
 x.env.AFW_INDEPENDENT_CLOSURE.get=()=>({
 armOwnCanaryClosure:async()=>({status:'armed'}),readOwnCanaryClosureControl:async()=>({status:'armed',planHash:x.f.planHash}),
 dispatchOwnPreparedEvent:async()=>{calls.push('dispatch');throw Error('Expired');},
 reduceOwnCanaryPermissions:async()=>({status:'permissions_reduced',nativeWithdrawalVerified:false,operationalReadiness:false}),
 restoreOwnCanary:async()=>{calls.push('restore');return {status:'restored_observed',observedAt:x.f.options.now(),nativeWithdrawalVerified:false,operationalReadiness:false};}});
 const step={do:async(_n,_o,fn)=>fn(),sleepUntil:async(_n,date)=>x.f.advance(date.getTime()-x.f.options.now())},
 payload={operation:'mcp_canary_dispatch_reduce_restore',policyHash:x.f.planHash,withdrawalPolicyHash:x.f.withdrawalHash,dispatchPolicyHash:x.f.dispatchHash};
 const r=await runPrivateCanaryRestorationWorkflow({env:x.env,event:{payload},step,now:x.f.options.now});
 assert.equal(r.status,'restored_observed');assert.equal(r.dispatchStatus,'blocked');assert.deepEqual(calls,['restore']);
 const bad=await runPrivateCanaryRestorationWorkflow({env:x.env,event:{payload:{...payload,callback:'https://evil.invalid'}},step,now:x.f.options.now});assert.equal(bad.status,'blocked');
});

for(const mode of ['disabled','removed','replaced','malformed']){
 test('Workflow replay retains cached original closure when dispatch is '+mode+' before entry',async()=>{
  const x=fixture(),calls=[];
  // Emulate a native replay after the arm step has already committed.
  x.f.advance(x.f.dispatch.dispatchAt-x.f.options.now());
  if(mode==='disabled')x.env.AFW_MCP_CLOSURE_DISPATCH_ENABLED='false';
  if(mode==='removed')delete x.env.AFW_MCP_CLOSURE_DISPATCH_POLICY;
  if(mode==='replaced')x.env.AFW_MCP_CLOSURE_DISPATCH_POLICY=JSON.stringify({...x.f.dispatch,eventId:'0'.repeat(64)});
  if(mode==='malformed')x.env.AFW_MCP_CLOSURE_DISPATCH_POLICY='{';
  x.env.AFW_INDEPENDENT_CLOSURE.get=()=>({
   armOwnCanaryClosure:async()=>{throw Error('Cached arm must not rerun');},
   readOwnCanaryClosureControl:async()=>({status:'armed',planHash:x.f.planHash}),
   dispatchOwnPreparedEvent:async()=>{calls.push('dispatch');throw Error('No dispatch authority');},
   reduceOwnCanaryPermissions:async()=>{calls.push('reduce');return{status:'permissions_reduced',nativeWithdrawalVerified:false,operationalReadiness:false};},
   restoreOwnCanary:async()=>{calls.push('restore');return{status:'restored_observed',observedAt:x.f.options.now(),nativeWithdrawalVerified:false,operationalReadiness:false};}
  });
  const step={do:async(name,_options,fn)=>name==='arm-own-canary-closure'?{status:'armed'}:fn(),sleepUntil:async(_name,date)=>x.f.advance(date.getTime()-x.f.options.now())};
  const r=await runPrivateCanaryRestorationWorkflow({env:x.env,event:{payload:{operation:'mcp_canary_dispatch_reduce_restore',policyHash:x.f.planHash,withdrawalPolicyHash:x.f.withdrawalHash,dispatchPolicyHash:x.f.dispatchHash}},step,now:x.f.options.now});
  assert.equal(r.status,'restored_observed');assert.equal(r.dispatchStatus,'blocked');assert.equal(r.operationalReadiness,false);assert.deepEqual(calls,['reduce','restore']);
 });
}
