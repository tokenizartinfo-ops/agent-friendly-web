import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
import {qualifyFiniteOwnerNoticeConsentRequest,qualifyFiniteOwnerNoticeGetRequest,finiteOwnerNoticeConsentTarget,readFiniteOwnerNoticeConsentMetadata} from '../lib/mcp-qa-finite-owner-notice-get-wire.mjs';
import {FINITE_PREPARATION_MONITORING_SCHEMA as SCHEMA} from '../lib/mcp-qa-finite-preparation-issuer-store.mjs';
import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient} from './fixtures/finite-owner-qa-sdk.mjs';
const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
async function plain(p){const r=await p;try{return JSON.parse(JSON.stringify(r));}finally{r?.[Symbol.dispose]?.();}}
async function withIssued(fn){
 const f=await initialEntryHarness('phase-context-sdk-token-notice-get');
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
  const before=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(before).sort(),['capsuleHash','preconnectionId','source']);assert.equal(before.source.phase,'read_consent');
  f.source=before.source;f.token=await f.enrollmentToken(f.source);f.headers={'Cf-Access-Jwt-Assertion':f.token,Cookie:PREP};
  await seedFiniteOwnerSdkClient(f.mf,f.source);
  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'});
  const get=await f.mf.dispatchFetch(f.source.origin+'/authorize?'+query,{redirect:'manual',headers:f.headers});assert.equal(get.status,200);
  const html=await get.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
  const cookie=get.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
  const post=await f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',...f.headers,Cookie:PREP+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
  assert.equal(post.status,302);f.code=new URL(post.headers.get('Location')).searchParams.get('code');assert(f.code);await post.body?.cancel();
  const rows=await plain(f.stub.snapshot()),r=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]);f.identity=r.identity;
  f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.equal(f.grant.revoked_at,'');assert.equal(f.grant.exchanged_at,'');
  assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
  await fn(f);
 }finally{await f.stub.noticeReleaseHeld().catch(()=>{});await f.stub.ioRelease('all').catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
async function actualExchangeMcp(f){
 const config=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(config.status,204);
 const exchange=await f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:f.code,code_verifier:f.verifier})});assert.equal(exchange.status,200);
 const payload=await exchange.json();assert.equal(typeof payload.access_token,'string');
 const client=new Client({name:'SYN-notice-native',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{
  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+payload.access_token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
  const summary=await client.callTool({name:'read_project_summary',arguments:{}});assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,f.identity.projectId);
 }finally{await client.close();}
 f.grant=await plain(f.stub.sdkGrant(f.identity.grantId));assert.notEqual(f.grant.exchanged_at,'');
 const context=await plain(f.stub.sdkReadCurrent());assert.deepEqual(Object.keys(context).sort(),['capsuleHash','preconnectionId','source']);assert.equal(context.source.phase,'read_consent');
}

