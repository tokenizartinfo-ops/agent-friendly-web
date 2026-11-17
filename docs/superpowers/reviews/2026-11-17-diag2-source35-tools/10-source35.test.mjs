import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { collectObservation,projectFirstFailure,successPacket,custodyFrame,faultLine,sha } from '../collection-adapters.mjs';
import { collectObservation as legacyCollect } from './legacy/collection-adapters.mjs';
const json=async name=>JSON.parse(await readFile(new URL(name,import.meta.url)));
const [c1,seal,selection,schema,protocol,index]=await Promise.all([
  './source-c1.json','./fixture-first.json','../mode-selection.json','../frame-schema.json',
  '../protocol-contract.json','./source-index.json'].map(json));
const corpus=c1.sourceLiteralCorpus, ids=selection.selected, defs=schema.$defs;
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
assert.equal(process.version,'v22.23.4');
assert.equal(corpus.cases.length,35);
assert.deepEqual(corpus.cases.map(c=>c.id),seal.cases.map(c=>c.id));
assert.equal(sha(Buffer.from(JSON.stringify(corpus))),seal.componentSeals.sourceCorpusSha256);
const targets=index.entries.map(e=>e.after.sha256);
assert.deepEqual(targets,defs.sourceReads.properties.beforeSha256.const);
assert.deepEqual(targets,defs.sourceReads.properties.afterSha256.const);
// This context is explicitly synthetic and never presented as an actual Source occurrence.
const model={head:'a'.repeat(40),tree:'b'.repeat(40),runId:'1'};
const context=Object.fromEntries(defs.context.required.map(k=>[k,defs.context.properties[k].const??model[k]]));
const checks=Object.fromEntries(['parentNonRoot','preflightOwned','preflightRemoved','uidGidGroupsLoopbackMatched',
  'targetsBeforeMatched','targetsAfterMatched','journalOwnershipMatched','ownRootVerified','ownTempRemoved'].map(k=>[k,true]));
