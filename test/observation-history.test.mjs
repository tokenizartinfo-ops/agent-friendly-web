import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {summarizeObservationHistory,compareObservationHistory} from '../lib/observation-history.mjs';

const row=(id,targetOrigin,score,methodology='afw-v1')=>({id,targetOrigin,checkedAt:`2026-09-${id}T12:00:00.000Z`,readinessJson:JSON.stringify({score,level:'AF-2',methodology,categories:{private:'not-for-history'}})});

test('private history is bounded to the current origin and excludes raw evidence',()=>{
 const rows=[row('29','https://example.com',60),row('28','https://example.com.evil',99),row('27','https://example.com',40),...Array.from({length:8},(_,i)=>row(String(20-i),'https://example.com',35))];
 const history=summarizeObservationHistory(rows,'https://example.com/about');
 assert.equal(history.length,5);
 assert.deepEqual(history.map(item=>item.id),['29','27','20','19','18']);
 assert.equal(history[0].target,'https://example.com');
 assert.doesNotMatch(JSON.stringify(history),/private|categories|evidenceJson|probesJson/);
 assert.deepEqual(summarizeObservationHistory(rows,'not a url'),[]);
});

test('progress is only comparable for the same origin and named methodology',()=>{
 const comparable=summarizeObservationHistory([row('29','https://example.com',60),row('27','https://example.com',40)],'https://example.com');
 assert.equal(compareObservationHistory(comparable).delta,20);
 assert.equal(compareObservationHistory(comparable.slice(0,1)),null);
 assert.equal(compareObservationHistory([{...comparable[0],methodology:'new'},comparable[1]]),null);
 assert.equal(compareObservationHistory([{...comparable[0],score:null},comparable[1]]),null);
});

test('history route remains owner scoped and queries only the saved current origin',async()=>{
 const route=await readFile('app/api/projects/[projectId]/observations/route.ts','utf8');
 assert.match(route,/eq\(scanObservations\.userId, user\.userId\)/);
 assert.match(route,/eq\(scanObservations\.targetOrigin, origin\)/);
 assert.match(route,/\.limit\(5\)/);
 assert.match(route,/summarizeObservationHistory\(rows, project\.website\)/);
});
