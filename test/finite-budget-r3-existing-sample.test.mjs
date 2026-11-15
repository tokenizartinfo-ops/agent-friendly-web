import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readFile,writeFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import vm from 'node:vm';
import {fixedR3SampleControls as C} from './fixtures/finite-budget-world.mjs';
import {extendFiniteOwnerCleanup,finiteBudgetSynAdapterSource,instrumentFiniteOwnerCleanup} from './fixtures/finite-owner-cleanup.mjs';

const expected={source:'a'.repeat(40),run:'123456',attempt:1,case:'R3'};
const names=['historicalCauseProven','receiptAuthenticated','operationalReadiness','completePackage','PCoff','globalNativeDrainVerified','sdkNamespaceEmptyVerified'];
const flags=Object.fromEntries(names.map(k=>[k,false]));
const sample=(n=1)=>({caseName:'R3',input:{entries:199},lists:1,gets:199,nativeInvoked:200,nativeSettled:200,nativeRejected:0,nativeUnsettled:0,outwardPending:2,heldNativeSettled:n,observerInvalid:false,queueObserverInvalid:false,sdkObserverInvalid:false,children:[{childOrdinal:7,family:1,workStatus:'pending',waitStatus:'pending',abortAt:null,parentAliveAtAbort:null,workPendingAtAbort:null,sameWorkWaitError:false}],queueEvents:[{family:1,childOrdinal:7,active:2,queued:199,method:'get'}],heldOperations:[{},{}],phase:{completeWrites:1,completeNormal:1,lookupStage:'entered',authorizePostFinally:'not_seen'}});
async function owned(caseName,body,{pathKind='directory'}={}){
 const root=await mkdtemp(join(tmpdir(),'afw-r3-control-')),path=join(root,'owned'),old={};
 for(const [key,value]of Object.entries({GITHUB_SHA:expected.source,GITHUB_RUN_ID:expected.run,GITHUB_RUN_ATTEMPT:'1'})){old[key]=process.env[key];process.env[key]=value;}
 if(pathKind==='file')await writeFile(path,'blocked');
 try{return await C.withOwner(caseName,path,()=>body(C.frame(),path));}
 finally{for(const [key,value]of Object.entries(old)){if(value===undefined)delete process.env[key];else process.env[key]=value;}await rm(root,{recursive:true,force:true});}
}
const diagnosticPath=p=>join(p,'r3-existing-sample.json');
const readDiagnostic=async p=>{const raw=await readFile(diagnosticPath(p),'utf8');assert(Buffer.byteLength(raw)<=4096);const v=JSON.parse(raw);assert.equal(raw,JSON.stringify(v)+'\n');return v;};
function attach(frame,path,events,primary=null){
 frame.records.push({fixture:{stub:{async finiteBudgetRelease(){events.push('release');const v=await readDiagnostic(path);assert.equal(v.sampleState,'observed');assert.equal(v.sample.heldNativeSettled,2);},async finiteBudgetRestore(){events.push('restore');}}},failures:[],events:[],phases:[],async dispose(){events.push('dispose');},disposed:true,disposalUncertain:false});
 frame.callbacks.push(async()=>{events.push('callback');if(primary)throw primary;});
}
test('R3S01 actual wait retains latest raw read without changing predicate or promise identity',async()=>{
 const first=sample(1),last=sample(2),reads=[],predicates=[];
 await owned('R3',async(frame,path)=>{
  const pauses=[],originalTimer=globalThis.setTimeout;let result;globalThis.setTimeout=(callback,delay,...args)=>{pauses.push(delay);return originalTimer(callback,delay,...args);};try{result=await C.wait(()=>{const value=reads.length?last:first;reads.push(value);return Promise.resolve(value);},value=>{predicates.push(value);return value.heldNativeSettled===2;},Date.now()+1000);}finally{globalThis.setTimeout=originalTimer;}assert.deepEqual(pauses,[20]);
  assert.equal(result,last);assert.deepEqual(reads,[first,last]);assert.equal(predicates[0],first);assert.equal(predicates[1],last);assert.equal(frame.r3Sample.sample.heldNativeSettled,2);
  const events=[];attach(frame,path,events);await C.close(frame,null);assert.deepEqual(events,['release','restore','callback','dispose']);
  const v=await readDiagnostic(path);assert.deepEqual({source:v.source,run:v.run,attempt:v.attempt,case:v.case},expected);assert.deepEqual(v.nonclaims,flags);
 });
});
test('R3S02 actual original deadline and read rejection preserve the exact primary Error',async()=>{
 const primary=new Error('PRIVATE_R3_ERROR');let reads=0,predicates=0,frameRef;
 await assert.rejects(owned('R3',async frame=>{frameRef=frame;await C.wait(()=>{if(++reads===1)return Promise.resolve(sample());return Promise.reject(primary);},()=>{predicates++;return false;},Date.now()+1000);}),e=>e===primary);
 assert.equal(reads,2);assert.equal(predicates,1);assert.equal(frameRef.r3Sample.sample.heldNativeSettled,1);
 let deadline;
 await assert.rejects(owned('R3',async frame=>{frameRef=frame;try{await C.wait(()=>Promise.resolve(sample()),()=>false,0);}catch(e){deadline=e;throw e;}}),e=>e===deadline&&e.code==='ERR_ASSERTION');
 assert.equal(frameRef.r3Sample.sampleState,'observed');assert.equal(deadline.message,'SYN fixed budget observation deadline');
});
test('R3S03 capture is limited to the current owned R3 and source association',async()=>{
 for(const name of ['R1','R2','D4'])await owned(name,async(frame,path)=>{assert.equal(await C.wait(()=>Promise.resolve(sample()),()=>true,0) instanceof Object,true);assert.equal(frame.r3Sample,undefined);await C.close(frame,null);await assert.rejects(readFile(diagnosticPath(path)),{code:'ENOENT'});});
 await owned('R3',async(frame,path)=>{const wrong=sample();wrong.caseName='R2';await C.wait(()=>Promise.resolve(wrong),()=>true,0);assert.equal(frame.r3Sample.sample.heldNativeSettled,'unknown');await C.close(frame,null);assert.equal((await readDiagnostic(path)).sampleState,'observed');});
 for(const [key,value]of [['source','b'.repeat(40)],['run','999'],['attempt',2],['case','R1']])assert.throws(()=>C.encode({...C.blank(expected),[key]:value},expected));
});
test('R3S04 exact closed projection keeps all scalar bounds and rejects unsafe values',()=>{
 const v=C.project(sample());assert.equal(v.inputSeeded,true);assert.equal(v.seedEntries,199);assert.equal(v.selectedChildCount,1);assert.equal(v.selectedChildOrdinal,7);assert.equal(v.lastQueueQueued,199);assert.equal(v.queueCount,1);
 const bounds={lists:2,gets:200,nativeInvoked:202,nativeSettled:202,nativeRejected:202,nativeUnsettled:2,outwardPending:2,heldNativeSettled:2};
 for(const [key,max]of Object.entries(bounds))for(const value of [-1,max+1,NaN,1.5,'1',null,Infinity]){const raw=sample();raw[key]=value;assert.equal(C.project(raw)[key],'unknown',key);}
 for(const [key,max]of Object.entries(bounds)){const raw=sample();raw[key]=max;assert.equal(C.project(raw)[key],max);}
 for(const raw of [undefined,null,{},[],Object.create(sample())])assert.equal(C.project(raw).inputSeeded,'unknown');
 for(const input of [{},{entries:-1},{entries:202},{entries:'1'},Object.defineProperty({},'entries',{get(){throw 1;}})]){const raw=sample();raw.input=input;assert.equal(C.project(raw).inputSeeded,'unknown');assert.equal(C.project(raw).seedEntries,'unknown');}
 const no=sample();no.input=null;assert.equal(C.project(no).inputSeeded,false);assert.equal(C.project(no).seedEntries,'unknown');
 for(const n of [0,201,202]){const raw=sample();raw.input.entries=n;assert.equal(C.project(raw).seedEntries,n<=201?n:'unknown');}
 assert.equal(Object.hasOwn(v,'workWaitOrder'),false);assert.equal(Object.hasOwn(v,'waitAbortOrder'),false);
});
test('R3S05 no accessors proxies iteration serialization hooks or private canaries are observed',()=>{
 let calls=0;const hook=()=>{calls++;throw Error('PRIVATE_R3_CANARY');},raw=sample();
 for(const key of ['token','headers','grant','rows','source','error','stack','privateHash'])raw[key]='PRIVATE_R3_CANARY';
 raw.toJSON=hook;raw.children[0].toJSON=hook;raw.queueEvents[0].toJSON=hook;
 Object.defineProperty(raw,'observerEvents',{get:hook});Object.defineProperty(raw,'lists',{get:hook});Object.defineProperty(raw.input,'entries',{get:hook});
 const proxy=new Proxy(raw,{get:hook,getPrototypeOf:hook,ownKeys:hook,getOwnPropertyDescriptor:hook});
 const projected=C.project(raw);assert.equal(projected.lists,'unknown');assert.equal(C.project(proxy).inputSeeded,'unknown');
 const reversed=Proxy.revocable(raw,{});reversed.revoke();assert.equal(C.project(reversed.proxy).inputSeeded,'unknown');
 const text=C.encode({...C.blank(expected),sampleState:'observed',sample:projected},expected);assert(!text.includes('PRIVATE_R3_CANARY'));assert.equal(calls,0);
});
test('R3S06 selected-child and last-queue projections retain multiple unknown and exact last categories',()=>{
 const raw=sample();raw.children.push({...raw.children[0],childOrdinal:8});let p=C.project(raw);assert.equal(p.selectedChildCount,'multiple');assert.equal(p.selectedChildOrdinal,'unknown');assert.equal(p.childWorkStatus,'unknown');
 raw.children=[];p=C.project(raw);assert.equal(p.selectedChildCount,0);assert.equal(p.childAbortSeen,'unknown');
 raw.children=Array(8).fill({});assert.equal(C.project(raw).selectedChildCount,'multiple');raw.children=Array(9).fill({});assert.equal(C.project(raw).selectedChildCount,'unknown');
 raw.children=sample().children;raw.children[0].abortAt=123;raw.children[0].parentAliveAtAbort=true;raw.children[0].workPendingAtAbort=true;p=C.project(raw);assert.equal(p.childAbortSeen,true);assert.equal(p.parentAliveAtAbort,true);
 raw.queueEvents.push({family:2,childOrdinal:8,active:1,queued:0,method:'delete'});p=C.project(raw);assert.equal(p.queueCount,2);assert.equal(p.lastQueueFamily,2);assert.equal(p.lastQueueMethod,'delete');
 raw.queueEvents=[];p=C.project(raw);assert.equal(p.queueCount,0);assert.equal(p.lastQueueActive,'unknown');
 raw.queueEvents=Array(512).fill({});assert.equal(C.project(raw).queueCount,512);raw.queueEvents=Array(513).fill({});assert.equal(C.project(raw).queueCount,'unknown');
 raw.queueEvents=sample().queueEvents;raw.queueEvents[0].queued=201;assert.equal(C.project(raw).lastQueueQueued,'unknown');
 for(const key of ['workStatus','waitStatus'])for(const value of ['unregistered','pending','fulfilled','rejected','unknown']){raw.children[0][key]=value;assert.equal(C.project(raw)[key==='workStatus'?'childWorkStatus':'childWaitStatus'],value);}
});
test('R3S07 held-operation projection reads only bounded own array length',()=>{
 const raw=sample();for(const n of [0,1,2,3,202,203]){const a=Array(n);for(let i=0;i<Math.min(n,3);i++)Object.defineProperty(a,String(i),{get(){throw 1;}});raw.heldOperations=a;assert.equal(C.project(raw).heldOperationCount,n>202?'unknown':n>2?'multiple':n);}
 for(const a of [{length:2},Object.defineProperty({},'length',{get(){throw 1;}}),new Proxy([], {getOwnPropertyDescriptor(){throw 1;}})]){raw.heldOperations=a;assert.equal(C.project(raw).heldOperationCount,'unknown');}
});
test('R3S08 observed unknown and not-observed states stay distinct canonical and below 4KiB',()=>{
 let calls=0;for(const key of ['source','run']){const bad={toString(){calls++;return key==='source'?'a'.repeat(40):'123456';},toJSON(){calls++;return 'PRIVATE';}},ctx={...expected,[key]:bad};assert.throws(()=>C.encode(C.blank(ctx),ctx));}assert.equal(calls,0);
 const blank=C.blank(expected);assert.equal(blank.sampleState,'not_observed');const a=C.encode(blank,expected);assert(Buffer.byteLength(a)<=4096);
 const observed={...blank,sampleState:'observed',sample:C.project(null)};assert.notEqual(C.encode(observed,expected),a);
 for(const key of Object.keys(blank.sample)){if(key==='phase')assert(Object.values(blank.sample.phase).every(v=>v==='unknown'));else assert.equal(blank.sample[key],'unknown');}
 for(const mutate of [v=>v.token='PRIVATE',v=>v.sample.extra=0,v=>v.sample.phase.extra=0,v=>v.nonclaims.PCoff=true,v=>v.sample.lists=3,v=>{v.sample.inputSeeded=true;v.sample.seedEntries='unknown';},v=>v.run='0'.repeat(21),v=>v.sampleState='unavailable']){const v=structuredClone(blank);mutate(v);assert.throws(()=>C.encode(v,expected));}
});
test('R3S09 actual close preserves sample before release restore callbacks disposal and primary',async()=>{
 const primary=new Error('PRIVATE_PRIMARY'),cleanup=new Error('PRIVATE_CLEANUP'),events=[];
 await assert.rejects(owned('R3',async(frame,path)=>{await C.wait(()=>Promise.resolve(sample(2)),()=>true,0);attach(frame,path,events,cleanup);throw primary;}),e=>{const proof=C.errorFacts(e);assert.equal(e,primary);assert(proof.failures.some(f=>f.error===cleanup));return true;});
 assert.deepEqual(events,['release','restore','callback','dispose']);
});
test('R3S10 failed preservation stays ancillary to original error and cleanup still runs',async()=>{
 const primary=new Error('PRIVATE_PRIMARY'),events=[];let frameRef;
 await assert.rejects(owned('R3',async(frame)=>{frameRef=frame;await C.wait(()=>Promise.resolve(sample(2)),()=>true,0);frame.records.push({fixture:{stub:{async finiteBudgetRelease(){events.push('release');},async finiteBudgetRestore(){events.push('restore');}}},events:[],phases:[],failures:[],disposed:true,async dispose(){events.push('dispose');}});throw primary;},{pathKind:'file'}),e=>{assert.equal(e,primary);assert(C.errorFacts(e).failures.some(f=>f.phase==='r3_sample_preservation'));return true;});
 assert.deepEqual(events,['release','restore','dispose']);assert(frameRef.failures.some(f=>f.phase==='r3_sample_preservation'));
 await assert.rejects(owned('R3',async()=>{await C.wait(()=>Promise.resolve(sample(2)),()=>true,0);},{pathKind:'file'}));
});
test('R3S11 closing before a returned read writes not-observed without fabricated zero',async()=>{
 await owned('R3',async(frame,path)=>{await C.close(frame,null);const v=await readDiagnostic(path);assert.equal(v.sampleState,'not_observed');assert.equal(v.sample.nativeSettled,'unknown');});
});
async function generated(){
 const storage={async get(){},async sync(){},async transaction(fn){return fn({async put(){}});},async list(){return new Map();}},calls=[],kv={async get(...args){calls.push(['get',...args]);return null;},async list(){return {keys:[],list_complete:true};},async put(...args){calls.push(['put',...args]);if(args[0]==='grant:failure')throw new Error('SYN_PUT_FAILURE');},async delete(){}};
 const context=vm.createContext({console,Date,performance,Promise,WeakMap,Map,Set,Buffer,TextEncoder,crypto:globalThis.crypto,AbortController,Request,setTimeout,clearTimeout});
 const base="class FiniteClosure{async fetch(){return new Response(null,{status:302});}} export class Initial extends FiniteClosure{async fetch(request){let actual;actual=super.fetch(request);return actual;}}";
 const code=extendFiniteOwnerCleanup(base)+"\nconst __afwFiniteBudgetFamily='readonly';\n"+finiteBudgetSynAdapterSource+'\nexport const state=owner=>__afwFiniteBudgetStates.get(owner);';
 const stage=new vm.SourceTextModule("export const observeFiniteReadOnlyWork=()=>{};",{context});
 const module=new vm.SourceTextModule(code,{context});await module.link(()=>stage);await module.evaluate();const owner=new module.namespace.Initial();owner.env={AFW_FINITE_OWNER_OAUTH_KV:kv};owner.ctx={storage};
 await owner.finiteBudgetReadonly('R3');return {owner,calls,context,kv,state:module.namespace.state};
}
test('R3S12 actual generated fixture derives four phase leaves and unchanged signal native reads',async()=>{
 const {owner,calls,context}=await generated(),read=async()=>{const before=calls.length,v=await owner.finiteBudgetSignals();assert.equal(calls.length-before,1);assert.equal(calls.at(-1)[0],'get');assert.equal(calls.at(-1)[1],'SYN:finite-budget:foreign');return v.phase;};
 assert.deepEqual(JSON.parse(JSON.stringify(await read())),{completeWrites:0,completeNormal:0,lookupStage:'not_seen',authorizePostFinally:'not_seen'});
 await assert.rejects(owner.env.AFW_FINITE_OWNER_OAUTH_KV.put('grant:failure','{}'));assert.equal((await read()).completeWrites,1);
 owner.ownerReferenceState.completeNormal=1;assert.equal((await read()).completeNormal,1);
 owner.ownerReferenceState.lookupChild=vm.runInContext('({budgetMs:5000})',context);assert.equal((await read()).lookupStage,'entered');
 owner.ownerReferenceState.lookupChild.actualElapsedMs=0;assert.equal((await read()).lookupStage,'unknown');owner.ownerReferenceState.lookupChild.aborted=false;assert.equal((await read()).lookupStage,'exited');
 const s=owner.ownerReferenceState;s.requests.push(vm.runInContext("({method:'POST',startedAt:1,elapsedMs:0,wallElapsedMs:0,budgetMs:5000,aborted:false})",context));assert.equal((await read()).authorizePostFinally,'one');
 s.requests.push(vm.runInContext("({...__r1ReferenceState.requests[0]})",context));assert.equal((await read()).authorizePostFinally,'multiple');s.requests.push(vm.runInContext("({...__r1ReferenceState.requests[0]})",context));assert.equal((await read()).authorizePostFinally,'unknown');
 s.completeWrites=2;s.completeNormal=2;assert.equal((await read()).completeWrites,'multiple');assert.equal((await read()).completeNormal,'multiple');
});
test('R3S13 actual fixture pointer mismatch restore accessors and malformed metric stay unknown',async()=>{
 const {owner,context}=await generated(),allUnknown=async()=>assert(Object.values((await owner.finiteBudgetSignals()).phase).every(v=>v==='unknown'));
 context.__r1ReferenceState={};await allUnknown();context.__r1ReferenceState=owner.ownerReferenceState;owner.ownerReferenceState.mode='other';await allUnknown();owner.ownerReferenceState.mode='normal';
 owner.ownerReferenceState.lookupChild={budgetMs:4999};assert.equal((await owner.finiteBudgetSignals()).phase.lookupStage,'unknown');
 let getters=0;Object.defineProperty(owner.ownerReferenceState,'completeNormal',{get(){getters++;throw 1;}});assert.equal((await owner.finiteBudgetSignals()).phase.completeNormal,'unknown');assert.equal(getters,0);
 owner.ownerReferenceRestore();await allUnknown();
});
test('R3S14 actual POST finally records method while rejection remains a rejection',async()=>{
 const {owner}=await generated(),error=new Error('PRIVATE_FORWARD'),request=new Request('https://afw-private.invalid/_finite-owner/authorize',{headers:{'x-afw-finite-original-method':'POST','x-afw-finite-boundary':JSON.stringify({startedAt:0,deadline:5000})}});
 await assert.rejects(owner.ownerReferenceFetch(request,()=>Promise.reject(error)),e=>e===error);assert.equal((await owner.finiteBudgetSignals()).phase.authorizePostFinally,'one');
});