async function ticket(f,extra=''){
 const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:{...f.headers,Cookie:PREP+extra},redirect:'manual'});
 const html=await response.text();assert.equal(response.status,200);const handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
 const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(cookie);
 f.notice={handle,headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+cookie+extra}};
 return plain(f.stub.noticeInspect());
}
const consent=(f,options={})=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{method:'POST',redirect:'manual',headers:f.notice.headers,body:new URLSearchParams({handle:f.notice.handle}),...options});
test('native consent POST records original decision after actual ticket GET',()=>withIssued(async f=>{
 await actualExchangeMcp(f);const before=await ticket(f,'; unrelated="valid=="');assert.equal(before.events.length,0);
 const original=await plain(f.stub.snapshot()),history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
 await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now(),response=await consent(f),html=await response.text();
 const observation=await plain(f.stub.noticeStateRead()),io=await plain(f.stub.ioObservation()),elapsed=Date.now()-began,after=await plain(f.stub.noticeInspect());
 await saveNoticeObservation({unit:'consent',elapsed,...observation.state,io});
 console.info('CONSENT native principal costs',JSON.stringify({elapsed,trace:observation.state.trace,sqlSessions:observation.state.sql.length,first:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:observation.state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,ops:observation.state.ops,noticeListLimits:observation.state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).map(v=>v.limit),http:{snapshots:io.snapshots,requests:io.rows.length,peak:io.peak,active:io.active}}));
 assert(elapsed<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
 assert.equal(observation.state.trace.filter(v=>v.stage==='after').length,5);
 const rowsAfter=await plain(f.stub.snapshot());for(const row of original)assert.deepEqual(rowsAfter.find(([k])=>k===row[0]),row);
 const historyAfter=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;
 for(const row of history)assert.deepEqual(historyAfter.find(v=>v.sequence===row.sequence),row);

 assert.equal(response.status,200,'fixed POST reached after native ticket; events='+after.events.length);
 assert.equal(after.events.length,1);assert.equal(after.notice.length,5);assert.match(html,/Registré tu decisión temporal/);
 assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
 const record=suffix=>JSON.parse(after.notice.find(([k])=>k.endsWith(suffix))[1]),r=record(':reservation'),send=record('consent:send'),ack=record('consent:ack'),row=after.events[0],i=f.identity;
 assert.deepEqual(row,{sequence:row.sequence,grant_id:i.grantId,project_id:i.projectId,user_id:i.subject,client_id:i.clientId,resource:i.resource,revision:i.projectRevision,action:'grant',purpose:'afw.dossier-monitoring.v1',request_id:r.ticket.requestId,issued_at:row.issued_at,expires_at:r.ticket.permissionExpiresAt});
 assert(Number.isSafeInteger(row.sequence)&&row.sequence>0);assert(row.issued_at>=send.issuedAt);assert(row.issued_at<send.window.deadline);assert.equal(ack.sequence,row.sequence);assert.equal(ack.rowHash,initialHash('afw.finite-preparation-notice-row.v1',row));assert.equal(ack.sendHash,send.recordHash);
 assert(send.window.deadline-send.window.startedAt<=5000);assert(observation.state.trace.find(v=>v.position==='complete').at<send.window.deadline);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 for(const path of ['/monitoring','/authorize']){
  const response=await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers});assert.notEqual(response.status,200);await response.body?.cancel();
 }
 assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);
 assert.doesNotMatch(html,/<form|<script|retirar|revisar/i);assert.match(html,new RegExp(new Date(r.ticket.permissionExpiresAt).toISOString().replaceAll('.','\\.')));
 const repeat=await consent(f);assert.notEqual(repeat.status,200);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
}));
test('native consent malformed unrelated cookie denies before SEND',()=>withIssued(async f=>{
 const before=await ticket(f);
 for(const suffix of ['; bad:name=x','; ; extra=x']){
  const response=await consent(f,{headers:{...f.notice.headers,Cookie:f.notice.headers.Cookie+suffix}});await response.body?.cancel();
  assert.notEqual(response.status,200);assert.deepEqual(await plain(f.stub.noticeInspect()),before);
 }
}));

