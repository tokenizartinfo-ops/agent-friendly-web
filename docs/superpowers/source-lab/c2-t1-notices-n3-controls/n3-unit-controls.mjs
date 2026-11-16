// Tooling-only native units. No Miniflare/world/SDK/dependency installation.
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {transformN3Lease,transformN3Op,transformN3Phase,transformN3Entry} from './n3-qa-compiler.mjs';
import {n3TraceReplay} from './n3-trace-reader.mjs';
const read=name=>readFile(new URL('./'+name,import.meta.url),'utf8');
const sha=s=>createHash('sha256').update(s).digest('hex');
const object=v=>v!==null&&typeof v==='object';
let serial=0;
const B=(ledger,root,entity,lease,ref,parent,role,call=null)=>ledger.note(root,{type:'bind',entity,leaseRef:lease,promiseRef:null,entityRef:ref,parentRef:parent,callRef:call,role});
const E=(ledger,root,kind,site,lease,entity,promise=null,errorPresent=false,errorRef=undefined,cause=null)=>ledger.note(root,{type:'event',kind,site,leaseRef:lease,promiseRef:promise,entityRef:entity,errorPresent,errorRef,cause});
const url=s=>'data:text/javascript;base64,'+Buffer.from(s).toString('base64');
const take=(text,start,end)=>{const a=text.indexOf(start),b=text.indexOf(end,a+start.length);if(a<0||b<0||text.indexOf(start,a+1)>=0)throw Error('N3_UNIT_SEAM_INVALID');return text.slice(a,b);};
async function actual(t){
 const [ledgerText,leaseText,opText,phText]=await Promise.all(['n3-qa-ledger.mjs','normal-lease.txt','normal-op.txt','normal-phase.txt'].map(read));
 const id=++serial,ledgerUrl=url(ledgerText+'\n// isolated tooling ledger '+id),actualLedger=await import(ledgerUrl),inputs=[];
 // Test-only adapter counts inputs to the actual helper. No production callback/reaction is replaced.
 const adapter=url("import {makeN3QaLedger} from "+JSON.stringify(ledgerUrl)+";const a=makeN3QaLedger();export const inputs=[];export const n3QaLedger=Object.freeze({note(root,event){inputs.push({root,event});return a.note(root,event);},snapshot:a.snapshot});\n// "+id);
 const adapted=await import(adapter),ledger=adapted.n3QaLedger;
 const leaseAfter=transformN3Lease(leaseText).contents.replace("import {n3QaLedger} from '../test/fixtures/n3-qa-causal-ledger.mjs';","import {n3QaLedger} from "+JSON.stringify(adapter)+";");
 const leaseModule=await import(url(leaseAfter));
 const opAfter=transformN3Op(opText).contents;
 const failure=opText.split('\n').find(l=>l.startsWith('const fail='));
 const rootPart=take(opAfter,'function requestLease(request,startedAt,wall,deadline){','/** Starts at the actual request entry');
 const rootModule=await import(url("import {n3QaLedger} from "+JSON.stringify(adapter)+";\n"+failure+"\nconst requestContexts=new WeakMap(),stageAdmissions=new WeakMap();\n"+rootPart+"\nexport {requestLease};"));
 const abortSource=transformN3Phase(phText).contents;
 const originalController=new AbortController(),wall=Date.now(),root=rootModule.requestLease(new Request('https://unit.invalid',{signal:originalController.signal}),wall,wall,wall+30000);
 const clocks=[],make=(holders=()=>{},fail=()=>{throw Error('N3_UNIT_ORIGINAL');})=>{const at=Date.now(),c=leaseModule.createFiniteInitialLease(at+30000,at+30000,holders,fail);clocks.push(c);return c;};
 const outer=make();B(ledger,root.lease,'lease',root.lease,outer.lease,root.lease,'outer');
 B(ledger,root.lease,'scope',root.lease,outer.lease,root.lease,'notices');E(ledger,root.lease,'scope-enter','choice-admitted',root.lease,root.lease);
 t.after(()=>{for(const c of clocks)c.close();root.finish();});
 const attach=(role,clock)=>{
  let original;
  if(role==='pair'){
   const text=take(abortSource,'parentSignal=signal;onAbort=()=>{',';current(clock.lease);');
   original="let parentSignal,onAbort;"+text+";return onAbort;";
   return import(url("import {n3QaLedger} from "+JSON.stringify(adapter)+";export function attach(root,parent,signal,clock){"+original+"}")).then(m=>m.attach(root.lease,root.lease,root.lease.signal,clock));
  }
  const text=take(abortSource,'onAbort=()=>{clock.close();n3QaLedger.note(originalLease,','\n    const check=()=>');
  return import(url("import {n3QaLedger} from "+JSON.stringify(adapter)+";export function attach(originalLease,clock){let onAbort;"+text+"return onAbort;}")).then(m=>m.attach(root.lease,clock));
 };
 return {ledger,inputs:adapted.inputs,root,outer,make,originalController,attach,leaseText,opText,phText,leaseAfter,opAfter,abortSource,actualLedger};
}
const bindAct=(a,l)=>B(a.ledger,a.root.lease,'lease',a.root.lease,l,a.outer.lease,'activation-child');
function target(a,l,kind,errorPresent=false,errorRef=undefined){E(a.ledger,a.root.lease,kind,'postreceipt-check',a.root.lease,l,null,errorPresent,errorRef);}
function targetPair(a,act,clock,call={}){
 B(a.ledger,a.root.lease,'call',a.root.lease,null,null,'target',call);
 B(a.ledger,a.root.lease,'lease',a.root.lease,clock.lease,a.root.lease,'pair',call);
 E(a.ledger,a.root.lease,'pair-enter','target-pair',a.root.lease,clock.lease);
 return call;
}
const deferred=()=>{let resolve,reject;const promise=new Promise((a,b)=>{resolve=a;reject=b;});return {promise,resolve,reject};};
function thrownSync(work){let threw=false,value;try{work();}catch(error){threw=true;value=error;}return {threw,value};}
async function thrown(work){let threw=false,value;try{await work();}catch(error){threw=true;value=error;}return {threw,value};}
export const unitCases=[
 ['N3_NOTE_SYNC_NO_RPC',async t=>{const a=await actual(t);const r=E(a.ledger,a.root.lease,'logical-return','choice-return',a.root.lease,a.outer.lease);assert.equal(r,undefined);assert.equal(a.ledger.snapshot().state,'joined');}],
 ...[[null,'NULL'],[undefined,'UNDEFINED'],[false,'FALSE'],[0,'ZERO'],['','EMPTY_STRING']].map(([value,label])=>['N3_ORIGINAL_'+label,async t=>{const a=await actual(t),fail=()=>{throw value;};let reject=false;const c=a.make(()=>{if(reject)throw value;},fail);B(a.ledger,a.root.lease,'lease',a.root.lease,c.lease,a.root.lease,'pair',{});reject=true;const got=thrownSync(()=>c.lease.assertCurrent());assert(got.threw);assert(Object.is(got.value,value));}]),
 ['N3_ORIGINAL_OBJECT',async t=>{const a=await actual(t);for(const original of [Error('private'),Object.freeze({}),()=>{throw Error('MUST_NOT_CALL');}]){let reject=false;const c=a.make(()=>{if(reject)throw original;});B(a.ledger,a.root.lease,'lease',a.root.lease,c.lease,a.root.lease,'pair',{});reject=true;const got=thrownSync(()=>c.lease.assertCurrent());assert(got.threw);assert.equal(got.value,original);}assert.equal(a.ledger.snapshot().firstError!==null,true);}],
 ['N3_PROMISE_IDENTITY',async t=>{const a=await actual(t),d=deferred();let actualPromise;const done=a.outer.child(l=>{bindAct(a,l);actualPromise=d.promise;return actualPromise;});d.resolve(7);assert.equal(await done,7);const notes=a.inputs.filter(x=>['retained','settlement-observed'].includes(x.event.kind)&&x.event.promiseRef===actualPromise);assert.equal(notes.filter(x=>x.event.kind==='retained').length,2);assert.equal(notes.filter(x=>x.event.kind==='settlement-observed').length,2);assert.equal(a.ledger.snapshot().promises[0].lease,3);}],
 ['N3_EXISTING_SETTLED_HANDLER',async t=>{const a=await actual(t),reactions=[];class P extends Promise{then(yes,no){const result=Reflect.apply(Promise.prototype.then,this,[yes,no]);if(yes===no)reactions.push({yes,no,result});return result;}}const p=new P(resolve=>resolve(9));let seen;const out=await a.outer.child(l=>{bindAct(a,l);seen=p;return p;});assert.equal(out,9);assert.equal(seen,p);assert.equal(reactions.length,2);assert.equal(reactions[0].yes,reactions[0].no);assert.deepEqual(await Promise.all(reactions.map(x=>x.result)),[true,false]);assert.equal(a.ledger.snapshot().events.filter(x=>x.kind==='settlement-observed').length,1);}],
 ['N3_ROOT_IDENTITY',async t=>{const a=await actual(t);assert.equal(a.ledger.note(()=>{},{}),undefined);const s=a.ledger.snapshot();assert.equal(s.eligible,1);assert.equal(s.leases[0].role,'root');}],
 ['N3_REALM_RESET',async t=>{const a=await actual(t),b=await actual(t);assert.notEqual(a.root.lease,b.root.lease);assert.equal(a.ledger.snapshot().leases[0].ordinal,1);assert.equal(b.ledger.snapshot().leases[0].ordinal,1);}],
 ['N3_CROSS_SCOPE_LEASE',async t=>{const a=await actual(t),other={};B(a.ledger,other,'lease',other,other,null,'root');B(a.ledger,other,'lease',other,a.outer.lease,other,'outer');assert.equal(a.ledger.snapshot().state,'ambiguous');}],
 ['N3_SHARED_PROMISE',async t=>{const a=await actual(t),one={},two={},p=Promise.resolve();bindAct(a,one);B(a.ledger,a.root.lease,'promise',a.root.lease,p,one,'child-work');const root2={},outer2={};B(a.ledger,root2,'scope',root2,outer2,root2,'notices');B(a.ledger,root2,'lease',root2,two,outer2,'activation-child');B(a.ledger,root2,'promise',root2,p,two,'child-work');assert.equal(a.ledger.snapshot().state,'ambiguous');}],
 ['N3_NULL_BOUND_REF',async t=>{const a=await actual(t);E(a.ledger,null,'check-threw','initial-holders',a.outer.lease,a.outer.lease,null,true,Error('private'));assert.equal(a.ledger.snapshot().firstError!==null,true);}],
 ['N3_PREBIND_GAP',async t=>{const a=await actual(t),l={};E(a.ledger,null,'check-threw','initial-child',l,l,null,true,null);B(a.ledger,a.root.lease,'lease',a.root.lease,l,a.outer.lease,'activation-child');const s=a.ledger.snapshot();assert.equal(s.coverage,'prefix');assert.equal(s.reason,'PREBIND_GAP');assert.equal(s.firstError,null);}],
 ['N3_PAIR_FORK',async t=>{const a=await actual(t),act={};bindAct(a,act);target(a,act,'target-enter');const pair=a.make();targetPair(a,act,pair);const s=a.ledger.snapshot();assert.equal(s.leases.find(x=>x.role==='target-pair').parent,1);assert.equal(s.leases.find(x=>x.role==='activation-child').parent,2);}],
 ['N3_FIRST_TARGET_ONLY',async t=>{const a=await actual(t);const r=transformN3Phase(a.phText);assert.equal(r.edits.filter(x=>x.before==="position='receipt-recorded';await recheckOwned();position='complete';await recheckOwned();").length,1);assert.equal(r.contents.split("n3TargetSeen=true;n3TargetActive=true;").length,2);assert(r.contents.includes("else await recheckOwned();position='complete';await recheckOwned();"));}],
 ['N3_SCOPE_ERROR_A_CHILD_B',async t=>{const a=await actual(t),act={},child={},errorA={},errorB={};bindAct(a,act);target(a,act,'target-enter');const pair=a.make();targetPair(a,act,pair);E(a.ledger,a.root.lease,'check-threw','initial-child',a.root.lease,{},null,true,errorA);B(a.ledger,a.root.lease,'lease',a.root.lease,child,pair.lease,'child');E(a.ledger,null,'check-threw','initial-child',pair.lease,child,null,true,errorB);const s=a.ledger.snapshot();assert.equal(s.firstError,s.events.find(x=>x.error.present).sequence);assert.equal(s.errors.length,2);assert.equal(s.focus.selection,'first-check-threw');}],
 ['N3_REPEATED_CLOSE',async t=>{const a=await actual(t);a.outer.close();a.outer.close();const s=a.ledger.snapshot();assert.equal(s.events.filter(x=>x.kind==='close-call').length,2);assert.equal(s.events.filter(x=>x.kind==='closed-transition').length,1);}],
 ['N3_CUT_LATE_SETTLEMENT',async t=>{const a=await actual(t),d=deferred();const done=a.outer.child(l=>{bindAct(a,l);return d.promise;});const before=a.ledger.snapshot(),serialized=JSON.stringify(before);d.resolve(1);await done;const after=a.ledger.snapshot();assert.equal(JSON.stringify(before),serialized);assert.equal(before.promises[0].settlement,null);assert.notEqual(after.promises[0].settlement,null);}],
 ['N3_SINK_FAULT',async t=>{const a=await actual(t);let getters=0;const e=Object.defineProperty({},'type',{get(){getters++;throw Error('private');}});assert.equal(a.ledger.note(a.root.lease,e),undefined);assert.equal(getters,0);assert.equal(a.ledger.snapshot().reason,'SINK_FAULT');const original={};let reject=false;const c=a.make(()=>{if(reject)throw original;});reject=true;assert.equal(thrownSync(()=>c.lease.assertCurrent()).value,original);}],
 ['N3_PRIVATE_CAP',async t=>{const a=await actual(t);const other=a.make(),call={};B(a.ledger,a.root.lease,'lease',a.root.lease,other.lease,a.root.lease,'pair',call);for(let i=0;i<500;i++){E(a.ledger,null,'retained','initial-retain',other.lease,null,{});E(a.ledger,null,'child-finally','initial-child-finally',other.lease,{},null,false,undefined,'finally');}const clean=a.ledger.snapshot();assert.equal(clean.events.length,2);assert.equal(clean.coverage,'complete');E(a.ledger,null,'check-threw','initial-child',other.lease,{},null,true,Error('private'));assert.notEqual(a.ledger.snapshot().firstError,null);for(let i=0;i<17;i++)B(a.ledger,{},'lease',{}, {},null,'root');assert.equal(a.ledger.snapshot().reason,'CAP_PRIVATE');assert.equal(a.outer.lease.signal.aborted,false);}],
 ['N3_SNAPSHOT_CAP',async t=>{const a=await actual(t),act={},pair=a.make();bindAct(a,act);target(a,act,'target-enter');const call=targetPair(a,act,pair);for(let i=0;i<6;i++)E(a.ledger,a.root.lease,'logical-throw','choice-catch',a.root.lease,a.outer.lease,null,true,{});const s=a.ledger.snapshot();assert.equal(s.reason,'CAP_SNAPSHOT');assert.equal(s.coverage,'unknown');}],
 ['N3_WORST_SIZE',async t=>{const a=await actual(t);const vectors=JSON.parse(await read('n3-reducer-vectors.json'));for(const x of vectors.cases){const record={sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:x.expected};assert(Buffer.byteLength(JSON.stringify(record)+'\n')<=6144);assert(n3TraceReplay(x.expected).valid);}const raw=JSON.stringify(a.ledger.snapshot());assert(!raw.includes('private'));}],
 ['N3_REPEATED_RETAIN_FIRST_OBSERVATION',async t=>{const a=await actual(t),d=deferred();const work=a.outer.child(l=>{bindAct(a,l);return d.promise;});const one=a.ledger.snapshot();d.resolve(8);await work;const two=a.ledger.snapshot(),p=two.promises[0];assert.equal(p.retained,one.promises[0].retained);assert.equal(two.events.filter(e=>e.kind==='retained').length,1);assert.equal(two.events.filter(e=>e.kind==='settlement-observed').length,1);}],
 ['N3_ABORT_NESTED_OBSERVER_ORDER',async t=>{const a=await actual(t);await a.attach('outer',a.outer);a.originalController.abort();const s=a.ledger.snapshot(),close=s.events.find(e=>e.kind==='closed-transition'&&e.lease===2),rootAbort=s.events.find(e=>e.kind==='abort-observed'&&e.site==='root-abort');assert(close&&rootAbort&&close.sequence<rootAbort.sequence);}],
 ['N3_BOUND_PAIR_COVERAGE',async t=>{const a=await actual(t),act={},pair=a.make();bindAct(a,act);target(a,act,'target-enter');const call=targetPair(a,act,pair),internal=Promise.resolve(1);async function exactReturned(){return await internal;}const returned=exactReturned();B(a.ledger,a.root.lease,'promise',a.root.lease,returned,null,'pair-return',call);await a.outer.wait(returned);pair.close();target(a,act,'target-return');const s=a.ledger.snapshot();assert.notEqual(returned,internal);assert.equal(s.promises.length,1);assert.equal(s.promises[0].lease,4);assert.equal(s.coverage,'complete');}],
 ['N3_PREPAIR_FAILURE_AND_UNBOUND',async t=>{const a=await actual(t),act={};bindAct(a,act);target(a,act,'target-enter');target(a,act,'target-throw',true,null);const s=a.ledger.snapshot();assert.equal(s.coverage,'complete');assert.equal(s.promises.length,0);assert.equal(s.target,'threw');}],
 ['N3_ACTUAL_CHILD_ABORT_MATRIX',async t=>{const a=await actual(t),d=deferred();const done=a.outer.child(l=>{bindAct(a,l);return d.promise;});const caught=thrown(()=>done);a.outer.close();const result=await caught;assert(result.threw);d.resolve(1);await d.promise;const s=a.ledger.snapshot(),child=s.leases.find(x=>x.role==='activation-child');assert(s.events.some(e=>e.kind==='abort-observed'&&e.site==='initial-child'&&e.lease===child.ordinal));assert(s.events.some(e=>e.kind==='child-finally'&&e.lease===child.ordinal));assert.equal(child.firstClose,null);}],
 ['N3_ACTUAL_PARENT_ABORT_MATRIX',async t=>{const a=await actual(t),act={},pair=a.make();bindAct(a,act);target(a,act,'target-enter');targetPair(a,act,pair);await a.attach('outer',a.outer);await a.attach('pair',pair);a.originalController.abort();const s=a.ledger.snapshot();for(const site of ['outer-parent-abort','pair-parent-abort']){const e=s.events.find(e=>e.kind==='abort-observed'&&e.site===site);assert(e);assert(s.events.some(x=>x.kind==='closed-transition'&&x.lease===e.lease&&x.sequence<e.sequence));}}],
 ['N3_NESTED_ABORT_ORDER',async t=>{const a=await actual(t),act={},pair=a.make();bindAct(a,act);target(a,act,'target-enter');targetPair(a,act,pair);await a.attach('outer',a.outer);await a.attach('pair',pair);a.originalController.abort();const s=a.ledger.snapshot();assert(s.events.find(e=>e.site==='root-abort').sequence>s.events.find(e=>e.site==='pair-parent-abort').sequence);assert.equal(s.target,'entered');assert.equal(s.coverage,'prefix');}],
 ['N3_UNREACHED_ACTIVATION',async t=>{const a=await actual(t),d=deferred();const done=a.outer.child(l=>{bindAct(a,l);return d.promise;});const s=a.ledger.snapshot();assert.equal(s.target,'unreached');assert(s.leases.some(x=>x.role==='activation-child'));assert(s.promises.length===1);d.resolve(1);await done;}]
];
export async function runAxisCallback(t){
 const a=await actual(t),start=deferred(),targetHold=deferred(),original={};
 let actualAction,childLease;
 const done=a.outer.child(l=>{
  childLease=l;bindAct(a,l);
  actualAction=(async()=>{await start.promise;target(a,l,'target-enter');try{await targetHold.promise;target(a,l,'target-return');}catch(error){target(a,l,'target-throw',true,error);throw error;}})();
  return actualAction;
 });
 start.resolve();await new Promise(resolve=>setImmediate(resolve));
 const caught=thrown(()=>done);a.outer.close();const logical=await caught;assert(logical.threw);
 E(a.ledger,a.root.lease,'logical-throw','choice-catch',a.root.lease,a.outer.lease,null,true,logical.value);
 const before=a.ledger.snapshot();assert.equal(before.target,'entered');assert.equal(before.coverage,'prefix');const first=before.firstError;
 targetHold.reject(original);await thrown(()=>actualAction);
 const after=a.ledger.snapshot();assert.equal(after.target,'threw');assert.equal(after.firstError,first);assert(after.events.find(e=>e.kind==='logical-throw').sequence<after.events.find(e=>e.kind==='target-throw').sequence);
}

