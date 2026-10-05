import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {resolveOperationsReviewEnrollment} from '../lib/operations-review-enrollment.mjs';
import {resolveOperationsReviewOperator} from '../lib/operations-review-operator.mjs';
import {createOperationsReviewWorker,OPERATIONS_REVIEW_ORIGIN} from '../worker/operations-review/handler.mjs';
const now=Date.now(),subject='synthetic-enrollment-human';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:OPERATIONS_REVIEW_ORIGIN,teamDomain:'test.cloudflareaccess.com',audience:'synthetic-enrollment',consumerAudience:'synthetic-consumer',email:'synthetic@example.com'};
async function token({email=config.email,aud=config.audience,sub=subject}={}){return new SignJWT({email}).setSubject(sub).setIssuer('https://'+config.teamDomain).setAudience(aud).setExpirationTime(Math.floor(now/1000)+300).setProtectedHeader({alg:'RS256'}).sign(privateKey);}
function request(jwt,path='/identity'){return new Request(config.origin+path,{headers:{'Cf-Access-Jwt-Assertion':jwt,'Sec-Fetch-Site':'same-origin'}});}
const deps={keySet:publicKey,now:()=>now};
test('signed enrollment returns only a stable opaque reference, never the token/email/subject',async()=>{
 const req=request(await token()),value=await resolveOperationsReviewEnrollment(req,config,deps);
 const expected=await resolveOperationsReviewOperator(req,{...config,subject},deps);
 assert.deepEqual(value,expected);assert.match(value.operatorId,/^operator-[a-f0-9]{64}$/);
 assert.deepEqual(Object.keys(value).sort(),['ok','operatorId']);
 for(const settings of [{email:'other@example.com'},{aud:config.consumerAudience},{aud:[config.audience,config.consumerAudience]},{sub:''}])assert.deepEqual(await resolveOperationsReviewEnrollment(request(await token(settings)),config,deps),{ok:false});
});
test('opaque pin authorizes only the same signed identity and rejects ambiguous pin configuration',async()=>{
 const req=request(await token()),identity=await resolveOperationsReviewEnrollment(req,config,deps),pinned={...config,operatorId:identity.operatorId};
 assert.deepEqual(await resolveOperationsReviewOperator(req,pinned,deps),identity);
 assert.deepEqual(await resolveOperationsReviewOperator(request(await token({sub:'other-human'})),pinned,deps),{ok:false});
 assert.deepEqual(await resolveOperationsReviewOperator(req,{...pinned,subject},deps),{ok:false});
});
test('identity enrollment is independently closed and never reads/writes operational storage',async()=>{
 let reads=0;const instance=createOperationsReviewWorker(deps),jwt=await token();
 const base={AFW_OPERATIONS_REVIEW_IDENTITY_ENABLED:'true',AFW_OPERATIONS_REVIEW_ENABLED:'false',AFW_OPERATIONS_REVIEWS_ENABLED:'false',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:config.teamDomain,AFW_OPERATIONS_REVIEW_AUDIENCE:config.audience,AFW_OPERATIONS_CONSUMER_AUDIENCE:config.consumerAudience,AFW_OPERATIONS_REVIEW_ENROLLMENT_EMAIL:config.email,OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>({success:true})},OPERATIONS_STATE_DB:{prepare(){reads++;throw Error('DB must remain untouched');}}};
 for(const change of [{AFW_OPERATIONS_REVIEW_IDENTITY_ENABLED:'false'},{AFW_OPERATIONS_REVIEW_ENABLED:'true'},{AFW_OPERATIONS_REVIEWS_ENABLED:'true'},{AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now).toISOString()}])assert.equal((await instance.fetch(request(jwt),{...base,...change})).status,404);
 const response=await instance.fetch(request(jwt),base);assert.equal(response.status,200);const html=await response.text();assert.match(html,/Identidad comprobada/);assert.doesNotMatch(html,new RegExp(subject));assert.doesNotMatch(html,/synthetic@example/);assert.doesNotMatch(html,new RegExp(jwt.replaceAll('.','\\.')));assert.match(html,/operator-[a-f0-9]{64}/);assert.equal(response.headers.get('cache-control'),'no-store');
 assert.equal((await instance.fetch(request(jwt,'/identity?subject=forged'),base)).status,400);
 assert.equal((await instance.fetch(new Request(config.origin+'/identity',{headers:{'Cf-Access-Jwt-Assertion':jwt,'Sec-Fetch-Site':'cross-site'}}),base)).status,403);
 assert.equal(reads,0);
});

test('identity attestation denies expiry during limiter and reports key provider outage without exposing claims',async()=>{
 const jwt=await token(),base={AFW_OPERATIONS_REVIEW_IDENTITY_ENABLED:'true',AFW_OPERATIONS_REVIEW_ENABLED:'false',AFW_OPERATIONS_REVIEWS_ENABLED:'false',AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+300000).toISOString(),AFW_OPERATIONS_ACCESS_TEAM_DOMAIN:config.teamDomain,AFW_OPERATIONS_REVIEW_AUDIENCE:config.audience,AFW_OPERATIONS_CONSUMER_AUDIENCE:config.consumerAudience,AFW_OPERATIONS_REVIEW_ENROLLMENT_EMAIL:config.email,OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>({success:true})}};
 const outage=await createOperationsReviewWorker({keySet:async()=>{throw Error('private-provider');},now:()=>now}).fetch(request(jwt),base);
 assert.equal(outage.status,503);assert.doesNotMatch(await outage.text(),/private-provider/);
 let clock=now;const response=await createOperationsReviewWorker({keySet:publicKey,now:()=>clock}).fetch(request(jwt),{...base,AFW_OPERATIONS_WINDOW_EXPIRES_AT:new Date(now+600000).toISOString(),OPERATIONS_REVIEW_RATE_LIMITER:{limit:async()=>{clock=now+300000;return {success:true};}}});
 assert.equal(response.status,401);assert.doesNotMatch(await response.text(),/operator-/);
});

