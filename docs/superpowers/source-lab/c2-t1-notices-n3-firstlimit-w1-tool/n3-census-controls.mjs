// R4 tooling only: real Root/InitialLease callbacks in isolated observed ledgers.
import {readFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
import {transformN3Lease,transformN3Op} from './n3-qa-compiler.mjs';
const read=name=>readFile(new URL('./'+name,import.meta.url),'utf8');
const url=text=>'data:text/javascript;base64,'+Buffer.from(text).toString('base64');
const B=(ledger,root,entity,lease,ref,parent,role,call=null)=>ledger.note(root,{type:'bind',entity,leaseRef:lease,promiseRef:null,entityRef:ref,parentRef:parent,callRef:call,role});
const setupErrors=new WeakMap();let serial=0;
function setupFailure(phase){const error=Error('N3_CENSUS_SETUP_INVALID');Object.defineProperty(error,'n3SetupPhase',{value:phase,enumerable:true});setupErrors.set(error,phase);return error;}
export function readCensusSetupPhase(value){
 if(value===null||typeof value!=='object'||!setupErrors.has(value))return null;
 const d=Object.getOwnPropertyDescriptor(value,'n3SetupPhase'),phase=setupErrors.get(value);
 return d&&Object.hasOwn(d,'value')&&d.enumerable===true&&d.value===phase?phase:null;
}
const take=(text,start,end)=>{const a=text.indexOf(start),b=text.indexOf(end,a+start.length);assert(a>=0&&b>a&&text.indexOf(start,a+1)<0);return text.slice(a,b);};
export async function environment(t,legacy=false){
 let phase='fixture-read';
 const roots=[],clocks=[],rootRefs=new Set(),clockRefs=new Set();let disposed=false,pairBindings=0,unresolvedClocks=0;
 const cleanup=()=>{if(disposed)return;disposed=true;for(const c of clocks)c.close();for(const r of roots)r.finish();};
 t.after(cleanup); // Registered before imports or actual factories can fail.
 try{
  const [ledgerText,leaseText,opText]=await Promise.all([legacy===true?'legacy-ledger.mjs':legacy==='calibration'?'calibration-ledger.mjs':'n3-qa-ledger.mjs','normal-lease.txt','normal-op.txt'].map(read));
  phase='ledger-import';
  const id=++serial,ledgerUrl=url(ledgerText+'\n// census isolated ledger '+id);
  const withProbe=legacy==='probe'||legacy==='calibration';
  const ledgerImport=withProbe?"import {n3QaLedger as a} from "+JSON.stringify(ledgerUrl)+";":"import {makeN3QaLedger} from "+JSON.stringify(ledgerUrl)+";const a=makeN3QaLedger();";
  const adapter=url(ledgerImport+"export const inputs=[];let overflow=false;export function overflowed(){return overflow;}export const n3QaLedger=Object.freeze({note(root,event){if(inputs.length<4096)inputs.push({root,event});else overflow=true;return a.note(root,event);},snapshot:a.snapshot"+(withProbe?",probeSnapshot:a.probeSnapshot":"")+"});\n// census "+id);
  const observed=await import(adapter),ledger=observed.n3QaLedger;
  phase='lease-transform';
  const leaseResult=transformN3Lease(leaseText),leaseHeader="import {n3QaLedger} from '../test/fixtures/n3-qa-causal-ledger.mjs';";
  assert.equal(leaseResult.contents.split(leaseHeader).length,2);
  phase='lease-import';
  const leaseModule=await import(url(leaseResult.contents.replace(leaseHeader,"import {n3QaLedger} from "+JSON.stringify(adapter)+";")));
  phase='op-transform';
  const opResult=transformN3Op(opText);
  const failure=opText.split('\n').find(l=>l.startsWith('const fail='));
  assert(failure);
  const rootPart=take(opResult.contents,'function requestLease(request,startedAt,wall,deadline){','/** Starts at the actual request entry');
  phase='root-import';
  const rootModule=await import(url("import {n3QaLedger} from "+JSON.stringify(adapter)+";\n"+failure+"\nconst requestContexts=new WeakMap(),stageAdmissions=new WeakMap();\n"+rootPart+"\nexport {requestLease};"));
  phase='root-setup';
  const makeRoot=()=>{const wall=Date.now(),r=rootModule.requestLease(new Request('https://unit.invalid'),wall,wall,wall+30000);roots.push(r);rootRefs.add(r.lease);return r;};
  const makeClock=()=>{const at=Date.now(),c=leaseModule.createFiniteInitialLease(at+30000,at+30000,()=>{},()=>{throw Error('N3_CENSUS_ORIGINAL');});clocks.push(c);clockRefs.add(c.lease);return c;};
  const pair=(root,clock)=>{pairBindings++;B(ledger,root.lease,'lease',root.lease,clock.lease,root.lease,'pair',{});};
  const outer=(root,clock)=>B(ledger,root.lease,'lease',root.lease,clock.lease,root.lease,'outer');
  const unresolved=clock=>{unresolvedClocks++;clock.close();clock.close();clock.close();};
  const census=()=>{
   assert.equal(observed.overflowed(),false);
   const children=new Set(),workPromises=new Set();let retained=0,settlements=0;
   for(const {event:e}of observed.inputs){
    if(e.type==='bind'&&e.entity==='lease'&&e.role==='child')children.add(e.entityRef);
    if(e.type==='bind'&&e.entity==='promise'&&e.role==='child-work')workPromises.add(e.entityRef);
    if(e.type==='event'&&e.kind==='retained')retained++;
    if(e.type==='event'&&e.kind==='settlement-observed')settlements++;
   }
   return {createdRefs:{roots:rootRefs.size,clocks:clockRefs.size,children:children.size,workPromises:workPromises.size},stimuli:{pairBindings,unresolvedClocks},notes:{retained,settlements}};
  };
  return {ledger,inputs:observed.inputs,makeRoot,makeClock,pair,outer,unresolved,cleanup,census};
 }catch{cleanup();throw setupFailure(phase);}
}
function snapshot(a){const s=a.ledger.snapshot();return {state:s.state,coverage:s.coverage,reason:s.reason,eligible:s.eligible,events:s.events.length,cut:s.cut};}
const exact=(actual,expected)=>assert.deepEqual(actual,expected);
function complete(a,vector,snapshots,checks,futureGapPromotionJoined=null){
 a.cleanup();const counts=a.census();
 exact(counts.createdRefs,vector.createdRefs);exact(counts.stimuli,vector.stimuli);exact(counts.notes,vector.notes);exact(snapshots,vector.snapshots);exact(checks,vector.checks);assert.equal(futureGapPromotionJoined,vector.futureGapPromotionJoined);
 return {id:vector.id,observation:{...counts,snapshots,checks:checks.map(id=>({id,passed:true})),futureGapPromotionJoined,actualCensusOfBusiness:false,scopeAdmissionExecuted:false}};
}
async function capacity128(a){
 const root=a.makeRoot(),pairs=[],unknown=[];
 for(let i=0;i<63;i++){const c=a.makeClock();a.pair(root,c);pairs.push(c);}
 for(let i=0;i<64;i++){const c=a.makeClock();a.unresolved(c);unknown.push(c);}
 assert.equal(new Set([root.lease,...pairs.map(c=>c.lease),...unknown.map(c=>c.lease)]).size,128);
 return {root,pairs,unknown};
}
export const censusCases=[
 ['N3_CENSUS_ROOT17',async(t,v)=>{
  const a=await environment(t);for(let i=0;i<16;i++)a.makeRoot();const before=snapshot(a);a.makeRoot();const after=snapshot(a);
  assert.equal(new Set(a.inputs.filter(x=>x.event.type==='bind'&&x.event.role==='root').map(x=>x.event.entityRef)).size,17);
  return complete(a,v,[before,after],['DISTINCT_ROOTS','LEGACY_ROOT17_REFUSED','NO_ELIGIBILITY']);
 }],
 ['N3_CENSUS_IDENTITY129',async(t,v)=>{
  const a=await environment(t),g=await capacity128(a),before=snapshot(a),next=a.makeClock();
  assert(!g.unknown.some(c=>c.lease===next.lease)&&!g.pairs.some(c=>c.lease===next.lease));a.pair(g.root,next);const after=snapshot(a);
  return complete(a,v,[before,after],['DISTINCT_IDENTITY129','SAME_ANCHOR_FOLDED','LEGACY_NEW_IDENTITY_REFUSED']);
 }],
 ['N3_CENSUS_GAP_PROMOTION_AT128',async(t,v)=>{
  const a=await environment(t),g=await capacity128(a),before=snapshot(a),promoted=g.unknown[0],refsBefore=a.census().createdRefs;
  a.outer(g.root,promoted);B(a.ledger,g.root.lease,'scope',g.root.lease,promoted.lease,g.root.lease,'notices');
  const raw=a.ledger.snapshot(),after={state:raw.state,coverage:raw.coverage,reason:raw.reason,eligible:raw.eligible,events:raw.events.length,cut:raw.cut};
  exact(a.census().createdRefs,refsBefore);
  const desired=raw.state==='joined';assert.equal(desired,true);assert.equal(v.futureDesired.desired,true);assert.equal(v.futureDesired.legacyExpected,false);
  return complete(a,v,[before,after],['SAME_REF_PROMOTION','NET_NEW_IDENTITIES_ZERO','CANDIDATE_PROMOTION_JOINED','NO_NATIVE_ADMISSION'],desired);
 }],
 ['N3_CENSUS_PROBE_BEFORE_ELIGIBLE',async(t,v)=>{
  const a=await environment(t);for(let i=0;i<16;i++)a.makeRoot();const first=snapshot(a),again=snapshot(a);exact(first,again);assert.equal(first.cut,null);a.makeRoot();const capped=snapshot(a);
  return complete(a,v,[first,again,capped],['ZERO_ELIGIBLE_CUT_NULL','SNAPSHOT_PREFIX_STABLE','SNAPSHOT_DID_NOT_RESET']);
 }],
 ['N3_CENSUS_FRESH_GET_POST_BOUNDS',async(t,v)=>{
  const a=await environment(t);
  for(const label of ['GET','POST']){
   assert(['GET','POST'].includes(label));const root=a.makeRoot(),outer=a.makeClock();a.outer(root,outer);
   for(let i=0;i<3;i++){const pair=a.makeClock();a.pair(root,pair);for(let j=0;j<2;j++){let original;const value=await pair.child(()=>{original=Promise.resolve(j);return original;});assert.equal(value,j);assert(a.inputs.some(x=>x.event.entity==='promise'&&x.event.entityRef===original));}pair.close();}
   outer.close();root.finish();
  }
  assert.equal(a.inputs.some(x=>x.event.type==='bind'&&x.event.entity==='scope'),false);
  return complete(a,v,[snapshot(a)],['DECLARED_GRAPH_ONLY','NO_PRIVATE_CAP','NO_NATIVE_ELIGIBILITY','ORIGINAL_CHILD_PROMISES']);
 }],
 ['N3_CENSUS_REPEAT_AND_HONEST_CAP',async(t,v)=>{
  const a=await environment(t),root=a.makeRoot(),outer=a.makeClock(),reactions=[];a.outer(root,outer);
  class P extends Promise{then(yes,no){const result=Reflect.apply(Promise.prototype.then,this,[yes,no]);if(yes===no)reactions.push({yes,no,result});return result;}}
  const original=new P(resolve=>resolve(7));assert.equal(await outer.child(()=>original),7);
  assert.equal(reactions.length,2);for(const r of reactions)assert.equal(r.yes,r.no);exact(await Promise.all(reactions.map(r=>r.result)),[true,false]);
  const retained=a.inputs.filter(x=>x.event.kind==='retained'),settled=a.inputs.filter(x=>x.event.kind==='settlement-observed');assert.equal(retained.length,2);assert.equal(settled.length,2);
  for(const x of [...retained,...settled])assert.equal(x.event.promiseRef,original);
  const before=snapshot(a);for(let i=0;i<16;i++)a.makeRoot();const after=snapshot(a);assert.equal(after.cut,null);
  return complete(a,v,[before,after],['SAME_PROMISE_RETAINED_TWICE','ORIGINAL_SETTLED_RETURNS_TRUE_FALSE','HONEST_CAP_UNKNOWN','NO_EVENT_OR_ERROR_ABSENCE_CLAIM']);
 }]
];
