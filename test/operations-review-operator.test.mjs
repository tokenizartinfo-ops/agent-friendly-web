import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
import {resolveOperationsReviewOperator} from '../lib/operations-review-operator.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'review-only',consumerAudience:'reception-only',subject:'test-human-operator'};
async function request({subject=config.subject,audience=config.audience,issuer='https://test.cloudflareaccess.com',expiry=true,expired=false,origin=config.origin,key=privateKey}={}){
 let jwt=new SignJWT({email:'synthetic@example.com'}).setProtectedHeader({alg:'RS256'}).setIssuer(issuer).setAudience(audience).setSubject(subject);
 if(expiry)jwt=jwt.setExpirationTime(Math.floor(Date.now()/1000)+(expired?-60:300));
 return new Request(origin+'/synthetic-review',{headers:{'Cf-Access-Jwt-Assertion':await jwt.sign(key),'Cf-Access-Authenticated-User-Email':'spoof@example.com'}});
}
test('a signed exact human operator yields a domain-separated opaque id',async()=>{
 const req=await request(),a=await resolveOperationsReviewOperator(req,config,{keySet:publicKey});
 assert.equal(a.ok,true);assert.match(a.operatorId,/^operator-[a-f0-9]{64}$/);
 assert.deepEqual(await resolveOperationsReviewOperator(req,config,{keySet:publicKey}),a);
 const otherAudience='another-review-policy';
 const other=await resolveOperationsReviewOperator(await request({audience:otherAudience}),{...config,audience:otherAudience},{keySet:publicKey});
 assert.equal(other.ok,true);assert.notEqual(other.operatorId,a.operatorId);
 assert.equal(JSON.stringify(a).includes(config.subject),false);assert.equal(JSON.stringify(a).includes('@'),false);
});
test('reception audience, multiple audiences, wrong subject and service subject are denied',async()=>{
 for(const args of [{audience:config.consumerAudience},{audience:[config.audience,'another-app']},{subject:'other-human'},{subject:''}])assert.deepEqual(await resolveOperationsReviewOperator(await request(args),config,{keySet:publicKey}),{ok:false});
});
test('invalid issuer, expiry and signatures are denied even with a spoofed email header',async()=>{
 const other=await generateKeyPair('RS256');
 for(const args of [{issuer:'https://other.cloudflareaccess.com'},{expiry:false},{expired:true},{key:other.privateKey}])assert.deepEqual(await resolveOperationsReviewOperator(await request(args),config,{keySet:publicKey}),{ok:false});
 assert.deepEqual(await resolveOperationsReviewOperator(new Request(config.origin,{headers:{'Cf-Access-Authenticated-User-Email':'synthetic@example.com'}}),config,{keySet:publicKey}),{ok:false});
});
test('closed or malformed server configuration returns before resolving keys',async()=>{
 let reads=0;const keySet=async()=>{reads++;throw Error('Unexpected key IO');};
 const req=await request();
 for(const cfg of [{...config,enabled:false},{...config,audience:config.consumerAudience},{...config,consumerAudience:''},{...config,subject:' '},{...config,origin:'https://example.com'},{...config,origin:'https://operations-manager.agentfriendlyweb.dev:8443'},undefined])assert.deepEqual(await resolveOperationsReviewOperator(req,cfg,{keySet}),{ok:false});
 assert.equal(reads,0);
});
test('wrong request origin and a separately expired server clock fail closed',async()=>{
 assert.deepEqual(await resolveOperationsReviewOperator(await request({origin:'https://agentfriendlyweb.dev'}),config,{keySet:publicKey}),{ok:false});
 assert.deepEqual(await resolveOperationsReviewOperator(await request(),config,{keySet:publicKey,now:()=>Date.now()+600000}),{ok:false});
 assert.deepEqual(await resolveOperationsReviewOperator(await request(),config,{keySet:publicKey,now:()=>NaN}),{ok:false});
});
test('equivalent Access domain spellings keep the same operator audit identity',async()=>{
 const req=await request(),canonical=await resolveOperationsReviewOperator(req,config,{keySet:publicKey});
 for(const teamDomain of ['TEST.cloudflareaccess.com','test.cloudflareaccess.com.',' test.cloudflareaccess.com '])assert.deepEqual(await resolveOperationsReviewOperator(req,{...config,teamDomain},{keySet:publicKey}),canonical);
});
