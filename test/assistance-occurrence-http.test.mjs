import test from 'node:test';
import assert from 'node:assert/strict';
import {adapter,digestModule,httpFixture,origin,signed} from './fixtures/occurrence-http.mjs';
import {runAssistanceHttpOccurrence} from '../lib/assistance-http-occurrence.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
const liveScope=scope=>{const t=Date.now()-1;return {...scope,admission:{contract:'afw-primary-admission-observation/v1',observedAt:t,evidenceAt:t,freshUntil:Math.min(scope.approval.manifest.deadline,t+30000)}};};
async function ownScope(f){
 const {registration}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
 registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=f.m.occurrenceId;
 registration.approvalDigest=await digestModule.computeOccurrencePlanDigest({manifest:f.m,identityRef:f.approval.identityRef,admissionContract:'server-v1',approval:f.approval});
 registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 return {registration,approval:f.approval};
}
test('primary stop rereads closure authority after awaited journal lookup',async()=>{
 const f=await httpFixture();try{
  const scope=await ownScope(f);let allowed=true;
  assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);
  const db={prepare:s=>{const stmt=f.db.prepare(s);if(s.startsWith('SELECT * FROM assistance_occurrence_journal'))return {...stmt,bind:(...values)=>{const bound=stmt.bind(...values);return {...bound,first:async()=>{const row=await bound.first();allowed=false;return row;}};}};return stmt;},batch:ss=>f.db.batch(ss)};
  const h=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,db,primary:{recordRef:scope.registration.plan.baselineRef,creationRef:scope.registration.provisioning.creationRef,readLive:async()=>liveScope(scope),readClosure:async()=>allowed?scope:null}});
  assert.notEqual((await h(f.makeRequest('/assistance/occurrences/stop',{occurrenceId:f.m.occurrenceId,reason:'operator_closed'}))).status,200);
  assert.equal(f.a.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE state='stopped'").get().n,0);
 }finally{f.cleanup();}
});
test('final SQL clock cannot refresh expired primary evidence before create batch',async()=>{
 const f=await httpFixture();try{
  const scope=await ownScope(f);let clocks=0;
  const db={prepare:s=>{const stmt=f.db.prepare(s);if(s.startsWith('SELECT')&&s.includes("unixepoch('subsec')"))return {...stmt,first:async()=>{if(++clocks===2){const advanced=Date.now()+60000;f.a.function('unixepoch',{varargs:true},()=>advanced/1000);}return stmt.first();}};return stmt;},batch:ss=>f.db.batch(ss)};
  const h=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,db,primary:{recordRef:scope.registration.plan.baselineRef,creationRef:scope.registration.provisioning.creationRef,readLive:async()=>liveScope(scope),readClosure:async()=>scope}});
  assert.notEqual((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);
  assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);
 }finally{f.cleanup();}
});
test('transactional SQL age fence preserves primary evidence date through delayed batch',async()=>{
 const f=await httpFixture();try{
  const scope=await ownScope(f),t=Date.now()-1;
  const live={...scope,admission:{contract:'afw-primary-admission-observation/v1',observedAt:t,evidenceAt:t-25000,freshUntil:t+5000}};
  const db={prepare:s=>f.db.prepare(s),batch:ss=>{const advanced=Date.now()+6000;f.a.function('unixepoch',{varargs:true},()=>advanced/1000);return f.db.batch(ss);}};
  const h=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,db,primary:{recordRef:scope.registration.plan.baselineRef,creationRef:scope.registration.provisioning.creationRef,readLive:async()=>live,readClosure:async()=>scope}});
  assert.notEqual((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);
  assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);
 }finally{f.cleanup();}
});
test('primary HTTP adapter refuses bare D1 approval without fixed primary readers',async()=>{
 const f=await httpFixture();try{
  assert.equal(typeof adapter.createPrimaryOccurrenceHttpAdapter,'function');
  for(const primary of [undefined,{}, {recordRef:'a'.repeat(64),creationRef:'b'.repeat(64),readLive:async()=>null,readClosure:async()=>null}]){
   const h=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,primary});
   assert.notEqual((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);
  }
  assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);
 }finally{f.cleanup();}
});
test('primary HTTP requires current fixed pins at every admission and separates stop reader',async()=>{
 const f=await httpFixture();try{
  const {registration}=await qaAdministrationFixture({createdAt:f.m.startAt,closeAt:f.m.deadline,expiresAt:f.m.deadline+10000});
  registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=f.m.occurrenceId;
  registration.approvalDigest=await digestModule.computeOccurrencePlanDigest({manifest:f.m,identityRef:f.approval.identityRef,admissionContract:'server-v1',approval:f.approval});
  registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
  const scope={registration,approval:f.approval};let live=0,closed=0,withdrawn=false;
  const primary={recordRef:registration.plan.baselineRef,creationRef:registration.provisioning.creationRef,readLive:async()=>{live++;return withdrawn?null:liveScope(scope);},readClosure:async()=>{closed++;return scope;}};
  const h=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,primary});
  assert.equal((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);assert.ok(live>=2);
  withdrawn=true;assert.equal((await h(f.makeRequest('/assistance/occurrences/list',{occurrenceId:f.m.occurrenceId,expectedSequence:1}))).status,409);
  await f.catalog.revoke({occurrenceId:f.m.occurrenceId,reason:'operator_closed'});
  const beforeLive=live;assert.equal((await h(f.makeRequest('/assistance/occurrences/stop',{occurrenceId:f.m.occurrenceId,reason:'operator_closed'}))).status,200);assert.equal(live,beforeLive);assert.ok(closed>=2);
  const foreign=adapter.createPrimaryOccurrenceHttpAdapter({...f.options,primary:{...primary,recordRef:'1'.repeat(64)}});
  assert.equal((await foreign(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,409);
 }finally{f.cleanup();}
});
test('standalone QA adapter composes six canonical runner calls and one correlated real terminal run',async()=>{
 assert.equal(typeof adapter.createOccurrenceHttpAdapter,'function');assert.equal(typeof digestModule.computeOccurrencePlanDigest,'function');
 const f=await httpFixture();try{const r=await runAssistanceHttpOccurrence({manifest:f.m,planDigest:f.planDigest,preflight:async()=>f.cloud(),env:{AFW_OPERATIONS_ACCESS_CLIENT_ID:'synthetic-id',AFW_OPERATIONS_ACCESS_CLIENT_SECRET:'synthetic-secret'},fetchImpl:f.fetchImpl});assert.equal(r.status,'completed');assert.equal(r.total,6);assert.equal(r.outcome,'intervention_required');assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_supervision_runs').get().n,1);assert.equal(f.a.prepare('SELECT outcome FROM assistance_supervision_runs').get().outcome,'intervention_required');assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/claim',{occurrenceId:f.m.occurrenceId,expectedSequence:3}))).status,409);}finally{f.cleanup();}
});
test('QA OFF preserves legacy dispatch; exclusive vetoes every legacy route before DB/limiter',async()=>{
 const f=await httpFixture();try{let legacyCalls=0;const h=adapter.createOccurrenceHttpAdapter({...f.options,legacy:async()=>{legacyCalls++;return Response.json({legacy:true});}});f.setPolicy({...f.policy,mode:'QA_OFF'});assert.equal((await h(new Request(origin+'/incidents'))).status,200);assert.equal((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,404);assert.equal(legacyCalls,1);f.setPolicy(f.policy);for(const path of ['/incidents','/claim','/finish','/notices','/notices/claim','/notices/ack','/notices/receipts','/dossiers','/dossiers/claim','/dossiers/finish','/assistance','/assistance/claim','/assistance/finish'])assert.equal((await h(f.makeRequest(path,{}))).status,404);assert.equal(legacyCalls,1);assert.equal(f.limitCalls(),0);}finally{f.cleanup();}
});
test('own admission uses coherent primary SQL time then a synchronous policy postcheck',async()=>{
 const f=await httpFixture();try{const trace=[];const db={prepare:s=>{if(s.includes("unixepoch('subsec')")&&s.startsWith('SELECT'))trace.push('clock');return f.db.prepare(s);},batch:async ss=>{assert.deepEqual(trace.slice(-2),['clock','policy']);return f.db.batch(ss);}};const h=adapter.createOccurrenceHttpAdapter({...f.options,db,readPolicy:()=>{trace.push('policy');return f.policy;}});assert.equal((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);}finally{f.cleanup();}
});
test('service identity and enrollment cannot be selected by caller; browser and foreign JWT deny',async()=>{
 const f=await httpFixture();try{for(const jwt of ['garbage',await signed(f.policy.auth,{},f.policy.auth.audience,'human'),await signed(f.policy.auth,{common_name:'other.access'}),await signed(f.policy.auth,{},[f.policy.auth.audience,'extra']),await signed(f.policy.auth,{exp:1})])assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId},jwt))).status,401);for(const headers of [{Origin:origin},{'Sec-Fetch-Site':'same-origin'}])assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId},f.jwt,headers))).status,403);assert.equal(f.limitCalls(),0);const p={...f.policy,enrollments:[{enrollmentRef:'1'.repeat(64),projectRef:f.m.signal.projectRef}]};p.serverConfigVersion=await adapter.computeOccurrenceServerConfigVersion(p);f.setPolicy(p);assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,409);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});
