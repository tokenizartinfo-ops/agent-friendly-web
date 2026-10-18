import test from 'node:test';
import assert from 'node:assert/strict';
const load=()=>import('../lib/capsule-outcome.mjs');
const file={packagePath:'files/llms.txt',destinationPath:'/llms.txt',operation:'create_or_replace',sha256:'b'.repeat(64)};
const capsule={capsuleId:'c',version:1,status:'owner_approval_pending',createdAt:'2026-10-17T10:00:00Z',expiresAt:'2026-10-20T10:00:00Z',target:{origin:'https://example.com'},integrity:{manifestSha256:'a'.repeat(64)},files:[file]};
const comparison={capsuleId:'c',manifestSha256:'a'.repeat(64),status:'complete',observedAt:'2026-10-17T12:00:00Z',resources:[{...file,status:'unchanged',httpStatus:200,proposedSha256:file.sha256,currentSha256:'c'.repeat(64)}]};
const base={capsule,comparisonState:'ready',now:Date.parse('2026-10-18T12:00:00Z')};
test('a prepared or approved package never claims on-origin publication',async()=>{
 const {capsuleOutcome}=await load();
 assert.equal(capsuleOutcome(base).decision,'pending');
 const result=capsuleOutcome({...base,capsule:{...capsule,status:'approved_for_manual_handoff'}});
 assert.equal(result.decision,'approved_for_handoff');assert.equal(result.publicationProven,false);assert.equal(result.observation,'not_compared');
});
test('a dated comparison can show content matches without byte equality or site certification',async()=>{
 const {capsuleOutcome,capsuleOutcomeText}=await load();
 const result=capsuleOutcome({...base,comparison});
 assert.equal(result.observation,'observed_match');assert.equal(result.observedAt,comparison.observedAt);
 assert.equal(result.siteCertified,false);assert.equal(result.byteEqualityProven,false);
 const text=capsuleOutcomeText(result,'es');assert.ok(text.includes('/llms.txt'));assert.ok(text.includes(comparison.observedAt));assert.ok(!text.includes('undefined'));
});
test('wrong, future or unavailable comparisons cannot appear as successful verification',async()=>{
 const {capsuleOutcome}=await load();
 for(const options of [{comparison:{...comparison,capsuleId:'other'}},{comparison:{...comparison,observedAt:'2027-01-01T00:00:00Z'}},{comparison,comparisonState:'failed'}])assert.notEqual(capsuleOutcome({...base,...options}).observation,'observed_match');
 assert.equal(capsuleOutcome({...base,comparison:{...comparison,status:'incomplete'}}).observation,'incomplete');
 assert.equal(capsuleOutcome({...base,comparison:{...comparison,resources:[{...comparison.resources[0],status:'different'}]}}).observation,'differences');
 assert.equal(capsuleOutcome({...base,now:Date.parse('2026-10-22T00:00:00Z')}).decision,'expired');
});
test('score changes require the same origin and named method, separate from the external auditor',async()=>{
 const {capsuleOutcome}=await load();
 const history=[{id:'2',target:'https://example.com',checkedAt:'2026-10-17T12:00:00Z',score:80,methodology:'afw-v1'},{id:'1',target:'https://example.com',checkedAt:'2026-10-16T12:00:00Z',score:70,methodology:'afw-v1'}];
 assert.equal(capsuleOutcome({...base,history}).scoreChange.delta,10);
 assert.equal(capsuleOutcome({...base,history:[history[0],{...history[1],methodology:'other'}]}).scoreChange,null);
 assert.equal(capsuleOutcome({...base,history:[history[0],{...history[1],target:'https://other.example'}]}).scoreChange,null);
});
