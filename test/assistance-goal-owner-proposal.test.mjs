import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {goalSourceFixture,time} from './fixtures/assistance-goal-source.mjs';
import {recordAssistanceGoalRead} from '../lib/assistance-goal-read-receipt.mjs';
import {reserveAssistanceGoalProposal,completeAssistanceGoalProposal} from '../lib/assistance-goal-proposal-ledger.mjs';
const contract=await import('../lib/assistance-goal-owner-proposal.mjs').catch(()=>({}));
test('owner sees dated minimal prepared guidance after service permission expires; foreign actor cannot read it',async()=>{
 assert.equal(typeof contract.readOwnerAssistanceGoalProposal,'function');
 const f=await goalSourceFixture();try{
 f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));
 f.sqlite.exec(readFileSync('db/assistance-goal-read-confirmations.sql','utf8'));
 const receipt=await recordAssistanceGoalRead({...f,now:time});
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3,receiptId:receipt.receipt.id};
 const scope={db:f.db,projectId:'own',userId:'owner',query,now:time};
 const claim=await reserveAssistanceGoalProposal(scope);
 const proposal={version:'afw.assistance-goal-proposal.v1',receiptId:query.receiptId,revision:3,expiresAt:f.context.expiresAt,message:{question:'¿Qué querés mostrar primero?',why:'Empezamos por tu prioridad.'},reviewRequired:true,operationsAuthorized:false};
 await completeAssistanceGoalProposal({...scope,claimId:claim.claimId,proposal});
 const options={db:f.db,projectId:'own',userId:'owner',sourceId:f.snapshot.source.id,now:time};
 const read=await contract.readOwnerAssistanceGoalProposal(options);
 assert.equal(read.status,200);assert.deepEqual(Object.keys(read.guidance).sort(),['confirmedAt','expired','expiresAt','message','preparedAt','proposalId','revision','stale']);
 assert.deepEqual(read.guidance.message,proposal.message);assert.equal(read.guidance.stale,false);
 f.grant('revoke');
 assert.equal((await contract.readOwnerAssistanceGoalProposal({...options,now:f.context.expiresAt})).guidance.expired,true);
 f.sqlite.exec('UPDATE site_projects SET revision=4');
 assert.equal((await contract.readOwnerAssistanceGoalProposal(options)).guidance.stale,true);
 assert.equal((await contract.readOwnerAssistanceGoalProposal({...options,userId:'foreign'})).status,404);
 assert.equal((await contract.readOwnerAssistanceGoalProposal({...options,sourceId:'help-'+ 'b'.repeat(64)})).guidance,null);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').get().n,1);
 }finally{f.close();}
});
