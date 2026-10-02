import test from 'node:test';
import assert from 'node:assert/strict';
import { generateKeyPair, SignJWT } from 'jose';
import { resolveMailOperator } from '../lib/mail-operator-identity.mjs';
const {privateKey,publicKey}=await generateKeyPair('RS256');
const config={origin:'https://mail-ops.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'mail-only',subject:'operator-1'};
async function request(subject='operator-1',audience='mail-only',origin=config.origin){
  const jwt=await new SignJWT({email:'owner@example.com'}).setProtectedHeader({alg:'RS256'}).setIssuer('https://test.cloudflareaccess.com').setAudience(audience).setSubject(subject).setExpirationTime('5m').sign(privateKey);
  return new Request(origin+'/approve',{headers:{'Cf-Access-Jwt-Assertion':jwt,'Cf-Access-Authenticated-User-Email':'spoof@example.com'}});
}
test('server authenticates exact operator and exposes an opaque actor reference only',async()=>{
  const result=await resolveMailOperator(await request(),config,{keySet:publicKey});
  assert.equal(result.ok,true); assert.match(result.actorRef,/^actor-[a-f0-9]{64}$/);
  assert.equal(JSON.stringify(result).includes('owner@example.com'),false);
  assert.equal(JSON.stringify(result).includes('operator-1'),false);
});
test('other subject, application audience, origin and missing configuration fail closed',async()=>{
  const noExpiry=await new SignJWT({email:'owner@example.com'}).setProtectedHeader({alg:'RS256'}).setIssuer('https://test.cloudflareaccess.com').setAudience('mail-only').setSubject('operator-1').sign(privateKey);
  assert.deepEqual(await resolveMailOperator(new Request(config.origin,{headers:{'Cf-Access-Jwt-Assertion':noExpiry}}),config,{keySet:publicKey}),{ok:false});
  for(const [req,cfg] of [[await request('other'),config],[await request('operator-1','other-app'),config],[await request('operator-1','mail-only','https://agentfriendlyweb.dev'),config],[await request(),{...config,subject:''}],[new Request(config.origin),config]]) {
    assert.deepEqual(await resolveMailOperator(req,cfg,{keySet:publicKey}),{ok:false});
  }
});
