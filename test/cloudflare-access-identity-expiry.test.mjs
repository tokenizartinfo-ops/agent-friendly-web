import assert from 'node:assert/strict';
import test from 'node:test';
import {generateKeyPair,SignJWT} from 'jose';
import * as identityModule from '../lib/cloudflare-access-identity.mjs';
const issuer='https://tokenizart.cloudflareaccess.com',audience='own-source-synthetic-audience';
const {privateKey,publicKey}=await generateKeyPair('RS256');
async function token(exp,changes={}){
 const claims={sub:'owner-a',email:' Owner@Example.invalid ',iss:issuer,aud:audience,privateNotes:'PRIVATE',scope:'admin',...changes};
 if(exp!==undefined)claims.exp=exp;
 return new SignJWT(claims).setProtectedHeader({alg:'RS256',kid:'synthetic'}).sign(privateKey);
}
const options=jwt=>({token:jwt,teamDomain:'tokenizart.cloudflareaccess.com',audience,keySet:publicKey});
test('signed expiry projection for a server-owned preparation identity',async t=>{
 assert.equal(typeof identityModule.verifyCloudflareAccessJwtWithExpiry,'function','missing verified Access expiry view');
 const verify=identityModule.verifyCloudflareAccessJwtWithExpiry;
 await t.test('returns only the SAME verified subject/normalized email and signed integer expiration',async()=>{
  const exp=Math.floor(Date.now()/1000)+300,jwt=await token(exp),r=await verify(options(jwt));
  assert.deepEqual(r,{ok:true,identity:{subject:'owner-a',email:'owner@example.invalid',expiresAt:exp*1000}});
  assert.equal(Object.isFrozen(r),true);assert.equal(Object.isFrozen(r.identity),true);
  assert.doesNotMatch(JSON.stringify(r),/PRIVATE|scope|admin|userId|token/);
  assert.deepEqual(await identityModule.verifyCloudflareAccessJwt(options(jwt)),{ok:true,identity:{userId:'owner-a',email:'owner@example.invalid'}});
 });
 await t.test('requires expiration in the new view while preserving the old verifier shape/behavior',async()=>{
  const jwt=await token(undefined);assert.equal((await identityModule.verifyCloudflareAccessJwt(options(jwt))).ok,true);
  assert.deepEqual(await verify(options(jwt)),{ok:false,code:'contact_staging_identity_required'});
  assert.deepEqual(await verify({...options(jwt),diagnostics:true}),{ok:false,code:'contact_staging_identity_required',diagnosticCode:'expiration_claim_invalid'});
 });
 for(const [name,exp] of [['past',Math.floor(Date.now()/1000)-10],['fraction',Math.floor(Date.now()/1000)+300.5],['huge',Number.MAX_SAFE_INTEGER],['zero',0],['string','PRIVATE']])
  await t.test('rejects '+name+' expiry without reflecting claims',async()=>{
   const r=await verify(options(await token(exp)));assert.equal(r.ok,false);assert.equal(Object.hasOwn(r,'identity'),false);assert.doesNotMatch(JSON.stringify(r),/PRIVATE|privateNotes|admin|owner-a/);
  });
 await t.test('a future expiration never substitutes for signature issuer audience or identity checks',async()=>{
  const exp=Math.floor(Date.now()/1000)+300,other=await generateKeyPair('RS256');
  for(const changed of [{iss:'https://other.cloudflareaccess.com'},{aud:'other-audience'},{email:''},{sub:''},{sub:'x'.repeat(201)}]){
   const r=await verify(options(await token(exp,changed)));assert.equal(r.ok,false);assert.equal(Object.hasOwn(r,'identity'),false);
  }
  const r=await verify({...options(await token(exp)),keySet:other.publicKey});assert.equal(r.ok,false);assert.equal(Object.hasOwn(r,'identity'),false);
 });
 await t.test('invalid local configuration fails before a key lookup and token errors stay sanitized',async()=>{
  let calls=0;
  for(const changed of [{teamDomain:'attacker.invalid'},{audience:''},{token:''}]){
   const r=await verify({...options('PRIVATE'),...changed,keySet:async()=>{calls++;throw Error('PRIVATE');}});
   assert.deepEqual(r,{ok:false,code:'contact_staging_identity_required'});assert.doesNotMatch(JSON.stringify(r),/PRIVATE/);
  }assert.equal(calls,0);
 });
});
