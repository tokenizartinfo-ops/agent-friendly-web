import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';

const triggers=[
 'dossier_node_process_no_update',
 'dossier_node_process_no_delete',
 'dossier_node_process_close_no_update',
 'dossier_node_process_close_no_delete'
];
test('native D1 installed immutable history triggers are checked before an initial gate can qualify',async()=>{
 const f=await initialEntryHarness('normal');
 try{
  assert.equal((await f.stub.probeHistorySchema()).schemaVerified,true);
  for(const name of triggers){
   const saved=await f.db.prepare("SELECT sql FROM sqlite_schema WHERE type='trigger' AND name=?").bind(name).first();
   assert.ok(saved?.sql,name);
   await f.db.exec('DROP TRIGGER '+name);
   assert.equal((await f.stub.probeHistorySchema()).status,'unavailable',name+' absent');
   const altered=saved.sql.replace(/SELECT RAISE\(ABORT,'[^']+'\)/,'SELECT 1');
   assert.notEqual(altered,saved.sql);
   await f.db.exec(altered);
   assert.equal((await f.stub.probeHistorySchema()).status,'unavailable',name+' altered');
   await f.db.exec('DROP TRIGGER '+name);
   await f.db.exec(saved.sql);
   assert.equal((await f.stub.probeHistorySchema()).schemaVerified,true,name+' restored');
  }
 }finally{await f.mf.dispose();await f.cleanup();}
});
