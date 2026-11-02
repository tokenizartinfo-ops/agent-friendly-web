import test from 'node:test';
import assert from 'node:assert/strict';
let api;try{api=await import('../lib/mcp-qa-finite-initial-material-records.mjs');}catch{/* absent product RED */}
test('C2-A record codec required before private storage',()=>{assert.equal(typeof api?.encodeFiniteInitialMaterialRecord,'function');assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');});
test('C2-A strict codec rejects scripts/getters/extra fields rather than admitting caller facts',()=>{
 assert.equal(typeof api?.decodeFiniteInitialMaterialRecord,'function');
 for(const bad of ['{}','{"purpose":"afw.finite-initial-material.v1","script":"private"}','null'])assert.throws(()=>api.decodeFiniteInitialMaterialRecord('InitialMaterial',bad));
 let invoked=false;assert.throws(()=>api.encodeFiniteInitialMaterialRecord('InitialClaim',{get purpose(){invoked=true;return 'no';}}));assert.equal(invoked,false);
});
