import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const entry=`
import {IndependentClosure,PrivateQaNamedConfirmation} from './worker/independent-closure/index.mjs';
import {fixture,resolvePrivateQaFiniteLaunchContext} from './test/fixtures/finite-launch-operations-native.mjs';
import {createPrivateQaFiniteLaunchParent,withPrivateQaFiniteLaunchCoordinator} from './lib/mcp-qa-finite-launch-inventory.mjs';
import {runPrivateQaFiniteLaunchOperation} from './lib/mcp-qa-finite-launch.mjs';
export {PrivateQaNamedConfirmation};
export class Native extends IndependentClosure{
 async run(mode){
  const methods=['prepareFiniteNominalLaunch','createFiniteNominalChild','readFiniteNominalLaunch'];
  if(methods.some(k=>typeof this[k]!=='function'))return {missingMount:true};
  const f=await fixture(this.ctx,this.env);f.setup='completed';f.seed='original';f.launcher=true;
  Date.now=f.now;
  const prepareRefs={intentId:f.plan.intentId,sourceRevision:f.plan.source.revision};
  const prefix='afw.qa-finite-child-create.v1:'+f.plan.intentId+':',controlPrefix='afw.qa-finite-trial.v1:'+f.plan.intentId+':';
  const originalTx=this.ctx.storage.transaction,originalGet=this.ctx.storage.get,originalCreate=this.env.AFW_QA_NAMED_CONFIRMATION.create;
  let calls=0,callArgs=null,armedAt=null,enter,release,settled=false;
  const reached=new Promise(r=>{enter=r;}),held=new Promise(r=>{release=r;});
  this.env.AFW_QA_NAMED_CONFIRMATION.create=async options=>{
   calls++;callArgs=options;
   const actual=await originalCreate.call(this.env.AFW_QA_NAMED_CONFIRMATION,options);
   if(mode==='held-create'){enter();await held;settled=true;}
   if(mode==='lost-create')throw Error('SYNTHETIC lost create ACK');
   if(mode==='late-create')f.setNow(f.now()+5000);
   if(mode==='wrong-create')return {id:'foreign'};
   return actual;
  };
  if(mode==='missing-setup')f.setup=null;
  if(mode==='unsettled-setup')f.setup='running';
  if(mode==='altered-seed')f.seed='changed';
  if(mode==='source-unavailable')f.sourceUnavailable=true;
  if(mode==='operations-unavailable')f.operationsUnavailable=true;
  if(mode==='workflow-context'){const parent=createPrivateQaFiniteLaunchParent({deadline:f.now()+5000});return {outcome:await runPrivateQaFiniteLaunchOperation({ctx:{},env:this.env,operation:'prepare',refs:prepareRefs,parent}),calls};}
  if(mode==='prepare-90000')f.setNow(f.plan.T0+90000);
  if(mode==='hydrate-expiry')f.hydrate=async()=>{f.setNow(f.now()+5000);};
  if(mode==='old-head')await this.ctx.storage.put('afw.qa-finite-trial.v1:head',{intentId:'old'});
  if(mode==='prepare-phase-hydration'){f.setNow(f.plan.T0+89900);f.hydrate=async()=>{f.setNow(f.plan.launchPolicy.armAckBy);};}
  if(mode==='binding-after-await'){const original=f.primary.finalizer;f.primary.finalizer=async()=>{const r=await original();this.env.AFW_QA_NAMED_CONFIRMATION.create=async()=>{throw Error('foreign');};return r;};}
  if(mode==='invalid-args'){
   const cases=[[],[prepareRefs,{}],[{...prepareRefs,source:{}}],[{...prepareRefs,operation:'create'}]];
   const results=[];for(const a of cases){try{await this.prepareFiniteNominalLaunch(...a);results.push(false);}catch{results.push(true);}}
   return {results,calls};
  }
  if(['lost-prepare','lost-prepared','late-prepared','late-guard','late-claim','late-prepared-readback'].includes(mode)){
   let seen=0;
   this.ctx.storage.transaction=async fn=>{
    const r=await originalTx.call(this.ctx.storage,fn);
    const state=await originalGet.call(this.ctx.storage,mode==='lost-prepare'?controlPrefix+'control':mode==='late-guard'?'afw.qa-finite-guard.v1:'+f.plan.intentId+':state':mode==='late-claim'?controlPrefix+'effect:nominal':prefix+'prepared');
    if(state&&(mode!=='lost-prepare'||state.phase==='armed')){
     if(mode.startsWith('late-')){if(mode!=='late-prepared-readback'||++seen===2)f.setNow(f.now()+5000);}else throw Error('SYNTHETIC unknown transaction ACK');
    }return r;
   };
  }
  const prepared=await this.prepareFiniteNominalLaunch(prepareRefs);
  this.ctx.storage.transaction=originalTx;
  const journal=async()=>({prepared:await this.ctx.storage.get(prefix+'prepared')??null,send:await this.ctx.storage.get(prefix+'send')??null,ack:await this.ctx.storage.get(prefix+'ack')??null,claim:await this.ctx.storage.get(controlPrefix+'effect:nominal')??null,guard:await this.ctx.storage.get('afw.qa-finite-guard.v1:'+f.plan.intentId+':state')??null,alarm:await this.ctx.storage.getAlarm()});
  if(prepared.status!=='prepared'||mode==='prepare')return {prepared,journal:await journal(),calls};
  armedAt=f.now();f.prepareSuccess=true;
  const refs={intentId:f.plan.intentId,controlHash:prepared.prepared.controlHash};
  if(mode==='reprepare')return {prepared,again:await this.prepareFiniteNominalLaunch(prepareRefs),journal:await journal(),calls};
  f.setNow(f.plan.T0+(mode==='create-149999'?149999:mode==='create-160000'?160000:150000));
  if(mode==='consent-changed'){const original=f.primary.admission;f.primary.admission=async()=>{const p=await original();p.consent.valid=false;return p;};}
  if(mode==='readiness-changed')f.primary.finalizer=async()=>{throw Error('SYNTHETIC not READY');};
  if(['readiness-missing','readiness-stale','readiness-after-await','create-primary-expired'].includes(mode)){
   const original=f.primary.finalizer;let n=0;f.primary.finalizer=async()=>{
    const r=await original();n++;if(mode==='readiness-missing')return null;
    if(mode==='readiness-stale')r.observedAt=f.now()-5001;
    if(mode==='readiness-after-await'||mode==='create-primary-expired'&&n===2)f.setNow(f.now()+5000);
    return r;
   };
  }
  if(mode==='prepare-step-failed')f.prepareSuccess=false;
  if(mode==='sealed')f.sealed=true;
  if(mode==='withdrawn'){const c=await this.ctx.storage.get(controlPrefix+'control');await this.ctx.storage.put(controlPrefix+'control',{...c,withdrawnAt:f.now()});}
  if(mode==='pin-changed')this.env.AFW_QA_VERSION={id:'22222222-2222-4222-8222-222222222222'};
  if(['lost-send','late-send','late-send-readback','late-ack','late-ack-readback'].includes(mode)){
   let seen=0;
   this.ctx.storage.transaction=async fn=>{
    const result=await originalTx.call(this.ctx.storage,fn);
    if(await originalGet.call(this.ctx.storage,prefix+(mode.includes('ack')?'ack':'send'))){
     if(mode.startsWith('late-')){if(!mode.endsWith('readback')||++seen===2)f.setNow(f.now()+5000);}else throw Error('SYNTHETIC lost SEND ACK');
    }return result;
   };
  }
  if(mode==='duplicate-id'){await originalCreate.call(this.env.AFW_QA_NAMED_CONFIRMATION,{id:f.plan.workflows.confirmation,params:{planHash:f.plan.bundleHash}});f.providerNominal='complete';}
  if(mode==='held-create'){
   f.hydrate=async()=>{f.setNow(f.now()+4500);f.hydrate=null;};
   const first=this.createFiniteNominalChild(refs);await Promise.race([reached,first.then(r=>{throw Error('did not reach native create '+r.status);})]);const firstResult=await first,settledAtReturn=settled;
   const parent=createPrivateQaFiniteLaunchParent({deadline:f.now()+5000}),context=await resolvePrivateQaFiniteLaunchContext({ctx:this.ctx,env:this.env,refs,parent});
   let enteredFresh=false;const fresh=withPrivateQaFiniteLaunchCoordinator({ctx:this.ctx,env:this.env,context,parent},async check=>{check();enteredFresh=true;return true;});
   await new Promise(r=>setTimeout(r,30));const enteredBeforeSettlement=enteredFresh;release();await fresh;
   const again=await this.createFiniteNominalChild(refs);return {firstResult,settledAtReturn,enteredBeforeSettlement,again,journal:await journal(),calls};
  }
  const created=await this.createFiniteNominalChild(refs);
  this.ctx.storage.transaction=originalTx;
  const before=await journal();
  const again=await this.createFiniteNominalChild(refs),read=await this.readFiniteNominalLaunch(refs);
  return {prepared,created,again,read,journal:await journal(),unchanged:JSON.stringify(before)===JSON.stringify(await journal()),calls,callArgs,armedAt,plan:f.plan};
 }
}
export default{async fetch(r,e){const {mode}=await r.json();const s=e.AFW_INDEPENDENT_CLOSURE.get(e.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));try{return Response.json(await s.run(mode));}catch(error){return Response.json({error:String(error)},{status:500});}}};
`;
let bundled;
async function native(mode,synthetic=true){
 const key=synthetic?'yes':'no';bundled??={};
 if(!bundled[key])bundled[key]=(await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',target:'es2022',external:['node:*','cloudflare:*'],plugins:synthetic?[{name:'SYNTHETIC C2 source only',setup(b){b.onLoad({filter:/mcp-qa-finite-launch-source\.mjs$/},async args=>({contents:"export {resolvePrivateQaFiniteLaunchContext,readPrivateQaFiniteLaunchMaterial,readPrivateQaFiniteLaunchOperations} from '../test/fixtures/finite-launch-operations-native.mjs';",loader:'js',resolveDir:args.path.slice(0,args.path.lastIndexOf('/'))}));}}]:[]})).outputFiles[0].text;
 const release=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundled[key],compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(release.map(k=>[k,'true'])),AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launch-operation-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'launch-operation-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'launch-operation-node'}},workflows:{AFW_QA_NAMED_CONFIRMATION:{name:'afw-own-qa-private-confirmation',className:'PrivateQaNamedConfirmation'}}}));
 try{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(r.status,200,await r.clone().text());const value=await r.json();assert.notEqual(value.missingMount,true,'actual IndependentClosure fixed launch methods must exist');return value;}finally{await mf.dispose();}
}
test('actual native prepare arms C0 guard then consumes same-object nominal once',async()=>{
 const r=await native('prepare');assert.equal(r.prepared.status,'prepared');assert.equal(r.journal.claim.kind,'nominal');assert.equal(r.journal.guard.state,'armed');assert.equal(r.journal.alarm,r.journal.guard.nextAt);assert.equal(r.journal.send,null);assert.equal(r.calls,0);
});
test('actual native binding creates exact fixed child once; receipt/read/reconstruction grant no send',async()=>{
 const r=await native('create');assert.equal(r.created.status,'acknowledged');assert.equal(r.calls,1);assert.deepEqual(r.callArgs,{id:r.plan.workflows.confirmation,params:{planHash:r.plan.bundleHash}});assert.ok(r.journal.send);assert.ok(r.journal.ack);assert.equal(r.unchanged,true);assert.equal(r.again.authorizesEffects,false);assert.equal(r.read.operationalReadiness,false);
});
test('RPC exact arity/fields reject caller source and operation',async()=>{assert.deepEqual((await native('invalid-args')).results,[true,true,true,true]);});
test('default unqualified C2 denies before storage/effects',async()=>{const r=await native('prepare',false);assert.equal(r.prepared.status,'admin_pending');assert.equal(r.journal.prepared,null);assert.equal(r.journal.claim,null);assert.equal(r.calls,0);});
for(const mode of ['missing-setup','unsettled-setup','altered-seed','source-unavailable','operations-unavailable','prepare-90000','hydrate-expiry','prepare-phase-hydration','binding-after-await','old-head','lost-prepare','lost-prepared','late-prepared','late-guard','late-claim','late-prepared-readback'])test('prepare denies '+mode,async()=>{const r=await native(mode);assert.equal(r.prepared.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
test('reconstructed prepare never acquires same-object claim again',async()=>{const r=await native('reprepare');assert.equal(r.again.status,'admin_pending');assert.equal(r.calls,0);});
for(const mode of ['create-149999','create-160000','consent-changed','readiness-changed','readiness-missing','readiness-stale','readiness-after-await','prepare-step-failed','sealed','withdrawn','pin-changed'])test('create denies '+mode,async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
for(const mode of ['lost-send','late-send','late-send-readback','create-primary-expired'])test('durable '+mode+' consumes SEND without native invocation/refund',async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.ok(r.journal.send);assert.equal(r.journal.ack,null);assert.equal(r.calls,0);assert.equal(r.unchanged,true);});
for(const mode of ['lost-create','late-create','wrong-create'])test('one-shot '+mode+' retains unresolved SEND without retry',async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.ok(r.journal.send);assert.equal(r.journal.ack,null);assert.equal(r.calls,1);assert.equal(r.unchanged,true);});

test('preexisting actual native child denies SEND even though native create is idempotent',async()=>{const r=await native('duplicate-id');assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,0);assert.equal(r.journal.send,null);});
test('Workflow context cannot replace actual DO storage context',async()=>{const r=await native('workflow-context');assert.equal(r.outcome.status,'admin_pending');assert.equal(r.calls,0);});
test('held actual native create retains coordinator after caller expiry against a fresh parent',async()=>{const r=await native('held-create');assert.equal(r.firstResult.status,'admin_pending');assert.equal(r.settledAtReturn,false);assert.equal(r.enteredBeforeSettlement,false);assert.equal(r.calls,1);assert.ok(r.journal.send);assert.equal(r.journal.ack,null);});
for(const mode of ['late-ack','late-ack-readback'])test('late actual ACK persistence remains factual after '+mode,async()=>{const r=await native(mode);assert.equal(r.created.status,'admin_pending');assert.equal(r.calls,1);assert.ok(r.journal.send);assert.ok(r.journal.ack);assert.equal(r.unchanged,true);});
