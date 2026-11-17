// MODEL controls. Real snapshot observer, host and publisher with in-memory inputs.
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Response as DispatchResponse } from 'miniflare';
import { encodeFinitePreparationRecord, hashFinitePreparationRecord } from './lib/mcp-qa-finite-preparation-records.mjs';
import { createFiniteSnapshotObserver } from './test/fixtures/finite-coupled-native.mjs';
import { collectObservation, normalizeGetWinner } from './get-winner-collection-adapters.mjs';
import { createGetWinnerHost } from './test/fixtures/finite-first-connection-publication.mjs';
import { adaptFrozenCorpus } from './test-corpus-adapter.mjs';
const parentProjectionIds=["H-joined","H-wrong-window","H-old-marker","H-duplicate-marker","H-missing-marker","H-wrong-case-marker","H-reordered-marker","H-torn-journal-before-count","H-body-read-reject","H-wrong-site","H-GET-pass-DROP-fails","H-later-truncation","H-earlier-native-failure"];
const hostOnlyIds=["H-lost","H-stale","H-late","H-duplicate","H-overlap","H-case16","H-prior-same-code","H-foreign-main","H-substituted-label","H-changed-label","H-header-getter","H-missing-field","H-stripped","H-duplicate-header","H-combined-header","H-malformed","H-range","H-foreign-status","H-copy-all","H-mount-drift"];
const heldHostIds=["H-foreign-response","H-torn-marker","H-earlier-journal-failure"];
const unknown=()=>({case:'15:firstFiniteGET',winner:'UNKNOWN',stubStatus:'UNKNOWN',qaLastCompleted:'UNKNOWN'});
const file=name=>readFile(new URL(name,import.meta.url));
function collect(base,input,raw,actual) {
 const rows=structuredClone([...base.journalPrefix,...input.targetJournal]);
 for(const delta of input.priorJournalDelta??[])rows[delta.index]=delta.value;
 let prefix=base.tapPrefix,suffix='';
 for(const delta of input.priorNativeDelta??[]){
  const prior=base.nativePrefix[delta.index],ordinal=delta.index+1;
  const before=(prior.status==='pass'?'ok ':'not ok ')+ordinal+' - '+prior.id+'\n';
  const after=(delta.value.status==='pass'?'ok ':'not ok ')+ordinal+' - '+delta.value.id+'\n';
  assert.equal(prefix.split(before).length,2);prefix=prefix.replace(before,after);
  const sourceLines=prefix.split('\n').filter(line=>line.startsWith('# C2SOURCE ')&&JSON.parse(line.slice(11)).id===delta.value.id);
  assert.equal(sourceLines.length,1);
  const source=JSON.parse(sourceLines[0].slice(11));
  source.status=delta.value.status;source.code=source.status==='fail'?'TEST_FAILED':'OK';
  prefix=prefix.replace(sourceLines[0],'# C2SOURCE '+JSON.stringify(source));
 }
 if(input.private?.trailingAfterTarget==='unclosed 18 outside closed target prefix'){
  for(const index of [15,16]){
   for(const [operation,edge]of [['action','enter'],['action','return'],['count','enter'],['count','return']]){
    const sequence=rows.length+1;
    rows.push({sequence,elapsedMs:sequence*2,id:base.ids[index],operation,edge,error:null});
   }
   suffix+='# Subtest: '+base.ids[index]+'\n'+'ok '+(index+1)+' - '+base.ids[index]+'\n';
  }
  const sequence=rows.length+1;
  rows.push({sequence,elapsedMs:sequence*2,id:base.ids[17],operation:'action',edge:'enter',error:null});
  suffix+='# Subtest: '+base.ids[17]+'\n';
 }
 const journal=Buffer.from(rows.map(r=>JSON.stringify(r)+'\n').join(''));
 const drop=input.dropWinner?.outer!=='UNKNOWN'&&input.dropWinner?
  '# C2DW4 '+JSON.stringify(input.dropWinner)+'\n':'';
 const before=input.private?.windowAfterSourceOrdinal===15?'':raw;
 const after=input.private?.windowAfterSourceOrdinal===15?raw:'';
 const stdout=prefix+drop+before+base.targetSource+after+
  base.targetHttpTapBeforeActual+actual+base.targetHttpTapAfterActual+suffix;
 return collectObservation({stdout:Buffer.from(stdout),stderr:Buffer.alloc(0),status:1,signal:null},journal,base.ids);
}
async function driveHost(p,ids,mains,start,finish,ResponseType) {
 const labels=new Map(),responses=new Map(),tokens=new Map();
 for(const name of ['t1','t2','old']){
  const inv=p.invocations.find(x=>x.label===name);
  labels.set(name,{id:ids[(inv?.ordinal??15)-1]});
 }
 function begin(name){
  const {label,token}=start(labels.get(name));
  if(label)labels.set(name,label);
  tokens.set(name,token);
 }
 begin('t1');
 if(p.finished.close==='expired-before-response')finish(labels.get('t1'));
 for(const inv of p.invocations){
  if(inv.label==='t2')begin('t2');
  if(!responses.has(inv.response)){
   const r=new ResponseType(null,{status:inv.status});
   if(inv.readBody==='fulfilled')assert.equal(await r.text(),'');
   if(inv.header==='THREW')Object.defineProperty(r,'headers',{get(){throw new Error('model header getter');}});
   else for(const value of inv.header)r.headers.append('x-afw-lab-get-winner',value);
   responses.set(inv.response,r);
  }
  if(inv.readBody==='fulfilled')tokens.get(inv.label)?.capture(mains.get(inv.main),responses.get(inv.response),inv.status);
 }
 const label=labels.get(p.finished.label);
 if(p.finished.close==='mutated')label.id='C2T1_FINITE';
 if(p.finished.close!=='expired-before-response')finish(label);
 return label;
}

