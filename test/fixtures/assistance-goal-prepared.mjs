import {readFileSync} from 'node:fs';
import {goalSourceFixture,time} from './assistance-goal-source.mjs';
import {recordAssistanceGoalRead} from '../../lib/assistance-goal-read-receipt.mjs';
import {reserveAssistanceGoalProposal,completeAssistanceGoalProposal} from '../../lib/assistance-goal-proposal-ledger.mjs';
export async function preparedGoalFixture(){
 const f=await goalSourceFixture();
 f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));
 f.sqlite.exec(readFileSync('db/assistance-goal-read-confirmations.sql','utf8'));
 const receipt=await recordAssistanceGoalRead({...f,now:time});
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3,receiptId:receipt.receipt.id};
 const scope={db:f.db,projectId:'own',userId:'owner',query,now:time};
 const claim=await reserveAssistanceGoalProposal(scope);
 const proposal={version:'afw.assistance-goal-proposal.v1',receiptId:query.receiptId,revision:3,expiresAt:f.context.expiresAt,message:{question:'¿Qué querés mostrar primero?',why:'Empezamos por tu prioridad.'},reviewRequired:true,operationsAuthorized:false};
 const result=await completeAssistanceGoalProposal({...scope,claimId:claim.claimId,proposal});
 if(result.status!==200){f.close();throw Error('prepared fixture failed');}
 return{...f,proposalId:result.proposalId,scope,proposal};
}
