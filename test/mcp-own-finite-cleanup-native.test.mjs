import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
// Actual workerd DO SQLite + D1 tables + inherited fixed native RPC methods.
// Synthetic provider, custody reader, source/version tuple and persisted clock.
// No deployed profile, new grant, live Container or physical stop is asserted.
test('native finite seal survives restart and accounts for every held writer',async()=>{
 const schemas=['dossier-node-process.sql','dossier-successor-reservation.sql','dossier-successor-launch.sql'].flatMap(file=>[...readFileSync('db/'+file,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(x=>x[0]));
 const contents=`
 import {AfwOwnEventNode} from './worker/mcp-own/index.mjs';
 import {createFiniteOwnNativeCleanupHost,installFiniteOwnNativeCleanupFactory} from './lib/mcp-own-finite-cleanup-host.mjs';
 import {finiteFixture,digest} from './test/fixtures/qa-finite-trial.mjs';
 async function make(ctx,env){
  const f=finiteFixture({at:Number(env.T0)}),p=f.plan;p.resources.containerId=env.AFW_DOSSIER_EVENTS_NODE.idFromName('afw-own-event-first-successor-v1').toString();
  const clock=await ctx.storage.get('fixture:clock')??p.T0;
  const control={plan:p,planHash:digest(p.purpose,p),controlHash:'1'.repeat(64)};
  const options={ctx,env,control,sourceRevision:p.canaryContainment.sourceRevision,now:()=>clock,providerRead:async()=>({purpose:'afw.finite-provider-inventory.v1',applicationId:p.resources.applicationId,observedAt:clock,instances:[],totalCount:0}),readCustody:async()=>{throw Error('synthetic absent custody');},readInstance:async()=>{throw Error('synthetic absent instance');}};
  return createFiniteOwnNativeCleanupHost(options);
 }
 installFiniteOwnNativeCleanupFactory(({ctx,env})=>make(ctx,env));
 export class Native extends AfwOwnEventNode {
  async fixture(method,value){
   if(method==='clock'){await this.ctx.storage.put('fixture:clock',value);return {};}
   const h=await make(this.ctx,this.env),c=h.identity,refs={intentId:c.plan.intentId,planHash:c.planHash};
   if(method==='begin')return h.gate['begin'+value]();
   if(method==='seal')return this.sealFiniteTrialAdmission(refs);
   if(method==='read')return h.gate.read();
   if(method==='ready')return this.readFiniteTrialCleanupReadiness(refs);
   if(method==='proof')return this.observeFiniteTrialCleanup({...refs,proofChallenge:'2'.repeat(64)});
   if(method==='badshape')return this.sealFiniteTrialAdmission({...refs,proofChallenge:'2'.repeat(64)});
   if(method==='settle')return this.settleFiniteTrialReservation({intentId:c.plan.intentId,controlHash:c.controlHash});
   throw Error('fixture');
  }
 }
 export default {async fetch(r,e){const x=await r.json();
  if(x.method==='seed'){for(const sql of ${JSON.stringify(schemas)})await e.DB.prepare(sql).run();return Response.json({});}
  const stub=e.AFW_DOSSIER_EVENTS_NODE.get(e.AFW_DOSSIER_EVENTS_NODE.idFromName(x.actor??'afw-own-event-first-successor-v1'));
  try{return Response.json(await stub.fixture(x.method,x.value));}catch{return Response.json({status:'denied'},{status:409});}
 }};
 `;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',mainFields:['module','main'],external:['node:*','cloudflare:*']});
 for(const mode of ['none','Reservation','Admission','Launch']){
  const T0=Date.now(),options=rev=>convertV4MiniflareOptions({modules:true,script:b.outputFiles[0].text,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],bindings:{T0:String(T0),REV:rev,AFW_FINITE_TRIAL_VERSION:{id:'31111111-1111-4111-8111-111111111111'}},durableObjects:{AFW_DOSSIER_EVENTS_NODE:{className:'Native',useSQLite:true,uniqueKey:'finite-native-'+mode}},d1Databases:{DB:'finite-db-'+mode}});
  const mf=new Miniflare(options('first'));
  const call=async(method,value,status=200,actor)=>{const r=await mf.dispatchFetch('https://fixture.invalid',{method:'POST',body:JSON.stringify({method,value,actor})});assert.equal(r.status,status);return r.json();};
  try{
   await call('seed');if(mode!=='none')assert.equal((await call('begin',mode)).status,'issued');
   await call('clock',T0+240003);assert.equal((await call('seal')).status,'sealed');
   await call('badshape',null,409);await call('read',null,409,'wrong-actor');
   await mf.setOptions(options('recreated'));assert.equal((await call('read')).sealed,true);
   assert.equal((await call('begin','Reservation')).status,mode==='Reservation'?'reconcile_only':'blocked');
   if(mode==='none'){assert.equal((await call('ready')).status,'ready_for_capture');assert.equal((await call('proof')).proof.kind,'sealed_without_admission');await call('proof',null,409);}
   else {assert.equal((await call('ready')).status,'not_yet_observed');assert.equal((await call('read')).unresolvedWriters,1);assert.ok(['admin_pending','blocked'].includes((await call('settle')).status));}
  }finally{await mf.dispose();}
 }
});