async function modelHost(p,ids) {
 const mains=new Map([['m1',{}],['m2',{}]]);
 const host=createGetWinnerHost(mains.get('m1'),()=>p.directPremise&&p.producerQualified,Response);
 const label=await driveHost(p,ids,mains,label=>({label,token:host.begin(label)}),host.finish,Response);
 return host.take(label,mains.get(p.finished.main))??{w:'U',s:0,h:0};
}

function modelSnapshot() {
 const context={projectRef:'a'.repeat(64),preconnectionId:'b'.repeat(64),subjectHash:'c'.repeat(64),sourceRevision:'d'.repeat(40)};
 const project={...context,projectId:'synthetic-project',revision:1,issuedAt:1,expiresAt:100};
 const connectionRef='e'.repeat(64);
 const records=[['owner-project-ref:'+project.projectRef,'ProjectRef',project]];
 for(const [index,action] of ['connection','notices','finite'].entries()){
  const ticketHash=String(index+1).repeat(64);
  const ticket={...context,purpose:'afw.finite-owner-ticket.v1',ticketHash,
   connectionRef:action==='connection'?null:connectionRef,action,createdAt:10+10*index,expiresAt:100};
  const key='owner-ticket:'+ticketHash;
  records.push([key,'Ticket',ticket]);
  if(action!=='finite')records.push([key+':use','TicketUse',{purpose:'afw.finite-owner-ticket-use.v1',
   ticketHash,recordHash:hashFinitePreparationRecord('Ticket',ticket),consumedAt:ticket.createdAt+1}]);
 }
 return {context,rows:records.map(([key,kind,value])=>[key,encodeFinitePreparationRecord(kind,value)])};
}

function frameCountMessage(message,id) {
 assert.equal(typeof message,'string',id);
 return '# '+message+'\n';
}