async function denied(f,response,before){
 assert.notEqual(response.status,200);const text=await response.text();assert.doesNotMatch(text,/Registré tu decisión|<form/);assert.equal(response.headers.get('Set-Cookie'),null);
 if(before)assert.deepEqual(await plain(f.stub.noticeInspect()),before);
}
async function gate(f,name){
 for(let n=0;n<500;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
 assert.fail('SYN actual consent gate not reached: '+name);
}
test('native consent preserves global sequence across another grant history',()=>withIssued(async f=>{
 const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
 await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(foreign,'SYN-other','SYN-other','SYN-other','https://foreign.invalid/mcp',1,'grant','afw.dossier-monitoring.v1',foreign,at,at+60000).run();
 const history=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results,before=await ticket(f);
 const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
 const after=await plain(f.stub.noticeInspect());assert(after.events[0].sequence>1);assert.equal(before.tickets[0].expected_sequence,0);
 const now=(await f.db.prepare('SELECT * FROM dossier_monitoring_consent_events ORDER BY sequence').all()).results;for(const row of history)assert.deepEqual(now.find(v=>v.sequence===row.sequence),row);
}));
test('native consent grammar denies untrusted request corpus',()=>withIssued(async f=>{
 const before=await ticket(f),h=f.notice.headers,value='handle='+f.notice.handle;
 const cases=[
 ['method GET',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant',{headers:h})],
 ['path revoke',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/revoke',{method:'POST',headers:h,body:value})],
 ['query',()=>f.mf.dispatchFetch(f.source.origin+'/monitoring/grant?x=1',{method:'POST',headers:h,body:value})],
 ['wrong Origin',()=>consent(f,{headers:{...h,Origin:'https://wrong.invalid'}})],
 ['missing Origin',()=>{const headers={...h};delete headers.Origin;return consent(f,{headers});}],
 ['extra handle',()=>consent(f,{body:value+'&action=grant'})],
 ['duplicate handle',()=>consent(f,{body:value+'&'+value})],
 ['malformed percent',()=>consent(f,{body:'handle=%QZ'})],
 ['malformed UTF8',()=>consent(f,{body:new Uint8Array([0xff])})],
 ['MIME parameter',()=>consent(f,{headers:{...h,'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'}})],
 ['1025 bytes',()=>consent(f,{body:'a'.repeat(1025)})],
 ['duplicate cookie',()=>consent(f,{headers:{...h,Cookie:h.Cookie+'; '+h.Cookie.split('; ')[1]}})],
 ['bad cookie hash',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner='+'b'.repeat(43)}})],
 ['missing prepare',()=>consent(f,{headers:{...h,Cookie:h.Cookie.split('; ')[1]}})],
 ['prepare mismatch',()=>consent(f,{headers:{...h,Cookie:h.Cookie.replace('a'.repeat(64),'b'.repeat(64))}})],
 ['quoted own cookie',()=>consent(f,{headers:{...h,Cookie:PREP+'; __Host-afw-monitoring-owner="'+f.notice.handle+'"'}})]
 ];
 for(const [kind,call]of cases){await denied(f,await call(),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
}));
test('native consent verified identity denies current signed identity corpus',()=>withIssued(async f=>{
 const before=await ticket(f),h=f.notice.headers,parts=f.token.split('.');parts[2]=(parts[2][0]==='a'?'b':'a')+parts[2].slice(1);
 const tokens=[
 ['invalid signature',parts.join('.')],
 ['wrong realm',await f.noticeToken({issuer:'https://wrong.invalid'})],
 ['wrong audience',await f.noticeToken({audience:'SYN-other'})],
 ['other subject',await f.noticeToken({subject:'SYN-other'})],
 ['expired Access',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)-1})],
 ['AccessPOST shorter than original ticket',await f.noticeToken({expiresAt:Math.floor(Date.now()/1000)+30})]
 ];
 for(const [kind,token]of tokens){await denied(f,await consent(f,{headers:{...h,'Cf-Access-Jwt-Assertion':token}}),before);assert.equal((await plain(f.stub.noticeInspect())).events.length,0,kind);}
}));
test('native consent own SQL continuation alone accepts pending SEND',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
 const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,4);assert.equal(before.events.length,0);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await denied(f,await consent(f),before);
 await f.stub.noticeReleaseHeld();const response=await pending;assert.equal(response.status,200);await response.body?.cancel();
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,5);
}));
test('native consent lost native result never reconstructs ACK',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
 const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
 await f.stub.noticeConfigure();await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
}));
for(const mode of ['lost-send','lost-ack'])test('native consent journal uncertainty never authorizes next effect '+mode,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(mode);await denied(f,await consent(f));
 const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,mode==='lost-send'?0:1);assert.equal(before.notice.length,mode==='lost-send'?4:5);
 await f.stub.noticeConfigure();await denied(f,await consent(f),before);
}));
test('native consent original window fences queued SQL',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('queue');const pending=consent(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
 await new Promise(resolve=>setTimeout(resolve,5100));await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false,'actual operation remains retained');
 await f.stub.noticeReleaseHeld();const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
}));
for(const [mode,drift]of [['before-send','revision'],['before-send','owner'],['before-send','pointer'],['before-insert','revision'],['before-insert','holder']])test('native consent source current drift denies '+mode+' '+drift,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure(mode);const pending=consent(f);await gate(f,mode==='before-send'?'before-send':'before-insert');
 if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
 if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
 if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
 if(drift==='holder')await f.stub.sdkReplaceHolder();
 await f.stub.noticeReleaseHeld();await denied(f,await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,mode==='before-send'?3:4);
}));
for(const drift of ['exchange','event'])test('native consent second snapshot drift denies '+drift,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('consent-drift');const pending=consent(f);await gate(f,'between-own');
 if(drift==='exchange'){const value=new Date(Math.max(Date.parse(f.grant.created_at),Date.now()-1)).toISOString();await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();}
 else{
  // SYN destructive immutable row corruption, never a legitimate transition.
  await f.db.prepare('DROP TRIGGER dossier_monitoring_no_update').run();
  await f.db.prepare("UPDATE dossier_monitoring_consent_events SET request_id='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee' WHERE grant_id=?").bind(f.identity.grantId).run();
  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_no_update'))).run();
 }
 await f.stub.noticeReleaseHeld();await denied(f,await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
}));
for(const fault of ['own-unknown','overflow','freeze','row-hash'])test('native consent history closes replay '+fault,()=>withIssued(async f=>{
 const before=await ticket(f);await f.stub.noticeCorrupt(fault);await denied(f,await consent(f));
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.deepEqual(after.tickets,before.tickets);assert(!after.notice.some(([k])=>k.endsWith('consent:send')));
}));
test('native consent withdrawal preserves history CLOSE before native SQL',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
 assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await denied(f,await pending);
 assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);assert.equal((await plain(f.stub.noticeInspect())).events.length,0);
}));
test('native consent withdrawal preserves history real revokeGrant',()=>withIssued(async f=>{
 await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());
 const reduction=await plain(f.stub.sdkReduceOriginal());assert.equal(reduction.reduction,'revoked');assert.notEqual((await plain(f.stub.sdkGrant(f.identity.grantId))).revoked_at,'');
 await denied(f,await consent(f),before);assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
}));
test('native consent captured failure cannot resume commit',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');await f.stub.sdkReplaceHolder();
 await f.stub.noticeReleaseHeld();await denied(f,await pending);const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);
}));
test('notice cookie-list accepts token names and legitimate values POST',()=>{
 const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
 assert.equal(finiteOwnerNoticeConsentTarget,'https://afw-private.invalid/_finite-owner/monitoring/grant');
 for(const cookie of ["!#$%&'*+-.^_\x60|~=x",'a=','a=base64===','a="quoted=="','a=""; b=x']){
  const request=new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}});
  assert.equal(qualifyFiniteOwnerNoticeConsentRequest(request,bytes).handle,'a'.repeat(43));
 }
});
test('notice cookie-list rejects malformed list POST',()=>{
 const origin='https://delegated-canary.agentfriendlyweb.dev',bytes=new TextEncoder().encode('handle='+'a'.repeat(43));
 for(const cookie of ['', '   ','; a=x','a=x;','a=x; ; b=y','bad:name=x','bad/name=x','bad@name=x','bad(name)=x','bad[name]=x','bad,name=x','bad name=x','námé=x','a=x; a=y','a=x,y','a=x\\y','a=has space','a=é','a="x"y','a="x','a=x"','a=x;b=y','a=x;  b=y','a=x ; b=y','a='+'x'.repeat(8191)]){
  const request=new Request(origin+'/monitoring/grant',{method:'POST',headers:{Origin:origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:cookie}});
  assert.throws(()=>qualifyFiniteOwnerNoticeConsentRequest(request,bytes),JSON.stringify(cookie));
 }
});

