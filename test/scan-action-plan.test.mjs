import assert from 'node:assert/strict';
import test from 'node:test';
import {buildScanActionPlan, prepareScopeBrief} from '../lib/scan-action-plan.mjs';
import {buildPublicationCapsule, capsuleState} from '../lib/publication-capsule.mjs';

const scan = {
  target: 'https://restaurant.example/', checkedAt: '2026-09-20T12:00:00.000Z',
  evidence: {robots:true,sitemap:false,directAnswers:false,structuredData:false,llms:false,markdown:false,ownership:true,sources:true},
  limits: ['Only public responses were checked'],
};

test('prioritizes observed gaps without treating untested signals as missing', () => {
  const plan=buildScanActionPlan(scan,'es');
  assert.equal(plan.actions[0].id,'crawl');
  assert.equal(plan.actions.find(a=>a.id==='trust').state,'detected');
  assert.equal(plan.actions.find(a=>a.id==='documents').signals.find(s=>s.id==='llms').state,'not_detected');
  const unknown=buildScanActionPlan({...scan,evidence:{}},'es');
  assert.ok(unknown.actions.every(a=>a.state==='unverified'));
  assert.deepEqual(plan.scanLimits,scan.limits);
  assert.equal(plan.actions.some(a=>['mcp','payments','webmcp'].includes(a.id)),false);
});

test('requires an explicit current selection and review before exporting a scope', () => {
  const plan=buildScanActionPlan(scan,'en');
  assert.throws(()=>prepareScopeBrief(plan,{selected:['documents'],reviewed:false}));
  assert.throws(()=>prepareScopeBrief(plan,{selected:[],reviewed:true}));
  assert.throws(()=>prepareScopeBrief(plan,{selected:['payments'],reviewed:true}));
  const brief=prepareScopeBrief(plan,{selected:['documents'],reviewed:true,control:'unknown'});
  assert.equal(brief.status,'scope_reviewed_not_authorized');
  assert.deepEqual(brief.capsulePreparation.suggestedResources,['llms','llms_full']);
  assert.equal(brief.capsulePreparation.publicationAuthorized,false);
  assert.equal(brief.capsulePreparation.requiresAuthenticatedDossier,true);
  assert.ok(brief.pending.length>=4);
  assert.equal(brief.price,null);
});

test('does not recommend a document pair when it was not selected or already detected', () => {
  const plan=buildScanActionPlan({...scan,evidence:{...scan.evidence,llms:true,markdown:true}},'pt');
  assert.throws(()=>prepareScopeBrief(plan,{selected:['documents'],reviewed:true}));
  const brief=prepareScopeBrief(plan,{selected:['answers'],reviewed:true,control:'provider'});
  assert.deepEqual(brief.capsulePreparation.suggestedResources,[]);
  assert.equal(brief.deliveryMode,'assisted');
});

test('exports allowlisted public findings, excluding arbitrary scan payload and URL queries', () => {
  const plan=buildScanActionPlan({...scan,target:scan.target+'?private=secret',notes:'PRIVATE',evidence:{...scan.evidence,password:'secret'}},'es');
  const brief=prepareScopeBrief(plan,{selected:['crawl'],reviewed:true,notes:'PRIVATE'});
  const json=JSON.stringify(brief);
  assert.equal(json.includes('PRIVATE'),false);
  assert.equal(json.includes('secret'),false);
  assert.equal(brief.target,'https://restaurant.example');
  assert.throws(()=>buildScanActionPlan({...scan,target:'javascript:alert(1)'},'es'));
});

test('keeps partial findings and all three localized scopes meaningful', () => {
  for(const locale of ['es','en','pt']) {
    const plan=buildScanActionPlan(scan,locale);
    const brief=prepareScopeBrief(plan,{selected:['crawl','documents'],reviewed:true,control:'self'});
    assert.equal(brief.locale,locale);
    assert.ok(brief.actions.every(a=>a.title&&a.deliverable&&a.self&&a.assisted));
    assert.equal(brief.actions.length,2);
  }
  const partial=buildScanActionPlan({...scan,evidence:{robots:true}},'es');
  assert.equal(partial.actions.find(a=>a.id==='crawl').state,'unverified');
});

test('selected document scope feeds the existing capsule builder without granting approval', () => {
  const brief=prepareScopeBrief(buildScanActionPlan(scan,'es'),{selected:['documents'],reviewed:true});
  // Explicit synthetic owner facts for the existing authenticated preparation flow.
  const capsule=buildPublicationCapsule({capsuleId:'synthetic-scan-journey',projectId:'synthetic-project',siteId:'synthetic-site',version:1,canonicalOrigin:brief.target,organization:'Restaurante ficticio',selectedResources:brief.capsulePreparation.suggestedResources,languages:['es','en','pt'],ownerRef:'synthetic-owner',maintainerRef:'synthetic-provider',maintainerRequired:true,createdAt:scan.checkedAt,expiresAt:'2026-09-21T12:00:00.000Z'});
  assert.equal(capsule.files.length,2);
  assert.equal(capsuleState({requiredRoles:capsule.approvals.requiredRoles,approvals:[],expiresAt:capsule.expiresAt,now:scan.checkedAt}),'owner_approval_pending');
  assert.equal(capsule.mode,'manual_handoff');
});
