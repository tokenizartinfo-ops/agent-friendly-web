import assert from 'node:assert/strict';
import test from 'node:test';
import {dossierProgress} from '../lib/dossier-progress.mjs';

const basic={organization:'Example',website:'https://example.org/',audience:'Visitors',languages:['es'],cms:'WordPress',hosting:'Provider'};
const complete={...basic,role:'Owner',siteType:'business',goals:['discovery'],contentSources:['website'],control:'self',authorizedResources:['llms'],publicationPreference:'site',crawlerSearchPolicy:'allow',crawlerTrainingPolicy:'deny',approverName:'Example',approverEmail:'example@example.org'};
const state=(draft=basic,extra={})=>({draft,saved:draft,loaded:true,projectId:'p',status:'idle',...extra});
test('progress counts actual basic fields and separates draft changes from acknowledged data',()=>{
 const model=dossierProgress(state({...basic,audience:''},{saved:basic,status:'saved'}));
 assert.equal(model.basicCount,5);assert.equal(model.savedBasicCount,6);assert.deepEqual(model.changed,['audience']);assert.equal(model.state,'unsaved');assert.equal(model.target,'dossier-save');
 assert.equal(dossierProgress(state(basic)).basicCount,6);
 assert.equal(dossierProgress(state(basic)).state,'decisions');
 assert.equal(dossierProgress(state({}, {saved:{}})).basicCount,0);
});
test('connection and recovery take precedence and never claim unsaved data was stored',()=>{
 assert.equal(dossierProgress(state(basic,{loaded:false,status:'loading'})).state,'loading');
 assert.equal(dossierProgress(state(basic,{loaded:false,status:'error'})).state,'unavailable');
 assert.equal(dossierProgress(state(basic,{sessionRequired:true})).state,'session');
 assert.equal(dossierProgress(state(basic,{conflict:true,status:'error'})).state,'conflict');
 assert.equal(dossierProgress(state(basic,{status:'saving'})).state,'saving');
 assert.equal(dossierProgress(state({...basic,cms:'Wix'},{saved:basic,status:'error'})).state,'retry');
});
test('guidance transitions to explicit decisions, verification, then delivery review without permission',()=>{
 assert.equal(dossierProgress(state(basic)).target,'dossier-identity');
 assert.equal(dossierProgress(state({...basic,role:'Owner',siteType:'business',goals:['discovery']})).target,'dossier-content');
 assert.equal(dossierProgress(state(complete)).state,'verification');
 const end=dossierProgress(state(complete,{verified:true,verifiedUntil:new Date(Date.now()+60000).toISOString()}));
 assert.equal(dossierProgress(state(complete,{verified:true,verifiedUntil:'2000-01-01T00:00:00.000Z'})).state,'verification');
 assert.equal(end.state,'delivery');assert.equal(end.publicationAuthorized,false);assert.equal(end.target,'dossier-capsule');
 assert.equal(dossierProgress(state({...complete,control:'unknown'},{verified:true,verifiedUntil:new Date(Date.now()+60000).toISOString()})).target,'dossier-control');
});
test('no snapshot is invented; invalid addresses cannot lead to saving or completed basics',()=>{
 const before=JSON.stringify(basic);assert.equal(dossierProgress(state(basic,{loaded:false,status:'error'})).savedBasicCount,null);assert.equal(JSON.stringify(basic),before);
 for(const website of ['', 'not a URL']){const m=dossierProgress(state({...basic,website},{saved:{}}));assert.equal(m.state,website?'website':'basics');assert.equal(m.basicCount,5);}
 const m=dossierProgress(state({...basic,notes:'new note'},{saved:basic}));assert.deepEqual(m.changed,['notes']);assert.equal(m.state,'unsaved');
});
