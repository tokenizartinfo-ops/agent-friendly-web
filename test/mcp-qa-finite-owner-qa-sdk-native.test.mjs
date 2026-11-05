import test from 'node:test';
import assert from 'node:assert/strict';

// Missing-feature RED is deliberately separate from a native pending-operation
// RED: absence of these modules does not claim that an SDK call was entered.
async function feature(path,names){
 const m=await import(path).catch(error=>{if(error.code==='ERR_MODULE_NOT_FOUND'&&error.message.includes(path.split('/').at(-1)))return {};throw error;});
 for(const name of names)assert.equal(typeof m[name],'function','missing D0.2 helper: '+name);
 return m;
}
test('D0.2 local resolved result has a strict domain and rejects the removed reported ACK',async()=>{
 const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await feature('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs',['sealFiniteOwnerIssuerProvenanceRecord','encodeFiniteOwnerIssuerProvenanceRecord','decodeFiniteOwnerIssuerProvenanceRecord']);
 const input={purpose:'afw.finite-owner-sdk-observed.v1',sendHash:'a'.repeat(64),resultHash:'b'.repeat(64),observedAt:100,outcome:'resolved'};
 const record=seal('SdkObserved',input),raw=encode('SdkObserved',record);
 assert.deepEqual(decode('SdkObserved',raw),record);
 for(const extra of [{reported:true},{code:'never durable'},{operation:'sdk_complete'},{outcome:'reported'}])assert.throws(()=>seal('SdkObserved',{...input,...extra}));
 assert.throws(()=>seal('SdkAck',input));
 assert.throws(()=>decode('SdkObserved',raw+' '));
 assert.throws(()=>seal('SdkObserved',Object.defineProperty({...input},'resultHash',{enumerable:true,get(){throw Error('accessor ran');}})),error=>!error.message.includes('accessor ran'));
});
test('D0.2 fixed original authorization grammar denies old result paths and payloads',async()=>{
 const {qualifyFiniteOwnerOAuthRequest:qualify}=await feature('../lib/mcp-qa-finite-owner-oauth-wire.mjs',['qualifyFiniteOwnerOAuthRequest']);
 const origin='https://delegated-canary.agentfriendlyweb.dev';
 const url=origin+'/authorize?client_id=c&redirect_uri=https%3A%2F%2Fclient.example%2Fcb&response_type=code&resource='+encodeURIComponent(origin+'/mcp')+'&scope=afw%3Aproject%3Aread&state=s&code_challenge='+'a'.repeat(43)+'&code_challenge_method=S256';
 const get=new Request(url);assert.equal(qualify(get,new Uint8Array()).method,'GET');
 for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve'])assert.throws(()=>qualify(new Request(origin+path),new Uint8Array()));
 assert.throws(()=>qualify(new Request(url+'&resultHash='+'b'.repeat(64)),new Uint8Array()));
 assert.throws(()=>qualify(new Request(url+'&client_id=c'),new Uint8Array()));
 const headers={Origin:origin,'Content-Type':'application/x-www-form-urlencoded'};
 const post=new Request(origin+'/authorize',{method:'POST',headers});
 const form='handle='+'a'.repeat(43)+'&decision=approve&scope=afw%3Aproject%3Aread';
 assert.equal(qualify(post,new TextEncoder().encode(form)).method,'POST');
 for(const suffix of ['&sdkCompleted=true','&resultHash=x','&decision=approve'])assert.throws(()=>qualify(post,new TextEncoder().encode(form+suffix)));
 assert.throws(()=>qualify(post,new Uint8Array(16385)));
});

import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r[Symbol.dispose]?.();}}

const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
async function world(fn,{observed=true,restart=false}={}){
 const f=await initialEntryHarness('phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
  const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent');
  f.source=context.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
  await seedFiniteOwnerSdkClient(f.mf,f.source);
  f.query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
  f.get=extra=>f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:{...f.headers,...extra}});
  f.post=(form,extra={})=>f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+form.cookie,...extra},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});
  f.history=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;
  if(observed){await f.stub.sdkConfigure();await f.stub.sdkPrimaryObserve();}
  await fn(f);
  const after=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;
  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'original historical D1 grant unchanged');
 }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
