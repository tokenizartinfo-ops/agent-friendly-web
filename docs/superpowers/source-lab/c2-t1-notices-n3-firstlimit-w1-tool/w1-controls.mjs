// Original factory callbacks and sealed v2 replay controls. Synthetic tooling admission only.
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {environment} from './n3-census-controls.mjs';
import {transformN3Entry} from './n3-qa-compiler.mjs';
import {n3TraceReplay as defaultReplay} from './n3-trace-reader.mjs';
import {n3TraceReplay as standaloneReplay} from './w1-trace-reader.mjs';
import {n3TraceReplay,readObservation,safeWitness,verifyFirstLimitProfile} from './w1-reader.mjs';
const read=name=>readFile(new URL('./'+name,import.meta.url),'utf8');
const declared=JSON.parse(await read('w1-native-vectors.json')),wire=JSON.parse(await read('first-limit-vectors.json'));
const ids=declared.cases.map(x=>x.id);
function eligible(a,r=a.makeRoot(),o=a.makeClock()){
 a.outer(r,o);
 a.ledger.note(r.lease,{type:'bind',entity:'scope',leaseRef:r.lease,promiseRef:null,entityRef:o.lease,parentRef:r.lease,callRef:null,role:'notices'});
 a.ledger.note(r.lease,{type:'event',kind:'scope-enter',site:'choice-admitted',leaseRef:r.lease,promiseRef:null,entityRef:r.lease,errorPresent:false,errorRef:undefined,cause:null});
 return {r,o};
}
function capPair(a,expected,eligibleCount=0){
 const old=a.ledger.snapshot(),tag=a.ledger.probeSnapshot();
 assert.equal(old.reason,'CAP_PRIVATE');assert.equal(tag.reason,expected);assert.equal(tag.eligible,eligibleCount);
 assert.deepEqual({...tag,reason:'CAP_PRIVATE'},old);assert.equal(tag.state,'unjoined');assert.equal(tag.coverage,'unknown');
 assert.equal(tag.cut,null);assert.equal(tag.firstError,null);assert.equal(tag.events.length,0);
 return tag.reason;
}
async function rootLimit(t){
 const a=await environment(t,'probe');for(let i=0;i<16;i++)a.makeRoot();
 assert.equal(a.ledger.probeSnapshot().reason,'NO_ELIGIBLE');a.makeRoot();
 const first=capPair(a,'CAP_PRIVATE_ROOT16');
 for(let i=0;i<128;i++)a.unresolved(a.makeClock());
 assert.equal(a.ledger.probeSnapshot().reason,first);assert.equal(a.census().createdRefs.roots,17);
 return {first,roots:17,laterGapCannotReplace:true};
}
async function newGap(t){
 const a=await environment(t,'probe');for(let i=0;i<128;i++)a.unresolved(a.makeClock());
 assert.equal(a.ledger.probeSnapshot().reason,'NO_ELIGIBLE');a.unresolved(a.makeClock());
 return {first:capPair(a,'CAP_PRIVATE_GAP_NEW128'),clocks:a.census().createdRefs.clocks};
}
async function newLease(t){
 const a=await environment(t,'probe'),r=a.makeRoot();
 for(let i=0;i<127;i++)a.pair(r,a.makeClock());
 assert.equal(a.ledger.probeSnapshot().reason,'NO_ELIGIBLE');a.pair(r,a.makeClock());
 return {first:capPair(a,'CAP_PRIVATE_LEASE_NEW128'),roots:1,clocks:a.census().createdRefs.clocks};
}
async function sameGap(t){
 const reasons=[];
 for(const mode of ['calibration','probe']){
  const a=await environment(t,mode),r=a.makeRoot(),gaps=[];
  for(let i=0;i<63;i++)a.pair(r,a.makeClock());
  for(let i=0;i<64;i++){const c=a.makeClock();a.unresolved(c);gaps.push(c);}
  eligible(a,r,gaps[0]);const s=a.ledger.probeSnapshot();reasons.push(s.reason);
  if(mode==='calibration'){capPair(a,'CAP_PRIVATE_LEGACY_SAME_GAP128');assert.equal(n3TraceReplay(s).valid,false);}
  else{assert.equal(s.state,'joined');assert.equal(s.coverage,'prefix');assert.equal(s.eligible,1);assert.equal(s.firstError,null);assert(n3TraceReplay(s).valid);}
 }
 assert.deepEqual(reasons,['CAP_PRIVATE_LEGACY_SAME_GAP128','PREBIND_GAP']);return {reasons};
}
async function otherLimit(t){
 const a=await environment(t,'probe'),{r,o}=eligible(a);
 for(let i=0;i<65;i++)a.ledger.note(r.lease,{type:'event',kind:'check-threw',site:'initial-holders',leaseRef:o.lease,promiseRef:null,
  entityRef:o.lease,errorPresent:true,errorRef:Error('synthetic'),cause:null});
 const first=capPair(a,'CAP_PRIVATE_OTHER',1);
 const b=await environment(t,'probe');eligible(b);let last;
 for(let expected=2;expected<=4096;expected++){last=b.ledger.probeSnapshot();assert.equal(last.cut,expected);}
 assert.equal(last.cut,4096);const cutReason=capPair(b,'CAP_PRIVATE_OTHER',1);
 return {first,errorsSupplied:65,lastCut:last.cut,cutReason};
}
async function precedence(t){
 const invalid=await environment(t,'probe');invalid.ledger.note(null,{type:'invalid'});
 for(let i=0;i<17;i++)invalid.makeRoot();assert.equal(invalid.ledger.probeSnapshot().reason,'INVALID_EVENT');
 const a=await environment(t,'probe'),{r,o}=eligible(a),r2=a.makeRoot(),o2=a.makeClock();a.outer(r2,o2);
 const d=a.ledger.snapshot(),original=JSON.stringify(d),p=a.ledger.probeSnapshot();assert.equal(p.cut,d.cut+1);assert.equal(JSON.stringify(d),original);
 for(let i=0;i<15;i++)a.makeRoot();capPair(a,'CAP_PRIVATE_ROOT16',1);
 eligible(a,r2,o2);assert.equal(a.ledger.probeSnapshot().reason,'MULTIPLE_ELIGIBLE');
 a.outer(r2,o);assert.equal(a.ledger.probeSnapshot().reason,'AMBIGUOUS_BINDING');
 assert.notEqual(r.lease,r2.lease);
 const normal=(await import('./n3-qa-ledger.mjs')).makeN3QaLedger();assert.deepEqual(Object.keys(normal),['note','snapshot']);
 return {noncap:'INVALID_EVENT',multiple:'MULTIPLE_ELIGIBLE',conflict:'AMBIGUOUS_BINDING',cuts:[d.cut,p.cut]};
}
async function probeMethod(t){
 const a=await environment(t,'probe');eligible(a);
 const raw=await read('normal-publication.txt'),method=raw.split('\n').find(l=>l.startsWith(' async firstConnectionProbe(){')).trim();
 const compilation=transformN3Entry(method),header="import {n3QaLedger} from './test/fixtures/n3-qa-causal-ledger.mjs';\n";
 assert(compilation.contents.startsWith(header));const body=compilation.contents.slice(header.length);
 const mark="alarm:await this.ctx.storage.getAlarm(),causal:n3QaLedger.probeSnapshot()";assert.equal(body.split(mark).length,2);
 assert.equal(body.replace(',causal:n3QaLedger.probeSnapshot()',''),method);
 const source="export function bind(n3QaLedger){return class{"+body+"};}";
 const factory=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64')),calls=[];
 const fixture=new (factory.bind({snapshot(){throw Error('UNEXPECTED_DEFAULT');},probeSnapshot(){calls.push('probe');return a.ledger.probeSnapshot();}}))();
 fixture.ctx={storage:{async list(){calls.push('list');return [];},async getAlarm(){calls.push('alarm');return null;}}};
 const one=await fixture.firstConnectionProbe(),two=await fixture.firstConnectionProbe();
 assert.deepEqual(calls,['list','alarm','probe','list','alarm','probe']);assert.deepEqual([one.causal.cut,two.causal.cut],[2,3]);
 return {calls,cuts:[2,3]};
}
async function grid(){
 const schema=JSON.parse(await read('w1-schema.json'));
 assert.equal(schema.properties.selectionHash.const,wire.wireSelection.sha256);
 assert.equal(schema.properties.journal.properties.witness.properties.records.items.oneOf[0].properties.selectionHash.const,wire.wireSelection.sha256);
 assert.equal(schema.$defs.snapshot.properties.reason.enum.includes('CAP_PRIVATE'),false);
 let accepted=0,rejected=0,maxEnvelope=0;
 for(const v of wire.positive){
  for(const decode of [standaloneReplay,n3TraceReplay]){const r=decode(v.snapshot);assert(r.valid);assert.deepEqual(r.summary,v.summary);}
  assert.equal(defaultReplay(v.snapshot).valid,false);
  const size=Buffer.byteLength(JSON.stringify({sequence:128,elapsedMs:180000,kind:'causal',schema:'afw.c2-notices-n3.causal-record.v1',snapshot:v.snapshot})+'\n');
  assert(size<=6144);maxEnvelope=Math.max(maxEnvelope,size);accepted++;
 }
 for(const v of wire.negative){assert.equal(n3TraceReplay(v.snapshot).valid,false);assert.equal(standaloneReplay(v.snapshot).valid,false);rejected++;}
 assert.equal(accepted,8);assert.equal(rejected,14);return {accepted,rejected,maxEnvelope};
}
async function transports(){
 const corpus=JSON.parse(await read('n3-vectors.json')),v=JSON.parse(await read('w1-selection.json')),canonical=wire.wireSelection.sha256;
 const job=v.actualNomination.job,base=wire.positive[0].snapshot,alternate='CAP_PRIVATE_GAP_NEW128';
 function outcome({reason=base.reason,summaryReason=reason,selection=canonical,contextJob=job,schema='afw.c2-notices-n3.observation.v2'}={}){
  const rows=structuredClone(corpus.core.base.records),binding={...corpus.core.binding,selectionHash:selection};
  rows[0].selectionHash=selection;const causal=rows.find(row=>row.kind==='causal');assert(causal);
  causal.snapshot={...base,reason};const raw=Buffer.from(rows.map(row=>JSON.stringify(row)+'\n').join(''));
  const observation=readObservation(raw,binding),witness=safeWitness(raw,binding,'normal',false);
  assert(observation.valid);assert.equal(witness.prefixBytes,raw.length);assert.equal(observation.causal.reason,reason);
  observation.causal={...observation.causal,reason:summaryReason};
  // Only the projected fields inspected by the producer publication verifier. OWN covers full frame and ZIP.
  return JSON.parse(JSON.stringify({schema,selectionHash:selection,context:{job:contextJob},custody:{context:{job:contextJob}},journal:{witness},observation}));
 }
 assert(verifyFirstLimitProfile(outcome()));assert(verifyFirstLimitProfile(outcome({reason:alternate})));
 const negative=[{summaryReason:alternate},{selection:wire.transportMutations[1].selectionHash},{contextJob:wire.transportMutations[2].job},{schema:wire.transportMutations[3].schema}];
 for(const options of negative)assert.equal(verifyFirstLimitProfile(outcome(options)),false);
 return {coherentRejected:negative.length,coherentAccepted:2,scope:'Source journal and publication projection'};
}
const bodies=[rootLimit,newGap,newLease,sameGap,otherLimit,precedence,probeMethod,grid,transports];
export const firstLimitCases=ids.map((id,index)=>[id,async t=>({id,observed:await bodies[index](t)})]);
