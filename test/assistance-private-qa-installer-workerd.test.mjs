import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {schemas,sqlStatements,manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
test('native installer commits durable authority, reconstructs and rolls back a late DO pointer write',async()=>{
 const m=manifest(),approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createPrivateQaInstaller} from './lib/assistance-private-qa-installer.mjs';
 import {createPrivateQaCatalogHost} from './lib/assistance-private-qa-catalog-host.mjs';
 const r=${JSON.stringify(r)},a=${JSON.stringify(approval)},key='afw-private-qa-catalog/v1:current';
 export class Fixture{
 constructor(ctx,env){this.storage=ctx.storage;this.db=env.DB;}
 async fetch(request){
 const path=new URL(request.url).pathname;let clock=r.provisioning.createdAt;
 const options={storage:this.storage,db:this.db,now:()=>clock,
 // Test-only synthetic administrative input, never production provisioning.
 readInstallation:async()=>({registration:r,approval:a}),readProvisioning:async()=>({contract:'afw-qa-provisioning/v1',recordRef:r.plan.baselineRef,state:'exclusive'})};
 if(path==='/late')options.storage={get:k=>this.storage.get(k),transaction:fn=>this.storage.transaction(tx=>fn({get:k=>tx.get(k),put:async(k,v)=>{await tx.put(k,v);if(k===key)clock=r.plan.closeAt;}}))};
 const status=path==='/read'?null:await createPrivateQaInstaller(options).install();
 const reader=createPrivateQaCatalogHost({...options,now:()=>r.provisioning.createdAt});
 return Response.json({status,registration:await reader.read(),approval:await reader.readOccurrenceApproval(),rows:(await this.storage.list()).size});
 }}
 export default{fetch(request,env){return env.CATALOG.get(env.CATALOG.idFromName('synthetic-private')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 for(const mode of ['normal','late']){
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:['DB'],durableObjects:{CATALOG:{className:'Fixture',useSQLite:true}}}));
 try{
 const db=await runtime.getD1Database('DB');for(const s of [...schemas,'assistance-occurrences-v2','assistance-occurrences-v2-reservation-fence'])for(const sql of sqlStatements(readFileSync('worker/operations/'+s+'.sql','utf8')))await db.prepare(sql).run();
 await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(m.signal.eventId,m.signal.projectRef,10,'assistance_requested','orientation',m.signal.observedAt,Date.now()).run();
 const call=async path=>{const res=await runtime.dispatchFetch('https://synthetic.invalid'+path);assert.equal(res.status,200);return res.json();};
 const installed=await call(mode==='normal'?'/install':'/late');
 if(mode==='normal'){assert.equal(installed.status,'installed');assert.deepEqual(installed.registration,r);assert.deepEqual(installed.approval,approval);assert.equal(installed.rows,4);assert.deepEqual(await call('/install'),installed);const read=await call('/read');assert.deepEqual(read,{...installed,status:null});}
 else{assert.deepEqual(installed,{status:'unavailable',registration:null,approval:null,rows:1});assert.deepEqual(await call('/install'),installed);assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').first()).n,1);}
 assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_approved_plans').first()).n,1);
 }finally{await runtime.dispose();}}
});
