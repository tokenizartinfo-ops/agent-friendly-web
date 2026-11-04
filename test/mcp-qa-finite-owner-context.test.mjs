import test from 'node:test';
import assert from 'node:assert/strict';
import * as preparation from '../lib/mcp-qa-finite-owner-preparation.mjs';
import {native} from './fixtures/finite-owner-native.mjs';
test('private original context has a distinct internal continuation; ordinary arguments cannot select it',async()=>{
 assert.equal(typeof preparation.continuePrivateQaFiniteOwnerChoice,'function','fixed private original-context continuation is missing');
 let called=0;const parent=preparation.createFiniteOwnerRequestLease(new Request('https://example.invalid'));
 try{await assert.rejects(preparation.prepareFiniteOwnerChoice({ctx:{},env:{},request:new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare')},parent.lease,()=>{called++;}));assert.equal(called,0);}
 finally{parent.finish();}
});
test('genuine one-use consumed admission permits same ambient owner factual borrow and retains actual held read',async t=>{
 const f=await native(t),screen=await f.screen();
 const r=await f.json('/fixture/owner-borrow',{headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
 try{
  assert.equal(r.replayDenied,true);assert.equal(r.borrowed,true,'same genuine adopted owner entry cannot borrow factual work');
  assert.deepEqual(r.denied,{foreign:true,clone:true,ctx:true,storage:true,db:true});
  assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,false);
 }finally{await f.json('/fixture/request-release',{});}
 await new Promise(resolve=>setTimeout(resolve,30));
 assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
});

const source=()=>{const at=Date.now(),hex='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111';return {sourceRevision:'b'.repeat(40),actorId:hex,qaNamespaceId:'c'.repeat(32),qaVersionId:uuid,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'SYN',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',project:{projectId:'SYN',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:hex,sourceRevision:'d'.repeat(40),originalContextHash:hex},initialBaseline:{versionId:uuid,deploymentId:uuid,moduleHash:hex,configurationHash:hex,bindingsHash:hex},currentPublication:{stage:null,versionId:uuid,deploymentId:uuid,receiptHash:null},window:{startedAt:at-10,expiresAt:at+60000}};};
test('private envelope rejects accessor/extra/inner drift and capsule or selector drift before identity I/O',async()=>{
 for(const mode of ['accessor','extra','inner','hash-drift','selector-drift','source-drift']){
  let calls=0,getters=0;const initial=source(),ctx={id:{toString:()=>initial.actorId},storage:{transaction(){throw Error('unexpected storage');}}},env={RELEASE_DB:{withSession(){throw Error('unexpected DB');}},AFW_QA_VERSION:{id:initial.qaVersionId}};
  const request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare'),parent=preparation.createFiniteOwnerRequestLease(request);
  try{await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,()=>{
   calls++;const value={source:structuredClone(initial),preconnectionId:'e'.repeat(64),capsuleHash:'f'.repeat(64)};
   if(mode==='accessor')Object.defineProperty(value,'source',{get(){getters++;return initial;}});
   if(mode==='extra')value.extra=true;if(mode==='inner')value.source.extra=true;
   if(calls>1){if(mode==='hash-drift')value.capsuleHash='1'.repeat(64);if(mode==='selector-drift')value.preconnectionId='2'.repeat(64);if(mode==='source-drift')value.source.goal='content';}
   return value;
  }));assert.equal(getters,0);assert.equal(calls,mode.endsWith('drift')?2:1,mode);}finally{parent.finish();}
 }
});
