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

test('a failed explicit audit keeps the reason reachable instead of inviting a silent repeat',async()=>{
 const {dossierFirstStep}=await load();
 assert.equal(dossierFirstStep({...base,writeFailed:true}).state,'audit_failed');
 assert.equal(dossierFirstStep({...base,writeFailed:true}).action,'review');
 assert.equal(dossierFirstStep({...base,writeFailed:true,sessionRequired:true}).state,'session');
 assert.equal(dossierFirstStep({...base,writeFailed:true,reading:true}).state,'reading');
});

test('first-step continuation saves the working draft first and stops on its failure',async()=>{
 const {saveDossierFirstStep}=await load();let writes=0,calls=[];
 const saveDossier=async()=>{calls.push('dossier');writes++;return true;};
 assert.equal(await saveDossierFirstStep({workingPending:true,saveWorking:async()=>{calls.push('working');return false;},saveDossier,dossierPending:true}),false);
 assert.deepEqual(calls,['working']);assert.equal(writes,0);calls=[];
 assert.equal(await saveDossierFirstStep({workingPending:true,saveWorking:async()=>{calls.push('working');return true;},saveDossier,dossierPending:true}),true);
 assert.deepEqual(calls,['working','dossier']);calls=[];
 assert.equal(await saveDossierFirstStep({workingPending:true,saveWorking:async()=>true,saveDossier,dossierPending:false}),true);assert.equal(writes,1);
 assert.equal(await saveDossierFirstStep({workingPending:true,saveDossier,dossierPending:true}),false);assert.equal(writes,1);
});
