import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';

test('native spontaneous alarms preserve a finite authority recovery budget across host reconstruction',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createApprovedQaClosureHost} from './lib/assistance-approved-qa-closure-host.mjs';
 export class HostFixture{
  constructor(ctx){this.ctx=ctx;}
  async alarm(){
   // No approval or provider: this probes native alarm delivery/recovery only.
   const host=createApprovedQaClosureHost({context:this.ctx,readApproval:async()=>null});
   await this.ctx.storage.put('result',await host.alarm());
  }
  async fetch(request){
   const storage=this.ctx.storage;
   if(new URL(request.url).pathname==='/seed'){
    const plan={occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:Date.now()+250};
    // Explicit synthetic local fixture, not catalog/provisioning evidence.
    await storage.put('afw-closure-alarm-lifecycle-v1',{plan,state:'armed',step:null,attempts:0});await storage.setAlarm(plan.closeAt);
   }
   return Response.json({result:await storage.get('result')??null,lifecycle:await storage.get('afw-closure-alarm-lifecycle-v1')??null,recovery:await storage.get('afw-closure-authority-recovery-v1')??null,alarm:await storage.getAlarm()});
  }
 }
 export default{fetch(request,env){return env.HOST.get(env.HOST.idFromName('synthetic-own')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{HOST:{className:'HostFixture',useSQLite:true}}}));
 try{
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(response.status,200);return response.json();};
  assert.deepEqual(await call('/snapshot'),{result:null,lifecycle:null,recovery:null,alarm:null});
  assert.equal((await call('/seed')).lifecycle.state,'armed');
  let snapshot;const deadline=Date.now()+10000;
  do{await new Promise(resolve=>setTimeout(resolve,100));snapshot=await call('/snapshot');}while(snapshot.recovery?.count!==3&&Date.now()<deadline);
  assert.equal(snapshot.recovery?.count,3);assert.equal(snapshot.alarm,null);
  assert.equal(snapshot.lifecycle.state,'intervention_required');assert.equal(snapshot.lifecycle.attempts,0);
  assert.deepEqual(snapshot.result,{state:'intervention_required',step:null,attempts:0});
 }finally{await runtime.dispose();}
});
