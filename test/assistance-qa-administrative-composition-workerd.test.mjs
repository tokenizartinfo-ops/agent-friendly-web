import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native SQLite issued fence recovers administrative PUT loss by GET without replay',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {qaAdministrationFixture} from './test/fixtures/qa-administrative-composition.mjs';
 import {createQaAdministrativeClosureActions} from './lib/assistance-qa-administrative-composition.mjs';
 import {createIndependentClosureCoordinator} from './lib/assistance-independent-closure.mjs';
 export class AdministrativeFixture {
  constructor(ctx){this.storage=ctx.storage;}
  async fetch(request){
   const path=new URL(request.url).pathname,f=await qaAdministrationFixture();
   const options={...f.options,fetchImpl:async(url,init)=>{
    if(init.method==='PUT'){await this.storage.put('put-count',(await this.storage.get('put-count')||0)+1);await this.storage.put('provider-disabled',true);throw Error('synthetic acknowledgment lost');}
    if(await this.storage.get('provider-disabled')){f.results.token.enabled=false;f.results.token.updated_at='2026-10-08T22:00:02Z';}
    return f.options.fetchImpl(url,init);
   }};
   const actions=await createQaAdministrativeClosureActions(options);
   const step=async(name,state)=>{await this.storage.put(name,(await this.storage.get(name)||0)+1);return {verified:true,state};};
   const coordinator=createIndependentClosureCoordinator({storage:this.storage,plan:f.registration.plan,now:options.now,revokePlan:()=>step('revoke-count','revoked'),closeLedger:()=>step('ledger-count','stopped'),...actions});
   const result=path==='/reconcile'?await coordinator.reconcile():await coordinator.tick();
   return Response.json({result,puts:await this.storage.get('put-count')||0,revoke:await this.storage.get('revoke-count')||0,ledger:await this.storage.get('ledger-count')||0});
  }
 }
 export default {fetch(request,env){return env.ADMIN.get(env.ADMIN.idFromName('own-synthetic-administration')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{ADMIN:{className:'AdministrativeFixture',useSQLite:true}}}));
 try{
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(response.status,200);return response.json();};
  const issued={result:{state:'intervention_required',step:'restoreAdministration'},puts:1,revoke:1,ledger:1};
  assert.deepEqual(await call('/tick'),issued);assert.deepEqual(await call('/tick'),issued);
  const done={result:{state:'complete',step:null},puts:1,revoke:1,ledger:1};
  assert.deepEqual(await call('/reconcile'),done);assert.deepEqual(await call('/tick'),done);
 }finally{await runtime.dispose();}
});
