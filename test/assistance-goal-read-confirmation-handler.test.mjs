import test from 'node:test';
import assert from 'node:assert/strict';
import {preparedGoalFixture} from './fixtures/assistance-goal-prepared.mjs';
import {time} from './fixtures/assistance-goal-source.mjs';
import {createOwnerAssistanceGoalProposalHandler} from '../lib/assistance-goal-owner-proposal-handler.mjs';
const base='https://agentfriendlyweb.dev/api/projects/own/assistance-proposal';
function setup(f){return{db:f.db,getSettings:()=>({enabled:true,allowedProjectId:'own',expiresAt:new Date(time+60000).toISOString()}),getIdentity:async()=>({userId:'owner'}),limiter:{limit:async()=>({success:true})},now:()=>time};}
function body(f){return{sourceId:f.snapshot.source.id,proposalId:f.proposalId,expectedRevision:3,requestId:crypto.randomUUID()};}
const post=value=>new Request(base,{method:'POST',headers:{origin:'https://agentfriendlyweb.dev','content-type':'application/json'},body:JSON.stringify(value)});
test('same-origin explicit POST and later GET recover one saved reading receipt',async()=>{
 const f=await preparedGoalFixture();try{
 const handler=createOwnerAssistanceGoalProposalHandler(setup(f)),value=body(f);
 assert.equal((await handler(post(value),'own')).status,200);
 assert.equal((await handler(post(value),'own')).status,200);
 const response=await handler(new Request(base+'?source='+value.sourceId),'own');assert.equal(response.status,200);assert.equal((await response.json()).guidance.confirmedAt,time);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').get().n,1);
 }finally{f.close();}
});
test('foreign origin, oversized JSON, actor supplied in body and closed gate during rate limit never acknowledge',async()=>{
 const f=await preparedGoalFixture();try{
 const dependencies=setup(f),handler=createOwnerAssistanceGoalProposalHandler(dependencies);
 const foreign=new Request(base,{method:'POST',headers:{origin:'https://foreign.invalid','content-type':'application/json'},body:JSON.stringify(body(f))});
 assert.equal((await handler(foreign,'own')).status,403);
 assert.equal((await handler(post({...body(f),userId:'owner'}),'own')).status,400);
 assert.equal((await handler(post({...body(f),padding:'x'.repeat(900)}),'own')).status,413);
 let enabled=true;dependencies.getSettings=()=>({enabled,allowedProjectId:'own',expiresAt:new Date(time+60000).toISOString()});dependencies.limiter={limit:async()=>{enabled=false;return{success:true};}};
 assert.equal((await createOwnerAssistanceGoalProposalHandler(dependencies)(post(body(f)),'own')).status,404);
 assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').get().n,0);
 }finally{f.close();}
});
