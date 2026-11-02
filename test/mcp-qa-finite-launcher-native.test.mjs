import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
// SYNTHETIC source/primary and accelerated wall clock. Actual exported finite
// Workflow, DO, SQLite control/guard/journal and native child binding are real.
const entry=`
import {IndependentClosure,PrivateQaBootstrap,PrivateQaNamedConfirmation} from './worker/independent-closure/finite.mjs';
import {fixture} from './test/fixtures/finite-launch-operations-native.mjs';
const state={};
export class Native extends IndependentClosure {
 async seed(mode){
  const f=await fixture(this.ctx,this.env);state.f=f;state.mode=mode;state.calls={prepare:0,read:0,create:0,sleeps:[],steps:[]};
  f.setup='completed';f.seed='original';f.launcher=true;f.setNow(f.plan.T0+1000);Date.now=f.now;
  if(mode==='missing-seed')f.seed='missing';
  return {id:f.plan.workflows.launcher,payload:{operation:'finite_nominal_launcher',intentId:f.plan.intentId,sourceRevision:f.plan.source.revision},plan:f.plan};
 }
 async prepareFiniteNominalLaunch(refs){state.calls.prepare++;const r=await super.prepareFiniteNominalLaunch(refs);state.calls.preparedStatus=r.status;if(state.mode==='lost-prepare')throw Error('synthetic lost acknowledgement');return r;}
 async readFiniteNominalLaunch(refs){state.calls.read++;const r=await super.readFiniteNominalLaunch(refs);state.calls.readStatus=r.status;if(state.mode==='late-readback')state.f.setNow(state.f.plan.launchPolicy.armAckBy+1);return r;}
 async createFiniteNominalChild(refs){state.calls.create++;return super.createFiniteNominalChild(refs);}
 report(){return state.calls;}
}
export class Launcher extends PrivateQaBootstrap{
 run(event,step){
  const adapted={
   do:async(name,options,fn)=>{state.calls.steps.push({name,options});const r=await step.do(name,options,fn);if(name==='finite-launch-prepare'&&state.mode==='late-step')state.f.setNow(state.f.plan.launchPolicy.armAckBy+1);return r;},
   sleepUntil:async(name,date)=>{state.calls.sleeps.push({name,at:date.getTime()});state.f.prepareSuccess=true;state.f.setNow(date.getTime()+(state.mode==='late-wake'?10000:0));try{return await step.sleepUntil(name,new Date(new Date().getTime()+25));}catch(error){state.calls.sleepError=String(error);throw error;}}
  };
  return super.run(event,adapted);
 }
}
export {PrivateQaNamedConfirmation};
export default {async fetch(request,env){const actor=env.AFW_INDEPENDENT_CLOSURE.get(env.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));const x=await request.json();return Response.json(x.action==='seed'?await actor.seed(x.mode):await actor.report());}};
`;
let code;
async function native(mode){
 if(!code)code=(await build({stdin:{contents:entry,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'synthetic-external-provenance',setup(b){b.onResolve({filter:/mcp-qa-finite-launch-source\.mjs$/},()=>({path:process.cwd()+'/test/fixtures/finite-launch-operations-native.mjs'}));}}]})).outputFiles[0].text;
 const flags=Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false']));for(const k of ['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'])flags[k]='true';
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:code,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{...flags,AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'launcher-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'launcher-do'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'launcher-node'}},workflows:{FLOW:{name:'afw-own-qa-private-bootstrap',className:'Launcher'},AFW_QA_NAMED_CONFIRMATION:{name:'afw-own-qa-private-confirmation',className:'PrivateQaNamedConfirmation'}}}));
 try{
  const call=async x=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify(x)});assert.equal(r.status,200,await r.clone().text());return r.json();};
  const seed=await call({action:'seed',mode}),env=await mf.getBindings(),wf=await env.FLOW.create({id:seed.id,params:seed.payload});
  let r;const end=Date.now()+15000;do{r=await wf.status();if(['complete','errored'].includes(r.status))break;await new Promise(resolve=>setTimeout(resolve,25));}while(Date.now()<end);
  return {status:r,report:await call({action:'report'}),seed};
 }finally{await mf.dispose();}
}
test('actual finite Bootstrap prepares with readback, absolute sleep and one journaled native child',async()=>{
 const r=await native('success');assert.equal(r.status.status,'complete');assert.equal(r.report.prepare,1,'finite source must dispatch launcher');assert.equal(r.report.read,1,JSON.stringify({status:r.status,report:r.report}));assert.equal(r.report.create,1,JSON.stringify(r));
 assert.deepEqual(r.report.sleeps,[{name:'finite-launch-wait',at:r.seed.plan.launchPolicy.launchAt}]);
 assert.deepEqual(r.report.steps.map(x=>x.name),['finite-launch-prepare','finite-launch-create']);for(const s of r.report.steps)assert.equal(s.options.retries.limit,0);
 assert.equal(r.status.output.status,'acknowledged');assert.equal(r.status.output.authorizesEffects,false);
});
for(const mode of ['missing-seed','lost-prepare','late-readback','late-step','late-wake'])test('actual launcher denies '+mode+' without a child or retry',async()=>{
 const r=await native(mode);assert.equal(r.status.output?.status,'admin_pending');assert.equal(r.report.create,0);assert.ok(r.report.prepare<=1);
});