const empty=Buffer.alloc(0), markers=protocol.wire.success.map(f=>f.marker), failMarker=protocol.wire.fault.marker;
function validates(s,x) {
  if(s.$ref) return validates(defs[s.$ref.split('/').at(-1)],x);
  if(s.oneOf && s.oneOf.filter(t=>validates(t,x)).length!==1) return false;
  if(s.anyOf && !s.anyOf.some(t=>validates(t,x))) return false;
  if(s.not && validates(s.not,x)) return false;
  if('const' in s && !same(s.const,x)) return false;
  if(s.enum && !s.enum.some(z=>same(z,x))) return false;
  if(s.type==='object') return x!==null&&typeof x==='object'&&!Array.isArray(x)&&
    same(Object.keys(x),s.required)&&s.required.every(k=>validates(s.properties[k],x[k]));
  if(s.type==='array') return Array.isArray(x)&&x.length>=(s.minItems??0)&&x.length<=(s.maxItems??Infinity)&&x.every(v=>validates(s.items,v));
  if(s.type==='integer') return Number.isSafeInteger(x)&&x>=(s.minimum??-Infinity)&&x<=(s.maximum??Infinity);
  if(s.type==='string') return typeof x==='string'&&(!s.pattern||new RegExp(s.pattern).test(x));
  if(s.type==='boolean') return typeof x==='boolean';
  if(s.type==='null') return x===null;
  return true;
}
function body(line,marker) {
  assert.ok(line.startsWith(marker+' ') && line.endsWith('\n') && line.indexOf('\n')===line.length-1);
  const obj=JSON.parse(line.slice(marker.length+1,-1));
  assert.equal(line,marker+' '+JSON.stringify(obj)+'\n');
  return obj;
}
for(const [i,fixture] of corpus.cases.entries()) test(fixture.id,{timeout:10000},()=>{
  let count=0;
  const checked=(label,f)=>{assert.ok(f(),label);count++;};
  const facts=corpus.observations[fixture.parentObservationRef], stdout=Buffer.from(fixture.rawStdoutUtf8);
  const raw=Buffer.from(facts.witness.events.map(e=>JSON.stringify(e)+'\n').join('')+fixture.journalSuffixUtf8);
  const child={stdout,stderr:empty,error:{code:'ETIMEDOUT'},signal:null,status:1};
  const expected=fixture.expected, projection=projectFirstFailure(stdout,facts,ids);
  checked('stdout-fixed-seal',()=>stdout.length===fixture.stdoutSeal.bytes&&sha(stdout)===fixture.stdoutSeal.sha256);
  checked('journal-fixed-seal',()=>raw.length===facts.journal.bytes&&sha(raw)===facts.journal.sha256);
  checked('projector-literal',()=>same(projection,expected));
  const observed=collectObservation(child,raw,ids),{capture,firstFailure,...parentFacts}=observed;
  checked('collector-parent-facts',()=>same(parentFacts,facts));
  checked('collector-streams',()=>same(capture,{exitCode:1,signal:'none',errorKind:'timeout',
    stdout:fixture.stdoutSeal,stderr:{bytes:0,sha256:sha(empty)}}));
  checked('collector-literal',()=>same(firstFailure,expected));
  const cust=custodyFrame(context,1,1,checks), p=successPacket(context,cust,targets,targets,targets,observed);
  const frame=body(p.outcomeLine,markers[1]), custody=body(p.custodyLine,markers[0]);
  checked('outcome-schema',()=>validates(schema,frame));
  checked('custody-schema-and-embedded',()=>validates(schema,custody)&&same(frame.custody,custody));
  checked('wire-fixed-order-and-payload',()=>same(frame.observation,observed)&&same(frame.observation.firstFailure,expected)&&
    p.payload===JSON.stringify(frame)+'\n' && Buffer.byteLength(p.payload)<=24577 &&
    Buffer.byteLength(JSON.stringify(firstFailure))<=512);
  checked('E2-markers-frame-context',()=>frame.schema==='afw.c2-first-failure-post-diag2-outcome.v1'&&
    same(frame.context,context)&&same(frame.sourceReads,{beforeSha256:targets,afterSha256:targets})&&
    frame.diagnosticCollectionComplete===true&&frame.nativeQualification===false&&frame.SourceQualified===false&&frame.Task1Pass===false&&
    Object.values(frame.nonclaims).length===7&&Object.values(frame.nonclaims).every(x=>x===false));
  let legacy=null;
  if(i===0) {
    const old=legacyCollect(child,raw,ids);
    checked('legacy-valid-six-fields',()=>same(old,{capture,...parentFacts}));
    checked('legacy-scoped-incompatibility',()=>!Object.hasOwn(old,'firstFailure')&&!validates(defs.observation,old));
    legacy={inheritedFieldsMatched:6,oldFirstFailurePresent:Object.hasOwn(old,'firstFailure'),oldFitsNewObservation:validates(defs.observation,old)};
    const ff=body(faultLine(context,'publish','PUBLICATION_INVALID'),failMarker);
    checked('actual-fault-marker-and-schema',()=>validates(schema,ff)&&ff.diagnosticCollectionComplete===false);
    const rejects=(f,code)=>{try{f();return false;}catch(e){return e?.code===code;}};
    checked('legacy-shape-rejected-by-publisher',()=>rejects(()=>successPacket(context,cust,targets,targets,targets,old),'PUBLICATION_INVALID'));
    checked('outcome-budget-enforced',()=>rejects(()=>successPacket(context,cust,targets,targets,targets,
      {...observed,witness:{...observed.witness,padding:'x'.repeat(24576)}}),'PUBLICATION_INVALID'));
    checked('custody-union-bound',()=>rejects(()=>custodyFrame(context,7,2,checks),'CUSTODY_INVALID'));
    checked('before-target-drift',()=>rejects(()=>successPacket(context,cust,targets.slice(1),targets,targets,observed),'TARGET_DRIFT'));
    checked('N2-contradiction-retained',()=>rejects(()=>collectObservation({...child,stdout:Buffer.from(
      corpus.cases.find(v=>v.id==='S32_TARGET_PASS').rawStdoutUtf8)},raw,ids),'EVIDENCE_CONFLICT'));
  }
  console.log('AFW_DIAG2_PROJECTED '+JSON.stringify({id:fixture.id,state:firstFailure.state,reason:firstFailure.reason,
    projectionSha256:sha(Buffer.from(JSON.stringify(firstFailure))),checks:count,legacy}));
});
