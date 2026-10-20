import test from 'node:test';
import assert from 'node:assert/strict';
import {createCapsulePreparationRequestLease} from '../lib/capsule-preparation-request-lease.mjs';
import {createDelegatedOAuthStore} from '../lib/delegated-oauth-store.mjs';
import {preparationConsentStoreFixture} from './fixtures/preparation-consent-store.mjs';
const consentModule=await import('../lib/delegated-preparation-consent-store.mjs').catch(()=>null);
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
function factory(){assert.equal(typeof consentModule?.createDelegatedPreparationConsentStore,'function','missing closed preparation consent store');return consentModule.createDelegatedPreparationConsentStore;}
function setup(t){const f=preparationConsentStoreFixture(factory());t.after(()=>f.close());return f;}
const choose=(f,decision='drafts')=>({...f.ref,decision});
async function begin(f){const r=await f.open().store.begin(f.beginInput);assert.equal(r.code,'consent_pending');return r;}
const readyStore=f=>{const store=f.open().store;assert.ok(store);return store;};
test('default closed configuration never evaluates dependency accessors',()=>{
 const create=factory();let calls=0;const options={enabled:false};
 Object.defineProperty(options,'createPrimarySession',{get(){calls++;throw Error('private');},enumerable:true});
 assert.equal(create(options),null);assert.equal(create(),null);assert.equal(calls,0);
});
test('begin persists original explicit profile and dates without an application grant',async t=>{
 const f=setup(t),old=JSON.stringify(f.original());const r=await begin(f),row=f.row();
 assert.equal(row.profile_id,'afw.preparation-consent.v1');assert.equal(row.request_hash,'b'.repeat(64));
 assert.equal(row.transaction_started_at,f.beginInput.transactionStartedAt);assert.equal(row.transaction_expires_at,f.beginInput.transactionExpiresAt);
 assert.equal(row.trial_started_at,f.profile.trialStartedAt);assert.equal(row.trial_expires_at,f.profile.trialExpiresAt);
 assert.equal(row.state,'pending');assert.equal(row.decision,'');assert.equal(f.newGrants().length,0);
 assert.equal(r.applicationGrantStored,false);assert.equal(r.authorizationCodeIssued,false);assert.equal(r.tokenIssued,false);
 assert.equal(JSON.stringify(f.original()),old);
});
test('identical begin only reads original state and cannot replace identity or renew expiry',async t=>{
 const f=setup(t);await begin(f);const first=JSON.stringify(f.row()),writes=f.writes;
 f.wall+=1000;f.tick+=1000;assert.equal((await readyStore(f).begin({...f.beginInput})).code,'consent_pending');
 assert.equal(f.writes,writes);assert.equal(JSON.stringify(f.row()),first);
 const changed=await readyStore(f).begin({...f.beginInput,transactionExpiresAt:f.beginInput.transactionExpiresAt+1000});
 assert.equal(changed.code,'consent_conflict');assert.equal(JSON.stringify(f.row()),first);
});
test('explicit read choice atomically stores only reading and original bounded expiry',async t=>{
 const f=setup(t);await begin(f);f.wall+=2000;f.tick+=2000;
 const r=await readyStore(f).decide(choose(f,'read')),g=f.newGrants()[0];
 assert.equal(r.code,'decision_saved');assert.equal(r.freshDecision,true);assert.deepEqual(r.scopes,[READ]);
 assert.equal(f.row().state,'admitted');assert.equal(f.newGrants().length,1);assert.deepEqual(JSON.parse(g.scopes_json),[READ]);
 assert.equal(Date.parse(g.expires_at),f.beginInput.transactionExpiresAt);assert.equal(r.expiresAt,f.beginInput.transactionExpiresAt);
 assert.equal(g.exchanged_at,'');assert.equal(g.revoked_at,'');assert.equal(r.refreshAllowed,false);assert.equal(r.tokenIssued,false);
});
test('draft decision admits the exact original set and retains the earlier trial end',async t=>{
 const f=setup(t);f.profile.trialExpiresAt=f.wall+60000;await begin(f);
 const r=await readyStore(f).decide(choose(f));assert.equal(r.code,'decision_saved');
 assert.deepEqual(r.scopes,[READ,DRAFTS]);assert.deepEqual(JSON.parse(f.newGrants()[0].scopes_json),[READ,DRAFTS]);
 assert.equal(r.expiresAt,f.profile.trialExpiresAt);assert.equal(Date.parse(f.newGrants()[0].expires_at),f.profile.trialExpiresAt);
});
test('read-only original request cannot be upgraded or receive evidence scope',async t=>{
 const f=setup(t);f.beginInput.requestedScopes=[READ];await begin(f);
 assert.equal((await readyStore(f).decide(choose(f))).code,'invalid_request');assert.equal(f.newGrants().length,0);
 assert.equal((await readyStore(f).decide(choose(f,'read'))).code,'decision_saved');
 const before=JSON.stringify(f.newGrants());assert.equal((await readyStore(f).decide(choose(f))).code,'decision_conflict');
 assert.equal(JSON.stringify(f.newGrants()),before);
});
test('concurrent decisions have one acknowledged fresh writer and one stable grant',async t=>{
 const f=setup(t);await begin(f);
 const result=await Promise.all([readyStore(f).decide(choose(f,'read')),readyStore(f).decide(choose(f,'drafts'))]);
 assert.equal(result.filter(r=>r.freshDecision===true).length,1);assert.equal(f.newGrants().length,1);
 assert.ok(result.every(r=>['decision_saved','already_decided','decision_pending','decision_conflict'].includes(r.code)));
 const g=f.newGrants()[0],chosen=f.row().decision;
 assert.deepEqual(JSON.parse(g.scopes_json),chosen==='read'?[READ]:[READ,DRAFTS]);
});
test('duplicate admitted choice is read-only and a different choice cannot replace it',async t=>{
 const f=setup(t);await begin(f);await readyStore(f).decide(choose(f));const count=f.writes,old=JSON.stringify(f.newGrants());
 const replay=await readyStore(f).decide(choose(f));assert.equal(replay.code,'already_decided');assert.equal(replay.freshDecision,false);
 assert.equal((await readyStore(f).decide(choose(f,'read'))).code,'decision_conflict');
 assert.equal(f.writes,count);assert.equal(JSON.stringify(f.newGrants()),old);
});
test('cancel creates no grant even after source ownership or domain changes',async t=>{
 const f=setup(t);await begin(f);
 f.sql.prepare("UPDATE site_projects SET user_id='other-owner' WHERE id='project-a'").run();f.sql.prepare("UPDATE domain_claims SET status='revoked'").run();
 const r=await readyStore(f).decide(choose(f,'cancel'));assert.equal(r.code,'cancelled');assert.equal(f.row().state,'cancelled');
 assert.equal(f.newGrants().length,0);assert.equal((await readyStore(f).decide(choose(f))).code,'delegated_access_denied');
});
test('another subject or original request digest cannot inspect or decide the transaction',async t=>{
 const f=setup(t);await begin(f);
 for(const ref of [{...f.ref,subject:'owner-b'},{...f.ref,requestHash:'c'.repeat(64)}]){
  assert.equal((await readyStore(f).inspect(ref)).code,'delegated_access_denied');
  assert.equal((await readyStore(f).decide({...ref,decision:'drafts'})).code,'delegated_access_denied');
 }
 assert.equal(f.row().state,'pending');assert.equal(f.newGrants().length,0);
});
test('malformed data and proposed authority extras are rejected before writes',async t=>{
 const f=setup(t);
 for(const patch of [{handleHash:'not-hash'},{requestHash:'c'.repeat(65)},{subject:'owner-a\n'},{grantId:'forged'},
 {requestedScopes:[READ,READ]},{requestedScopes:[READ,'afw:evidence:read']},{expectedRevision:0},{transactionStartedAt:f.wall+1000}]){
  assert.equal((await readyStore(f).begin({...f.beginInput,...patch})).code,'invalid_request');
 }
 let reads=0;const v={...f.beginInput};Object.defineProperty(v,'subject',{get(){reads++;return 'owner-a';},enumerable:true});
 assert.equal((await readyStore(f).begin(v)).code,'invalid_request');assert.equal(reads,0);
 assert.equal(f.sql.prepare('SELECT count(*) AS n FROM delegated_preparation_consents').get().n,0);
});
test('missing or drifted own schema blocks positive admission without consuming the old profile',async t=>{
 const f=setup(t);const original=JSON.stringify(f.original());f.sql.exec('DROP TRIGGER delegated_preparation_consents_no_delete');
 assert.equal((await readyStore(f).begin(f.beginInput)).code,'unavailable');assert.equal(f.newGrants().length,0);assert.equal(JSON.stringify(f.original()),original);
});
test('missing capsule schema blocks a preparation offer and positive decision',async t=>{
 const f=setup(t);f.sql.exec('DROP TRIGGER agent_capsule_preparations_immutable');
 assert.equal((await readyStore(f).begin(f.beginInput)).code,'unavailable');assert.equal(f.newGrants().length,0);
});
test('owner role revision and verified source must remain current before a decision',async()=>{
 for(const query of ["UPDATE site_projects SET user_id='other-owner' WHERE id='project-a'","UPDATE site_projects SET role='visitor' WHERE id='project-a'",
 "UPDATE site_projects SET audience='changed' WHERE id='project-a'","UPDATE domain_claims SET status='revoked' WHERE id='claim-a'",
 "UPDATE registry_sites SET canonical_origin='https://different.invalid' WHERE id='site-a'"]){
  const f=preparationConsentStoreFixture(factory());try{
   await begin(f);f.sql.exec(query);const r=await readyStore(f).decide(choose(f));
   assert.ok(['context_changed','delegated_access_denied'].includes(r.code));assert.equal(f.newGrants().length,0);
  }finally{f.close();}
 }
});
test('source change after reservation prevents the atomic grant transition',async t=>{
 const f=setup(t);await begin(f);let changed=false;
 f.after=async(query,kind)=>{if(!changed&&kind==='run'&&query.includes("SET state='reserved'")){changed=true;f.sql.prepare("UPDATE domain_claims SET status='revoked'").run();}};
 const r=await readyStore(f).decide(choose(f));assert.ok(changed);assert.equal(f.newGrants().length,0);
 assert.equal(f.row().state,'reserved');assert.ok(['unknown_ack','context_changed'].includes(r.code));
});
test('grant insert failure rolls back admission and reserved attempt cannot be retried',async t=>{
 const f=setup(t);await begin(f);
 f.sql.exec("CREATE TRIGGER ci_reject_preparation_grant BEFORE INSERT ON delegated_access_grants WHEN NEW.client_id='_ci-client' BEGIN SELECT RAISE(ABORT,'synthetic rejection'); END;");
 assert.equal((await readyStore(f).decide(choose(f))).code,'unknown_ack');assert.equal(f.row().state,'reserved');assert.equal(f.newGrants().length,0);
 const writes=f.writes;assert.equal((await readyStore(f).inspect(f.ref)).code,'decision_pending');
 assert.equal((await readyStore(f).decide(choose(f))).code,'decision_pending');assert.equal(f.writes,writes);
});
test('lost reservation ACK stops before grant and permits only read reconciliation or cancellation',async t=>{
 const f=setup(t);await begin(f);let failed=false;
 f.after=async(query,kind)=>{if(!failed&&kind==='run'&&query.includes("SET state='reserved'")){failed=true;throw Error('synthetic ack loss');}};
 assert.equal((await readyStore(f).decide(choose(f))).code,'unknown_ack');assert.equal(f.newGrants().length,0);assert.equal(f.row().state,'reserved');
 f.after=null;const count=f.writes;const read=await readyStore(f).inspect(f.ref);
 assert.equal(read.code,'decision_pending');assert.equal(read.freshDecision,false);assert.equal(f.writes,count);
 assert.equal((await readyStore(f).decide(choose(f))).code,'decision_pending');assert.equal(f.writes,count);
 assert.equal((await readyStore(f).decide(choose(f,'cancel'))).code,'cancelled');assert.equal(f.newGrants().length,0);
});
test('lost atomic grant ACK reconciles one stored decision without granting code completion',async t=>{
 const f=setup(t);await begin(f);let failed=false;
 f.after=async(query,kind)=>{if(!failed&&kind==='run'&&query.includes("SET state='admitted'")){failed=true;throw Error('synthetic ack loss');}};
 assert.equal((await readyStore(f).decide(choose(f))).code,'unknown_ack');assert.equal(f.row().state,'admitted');assert.equal(f.newGrants().length,1);
 f.after=null;const count=f.writes;const r=await readyStore(f).inspect(f.ref);
 assert.equal(r.code,'decision_saved');assert.equal(r.freshDecision,false);assert.equal(r.authorizationCodeIssued,false);assert.equal(r.tokenIssued,false);
 assert.deepEqual(r.scopes,[READ,DRAFTS]);assert.equal(f.writes,count);
 assert.equal((await readyStore(f).decide(choose(f))).code,'already_decided');assert.equal(f.newGrants().length,1);assert.equal(f.writes,count);
});
test('lost begin ACK retains one original pending row without renewal',async t=>{
 const f=setup(t);let failed=false;
 f.after=async(query,kind)=>{if(!failed&&kind==='run'&&query.includes('INSERT INTO delegated_preparation_consents')){failed=true;throw Error('synthetic ack loss');}};
 assert.equal((await readyStore(f).begin(f.beginInput)).code,'unknown_ack');f.after=null;
 const count=f.writes;assert.equal((await readyStore(f).inspect(f.ref)).code,'consent_pending');
 assert.equal(f.writes,count);assert.equal(f.row().transaction_expires_at,f.beginInput.transactionExpiresAt);assert.equal(f.newGrants().length,0);
});
test('original expiry and consumed outer request lease cannot be renewed by a later store call',async t=>{
 const f=setup(t);await begin(f);f.wall=f.beginInput.transactionExpiresAt;f.tick+=120000;
 assert.equal((await readyStore(f).decide(choose(f))).code,'expired');assert.equal(f.newGrants().length,0);
 const other=preparationConsentStoreFixture(factory());try{
  const {store}=other.open();other.wall+=5000;other.tick+=5000;
  assert.equal((await store.begin(other.beginInput)).code,'unavailable');assert.equal(other.row(),undefined);
 }finally{other.close();}
});
test('clock/config drift latches the request closed and grant history remains immutable',async t=>{
 const f=setup(t);const {store,options}=f.open();options.profile.clientId='changed';
 assert.equal((await store.begin(f.beginInput)).code,'unavailable');options.profile.clientId='_ci-client';
 assert.equal((await store.begin(f.beginInput)).code,'unavailable');
 await begin(f);await readyStore(f).decide(choose(f));const original=JSON.stringify(f.row());
 assert.throws(()=>f.sql.prepare('DELETE FROM delegated_preparation_consents').run());
 assert.throws(()=>f.sql.prepare("UPDATE delegated_preparation_consents SET requested_scopes_json='[]'").run());assert.equal(JSON.stringify(f.row()),original);
 const now=()=>f.wall;const lease=createCapsulePreparationRequestLease({now,monotonic:()=>f.tick});
 const fresh=factory()({enabled:true,profile:{...f.profile},createPrimarySession:()=>f.db.withSession('first-primary'),now,requestLease:lease});
 f.wall-=1;assert.equal((await fresh.inspect(f.ref)).code,'unavailable');
});
test('existing grant revocation blocks useful receipt but does not erase the stored decision',async t=>{
 const f=setup(t);await begin(f);await readyStore(f).decide(choose(f));const before=JSON.stringify(f.row()),g=f.newGrants()[0];
 await createDelegatedOAuthStore(f.db).revokeGrant(g.id,'owner-a',new Date(f.wall).toISOString());
 const r=await readyStore(f).inspect(f.ref);assert.equal(r.code,'revoked');assert.equal(r.freshDecision,false);
 assert.equal(JSON.stringify(f.row()),before);assert.notEqual(f.newGrants()[0].revoked_at,'');assert.equal(f.newGrants().length,1);
});
