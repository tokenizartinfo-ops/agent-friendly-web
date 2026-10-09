import test from 'node:test';
import assert from 'node:assert/strict';
import * as catalog from '../lib/assistance-qa-closure-catalog.mjs';

test('proof states its limited scope and rejects legacy claims and hostile data without reading getters',()=>{
 assert.equal(typeof catalog.isQaProvisioningReservation,'function');
 const ref='a'.repeat(64),proof={contract:'afw-qa-provisioning/v2',recordRef:ref,state:'reserved',scope:'own-resource-reservation'};
 assert.equal(catalog.isQaProvisioningReservation(proof,ref),true);
 let invoked=0;
 const getter={...proof};Object.defineProperty(getter,'state',{enumerable:true,get(){invoked++;return 'reserved';}});
 for(const value of [null,[],{contract:'afw-qa-provisioning/v1',recordRef:ref,state:'exclusive'}, {...proof,scope:'global-custody'}, {...proof,state:'exclusive'}, {...proof,recordRef:'b'.repeat(64)}, {...proof,secret:'unexpected'}, {...proof,[Symbol('hidden')]:true},getter,Object.create(proof)])assert.equal(catalog.isQaProvisioningReservation(value,ref),false);
 assert.equal(catalog.isQaProvisioningReservation(proof,'bad-ref'),false);assert.equal(invoked,0);
});
