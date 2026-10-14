import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
import {createDossierMonitoringAuthorization} from '../lib/dossier-monitoring-authority.mjs';
import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
// Native SQLite on Windows can lag Date.now by a few milliseconds. Synthetic
// provider observations use the primary clock; production freshness stays strict.
const observationTime=f=>Math.min(Date.now(),f.db.prepare("SELECT CAST(strftime('%s','now') AS INTEGER)*1000+CAST(substr(strftime('%f','now'),4,3) AS INTEGER) t").get().t);
const params=projectRef=>({name:'afw.dossier.changed',arguments:{projectRef},delivery:{mode:'webhook',url:'https://callback.agentfriendlyweb.dev/hook',secret:'whsec_'+Buffer.alloc(32,3).toString('base64')},ttlMs:30000});
async function own(){
 const f=fixture({resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'});f.grant();
 for(const schema of ['dossier-successor-reservation','dossier-successor-launch'])f.db.exec(readFileSync('db/'+schema+'.sql','utf8'));
 const base=f.config.db;f.config.db={withSession(){return this;},prepare:sql=>({bind:(...args)=>{const q=base.prepare(sql).bind(...args);return {...q,run:async()=>({success:true,...await q.run()})};}})};
 const auth=await createDossierMonitoringAuthorization({...f.config})(),now=Date.now();
 const scope={accountId:'1'.repeat(32),namespaceId:'2'.repeat(32),workerName:'agent-friendly-web-delegated-canary',applicationId:'own-app',ownerRef:auth.principalRef,projectRef:auth.projectRef,resource:f.config.context.resource};
 const original={containerId:'b'.repeat(64),applicationId:'own-app',programHash:'d'.repeat(64),sourceRevision:'e'.repeat(40)};
 const candidate={trialId:'f'.repeat(64),programHash:createHash('sha256').update(f.config.program).digest('hex'),sourceRevision:f.config.sourceRevision,...f.config.window,budget:1};
 const namespace={idFromName:()=>f.config.ctx.id,idFromString:v=>({toString:()=>v})},plan={scope,original,candidate,namespace},resolved=resolveSuccessorPreparation(plan);
 const retirement={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'3'.repeat(64),closedAt:now-100,stoppedAt:now-100,observedAt:now,physicalStopVerified:true,mayStartSuccessor:false};
 f.db.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('afw.own-successor.v1',candidate.trialId,original.containerId,retirement.processGeneration,original.programHash,original.sourceRevision,scope.applicationId,resolved.candidate.containerId,candidate.programHash,candidate.sourceRevision,resolved.candidate.scopeHash,candidate.startAt,candidate.expiresAt,1,retirement.closedAt,retirement.stoppedAt,now,now,'prepared');
 f.config.successor={version:'afw.successor-host.v1',plan,readRetirement:async()=>({...retirement,observedAt:observationTime(f)}),readDeployment:async()=>({scopeHash:resolved.candidate.scopeHash,programHash:candidate.programHash,sourceRevision:candidate.sourceRevision,observedAt:observationTime(f)})};
 return {...f,projectRef:auth.projectRef};
}
test('successor host uses custody and signed loop, consumes one launch, closes without readers',async()=>{
 const f=await own();try{let unavailable=false;const read=f.config.successor.readDeployment;f.config.successor.readDeployment=async()=>{if(unavailable)throw Error('offline');return read();};
 const h=createOwnDurableEventHost(f.config);f.setHost(h);await h.subscribe(params(f.projectRef));assert.equal(f.boots(),1);assert.equal(f.sends(),1);assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_successor_launch_claims').get().n,1);
 unavailable=true;await h.close();assert.equal(f.config.ctx.container.running,false);await assert.rejects(h.subscribe(params(f.projectRef)));assert.equal(f.boots(),1);
 }finally{f.close();}
});
test('successor failure before and after start records closure and cannot retry',async()=>{
 for(const mode of ['before','after']){const f=await own();try{
 if(mode==='before')f.config.successor.readDeployment=async()=>{throw Error('offline');};
 else f.config.ctx.container.interceptOutboundHttp=async()=>{throw Error('after start');};
 const h=createOwnDurableEventHost(f.config);f.setHost(h);await assert.rejects(h.subscribe(params(f.projectRef)));assert.equal(f.boots(),mode==='before'?0:1);assert.equal(f.config.ctx.container.running,false);
 assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_node_process_closures').get().n,1);await assert.rejects(h.subscribe(params(f.projectRef)));assert.equal(f.boots(),mode==='before'?0:1);
 }finally{f.close();}}
});
test('successor host rejects manifest mismatch at construction',async()=>{
 const f=await own();try{f.config.successor.plan.candidate.programHash='0'.repeat(64);assert.throws(()=>createOwnDurableEventHost(f.config));assert.equal(f.boots(),0);}finally{f.close();}
});
test('namespace drift after launch cannot obstruct independent closure',async()=>{
 const f=await own();try{const h=createOwnDurableEventHost(f.config);f.setHost(h);await h.subscribe(params(f.projectRef));
 f.config.successor.plan.namespace.idFromName=()=>{throw Error('binding unavailable');};
 await h.close();assert.equal(f.config.ctx.container.running,false);
 }finally{f.close();}
});
test('lost successor claim ACK closes custody without starting or replaying',async()=>{
 const f=await own();try{const base=f.config.db;f.config.db={...base,withSession(){return this;},prepare:sql=>({bind:(...args)=>{const q=base.prepare(sql).bind(...args);return {...q,run:async()=>{const result=await q.run();if(sql.startsWith('INSERT INTO dossier_successor_launch_claims'))throw Error('lost ACK');return result;}};}})};
 const h=createOwnDurableEventHost(f.config);f.setHost(h);await assert.rejects(h.subscribe(params(f.projectRef)));await assert.rejects(h.subscribe(params(f.projectRef)));
 assert.equal(f.boots(),0);assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_successor_launch_claims').get().n,1);assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_node_process_closures').get().n,1);
 }finally{f.close();}
});

