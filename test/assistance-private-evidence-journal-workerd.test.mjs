import test from 'node:test';
import assert from 'node:assert/strict';
import {build} from 'esbuild';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest} from './fixtures/occurrence-operations.mjs';
import {qaAdministrationFixture} from './fixtures/qa-administrative-composition.mjs';
import {computeOccurrencePlanDigest} from '../lib/assistance-occurrence-digest.mjs';
import {computeQaClosureBaselineRef} from '../lib/assistance-qa-closure-catalog.mjs';
test('primary SQLite journal preserves CAS, lost first acknowledgement, corrections and terminal withdrawal through restart',async()=>{
 const start=Date.now()-1000,m={...manifest(),startAt:start,deadline:start+90000},approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};const {registration}=await qaAdministrationFixture({createdAt:start,closeAt:m.deadline,expiresAt:m.deadline+10000});registration.contract='afw-qa-closure-approval/v2';registration.plan.occurrenceId=m.occurrenceId;registration.approvalDigest=await computeOccurrencePlanDigest({manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval});registration.plan.baselineRef=await computeQaClosureBaselineRef(registration);
 const built=await build({stdin:{resolveDir:process.cwd(),contents:`
 import{DurableObject}from'cloudflare:workers';import{createPrivateEvidenceJournal}from'./lib/assistance-private-evidence-journal.mjs';
 // Test-only operator host; never exported from actual QA runtime.
 export class Journal extends DurableObject{async fetch(request){const b=await request.json(),actor=createPrivateEvidenceJournal({storage:this.ctx.storage,readPins:async()=>JSON.parse(this.env.PINS)}),ref=this.env.REF;const result=b.operation==='append'?await actor.append(ref,b.sequence,b.evidence):b.operation==='withdraw'?await actor.withdraw(ref,b.sequence):await actor.history(ref);return b.loseAck?Response.json({fixture:'lost-ack'},{status:503}):Response.json(result);}}
 export default{fetch(request,env){return env.JOURNAL.get(env.JOURNAL.idFromName('own-journal')).fetch(request);}};
 `},bundle:true,write:false,format:'esm',platform:'browser',external:['cloudflare:workers']});
 const options={modules:true,compatibilityDate:'2026-09-07',script:built.outputFiles[0].text,bindings:{PINS:JSON.stringify({registration,approval}),REF:registration.plan.baselineRef},durableObjects:{JOURNAL:{className:'Journal',useSQLite:true}}},runtime=new Miniflare(convertV4MiniflareOptions(options));
 try{const evidence={kind:'creation',sourceRef:'a'.repeat(64),contentDigest:'b'.repeat(64),observedAt:start,supersedes:null};const call=async body=>{const r=await runtime.dispatchFetch('https://synthetic.invalid/',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});assert.equal(r.status,body.loseAck?503:200,await r.clone().text());return r.json();};
  await Promise.all([call({operation:'append',sequence:0,evidence,loseAck:true}),call({operation:'append',sequence:0,evidence:{...evidence,sourceRef:'c'.repeat(64)},loseAck:true})]);const first=await call({operation:'history'});assert.equal(first.entries.length,1);assert.equal(await call({operation:'append',sequence:0,evidence}),null);
  const second=await call({operation:'append',sequence:1,evidence:{...evidence,sourceRef:'d'.repeat(64),supersedes:first.entryRef}});assert.equal(second.sequence,2);await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...options.bindings,RESTART:'true'}}));const history=await call({operation:'history'});assert.equal(history.entries[0].entryRef,first.entryRef);assert.equal(history.entries[1].previousEntryRef,first.entryRef);assert.equal(history.entries[1].evidence.supersedes,first.entryRef);
  assert.equal(await call({operation:'withdraw',sequence:1}),false);assert.equal(await call({operation:'withdraw',sequence:2}),true);assert.equal(await call({operation:'append',sequence:2,evidence}),null);await runtime.setOptions(convertV4MiniflareOptions({...options,bindings:{...options.bindings,PINS:''}}));const final=await call({operation:'history'});assert.equal(final.state,'withdrawn');assert.deepEqual(final.entries,history.entries);
 }finally{await runtime.dispose();}
});
