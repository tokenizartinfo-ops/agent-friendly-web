import test from 'node:test';
import assert from 'node:assert/strict';
import {DatabaseSync} from 'node:sqlite';
const load=()=>import('../lib/mcp-invocation-storage.mjs');
function fixture(){
 const db=new DatabaseSync(':memory:');db.exec('CREATE TABLE records(k TEXT PRIMARY KEY,v TEXT)');let queue=Promise.resolve(),roots=0,lost=false,ack;
 const raw={transaction(fn){const p=queue.then(async()=>{roots++;db.exec('BEGIN');let open=true;try{const v=await fn({get:async k=>{const r=db.prepare('SELECT v FROM records WHERE k=?').get(k);return r?JSON.parse(r.v):undefined;},put:async(k,v)=>db.prepare('INSERT INTO records VALUES(?,?) ON CONFLICT(k) DO UPDATE SET v=excluded.v').run(k,JSON.stringify(v))});db.exec('COMMIT');open=false;if(ack)await ack;if(lost){lost=false;throw Error('lost ACK');}return v;}catch(e){if(open)db.exec('ROLLBACK');throw e;}});queue=p.catch(()=>{});return p;}};
 return{raw,roots:()=>roots,lose(){lost=true;},hold(p){ack=p;},close:()=>db.close()};
}
test('nested custody reads borrow queued SQLite snapshot without another root or write privilege',async()=>{
 const {createInvocationStorage}=await load(),f=fixture();try{const s=createInvocationStorage(f.raw);await s.storage.transaction(async tx=>{await tx.put('k',1);assert.equal(await s.storage.transaction(r=>r.get('k')),1);await assert.rejects(s.storage.transaction(r=>r.put('k',2)));assert.throws(()=>s.assertOutside());});assert.equal(f.roots(),1);s.assertOutside();assert.equal(await s.storage.transaction(r=>r.get('k')),1);}finally{f.close();}
});
test('independent asynchronous invocations never borrow another active transaction',async()=>{
 const {createInvocationStorage}=await load(),f=fixture();try{const s=createInvocationStorage(f.raw);let release,entered;const gate=new Promise(r=>release=r),inside=new Promise(r=>entered=r);const a=s.storage.transaction(async tx=>{entered();await gate;await tx.put('a',1);});await inside;const b=s.storage.transaction(tx=>tx.put('b',2));release();await Promise.all([a,b]);assert.equal(f.roots(),2);assert.equal(await s.storage.transaction(tx=>tx.get('b')),2);}finally{f.close();}
});
test('root first ACK remains mandatory and committed data cannot reconstruct its return',async()=>{
 const {createInvocationStorage}=await load(),f=fixture();try{const s=createInvocationStorage(f.raw);f.lose();await assert.rejects(s.storage.transaction(async tx=>{await tx.put('k',1);return 'permit';}),/lost ACK/);assert.equal(await s.storage.transaction(tx=>tx.get('k')),1);}finally{f.close();}
});
test('late transaction references and detached continuations cannot write or dispatch during ACK',async()=>{
 const {createInvocationStorage}=await load(),f=fixture();try{const s=createInvocationStorage(f.raw);let tx,releaseAck,releaseLate,late;f.hold(new Promise(r=>releaseAck=r));const pending=s.storage.transaction(async value=>{tx=value;late=new Promise(r=>releaseLate=r).then(async()=>{await assert.rejects(tx.put('late',1));assert.throws(()=>s.assertOutside());await assert.rejects(s.storage.transaction(r=>r.get('k')));});await value.put('k',1);});await new Promise(r=>setTimeout(r,10));releaseLate();await late;releaseAck();await pending;await assert.rejects(tx.get('k'));s.assertOutside();}finally{f.close();}
});
test('borrowed read reference expires when its own callback returns even while exterior remains open',async()=>{
 const {createInvocationStorage}=await load(),f=fixture();try{const s=createInvocationStorage(f.raw);await s.storage.transaction(async tx=>{await tx.put('k',1);let borrowed;await s.storage.transaction(async r=>{borrowed=r;assert.equal(await r.get('k'),1);});await assert.rejects(borrowed.get('k'));assert.equal(await tx.get('k'),1);});}finally{f.close();}
});
