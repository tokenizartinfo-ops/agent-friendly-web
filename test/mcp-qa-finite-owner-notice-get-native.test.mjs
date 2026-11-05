import {saveNoticeObservation} from './fixtures/finite-owner-notice-get.mjs';
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
test('inventory own negative key after actual SDK grant closes legacy reader',()=>withIssued(async f=>{
 const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
 await f.stub.noticeCorrupt('own-unknown');
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));

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
test('GET acknowledged original after actual QA code M token MCP and D04 reader',()=>withIssued(async f=>{
 await actualExchangeMcp(f);
 const before=await plain(f.stub.noticeInspect());assert.equal(before.schema.length,7);assert.deepEqual(before.notice,[]);assert.deepEqual(before.tickets,[]);assert.deepEqual(before.events,[]);
 await f.stub.ioConfigure();await f.stub.noticeConfigure();const began=Date.now();
 const response=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers,redirect:'manual'});
 const status=response.status,html=await response.text();
 const after=await plain(f.stub.noticeInspect());
 assert.equal(status,200,'fixed GET missing after actual prerequisites; tickets='+after.tickets.length+' journal='+after.notice.length);
 const state=(await plain(f.stub.noticeStateRead())).state,io=await plain(f.stub.ioObservation());await saveNoticeObservation({elapsed:Date.now()-began,trace:state.trace,sql:state.sql,ops:state.ops,lists:state.lists,io});console.info('NOTICE actual principal costs',JSON.stringify({elapsed:Date.now()-began,trace:state.trace,sessions:state.sql.length,first:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='first').length,all:state.sql.flatMap(s=>s.queries).filter(q=>q.method==='all').length,queries:[...new Set(state.sql.flatMap(s=>s.queries).map(q=>q.sql))],ops:state.ops,noticeLists:state.lists.filter(v=>v.prefix.startsWith('afw.finite-preparation-notice')).map(v=>v.limit),http:{snapshots:io.snapshots,rows:io.rows.length,peak:io.peak,active:io.active,bodyCancels:io.rows.filter(v=>v.cancelSettledAt>=v.cancelStartedAt).length}}));
 assert(Date.now()-began<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
 assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 8'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1&&s.queries[0].method==='all'));assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 2')||q.sql.endsWith('LIMIT 3'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1));
 assert.equal(after.tickets.length,1);assert.equal(after.notice.length,3);assert.deepEqual(after.events,[]);
 const records=Object.fromEntries(after.notice.map(([key,value])=>[key.split(':').slice(-2).join(':'),JSON.parse(value)])),ticket=after.tickets[0],handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
 assert.equal(createHash('sha256').update(handle).digest('hex'),ticket.handle_hash);assert.equal(Object.keys(ticket).length,14);assert.equal(ticket.grant_id,f.identity.grantId);assert.equal(ticket.user_id,f.identity.subject);assert.equal(ticket.expected_sequence,0);assert.equal(ticket.action,'grant');assert.equal(ticket.purpose,'afw.dossier-monitoring-owner.v1');
 assert.equal(records['ticket:ack'].outcome,'applied');assert.equal(records['ticket:ack'].sequence,null);assert(records['ticket:ack'].observedAt<records['ticket:send'].window.deadline);assert(state.trace.find(v=>v.position==='complete').at<records['ticket:send'].window.deadline);assert(records['ticket:send'].window.deadline-records['ticket:send'].window.startedAt<=5000);
 assert.match(html,/<button type="button" disabled>/);assert.doesNotMatch(html,/<script|<form[^>]+action=/);assert.match(html,/Todavía no diste permiso para avisos/);
 assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
 const repeat=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers});assert.equal(repeat.status,503);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
}));

