import test from 'node:test';
import assert from 'node:assert/strict';
const contract=await import('../lib/assistance-goal-proposal.mjs').catch(()=>({}));
const time=1791323200000;
function fixture(){
 const query={eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:'11111111-1111-4111-8111-111111111111',revision:3,receiptId:'22222222-2222-4222-8222-222222222222'};
 const state={open:true,service:{id:'synthetic-proposal-service',purpose:'afw.goal-guidance.propose.v1'},mapping:{projectId:'own',userId:'owner',sourceId:'help-'+'c'.repeat(64)},lease:{eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:3,topic:'orientation',expiresAt:time+30000},read:{status:200,receipt:{id:query.receiptId,contextHash:'d'.repeat(64),consentSequence:1,expiresAt:time+30000},context:{version:'afw.assistance-goal-context.v1',eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:3,expiresAt:time+30000,declarations:{siteType:'commerce',goals:['discovery']},evidenceStatus:'owner_declared',operationsAuthorized:false}},generated:0};
 const deps={authenticate:async()=>structuredClone(state.service),resolveSource:async()=>structuredClone(state.mapping),readLease:async()=>structuredClone(state.lease),readReceipt:async()=>structuredClone(state.read),isOpen:()=>state.open,getWindowExpiresAt:()=>time+60000,now:()=>time,generate:async(input)=>{state.generated++;assert.deepEqual(Object.keys(input).sort(),['declarations','evidenceStatus','operationsAuthorized']);return{question:'¿Qué información debería encontrar primero un asistente?',why:'Tu objetivo actual es facilitar el descubrimiento. Podemos empezar por esa información.'};}};
 return{query,state,deps};
}
test('proposal asks one question without transmitting internal references or authorizing edits',async()=>{
 assert.equal(typeof contract.createAssistanceGoalProposal,'function');const f=fixture(),result=await contract.createAssistanceGoalProposal(f.deps)(f.query);
 assert.equal(result.status,200);assert.equal(result.proposal.reviewRequired,true);assert.equal(result.proposal.operationsAuthorized,false);assert.equal(result.proposal.receiptId,f.query.receiptId);assert.equal(result.proposal.expiresAt,time+30000);assert.equal(f.state.generated,1);assert.doesNotMatch(JSON.stringify(result),/owner|sequence|contextHash|own"/);
});
test('missing authority, wrong purpose, expired receipt or substituted run prevent generation',async()=>{
 for(const change of [f=>{f.state.service.purpose='afw.operations.read.v1';},f=>{f.state.read.status=403;},f=>{f.state.read.receipt.expiresAt=time;},f=>{f.state.lease.runId='33333333-3333-4333-8333-333333333333';},f=>{f.state.open=false;}]){
 const f=fixture();change(f);const result=await contract.createAssistanceGoalProposal(f.deps)(f.query);assert.notEqual(result.status,200);assert.equal(f.state.generated,0);assert.equal(result.proposal,undefined);}
});
test('withdrawal, regrant, revision, service or window change during generation discard the answer',async()=>{
 for(const change of [f=>{f.state.read.status=403;},f=>{f.state.read.receipt.consentSequence++;},f=>{f.state.read.context.revision++;},f=>{f.state.service.id='other';},f=>{f.state.lease=null;},f=>{f.state.open=false;}]){
 const f=fixture();f.deps.generate=async()=>{change(f);return{question:'¿Qué necesitás mostrar?',why:'Revisamos lo esencial.'};};const result=await contract.createAssistanceGoalProposal(f.deps)(f.query);assert.notEqual(result.status,200);assert.equal(result.proposal,undefined);}
});
test('untrusted model output and stalled generation cannot reach the user',async()=>{
 for(const output of [{question:'<script>alert(1)</script>',why:'x'},{question:'Visita https://example.com',why:'x'},{question:'x',why:'x',publish:true},{question:'x'.repeat(301),why:'x'},null]){
 const f=fixture();f.deps.generate=async()=>output;assert.notEqual((await contract.createAssistanceGoalProposal(f.deps)(f.query)).status,200);}
 const f=fixture();let signal;f.deps.generate=async(_input,options)=>{signal=options.signal;return new Promise(()=>{});};
 const result=await contract.createAssistanceGoalProposal({...f.deps,timeoutMs:20})(f.query);assert.notEqual(result.status,200);assert.equal(signal.aborted,true);
});
test('generation aborts at the receipt deadline rather than the longer configuration window',async()=>{
 const f=fixture();f.state.read.receipt.expiresAt=time+20;f.state.read.context.expiresAt=time+20;let signal;
 f.deps.generate=async(_input,options)=>{signal=options.signal;return new Promise(()=>{});};
 const atDeadline=new Promise(resolve=>setTimeout(()=>resolve(signal?.aborted),100));
 const result=await contract.createAssistanceGoalProposal({...f.deps,timeoutMs:200})(f.query);assert.equal(await atDeadline,true);
 assert.notEqual(result.status,200);assert.equal(signal.aborted,true);
});
