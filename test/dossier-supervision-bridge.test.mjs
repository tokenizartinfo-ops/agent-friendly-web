import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFile} from 'node:fs/promises';
import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
const bridge=await import('../lib/dossier-supervision-bridge.mjs').catch(()=>({}));
const now=Date.parse('2026-10-06T15:00:00.000Z'),secret='synthetic-dossier-bridge-secret-minimum-32';
const event={id:'save-1',projectId:'qa-own-project',type:'project_updated',revision:2,createdAt:new Date(now).toISOString()};
const required=name=>{assert.equal(typeof bridge[name],'function',`${name} must implement durable delivery`);return bridge[name];};
function database(sql){const sqlite=new DatabaseSync(':memory:');sqlite.exec(sql);const stmt=(s,a=[])=>({bind:(...v)=>stmt(s,v),first:async()=>sqlite.prepare(s).get(...a)||null,all:async()=>({results:sqlite.prepare(s).all(...a)}),run:async()=>({meta:{changes:sqlite.prepare(s).run(...a).changes}})});return{sqlite,db:{prepare:s=>stmt(s)}};}
async function fixture(){const f=database(await readFile('worker/operations/dossier-supervision.sql','utf8'));const state=database(await readFile('worker/operations/dossier-supervision-cursors.sql','utf8'));const source=database('CREATE TABLE site_projects(id TEXT,user_id TEXT); CREATE TABLE project_events(id TEXT,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);');source.sqlite.prepare('INSERT INTO site_projects VALUES(?,?)').run(event.projectId,'qa-owner');source.sqlite.prepare('INSERT INTO project_events VALUES(?,?,?,?,?,?)').run(event.id,event.projectId,'qa-owner',event.type,JSON.stringify({revision:2,notes:'PRIVATE ANSWER'}),event.createdAt);const packet=await projectDossierEvent(event,secret);const env={AFW_DOSSIER_SUPERVISION_ENABLED:'true',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+60000).toISOString(),AFW_DOSSIER_SIGNING_SECRET:secret,AFW_DOSSIER_PROJECT_REFS:JSON.stringify([packet.projectRef]),AFW_DOSSIER_ENROLLMENTS:JSON.stringify([{projectId:event.projectId,ownerId:'qa-owner',since:new Date(now-1000).toISOString()}]),OPERATIONS_DB:f.db,DOSSIER_BRIDGE_STATE_DB:state.db,DOSSIER_SOURCE_DB:source.db};return{...f,state,source,packet,env};}
test('committed event reaches signed receiver with no private content and one cursor',async()=>{
 const f=await fixture();const ingress=required('createDossierIngress')({now:()=>now});let sent;
 f.env.DOSSIER_RECEIVER={fetch:async req=>{sent=await req.clone().text();return ingress.fetch(req,f.env);}};
 const producer=required('createDossierProducer')({now:()=>now});assert.equal((await producer.run(f.env)).delivered,1);
 assert.doesNotMatch(sent,/PRIVATE ANSWER|qa-owner|qa-own-project|save-1/);
 assert.equal((await producer.run(f.env)).delivered,0);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_events').get().n,1);
 assert.equal(f.state.sqlite.prepare('SELECT revision FROM dossier_supervision_cursors').get().revision,2);
});
test('failed or lost receipt preserves committed response and retry is deduplicated',async()=>{
 const f=await fixture();const ingress=required('createDossierIngress')({now:()=>now});let lose=true;
 f.env.DOSSIER_RECEIVER={fetch:async req=>{const res=await ingress.fetch(req,f.env);if(lose){lose=false;throw new Error('lost receipt');}return res;}};
 const producer=required('createDossierProducer')({now:()=>now});assert.equal((await producer.run(f.env)).delivered,0);
 assert.equal(f.state.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_cursors').get().n,0);
 assert.equal(f.source.sqlite.prepare('SELECT COUNT(*) n FROM project_events').get().n,1);
 assert.equal((await producer.run(f.env)).delivered,1);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_events').get().n,1);
});
test('wrong owner, invalid enrollment or disabled producer cannot send',async()=>{
 const f=await fixture();let calls=0;f.env.DOSSIER_RECEIVER={fetch:async()=>{calls++;throw new Error('unexpected');}};
 const producer=required('createDossierProducer')({now:()=>now});
 for(const change of [{AFW_DOSSIER_SUPERVISION_ENABLED:'false'},{AFW_DOSSIER_ENROLLMENTS:'[]'},{AFW_DOSSIER_ENROLLMENTS:JSON.stringify([{projectId:event.projectId,ownerId:'foreign',since:new Date(now-1000).toISOString()}])},{AFW_DOSSIER_ENROLLMENTS:'invalid'}])await producer.run({...f.env,...change});
 assert.equal(calls,0);
});
test('forged, revoked and unknown project references fail before persistence',async()=>{
 const f=await fixture();const ingress=required('createDossierIngress')({now:()=>now});const sign=required('signedDossierRequest');
 const req=await sign(f.packet,secret,now);
 const forged=new Request(req,{headers:{...Object.fromEntries(req.headers),'x-afw-signature':'0'.repeat(64)}});
 assert.equal((await ingress.fetch(forged,f.env)).status,401);
 assert.equal((await ingress.fetch(await sign(f.packet,secret,now),{...f.env,AFW_DOSSIER_PROJECT_REFS:'[]'})).status,403);
 assert.equal((await ingress.fetch(await sign(f.packet,secret,now),{...f.env,AFW_DOSSIER_SUPERVISION_ENABLED:'false'})).status,404);
 assert.equal(f.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_events').get().n,0);
});
test('deadline is checked again after transport and never advances cursor after closure',async()=>{
 const f=await fixture();let clock=now;const ingress=required('createDossierIngress')({now:()=>clock});
 f.env.DOSSIER_RECEIVER={fetch:async req=>{const r=await ingress.fetch(req,f.env);clock=now+60001;return r;}};
 const result=await required('createDossierProducer')({now:()=>clock}).run(f.env);
 assert.equal(result.delivered,0);assert.equal(f.state.sqlite.prepare('SELECT COUNT(*) n FROM dossier_supervision_cursors').get().n,0);
});