async function consent(f){
 const response=await f.get();assert.equal(response.status,200);
 const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
 const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
 const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);
 assert.equal(await f.db.prepare('SELECT id FROM delegated_access_grants WHERE id=?').bind(reservation.identity.grantId).first(),null);
 return {handle,cookie,identity:reservation.identity};
}
async function status(p){const r=await p;await r.body?.cancel();return r.status;}
async function observe(f){return plain(f.stub.sdkObservation());}
async function held(f){for(let n=0;n<200;n++){const state=await observe(f);if(state.held)return state;await new Promise(r=>setTimeout(r,20));}assert.fail('actual SDK KV hold did not enter');}
function has(s,suffix){return s.rows.some(([key])=>key.endsWith(suffix));}
async function oldPaths(f,form={handle:'a'.repeat(43),cookie:'SYN'}){
 const before=await observe(f),rows=await plain(f.stub.snapshot()),grants=(await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results;
 for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve']){
  assert.equal(await f.stub.sdkOldPath(path,{...f.headers,Cookie:PREP+'; '+form.cookie},JSON.stringify({handle:form.handle,resultHash:'a'.repeat(64),sdkCompleted:true})),404);
  assert.equal(await status(f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'resultHash='+ 'b'.repeat(64)})),503);
 }
 assert.deepEqual(await plain(f.stub.snapshot()),rows);assert.deepEqual((await f.db.prepare('SELECT * FROM delegated_access_grants ORDER BY id').all()).results,grants);assert.deepEqual(await observe(f),before);
}
async function issued(f,form,response){
 assert.equal(response.status,302);const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);
 const app=await f.db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(form.identity.grantId).first();
 assert.equal(app.id,form.identity.grantId);assert.equal(app.revoked_at,'');
 const [subject,sdkId]=code.split(':'),kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk'),grant=await kv.get('grant:'+subject+':'+sdkId,{type:'json'});
 assert(grant,'M fixture alias observes actual SDK grant');assert.equal(grant.userId,form.identity.subject);assert.equal(grant.clientId,form.identity.clientId);assert.equal(grant.resource,form.identity.resource);assert.deepEqual(grant.scope,['afw:project:read']);assert(grant.encryptedProps);assert(grant.authCodeId);
 const final=await observe(f);assert(has(final,'sdk_complete:observed'));assert.equal(final.rows.length,8);
 return {app,code,sdkId,grant};
}
test('uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code',()=>world(async f=>{
 await oldPaths(f);
 const form=await consent(f),winner=await issued(f,form,await f.post(form));
 const before=await plain(f.stub.snapshot());
 assert.equal(await status(f.post(form)),503);assert.equal(await status(f.get()),503);
 assert.deepEqual(await plain(f.stub.snapshot()),before);
 assert.deepEqual(await f.db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(form.identity.grantId).first(),winner.app);
 assert.equal((await observe(f)).calls.length,0,'positive uses unwrapped native KV methods');
},{observed:false}));
test('held actual approve denies fabricated results and concurrent complete bearer replay; one original winner',()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);
 let s=await held(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
 assert.equal(await f.db.prepare('SELECT id FROM delegated_access_grants WHERE id=?').bind(form.identity.grantId).first(),null);
 await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 await f.stub.sdkReleaseHeld();await issued(f,form,await pending);
 s=await observe(f);assert(s.calls.some(c=>c.method==='get'&&c.prefix==='transaction'));assert(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').every(c=>c.actualGrantAck));assert.equal(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').length,1);assert.equal(s.calls.filter(c=>c.method==='list').length,0);
 for(const p of s.probes.filter(p=>p.strictUnavailable!==undefined))assert.equal(p.strictUnavailable,true,'strict public reader denied same ambient unresolved SEND');
 const consumed=s.probes.find(p=>p.kind==='consumption');assert(consumed.sameStore&&consumed.sameChild);assert(consumed.windowMs<=5000&&consumed.remainingMs>0);
 for(const session of s.primary){assert.equal(session.constraint,'first-primary');assert.match(session.queries[0],/^SELECT\b/i);}
}));
test('missing actual SDK binding cookie denies copied public form before original consume',()=>world(async f=>{
 const form=await consent(f);assert.equal(await status(f.post(form,{Cookie:PREP})),503);
 const s=await observe(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
 assert.equal(await f.db.prepare('SELECT id FROM delegated_access_grants WHERE id=?').bind(form.identity.grantId).first(),null);
 assert.equal(await status(f.post(form)),503,'unknown approve claim cannot be retried with later credentials');
}));
test('stale actual native KV transaction remains unavailable and cannot allocate another attempt',()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('stale');assert.equal(await status(f.post(form)),503);
 const before=await observe(f);assert(has(before,'sdk_approve:send'));assert(!has(before,'sdk_approve:observed'));assert.equal(await status(f.post(form)),503);assert.deepEqual(await observe(f),before);
}));
test('real KV client miss/error, wrong actual alias profile and missing holder deny before SDK claim',()=>world(async f=>{
 const original=await plain(f.stub.snapshot());
 for(const fault of ['sdk-alias','sdk-extra','qa-module']){f.ownerFault=fault;assert.equal(await status(f.get()),503,fault);assert.deepEqual(await plain(f.stub.snapshot()),original);}f.ownerFault=null;
 await f.stub.sdkAliasAbsent(true);assert.equal(await status(f.get()),503);await f.stub.sdkAliasAbsent(false);
 for(const mode of ['miss','error']){await f.stub.sdkConfigure(mode);assert.equal(await status(f.get()),503,mode);assert.deepEqual(await plain(f.stub.snapshot()),original);assert.equal((await observe(f)).rows.length,0);}
}));
test('actual begin native abort retains SDK uncertainty; late resolution creates no reservation or form',()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
 assert(!has(await observe(f),'sdk_begin:observed'));await status(f.mf.dispatchFetch(f.source.origin+'/fixture/abort'));
 assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
 assert.equal(await status(f.get()),503);await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
 const s=await observe(f);assert(!has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
 assert.equal(await status(f.get()),503,'unresolved original begin SEND never reissues');
}));
test('actual begin holder replacement while pending denies actual settled result',()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);await f.stub.sdkReplaceHolder();await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);
 assert(!has(await observe(f),'sdk_begin:observed'));assert.equal(await status(f.get()),503);
}));
test('held actual complete times out at original parent; late KV settlement and actor restart cannot ACK or reissue',{timeout:55000},()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-put');const start=Date.now(),pending=f.post(form);
 const s=await held(f);assert(has(s,'sdk_complete:send'));assert(!has(s,'sdk_complete:observed'));assert(s.calls.some(c=>c.prefix==='grant'&&c.actualGrantAck));
 await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
 assert.equal(await status(pending),503);assert(Date.now()-start<32000);assert.equal((await observe(f)).held,true);
 const frozen=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));
 assert.deepEqual(await plain(f.stub.snapshot()),frozen);assert(!has(await observe(f),'sdk_complete:observed'));
 await f.restart();assert.equal(await status(f.post(form)),503);assert.deepEqual(await plain(f.stub.snapshot()),frozen);
},{restart:true}));
test('29 seconds of actual original request lifetime leaves at most one second for held SDK begin',{timeout:42000},()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');await status(f.mf.dispatchFetch(f.source.origin+'/fixture/elapsed'));const start=Date.now(),pending=f.get();
 const response=await pending;assert.equal(response.status,503);await response.body?.cancel();assert(Date.now()-start<32000);
 const s=await observe(f);if(s.held){assert(!has(s,'sdk_begin:observed'));await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));}
 assert(!has(await observe(f),'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
}));
