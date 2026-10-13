import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
test('native D1 batch saves once and rolls back when original grant expires between statements',async()=>{
 const schema=['db/dossier-monitoring-consent.sql','db/dossier-node-process.sql','db/dossier-subscription-receipt.sql'].flatMap(path=>[...readFileSync(path,'utf8').matchAll(/CREATE TABLE[\s\S]*?\);|CREATE(?: UNIQUE)? INDEX[^\n]+;|CREATE TRIGGER[^\n]+;/g)].map(m=>m[0]));
 const startAt=Date.now()-5000,expiresAt=startAt+180000;
 const contents=`import {saveOwnSyntheticGoal} from './lib/mcp-own-synthetic-save.mjs';
 const context={grantId:'g',subject:'owner',clientId:'client',resource:'https://private.invalid/mcp',scopes:['afw:project:read']};
 export default{async fetch(request,env){const path=new URL(request.url).pathname;
 if(path==='/fixture'){
 await env.DB.exec("CREATE TABLE site_projects(id TEXT PRIMARY KEY,user_id TEXT,revision INTEGER,goals_json TEXT,updated_at TEXT);CREATE TABLE delegated_access_grants(id TEXT PRIMARY KEY,user_id TEXT,client_id TEXT,project_id TEXT,resource TEXT,scopes_json TEXT,expires_at TEXT,revoked_at TEXT);CREATE TABLE project_events(id TEXT NOT NULL PRIMARY KEY,project_id TEXT,user_id TEXT,type TEXT,payload_json TEXT,created_at TEXT);");
 for(const sql of ${JSON.stringify(schema)})await env.DB.prepare(sql).run();
 await env.DB.prepare('INSERT INTO site_projects VALUES(?,?,?,?,?)').bind('p','owner',1,'[]','').run();
 await env.DB.prepare('INSERT INTO delegated_access_grants VALUES(?,?,?,?,?,?,?,?)').bind('g','owner','client','p',context.resource,JSON.stringify(context.scopes),new Date(${expiresAt}).toISOString(),'').run();
 await env.DB.prepare('INSERT INTO dossier_monitoring_consent_events(grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?,?,?)').bind('g','p','owner','client',context.resource,1,'grant','afw.dossier-monitoring.v1','11111111-1111-4111-8111-111111111111',${startAt},${expiresAt}).run();
 await env.DB.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('g','p','owner','client',context.resource,1,${startAt},${expiresAt},'a'.repeat(64),'b'.repeat(64),'d'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',${startAt},${expiresAt}).run();
 await env.DB.prepare('INSERT INTO dossier_event_subscription_receipts VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('g','sub_'+'e'.repeat(64),'p','owner','client',context.resource,'a'.repeat(64),'b'.repeat(64),'d'.repeat(64),'c'.repeat(40),'cloudflare/debian-trixie',${startAt+1000},${startAt+1001},${expiresAt}).run();return Response.json({});}
 if(path==='/expire-on-update'){await env.DB.prepare("CREATE TRIGGER expire_grant AFTER UPDATE ON site_projects BEGIN UPDATE delegated_access_grants SET expires_at=strftime('%Y-%m-%dT%H:%M:%fZ','now','-1 second'); END").run();return Response.json({});}
 if(path==='/state')return Response.json({project:await env.DB.prepare('SELECT revision,goals_json FROM site_projects').first(),events:await env.DB.prepare('SELECT count(*) n FROM project_events').first(),grant:await env.DB.prepare('SELECT expires_at FROM delegated_access_grants').first()});
 return Response.json(await saveOwnSyntheticGoal({enabled:true,db:env.DB,context,projectId:'p',containerId:'a'.repeat(64),programHash:'d'.repeat(64),sourceRevision:'c'.repeat(40),window:{startAt:${startAt},expiresAt:${expiresAt}},now:Date.now,beforeCommit:async()=>true},await request.json()));}};`;
 const b=await build({stdin:{contents,resolveDir:process.cwd()},bundle:true,write:false,format:'esm',platform:'neutral',external:['node:*']});
 for(const expire of [false,true]){const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',compatibilityFlags:['nodejs_compat'],script:b.outputFiles[0].text,d1Databases:{DB:'own-synthetic-save-native'}}));try{
 assert.equal((await runtime.dispatchFetch('https://fixture.invalid/fixture')).status,200);if(expire)assert.equal((await runtime.dispatchFetch('https://fixture.invalid/expire-on-update')).status,200);
 const save=()=>runtime.dispatchFetch('https://fixture.invalid/save',{method:'POST',body:JSON.stringify({expectedRevision:1,idempotencyKey:'11111111-1111-4111-8111-111111111111',goal:'discovery'})});
 assert.equal((await (await save()).json()).status,expire?503:200);const state=await (await runtime.dispatchFetch('https://fixture.invalid/state')).json();assert.equal(state.project.revision,expire?1:2);assert.equal(state.events.n,expire?0:1);assert.equal(state.grant.expires_at,new Date(expiresAt).toISOString());
 if(!expire){assert.equal((await (await save()).json()).replayed,true);assert.equal((await (await runtime.dispatchFetch('https://fixture.invalid/state')).json()).events.n,1);}
 }finally{await runtime.dispose();}}
});
