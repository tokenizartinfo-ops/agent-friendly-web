import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';

test('native SQLite DO preserves single use and rolls back a late challenge write',async()=>{
 const m=manifest(),approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createPrivateCustodyChallenge} from './lib/assistance-private-custody-challenge.mjs';
 const r=${JSON.stringify(r)},a=${JSON.stringify(approval)};
 export class Fixture{
 constructor(ctx){this.storage=ctx.storage;}
 async fetch(request){
 const path=new URL(request.url).pathname;let clock=r.provisioning.createdAt;
 let storage=this.storage;
 if(path==='/late')storage={get:k=>this.storage.get(k),transaction:fn=>this.storage.transaction(tx=>fn({get:k=>tx.get(k),put:async(k,v)=>{await tx.put(k,v);clock=r.plan.closeAt;}}))};
 // Synthetic trusted callbacks exercise lifecycle only, never cloud custody.
 const h=createPrivateCustodyChallenge({storage,now:()=>clock,readInstallation:()=>({registration:r,approval:a}),readServiceIdentity:()=>({principalRef:a.identityRef,expiresAt:r.plan.closeAt})});
 const result=path==='/issue'||path==='/late'?await h.issue():path==='/consume'?await h.consume(await request.json()):path==='/withdraw'?await h.withdraw():await h.status();
 return Response.json({result,rows:(await this.storage.list()).size});
 }}
 export default{fetch(request,env){return env.CHALLENGE.get(env.CHALLENGE.idFromName(new URL(request.url).searchParams.get('id')||'normal')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{CHALLENGE:{className:'Fixture',useSQLite:true}}}));
 try{
 const call=async(path,body)=>{const res=await runtime.dispatchFetch('https://synthetic.invalid'+path,body?{method:'POST',body:JSON.stringify(body)}:undefined);assert.equal(res.status,200);return res.json();};
 const issued=await call('/issue');assert.match(issued.result.nonce,/^[0-9a-f]{64}$/);assert.equal(issued.rows,1);
 const confirmed=await call('/consume',{nonce:issued.result.nonce});assert.equal(confirmed.result.state,'confirmed');
 assert.equal((await call('/consume',{nonce:issued.result.nonce})).result,null);assert.deepEqual(await call('/status'),confirmed);
 assert.equal((await call('/withdraw')).result,true);assert.equal((await call('/status')).result.state,'withdrawn');assert.equal((await call('/issue')).result,null);
 assert.deepEqual(await call('/late?id=late'),{result:null,rows:0});assert.equal((await call('/issue?id=late')).rows,1);
 }finally{await runtime.dispose();}
});
