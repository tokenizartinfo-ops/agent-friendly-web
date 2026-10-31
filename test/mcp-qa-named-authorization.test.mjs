import test from 'node:test';
import assert from 'node:assert/strict';
import {createPrivateQaNamedAuthorization} from '../lib/mcp-qa-named-authorization.mjs';
import {createPrivateQaGenerationLedger,createPrivateQaGenerationObserver} from '../lib/mcp-qa-generation-ledger.mjs';
import {createPrivateQaExecutionPin} from '../lib/mcp-qa-execution-identity.mjs';
import {generationFixture,HEAD,INFO,CONTROL} from './fixtures/qa-generation-ledger.mjs';
async function setup(extra={}){
 const f=generationFixture(),ledger=createPrivateQaGenerationLedger(f.options()),armed=await ledger.arm();
 assert.equal(armed.status,'armed');
 const observer=createPrivateQaGenerationObserver({storage:f.storage,capsule:JSON.stringify(f.capsule),now:f.now,timeoutMs:5000});
 const options={executionPin:createPrivateQaExecutionPin({...f.pinOptions,context:'workflow'}),readGeneration:async()=>JSON.stringify(await observer.read()),pins:{planHash:armed.planHash,sequence:armed.sequence,startAt:f.capsule.startAt,expiresAt:f.capsule.expiresAt},now:f.now,timeoutMs:5000,...extra};
 return {f,ledger,observer,options,armed,make:()=>createPrivateQaNamedAuthorization(options)};
}
const invoke=(a,stage='workflow_admission',signal=new AbortController().signal)=>a.authorize(stage,signal);
test('named fence accepts current DO metadata in workflow context without writing history or claiming liveness',async()=>{
 const {f,options,make}=await setup();let reads=0;const read=options.readGeneration;options.readGeneration=async signal=>{assert.ok(signal instanceof AbortSignal);reads++;return read();};
 const rows=structuredClone([...f.rows]),a=make();assert.equal(await invoke(a),true);assert.equal(await invoke(a,'successor_after_write'),true);assert.equal(reads,2,'each stage must reread primary generation');assert.deepEqual([...f.rows],rows);assert.deepEqual(Object.keys(a),['authorize']);
});
test('withdrawal is observed and latched even if someone later restores metadata',async()=>{
 const {f,ledger,make}=await setup(),a=make(),rows=structuredClone([...f.rows]);
 assert.equal(await invoke(a),true);await ledger.withdraw();assert.equal(await invoke(a,'activation_before_attempt'),false);
 f.rows.clear();for(const[k,v]of rows)f.rows.set(k,v);assert.equal(await invoke(a),false,'failed authority cannot revive');
});
test('a later HEAD blocks the earlier generation without comparing the local context to stored DO context',async()=>{
 const {f,ledger,make,armed}=await setup(),a=make();await ledger.withdraw();f.setNow(f.capsule.expiresAt+1);
 f.capsule={...f.capsule,predecessor:{kind:'generation',planHash:armed.planHash,infoHash:armed.infoHash,sequence:armed.sequence},trialId:'8'.repeat(64),grantId:'later-grant',eventId:'9'.repeat(64),startAt:f.now(),expiresAt:f.now()+60000};
 await createPrivateQaGenerationLedger(f.options()).arm();assert.equal(await invoke(a),false);
});
for(const change of [
 r=>({...r,status:'pending',armedAt:null}),r=>({...r,status:'withdrawn',withdrawnAt:r.armedAt}),
 r=>({...r,isHead:false}),r=>({...r,withinWindow:false}),r=>({...r,planHash:'f'.repeat(64)}),
 r=>({...r,sequence:r.sequence+1}),r=>({...r,infoHash:'bad'}),
 r=>({...r,runtimeVersionId:'22222222-2222-4222-8222-222222222222'}),r=>({...r,sourceRevision:'b'.repeat(40)}),
 r=>({...r,storedContext:'workflow'}),r=>({...r,pendingAt:r.armedAt+1}),r=>({...r,armedAt:r.armedAt+1000}),
 r=>({...r,withdrawnAt:0}),r=>({...r,authorizesEffects:true}),r=>({...r,guardLivenessVerified:true}),
 r=>({...r,operationalReadiness:true}),r=>({...r,mayRetry:true}),r=>({...r,foreign:'synthetic-secret'})
])test('contradictory generation DTO cannot pass: '+change.toString(),async()=>{
 const {options,observer,make}=await setup();options.readGeneration=async()=>JSON.stringify(change(await observer.read()));assert.equal(await invoke(make()),false);
});
for(const corrupt of ['head','info','control','orphan'])test('actual primary '+corrupt+' corruption blocks without repair',async()=>{
 const {f,make,armed}=await setup(),a=make();if(corrupt==='head')f.rows.set(HEAD,{});else if(corrupt==='orphan')f.rows.set(INFO+'f'.repeat(64),{});else f.rows.delete((corrupt==='info'?INFO:CONTROL)+armed.planHash);
 const rows=structuredClone([...f.rows]);assert.equal(await invoke(a),false);assert.deepEqual([...f.rows],rows);
});
test('pin drift after awaited primary read blocks and cannot recover',async()=>{
 const {f,options,observer,make}=await setup();options.readGeneration=async()=>{const r=await observer.read();f.env.AFW_QA_VERSION.id='22222222-2222-4222-8222-222222222222';return JSON.stringify(r);};const a=make();assert.equal(await invoke(a),false);f.env.AFW_QA_VERSION.id=f.pinOptions.expectedVersionId;assert.equal(await invoke(a),false);
});
test('parent abort during read is prompt and late successful data stays blocked',async()=>{
 const {options,observer,make}=await setup();let release,child;const gate=new Promise(r=>{release=r;});options.readGeneration=async s=>{child=s;await gate;return JSON.stringify(await observer.read());};const a=make(),parent=new AbortController(),pending=invoke(a,'workflow_admission',parent.signal);parent.abort();assert.equal(await Promise.race([pending,new Promise(r=>setTimeout(()=>r('hung'),180))]),false);assert.equal(child.aborted,true);release();assert.equal(await pending,false);assert.equal(await invoke(a),false);
});
test('five-second child budget is not renewed after an awaited read and late effects remain impossible',async()=>{
 const {f,options,observer,make}=await setup();const at=f.now();options.readGeneration=async()=>{const r=await observer.read();f.setNow(at+5000);return JSON.stringify(r);};assert.equal(await invoke(make()),false);
});
test('hung metadata read is bounded by the original timer and late success is rejected',async()=>{
 const {options,observer,make}=await setup({timeoutMs:30});let release,child;const gate=new Promise(r=>{release=r;});options.readGeneration=async s=>{child=s;await gate;return JSON.stringify(await observer.read());};const a=make(),pending=invoke(a);assert.equal(await Promise.race([pending,new Promise(r=>setTimeout(()=>r('hung'),180))]),false);assert.equal(child.aborted,true);release();assert.equal(await pending,false);
});
test('the original parent window and monotonic origin cannot be renewed between stages',async()=>{
 const {f,make}=await setup(),a=make();assert.equal(await invoke(a),true);f.setNow(f.capsule.expiresAt);assert.equal(await invoke(a),false);f.setNow(f.capsule.startAt);assert.equal(await invoke(a),false);
});
test('callback or options mutation across the read blocks without another read',async()=>{
 const {options,observer,make}=await setup();let calls=0;options.readGeneration=async()=>{calls++;const r=await observer.read();options.readGeneration=async()=>JSON.stringify(r);return JSON.stringify(r);};const a=make();assert.equal(await invoke(a),false);assert.equal(await invoke(a),false);assert.equal(calls,1);
});
for(const raw of ['{','null','{}','x'.repeat(2049),JSON.stringify(JSON.stringify({purpose:'nested'}))])test('unusable RPC text blocks without exposing it '+raw.length,async()=>{
 const {options,make}=await setup();options.readGeneration=async()=>raw;assert.equal(await invoke(make()),false);
});
test('no native object, accessor or borrowed RPC object is treated as a receipt',async()=>{
 for(const kind of ['object','getter','borrowed']){
  const {options,observer,make}=await setup();let touched=0;const value=await observer.read();options.readGeneration=async()=>kind==='object'?value:kind==='getter'?Object.defineProperty({},'status',{get(){touched++;throw Error('private');}}):{[Symbol.dispose](){touched++;}};
  assert.equal(await invoke(make()),false);assert.equal(touched,kind==='borrowed'?1:0);
 }
});
test('invalid calls do not reach the generation reader or borrow cleanup authority',async()=>{
 for(const stage of ['publish','withdraw','qa_arm_before_read','restore','', 'foreign']){
  const {options,make}=await setup();let reads=0;options.readGeneration=async()=>{reads++;throw Error('not called');};assert.equal(await invoke(make(),stage),false);assert.equal(reads,0);
 }
 const {make}=await setup();assert.equal(await make().authorize('workflow_admission'),false);assert.equal(await make().authorize('workflow_admission',new AbortController().signal,'extra'),false);
});
test('constructor refuses unexpected scope and malformed options',async()=>{
 const {options}=await setup();for(const delta of [{timeoutMs:5001},{timeoutMs:0},{extra:true},{readGeneration:null}])assert.throws(()=>createPrivateQaNamedAuthorization({...options,...delta}));
 for(const delta of [{planHash:'bad'},{sequence:0},{expiresAt:options.pins.startAt},{expiresAt:options.pins.startAt+600001}])assert.throws(()=>createPrivateQaNamedAuthorization({...options,pins:{...options.pins,...delta}}));
});

