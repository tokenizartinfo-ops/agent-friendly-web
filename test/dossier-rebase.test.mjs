import assert from 'node:assert/strict';
import test from 'node:test';
import {normalizeIntake} from '../lib/intake.mjs';
import {planDossierRebase,resolveDossierRebase} from '../lib/dossier-rebase.mjs';
import {applyIntakeDraft} from '../lib/intake-draft-review.mjs';
const base=normalizeIntake({organization:'Base',website:'https://example.org/',role:'owner',control:'unknown',authorizedResources:['llms'],approverEmail:'old@example.org'});
test('full dossier rebase retains descriptive changes and newer unrelated fields',()=>{
 const draft={...base,siteType:'business',contentSources:['faq'],dnsProvider:'Provider'};
 const current={...base,organization:'Remote'};
 const plan=planDossierRebase(base,draft,current,2);
 assert.equal(plan.conflicts.length,0);const result=resolveDossierRebase(current,2,plan,{});
 assert.equal(result.organization,'Remote');assert.equal(result.dnsProvider,'Provider');assert.deepEqual(result.contentSources,['faq']);assert.equal(base.siteType,'');
});
test('permissions and responsible contacts require a choice even when the remote field did not change',()=>{
 for(const [field,value] of [['role','maintainer'],['control','full'],['authorizedResources',['llms','robots']],['approverEmail','new@example.org'],['crawlerTrainingPolicy','allow'],['maintainerName','New maintainer'],['monitoringPreference','monthly']]){
  const plan=planDossierRebase(base,{...base,[field]:value},base,2);
  assert.equal(plan.changes.length,0);assert.equal(plan.conflicts[0].reason,'explicit_review');
  assert.throws(()=>resolveDossierRebase(base,2,plan,{}),/missing_choice/);
  assert.deepEqual(resolveDossierRebase(base,2,plan,{[field]:'local'})[field],value);
  assert.deepEqual(resolveDossierRebase(base,2,plan,{[field]:'current'})[field],base[field]);
 }
 assert.throws(()=>applyIntakeDraft(base,[{field:'role',before:'owner',after:'admin'}]),/invalid_proposal/,'assistant permissions remain restricted');
});
test('concurrent same-field changes, stale revisions and stale snapshots fail closed',()=>{
 const current={...base,siteType:'museum'};const plan=planDossierRebase(base,{...base,siteType:'business'},current,2);
 assert.equal(plan.conflicts[0].reason,'concurrent_change');assert.throws(()=>resolveDossierRebase(current,2,plan,{}),/missing_choice/);
 assert.throws(()=>resolveDossierRebase(current,3,plan,{siteType:'local'}),/stale_revision/);
 assert.throws(()=>resolveDossierRebase({...current,notes:'changed'},2,plan,{siteType:'local'}),/stale_snapshot/);
 assert.equal(resolveDossierRebase(current,2,plan,{siteType:'current'}).siteType,'museum');
});
test('unknown fields, malformed shapes and tampered plans never become draft updates',()=>{
 for(const change of [{admin:true},{role:['owner']},{contentSources:'faq'},{notes:'x'.repeat(1201)}])assert.throws(()=>planDossierRebase(base,{...base,...change},base,2),/invalid_proposal/);
 const plan=planDossierRebase(base,{...base,notes:'Local'},base,2);
 assert.throws(()=>resolveDossierRebase(base,2,{...plan,contract:'wrong'},{}),/invalid_plan/);
 assert.throws(()=>resolveDossierRebase(base,2,{...plan,changes:[{field:'role',before:'owner',after:'admin'}]},{}),/explicit_review_required/);
 const updated=resolveDossierRebase(base,2,plan,{});assert.equal(updated.notes,'Local');assert.equal(base.notes,'');
});

test('deferral and resume participate in CAS recovery without losing concurrent preferences',()=>{
 const base=normalizeIntake({website:'https://example.com'}),draft={...base,deferredQuestions:['hosting']},current={...base,organization:'Remote'};
 const plan=planDossierRebase(base,draft,current,2);
 assert.deepEqual(resolveDossierRebase(current,2,plan,{}).deferredQuestions,['hosting']);
 const deferred={...base,deferredQuestions:['hosting']};
 const concurrent={...deferred,deferredQuestions:['hosting','cms']};
 const resume=planDossierRebase(deferred,{...deferred,deferredQuestions:[]},concurrent,3);
 assert.equal(resume.conflicts[0].field,'deferredQuestions');
 assert.throws(()=>resolveDossierRebase(concurrent,3,resume,{}),/missing_choice/);
 assert.deepEqual(resolveDossierRebase(concurrent,3,resume,{deferredQuestions:'local'}).deferredQuestions,[]);
 assert.deepEqual(resolveDossierRebase(concurrent,3,resume,{deferredQuestions:'current'}).deferredQuestions,['hosting','cms']);
});
