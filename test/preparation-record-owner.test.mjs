import test from 'node:test';
import assert from 'node:assert/strict';
import {createDelegatedPreparationConsentStore} from '../lib/delegated-preparation-consent-store.mjs';
import {preparationConsentStoreFixture} from './fixtures/preparation-consent-store.mjs';
const READ='afw:project:read',DRAFTS='afw:capsule:prepare';
function setup(t,role){
 const f=preparationConsentStoreFixture(createDelegatedPreparationConsentStore);t.after(()=>f.close());
 f.sql.prepare("UPDATE site_projects SET role=? WHERE id='project-a'").run(role);
 f.beginInput.expectedRevision=f.sql.prepare("SELECT revision FROM site_projects WHERE id='project-a'").get().revision;
 return f;
}
for(const role of ['', 'Fundador y responsable', 'visitor'])test('record owner can consent with a descriptive role '+JSON.stringify(role),async t=>{
 const f=setup(t,role),original=JSON.stringify(f.original());
 const pending=await f.open().store.begin(f.beginInput);assert.equal(pending.code,'consent_pending');
 const admitted=await f.open().store.decide({...f.ref,decision:'drafts'});assert.equal(admitted.code,'decision_saved');
 assert.deepEqual(admitted.scopes,[READ,DRAFTS]);assert.equal(admitted.freshDecision,true);assert.equal(f.newGrants().length,1);
 const stored=f.newGrants()[0];assert.equal(stored.user_id,'owner-a');assert.equal(stored.project_id,'project-a');
 assert.equal((await f.open().store.inspect(f.ref)).code,'decision_saved');
 assert.equal(JSON.stringify(f.original()),original);assert.equal(f.sql.prepare("SELECT role FROM site_projects WHERE id='project-a'").get().role,role);
});
test('writing owner in the descriptive field never authorizes a foreign verified subject',async t=>{
 const f=setup(t,'owner');
 const denied=await f.open().store.begin({...f.beginInput,subject:'other-owner'});
 assert.equal(denied.code,'delegated_access_denied');assert.equal(f.newGrants().length,0);assert.equal(f.row(),undefined);
});
test('a normal descriptive-role edit still changes revision and invalidates the pending consent',async t=>{
 const f=setup(t,'Fundador');assert.equal((await f.open().store.begin(f.beginInput)).code,'consent_pending');
 f.sql.prepare("UPDATE site_projects SET role='Responsable tecnico' WHERE id='project-a'").run();
 assert.ok(f.sql.prepare("SELECT revision FROM site_projects WHERE id='project-a'").get().revision>f.beginInput.expectedRevision);
 assert.equal((await f.open().store.decide({...f.ref,decision:'drafts'})).code,'context_changed');assert.equal(f.newGrants().length,0);
});
for(const mutation of [
 "UPDATE registry_sites SET user_id='other-owner' WHERE id='site-a'",
 "UPDATE domain_claims SET user_id='other-owner' WHERE id='claim-a'",
 "UPDATE domain_claims SET status='revoked' WHERE id='claim-a'"
])test('descriptive role never bypasses current source ownership or verified claim: '+mutation,async t=>{
 const f=setup(t,'Fundador');assert.equal((await f.open().store.begin(f.beginInput)).code,'consent_pending');
 f.sql.exec(mutation);const r=await f.open().store.decide({...f.ref,decision:'drafts'});
 assert.ok(['context_changed','delegated_access_denied'].includes(r.code));assert.equal(f.newGrants().length,0);
});
test('ownership changed after reservation cannot pass the final primary SQL fence',async t=>{
 const f=setup(t,'Fundador');assert.equal((await f.open().store.begin(f.beginInput)).code,'consent_pending');let changed=false;
 f.after=async(query,kind)=>{if(!changed&&kind==='run'&&query.includes("SET state='reserved'")){
  changed=true;f.sql.prepare("UPDATE site_projects SET user_id='other-owner' WHERE id='project-a'").run();
 }};
 const r=await f.open().store.decide({...f.ref,decision:'drafts'});assert.equal(changed,true);
 assert.ok(['unknown_ack','context_changed','delegated_access_denied'].includes(r.code));assert.equal(f.newGrants().length,0);
 assert.equal(f.row().state,'reserved');
});
