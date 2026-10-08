import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native alarm actor is closed by default and actual repeated alarms recover without duplicate writes',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {DurableObject} from 'cloudflare:workers';
 import {createClosureAlarmActor} from './lib/assistance-closure-alarm-actor.mjs';
 import {IndependentClosure} from './worker/independent-closure/index.mjs';
 export {IndependentClosure};
 export class Fixture extends DurableObject {
  constructor(ctx,env){super(ctx,env);this.ctx=ctx;this.actor=createClosureAlarmActor({context:ctx,options:{storage:ctx.storage,plan:{occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:Number(env.CLOSE_AT)},now:Date.now,
   revokePlan:async()=>{await ctx.storage.put('revoke',(await ctx.storage.get('revoke')||0)+1);throw Error('lost acknowledgement');},
   closeLedger:async()=>{await ctx.storage.put('close',(await ctx.storage.get('close')||0)+1);return {verified:true,state:'stopped'};},
   restoreAdministration:async()=>{await ctx.storage.put('restore',(await ctx.storage.get('restore')||0)+1);return {verified:true,state:'restored'};},
   readIssuedReceipt:async p=>({verified:(await ctx.storage.get({revokePlan:'revoke',closeLedger:'close',restoreAdministration:'restore'}[p.step]))===1,state:{revokePlan:'revoked',closeLedger:'stopped',restoreAdministration:'restored'}[p.step]})}});}
  arm(){return this.actor.arm();}
  async alarm(){const result=await this.actor.alarm();await this.ctx.storage.put('last',result);}
  async duplicateDelivery(){return this.alarm();}
  async snapshot(){return {last:await this.ctx.storage.get('last'),counts:await Promise.all(['revoke','close','restore'].map(async k=>await this.ctx.storage.get(k)||0)),alarm:await this.ctx.storage.getAlarm()};}
 }
 export default {async fetch(request,env){
  const path=new URL(request.url).pathname;
  if(path==='/')return new Response(null,{status:404});
  const closed=path.startsWith('/closed/');const ns=closed?env.CLOSED:env.CLOSURES;
  const stub=ns.get(ns.idFromName(closed?'closed':'own'));
  const method=path.split('/').pop();if(!['arm','status','snapshot','duplicateDelivery'].includes(method))return new Response(null,{status:404});
  return Response.json(await stub[method]()??null);
 }};
 `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',bindings:{CLOSE_AT:String(Date.now()+2000)},script:bundle.outputFiles[0].text,durableObjects:{CLOSURES:{className:'Fixture',useSQLite:true},CLOSED:{className:'IndependentClosure',useSQLite:true}}}));
 try{
  assert.equal((await runtime.dispatchFetch('https://synthetic.invalid')).status,404);
  const call=async path=>{const r=await runtime.dispatchFetch('https://synthetic.invalid'+path);const body=await r.text();assert.equal(r.status,200,body);return JSON.parse(body);};
  assert.deepEqual(await call('/closed/arm'),{state:'unavailable'});assert.deepEqual(await call('/closed/status'),{state:'unavailable'});
  assert.deepEqual(await call('/fixture/arm'),{state:'armed',step:null,attempts:0});await call('/fixture/arm');
  let snapshot;const deadline=Date.now()+8000;
  do{await new Promise(r=>setTimeout(r,50));snapshot=await call('/fixture/snapshot');}while(snapshot.last?.state!=='complete'&&Date.now()<deadline);
  assert.deepEqual(snapshot.last,{state:'complete',step:null,attempts:2});assert.deepEqual(snapshot.counts,[1,1,1]);assert.equal(snapshot.alarm,null);
  await call('/fixture/duplicateDelivery');assert.deepEqual((await call('/fixture/snapshot')).counts,[1,1,1]);
 }finally{await runtime.dispose();}
});
