import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {generateKeyPair,SignJWT} from 'jose';
import {goalSourceFixture,time} from './fixtures/assistance-goal-source.mjs';
import {operationsDb} from './fixtures/operations-db.mjs';
import {recordAssistanceGoalRead} from '../lib/assistance-goal-read-receipt.mjs';
import {signedAssistanceGoalProposalRequest} from '../lib/assistance-goal-proposal-identity.mjs';
import {reserveAssistanceGoalGeneration} from '../lib/assistance-goal-generation-budget.mjs';
import {createAssistanceGoalGenerator} from '../lib/assistance-goal-provider.mjs';
const contract=await import('../lib/assistance-goal-proposal-http.mjs').catch(()=>({}));
const {privateKey,publicKey}=await generateKeyPair('RS256');
async function fixture(){
 const f=await goalSourceFixture(),ops=operationsDb();
 f.sqlite.exec(readFileSync('db/assistance-goal-proposals.sql','utf8'));
 for(const name of ['assistance-supervision','assistance-supervision-runs'])ops.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 const c=f.context;
 ops.sqlite.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').run(c.eventId,c.projectRef,3,'assistance_requested','orientation',f.snapshot.source.createdAt,time-900);
 ops.sqlite.prepare('INSERT INTO assistance_supervision_runs VALUES(?,?,?,?,?,?,?)').run(c.runId,crypto.randomUUID(),c.eventId,time-500,time+30000,null,null);
 const receipt=await recordAssistanceGoalRead({...f,now:time});
 const query={eventId:c.eventId,projectRef:c.projectRef,runId:c.runId,revision:3,receiptId:receipt.receipt.id};
 const config={enabled:true,generationEnabled:true,origin:'https://goal-context-canary.agentfriendlyweb.dev',purpose:'afw.goal-guidance.propose.v1',teamDomain:'test.cloudflareaccess.com',clientId:'proposal.access',audience:'proposal-aud',readClientId:'read.access',readAudience:'read-aud',operationsClientId:'operations.access',operationsAudience:'operations-aud',expiresAt:new Date(time+60000).toISOString(),enrollment:{projectId:'own',userId:'owner',since:new Date(time-2000).toISOString()}};
 let generations=0,budgets=0;
 const options={sourceDb:f.db,operationsDb:ops.db,getSettings:()=>config,keySet:publicKey,signingSecret:'synthetic-proposal-signing-secret-32',readSigningSecret:'synthetic-read-signing-secret-32chars',signalSecret:'synthetic-signal-secret-minimum-thirty-two',now:()=>time,limiter:{limit:async()=>({success:true})},reserveGeneration:async()=>{budgets++;return{allowed:true};},generate:async input=>{assert.deepEqual(Object.keys(input).sort(),['declarations','evidenceStatus','operationsAuthorized']);generations++;return{question:'¿Qué información conviene mostrar primero?',why:'Podemos empezar por lo esencial.'};}};
 async function request(){const r=await signedAssistanceGoalProposalRequest(query,options.signingSecret,time);r.headers.set('Cf-Access-Jwt-Assertion',await new SignJWT({type:'app',common_name:config.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setSubject('').setExpirationTime(Math.floor(time/1000)+300).sign(privateKey));return r;}
 return{...f,ops,config,query,options,request,counts:()=>({generations,budgets}),close(){f.close();ops.sqlite.close();}};
}
test('closed proposal HTTP has no side effects; authenticated own composition generates once and retries recover',async()=>{
 assert.equal(typeof contract.createAssistanceGoalProposalHttp,'function');
 const closed=contract.createAssistanceGoalProposalHttp({getSettings:()=>({enabled:false}),generate:()=>{throw Error('must not generate');}});assert.equal((await closed(new Request('https://goal-context-canary.agentfriendlyweb.dev/proposal'))).status,404);
 const f=await fixture();try{const handler=contract.createAssistanceGoalProposalHttp(f.options),first=await handler(await f.request());assert.equal(first.status,200);const result=await first.json();
 const second=await handler(await f.request());assert.equal(second.status,200);assert.deepEqual(await second.json(),result);assert.deepEqual(f.counts(),{generations:1,budgets:1});
 assert.equal(result.proposal.reviewRequired,true);assert.equal(result.proposal.operationsAuthorized,false);assert.doesNotMatch(JSON.stringify(result),/PRIVATE|owner|goalsJson|consentSequence/);
 }finally{f.close();}
});

test('HTTP composition uses durable nested budget and bounded WorkersAI adapter; cached retry never calls provider again',async()=>{
 const f=await fixture();try{
 for(const name of ['dossier-supervision','consumer-state','notice-reservations','assistance-goal-generation-budget'])f.ops.sqlite.exec(readFileSync('worker/operations/'+name+'.sql','utf8'));
 let calls=0;
 f.options.reserveGeneration=value=>reserveAssistanceGoalGeneration({...value,db:f.ops.db});
 f.options.generate=createAssistanceGoalGenerator({locale:'es',ai:{run:async()=>{calls++;return{response:{question:'¿Qué información querés que encuentren primero?',why:'Así elegimos un comienzo útil para tu sitio.'}};}}});
 const handler=contract.createAssistanceGoalProposalHttp(f.options);
 const first=await handler(await f.request());assert.equal(first.status,200);const expected=await first.json();
 const retry=await handler(await f.request());assert.equal(retry.status,200);assert.deepEqual(await retry.json(),expected);
 assert.equal(calls,1);assert.equal(f.ops.sqlite.prepare('SELECT count(*) n FROM assistance_goal_generation_budget').get().n,1);
 }finally{f.close();}
});
test('missing budget, failed budget, withdrawal during generation and closure during rate limit cannot deliver a proposal',async()=>{
 assert.equal(typeof contract.createAssistanceGoalProposalHttp,'function');
 for(const change of ['missing','budget','withdraw','budget-withdraw','budget-regrant','budget-owner','close']){const f=await fixture();try{
 if(change==='missing')delete f.options.reserveGeneration;
 if(change==='budget')f.options.reserveGeneration=async()=>({allowed:false});
 if(change==='withdraw')f.options.generate=async()=>{f.grant('revoke');return{question:'¿Qué mostramos?',why:'Podemos avanzar.'};};
 if(change==='budget-withdraw')f.options.reserveGeneration=async()=>{f.grant('revoke');return{allowed:true};};
 if(change==='budget-regrant')f.options.reserveGeneration=async()=>{f.grant();return{allowed:true};};
 if(change==='budget-owner')f.options.reserveGeneration=async()=>{f.sqlite.exec("UPDATE site_projects SET user_id='foreign'");return{allowed:true};};
 if(change==='close')f.options.limiter={limit:async()=>{f.config.enabled=false;return{success:true};}};
 const response=await contract.createAssistanceGoalProposalHttp(f.options)(await f.request());assert.notEqual(response.status,200);assert.equal((await response.json()).proposal,undefined);assert.equal(f.sqlite.prepare('SELECT count(*) n FROM assistance_goal_proposal_results').get().n,0);
 if(change.startsWith('budget-'))assert.equal(f.counts().generations,0);
 }finally{f.close();}}
});
