import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {createOccurrenceOperations} from '../lib/assistance-occurrence-operations.mjs';
import {createApprovedQaClosureActor} from '../lib/assistance-approved-qa-closure-actor.mjs';

async function setup(){
 const f=fixture(),m=f.m;
 f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8'));
 f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8'));
 const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 await createOccurrenceApprovalCatalog({db:f.db}).approve(approval);
 const operations=createOccurrenceOperations({db:f.db,manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval,readServerAdmission:async()=>({contractVersion:'afw-server-admission-v1',identityRef:approval.identityRef,enrollmentRef:approval.enrollmentRef,serverConfigVersion:approval.serverConfigVersion,planRevision:1,admissionRevision:1,observedAt:Date.now(),schemaVersion:2})});
 assert.equal(await operations.create(),true);
 const admin=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000}),r=admin.registration;
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;
 r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const data=new Map();let clock=m.startAt,current=r,alarm=null;
 const storage={async transaction(fn){return fn({get:async k=>structuredClone(data.get(k)),put:async(k,v)=>data.set(k,structuredClone(v)),setAlarm:async v=>{alarm=v;},deleteAlarm:async()=>{alarm=null;}});},setAlarm:async v=>{alarm=v;},deleteAlarm:async()=>{alarm=null;}};
 const options={context:{storage,blockConcurrencyWhile:fn=>fn()},db:f.db,approval,catalog:{read:async()=>current?structuredClone(current):null},now:()=>clock,readIdentityCredential:admin.options.readIdentityCredential,readAdministrativeCredential:admin.options.readAdministrativeCredential,fetchImpl:admin.options.fetchImpl};
 return {...f,admin,approval,r,options,data,operations,alarm:()=>alarm,setClock(v){clock=v;admin.setClock(v);},setCurrent(v){current=v;}};
}
test('full approval actor closes actual SQLite journal and recovers lost administrative response without replay',async()=>{
 const f=await setup();try{
 const actor=await createApprovedQaClosureActor(f.options);assert.equal((await actor.arm()).state,'armed');f.setClock(f.m.deadline);f.admin.loseAck();
 assert.deepEqual(await actor.alarm(),{state:'intervention_required',step:'restoreAdministration',attempts:1});
 assert.equal((await createOccurrenceApprovalCatalog({db:f.db}).read(f.m.occurrenceId)).revoked,true);
 assert.equal(f.a.prepare('SELECT state FROM assistance_occurrence_journal ORDER BY sequence DESC LIMIT 1').get().state,'stopped');
 const fresh=await createApprovedQaClosureActor(f.options);assert.deepEqual(await fresh.alarm(),{state:'complete',step:null,attempts:2});
 assert.equal(f.admin.calls.filter(c=>c.method==='PUT').length,1);assert.equal(f.alarm(),null);
 }finally{f.cleanup();}
});
test('completed D1 journal is preserved while administrative closure completes',async()=>{
 const f=await setup();try{
 assert.deepEqual(await f.operations.list({expectedSequence:1}),[f.m.signal]);assert.equal(await f.operations.admit({expectedSequence:2,phase:'claim'}),true);assert.ok(await f.operations.claim({expectedSequence:3}));assert.equal(await f.operations.admit({expectedSequence:4,phase:'finish'}),true);assert.equal(await f.operations.finish({expectedSequence:5}),'intervention_required');
 const before=f.a.prepare('SELECT * FROM assistance_occurrence_journal ORDER BY sequence').all();
 const actor=await createApprovedQaClosureActor(f.options);await actor.arm();f.setClock(f.m.deadline);assert.deepEqual(await actor.alarm(),{state:'complete',step:null,attempts:1});
 assert.deepEqual(f.a.prepare('SELECT * FROM assistance_occurrence_journal ORDER BY sequence').all(),before);
 }finally{f.cleanup();}
});
test('changed catalog baseline cannot replace the initially pinned resources',async()=>{
 const f=await setup();try{
 const actor=await createApprovedQaClosureActor(f.options);await actor.arm();
 const changed=structuredClone(f.r);changed.resources.workerName='afw-other-qa';changed.plan.baselineRef=await computeQaClosureBaselineRef(changed);f.setCurrent(changed);f.setClock(f.m.deadline);
 assert.equal((await actor.alarm()).state,'intervention_required');assert.equal(f.admin.calls.length,0);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').get().n,0);
 }finally{f.cleanup();}
});
test('foreign complete approval or V1 record never arms or writes',async()=>{
 const f=await setup();try{
 for(const mutate of [a=>a.identityRef='1'.repeat(64),a=>a.enrollmentRef='1'.repeat(64),a=>a.manifest.sourceRevision='1'.repeat(40),a=>a.manifest.publicationId='cecfgver_other']){const a=structuredClone(f.approval);mutate(a);assert.deepEqual(await(await createApprovedQaClosureActor({...f.options,approval:a})).arm(),{state:'unavailable'});}
 const old=structuredClone(f.r);old.contract='afw-qa-closure-approval/v1';delete old.approvalDigest;old.plan.baselineRef=await computeQaClosureBaselineRef(old);f.setCurrent(old);
 assert.deepEqual(await(await createApprovedQaClosureActor(f.options)).arm(),{state:'unavailable'});assert.equal(f.data.size,0);assert.equal(f.admin.calls.length,0);
 }finally{f.cleanup();}
});
test('withdrawal during primary D1 lookup denies the following revocation write',async()=>{
 const f=await setup();try{
 let withdraw=false;
 const db={batch:ss=>f.db.batch(ss),prepare(sql){const stmt=f.db.prepare(sql);return {first:()=>stmt.first(),bind(...args){const bound=stmt.bind(...args);return {run:()=>bound.run(),async first(){const row=await bound.first();if(withdraw&&sql.startsWith('SELECT * FROM assistance_occurrence_approved_plans'))f.setCurrent(null);return row;}};}};}};
 const actor=await createApprovedQaClosureActor({...f.options,db});await actor.arm();withdraw=true;f.setClock(f.m.deadline);
 assert.equal((await actor.alarm()).state,'intervention_required');assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').get().n,0);assert.equal(f.admin.calls.length,0);
 }finally{f.cleanup();}
});
test('withdrawal during identity custody prevents actual provider dispatch',async()=>{
 const f=await setup();try{
 const actor=await createApprovedQaClosureActor({...f.options,readIdentityCredential:async()=>{f.setCurrent(null);return 'synthetic-placeholder';}});await actor.arm();f.setClock(f.m.deadline);
 assert.deepEqual(await actor.alarm(),{state:'intervention_required',step:'restoreAdministration',attempts:1});assert.equal(f.admin.calls.length,0);
 }finally{f.cleanup();}
});
test('authority timeout returns unavailable and late reads cannot arm or write',async()=>{
 const f=await setup();try{
 let resolve;const pending=new Promise(r=>{resolve=r;});
 const actor=await createApprovedQaClosureActor({...f.options,catalog:{read:()=>pending},authorizationTimeoutMs:10});assert.deepEqual(await actor.arm(),{state:'unavailable'});
 resolve(f.r);await new Promise(r=>setTimeout(r,20));assert.equal(f.data.size,0);assert.equal(f.admin.calls.length,0);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').get().n,0);
 }finally{f.cleanup();}
});
