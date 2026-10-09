import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {fixture} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {createOccurrenceOperations} from '../lib/assistance-occurrence-operations.mjs';
import {createApprovedQaClosureHost} from '../lib/assistance-approved-qa-closure-host.mjs';

async function setup(){
 const f=fixture(),m=f.m;
 f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8'));
 f.a.exec(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8'));
 const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 await createOccurrenceApprovalCatalog({db:f.db}).approve(approval);
 const ops=createOccurrenceOperations({db:f.db,manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval,now:()=>f.a.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) t").get().t,readServerAdmission:async()=>({contractVersion:'afw-server-admission-v1',identityRef:approval.identityRef,enrollmentRef:approval.enrollmentRef,serverConfigVersion:approval.serverConfigVersion,planRevision:1,admissionRevision:1,observedAt:f.a.prepare("SELECT CAST(unixepoch('subsec')*1000 AS INTEGER) t").get().t,schemaVersion:2})});
 assert.equal(await ops.create(),true);
 const admin=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000}),r=admin.registration;
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;
 r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const data=new Map();let clock=m.startAt,current=r,approved=approval,alarm=null,reads=0;
 const storage={transaction:async fn=>fn({get:async k=>structuredClone(data.get(k)),put:async(k,v)=>data.set(k,structuredClone(v)),setAlarm:async v=>{alarm=v;},deleteAlarm:async()=>{alarm=null;}}),setAlarm:async v=>{alarm=v;},deleteAlarm:async()=>{alarm=null;}};
 const options={context:{storage,blockConcurrencyWhile:fn=>fn()},db:f.db,readApproval:async()=>{reads++;return structuredClone(approved);},catalog:{read:async()=>structuredClone(current)},now:()=>clock,readIdentityCredential:admin.options.readIdentityCredential,readAdministrativeCredential:admin.options.readAdministrativeCredential,fetchImpl:admin.options.fetchImpl};
 return {...f,options,admin,data,alarm:()=>alarm,reads:()=>reads,consumeAlarm(){alarm=null;},setClock(v){clock=v;},restore(){current=r;approved=approval;},withdraw(){current=null;approved=null;}};
}

test('host rereads authority and reconstructs closure without replaying an issued PUT',async()=>{
 const f=await setup();try{
 const first=createApprovedQaClosureHost(f.options);assert.equal((await first.arm()).state,'armed');assert.equal(f.alarm(),f.m.deadline);
 f.setClock(f.m.deadline);f.admin.loseAck();assert.equal((await first.alarm()).state,'intervention_required');
 const recovered=createApprovedQaClosureHost(f.options);assert.deepEqual(await recovered.alarm(),{state:'complete',step:null,attempts:2});
 assert.equal(f.admin.calls.filter(c=>c.method==='PUT').length,1);assert.equal(f.alarm(),null);assert.equal(f.reads(),3);
 assert.equal((await createOccurrenceApprovalCatalog({db:f.db}).read(f.m.occurrenceId)).revoked,true);
 assert.equal(f.a.prepare('SELECT state FROM assistance_occurrence_journal ORDER BY sequence DESC LIMIT 1').get().state,'stopped');
 }finally{f.cleanup();}
});

test('host withdrawal after arm prevents credentials and all closure writes',async()=>{
 const f=await setup();try{
 const host=createApprovedQaClosureHost(f.options);await host.arm();f.withdraw();f.setClock(f.m.deadline);
 assert.deepEqual(await host.alarm(),{state:'unavailable'});assert.equal(f.admin.calls.length,0);
 assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').get().n,0);
 }finally{f.cleanup();}
});

test('host cannot take approval from caller arguments and missing private reader stays closed',async()=>{
 const f=await setup();try{
 const host=createApprovedQaClosureHost({...f.options,readApproval:undefined});
 assert.deepEqual(await host.arm({approval:f.options.approval}),{state:'unavailable'});assert.equal(f.data.size,0);assert.equal(f.admin.calls.length,0);
 }finally{f.cleanup();}
});

test('private approval timeout and late resolution cannot arm',async()=>{
 const f=await setup();try{
 let release;const pending=new Promise(resolve=>{release=resolve;});
 const host=createApprovedQaClosureHost({...f.options,readApproval:()=>pending,authorizationTimeoutMs:10});
 assert.deepEqual(await host.arm(),{state:'unavailable'});release({});await new Promise(resolve=>setTimeout(resolve,20));
 assert.equal(f.data.size,0);assert.equal(f.admin.calls.length,0);
 }finally{f.cleanup();}
});

test('consumed alarm with unavailable authority schedules bounded persistent recovery only for an armed plan',async()=>{
 const f=await setup();try{
 await createApprovedQaClosureHost(f.options).arm();f.withdraw();
 for(let i=0;i<3;i++){
  f.consumeAlarm();f.setClock(f.m.deadline+i*1000);
  const result=await createApprovedQaClosureHost(f.options).alarm();
  assert.equal(result.state,i===2?'intervention_required':'unavailable');
  assert.equal(f.alarm(),i===2?null:f.m.deadline+(i+1)*1000);
 }
 f.consumeAlarm();assert.equal((await createApprovedQaClosureHost(f.options).alarm()).state,'intervention_required');assert.equal(f.alarm(),null);
 assert.equal(f.admin.calls.length,0);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations').get().n,0);
 }finally{f.cleanup();}
});

test('unavailable alarm on a never armed host does not create state or schedule',async()=>{
 const f=await setup();try{
 f.withdraw();assert.deepEqual(await createApprovedQaClosureHost(f.options).alarm(),{state:'unavailable'});
 assert.equal(f.data.size,0);assert.equal(f.alarm(),null);
 }finally{f.cleanup();}
});

test('fresh host closes after temporary authority outage without duplicate administration',async()=>{
 const f=await setup();try{
 await createApprovedQaClosureHost(f.options).arm();f.withdraw();f.consumeAlarm();f.setClock(f.m.deadline);
 assert.equal((await createApprovedQaClosureHost(f.options).alarm()).state,'unavailable');assert.equal(f.alarm(),f.m.deadline+1000);
 f.restore();f.consumeAlarm();f.setClock(f.m.deadline+1000);
 assert.equal((await createApprovedQaClosureHost(f.options).alarm()).state,'complete');assert.equal(f.alarm(),null);
 assert.equal(f.admin.calls.filter(c=>c.method==='PUT').length,1);
 }finally{f.cleanup();}
});