async function captureCountMarker(p,ids,snapshot,id) {
 const {context,rows}=snapshot;
 let snapshotReads=0;
 const shared={choice:{projectRef:context.projectRef},source:{sourceRevision:context.sourceRevision},
  uploads:[null,null,null],activations:[null,null],stub:{snapshot(){snapshotReads++;return rows;}}};
 const main={...shared,getWinnerDirect:()=>p.directPremise&&p.producerQualified};
 const mains=new Map([['m1',main],['m2',{...shared}]]),messages=[];
 const observer=createFiniteSnapshotObserver(main,()=>mains.get(p.finished.main),message=>messages.push(message));
 await driveHost(p,ids,mains,({id})=>{
  const label=observer.enter(id);
  return {label,token:label?observer.getToken(label):null};
 },observer.finish,DispatchResponse);
 assert.equal(snapshotReads,0,id);
 assert.deepEqual(messages,[],id);
 assert.deepEqual(await observer.counts(),{upload:2,activation:1,receipts:0},id);
 assert.equal(snapshotReads,1,id);
 assert(messages.length<=1,id);
 if(messages.length===0)return null;
 const [message]=messages;
 const framed=frameCountMessage(message,id);
 if(id==='H-joined'){
  const wrongType={code:'ERR_ASSERTION',actual:'object',expected:'string'};
  assert.throws(()=>frameCountMessage([message],id),wrongType,id);
  assert.throws(()=>frameCountMessage(Buffer.from(message),id),wrongType,id);
 }
 return framed;
}
export async function modelControls() {
 const manifest=await file('test-corpus-transformation.json');
 const baseRaw=await file('synthetic-target-input.json'),hostRaw=await file('publisher-host-cut.json');
 const baseAdapt=adaptFrozenCorpus('base',baseRaw,manifest),hostAdapt=adaptFrozenCorpus('host',hostRaw,manifest);
 const base=JSON.parse(baseAdapt),hosts=JSON.parse(hostAdapt),norm=JSON.parse(await file('publisher-normalization.json'));
 const ids=[];
 assert.deepEqual(baseAdapt,await file('model-current-synthetic-target.json'));ids.push('ADAPT-base-pinned');
 assert.deepEqual(hostAdapt,await file('model-current-publisher-host.json'));ids.push('ADAPT-H-pinned');
 assert.throws(()=>adaptFrozenCorpus('base',Buffer.concat([baseRaw,Buffer.from(' ')]),manifest));ids.push('ADAPT-byte-change');
 assert.throws(()=>adaptFrozenCorpus('foreign',baseRaw,manifest));ids.push('ADAPT-unknown-kind');
 assert.throws(()=>adaptFrozenCorpus('base',Buffer.from('{'),manifest));ids.push('ADAPT-malformed');
 for(const row of norm.rows) {
  const raw=JSON.parse(row.raw.slice(8));
  assert.deepEqual(normalizeGetWinner(raw.w,raw.s,raw.h,row.actual),row.expected,row.id);
  const main={},label={id:base.ids[14]},host=createGetWinnerHost(main,()=>true,Response);
  const token=host.begin(label),r=new Response('',{status:row.actual});
  if(row.header!==null)r.headers.set('x-afw-lab-get-winner',row.header);
  token.capture(main,r,row.actual);host.finish(label);const tuple=host.take(label,main);
  assert.deepEqual(normalizeGetWinner(tuple.w,tuple.s,tuple.h,row.actual),row.expected,row.id);
  const o=collect(base,{targetJournal:base.targetJournal},row.raw,row.actual);
  assert.deepEqual(o.getWinner,row.expected,row.id);
  assert.equal(o.finiteGet.http.state,'KNOWN',row.id);assert.equal(o.finiteGet.http.actual,row.expectedHttp,row.id);
  assert(Buffer.byteLength(row.raw)<=96,row.id);ids.push(row.id);
 }
 const siteRows=[
  ['SITE-current143',{file:'S08',line:18,column:143},true],
  ['SITE-historical118',{file:'S08',line:18,column:118},false],
  ['SITE-other119',{file:'S08',line:18,column:119},false],
  ['SITE-wrongfile',{file:'S09',line:18,column:143},false]
 ];
 for(const [id,site,known]of siteRows){
  const rows=structuredClone(base.targetJournal);rows[1].error.site=site;
  const row=norm.rows.find(r=>r.id==='N418'),o=collect(base,{targetJournal:rows},row.raw,row.actual);
  assert.equal(o.finiteGet.http.state==='KNOWN',known,id);
  assert.equal(o.getWinner.winner==='STUB_NON_OK',known,id);ids.push(id);
 }
 const composed=[],snapshot=modelSnapshot(),joined=hosts.rows.find(row=>row.id==='H-joined');
 const joinedMarker=joined.input.private.rawMarker.join('');
 for(const row of hosts.rows){
  if(heldHostIds.includes(row.id))continue;
  const p=row.input.private,actual=p.originalAssertion?.actual??503;
  const emitted=await captureCountMarker(p,base.ids,snapshot,row.id);
  const raw=p.rawMarker.join(''),foreignTuple=row.id==='H-foreign-marker-tuple';
  if(row.id==='H-joined')assert.equal(emitted,raw,row.id);
  if(foreignTuple){
   assert.equal(emitted,joinedMarker,row.id);
   assert.equal(JSON.parse(raw.slice(8)).s,419,row.id);
   assert.notEqual(emitted,raw,row.id);
  }
  const consistent=emitted===raw;
  // The foreign proposal only participates in the comparison. The collector sees genuine bytes for this row.
  const o=collect(base,row.input,foreignTuple||consistent?emitted:raw,actual);
  const result=consistent?o.getWinner:unknown();
  assert.deepEqual(result,row.expected.getWinner,row.id);
  if(parentProjectionIds.includes(row.id))assert.deepEqual(o.getWinner,row.expected.getWinner,row.id);
  if(hostOnlyIds.includes(row.id)){
   const tuple=await modelHost(p,base.ids);
   assert.deepEqual(normalizeGetWinner(tuple.w,tuple.s,tuple.h,actual),row.expected.getWinner,row.id);
  }
  assert.deepEqual(o.finiteGet.http,row.expected.finiteGetHttp,row.id);
  assert.deepEqual(o.dropWinner,row.expected.dropWinner,row.id);
  if(foreignTuple)assert.deepEqual(o.getWinner,joined.expected.getWinner,row.id);
  composed.push(row.id);ids.push(row.id);
 }
 const boundary=JSON.parse(await file('host-boundary-companions.json'));
 for(const test of boundary.rows){
  const journalCase=hosts.rows.find(r=>r.id==='H-earlier-journal-failure');
  const tornCase=hosts.rows.find(r=>r.id==='H-torn-marker');
  const input=structuredClone(test.id.includes('journal')?journalCase.input:tornCase.input);
  let selectedBase=base,raw=input.private.rawMarker.join('');
  if(test.id==='CURRENT-earlier-journal-coherent'){
   input.priorNativeDelta=[{index:0,value:{id:base.ids[0],status:'fail'}}];
   selectedBase=structuredClone(base);
   const line=base.tapPrefix.split('\n')[1],source=JSON.parse(line.slice(11));
   source.status='fail';source.code='TEST_FAILED';
   assert.equal(selectedBase.tapPrefix.split(line).length,2);
   selectedBase.tapPrefix=selectedBase.tapPrefix.replace(line,'# C2SOURCE '+JSON.stringify(source));
  }
  if(test.id==='CURRENT-malformed-marker-explicit-LF')raw+='\n';
  if(test.expected.kind==='THROW'){
   assert.throws(()=>collect(selectedBase,input,raw,503),error=>error.code===test.expected.code,test.id);
  }else{
   const result=collect(selectedBase,input,raw,503);
   assert.equal(result.getWinner.winner,test.expected.winner,test.id);
   assert.deepEqual(result.finiteGet.http,test.expected.http,test.id);
  }
  ids.push(test.id);
 }
 return {ids,normalization:norm.rows.length,coordinates:siteRows.length+5,composedHost:composed,boundaryIds:boundary.rows.map(r=>r.id),
  heldHostIds,native:false,parentCanonicalReplacementIntegrity:false};
}
