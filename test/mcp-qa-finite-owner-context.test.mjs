import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {exportJWK,generateKeyPair,SignJWT} from 'jose';
import {createFiniteOwnerPreparationStore} from '../lib/mcp-qa-finite-preparation-store.mjs';
import * as preparation from '../lib/mcp-qa-finite-owner-preparation.mjs';
import {native} from './fixtures/finite-owner-native.mjs';
test('private original context has a distinct internal continuation; ordinary arguments cannot select it',async()=>{
 assert.equal(typeof preparation.continuePrivateQaFiniteOwnerChoice,'function','fixed private original-context continuation is missing');
 let called=0;const parent=preparation.createFiniteOwnerRequestLease(new Request('https://example.invalid'));
 try{await assert.rejects(preparation.prepareFiniteOwnerChoice({ctx:{},env:{},request:new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare')},parent.lease,()=>{called++;}));assert.equal(called,0);}
 finally{parent.finish();}
});
test('genuine one-use consumed admission permits same ambient owner factual borrow and retains actual held read',async t=>{
 const f=await native(t),screen=await f.screen(),shortToken=await f.jwt('owner','finite-owner','5s');
 const r=await f.json('/fixture/owner-borrow',{probeExpiry:true,headers:{'Cf-Access-Jwt-Assertion':shortToken,Origin:'https://delegated-canary.agentfriendlyweb.dev','Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()});
 try{
  assert.equal(r.replayDenied,true);assert.equal(r.borrowed,true,'same genuine adopted owner entry cannot borrow factual work');
  assert.deepEqual(r.denied,{foreign:true,clone:true,ctx:true,storage:true,db:true,admissionExpiry:true});
  assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,false);
 }finally{await f.json('/fixture/request-release',{});}
 await new Promise(resolve=>setTimeout(resolve,30));
 assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
});

const source=()=>{const at=Date.now(),hex='a'.repeat(64),uuid='11111111-1111-4111-8111-111111111111';return {sourceRevision:'b'.repeat(40),actorId:hex,qaNamespaceId:'c'.repeat(32),qaVersionId:uuid,origin:'https://delegated-canary.agentfriendlyweb.dev',phase:'closed_ui',access:{teamDomain:'finite-fixture.cloudflareaccess.com',audience:'finite-owner'},clientId:'SYN',resource:'https://delegated-canary.agentfriendlyweb.dev/mcp',project:{projectId:'SYN',revision:1,synthetic:true},goal:'discovery',programContext:{programHash:hex,sourceRevision:'d'.repeat(40),originalContextHash:hex},initialBaseline:{versionId:uuid,deploymentId:uuid,moduleHash:hex,configurationHash:hex,bindingsHash:hex},currentPublication:{stage:null,versionId:uuid,deploymentId:uuid,receiptHash:null},window:{startedAt:at-10,expiresAt:at+60000}};};
test('private envelope rejects malformed context and rechecks drift before any write',async()=>{
 const {privateKey,publicKey}=await generateKeyPair('RS256'),kid='native-envelope-fixture';
 const issuer='https://finite-context-proof.cloudflareaccess.com';
 const key={...await exportJWK(publicKey),kid,alg:'RS256'};
 const assertion=await new SignJWT({email:'synthetic@example.invalid'}).setProtectedHeader({alg:'RS256',kid})
  .setIssuer(issuer).setAudience('finite-owner').setSubject('synthetic-owner').setExpirationTime('1m').sign(privateKey);
 let keyReads=0;const originalFetch=globalThis.fetch;
 globalThis.fetch=async input=>{
  assert.equal(String(input?.url??input),issuer+'/cdn-cgi/access/certs');
  keyReads++;return Response.json({keys:[key]});
 };
 try{
  for(const mode of ['accessor','extra','inner','hash-drift','selector-drift','source-drift']){
   let calls=0,getters=0,primaryReads=0,writes=0;
   const initial=source();initial.access.teamDomain=new URL(issuer).hostname;
   const ctx={id:{toString:()=>initial.actorId},storage:{get(){throw Error('unexpected storage read');},transaction(){writes++;throw Error('unexpected storage write');}}};
   const db={withSession(mode){
    assert.equal(mode,'first-primary');
    return {prepare(sql){
     assert.match(sql,/FROM site_projects/);
     return {bind(projectId,subject){
      assert.equal(projectId,initial.project.projectId);assert.equal(subject,'synthetic-owner');
      return {async first(){primaryReads++;return {id:projectId,user_id:subject,revision:initial.project.revision};}};
     }};
    }};
   }};
   const env={RELEASE_DB:db,AFW_QA_VERSION:{id:initial.qaVersionId},AFW_QA_OCCURRENCE_RATE_LIMITER:{limit(){writes++;throw Error('unexpected rate limiter');}}};
   const request=new Request(initial.origin+'/connections/finite-prepare',{headers:{'Cf-Access-Jwt-Assertion':assertion}}),parent=preparation.createFiniteOwnerRequestLease(request);
   const drift=mode.endsWith('drift'),previousKeyReads=keyReads;
   try{
    await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,()=>{
     calls++;
     const value={source:structuredClone(initial),preconnectionId:'e'.repeat(64),capsuleHash:'f'.repeat(64)};
     if(mode==='accessor')Object.defineProperty(value,'source',{get(){getters++;return initial;}});
     if(mode==='extra')value.extra=true;
     if(mode==='inner')value.source.extra=true;
     if(calls>1){
      if(mode==='hash-drift')value.capsuleHash='1'.repeat(64);
      if(mode==='selector-drift')value.preconnectionId='2'.repeat(64);
      if(mode==='source-drift')value.source.goal='content';
     }
     return value;
    }));
    assert.equal(getters,0);assert.equal(writes,0);
    assert.equal(calls,drift?2:1,mode);assert.equal(primaryReads,drift?1:0,mode);
    if(!drift)assert.equal(keyReads,previousKeyReads);
   }finally{parent.finish();}
  }
  assert.equal(keyReads,1,'genuine verification precedes the drift checks');
 }finally{globalThis.fetch=originalFetch;}
});

test('requested ticket selector cannot substitute for exact original A envelope',async()=>{
 const initial=source(),map=new Map(),storage={get:async key=>map.get(key),put:async(key,value)=>map.set(key,value),async transaction(fn){return fn(this);}};
 const ctx={storage,id:{toString:()=>initial.actorId}},env={RELEASE_DB:{withSession(){throw Error('unexpected primary');}},AFW_QA_VERSION:{id:initial.qaVersionId}};
 const handle='1'.repeat(64),ticketHash=createHash('sha256').update(handle).digest('hex'),request=new Request(initial.origin+'/connections/finite-prepare',{headers:{Cookie:'__Host-afw-finite-prepare='+handle}}),parent=preparation.createFiniteOwnerRequestLease(request);
 const ticket={purpose:'afw.finite-owner-ticket.v1',ticketHash,subjectHash:'2'.repeat(64),sourceRevision:initial.sourceRevision,projectRef:'3'.repeat(64),connectionRef:null,preconnectionId:'4'.repeat(64),action:'connection',createdAt:Date.now()-1,expiresAt:Date.now()+30000};
 try{
  assert.equal((await createFiniteOwnerPreparationStore({storage,now:Date.now}).putTicket(ticket,parent.lease)).status,'recorded');
  let requested;
  await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx,env,request},parent.lease,(child,id)=>{child.assertCurrent();requested=id;return {source:initial,preconnectionId:'5'.repeat(64),capsuleHash:'6'.repeat(64)};}));
  assert.equal(requested,ticket.preconnectionId);assert.equal(map.size,1);
 }finally{parent.finish();}
});
test('private continuation rejects positive POST before any factual reader invocation',async()=>{
 let calls=0;const request=new Request('https://delegated-canary.agentfriendlyweb.dev/connections/finite-prepare',{method:'POST'}),parent=preparation.createFiniteOwnerRequestLease(request);
 try{await assert.rejects(preparation.continuePrivateQaFiniteOwnerChoice({ctx:{},env:{},request},parent.lease,()=>{calls++;}));assert.equal(calls,0);}
 finally{parent.finish();}
});