test('successful stages release the old parent listener before the runtime aborts that child signal',async()=>{
 const {make}=await setup(),a=make(),parent=new AbortController();assert.equal(await invoke(a,'workflow_admission',parent.signal),true);parent.abort();assert.equal(await invoke(a,'operator_credential'),true);
});
test('ARM before the named start remains valid once the original named window begins',async()=>{
 const f=generationFixture(),at=f.now();f.capsule.startAt=at+1000;const ledger=createPrivateQaGenerationLedger(f.options()),armed=await ledger.arm();assert.equal(armed.status,'armed');f.setNow(at+1000);
 const observer=createPrivateQaGenerationObserver({storage:f.storage,capsule:JSON.stringify(f.capsule),now:f.now,timeoutMs:5000});
 const a=createPrivateQaNamedAuthorization({executionPin:createPrivateQaExecutionPin({...f.pinOptions,context:'workflow'}),readGeneration:async()=>JSON.stringify(await observer.read()),pins:{planHash:armed.planHash,sequence:armed.sequence,startAt:f.capsule.startAt,expiresAt:f.capsule.expiresAt},now:f.now,timeoutMs:5000});assert.equal(await invoke(a),true);
});
test('overlapping calls latch both unavailable without a second metadata read',async()=>{
 const {options,observer,make}=await setup();let release,reads=0;const gate=new Promise(r=>{release=r;});options.readGeneration=async()=>{reads++;await gate;return JSON.stringify(await observer.read());};const a=make(),first=invoke(a);assert.equal(await invoke(a,'operator_credential'),false);assert.equal(await Promise.race([first,new Promise(r=>setTimeout(()=>r('hung'),180))]),false);release();assert.equal(await first,false);assert.equal(reads,1);
});
test('UTF8 receipt cap precedes parsing, and malformed text never invokes accessors',async()=>{
 const {options,make}=await setup();options.readGeneration=async()=>JSON.stringify({value:'é'.repeat(1100)});assert.equal(await invoke(make()),false);
});
