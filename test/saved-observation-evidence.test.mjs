import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {storedObservationEvidence} from '../lib/saved-observation-evidence.mjs';

test('stored evidence exposes only known boolean audit signals',()=>{
 const evidence=storedObservationEvidence(JSON.stringify({robots:true,sitemap:false,llms:true,ownership:false,secret:'private',payments:'yes',__proto__:'bad'}));
 assert.deepEqual(evidence,{robots:true,sitemap:false,llms:true,ownership:false});
 assert.deepEqual(storedObservationEvidence('{broken'),{});
 assert.deepEqual(storedObservationEvidence(JSON.stringify(['robots'])),{});
});

test('the owner-scoped read and workspace carry saved evidence into a reviewable guide',async()=>{
 const route=await readFile('app/api/projects/[projectId]/observations/route.ts','utf8');
 const workspace=await readFile('app/components/intake-workspace.tsx','utf8');
 assert.match(route,/evidence: storedObservationEvidence\(observation\.evidenceJson\)/);
 assert.match(route,/eq\(scanObservations\.userId, user\.userId\)/);
 assert.match(workspace,/<SavedObservationEvidence observation=\{currentObservations\.observation\} locale=\{locale\}/);
});