for(const kind of ['source-revision','issuer-reservation','original-grant-ack','grant-link','connection','ticket-request','event-sequence'])test('native consent correlated DATA denies '+kind,()=>withIssued(async f=>{
 const before=await ticket(f);if(kind==='event-sequence'){const r=await consent(f);assert.equal(r.status,200);await r.body?.cancel();}
 const original=await plain(f.stub.snapshot()),sqlBefore=await plain(f.stub.noticeInspect());await f.stub.noticeConfigure();
 assert.deepEqual(await plain(f.stub.noticeCorrelated(kind)),{codecRoundtrip:true,journalValid:true});
 await denied(f,await consent(f));
 const after=await plain(f.stub.noticeInspect());assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.events,sqlBefore.events);
 const expected=kind==='ticket-request'?'noticePrimary301':kind==='event-sequence'?'noticeConsentEventAck':'noticePrimary296',state=(await plain(f.stub.noticeStateRead())).state;
 const correlators=state.trace.filter(v=>v.correlator);assert(correlators.some(v=>v.correlator===expected&&v.phase==='enter'),JSON.stringify(correlators));assert(!correlators.some(v=>v.correlator===expected&&v.phase==='exit'),JSON.stringify(correlators));
 for(const earlier of expected==='noticePrimary301'?['noticePrimary296']:expected==='noticeConsentEventAck'?['noticePrimary296','noticePrimary301']:[])assert(correlators.some(v=>v.correlator===earlier&&v.phase==='exit'));
 assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
 const finalRows=await plain(f.stub.snapshot());for(const row of original.filter(([k])=>!k.startsWith('afw.finite-preparation-notice.v1:')))assert.deepEqual(finalRows.find(([k])=>k===row[0]),row);
}));
for(const where of ['M','QA'])test('native consent failed body retains actual cancellation '+where,()=>withIssued(async f=>{
 const before=await ticket(f);let state;
 if(where==='QA')state=await plain(f.stub.noticeBodyStart(f.notice.headers));
 else{const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-start',{method:'POST',headers:f.notice.headers});state=await r.json();}
 assert.notEqual(state.response,200);assert.equal(state.cancelEntered,true);assert.equal(state.cancelSettled,false);
 assert.deepEqual(await plain(f.stub.noticeInspect()),before);
 const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
 assert.equal((await probe()).allowed,false,'new live root denied by actual pending cancellation');
 if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
 for(let n=0;n<100;n++){if((await probe()).allowed)return;await new Promise(r=>setTimeout(r,10));}const finalState=where==='QA'?await plain(f.stub.noticeBodyRead()):await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();assert.fail('actual body cancellation not settled '+JSON.stringify({probe:await probe(),state:finalState}));
}));
test('native consent abort retains SQL and forbids late ACK',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('hold-after');const pending=consent(f);await gate(f,'after-sql');
 const abort=await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort');assert.equal(abort.status,204);await abort.body?.cancel();
 await denied(f,await pending);assert.equal((await plain(f.stub.noticeProbe())).allowed,false);await f.stub.noticeReleaseHeld();
 for(let n=0;n<100;n++){if((await plain(f.stub.noticeProbe())).allowed)break;await new Promise(r=>setTimeout(r,10));}
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,1);assert.equal(after.notice.length,4);assert(!after.notice.some(([k])=>k.endsWith('consent:ack')));
}));
test('pure fixed POST metadata and original grammar remain exact',()=>{
 const origin='https://delegated-canary.agentfriendlyweb.dev';
 assert.equal(qualifyFiniteOwnerNoticeGetRequest(new Request(origin+'/monitoring'),new Uint8Array()).method,'GET');
 const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'POST','x-afw-finite-original-url':origin+'/monitoring/grant','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
 assert.equal(readFiniteOwnerNoticeConsentMetadata(h).method,'POST');h.set('x-afw-finite-original-method','GET');assert.throws(()=>readFiniteOwnerNoticeConsentMetadata(h));
});

