import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {verifyAssistanceGoalService} from '../lib/assistance-goal-service-identity.mjs';
import {verifyAssistanceGoalProposalService} from '../lib/assistance-goal-proposal-identity.mjs';
import {createAssistanceGoalCustodialHttp} from '../lib/assistance-goal-custodial-http.mjs';
const time=1791379700000,origin='https://goal-context-canary.agentfriendlyweb.dev';
const readSecret='synthetic-read-signing-secret-thirty-two',proposalSecret='synthetic-proposal-signing-secret-thirty-two',signalSecret='synthetic-signal-secret-thirty-two';
const query={eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:crypto.randomUUID(),revision:1};
const config={enabled:true,contextEnabled:true,proposalEnabled:true,generationEnabled:true,expiresAt:new Date(time+60000).toISOString(),teamDomain:'test.cloudflareaccess.com',readClientId:'read-client',readAudience:'read-aud',proposalClientId:'proposal-client',proposalAudience:'proposal-aud',operationsClientId:'operations-client',operationsAudience:'operations-aud'};
const {privateKey,publicKey}=await generateKeyPair('RS256');
async function request(path,clientId,audience,body=query,claims={}){const jwt=await new SignJWT({type:'app',common_name:clientId,...claims}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(audience).setSubject('').setExpirationTime(Math.floor(time/1000)+300).sign(privateKey);return new Request(origin+'/custodial/'+path,{method:'POST',headers:{'content-type':'application/json','cf-access-jwt-assertion':jwt},body:JSON.stringify(body)});}
function factory(extra={}){assert.equal(typeof createAssistanceGoalCustodialHttp,'function','custodial request factory must exist');return createAssistanceGoalCustodialHttp({getSettings:()=>config,readSigningSecret:readSecret,signingSecret:proposalSecret,signalSecret,keySet:publicKey,limiter:{limit:async()=>({success:true})},now:()=>time,...extra});}
test('custodial ingress authenticates the read purpose and dispatches a cryptographically valid exact request without returning signatures',async()=>{
 let dispatched=0;const handler=factory({dispatch:async req=>{dispatched++;assert.equal(req.url,origin+'/context');const identity=await verifyAssistanceGoalService({request:req,body:await req.text(),config:{origin,purpose:'afw.goal-guidance.read.v1',teamDomain:config.teamDomain,clientId:config.readClientId,audience:config.readAudience,excludedClientIds:[config.proposalClientId,config.operationsClientId],excludedAudiences:[config.proposalAudience,config.operationsAudience]},keySet:publicKey,signingSecret:readSecret,now:time});assert.equal(identity?.id,config.readClientId);return Response.json({context:{revision:1}},{headers:{'x-afw-signature':'must-not-return','cf-access-jwt-assertion':'must-not-return'}});}});
 const response=await handler(await request('context',config.readClientId,config.readAudience));assert.equal(response.status,200);assert.equal(dispatched,1);assert.equal(response.headers.get('x-afw-signature'),null);assert.equal(response.headers.get('cf-access-jwt-assertion'),null);assert.deepEqual(await response.json(),{context:{revision:1}});
});
test('custodial proposal signs only the proposal identity and preserves the receipt binding',async()=>{
 const proposal={...query,receiptId:crypto.randomUUID()};const handler=factory({dispatch:async req=>{const body=await req.text();assert.deepEqual(JSON.parse(body),proposal);assert.equal(req.url,origin+'/proposal');const identity=await verifyAssistanceGoalProposalService({request:req,body,config:{origin,purpose:'afw.goal-guidance.propose.v1',teamDomain:config.teamDomain,clientId:config.proposalClientId,audience:config.proposalAudience,readClientId:config.readClientId,readAudience:config.readAudience,operationsClientId:config.operationsClientId,operationsAudience:config.operationsAudience},keySet:publicKey,signingSecret:proposalSecret,readSigningSecret:readSecret,signalSecret,now:time});assert.equal(identity?.id,config.proposalClientId);return Response.json({proposalId:'own-result'});}});
 assert.equal((await handler(await request('proposal',config.proposalClientId,config.proposalAudience,proposal))).status,200);
});
test('foreign, human, absent and wrong-purpose identities never reach the signed dispatcher',async()=>{
 let dispatched=0;const handler=factory({dispatch:async()=>{dispatched++;return Response.json({});}});
 for(const req of [new Request(origin+'/custodial/context',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(query)}),await request('context',config.proposalClientId,config.proposalAudience),await request('context',config.operationsClientId,config.operationsAudience),await request('proposal',config.readClientId,config.readAudience,{...query,receiptId:crypto.randomUUID()}),await request('context',config.readClientId,config.readAudience,query,{type:'human'}),await request('context',config.readClientId,[config.readAudience,config.proposalAudience])])assert.equal((await handler(req)).status,401);
 const foreign=await request('context',config.readClientId,config.readAudience);foreign.headers.set('origin',origin);assert.equal((await handler(foreign)).status,403);
 const extra=await request('context',config.readClientId,config.readAudience,{...query,privateNarrative:'must-not-sign'});assert.equal((await handler(extra)).status,400);assert.equal(dispatched,0);
});
test('withdrawal during admission or dispatch prevents delivery and no missing or denied limiter permits signing',async()=>{
 let dispatched=0,current=config;const dispatch=async()=>{dispatched++;return Response.json({context:'private'});};
 const req=()=>request('context',config.readClientId,config.readAudience);
 assert.equal((await factory({dispatch,limiter:undefined})(await req())).status,503);
 assert.equal((await factory({dispatch,limiter:{limit:async()=>({success:false})}})(await req())).status,429);
 assert.equal((await factory({getSettings:()=>current,dispatch,limiter:{limit:async()=>{current={...config,enabled:false};return{success:true};}}})(await req())).status,404);assert.equal(dispatched,0);
 current=config;const result=await factory({getSettings:()=>current,dispatch:async()=>{current={...config,enabled:false};return Response.json({context:'private'});}})(await req());assert.equal(result.status,404);assert.deepEqual(await result.json(),{code:'unavailable'});
});
test('closed, expired, changed, shared-secret and redirect configurations fail without a signed dispatch or credential disclosure',async()=>{
 let dispatched=0;const dispatch=async()=>{dispatched++;return Response.json({});};
 for(const settings of [{...config,enabled:false},{...config,contextEnabled:false},{...config,expiresAt:new Date(time).toISOString()},{...config,expiresAt:new Date(time+600001).toISOString()},{...config,proposalAudience:config.readAudience}])assert.equal((await factory({getSettings:()=>settings,dispatch})(await request('context',config.readClientId,config.readAudience))).status,404);
 assert.equal((await factory({readSigningSecret:proposalSecret,dispatch})(await request('context',config.readClientId,config.readAudience))).status,404);
 let count=0;assert.equal((await factory({getSettings:()=>++count===1?config:{...config,enabled:false},dispatch})(await request('context',config.readClientId,config.readAudience))).status,404);assert.equal(dispatched,0);
 assert.equal((await factory({dispatch:async()=>new Response(null,{status:302,headers:{location:'https://foreign.example'}})})(await request('context',config.readClientId,config.readAudience))).status,503);
});
