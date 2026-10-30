import test from 'node:test';
import assert from 'node:assert/strict';
let createRetiredRpcReceipt,readRetiredRpcReceipt;
try{({createRetiredRpcReceipt,readRetiredRpcReceipt}=await import('../lib/mcp-retired-rpc-receipt.mjs'));}catch(error){if(error.code!=='ERR_MODULE_NOT_FOUND')throw error;}
const ready={skip:typeof createRetiredRpcReceipt!=='function'||typeof readRetiredRpcReceipt!=='function'};
const challenge='e'.repeat(64);
const observation=(observedAt=3000)=>({purpose:'afw.node-retirement-observation.v1',containerId:'a'.repeat(64),processGeneration:'b'.repeat(64),programHash:'c'.repeat(64),sourceRevision:'d'.repeat(40),image:'cloudflare/debian-trixie',createdAt:1000,expiresAt:2000,closedAt:2500,observedAt,physicalStopVerified:false,mayStartSuccessor:false});
const envelope=(nonce=challenge,at=3000)=>({purpose:'afw.retired-rpc-receipt.v1',challenge:nonce,observation:observation(at)});
const disposable=(value,onDispose)=>Object.defineProperty(value,Symbol.dispose,{value:onDispose});
const tick=()=>new Promise(resolve=>setTimeout(resolve,10));
test('challenged receipt exposes both unmounted protocol helpers',()=>{assert.equal(typeof createRetiredRpcReceipt,'function');assert.equal(typeof readRetiredRpcReceipt,'function');});
test('independent frozen clocks preserve the remote +21ms observation without normalization',ready,async()=>{
 let calls=0,authority=0,seen;
 const result=await readRetiredRpcReceipt({now:()=>3000,assertCurrent(){authority++;},invoke:async(nonce,signal)=>{calls++;seen=nonce;assert.equal(signal.aborted,false);return {value:await createRetiredRpcReceipt({challenge:nonce,now:()=>3021,observe:async({signal})=>{assert.equal(signal.aborted,false);return {value:observation(3021)};}})};}});
 assert.match(seen,/^[a-f0-9]{64}$/);assert.equal(calls,1);assert.ok(authority>=2);
 assert.deepEqual(result,{observation:observation(3021),local:{sentAt:3000,receivedAt:3000}});
 assert.equal(Object.isFrozen(result),true);assert.equal(Object.isFrozen(result.local),true);assert.equal(Object.isFrozen(result.observation),true);
});
test('each invocation needs its own challenge and rejects a previous receipt',ready,async()=>{
 let previous,nonce1,nonce2;
 await readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>{nonce1=nonce;return {value:previous=envelope(nonce)};}});
 await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>{nonce2=nonce;return {value:previous};}}));
 assert.notEqual(nonce1,nonce2);
});
test('wrong echo, old raw payload, extra fields and getters never become receipt evidence',ready,async()=>{
 for(const kind of ['echo','raw','extra','symbol','getter','prototype']){
  let getters=0,disposals=0;
  await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>{
   const value=kind==='raw'?observation():envelope(kind==='echo'?challenge:nonce);
   if(kind==='extra')value.extra='denied';if(kind==='symbol')value[Symbol('foreign')]=true;
   if(kind==='getter')Object.defineProperty(value,'challenge',{enumerable:true,get(){getters++;return nonce;}});
   if(kind==='prototype')Object.setPrototypeOf(value,{foreign:true});
   return {value:disposable(value,()=>{disposals++;})};
  }}),undefined,kind);
  assert.equal(getters,0,kind);assert.equal(disposals,1,kind);
 }
});
test('server accepts only fixed observation grammar and its own current call bracket',ready,async()=>{
 for(const mutate of [
  v=>{v.observedAt=2999;},v=>{v.observedAt=3001;},v=>{v.containerId='foreign';},
  v=>{v.processGeneration='X'.repeat(64);},v=>{v.programHash='z'.repeat(64);},v=>{v.sourceRevision='wrong';},
  v=>{v.purpose='foreign';},v=>{v.image='foreign';},v=>{v.physicalStopVerified=true;},v=>{v.mayStartSuccessor=true;},
  v=>{v.closedAt=3001;},v=>{v.createdAt=-1;},v=>{v.expiresAt=1000;},v=>{v.expiresAt=602000;},
  v=>{v.observedAt=NaN;},v=>{v.extra=true;}
 ]){
  const value=observation();mutate(value);let disposed=0;
  await assert.rejects(createRetiredRpcReceipt({challenge,now:()=>3000,observe:async()=>({value:disposable(value,()=>{disposed++;})})}));
  assert.equal(disposed,1);
 }
});
test('caller still rejects invalid observation grammar despite a matching challenge',ready,async()=>{
 for(const field of ['containerId','createdAt','physicalStopVerified']){
  await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>{
   const value=envelope(nonce);value.observation[field]=field==='containerId'?'bad':field==='createdAt'?-1:true;return {value};
  }}));
 }
});
test('native borrowed wrapper and observation are each released once on success and cleanup failure denies acceptance',ready,async()=>{
 let outer=0,inner=0;
 const r=await readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>({value:disposable({...envelope(nonce),observation:disposable(observation(),()=>{inner++;})},()=>{outer++;})})});
 assert.deepEqual(r.observation,observation());assert.equal(outer,1);assert.equal(inner,1);
 for(const where of ['outer','inner']){
  await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>{
   const value=envelope(nonce);if(where==='inner')disposable(value.observation,()=>{throw Error('inner cleanup');});
   return {value:disposable(value,()=>{if(where==='outer')throw Error('outer cleanup');})};
  }}));
 }
});
test('accessor lifecycle metadata is not invoked',ready,async()=>{
 let reads=0;
 await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>({value:Object.defineProperty(envelope(nonce),Symbol.dispose,{get(){reads++;return ()=>{};}})})}));
 assert.equal(reads,0);
});
test('parent denial before invocation prevents the call and denial after receipt prevents acceptance',ready,async()=>{
 let calls=0;
 await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){throw Error('closed');},invoke:async nonce=>{calls++;return {value:envelope(nonce)};}}));assert.equal(calls,0);
 let checks=0,disposed=0;
 await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){if(++checks>1)throw Error('closed');},invoke:async nonce=>({value:disposable(envelope(nonce),()=>{disposed++;})})}));
 assert.equal(disposed,1);
});
test('wall-clock regression and a spent original deadline fail without renewal',ready,async()=>{
 for(const mode of ['regress','expire']){
  let at=3000,disposed=0;
  await assert.rejects(readRetiredRpcReceipt({now:()=>at,timeoutMs:100,assertCurrent(){},invoke:async nonce=>{at=mode==='regress'?2999:3100;return {value:disposable(envelope(nonce),()=>{disposed++;})};}}));
  assert.equal(disposed,1);
 }
 let at=3000;
 await assert.rejects(createRetiredRpcReceipt({challenge,now:()=>at,observe:async()=>{at=2999;return {value:observation()};}}));
});
test('pre-abort performs no RPC; in-flight abort releases the eventual value without retry',ready,async()=>{
 const controller=new AbortController();controller.abort();let calls=0;
 await assert.rejects(readRetiredRpcReceipt({signal:controller.signal,assertCurrent(){},invoke:async()=>{calls++;return {value:envelope()};}}));assert.equal(calls,0);
 const live=new AbortController();let release,disposed=0;
 const pending=readRetiredRpcReceipt({signal:live.signal,now:()=>3000,assertCurrent(){},invoke:async nonce=>{calls++;return new Promise(resolve=>{release=()=>resolve({value:disposable(envelope(nonce),()=>{disposed++;})});});}});
 while(!release)await tick();live.abort();await assert.rejects(pending);release();await tick();assert.equal(calls,1);assert.equal(disposed,1);
});
test('finite timeout aborts the trusted call and disposes a late result in a live context',ready,async()=>{
 let release,disposed=0,signal,calls=0;
 const pending=readRetiredRpcReceipt({now:()=>3000,timeoutMs:20,assertCurrent(){},invoke:async(nonce,s)=>{calls++;signal=s;return new Promise(resolve=>{release=()=>resolve({value:disposable(envelope(nonce),()=>{disposed++;})});});}});
 await assert.rejects(pending);assert.equal(signal.aborted,true);release();await tick();assert.equal(disposed,1);assert.equal(calls,1);
 let late,serverDisposed=0,serverSignal;
 const server=createRetiredRpcReceipt({challenge,now:()=>3000,timeoutMs:20,observe:async({signal})=>{serverSignal=signal;return new Promise(resolve=>{late=()=>resolve({value:disposable(observation(),()=>{serverDisposed++;})});});}});
 await assert.rejects(server);assert.equal(serverSignal.aborted,true);late();await tick();assert.equal(serverDisposed,1);
});
test('malformed challenges and time budgets fail before any observer call',ready,async()=>{
 let calls=0;
 for(const nonce of ['',null,'e'.repeat(63),'E'.repeat(64)])await assert.rejects(createRetiredRpcReceipt({challenge:nonce,observe:async()=>{calls++;return observation();}}));
 for(const timeoutMs of [0,-1,5001,1.5,Infinity])await assert.rejects(createRetiredRpcReceipt({challenge,timeoutMs,observe:async()=>{calls++;return observation();}}));
 assert.equal(calls,0);
});

