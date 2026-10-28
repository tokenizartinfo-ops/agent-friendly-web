import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createNodeProcessCustody} from '../lib/mcp-node-process-custody.mjs';
import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
let observeOwnSuccessorRetiredCustody;
try{({observeOwnSuccessorRetiredCustody}=await import('../lib/mcp-own-successor-retirement-host.mjs'));}catch(e){if(e.code!=='ERR_MODULE_NOT_FOUND')throw e;}
const available={skip:typeof observeOwnSuccessorRetiredCustody!=='function'};
test('successor retirement exposes its separate read-only host',()=>assert.equal(typeof observeOwnSuccessorRetiredCustody,'function'));
async function prepared({closed=true,read=true,monitor=true}={}){
 const f=fixture({resource:'https://delegated-canary.agentfriendlyweb.dev/mcp'});f.grant();
 f.db.exec(readFileSync('db/dossier-successor-reservation.sql','utf8'));
 const config=f.config,namespace={idFromName:name=>{assert.equal(name,'afw-own-event-first-successor-v1');return config.ctx.id;},idFromString:id=>({toString:()=>id}),get:()=>assert.fail('no RPC from reader')};
 const scope={accountId:'1'.repeat(32),workerName:'agent-friendly-web-delegated-canary',namespaceId:'2'.repeat(32),applicationId:'own-app',ownerRef:'3'.repeat(64),projectRef:'4'.repeat(64),resource:config.context.resource};
 const original={containerId:'b'.repeat(64),applicationId:scope.applicationId,programHash:'d'.repeat(64),sourceRevision:'e'.repeat(40)};
 const candidate={trialId:'f'.repeat(64),programHash:createHash('sha256').update(config.program).digest('hex'),sourceRevision:config.sourceRevision,...config.window,budget:1},resolved=resolveSuccessorPreparation({scope,original,candidate,namespace}),n=Date.now();
 f.db.prepare('INSERT INTO dossier_successor_reservations VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').run('afw.own-successor.v1',candidate.trialId,original.containerId,'5'.repeat(64),original.programHash,original.sourceRevision,scope.applicationId,resolved.candidate.containerId,candidate.programHash,candidate.sourceRevision,resolved.candidate.scopeHash,candidate.startAt,candidate.expiresAt,1,n-100,n-100,n,n,'prepared');
 const primary={prepare:config.db.prepare,withSession(mode){assert.equal(mode,'first-primary');return this;}};
 const env={DB:primary,AFW_DOSSIER_EVENTS_NODE:namespace,AFW_DOSSIER_EVENTS_ENABLED:'false',AFW_DOSSIER_EVENTS_NODE_NAME:'afw-own-event-first-successor-v1',AFW_DOSSIER_EVENTS_POLICY:JSON.stringify({grantId:'g',subject:'owner',projectId:'p',clientId:'client',resource:scope.resource,...config.window}),AFW_OAUTH_ISSUER:'https://delegated-canary.agentfriendlyweb.dev',AFW_OAUTH_RESOURCE:scope.resource,AFW_OAUTH_PILOT_CLIENT_ID:'client',AFW_OAUTH_PILOT_PROJECT_ID:'p',AFW_DOSSIER_EVENTS_PROJECTION_SECRET:config.projectionSecret,AFW_DOSSIER_EVENTS_CUSTODY_KEY:config.custodyKey.toString('base64'),AFW_DOSSIER_SUCCESSOR_POLICY:JSON.stringify({scope,original,candidate,publication:{artifactKey:'6'.repeat(64),workerHash:'7'.repeat(64),activationKey:'8'.repeat(64)}}),AFW_DOSSIER_RETIREMENT_POLICY:'original-retirement-policy-preserved',AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED:'true'};
 let boot,running=false,launches=0;const runtime={launch:async({key,...m})=>{assert.equal(key.length,32);boot=m;running=true;launches++;},observe:async()=>({...boot,running}),close:async()=>{running=false;}};
 const custody=createNodeProcessCustody({enabled:true,db:primary,context:config.context,projectId:'p',projectionSecret:config.projectionSecret,storage:config.ctx.storage,custodyKey:config.custodyKey,containerId:config.ctx.id.toString(),programHash:candidate.programHash,sourceRevision:config.sourceRevision,image:'cloudflare/debian-trixie',window:config.window,runtime,now:Date.now});
 const ready=await custody.start();if(closed)await custody.close();const t=Date.now();
 if(read)f.db.prepare("UPDATE delegated_access_grants SET revoked_at=? WHERE id='g'").run(new Date(t).toISOString());
 if(monitor)f.db.prepare("INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)").run('g','p','owner','client',scope.resource,1,'revoke','afw.dossier-monitoring.v1','22222222-2222-4222-8222-222222222222',t,t);
 const ctx={id:config.ctx.id,storage:config.ctx.storage,get container(){assert.fail('reader cannot access Container');}};
 const input={env,ctx,program:config.program,sourceRevision:config.sourceRevision,now:()=>Math.max(Date.now(),candidate.expiresAt+1000)};
 return {...f,input,ready,launches:()=>launches};
}
test('retired successor reads sealed custody after expiry with live flags and provider credential absent',available,async()=>{
 const f=await prepared();try{const before=JSON.stringify({rows:f.rows(),grants:f.db.prepare('SELECT * FROM delegated_access_grants').all(),reservation:f.db.prepare('SELECT * FROM dossier_successor_reservations').all()}),policy=f.input.env.AFW_DOSSIER_RETIREMENT_POLICY;
 const result=await observeOwnSuccessorRetiredCustody(f.input);
 assert.equal(result.purpose,'afw.node-retirement-observation.v1');assert.equal(result.processGeneration,f.ready.processGeneration);assert.equal(result.physicalStopVerified,false);assert.equal(result.mayStartSuccessor,false);assert.equal(f.launches(),1);assert.equal(f.input.env.AFW_DOSSIER_RETIREMENT_POLICY,policy);
 assert.equal(JSON.stringify({rows:f.rows(),grants:f.db.prepare('SELECT * FROM delegated_access_grants').all(),reservation:f.db.prepare('SELECT * FROM dossier_successor_reservations').all()}),before);
 }finally{f.close();}
});
test('expiry cannot replace either withdrawal or sealed terminal custody',available,async()=>{
 for(const options of [{closed:false},{read:false},{monitor:false}]){const f=await prepared(options);try{await assert.rejects(observeOwnSuccessorRetiredCustody(f.input));assert.equal(f.launches(),1);}finally{f.close();}}
});
test('disabled, foreign, unreserved and tampered successor cannot be observed',available,async()=>{
 for(const mode of ['disabled','flag-absent','name','identity','source','program','trial','window','reservation','seal']){
 const f=await prepared();try{const {env,ctx}=f.input;
 if(mode==='disabled')env.AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED='false';
 if(mode==='flag-absent')delete env.AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED;
 if(mode==='name')env.AFW_DOSSIER_EVENTS_NODE_NAME='afw-own-event-one-occurrence-v1';
 if(mode==='identity')ctx.id={toString:()=> '0'.repeat(64)};
 if(mode==='source')f.input.sourceRevision='0'.repeat(40);
 if(mode==='program')f.input.program+='changed';
 if(mode==='trial'||mode==='window'){const p=JSON.parse(env.AFW_DOSSIER_SUCCESSOR_POLICY);if(mode==='trial')p.candidate.trialId='0'.repeat(64);else p.candidate.expiresAt++;env.AFW_DOSSIER_SUCCESSOR_POLICY=JSON.stringify(p);}
 if(mode==='reservation'){const p=env.DB.prepare;env.DB.prepare=sql=>sql.includes('dossier_successor_reservations')?{bind:()=>({first:async()=>null})}:p(sql);}
 if(mode==='seal'){await ctx.storage.transaction(async tx=>{const key='afw.node-process-custody.v1:original',v=await tx.get(key);await tx.put(key,{...v,seal:'0'.repeat(64)});});}
 await assert.rejects(observeOwnSuccessorRetiredCustody(f.input));assert.equal(f.launches(),1);
 }finally{f.close();}}
});
test('opt-in denies before any storage access, and in-flight binding drift denies late evidence',available,async()=>{
 const f=await prepared();try{const {env}=f.input;env.AFW_DOSSIER_SUCCESSOR_RETIREMENT_READ_ENABLED='false';env.DB.prepare=()=>assert.fail('disabled SQL');await assert.rejects(observeOwnSuccessorRetiredCustody(f.input));}finally{f.close();}
 const g=await prepared();try{const {env,ctx}=g.input,base=ctx.storage;ctx.storage={transaction:async fn=>{const r=await base.transaction(fn);env.AFW_DOSSIER_SUCCESSOR_POLICY+=' ';return r;}};await assert.rejects(observeOwnSuccessorRetiredCustody(g.input));}finally{g.close();}
});

test('a stalled primary read has one original deadline and late completion cannot read custody',available,async t=>{
 const f=await prepared();t.mock.timers.enable({apis:['setTimeout']});try{
 const {env,ctx}=f.input,prepare=env.DB.prepare;let release,queries=0,reads=0;
 env.DB.prepare=sql=>sql.includes('dossier_successor_reservations')?{bind:()=>({first:()=>{queries++;return new Promise(resolve=>{release=resolve;});}})}:prepare(sql);
 ctx.storage={transaction:()=>{reads++;assert.fail('late custody read');}};
 const pending=observeOwnSuccessorRetiredCustody(f.input);const rejected=assert.rejects(pending);t.mock.timers.tick(5001);await rejected;
 release?.(null);await Promise.resolve();await Promise.resolve();assert.equal(queries,1);assert.equal(reads,0);
 }finally{t.mock.timers.reset();f.close();}
});
