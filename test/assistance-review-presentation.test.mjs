import test from 'node:test';
import assert from 'node:assert/strict';
const view=await import('../lib/assistance-review-presentation.mjs').catch(()=>({}));
test('review guidance offers one step without equating metadata with a solution',()=>{
 assert.equal(typeof view.assistanceReviewPresentation,'function');
 assert.equal(view.assistanceReviewPresentation({revision:3},3,'es'),null);
 const receipt={revision:3,topic:'orientation',stale:false,review:{outcome:'reviewed',reviewedAt:Date.now()}};
 for(const locale of ['es','en','pt'])for(const topic of ['orientation','save','comparison','delivery']){
  const result=view.assistanceReviewPresentation({...receipt,topic},3,locale);
  assert.ok(result.message&&result.label&&result.href.startsWith('#dossier-'));
  assert.doesNotMatch(result.message,/resuelt|resolved|solved|resolvido|certific/i);
 }
 assert.equal(view.assistanceReviewPresentation(receipt,4,'es').href,null);
 assert.equal(view.assistanceReviewPresentation({...receipt,review:{...receipt.review,outcome:'superseded'}},3,'es').href,null);
 assert.match(view.assistanceReviewPresentation({...receipt,review:{...receipt.review,outcome:'intervention_required'}},3,'es').message,/atención/);
});
