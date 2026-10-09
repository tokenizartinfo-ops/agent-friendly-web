import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {schemas,sqlStatements,manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';

test('native private reader correlates persisted SQLite DO catalog and primary D1 after reconstruction',async()=>{
 const m=manifest(),approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const admin=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000}),r=admin.registration;
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createPrivateQaCatalogHost} from './lib/assistance-private-qa-catalog-host.mjs';
 import {createQaClosureCatalog} from './lib/assistance-qa-closure-catalog.mjs';
 import {createOccurrenceApprovalCatalog} from './lib/assistance-occurrence-approvals.mjs';
 const r=${JSON.stringify(r)},a=${JSON.stringify(approval)},key='afw-private-qa-catalog/v1:current';
 export class Fixture{
  constructor(ctx,env){this.storage=ctx.storage;this.db=env.DB;}
  async fetch(request){
   const path=new URL(request.url).pathname;
   // Synthetic proof/installation confined to this local test-only Worker.
   let proofs=0;
   const readProvisioning=async()=>{
    if(path==='/race-pointer'&&++proofs===3)await this.storage.delete(key);
    return await this.storage.get('withdrawn')?null:{contract:'afw-qa-provisioning/v1',recordRef:r.plan.baselineRef,state:'exclusive'};
   };
   const catalog=createQaClosureCatalog({storage:this.storage,registration:r,readProvisioning});
   if(path==='/seed'){
    await this.db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(a.manifest.signal.eventId,a.manifest.signal.projectRef,10,'assistance_requested','orientation',a.manifest.signal.observedAt,Date.now()).run();
    if(!await createOccurrenceApprovalCatalog({db:this.db}).approve(a)||!await catalog.approve())throw Error('Synthetic seed failed');
    await this.storage.put(key,{contract:'afw-private-qa-catalog/v1',registration:r});
   }
   if(path==='/revoke-plan')await createOccurrenceApprovalCatalog({db:this.db}).revoke({occurrenceId:a.manifest.occurrenceId,reason:'operator_closed'});
   if(path==='/withdraw-proof')await this.storage.put('withdrawn',true);
   if(path==='/race-pointer')await this.storage.delete('withdrawn');
   if(path==='/withdraw-catalog')await catalog.revoke();
   const h=createPrivateQaCatalogHost({storage:this.storage,db:this.db,readProvisioning});
   return Response.json({registration:await h.read(),approval:await h.readOccurrenceApproval(),rows:(await this.storage.list()).size});
  }
 }
 export default{fetch(request,env){return env.CATALOG.get(env.CATALOG.idFromName('synthetic-private')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:['DB'],durableObjects:{CATALOG:{className:'Fixture',useSQLite:true}}}));
 try{
  const db=await runtime.getD1Database('DB');
  const sources=[...schemas,'assistance-occurrences-v2','assistance-occurrences-v2-reservation-fence'];
  for(const source of sources)for(const sql of sqlStatements(readFileSync('worker/operations/'+source+'.sql','utf8')))await db.prepare(sql).run();
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(response.status,200);return response.json();};
  assert.deepEqual(await call('/read'),{registration:null,approval:null,rows:0});
  const seeded=await call('/seed');assert.deepEqual(seeded.registration,r);assert.deepEqual(seeded.approval,approval);assert.equal(seeded.rows,3);
  assert.deepEqual(await call('/read'),seeded);
  assert.deepEqual(await call('/revoke-plan'),seeded);
  const withdrawn=await call('/withdraw-proof');assert.equal(withdrawn.registration,null);assert.equal(withdrawn.approval,null);assert.equal(withdrawn.rows,4);
  assert.deepEqual(await call('/read'),withdrawn);
  const race=await call('/race-pointer');assert.equal(race.registration,null);assert.equal(race.approval,null);assert.equal(race.rows,2);
  assert.deepEqual(await call('/read'),race);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').first()).n,1);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').first()).n,1);
 }finally{await runtime.dispose();}
});
