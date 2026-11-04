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
