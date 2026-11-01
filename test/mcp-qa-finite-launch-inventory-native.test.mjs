import test from 'node:test';
import assert from 'node:assert/strict';
import * as controlApi from '../lib/mcp-qa-finite-trial-control.mjs';
import {finiteFixture} from './fixtures/qa-finite-trial.mjs';
const inventoryApi=await import('../lib/mcp-qa-finite-launch-inventory.mjs').catch(()=>({}));
test('actual native pin snapshot reads true before-HEAD absence without writes',async()=>{
 assert.equal(typeof controlApi.readPrivateQaFiniteControlSnapshot,'function');
 const f=finiteFixture(),o=f.options(controlApi),before=structuredClone([...f.rows]);
 const parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
 const s=await controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent});
 assert.equal(s.state,null);assert.equal(s.prepared,null);assert.equal(s.send,null);assert.equal(s.ack,null);
 assert.equal(s.control.plan.intentId,f.plan.intentId);assert.match(s.control.controlHash,/^[a-f0-9]{64}$/);
 assert.deepEqual([...f.rows],before);assert.equal(f.puts,0);assert.equal(f.alarm,null);
});
test('default fixed launch context and caller DTO cannot mint absence',async()=>{
 assert.equal(typeof inventoryApi.createPrivateQaFiniteLaunchInventory,'function');
 const f=finiteFixture(),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
 const i=await inventoryApi.createPrivateQaFiniteLaunchInventory({ctx:f.ctx,env:f.env,context:{kind:'never_issued',sourceCoverage:true},parent});
 assert.equal((await i.observeBeforeCreation()).kind,'unavailable');
});

