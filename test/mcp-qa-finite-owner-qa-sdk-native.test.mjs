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

test('strict local provenance records preserve exact bounded DATA-only fields',async()=>{
 const {sealFiniteOwnerIssuerProvenanceRecord:seal,encodeFiniteOwnerIssuerProvenanceRecord:encode,decodeFiniteOwnerIssuerProvenanceRecord:decode}=await import('../lib/mcp-qa-finite-owner-issuer-provenance-records.mjs');
 const h='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111',I0=1000;
 const values={
  Root:{purpose:'afw.finite-owner-issuer-root.v1',preconnectionId:h,capsuleHash:h,enrollmentHash:h,sourceRevision:'a'.repeat(40),actorId:h,qaVersionId:uuid,mVersionId:uuid,originalConnectionReceiptHash:h,I0,C0:I0+900000,C1:I0+1080000,createdAt:I0},
  SdkSend:{purpose:'afw.finite-owner-sdk-send.v1',rootHash:h,operation:'sdk_begin',originalRequestId:uuid,originalRequestHash:h,issuedAt:I0,deadline:I0+30000,bindingHash:h},
  ExpectedGrant:{purpose:'afw.finite-owner-expected-grant.v1',rootHash:h,identityHash:h,reservationHash:h,authorizationHash:h,grantId:uuid,approvedRequestHash:h,scopes:['afw:project:read'],createdAt:'2026-11-05T00:00:00.000Z',expiresAt:'2026-11-05T00:01:00.000Z'}
 };
 for(const [kind,value]of Object.entries(values)){
  const sealed=seal(kind,value),raw=encode(kind,sealed);assert.deepEqual(decode(kind,raw),sealed);
  for(const bad of [{...value,extra:true},{...value,[Symbol('unknown')]:true},Object.assign(Object.create({}),value),Object.defineProperty({...value},'purpose',{enumerable:true,get(){throw Error('executed accessor');}})])assert.throws(()=>seal(kind,bad),e=>!e.message.includes('executed accessor'));
  assert.throws(()=>decode(kind,raw+' '));assert.throws(()=>decode(kind,' '.repeat(16385)));
 }
 assert.throws(()=>seal('Root',{...values.Root,C0:values.Root.C0+1}));
 assert.throws(()=>seal('SdkSend',{...values.SdkSend,operation:'sdk-completed'}));
 assert.throws(()=>seal('SdkSend',{...values.SdkSend,deadline:I0+30001}));
 assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,grantId:'substitute'}));
 assert.throws(()=>seal('ExpectedGrant',{...values.ExpectedGrant,scopes:['afw:write']}));
});

test('legacy pair predicate rejects expiry with its original 503 status',async()=>{
 const {qualifyFiniteOwnerConnectionPair:qualify}=await import('../lib/mcp-qa-finite-owner-approved-ticket-facts.mjs');
 const {createHash}=await import('node:crypto'),h='a'.repeat(64),ref='b'.repeat(64),grantId='11111111-1111-4111-8111-111111111111',grantHash=createHash('sha256').update(grantId).digest('hex'),resource='https://delegated-canary.agentfriendlyweb.dev/mcp';
 const value={source:{clientId:'client',resource,project:{projectId:'project'}},identity:{subject:'owner'},pre:{preconnectionId:h,expiresAt:2000,owner:{accessExpiresAt:2000}},link:{grantHash,acceptedAt:1000},grant:{grantId,expiresAt:'1970-01-01T00:00:02.000Z'},relation:{preconnectionId:h,connectionRef:ref,grantHash,linkedAt:1000},connection:{connectionRef:ref,subject:'owner',grantId,clientId:'client',projectId:'project',resource,issuedAt:1000,expiresAt:2000},observedAt:1500};
 assert.doesNotThrow(()=>qualify(value));
 assert.throws(()=>qualify({...value,observedAt:2000}),error=>error.status===503);
});

import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}

const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
async function world(fn,{observed=true,restart=false,io=false}={}){
 const f=await initialEntryHarness(io?'phase-context-sdk-io':'phase-context-sdk'+(observed?'-observed':'')+(restart?'-restart':''));
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
  const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent');
  f.source=context.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
  await seedFiniteOwnerSdkClient(f.mf,f.source);
  f.query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
  f.timings={};f.get=async extra=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:{...f.headers,...extra}});}finally{f.timings.get=Date.now()-start;}};
  f.post=async (form,extra={})=>{const start=Date.now();try{return await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+form.cookie,...extra},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});}finally{f.timings.post=Date.now()-start;}};
  f.history=await plain(f.stub.sdkGrants());
  if(observed){await f.stub.sdkConfigure();await f.stub.sdkPrimaryObserve();}
  await fn(f);
  const after=await plain(f.stub.sdkGrants());
  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'original historical D1 grant unchanged');
 }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
