import test from 'node:test';
import assert from 'node:assert/strict';
import {capsulePreparationFixture,input,authority} from './fixtures/agent-capsule-preparation.mjs';
let factory;
try { ({createAgentCapsulePreparation:factory}=await import('../lib/agent-capsule-preparation.mjs')); }
catch(error) { if(error.code!=='ERR_MODULE_NOT_FOUND')throw error; }
const fixture=()=>capsulePreparationFixture(factory);
async function use(run){const f=fixture();try{await run(f);}finally{f.close();}}
test('capsule preparation defaults closed before resolving authority or DB',async()=>{
 assert.equal(typeof factory,'function','missing closed capsule preparation service');
 let touched=0;const boom=()=>{touched++;throw Error('should not touch');};
 for(const enabled of [undefined,false,'true',1]){const service=factory({enabled,resolveAuthority:boom,createPrimarySession:boom});assert.equal((await service.prepare(input)).code,'unavailable');assert.equal((await service.reconcile(input)).code,'unavailable');}
 assert.equal(touched,0);
});
test('strict preparation input rejects extra authority, getters, unsafe revisions and keys before reads',()=>use(async f=>{
 const samples=[{...input,subject:'other'},{...input,expectedRevision:0},{...input,idempotencyKey:'short'},{...input,contract:'other'}];
 let accessed=0;const getter={...input};Object.defineProperty(getter,'publicationAllowed',{get(){accessed++;return true;},enumerable:true});samples.push(getter);
 for(const value of samples)assert.equal((await f.service.prepare(value)).code,'invalid_request');
 assert.equal(accessed,0);assert.equal(f.reads,0);assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('prepares one real generated capsule and minimum bounded review result',()=>use(async f=>{
 const r=await f.service.prepare(input);assert.equal(r.code,'prepared');assert.equal(r.replayed,false);assert.equal(r.preparation.sourceRevision,1);assert.equal(r.preparation.version,1);assert.match(r.preparation.manifestSha256,/^[a-f0-9]{64}$/);
 assert.equal(r.publicationAllowed,false);assert.equal(r.chargeAllowed,false);assert.equal(r.executionAllowed,false);
 assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});assert.ok(f.primaries>=3);
 const capsule=JSON.parse(f.sql.prepare('SELECT capsule_json FROM publication_capsules').get().capsule_json);assert.equal(capsule.status,'owner_approval_pending');assert.equal(capsule.approvals.owner,'pending');assert.ok(capsule.files.length>0);
 const output=JSON.stringify(r);assert.ok(!output.includes('Synthetic AFW'));assert.ok(!output.includes('owner@example'));assert.ok(!output.includes('files/'));
}));
test('same key replays stored result without a write and changed payload conflicts',()=>use(async f=>{
 const first=await f.service.prepare(input),writes=f.writes,batches=f.batches;
 const second=await f.service.prepare(input);assert.equal(second.code,'prepared');assert.equal(second.replayed,true);assert.deepEqual(second.preparation,first.preparation);assert.equal(f.writes,writes);assert.equal(f.batches,batches);
 assert.equal((await f.service.prepare({...input,expectedRevision:2})).code,'idempotency_conflict');assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
test('reading, expired, unexchanged and revoked grants cannot prepare',()=>use(async f=>{
 for(const change of ["scopes_json='[\"afw:project:read\"]'","expires_at='2000-01-01T00:00:00.000Z'","exchanged_at=''","revoked_at='2026-01-01T00:00:00.000Z'"]){
  f.sql.exec("UPDATE delegated_access_grants SET scopes_json='[\"afw:capsule:prepare\"]',expires_at='2099-01-01T00:00:00.000Z',exchanged_at='2026-01-01T00:00:00.000Z',revoked_at=''");
  f.sql.exec('UPDATE delegated_access_grants SET '+change);assert.equal((await f.service.prepare(input)).code,'delegated_access_denied');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
 }
}));
test('server identity pins and current project owner prevent foreign preparation and disclosure',()=>use(async f=>{
 for(const key of ['subject','clientId','grantId','projectId','resource']){f.authority={...authority,[key]:'other'};assert.equal((await f.service.prepare(input)).code,'delegated_access_denied');}
 f.authority={...authority};f.sql.exec("UPDATE site_projects SET user_id='new-owner'");assert.equal((await f.service.prepare(input)).code,'delegated_access_denied');assert.equal(f.writes,0);
}));
test('stale project revision and withdrawn domain proof do not reserve',()=>use(async f=>{
 assert.equal((await f.service.prepare({...input,expectedRevision:2})).code,'revision_conflict');
 f.sql.exec("UPDATE domain_claims SET status='revoked'");assert.equal((await f.service.prepare(input)).code,'domain_unverified');assert.equal(f.writes,0);
 f.sql.exec("UPDATE domain_claims SET status='verified',verified_at='2000-01-01T00:00:00.000Z'");assert.equal((await f.service.prepare(input)).code,'domain_unverified');assert.equal(f.writes,0);
}));
test('revision changing after snapshot is fenced at reservation',()=>use(async f=>{
 let changed=false;f.after=async(q,op)=>{if(!changed&&op==='first'&&q.includes('p.organization')){changed=true;f.sql.exec('UPDATE site_projects SET revision=2');}};
 assert.notEqual((await f.service.prepare(input)).code,'prepared');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('revocation after reservation prevents capsule commit and preserves the attempt',()=>use(async f=>{
 f.after=async(q,op)=>{if(op==='run'&&q.includes('INSERT INTO agent_capsule_preparations'))f.sql.exec("UPDATE delegated_access_grants SET revoked_at='2026-01-01T00:00:00.000Z'");};
 const r=await f.service.prepare(input);assert.notEqual(r.code,'prepared');assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});
}));
test('revocation after committed batch prevents confirmation without erasing accepted work',()=>use(async f=>{
 f.afterBatch=async()=>{f.sql.exec("UPDATE delegated_access_grants SET revoked_at='2026-01-01T00:00:00.000Z'");};
 const r=await f.service.prepare(input);assert.equal(r.code,'delegated_access_denied');assert.ok(!r.preparation);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
 assert.equal((await f.service.reconcile(input)).code,'delegated_access_denied');
}));
test('lost reservation ACK never generates and neither reconcile nor replay restarts it',()=>use(async f=>{
 let lost=false;f.after=async(q,op)=>{if(!lost&&op==='run'&&q.includes('INSERT INTO agent_capsule_preparations')){lost=true;throw Error('SECRET storage path');}};
 const r=await f.service.prepare(input);assert.equal(r.code,'unknown_ack');assert.ok(!JSON.stringify(r).includes('SECRET'));assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});
 const writes=f.writes;assert.equal((await f.service.reconcile(input)).code,'preparation_pending');assert.equal((await f.service.prepare(input)).code,'preparation_pending');assert.equal(f.writes,writes);assert.equal(f.batches,0);
}));
test('lost commit ACK is recovered by read without another generation, capsule or event',()=>use(async f=>{
 f.afterBatch=async()=>{throw Error('sensitive unknown ACK');};assert.equal((await f.service.prepare(input)).code,'unknown_ack');
 const writes=f.writes,batches=f.batches;const found=await f.service.reconcile(input);assert.equal(found.code,'prepared');assert.equal(found.replayed,true);assert.equal(f.writes,writes);assert.equal(f.batches,batches);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
test('event failure rolls capsule and final status back as one SQL transaction, retaining reservation',()=>use(async f=>{
 f.sql.exec("CREATE TRIGGER reject_event BEFORE INSERT ON project_events WHEN NEW.type='agent_capsule_prepared' BEGIN SELECT RAISE(ABORT,'private internal failure'); END;");
 const r=await f.service.prepare(input);assert.equal(r.code,'unknown_ack');assert.ok(!JSON.stringify(r).includes('private internal'));assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});assert.equal((await f.service.reconcile(input)).code,'preparation_pending');
}));
test('same-key and different-key concurrent preparations cannot duplicate version or event',()=>use(async f=>{
 const results=await Promise.all([f.service.prepare(input),f.service.prepare(input),f.service.prepare({...input,idempotencyKey:'prepare-test-0002'})]);
 assert.equal(results.filter(x=>x.code==='prepared'&&!x.replayed).length,1);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
test('two sequential authorized jobs get distinct consecutive versions',()=>use(async f=>{
 const a=await f.service.prepare(input),b=await f.service.prepare({...input,idempotencyKey:'prepare-test-0002'});assert.equal(a.code,'prepared');assert.equal(b.code,'prepared');assert.equal(a.preparation.version,1);assert.equal(b.preparation.version,2);assert.deepEqual(f.counts(),{intents:2,capsules:2,events:2});
}));
test('original monotonic budget expires before reservation without resetting on awaits',()=>use(async f=>{
 f.after=async(q,op)=>{if(op==='first'&&q.includes('p.organization'))f.mono=5001;};const r=await f.service.prepare(input);assert.equal(r.code,'deadline_exceeded');assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});
}));
test('reconciliation of absent intent reads only and durable history rejects mutation/deletion',()=>use(async f=>{
 assert.equal((await f.service.reconcile(input)).code,'preparation_not_found');assert.equal(f.writes,0);
 await f.service.prepare(input);assert.throws(()=>f.sql.exec("UPDATE agent_capsule_preparations SET user_id='other'"));assert.throws(()=>f.sql.exec('DELETE FROM agent_capsule_preparations'));assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));

test('SQL deadline denies a reservation queued past the original lease; late ACK never resumes work',()=>use(async f=>{
 let settled;const finished=new Promise(resolve=>{settled=resolve;});
 f.before=async(q,op)=>{if(op==='run'&&q.includes('INSERT INTO agent_capsule_preparations'))await new Promise(resolve=>setTimeout(resolve,5100));};
 f.after=async(q,op)=>{if(op==='run'&&q.includes('INSERT INTO agent_capsule_preparations'))settled();};
 const r=await f.service.prepare(input);assert.equal(r.code,'unknown_ack');
 await finished;assert.deepEqual(f.counts(),{intents:0,capsules:0,events:0});assert.equal(f.batches,0);
}));
test('a human writer winning the reserved version is not overwritten or silently renumbered',()=>use(async f=>{
 f.before=async(q,op)=>{if(op==='batch')f.sql.prepare("INSERT INTO publication_capsules(id,site_id,project_id,user_id,version,contract_version,manifest_sha256,idempotency_key,capsule_json,expires_at,created_at,updated_at) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)").run('human-capsule','site-a','project-a','owner-a',1,'legacy','a'.repeat(64),'human-existing','{}','2099-01-01T00:00:00.000Z','2026-01-01T00:00:00.000Z','2026-01-01T00:00:00.000Z');};
 const r=await f.service.prepare(input);assert.equal(r.code,'preparation_pending');assert.deepEqual(f.counts(),{intents:1,capsules:1,events:0});assert.equal(f.sql.prepare('SELECT id FROM publication_capsules').get().id,'human-capsule');
}));
test('an unversioned source change after reservation is rejected at atomic commit',()=>use(async f=>{
 f.before=async(q,op)=>{if(op==='batch')f.sql.exec("UPDATE site_projects SET organization='Changed after snapshot'");};
 const r=await f.service.prepare(input);assert.deepEqual(f.counts(),{intents:1,capsules:0,events:0});assert.equal(f.sql.prepare('SELECT revision FROM site_projects').get().revision,2);assert.equal(r.code,'revision_conflict');
}));
test('malformed and future-dated authority/domain records fail closed without a reservation',()=>use(async f=>{
 f.sql.exec("UPDATE delegated_access_grants SET scopes_json='not-json'");assert.equal((await f.service.prepare(input)).code,'delegated_access_denied');
 f.sql.exec("UPDATE delegated_access_grants SET scopes_json='[\"afw:capsule:prepare\"]';UPDATE domain_claims SET verified_at='2099-01-01T00:00:00.000Z'");assert.equal((await f.service.prepare(input)).code,'domain_unverified');assert.equal(f.writes,0);
}));

test('withdrawal at final artifact read denies replay and reconciliation without disclosing reference',async()=>{
 for(const method of ['prepare','reconcile'])await use(async f=>{
  assert.equal((await f.service.prepare(input)).code,'prepared');
  f.before=async(q,op)=>{if(op==='first'&&q.includes('AS actual_manifest'))f.sql.exec("UPDATE delegated_access_grants SET revoked_at='2026-01-01T00:00:00.000Z'");};
  const r=await f.service[method](input);assert.equal(r.code,'delegated_access_denied');assert.ok(!r.preparation);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
 });
});
test('ownership transfer at the final postcommit artifact read prevents confirmation',()=>use(async f=>{
 f.before=async(q,op)=>{if(f.batches>0&&op==='first'&&q.includes('AS actual_manifest'))f.sql.exec("UPDATE site_projects SET user_id='new-owner'");};
 const r=await f.service.prepare(input);assert.equal(r.code,'delegated_access_denied');assert.ok(!r.preparation);assert.deepEqual(f.counts(),{intents:1,capsules:1,events:1});
}));
test('grant expiring during final artifact await is checked again before returning metadata',()=>use(async f=>{
 assert.equal((await f.service.prepare(input)).code,'prepared');
 f.sql.prepare('UPDATE delegated_access_grants SET expires_at=?').run(new Date(Date.now()+3000).toISOString());
 f.after=async(q,op)=>{if(op==='first'&&q.includes('AS actual_manifest'))f.wallOffset=3500;};
 const r=await f.service.reconcile(input);assert.equal(r.code,'delegated_access_denied');assert.ok(!r.preparation);
}));
