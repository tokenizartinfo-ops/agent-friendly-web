import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
const load=()=>import('../lib/mcp-successor-reservation.mjs');
function fixture(){
 const db=new DatabaseSync(':memory:'),now=Date.now();
 db.exec('CREATE TABLE dossier_node_process_admissions(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT);CREATE TABLE dossier_node_process_closures(grant_id TEXT,container_id TEXT,process_generation TEXT,program_hash TEXT,source_revision TEXT,image TEXT,closed_at INTEGER);');
 db.exec(readFileSync('db/dossier-successor-reservation.sql','utf8'));
 const original={containerId:'a'.repeat(64),applicationId:'own-app',programHash:'b'.repeat(64),sourceRevision:'c'.repeat(40)};
 const evidence={purpose:'afw.retirement-evidence.v1',...original,processGeneration:'d'.repeat(64),closedAt:now-1000,stoppedAt:now-1500,observedAt:now,physicalStopVerified:true,mayStartSuccessor:false};
 db.prepare('INSERT INTO dossier_node_process_admissions VALUES(?,?,?,?,?,?)').run('original',original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,'cloudflare/debian-trixie');
 db.prepare('INSERT INTO dossier_node_process_closures VALUES(?,?,?,?,?,?,?)').run('original',original.containerId,evidence.processGeneration,original.programHash,original.sourceRevision,'cloudflare/debian-trixie',evidence.closedAt);
 const candidate={trialId:'e'.repeat(64),containerId:'f'.repeat(64),programHash:'1'.repeat(64),sourceRevision:'2'.repeat(40),scopeHash:'3'.repeat(64),startAt:now,expiresAt:now+60000,budget:1};
 const adapter={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare:sql=>({bind:(...args)=>({run:async()=>{const r=db.prepare(sql).run(...args);return{success:true,meta:{changes:Number(r.changes)}};}})})};
 return{db,evidence,candidate,options:{db:adapter,original,candidate,readRetirement:async()=>structuredClone(evidence),now:Date.now},rows:()=>db.prepare('SELECT * FROM dossier_successor_reservations').all()};
}
test('one administrative reservation retains original and grants no boot',async()=>{
 const {createSuccessorReservation}=await load(),f=fixture();try{
 const r=await createSuccessorReservation(f.options).reserve();assert.deepEqual(r,{purpose:'afw.successor-reservation.v1',trialId:f.candidate.trialId,state:'prepared',mayBoot:false});assert.equal(f.rows().length,1);assert.equal(f.rows()[0].predecessor_container_id,f.options.original.containerId);
 await assert.rejects(createSuccessorReservation(f.options).reserve());assert.equal(f.rows().length,1);
 assert.throws(()=>f.db.exec('DELETE FROM dossier_successor_reservations'));assert.throws(()=>f.db.exec("UPDATE dossier_successor_reservations SET state='prepared'"));
 }finally{f.db.close();}
});
test('two competing candidates produce at most one reservation',async()=>{
 const {createSuccessorReservation}=await load(),f=fixture();try{
 const a=createSuccessorReservation(f.options),b=createSuccessorReservation({...f.options,candidate:{...f.candidate,trialId:'4'.repeat(64),containerId:'5'.repeat(64)}});
 const r=await Promise.allSettled([a.reserve(),b.reserve()]);assert.equal(r.filter(v=>v.status==='fulfilled').length,1);assert.equal(f.rows().length,1);
 }finally{f.db.close();}
});
test('stale, foreign, incomplete evidence and discordant original history reject before reservation',async()=>{
 const {createSuccessorReservation}=await load();for(const mode of ['stale','foreign','physical','future','history','extra-original']){const f=fixture();try{
 if(mode==='stale')f.evidence.observedAt-=30001;if(mode==='future')f.evidence.observedAt+=10000;if(mode==='foreign')f.evidence.containerId='0'.repeat(64);if(mode==='physical')f.evidence.physicalStopVerified=false;
 if(mode==='history')f.db.exec('DELETE FROM dossier_node_process_closures');if(mode==='extra-original')f.db.exec("INSERT INTO dossier_node_process_admissions SELECT * FROM dossier_node_process_admissions");
 await assert.rejects(createSuccessorReservation(f.options).reserve());assert.equal(f.rows().length,0);
 }finally{f.db.close();}}
});
test('lost insertion acknowledgement consumes the reservation without success or retry recovery',async()=>{
 const {createSuccessorReservation}=await load(),f=fixture();try{const base=f.options.db;
 const broken={withSession(){return this;},prepare:sql=>({bind:(...args)=>({run:async()=>{await base.prepare(sql).bind(...args).run();throw Error('lost ACK');}})})};
 await assert.rejects(createSuccessorReservation({...f.options,db:broken}).reserve());assert.equal(f.rows().length,1);
 await assert.rejects(createSuccessorReservation(f.options).reserve());assert.equal(f.rows().length,1);
 }finally{f.db.close();}
});