async function consent(f){
 const response=await f.get();assert.equal(response.status,200);
 const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
 const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
 const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);
 assert.equal(await plain(f.stub.sdkGrant(reservation.identity.grantId)),null);
 return {handle,cookie,identity:reservation.identity};
}
async function status(p){const r=await p;await r.body?.cancel();return r.status;}
async function observe(f){return plain(f.stub.sdkObservation());}
async function held(f){for(let n=0;n<200;n++){const state=await observe(f);if(state.held)return state;await new Promise(r=>setTimeout(r,20));}assert.fail('actual SDK KV hold did not enter');}
function has(s,suffix){return s.rows.some(([key])=>key.endsWith(suffix));}
async function oldPaths(f,form={handle:'a'.repeat(43),cookie:'SYN'}){
 const before=await observe(f),rows=await plain(f.stub.snapshot()),grants=await plain(f.stub.sdkGrants());
 for(const path of ['/read-grant','/sdk-completed','/sdk-complete','/sdk-begin','/sdk-approve']){
  assert.equal(await f.stub.sdkOldPath(path,{...f.headers,Cookie:PREP+'; '+form.cookie},JSON.stringify({handle:form.handle,resultHash:'a'.repeat(64),sdkCompleted:true})),404);
  assert.equal(await status(f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'resultHash='+ 'b'.repeat(64)})),503);
 }
 assert.deepEqual(await plain(f.stub.snapshot()),rows);assert.deepEqual(await plain(f.stub.sdkGrants()),grants);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
}
async function issued(f,form,response){
 assert.equal(response.status,302);const code=new URL(response.headers.get('Location')).searchParams.get('code');assert(code);
 const app=await plain(f.stub.sdkGrant(form.identity.grantId));
 assert.equal(app.id,form.identity.grantId);assert.equal(app.revoked_at,'');
 const [subject,sdkId]=code.split(':'),kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk'),grant=await kv.get('grant:'+subject+':'+sdkId,{type:'json'});
 assert(grant,'M fixture alias observes actual SDK grant');assert.equal(grant.userId,form.identity.subject);assert.equal(grant.clientId,form.identity.clientId);assert.equal(grant.resource,form.identity.resource);assert.deepEqual(grant.scope,['afw:project:read']);assert(grant.encryptedProps);assert(grant.authCodeId);
 assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
 const final=await observe(f);assert(has(final,'sdk_complete:observed'));assert.equal(final.rows.length,8);
 const journal=await plain(f.stub.snapshot()),read=suffix=>JSON.parse(journal.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))[1]),consume=read(':consume:send'),ack=read(':grant:ack');assert(ack.observedAt<consume.deadline);console.info('D02 native timing',JSON.stringify({...f.timings,consumeSendToGrantAckMs:ack.observedAt-consume.issuedAt,childRemainingAtGrantAckMs:consume.deadline-ack.observedAt,consumeIssuedAt:consume.issuedAt,grantAckObservedAt:ack.observedAt,mockedProviderGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='provider'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length,mockedLedgerGetObservations:(f.observationTimes??[]).filter(v=>v.kind==='ledger'&&v.method==='GET'&&v.at>=consume.issuedAt&&v.at<=ack.observedAt).length}));
 return {app,code,sdkId,grant};
}
test('uninstrumented actual native source/SDK/Unit2a GET POST returns one original grant and code',()=>world(async f=>{
 await oldPaths(f);
 const form=await consent(f),racing=await Promise.all([f.post(form),f.post(form)]);assert.deepEqual(racing.map(r=>r.status).sort(),[302,503]);const winner=await issued(f,form,racing.find(r=>r.status===302));await racing.find(r=>r.status===503).body?.cancel();
 const before=await plain(f.stub.snapshot());
 assert.equal(await status(f.post(form)),503);assert.equal(await status(f.get()),503);
 assert.deepEqual(await plain(f.stub.snapshot()),before);
 assert.deepEqual(await plain(f.stub.sdkGrant(form.identity.grantId)),winner.app);
 assert.equal((await observe(f)).calls.length,0,'positive uses unwrapped native KV methods');
},{observed:false}));
test('held actual approve denies fabricated results and concurrent complete bearer replay; one original winner',()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);
 let s=await held(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
 assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
 await oldPaths(f,form);assert.equal(await status(f.post(form)),503);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 await f.stub.sdkReleaseHeld();await issued(f,form,await pending);
 s=await observe(f);assert(s.calls.some(c=>c.method==='get'&&c.prefix==='transaction'));assert(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').every(c=>c.actualGrantAck));assert.equal(s.calls.filter(c=>c.method==='put'&&c.prefix==='grant').length,1);assert.equal(s.calls.filter(c=>c.method==='list').length,0);assert(s.calls.every(c=>c.method==='get'&&['client','transaction'].includes(c.prefix)||c.method==='put'&&c.prefix==='grant'||c.method==='delete'&&c.prefix==='transaction'),'no other SDK grant/token mutation');
 for(const p of s.probes.filter(p=>p.strictUnavailable!==undefined))assert.equal(p.strictUnavailable,true,'strict public reader denied same ambient unresolved SEND');
 for(const op of ['consume','grant'])assert(s.probes.some(p=>p.kind==='issuer'&&p.op===op&&p.strictUnavailable));for(const op of ['sdk_approve','sdk_complete'])assert(s.probes.some(p=>p.kind==='sdk'&&p.op===op&&p.strictUnavailable));
 const consumed=s.probes.find(p=>p.kind==='consumption');assert(consumed.sameStore&&consumed.sameChild);assert(consumed.windowMs<=5000&&consumed.remainingMs>0);
 const writes=[];let readCount=0;for(const session of s.primary){assert.equal(session.constraint,'first-primary');if(session.queries.length>1){assert.equal(session.queries.length,8,'exact unchanged Unit2a preflight');assert.equal(session.queries[0],"SELECT type,name,sql FROM sqlite_schema WHERE tbl_name='finite_preparation_issuer_fences' AND type IN ('table','trigger') ORDER BY type,name");assert.match(session.queries[1],/^SELECT CAST\(unixepoch\('subsec'\)\*1000 AS INTEGER\) AS ms,/);for(const [index,table]of [[2,'delegated_consent_sessions'],[3,'delegated_access_grants'],[4,'site_projects']])assert(session.queries[index].startsWith('SELECT ')&&session.queries[index].endsWith(' FROM '+table+' LIMIT 0'));assert.deepEqual(session.queries.slice(5),['PRAGMA table_info(delegated_consent_sessions)','PRAGMA table_info(delegated_access_grants)','PRAGMA table_info(site_projects)']);continue;}const sql=session.queries[0];if(/^SELECT\b/i.test(sql)){readCount++;continue;}assert.match(sql,/^WITH q\(preconnection_id,authorization_hash,grant_id,enrollment_hash,identity_hash,/);assert(sql.includes("n(ms) AS (SELECT CAST(unixepoch('subsec')*1000 AS INTEGER))"));const kind=['INSERT INTO finite_preparation_issuer_fences','INSERT INTO delegated_consent_sessions','UPDATE delegated_consent_sessions AS c SET consumed_at=','INSERT INTO delegated_access_grants'].find(k=>sql.includes(k));assert(kind,'only exact original Unit2a atomic writer');writes.push(kind);}assert(readCount>20);assert.equal(new Set(writes).size,4);assert.equal(writes.length,4);
}));
test('missing actual SDK binding cookie denies copied public form before original consume',()=>world(async f=>{
 const form=await consent(f);assert.equal(await status(f.post(form,{Cookie:PREP})),503);
 const s=await observe(f);assert(has(s,'sdk_approve:send'));assert(!has(s,'sdk_approve:observed'));assert(!has(s,'sdk_complete:send'));
 assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);
 assert.equal(await status(f.post(form)),503,'unknown approve claim cannot be retried with later credentials');
}));
test('stale actual native KV transaction remains unavailable and cannot allocate another attempt',()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('stale');assert.equal(await status(f.post(form)),503);
 const before=await observe(f);assert(has(before,'sdk_approve:send'));assert(!has(before,'sdk_approve:observed'));assert.equal(await status(f.post(form)),503);const after=await observe(f);assert.deepEqual(after.rows,before.rows);assert.deepEqual(after.calls,before.calls);assert.deepEqual(after.probes,before.probes);
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

for(const boundary of ['controller','root-finish','dispatch-signal'])test('abort boundary diagnostic '+boundary,{timeout:45000},()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const control=new AbortController(),pending=(boundary==='dispatch-signal'?f.mf.dispatchFetch(f.source.origin+'/authorize?'+f.query,{redirect:'manual',headers:f.headers,signal:control.signal}):f.get()).then(async r=>({status:await status(Promise.resolve(r))}),()=>({rejected:true}));
 await held(f);
 if(boundary==='dispatch-signal')control.abort();else await status(f.mf.dispatchFetch(f.source.origin+(boundary==='controller'?'/fixture/abort':'/fixture/abort-root')));
 await new Promise(r=>setTimeout(r,100));
 const before=await observe(f),m=await (await f.mf.dispatchFetch(f.source.origin+'/fixture/signal-state')).json();
 await f.stub.sdkReleaseHeld();const response=await pending;await new Promise(r=>setTimeout(r,100));const after=await observe(f);
 for(const key of ['incomingEntryAborted','incomingAbortObserved','rootAbortObserved','rootEntryAborted','outgoingEntryAborted','outgoingAbortObserved'])assert.equal(typeof m[key],'boolean','missing actual signal observation '+key);
 if(boundary!=='dispatch-signal'||m.incomingAbortObserved){assert.equal(m.rootAbortObserved,true);assert.equal(m.outgoingAbortObserved,true);assert.equal(before.signals.abortObserved,true);assert.equal(before.leaseSignals.abortObserved,true);assert.equal(after.leaseSignals.sdkSettledAborted,true);assert.equal(has(after,'sdk_begin:observed'),false,'actual native QA abort must deny late observed ACK');}
 console.info('D02 abort boundary diagnostic',JSON.stringify({boundary,sender:m,qaBefore:before.signals,qaLeaseBefore:before.leaseSignals,qaAfter:after.signals,qaLeaseAfter:after.leaseSignals,response,lateObserved:has(after,'sdk_begin:observed'),profiles:f.sdkProfiles}));
}));

