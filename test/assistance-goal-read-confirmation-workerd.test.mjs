import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {preparedGoalFixture} from './fixtures/assistance-goal-prepared.mjs';
import {time} from './fixtures/assistance-goal-source.mjs';
test('native D1 persists one explicit reading acknowledgement and GET recovers a lost response',async()=>{
 const f=await preparedGoalFixture();
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createOwnerAssistanceGoalProposalHandler} from './lib/assistance-goal-owner-proposal-handler.mjs';
 export default {async fetch(request,env){
 const url=new URL(request.url);
 const handler=createOwnerAssistanceGoalProposalHandler({db:env.SOURCE,now:()=>${time},getSettings:()=>({enabled:true,allowedProjectId:'own',expiresAt:${JSON.stringify(new Date(time+60000).toISOString())}}),getIdentity:async()=>({userId:request.headers.get('x-fixture-actor')||'owner'}),limiter:{limit:async()=>({success:true})}});
 const result=await handler(request,'own');
 if(request.headers.get('x-fixture-lose')==='true'&&result.status===200)return Response.json({code:'fixture_lost_response'},{status:503});
 return result;
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{SOURCE:'goal-reading-native'}}));
 try{
 const db=await runtime.getD1Database('SOURCE');
 // Copy only this test's synthetic source fixture, never a remote or owner DB.
 for(const table of f.sqlite.prepare("SELECT name,sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all()){
 assert.match(table.name,/^[a-z_]+$/);await db.prepare(table.sql).run();
 const rows=f.sqlite.prepare('SELECT * FROM '+table.name).all();
 for(const row of rows){const columns=Object.keys(row);assert.ok(columns.every(x=>/^[a-z_]+$/.test(x)));await db.prepare('INSERT INTO '+table.name+'('+columns.join(',')+') VALUES('+columns.map(()=>'?').join(',')+')').bind(...Object.values(row)).run();}
 }
 const base='https://goal-reading-native.invalid/api/projects/own/assistance-proposal';
 const value={sourceId:f.snapshot.source.id,proposalId:f.proposalId,expectedRevision:3,requestId:crypto.randomUUID()};
 const post=(extra={})=>runtime.dispatchFetch(base,{method:'POST',headers:{origin:'https://goal-reading-native.invalid','content-type':'application/json',...extra},body:JSON.stringify(value)});
 assert.equal((await post({'x-fixture-lose':'true'})).status,503);
 const retries=await Promise.all([post(),post()]);assert.ok(retries.every(x=>x.status===200));
 for(const response of retries)assert.equal((await response.json()).confirmedAt,time);
 const get=await runtime.dispatchFetch(base+'?source='+value.sourceId);assert.equal(get.status,200);assert.equal((await get.json()).guidance.confirmedAt,time);
 assert.equal((await db.prepare('SELECT count(*) n FROM assistance_goal_read_confirmations').first()).n,1);
 assert.equal((await db.prepare('SELECT notes FROM site_projects').first()).notes,'PRIVATE NARRATIVE');
 assert.equal((await post({'x-fixture-actor':'foreign'})).status,409);
 await db.prepare("UPDATE site_projects SET user_id='foreign'").run();
 assert.notEqual((await post()).status,200);assert.notEqual((await runtime.dispatchFetch(base+'?source='+value.sourceId)).status,200);
 }finally{f.close();await runtime.dispose();}
});
