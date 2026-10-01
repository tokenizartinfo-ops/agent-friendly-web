import assert from 'node:assert/strict';
import test from 'node:test';
import { readDelegatedProject } from '../lib/delegated-project-read.mjs';

const NOW = '2026-09-30T18:00:00.000Z';
const RESOURCE = 'https://private.example.invalid/mcp';
function fixture() {
  const context = {grantId:'g-a',subject:'owner-a',clientId:'client-a',resource:RESOURCE,scopes:['afw:project:read','afw:evidence:read']};
  const grant = {...context,projectId:'p-a',status:'active',revokedAt:null,expiresAt:'2026-09-30T19:00:00.000Z'};
  const project = {id:'p-a',userId:'owner-a',organization:'A',website:'https://a.example/',status:'draft',completion:40,revision:3,updatedAt:NOW,intake:{organization:'A',website:'https://a.example/'},notes:'private-notes',ownerEmail:'private@example.invalid'};
  const calls=[];
  const repository = {
    async getGrant(id){calls.push(['grant',id]);return grant;},
    async getOwnedProject(id,user){calls.push(['project',id,user]);return project;},
    async listCurrentObservations(id,user,origin){calls.push(['observations',id,user,origin]);return [
      {id:'o-a',projectId:'p-a',userId:'owner-a',targetOrigin:origin,checkedAt:NOW,readinessJson:'{"score":42,"level":"AF-2","methodology":"AFW"}',probesJson:'secret-probes'},
      {id:'o-old',projectId:'p-a',userId:'owner-a',targetOrigin:'https://old.example',checkedAt:NOW,readinessJson:'{"score":99}'},
      {id:'o-b',projectId:'p-b',userId:'owner-b',targetOrigin:origin,checkedAt:NOW,readinessJson:'{"score":100}'},
    ];},
  };
  return {context,grant,project,calls,repository,read:(extra={})=>readDelegatedProject({context,projectId:'p-a',operation:'project_summary',repository,resource:RESOURCE,now:()=>NOW,...extra})};
}

test('private summary uses a persisted grant and only exposes the bounded read contract',async()=>{
  const f=fixture();const result=await f.read();
  assert.equal(result.status,200);
  assert.deepEqual(Object.keys(result.data).sort(),['completion','id','nextQuestion','nextStep','organization','revision','status','updatedAt','website'].sort());
  assert.equal(result.data.nextQuestion.field,'goals');
  assert.equal(result.data.nextStep.reasonKey,'confirm_goal');
  assert.equal(result.data.nextStep.basedOnRevision,3);
  assert.ok(!JSON.stringify(result).includes('private'));
  assert.deepEqual(f.calls,[['grant','g-a'],['project','p-a','owner-a']]);
});

test('delegated guidance respects deferred questions and declared data without exporting private working memory',async()=>{
 const f=fixture();f.project.guidance={deferred:['goals','audience'],hasCms:true,hasHosting:true,hasContentSources:true};
 f.project.sessionJson='private-working-memory';
 const result=await f.read();assert.equal(result.data.nextQuestion.field,'languages');
 assert.ok(!JSON.stringify(result).includes('private'));
 f.project.intake={...f.project.intake,goals:['tools'],audience:'users',languages:['es'],control:'none'};
 f.project.guidance.deferred=[];
 const completed=await f.read();assert.equal(completed.data.nextQuestion,null);
 assert.equal(completed.data.nextStep.reasonKey,'review_proportional_scope');
});

test('missing, mismatched or malformed grants deny before project data is read',async()=>{
  for(const patch of [null,{subject:'owner-b'},{clientId:'other'},{resource:'https://other.example/mcp'},{scopes:[]},{grantId:''}]){
    const f=fixture();const context=patch===null?null:{...f.context,...patch};
    const result=await f.read({context});assert.notEqual(result.status,200);
    assert.ok(!f.calls.some(x=>x[0]==='project'));
  }
  for(const change of [{projectId:'p-b'},{subject:'owner-b'},{clientId:'other'},{resource:'https://other.example/mcp'},{status:'revoked'},{revokedAt:NOW},{expiresAt:NOW},{expiresAt:'broken'},{scopes:[]}]){
    const f=fixture();Object.assign(f.grant,change);assert.notEqual((await f.read()).status,200);
    assert.ok(!f.calls.some(x=>x[0]==='project'));
  }
  const f=fixture();assert.notEqual((await f.read({projectId:'p-b'})).status,200);
  assert.notEqual((await f.read({resource:undefined})).status,200);
});

test('every call rereads revocation and current ownership',async()=>{
  const f=fixture();assert.equal((await f.read()).status,200);
  f.grant.revokedAt=NOW;assert.notEqual((await f.read()).status,200);
  f.grant.revokedAt=null;f.project.userId='owner-b';assert.notEqual((await f.read()).status,200);
  assert.equal(f.calls.filter(x=>x[0]==='grant').length,3);
});

test('evidence is separately scoped, current-origin-only and dated without leaking raw payloads',async()=>{
  const f=fixture();const result=await f.read({operation:'saved_evidence'});
  assert.equal(result.status,200);assert.equal(result.data.history.length,1);
  assert.deepEqual(result.data.history[0],{id:'o-a',target:'https://a.example',checkedAt:NOW,score:42,level:'AF-2',methodology:'AFW'});
  assert.ok(!JSON.stringify(result).includes('secret'));
  f.context.scopes=['afw:project:read'];assert.equal((await f.read({operation:'saved_evidence'})).status,403);
  f.context.scopes=['afw:evidence:read'];assert.equal((await f.read({operation:'saved_evidence'})).status,403);
});

test('unknown operations, unavailable storage, malformed rows and unsafe websites fail closed',async()=>{
  const f=fixture();assert.equal((await f.read({operation:'audit_site'})).status,400);
  assert.equal((await f.read({now:()=> 'invalid'})).status,503);
  f.repository.getGrant=async()=>{throw Error('database-password=secret');};
  const result=await f.read();assert.equal(result.status,503);assert.ok(!JSON.stringify(result).includes('secret'));
  const g=fixture();g.project.website='https://name:password@a.example/';
  const summary=await g.read();assert.equal(summary.status,200);assert.equal(summary.data.website,'');
  assert.equal((await g.read({operation:'saved_evidence'})).data.history.length,0);
});
