import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
const plain=async p=>{const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v?.[Symbol.dispose]?.();}};
async function world(fn,{late=false}={}){
 const f=await initialEntryHarness('phase-context-sdk-token'+(late?'-late':''));
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined);
  f.source=(await plain(f.stub.sdkReadCurrent())).source;assert.equal(f.source?.phase,'read_consent');
  f.headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:PREP};
  await seedFiniteOwnerSdkClient(f.mf,f.source);
  f.history=await plain(f.stub.sdkGrants());f.kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk');
  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
  const configured=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(f.source.window.expiresAt).toISOString()})});assert.equal(configured.status,204);
  f.get=()=>f.mf.dispatchFetch(f.source.origin+'/authorize?'+new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:f.challenge,code_challenge_method:'S256'}),{redirect:'manual',headers:f.headers});
  f.post=form=>f.mf.dispatchFetch(f.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{...f.headers,Origin:f.source.origin,'Content-Type':'application/x-www-form-urlencoded',Cookie:PREP+'; '+form.cookie},body:new URLSearchParams({handle:form.handle,decision:'approve',scope:'afw:project:read'})});
  await fn(f);
  const after=await plain(f.stub.sdkGrants());assert.equal(after.length,f.history.length+1,'only the original newly issued application grant');
  for(const row of f.history)assert.deepEqual(after.find(r=>r.id===row.id),row,'historical grant unchanged');
 }finally{await f.stub.sdkReleaseHeld().catch(()=>{});await f.mf.dispose();await f.cleanup();}
}
async function consent(f){
 const r=await f.get();assert.equal(r.status,200);const html=await r.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1],cookie=r.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');assert(handle&&cookie);
 const rows=await plain(f.stub.snapshot()),identity=JSON.parse(rows.find(([k])=>k.startsWith('afw.finite-preparation-issuer.v1:')&&k.endsWith(':reservation'))[1]).identity;
 assert.equal(await plain(f.stub.sdkGrant(identity.grantId)),null);
 return {handle,cookie,identity};
}
async function issued(f){
 const form=await consent(f),r=await f.post(form);assert.equal(r.status,302);
 const code=new URL(r.headers.get('Location')).searchParams.get('code');assert.equal(typeof code,'string');
 const [subject,id]=code.split(':'),key='grant:'+subject+':'+id,grant=await f.kv.get(key,{type:'json'});
 assert(grant);const props=await readSyntheticIssuedGrantProps(code,grant);
 assert.deepEqual(props,{applicationGrantId:form.identity.grantId,userId:form.identity.subject,projectId:form.identity.projectId});
 const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert.equal(app.revoked_at,'');
 return {form,code,key,grant,props,app};
}
async function exchange(f,x,patch={}){
 return f.mf.dispatchFetch(f.source.origin+'/oauth/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'authorization_code',client_id:f.source.clientId,redirect_uri:'https://client.example/cb',resource:f.source.resource,code:x.code,code_verifier:f.verifier,...patch})});
}
async function readSummary(f,token){
 const client=new Client({name:'SYN-native-D03',version:'1.0.0'},{versionNegotiation:{mode:'legacy'}});
 try{
  await client.connect(new StreamableHTTPClientTransport(new URL(f.source.resource),{requestInit:{headers:{Authorization:'Bearer '+token,Host:new URL(f.source.origin).host}},fetch:(url,options)=>f.mf.dispatchFetch(String(url),options)}));
  const tools=await client.listTools();assert.deepEqual(tools.tools.map(t=>t.name).sort(),['read_project_summary','read_saved_evidence'],'events disabled');
  return await client.callTool({name:'read_project_summary',arguments:{}});
 }finally{await client.close();}
}
test('valid actual QA code exchanges through actual M bounded response and actual MCP original permission',()=>world(async f=>{
 const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
 assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');assert.equal(Object.hasOwn(payload,'refresh_token'),false);
 assert(payload.expires_in>0&&payload.expires_in<=300);assert(payload.expires_in<=Math.floor((Date.parse(x.app.expires_at)-Date.now())/1000)+1);
 assert.equal(r.headers.get('Cache-Control'),'no-store');
 const summary=await readSummary(f,payload.access_token);assert.equal(summary.isError,undefined);assert.equal(summary.structuredContent.data.id,x.app.project_id);
 assert.notEqual(await plain(f.stub.sdkGrant(x.app.id)).then(v=>v.exchanged_at),'');
 for(const path of ['/oauth/register','/connections','/authorize/ordinary']){const closed=await f.mf.dispatchFetch(f.source.origin+path);assert.equal(closed.status,404);await closed.body?.cancel();}
 console.info('D03 valid bounded exchange',JSON.stringify({expiresIn:payload.expires_in,refresh:false,originalProject:true,events:false,profiles:f.sdkProfiles}));
}));

/** Explicit SYN SDK-format corruption of this QA-issued code's own encrypted
 * grant; same SDK family, native KV and original application UUID. No issuer,
 * token response or callback is replaced. The key stays transient in memory. */
async function corruptProps(f,x,change){
 const wrappingConstant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
 const hmac=await crypto.subtle.importKey('raw',wrappingConstant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const material=await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(x.code));
 const wrapping=await crypto.subtle.importKey('raw',material,{name:'AES-KW'},false,['unwrapKey']);
 const key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),wrapping,{name:'AES-KW'},{name:'AES-GCM'},false,['encrypt','decrypt']);
 const props={...x.props};change(props);
 const encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
 await f.kv.put(x.key,JSON.stringify({...x.grant,encryptedProps:Buffer.from(encrypted).toString('base64')}));
}
async function rawMcp(f,token){
 const r=await f.mf.dispatchFetch(f.source.resource,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Accept:'application/json, text/event-stream',Host:new URL(f.source.origin).host},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'read_project_summary',arguments:{}}})});
 const body=await r.text();let result;try{result=JSON.parse(body);}catch{/* Actual M human failure page has no JSON result. */}
 return {status:r.status,result};
}
for(const field of ['userId','projectId'])for(const kind of ['missing','wrong'])test('SYN SDK-format '+kind+' redundant '+field+' denies actual token exchange',()=>world(async f=>{
 const x=await issued(f);await corruptProps(f,x,props=>{if(kind==='missing')delete props[field];else props[field]='SYN-foreign';});
 const r=await exchange(f,x),tokenStatus=r.status;
 if(r.ok){
  const payload=await r.json(),mcp=await rawMcp(f,payload.access_token);
  console.info('D03 redundant tuple causal RED',JSON.stringify({field,kind,tokenStatus,mcpStatus:mcp.status,mcpCode:mcp.result?.result?.structuredContent?.code??null}));
 }else{const error=await r.json();assert.equal(error.error,'invalid_grant');}
 assert.equal(tokenStatus,400,'exact redundant tuple must deny before consumeExchange');
 const app=await plain(f.stub.sdkGrant(x.app.id));assert.equal(app.exchanged_at,'');
}));

