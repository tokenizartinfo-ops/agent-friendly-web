import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {signedAssistanceGoalRequest} from '../lib/assistance-goal-service-identity.mjs';
const contract=await import('../lib/assistance-goal-proposal-identity.mjs').catch(()=>({}));
const now=1791323200000,{privateKey,publicKey}=await generateKeyPair('RS256');
const config={origin:'https://goal-context-canary.agentfriendlyweb.dev',purpose:'afw.goal-guidance.propose.v1',teamDomain:'test.cloudflareaccess.com',clientId:'proposal.access',audience:'proposal-aud',readClientId:'read.access',readAudience:'read-aud',operationsClientId:'operations.access',operationsAudience:'operations-aud'};
const signingSecret='synthetic-proposal-signing-secret-32',readSigningSecret='synthetic-read-signing-secret-32chars',signalSecret='synthetic-signal-signing-secret-32chars';
const query={eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:'11111111-1111-4111-8111-111111111111',revision:3,receiptId:'22222222-2222-4222-8222-222222222222'};
const token=({client=config.clientId,audience=config.audience,sub='',expiresAt=Math.floor(now/1000)+300}={})=>new SignJWT({type:'app',common_name:client}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(audience).setSubject(sub).setExpirationTime(expiresAt).sign(privateKey);
async function options(change={}){const request=await contract.signedAssistanceGoalProposalRequest(query,signingSecret,now);request.headers.set('Cf-Access-Jwt-Assertion',await token(change));return{request,body:await request.text(),config,signingSecret,readSigningSecret,signalSecret,keySet:publicKey,now};}
test('proposal purpose requires dedicated JWT and HMAC bound to its route and exact receipt query',async()=>{
 assert.equal(typeof contract.verifyAssistanceGoalProposalService,'function');
 const input=await options();assert.deepEqual(await contract.verifyAssistanceGoalProposalService(input),{id:config.clientId,purpose:config.purpose});
 assert.equal(new URL(input.request.url).pathname,'/proposal');
});
test('read, operational, human, expired, multi-audience and wrong-body requests do not authorize generation',async()=>{
 assert.equal(typeof contract.verifyAssistanceGoalProposalService,'function');
 for(const change of [{client:config.readClientId},{client:config.operationsClientId},{audience:config.readAudience},{audience:config.operationsAudience},{audience:[config.audience,config.readAudience]},{sub:'human'},{expiresAt:Math.floor(now/1000)-1}])assert.equal(await contract.verifyAssistanceGoalProposalService(await options(change)),null);
 const input=await options();for(const change of [{body:input.body+' '},{now:now+60001},{config:{...config,purpose:'afw.goal-guidance.read.v1'}},{signingSecret:readSigningSecret},{readSigningSecret:signingSecret},{signalSecret:signingSecret},{config:{...config,readClientId:config.clientId}},{config:{...config,operationsAudience:config.audience}}])assert.equal(await contract.verifyAssistanceGoalProposalService({...input,...change}),null);
 const reader=await signedAssistanceGoalRequest({eventId:query.eventId,projectRef:query.projectRef,runId:query.runId,revision:3},readSigningSecret,now);reader.headers.set('Cf-Access-Jwt-Assertion',await token());
 assert.equal(await contract.verifyAssistanceGoalProposalService({...input,request:reader,body:await reader.text()}),null);
 await assert.rejects(()=>contract.signedAssistanceGoalProposalRequest({...query,userId:'owner'},signingSecret,now));
});
