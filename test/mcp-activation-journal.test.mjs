import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
import {readFileSync} from 'node:fs';
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec(readFileSync('db/dossier-publication-receipt.sql','utf8'));db.exec(readFileSync('db/dossier-activation-receipt.sql','utf8'));
 const artifactKey='a'.repeat(64),activationKey='b'.repeat(64),trialId='c'.repeat(64),scopeHash='d'.repeat(64),configurationHash='e'.repeat(64),versionId='22222222-2222-4222-8222-222222222222',deploymentId='33333333-3333-4333-8333-333333333333';
 db.prepare('INSERT INTO dossier_publication_attempts VALUES(?,?,?,?,?,?,?,?)').run(artifactKey,'f'.repeat(32),'agent-friendly-web-delegated-canary','1'.repeat(40),'2'.repeat(40),'3'.repeat(64),'4'.repeat(64),100);
 db.prepare('INSERT INTO dossier_publication_receipts VALUES(?,?,?,?)').run(artifactKey,'11111111-1111-4111-8111-111111111111','5'.repeat(64),200);
 const adapter={withSession(mode){assert.equal(mode,'first-primary');return this;},prepare(sql){return{bind(...args){return{first:async()=>db.prepare(sql).get(...args),run:async()=>({success:true,meta:{changes:Number(db.prepare(sql).run(...args).changes)}})};}};}};
 const at=Date.now();let reads=0;const plan={activationKey,artifactKey,trialId,scopeHash,configurationHash,startAt:at-1000,expiresAt:at+60000};
 const options={db:adapter,plan,now:Date.now,observe:async(input,signal)=>{assert.equal(signal.aborted,false);assert.equal(input.workerHash,'4'.repeat(64));reads++;return{versionId,deploymentId,etag:'6'.repeat(64),configurationHash};}};
 return{db,options,reads:()=>reads,versionId,deploymentId};
}
test('activation records a distinct approved version after publication without rewriting closed receipt',async()=>{
 const {createActivationJournal}=await import('../lib/mcp-activation-journal.mjs'),f=fixture();try{
 const r=await createActivationJournal(f.options).confirm(new AbortController().signal);assert.equal(r.versionId,f.versionId);assert.equal(r.deploymentId,f.deploymentId);assert.equal(r.mayLaunch,false);
 assert.equal(f.db.prepare('SELECT version_id FROM dossier_publication_receipts').get().version_id,'11111111-1111-4111-8111-111111111111');
 await assert.rejects(createActivationJournal(f.options).confirm(new AbortController().signal));assert.equal(f.reads(),1);
 assert.throws(()=>f.db.exec('DELETE FROM dossier_activation_receipts'));
 }finally{f.db.close();}
});
test('wrong config, expired window, lost ACK and duplicate trial never confirm or replay',async()=>{
 const {createActivationJournal}=await import('../lib/mcp-activation-journal.mjs');
 for(const mode of ['config','expired','ack','receiptAck','trial']){const f=fixture();try{
  if(mode==='config'){const base=f.options.observe;f.options.observe=async(...args)=>({...await base(...args),configurationHash:'0'.repeat(64)});}
  if(mode==='expired')f.options.now=()=>f.options.plan.expiresAt;
  if(mode==='ack'||mode==='receiptAck'){const base=f.options.db;f.options.db={withSession(){return{prepare(sql){return{bind(...args){const s=base.prepare(sql).bind(...args);return{...s,run:async()=>{const r=await s.run();if(mode==='ack'||sql.includes('INSERT INTO dossier_activation_receipts'))throw Error('unknown ACK');return r;}};}};}};}};}
  if(mode==='trial'){await createActivationJournal(f.options).confirm(new AbortController().signal);f.options.plan={...f.options.plan,activationKey:'0'.repeat(64)};}
  await assert.rejects(createActivationJournal(f.options).confirm(new AbortController().signal));assert.ok(f.reads()<=1);if(mode!=='trial')assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').get().n,0);
 }finally{f.db.close();}}
});
test('observation timeout cannot write a late activation receipt',async()=>{
 const {createActivationJournal}=await import('../lib/mcp-activation-journal.mjs'),f=fixture();try{let release;f.options.observe=()=>new Promise(r=>{release=r;});await assert.rejects(createActivationJournal({...f.options,timeoutMs:10}).confirm(new AbortController().signal));release({versionId:f.versionId,deploymentId:f.deploymentId,etag:'6'.repeat(64),configurationHash:'e'.repeat(64)});await new Promise(r=>setImmediate(r));assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_activation_receipts').get().n,0);}finally{f.db.close();}
});

test('late primary receipt write after timeout cannot produce acceptance',async()=>{
 const {createActivationJournal}=await import('../lib/mcp-activation-journal.mjs'),f=fixture();try{
 const base=f.options.db;let release,late;
 f.options.db={withSession(){return{prepare(sql){return{bind(...args){const s=base.prepare(sql).bind(...args);return{...s,run:()=>sql.includes('INSERT INTO dossier_activation_receipts')?new Promise((resolve,reject)=>{release=()=>{late=s.run().then(resolve,reject);};}):s.run()};}};}};}};
 await assert.rejects(createActivationJournal({...f.options,timeoutMs:25}).confirm(new AbortController().signal));assert.equal(typeof release,'function');release();await late;await new Promise(r=>setImmediate(r));
 assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_activation_acceptances').get().n,0);
 assert.equal(f.db.prepare('SELECT COUNT(*) n FROM dossier_activation_receipts').get().n,0);
 }finally{f.db.close();}
});
