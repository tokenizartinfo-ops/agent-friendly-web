import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT} from 'jose';
const load=()=>import('../lib/assistance-private-challenge-identity.mjs');
const {privateKey,publicKey}=await generateKeyPair('RS256'),other=await generateKeyPair('RS256');
const origin='https://operations-manager.agentfriendlyweb.dev',at=Date.now(),sec=Math.floor(at/1000);
const config={enabled:true,origin,teamDomain:'test.cloudflareaccess.com',audience:'synthetic-challenge-only',clientId:'synthetic-challenge.access',principalRef:'c'.repeat(64),expiresAt:at+60000,revision:1};
async function signed(patch={},key=privateKey){return new SignJWT({type:'app',sub:'',common_name:config.clientId,iss:'https://'+config.teamDomain,aud:config.audience,iat:sec,exp:sec+120,...patch}).setProtectedHeader({alg:'RS256'}).sign(key);}
const request=(token,url=origin+'/assistance/custody/confirm',extras={})=>new Request(url,{method:'POST',headers:{'Cf-Access-Jwt-Assertion':token,...extras}});
test('verified service returns only trusted principal and bounded expiry',async()=>{
 const {createPrivateChallengeIdentityVerifier}=await load();const verify=createPrivateChallengeIdentityVerifier({readConfig:()=>config,keySet:publicKey,now:()=>at});
 assert.deepEqual(await verify(request(await signed())),{principalRef:config.principalRef,expiresAt:config.expiresAt});
 assert.deepEqual(await verify(request(await signed({exp:sec+20}))),{principalRef:config.principalRef,expiresAt:(sec+20)*1000});
});
test('foreign signature issuer audience client human subject and type deny',async()=>{
 const {createPrivateChallengeIdentityVerifier}=await load(),verify=createPrivateChallengeIdentityVerifier({readConfig:()=>config,keySet:publicKey,now:()=>at});
 for(const patch of [{iss:'https://other.cloudflareaccess.com'},{aud:'other'},{aud:[config.audience,'other']},{common_name:'other.access'},{sub:'human'},{type:'org'},{exp:sec-1},{iat:sec+1}])assert.equal(await verify(request(await signed(patch))),null);
 assert.equal(await verify(request(await signed({},other.privateKey))),null);
 assert.equal(await verify(request('garbage')),null);
});
test('missing disabled async config and disallowed request cannot resolve keys',async()=>{
 const {createPrivateChallengeIdentityVerifier}=await load();let calls=0;const keySet=()=>{calls++;return publicKey;},token=await signed();
 for(const readConfig of [()=>null,()=>({...config,enabled:false}),()=>Promise.resolve(config),()=>({...config,principalRef:'bad'})])assert.equal(await createPrivateChallengeIdentityVerifier({readConfig,keySet,now:()=>at})(request(token)),null);
 const verify=createPrivateChallengeIdentityVerifier({readConfig:()=>config,keySet,now:()=>at});
 for(const req of [request(token,origin+'/other'),request(token,origin+'/assistance/custody/confirm?q=1'),request(token,'https://foreign.invalid/assistance/custody/confirm'),request(token,undefined,{Origin:origin}),request(token,undefined,{'Sec-Fetch-Site':'same-origin'}),new Request(origin+'/assistance/custody/confirm')])assert.equal(await verify(req),null);
 assert.equal(calls,0);
});
test('config withdrawal deadline and backward clock during awaited verification deny',async()=>{
 const {createPrivateChallengeIdentityVerifier}=await load(),token=await signed();
 for(const mode of ['config','deadline','clock','regrant']){let current=config,clock=at;const verify=createPrivateChallengeIdentityVerifier({readConfig:()=>current,now:()=>clock,keySet:async()=>{if(mode==='config')current={...config,enabled:false,revision:2};else if(mode==='regrant'){current={...config,enabled:false,revision:2};current={...config,revision:3};}else clock=mode==='deadline'?config.expiresAt:at-1;return publicKey;}});assert.equal(await verify(request(token)),null);}
});
test('withdrawal followed by regrant cannot restore an in-flight verification',async()=>{
 const {createPrivateChallengeIdentityVerifier}=await load();let current={...config,revision:1};
 const verify=createPrivateChallengeIdentityVerifier({readConfig:()=>current,now:()=>at,keySet:async()=>{current={...config,enabled:false,revision:2};current={...config,revision:3};return publicKey;}});
 assert.equal(await verify(request(await signed())),null);
 const fresh=createPrivateChallengeIdentityVerifier({readConfig:()=>current,now:()=>at,keySet:publicKey});
 assert.deepEqual(await fresh(request(await signed())),{principalRef:config.principalRef,expiresAt:config.expiresAt});
});
