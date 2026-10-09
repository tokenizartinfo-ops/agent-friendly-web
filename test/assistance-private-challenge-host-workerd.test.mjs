import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT,exportJWK} from 'jose';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
test('native signed host serializes overlapping confirmations and preserves permanent withdrawal',async()=>{
 const m=manifest(),a={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration:r}=await qaAdministrationFixture({createdAt:m.startAt,closeAt:m.deadline,expiresAt:m.deadline+10000});
 r.contract='afw-qa-closure-approval/v2';r.plan.occurrenceId=m.occurrenceId;r.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:a.identityRef,admissionContract:'server-v1',approval:a});r.plan.baselineRef=await computeQaClosureBaselineRef(r);
 const c={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'synthetic-challenge',clientId:'synthetic.access',principalRef:a.identityRef,expiresAt:m.deadline,revision:1};
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk=await exportJWK(publicKey);
 const jwt=await new SignJWT({type:'app',sub:'',common_name:c.clientId}).setProtectedHeader({alg:'RS256'}).setIssuer('https://'+c.teamDomain).setAudience(c.audience).setIssuedAt(Math.floor(m.startAt/1000)).setExpirationTime(Math.floor(m.deadline/1000)).sign(privateKey);
 const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
 import {createPrivateChallengeHost,createPreregisteredExchangePreparation} from './lib/assistance-private-challenge-host.mjs';
 import {createPrivateQaPreregistration} from './lib/assistance-private-qa-preregistration.mjs';
 import {importJWK} from 'jose';
 const r=${JSON.stringify(r)},a=${JSON.stringify(a)},c=${JSON.stringify(c)},key=await importJWK(${JSON.stringify(jwk)},'RS256');
 export class Fixture{constructor(ctx){this.storage=ctx.storage;}
 async fetch(request){const readInstallation=()=>({registration:r,approval:a}),preregistration=createPrivateQaPreregistration({storage:this.storage,readPreregistration:readInstallation,now:()=>r.provisioning.createdAt});const h=createPrivateChallengeHost({allowChallengeRequest:true,prepareExchange:createPreregisteredExchangePreparation({preregistration,readInstallation}),storage:this.storage,readInstallation:()=>({registration:r,approval:a}),readIdentityConfig:()=>c,keySet:key,limiter:{limit:async()=>({success:true})},now:()=>r.provisioning.createdAt});
 // Operator endpoints are test-fixture only. No production host mounts them.
 const path=new URL(request.url).pathname;if(path==='/fixture/register')return Response.json(await preregistration.register());if(path==='/fixture/retire')return Response.json(await preregistration.withdraw());if(path==='/fixture/issue')return Response.json(await h.issue());if(path==='/fixture/status')return Response.json(await h.status());if(path==='/fixture/withdraw')return Response.json(await h.withdraw());return h.fetch(request);}}
 export default{fetch(request,env){return env.CHALLENGE.get(env.CHALLENGE.idFromName('own-synthetic')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser'});
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,durableObjects:{CHALLENGE:{className:'Fixture',useSQLite:true}}}));
 try{const call=path=>runtime.dispatchFetch(c.origin+path);
 const requestChallenge=()=>runtime.dispatchFetch(c.origin+'/assistance/custody/confirm',{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':jwt},body:JSON.stringify({challenge:'request'})});
 assert.equal((await requestChallenge()).status,409);assert.equal(await(await call('/fixture/register')).json(),true);
 const requests=await Promise.all([requestChallenge(),requestChallenge()]);assert.deepEqual(requests.map(x=>x.status).sort(),[200,409]);const issued=await requests.find(x=>x.status===200).json();
 const confirm=()=>runtime.dispatchFetch(c.origin+'/assistance/custody/confirm',{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':jwt},body:JSON.stringify({nonce:issued.nonce})});
 const responses=await Promise.all([confirm(),confirm()]);assert.deepEqual(responses.map(x=>x.status).sort(),[200,409]);assert.equal((await(await call('/fixture/status')).json()).state,'confirmed');
 assert.equal(await(await call('/fixture/retire')).json(),true);assert.equal((await requestChallenge()).status,409);assert.equal((await confirm()).status,409);assert.equal(await(await call('/fixture/withdraw')).json(),true);assert.equal((await confirm()).status,409);const status=await(await call('/fixture/status')).json();assert.equal(status.state,'withdrawn');assert.ok(Number.isSafeInteger(status.consumedAt));assert.equal(await(await call('/fixture/issue')).json(),null);
 }finally{await runtime.dispose();}
});
