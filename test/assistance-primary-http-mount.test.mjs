import test from 'node:test';
import assert from 'node:assert/strict';
import {exportJWK} from 'jose';
import {httpFixture} from './fixtures/occurrence-http.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
const host=await import('../worker/independent-closure/occurrence-host.mjs').catch(()=>({}));
const origin='https://operations-manager.agentfriendlyweb.dev';
test('own HTTP mount stays closed before touching dependencies',async()=>{
 assert.equal(typeof host.fetchOwnOccurrence,'function');
 const env={AFW_QA_HTTP_ENABLED:'false'};
 for(const key of ['AFW_QA_DB','AFW_QA_PREREGISTRY','AFW_QA_OCCURRENCE_RATE_LIMITER'])Object.defineProperty(env,key,{get(){throw Error('Closed dependency accessed');}});
 assert.equal((await host.fetchOwnOccurrence(new Request(origin+'/assistance/occurrences/create'),env)).status,404);
});
test('enabled mount without exact server configuration or own bindings denies',async()=>{
 assert.equal(typeof host.fetchOwnOccurrence,'function');
 for(const policy of ['', '{}', 'x'.repeat(20001)])assert.equal((await host.fetchOwnOccurrence(new Request(origin+'/assistance/occurrences/create'),{AFW_QA_HTTP_ENABLED:'true',AFW_QA_HTTP_POLICY:policy})).status,503);
});
test('configuration or dependency withdrawal during primary await prevents occurrence writes',async()=>{
 const originalFetch=globalThis.fetch;
 try{for(const key of ['AFW_QA_HTTP_ENABLED','AFW_QA_HTTP_POLICY','AFW_QA_PREREGISTRATION','AFW_QA_DB','AFW_QA_PREREGISTRY','AFW_QA_OCCURRENCE_RATE_LIMITER']){
  const f=await httpFixture();try{
   const jwk=await exportJWK(f.options.keySet);
   globalThis.fetch=async url=>{assert.equal(String(url),'https://test.cloudflareaccess.com/cdn-cgi/access/certs');return Response.json({keys:[jwk]});};
   const {registration}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
   registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=f.m.occurrenceId;registration.approvalDigest=f.planDigest;registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
   const scope={registration,approval:f.approval};let reads=0;
   const env={AFW_QA_HTTP_ENABLED:'true',AFW_QA_HTTP_POLICY:JSON.stringify(f.policy),AFW_QA_PREREGISTRATION:JSON.stringify(scope),AFW_QA_DB:f.db,AFW_QA_OCCURRENCE_RATE_LIMITER:f.options.limiter,AFW_QA_PREREGISTRY:{idFromName:name=>{assert.equal(name,'own-qa');return name;},get:()=>({readOwnAdmissionScope:async()=>{reads++;await Promise.resolve();env[key]=null;const t=Date.now();return {...scope,admission:{contract:'afw-primary-admission-observation/v1',observedAt:t,evidenceAt:t,freshUntil:Math.min(f.m.deadline,t+30000)}};},readOwnClosureScope:async()=>scope})}};
   const response=await host.fetchOwnOccurrence(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}),env);
   assert.equal(reads,1,key);assert.equal(response.status,409,key);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0,key);
  }finally{f.cleanup();}
 }}finally{globalThis.fetch=originalFetch;}
});
