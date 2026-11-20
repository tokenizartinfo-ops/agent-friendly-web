import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';

async function using(fn){
 const f=await initialEntryHarness('normal');
 try{await f.stub.configure('normal');assert.equal((await f.stub.invoke(f.refs)).status,'material_recorded');f.inventoryProbe=true;await fn(f);}
 finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
}
test('initial inventory accepts only its actual active bootstrap instance',()=>using(async f=>{
 const r=await f.stub.probeInitialInventory();
 assert.equal(r.currentInitialObserved,true);
 assert.equal(r.otherWorkflowsTerminal,true);
 assert.equal(r.authorizesEffects,false);
 assert.equal(r.operationalReadiness,false);
 f.inventoryMode='waiting';assert.equal((await f.stub.probeInitialInventory()).currentInitialObserved,true);
 for(const mode of ['missing','terminal','duplicate','wrong-id','foreign','other-active']){
  f.inventoryMode=mode;
  assert.equal((await f.stub.probeInitialInventory()).status,'unavailable',mode);
 }
}));
