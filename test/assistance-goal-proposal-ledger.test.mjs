import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {goalSourceFixture,time} from './fixtures/assistance-goal-source.mjs';
import {recordAssistanceGoalRead} from '../lib/assistance-goal-read-receipt.mjs';
const contract=await import('../lib/assistance-goal-proposal-ledger.mjs').catch(()=>({}));
async function fixture(){
 const f=await goalSourceFixture();if(typeof contract.reserveAssistanceGoalProposal==='function')f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));
 const result=await recordAssistanceGoalRead({...f,now:time}),receiptId=result.receipt.id;
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3,receiptId};
 const scope={db:f.db,projectId:'own',userId:'owner',query,now:time};
 const proposal={version:'afw.assistance-goal-proposal.v1',receiptId,revision:3,expiresAt:f.context.expiresAt,message:{question:'¿Qué información conviene mostrar primero?',why:'Podemos empezar por lo esencial.'},reviewRequired:true,operationsAuthorized:false};
 return{...f,scope,proposal};
}
test('one atomic claim prevents parallel generators and retries recover the saved proposal',async()=>{
 assert.equal(typeof contract.reserveAssistanceGoalProposal,'function');const f=await fixture();try{
 const claims=await Promise.all([contract.reserveAssistanceGoalProposal(f.scope),contract.reserveAssistanceGoalProposal(f.scope)]);
 assert.equal(claims.filter(x=>x.mode==='claimed').length,1);assert.equal(claims.filter(x=>x.mode==='processing').length,1);
 const claim=claims.find(x=>x.mode==='claimed');const first=await contract.completeAssistanceGoalProposal({...f.scope,claimId:claim.claimId,proposal:f.proposal});assert.equal(first.status,200);
 const retry=await contract.reserveAssistanceGoalProposal({...f.scope,now:time+1000});assert.equal(retry.mode,'prepared');assert.equal(retry.proposalId,first.proposalId);assert.deepEqual(retry.proposal,f.proposal);
 const changed={...f.proposal,message:{question:'¿Otra pregunta?',why:'Otro motivo.'}};
 assert.notEqual((await contract.completeAssistanceGoalProposal({...f.scope,claimId:claim.claimId,proposal:changed})).status,200);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_claims').get().n,1);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').get().n,1);
 }finally{f.close();}
});
test('withdrawal and regrant deny cached output and do not regenerate a failed attempt',async()=>{
 for(const change of [f=>f.grant('revoke'),f=>f.grant(),f=>f.sqlite.exec("UPDATE site_projects SET user_id='foreign'")]){
 const f=await fixture();try{assert.equal(typeof contract.reserveAssistanceGoalProposal,'function');const claim=await contract.reserveAssistanceGoalProposal(f.scope);assert.equal((await contract.completeAssistanceGoalProposal({...f.scope,claimId:claim.claimId,proposal:f.proposal})).status,200);change(f);
 const denied=await contract.reserveAssistanceGoalProposal(f.scope);assert.notEqual(denied.status,200);assert.equal(denied.proposal,undefined);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').get().n,1);
 }finally{f.close();}}
 const f=await fixture();try{const claim=await contract.reserveAssistanceGoalProposal(f.scope);const expired=await contract.reserveAssistanceGoalProposal({...f.scope,now:claim.expiresAt});assert.notEqual(expired.mode,'claimed');assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_claims').get().n,1);}finally{f.close();}
});
test('invalid output, foreign claims and withdrawal before completion never store a proposal',async()=>{
 const f=await fixture();try{assert.equal(typeof contract.reserveAssistanceGoalProposal,'function');const claim=await contract.reserveAssistanceGoalProposal(f.scope);
 for(const change of [{claimId:crypto.randomUUID()},{proposal:{...f.proposal,operationsAuthorized:true}},{proposal:{...f.proposal,message:{question:'<script>?',why:'x'}}}])assert.notEqual((await contract.completeAssistanceGoalProposal({...f.scope,claimId:claim.claimId,proposal:f.proposal,...change})).status,200);
 f.grant('revoke');assert.notEqual((await contract.completeAssistanceGoalProposal({...f.scope,claimId:claim.claimId,proposal:f.proposal})).status,200);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').get().n,0);
 }finally{f.close();}
});
