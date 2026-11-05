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
 }finally{await f.mf.dispose();await f.cleanup();}
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
 const state=(await plain(f.stub.noticeStateRead())).state,io=await plain(f.stub.ioObservation());console.info('NOTICE actual principal costs',JSON.stringify({elapsed:Date.now()-began,trace:state.trace,sql:state.sql,ops:state.ops,lists:state.lists,io}));
 assert(Date.now()-began<30000);assert.equal(io.peak,2);assert.equal(io.active,0);
 assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 8'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1&&s.queries[0].method==='all'));assert(state.sql.filter(s=>s.queries.some(q=>q.sql.endsWith('LIMIT 2')||q.sql.endsWith('LIMIT 3'))).every(s=>s.constraint==='first-primary'&&s.queries.length===1));
 assert.equal(after.tickets.length,1);assert.equal(after.notice.length,3);assert.deepEqual(after.events,[]);
 const records=Object.fromEntries(after.notice.map(([key,value])=>[key.split(':').slice(-2).join(':'),JSON.parse(value)])),ticket=after.tickets[0],handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle);
 assert.equal(createHash('sha256').update(handle).digest('hex'),ticket.handle_hash);assert.equal(Object.keys(ticket).length,14);assert.equal(ticket.grant_id,f.identity.grantId);assert.equal(ticket.user_id,f.identity.subject);assert.equal(ticket.expected_sequence,0);assert.equal(ticket.action,'grant');assert.equal(ticket.purpose,'afw.dossier-monitoring-owner.v1');
 assert.equal(records['ticket:ack'].outcome,'applied');assert.equal(records['ticket:ack'].sequence,null);assert(records['ticket:ack'].observedAt<records['ticket:send'].window.deadline);
 assert.match(html,/<button type="button" disabled>/);assert.doesNotMatch(html,/<script|<form[^>]+action=/);assert.match(html,/Todavía no diste permiso para avisos/);
 assert.match(response.headers.get('Content-Security-Policy'),/form-action 'none'/);assert.equal(response.headers.get('X-Content-Type-Options'),'nosniff');assert.equal(response.headers.get('Cache-Control'),'no-store');assert.equal(response.headers.get('Referrer-Policy'),'same-origin');assert.match(response.headers.get('Set-Cookie'),/; Path=\/; Secure; HttpOnly; SameSite=Strict; Max-Age=\d+/);
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');assert.deepEqual(await plain(f.stub.sdkGrant(f.identity.grantId)),f.grant);
 const repeat=await f.mf.dispatchFetch(f.source.origin+'/monitoring',{headers:f.headers});assert.equal(repeat.status,503);await repeat.body?.cancel();assert.deepEqual(await plain(f.stub.noticeInspect()),after);
}));