import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {consumePrivateFiniteLaunchInventory} from '../lib/mcp-fixed-terminal-workflows.mjs';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
import {readFile} from 'node:fs/promises';
const entry=`
import {DurableObject} from 'cloudflare:workers';
import * as inventory from './lib/mcp-qa-finite-launch-inventory.mjs';
import {resolvePrivateQaFiniteLaunchContext} from './lib/mcp-qa-finite-launch-source.mjs';
import {fixture} from './test/fixtures/finite-launch-native.mjs';
import {digest} from './test/fixtures/qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialGuard} from './lib/mcp-qa-finite-trial-guard.mjs';
import {hashFiniteLaunchRecord} from './lib/mcp-qa-finite-launch-records.mjs';
import {finiteHash} from './lib/mcp-finite-evidence.mjs';
import {createPrivateQaFiniteTrialControl,createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlSnapshot} from './lib/mcp-qa-finite-trial-control.mjs';
export class LaunchFixture extends DurableObject{
 async run(mode){
  const f=await fixture(this.ctx,this.env),parent=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000});
  const refs={intentId:f.plan.intentId,sourceRevision:f.plan.source.revision};
  if(mode==='hydrate-expired'){f.hydrate=async()=>{f.setNow(f.now()+5000);};try{await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});return {bad:true};}catch{return {expired:true,paths:f.paths};}}
  const context=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});
  const i=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context,parent});
  const nativePin=createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision});
  const snapshot=()=>readPrivateQaFiniteControlSnapshot({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),parent});
  const before=await snapshot();
  if(mode==='foreign-head')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{intentId:'foreign'});
  if(mode==='orphan-guard')await this.ctx.storage.put('afw.qa-finite-guard.v1:'+f.plan.intentId+':state',{purpose:'afw.finite-guard-state.v1',controlHash:before.control.controlHash,deliveries:0,state:'armed',nextAt:f.plan.C0});
  if(mode==='incomplete')f.incomplete=true;
  if(mode==='provider-nominal')f.providerNominal='running';
  if(mode==='provider-expired')f.onRequest=async()=>{f.setNow(f.now()+5000);};
  if(mode==='snapshot-change')f.onRequest=async()=>{await this.ctx.storage.put('afw.qa-finite-child-create.v1:'+f.plan.intentId+':send',{purpose:'uncertain'});};
  if(['prelaunch','issued','ack','prepared-tamper','alarm-tamper','cleanup-started','reconstruct-pending'].includes(mode)){
   f.launcher=true;const admission=f.primary.admission;
   f.primary.admission=async()=>{const r=await i.observeBeforeCreation();if(r.kind!=='never_issued')throw Error('inventory unavailable');return admission();};
   if(mode==='reconstruct-pending')f.primary.finalizer=async()=>{throw Error('lost finalizer');};
   const control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),readPrimary:f.primary,now:parent.check,timeoutMs:5000});
   const armed=await control.prepare();
   if(mode==='reconstruct-pending'){
    const p2=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000}),c2=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:p2});
    const i2=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context:c2,parent:p2});return {armed,result:await i2.observeBeforeCreation()};
   }
   if(armed.status!=='armed')throw Error('fixture native prepare '+armed.status);
   const state=await snapshot(),effects=Object.fromEntries(['withdraw','close','seal','canary_restore'].map(k=>[k,{execute:async()=>{throw Error('unused effect');},reconcile:async()=>null}]));
   const guard=createPrivateQaFiniteTrialGuard({ctx:this.ctx,env:this.env,control,capabilities:{identity:state.control,readPrimary:f.primary.admission,...effects,proof:{read:async()=>{throw Error('unused proof');}}},now:parent.check});
   const guarded=await guard.arm();if(guarded.status!=='armed')throw Error('fixture native guard '+guarded.status);
   const claimed=await control.claimEffect('nominal');if(claimed.status!=='issued')throw Error('fixture native claim '+claimed.status);
   const after=await snapshot(),p=f.plan;
   const identity={intentId:p.intentId,finitePlanHash:after.control.planHash,controlHash:after.control.controlHash,sourceRevision:p.source.revision,qaVersionId:p.deployments.qaLive.versionId,actorId:p.resources.actorId,launcherId:p.workflows.launcher,nominalId:p.workflows.confirmation,bundleHash:p.bundleHash,nominalClaimHash:digest('afw.qa-finite-trial.v1:effect',claimed.claim)};
   const prepared={purpose:'afw.qa-finite-launch-prepared.v1',...identity,guardStateHash:finiteHash(after.guard),preparedAt:f.now(),...p.launchPolicy};
   const prefix='afw.qa-finite-child-create.v1:'+p.intentId+':';
   await this.ctx.storage.transaction(async tx=>{await tx.put(prefix+'prepared',prepared);});
   if(mode==='cleanup-started')await control.claimEffect('close');
   if(mode==='alarm-tamper')await this.ctx.storage.setAlarm(p.C0+1);
   if(mode==='prepared-tamper')await this.ctx.storage.put(prefix+'prepared',{...prepared,nominalClaimHash:'0'.repeat(64)});
   if(mode==='prelaunch'||mode==='prepared-tamper'||mode==='alarm-tamper'||mode==='cleanup-started')return {result:await i.observeBeforeCreation(),prepared,claim:claimed.claim};
   f.setNow(p.launchPolicy.launchAt);
   const p2=inventory.createPrivateQaFiniteLaunchParent({now:f.now,deadline:f.now()+5000}),c2=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent:p2});
   const i2=await inventory.createPrivateQaFiniteLaunchInventory({ctx:this.ctx,env:this.env,context:c2,parent:p2});
   const send={purpose:'afw.qa-finite-child-create-send.v1',...identity,preparedHash:hashFiniteLaunchRecord(prepared),bindingHash:'8'.repeat(64),issuedAt:f.now(),deadline:p.launchPolicy.lastCreateAt};
   await inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context:c2,parent:p2},async check=>{check();await this.ctx.storage.transaction(async tx=>{check();await tx.put(prefix+'send',send);check();});check();});
   if(mode==='ack')await this.ctx.storage.put(prefix+'ack',{purpose:'afw.qa-finite-child-create-ack.v1',intentId:p.intentId,controlHash:identity.controlHash,sendHash:hashFiniteLaunchRecord(send),nominalId:p.workflows.confirmation,acknowledgedAt:f.now()});
   return {result:await i2.observeBeforeCreation(),prepared,send,claim:claimed.claim};
  }
  if(mode==='nested'||mode==='pending'){
   const original=f.primary.admission;
   f.primary.admission=async()=>{const observation=await i.observeBeforeCreation();f.observations.push(observation);if(observation.kind!=='never_issued')throw Error('inventory unavailable');return original();};
   if(mode==='pending')f.primary.finalizer=async()=>{throw Error('lost finalizer');};
   const control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),readPrimary:f.primary,now:parent.check,timeoutMs:5000});
   const prepared=await control.prepare();
   return {prepared,observations:f.observations,after:await snapshot(),paths:f.paths};
  }
  if(mode==='storage-expired'){
   const storage=this.ctx.storage,original=storage.transaction;let enter,release,once=true;
   const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
   storage.transaction=async fn=>{const result=await original.call(storage,fn);if(once){once=false;enter();await held;}return result;};
   const observing=i.observeBeforeCreation();await reached;f.setNow(f.now()+5000);release();
   const result=await observing;storage.transaction=original;return {result};
  }
  if(mode==='race'||mode==='queue-expired'){
   let release,entered;const reached=new Promise(r=>{entered=r;}),held=new Promise(r=>{release=r;});let once=true,written=false;
   f.onRequest=async()=>{if(once){once=false;entered();await held;}};
   const observing=i.observeBeforeCreation();await reached;
   const sending=inventory.withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context,parent},async()=>{
    parent.check();written=true;await this.ctx.storage.put('fixture:send-entered',true);parent.check();return true;
   }).catch(()=>false);
   await Promise.resolve();const whileHeld=written;
   if(mode==='queue-expired')f.setNow(f.now()+5000);
   release();const observation=await observing,send=await sending;
   return {observation,whileHeld,send,written};
  }
  const result=await i.observeBeforeCreation();
  return {result,before,paths:f.paths,head:await this.ctx.storage.get('afw.qa-finite-trial.v1:head')??null,alarm:await this.ctx.storage.getAlarm()};
 }
 async alarm(){}
}
export default {async fetch(request,env){const {mode}=await request.json();const stub=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));return Response.json(await stub.run(mode));}};
`;
async function native(mode){
 assert.equal(typeof inventoryApi.createPrivateQaFiniteLaunchInventory,'function');
 const built=await build({stdin:{contents:entry,resolveDir:process.cwd(),sourcefile:'finite-launch-fixture.mjs'},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC external provenance boundary',setup(b){b.onLoad({filter:/mcp-qa-finite-launch-source\.mjs$/},async args=>({contents:"export {resolvePrivateQaFiniteLaunchContext,readPrivateQaFiniteLaunchMaterial} from '../test/fixtures/finite-launch-native.mjs';",loader:'js',resolveDir:args.path.slice(0,args.path.lastIndexOf('/'))}));}}]});
 const flags=Object.fromEntries(['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'].map(k=>[k,'true']));
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:built.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launch-test-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'LaunchFixture',useSQLite:true,uniqueKey:'launch-native-fixture'},AFW_RELEASE_EVENTS_NODE:{className:'LaunchFixture',useSQLite:true,uniqueKey:'launch-native-node'}}}));
 try{const response=await mf.dispatchFetch('https://fixture.invalid/',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200,await response.clone().text());return response.json();}finally{await mf.dispose();}
}
test('native DO before-HEAD full fixed inventory proves only point-in-time absence',async()=>{
 const r=await native('before');assert.equal(r.result.kind,'never_issued');assert.equal(r.result.phase,'arm');assert.equal(r.before.state,null);assert.equal(r.head,null);assert.equal(r.alarm,null);assert.equal(r.paths.length,7);
});
test('real prepare awaits its own native inventory without control.read reentry',async()=>{
 const r=await native('nested');assert.equal(r.prepared.status,'armed');assert.equal(r.observations.length,2);assert.ok(r.observations.every(x=>x.kind==='never_issued'));assert.equal(r.after.state.phase,'armed');
});
test('same-invocation pending survives factual snapshot but never becomes prepared',async()=>{
 const r=await native('pending');assert.equal(r.prepared.status,'uncertain');assert.equal(r.after.state.phase,'pending');assert.equal(r.after.prepared,null);
});
for(const mode of ['foreign-head','incomplete','provider-nominal','provider-expired','snapshot-change'])test('native inventory denies '+mode,async()=>{assert.equal((await native(mode)).result.kind,'unavailable');});
test('actual shared coordinator blocks SEND transition until protected consumption',async()=>{
 const r=await native('race');assert.equal(r.whileHeld,false);assert.equal(r.observation.kind,'never_issued');assert.equal(r.send,true);assert.equal(r.written,true);
});
test('queued transition and provider work consume the original parent deadline',async()=>{
 const r=await native('queue-expired');assert.equal(r.whileHeld,false);assert.equal(r.observation.kind,'unavailable');assert.equal(r.send,false);assert.equal(r.written,false);
});
test('source hydration cannot refresh the original parent lifetime',async()=>{
 const r=await native('hydrate-expired');assert.equal(r.expired,true);assert.deepEqual(r.paths,[]);
});
test('default source has no registration or positive authority escape',async()=>{
 const source=await readFile(new URL('../lib/mcp-qa-finite-launch-source.mjs',import.meta.url),'utf8');assert.doesNotMatch(source,/export (?:function|const) (?:install|register)/);
});

