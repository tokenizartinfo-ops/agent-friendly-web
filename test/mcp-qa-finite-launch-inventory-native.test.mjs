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
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
import {readFile} from 'node:fs/promises';
const entry=`
import {DurableObject} from 'cloudflare:workers';
import * as inventory from './lib/mcp-qa-finite-launch-inventory.mjs';
import {resolvePrivateQaFiniteLaunchContext} from './lib/mcp-qa-finite-launch-source.mjs';
import {fixture} from './test/fixtures/finite-launch-native.mjs';
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
  if(mode==='incomplete')f.incomplete=true;
  if(mode==='provider-nominal')f.providerNominal='running';
  if(mode==='provider-expired')f.onRequest=async()=>{f.setNow(f.now()+5000);};
  if(mode==='snapshot-change')f.onRequest=async()=>{await this.ctx.storage.put('afw.qa-finite-child-create.v1:'+f.plan.intentId+':send',{purpose:'uncertain'});};
  if(mode==='nested'||mode==='pending'){
   const original=f.primary.admission;
   f.primary.admission=async()=>{const observation=await i.observeBeforeCreation();f.observations.push(observation);if(observation.kind!=='never_issued')throw Error('inventory unavailable');return original();};
   if(mode==='pending')f.primary.finalizer=async()=>{throw Error('lost finalizer');};
   const control=createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin,plan:JSON.stringify(f.plan),readPrimary:f.primary,now:parent.check,timeoutMs:5000});
   const prepared=await control.prepare();
   return {prepared,observations:f.observations,after:await snapshot(),paths:f.paths};
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
