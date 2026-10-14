import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {projectDossierEvent} from '../lib/dossier-supervision.mjs';
import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
const load=()=>import('../lib/mcp-successor-launch-gate.mjs');
async function fixture(retirementAge=0){
 const db=new DatabaseSync(':memory:'),now=Date.now(),secret='z'.repeat(32),context={grantId:'new',subject:'owner',clientId:'client',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',scopes:['afw:project:read']};
 db.exec('CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);');
 for(const path of ['dossier-monitoring-consent','dossier-node-process','dossier-successor-reservation','dossier-successor-launch'])db.exec(readFileSync('db/'+path+'.sql','utf8'));
 db.prepare('INSERT INTO site_projects VALUES(?,?)').run('p','owner');db.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').run('new','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(now+120000).toISOString(),'');
 db.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').run('new','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',now-1000,now+60000);
 const projected=await projectDossierEvent({id:'x',projectId:'p',type:'project_created',revision:1,createdAt:'1970-01-01T00:00:00.000Z'},secret);
 const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'own-app',ownerRef:createHash('sha256').update(JSON.stringify(['afw.dossier-monitoring.v1','principal','owner','client'])).digest('hex'),projectRef:projected.projectRef,resource:context.resource};
 const original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)},candidate={trialId:'d'.repeat(64),programHash:'e'.repeat(64),sourceRevision:'f'.repeat(40),startAt:now-1000,expiresAt:now+30000,budget:1};
 const namespace={idFromName:()=>({toString:()=> '9'.repeat(64)}),idFromString:v=>({toString:()=>v})},plan={scope,original,candidate,namespace},p=resolveSuccessorPreparation(plan);
 const evidence={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'8'.repeat(64),closedAt:now-retirementAge-1000,stoppedAt:now-retirementAge-1000,observedAt:now-retirementAge,physicalStopVerified:true,mayStartSuccessor:false};
 const columns=['slot','trial_id','predecessor_container_id','predecessor_generation','predecessor_program_hash','predecessor_source_revision','application_id','container_id','program_hash','source_revision','scope_hash','start_at','expires_at','budget','closed_at','stopped_at','observed_at','reserved_at','state'];
 db.prepare('INSERT INTO dossier_successor_reservations('+columns.join(',')+') VALUES('+columns.map(()=>'?').join(',')+')').run('afw.own-successor.v1',candidate.trialId,original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,scope.applicationId,p.candidate.containerId,candidate.programHash,candidate.sourceRevision,p.candidate.scopeHash,candidate.startAt,candidate.expiresAt,1,evidence.closedAt,evidence.stoppedAt,now,now,'prepared');
 const boot={containerId:p.candidate.containerId,processGeneration:'7'.repeat(64),programHash:candidate.programHash,sourceRevision:candidate.sourceRevision,image:'cloudflare/debian-trixie',createdAt:now,expiresAt:candidate.expiresAt,key:Buffer.alloc(32,7)};
 db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('new','p','owner','client',context.resource,1,now-1000,now+60000,boot.containerId,boot.processGeneration,boot.programHash,boot.sourceRevision,boot.image,boot.createdAt,boot.expiresAt);
 const adapter={withSession(){return this;},prepare:sql=>({bind:(...args)=>({first:async()=>db.prepare(sql).get(...args),run:async()=>{const r=db.prepare(sql).run(...args);return{success:true,meta:{changes:Number(r.changes)}};}})})};let launches=0;
 const deployment={scopeHash:p.candidate.scopeHash,sourceRevision:candidate.sourceRevision,programHash:candidate.programHash,observedAt:now};
 return{db,boot,plan,evidence,deployment,launches:()=>launches,options:{db:adapter,plan,context,projectId:'p',projectionSecret:secret,readRetirement:async()=>structuredClone(evidence),readDeployment:async()=>({...deployment}),launch:async()=>{launches++;},now:Date.now}};
}
test('successor launch consumes one claim and cannot launch twice',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture();try{const gate=createSuccessorLaunchGate(f.options),signal=new AbortController().signal;await gate(f.boot,signal);assert.equal(f.launches(),1);await assert.rejects(gate(f.boot,signal));assert.equal(f.launches(),1);assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_successor_launch_claims').get().n,1);}finally{f.db.close();}
});
test('permission withdrawal or deployment drift after claim prevents launch',async()=>{
 const {createSuccessorLaunchGate}=await load();for(const mode of ['withdraw','drift']){const f=await fixture();try{let calls=0;const original=f.options.readDeployment;f.options.readDeployment=async()=>{const d=await original();if(++calls===2){if(mode==='withdraw')f.db.prepare('UPDATE delegated_access_grants SET revoked_at=?').run(new Date().toISOString());else d.scopeHash='0'.repeat(64);}return d;};await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,new AbortController().signal));assert.equal(f.launches(),0);}finally{f.db.close();}}
});
test('lost claim ACK, stale evidence and foreign boot never launch',async()=>{
 const {createSuccessorLaunchGate}=await load();for(const mode of ['ack','stale','foreign']){const f=await fixture();try{if(mode==='stale')f.evidence.observedAt-=30001;if(mode==='foreign')f.boot.containerId='0'.repeat(64);
 if(mode==='ack'){const base=f.options.db;f.options.db={withSession(){return this;},prepare:sql=>({bind:(...args)=>{const q=base.prepare(sql).bind(...args);return{...q,run:async()=>{const r=await q.run();if(sql.startsWith('INSERT'))throw Error('lost');return r;}};}})};}
 await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,new AbortController().signal));assert.equal(f.launches(),0);
 }finally{f.db.close();}}
});

