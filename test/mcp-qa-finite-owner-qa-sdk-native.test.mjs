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
test('actual native source and SDK parser require lexical continuation after original SDK begin SEND',async()=>{
 console.info('D02 native stage: initialize');
 const f=await initialEntryHarness('phase-context-sdk');
 console.info('D02 native stage: original entry');
 try{
  await f.stub.configure('normal');const entry=await plain(f.stub.invoke(f.refs));if(entry.status!=='material_recorded')console.info('D02 initial diagnostics',JSON.stringify({requests:f.requests.map(x=>new URL(x).pathname),stats:await plain(f.stub.stats()),keys:(await plain(f.stub.snapshot())).map(([key])=>key)}));assert.equal(entry.status,'material_recorded');await f.stub.restoreMethods();
  console.info('D02 native stage: seed approved external facts');
  f.phaseCurrent=await plain(f.stub.seedPhaseFacts('settled',null));assert.equal(f.phaseCurrent.fixtureError,undefined,JSON.stringify(f.phaseCurrent));
  console.info('D02 native stage: genuine source');
  const context=await plain(f.stub.sdkReadCurrent());assert.equal(context.source?.phase,'read_consent',JSON.stringify(context));
  await seedFiniteOwnerSdkClient(f.mf,context.source);await f.stub.sdkConfigure();
  const token=await f.enrollmentToken(context.source);
  const query=new URLSearchParams({client_id:context.source.clientId,redirect_uri:'https://client.example/cb',response_type:'code',resource:context.source.resource,scope:'afw:project:read',state:'SYN-state',code_challenge:'a'.repeat(43),code_challenge_method:'S256'});
  console.info('D02 native stage: original authorization');
  const response=await f.mf.dispatchFetch(context.source.origin+'/authorize?'+query,{redirect:'manual',headers:{'Cf-Access-Jwt-Assertion':token,Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)}});
  const observed=await plain(f.stub.sdkObservation());
  assert(observed.calls.some(c=>c.method==='get'&&c.prefix==='client'),'actual SDK client lookup entered');
  assert(observed.rows.some(([key])=>key.endsWith('sdk_begin:send')),'actual durable original begin SEND reached');
  assert.equal(response.status,200,'actual source/SDK path reached original pending SEND; same invocation must continue lexically');
  const html=await response.text(),handle=/name="handle" value="([^"]+)"/.exec(html)?.[1];assert(handle,'actual SDK form follows issuer authorization');
  const rows=await plain(f.stub.snapshot()),reservation=JSON.parse(rows.find(([key])=>key.startsWith('afw.finite-preparation-issuer.v1:')&&key.endsWith(':reservation'))[1]);
  const appBefore=await f.db.prepare('SELECT id FROM delegated_access_grants WHERE id=?').bind(reservation.identity.grantId).first();assert.equal(appBefore,null);
  const cookie=response.headers.getSetCookie().map(v=>v.split(';')[0]).join('; ');
  const post=await f.mf.dispatchFetch(context.source.origin+'/authorize',{method:'POST',redirect:'manual',headers:{Origin:context.source.origin,'Content-Type':'application/x-www-form-urlencoded','Cf-Access-Jwt-Assertion':token,Cookie:'__Host-afw-finite-prepare='+'a'.repeat(64)+'; '+cookie},body:new URLSearchParams({handle,decision:'approve',scope:'afw:project:read'})});
  if(post.status!==302)console.info('D02 POST stages',JSON.stringify((await plain(f.stub.sdkObservation())).rows.map(([key])=>key.split(':').slice(-2).join(':'))));
  assert.equal(post.status,302,'actual SDK approve and same-child original grant must precede complete');
  assert(new URL(post.headers.get('Location')).searchParams.get('code'),'actual SDK code returned');
  const app=await f.db.prepare('SELECT * FROM delegated_access_grants WHERE id=?').bind(reservation.identity.grantId).first();assert.equal(app.id,reservation.identity.grantId);assert.equal(app.revoked_at,'');
  const final=await plain(f.stub.sdkObservation());assert(final.rows.some(([key])=>key.endsWith('sdk_complete:observed')));assert.equal(final.calls.filter(c=>c.method==='list').length,0);
  console.info('D02 actual GET POST completed; original UUID, SDK code, no list; fixture only');
 }finally{console.info('D02 native stage: dispose');await f.mf.dispose();await f.cleanup();}
});