for(const snapshot of ['first','second'])test('actual current publication drift denies owned SDK result at '+snapshot+' observation',()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
 if(snapshot==='first')f.phaseFault='configuration';else{f.phaseObservation=0;f.phaseDrift='configuration';}
 await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
 assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
}));
test('actual verified owner expiry during held SDK begin cannot extend original access',()=>world(async f=>{
 f.headers['Cf-Access-Jwt-Assertion']=await f.enrollmentToken(f.source,Math.floor(Date.now()/1000)+8);
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);assert.equal(await status(pending),503);assert.equal((await observe(f)).held,true);
 await f.stub.sdkReleaseHeld();await new Promise(r=>setTimeout(r,100));assert(!has(await observe(f),'sdk_begin:observed'));
 assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')));
}));

for(const fault of ['sdk-extra','sdk-observed','issuer-extra','policy-send','backup','module','pointer','owner-revision'])test('owned begin recheck rejects actual foreign delta '+fault,()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
 if(['sdk-extra','sdk-observed','issuer-extra','policy-send'].includes(fault))await f.stub.sdkCorrupt(fault);
 else if(fault==='backup')await f.stub.phaseCorrupt('tamper-backup');
 else if(fault==='module')f.phaseFault='module';
 else {f.phaseObservation=0;f.phaseDrift=fault==='pointer'?'pointer':'revision';}
 const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before,'actual SDK result cannot adopt foreign ledger facts');
 assert(!(await plain(f.stub.snapshot())).some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation')));
}));
for(const fault of ['issuer-freeze','issuer-ack'])test('owned approve recheck rejects original issuer '+fault,()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-get');const pending=f.post(form);await held(f);
 if(fault==='issuer-freeze')await f.stub.sdkCorrupt(fault);else await f.stub.phaseCorrupt(fault);
 const before=await plain(f.stub.snapshot());await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert.deepEqual(await plain(f.stub.snapshot()),before);assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);assert(!has(await observe(f),'sdk_approve:observed'));
}));
for(const snapshot of ['first','second'])test('owned recheck still requires original CLOSED configuration in '+snapshot+' snapshot',()=>world(async f=>{
 await f.stub.sdkConfigure('hold-put');const pending=f.get();await held(f);
 if(snapshot==='first')f.ownerFault='original-open';else{f.phaseObservation=0;f.phaseDrift='original-open';}
 await f.stub.sdkReleaseHeld();assert.equal(await status(pending),503);assert(!has(await observe(f),'sdk_begin:observed'));
}));
test('absent original issuer schema denies handler before any actual SDK lookup or claim',()=>world(async f=>{
 await f.stub.sdkCorrupt('absent-schema');assert.equal(await status(f.get()),503);const s=await observe(f);assert.equal(s.calls.length,0);assert.equal(s.rows.length,0);
}));
for(const operation of ['open','grant'])test('actual handler original child cannot authorize SQL queued beyond five seconds: '+operation,{timeout:35000},()=>world(async f=>{
 const form=operation==='grant'?await consent(f):null;
 await f.stub.sdkConfigure('queue-'+operation);
 assert.equal(await status(form?f.post(form):f.get()),503);
 let s;for(let n=0;n<100;n++){s=await observe(f);if(s.queue?.returned)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal(s.queue?.entered,true);assert.equal(s.queue?.returned,true);assert.equal(s.queue?.rowAbsent,true,'original SQL clock rejected actual delayed execution');
 assert(!has(s,'sdk_complete:send'));
 if(form){assert.equal(await plain(f.stub.sdkGrant(form.identity.grantId)),null);const rows=await plain(f.stub.snapshot());assert(rows.some(([k])=>k.endsWith(':consume:ack')));assert(!rows.some(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':grant:ack')));}
 else {assert(has(s,'sdk_begin:observed'));assert(!(await plain(f.stub.snapshot())).some(([k])=>k.endsWith(':authorization:ack')));}
 const beforeCalls=s.calls.length;assert.equal(await status(form?f.post(form):f.get()),503);assert.equal((await observe(f)).calls.length,beforeCalls,'incomplete first GET/POST never restarts SDK');
}));


