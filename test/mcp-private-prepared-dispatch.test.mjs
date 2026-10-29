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
for(const mode of ['off','hash','unarmed','too-early','expired','event','schedule','key','code','pointer','operator','unknown-policy']){
 test('prepared dispatch rejects '+mode+' before native call',async()=>{
  const x=fixture();
  if(mode==='event')JSON.parse(x.f.state.live.bindings.find(b=>b.name==='AFW_DOSSIER_EVENTS_SCHEDULE').text);
  if(['event','schedule','key'].includes(mode)){
   const n=mode==='key'?'AFW_DOSSIER_OWN_SAVE_KEY':'AFW_DOSSIER_EVENTS_SCHEDULE',b=x.f.state.live.bindings.find(b=>b.name===n);
   if(mode==='key')b.text='bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb';
   else{const p=JSON.parse(b.text);if(mode==='event')p.eventId='0'.repeat(64);else p.dispatchAt+=60000;b.text=JSON.stringify(p);}
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
