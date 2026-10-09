import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';

test('native preregistration serializes registration and retains closure history after permanent withdrawal',async()=>{
 const m=manifest(),a={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000});r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:a.identityRef,admissionContract:'server-v1',approval:a});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createPrivateQaPreregistration} from './lib/assistance-private-qa-preregistration.mjs';
 const registration=${JSON.stringify(r)},approval=${JSON.stringify(a)};
 export class Fixture{constructor(ctx){this.storage=ctx.storage;}async fetch(req){
 const path=new URL(req.url).pathname;let clock=registration.provisioning.createdAt;
 const storage=path==='/late'?{transaction:fn=>this.storage.transaction(tx=>fn({get:k=>tx.get(k),put:async(k,v)=>{await tx.put(k,v);clock=registration.plan.closeAt;}}))}:this.storage;
 const h=createPrivateQaPreregistration({storage,readPreregistration:()=>({registration,approval}),now:()=>clock});
 const result=path==='/register'||path==='/late'?await h.register():path==='/withdraw'?await h.withdraw():path==='/closure'?await h.readForClosure():await h.read();
 return Response.json({result,rows:(await this.storage.list()).size});}}
 export default{fetch(req,env){return env.PINS.get(env.PINS.idFromName(new URL(req.url).searchParams.get('id')||'own')).fetch(req);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{PINS:{className:'Fixture',useSQLite:true}}}));
 try{
 const call=async path=>(await runtime.dispatchFetch('https://synthetic.invalid'+path)).json();
 const overlap=await Promise.all([call('/register'),call('/register')]);assert.deepEqual(overlap.map(x=>x.result).sort(),[false,true]);
 assert.deepEqual((await call('/read')).result,{registration:r,approval:a});
 assert.equal((await call('/withdraw')).result,true);assert.equal((await call('/read')).result,null);assert.equal((await call('/register')).result,false);
 assert.deepEqual((await call('/closure')).result,{registration:r,approval:a});assert.equal((await call('/closure')).rows,2);
 assert.deepEqual(await call('/late?id=late'),{result:false,rows:0});
 }finally{await runtime.dispose();}
});
