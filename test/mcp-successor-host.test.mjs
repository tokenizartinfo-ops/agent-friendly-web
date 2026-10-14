import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {fixture} from './fixtures/mcp-own-durable-host.mjs';
import {createOwnDurableEventHost} from '../lib/mcp-own-durable-host.mjs';
import {createDossierMonitoringAuthorization} from '../lib/dossier-monitoring-authority.mjs';
import {resolveSuccessorPreparation} from '../lib/mcp-successor-manifest.mjs';
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
 f.config.successor={version:'afw.successor-host.v1',plan,readRetirement:async()=>({...retirement,observedAt:Date.now()}),readDeployment:async()=>({scopeHash:resolved.candidate.scopeHash,programHash:candidate.programHash,sourceRevision:candidate.sourceRevision,observedAt:Date.now()})};
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
