import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/intake-next-step-advice.mjs');

test('content goals guide the next useful question without inventing an answer',async()=>{
 const {intakeNextStepAdvice}=await load();
 const draft={website:'https://example.org/',goals:['content'],authorizedResources:[],control:'unknown'};
 const before=JSON.stringify(draft);
 for(const locale of ['es','en','pt']){
  const advice=intakeNextStepAdvice(draft,locale);
  assert.equal(advice.order[0],'website');assert.ok(advice.order.indexOf('audience')<advice.order.indexOf('cms'));
  assert.equal(advice.order.length,8);assert.equal(new Set(advice.order).size,8);
  assert.ok(advice.reasons.audience);assert.equal(advice.recommendedGoal,null);
  assert.equal(advice.publicationAuthorized,false);
 }
 assert.equal(JSON.stringify(draft),before);
});

test('a starting recommendation is only a preview choice and every goal has a plain explanation',async()=>{
 const {intakeNextStepAdvice}=await load();
 for(const locale of ['es','en','pt']){
  const advice=intakeNextStepAdvice({},locale);
  assert.equal(advice.recommendedGoal,'content');
  assert.deepEqual(Object.keys(advice.goalHelp).sort(),['actions','content','discovery','payments','tools']);
  assert.ok(advice.reasons.goals);assert.ok(advice.help.cms);assert.ok(advice.help.hosting);
  assert.equal(intakeNextStepAdvice({goals:['payments']},locale).recommendedGoal,null);
 }
});
