import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {Miniflare,convertV4MiniflareOptions} from 'miniflare';
import {manifest,schemas,sqlStatements} from './fixtures/occurrence-operations.mjs';
import {createOccurrenceApprovalCatalog} from '../lib/assistance-occurrence-approvals.mjs';
import {createOccurrenceOperations} from '../lib/assistance-occurrence-operations.mjs';
import {createClosureD1Actions} from '../lib/assistance-closure-d1-actions.mjs';
const unknown={verified:false,state:'unknown'};

test('native primary closure: exact pins, revocation, stop, terminal preservation and lost acknowledgment',async()=>{
 assert.equal(typeof createClosureD1Actions,'function','the trusted D1 closure adapter must exist');
 const runtime=new Miniflare(convertV4MiniflareOptions({modules:true,compatibilityDate:'2026-09-07',script:'export default {fetch(){return new Response(null,{status:404});}}',d1Databases:{DB:'closure-actions-native',OTHER:'closure-actions-native'}}));
 try{
  const db=await runtime.getD1Database('DB'),other=await runtime.getD1Database('OTHER');
  for(const name of schemas)for(const sql of sqlStatements(readFileSync('worker/operations/'+name+'.sql','utf8')))await db.prepare(sql).run();
  const v2=sqlStatements(readFileSync('worker/operations/assistance-occurrences-v2.sql','utf8')),marker=v2.find(s=>s.startsWith('INSERT INTO assistance_occurrence_schema'));
  await db.batch([...v2.filter(s=>s!==marker),marker].map(s=>db.prepare(s)));
  const fence=sqlStatements(readFileSync('worker/operations/assistance-occurrences-v2-reservation-fence.sql','utf8')),drop=fence.find(s=>s.startsWith('DROP TRIGGER')),pin=fence.find(s=>s.startsWith('INSERT INTO assistance_occurrence_reservation_fence'));
  await db.batch([drop,...fence.filter(s=>s!==drop&&s!==pin),pin].map(s=>db.prepare(s)));
  const catalog=createOccurrenceApprovalCatalog({db});
  let caseId=0;
  async function setup({started=true,completed=false}={}){
   const id=(++caseId).toString(16).padStart(64,'0');
   const m={...manifest(),signal:{...manifest().signal,eventId:id,projectRef:id}};
   const approval={manifest:m,identityRef:'c'.repeat(64),enrollmentRef:'d'.repeat(64),serverConfigVersion:'e'.repeat(64),planRevision:1};
   await db.prepare('INSERT INTO assistance_supervision_events VALUES(?,?,?,?,?,?,?)').bind(m.signal.eventId,m.signal.projectRef,m.signal.revision,m.signal.kind,m.signal.topic,m.signal.observedAt,Date.now()).run();
   assert.equal(await catalog.approve(approval),true);
   const operations=createOccurrenceOperations({db,manifest:m,identityRef:approval.identityRef,admissionContract:'server-v1',approval,readServerAdmission:async()=>({contractVersion:'afw-server-admission-v1',identityRef:approval.identityRef,enrollmentRef:approval.enrollmentRef,serverConfigVersion:approval.serverConfigVersion,planRevision:1,admissionRevision:1,observedAt:Date.now(),schemaVersion:2})});
   if(started)assert.equal(await operations.create(),true);
   if(completed){assert.deepEqual(await operations.list({expectedSequence:1}),[m.signal]);assert.equal(await operations.admit({expectedSequence:2,phase:'claim'}),true);assert.ok(await operations.claim({expectedSequence:3}));assert.equal(await operations.admit({expectedSequence:4,phase:'finish'}),true);assert.equal(await operations.finish({expectedSequence:5}),'intervention_required');}
   const plan={occurrenceId:m.occurrenceId,baselineRef:'f'.repeat(64),closeAt:m.deadline};
   return {approval,plan,options:{db,approval,plan,now:()=>m.deadline}};
  }
  const active=await setup(),actions=createClosureD1Actions(active.options);
  assert.deepEqual(await actions.closeLedger(active.plan),unknown,'closing requires primary revocation first');
  assert.deepEqual(await actions.revokePlan({...active.plan,baselineRef:'a'.repeat(64)}),unknown);
  assert.equal((await catalog.read(active.plan.occurrenceId)).revoked,false);
  assert.deepEqual(await actions.revokePlan(active.plan),{verified:true,state:'revoked'});
  assert.deepEqual(await actions.revokePlan(active.plan),{verified:true,state:'revoked'});
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_plan_revocations WHERE occurrence_id=?').bind(active.plan.occurrenceId).first()).n,1);
  assert.deepEqual(await actions.closeLedger(active.plan),{verified:true,state:'stopped'});
  assert.deepEqual(await actions.closeLedger(active.plan),{verified:true,state:'stopped'});
  assert.deepEqual(await actions.readIssuedReceipt({...active.plan,step:'restoreAdministration'}),unknown);
  assert.deepEqual(await actions.readIssuedReceipt({...active.plan,step:'closeLedger'}),{verified:true,state:'stopped'});

  const done=await setup({completed:true}),doneActions=createClosureD1Actions(done.options);
  const before=(await db.prepare('SELECT * FROM assistance_occurrence_journal WHERE occurrence_id=? ORDER BY sequence').bind(done.plan.occurrenceId).all()).results;
  assert.deepEqual(await doneActions.revokePlan(done.plan),{verified:true,state:'revoked'});
  assert.deepEqual(await doneActions.closeLedger(done.plan),{verified:true,state:'completed'});
  assert.deepEqual((await db.prepare('SELECT * FROM assistance_occurrence_journal WHERE occurrence_id=? ORDER BY sequence').bind(done.plan.occurrenceId).all()).results,before);

  const absent=await setup({started:false}),absentActions=createClosureD1Actions(absent.options);
  assert.deepEqual(await absentActions.revokePlan(absent.plan),{verified:true,state:'revoked'});
  assert.deepEqual(await absentActions.closeLedger(absent.plan),unknown);
  assert.equal((await db.prepare('SELECT count(*) n FROM assistance_occurrence_journal WHERE occurrence_id=?').bind(absent.plan.occurrenceId).first()).n,0);

  const wrong=await setup();
  const wrongActions=createClosureD1Actions({...wrong.options,approval:{...wrong.approval,identityRef:'a'.repeat(64)}});
  assert.deepEqual(await wrongActions.revokePlan(wrong.plan),unknown);
  assert.equal((await catalog.read(wrong.plan.occurrenceId)).revoked,false);
  const early=createClosureD1Actions({...wrong.options,now:()=>wrong.plan.closeAt-1});
  assert.deepEqual(await early.revokePlan(wrong.plan),unknown);
  assert.throws(()=>createClosureD1Actions({...wrong.options,plan:{...wrong.plan,closeAt:wrong.plan.closeAt+1}}));
  assert.throws(()=>createClosureD1Actions({...wrong.options,plan:{...wrong.plan,baselineRef:new String('a'.repeat(64))}}));

  // Provider read yields: clock reversal or caller-plan edits must deny the
  // actual following INSERT, not only the earlier entry check.
  for(const change of ['clock','input']){
   const delayed=await setup(),input={...delayed.plan};let clock=delayed.plan.closeAt;
   const racedDb={prepare(sql){const stmt=db.prepare(sql);return {first:()=>stmt.first(),bind(...args){const bound=stmt.bind(...args);return {run:()=>bound.run(),async first(){const row=await bound.first();if(sql.startsWith('SELECT * FROM assistance_occurrence_approved_plans')){if(change==='clock')clock--;else input.baselineRef='9'.repeat(64);}return row;}};}};},batch:ss=>db.batch(ss)};
   const raced=createClosureD1Actions({...delayed.options,db:racedDb,now:()=>clock});
   assert.deepEqual(await raced.revokePlan(input),unknown,'changed '+change+' denies revocation before its write');
   assert.equal((await catalog.read(delayed.plan.occurrenceId)).revoked,false);
  }

  for(const mode of ['denied','unknown','throws','clock','input','allowed']){
   const guarded=await setup(),input={...guarded.plan};let clock=guarded.plan.closeAt,calls=0;
   const authorizeWrite=async pin=>{calls++;assert.deepEqual(pin,guarded.plan);assert.ok(Object.isFrozen(pin));await Promise.resolve();if(mode==='throws')throw Error('private authority');if(mode==='clock')clock--;if(mode==='input')input.baselineRef='9'.repeat(64);return mode==='unknown'?undefined:mode!=='denied';};
   const guardedActions=createClosureD1Actions({...guarded.options,now:()=>clock,authorizeWrite});
   assert.deepEqual(await guardedActions.revokePlan(input),mode==='allowed'?{verified:true,state:'revoked'}:unknown);
   assert.equal(calls,1);
   assert.equal((await catalog.read(guarded.plan.occurrenceId)).revoked,mode==='allowed');
  }
  for(const mode of ['denied','unknown','throws','clock','input','allowed']){
   const guarded=await setup();await createClosureD1Actions(guarded.options).revokePlan(guarded.plan);
   const input={...guarded.plan};let clock=guarded.plan.closeAt,calls=0;
   const authorizeWrite=async pin=>{calls++;assert.deepEqual(pin,guarded.plan);await Promise.resolve();if(mode==='throws')throw Error('private authority');if(mode==='clock')clock--;if(mode==='input')input.closeAt++;return mode==='unknown'?undefined:mode!=='denied';};
   const guardedActions=createClosureD1Actions({...guarded.options,now:()=>clock,authorizeWrite});
   assert.deepEqual(await guardedActions.closeLedger(input),mode==='allowed'?{verified:true,state:'stopped'}:unknown);
   assert.equal(calls,1);
   assert.equal((await db.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE occurrence_id=? AND state='stopped'").bind(guarded.plan.occurrenceId).first()).n,mode==='allowed'?1:0);
  }
  assert.throws(()=>createClosureD1Actions({...active.options,authorizeWrite:true}));
  const lost=await setup();
  const ambiguousDb={
   prepare(sql){const stmt=db.prepare(sql);return {first:()=>stmt.first(),bind(...args){const bound=stmt.bind(...args);return {first:()=>bound.first(),async run(){const result=await bound.run();if(sql.startsWith('INSERT INTO assistance_occurrence_plan_revocations'))throw Error('private provider error');return result;}};}};},
   batch:statements=>db.batch(statements)
  };
  const lostActions=createClosureD1Actions({...lost.options,db:ambiguousDb});
  assert.deepEqual(await lostActions.revokePlan(lost.plan),unknown);
  assert.deepEqual(await lostActions.readIssuedReceipt({...lost.plan,step:'revokePlan'}),{verified:true,state:'revoked'});
  const parallel=await setup(),left=createClosureD1Actions(parallel.options),right=createClosureD1Actions({...parallel.options,db:other});
  await left.revokePlan(parallel.plan);
  const receipts=await Promise.all([left.closeLedger(parallel.plan),right.closeLedger(parallel.plan)]);
  assert.ok(receipts.some(r=>r.verified&&r.state==='stopped'));
  assert.deepEqual(await right.readIssuedReceipt({...parallel.plan,step:'closeLedger'}),{verified:true,state:'stopped'});
  assert.equal((await db.prepare("SELECT count(*) n FROM assistance_occurrence_journal WHERE occurrence_id=? AND state='stopped'").bind(parallel.plan.occurrenceId).first()).n,1);
 }finally{await runtime.dispose();}
});