async function fanoutMetrics(f,form,response,{peak}){
 const state=await plain(f.stub.ioObservation()),rows=await plain(f.stub.snapshot());
 const read=suffix=>{const raw=rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(suffix))?.[1];return raw?JSON.parse(raw):null;};
 const send=read(':consume:send'),ack=read(':grant:ack'),child=state.child;
 const full=child?state.rows.slice(child.first,child.last):[];
 const narrow=send&&ack?full.filter(r=>r.startedAt>=send.issuedAt&&r.startedAt<=ack.observedAt):[];
 const counts={};for(const row of full)counts[row.category]=(counts[row.category]??0)+1;
 console.info('fanout actual lifecycle',JSON.stringify({status:response.status,peak:state.peak,active:state.active,child,elapsed:child?child.endMono-child.startMono:null,tail:child&&ack?child.endedAt-ack.observedAt:null,full:full.length,narrow:narrow.length,counts,sql:state.sql,delayMinimum:f.ioWaits?.length?Math.min(...f.ioWaits):0,sendPresent:!!send,ackPresent:!!ack}));
 assert.equal(response.status,302,'genuine original POST must issue code before original child expiry');
 assert(child);assert(child.endMono-child.startMono<5000);assert(child.endedAt<child.deadline);
 assert.equal(full.length,112);assert.equal(narrow.length,84);
 assert.deepEqual(counts,Object.fromEntries(['verify-reader','verify-publisher','qa-deployment','qa-version','m-deployment','m-initial-version','m-current-version'].map(k=>[k,16])));
 assert.deepEqual(state.sql,{factual:80,preflight:16,writes:2});
 assert.equal(state.peak,peak);assert.equal(state.active,0);
 assert(full.every(r=>r.outcome==='fulfilled'&&r.endMono>=r.cancelSettledAt&&r.cancelSettledAt>=r.cancelStartedAt&&r.bytes>0));
 if(f.ioDelay)assert(f.ioWaits.every(ms=>ms>=50));
 await issued(f,form,response);
 assert.equal((await observe(f)).calls.length,0,'I/O-only mode leaves actual SDK KV unwrapped');
 assert.equal((await observe(f)).probes.length,0,'I/O-only mode never probes source');
 return state;
}
test('fanout causal control delay0 preserves complete native child and original reads',{timeout:120000},()=>world(async f=>{
 const form=await consent(f);await f.stub.ioConfigure();
 await fanoutMetrics(f,form,await f.post(form),{peak:1});
},{observed:false,io:true}));
test('fanout 50ms preserves original five second child and actual grant',{timeout:120000},()=>world(async f=>{
 const form=await consent(f);await f.stub.ioConfigure();f.ioDelay=50;
 await fanoutMetrics(f,form,await f.post(form),{peak:2});
},{observed:false,io:true}));
test('fanout fixed two overlaps real request lifecycles',{timeout:120000},()=>world(async f=>{
 const form=await consent(f);await f.stub.ioConfigure();
 await fanoutMetrics(f,form,await f.post(form),{peak:2});
},{observed:false,io:true}));
