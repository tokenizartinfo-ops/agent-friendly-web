// R4 diagnostics, invoked only by the two pinned native tooling entry points.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {environment} from './n3-census-controls.mjs';
const vectors=JSON.parse(await readFile(new URL('./r4-vectors.json',import.meta.url),'utf8'));
const expectedFailures=new WeakMap();
export const redEvidence=error=>expectedFailures.get(error);
const bind=(ledger,root,entity,anchor,ref,parent,role)=>ledger.note(root,{
 type:'bind',entity,leaseRef:anchor,promiseRef:null,entityRef:ref,parentRef:parent,callRef:null,role
});
function enter(ledger,root,outer){
 bind(ledger,root,'scope',root,outer,root,'notices');
 ledger.note(root,{type:'event',kind:'scope-enter',site:'choice-admitted',leaseRef:root,promiseRef:null,
  entityRef:root,errorPresent:false,errorRef:undefined,cause:null});
}
async function full(t,{legacy=false,withOuter=false,secondRoot=false}={}){
 const a=await environment(t,legacy),r=a.makeRoot(),other=secondRoot?a.makeRoot():null;
 const outer=withOuter?a.makeClock():null;
 if(outer)a.outer(r,outer);
 const pairCount=63-Number(Boolean(outer))-Number(Boolean(other));
 const refs=new Set([r.lease]);
 if(other)refs.add(other.lease);
 if(outer)refs.add(outer.lease);
 for(let i=0;i<pairCount;i++){const c=a.makeClock();a.pair(r,c);refs.add(c.lease);}
 const gaps=[];
 for(let i=0;i<64;i++){const c=a.makeClock();gaps.push(c);a.unresolved(c);refs.add(c.lease);}
 assert.equal(refs.size,128);
 const initial=a.ledger.snapshot();assert.equal(initial.reason,'NO_ELIGIBLE');assert.equal(initial.cut,null);
 return {a,r,other,outer,x:gaps[0]};
}
const small=s=>({state:s.state,coverage:s.coverage,reason:s.reason,eligible:s.eligible,target:s.target,
 firstError:s.firstError,events:s.events.map(e=>e.kind),cut:s.cut});
