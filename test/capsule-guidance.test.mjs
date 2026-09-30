import test from 'node:test';
import assert from 'node:assert/strict';
import {capsuleGuideState,capsuleEvidenceMatches,capsuleFilesObservedUnchanged,CAPSULE_GUIDE_COPY} from '../lib/capsule-guidance.mjs';
const base={projectId:'example',loadState:'ready',status:'owner_approval_pending',canDecide:true,allowBuild:true,comparisonStatus:'complete'};
test('does not imply a saved project, loaded evidence or build permission',()=>{
 assert.equal(capsuleGuideState({...base,projectId:''}),'save');
 assert.equal(capsuleGuideState({...base,loadState:'loading'}),'loading');
 assert.equal(capsuleGuideState({...base,loadState:'failed'}),'unavailable');
 assert.equal(capsuleGuideState({...base,status:''}),'prepare');
 assert.equal(capsuleGuideState({...base,status:'',allowBuild:false}),'awaitPreparation');
 assert.equal(capsuleGuideState({...base,status:'unexpected'}),'unknown');
});
test('terminal states take precedence over older comparisons and role capabilities',()=>{
 for(const status of ['expired','rejected']) assert.equal(capsuleGuideState({...base,status,comparisonStatus:'incomplete'}),status);
 assert.equal(capsuleGuideState({...base,comparisonStatus:'incomplete'}),'incomplete');
});
test('guides comparison before a decision and never treats approval as deployment',()=>{
 assert.equal(capsuleGuideState({...base,comparisonStatus:''}),'compare');
 assert.equal(capsuleGuideState(base),'review');
 assert.equal(capsuleGuideState({...base,canDecide:false}),'waiting');
 assert.equal(capsuleGuideState({...base,status:'maintainer_approval_pending',canDecide:false}),'waiting');
 assert.equal(capsuleGuideState({...base,status:'approved_for_manual_handoff',comparisonStatus:''}),'compare');
 assert.equal(capsuleGuideState({...base,status:'approved_for_manual_handoff'}),'handoff');
});
test('guidance only returns a known informational state and has complete localized explanations',()=>{
 const states=['save','loading','comparisonLoading','comparisonUnavailable','unavailable','prepare','awaitPreparation','unknown','expired','rejected','incomplete','compare','review','waiting','handoff','observedUnchanged'];
 for(const copy of Object.values(CAPSULE_GUIDE_COPY))for(const state of states){assert.equal(copy.states[state].length,2);assert.ok(copy.states[state].every(Boolean));}
 const input=Object.freeze({...base});capsuleGuideState(input);assert.equal(input.canDecide,true);
});
test('acknowledges all observed files only for the approved matching version',()=>{
 const hash='a'.repeat(64);
 const file={packagePath:'files/llms.txt',destinationPath:'/llms.txt',operation:'create_or_replace',sha256:hash};
 const capsule={capsuleId:'B',integrity:{manifestSha256:hash},files:[file]};
 const resource={...file,proposedSha256:hash,currentSha256:'b'.repeat(64),httpStatus:200,status:'unchanged'};
 const comparison={capsuleId:'B',manifestSha256:hash,status:'complete',resources:[resource]};
 assert.equal(capsuleFilesObservedUnchanged(capsule,comparison),true); // normalized text may have different bytes
 for(const invalid of [null,{...comparison,status:'incomplete'},{...comparison,capsuleId:'A'},{...comparison,resources:[]},{...comparison,resources:[resource,resource]},...['changed','missing','unavailable','manual_review_required'].map(status=>({...comparison,resources:[{...resource,status}]})),{...comparison,resources:[{...resource,proposedSha256:'c'.repeat(64)}]},{...comparison,resources:[{...resource,destinationPath:'/robots.txt'}]}]){
  assert.equal(capsuleFilesObservedUnchanged(capsule,invalid),false);
 }
 assert.equal(capsuleFilesObservedUnchanged({...capsule,files:[]},comparison),false);
 const input={...base,status:'approved_for_manual_handoff',filesObservedUnchanged:true};
 assert.equal(capsuleGuideState(input),'observedUnchanged');
 assert.equal(capsuleGuideState({...input,status:'owner_approval_pending'}),'review');
 assert.equal(capsuleGuideState({...input,status:'expired'}),'expired');
 assert.equal(capsuleGuideState({...input,comparisonState:'failed'}),'comparisonUnavailable');
});
test('does not advance using comparisons from another version or after a failed refresh',()=>{
 const capsule={capsuleId:'B',integrity:{manifestSha256:'new'}};
 assert.equal(capsuleEvidenceMatches(capsule,{capsuleId:'A',manifestSha256:'old'}),false);
 assert.equal(capsuleEvidenceMatches(capsule,{capsuleId:'B',manifestSha256:'old'}),false);
 assert.equal(capsuleEvidenceMatches(capsule,{capsuleId:'B',manifestSha256:'new'}),true);
 assert.equal(capsuleEvidenceMatches(null,null),false);
 assert.equal(capsuleGuideState({...base,comparisonState:'failed'}),'comparisonUnavailable');
 assert.equal(capsuleGuideState({...base,comparisonState:'loading'}),'comparisonLoading');
});
