import test from 'node:test';
import assert from 'node:assert/strict';
import {FINITE_PREPARATION_CLEANUP_PREFIX as P,sealFinitePreparationCleanupRecord as seal,encodeFinitePreparationCleanupRecord as encode,decodeFinitePreparationCleanupRecord as decode} from '../lib/mcp-qa-finite-preparation-cleanup-records.mjs';
import {QA_CLOUD_CLOSED_PINS} from '../lib/mcp-qa-cloud-closed-pins.mjs';
const I0=1000000,C0=I0+900000,C1=C0+180000,h='a'.repeat(64),m='b'.repeat(40),v='11111111-1111-4111-8111-111111111111';
function input(){return {capsuleHash:h,planHash:h,armAckHash:h,activationCompletionHash:h,entryHash:h,materialHash:h,sourceRevision:m,sourceTree:m,qaVersionId:v,initialInstanceId:'afw-finite-initial-'+h,actorId:h,preconnectionId:h,I0,C0,C1,readerId:'9aa97ad1fc9afe3021cf69ea497d5190',publisherId:'05718105dcdfc92e55cc3624172c2740',readerExpiresAt:C1,publisherExpiresAt:C1,manifestHash:h,baselineVersionId:QA_CLOUD_CLOSED_PINS.canary.id,baselineDeploymentId:QA_CLOUD_CLOSED_PINS.canary.deploymentId,ownerSourceHash:h,preconnectionHash:h,stageApprovalHash:h,configurationApprovalHash:h,issuedAt:I0+400000,deadline:I0+405000};}
test('bounded immutable canonical domain-separated DATA exports only Enrollment/Ack',()=>{
 assert.equal(P,'afw.finite-preparation-cleanup.v1:');
 for(const [kind,value]of [['Enrollment',input()],['Ack',{enrollmentHash:h,stateHash:h,alarmAt:C0,acknowledgedAt:I0+401000}]]){
  const sealed=seal(kind,value),raw=encode(kind,sealed);assert.deepEqual(decode(kind,raw),sealed);assert(Object.isFrozen(sealed));assert(Buffer.byteLength(raw)<=8192);
  assert.throws(()=>decode(kind,raw+' '));assert.throws(()=>decode(kind,raw.replace(sealed.recordHash,'f'.repeat(64))));
  assert.throws(()=>seal(kind,{...value,unknown:true}));assert.throws(()=>seal('Send',value));assert.throws(()=>seal(kind,{...value,purpose:sealed.purpose}));
 }
});
test('reject accessors/prototypes/symbols/toJSON before executing user code',()=>{
 let executed=0;
 for(const value of [Object.assign(Object.create({}),input()),Object.assign(input(),{[Symbol('foreign')]:1}),Object.assign(input(),{toJSON(){executed++;}}),Object.defineProperty(input(),'capsuleHash',{enumerable:true,get(){executed++;return h;}})])assert.throws(()=>seal('Enrollment',value));
 assert.equal(executed,0);assert.throws(()=>decode('Enrollment',' '.repeat(8193)));
});
test('fixed pins, hashes, time grammar and same existing <=5s/C0 boundary',()=>{
 for(const patch of [{sourceRevision:h},{actorId:'slot'},{preconnectionId:m},{initialInstanceId:'new-owner'},{readerId:'0'.repeat(32)},{readerExpiresAt:C1-1},{publisherExpiresAt:C1-1},{C0:C0+1},{C1:C1+1},{issuedAt:NaN},{deadline:I0+405001},{deadline:I0+400000},{issuedAt:C0-1,deadline:C0+1},{baselineVersionId:v}])assert.throws(()=>seal('Enrollment',{...input(),...patch}));
});
