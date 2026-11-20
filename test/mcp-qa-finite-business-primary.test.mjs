import assert from 'node:assert/strict';
import test from 'node:test';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {finiteFixture,hash} from './fixtures/qa-finite-trial.mjs';
import {createPrivateQaFiniteTrialNativePin,readPrivateQaFiniteControlIdentity} from '../lib/mcp-qa-finite-trial-control.mjs';

const native = await import('../lib/mcp-qa-finite-business-primary.mjs').catch(error => {
 if (error.code !== 'ERR_MODULE_NOT_FOUND' || !error.message.includes('/lib/mcp-qa-finite-business-primary.mjs')) throw error;
 return {};
});

function setup(t,{generation='generation-1'}={}) {
 assert.equal(typeof native.createPrivateQaFiniteBusinessPrimary,'function');
 const f=finiteFixture({at:Date.now()-20000}),p=f.plan,s=p.selectors;
 f.setNow(p.T0+18000);
 const sql=new DatabaseSync(':memory:');t.after(()=>sql.close());
 sql.exec('PRAGMA foreign_keys=ON; CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER); CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,client_id TEXT,resource TEXT,revoked_at TEXT,expires_at TEXT,scopes_json TEXT); CREATE TABLE project_events(id TEXT PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);');
 for(const name of ['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation','dossier-successor-launch','dossier-subscription-receipt']){
  sql.exec(readFileSync(new URL('../db/'+name+'.sql',import.meta.url),'utf8'));
 }
 const insert=(table,values)=>sql.prepare('INSERT INTO '+table+' ('+Object.keys(values).join(',')+') VALUES ('+Object.keys(values).map(()=>'?').join(',')+')').run(...Object.values(values));
 const scope={grant_id:s.grantId,project_id:s.projectId,user_id:s.subject,client_id:s.clientId,resource:s.resource};
 const expiry=p.N1-1,subscription='subscription-1',image='cloudflare/debian-trixie',manifestHash='e'.repeat(64);
 const binding={container_id:p.resources.containerId,program_hash:s.programHash,source_revision:s.sourceRevision};
 insert('site_projects',{id:s.projectId,user_id:s.subject,revision:s.expectedProjectRevision+1});
 insert('delegated_access_grants',{id:s.grantId,project_id:s.projectId,user_id:s.subject,client_id:s.clientId,resource:s.resource,revoked_at:'',expires_at:new Date(expiry).toISOString(),scopes_json:'["afw:project:read"]'});
 insert('dossier_monitoring_consent_events',{...scope,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:'original',revision:1,sequence:1,issued_at:p.T0+1,expires_at:expiry});
 insert('dossier_node_process_admissions',{...scope,...binding,image,process_generation:generation,created_at:p.T0+3,expires_at:expiry,consent_sequence:1,consent_issued_at:p.T0+1,consent_expires_at:expiry});
 insert('dossier_successor_reservations',{slot:'afw.own-successor.v1',trial_id:p.trialId,predecessor_container_id:'f'.repeat(64),predecessor_generation:'old',predecessor_program_hash:'9'.repeat(64),predecessor_source_revision:'8'.repeat(40),application_id:p.resources.applicationId,...binding,scope_hash:manifestHash,start_at:s.startAt,expires_at:expiry,budget:1,closed_at:p.T0,stopped_at:p.T0,observed_at:p.T0,reserved_at:p.T0+2,state:'prepared'});
 insert('dossier_successor_launch_claims',{trial_id:p.trialId,scope_hash:manifestHash,container_id:binding.container_id,process_generation:generation,grant_id:s.grantId,claimed_at:p.T0+4});
 insert('dossier_event_subscription_receipts',{...scope,...binding,image,process_generation:generation,subscription_id:subscription,observed_at:p.T0+5,recorded_at:p.T0+6,expires_at:expiry});
 const id=hash(JSON.stringify(['afw.own-synthetic-save.v1',s.subject,s.projectId,s.saveIdempotencyKey]));
 const fingerprint=hash(JSON.stringify(['afw.own-synthetic-save.v1',s.grantId,s.expectedProjectRevision,s.goal]));
 const event=(patch={})=>insert('project_events',{id,project_id:s.projectId,user_id:s.subject,type:'project_updated',payload_json:JSON.stringify({changedFields:['goals'],revision:s.expectedProjectRevision+1,fingerprint}),created_at:new Date(p.T0+7).toISOString(),...patch});
 const sessions=[];
 f.env.RELEASE_DB={withSession(pin){sessions.push(pin);return {prepare(query){return {bind(...args){return {async all(){return {success:true,results:sql.prepare(query).all(...args).map(row=>({...row}))};}};}};}};}};
 const nativePin=createPrivateQaFiniteTrialNativePin({ctx:f.ctx,env:f.env,sourceRevision:p.source.revision});
 const identity=readPrivateQaFiniteControlIdentity({nativePin,raw:JSON.stringify(p)});
 const facts=native.createPrivateQaFiniteBusinessPrimary({ctx:f.ctx,env:f.env,control:{plan:identity.plan,planHash:identity.planHash,controlHash:identity.controlHash},now:f.now});
 return {f,sql,facts,event,id,generation,subscription,manifestHash,fingerprint,sessions,identity:{plan:identity.plan,planHash:identity.planHash,controlHash:identity.controlHash},insert,binding,image};
}
test('QA reads the original subscription, process and saved event with the same immutable receipt hashes',async t=>{
 const x=setup(t);
 const subscription=await x.facts.subscription(),process=await x.facts.process();
 assert.equal(subscription.subscriptionId,x.subscription);
 assert.equal(subscription.processGeneration,x.generation);
 assert.equal(process.processGeneration,x.generation);
 assert.equal(process.manifestHash,x.manifestHash);
 assert.equal(await x.facts.savedEvent(),null);
 x.event();
 const event=await x.facts.savedEvent();
 assert.equal(event.eventId,x.id);
 assert.equal(event.fingerprint,x.fingerprint);
 assert.equal(event.subscriptionReceiptHash,subscription.receiptHash);
 assert.equal(event.processReceiptHash,process.receiptHash);
 assert.ok(x.sessions.length>=4&&x.sessions.every(pin=>pin==='first-primary'));
});
test('QA rejects a same-ID event with the wrong provenance or project revision',async t=>{
 const x=setup(t);
 x.event({payload_json:JSON.stringify({changedFields:['goals'],revision:2,fingerprint:'0'.repeat(64)})});
 await assert.rejects(()=>x.facts.savedEvent(),/Finite business primary unavailable/);
 x.sql.exec('DELETE FROM project_events');x.event();
 x.sql.exec('UPDATE site_projects SET revision=3');
 await assert.rejects(()=>x.facts.savedEvent(),/Finite business primary unavailable/);
});
test('QA never projects a revoked subscription, unrelated process claim or swapped binding',async t=>{
 const x=setup(t);x.event();
 x.sql.exec("UPDATE delegated_access_grants SET revoked_at='revoked'");
 assert.equal(await x.facts.savedEvent(),null);
 x.sql.exec("UPDATE delegated_access_grants SET revoked_at=''; DROP TRIGGER dossier_successor_launch_no_update; UPDATE dossier_successor_launch_claims SET scope_hash='foreign'");
 await assert.rejects(()=>x.facts.process(),/Finite business primary unavailable/);
 x.f.env.RELEASE_DB={};
 await assert.rejects(()=>x.facts.subscription());
});

