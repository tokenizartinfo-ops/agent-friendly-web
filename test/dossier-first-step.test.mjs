import test from 'node:test';
import assert from 'node:assert/strict';

// Import dynamically so RED identifies the missing product model.
const load=()=>import('../lib/dossier-first-step.mjs');
const base={loaded:true,projectId:'own',draft:{website:'https://example.com',goals:['discovery']},saved:{website:'https://example.com',goals:['discovery']},observationState:'ready'};
test('a saved site and goal allow a first reading with technical details unknown',async()=>{
 const {dossierFirstStep}=await load();
 const step=dossierFirstStep(base);
 assert.equal(step.action,'audit');
 assert.equal(step.automatic,false);
 assert.equal(step.publicationAuthorized,false);
});
test('session, conflict and unsaved data take priority over reading',async()=>{
 const {dossierFirstStep}=await load();
 for(const [overrides,state] of [[{sessionRequired:true},'session'],[{conflict:true},'conflict'],[{draft:{...base.draft,goals:['contact']}},'save'],[{saving:true},'saving']])assert.equal(dossierFirstStep({...base,...overrides}).state,state);
});
test('reuse a current saved reading and do not turn a read failure into a new audit',async()=>{
 const {dossierFirstStep}=await load();
 const observed={target:'https://example.com/menu',checkedAt:'2026-10-17T12:00:00Z'};
 assert.equal(dossierFirstStep({...base,observation:observed}).action,'review');
 assert.equal(dossierFirstStep({...base,observationState:'failed'}).action,'retry_read');
 assert.equal(dossierFirstStep({...base,observationState:'loading'}).action,null);
 assert.equal(dossierFirstStep({...base,observation:{...observed,target:'https://other.example'}}).action,'audit');
});
test('missing objective or an invalid website stays in the guide',async()=>{
 const {dossierFirstStep}=await load();
 assert.equal(dossierFirstStep({...base,saved:{...base.saved,goals:[]},draft:{...base.draft,goals:[]}}).action,'guide');
 assert.equal(dossierFirstStep({...base,saved:{website:''},draft:{website:''}}).action,'guide');
});
