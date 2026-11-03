import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';
test('native fixed old guard observation qualifies only the historical blocked invocation',async()=>{
 const f=await initialEntryHarness('normal');
 try{
  const valid=await f.stub.probeOldGuard();
  assert.equal(valid.guardVerified,true);
  assert.equal(valid.authorizesEffects,false);
  assert.equal(valid.operationalReadiness,false);
  assert.ok(f.requests.some(x=>x.endsWith('/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04')));
  for(const mode of ['active','changed-output','changed-dispatch','changed-withdrawal','changed-readiness','retry','bad-step','bad-time','duplicate','short','http-401']){
   f.oldGuardMode=mode;assert.equal((await f.stub.probeOldGuard()).status,'unavailable',mode);
  }
  const before=f.requests.length;
  assert.equal((await f.stub.probeOldGuard('aborted')).status,'unavailable');
  assert.equal((await f.stub.probeOldGuard('expired')).status,'unavailable');
  assert.equal(f.requests.length,before);
 }finally{await f.mf.dispose();await f.cleanup();}
});
