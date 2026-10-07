import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
const service=await import('../lib/assistance-goal-service-identity.mjs').catch(()=>({}));
const now=1791323200000,{privateKey,publicKey}=await generateKeyPair('RS256');
const config={origin:'https://goal-context-canary.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'goal-audience',clientId:'goal-client.access',purpose:'afw.goal-guidance.read.v1',excludedClientIds:['operations-client.access'],excludedAudiences:['operations-audience']};
const secret='synthetic-goal-request-key-minimum-32',query={eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:'11111111-1111-4111-8111-111111111111',revision:3};
async function token({client=config.clientId,audience=config.audience,subject='',expiresAt=Math.floor(now/1000)+300}={}){return new SignJWT({type:'app',common_name:client}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+config.teamDomain).setAudience(audience).setSubject(subject).setExpirationTime(expiresAt).sign(privateKey);}
async function request(options={}){const request=await service.signedAssistanceGoalRequest(query,secret,now);request.headers.set('Cf-Access-Jwt-Assertion',await token(options));return request;}
test('dedicated Access identity and signed purpose jointly authenticate the read',async()=>{
 assert.equal(typeof service.verifyAssistanceGoalService,'function');const r=await request();const body=await r.text();
 assert.deepEqual(await service.verifyAssistanceGoalService({request:r,body,config,keySet:publicKey,signingSecret:secret,now}),{id:config.clientId,purpose:config.purpose});
});
test('operational, human, wrong audience, expired or unsigned identities are rejected',async()=>{
 for(const options of [{client:'operations-client.access'},{subject:'human'},{audience:['goal-audience','operations-audience']},{expiresAt:Math.floor(now/1000)-1}]){const r=await request(options);assert.equal(await service.verifyAssistanceGoalService({request:r,body:await r.text(),config,keySet:publicKey,signingSecret:secret,now}),null);}
 const r=await request();r.headers.delete('x-afw-signature');assert.equal(await service.verifyAssistanceGoalService({request:r,body:await r.text(),config,keySet:publicKey,signingSecret:secret,now}),null);
});
test('signature binds route, body, time and purpose; separate pins cannot equal operations',async()=>{
 const r=await request(),body=await r.text(),options={request:r,body,config,keySet:publicKey,signingSecret:secret,now};
 for(const change of [{body:body+' '},{now:now+60001},{config:{...config,purpose:'afw.operations.read.v1'}},{config:{...config,excludedClientIds:[config.clientId]}},{config:{...config,excludedAudiences:[config.audience]}},{request:new Request(config.origin+'/other',{method:'POST',headers:r.headers})}])assert.equal(await service.verifyAssistanceGoalService({...options,...change}),null);
 await assert.rejects(service.signedAssistanceGoalRequest({...query,owner:'private'},secret,now));
});
