import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {generateKeyPair,exportSPKI,SignJWT} from 'jose';
import {goalSourceFixture,time} from './fixtures/assistance-goal-source.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordAssistanceGoalRead} from '../lib/assistance-goal-read-receipt.mjs';
import {signedAssistanceGoalProposalRequest} from '../lib/assistance-goal-proposal-identity.mjs';
test('native proposal HTTP composes real JWT/HMAC, separate D1 source/lease and one durable synthetic budget',async()=>{
 const f=await goalSourceFixture(),ops=operationsDb(),{privateKey,publicKey}=await generateKeyPair('RS256');
 f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));
 for(const name of ['assistance-supervision','assistance-supervision-runs'])ops.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 const c=f.context;
 ops.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(c.eventId,c.projectRef,3,'assistance_requested','orientation',f.snapshot.source.createdAt,time-900);
 ops.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(c.runId,crypto.randomUUID(),c.eventId,time-500,time+30000,null,null);
 ops.sqlite.exec('CREATE TABLE fixture_budget(receipt_id TEXT PRIMARY KEY)');
 const receipt=await recordAssistanceGoalRead({...f,now:time}),query={eventId:c.eventId,projectRef:c.projectRef,runId:c.runId,revision:3,receiptId:receipt.receipt.id};
 const config={enabled:true,generationEnabled:true,origin:'https://goal-context-canary.agentfriendlyweb.dev',purpose:'afw.goal-guidance.propose.v1',teamDomain:'test.cloudflareaccess.com',clientId:'proposal.access',audience:'proposal-aud',readClientId:'read.access',readAudience:'read-aud',operationsClientId:'operations.access',operationsAudience:'operations-aud',expiresAt:new Date(time+60000).toISOString(),enrollment:{projectId:'own',userId:'owner',since:new Date(time-2000).toISOString()}};
 const signingSecret='synthetic-proposal-signing-secret-32';
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {importSPKI} from 'jose';
 import {createAssistanceGoalProposalHttp} from './lib/assistance-goal-proposal-http.mjs';
 let generations=0;
 export default {async fetch(request,env){
 if(new URL(request.url).pathname==='/fixture-stats')return Response.json({generations});
 return createAssistanceGoalProposalHttp({sourceDb:env.SOURCE,operationsDb:env.OPERATIONS,getSettings:()=>(${JSON.stringify(config)}),now:()=>${time},keySet:await importSPKI(${JSON.stringify(await exportSPKI(publicKey))},'RS256'),signingSecret:${JSON.stringify(signingSecret)},readSigningSecret:'synthetic-read-signing-secret-32chars',signalSecret:'synthetic-signal-secret-minimum-thirty-two',limiter:{limit:async()=>({success:true})},reserveGeneration:async value=>{const result=await env.OPERATIONS.prepare('INSERT OR IGNORE INTO fixture_budget(receipt_id) VALUES(?)').bind(value.receiptId).run();return{allowed:result.meta.changes===1};},generate:async input=>{generations++;if(Object.keys(input).sort().join(',')!=='declarations,evidenceStatus,operationsAuthorized')throw Error('private fields');return{question:'¿Qué conviene mostrar primero?',why:'Empezamos por lo esencial.'};}})(request);
 }};`},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,d1Databases:{SOURCE:'goal-proposal-http-source',OPERATIONS:'goal-proposal-http-operations'}}));
 try{
 for(const [sqlite,binding] of [[f.sqlite,'SOURCE'],[ops.sqlite,'OPERATIONS']]){
 const db=await runtime.getD1Database(binding);
 for(const table of sqlite.prepare("SELECT name,sql FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'").all()){
 assert.match(table.name,/^[a-z_]+$/);await db.prepare(table.sql).run();
 for(const row of sqlite.prepare('SELECT * FROM '+table.name).all()){const columns=Object.keys(row);assert.ok(columns.every(x=>/^[a-z_]+$/.test(x)));await db.prepare('INSERT INTO '+table.name+'('+columns.join(',')+') VALUES('+columns.map(()=>'?').join(',')+')').bind(...Object.values(row)).run();}
 }}
 const call=async()=>{const request=await signedAssistanceGoalProposalRequest(query,signingSecret,time);request.headers.set('Cf-Access-Jwt-Assertion',await new SignJWT({type:'app',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime(Math.floor(time/1000)+300).sign(privateKey));return runtime.dispatchFetch(request.url,{method:request.method,headers:request.headers,body:await request.text()});};
 const first=await call();assert.equal(first.status,200);const proposal=await first.json();const retry=await call();assert.equal(retry.status,200);assert.deepEqual(await retry.json(),proposal);
 assert.equal((await (await runtime.dispatchFetch(config.origin+'/fixture-stats')).json()).generations,1);
 const source=await runtime.getD1Database('SOURCE'),operational=await runtime.getD1Database('OPERATIONS');
 assert.equal((await source.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').first()).n,1);assert.equal((await operational.prepare('SELECT count(*) n FROM fixture_budget').first()).n,1);
 await source.prepare('INSERT INTO assistance_goal_consent_events(project_id,user_id,source_event_id,revision,action,consent_version,request_id,issued_at,expires_at) VALUES(?,?,?,?,?,?,?,?,?)').bind('own','owner',f.snapshot.source.id,3,'revoke','afw.assistance-goals-consent.v1',crypto.randomUUID(),time,time).run();
 assert.equal((await call()).status,403);assert.equal((await source.prepare('SELECT notes FROM site_projects').first()).notes,'PRIVATE NARRATIVE');
 }finally{f.close();ops.sqlite.close();await runtime.dispose();}
});