test('deadline before database insertion prevents writes; unknown commit remains consumed',async t=>{
 const {createSuccessorReservation}=await load(),f=fixture();try{
 let tick=0;t.mock.method(performance,'now',()=>tick);
 await assert.rejects(createSuccessorReservation({...f.options,timeoutMs:30,readRetirement:async()=>{tick=31;return f.evidence;}}).reserve());assert.equal(f.rows().length,0);
 tick=0;const base=f.options.db,late={withSession(){return this;},prepare:sql=>({bind:(...args)=>({run:async()=>{const r=await base.prepare(sql).bind(...args).run();tick=31;return r;}})})};
 await assert.rejects(createSuccessorReservation({...f.options,db:late,timeoutMs:30}).reserve());assert.equal(f.rows().length,1);
 }finally{f.db.close();}
});
test('primary clock independently rejects stale evidence even with a stale local clock',async()=>{
 const {createSuccessorReservation}=await load(),f=fixture();try{
 f.evidence.observedAt-=40000;f.evidence.closedAt-=40000;f.evidence.stoppedAt-=40000;f.db.prepare('UPDATE dossier_node_process_closures SET closed_at=?').run(f.evidence.closedAt);
 await assert.rejects(createSuccessorReservation({...f.options,now:()=>f.evidence.observedAt}).reserve());assert.equal(f.rows().length,0);
 }finally{f.db.close();}
});

test('primary expiration boundary excludes equality even when local clock lags',async()=>{
 const {createSuccessorReservation}=await load();for(const offset of [0,1]){const f=fixture();try{
 const primary=f.candidate.expiresAt+offset;f.db.function('strftime',(format,input)=>{assert.equal(input,'now');return format==='%s'?String(Math.floor(primary/1000)):String(new Date(primary).getUTCSeconds()).padStart(2,'0')+'.'+String(primary%1000).padStart(3,'0');});
 f.evidence.observedAt=f.candidate.expiresAt-1;
 await assert.rejects(createSuccessorReservation({...f.options,now:()=>f.candidate.expiresAt-1}).reserve());assert.equal(f.rows().length,0);
 }finally{f.db.close();}}
});

test('reservation passes its original monotonic assertion before a retirement child can begin',async t=>{
 const {createSuccessorReservation}=await load(),f=fixture();let tick=0,parent,childReads=0;t.mock.method(performance,'now',()=>tick);
 try{
  const reader=async(_input,assertParent)=>{parent=assertParent;tick=31;if(assertParent)assertParent();childReads++;return f.evidence;};
  await assert.rejects(createSuccessorReservation({...f.options,timeoutMs:30,readRetirement:reader}).reserve());
  assert.equal(typeof parent,'function');assert.equal(childReads,0);assert.equal(f.rows().length,0);
 }finally{f.db.close();}
});
test('independent SQL clock retains its strict future predicate',async()=>{
 const {createSuccessorReservation}=await load();
 for(const delta of [-21,21]){
  const f=fixture(),local=f.evidence.observedAt,sqlTime=local+delta;
  try{
   f.db.function('strftime',(format,input)=>{assert.equal(input,'now');return format==='%s'?String(Math.floor(sqlTime/1000)):String(new Date(sqlTime).getUTCSeconds()).padStart(2,'0')+'.'+String(sqlTime%1000).padStart(3,'0');});
   const run=createSuccessorReservation({...f.options,now:()=>local}).reserve();
   if(delta<0){await assert.rejects(run);assert.equal(f.rows().length,0);}else{await run;assert.equal(f.rows().length,1);}
  }finally{f.db.close();}
 }
});

test('finite seal blocks the actual administrative reservation INSERT',async()=>{
 const {createFiniteAdmissionGate}=await import('../lib/mcp-own-finite-admission-gate.mjs');
 const {finiteGateFixture}=await import('./fixtures/finite-admission-gate.mjs');
 const {createSuccessorReservation}=await load(),f=fixture(),g=finiteGateFixture(Date.now()-1000);
 try{const gate=createFiniteAdmissionGate(g.options);await gate.seal();
 await assert.rejects(createSuccessorReservation({...f.options,finiteGate:gate}).reserve());
 assert.equal(f.rows().length,0);assert.equal((await gate.read()).sealed,true);
 }finally{f.db.close();}
});
