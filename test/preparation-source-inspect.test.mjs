import test from 'node:test';
import assert from 'node:assert/strict';
import {capsulePreparationFixture} from './fixtures/agent-capsule-preparation.mjs';
import {createCapsulePreparationRequestLease} from '../lib/capsule-preparation-request-lease.mjs';
import {createPreparationSourceIntakeStore} from '../lib/preparation-source-intake-store.mjs';
const key='own-inspection-operation-0001',website='https://agentfriendlyweb.dev';
const input=()=>({contract:'agentfriendly.project-create.v1',confirmCreate:true,idempotencyKey:key,website,organization:'AFW own source trial'});
function setup(t){
 const f=capsulePreparationFixture(()=>({}));t.after(()=>f.close());
 f.sql.exec('DELETE FROM delegated_access_grants; DELETE FROM domain_claims; DELETE FROM registry_sites; DELETE FROM project_events; DELETE FROM site_projects;');
 f.wall=Date.now();f.tick=0;f.identities=0;f.identity={subject:'owner-a',email:'owner@example.invalid',expiresAt:f.wall+120000};
 f.profile={profileId:'afw.preparation-source-intake.v1',operationKey:key,subject:'owner-a',startedAt:f.wall-1000,expiresAt:f.wall+300000};
 f.open=()=>{
  const now=()=>f.wall,requestLease=createCapsulePreparationRequestLease({now,monotonic:()=>f.tick});
  const options={enabled:true,profile:{...f.profile},resolveIdentity:async()=>{f.identities++;return f.identity;},createPrimarySession:()=>f.db.withSession('first-primary'),now,requestLease};
  return {options,store:createPreparationSourceIntakeStore(options)};
 };
 f.rows=()=>JSON.stringify({projects:f.sql.prepare('SELECT * FROM site_projects').all(),events:f.sql.prepare('SELECT * FROM project_events').all(),claims:f.sql.prepare('SELECT * FROM domain_claims').all(),grants:f.sql.prepare('SELECT * FROM delegated_access_grants').all(),capsules:f.sql.prepare('SELECT * FROM publication_capsules').all()});
 return f;
}
function closed(r){
 for(const name of ['sourceVerified','consentGranted','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r[name],false);
 assert.equal(Object.isFrozen(r),true);assert.equal(r.domainVerificationRequired,true);
}
test('read-only inspection never turns a status check into another creation attempt',async t=>{
 const probe=setup(t);assert.equal(typeof probe.open().store.inspect,'function','missing read-only source inspection');
 await t.test('absent original stays absent and only SELECT/PRAGMA are prepared',async t=>{
  const f=setup(t),x=f.open(),before=f.rows();let batchReads=0;
  x.options.createPrimarySession=()=>{
   const reader={prepare:query=>{assert.match(query.trim(),/^(SELECT|PRAGMA)\b/i);return f.db.prepare(query);}};
   Object.defineProperty(reader,'batch',{get(){batchReads++;throw Error('write method touched');}});return reader;
  };
  const r=await createPreparationSourceIntakeStore(x.options).inspect(input());closed(r);assert.equal(r.code,'source_not_recorded');assert.equal(r.projectRef,null);assert.equal(r.sourceRecorded,false);
  assert.equal(batchReads,0);assert.equal(f.batches,0);assert.equal(f.writes,0);assert.equal(f.rows(),before);
 });
 await t.test('confirmed original is read without any extra writes or events',async t=>{
  const f=setup(t),created=await f.open().store.create(input()),before=f.rows(),b=f.batches,w=f.writes;
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_already_recorded');assert.equal(r.projectRef,created.projectRef);assert.equal(r.sourceRecorded,true);
  assert.equal(f.batches,b);assert.equal(f.writes,w);assert.equal(f.rows(),before);
 });
 await t.test('lost response after commit can be inspected without a second batch',async t=>{
  const f=setup(t);f.afterBatch=()=>{throw Error('PRIVATE provider detail');};
  assert.equal((await f.open().store.create(input())).code,'unknown_ack');f.afterBatch=null;const before=f.rows(),b=f.batches;
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_already_recorded');assert.equal(f.batches,b);assert.equal(f.rows(),before);assert.doesNotMatch(JSON.stringify(r),/PRIVATE/);
 });
 await t.test('failed dispatch with no commit is observed as absent, not recreated',async t=>{
  const f=setup(t),x=f.open();x.options.createPrimarySession=()=>({prepare:f.db.prepare,batch:async()=>{throw Error('PRIVATE no ACK');}});
  assert.equal((await createPreparationSourceIntakeStore(x.options).create(input())).code,'unknown_ack');const before=f.rows();
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_not_recorded');assert.equal(r.projectRef,null);assert.equal(f.batches,0);assert.equal(f.rows(),before);
 });
 for(const mutate of [
  f=>f.sql.exec("UPDATE site_projects SET notes='later legitimate edit'"),
  f=>f.sql.exec("DELETE FROM project_events"),
  f=>f.sql.exec("UPDATE site_projects SET user_id='other-owner'")
 ])await t.test('changed or partial original is preserved without disclosing a project reference',async t=>{
  const f=setup(t);await f.open().store.create(input());mutate(f);const before=f.rows(),b=f.batches;
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_conflict');assert.equal(r.projectRef,null);assert.equal(f.rows(),before);assert.equal(f.batches,b);
 });
 await t.test('foreign identity cannot inspect and invalid mode fields cannot enable writes',async t=>{
  const f=setup(t);await f.open().store.create(input());const before=f.rows(),b=f.batches;f.identity={...f.identity,subject:'other-owner'};
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_unavailable');assert.equal(r.projectRef,null);
  for(const extra of [{mode:'create'},{write:true},{createAllowed:true}])assert.equal((await f.open().store.inspect({...input(),...extra})).code,'invalid_source_request');
  assert.equal(f.rows(),before);assert.equal(f.batches,b);
 });
 await t.test('original identity expiry, lease and config drift stop inspection without writes',async t=>{
  for(const mode of ['identity','lease','profile']){
   const f=setup(t),x=f.open();x.options.resolveIdentity=async()=>{
    if(mode==='identity')f.wall=f.identity.expiresAt;
    if(mode==='lease')f.tick+=5000;
    if(mode==='profile')x.options.profile.expiresAt++;
    return f.identity;
   };
   const r=await createPreparationSourceIntakeStore(x.options).inspect(input());closed(r);assert.equal(r.code,'source_unavailable');assert.equal(f.batches,0);assert.equal(f.writes,0);
  }
 });
 await t.test('read failure is not retried or converted into a create call',async t=>{
  const f=setup(t);let calls=0;f.before=(query,kind)=>{if(kind==='first'){calls++;throw Error('PRIVATE read failure');}};
  const r=await f.open().store.inspect(input());closed(r);assert.equal(r.code,'source_unavailable');assert.equal(calls,1);assert.equal(f.batches,0);assert.equal(f.writes,0);assert.doesNotMatch(JSON.stringify(r),/PRIVATE/);
 });
});
