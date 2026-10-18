import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/intake-answer-review.mjs');
test('the small review includes only supplied basic answers in human language',async()=>{
 const {intakeAnswerReview}=await load();
 const draft={organization:'Example',website:'https://example.org/',siteType:'commerce',goals:['content'],languages:['es','en'],cms:'Git',hosting:'Cloudflare',audience:'Local shops',notes:'private note',approverEmail:'private@example.invalid',authorizedResources:['payment'],control:'full'};
 for(const locale of ['es','en','pt']){
  const review=intakeAnswerReview(draft,locale);
  assert.equal(review.length,8);assert.ok(review.every(row=>row.value&&row.label));
  assert.notEqual(review.find(row=>row.field==='siteType').value,'commerce');
  assert.notEqual(review.find(row=>row.field==='goals').value,'content');
  assert.notEqual(review.find(row=>row.field==='languages').value,'es, en');
  assert.doesNotMatch(JSON.stringify(review),/private note|private@example|payment|control/);
 }
 assert.equal(draft.siteType,'commerce');
});
test('empty, pending and legacy answers do not become invented facts',async()=>{
 const {intakeAnswerReview}=await load();
 assert.deepEqual(intakeAnswerReview({},'es'),[]);
 assert.deepEqual(intakeAnswerReview({cms:'',deferredQuestions:['cms']},'es'),[]);
 assert.equal(intakeAnswerReview({goals:['Objetivo histórico'],languages:['English']},'es').length,2);
});