function checkLegacy(raw,expectedEligible){
 assert.deepEqual(small(raw),{state:'unjoined',coverage:'unknown',reason:'CAP_PRIVATE',eligible:expectedEligible,
  target:'unknown',firstError:null,events:[],cut:null});
 for(const key of ['leases','promises','errors'])assert.equal(raw[key].length,0);
}
export async function discriminator(t,index,legacy){
 const vector=vectors.cases[index];
 const {a,r,outer,x}=await full(t,{legacy,withOuter:index!==0});
 if(index===1){
  const before=a.inputs.length;
  assert.throws(()=>x.lease.assertCurrent());
  assert(a.inputs.slice(before).some(({event})=>event.kind==='check-threw'&&event.errorPresent&&event.entityRef===x.lease));
 }
 if(index===0){a.outer(r,x);a.outer(r,x);}else{a.pair(r,x);a.pair(r,x);}
 enter(a.ledger,r.lease,(outer??x).lease);
 const raw=a.ledger.snapshot(),observed=small(raw),desired=vector.after;
 if(legacy)checkLegacy(raw,vector.before.eligible);
 const actual={state:raw.state,coverage:raw.coverage,reason:raw.reason,eligible:raw.eligible,firstError:raw.firstError,
  events:raw.events.map(e=>e.kind),cut:raw.cut};
 const expected=Object.fromEntries(Object.keys(actual).map(k=>[k,desired[k]]));
 try{assert.deepEqual(actual,expected);}
 catch(error){
  if(legacy&&error?.code==='ERR_ASSERTION'){
   expectedFailures.set(error,{id:'BEFORE_'+vector.id,code:vector.red,observed,desired:expected});
  }
  throw error;
 }
 assert.equal(raw.target,'unreached');
 assert.deepEqual(raw.leases.map(l=>[l.ordinal,l.role,l.parent,l.firstClose]),[[1,'root',null,null],[2,'outer',1,null]]);
 assert.deepEqual(raw.events.map(e=>e.sequence),[1,2]);
 assert.equal(raw.errors.length,0);assert.equal(raw.promises.length,0);
 if(index===0){const copy=JSON.stringify(raw);assert.equal(a.ledger.snapshot().cut,desired.nextCut);assert.equal(JSON.stringify(raw),copy);}
 assert.equal(a.census().createdRefs.roots,1);assert.equal(a.census().createdRefs.clocks,127);
 return {id:vector.id,observed,created:{roots:1,clocks:127},cardinalityBefore:128,syntheticScope:true};
}
async function noBorrow(t){
 const first=await full(t),{a,r,x}=first,fresh=a.makeClock();
 bind(a.ledger,r.lease,'lease',x.lease,fresh.lease,r.lease,'outer');
 const afterFresh=a.ledger.snapshot().reason;
 a.outer(r,x);enter(a.ledger,r.lease,x.lease);const sticky=a.ledger.snapshot().reason;
 const second=await full(t);
 second.a.outer(second.r,second.x);second.a.outer(second.r,second.x);
 enter(second.a.ledger,second.r.lease,second.x.lease);
 assert.equal(second.a.ledger.snapshot().reason,'PREBIND_GAP');
 second.a.pair(second.r,second.a.makeClock());
 const afterNew=second.a.ledger.snapshot();assert.equal(afterNew.eligible,1);
 const reasons=[afterFresh,sticky,afterNew.reason];assert.deepEqual(reasons,vectors.cases[3].after);
 return {id:vectors.cases[3].id,reasons};
}
async function validation(t){
 const reasons=[];
 for(const kind of ['wrong-role','missing-parent','cross-scope-parent']){
  const {a,r,other,x}=await full(t,{secondRoot:kind==='cross-scope-parent'});
  const parent=kind==='missing-parent'?null:other?.lease??r.lease;
  bind(a.ledger,r.lease,'lease',r.lease,x.lease,parent,kind==='wrong-role'?'unlisted':'outer');
  a.outer(r,x);enter(a.ledger,r.lease,x.lease);
  const result=a.ledger.snapshot();assert.equal(result.state,'joined');assert.equal(result.eligible,1);
  assert.equal(result.leases[1].role,'outer');reasons.push(result.reason);
 }
 {
  const a=await environment(t),r=a.makeRoot(),x=a.makeClock();a.outer(r,x);enter(a.ledger,r.lease,x.lease);
  a.pair(r,x);reasons.push(a.ledger.snapshot().reason);
  const other=a.makeRoot();a.outer(other,x);a.outer(r,x);const conflict=a.ledger.snapshot();
  assert.equal(conflict.state,'ambiguous');reasons.push(conflict.reason);
 }
 {
  const a=await environment(t),p=Promise.resolve(7);
  for(let i=0;i<2;i++){
   const r=a.makeRoot(),o=a.makeClock();a.outer(r,o);
   if(i===0)enter(a.ledger,r.lease,o.lease);
   const value=await o.child(l=>{bind(a.ledger,r.lease,'lease',r.lease,l,o.lease,'activation-child');return p;});
   assert.equal(value,7);
  }
  const conflict=a.ledger.snapshot();assert.equal(conflict.state,'ambiguous');reasons.push(conflict.reason);
 }
 assert.deepEqual(reasons,vectors.cases[4].after);
 return {id:vectors.cases[4].id,reasons};
}
async function below(t){
 const {makeN3QaLedger}=await import('./n3-qa-ledger.mjs');const api=makeN3QaLedger();
 assert.deepEqual(Object.keys(api),['note','snapshot']);assert(Object.isFrozen(api));
 const a=await environment(t),r=a.makeRoot(),x=a.makeClock(),first=a.ledger.snapshot(),again=a.ledger.snapshot();
 assert.deepEqual(first,again);assert.equal(first.cut,null);a.unresolved(x);a.outer(r,x);enter(a.ledger,r.lease,x.lease);
 assert.throws(()=>x.lease.assertCurrent());
 const one=a.ledger.snapshot(),saved=JSON.stringify(one),two=a.ledger.snapshot();
 assert.equal(two.cut,one.cut+1);assert.equal(one.firstError,2);assert.equal(two.firstError,2);assert.equal(JSON.stringify(one),saved);
 const r2=a.makeRoot(),o=a.makeClock();a.outer(r2,o);enter(a.ledger,r2.lease,o.lease);const multi=a.ledger.snapshot();
 const reasons=[first,again,one,two,multi].map(s=>s.reason);assert.deepEqual(reasons,vectors.cases[5].after);
 assert.equal(multi.state,'ambiguous');assert.equal(multi.eligible,2);
 return {id:vectors.cases[5].id,reasons,firstError:one.firstError,cuts:[one.cut,two.cut]};
}
export const repairCases=[
 ...vectors.cases.slice(0,3).map((v,i)=>[v.id,t=>discriminator(t,i,false)]),
 [vectors.cases[3].id,noBorrow],[vectors.cases[4].id,validation],[vectors.cases[5].id,below]
];
