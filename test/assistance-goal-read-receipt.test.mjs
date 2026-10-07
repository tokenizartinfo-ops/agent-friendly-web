import test from 'node:test';
import assert from 'node:assert/strict';
import {goalSourceFixture as fixture,time} from './fixtures/assistance-goal-source.mjs';
const contract=await import('../lib/assistance-goal-read-receipt.mjs').catch(()=>({}));
test('read receipts are append-only, minimal and retries preserve the first deadline',async()=>{
 assert.equal(typeof contract.recordAssistanceGoalRead,'function');const f=await fixture();try{
 const first=await contract.recordAssistanceGoalRead({...f,now:time}),again=await contract.recordAssistanceGoalRead({...f,now:time+1000});
 assert.equal(first.status,200);assert.deepEqual(again.receipt,first.receipt);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_receipts').get().n,1);
 assert.deepEqual(Object.keys(first.receipt).sort(),['expiresAt','id','version']);assert.doesNotMatch(JSON.stringify(first),/owner|PRIVATE|sequence/);
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 const current=await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:first.receipt.id,query,now:time+1000});assert.equal(current.status,200);assert.deepEqual(current.context,f.context);
 }finally{f.close();}
});
test('withdrawal or regrant cannot revive a captured read; ownership and declarations must still match',async()=>{
 for(const change of [f=>f.grant('revoke'),f=>f.grant(),f=>f.sqlite.exec("UPDATE site_projects SET user_id='foreign'"),f=>f.sqlite.exec('UPDATE site_projects SET revision=4'),f=>f.sqlite.exec("UPDATE site_projects SET goals_json='[\"content\"]'")]){
 const f=await fixture();try{assert.equal(typeof contract.recordAssistanceGoalRead,'function');const result=await contract.recordAssistanceGoalRead({...f,now:time});change(f);
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 assert.notEqual((await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time+1000})).status,200);
 assert.notEqual((await contract.recordAssistanceGoalRead({...f,now:time+1000})).status,200);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_receipts').get().n,1);
 }finally{f.close();}}
});
test('expired, altered and foreign references do not deliver context',async()=>{
 const f=await fixture();try{assert.equal(typeof contract.recordAssistanceGoalRead,'function');const result=await contract.recordAssistanceGoalRead({...f,now:time}),query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 for(const change of [{userId:'foreign'},{now:time+30000},{query:{...query,runId:crypto.randomUUID()}},{receiptId:crypto.randomUUID()}]){
 const denied=await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time,...change});assert.notEqual(denied.status,200);assert.equal(denied.context,undefined);}
 f.context.declarations.goals=['content'];assert.notEqual((await contract.recordAssistanceGoalRead({...f,now:time})).status,200);
 }finally{f.close();}
});
test('primary state changed while hashing cannot escape the receipt validation',async()=>{
 const f=await fixture();try{const result=await contract.recordAssistanceGoalRead({...f,now:time});let reads=0;
 const db={prepare(sql){const statement=f.db.prepare(sql);return{bind(...args){const bound=statement.bind(...args);return{async first(){const row=await bound.first();if(sql.includes('SELECT r.id,r.context_hash')&&++reads===1)f.grant('revoke');return row;}};}};}};
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 const denied=await contract.readCurrentAssistanceGoalReceipt({db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time});assert.notEqual(denied.status,200);assert.equal(denied.context,undefined);
 }finally{f.close();}
});
test('a changed source event cannot reuse a receipt for the previous request',async()=>{
 const f=await fixture();try{const result=await contract.recordAssistanceGoalRead({...f,now:time});const changed={...f.snapshot.source.payload,requestId:crypto.randomUUID()};
 f.sqlite.prepare('UPDATE project_events SET payload_json=?').run(JSON.stringify(changed));
 const query={eventId:f.context.eventId,projectRef:f.context.projectRef,runId:f.context.runId,revision:3};
 assert.notEqual((await contract.readCurrentAssistanceGoalReceipt({db:f.db,projectId:'own',userId:'owner',receiptId:result.receipt.id,query,now:time})).status,200);
 }finally{f.close();}
});
