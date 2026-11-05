import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {Client,StreamableHTTPClientTransport} from '@modelcontextprotocol/client';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
import {seedFiniteOwnerSdkClient,readSyntheticIssuedGrantProps} from './fixtures/finite-owner-qa-sdk.mjs';
const PREP='__Host-afw-finite-prepare='+'a'.repeat(64);
const plain=async p=>{const v=await p;try{return JSON.parse(JSON.stringify(v));}finally{v?.[Symbol.dispose]?.();}};
async function world(fn){
 const f=await initialEntryHarness('phase-context-sdk-token');
 try{
  await f.stub.configure('normal');assert.equal((await plain(f.stub.invoke(f.refs))).status,'material_recorded');await f.stub.restoreMethods();
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined);
  f.source=(await plain(f.stub.sdkReadCurrent())).source;assert.equal(f.source?.phase,'read_consent');
  f.headers={'Cf-Access-Jwt-Assertion':await f.enrollmentToken(f.source),Cookie:PREP};
  await seedFiniteOwnerSdkClient(f.mf,f.source);
  f.history=await plain(f.stub.sdkGrants());f.kv=await f.mf.getKVNamespace('OAUTH_KV','m-sdk');
  f.verifier='v'.repeat(64);f.challenge=createHash('sha256').update(f.verifier).digest('base64url');
  const configured=await f.mf.dispatchFetch(f.source.origin+'/fixture/token-config',{method:'POST',body:JSON.stringify({clientId:f.source.clientId,projectId:f.source.project.projectId,audience:f.source.access.audience,teamDomain:f.source.access.teamDomain,expiresAt:new Date(Date.now()+600000).toISOString()})});assert.equal(configured.status,204);
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
 assert.equal(typeof payload.access_token,'string');assert.equal(payload.token_type.toLowerCase(),'bearer');assert.equal(payload.refresh_token,undefined);
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
