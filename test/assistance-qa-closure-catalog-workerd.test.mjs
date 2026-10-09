import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native SQLite DO catalog preserves immutable registration and withdrawal across reconstruction',async()=>{
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {computeQaClosureBaselineRef,createQaClosureCatalog} from './lib/assistance-qa-closure-catalog.mjs';
 export class CatalogFixture {
  constructor(ctx){this.storage=ctx.storage;}
  async fetch(request){
   const rawPath=new URL(request.url).pathname,v2=rawPath.startsWith('/v2/'),path=v2?rawPath.slice(3):rawPath;
   const registration={contract:'afw-qa-closure-approval/v1',plan:{occurrenceId:'11111111-1111-4111-8111-111111111111',baselineRef:'a'.repeat(64),closeAt:1000},planRevision:path==='/collision'?2:1,resources:{accountId:'a'.repeat(32),tokenId:'22222222-2222-4222-8222-222222222222',workerName:'afw-own-qa',applicationId:'33333333-3333-4333-8333-333333333333',policyId:'44444444-4444-4444-8444-444444444444'},digests:{token:'b'.repeat(64),settings:'c'.repeat(64),schedules:'d'.repeat(64),policy:'e'.repeat(64)},identity:{name:'owned-qa',metadataDigest:'f'.repeat(64)},provisioning:{creationRef:'1'.repeat(64),custodyRef:'2'.repeat(64),inventoryRef:'3'.repeat(64),createdAt:100,expiresAt:12000}};
   if(v2){registration.contract='afw-qa-closure-approval/v2';registration.approvalDigest='7'.repeat(64);}
   if(path==='/other')registration.plan.occurrenceId='55555555-5555-4555-8555-555555555555';
   if(path.startsWith('/late')){registration.plan.occurrenceId='66666666-6666-4666-8666-666666666666';registration.resources.tokenId='77777777-7777-4777-8777-777777777777';}
   registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
   let clock=200,puts=0;
   const storage=path.startsWith('/late')?{transaction:fn=>this.storage.transaction(tx=>fn({get:k=>tx.get(k),put:async(k,v)=>{await tx.put(k,v);if(++puts===(path==='/late1'?1:2))clock=1000;}}))}:this.storage;
   const catalog=createQaClosureCatalog({storage,registration,now:()=>clock,readProvisioning:async()=>({contract:'afw-qa-provisioning/v2',scope:'own-resource-reservation',recordRef:registration.plan.baselineRef,state:'reserved'})});
   let result;if(path==='/approve'||path==='/collision'||path==='/other'||path.startsWith('/late'))result=await catalog.approve();else if(path==='/revoke')result=await catalog.revoke();else {const r=await catalog.read();result=r?{revision:r.planRevision,baselineRef:r.plan.baselineRef}:null;}
   return Response.json({result,rows:(await this.storage.list()).size});
  }
 }
 export default {fetch(request,env){return env.CATALOG.get(env.CATALOG.idFromName(new URL(request.url).pathname.startsWith('/v2/')?'own-synthetic-v2':'own-synthetic-qa')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{CATALOG:{className:'CatalogFixture',useSQLite:true}}}));
 try{
  for(const prefix of ['', '/v2']){
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+prefix+path);assert.equal(response.status,200);return response.json();};
  assert.deepEqual(await call('/read'),{result:null,rows:0});
  assert.deepEqual(await call('/late1'),{result:false,rows:0});assert.deepEqual(await call('/late2'),{result:false,rows:0});
  assert.deepEqual(await call('/approve'),{result:true,rows:2});
  const registered=await call('/read');assert.equal(registered.result.revision,1);assert.equal(registered.rows,2);
  assert.deepEqual(await call('/collision'),{result:false,rows:2});assert.deepEqual(await call('/read'),registered);
  assert.deepEqual(await call('/other'),{result:false,rows:2});assert.deepEqual(await call('/read'),registered);
  assert.deepEqual(await call('/approve'),{result:true,rows:2});
  assert.deepEqual(await call('/revoke'),{result:true,rows:3});
  assert.deepEqual(await call('/read'),{result:null,rows:3});assert.deepEqual(await call('/approve'),{result:false,rows:3});
  }
 }finally{await runtime.dispose();}
});