async function deniedExchange(f,x,patch={},expected){
 const r=await exchange(f,x,patch),status=r.status;let error;
 const body=await r.text();try{error=JSON.parse(body).error;}catch{/* Keep the actual non-JSON denial status. */}
 assert([400,401,503].includes(status),'actual OAuth route must deny');if(expected)assert.equal(error,expected);
 console.info('D03 denial stage',JSON.stringify({case:f.negative,tokenStatus:status,oauthError:error}));
 return error;
}
for(const fault of ['pkce','client','resource','namespace','missing-app','wrong-app','sdk-subject','owner','native-project','granted-scope','requested-scope','consumed-exchange'])test('actual original QA code negative '+fault,()=>world(async f=>{
 const x=await issued(f);f.negative=fault;
 let patch={};
 if(fault==='pkce')patch={code_verifier:'wrong'.repeat(16)};
 if(fault==='client')patch={client_id:'SYN-other-client'};
 if(fault==='resource')patch={resource:'https://foreign.example/mcp'};
 if(fault==='namespace'){
  const r=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-namespace',{method:'POST'});assert.equal(r.status,204);
 }
 if(fault==='missing-app'||fault==='wrong-app')await corruptProps(f,x,p=>{if(fault==='missing-app')delete p.applicationGrantId;else p.applicationGrantId='eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee';});
 if(fault==='sdk-subject')await f.kv.put(x.key,JSON.stringify({...x.grant,userId:'SYN-foreign'}));
 if(fault==='owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
 if(fault==='native-project')await f.db.prepare('UPDATE delegated_access_grants SET project_id=? WHERE id=?').bind('SYN-foreign',x.app.id).run();
 if(fault==='granted-scope')await f.kv.put(x.key,JSON.stringify({...x.grant,scope:['afw:project:read','afw:evidence:read']}));
 if(fault==='requested-scope')patch={scope:'afw:project:read afw:evidence:read'};
 if(fault==='consumed-exchange')await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(new Date().toISOString(),x.app.id).run();
 await deniedExchange(f,x,patch);
 const row=await plain(f.stub.sdkGrant(x.app.id));assert.equal(row.revoked_at,'');if(fault!=='consumed-exchange')assert.equal(row.exchanged_at,'','denial did not consume original application exchange');
}));
test('real code reuse denies without a second application grant; SDK family behavior is separate',()=>world(async f=>{
 const x=await issued(f),first=await exchange(f,x);assert.equal(first.status,200);const payload=await first.json();
 assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
 const before=await plain(f.stub.sdkGrant(x.app.id));f.negative='code-reuse';await deniedExchange(f,x);
 assert.deepEqual(await plain(f.stub.sdkGrant(x.app.id)),before);
 const after=await rawMcp(f,payload.access_token);console.info('D03 actual vendor reuse family',JSON.stringify({mcpStatus:after.status,code:after.result?.result?.structuredContent?.code??null,originalApplicationUnchanged:true}));
}));
for(const reduction of ['revoke','expire'])test('actual original '+reduction+' before token denies actual callback',()=>world(async f=>{
 const x=await issued(f);f.negative=reduction;
 if(reduction==='revoke'){const r=await plain(f.stub.sdkReduceOriginal());assert.equal(r.fence,'fenced');assert.equal(r.activeAfterFence,true,'fence alone did not revoke the active row');assert.equal(r.reduction,'revoked');}
 else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
 await deniedExchange(f,x,{},'invalid_grant');
 assert.equal((await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,'');
}));
for(const reduction of ['revoke','expire'])test('otherwise valid actual token loses actual MCP permission after original '+reduction,()=>world(async f=>{
 const x=await issued(f),r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
 assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
 if(reduction==='revoke'){const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.fence,'fenced');assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.reduction,'revoked');}
 else await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(new Date(Date.now()-1000).toISOString(),x.app.id).run();
 const denied=await rawMcp(f,payload.access_token);assert.equal(denied.status,200,'SDK cryptography still accepted; permission is checked separately');
 assert.equal(denied.result.result.isError,true);assert.equal(denied.result.result.structuredContent.code,'delegated_access_denied');assert.equal(denied.result.result.structuredContent.data,undefined);
 console.info('D03 actual permission reduction',JSON.stringify({reduction,http:denied.status,code:denied.result.result.structuredContent.code}));
}));
test('held actual SDK completion settles late after original terminal fence and real grant reduction',{timeout:45000},()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-put');const pending=f.post(form);
 let held=false;for(let n=0;n<1000;n++){const s=await plain(f.stub.sdkObservation());if(s.held){held=true;assert(s.rows.some(([k])=>k.endsWith('sdk_complete:send')));assert(!s.rows.some(([k])=>k.endsWith('sdk_complete:observed')));break;}await new Promise(r=>setTimeout(r,20));}
 assert.equal(held,true);const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert(app);assert.equal(app.revoked_at,'');
 const reduced=await plain(f.stub.sdkReduceOriginal());assert.equal(reduced.activeAfterFence,true);assert.equal(reduced.fence,'fenced');assert.equal(reduced.reduction,'revoked');
 await f.stub.sdkReleaseHeld();const response=await pending;assert.equal(response.status,503);await response.body?.cancel();
 let code;for(let n=0;n<100;n++){code=await f.stub.sdkTakeLateCode();if(code)break;await new Promise(r=>setTimeout(r,20));}
 assert.equal(typeof code,'string','observe only actual SDK complete result, transiently');
 f.negative='late-completion-after-terminal-reduction';await deniedExchange(f,{code},{},'invalid_grant');
 const after=await plain(f.stub.sdkObservation());assert(!after.rows.some(([k])=>k.endsWith('sdk_complete:observed')));
 assert.notEqual((await plain(f.stub.sdkGrant(app.id))).revoked_at,'');
 console.info('D03 late completion',JSON.stringify({actualSdkSettled:true,applicationRevoked:true,tokenDenied:true,physicalKvDrain:'not-proven'}));
},{late:true}));

test('SYN reduction of original issued expiry clamps actual token response below SDK default',()=>world(async f=>{
 const x=await issued(f),expiresAt=new Date(Date.now()+90000).toISOString();
 // Labelled timestamp reduction on this original already-issued native row.
 await f.db.prepare('UPDATE delegated_access_grants SET expires_at=? WHERE id=?').bind(expiresAt,x.app.id).run();
 const r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
 assert(payload.expires_in>0&&payload.expires_in<=90);assert.equal(Object.hasOwn(payload,'refresh_token'),false);
 assert(payload.expires_in<=Math.floor((Date.parse(expiresAt)-Date.now())/1000)+1);
 assert.equal((await readSummary(f,payload.access_token)).isError,undefined);
 console.info('D03 reduced original expiry bound',JSON.stringify({expiresIn:payload.expires_in,refresh:false,actualClock:true}));
}));