test('caller abort during launch cannot report success and temporary key is cleared',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture();try{const controller=new AbortController();let retained;
 f.options.launch=async boot=>{retained=boot.key;controller.abort();};await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,controller.signal));assert.ok(retained.every(v=>v===0));assert.ok(f.boot.key.every(v=>v===7));
 }finally{f.db.close();}
});
test('concurrent launches share the primary one-use budget',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture();try{const signal=new AbortController().signal;const r=await Promise.allSettled([createSuccessorLaunchGate(f.options)(f.boot,signal),createSuccessorLaunchGate(f.options)(f.boot,signal)]);assert.equal(r.filter(x=>x.status==='fulfilled').length,1);assert.equal(f.launches(),1);
 assert.throws(()=>f.db.exec('DELETE FROM dossier_successor_launch_claims'));
 }finally{f.db.close();}
});

test('native D1 shares launch budget across independent bindings',async()=>{
 const {Miniflare,convertV4MiniflareOptions}=await import('miniflare');
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'launch-budget',OTHER:'launch-budget'}}));
 let f;try{
 const db=await runtime.getD1Database('DB'),other=await runtime.getD1Database('OTHER');f=await fixture();
 const tables=f.db.prepare("SELECT name,sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY rowid").all();
 for(const t of tables){await db.prepare(t.sql).run();const rows=f.db.prepare('SELECT * FROM '+t.name).all();for(const row of rows){const names=Object.keys(row);await db.prepare('INSERT INTO '+t.name+'('+names.join(',')+') VALUES('+names.map(()=>'?').join(',')+')').bind(...Object.values(row)).run();}}
 for(const t of f.db.prepare("SELECT sql FROM sqlite_master WHERE type='trigger'").all())await db.prepare(t.sql).run();
 const {createSuccessorLaunchGate}=await load(),signal=new AbortController().signal;
 const results=await Promise.allSettled([db,other].map(binding=>createSuccessorLaunchGate({...f.options,db:binding})(f.boot,signal)));
 assert.equal(results.filter(r=>r.status==='fulfilled').length,1);assert.equal(f.launches(),1);
 assert.equal((await db.prepare('SELECT COUNT(*) n FROM dossier_successor_launch_claims').first()).n,1);
 await assert.rejects(other.prepare('DELETE FROM dossier_successor_launch_claims').run());
 }finally{f?.db.close();await runtime.dispose();}
});

test('process closure after claim prevents invoking launcher',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture();try{let reads=0;
 f.options.readDeployment=async()=>{if(++reads===2)f.db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').run('new',f.boot.processGeneration,f.boot.containerId,f.boot.programHash,f.boot.sourceRevision,f.boot.image,Date.now());return {...f.deployment};};
 await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,new AbortController().signal));assert.equal(f.launches(),0);
 }finally{f.db.close();}
});

test('retirement aging during final checks prevents launch',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture(29000);try{let reads=0,t=f.boot.createdAt;f.options.now=()=>t;
 f.options.readDeployment=async()=>{if(++reads===2)t+=1001;return {...f.deployment,observedAt:t};};
 await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,new AbortController().signal));assert.equal(f.launches(),0);
 }finally{f.db.close();}
});


test('final closure read starts a fresh primary session',async()=>{
 const {createSuccessorLaunchGate}=await load(),f=await fixture();try{const base=f.options.db;
 f.options.db={...base,withSession(){let queried=false;return{prepare:sql=>({bind:(...args)=>{const q=base.prepare(sql).bind(...args);const fresh=!queried;queried=true;return{...q,first:async()=>sql.startsWith('SELECT grant_id FROM dossier_node_process_closures')?(fresh?{grant_id:'new'}:null):q.first()};}})}}};
 await assert.rejects(createSuccessorLaunchGate(f.options)(f.boot,new AbortController().signal));assert.equal(f.launches(),0);
 }finally{f.db.close();}
});