for(const side of ['client','server'])for(const behavior of ['resolve','throw']){
 test(side+' validates a direct then getter before assimilation ('+behavior+')',ready,async()=>{
  let getters=0,disposed=0;
  const malformed=nonce=>{
   const value=side==='client'?envelope(nonce):observation();
   Object.defineProperty(value,'then',{get(){getters++;if(behavior==='throw')throw Error('untrusted getter');return resolve=>resolve(side==='client'?envelope(nonce):observation());}});
   return disposable(value,()=>{disposed++;});
  };
  if(side==='client')await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:nonce=>malformed(nonce)}));
  else await assert.rejects(createRetiredRpcReceipt({challenge,now:()=>3000,observe:()=>malformed(challenge)}));
  assert.equal(getters,0);assert.equal(disposed,1);
 });
}
test('asynchronous boxed values preserve malformed then descriptors for rejection and disposal',ready,async()=>{
 for(const side of ['client','server']){
  let getters=0,disposed=0;
  const malformed=nonce=>Object.defineProperty(disposable(side==='client'?envelope(nonce):observation(),()=>{disposed++;}),'then',{get(){getters++;return resolve=>resolve({});}});
  if(side==='client')await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>({value:malformed(nonce)})}));
  else await assert.rejects(createRetiredRpcReceipt({challenge,now:()=>3000,observe:async()=>({value:malformed(challenge)})}));
  assert.equal(getters,0);assert.equal(disposed,1);
 }
});
test('unboxed asynchronous payloads are denied and released instead of accepting an unsafe transport',ready,async()=>{
 let disposed=0;
 await assert.rejects(readRetiredRpcReceipt({now:()=>3000,assertCurrent(){},invoke:async nonce=>disposable(envelope(nonce),()=>{disposed++;})}));
 assert.equal(disposed,1);
 await assert.rejects(createRetiredRpcReceipt({challenge,now:()=>3000,observe:async()=>observation()}));
});
