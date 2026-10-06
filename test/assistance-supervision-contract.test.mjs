import test from 'node:test';
import assert from 'node:assert/strict';
import {projectDossierEvent,validateDossierSignal} from '../lib/dossier-supervision.mjs';
const contract=await import('../lib/assistance-supervision-contract.mjs').catch(()=>({}));
const secret='synthetic-assistance-purpose-secret-minimum-32';
const source={id:'help-'+'a'.repeat(64),projectId:'synthetic-project',type:'assistance_requested',createdAt:'2026-10-06T17:25:20.817Z',payload:{contract:'afw.assistance-request.v1',requestId:'71821ff8-cf57-41b6-8a4f-58c034e36a2f',expectedRevision:3,topic:'orientation'}};
test('assistance has independent stable event identity at the same dossier revision',async()=>{
 assert.equal(typeof contract.projectAssistanceSignal,'function');
 const first=await contract.projectAssistanceSignal(source,secret);
 assert.deepEqual(first,await contract.projectAssistanceSignal(source,secret));
 const next=await contract.projectAssistanceSignal({...source,id:'help-'+'b'.repeat(64),payload:{...source.payload,requestId:'81821ff8-cf57-41b6-8a4f-58c034e36a2f'}},secret);
 assert.equal(first.revision,next.revision);assert.notEqual(first.eventId,next.eventId);assert.equal(first.projectRef,next.projectRef);
 const saved=await projectDossierEvent({id:source.id,projectId:source.projectId,type:'project_updated',revision:3,createdAt:source.createdAt},secret);
 assert.notEqual(first.projectRef,saved.projectRef);assert.notEqual(first.eventId,saved.eventId);
 assert.throws(()=>validateDossierSignal(first));
});
test('projection rejects arbitrary or private payload and emits only exact operational fields',async()=>{
 assert.equal(typeof contract.projectAssistanceSignal,'function');
 const signal=await contract.projectAssistanceSignal(source,secret);
 assert.deepEqual(Object.keys(signal).sort(),['eventId','kind','observedAt','projectRef','revision','topic','version']);
 assert.doesNotMatch(JSON.stringify(signal),/synthetic-project|help-|71821ff8|@/);
 for(const change of [{topic:'resolved'},{expectedRevision:0},{notes:'private'},{contract:'other'}])await assert.rejects(contract.projectAssistanceSignal({...source,payload:{...source.payload,...change}},secret));
 for(const change of [{type:'project_updated'},{createdAt:'yesterday'},{id:'arbitrary'}])await assert.rejects(contract.projectAssistanceSignal({...source,...change},secret));
 await assert.rejects(contract.projectAssistanceSignal(source,''));
});
test('receiver contract refuses claims of resolution, added context and a different version',()=>{
 assert.equal(typeof contract.validateAssistanceSignal,'function');
 const signal={version:'afw-assistance-event-v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),revision:3,kind:'assistance_requested',topic:'delivery',observedAt:source.createdAt};
 assert.deepEqual(contract.validateAssistanceSignal(signal),signal);
 for(const change of [{state:'resolved'},{notes:'private'},{version:'afw-dossier-event-v1'},{topic:'other'},{eventId:'x'},{revision:1.5}])assert.throws(()=>contract.validateAssistanceSignal({...signal,...change}));
});
