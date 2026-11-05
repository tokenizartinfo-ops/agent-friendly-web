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
  const query=new URLSearchParams({client_id:f.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:f.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
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
