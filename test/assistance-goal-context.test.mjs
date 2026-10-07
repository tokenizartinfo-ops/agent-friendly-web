import test from 'node:test';
import assert from 'node:assert/strict';
const contract = await import('../lib/assistance-goal-context.mjs').catch(() => ({}));
const now = 1791323000000;
function fixture() {
 const grant = { version:'afw.assistance-goals-consent.v1',purpose:'orientation',scope:'goal-guidance',projectId:'own',userId:'owner',eventId:'a'.repeat(64),sequence:7,issuedAt:now-1000,expiresAt:now+60000 };
 const lease = { eventId:grant.eventId,projectRef:'b'.repeat(64),runId:'11111111-1111-4111-8111-111111111111',projectId:'own',userId:'owner',revision:3,topic:'orientation',expiresAt:now+30000 };
 const project = { id:'own',userId:'owner',revision:3,siteType:'commerce',goalsJson:'["discovery","content"]',notes:'PRIVATE NOTES',ownerEmail:'private@example.test',website:'https://private.example.test' };
 return { grant,lease,project,authority:{granted:true,sequence:7},now };
}
test('goal guidance projection is exact and excludes identity, free text and domain', () => {
 assert.equal(typeof contract.projectAssistanceGoalContext,'function');
 const result = contract.projectAssistanceGoalContext(fixture());
 assert.deepEqual(result,{version:'afw.assistance-goal-context.v1',eventId:'a'.repeat(64),projectRef:'b'.repeat(64),runId:'11111111-1111-4111-8111-111111111111',revision:3,expiresAt:now+30000,declarations:{siteType:'commerce',goals:['discovery','content']},evidenceStatus:'owner_declared',operationsAuthorized:false});
 assert.doesNotMatch(JSON.stringify(result),/PRIVATE|private@|"owner"|https:/);
});
test('expired, future and oversized windows are refused', () => {
 for(const mutate of [f=>{f.now=f.grant.expiresAt;},f=>{f.now=f.lease.expiresAt;},f=>{f.grant.issuedAt=now+1;},f=>{f.grant.expiresAt=f.grant.issuedAt+600001;}]) {
  const f=fixture();mutate(f);assert.throws(()=>contract.projectAssistanceGoalContext(f),/Invalid assistance goal context/);
 }
});
test('ownership, lease, revision, consent epoch and purpose cannot be substituted', () => {
 for(const mutate of [f=>{f.project.userId='another';},f=>{f.lease.projectId='another';},f=>{f.lease.eventId='c'.repeat(64);},f=>{f.project.revision++;},f=>{f.authority.granted=false;},f=>{f.authority.sequence++;},f=>{f.grant.version='afw-copilot-processing-v1';},f=>{f.lease.topic='delivery';},f=>{f.grant.scope='all';},f=>{f.grant.notes='private';}]) {
  const f=fixture();mutate(f);assert.throws(()=>contract.projectAssistanceGoalContext(f),/Invalid assistance goal context/);
 }
});
test('unknown or malformed declarations remain unavailable rather than becoming instructions', () => {
 for(const value of ['["publish everything"]','{}','broken','["discovery","discovery"]']) {
  const f=fixture();f.project.goalsJson=value;assert.throws(()=>contract.projectAssistanceGoalContext(f),/Invalid assistance goal context/);
 }
 const f=fixture();f.project.siteType='employee@example.test';assert.throws(()=>contract.projectAssistanceGoalContext(f),/Invalid assistance goal context/);
});