test('strict HTTP body and path allowlists reject commands, origin/query and sequence overrides',async()=>{
 const f=await httpFixture();try{for(const body of [{occurrenceId:f.m.occurrenceId,principalRef:f.policy.principalRef},{occurrenceId:f.m.occurrenceId,manifest:f.m},{occurrenceId:f.m.occurrenceId,preflight:{networkEnforced:true}},{occurrenceId:'bad'}])assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',body))).status,400);assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId,text:'x'.repeat(1100)}))).status,413);assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/claim',{occurrenceId:f.m.occurrenceId,expectedSequence:1}))).status,400);assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create?override=1',{occurrenceId:f.m.occurrenceId}))).status,404);assert.equal((await f.handler(new Request('https://wrong.invalid/assistance/occurrences/create'))).status,404);assert.equal((await f.handler(new Request(origin+'/assistance/occurrences/create'))).status,404);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});
test('missing schema/provider/limiter or invalid effective config fails closed without legacy fallback',async()=>{
 const f=await httpFixture();try{for(const options of [{readPolicy:null},{readPolicy:async()=>({...f.policy,networkEnforced:true})},{readPolicy:async()=>({...f.policy,serverConfigVersion:'1'.repeat(64)})},{limiter:null},{readPolicy:async()=>{throw Error('private-provider');}}]){let legacy=0;const h=adapter.createOccurrenceHttpAdapter({...f.options,...options,legacy:async()=>{legacy++;return Response.json({});}});const r=await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}));assert.equal(r.status,503);assert.equal(legacy,0);assert.equal((await r.text()).includes('private-provider'),false);}const blocked=adapter.createOccurrenceHttpAdapter({...f.options,limiter:{limit:async()=>({success:false})}});assert.equal((await blocked(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,429);const noSchema={prepare:s=>{if(s.includes('assistance_occurrence_schema'))throw Error('missing');return f.db.prepare(s);},batch:ss=>f.db.batch(ss)};assert.notEqual((await adapter.createOccurrenceHttpAdapter({...f.options,db:noSchema})(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);}finally{f.cleanup();}
});
test('revocation after own provider lookup rolls back HTTP claim and preserves independent stop',async()=>{
 const f=await httpFixture();try{for(const [suffix,seq] of [['create',undefined],['list',1],['admit-claim',2]])assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/'+suffix,{occurrenceId:f.m.occurrenceId,...(seq?{expectedSequence:seq}:{})}))).status,200,'setup '+suffix);const db={prepare:s=>f.other.prepare(s),batch:async ss=>{await f.catalog.revoke({occurrenceId:f.m.occurrenceId,reason:'security_denied'});return f.other.batch(ss);}};const h=adapter.createOccurrenceHttpAdapter({...f.options,db});assert.equal((await h(f.makeRequest('/assistance/occurrences/claim',{occurrenceId:f.m.occurrenceId,expectedSequence:3}))).status,409);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_supervision_runs').get().n,0);assert.equal(f.a.prepare('SELECT max(sequence) n FROM assistance_occurrence_journal').get().n,3);const stopped=await f.handler(f.makeRequest('/assistance/occurrences/stop',{occurrenceId:f.m.occurrenceId,reason:'ambiguous_response'}));assert.equal(stopped.status,200);assert.equal((await stopped.json()).result,'stopped');}finally{f.cleanup();}
});
test('HTTP binds owned first-primary and fails when current policy changes after await',async()=>{
 const f=await httpFixture();try{const sessions=[];const db={prepare:()=>{throw Error('replica must not read');},withSession:mode=>{sessions.push(mode);return f.db;}};let reads=0;const h=adapter.createOccurrenceHttpAdapter({...f.options,db,readPolicy:()=>{reads++;return reads===1?f.policy:{...f.policy,mode:'QA_OFF'};}});assert.equal((await h(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,409);assert.deepEqual(sessions,['first-primary']);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});
test('fixed one-second payload timeout cancels stalled body before any occurrence SQL effect',async()=>{
 const f=await httpFixture();try{let cancelled=false;const stream=new ReadableStream({cancel(){cancelled=true;}});const r=await f.handler(new Request(origin+'/assistance/occurrences/create',{method:'POST',headers:{'content-type':'application/json','Cf-Access-Jwt-Assertion':f.jwt},body:stream,duplex:'half'}));assert.equal(r.status,408);assert.equal(cancelled,true);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});
test('shared pure digest agrees exactly with historical cloud recipe and stored server digest',async()=>{
 const f=await httpFixture();try{const keys=['occurrenceId','requestId','signal','sourceRevision','configId','publicationId','startAt','deadline','tokenExpiresAt','serverDeadline'];const values=[...keys.map(k=>k==='signal'?Object.values(f.m.signal):f.m[k]),f.policy.principalRef];const expected=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(values)))),x=>x.toString(16).padStart(2,'0')).join('');assert.equal(await digestModule.computeOccurrencePlanDigest({manifest:f.m,identityRef:f.policy.principalRef}),expected);assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);assert.equal(f.a.prepare('SELECT manifest_digest FROM assistance_occurrences').get().manifest_digest,f.planDigest);await assert.rejects(digestModule.computeOccurrencePlanDigest({manifest:f.m,identityRef:f.policy.principalRef,privateText:'forbidden'}),/Invalid/);}finally{f.cleanup();}
});
test('effective policy changed during final SQL clock await denies every create effect',async()=>{
 const f=await httpFixture();try{let clocks=0;const db={prepare:s=>{const prepared=f.db.prepare(s);if(s.startsWith('SELECT')&&s.includes("unixepoch('subsec')"))return {...prepared,first:async()=>{const row=await prepared.first();if(++clocks===2)f.setPolicy({...f.policy,mode:'QA_OFF'});return row;}};return prepared;},batch:ss=>f.db.batch(ss)};const r=await adapter.createOccurrenceHttpAdapter({...f.options,db})(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}));assert.notEqual(r.status,200);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});

