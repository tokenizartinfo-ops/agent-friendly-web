import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {preparedGoalFixture} from './fixtures/assistance-goal-prepared.mjs';
import {time} from './fixtures/assistance-goal-source.mjs';
import {readOwnerAssistanceGoalProposal} from '../lib/assistance-goal-owner-proposal.mjs';
const contract=await import('../lib/assistance-goal-read-confirmation.mjs').catch(()=>({}));
async function fixture(){const f=await preparedGoalFixture();f.sqlite.exec(readFileSync('db/assistance-goal-read-confirmations.sql','utf8'));return f;}
test('explicit reading confirmation has one stable receipt after a lost response, without accepting or saving answers',async()=>{
 assert.equal(typeof contract.confirmOwnerAssistanceGoalRead,'function');
 const f=await fixture();try{
 const options={db:f.db,projectId:'own',userId:'owner',sourceId:f.snapshot.source.id,proposalId:f.proposalId,revision:3,requestId:crypto.randomUUID(),now:time};
 const first=await contract.confirmOwnerAssistanceGoalRead(options);assert.equal(first.status,200);assert.equal(first.confirmedAt,time);
 const fetched=await readOwnerAssistanceGoalProposal(options);assert.equal(fetched.guidance.confirmedAt,time);assert.equal(fetched.guidance.proposalId,f.proposalId);
 const retry=await contract.confirmOwnerAssistanceGoalRead({...options,now:time+2000});assert.deepEqual(retry,first);
 const afterExpiry=await contract.confirmOwnerAssistanceGoalRead({...options,now:f.context.expiresAt+1});assert.deepEqual(afterExpiry,first);
 const parallel=await Promise.all([contract.confirmOwnerAssistanceGoalRead({...options,requestId:crypto.randomUUID()}),contract.confirmOwnerAssistanceGoalRead({...options,requestId:crypto.randomUUID()})]);
 assert.ok(parallel.every(x=>x.status===200&&x.confirmedAt===time));
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').get().n,1);
 assert.equal(f.sqlite.prepare('SELECT notes FROM site_projects').get().notes,'PRIVATE NARRATIVE');assert.equal(f.sqlite.prepare('SELECT revision FROM site_projects').get().revision,3);
 }finally{f.close();}
});
test('foreign actor, changed revision, expired proposal, wrong source and mutation during INSERT cannot record reading',async()=>{
 assert.equal(typeof contract.confirmOwnerAssistanceGoalRead,'function');
 for(const change of ['actor','revision','expired','source','race']){
 const f=await fixture();try{
 const options={db:f.db,projectId:'own',userId:'owner',sourceId:f.snapshot.source.id,proposalId:f.proposalId,revision:3,requestId:crypto.randomUUID(),now:time};
 if(change==='actor')options.userId='foreign';if(change==='source')options.sourceId='help-'+ 'b'.repeat(64);if(change==='expired')options.now=f.context.expiresAt;
 if(change==='revision')f.sqlite.exec('UPDATE site_projects SET revision=4');
 if(change==='race'){const base=f.db.prepare;f.db.prepare=sql=>{const statement=base(sql);if(sql.startsWith('INSERT')){const bind=statement.bind;statement.bind=(...args)=>{const bound=bind(...args);const run=bound.run;bound.run=async()=>{f.sqlite.exec('UPDATE site_projects SET revision=4');return run();};return bound;};}return statement;};}
 const result=await contract.confirmOwnerAssistanceGoalRead(options);assert.notEqual(result.status,200);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').get().n,0);
 }finally{f.close();}}
});
test('a reused request ID cannot acknowledge a different proposal, and withdrawing service consent does not delete owner reading history',async()=>{
 const f=await fixture();try{
 const options={db:f.db,projectId:'own',userId:'owner',sourceId:f.snapshot.source.id,proposalId:f.proposalId,revision:3,requestId:crypto.randomUUID(),now:time};
 assert.equal((await contract.confirmOwnerAssistanceGoalRead(options)).status,200);
 assert.equal((await contract.confirmOwnerAssistanceGoalRead({...options,proposalId:crypto.randomUUID()})).status,409);
 f.grant('revoke');const read=await readOwnerAssistanceGoalProposal({...options,now:time+1});assert.equal(read.guidance.confirmedAt,time);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').get().n,1);
 }finally{f.close();}
});
