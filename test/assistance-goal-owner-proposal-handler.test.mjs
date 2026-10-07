import test from 'node:test';
import assert from 'node:assert/strict';
import {createOwnerAssistanceGoalProposalHandler} from '../lib/assistance-goal-owner-proposal-handler.mjs';
import {goalSourceFixture,time} from './fixtures/assistance-goal-source.mjs';
import {readFileSync} from 'node:fs';
const request=source=>new Request('https://agentfriendlyweb.dev/api/projects/own/assistance-proposal?source='+source);
test('closed owner proposal gate touches neither authentication nor storage',async()=>{
 const handler=createOwnerAssistanceGoalProposalHandler({getSettings:()=>({enabled:false}),getIdentity:()=>{throw Error('must not authenticate');},db:{prepare(){throw Error('must not read');}},now:()=>time});
 const response=await handler(request('help-'+ 'a'.repeat(64)),'own');assert.equal(response.status,404);assert.equal(response.headers.get('cache-control'),'no-store');
});
test('finite owner read rejects session switch, owner transfer and closed window during awaits',async()=>{
 for(const change of ['identity','owner','window']){
 const f=await goalSourceFixture();try{
 f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));let calls=0,enabled=true;
 const handler=createOwnerAssistanceGoalProposalHandler({db:f.db,now:()=>time,getSettings:()=>({enabled,allowedProjectId:'own',expiresAt:new Date(time+60000).toISOString()}),getIdentity:async()=>{calls++;if(calls===2){if(change==='identity')return{userId:'foreign'};if(change==='owner')f.sqlite.exec("UPDATE site_projects SET user_id='foreign'");if(change==='window')enabled=false;}return{userId:'owner'};}});
 const response=await handler(request(f.snapshot.source.id),'own');assert.notEqual(response.status,200);assert.equal((await response.json()).guidance,undefined);
 }finally{f.close();}}
});
