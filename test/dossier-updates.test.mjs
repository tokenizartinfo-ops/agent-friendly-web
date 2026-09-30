import test from 'node:test';
import assert from 'node:assert/strict';
import {dossierUpdatesReadState,dossierUpdates,DOSSIER_UPDATES_READ_COPY} from '../lib/dossier-updates.mjs';

test('updates distinguish a confirmed empty history from loading and a failed scoped read',()=>{
 const scope={projectId:'A',website:'https://example.com'};
 assert.equal(dossierUpdatesReadState({...scope}),'loading');
 assert.equal(dossierUpdatesReadState({...scope,ready:scope}),'ready');
 assert.equal(dossierUpdatesReadState({...scope,ready:{...scope,projectId:'B'}}),'loading');
 assert.equal(dossierUpdatesReadState({...scope,ready:{...scope,website:'https://other.example'}}),'loading');
 assert.equal(dossierUpdatesReadState({...scope,ready:scope,failure:scope}),'failed');
 assert.equal(dossierUpdatesReadState({...scope,ready:scope,failure:{...scope,projectId:'B'}}),'ready');
 assert.equal(dossierUpdatesReadState({projectId:'',website:scope.website}),'save');
 for(const readState of ['save','loading','failed']){
  const result=dossierUpdates({website:scope.website,history:[],readState});
  assert.equal(result.readState,readState);
  assert.deepEqual(result.items,[]);
  assert.equal(result.scheduledMonitoring,false);
  for(const copy of Object.values(DOSSIER_UPDATES_READ_COPY))assert.ok(copy[readState]);
 }
 assert.equal(dossierUpdates({website:scope.website,history:[],readState:'ready'}).readState,'ready');
 const cached={id:'old',target:scope.website,checkedAt:'2026-09-29T12:00:00Z',methodology:'v1',score:40};
 assert.deepEqual(dossierUpdates({website:scope.website,history:[cached],readState:'failed'}).items,[]);
});

test('updates report dated observations for this origin without inventing scheduled monitoring', async () => {
  const implementation = await import('../lib/dossier-updates.mjs').catch(() => ({}));
  assert.equal(typeof implementation.dossierUpdates, 'function');
  const history = [{ id: 'new', target: 'https://example.com', checkedAt: '2026-09-30T12:00:00Z', methodology: 'v1', score: 60 }, { id: 'old', target: 'https://example.com', checkedAt: '2026-09-29T12:00:00Z', methodology: 'v1', score: 40 }];
  const result = implementation.dossierUpdates({ website: 'https://example.com/about', history, monitoringPreference: 'monthly' });
  assert.equal(result.items[0].delta, 20);
  assert.equal(result.items[0].kind, 'observed_change');
  assert.equal(result.scheduledMonitoring, false);
  assert.equal(implementation.dossierUpdates({ website: 'https://other.example', history }).items.length, 0);
  const mismatch = implementation.dossierUpdates({ website: 'https://example.com', history: [{ ...history[0], methodology: 'v2' }, history[1]] });
  assert.equal(mismatch.items[0].kind, 'observed_snapshot');
  assert.equal(mismatch.items[0].delta, undefined);
});