export async function runReducerCallbacks(t){
 const a=await actual(t),start=deferred(),childHold=deferred(),pairStarted=deferred();
 let pair,pairReturned,pairChildPromise,activationPromise,activationLease;
 await a.attach('outer',a.outer);
 const activationDone=a.outer.child(l=>{
  activationLease=l;bindAct(a,l);
  activationPromise=(async()=>{
   await start.promise;target(a,l,'target-enter');
   pair=a.make();const call=targetPair(a,l,pair);
   await a.attach('pair',pair);
   pairReturned=(async()=>{try{return await pair.child(child=>{
    pairChildPromise=(async()=>{await childHold.promise;child.assertCurrent();return 1;})();
    return pairChildPromise;
   });}finally{pair.close();}})();
   B(a.ledger,a.root.lease,'promise',a.root.lease,pairReturned,null,'pair-return',call);
   const waiting=a.outer.wait(pairReturned,l);pairStarted.resolve();
   try{const v=await waiting;target(a,l,'target-return');return v;}catch(error){target(a,l,'target-throw',true,error);throw error;}
  })();
  return activationPromise;
 });
 const logicalCapture=thrown(()=>activationDone);
 start.resolve();await pairStarted.promise;
 a.originalController.abort();
 const logical=await logicalCapture;assert(logical.threw);
 E(a.ledger,a.root.lease,'logical-throw','choice-catch',a.root.lease,a.outer.lease,null,true,logical.value);
 await thrown(()=>activationPromise);await thrown(()=>pairReturned);
 a.outer.close();a.root.finish();
 const countInputs=()=>{
  const retained=new Set(),settled=new Set();let recorded=0;
  for(const {event:e}of a.inputs)if(e.type==='event'){
   if(e.kind==='retained'){if(retained.has(e.promiseRef))continue;retained.add(e.promiseRef);}
   if(e.kind==='settlement-observed'){if(settled.has(e.promiseRef))continue;settled.add(e.promiseRef);}
   recorded++;
  }
  return recorded+1; // actual copied snapshot-cut only, not an invented stored event
 };
 const raw=countInputs(),before=a.ledger.snapshot();
 assert.equal(raw,31);assert.equal(before.events.length,24);assert.equal(before.coverage,'prefix');assert.equal(before.reason,'PROJECTION_GAP');assert(n3TraceReplay(before).valid);
 const pairRow=before.leases.find(x=>x.role==='target-pair'),p=before.promises.find(x=>x.lease===pairRow.ordinal),first=before.firstError,focus=before.focus.pairChild;
 assert(p&&p.retained!==null&&p.settlement!==null);assert.equal(before.promises.length,1);
 childHold.resolve();await thrown(()=>pairChildPromise);
 const lateRaw=countInputs(),late=a.ledger.snapshot();
 assert.equal(lateRaw,34);assert.equal(late.events.length,24);assert.equal(late.coverage,'prefix');assert.equal(late.reason,'PROJECTION_GAP');assert(n3TraceReplay(late).valid);
 assert.equal(late.firstError,first);assert.equal(late.focus.pairChild,focus);assert.equal(late.focus.selection,'first-check-threw');assert.equal(late.promises[0].settlement,p.settlement);
 return {rawIncludingCut:raw,projected:before.events.length,lateRawIncludingCut:lateRaw,lateProjected:late.events.length,firstScopeErrorPreserved:true,focusPreserved:true,exactPairPromisePreserved:true,allBounds:true};
}
