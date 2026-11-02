import test from 'node:test';
import assert from 'node:assert/strict';
import {exercise} from './fixtures/finite-premature-admission-native.mjs';
const additions=r=>({admissions:r.after.d1.dossier_node_process_admissions.length-r.before.d1.dossier_node_process_admissions.length,closures:r.after.d1.dossier_node_process_closures.length-r.before.d1.dossier_node_process_closures.length});
for(const mode of ['missing','reservation-pending'])test('premature '+mode+' leaves full snapshots unchanged and intended reservation insertable',async()=>{
 const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.deepEqual(r.after,r.before);assert.equal(r.launches,0);assert.equal(r.closes,0);assert.equal(r.callbacks,0);assert.equal(r.runs,0);assert.equal(r.laterReservation.state,'prepared');
});
test('atomic prepared reservation predicate denies mutation after both guards; marker stays unresolved',async()=>{
 const r=await exercise('race-reservation');assert.deepEqual(additions(r),{admissions:0,closures:0});assert.ok(r.reads>=2);assert.equal(r.closes,0);assert.equal(r.launches,0);assert.equal(r.callbacks,0);assert.equal(r.runs,1);const raw=r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1];assert.ok(raw.writers.admission);assert.equal(raw.writers.admission.settlement,null);
});
test('historical construction, primary read, seal and close survive revoked policy and N1',async()=>{
 const r=await exercise('historical');assert.equal(r.constructed.read.status,'observed');assert.equal(r.constructed.seal.status,'sealed');assert.equal(r.launches,0);assert.equal(r.closes,1);
});
test('valid exact prepared reservation traverses actual custody and gate once under SYN runtime',async()=>{
 const r=await exercise('valid');assert.equal(r.error,null);assert.equal(r.launches,1);assert.equal(r.callbacks,0);assert.equal(r.closes,0);assert.deepEqual(additions(r),{admissions:1,closures:0});
});
test('ordinary nonfinite custody remains successful',async()=>{const r=await exercise('ordinary');assert.equal(r.error,null);assert.equal(r.launches,1);assert.equal(r.callbacks,0);});

test('host guard passes then custody denies: no admission marker or close',async()=>{
 const r=await exercise('guard-race');assert.equal(r.reads,2);assert.deepEqual(r.after.do,r.before.do);assert.deepEqual(additions(r),{admissions:0,closures:0});assert.equal(r.closes,0);assert.equal(r.launches,0);assert.equal(r.runs,0);
});
test('latest consent changes at actual INSERT: acknowledged zero retains spent unresolved marker without close',async()=>{
 const r=await exercise('race-consent');assert.deepEqual(additions(r),{admissions:0,closures:0});assert.equal(r.closes,0);assert.equal(r.runs,1);assert.equal(r.launches,0);assert.ok(r.after.do.find(([k])=>k==='afw.own-finite-admission.v1:head')[1].writers.admission);
});
for(const mode of ['throw','successfalse','malformed','lostack','postinsert','read-throw','read-malformed','prior-admission','prior-launch','prior-custody','rerun-inserted-zero','rerun-unknown-zero'])test('uncertain '+mode+' retains actual host close and sanitized failure',async()=>{
 const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(r.callbacks,0);assert.equal(additions(r).closures,1);if(mode.startsWith('rerun-')){assert.equal(r.runs,2);assert.equal(r.rerun,true);assert.equal(additions(r).admissions,1);}
});
for(const [field,value] of [['trial_id','0'.repeat(64)],['scope_hash','0'.repeat(64)],['application_id','foreign'],['predecessor_container_id','0'.repeat(64)],['predecessor_generation','0'.repeat(64)],['predecessor_program_hash','0'.repeat(64)],['predecessor_source_revision','0'.repeat(40)],['container_id','0'.repeat(64)],['program_hash','0'.repeat(64)],['source_revision','0'.repeat(40)],['start_at',1],['expires_at',2],['closed_at',1],['budget',2],['state','pending'],['reserved_at',1]])test('wrong reservation '+field+' rejects before finite marker',async()=>{
 const r=await exercise('wrong-row',{field,value});assert.equal(r.error,'Own durable event host unavailable');assert.deepEqual(r.after,r.before);assert.equal(r.runs,0);assert.equal(r.launches,0);assert.equal(r.closes,0);assert.equal(r.callbacks,0);
});

test('pending underlying INSERT cannot be classified or closed as acknowledged zero',async()=>{
 const r=await exercise('pending');assert.equal(r.pendingObservation.settled,false);assert.equal(r.pendingObservation.closes,0);assert.equal(r.pendingObservation.launches,0);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.equal(r.closes,1);assert.equal(additions(r).admissions,1);assert.equal(additions(r).closures,1);
});
test('opaque native source rejects partial/foreign provenance and forged source token',async()=>{
 const r=await exercise('source-shapes');assert.equal(r.sourceChecks.length,8);assert.ok(r.sourceChecks.every(x=>x.denied));assert.deepEqual(r.after,r.before);assert.equal(r.runs,0);
});
for(const mode of ['unique','persist-fail','prior-row','prior-launch-row'])test('actual '+mode+' retains possible-process cleanup',async()=>{
 const r=await exercise(mode);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(r.launches,0);assert.equal(additions(r).closures,1);
});
test('native source absence never permits finite custody',async()=>{const r=await exercise('no-source');assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.launches,0);assert.equal(r.runs,0);});

test('rerun-zero-prior: unreadable custody after ACK0 disqualifies no-admission classification',async()=>{
 const r=await exercise('rerun-zero-prior');assert.equal(r.runs,1);assert.equal(r.rerun,true);assert.equal(r.error,'Own durable event host unavailable');assert.equal(r.closes,1);assert.equal(additions(r).admissions,0);assert.equal(additions(r).closures,1);
});