test('QA grants a save target only while the exact plan revision is current and the event is absent',async t=>{
 const x=setup(t);
 assert.equal(await x.facts.saveTarget(),null);
 x.sql.exec('UPDATE site_projects SET revision=1');
 const target=await x.facts.saveTarget();
 assert.equal(target.target.eventId,x.id);
 assert.equal(target.target.fingerprint,x.fingerprint);
 assert.equal(target.target.subscriptionReceiptHash,(await x.facts.subscription()).receiptHash);
 x.event();assert.equal(await x.facts.saveTarget(),null);
 x.sql.exec('UPDATE site_projects SET revision=2');
 const saved=await x.facts.notice();
 assert.deepEqual(saved.notice,target.target);
});

test('final QA primary rechecks actual closed rows twice and rejects post-closure drift',async t=>{
 assert.equal(typeof native.readPrivateQaFiniteFinalPrimary,'function');
 const x=setup(t,{generation:'a'.repeat(64)}),{f,identity}=x,p=identity.plan;
 x.insert('dossier_node_process_closures',{grant_id:p.selectors.grantId,process_generation:x.generation,
  ...x.binding,image:x.image,closed_at:p.C0+7});
 f.setNow(p.C0+9);
 const {createFiniteNativePrimaryReader}=await import('../lib/mcp-own-finite-primary.mjs');
 const retainedPrimary=await createFiniteNativePrimaryReader({db:f.env.RELEASE_DB,control:identity,now:f.now}).read();
 f.setNow(p.C1+18);
 const before=x.sessions.length;
 const ready=await native.readPrivateQaFiniteFinalPrimary({ctx:f.ctx,env:f.env,control:identity,retainedPrimary,check:f.now});
 const {observedAt,...stable}=retainedPrimary;void observedAt;
 const {finiteHash}=await import('../lib/mcp-finite-evidence.mjs');
 assert.deepEqual(ready,{primaryHash:finiteHash(stable),observedAt:f.now()});
 assert.deepEqual(x.sessions.slice(before),['first-primary','first-primary']);
 x.sql.exec('DROP TRIGGER dossier_node_process_close_no_update; UPDATE dossier_node_process_closures SET closed_at=closed_at+1;');
 await assert.rejects(()=>native.readPrivateQaFiniteFinalPrimary({ctx:f.ctx,env:f.env,control:identity,retainedPrimary,check:f.now}));
});
