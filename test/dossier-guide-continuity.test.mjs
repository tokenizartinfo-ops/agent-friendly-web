import test from 'node:test';
import assert from 'node:assert/strict';
import {normalizeIntake,publicAttestationDraft,completionForIntake} from '../lib/intake.mjs';
import {missingIntakeQuestions} from '../lib/intake-question-coach.mjs';
import {createIntakeRehearsal} from '../lib/intake-workspace-rehearsal.mjs';
import {reconcileSavedDraft} from '../lib/project-save-reconciliation.mjs';

test('deferred questions survive serialization without becoming answers',()=>{
 const draft=normalizeIntake({website:'https://example.com',goals:['discovery'],deferredQuestions:['hosting','cms']});
 assert.deepEqual(draft.deferredQuestions,['hosting','cms']);
 assert.deepEqual(normalizeIntake(JSON.parse(JSON.stringify(draft))).deferredQuestions,['hosting','cms']);
 assert.equal(draft.hosting,'');
 assert.ok(!missingIntakeQuestions(draft,draft.deferredQuestions).includes('hosting'));
 assert.equal(completionForIntake(draft),completionForIntake({...draft,deferredQuestions:[]}));
 assert.equal(Object.hasOwn(publicAttestationDraft(draft),'deferredQuestions'),false);
});

test('answered or unknown fields cannot remain deferred',()=>{
 assert.deepEqual(normalizeIntake({cms:'WordPress',deferredQuestions:['cms','hosting','role','grant','password']}).deferredQuestions,['hosting']);
 for(const deferredQuestions of ['hosting',{hosting:true},['hosting',null],Array(20).fill('hosting')]){
  assert.deepEqual(normalizeIntake({deferredQuestions}).deferredQuestions,[]);
 }
 assert.deepEqual(normalizeIntake({deferredQuestions:['hosting','hosting']}).deferredQuestions,['hosting']);
});

test('saving and reopening preserve preferences; resuming does not fill fields',async()=>{
 const h=createIntakeRehearsal({versioned:true});
 let project=(await(await h.request('/api/projects')).json()).project;
 project=(await(await h.request('/api/projects',{method:'PUT',body:JSON.stringify({...project,cms:'',hosting:'',deferredQuestions:['hosting','cms']})})).json()).project;
 assert.deepEqual((await(await h.request('/api/projects')).json()).project.deferredQuestions,['hosting','cms']);
 const resumed=(await(await h.request('/api/projects',{method:'PUT',body:JSON.stringify({...project,deferredQuestions:[]})})).json()).project;
 assert.deepEqual(resumed.deferredQuestions,[]);
 assert.equal(resumed.hosting,'');
});

test('late save acknowledgement preserves a question deferred after submission',()=>{
 const submitted=normalizeIntake({website:'https://example.com'});
 const current={...submitted,deferredQuestions:['hosting']};
 assert.deepEqual(reconcileSavedDraft(submitted,submitted,current).deferredQuestions,['hosting']);
});
