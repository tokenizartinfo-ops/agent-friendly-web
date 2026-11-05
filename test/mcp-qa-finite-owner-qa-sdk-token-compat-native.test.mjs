import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
import {initialHash} from '../lib/mcp-qa-finite-initial-material-records.mjs';
import {decodeFinitePreparationIssuerRecord} from '../lib/mcp-qa-finite-preparation-issuer-records.mjs';
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

/** SYN negative identity in the ACTUAL SDK code grammar. Preserve this family's
 * SDK id and original app UUID; rewrap its actual key for the changed code.
 * This is a corrupted negative fixture, never QA's positive issuance. */
async function corruptSdkSubject(f,x){
 const constant=new Uint8Array([0x22,0x7e,0x26,0x86,0x8d,0xf1,0xe1,0x6d,0x80,0x70,0xea,0x17,0x97,0x5b,0x47,0xa6,0x82,0x18,0xfa,0x87,0x28,0xae,0xde,0x85,0xb5,0x1d,0x4a,0xd9,0x96,0xca,0xca,0x43]);
 const hmac=await crypto.subtle.importKey('raw',constant,{name:'HMAC',hash:'SHA-256'},false,['sign']);
 const derive=async code=>crypto.subtle.importKey('raw',await crypto.subtle.sign('HMAC',hmac,new TextEncoder().encode(code)),{name:'AES-KW'},false,['wrapKey','unwrapKey']);
 const originalWrapping=await derive(x.code),key=await crypto.subtle.unwrapKey('raw',Buffer.from(x.grant.authCodeWrappedKey,'base64'),originalWrapping,{name:'AES-KW'},{name:'AES-GCM'},true,['encrypt','decrypt']);
 const [,id,secret]=x.code.split(':'),subject='SYN-foreign',code=subject+':'+id+':'+secret,newWrapping=await derive(code);
 const props={...x.props,userId:subject},encrypted=await crypto.subtle.encrypt({name:'AES-GCM',iv:new Uint8Array(12)},key,new TextEncoder().encode(JSON.stringify(props)));
 const grant={...x.grant,userId:subject,authCodeId:createHash('sha256').update(code).digest('hex'),authCodeWrappedKey:Buffer.from(await crypto.subtle.wrapKey('raw',key,newWrapping,{name:'AES-KW'})).toString('base64'),encryptedProps:Buffer.from(encrypted).toString('base64')};
 assert.deepEqual(await readSyntheticIssuedGrantProps(code,grant),props,'actual SDK key/props format remains valid');
 await f.kv.delete(x.key);const newKey='grant:'+subject+':'+id;await f.kv.put(newKey,JSON.stringify(grant));
 x.code=code;x.key=newKey;x.grant=grant;
}