for(const kind of ['absent','partial','failed-schema-metadata','malformed-schema-results'])test('native consent history closes replay schema '+kind,()=>withIssued(async f=>{
 const before=await ticket(f);await f.stub.noticeConfigure(kind);
 if(kind==='absent'){await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();}
 if(kind==='partial')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
 await denied(f,await consent(f));
 const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
 const rows=(await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'));assert.deepEqual(rows,before.notice);
}));
test('native consent history closes replay event without SEND',()=>withIssued(async f=>{
 const before=await ticket(f),i=f.identity,at=Date.now(),r=JSON.parse(before.notice.find(([k])=>k.endsWith(':reservation'))[1]);
 await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(i.grantId,i.projectId,i.subject,i.clientId,i.resource,i.projectRevision,'grant','afw.dossier-monitoring.v1',r.ticket.requestId,at,r.ticket.permissionExpiresAt).run();
 const corrupted=await plain(f.stub.noticeInspect());await denied(f,await consent(f),corrupted);assert.equal(corrupted.notice.length,3);assert.equal(corrupted.events.length,1);
}));
test('native consent withdrawal preserves history ordinary append-only withdrawal',()=>withIssued(async f=>{
 await ticket(f);const response=await consent(f);assert.equal(response.status,200);await response.body?.cancel();
 const before=await plain(f.stub.noticeInspect());assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:true});const withdrawn=await plain(f.stub.noticeOrdinaryWithdraw());assert.equal(withdrawn.status,200);assert.equal(withdrawn.action,'revoke');
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,2);assert.deepEqual(after.events[0],before.events[0]);assert.deepEqual(after.tickets,before.tickets);assert.deepEqual(after.notice,before.notice);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{enabled:false});
 await denied(f,await consent(f),after);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
