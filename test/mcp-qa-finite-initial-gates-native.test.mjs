import test from 'node:test';
import assert from 'node:assert/strict';
import {initialEntryHarness} from './fixtures/finite-initial-entry-world.mjs';

async function using(fn){
 const f=await initialEntryHarness('normal');
 try{await f.stub.configure('normal');await fn(f);}
 finally{await f.stub.restoreMethods();await f.mf.dispose();await f.cleanup();}
}
const has=(f,part)=>f.requests.some(x=>x.includes(part));
test('same original initial actor observes all preliminary gates without activation',()=>using(async f=>{
 const r=await f.stub.invoke(f.refs);
 assert.equal(r.status,'material_recorded',JSON.stringify(r));
 assert.equal(r.authorizesEffects,false);assert.equal(r.completePackage,false);
 assert.ok(has(f,'/instances/afw-mcp-closure-d56b5e850d24cc23058a024d73bae4c830a91c1fb9659f2e96282854ccae2c04'));
 assert.ok(has(f,'/workflows?per_page=100&page=1'));
 assert.equal(f.requests.filter(x=>x.includes('independent-closure-qa/deployments?per_page=1')).length>=4,true);
 assert.equal(f.uploads.length,1);assert.equal(f.restores.length,0);
 assert.equal(f.requests.some(x=>x.includes('/deployments')&&!x.endsWith('?per_page=1')),false);
}));
for(const fault of ['guard','inventory','schema','qa','history','custody'])test('preliminary '+fault+' failure cannot progress after arm',()=>using(async f=>{
 if(fault==='guard')f.oldGuardMode='http-401';
 if(fault==='inventory')f.inventoryMode='foreign';
 if(fault==='schema')await f.db.exec('DROP TRIGGER dossier_node_process_no_update');
 if(['qa','history','custody'].includes(fault))f.gateMode=fault;
 const r=await f.stub.invoke(f.refs),rows=await f.stub.snapshot();
 assert.equal(r.status,'admin_pending',fault);
 assert.equal(f.uploads.length,1);assert.equal(f.restores.length,0);
 assert.ok(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:arm-ack'),fault+' reached durable arm');
 assert.equal(rows.some(([k])=>k==='afw.finite-initial-cleanup.v1:activation-send'),false);
}));
