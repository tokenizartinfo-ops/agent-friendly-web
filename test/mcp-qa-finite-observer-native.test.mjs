import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
const entry=`
import {IndependentClosure,PrivateQaBootstrap} from './worker/independent-closure/index.mjs';
import {installPrivateQaFiniteMaterialFactory} from './lib/mcp-qa-finite-observer-native.mjs';
import {installPrivateQaFiniteObserverSource} from './lib/mcp-qa-finite-observer.mjs';
import {createPrivateQaFiniteTrialNativePin} from './lib/mcp-qa-finite-trial-control.mjs';
import {finiteFinalizerFixture} from './test/fixtures/finite-finalizer.mjs';
const fixtures=new Map();
installPrivateQaFiniteObserverSource('b'.repeat(40));
installPrivateQaFiniteMaterialFactory(async({ctx,env})=>{
 const f=fixtures.get(ctx.id.toString());if(!f)throw Error('fixture absent');
 const p=f.f.plan,controlOptions={storage:ctx.storage,nativePin:createPrivateQaFiniteTrialNativePin({ctx,env,sourceRevision:p.source.revision}),plan:JSON.stringify(p),readPrimary:{...f.f.primary,effect:async kind=>({purpose:'afw.qa-finite-effect-eligibility.v1',intentId:p.intentId,controlHash:f.preview.controlHash,kind,proofHash:f.output.retained.proofHash,observedAt:Date.now(),eligible:true,evidenceHash:'a'.repeat(64)})},now:Date.now,timeoutMs:5000};
 return {controlOptions,custody:f.custody,readFinalPrimary:async check=>{
  check();const row=await env.RELEASE_DB.prepare('SELECT pending, writes FROM held_writer WHERE id = 1').first();check();
  const observedAt=Date.now();return {primary:{...f.output.primaryReceipt.primary,observedAt},writers:{...f.output.primaryReceipt.writers,knownPending:row.pending,unresolvedRemoteWrites:row.pending,observedAt}};
 }};
});
export class Native extends IndependentClosure{
 async seed(){
  const f=await finiteFinalizerFixture({at:Number(this.env.T0),configure:p=>{p.resources.actorId=this.ctx.id.toString();}});
  fixtures.set(this.ctx.id.toString(),f);
  for(const[k,v]of f.f.rows)await this.ctx.storage.put(k,v);
  await this.ctx.storage.delete('afw.qa-finite-trial.v1:'+f.preview.intentId+':effect:qa_restore');
  await this.env.RELEASE_DB.exec('CREATE TABLE held_writer (id INTEGER PRIMARY KEY, pending INTEGER, writes INTEGER); INSERT INTO held_writer VALUES (1,0,0);');
  return {preview:f.preview,instanceId:f.plan.workflows.bootstrap};
 }
 // Synthetic approved preview/primary authority; actual native dispatcher,
 // Workflow engine, claim journal and bound D1 are exercised below.
 previewFiniteTrialMaterial(){return fixtures.get(this.ctx.id.toString()).preview;}
 async refs(){const f=fixtures.get(this.ctx.id.toString());return {intentId:f.preview.intentId,controlHash:f.preview.controlHash,proofHash:f.output.retained.proofHash};}
 async hold(){
  await this.env.RELEASE_DB.prepare('UPDATE held_writer SET pending=1 WHERE id=1').run();
  const gate=new Promise(resolve=>{this.releaseWrite=resolve;});
  this.pendingWrite=gate.then(()=>this.env.RELEASE_DB.prepare('UPDATE held_writer SET pending=0,writes=writes+1 WHERE id=1').run());
  return {held:true};
 }
 async release(){this.releaseWrite();await this.pendingWrite;return this.env.RELEASE_DB.prepare('SELECT pending,writes FROM held_writer WHERE id=1').first();}
}
export {PrivateQaBootstrap};
export default {fetch(){return new Response(null,{status:404});}};
`;
async function fixture(){
 const b=await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 const T0=Date.now()-240100,flags=Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false']));
 for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])flags[k]='true';
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...flags,T0:String(T0),AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-final-primary-native'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'finite-final-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-candidate-native'}},workflows:{FLOW:{name:'finite-observer-test',className:'PrivateQaBootstrap'}}}));
 const env=await mf.getBindings(),actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1')),seed=await actor.seed();
 return {mf,env,actor,seed};
}
test('actual native Workflow carries one real journal claim then bounded first-primary receipt',async()=>{
 const f=await fixture();
 try{
  const wf=await f.env.FLOW.create({id:f.seed.instanceId,params:{operation:'finite_cleanup_observer',intentId:f.seed.preview.intentId,sourceRevision:f.seed.preview.sourceRevision}});
  let r;const deadline=Date.now()+12000;
  do{r=await wf.status();if(r.status==='complete'||r.status==='errored')break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<deadline);
  assert.equal(r.status,'complete');assert.equal(r.output.purpose,'afw.finite-observer-output.v1',JSON.stringify(r.output));
  assert.equal(r.output.qaClaim.claim.kind,'qa_restore');assert.equal(r.output.primaryReceipt.writers.knownPending,0);
  await assert.rejects(f.actor.claimFiniteTrialQaRestore(await f.actor.refs()));
  assert.equal((await (await f.mf.getWorker()).fetch('https://synthetic.invalid')).status,404);
 }finally{await f.mf.dispose();}
});
test('actual held D1 writer after claim blocks terminal evidence while later write can still commit',async()=>{
 const f=await fixture();
 try{
  const refs=await f.actor.refs(),claim=await f.actor.claimFiniteTrialQaRestore(refs);assert.equal(claim.claim.kind,'qa_restore');
  await f.actor.hold();
  await assert.rejects(f.actor.readFiniteTrialFinalPrimary({...refs,claimHash:claim.claimHash}));
  // This is why empty provider/Workflow state cannot be substituted for a
  // complete writer fence: the outstanding real D1 operation later commits.
  assert.deepEqual(await f.actor.release(),{pending:0,writes:1});
  await assert.rejects(f.actor.claimFiniteTrialQaRestore(refs));
 }finally{await f.mf.dispose();}
});