test('R3S15 actual completion and lookup instrumentation produce the phase markers',async()=>{
 const {owner,context}=await generated();
 const source=String.raw`
 export async function complete(wait,recheckOwned){
  let actualResult,settled=false,position='sdk-start',op='sdk_complete',actualPromise=Promise.resolve('SYN_RESULT');
  actualResult=await wait(actualPromise);settled=true;position='sdk-resolved';await recheckOwned();return actualResult;
 }
 export async function lookup(){
  const ctx={},env={},id='SYN',originalLease={},clock={child:async action=>action({signal:{aborted:false}},5000)};
  let activeChild,position='settled';const check=()=>{};
  const withChild=async action=>clock.child(async(l,until)=>{activeChild=l;try{check();return await action(l,{startedAt:Date.now(),deadline:until});}finally{activeChild=null;}});
  const summary=await withChild(l=>readPrivateQaFiniteOwnerSdkGrant({ctx,env,preconnectionId:id,parent:originalLease},l));return summary;
 }
 async function readPrivateQaFiniteOwnerSdkGrant(){return globalThis.__r3Lookup();}
 async function issuerCall(op,window,call){}
 async function localPreparation(kind,record,call,readBack,rowName,inventorySuffix=null){}
 function pair(){const observedAt=0;(globalThis.__t3Observation??=[]).push({kind:'pair',elapsedMs:performance.now()-observedAt});}
 function body(){const l={},part={value:null},current=()=>{};
 const io={kind:'observer',method:'GET',bytes:0,reads:0,cancelCalls:0,cancelSettled:0,settled:false};
 try{io.reads++;io.bytes+=part.value?.byteLength??0;current(l);}finally{io.settled=true;}}
 `;
 const module=new vm.SourceTextModule(instrumentFiniteOwnerCleanup(source),{context});await module.link(()=>{throw 1;});await module.evaluate();
 const failed=new Error('SYN_RECHECK');await assert.rejects(module.namespace.complete(p=>p,()=>Promise.reject(failed)),e=>e===failed);assert.equal((await owner.finiteBudgetSignals()).phase.completeNormal,0);
 assert.equal(await module.namespace.complete(p=>p,()=>Promise.resolve()),'SYN_RESULT');assert.equal((await owner.finiteBudgetSignals()).phase.completeNormal,1);
 let release;context.__r3Lookup=()=>new Promise(resolve=>{release=resolve;});const result=module.namespace.lookup();assert.equal((await owner.finiteBudgetSignals()).phase.lookupStage,'entered');release('SYN_LOOKUP');assert.equal(await result,'SYN_LOOKUP');assert.equal((await owner.finiteBudgetSignals()).phase.lookupStage,'exited');
});
test('R3S16 signal keeps the original terminal grant-get call and request arguments',async()=>{
 const {owner,calls,state}=await generated();state(owner).grantKey='grant:SYN_OWNED';calls.length=0;
 await owner.finiteBudgetSignals();assert.deepEqual(calls,[['get','SYN:finite-budget:foreign'],['get','grant:SYN_OWNED']]);
});
