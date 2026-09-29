import assert from 'node:assert/strict';
import test from 'node:test';
import {scopeQuestionGuide} from '../lib/scope-question-guide.mjs';
import {missingIntakeQuestions} from '../lib/intake-question-coach.mjs';

const website='https://example.org/';
const draft={organization:'Example',website};
const context=(selected=['crawl'])=>({website,reviewed:true,scopeText:JSON.stringify({format:'afw-scan-scope',version:1,observedUrl:website,checkedAt:'2026-09-21T10:00:00.000Z',locale:'es',evidence:{},selected,control:'unknown'})});
test('only a freshly reviewed, matching scope can guide questions',()=>{
 for(const value of [null,{}, {...context(),reviewed:false},{...context(),website:'https://other.example/'},{...context(),scopeText:'{}'}])assert.equal(scopeQuestionGuide(draft,value,'es'),null);
 assert.equal(scopeQuestionGuide({...draft,website:'https://other.example/'},context(),'es'),null);
 assert.equal(scopeQuestionGuide({...draft,website:''},context(),'es'),null);
});
test('reviewed scope prioritizes relevant missing facts without changing the draft',()=>{
 const before=JSON.stringify(draft);const guide=scopeQuestionGuide(draft,context(),'es');
 assert.deepEqual(missingIntakeQuestions(draft,[],guide.order),['cms','hosting','audience','languages']);
 assert.deepEqual(missingIntakeQuestions(draft,['cms'],guide.order),['hosting','audience','languages']);
 assert.deepEqual(missingIntakeQuestions({...draft,cms:'Known',hosting:'Known'},[],guide.order),['audience','languages']);
 assert.deepEqual(missingIntakeQuestions({},[],guide.order).slice(0,2),['organization','website']);
 assert.equal(JSON.stringify(draft),before);
 assert.equal(guide.publicationAuthorized,false);
});
test('combined scope is localized, bounded and keeps every basic question once',()=>{
 for(const locale of ['es','en','pt']){
  const guide=scopeQuestionGuide(draft,context(['documents','crawl','trust','answers']),locale);
  assert.equal(new Set(guide.order).size,6);assert.equal(guide.actions.length,4);
  assert.ok(guide.reasons.cms);assert.ok(guide.reasons.audience);
  assert.deepEqual(new Set(guide.order),new Set(['organization','website','audience','languages','cms','hosting']));
 }
 assert.deepEqual(missingIntakeQuestions(draft,[],['unknown','cms','cms']),['cms','audience','languages','hosting']);
});
