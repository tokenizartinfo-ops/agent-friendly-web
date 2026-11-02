import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Actual workerd Workflow subclass. External native source qualification is
// SYNTHETIC; it deliberately denies. This fixture never claims native authority.
const entry=`
import {createHash} from 'node:crypto';
import {PrivateQaBootstrap} from './worker/independent-closure/finite.mjs';
const state={reads:0};
export function entrySource({env,event,step},lease){lease.assertCurrent();state.reads++;if(env!==state.env||event!==state.event||step!==state.step)throw Error('SYNTHETIC identity drift');throw Error('SYNTHETIC original source incomplete');}
export default {async fetch(request,env,ctx){
 const {mode}=await request.json();state.reads=0;
 const refs={intentId:'a'.repeat(64),sourceRevision:'b'.repeat(40)};
 const id='afw-finite-policy-'+createHash('sha256').update('afw.finite-private-policy-setup.v1\\n'+JSON.stringify(refs)).digest('hex');
 const event={timestamp:new Date(),instanceId:id,workflowName:'afw-own-qa-private-bootstrap',payload:{operation:'finite_private_policy_setup',...refs}};
 if(mode==='extra')event.payload.T0=Date.now();
 if(mode==='future')event.timestamp=new Date(Date.now()+10000);
 if(mode==='expired')event.timestamp=new Date(Date.now()-30000);
 if(mode==='non_date')event.timestamp=Date.now();
 if(mode==='wrong_id')event.instanceId='wrong';
 if(mode==='wrong_name')event.workflowName='wrong';
 state.env=env;state.event=event;state.step={async do(name,options,callback){return callback();}};
 let outcome;try{outcome=await new PrivateQaBootstrap(ctx,env).run(event,state.step);}catch{outcome={status:'admin_pending'};}
 return Response.json({reads:state.reads,outcome});
}};
`;
const bundles=new Map();
async function run(t,mode,synthetic=true){
 if(!bundles.has(synthetic)){
  const r=await build({stdin:{contents:"export {default} from 'synthetic-policy-entry';",resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*'],plugins:[{name:'SYNTHETIC-native-entry',setup(b){
   b.onResolve({filter:/^synthetic-policy-entry$/},()=>({path:'entry',namespace:'synthetic'}));
   b.onLoad({filter:/.*/,namespace:'synthetic'},()=>({contents:entry,resolveDir:process.cwd(),loader:'js'}));
   if(synthetic)b.onLoad({filter:/mcp-qa-finite-policy-setup-source\.mjs$/},()=>({contents:"export {entrySource as readPrivateQaFinitePolicyEntry} from 'synthetic-policy-entry'; export function readPrivateQaFinitePolicySource(){throw Error('SYNTHETIC unavailable');}",loader:'js'}));
  }}]});bundles.set(synthetic,r.outputFiles[0].text);
 }
 const mf=new Miniflare(convertV4MiniflareOptions({modules:true,script:bundles.get(synthetic),compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{AFW_QA_VERSION:{id:'11111111-1111-4111-8111-111111111111'}}}));
 t.after(()=>mf.dispose());const response=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({mode})});assert.equal(response.status,200);return response.json();
}
test('Task4 native finite setup dispatch consults original source before any effect',async t=>{
 const r=await run(t,'normal');assert.equal(r.reads,1);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
});
for(const mode of ['extra','future','expired','non_date','wrong_id','wrong_name'])test('Task4 native setup denies '+mode+' before source',async t=>{
 const r=await run(t,mode);assert.equal(r.reads,0);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
});
test('Task4 actual unavailable source cannot mint setup authority',async t=>{
 const r=await run(t,'normal',false);assert.equal(r.reads,0);assert.equal(r.outcome.status,'admin_pending');assert.equal(r.outcome.receipt,undefined);
});

import {policyFixture} from './fixtures/finite-policy-setup-native.mjs';
import {hashFinitePreparationRecord as recordHash,decodeFinitePreparationRecord} from '../lib/mcp-qa-finite-preparation-records.mjs';
test('Task4 actual native wrapper DO store and two-effect engine installs only actual ACK versions',async t=>{
 const f=await policyFixture(t),outcome=await f.run();assert.equal(outcome.status,'installed',JSON.stringify({posts:f.posts(),reads:f.reads,keys:(await f.rows()).map(([k])=>k)}));assert.equal(f.posts(),2);
 assert.equal(outcome.receipt.versionId,f.actual().versionId);assert.equal(outcome.receipt.deploymentId,f.actual().deploymentId);
 assert.equal(outcome.receipt.receiptHash,recordHash('PolicyReceipt',outcome.receipt));
 const rows=await f.rows(),context=decodeFinitePreparationRecord('SetupContext',rows.find(([k])=>k.endsWith(':context'))[1]);
 assert.equal(context.ownerPreparation.programContext.sourceRevision,'c'.repeat(40));assert.equal(context.sourceRevision,'b'.repeat(40));
 assert(context.T0<context.ownerPreparation.commandBy);assert(outcome.receipt.installedAt>context.ownerPreparation.commandBy);
 assert.equal(context.C0,context.T0+240000);assert.equal(context.C1,context.T0+420000);
 const withdrawal=JSON.parse(context.policies.AFW_DOSSIER_PERMISSION_WITHDRAWAL_POLICY);assert.equal(withdrawal.startAt,context.C0);assert.equal(withdrawal.expiresAt,context.C1);
 assert.equal(rows.filter(([k])=>k.endsWith(':send')).length,2);assert.equal(rows.filter(([k])=>k.endsWith(':ack')).length,2);
 assert.equal(rows.some(([k])=>k==='afw.qa-finite-trial.v1:head'),false);
 assert.equal(JSON.stringify(outcome).includes('SYNTHETIC_OWNER'),false);
 assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),2);
});
for(const mode of ['owner_incomplete','seed_incomplete','changed_grant','changed_revision','changed_selection','publisher_unavailable','queue_expired','setup_expired','head_touched','oversize','foreign_pointer']){
 test('Task4 native setup denies '+mode+' before SEND',async t=>{
  const f=await policyFixture(t,mode);assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),0);assert.equal((await f.rows()).filter(([k])=>k.endsWith(':send')).length,0);
 });
}
for(const mode of ['lost_ack','late_upload','provider404','wrong_bytes','wrong_full']){
 test('Task4 native upload '+mode+' preserves issued state without activation or resend',async t=>{
  const f=await policyFixture(t,mode);assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),1);
  assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),1);
  assert.equal((await f.rows()).filter(([k])=>k.endsWith(':send')).length,1);
 });
}
test('Task4 lost activation ACK cannot produce installed receipt or repeat effects',async t=>{
 const f=await policyFixture(t,'lost_activation');assert.equal((await f.run()).status,'admin_pending');assert.equal(f.posts(),2);
 assert.equal((await f.rows()).filter(([k])=>k.endsWith(':receipt')).length,0);
 assert.equal((await f.run(true)).status,'admin_pending');assert.equal(f.posts(),2);
});
