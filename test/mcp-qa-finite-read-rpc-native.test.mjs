import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {PRIVATE_QA_CLOSED_FLAGS} from '../lib/mcp-qa-closed-context.mjs';
// Actual fixed QA actor methods and storage; synthetic source/primary/version.
test('fixed retained-read RPC keeps exact own shape across compatible closed reconstruction',async()=>{
 const contents=`
 import {IndependentClosure} from './worker/independent-closure/index.mjs';
 import * as api from './lib/mcp-qa-finite-trial-control.mjs';
 import {finiteFixture} from './test/fixtures/qa-finite-trial.mjs';
 export class Native extends IndependentClosure {
  async seedFixture(){
   const f=finiteFixture({at:Number(this.env.T0)});f.plan.resources.actorId=this.ctx.id.toString();
   for(const[k,v]of f.rows)await this.ctx.storage.put(k,v);
   const c=api.createPrivateQaFiniteTrialControl({storage:this.ctx.storage,nativePin:api.createPrivateQaFiniteTrialNativePin({ctx:this.ctx,env:this.env,sourceRevision:f.plan.source.revision}),plan:JSON.stringify(f.plan),readPrimary:f.primary,now:f.now,timeoutMs:5000});
   const r=await c.prepare();if(r.status!=='armed')throw Error('fixture');return {intentId:f.plan.intentId,controlHash:r.controlHash};
  }
 }
 export default {async fetch(r,e){const x=await r.json(),s=e.AFW_INDEPENDENT_CLOSURE.get(e.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
  try{if(x.method==='seed')return Response.json(await s.seedFixture());if(x.method==='head')return Response.json(await s.readFiniteTrialCleanupProofHead(x.refs));if(x.method==='nominal')return Response.json(await s.readFiniteTrialNominalControl(x.refs));return new Response(null,{status:404});}catch{return Response.json({status:'unavailable'},{status:409});}
 }};
 `;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 const T0=Date.now()+600000,release=['AFW_RELEASE_OPERATOR_ENABLED','AFW_RELEASE_WORKFLOW_ENABLED','AFW_RELEASE_CONFIRMATION_WORKFLOW_ENABLED','AFW_RELEASE_RESERVATION_WORKFLOW_ENABLED'];
 const options=closed=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),...Object.fromEntries(PRIVATE_QA_CLOSED_FLAGS.map(k=>[k,'false'])),...Object.fromEntries(release.map(k=>[k,closed?'false':'true'])),AFW_QA_VERSION:{id:closed?'22222222-2222-4222-8222-222222222222':'11111111-1111-4111-8111-111111111111'}},d1Databases:{RELEASE_DB:'finite-read-db'},durableObjects:{AFW_INDEPENDENT_CLOSURE:{className:'Native',useSQLite:true,uniqueKey:'finite-read-native'},AFW_RELEASE_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-read-candidate'}}});
 const mf=new Miniflare(options(false)),call=async(method,refs,status=200)=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({method,refs})});assert.equal(r.status,status);return r.json();};
 try{
  const refs=await call('seed');assert.equal((await call('head',refs)).status,'not_yet_observed');
  await call('head',{...refs,storage:{}},409);await call('head',{...refs,extra:true},409);
  await mf.setOptions(options(true));assert.equal((await call('head',refs)).status,'not_yet_observed');
  await call('head',{...refs,controlHash:'f'.repeat(64)},409);await call('nominal',refs,409);
 }finally{await mf.dispose();}
});