async function mountedOwn({receipt=true,activation=true}={}){
 const f=await own(),{registerHooks}=await import('node:module');
 globalThis.__AFW_NODE_PROGRAM__=f.config.program;globalThis.__AFW_NODE_SOURCE_REVISION__=f.config.sourceRevision;
 const hook=registerHooks({resolve(s,c,next){return s==='cloudflare:workers'?{url:'data:text/javascript,export class DurableObject {constructor(ctx,env){this.ctx=ctx;this.env=env;}} export class WorkerEntrypoint {constructor(ctx,env){this.ctx=ctx;this.env=env;}}',shortCircuit:true}:next(s,c);}});
 let Actor;try{({AfwOwnEventNode:Actor}=await import('../worker/mcp-own/index.mjs'));}finally{hook.deregister();delete globalThis.__AFW_NODE_PROGRAM__;delete globalThis.__AFW_NODE_SOURCE_REVISION__;}
 const {scope,original,candidate,namespace}=f.config.successor.plan,artifactKey='7'.repeat(64),workerHash='8'.repeat(64),versionId='22222222-2222-4222-8222-222222222222',deploymentId='11111111-1111-4111-8111-111111111111',etag='9'.repeat(64),closedAt=(await f.config.successor.readRetirement()).closedAt;
 f.db.exec(readFileSync('db/dossier-publication-receipt.sql','utf8'));f.db.exec(readFileSync('db/dossier-activation-receipt.sql','utf8'));
 f.db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').run(artifactKey,scope.accountId,scope.workerName,candidate.sourceRevision,'6'.repeat(40),candidate.programHash,workerHash,Date.now());
 if(receipt){f.db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').run(artifactKey,'44444444-4444-4444-8444-444444444444',etag,Date.now());f.db.prepare('INSERT INTO dossier_activation_attempts VALUES(?,?,?,?,?,?,?,?)').run('a'.repeat(64),artifactKey,candidate.trialId,resolveSuccessorPreparation(f.config.successor.plan).candidate.scopeHash,'b'.repeat(64),candidate.startAt,candidate.expiresAt,Date.now());if(activation){f.db.prepare('INSERT INTO dossier_activation_receipts VALUES(?,?,?,?,?)').run('a'.repeat(64),versionId,deploymentId,etag,Date.now());f.db.prepare('INSERT INTO dossier_activation_acceptances VALUES(?,?)').run('a'.repeat(64),Date.now());}}
 let reads=0;namespace.get=id=>{assert.equal(id.toString(),original.containerId);return{async observeRetired(){reads++;return{purpose:'afw.node-retirement-observation.v1',containerId:original.containerId,programHash:original.programHash,sourceRevision:original.sourceRevision,processGeneration:'3'.repeat(64),image:'cloudflare/debian-trixie',createdAt:closedAt-4000,expiresAt:closedAt-1000,closedAt,observedAt:observationTime(f),physicalStopVerified:false,mayStartSuccessor:false};}};};
 const env={DB:f.config.db,AFW_DOSSIER_EVENTS_NODE:namespace,AFW_DOSSIER_EVENTS_ENABLED:'true',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({...f.config.context,scopes:undefined,projectId:'p',containerId:f.config.ctx.id.toString(),...f.config.window}),AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:scope.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_DOSSIER_EVENTS_PROJECTION_SECRET:f.config.projectionSecret,AFW_DOSSIER_EVENTS_CUSTODY_KEY:f.config.custodyKey.toString('base64'),AFW_DOSSIER_SUCCESSOR_ENABLED:'true',AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey,workerHash,activationKey:'a'.repeat(64)}}),AFW_DOSSIER_PROVIDER_READ_TOKEN:'synthetic_read_only_credential'};
 let calls=0;const fetchImpl=async(url,init)=>{calls++;assert.equal(init.method,'GET');const result=url.includes('/instances/')?{id:original.containerId,application_id:scope.applicationId,image:'cloudflare/debian-trixie',started_at:new Date(closedAt-3000).toISOString(),status:{state:'stopped',exit_code:0,updated_at:new Date(closedAt).toISOString()}}:url.endsWith('/deployments')?{deployments:[{id:deploymentId,strategy:'percentage',versions:[{version_id:versionId,percentage:100}]}]}:url.includes('/versions/')?{id:versionId,resources:{script:{etag},bindings:[{name:'AFW_DOSSIER_EVENTS_NODE',type:'durable_object_namespace',namespace_id:scope.namespaceId,class_name:'AfwOwnEventNode'}]}}:{id:scope.applicationId,account_id:scope.accountId,scheduling_policy:'durable_object',durable_objects:{namespace_id:scope.namespaceId}};return Response.json({success:true,errors:[],result});};
 let actor;f.config.ctx.exports={AfwNodeControl:({props})=>({fetch:request=>actor.consume(request,props)})};actor=new Actor(f.config.ctx,env);
 return {...f,actor,env,fetchImpl,reads:()=>reads,calls:()=>calls};
}
test('concrete successor Worker rejects absent release receipt before Container boot',async()=>{
 const f=await mountedOwn({receipt:false}),saved=globalThis.fetch;try{globalThis.fetch=f.fetchImpl;await assert.rejects(f.actor.subscribe(params(f.projectRef)));assert.equal(f.boots(),0);}finally{globalThis.fetch=saved;f.close();}
});
test('concrete successor Worker reads original RPC and provider, then closes without candidate configuration',async()=>{
 const f=await mountedOwn(),saved=globalThis.fetch;try{globalThis.fetch=f.fetchImpl;await f.actor.subscribe(params(f.projectRef));assert.equal(f.boots(),1);assert.ok(f.reads()>=2);assert.ok(f.calls()>=6);delete f.env.AFW_DOSSIER_SUCCESSOR_POLICY;delete f.env.AFW_DOSSIER_PROVIDER_READ_TOKEN;await f.actor.close();assert.equal(f.config.ctx.container.running,false);assert.equal(f.boots(),1);}finally{globalThis.fetch=saved;f.close();}
});

