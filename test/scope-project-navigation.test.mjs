import assert from 'node:assert/strict';
import test from 'node:test';
import {canCarryScopeToProject,orderProjectsForScope} from '../lib/scope-project-navigation.mjs';
import {exportScanScope} from '../lib/scan-scope-transfer.mjs';
import {saveScopeHandoff,takeScopeHandoffResult} from '../lib/scan-scope-handoff.mjs';

const scope=exportScanScope({target:'https://example.com/',checkedAt:'2026-09-29T12:00:00.000Z',evidence:{robots:false}},{selected:['crawl'],reviewed:true,control:'unknown'});

test('an existing dossier can receive the temporary scope only for its website',()=>{
 assert.equal(canCarryScopeToProject(scope,'https://example.com/'),true);
 assert.equal(canCarryScopeToProject(scope,'https://example.com/section'),true);
 assert.equal(canCarryScopeToProject(scope,'https://agentfriendlyweb.dev/'),false);
 assert.equal(canCarryScopeToProject(scope,'not a website'),false);
 assert.equal(canCarryScopeToProject('invalid','https://example.com/'),false);
 const values=new Map();const storage={getItem:key=>values.get(key)??null,setItem:(key,value)=>values.set(key,value),removeItem:key=>values.delete(key)};
 if(canCarryScopeToProject(scope,'https://example.com/'))saveScopeHandoff(storage,scope,1000);
 assert.deepEqual(takeScopeHandoffResult(storage,2000),{status:'ready',text:scope});
 assert.deepEqual(takeScopeHandoffResult(storage,2001),{status:'empty',text:null});
});

test('matching existing dossiers come first without changing pagination order among peers',()=>{
 const projects=[
  {id:'other-1',website:'https://other.example/'},
  {id:'matching-1',website:'https://example.com/section'},
  {id:'other-2',website:'https://another.example/'},
  {id:'matching-2',website:'https://example.com/'},
 ];
 assert.deepEqual(orderProjectsForScope(projects,scope).map(project=>project.id),
  ['matching-1','matching-2','other-1','other-2']);
 assert.deepEqual(orderProjectsForScope(projects,'invalid').map(project=>project.id),projects.map(project=>project.id));
 assert.deepEqual(projects.map(project=>project.id),['other-1','matching-1','other-2','matching-2']);
});
