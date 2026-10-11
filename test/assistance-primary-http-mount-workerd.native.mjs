import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {readFileSync} from 'node:fs';
import {generateKeyPair,exportJWK,SignJWT} from 'jose';
import {httpFixture,origin} from './fixtures/occurrence-http.mjs';
import {schemas,sqlStatements} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';

test('mounted own Worker verifies synthetic remote JWKS, real D1 six phases and real limiter',async()=>{
 const f=await httpFixture();let runtime;
 try{
  const {registration}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
  registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=f.m.occurrenceId;registration.approvalDigest=f.planDigest;registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
  const scope={registration,approval:f.approval},evidenceAt=Date.now(),{privateKey,publicKey}=await generateKeyPair('RS256'),jwk={...await exportJWK(publicKey),kid:'synthetic-own-mount',alg:'RS256'};
  const bundle=await build({stdin:{resolveDir:process.cwd(),contents:`
   import original from './worker/independent-closure/index.mjs';import {DurableObject} from 'cloudflare:workers';
   // Synthetic fixed authority ONLY for HTTP composition. Separate bootstrap
   // tests exercise the real SAME-primary originals/challenge/consumption.
   export class FixturePrimary extends DurableObject{
    async readOwnAdmissionScope(){if(await this.ctx.storage.get('withdrawn'))return null;return {...${JSON.stringify(scope)},admission:{contract:'afw-primary-admission-observation/v1',observedAt:Date.now(),evidenceAt:${evidenceAt},freshUntil:${Math.min(f.m.deadline,evidenceAt+30000)}}};}
    async readOwnClosureScope(){return await this.ctx.storage.get('withdrawn')?null:${JSON.stringify(scope)};}
    async withdrawFixture(){await this.ctx.storage.put('withdrawn',true);}
   }
   export default {async fetch(request,env){if(new URL(request.url).pathname==='/fixture/withdraw'){await env.AFW_QA_PREREGISTRY.get(env.AFW_QA_PREREGISTRY.idFromName('own-qa')).withdrawFixture();return Response.json(true);}return original.fetch(request,env);}};
  `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
  let jwksCalls=0;
  const bindings={AFW_QA_HTTP_ENABLED:'false',AFW_QA_HTTP_POLICY:JSON.stringify(f.policy),AFW_QA_PREREGISTRATION:JSON.stringify(scope)};
  const options={modules:true,compatibilityDate:'2026-09-07',script:bundle.outputFiles[0].text,bindings,d1Databases:{AFW_QA_DB:'synthetic-own-mount-'+crypto.randomUUID()},durableObjects:{AFW_QA_PREREGISTRY:{className:'FixturePrimary',useSQLite:true}},ratelimits:{AFW_QA_OCCURRENCE_RATE_LIMITER:{namespace_id:'synthetic-own-mount-'+crypto.randomUUID(),simple:{limit:10,period:60}}},outboundService:async request=>{assert.equal(request.url,'https://test.cloudflareaccess.com/cdn-cgi/access/certs');jwksCalls++;return Response.json({keys:[jwk]});}};
  runtime=new Miniflare(convertV4MiniflareOptions(options));
  const token=async(patch={})=>new SignJWT({type:'app',common_name:f.policy.auth.clientId,...patch}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setIssuer('https://test.cloudflareaccess.com').setAudience(f.policy.auth.audience).setSubject('').setExpirationTime('5m').sign(privateKey);
  const jwt=await token(),send=(phase,body,headers={})=>runtime.dispatchFetch(origin+'/assistance/occurrences/'+phase,{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':jwt,...headers},body:JSON.stringify(body)});
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId})).status,404);assert.equal(jwksCalls,0);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_QA_HTTP_ENABLED:'true'},ratelimits:{}}));
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId})).status,503);assert.equal(jwksCalls,0);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_QA_HTTP_ENABLED:'true'}}));
  let db=await runtime.getD1Database('AFW_QA_DB');
  for(const name of [...schemas,'assistance-occurrences-v2','assistance-occurrences-v2-reservation-fence'])for(const statement of sqlStatements(readFileSync('worker/operations/'+name+'.sql','utf8')))await db.prepare(statement).run();
  await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(f.m.signal.eventId,f.m.signal.projectRef,10,'assistance_requested','orientation',f.m.signal.observedAt,Date.now()).run();
  assert.equal(await createOccurrenceApprovalCatalog({db}).approve(f.approval),true);
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId},{Origin:origin})).status,403);
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId},{'Cf-Access-Jwt-Assertion':await token({type:'user',email:'synthetic@example.com'})})).status,401);
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId},{'Cf-Access-Jwt-Assertion':await token({common_name:'foreign-service.access'})})).status,401);
  const phases=['create','list','admit-claim','claim','admit-finish','finish'];
  for(const [i,phase]of phases.entries()){
   const response=await send(phase,{occurrenceId:f.m.occurrenceId,...(i?{expectedSequence:i}:{})});
   assert.equal(response.status,200,phase+':'+await response.clone().text());assert.equal((await response.json()).sequence,i+1);
  }
  assert.ok(jwksCalls>0);assert.equal((await db.prepare('SELECT max(sequence) sequence FROM assistance_occurrence_journal WHERE occurrence_id=?').bind(f.m.occurrenceId).first()).sequence,6);
  const foreign=structuredClone(scope);foreign.registration.provisioning.creationRef='7'.repeat(64);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_QA_HTTP_ENABLED:'true',AFW_QA_PREREGISTRATION:JSON.stringify(foreign)}}));
  assert.equal((await send('stop',{occurrenceId:f.m.occurrenceId,reason:'operator_closed'})).status,409);
  await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...bindings,AFW_QA_HTTP_ENABLED:'true'}}));
  db=await runtime.getD1Database('AFW_QA_DB');
  await runtime.dispatchFetch(origin+'/fixture/withdraw');
  assert.equal((await send('stop',{occurrenceId:f.m.occurrenceId,reason:'operator_closed'})).status,409);
  assert.equal((await db.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE state='stopped'").first()).n,0);
  // Runtime reconfiguration and a native period boundary may reset the
  // limiter epoch. Do not infer durable counts across setOptions; bounded
  // denied reads must still encounter the actual native limiter.
  let limited=false;
  for(let i=0;i<21;i++){const status=(await send('list',{occurrenceId:f.m.occurrenceId,expectedSequence:1})).status;assert.ok(status===409||status===429);if(status===429){limited=true;break;}}
  assert.equal(limited,true);
  await runtime.setOptions(convertV4MiniflareOptions(options));
  assert.equal((await send('create',{occurrenceId:f.m.occurrenceId})).status,404);
 }finally{if(runtime)await runtime.dispose();f.cleanup();}
});

