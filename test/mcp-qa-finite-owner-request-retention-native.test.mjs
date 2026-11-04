import test from 'node:test';
import assert from 'node:assert/strict';
import {native} from './fixtures/finite-owner-native.mjs';
import {setup} from './fixtures/finite-transport-native.mjs';
const O='https://delegated-canary.agentfriendlyweb.dev';
const wait=async(f,key)=>{for(let i=0;i<400;i++){const v=await f.json('/fixture/request-state',{});if(v[key])return v;await new Promise(r=>setTimeout(r,20));}assert.fail(key+' not reached');};
const blocked=async f=>assert.deepEqual(await f.json('/fixture/request-probe',{}),{requestAllowed:false,readAllowed:false,ownerAllowed:false,continueAllowed:false});
for(const mode of ['source','ticket','approval'])test('actual pre-admission '+mode+' remains occupied after timeout until actual settlement',async t=>{
 const f=await native(t),screen=mode==='approval'?await f.screen():null;
 const input={mode,method:screen?'POST':'GET',headers:{'Cf-Access-Jwt-Assertion':f.token,...screen?{Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie}:{}},...screen?{body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()}:{}};
 const p=f.json('/fixture/request-prepare',input);await wait(f,'held');assert.equal((await p).rejected,true);
 try{await blocked(f);}finally{await f.json('/fixture/request-release',{});}
 await wait(f,'settled');await new Promise(r=>setTimeout(r,30));
 assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
 const rows=await f.json('/fixture/rows',{});assert.equal(rows.filter(([k])=>k.endsWith(':connection:approval')).length,0,'no late stage admission or publication');
});
test('late streamed body cancellation keeps request occupied until cancellation settles',async t=>{
 const f=await native(t),p=f.json('/fixture/request-prepare',{mode:'body',method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'}});
 await wait(f,'held');await wait(f,'denied');await blocked(f);await f.json('/fixture/request-release',{});await wait(f,'cancelHeld');await blocked(f);
 await f.json('/fixture/request-release',{});assert.equal((await p).rejected,true);await wait(f,'settled');
 assert.deepEqual(await f.json('/fixture/rows',{}),[]);
});
test('actual unmounted host GET and POST stay pending without form or ticket consumption',async t=>{
 const f=await native(t);
 for(const method of ['GET','POST']){
  const r=await f.call('/fixture/pending-host',{method});assert.equal(r.status,503);assert.equal(r.headers.get('Set-Cookie'),null);assert.doesNotMatch(await r.text(),/<form|name="handle"|value="approve"/);
 }
 assert.deepEqual(await f.json('/fixture/rows',{}),[]);assert.equal(f.jwksReads(),0);
});

test('genuine consumed stage adopts the original request in place and replay cannot effect',async t=>{
 const f=await setup(t),screen=await f.screen(),input={url:O+'/connections/finite-prepare',headers:{'Cf-Access-Jwt-Assertion':f.token,Origin:O,'Content-Type':'application/x-www-form-urlencoded',Cookie:screen.cookie},body:new URLSearchParams({handle:screen.handle,projectRef:screen.projectRef,decision:'approve'}).toString()};
 const result=await f.json('/fixture/request-publish',input);
 assert.equal(result.answer?.status,'installed');assert.equal(result.continued,true);assert.equal(result.replayed,false);assert.equal(f.posts(),2);
 try{await blocked(f);}finally{await f.json('/fixture/request-release',{});}await wait(f,'settled');await new Promise(r=>setTimeout(r,30));
 assert.deepEqual(await f.json('/fixture/request-missing-admission',{preconnectionId:'a'.repeat(64),stage:'connection'}),{accepted:false});assert.equal(f.posts(),2);
});
test('resolver genuine children and proof descendants retain root and five second bound',async t=>{
 const f=await native(t),r=await f.json('/fixture/request-prepare',{mode:'normal',headers:{'Cf-Access-Jwt-Assertion':f.token}});
 assert.equal(r.result?.status,200);assert.ok(r.lineage.length>=3);
 for(const observation of r.lineage){assert.equal(observation.sameRoot,true);assert.equal(observation.cloneDenied,true);assert.equal(observation.frozen,true);assert.ok(observation.remaining>0&&observation.remaining<=5000);}
});

test('oversized body preserves first400 while actual cancellation stays retained past child timeout',async t=>{
 const f=await native(t),p=f.json('/fixture/request-prepare',{mode:'oversize',method:'POST',headers:{Origin:O,'Content-Type':'application/x-www-form-urlencoded'}});
 await wait(f,'cancelHeld');
 try{
  assert.equal((await p).status,400,'the size failure precedes any cancellation or deadline failure');
  await blocked(f);await new Promise(resolve=>setTimeout(resolve,5100));await blocked(f);
  assert.deepEqual(await f.json('/fixture/rows',{}),[]);
 }finally{await f.json('/fixture/request-release',{});}
 await wait(f,'settled');await new Promise(resolve=>setTimeout(resolve,30));
 assert.equal((await f.json('/fixture/request-probe',{})).requestAllowed,true);
});