async function notice(f,headers=f.headers,options={}){
 return f.mf.dispatchFetch(f.source.origin+'/monitoring',{redirect:'manual',headers,...options});
}
async function deny(response){assert.notEqual(response.status,200);assert.doesNotMatch(await response.text(),/<form|name="handle"/);assert.equal(response.headers.get('Set-Cookie'),null);}
async function ownRows(f){return (await plain(f.stub.snapshot())).filter(([k])=>k.startsWith('afw.finite-preparation-notice.v1:'+f.identity.preconnectionId+':'));}
async function gate(f,name){
 for(let n=0;n<150;n++){const state=await plain(f.stub.noticeStateRead());if(state.held===name)return state;await new Promise(r=>setTimeout(r,10));}
 assert.fail('SYN actual native gate not reached: '+name);
}
test('fixed grammar and Access negatives never write notice or SQL',()=>withIssued(async f=>{
 const before=await plain(f.stub.noticeInspect());
 for(const path of ['/monitoring','/monitoring/grant','/monitoring/revoke']){
  await deny(await f.mf.dispatchFetch(f.source.origin+path,{method:'POST',headers:f.headers,body:'grant=true'}));
  assert.deepEqual(await plain(f.stub.noticeInspect()),before);
 }
 for(const path of ['/monitoring?grant=caller','/monitoring#caller','/monitoring/grant']){
  // Hashes never travel over HTTP; the pure wire test covers the original URL.
  if(path.includes('#'))continue;
  await deny(await f.mf.dispatchFetch(f.source.origin+path,{headers:f.headers}));
 }
 const signature=f.token.split('.');signature[2]=(signature[2][0]==='a'?'b':'a')+signature[2].slice(1);
 const negatives=[
  {...f.headers,Origin:'https://foreign.invalid'},
  {...f.headers,Cookie:PREP+'; '+PREP},
  {...f.headers,Cookie:''},
  {...f.headers,Cookie:PREP+'; __Host-afw-monitoring-owner=previous'},
  {...f.headers,'Cf-Access-Jwt-Assertion':signature.join('.')},
  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({subject:'SYN-other'})},
  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({audience:'SYN-other'})},
  {...f.headers,'Cf-Access-Jwt-Assertion':await f.noticeToken({issuer:'https://wrong.invalid'})}
 ];
 for(const headers of negatives){await deny(await notice(f,headers));assert.deepEqual(await plain(f.stub.noticeInspect()),before);}
 assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
test('pure fixed GET wire rejects caller authority and noncanonical metadata',async()=>{
 const {qualifyFiniteOwnerNoticeGetRequest:q,readFiniteOwnerNoticeGetMetadata:metadata}=await import('../lib/mcp-qa-finite-owner-notice-get-wire.mjs');
 const origin='https://delegated-canary.agentfriendlyweb.dev',empty=new Uint8Array();
 assert.deepEqual(q(new Request(origin+'/monitoring'),empty),{method:'GET',url:origin+'/monitoring'});
 for(const url of [origin+'/monitoring?grant=x',origin+'/monitoring#x','https://foreign.invalid/monitoring','https://u:p@delegated-canary.agentfriendlyweb.dev/monitoring'])assert.throws(()=>q(new Request(url),empty));
 assert.throws(()=>q(new Request(origin+'/monitoring',{method:'POST'}),empty));assert.throws(()=>q(new Request(origin+'/monitoring'),new Uint8Array([1])));
 for(const cookie of ['a=1; a=2','malformed','a=has space'])assert.throws(()=>q(new Request(origin+'/monitoring',{headers:{Cookie:cookie}}),empty));
 const h=new Headers({'x-afw-finite-boundary':'{"startedAt":1,"deadline":30001,"remainingMs":30000}','x-afw-finite-original-method':'GET','x-afw-finite-original-url':origin+'/monitoring','x-afw-finite-version':'77777777-7777-4777-8777-777777777777','x-afw-finite-request-id':'77777777-7777-4777-8777-777777777777'});
 assert.equal(metadata(h).method,'GET');h.set('x-afw-finite-allowPending','true');assert.throws(()=>metadata(h));
});
test('full empty and totally absent schema preserve reader; GET partial schema fails before journal',()=>withIssued(async f=>{
 const before=await plain(f.stub.sdkReadCurrent());assert.equal(Object.keys(before).length,3);
 await f.db.prepare('DROP TABLE dossier_monitoring_owner_tickets').run();await f.db.prepare('DROP TABLE dossier_monitoring_consent_events').run();
 assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
 for(const sql of SCHEMA)await f.db.prepare(sql).run();
 assert.deepEqual(await plain(f.stub.sdkReadCurrent()),before);
 for(const fault of ['index','trigger','extra','sql']){
  if(fault==='index'||fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
  if(fault==='trigger')await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_delete').run();
  if(fault==='extra')await f.db.prepare('CREATE INDEX SYN_negative_extra_index ON dossier_monitoring_owner_tickets(grant_id)').run();
  if(fault==='sql')await f.db.prepare('CREATE INDEX dossier_monitoring_consent_grant_sequence ON dossier_monitoring_consent_events(sequence,grant_id)').run();
  assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
  if(fault==='extra')await f.db.prepare('DROP INDEX SYN_negative_extra_index').run();
  if(fault==='sql')await f.db.prepare('DROP INDEX dossier_monitoring_consent_grant_sequence').run();
  for(const sql of SCHEMA)await f.db.prepare(sql).run();
 }
 await f.stub.noticeConfigure('failed-schema-metadata');await deny(await notice(f));assert.deepEqual(await ownRows(f),[]);
}));
test('foreign preconnection and UUID history is neither enumerated nor changed',()=>withIssued(async f=>{
 await f.stub.noticeCorrupt('foreign-unknown');
 const at=Date.now(),foreign='ffffffff-ffff-4fff-8fff-ffffffffffff';
 await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('f'.repeat(64),foreign,'SYN-other',foreign,'SYN-other','SYN-other','https://foreign.invalid/mcp','afw.dossier-monitoring-owner.v1','grant',1,0,at,at+60000,at+60000).run();
 const history=await plain(f.stub.snapshot()),foreignRow=await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first();
 assert.equal((await plain(f.stub.sdkReadCurrent())).source.phase,'read_consent');
 const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
 assert.deepEqual(await f.db.prepare('SELECT * FROM dossier_monitoring_owner_tickets WHERE grant_id=?').bind(foreign).first(),foreignRow);
 const after=await plain(f.stub.snapshot());for(const row of history)assert.deepEqual(after.find(([key])=>key===row[0]),row);
}));
for(const fault of ['overflow','ack-without-send','foreign-send'])test('SYN negative journal '+fault+' fails closed',()=>withIssued(async f=>{
 await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.equal((await plain(f.stub.noticeInspect())).tickets.length,0);
}));
for(const fault of ['identity','grant-link','connection','row-hash'])test('SYN negative settled notice '+fault+' fails closed',()=>withIssued(async f=>{
 const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();
 const before=await plain(f.stub.noticeInspect());await f.stub.noticeCorrupt(fault);await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual((await plain(f.stub.noticeInspect())).tickets,before.tickets);
}));
for(const mode of ['hold-before','hold-after'])test('owned native '+mode+' denies bearer continuation and only own stack ACKs',()=>withIssued(async f=>{
 await f.stub.noticeConfigure(mode);const pending=notice(f);const seen=await gate(f,mode==='hold-before'?'before-sql':'after-sql');assert.equal(seen.state.resolution?.row??false,mode==='hold-after');
 const before=await plain(f.stub.noticeInspect());assert.equal(before.notice.length,2);assert.equal(before.tickets.length,mode==='hold-after'?1:0);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');await deny(await notice(f));await f.stub.noticeReleaseHeld();
 const result=await pending;assert.equal(result.status,200);await result.body?.cancel();
 const after=await plain(f.stub.noticeInspect());assert.equal(after.notice.length,3);assert.equal(after.tickets.length,1);
}));
for(const mode of ['lost-reservation','lost-send','lost-sql'])test('unknown acknowledgement '+mode+' retains facts and never retries',()=>withIssued(async f=>{
 await f.stub.noticeConfigure(mode);await deny(await notice(f));const before=await plain(f.stub.noticeInspect());
 assert.equal(before.notice.length,mode==='lost-reservation'?1:2);assert.equal(before.tickets.length,mode==='lost-sql'?1:0);
 assert.equal(before.notice.some(([key])=>key.endsWith('ticket:ack')),false);await deny(await notice(f));assert.deepEqual(await plain(f.stub.noticeInspect()),before);
}));
test('freeze after actual SQL commit blocks own ACK without deleting ticket',()=>withIssued(async f=>{
 await f.stub.noticeConfigure('hold-after');const pending=notice(f);await gate(f,'after-sql');await f.stub.noticeCorrupt('freeze');await f.stub.noticeReleaseHeld();await deny(await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
test('queue past original five-second SQL window cannot mutate or ACK',()=>withIssued(async f=>{
 await f.stub.noticeConfigure('queue');const pending=notice(f),seen=await gate(f,'before-sql');assert(seen.state.sqlEnteredAt);
 await new Promise(resolve=>setTimeout(resolve,5100));await deny(await pending);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false},'actual queued SQL retains scope after child abort');await f.stub.noticeReleaseHeld();
 const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
}));
test('original CLOSE wins queued INSERT without deleting history or revoking grant',()=>withIssued(async f=>{
 await f.stub.noticeConfigure('hold-before');const pending=notice(f);await gate(f,'before-sql');assert.equal((await plain(f.stub.noticeFence())).status,'fenced');await f.stub.noticeReleaseHeld();await deny(await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,0);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
test('ticket wins before original CLOSE; retained ticket and grant survive',()=>withIssued(async f=>{
 const response=await notice(f);assert.equal(response.status,200);await response.body?.cancel();const before=await plain(f.stub.noticeInspect());assert.equal((await plain(f.stub.noticeFence())).status,'fenced');
 assert.deepEqual(await plain(f.stub.noticeInspect()),before);assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
}));
test('actual Access expires inside GET before any reservation',()=>withIssued(async f=>{
 const expires=Math.floor(Date.now()/1000)+4,token=await f.noticeToken({expiresAt:expires});await f.stub.noticeConfigure('expire-access');
 const pending=notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});await gate(f,'access');await new Promise(resolve=>setTimeout(resolve,Math.max(1,expires*1000-Date.now()+20)));await f.stub.noticeReleaseHeld();await deny(await pending);assert.deepEqual(await ownRows(f),[]);
}));
test('shorter signed current Access clamps ticket to original minimum',()=>withIssued(async f=>{
 const expires=Math.floor(Date.now()/1000)+60,token=await f.noticeToken({expiresAt:expires});const response=await notice(f,{...f.headers,'Cf-Access-Jwt-Assertion':token});assert.equal(response.status,200);await response.body?.cancel();
 const after=await plain(f.stub.noticeInspect()),ticket=after.tickets[0];assert.equal(ticket.expires_at,Math.min(expires*1000,Date.parse(f.grant.expires_at)));assert(ticket.expires_at-ticket.issued_at>5000);
}));

test('SYN negative original UUID ticket without journal and consent history fail closed',()=>withIssued(async f=>{
 const at=Date.now(),request='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';
 await f.db.prepare('INSERT INTO dossier_monitoring_owner_tickets VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind('e'.repeat(64),request,f.identity.subject,f.identity.grantId,f.identity.projectId,f.identity.clientId,f.identity.resource,'afw.dossier-monitoring-owner.v1','grant',f.identity.projectRevision,0,at,at+60000,at+60000).run();
 await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await ownRows(f),[]);
}));
test('SYN negative consent event without journal never authorizes GET',()=>withIssued(async f=>{
 const at=Date.now();await f.db.prepare('INSERT INTO dossier_monitoring_consent_events (grant_id,project_id,user_id,client_id,resource,revision,action,purpose,request_id,issued_at,expires_at) VALUES (?,?,?,?,?,?,?,?,?,?,?)').bind(f.identity.grantId,f.identity.projectId,f.identity.subject,f.identity.clientId,f.identity.resource,f.identity.projectRevision,'grant','afw.dossier-monitoring.v1','eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',at,at+60000).run();
 await deny(await notice(f));assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await ownRows(f),[]);
}));
for(const drift of ['owner','revision','pointer','exchange','journal','ticket'])test('two complete snapshots reject SYN own-state drift '+drift,()=>withIssued(async f=>{
 await f.stub.noticeConfigure('drift');const pending=notice(f);await gate(f,'between-own');
 if(drift==='owner')await f.db.prepare("UPDATE site_projects SET user_id='SYN NEGATIVE drift' WHERE id=?").bind(f.identity.projectId).run();
 if(drift==='revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(f.identity.projectId).run();
 if(drift==='pointer')f.phaseCurrent.receipt.deploymentId='99999999-9999-4999-8999-999999999999';
 if(drift==='exchange'){
  const created=Date.parse(f.grant.created_at),value=new Date(Math.max(created,Date.now()-1)).toISOString();
  assert.notEqual(value,f.grant.exchanged_at);await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,f.identity.grantId).run();
 }
 if(drift==='journal')await f.stub.noticeCorrupt('connection');
 if(drift==='ticket'){
  // Explicit destructive SYN corruption, after first snapshot; not a legitimate transition.
  await f.db.prepare('DROP TRIGGER dossier_monitoring_tickets_no_update').run();
  await f.db.prepare('UPDATE dossier_monitoring_owner_tickets SET request_id=? WHERE grant_id=?').bind('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',f.identity.grantId).run();
  await f.db.prepare(SCHEMA.find(sql=>sql.includes('dossier_monitoring_tickets_no_update'))).run();
 }
 await f.stub.noticeReleaseHeld();await deny(await pending);
 const after=await plain(f.stub.noticeInspect());assert.equal(after.tickets.length,1);assert.equal(after.notice.some(([key])=>key.endsWith('ticket:ack')),false);
}));

async function ioGate(f,phase){
 for(let n=0;n<200;n++){const state=await plain(f.stub.ioObservation());if(state.held?.phase===phase)return state;await new Promise(r=>setTimeout(r,10));}
 assert.fail('actual provider body/cancel gate not reached: '+phase);
}
test('GET child expiry retains actual HTTP body and cancel until physical settlement',()=>withIssued(async f=>{
 await f.stub.ioConfigure({hold:'qa-version'});const began=Date.now(),pending=notice(f);await ioGate(f,'body');
 await deny(await pending);assert(Date.now()-began>=4900);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
 assert.deepEqual(await ownRows(f),[]);await f.stub.ioRelease('body');const cancelling=await ioGate(f,'cancel');assert.equal(cancelling.active,1);assert.deepEqual(await plain(f.stub.noticeProbe()),{allowed:false});
 await f.stub.ioRelease('cancel');
 for(let n=0;n<100;n++){const state=await plain(f.stub.ioObservation());if(state.active===0&&(await plain(f.stub.noticeProbe())).allowed)return;await new Promise(r=>setTimeout(r,10));}
 assert.fail('actual HTTP body/cancel did not settle in original parent window');
}));