test('copied actual snapshot and fabricated provider DTO cannot mint an absence result',async()=>{
 const f=finiteFixture(),o=f.options(controlApi),parent={check:f.now,signal:new AbortController().signal,deadline:f.now()+5000};
 const snapshot=await controlApi.readPrivateQaFiniteControlSnapshot({storage:f.storage,nativePin:o.nativePin,plan:o.plan,parent});
 const execution={intentId:f.plan.intentId,controlHash:snapshot.control.controlHash,sourceRevision:f.plan.source.revision,moduleHash:f.plan.source.moduleHash,confirmationId:f.plan.workflows.confirmation,observerId:f.plan.workflows.bootstrap,admissionHash:'e'.repeat(64),launcherId:f.plan.workflows.launcher};
 const inventory={workflowCount:3,instanceCount:1,instances:[{definition:'06b6c3eb-ce59-4594-8b9e-2636977d56da',id:f.plan.workflows.bootstrap,status:'running'}]};
 assert.throws(()=>consumePrivateFiniteLaunchInventory({inventory,snapshot,execution,observedAt:f.now()}));
});
test('returned point-in-time fact DTO cannot be replayed after coordinator release',async()=>{
 const r=await native('before');assert.equal(r.result.kind,'never_issued');
 assert.throws(()=>consumePrivateFiniteLaunchInventory(r.result));
});

