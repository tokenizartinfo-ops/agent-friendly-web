import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest,schemas,sqlStatements} from './fixtures/occurrence-operations.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {createOccurrenceOperations} from '../lib/assistance-occurrence-operations.mjs';

test('native primary D1 and SQLite DO actor recover lost administrative PUT across reconstruction',async()=>{
 const m=manifest(),approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {qaAdministrationFixture} from './test/fixtures/qa-administrative-composition.mjs';
 import {computeOccurrencePlanDigest} from './lib/assistance-occurrence-digest.mjs';
 import {computeQaClosureBaselineRef,createQaClosureCatalog} from './lib/assistance-qa-closure-catalog.mjs';
 import {createApprovedQaClosureActor} from './lib/assistance-approved-qa-closure-actor.mjs';
 const approval=${JSON.stringify(approval)},m=approval.manifest;
 async function ownFixture(){
  const f=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000}),r=f.registration;
  r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;
  r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);return f;
 }
 export class CatalogFixture{
  constructor(ctx){this.ctx=ctx;}
  async fetch(request){const f=await ownFixture(),r=f.registration;
   const catalog=createQaClosureCatalog({storage:this.ctx.storage,registration:r,now:()=>m.startAt,readProvisioning:async()=>({contract:'afw-qa-provisioning/v2',scope:'own-resource-reservation',recordRef:r.plan.baselineRef,state:'reserved'})});
   const path=new URL(request.url).pathname;
   return Response.json(path.endsWith('/approve')?await catalog.approve():path.endsWith('/revoke')?await catalog.revoke():await catalog.read());
  }
 }
 export class ActorFixture{
  constructor(ctx,env){this.ctx=ctx;this.env=env;}
  async alarm(){await this.fetch(new Request('https://synthetic.invalid/alarm'));}
  async fetch(request){
   const path=new URL(request.url).pathname,f=await ownFixture(),storage=this.ctx.storage;
   const catalog={read:async()=>{const response=await this.env.CATALOG.get(this.env.CATALOG.idFromName('shared-own-qa')).fetch('https://synthetic.invalid/read');return response.json();}};
   const actor=await createApprovedQaClosureActor({context:this.ctx,db:this.env.DB,catalog,approval,now:()=>path==='/arm'?m.startAt:m.deadline,
    readIdentityCredential:f.options.readIdentityCredential,readAdministrativeCredential:f.options.readAdministrativeCredential,
    fetchImpl:async(url,init)=>{
     if(init.method==='PUT'){await storage.put('put-count',(await storage.get('put-count')||0)+1);await storage.put('provider-disabled',true);throw Error('synthetic acknowledgment lost');}
     await storage.put('get-count',(await storage.get('get-count')||0)+1);
     if(await storage.get('provider-disabled')){f.results.token.enabled=false;f.results.token.updated_at=new Date(m.startAt+2000).toISOString();}
     return f.options.fetchImpl(url,init);
    }
   });
   const result=path==='/arm'?await actor.arm():await actor.alarm();
   return Response.json({result,puts:await storage.get('put-count')||0,gets:await storage.get('get-count')||0});
  }
 }
 export default{fetch(request,env){const binding=new URL(request.url).pathname.startsWith('/catalog/')?env.CATALOG:env.ACTOR;return binding.get(binding.idFromName('shared-own-qa')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{DB:'approved-qa-closure'},durableObjects:{CATALOG:{className:'CatalogFixture',useSQLite:true},ACTOR:{className:'ActorFixture',useSQLite:true}}}));
 try{
  const db=await runtime.getD1Database('DB');
  for(const name of schemas)for(const sql of sqlStatements(readFileSync('worker/operations/'+name+'.sql','utf8')))await db.prepare(sql).run();
  const v2=sqlStatements(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8')),marker=v2.find(s=>s.startsWith('INSERT INTO assistance_occurrence_schema'));
  await db.batch([...v2.filter(s=>s!==marker),marker].map(s=>db.prepare(s)));
  const fence=sqlStatements(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8')),drop=fence.find(s=>s.startsWith('DROP TRIGGER')),pin=fence.find(s=>s.startsWith('INSERT INTO assistance_occurrence_reservation_fence'));
  await db.batch([drop,...fence.filter(s=>s!==drop&&s!==pin),pin].map(s=>db.prepare(s)));
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(m.signal.eventId,m.signal.projectRef,m.signal.revision,m.signal.kind,m.signal.topic,m.signal.observedAt,Date.now()).run();
  const primary=createOccurrenceApprovalCatalog({db});assert.equal(await primary.approve(approval),true);
  const operations=createOccurrenceOperations({db,manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval,readServerAdmission:async()=>({contractVersion:'afw-server-admission-v1',identityRef:approval.identityRef,enrollmentRef:approval.enrollmentRef,serverConfigVersion:approval.serverConfigVersion,planRevision:1,admissionRevision:1,observedAt:Date.now(),schemaVersion:2})});
  assert.equal(await operations.create(),true);
  const call=async path=>{const response=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(response.status,200,response.status===200?'':await response.text());return response.json();};
  assert.equal(await call('/catalog/approve'),true);
  assert.deepEqual(await call('/arm'),{result:{state:'armed',step:null,attempts:0},puts:0,gets:0});
  const first=await call('/alarm');assert.deepEqual(first.result,{state:'intervention_required',step:'restoreAdministration',attempts:1});assert.equal(first.puts,1);
  assert.equal((await primary.read(m.occurrenceId)).revoked,true);
  assert.equal((await db.prepare('SELECT state FROM assistance_occurrence_journal ORDER BY sequence DESC LIMIT 1').first()).state,'stopped');
  const after=await call('/alarm');assert.deepEqual(after.result,{state:'complete',step:null,attempts:2});assert.equal(after.puts,1);assert.equal(after.gets-first.gets,8,'recovery only performs two complete GET passes');
  assert.deepEqual(await call('/alarm'),after);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').first()).n,1);
  assert.equal((await db.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE state='stopped'").first()).n,1);
  assert.equal(await call('/catalog/revoke'),true);assert.deepEqual((await call('/alarm')).result,{state:'unavailable'});
 }finally{await runtime.dispose();}
});