async function rawMcp(f,token){
 const r=await f.mf.dispatchFetch(f.source.resource,{method:'POST',headers:{Authorization:'Bearer '+token,'Content-Type':'application/json',Accept:'application/json, text/event-stream',Host:new URL(f.source.origin).host},body:JSON.stringify({jsonrpc:'2.0',id:1,method:'tools/call',params:{name:'read_project_summary',arguments:{}}})});
 const body=await r.text();let result;try{result=JSON.parse(body);}catch{/* Actual M human failure page has no JSON result. */}
 return {status:r.status,result,mediaType:r.headers.get('Content-Type'),format:/^data:/m.test(body)?'sse':result?'json':'other'};
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
 if(fault==='sdk-subject')await corruptSdkSubject(f,x);
 if(fault==='owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
 if(fault==='native-project')await f.db.prepare('UPDATE delegated_access_grants SET project_id=? WHERE id=?').bind('SYN-foreign',x.app.id).run();
 if(fault==='granted-scope')await f.kv.put(x.key,JSON.stringify({...x.grant,scope:['afw:project:read','afw:evidence:read']}));
 if(fault==='requested-scope')patch={scope:'afw:evidence:read'}; // SDK downscopes a mixed request to read; evidence-only is genuinely outside this grant.
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
 const carrier=await rawMcp(f,payload.access_token);assert.equal(carrier.status,200,'SDK cryptography still accepted; permission is checked separately');
 console.info('D03 actual permission carrier',JSON.stringify({reduction,http:carrier.status,mediaType:carrier.mediaType,format:carrier.format}));
 const denied=await readSummary(f,payload.access_token);assert.equal(denied.isError,true);assert.equal(denied.structuredContent.code,'delegated_access_denied');assert.equal(denied.structuredContent.data,undefined);
 console.info('D03 actual permission reduction',JSON.stringify({reduction,code:denied.structuredContent.code}));
}));
test('held actual SDK completion settles late after original terminal fence and real grant reduction',{timeout:45000},()=>world(async f=>{
 const form=await consent(f);await f.stub.sdkConfigure('hold-put');const pending=f.post(form);
 let held=false;for(let n=0;n<1000;n++){const s=await plain(f.stub.sdkObservation());if(s.held){held=true;assert(s.rows.some(([k])=>k.endsWith('sdk_complete:send')));assert(!s.rows.some(([k])=>k.endsWith('sdk_complete:observed')));break;}await new Promise(r=>setTimeout(r,20));}
 assert.equal(held,true);const app=await plain(f.stub.sdkGrant(form.identity.grantId));assert(app);assert.equal(app.revoked_at,'');
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable','active original grant with actual sdk_complete SEND and no OBSERVED remains pending before reduction/release');
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


async function d04Read(f,x){
 const current=await plain(f.stub.sdkReadCurrent());
 assert.deepEqual(Object.keys(current).sort(),['capsuleHash','preconnectionId','source']);
 assert.equal(current.source.phase,'read_consent');
 assert.equal(current.preconnectionId,x.form.identity.preconnectionId);
 assert.equal(current.source.project.projectId,x.app.project_id);
 return current;
}
async function d04Journals(f){
 return (await plain(f.stub.snapshot())).filter(([key])=>['afw.finite-preparation-issuer.v1:','afw.finite-owner-issuer-provenance.v1:','connection-preparation:','afw.finite-preparation-cleanup.v1:','afw.finite-policy-effect.v1:'].some(prefix=>key.startsWith(prefix)));
}
async function d04Ack(f,x){
 const rows=await d04Journals(f),key='afw.finite-preparation-issuer.v1:'+x.form.identity.preconnectionId+':grant:ack';
 const raw=rows.find(([k])=>k===key)?.[1];assert.equal(typeof raw,'string');
 const ack=decodeFinitePreparationIssuerRecord('Ack',raw);
 return {rows,key,raw,ack};
}
async function d04Exchanged(f){
 const x=await issued(f),before=await d04Read(f,x),original=await d04Ack(f,x);
 assert.equal(x.app.exchanged_at,'');
 assert.equal(original.ack.rowHash,initialHash('afw.finite-preparation-issuer-row.v1',x.app));
 const r=await exchange(f,x);assert.equal(r.status,200);const payload=await r.json();
 assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');
 assert.equal(Object.hasOwn(payload,'refresh_token'),false);assert.equal(r.headers.get('Cache-Control'),'no-store');
 assert(payload.expires_in>0&&payload.expires_in<=300);
 assert(payload.expires_in<=Math.floor((Date.parse(x.app.expires_at)-Date.now())/1000)+1);
 const summary=await readSummary(f,payload.access_token);assert.equal(summary.isError,undefined);
 assert.equal(summary.structuredContent.data.id,x.app.project_id);
 const current=await plain(f.stub.sdkGrant(x.app.id));assert.notEqual(current.exchanged_at,'');
 assert.deepEqual({...current,exchanged_at:''},x.app,'real token only changed original exchanged_at');
 assert.notEqual(initialHash('afw.finite-preparation-issuer-row.v1',current),original.ack.rowHash);
 assert.equal(initialHash('afw.finite-preparation-issuer-row.v1',{...current,exchanged_at:''}),original.ack.rowHash);
 assert.deepEqual(await d04Journals(f),original.rows,'token/MCP leave DO journals and raw ACK bytes unchanged');
 assert.equal((await plain(f.stub.sdkGrants())).filter(row=>!f.history.some(old=>old.id===row.id)).map(row=>row.id).join(),x.app.id);
 console.info('D04 actual exchange prerequisites',JSON.stringify({preTokenReader:true,actualToken:200,actualMcpOriginalProject:true,originalAppOnly:true,currentHashDifferent:true,historicalHashMatches:true,ackUnchanged:true}));
 return {x,before,original,current};
}
test('D04 actual exchange retains factual read_consent and immutable grant ACK',()=>world(async f=>{
 const {x,before,original}=await d04Exchanged(f);
 const after=await d04Read(f,x);assert.deepEqual(after,before);
 assert.deepEqual(await d04Journals(f),original.rows,'reader also leaves original raw ACK/recordHash and every DO journal unchanged');
}));

/** SYN negative-only native changes follow the genuine QA -> M -> MCP flow.
 * A stable valid timestamp is current field data, never new exchange authority. */
for(const fault of ['blob-type','numeric-text','invalid-text','noncanonical','future','before-created','expiry','after-expiry'])test('D04 actual exchange then SYN invalid exchanged_at '+fault,()=>world(async f=>{
 const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
 const created=Date.parse(current.created_at),expiry=Date.parse(current.expires_at),now=Date.now();
 let value;
 if(fault==='blob-type')value=new Uint8Array([1,2,3]);
 if(fault==='numeric-text')value=42; // SQLite TEXT affinity; invalid canonical time after native storage.
 if(fault==='invalid-text')value='SYN-invalid-time';
 if(fault==='noncanonical')value=current.exchanged_at.replace('.'+current.exchanged_at.split('.')[1],'Z');
 if(fault==='future'){assert(now+60000<expiry);value=new Date(now+60000).toISOString();}
 if(fault==='before-created'){assert(created-1<now&&created-1<expiry);value=new Date(created-1).toISOString();}
 if(fault==='expiry')value=current.expires_at;
 if(fault==='after-expiry')value=new Date(expiry+1).toISOString();
 // Under this active grant, expiry/expiry+1 also fail no-future; no predicate isolation claimed.
 assert(now<expiry);
 await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(value,x.app.id).run();
 if(fault==='blob-type')assert.equal(typeof (await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,'object');
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 assert.deepEqual(await d04Journals(f),original.rows);
}));

test('D04 actual exchange then SYN inclusive created_at remains factual only',()=>world(async f=>{
 const {x,before,original,current}=await d04Exchanged(f);await d04Read(f,x);
 assert(Date.parse(current.created_at)<=Date.now()&&Date.parse(current.created_at)<Date.parse(current.expires_at));
 await f.db.prepare('UPDATE delegated_access_grants SET exchanged_at=? WHERE id=?').bind(current.created_at,x.app.id).run();
 assert.deepEqual(await d04Read(f,x),before);
 assert.deepEqual(await d04Journals(f),original.rows);
}));

for(const field of ['id','user_id','client_id','project_id','resource','scopes_json','created_at','expires_at','revoked_at','current-owner','current-revision'])test('D04 actual exchange then SYN immutable original '+field+' denies',()=>world(async f=>{
 const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
 const values={id:'eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee',user_id:'SYN-foreign',client_id:'SYN-foreign',project_id:'SYN-foreign',resource:'https://foreign.example/mcp',scopes_json:'["afw:project:read","afw:evidence:read"]',revoked_at:new Date().toISOString()};
 if(field==='created_at'){
  const shifted=Date.parse(current.created_at)+1;
  assert(shifted<=Date.parse(current.exchanged_at)&&shifted<=Date.now()&&shifted<Date.parse(current.expires_at));
  values.created_at=new Date(shifted).toISOString();
 }
 if(field==='expires_at'){
  const shifted=Date.parse(current.expires_at)-1;
  assert(shifted>Date.now()&&shifted>Date.parse(current.exchanged_at)&&shifted>Date.parse(current.created_at));
  values.expires_at=new Date(shifted).toISOString();
 }
 if(field==='current-owner')await f.db.prepare('UPDATE site_projects SET user_id=? WHERE id=?').bind('SYN-foreign',x.app.project_id).run();
 else if(field==='current-revision')await f.db.prepare('UPDATE site_projects SET revision=revision+1 WHERE id=?').bind(x.app.project_id).run();
 else{
  // The closed list above is test-controlled; all writes target the actual original UUID.
  await f.db.prepare('UPDATE delegated_access_grants SET '+field+'=? WHERE id=?').bind(values[field],x.app.id).run();
  if(field==='id')assert.equal(await plain(f.stub.sdkGrant(x.app.id)),null,'original UUID absent; another row cannot substitute');
 }
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 assert.deepEqual(await d04Journals(f),original.rows);
}));

test('D04 actual exchange then SYN valid native timestamp drift at observation two denies',()=>world(async f=>{
 const {x,original,current}=await d04Exchanged(f);await d04Read(f,x);
 let different=current.created_at;
 if(different===current.exchanged_at){
  const next=Date.parse(current.exchanged_at)+1;
  while(Date.now()<next)await new Promise(resolve=>setTimeout(resolve,1));
  different=new Date(next).toISOString();
 }
 assert.notEqual(different,current.exchanged_at);
 assert(Date.parse(different)>=Date.parse(current.created_at)&&Date.parse(different)<=Date.now()&&Date.parse(different)<Date.parse(current.expires_at));
 f.phaseObservation=0;f.phaseDrift='exchange';f.exchangeDrift={grantId:x.app.id,exchangedAt:different};
 assert.equal((await plain(f.stub.sdkReadCurrent())).status,'unavailable');
 assert.equal(f.phaseObservation,2,'existing second pointer observation performed fixed native UPDATE');
 assert.equal((await plain(f.stub.sdkGrant(x.app.id))).exchanged_at,different);
 assert.deepEqual(await d04Journals(f),original.rows);
}));