test('async effective policy readers fail closed instead of pretending a synchronous runtime snapshot',async()=>{
 const f=await httpFixture();try{const r=await adapter.createOccurrenceHttpAdapter({...f.options,readPolicy:async()=>f.policy})(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}));assert.equal(r.status,503);assert.equal(f.a.prepare('SELECT count(*) n FROM assistance_occurrences').get().n,0);}finally{f.cleanup();}
});
test('stop denies policy withdrawn during journal lookup before close batch',async()=>{
 const f=await httpFixture();try{assert.equal((await f.handler(f.makeRequest('/assistance/occurrences/create',{occurrenceId:f.m.occurrenceId}))).status,200);const db={prepare:s=>{const stmt=f.db.prepare(s);if(s.startsWith('SELECT * FROM assistance_occurrence_journal'))return {...stmt,bind:(...values)=>{const bound=stmt.bind(...values);return {...bound,first:async()=>{const row=await bound.first();f.setPolicy({...f.policy,mode:'QA_OFF'});return row;}};}};return stmt;},batch:ss=>f.db.batch(ss)};const r=await adapter.createOccurrenceHttpAdapter({...f.options,db})(f.makeRequest('/assistance/occurrences/stop',{occurrenceId:f.m.occurrenceId,reason:'operator_closed'}));assert.notEqual(r.status,200);assert.equal(f.a.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE state='stopped'").get().n,0);assert.equal(f.a.prepare('SELECT max(sequence) n FROM assistance_occurrence_journal').get().n,1);}finally{f.cleanup();}
});
