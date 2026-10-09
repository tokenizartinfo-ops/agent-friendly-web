import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPair,SignJWT,exportJWK} from 'jose';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {runPrivateChallengeClient} from '../scripts/afw-private-challenge-client.mjs';

test('actual Worker and preregistry DO require signed identity and prior registration, with finite persistent budget',async()=>{
 const start=Date.now()-1000,m={...manifest(),startAt:start,deadline:start+90000};
 const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
 const {registration}=await qaAdministrationFixture({createdAt:start,closeAt:m.deadline,expiresAt:m.deadline+10000});registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=m.occurrenceId;registration.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const config={enabled:true,origin:'https://operations-manager.agentfriendlyweb.dev',teamDomain:'test.cloudflareaccess.com',audience:'synthetic-runtime',clientId:'synthetic.access',principalRef:approval.identityRef,expiresAt:m.deadline,revision:1};
 const {privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'test-key'};
 const jwt=await new SignJWT({type:'app',sub:'',common_name:config.clientId}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setIssuer('https://'+config.teamDomain).setAudience(config.audience).setIssuedAt(Math.floor(start/1000)).setExpirationTime(Math.floor(m.deadline/1000)).sign(privateKey);
 const bundleFor=async entry=>build({stdin:{resolveDir:process.cwd(),contents:`
 import original,{PrivateQaPreregistration,PrivateQaBootstrap} from './worker/independent-closure/${entry}.mjs';export{PrivateQaBootstrap};
 import {createPrivateCustodyChallenge} from './lib/assistance-private-custody-challenge.mjs';
 // Only fixture routes expose operator methods or journal for local observation.
 export class Fixture extends PrivateQaPreregistration{constructor(ctx,env){super(ctx,env);this.storage=ctx.storage;this.env=env;}async fetch(request){const p=new URL(request.url).pathname;if(p==='/fixture/register')return Response.json(await this.register(${JSON.stringify(registration.plan.baselineRef)}));if(p==='/fixture/withdraw')return Response.json(await this.withdraw());if(p==='/fixture/history')return Response.json(await this.readForClosure());if(p==='/fixture/status')return Response.json(await createPrivateCustodyChallenge({storage:this.storage,readInstallation:()=>JSON.parse(this.env.AFW_QA_PREREGISTRATION)}).status());return super.fetch(request);}}
 export default{async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/fixture/observe'){const instance=await env.BOOTSTRAP.create({id:url.searchParams.get('id'),params:JSON.stringify({operation:'observe',recordRef:url.searchParams.get('ref')})});return Response.json({id:instance.id});}if(url.pathname==='/fixture/workflow')return Response.json(await(await env.BOOTSTRAP.get(url.searchParams.get('id'))).status());if(url.pathname.startsWith('/fixture/'))return env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).fetch(request);return original.fetch(request,env);}};
 `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
 const bundle=await bundleFor('index'),rollback=await bundleFor('closed-rollback');
 for(const scenario of ['confirmed','withdrawn','unregistered','closed','client']){
  let keyRequests=0;
  const options={modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,bindings:{AFW_QA_BOOTSTRAP_ENABLED:'true',AFW_QA_CHALLENGE_ENABLED:scenario==='closed'?'false':'true',AFW_QA_PREREGISTRATION:JSON.stringify({registration,approval}),AFW_QA_CHALLENGE_IDENTITY:JSON.stringify(config)},durableObjects:{AFW_QA_PREREGISTRY:{className:'Fixture',useSQLite:true}},outboundService:async request=>{assert.equal(request.url,'https://test.cloudflareaccess.com/cdn-cgi/access/certs');keyRequests++;return Response.json({keys:[jwk]});}};
  options.workflows={BOOTSTRAP:{name:'own-bootstrap',className:'PrivateQaBootstrap'}};
  const runtime=new Miniflare(convertV4MiniflareOptions(options));
  try{
   const fixture=async path=>(await runtime.dispatchFetch(config.origin+'/fixture/'+path)).json();
   const observe=async(id,ref=registration.plan.baselineRef)=>{await fixture('observe?id='+id+'&ref='+ref);let state;const end=Date.now()+10000;do{state=await fixture('workflow?id='+id);if(state.status==='complete'||state.status==='errored')break;await new Promise(r=>setTimeout(r,25));}while(Date.now()<end);assert.equal(state.status,'complete',JSON.stringify(state));return state.output;};
   const call=(body={challenge:'request'},suffix='',headers={})=>runtime.dispatchFetch(config.origin+'/assistance/custody/confirm'+suffix,{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':jwt,...headers},body:JSON.stringify(body)});
   for(const suffix of ['/register','?extra=1'])assert.equal((await call(undefined,suffix)).status,404);
   assert.equal((await runtime.dispatchFetch(config.origin+'/assistance/custody/confirm')).status,404);
   assert.equal((await call(undefined,'',{Origin:config.origin})).status,scenario==='closed'?404:401);
   if(scenario==='closed'){assert.equal((await call()).status,404);assert.equal(keyRequests,0);continue;}
   assert.equal((await call(undefined,'',{'Cf-Access-Jwt-Assertion':'invalid'})).status,401);
   if(scenario==='unregistered'){assert.equal((await call()).status,409);assert.equal(await fixture('history'),null);assert.equal((await observe('unregistered')).state,'unavailable');assert.equal(await fixture('history'),null);continue;}
   assert.equal(await fixture('register'),true);
   if(scenario==='client'){
    let calls=0;
    const result=await runPrivateChallengeClient(['confirm',registration.plan.baselineRef,String(start),String(m.deadline)],{AFW_OPERATIONS_ACCESS_CLIENT_ID:config.clientId,AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic'}, {fetchImpl:async request=>{calls++;const headers=new Headers(request.headers);headers.set('Cf-Access-Jwt-Assertion',jwt);return runtime.dispatchFetch(request.url,{method:request.method,headers,body:await request.text()});}});
    assert.equal(calls,2);assert.deepEqual(result,await fixture('status'));assert.equal(result.state,'confirmed');assert.equal(Object.hasOwn(result,'nonce'),false);assert.equal((await call()).status,429);continue;
   }
   const issued=await call();assert.equal(issued.status,200);const {nonce}=await issued.json();assert.match(nonce,/^[0-9a-f]{64}$/);
   if(scenario==='withdrawn'){assert.equal(await fixture('withdraw'),true);assert.equal((await call({nonce})).status,409);assert.ok(await fixture('history'));assert.notEqual((await fixture('status')).state,'confirmed');}
   else {assert.equal((await call({nonce})).status,200);assert.equal((await fixture('status')).state,'confirmed');}
   const history=await fixture('history'),receipt=await fixture('status');
   assert.deepEqual(await observe('receipt'),{contract:'afw-private-qa-observation/v1',state:'observed',recordRef:registration.plan.baselineRef,challenge:receipt});assert.equal((await observe('wrong-ref','a'.repeat(64))).state,'unavailable');assert.deepEqual(await fixture('history'),history);
   await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...options.bindings,FIXTURE_RESTART:'true'}}));
   const repeated=await Promise.all([call({nonce}),call(),call({nonce})]);assert.deepEqual(repeated.map(r=>r.status),[429,429,429]);assert.ok(keyRequests>=1);
   await runtime.setOptions(convertV4MiniflareOptions({...options,script:rollback.outputFiles[0].text}));
   assert.equal((await call({nonce})).status,404);assert.equal(await fixture('register'),false);assert.ok(await fixture('history'));
   if(scenario==='confirmed')assert.equal((await fixture('status')).state,'confirmed');
   assert.deepEqual((await observe('rollback-history')).challenge,receipt);assert.deepEqual(await fixture('history'),history);
  }finally{await runtime.dispose();}
 }
});