test('concrete candidate cannot bypass gate by disabling flag or replacing policy',async()=>{
 for(const mode of ['disabled','missing','source','drift','unresolved']){
  const f=await mountedOwn(),saved=globalThis.fetch;try{
   globalThis.fetch=async(...args)=>{const r=await f.fetchImpl(...args);if(mode==='drift')f.env.AFW_DOSSIER_SUCCESSOR_ENABLED='false';return r;};
   if(mode==='disabled')f.env.AFW_DOSSIER_SUCCESSOR_ENABLED='false';
   if(mode==='missing'){delete f.env.AFW_DOSSIER_SUCCESSOR_ENABLED;delete f.env.AFW_DOSSIER_SUCCESSOR_POLICY;}
   if(mode==='unresolved'){delete f.env.AFW_DOSSIER_SUCCESSOR_ENABLED;delete f.env.AFW_DOSSIER_SUCCESSOR_POLICY;delete f.env.AFW_DOSSIER_EVENTS_NODE.idFromName;}
   if(mode==='source'){const p=JSON.parse(f.env.AFW_DOSSIER_SUCCESSOR_POLICY);p.candidate.sourceRevision='0'.repeat(40);f.env.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify(p);}
   await assert.rejects(f.actor.subscribe(params(f.projectRef)));assert.equal(f.boots(),0);
   await f.actor.close();assert.equal(f.config.ctx.container.running,false);
  }finally{globalThis.fetch=saved;f.close();}
 }
});

test('concrete successor does not launch with only a closed publication receipt',async()=>{const f=await mountedOwn({activation:false}),saved=globalThis.fetch;try{globalThis.fetch=f.fetchImpl;await assert.rejects(f.actor.subscribe(params(f.projectRef)));assert.equal(f.boots(),0);}finally{globalThis.fetch=saved;f.close();}});
