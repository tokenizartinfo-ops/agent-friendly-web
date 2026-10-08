import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native Durable Object transactions persist closure and prevent reissuing an ambiguous capability',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createIndependentClosureCoordinator} from './lib/assistance-independent-closure.mjs';
 export class ClosureFixture {
  constructor(ctx){this.storage=ctx.storage;}
  async alarm(){const response=await this.fetch(new Request('https://synthetic.invalid/alarm-run'));const alarmCount=(await this.storage.get('alarm-count')||0)+1;await this.storage.put('alarm-count',alarmCount);await this.storage.put('alarm-result',{...await response.json(),alarmCount});}
  async fetch(request){
   const path=new URL(request.url).pathname;
   if(path==='/arm'){await this.storage.setAlarm(Date.now()+100);return Response.json({armed:true});}
   if(path==='/snapshot')return Response.json(await this.storage.get('alarm-result')||{pending:true});
   const lost=new URL(request.url).pathname==='/lost';
   const action=async(step,state)=>{const count=await this.storage.get(step)||0;await this.storage.put(step,count+1);if(lost&&step==='revokePlan')throw Error('synthetic lost response');return {verified:true,state};};
   const coordinator=createIndependentClosureCoordinator({storage:this.storage,plan:{occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000},now:()=>1000,revokePlan:()=>action('revokePlan','revoked'),closeLedger:()=>action('closeLedger','completed'),restoreAdministration:()=>action('restoreAdministration','restored')});
   const result=await coordinator.tick();const counts=[];for(const name of ['revokePlan','closeLedger','restoreAdministration'])counts.push(await this.storage.get(name)||0);return Response.json({result,counts});
  }
 }
 export default {fetch(request,env){const name=new URL(request.url).pathname;return env.CLOSURES.get(env.CLOSURES.idFromName(name)).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{CLOSURES:{className:'ClosureFixture',useSQLite:true}}}));
 try{
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(response.status,200);return response.json();};
  assert.deepEqual(await call('/ok'),{result:{state:'complete',step:null},counts:[1,1,1]});
  assert.deepEqual(await call('/ok'),{result:{state:'complete',step:null},counts:[1,1,1]});
  assert.deepEqual(await call('/lost'),{result:{state:'intervention_required',step:'revokePlan'},counts:[1,0,0]});
  assert.deepEqual(await call('/lost'),{result:{state:'intervention_required',step:'revokePlan'},counts:[1,0,0]});
  const ns=await runtime.getDurableObjectNamespace('CLOSURES');const stub=ns.get(ns.idFromName('own-synthetic-alarm'));
  assert.deepEqual(await (await stub.fetch('https://synthetic.invalid/arm')).json(),{armed:true});
  let observation={pending:true};const deadline=Date.now()+5000;
  while(observation.pending&&Date.now()<deadline){await new Promise(r=>setTimeout(r,50));observation=await(await stub.fetch('https://synthetic.invalid/snapshot')).json();}
  assert.deepEqual(observation,{result:{state:'complete',step:null},counts:[1,1,1],alarmCount:1});
  // Second actual alarm invocation cannot repeat the three synthetic effects.
  await stub.fetch('https://synthetic.invalid/arm');const secondDeadline=Date.now()+5000;
  let second=observation;
  while(second.alarmCount<2&&Date.now()<secondDeadline){await new Promise(r=>setTimeout(r,50));second=await(await stub.fetch('https://synthetic.invalid/snapshot')).json();}
  assert.deepEqual(second,{...observation,alarmCount:2});
 }finally{await runtime.dispose();}
});