test('native consent withdrawal preserves history revokeGrant before queued SQL',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('hold-before');const pending=consent(f);await gate(f,'before-sql');
 const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.reduction,'revoked');await f.stub.noticeReleaseHeld();await denied(f,await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);assert.deepEqual(await plain(f.stub.noticeOrdinaryRead()),{unavailable:true,message:'Monitoring authorization unavailable'});
}));

for(const where of ['M','QA'])test('native consent failed body retains actual cancellation held read '+where,()=>withIssued(async f=>{
 const before=await ticket(f);
 const read=async()=>where==='QA'?plain(f.stub.noticeBodyRead()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-state')).json();
 const probe=async()=>where==='QA'?plain(f.stub.noticeProbe()):(await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-probe')).json();
 const pending=where==='QA'?plain(f.stub.noticeBodyStart(f.notice.headers,'read')):f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-read-start',{method:'POST',headers:f.notice.headers}).then(r=>r.json());
 const until=async predicate=>{for(let n=0;n<200;n++){const state=await read();if(predicate(state))return state;await new Promise(r=>setTimeout(r,10));}assert.fail('native held body state not reached '+JSON.stringify({state:await read(),probe:await probe()}));};
 await until(s=>s.readEntered);
 if(where==='QA')await f.stub.noticeBodyAbortHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-abort')).body?.cancel();
 const failed=await pending;assert.notEqual(failed.response,200);assert.equal(failed.readSettled,false);assert.equal((await probe()).allowed,false);
 if(where==='QA')await f.stub.noticeBodyReleaseRead();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release-read')).body?.cancel();
 const cancelling=await until(s=>s.cancelEntered);assert.equal(cancelling.readSettled,true);assert.equal(cancelling.cancelSettled,false);assert.equal((await probe()).allowed,false);
 if(where==='QA')await f.stub.noticeBodyReleaseHeld();else await (await f.mf.dispatchFetch(f.source.origin+'/fixture/consent-body-release')).body?.cancel();
 for(let n=0;n<100;n++){if((await probe()).allowed){assert.deepEqual(await plain(f.stub.noticeInspect()),before);return;}await new Promise(r=>setTimeout(r,10));}assert.fail('actual held read/cancel scope not released');
}));
for(const drift of ['owner','revision','pointer'])test('native consent source current drift denies after-SEND before recheck '+drift,()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('after-send');const pending=consent(f);await gate(f,'after-send');
 if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE owner' WHERE id=?").bind(f.identity.projectId).run();
 if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
 if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
 await f.stub.noticeReleaseHeld();await denied(f,await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.events.length,0);assert.equal(after.notice.length,4);
 const state=(await plain(f.stub.noticeStateRead())).state;assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
}));

test('native consent lost native result never reconstructs ACK after actual actor restart',()=>withIssued(async f=>{
 await ticket(f);await f.stub.noticeConfigure('lost-sql');await denied(f,await consent(f));
 const before=await plain(f.stub.noticeInspect());assert.equal(before.events.length,1);assert.equal(before.notice.length,4);
 const originalInstance=await f.stub.noticeInstanceRead();await assert.rejects(async()=>{await f.stub.noticeRestart();});
 const bindings=await f.mf.getBindings('qa-sdk');f.stub=bindings.AFW_INDEPENDENT_CLOSURE.get(bindings.AFW_INDEPENDENT_CLOSURE.idFromName('afw-own-successor-closure-v1'));
 assert.notEqual(await f.stub.noticeInstanceRead(),originalInstance,'actual actor instance changed after native abort');
 assert.deepEqual(await plain(f.stub.noticeInspect()),before);await f.stub.noticeConfigure();
 await denied(f,await consent(f),before);const state=(await plain(f.stub.noticeStateRead())).state;
 assert.equal(state.sql.flatMap(s=>s.queries).filter(q=>q.sql.includes('INSERT INTO dossier_monitoring_consent_events')).length,0);
 assert(!before.notice.some(([k])=>k.endsWith('consent:ack')));
}));
