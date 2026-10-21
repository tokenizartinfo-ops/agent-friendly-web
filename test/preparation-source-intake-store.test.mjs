import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {capsulePreparationFixture} from './fixtures/agent-capsule-preparation.mjs';
import {createCapsulePreparationRequestLease} from '../lib/capsule-preparation-request-lease.mjs';
const website='https://agentfriendlyweb.dev',key='own-source-operation-0001';
const input=()=>({contract:'agentfriendly.project-create.v1',confirmCreate:true,idempotencyKey:key,website,organization:'AFW own source trial'});
test('isolated own-source intake writes facts without verified claims or authority',async t=>{
 let source;try{source=await readFile('lib/preparation-source-intake-store.mjs','utf8');}catch(e){if(e.code!=='ENOENT')throw e;}
 assert.ok(source,'missing own-source intake store');
 const {createPreparationSourceIntakeStore:factory}=await import('../lib/preparation-source-intake-store.mjs');
 function setup(t){
  const f=capsulePreparationFixture(()=>({}));t.after(()=>f.close());
  f.sql.exec('DELETE FROM delegated_access_grants; DELETE FROM domain_claims; DELETE FROM registry_sites; DELETE FROM project_events; DELETE FROM site_projects;');
  f.wall=Date.now();f.tick=0;f.identities=0;f.identity={subject:'owner-a',email:'owner@example.invalid',expiresAt:f.wall+120000};
  f.profile={profileId:'afw.preparation-source-intake.v1',operationKey:key,subject:'owner-a',startedAt:f.wall-1000,expiresAt:f.wall+300000};
  f.open=()=>{const now=()=>f.wall,requestLease=createCapsulePreparationRequestLease({now,monotonic:()=>f.tick});
   const options={enabled:true,profile:{...f.profile},resolveIdentity:async()=>{f.identities++;return f.identity;},createPrimarySession:()=>f.db.withSession('first-primary'),now,requestLease};
   return {options,store:factory(options)};
  };
  f.rows=()=>({projects:f.sql.prepare('SELECT count(*) n FROM site_projects').get().n,events:f.sql.prepare('SELECT count(*) n FROM project_events').get().n,
   claims:f.sql.prepare('SELECT count(*) n FROM domain_claims').get().n,sites:f.sql.prepare('SELECT count(*) n FROM registry_sites').get().n,
   grants:f.sql.prepare('SELECT count(*) n FROM delegated_access_grants').get().n,capsules:f.sql.prepare('SELECT count(*) n FROM publication_capsules').get().n});
  return f;
 }
 function closed(r){for(const k of ['sourceVerified','consentGranted','authorizationGranted','operationalReadiness','executionAllowed','chargeAllowed','publicationAllowed'])assert.equal(r[k],false);assert.equal(r.domainVerificationRequired,true);assert.equal(Object.isFrozen(r),true);}
 await t.test('native creation binds verified subject/email, descriptive role default, pending domain and one receipt',async t=>{
  const f=setup(t),r=await f.open().store.create(input());closed(r);assert.equal(r.code,'source_created');assert.equal(r.sourceRecorded,true);assert.match(r.projectRef,/^project-[a-f0-9]{64}$/);
  const p=f.sql.prepare('SELECT * FROM site_projects').get();assert.equal(p.id,r.projectRef);assert.equal(p.user_id,'owner-a');assert.equal(p.owner_email,'owner@example.invalid');
  assert.equal(p.role,'');assert.equal(p.control,'unknown');assert.equal(p.revision,1);assert.equal(p.website,website+'/');assert.equal(p.organization,input().organization);
  assert.deepEqual(f.rows(),{projects:1,events:1,claims:0,sites:0,grants:0,capsules:0});assert.equal(f.batches,1);
  const e=f.sql.prepare('SELECT * FROM project_events').get();assert.equal(e.type,'project_created');assert.equal(JSON.parse(e.payload_json).purpose,'own-preparation-trial');
  assert.ok(f.sessionModes.every(x=>x==='first-primary'));
 });
 await t.test('same original operation is read-only on replay, normalized root slash is equivalent',async t=>{
  const f=setup(t),first=await f.open().store.create(input()),b=f.batches,w=f.writes;
  const r=await f.open().store.create({...input(),website:website+'/'});closed(r);assert.equal(r.code,'source_already_recorded');assert.equal(r.projectRef,first.projectRef);assert.equal(f.batches,b);assert.equal(f.writes,w);
 });
 await t.test('same key with changed request or renewed profile cannot overwrite the original',async t=>{
  const f=setup(t);await f.open().store.create(input());const before=JSON.stringify(f.sql.prepare('SELECT * FROM site_projects').get()),b=f.batches;
  for(const changed of [{...input(),organization:'changed'}]){const r=await f.open().store.create(changed);closed(r);assert.equal(r.code,'source_conflict');assert.equal(r.projectRef,null);}
  f.profile.expiresAt+=1000;const r=await f.open().store.create(input());assert.equal(r.code,'source_conflict');assert.equal(f.batches,b);assert.equal(JSON.stringify(f.sql.prepare('SELECT * FROM site_projects').get()),before);
 });
 await t.test('edited source is preserved rather than rewound by replay',async t=>{
  const f=setup(t);await f.open().store.create(input());f.sql.exec("UPDATE site_projects SET notes='legitimate later edit'");const r=await f.open().store.create(input());
  closed(r);assert.equal(r.code,'source_conflict');assert.equal(f.batches,1);assert.equal(f.sql.prepare('SELECT notes FROM site_projects').get().notes,'legitimate later edit');
 });
 await t.test('foreign verified identity never writes or discloses the profile record',async t=>{
  const f=setup(t);f.identity={...f.identity,subject:'other-owner'};const r=await f.open().store.create(input());closed(r);assert.equal(r.code,'source_unavailable');assert.equal(r.projectRef,null);
  assert.equal(f.batches,0);assert.equal(f.primaries,0);
 });
 const bad=[{confirmCreate:false},{idempotencyKey:'other-operation-0001'},{owner:'other-owner'},{role:'owner'},{verified:true},{claimId:'old-claim'},
  {website:'https://example.org'},{website:website+'/private'},{website:website+'?x=1'},{website:'https://secret@agentfriendlyweb.dev'},{organization:''},{organization:'x'.repeat(201)}];
 for(let i=0;i<bad.length;i++)await t.test('invalid/untrusted input '+i+' never resolves identity or writes',async t=>{
  const f=setup(t),r=await f.open().store.create({...input(),...bad[i]});closed(r);assert.equal(r.code,'invalid_source_request');assert.equal(r.projectRef,null);assert.equal(f.identities,0);assert.equal(f.batches,0);
 });
 await t.test('accessors, unsupported profile and disabled factory cannot invoke dependencies',async t=>{
  let calls=0;const o={enabled:false,get profile(){calls++;throw Error('private');}};assert.equal(factory(o),null);assert.equal(calls,0);
  const f=setup(t),{store}=f.open(),p=input();Object.defineProperty(p,'organization',{enumerable:true,get(){calls++;throw Error('private');}});
  const r=await store.create(p);assert.equal(r.code,'invalid_source_request');assert.equal(calls,0);assert.equal(f.identities,0);
  const x=f.open();x.options.profile.expiresAt=x.options.profile.startedAt+600001;assert.equal(factory(x.options),null);
 });
 await t.test('a pre-existing project without this receipt cannot be adopted even with same display facts',async t=>{
  const f=setup(t);const {createHash}=await import('node:crypto');const id='project-'+createHash('sha256').update(JSON.stringify(['project-create-v1','owner-a',key])).digest('hex');
  const at=new Date(f.wall).toISOString();f.sql.prepare('INSERT INTO site_projects(id,user_id,owner_email,website,organization,created_at,updated_at) VALUES(?,?,?,?,?,?,?)').run(id,'other-owner','other@example.invalid',website+'/',input().organization,at,at);
  const r=await f.open().store.create(input());closed(r);assert.equal(r.code,'source_conflict');assert.equal(r.projectRef,null);assert.equal(f.batches,0);assert.equal(f.rows().events,0);
  assert.equal(f.sql.prepare('SELECT user_id FROM site_projects').get().user_id,'other-owner');
 });
 await t.test('ACK loss after commit stays unknown; explicit exact replay reads one durable original',async t=>{
  const f=setup(t);let lost=false;f.afterBatch=()=>{if(!lost){lost=true;throw Error('private provider details');}};
  const r=await f.open().store.create(input());closed(r);assert.equal(r.code,'unknown_ack');assert.equal(r.projectRef,null);assert.equal(f.batches,1);assert.equal(f.rows().projects,1);
  f.afterBatch=null;const reconciled=await f.open().store.create(input());closed(reconciled);assert.equal(reconciled.code,'source_already_recorded');assert.equal(f.batches,1);assert.equal(f.rows().events,1);
  assert.doesNotMatch(JSON.stringify(r),/private|provider/);
 });
 await t.test('original request lifetime and identity expiry are not renewed across waits',async t=>{
  const f=setup(t),x=f.open();x.options.resolveIdentity=async()=>{f.tick+=5000;return f.identity;};const a=factory(x.options);
  assert.equal((await a.create(input())).code,'source_unavailable');assert.equal(f.batches,0);
  const g=setup(t),y=g.open();y.options.resolveIdentity=async()=>{g.wall=g.identity.expiresAt;return g.identity;};const b=factory(y.options);
  assert.equal((await b.create(input())).code,'source_unavailable');assert.equal(g.batches,0);
 });
 await t.test('expired window and profile drift deny before dispatch',async t=>{
  const f=setup(t),x=f.open();x.options.resolveIdentity=async()=>{x.options.profile.expiresAt+=1;return f.identity;};const a=factory(x.options);
  assert.equal((await a.create(input())).code,'source_unavailable');assert.equal(f.batches,0);
  const g=setup(t);g.wall=g.profile.expiresAt;assert.equal(g.open().store,null);
 });
 await t.test('concurrent identical operations produce one project and event',async t=>{
  const f=setup(t),a=f.open().store,b=f.open().store;const r=await Promise.all([a.create(input()),b.create(input())]);r.forEach(closed);
  assert.ok(r.every(x=>['source_created','source_already_recorded'].includes(x.code)));assert.equal(r[0].projectRef,r[1].projectRef);
  assert.deepEqual(f.rows(),{projects:1,events:1,claims:0,sites:0,grants:0,capsules:0});
 });
});