test('actual same-object prepare guard claim and prepared journal qualify prelaunch',async()=>{
 const r=await native('prelaunch');assert.equal(r.result.kind,'never_issued');assert.equal(r.result.phase,'prelaunch');
 const {digest}=await import('./fixtures/qa-finite-trial.mjs');assert.equal(r.prepared.nominalClaimHash,digest('afw.qa-finite-trial.v1:effect',r.claim));
});
for(const mode of ['issued','ack'])test('durable '+mode+' with provider absence remains issued and unresolved',async()=>{
 const r=await native(mode);assert.equal(r.result.kind,'issued');assert.equal(r.result.provider,null);assert.match(r.result.sendHash,/^[a-f0-9]{64}$/);assert.equal(Object.hasOwn(r.result,'ackHash'),mode==='ack');
});
test('tampered prepared claim linkage cannot qualify prelaunch',async()=>{assert.equal((await native('prepared-tamper')).result.kind,'unavailable');});
test('reconstructed pending is factual uncertainty, never new arm authority',async()=>{
 const r=await native('reconstruct-pending');assert.equal(r.armed.status,'uncertain');assert.equal(r.result.kind,'unavailable');
});

test('actual storage transaction ACK after parent expiry releases no observation',async()=>{assert.equal((await native('storage-expired')).result.kind,'unavailable');});
test('prelaunch checks the actual sole C0 alarm as well as guard metadata',async()=>{assert.equal((await native('alarm-tamper')).result.kind,'unavailable');});

test('orphan guard without a finite HEAD is not an unspent launch',async()=>{assert.equal((await native('orphan-guard')).result.kind,'unavailable');});
test('actual cleanup permission claim prevents a new prelaunch observation',async()=>{assert.equal((await native('cleanup-started')).result.kind,'unavailable');});
