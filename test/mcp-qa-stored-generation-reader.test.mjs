import test from 'node:test';
import assert from 'node:assert/strict';
import {generationFixture,hash,HEAD,INFO,CONTROL,LEGACY} from './fixtures/qa-generation-ledger.mjs';
import {createPrivateQaGenerationLedger,readPrivateQaStoredGenerationSnapshot} from '../lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaStoredGenerationReader} from '../lib/mcp-qa-stored-generation-reader.mjs';
import {createPrivateQaGenerationResolver} from '../lib/mcp-qa-generation-resolver.mjs';
import {createPrivateQaExecutionPin} from '../lib/mcp-qa-execution-identity.mjs';
import {createPrivateQaNamedAuthorization} from '../lib/mcp-qa-named-authorization.mjs';
const actor='f'.repeat(64),version='22222222-2222-4222-8222-222222222222',source='b'.repeat(40);
const purpose='afw.qa-stored-generation-selection.v1';
const denied=['authorizesEffects','guardLivenessVerified','nativeWithdrawalVerified','operationalReadiness','mayRetry'];
const blocked={purpose,status:'blocked',isHead:false,withinWindow:false,...Object.fromEntries(denied.map(k=>[k,false]))};
const flags=r=>{for(const k of denied)assert.equal(r[k],false);};
const make=o=>createPrivateQaStoredGenerationReader(o);
async function fixture({startOffset=-1000,duration=60000,ancestor=false}={}){
 const f=generationFixture(),at=f.now();f.capsule.startAt=at+startOffset;f.capsule.expiresAt=at+startOffset+duration;
 const ledger=createPrivateQaGenerationLedger(f.options()),first=await ledger.arm();assert.equal(first.status,'armed');
 let last=first;
 if(ancestor){
  await ledger.withdraw();f.setNow(f.capsule.expiresAt+1);
  f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:first.planHash,infoHash:first.infoHash,sequence:1},trialId:'8'.repeat(64),grantId:'next-grant',eventId:'9'.repeat(64),startAt:f.now(),expiresAt:f.now()+60000};
  last=await createPrivateQaGenerationLedger(f.options()).arm();assert.equal(last.status,'armed');
 }
 f.env.AFW_QA_VERSION={id:version};
 f.env.AFW_INDEPENDENT_CLOSURE={idFromName(name){assert.equal(name,'afw-own-successor-closure-v1');return{toString:()=>actor};}};
 const ctx={storage:f.storage,id:{toString:()=>actor}},options={env:f.env,ctx,sourceRevision:source,now:f.now,timeoutMs:5000};
 return {f,first,last,ledger,ctx,options};
}
function wrap(f,ctx,after,adapt=t=>t){
 const base=f.storage;let n=0;
 ctx.storage={transaction:fn=>base.transaction(async t=>{const r=await fn(adapt(t));await after?.(++n,r);return r;})};
}
async function selected(o,plan){
 const r=await make(o).read(plan,undefined);assert.equal(r.status,'selected');flags(r);
 assert.ok(Buffer.byteLength(JSON.stringify(r))<=24576);assert.ok(Object.isFrozen(r));
 assert.deepEqual(Object.keys(r),['purpose','status','capsule','target','head','coherenceHash','isHead','withinWindow','observedAt','storedExecution','readerExecution',...denied]);
 return r;
}
test('actual ledger ancestor selection separates stored and current identity and remains private and read only',async()=>{
 const {f,first,last,options,ctx}=await fixture({ancestor:true}),rows=structuredClone([...f.rows]),puts=f.storage.puts;
 for(const k of ['AFW_QA_DB','AFW_QA_DOSSIER_DB','AFW_MCP_CLOSURE_PUBLISH_TOKEN'])Object.defineProperty(f.env,k,{get(){throw Error('forbidden');}});
 wrap(f,ctx,null,t=>Object.defineProperty({get:t.get,list:t.list},'put',{get(){throw Error('write forbidden');}}));
 const r=await selected(options,first.planHash);
 assert.equal(r.isHead,false);assert.equal(r.withinWindow,false);assert.equal(r.target.phase,'withdrawn');assert.equal(r.head.planHash,last.planHash);
 assert.equal(typeof r.capsule,'string');assert.equal(r.storedExecution.sourceRevision,'a'.repeat(40));assert.equal(r.storedExecution.runtimeVersionId,'11111111-1111-4111-8111-111111111111');
 assert.equal(r.readerExecution.sourceRevision,source);assert.equal(r.readerExecution.runtimeVersionId,version);assert.equal(r.readerExecution.context,'durable_object');
 for(const k of ['target','head','storedExecution','readerExecution'])assert.ok(Object.isFrozen(r[k]));
 assert.equal(Object.isFrozen(options),false);assert.equal(Object.isFrozen(f.env),false);assert.equal(Object.isFrozen(f.rows.get(HEAD)),false);
 assert.deepEqual([...f.rows],rows);assert.equal(f.storage.puts,puts);
 const resolver=createPrivateQaGenerationResolver(options);
 assert.equal(JSON.parse(await resolver.read(first.planHash)).status,'blocked');assert.equal(JSON.parse(await resolver.readRetained(first.planHash)).status,'blocked');
 assert.equal((await createPrivateQaGenerationLedger(f.options()).readArmed()).status,'blocked');
 const pin=createPrivateQaExecutionPin({env:f.env,expectedVersionId:version,sourceRevision:source,context:'workflow'});
 const named=createPrivateQaNamedAuthorization({executionPin:pin,readGeneration:async()=>JSON.stringify(r),pins:{planHash:first.planHash,sequence:1,startAt:JSON.parse(r.capsule).startAt,expiresAt:JSON.parse(r.capsule).expiresAt},now:f.now,timeoutMs:5000});
 assert.equal(await named.authorize('workflow_admission',new AbortController().signal),false);
});
for(const phase of ['pending','armed','withdrawn','expired','before-start'])test('valid current facts: '+phase,async()=>{
 const {f,first,ledger,options}=await fixture(phase==='before-start'?{startOffset:1000}:{});
 const c=f.rows.get(CONTROL+first.planHash);
 if(phase==='pending'){c.phase='pending';c.armedAt=null;}
 if(phase==='withdrawn')await ledger.withdraw();
 if(phase==='expired')f.setNow(f.capsule.expiresAt);
 const r=await selected(options,first.planHash);assert.equal(r.target.phase,phase==='pending'?'pending':phase==='withdrawn'?'withdrawn':'armed');
 assert.equal(r.isHead,true);assert.equal(r.withinWindow,!['expired','before-start'].includes(phase));assert.equal(r.observedAt,f.now());
});
test('snapshot exact schema and independent whole-lineage canonical commitment',async()=>{
 const {f,first,options}=await fixture({ancestor:true}),s=await readPrivateQaStoredGenerationSnapshot({storage:f.storage,generationPlanHash:first.planHash,current:options.now});
 assert.deepEqual(Object.keys(s),['purpose','capsule','target','head','storedExecution','coherenceHash']);
 assert.equal(s.purpose,'afw.qa-stored-generation-snapshot.v1');assert.deepEqual(Object.keys(s.target),['planHash','infoHash','sequence','phase','pendingAt','armedAt','withdrawnAt']);
 const chain=[];let h=f.rows.get(HEAD);
 for(;;){const i=f.rows.get(INFO+h.planHash),c=f.rows.get(CONTROL+h.planHash);chain.push({infoHash:h.infoHash,control:c});const p=JSON.parse(i.capsule).predecessor;if(p.kind==='legacy')break;h=p;}
 const actual=hash('afw.qa-stored-generation-coherence.v1\n'+JSON.stringify({generationPlanHash:first.planHash,head:f.rows.get(HEAD),chain,legacyControlHash:hash(JSON.stringify(f.rows.get(LEGACY)))}));
 assert.equal(s.coherenceHash,actual);assert.ok(Object.isFrozen(s));assert.ok(Object.isFrozen(s.target));
});
for(const drift of ['head-control','target','ancestor','advance','legacy'])test('two snapshots reject complete lineage drift '+drift,async()=>{
 const {f,first,last,ctx,options}=await fixture({ancestor:true});
 if(drift==='head-control'){const c=f.rows.get(CONTROL+last.planHash);c.phase='pending';c.armedAt=null;}
 const plan=drift==='ancestor'?last.planHash:first.planHash;
 wrap(f,ctx,async n=>{if(n!==1)return;
  if(drift==='head-control'){const c=f.rows.get(CONTROL+last.planHash);c.phase='armed';c.armedAt=f.now();}
  if(drift==='target')f.rows.get(CONTROL+plan).withdrawnAt++;
  if(drift==='ancestor')f.rows.get(CONTROL+first.planHash).withdrawnAt++;
  if(drift==='legacy')f.rows.get(LEGACY).withdrawnAt++;
  if(drift==='advance'){
   // A complete, legitimate newer state is prepared on the base storage outside this callback.
   const row=f.rows.get(CONTROL+last.planHash);row.phase='withdrawn';row.withdrawnAt=f.now();
  }
 });
 assert.deepEqual(await make(options).read(plan,undefined),blocked);
});
for(const corrupt of ['unknown','head-absent','info-absent','control-absent','head-corrupt','info-corrupt','control-corrupt','noncanonical','hash','orphan-info','orphan-control','rollback','legacy','foreign'])test('fails closed on '+corrupt,async()=>{
 const {f,first,options}=await fixture({ancestor:corrupt==='rollback'});let plan=first.planHash;
 if(corrupt==='unknown')plan='0'.repeat(64);
 if(corrupt==='head-absent')f.rows.delete(HEAD);
 if(corrupt==='info-absent')f.rows.delete(INFO+plan);
 if(corrupt==='control-absent')f.rows.delete(CONTROL+plan);
 if(corrupt==='head-corrupt')f.rows.get(HEAD).extra=true;
 if(corrupt==='info-corrupt')f.rows.get(INFO+plan).extra=true;
 if(corrupt==='control-corrupt')f.rows.get(CONTROL+plan).extra=true;
 if(corrupt==='noncanonical')f.rows.get(INFO+plan).capsule=' '+f.rows.get(INFO+plan).capsule;
 if(corrupt==='hash')f.rows.get(HEAD).infoHash='e'.repeat(64);
 if(corrupt.startsWith('orphan'))f.rows.set((corrupt==='orphan-info'?INFO:CONTROL)+'e'.repeat(64),{});
 if(corrupt==='rollback')f.rows.set(HEAD,{purpose:HEAD,sequence:1,planHash:plan,infoHash:first.infoHash});
 if(corrupt==='legacy')f.rows.get(LEGACY).withdrawnAt++;
 if(corrupt==='foreign')f.rows.get(INFO+plan).capsule=JSON.stringify({...f.capsule,grantId:'foreign'});
 const before=structuredClone([...f.rows]),puts=f.storage.puts;
 assert.deepEqual(await make(options).read(plan,undefined),blocked);assert.deepEqual([...f.rows],before);assert.equal(f.storage.puts,puts);
});
test('exact factory data and argument grammar rejects accessors prototypes extras and duck signals',async()=>{
 const {options,first}=await fixture();let touched=0;
 const getter={...options};Object.defineProperty(getter,'now',{enumerable:true,get(){touched++;return options.now;}});
 for(const v of [getter,{...options,extra:1},Object.assign(Object.create({}),options),{...options,timeoutMs:5001},{...options,timeoutMs:0},{...options,sourceRevision:'x'}])assert.throws(()=>make(v));
 assert.equal(touched,0);const r=make(options);assert.deepEqual(Object.keys(r),['read']);
 for(const args of [[],[first.planHash],[first.planHash,undefined,1],['bad',undefined],[first.planHash,{}],[first.planHash,{aborted:false}],[first.planHash,null]])assert.deepEqual(await r.read(...args),blocked);
 assert.equal((await r.read(first.planHash,new AbortController().signal)).status,'selected');
});
for(const drift of ['storage','transaction','id','id-method','actor','namespace','select','version-object','version','source','now','timeout','get','list'])test('pins objects methods and options across await '+drift,async()=>{
 const {f,first,ctx,options}=await fixture();let once=false;
 wrap(f,ctx,null,t=>{
  const get=t.get;return {...t,get:async key=>{const v=await get(key);if(!once){once=true;
   if(drift==='storage')ctx.storage={};
   if(drift==='transaction')ctx.storage.transaction=()=>{};
   if(drift==='id')ctx.id={toString:()=>actor};
   if(drift==='id-method')ctx.id.toString=()=>actor;
   if(drift==='actor')ctx.id.toString=()=> 'e'.repeat(64);
   if(drift==='namespace')f.env.AFW_INDEPENDENT_CLOSURE={};
   if(drift==='select')f.env.AFW_INDEPENDENT_CLOSURE.idFromName=()=>({toString:()=>actor});
   if(drift==='version-object')f.env.AFW_QA_VERSION={id:version};
   if(drift==='version')f.env.AFW_QA_VERSION.id='33333333-3333-4333-8333-333333333333';
   if(drift==='source')options.sourceRevision='c'.repeat(40);
   if(drift==='now')options.now=()=>f.now();
   if(drift==='timeout')options.timeoutMs=4000;
  }return v;}};
 });
 if(['get','list'].includes(drift)){
  wrap(f,ctx,null,t=>{const o={...t},get=t.get;o.get=async k=>{const v=await get(k);o[drift]=async()=>undefined;return v;};return o;});
 }
 assert.deepEqual(await make(options).read(first.planHash,undefined),blocked);
});
test('native pin is established before first transaction and forbidden accessors are not invoked',async()=>{
 for(const field of ['storage','id','metadata','version','namespace','transaction']){
  const {f,first,ctx,options}=await fixture();let touched=0;const before=f.storage.transactions;
  const target=field==='storage'||field==='id'?ctx:field==='version'?f.env.AFW_QA_VERSION:field==='transaction'?f.storage:f.env;
  const key={metadata:'AFW_QA_VERSION',version:'id',namespace:'AFW_INDEPENDENT_CLOSURE'}[field]??field;
  Object.defineProperty(target,key,{enumerable:true,configurable:true,get(){touched++;throw Error('private');}});
  assert.deepEqual(await make(options).read(first.planHash,undefined),blocked);assert.equal(touched,0);assert.equal(f.storage.transactions,before);
 }
});
for(const when of ['before','first','second'])test('true parent cancellation is terminal '+when,async()=>{
 const {f,first,ctx,options}=await fixture(),parent=new AbortController();
 if(when==='before')parent.abort();else wrap(f,ctx,n=>{if(n===(when==='first'?1:2))parent.abort();});
 assert.deepEqual(await make(options).read(first.planHash,parent.signal),blocked);
});
for(const clock of ['deadline','backwards','parent'])test('original wall or parent-fenced budget blocks '+clock,async()=>{
 const {f,first,ctx,options}=await fixture(),at=f.now();let exhausted=false;
 options.now=()=>{if(exhausted)throw Error('parent exhausted');return f.now();};
 wrap(f,ctx,n=>{if(n===1){if(clock==='parent')exhausted=true;else f.setNow(clock==='deadline'?at+5000:at-1);}});
 assert.deepEqual(await make(options).read(first.planHash,undefined),blocked);
});
for(const stage of [1,2])test('hung transaction '+stage+' returns at original monotonic deadline and fences late private work',async()=>{
 const {f,first,ctx,options}=await fixture();let release,n=0,reads=0;const gate=new Promise(r=>{release=r;}),base=f.storage;
 ctx.storage={transaction:fn=>base.transaction(async t=>{if(++n===stage)await gate;return fn({...t,get:async k=>{reads++;return t.get(k);}});})};options.timeoutMs=25;
 try{const r=await make(options).read(first.planHash,undefined);assert.deepEqual(r,blocked);const before=reads;release();await new Promise(r=>setTimeout(r,10));assert.equal(reads,before);}finally{release();}
});
for(const boundary of ['start','expiry','short'])test('interval segments reject '+boundary+' crossing between snapshots',async()=>{
 const input=boundary==='expiry'?{duration:2000}:boundary==='short'?{startOffset:1,duration:1}:{startOffset:1000};
 const {f,first,ctx,options}=await fixture(input);wrap(f,ctx,n=>{if(n===1)f.setNow(boundary==='start'?f.capsule.startAt:f.capsule.expiresAt);});
 assert.deepEqual(await make(options).read(first.planHash,undefined),blocked);
});
for(const drift of ['wall','version','abort','short','expiry','mono'])test('outer final settlement fence '+drift,async()=>{
 const input=drift==='short'?{startOffset:1,duration:1}:drift==='expiry'?{duration:1000}:{};
 const {f,first,options}=await fixture(input),parent=new AbortController(),race=Promise.race,at=f.now(),original=Object.getOwnPropertyDescriptor(performance,'now');let changed=false;
 Promise.race=function(values){return Reflect.apply(race,this,[values]).then(r=>{if(!changed&&r?.purpose===purpose&&r.status==='selected'){changed=true;
  if(drift==='wall')f.setNow(at+5000);
  if(drift==='version')f.env.AFW_QA_VERSION={id:version};
  if(drift==='abort')parent.abort();
  if(drift==='short'||drift==='expiry')f.setNow(f.capsule.expiresAt);
  if(drift==='mono')Object.defineProperty(performance,'now',{configurable:true,value:()=>1e12});
 }return r;});};
 try{assert.deepEqual(await make(options).read(first.planHash,parent.signal),blocked);assert.equal(changed,true);}
 finally{Promise.race=race;if(original)Object.defineProperty(performance,'now',original);else delete performance.now;}
});
test('snapshot execution uses the separately owned value actually hashed, never mutable info.execution',async()=>{
 const {f,first,options}=await fixture(),base=f.storage;let raw;
 const storage={transaction:fn=>base.transaction(t=>fn({get:async k=>{const v=await t.get(k);if(k===INFO+first.planHash)raw=v;return v;},list:async o=>{const r=await t.list(o);if(raw)raw.execution.sourceRevision='e'.repeat(40);return r;}}))};
 const s=await readPrivateQaStoredGenerationSnapshot({storage,generationPlanHash:first.planHash,current:options.now});
 assert.equal(s.storedExecution.sourceRevision,'a'.repeat(40));assert.equal(raw.execution.sourceRevision,'e'.repeat(40));assert.equal(Object.isFrozen(raw.execution),false);
 assert.throws(()=>{s.storedExecution.sourceRevision='f'.repeat(40);});
});
test('returned data remains detached from subsequent primary mutation',async()=>{
 const {f,first,options}=await fixture(),r=await selected(options,first.planHash),before=JSON.stringify(r);
 f.rows.get(INFO+first.planHash).execution.sourceRevision='e'.repeat(40);f.rows.get(CONTROL+first.planHash).phase='pending';
 assert.equal(JSON.stringify(r),before);assert.throws(()=>{r.target.phase='pending';});
});
